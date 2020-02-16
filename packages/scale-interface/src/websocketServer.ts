import http from 'http'
import url from 'url'

import {
  Map,
} from 'immutable'

import {
  Server as WebSocketServer,
} from 'ws'

import {
  subscribe,
  requestBalance,
} from './serial'

import {
  ROOT_PATH,
  Experiment,
  listExperiments,
  getExperiment,
  writeExperiment,
  listExperimentPaths,
  ExperimentWrapper,
} from './fsOperations'

enum Status {
  OK = 'OK',
  FAIL = 'FAIL'
}

export interface Response {
  status: Status;
  data?: ExperimentWrapper | Array<ExperimentWrapper> | Array<string> | string;
  message?: string;
}

function createWebSocketHandler<HandlerData, HandlerResponse>(
  handler: (data: HandlerData) => Promise<HandlerResponse>,
): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true })

  webSocketServer
    .on('connection', (ws) => ws
      .on('message', (data: HandlerData) => {
        handler(data)
          .then((response) => ws
            .send(JSON.stringify(response)))
      }))

  return webSocketServer
}

function handleGetRootDir(): Promise<Response> {
  return Promise.resolve({
    status: Status.OK,
    data: ROOT_PATH,
  })
}

export interface ListExperimentsOptions {
  path: string;
  filter: null | Experiment;
}

async function handleListExperiments(
  data: ListExperimentsOptions,
): Promise<Response> {
  try {
    const parsed = JSON.parse(String(data))
    try {
      const wrappedExperiments = await listExperiments(parsed)
      return {
        status: Status.OK,
        data: wrappedExperiments,
      }
    } catch (error) {
      console.error(`listExperiments resulted in error: ${error} when given query:`, parsed)
      return {
        status: Status.FAIL,
        message: error.toString(),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
    }
  }
}

export type GetExperimentOptions = string

async function handleGetExperiment(
  data: GetExperimentOptions,
): Promise<Response> {
  try {
    const path = String(data)
    try {
      const wrappedExperiment = await getExperiment(path)
      return {
        status: Status.OK,
        data: wrappedExperiment,
      }
    } catch (error) {
      console.error(`getExperiment on path ${path} resulted in error ${error}`)
      return {
        status: Status.FAIL,
        message: error.toString(),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
    }
  }
}

export interface ListExperimentPathsOptions {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}

async function handleListExperimentPaths(
  data: ListExperimentPathsOptions,
): Promise<Response> {
  try {
    const parsed = JSON.parse(String(data))
    try {
      const paths = await listExperimentPaths(parsed)
      return {
        status: Status.OK,
        data: paths,
      }
    } catch (error) {
      console.error(`listExperimentPaths resulted in error: ${error} when given query:`, parsed)
      return {
        status: Status.FAIL,
        message: error.toString(),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
    }
  }
}

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

async function handleWriteExperiment(
  data: WriteExperimentOptions,
): Promise<Response> {
  try {
    const parsed = JSON.parse(String(data))
    if (parsed.path && parsed.data) {
      // await valid(JSON.parse(parsed.String(data)))
      try {
        await writeExperiment(parsed)
        console.log(`==Saved the following object at ${parsed.path}`)
        console.log(parsed.data)
        return {
          status: Status.OK,
          message: `Saved experiment at ${parsed.path}`,
        }
      } catch (error) {
        console.error(error)
        return {
          status: Status.FAIL,
          message: error.toString(),
        }
      }
    } else {
      console.error('==Passed object is missing either a path or data field', parsed)
      return {
        status: Status.FAIL,
        message: 'Need both a path and data',
      }
    }
  } catch (error) {
    console.error('==Do not write badly formatted object to disk', error)
    return {
      status: Status.FAIL,
      message: error.toString(),
    }
  }
}

function createServer(
  port: number,
): http.Server {
  const server = http.createServer()
  // different webSocket servers for different actions
  const wssGetRootDir = createWebSocketHandler(handleGetRootDir)
  const wssListExperiments = createWebSocketHandler(handleListExperiments)
  const wssGetExperiment = createWebSocketHandler(handleGetExperiment)
  const wssListPaths = createWebSocketHandler(handleListExperimentPaths)
  const wssWriteExperiment = createWebSocketHandler(handleWriteExperiment)
  const wssScaleData = new WebSocketServer({ noServer: true })

  wssScaleData.on('connection', (ws) => {
    Promise.all([
      Promise.resolve()
        .then(() => subscribe())
        .then(async (iterator) => {
          for await (const data of iterator) {
            console.log('Received data', data)
          }
        }),

      Promise.resolve()
        .then(() => setInterval(() => {
          requestBalance()
            .then((data) => console.log('Received data (by request)', data))
        }, 1000)),
    ])
      .catch((error) => console.error('Error while interacting with scale', error))
  })

  const routes = Map<WebSocketServer>({
    '/get-root-dir': wssGetRootDir,
    '/list-experiments': wssListExperiments,
    '/get-experiment': wssGetExperiment,
    '/list-experiment-paths': wssListPaths,
    '/write-experiment': wssWriteExperiment,
    '/scale-data': wssScaleData,
  })

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = url.parse(request.url)
    console.log(`Request for ${pathname}`)
    const wss = routes.get(pathname || '')

    if (wss !== undefined) {
      console.log(`Creating websocket server to handle ${pathname}`)
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    } else {
      console.log('Request is not a valid path, destroying socket')
      socket.destroy()
    }
  })
  server.listen(port)

  return server
}

export {
  createServer,
  Status,
}
