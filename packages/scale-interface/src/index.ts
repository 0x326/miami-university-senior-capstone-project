import https from 'https'
import http from 'http'
import url from 'url'
import yargs from 'yargs'
import ws from 'ws'

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
  valid,
} from './fsOperations'

// import { Http2Server } from 'http2';

const {
  argv,
} = yargs
  .option('device', {
    description: 'Serial device to scale',
    type: 'string',
    demandOption: true,
    default: '/dev/ttyUSB0',
  })
  .option('baud-rate', {
    description: 'Device baud rate',
    type: 'number',
    demandOption: true,
    default: 9600,
    choices: [
      1200,
      2400,
      4800,
      9600,
    ],
  })
  .option('data-bits', {
    description: 'Number of device data bits',
    type: 'number',
    demandOption: true,
    default: 7,
    choices: [
      7,
      8,
    ],
  })
  .option('bit-parity', {
    description: 'Parity used by device',
    type: 'string',
    demandOption: true,
    default: 'even',
    choices: [
      'none',
      'even',
      'odd',
    ],
  })
  .option('port', {
    description: 'Websocket port',
    type: 'number',
    demandOption: true,
    default: 8080,
  })


const {
  device,
  'baud-rate': baudRate,
  'data-bits': dataBits,
  'bit-parity': bitParity,
  'port': webSocketPort,
} = argv as {
  device: string;
  'baud-rate': 1200 | 2400 | 4800 | 9600;
  'data-bits': 7 | 8;
  'bit-parity': 'none' | 'even' | 'odd';
  'port': number;
}

async function createServer(
  port: number,
  keyPath?: string,
  certPath?: string
): Promise<http.Server> {
  return new Promise<http.Server>(async (resolve, reject) => {
    const server = http.createServer()
    // different webSocket servers for different actions
    const wssGetRootDir = new ws.Server({ noServer: true })
    const wssListExperiments = new ws.Server({ noServer: true })
    const wssGetExperiment = new ws.Server({ noServer: true })
    const wssListPaths = new ws.Server({ noServer: true })
    const wssWriteExperiment = new ws.Server({ noServer: true })
    const wssScaleData = new ws.Server({ noServer: true })

    wssGetRootDir.on('connection', ws => {
      ws.on('message', () => {
        getRootDir()
          .then((path) => ws.send(path))
          .catch(error => {
            ws.send('FAIL')
            console.log(`getting root dir resulted in error ${error}`)
          })
      })
    })
    wssListExperiments.on('connection', ws => {
      ws.on('message', data => {
        try {
          const parsed = JSON.parse(data as string)
          listExperiments(parsed)
            .then(experiments => {
              ws.send(JSON.stringify(experiments))
            })
            .catch(error => {
              ws.send('FAIL')
              console.log(`listExperiments resulted in error: ${error} when given query:`)
              console.log(parsed)
            })
        } catch (error) {
          ws.send('FAIL')
          console.log(error)
        }
      })
    })
    wssGetExperiment.on('connection', ws => {
      ws.on('message', data => {
        try {
          const arg1: string = data as string
          getExperiment(arg1)
            .then(wrappedExperiment => {
              ws.send(JSON.stringify(wrappedExperiment))
            })
            .catch(error => {
              ws.send('FAIL')
              console.log(`getExperiment on path ${arg1} resulted in error ${error}`)
            })
        } catch (error) {
          ws.send('FAIL')
          console.log(error)
        }
      })
    })
    wssListPaths.on('connection', ws => {
      ws.on('message', data => {
        try {
          const parsed = JSON.parse(data as string)
          listExperimentPaths(parsed)
            .then(paths => {
              ws.send(JSON.stringify(paths))
            })
            .catch(error => {
              ws.send('FAIL')
              console.log(`listExperimentPaths resulted in error: ${error} when given query:`)
              console.log(parsed)
            })
        } catch (error) {
          ws.send('FAIL')
          console.log(error)
        }
      })
    })
    wssWriteExperiment.on('connection', ws => {
      ws.on('message', async data => {
        try {
          const parsed = JSON.parse(data as string)
          if (parsed.path && parsed.data) {
            await valid(parsed.data)
            writeExperiment(parsed)
              .then(() => {
                ws.send('OK')
                console.log(`==Saved the following object at ${parsed.path}`)
                console.log(parsed.data)
              })
              .catch(error => {
                ws.send('FAIL')
                console.log(`Got error when writing valid experiment to disk: ${error}`)
              })
          }
          else {
            ws.send('FAIL')
            console.log('==Passed object is missing either a path or data field')
            console.log(parsed)
          }
        } catch (error) {
          ws.send('FAIL')
          console.log('==Do not write badly formatted object to disk')
          console.log(error)
        }
      })
    })
    // TODO: send data to web whenever it comes in
    wssScaleData.on('connection', ws => {
      // Promise.all([
      //   deviceConnected
      //     .then(() => subscribe())
      //     .then(async (iterator) => {
      //       for await (const data of iterator) {
      //         console.log('Received data', data)
      //       }
      //     }),

      //   deviceConnected
      //     .then(() => setInterval(() => {
      //       requestBalance()
      //         .then((data) => console.log('Received data (by request)', data))
      //     }, 1000)),
      // ])
      //   .catch((error) => console.error('Error while interacting with scale', error))
    })

    server.on('upgrade', (request, socket, head) => {
      const pathname = url.parse(request.url).pathname
      console.log(`Request for ${pathname}`)
      if (pathname === '/get-root-dir') {
        wssGetRootDir.handleUpgrade(request, socket, head, ws => {
          wssGetRootDir.emit('connection', ws, request)
        })
      }
      if (pathname === '/list-experiments') {
        wssListExperiments.handleUpgrade(request, socket, head, ws => {
          wssListExperiments.emit('connection', ws, request)
        })
      } else if (pathname === '/get-experiment') {
        wssGetExperiment.handleUpgrade(request, socket, head, ws => {
          wssGetExperiment.emit('connection', ws, request)
        })
      } else if (pathname === '/list-experiment-paths') {
        wssListPaths.handleUpgrade(request, socket, head, ws => {
          wssListPaths.emit('connection', ws, request)
        })
      } else if (pathname === '/write-experiment') {
        wssWriteExperiment.handleUpgrade(request, socket, head, ws => {
          wssWriteExperiment.emit('connection', ws, request)
        })
      } else if (pathname === '/scale-data') {
        wssScaleData.handleUpgrade(request, socket, head, ws => {
          wssScaleData.emit('connection', ws, request)
        })
      } else {
        socket.destroy()
      }
    })
    server.listen(port)


    resolve(server)
  })
}

// const deviceConnected = open(device, {
//   baudRate,
//   dataBits,
//   parity: bitParity,
// })
//   .then(() => console.log('Scale connected'))

createServer(webSocketPort)
