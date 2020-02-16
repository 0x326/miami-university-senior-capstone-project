import {
  Experiment,
  ExperimentWrapper,
} from '../../scale-interface/src/fsOperations'

import {
  Status,
  Response,
} from '../../scale-interface/src/websocketServer'

const PORT = 8081
const TIMEOUT = 1500

interface ListPathsQuery {
  path: string;
  experimentName?: void | string;
  primaryExperimenter?: void | string;
  dateStart?: void | number;
  dateEnd?: void | number;
}


// import * as assert from 'assert'

let webSockets: null | {
  getRoot: WebSocket;
  listExperiments: WebSocket;
  getExperiment: WebSocket;
  listPaths: WebSocket;
  writeExperiment: WebSocket;
} = null

function openWebSocket(path: string, timeout: number): Promise<WebSocket> {
  return new Promise((resolve, reject): void => {
    let socket: WebSocket | null = new WebSocket(path)
    socket.addEventListener('open', () => resolve(socket as WebSocket))
    socket.addEventListener('close', () => {
      console.log(`Socket to ${path} closed.`)
      // Deallocate socket
      socket = null
    })
    // TODO (wimmeldj) [2020-03-01]: Add event listener for 'error' event
    setTimeout(() => reject(new Error('Could not open socket because connection exceeded timeout')), timeout)
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
      if (parsed.status === Status.FAIL) reject(new Error(parsed.message))
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

function listExperiments(path: string, filter?: Experiment): Promise<Array<ExperimentWrapper>> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listExperiments: wsListExperiments,
  } = webSockets

  return socketSend(wsListExperiments, JSON.stringify({ path, filter }))
    .then((response) => response.data as Array<ExperimentWrapper>)
}

function getExperiment(path: string): Promise<ExperimentWrapper> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    getExperiment: wsGetExperiment,
  } = webSockets

  return socketSend(wsGetExperiment, path)
    .then((response) => response.data as ExperimentWrapper)
}

function listPaths(query: ListPathsQuery):
  Promise<Array<string>> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    listPaths: wsListPaths,
  } = webSockets

  return socketSend(wsListPaths, JSON.stringify(query))
    .then((response) => response.data as Array<string>)
}

function writeExperiment(data: Experiment, path: string): Promise<string> {
  if (webSockets === null) {
    throw new Error('Socket is not open')
  }
  const {
    writeExperiment: wsWriteExperiment,
  } = webSockets

  return socketSend(wsWriteExperiment, JSON.stringify({ path, data }))
    .then((response) => String(response.message))
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
