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

open(argv.device)
