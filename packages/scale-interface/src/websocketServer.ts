import http from 'http'
import url from 'url'

import {
  Map,
} from 'immutable'

import {
  Server as WebSocketServer,
} from 'ws'

import {
  Measurement,
  subscribe,
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
      .on('message', (data) => {
        const parsedData: HandlerData = JSON.parse(String(data))
        handler(parsedData)
          .then((response) => ws
            .send(JSON.stringify(response)))
      }))

  return webSocketServer
}

function createWebSocketEmitter<EmitterData>(
  emitter: () => AsyncGenerator<EmitterData>,
): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true })

  webSocketServer
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .on('connection', async (ws) => {
      for await (const message of emitter()) {
        ws.send(JSON.stringify(message))
      }
    })

  return webSocketServer
}

const getRootDirEndpoint = '/get-root-dir'

export interface GetRootDirResponse extends Response {
  status: Status;
  data: string;
}

function handleGetRootDir(): Promise<GetRootDirResponse> {
  return Promise.resolve({
    status: Status.OK,
    data: ROOT_PATH,
  })
}

const listExperimentsEndpoint = '/list-experiments'

export interface ListExperimentsOptions {
  path: string;
  filter: null | Experiment;
}

export interface ListExperimentsResponse extends Response {
  status: Status;
  data?: Array<ExperimentWrapper>;
  message?: string;
}

async function handleListExperiments(
  options: ListExperimentsOptions,
): Promise<ListExperimentsResponse> {
  try {
    try {
      const wrappedExperiments = await listExperiments(options)
      return {
        status: Status.OK,
        data: wrappedExperiments,
      }
    } catch (error) {
      console.error(`listExperiments resulted in error: ${error} when given query:`, options)
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

const getExperimentEndpoint = '/get-experiment'

export interface GetExperimentOptions {
  path: string;
}

export interface GetExperimentResponse extends Response {
  status: Status;
  data?: ExperimentWrapper;
  message?: string;
}

async function handleGetExperiment(
  options: GetExperimentOptions,
): Promise<GetExperimentResponse> {
  try {
    const { path } = options
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

const listExperimentPathsEndpoint = '/list-experiment-paths'

export interface ListExperimentPathsOptions {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ListExperimentPathsResponse extends Response {
  status: Status;
  data?: Array<string>;
  message?: string;
}

async function handleListExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<ListExperimentPathsResponse> {
  try {
    try {
      const paths = await listExperimentPaths(options)
      return {
        status: Status.OK,
        data: paths,
      }
    } catch (error) {
      console.error(`listExperimentPaths resulted in error: ${error} when given query:`, options)
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

const writeExperimentEndpoint = '/write-experiment'

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

export interface WriteExperimentResponse extends Response {
  status: Status;
  message?: string;
}

async function handleWriteExperiment(
  options: WriteExperimentOptions,
): Promise<WriteExperimentResponse> {
  try {
    if (options.path && options.data) {
      // await valid(JSON.parse(parsed.String(data)))
      try {
        await writeExperiment(options)
        console.log(`==Saved the following object at ${options.path}`)
        console.log(options.data)
        return {
          status: Status.OK,
          message: `Saved experiment at ${options.path}`,
        }
      } catch (error) {
        console.error(error)
        return {
          status: Status.FAIL,
          message: error.toString(),
        }
      }
    } else {
      console.error('==Passed object is missing either a path or data field', options)
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

const scaleDataEndpoint = '/scale-data'

export interface ScaleData extends Measurement {

}

async function* emitScaleData(): AsyncGenerator<ScaleData> {
  for await (const data of subscribe()) {
    yield data
  }
}

function createServer(
  port: number,
): http.Server {
  const server = http.createServer()

  const routes = Map<WebSocketServer>({
    [getRootDirEndpoint]: createWebSocketHandler(handleGetRootDir),
    [listExperimentsEndpoint]: createWebSocketHandler(handleListExperiments),
    [getExperimentEndpoint]: createWebSocketHandler(handleGetExperiment),
    [listExperimentPathsEndpoint]: createWebSocketHandler(handleListExperimentPaths),
    [writeExperimentEndpoint]: createWebSocketHandler(handleWriteExperiment),
    [scaleDataEndpoint]: createWebSocketEmitter(emitScaleData),
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
