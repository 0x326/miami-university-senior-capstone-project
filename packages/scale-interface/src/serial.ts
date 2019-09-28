import SerialPort from 'serialport'

const {
  Readline,
} = SerialPort.parsers

let port: SerialPort | null = null
let parser: SerialPort.parsers.Readline | null = null
let portCloseError: Error | null = null

function open(path: string, options: SerialPort.OpenOptions = {}): Promise<void> {
  if (port === null) {
    throw new Error('Port is already open')
  }

  // Create port
  port = new SerialPort(path, {
    ...options,
    autoOpen: false,
  })
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
  return new Promise((resolve, reject): void => port.open((error): void => {
    if (error !== undefined) {
      reject(error)
    } else {
      resolve()
    }
  }))
}

function subscribe(callback: (data: string) => void): void {
  if (port === null) {
    throw new Error('Port is not open')
  }

  parser.on('data', callback)
}

function write(data: string): Promise<number> {
  return new Promise((resolve, reject): void => {
    if (port === null) {
      if (portCloseError) {
        reject(portCloseError)
      } else {
        reject(new Error('Port is not open'))
      }
      return
    }

    port.write(data, (error, bytesWritten) => {
      if (error !== undefined) {
        reject(error)
      } else {
        resolve(bytesWritten)
      }
    })
  })
}

async function close(): Promise<void> {
  await new Promise((resolve, reject): void => port.close((error) => {
    if (error !== undefined) {
      reject(error)
    } else {
      resolve()
    }
  }))

  port = null
  parser = null
}

export {
  open,
  subscribe,
  write,
  close,
}
