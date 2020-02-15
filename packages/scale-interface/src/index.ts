import { init as sentryInit } from '@sentry/node'
import yargs from 'yargs'

import { createServer } from './websocketServer'

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


const scaleConfig = {
  device: argv.device,
  baudRate: argv.baudRate,
  dataBits: argv.dataBits,
  parity: argv.bitParity,
}


createServer(argv.port, scaleConfig)
