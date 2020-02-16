import {
  Status,
  Response,
  ListExperimentsOptions,
  ListExperimentsResponse,
  GetExperimentOptions,
  GetExperimentResponse,
  ListExperimentPathsOptions,
  ListExperimentPathsResponse,
  WriteExperimentOptions,
  WriteExperimentResponse,
} from '../../scale-interface/src/websocketServer'

const PORT = 8081
const TIMEOUT = 1500

let webSockets: null | {
  getRoot: WebSocket;
  listExperiments: WebSocket;
  getExperiment: WebSocket;
  listPaths: WebSocket;
  writeExperiment: WebSocket;
} = null

function openWebSocket(path: string, timeout: number): Promise<WebSocket> {
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
    // TODO (wimmeldj) [2020-03-01]: Add event listener for 'error' event
  })
}

async function connect(): Promise<void> {
  if (webSockets !== null) {
    throw new Error('Sockets are already open')
  }

  webSockets = {
    getRoot: await openWebSocket(`ws://localhost:${PORT}/get-root-dir`, TIMEOUT),
    listExperiments: await openWebSocket(`ws://localhost:${PORT}/list-experiments`, TIMEOUT),
    getExperiment: await openWebSocket(`ws://localhost:${PORT}/get-experiment`, TIMEOUT),
    listPaths: await openWebSocket(`ws://localhost:${PORT}/list-experiment-paths`, TIMEOUT),
    writeExperiment: await openWebSocket(`ws://localhost:${PORT}/write-experiment`, TIMEOUT),
  }
}

function disconnect(): void {
  if (webSockets === null) {
    throw new Error('Sockets are already closed')
  }

  Object.values(webSockets).map((socket) => socket !== null && socket.close())
  webSockets = null
}

function socketSend(socket: WebSocket, message: string): Promise<Response> {
  return new Promise((resolve, reject): void => {
    socket.addEventListener('message', (event) => {
      const { data } = event
      // Trust that objects from `scale-interface` implement Resp
      const parsed: Response = JSON.parse(data)
      if (parsed.status === Status.FAIL) {
        reject(new Error(parsed.message))
      }
      resolve(parsed)
    })

    socket.send(message)
  })
}

function getRoot(): Promise<string> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getRoot: wsGetRoot,
  } = webSockets

  return socketSend(wsGetRoot, '')
    .then((response) => String(response.data))
}

function listExperiments(options: ListExperimentsOptions): Promise<ListExperimentsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperiments: wsListExperiments,
  } = webSockets

  const {
    path,
    filter,
  } = options

  return socketSend(wsListExperiments, JSON.stringify({ path, filter }))
}

function getExperiment(options: GetExperimentOptions): Promise<GetExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getExperiment: wsGetExperiment,
  } = webSockets
  const path = options

  return socketSend(wsGetExperiment, path)
}

function listPaths(options: ListExperimentPathsOptions): Promise<ListExperimentPathsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listPaths: wsListPaths,
  } = webSockets

  return socketSend(wsListPaths, JSON.stringify(options))
}

function writeExperiment(options: WriteExperimentOptions): Promise<WriteExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    writeExperiment: wsWriteExperiment,
  } = webSockets
  const {
    data,
    path,
  } = options

  return socketSend(wsWriteExperiment, JSON.stringify({ path, data }))
}


export {
  connect,
  disconnect,
  getRoot,
  listExperiments,
  getExperiment,
  listPaths,
  writeExperiment,
}
