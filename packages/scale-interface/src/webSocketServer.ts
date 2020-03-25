import http from 'http'
import url from 'url'

import {
  Map,
} from 'immutable'

import {
  Server as WebSocketServer,
} from 'ws'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Status,
  Response,
} from 'api-interfaces/dist/common'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getExperimentEndpoint,
  GetExperimentOptions,
  GetExperimentResponse,
} from 'api-interfaces/dist/get-experiment'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getRootDirEndpoint,
  GetRootDirResponse,
} from 'api-interfaces/dist/get-root-dir'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  listExperimentPathsEndpoint,
  ListExperimentPathsOptions,
  ListExperimentPathsResponse,
} from 'api-interfaces/dist/list-experiment-paths'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  listExperimentsEndpoint,
  ListExperimentsOptions,
  ListExperimentsResponse,
} from 'api-interfaces/dist/list-experiments'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  scaleDataEndpoint,
  ScaleData,
} from 'api-interfaces/dist/scale-data'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  writeExperimentEndpoint,
  WriteExperimentOptions,
  WriteExperimentResponse,
} from 'api-interfaces/dist/write-experiment'

import {
  subscribe,
} from './serial'

import {
  ROOT_PATH,
  listExperiments,
  getExperiment,
  writeExperiment,
  listExperimentPaths,
} from './fsOperations'

function createWebSocketHandler<HandlerData, HandlerResponse>(
  handler: (data: HandlerData) => Promise<Response<HandlerResponse>>,
): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true })

  webSocketServer
    .on('connection', (webSocket) => webSocket
      .on('message', (data) => {
        const parsedData: HandlerData = JSON.parse(String(data))
        handler(parsedData)
          .then((response) => webSocket
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
    .on('connection', async (webSocket) => {
      for await (const message of emitter()) {
        webSocket.send(JSON.stringify(message))
      }
    })

  return webSocketServer
}

function handleGetRootDir(): Promise<Response<GetRootDirResponse>> {
  return Promise.resolve({
    status: Status.OK,
    data: ROOT_PATH,
  })
}

async function handleListExperiments(
  options: ListExperimentsOptions,
): Promise<Response<ListExperimentsResponse>> {
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
        data: [],
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
      data: [],
    }
  }
}

async function handleGetExperiment(
  options: GetExperimentOptions,
): Promise<Response<GetExperimentResponse>> {
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
        data: null,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
      data: null,
    }
  }
}

async function handleListExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<Response<ListExperimentPathsResponse>> {
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
        data: [],
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: Status.FAIL,
      message: error.toString(),
      data: [],
    }
  }
}

async function handleWriteExperiment(
  options: WriteExperimentOptions,
): Promise<Response<WriteExperimentResponse>> {
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
          data: null,
        }
      } catch (error) {
        console.error(error)
        return {
          status: Status.FAIL,
          message: error.toString(),
          data: null,
        }
      }
    } else {
      console.error('==Passed object is missing either a path or data field', options)
      return {
        status: Status.FAIL,
        message: 'Need both a path and data',
        data: null,
      }
    }
  } catch (error) {
    console.error('==Do not write badly formatted object to disk', error)
    return {
      status: Status.FAIL,
      message: error.toString(),
      data: null,
    }
  }
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
    const webSocketServer = routes.get(pathname || '')

    if (webSocketServer !== undefined) {
      console.log(`Creating websocket server to handle ${pathname}`)
      webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
        webSocketServer.emit('connection', webSocket, request)
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
