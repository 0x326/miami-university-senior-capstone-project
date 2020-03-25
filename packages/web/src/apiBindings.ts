// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Status,
  Response,
  ExperimentWrapper,
} from 'api-interfaces/dist/common'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GetExperimentOptions,
  GetExperimentResponse,
} from 'api-interfaces/dist/get-experiment'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GetRootDirResponse,
} from 'api-interfaces/dist/get-root-dir'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ListExperimentPathsOptions,
  ListExperimentPathsResponse,
} from 'api-interfaces/dist/list-experiment-paths'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ListExperimentsOptions,
  ListExperimentsResponse,
} from 'api-interfaces/dist/list-experiments'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ScaleData,
} from 'api-interfaces/dist/scale-data'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  WriteExperimentOptions,
  WriteExperimentResponse,
} from 'api-interfaces/dist/write-experiment'

let webSockets: null | {
  getRootDir: WebSocket;
  listExperiments: WebSocket;
  getExperiment: WebSocket;
  listExperimentPaths: WebSocket;
  writeExperiment: WebSocket;
  scaleData: WebSocket;
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
    getRootDir: await openWebSocket(`${baseURI}/get-root-dir`, timeout),
    listExperiments: await openWebSocket(`${baseURI}/list-experiments`, timeout),
    getExperiment: await openWebSocket(`${baseURI}/get-experiment`, timeout),
    listExperimentPaths: await openWebSocket(`${baseURI}/list-experiment-paths`, timeout),
    writeExperiment: await openWebSocket(`${baseURI}/write-experiment`, timeout),
    scaleData: await openWebSocket(`${baseURI}/scale-data`, timeout),
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
  socket: WebSocket,
  message: object | null,
): Promise<Response<unknown>> {
  return new Promise((resolve, reject): void => {
    const onMessage = (event: MessageEvent): void => {
      socket.removeEventListener('message', onMessage)

      const { data } = event
      // Trust that objects from `scale-interface` implement Resp
      const parsed: Response<unknown> = JSON.parse(data)
      const {
        status,
        message: responseMessage,
      } = parsed
      if (status !== Status.OK) {
        reject(new Error(responseMessage))
      }
      resolve(parsed)
    }

    socket.addEventListener('message', onMessage)
    socket.send(JSON.stringify(message))
  })
}

async function getRootDir(): Promise<string> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getRootDir: webSocket,
  } = webSockets

  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unnecessary-type-assertion
  const response = await socketSend(webSocket, null) as GetRootDirResponse
  // TODO (0x326) [2020-03-15]: Verify response object

  const {
    data: dirPath,
  } = response

  return dirPath
}

async function listExperiments(
  options: ListExperimentsOptions,
): Promise<Array<ExperimentWrapper> | undefined> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperiments: webSocket,
  } = webSockets

  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unnecessary-type-assertion
  const response = await socketSend(webSocket, options) as ListExperimentsResponse
  // TODO (0x326) [2020-03-15]: Verify response object

  const {
    data: experiments,
  } = response

  return experiments
}

async function getExperiment(
  options: GetExperimentOptions,
): Promise<ExperimentWrapper | undefined> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getExperiment: webSocket,
  } = webSockets

  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unnecessary-type-assertion
  const response = await socketSend(webSocket, options) as GetExperimentResponse
  // TODO (0x326) [2020-03-15]: Verify response object

  const {
    data: experiment,
  } = response

  return experiment
}

async function listExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<Array<string> | undefined> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperimentPaths: webSocket,
  } = webSockets

  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unnecessary-type-assertion
  const response = await socketSend(webSocket, options) as ListExperimentPathsResponse
  // TODO (0x326) [2020-03-15]: Verify response object

  const {
    data: experimentPaths,
  } = response

  return experimentPaths
}

async function writeExperiment(
  options: WriteExperimentOptions,
): Promise<void> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    writeExperiment: webSocket,
  } = webSockets

  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unnecessary-type-assertion
  const response = await socketSend(webSocket, options) as WriteExperimentResponse
  // TODO (0x326) [2020-03-15]: Verify response object
}

function scaleData(
  callback: (measurement: ScaleData) => void,
): void {
  if (webSockets === null) {
    console.log('scaleData func ran but errored.')
    throw new Error('Socket is not open')
  }
  const {
    scaleData: webSocket,
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
