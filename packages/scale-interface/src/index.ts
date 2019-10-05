import yargs from 'yargs'

import {
  open,
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

const {
  device,
  'baud-rate': baudRate,
  'data-bits': dataBits,
  'bit-parity': bitParity,
} = argv as {
  device: string;
  'baud-rate': 1200 | 2400 | 4800 | 9600;
  'data-bits': 7 | 8;
  'bit-parity': 'none' | 'even' | 'odd';
}

open(device, {
  baudRate,
  dataBits,
  parity: bitParity,
})
