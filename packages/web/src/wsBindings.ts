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
const wsScaleData: null | WebSocket = null


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

/**
 * resolves to a websocket guaranteed to be open
 * has side effect of opening globally defined websockets if they are not open
 * @param route
 */
async function ensureOpen(route: string): Promise<WebSocket> {
  switch (route) {
    case 'get-root-dir':
      if (wsGetRoot === null || wsGetRoot.readyState !== WebSocket.OPEN) {
        wsGetRoot = await openWebSocket(`ws://localhost:${PORT}/${route}`, TIMEOUT)
      }
      return wsGetRoot


    case 'list-experiments':
      if (wsListExperiments === null || wsListExperiments.readyState === WebSocket.OPEN) {
        wsListExperiments = await openWebSocket(`ws://localhost:${PORT}/${route}`, TIMEOUT)
      }
      return wsListExperiments


    case 'get-experiment':
      if (wsGetExperiment === null || wsGetExperiment.readyState === WebSocket.OPEN) {
        wsGetExperiment = await openWebSocket(`ws://localhost:${PORT}/${route}`, TIMEOUT)
      }
      return wsGetExperiment


    case 'list-experiment-paths':
      if (wsListPaths === null || wsListPaths.readyState === WebSocket.OPEN) {
        wsListPaths = await openWebSocket(`ws://localhost:${PORT}/${route}`, TIMEOUT)
      }
      return wsListPaths


    case 'write-experiment':
      if (wsWriteExperiment === null || wsWriteExperiment.readyState === WebSocket.OPEN) {
        wsWriteExperiment = await openWebSocket(`ws://localhost:${PORT}/${route}`, TIMEOUT)
      }
      return wsWriteExperiment


    default:
      throw new Error('No websocket matching path provided.')
  }
}

function socketSend(socket: WebSocket, message: string): Promise<Resp> {
  return new Promise((resolve, reject): void => {
    socket.addEventListener('message', (event) => {
      const { data } = event
      const parsed: Resp = JSON.parse(data)
      if (parsed.status === Status.FAIL) reject(new Error(parsed.message))
      resolve(parsed)
    })

    socket.send(message)
  })
}

function getRoot(): Promise<any> {
  return ensureOpen('get-root-dir')
    .then((socket) => socketSend(socket, ''))
    .then((response) => response.data)
}

function listExperiments(path: string, filter?: Experiment): Promise<Array<ExperimentWrapper>> {
  return ensureOpen('list-experiments')
    .then((socket) => socketSend(socket, JSON.stringify({ path, filter })))
    .then((response) => response.data)
}

function getExperiment(path: string): Promise<ExperimentWrapper> {
  return ensureOpen('get-experiment')
    .then((socket) => socketSend(socket, path))
    .then((response) => response.data)
}

function listPaths(query: ListPathsQuery):
  Promise<ExperimentWrapper> {
  return ensureOpen('list-experiment-paths')
    .then((socket) => socketSend(socket, JSON.stringify(query)))
    .then((response) => response.data)
}

function writeExperiment(data: Experiment, path: string): Promise<string> {
  return ensureOpen('write-experiment')
    .then((socket) => socketSend(socket, JSON.stringify({ path, data })))
    .then((response) => response.message)
}


export {
  getRoot,
  listExperiments,
  getExperiment,
  listPaths,
  writeExperiment,
}
