import https from 'https'
import http from 'http'
import url from 'url'
import * as WebSocket from 'ws'

import {
  open,
  subscribe,
  requestBalance,
} from './serial'

import {
  getRootDir,
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

type Resp = {
  status: Status;
  data?: ExperimentWrapper | Array<ExperimentWrapper> | Array<string> | string;
  message?: string;
}


function createServer(
  port: number,
  scaleConfig: ScaleConfig,
  keyPath?: string,
  certPath?: string,
): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer()
    // different webSocket servers for different actions
    const wssGetRootDir = new WebSocket.Server({ noServer: true })
    const wssListExperiments = new WebSocket.Server({ noServer: true })
    const wssGetExperiment = new WebSocket.Server({ noServer: true })
    const wssListPaths = new WebSocket.Server({ noServer: true })
    const wssWriteExperiment = new WebSocket.Server({ noServer: true })
    const wssScaleData = new WebSocket.Server({ noServer: true })

    wssGetRootDir.on('connection', (ws) => {
      ws.on('message', () => {
        getRootDir()
          .then((path) => {
            ws.send(JSON.stringify({
              status: Status.OK,
              data: path,
            } as Resp))
          })
          .catch((error) => {
            ws.send(JSON.stringify({
              status: Status.FAIL,
              message: error.toString(),
            } as Resp))
            console.log(`getting root dir resulted in error ${error}`)
          })
      })
    })
    wssListExperiments.on('connection', (ws) => {
      ws.on('message', (data) => {
        try {
          const parsed = JSON.parse(data as string)
          listExperiments(parsed)
            .then((wrappedExperiments) => {
              ws.send(JSON.stringify({
                status: Status.OK,
                data: wrappedExperiments,
              } as Resp))
            })
            .catch((error) => {
              ws.send(JSON.stringify({
                status: Status.FAIL,
                message: error.toString(),
              } as Resp))
              console.log(`listExperiments resulted in error: ${error} when given query:`)
              console.log(parsed)
            })
        } catch (error) {
          ws.send(JSON.stringify({
            status: Status.FAIL,
            message: error.toString(),
          } as Resp))
          console.log(error)
        }
      })
    })
    wssGetExperiment.on('connection', (ws) => {
      ws.on('message', (data) => {
        try {
          const path: string = data as string
          getExperiment(path)
            .then((wrappedExperiment) => {
              ws.send(JSON.stringify({
                status: Status.OK,
                data: wrappedExperiment,
              } as Resp))
            })
            .catch((error) => {
              ws.send(JSON.stringify({
                status: Status.FAIL,
                message: error.toString(),
              } as Resp))
              console.log(`getExperiment on path ${path} resulted in error ${error}`)
            })
        } catch (error) {
          ws.send(JSON.stringify({
            status: Status.FAIL,
            message: error.toString(),
          } as Resp))
          console.log(error)
        }
      })
    })
    wssListPaths.on('connection', (ws) => {
      ws.on('message', (data) => {
        try {
          const parsed: any = JSON.parse(data as string)
          listExperimentPaths(parsed)
            .then((paths) => {
              ws.send(JSON.stringify({
                status: Status.OK,
                data: paths,
              } as Resp))
            })
            .catch((error) => {
              ws.send(JSON.stringify({
                status: Status.FAIL,
                message: error.toString()
              } as Resp))
              console.log(`listExperimentPaths resulted in error: ${error} when given query:`)
              console.log(parsed)
            })
        } catch (error) {
          ws.send(JSON.stringify({
            status: Status.FAIL,
            message: error.toString(),
          } as Resp))
          console.log(error)
        }
      })
    })
    wssWriteExperiment.on('connection', (ws) => {
      ws.on('message', (data) => {
        try {
          const parsed = JSON.parse(data as string)
          if (parsed.path && parsed.data) {
            // await valid(JSON.parse(parsed.data as string))
            writeExperiment(parsed)
              .then(() => {
                ws.send(JSON.stringify({
                  status: Status.OK,
                  message: `Saved experiment at ${parsed.path}`,
                } as Resp))
                console.log(`==Saved the following object at ${parsed.path}`)
                console.log(parsed.data)
              })
              .catch((error) => {
                ws.send(JSON.stringify({
                  status: Status.FAIL,
                  message: error.toString(),
                } as Resp))
                console.log(error)
              })
          } else {
            ws.send(JSON.stringify({
              status: Status.FAIL,
              message: 'Need both a path and data'
            } as Resp))
            console.log('==Passed object is missing either a path or data field')
            console.log(parsed)
          }
        } catch (error) {
          ws.send(JSON.stringify({
            status: Status.FAIL,
            message: error.toString(),
          } as Resp))
          console.log('==Do not write badly formatted object to disk')
          console.log(error)
        }
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
      if (pathname === '/get-root-dir') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssGetRootDir.handleUpgrade(request, socket, head, (ws) => {
          wssGetRootDir.emit('connection', ws, request)
        })
      } else if (pathname === '/list-experiments') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssListExperiments.handleUpgrade(request, socket, head, (ws) => {
          wssListExperiments.emit('connection', ws, request)
        })
      } else if (pathname === '/get-experiment') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssGetExperiment.handleUpgrade(request, socket, head, (ws) => {
          wssGetExperiment.emit('connection', ws, request)
        })
      } else if (pathname === '/list-experiment-paths') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssListPaths.handleUpgrade(request, socket, head, (ws) => {
          wssListPaths.emit('connection', ws, request)
        })
      } else if (pathname === '/write-experiment') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssWriteExperiment.handleUpgrade(request, socket, head, (ws) => {
          wssWriteExperiment.emit('connection', ws, request)
        })
      } else if (pathname === '/scale-data') {
        console.log(`Creating websocket server to handle ${pathname}`)
        wssScaleData.handleUpgrade(request, socket, head, (ws) => {
          wssScaleData.emit('connection', ws, request)
        })
      } else {
        console.log('Request is not a valid path, destroying socket')
        socket.destroy()
      }
    })
    server.listen(port)

    resolve(server)
  })
}

export {
  createServer,
  Resp,
  Status,
}
