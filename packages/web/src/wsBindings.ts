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
    socket.onclose = () => {
      console.log(`Socket to ${path} closed.`)
      socket = null
    }
    setTimeout(() => reject(new Error(`Timeout ${socket}`)), timeout)
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

/**
 * generic socket message handler for most sockets
 * @param event
 * @param resolve
 * @param reject
 */
function messageHandler(
  event: any,
  resolve: (data?: any) => any,
  reject: (reason?: any) => any,
): void {
  const parsed: Resp = JSON.parse(event.data)
  if (parsed.status === Status.FAIL) reject(new Error(parsed.message))
  resolve(parsed.data)
}

function getRoot(): Promise<any> {
  return ensureOpen('get-root-dir')
    .then((socket) => new Promise((resolve, reject): void => {
      socket.addEventListener('message', (event) => messageHandler(event, resolve, reject))
      socket.send('')
    }))
}

function listExperiments(path: string, filter?: Experiment): Promise<Array<ExperimentWrapper>> {
  return ensureOpen('list-experiments')
    .then((socket) => new Promise((resolve, reject): void => {
      socket.addEventListener('message', (event) => messageHandler(event, resolve, reject))
      socket.send(JSON.stringify({ path, filter }))
    }))
}

function getExperiment(path: string): Promise<ExperimentWrapper> {
  return ensureOpen('get-experiment')
    .then((socket) => new Promise((resolve, reject): void => {
      socket.addEventListener('message', (event) => messageHandler(event, resolve, reject))
      socket.send(path)
    }))
}

function listPaths(query: ListPathsQuery):
  Promise<ExperimentWrapper> {
  return ensureOpen('list-experiment-paths')
    .then((socket) => new Promise((resolve, reject): void => {
      socket.addEventListener('message', (event) => messageHandler(event, resolve, reject))
      socket.send(JSON.stringify(query))
    }))
}

function writeExperiment(data: Experiment, path: string): Promise<string> {
  return ensureOpen('write-experiment')
    .then((socket) => new Promise((resolve, reject): void => {
      socket.addEventListener('message', (event) => {
        const parsed: Resp = JSON.parse(event.data)
        if (parsed.status === Status.OK) resolve(parsed.message)
        reject(new Error(parsed.message))
      })
      socket.send(JSON.stringify({ path, data }))
    }))
}


export {
  getRoot,
  listExperiments,
  getExperiment,
  listPaths,
  writeExperiment,
}
