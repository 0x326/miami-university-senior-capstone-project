import {
  Experiment,
  ExperimentWrapper,
} from '../../scale-interface/src/fsOperations'

import {
  Status,
  Resp,
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

let wsGetRoot: null | WebSocket = null
let wsListExperiments: null | WebSocket = null
let wsGetExperiment: null | WebSocket = null
let wsListPaths: null | WebSocket = null
let wsWriteExperiment: null | WebSocket = null


function openWebSocket(path: string, timeout: number): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
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
  const sockets = [
    wsGetRoot,
    wsListExperiments,
    wsGetExperiment,
    wsListPaths,
    wsWriteExperiment,
  ]
  if (sockets.every((socket) => socket !== null)) {
    throw new Error('Sockets are already open')
  }

  [
    wsGetRoot,
    wsListExperiments,
    wsGetExperiment,
    wsListPaths,
    wsWriteExperiment,
  ] = await Promise.all([
    openWebSocket(`ws://localhost:${PORT}/get-root-dir`, TIMEOUT),
    openWebSocket(`ws://localhost:${PORT}/list-experiments`, TIMEOUT),
    openWebSocket(`ws://localhost:${PORT}/get-experiment`, TIMEOUT),
    openWebSocket(`ws://localhost:${PORT}/list-experiment-paths`, TIMEOUT),
    openWebSocket(`ws://localhost:${PORT}/write-experiment`, TIMEOUT),
  ])
}

function disconnect(): void {
  const sockets = [
    wsGetRoot,
    wsListExperiments,
    wsGetExperiment,
    wsListPaths,
    wsWriteExperiment,
  ]

  sockets.map((socket) => socket !== null && socket.close())
}

function socketSend(socket: WebSocket, message: string): Promise<Resp> {
  return new Promise((resolve, reject): void => {
    socket.addEventListener('message', (event) => {
      const { data } = event
      // Trust that objects from `scale-interface` implement Resp
      const parsed: Resp = JSON.parse(data)
      if (parsed.status === Status.FAIL) reject(new Error(parsed.message))
      resolve(parsed)
    })

    socket.send(message)
  })
}

function getRoot(): Promise<any> {
  if (wsGetRoot === null) {
    throw new Error('Socket is not open')
  }

  return socketSend(wsGetRoot, '')
    .then((response) => response.data)
}

function listExperiments(path: string, filter?: Experiment): Promise<Array<ExperimentWrapper>> {
  if (wsListExperiments === null) {
    throw new Error('Socket is not open')
  }

  return socketSend(wsListExperiments, JSON.stringify({ path, filter }))
    .then((response) => response.data as Array<ExperimentWrapper>)
}

function getExperiment(path: string): Promise<ExperimentWrapper> {
  if (wsGetExperiment === null) {
    throw new Error('Socket is not open')
  }

  return socketSend(wsGetExperiment, path)
    .then((response) => response.data as ExperimentWrapper)
}

function listPaths(query: ListPathsQuery):
  Promise<Array<string>> {
  if (wsListPaths === null) {
    throw new Error('Socket is not open')
  }

  return socketSend(wsListPaths, JSON.stringify(query))
    .then((response) => response.data as Array<string>)
}

function writeExperiment(data: Experiment, path: string): Promise<string> {
  if (wsWriteExperiment === null) {
    throw new Error('Socket is not open')
  }

  return socketSend(wsWriteExperiment, JSON.stringify({ path, data }))
    .then((response) => response.message as string)
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
