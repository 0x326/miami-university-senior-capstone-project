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

let webSockets: null | {
  getRootDir: WebSocket;
  listExperiments: WebSocket;
  getExperiment: WebSocket;
  listExperimentPaths: WebSocket;
  writeExperiment: WebSocket;
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
    // TODO (wimmeldj) [2020-03-01]: Add event listener for 'error' event
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
): Promise<Response> {
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

async function getRootDir(): Promise<GetRootDirResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getRootDir: wsGetRoot,
  } = webSockets

  const response = await socketSend(wsGetRoot, null) as GetRootDirResponse
  // TODO (0x326) [2020-03-02]: Verify response object

  return response
}

async function listExperiments(
  options: ListExperimentsOptions,
): Promise<ListExperimentsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperiments: wsListExperiments,
  } = webSockets

  const response = await socketSend(wsListExperiments, options) as ListExperimentsResponse
  // TODO (0x326) [2020-03-02]: Verify response object

  return response
}

async function getExperiment(
  options: GetExperimentOptions,
): Promise<GetExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getExperiment: wsGetExperiment,
  } = webSockets

  const response = await socketSend(wsGetExperiment, options) as GetExperimentResponse
  // TODO (0x326) [2020-03-02]: Verify response object

  return response
}

async function listExperimentPaths(
  options: ListExperimentPathsOptions,
): Promise<ListExperimentPathsResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperimentPaths: wsListPaths,
  } = webSockets

  const response = await socketSend(wsListPaths, options) as ListExperimentPathsResponse
  // TODO (0x326) [2020-03-02]: Verify response object

  return response
}

async function writeExperiment(
  options: WriteExperimentOptions,
): Promise<WriteExperimentResponse> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    writeExperiment: wsWriteExperiment,
  } = webSockets

  const response = await socketSend(wsWriteExperiment, options) as WriteExperimentResponse
  // TODO (0x326) [2020-03-02]: Verify response object

  return response
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
