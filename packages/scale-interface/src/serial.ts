import {
  promisify,
} from 'util'

import once from 'events.once'
import SerialPort from 'serialport'

const {
  Readline,
} = SerialPort.parsers

type PortWrite = (arg1: string | number[] | Buffer) => Promise<number>
type PortClose = () => Promise<void>

let serialPort: {
  port: SerialPort;
  parser: SerialPort.parsers.Readline;
  portWrite: PortWrite;
  portClose: PortClose;
} | null = null
let portCloseError: Error | null = null

function open(path: string, options: SerialPort.OpenOptions = {}): Promise<void> {
  if (serialPort !== null) {
    throw new Error('Port is already open')
  }

  // Create port
  const port = new SerialPort(path, {
    ...options,
    autoOpen: false,
  })
  const portOpen = promisify(port.open)
  const portWrite = promisify(port.write)
  const portClose = promisify(port.close)

  portCloseError = null

  // Handle port close
  port.on('close', (error) => {
    portCloseError = error
    serialPort = null
  })

  // Create parser
  const parser = port.pipe(new Readline({
    delimiter: '\r\n',
  }))

  serialPort = { port, parser, portWrite, portClose }

  // Open port
  return portOpen()
}

function subscribe(callback: (data: string) => void): void {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort
  parser.on('data', callback)
}

function subscribeOnce(): Promise<string> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort
  // `as unknown` required due to unusual type cast
  return once(parser, 'data') as unknown as Promise<string>
}

function write(data: string): Promise<number> {
  if (serialPort === null) {
    if (portCloseError) {
      throw portCloseError
    } else {
      throw new Error('Port is not open')
    }
  }
  const {
    portWrite,
  } = serialPort

  return portWrite(data)
}

async function close(): Promise<void> {
  if (serialPort !== null) {
    const {
      portClose,
    } = serialPort

    await portClose()
    serialPort = null
  }
}

export {
  open,
  subscribe,
  subscribeOnce,
  write,
  close,
}
