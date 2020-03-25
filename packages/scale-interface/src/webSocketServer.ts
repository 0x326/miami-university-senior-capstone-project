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
          const parsedData: HandlerData = JSON.parse(String(data))
          console.log('webSocket got message')

          handler(parsedData)
            .then(
              (responseData) => {
                console.log('Handling succeeded. Sending reply')
                webSocket
                  .send(JSON.stringify({
                    status: Status.OK,
                    data: responseData,
                  }))
              },
              (error) => {
                console.log('Handling failed. Sending error')
                console.error(error.toString())

                webSocket
                  .send(JSON.stringify({
                    status: Status.FAIL,
                    message: error.toString(),
                    data: null,
                  }))
              },
            )
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
      for await (const message of emitter()) {
        webSocket.send(JSON.stringify(message))
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
