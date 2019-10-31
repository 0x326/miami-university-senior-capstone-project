import yargs from 'yargs'
import ws from 'ws'

import {
  open,
  subscribe,
  requestBalance,
} from './serial'

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
  'port': websocketPort,
} = argv as {
  device: string;
  'baud-rate': 1200 | 2400 | 4800 | 9600;
  'data-bits': 7 | 8;
  'bit-parity': 'none' | 'even' | 'odd';
  'port': number;
}

const deviceConnected = open(device, {
  baudRate,
  dataBits,
  parity: bitParity,
})
  .then(() => console.log('Scale connected'))

async function createWebsocketServer(port: number, ): Promise<ws.Server> {
  const wss = new ws.Server({ port: port })
  wss.on('connection', (ws: any) => {
    ws.on('message', (message: any) => {
      console.log('received: %s', message);
    });

    ws.send('something');
  });
  return wss
}

Promise.all([
  deviceConnected
    .then(() => createWebsocketServer(websocketPort))
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
