import yargs from 'yargs'

import { createServer } from './websocketServer'

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

export interface ScaleConfig {
  device: string;
  baudRate: 1200 | 2400 | 4800 | 9600;
  dataBits: 7 | 8;
  bitParity: 'none' | 'even' | 'odd';
}

const scaleConfig = {
  device: argv.device,
  baudRate: argv.baudRate,
  dataBits: argv.dataBits,
  bitParity: argv.bitParity,
} as ScaleConfig


createServer(argv.port, scaleConfig)
