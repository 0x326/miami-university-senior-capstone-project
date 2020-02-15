import http from 'http'
import url from 'url'

import {
  Server as WebSocketServer,
} from 'ws'

import {
  open,
  subscribe,
  requestBalance,
} from './serial'

import {
  ROOT_PATH,
  listExperiments,
  getExperiment,
  writeExperiment,
  listExperimentPaths,
  ExperimentWrapper,
} from './fsOperations'

import { ScaleConfig } from '.'

enum Status {
  OK = 'OK',
  FAIL = 'FAIL'
}

export interface Resp {
  status: Status;
  data?: ExperimentWrapper | Array<ExperimentWrapper> | Array<string> | string;
  message?: string;
}

function handleGetRootDir(): Promise<Resp> {
  return Promise.resolve({
    status: Status.OK,
    data: ROOT_PATH,
  })
}

function handleListExperiments(data): Promise<Resp> {
  try {
    const parsed = JSON.parse(String(data))
    return listExperiments(parsed)
      .then((wrappedExperiments) => ({
        status: Status.OK,
        data: wrappedExperiments,
      }))
      .catch((error) => {
        console.log(`listExperiments resulted in error: ${error} when given query:`)
        console.log(parsed)
        return {
          status: Status.FAIL,
          message: error.toString(),
        }
      })
  } catch (error) {
    console.log(error)
    return Promise.resolve({
      status: Status.FAIL,
      message: error.toString(),
    })
  }
}

function handleGetExperiment(data): Promise<Resp> {
  try {
    const path = String(data)
    return getExperiment(path)
      .then((wrappedExperiment) => ({
        status: Status.OK,
        data: wrappedExperiment,
      }))
      .catch((error) => {
        console.log(`getExperiment on path ${path} resulted in error ${error}`)
        return {
          status: Status.FAIL,
          message: error.toString(),
        }
      })
  } catch (error) {
    console.log(error)
    return Promise.resolve({
      status: Status.FAIL,
      message: error.toString(),
    })
  }
}

function handleListExperimentPaths(data): Promise<Resp> {
  try {
    const parsed = JSON.parse(String(data))
    return listExperimentPaths(parsed)
      .then((paths) => ({
        status: Status.OK,
        data: paths,
      }))
      .catch((error) => {
        console.log(`listExperimentPaths resulted in error: ${error} when given query:`)
        console.log(parsed)
        return {
          status: Status.FAIL,
          message: error.toString(),
        }
      })
  } catch (error) {
    console.log(error)
    return Promise.resolve({
      status: Status.FAIL,
      message: error.toString(),
    })
  }
}

function handleWriteExperiment(data): Promise<Resp> {
  try {
    const parsed = JSON.parse(String(data))
    if (parsed.path && parsed.data) {
      // await valid(JSON.parse(parsed.String(data)))
      return writeExperiment(parsed)
        .then(() => {
          console.log(`==Saved the following object at ${parsed.path}`)
          console.log(parsed.data)
          return {
            status: Status.OK,
            message: `Saved experiment at ${parsed.path}`,
          }
        })
        .catch((error) => {
          console.log(error)
          return {
            status: Status.FAIL,
            message: error.toString(),
          }
        })
    } else {
      console.log('==Passed object is missing either a path or data field')
      console.log(parsed)
      return Promise.resolve({
        status: Status.FAIL,
        message: 'Need both a path and data',
      })
    }
  } catch (error) {
    console.log('==Do not write badly formatted object to disk')
    console.log(error)
    return Promise.resolve({
      status: Status.FAIL,
      message: error.toString(),
    })
  }
}

function createServer(
  port: number,
  scaleConfig: ScaleConfig,
): http.Server {
  const server = http.createServer()
  // different webSocket servers for different actions
  const wssGetRootDir = new WebSocketServer({ noServer: true })
  const wssListExperiments = new WebSocketServer({ noServer: true })
  const wssGetExperiment = new WebSocketServer({ noServer: true })
  const wssListPaths = new WebSocketServer({ noServer: true })
  const wssWriteExperiment = new WebSocketServer({ noServer: true })
  const wssScaleData = new WebSocketServer({ noServer: true })

  wssGetRootDir.on('connection', (ws) => {
    ws.on('message', () => {
      handleGetRootDir()
        .then((response) => ws.send(JSON.stringify(response)))
    })
  })
  wssListExperiments.on('connection', (ws) => {
    ws.on('message', (data) => {
      handleListExperiments(data)
        .then((response) => ws.send(JSON.stringify(response)))
    })
  })
  wssGetExperiment.on('connection', (ws) => {
    ws.on('message', (data) => {
      handleGetExperiment(data)
        .then((response) => ws.send(JSON.stringify(response)))
    })
  })
  wssListPaths.on('connection', (ws) => {
    ws.on('message', (data) => {
      handleListExperimentPaths(data)
        .then((response) => ws.send(JSON.stringify(response)))
    })
  })
  wssWriteExperiment.on('connection', (ws) => {
    ws.on('message', (data) => {
      handleWriteExperiment(data)
        .then((response) => ws.send(JSON.stringify(response)))
    })
  })
  wssScaleData.on('connection', (ws) => {
    const deviceConnected = open(scaleConfig.device, {
      baudRate: scaleConfig.baudRate,
      dataBits: scaleConfig.dataBits,
      parity: scaleConfig.bitParity,
    })
      .then(() => {
        console.log('Scale connected')
        ws.send(JSON.stringify({
          status: Status.OK,
        } as Resp))
      })

    Promise.all([
      deviceConnected
        .then(() => subscribe())
        .then(async (iterator) => {
          for await (const data of iterator) {
            console.log('Received data', data)
          }
        }),

      deviceConnected
        .then(() => setInterval(() => {
          requestBalance()
            .then((data) => console.log('Received data (by request)', data))
        }, 1000)),
    ])
      .catch((error) => console.error('Error while interacting with scale', error))
  })

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = url.parse(request.url)
    console.log(`Request for ${pathname}`)

    switch (pathname) {
      case '/get-root-dir':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssGetRootDir.handleUpgrade(request, socket, head, (ws) => {
          wssGetRootDir.emit('connection', ws, request)
        })
        break

      case '/list-experiments':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssListExperiments.handleUpgrade(request, socket, head, (ws) => {
          wssListExperiments.emit('connection', ws, request)
        })
        break

      case '/get-experiment':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssGetExperiment.handleUpgrade(request, socket, head, (ws) => {
          wssGetExperiment.emit('connection', ws, request)
        })
        break

      case '/list-experiment-paths':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssListPaths.handleUpgrade(request, socket, head, (ws) => {
          wssListPaths.emit('connection', ws, request)
        })
        break

      case '/write-experiment':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssWriteExperiment.handleUpgrade(request, socket, head, (ws) => {
          wssWriteExperiment.emit('connection', ws, request)
        })
        break

      case '/scale-data':
        console.log(`Creating websocket server to handle ${pathname}`)
        wssScaleData.handleUpgrade(request, socket, head, (ws) => {
          wssScaleData.emit('connection', ws, request)
        })
        break

      default:
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
