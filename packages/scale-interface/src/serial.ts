import {
  promisify,
} from 'util'

import SerialPort from 'serialport'

const {
  Readline,
} = SerialPort.parsers

let port: SerialPort | null = null
let portWrite: (arg1: string | number[] | Buffer) => Promise<number> | null = null
let portClose: () => Promise<void> | null = null
let parser: SerialPort.parsers.Readline | null = null
let portCloseError: Error | null = null

function open(path: string, options: SerialPort.OpenOptions = {}): Promise<void> {
  if (port !== null) {
    throw new Error('Port is already open')
  }

  // Create port
  port = new SerialPort(path, {
    ...options,
    autoOpen: false,
  })
  const portOpen = promisify(port.open)
  portWrite = promisify(port.write)
  portClose = promisify(port.close)

  portCloseError = null

  // Handle port close
  port.on('close', (error) => {
    portCloseError = error
    port = null
    parser = null
  })

  // Create parser
  parser = port.pipe(new Readline({
    delimiter: '\r\n',
  }))

  // Open port
  return portOpen()
}

function subscribe(callback: (data: string) => void): void {
  if (port === null) {
    throw new Error('Port is not open')
  }

  parser.on('data', callback)
}

function write(data: string): Promise<number> {
  if (port === null) {
    if (portCloseError) {
      throw portCloseError
    } else {
      throw new Error('Port is not open')
    }
  }

  return portWrite(data)
}

async function close(): Promise<void> {
  await portClose()

  port = null
  parser = null
}

export {
  open,
  subscribe,
  write,
  close,
}
