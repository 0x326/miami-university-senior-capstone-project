import { init as sentryInit } from '@sentry/node'
import yargs from 'yargs'

import {
  open,
} from './serial'

import { createServer } from './webSocketServer'

const {
  SENTRY_DSN,
} = process.env

if (process.env.NODE_ENV === 'production' && SENTRY_DSN !== undefined) {
  sentryInit({
    dsn: `https://${SENTRY_DSN}@sentry.io/1830093`,
  })
}

const {
  argv,
} = yargs
  .option('device', {
    description: 'Serial device to scale',
    type: 'string',
    demandOption: true,
    default: 'COM5',//''/dev/ttyUSB0',
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
  port,
} = argv as {
  device: string;
  'baud-rate': 1200 | 2400 | 4800 | 9600;
  'data-bits': 7 | 8;
  'bit-parity': 'none' | 'even' | 'odd';
  port: number;
}

open(device, {
  baudRate,
  dataBits,
  parity: bitParity,
})
  .then(() => {
    console.log('Scale connected')
  })
  .then(() => createServer(port))
