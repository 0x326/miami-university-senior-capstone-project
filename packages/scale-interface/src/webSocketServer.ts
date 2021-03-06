import http from 'http'
import url from 'url'

import {
  Socket,
} from 'net'

import {
  Map,
} from 'immutable'

import {
  Server as WebSocketServer,
} from 'ws'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Status,
  Request,
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
  rootPath,
  listExperiments,
  getExperiment,
  writeExperiment,
  listExperimentPaths,
} from './fsOperations'

function createWebSocketHandler<HandlerData, HandlerResponse>(
  handler: (data: HandlerData) => Promise<HandlerResponse>,
): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true })

  webSocketServer
    .on('connection', (webSocket) => {
      console.log('webSocketServer got new connection')

      webSocket
        .on('message', (data) => {
          try {
            const parsedData: Request<HandlerData> = JSON.parse(String(data))
            const {
              requestId,
              options,
            } = parsedData
            console.log('webSocket got message')

            handler(options)
              .then(
                (responseData): Response<HandlerResponse> => {
                  console.log('Handling succeeded. Sending reply')
                  return {
                    responseId: requestId,
                    status: Status.OK,
                    data: responseData,
                  }
                },
                (error): Response<HandlerResponse> => {
                  console.log('Handling failed. Sending error')
                  console.error(error.toString())

                  return {
                    responseId: requestId,
                    status: Status.FAIL,
                    message: error.toString(),
                    data: null,
                  }
                },
              )
              .then((response) => webSocket.send(JSON.stringify(response)))
              .catch((error) => console.error('Error on request reply', error))
          } catch (error) {
            console.error('Uncaught error in message handler:', error)
          }
        })
    })

  return webSocketServer
}

function createWebSocketEmitter<EmitterData>(
  emitter: () => AsyncGenerator<EmitterData>,
): WebSocketServer {
  const webSocketServer = new WebSocketServer({ noServer: true })

  webSocketServer
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .on('connection', async (webSocket) => {
      try {
        for await (const message of emitter()) {
          try {
            webSocket.send(JSON.stringify(message))
          } catch (error) {
            console.error('Error on data emit', error)
          }
        }
      } catch (error) {
        console.error('Uncaught error in emitter', error)
      }
    })

  return webSocketServer
}

function handleGetRootDir(): Promise<GetRootDirResponse> {
  return Promise.resolve(rootPath)
}

async function handleListExperiments(
  options: ListExperimentsOptions,
): Promise<ListExperimentsResponse> {
  try {
    const experiments = await listExperiments(options)

    return experiments
  } catch (error) {
    throw new Error(`listExperiments resulted in error: ${error} when given query: ${options}`)
  }
}

async function handleGetExperiment(
  options: GetExperimentOptions,
): Promise<GetExperimentResponse> {
  const { path } = options
  try {
    const experiment = await getExperiment(path)

    return experiment
  } catch (error) {
    throw new Error(`getExperiment on path ${path} resulted in error ${error}`)
  }
}

async function handleListExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<ListExperimentPathsResponse> {
  try {
    const paths = await listExperimentPaths(options)

    return paths
  } catch (error) {
    throw new Error(`listExperimentPaths resulted in error: ${error} when given query: ${options}`)
  }
}

async function handleWriteExperiment(
  options: WriteExperimentOptions,
): Promise<WriteExperimentResponse> {
  const {
    path,
    data,
  } = options

  if (path && data) {
    // await valid(JSON.parse(parsed.String(data)))
    await writeExperiment(path, data)
    console.log(`Saved the following object at ${path}`)
    console.log(data)

    return null
  }

  throw new Error(`Passed object is missing either a path or data field: ${options}`)
}

async function* emitScaleData(): AsyncGenerator<ScaleData> {
  console.log('Attempting to emit data...')
  for await (const data of subscribe()) {
    console.log(`Got scale data: ${data}`)
    yield data
  }
}

function createServer(
  port: number,
): http.Server {
  console.log('Creating Server...')
  const server = http.createServer()
  console.log('Created Server')
  console.log('Creating Websockets...')
  const routes = Map<WebSocketServer>({
    [getRootDirEndpoint]: createWebSocketHandler(handleGetRootDir),
    [listExperimentsEndpoint]: createWebSocketHandler(handleListExperiments),
    [getExperimentEndpoint]: createWebSocketHandler(handleGetExperiment),
    [listExperimentPathsEndpoint]: createWebSocketHandler(handleListExperimentPaths),
    [writeExperimentEndpoint]: createWebSocketHandler(handleWriteExperiment),
    [scaleDataEndpoint]: createWebSocketEmitter(emitScaleData),
  })
  console.log('Created Websockets')

  server.on('upgrade', (request: http.IncomingMessage, socket: Socket, head: Buffer) => {
    try {
      const { pathname } = url.parse(request.url || '')
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
    } catch (error) {
      console.error('Uncaught error in http.Server upgrade:', error)
    }
  })
  server.listen(port)

  return server
}

export {
  createServer,
  Status,
}
