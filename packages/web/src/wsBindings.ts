import {
  Status,
  Response,
  GetRootDirResponse,
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
  getRootDir: WebSocket;
  listExperiments: WebSocket;
  getExperiment: WebSocket;
  listExperimentPaths: WebSocket;
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
    getRootDir: await openWebSocket(`ws://localhost:${PORT}/get-root-dir`, TIMEOUT),
    listExperiments: await openWebSocket(`ws://localhost:${PORT}/list-experiments`, TIMEOUT),
    getExperiment: await openWebSocket(`ws://localhost:${PORT}/get-experiment`, TIMEOUT),
    listExperimentPaths: await openWebSocket(`ws://localhost:${PORT}/list-experiment-paths`, TIMEOUT),
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

function socketSend(socket: WebSocket, message: object | null): Promise<Response> {
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

    socket.send(JSON.stringify(message))
  })
}

function getRootDir(): Promise<GetRootDirResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getRootDir: wsGetRoot,
  } = webSockets

  return socketSend(wsGetRoot, null) as Promise<GetRootDirResponse>
  // TODO (0x326) [2020-03-02]: Verify response object
}

function listExperiments(options: ListExperimentsOptions): Promise<ListExperimentsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperiments: wsListExperiments,
  } = webSockets

  return socketSend(wsListExperiments, options) as Promise<ListExperimentsResponse>
  // TODO (0x326) [2020-03-02]: Verify response object
}

function getExperiment(options: GetExperimentOptions): Promise<GetExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getExperiment: wsGetExperiment,
  } = webSockets

  return socketSend(wsGetExperiment, options) as Promise<GetExperimentResponse>
  // TODO (0x326) [2020-03-02]: Verify response object
}

function listExperimentPaths(options: ListExperimentPathsOptions): Promise<ListExperimentPathsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperimentPaths: wsListPaths,
  } = webSockets

  return socketSend(wsListPaths, options) as Promise<ListExperimentPathsResponse>
  // TODO (0x326) [2020-03-02]: Verify response object
}

function writeExperiment(options: WriteExperimentOptions): Promise<WriteExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    writeExperiment: wsWriteExperiment,
  } = webSockets

  return socketSend(wsWriteExperiment, options) as Promise<WriteExperimentResponse>
  // TODO (0x326) [2020-03-02]: Verify response object
}


export {
  connect,
  disconnect,
  getRootDir,
  listExperiments,
  getExperiment,
  listExperimentPaths,
  writeExperiment,
}
