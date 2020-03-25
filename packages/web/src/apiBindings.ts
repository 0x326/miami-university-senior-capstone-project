// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Status,
  Response,
  ExperimentWrapper,
} from 'api-interfaces/dist/common'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getExperimentEndpoint,
  GetExperimentEndpoint,
  GetExperimentOptions,
  GetExperimentResponse,
} from 'api-interfaces/dist/get-experiment'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getRootDirEndpoint,
  GetRootDirEndpoint,
  GetRootDirOptions,
  GetRootDirResponse,
} from 'api-interfaces/dist/get-root-dir'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  listExperimentPathsEndpoint,
  ListExperimentPathsEndpoint,
  ListExperimentPathsOptions,
  ListExperimentPathsResponse,
} from 'api-interfaces/dist/list-experiment-paths'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  listExperimentsEndpoint,
  ListExperimentsEndpoint,
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
  WriteExperimentEndpoint,
  WriteExperimentOptions,
  WriteExperimentResponse,
} from 'api-interfaces/dist/write-experiment'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Endpoint,
  EndpointOptions,
  EndpointResponse,
} from 'api-interfaces/dist'

let webSockets: null | {
  [getRootDirEndpoint]: WebSocket;
  [listExperimentsEndpoint]: WebSocket;
  [getExperimentEndpoint]: WebSocket;
  [listExperimentPathsEndpoint]: WebSocket;
  [writeExperimentEndpoint]: WebSocket;
  [scaleDataEndpoint]: WebSocket;
} = null

function openWebSocket(
  path: string,
  timeout: number,
): Promise<WebSocket> {
  return new Promise((resolve, reject): void => {
    const rejectTimer = setTimeout(() => {
      reject(new Error('Could not open socket because connection exceeded timeout'))
    }, timeout)

    let socket: WebSocket | null = new WebSocket(path)
    socket.addEventListener('open', () => {
      clearTimeout(rejectTimer)
      resolve(socket as WebSocket)
    })
    socket.addEventListener('close', () => {
      console.log(`Socket to ${path} closed.`)
      // Deallocate socket
      socket = null
    })
    // TODO (wimmeldj) [2020-03-15]: Add event listener for 'error' event
  })
}

async function connect(
  host = 'localhost',
  port = 8081,
  timeout = 1500,
): Promise<void> {
  if (webSockets !== null) {
    throw new Error('Sockets are already open')
  }

  const baseURI = `ws://${host}:${port}`

  webSockets = {
    [getRootDirEndpoint]: await openWebSocket(`${baseURI}${getRootDirEndpoint}`, timeout),
    [listExperimentsEndpoint]: await openWebSocket(`${baseURI}${listExperimentsEndpoint}`, timeout),
    [getExperimentEndpoint]: await openWebSocket(`${baseURI}${getExperimentEndpoint}`, timeout),
    [listExperimentPathsEndpoint]: await openWebSocket(`${baseURI}${listExperimentPathsEndpoint}`, timeout),
    [writeExperimentEndpoint]: await openWebSocket(`${baseURI}${writeExperimentEndpoint}`, timeout),
    [scaleDataEndpoint]: await openWebSocket(`${baseURI}${scaleDataEndpoint}`, timeout),
  }
}

function disconnect(): void {
  if (webSockets === null) {
    throw new Error('Sockets are already closed')
  }

  Object.values(webSockets)
    .forEach((socket) => {
      if (socket !== null) {
        socket.close()
      }
    })
  webSockets = null
}

function socketSend(
  endpoint: GetExperimentEndpoint,
  options: GetExperimentOptions,
): Promise<GetExperimentResponse>

function socketSend(
  endpoint: GetRootDirEndpoint,
  options: GetRootDirOptions,
): Promise<GetRootDirResponse>

function socketSend(
  endpoint: ListExperimentPathsEndpoint,
  options: ListExperimentPathsOptions,
): Promise<ListExperimentPathsResponse>

function socketSend(
  endpoint: ListExperimentsEndpoint,
  options: ListExperimentsOptions,
): Promise<ListExperimentsResponse>

function socketSend(
  endpoint: WriteExperimentEndpoint,
  options: WriteExperimentOptions,
): Promise<WriteExperimentResponse>

function socketSend(
  endpoint: Endpoint,
  options: EndpointOptions,
): Promise<EndpointResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    [endpoint]: socket,
  } = webSockets

  return new Promise((resolve, reject): void => {
    const onMessage = (event: MessageEvent): void => {
      socket.removeEventListener('message', onMessage)

      const { data: rawResponse } = event
      // Trust that objects from `scale-interface` implement Resp
      const response: Response<EndpointResponse> = JSON.parse(rawResponse)
      const {
        status,
        message,
        data,
      } = response
      if (status !== Status.OK) {
        reject(new Error(message))
      }

      switch (endpoint) {
        default:
          reject(new Error('Response object cannot be validated. This is an oversight in the source code'))
          break

        // TODO (0x326) [2020-03-15]: Verify response objects
        case getRootDirEndpoint:
          break

        case listExperimentsEndpoint:
          break

        case getExperimentEndpoint:
          break

        case listExperimentPathsEndpoint:
          break

        case writeExperimentEndpoint:
          break
      }
      resolve(data)
    }

    socket.addEventListener('message', onMessage)
    socket.send(JSON.stringify(options))
  })
}

async function getRootDir(): Promise<string> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const dirPath = await socketSend(getRootDirEndpoint, {})

  return dirPath
}

async function listExperiments(
  options: ListExperimentsOptions,
): Promise<Array<ExperimentWrapper> | undefined> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const experiments = await socketSend(listExperimentsEndpoint, options)

  return experiments
}

async function getExperiment(
  options: GetExperimentOptions,
): Promise<ExperimentWrapper | undefined> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const experiment = await socketSend(getExperimentEndpoint, options)

  return experiment
}

async function listExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<Array<string> | undefined> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const experimentPaths = await socketSend(listExperimentPathsEndpoint, options)

  return experimentPaths
}

async function writeExperiment(
  options: WriteExperimentOptions,
): Promise<void> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const response = await socketSend(writeExperimentEndpoint, options)
}

function scaleData(
  callback: (measurement: ScaleData) => void,
): void {
  if (webSockets === null) {
    console.log('scaleData func ran but errored.')
    throw new Error('Socket is not open')
  }
  const {
    [scaleDataEndpoint]: webSocket,
  } = webSockets

  webSocket.addEventListener('message', ({ data }) => callback(data))
  // TODO (0x326) [2020-03-15]: Verify object
}

export {
  connect,
  disconnect,
  getRootDir,
  listExperiments,
  getExperiment,
  listExperimentPaths,
  writeExperiment,
  scaleData,
}
