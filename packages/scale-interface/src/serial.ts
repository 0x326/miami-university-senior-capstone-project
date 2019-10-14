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

async function* subscribe(): AsyncIterable<string> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort

  for await (const data of parser) {
    yield data
  }
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

enum ActionReply {
  ZEROED_BALANCE,
  CHANGED_UNITS,
}

enum MeasurementType {
  STABLE_WEIGHT = 'ST',
  STABLE_COUNTING = 'QT',
  UNSTABLE_WEIGHT = 'US',
  OUT_OF_RANGE = 'OL',
}

interface Measurement {
  type: MeasurementType;
  value: number;
  unit: Unit;
}

type Unit = 'g' | 'pc' | '%' | 'oz' | 'lb' | 'ozt' | 'ct' | 'momme' | 'dwt' | 'grain' | 'tael'

function parse(data: string): Measurement | ActionReply {
  if (data === 'Z') {
    return ActionReply.ZEROED_BALANCE
  }
  if (data === 'U') {
    return ActionReply.CHANGED_UNITS
  }

  const [header, measurement] = data
    .toUpperCase()
    .split(',')
  const measurementData = measurement.slice(0, -3)
  const measurementUnit = measurement.slice(-3)
    .trim()
    .toLowerCase()

  let measurementType: MeasurementType
  switch (header) {
    case 'ST':
      measurementType = MeasurementType.STABLE_WEIGHT
      break

    case 'QT':
      measurementType = MeasurementType.STABLE_COUNTING
      break

    case 'US':
      measurementType = MeasurementType.UNSTABLE_WEIGHT
      break

    case 'OL':
      measurementType = MeasurementType.OUT_OF_RANGE
      break

    default:
      throw new Error(`${header} is not a valid header`)
  }

  switch (measurementUnit) {
    case 'g':
    case 'pc':
    case '%':
    case 'oz':
    case 'lb':
    case 'ozt':
    case 'ct':
    case 'mom':
    case 'dwt':
    case 'gn':
    case 'tl':
      break

    default:
      throw new Error(`${measurementUnit} is not a recognized unit`)
  }

  return {
    type: measurementType,
    value: Number(measurementData),
    unit: measurementUnit as Unit,
  }
}

async function* connectToScale(
  path: string,
  options: SerialPort.OpenOptions = {},
): AsyncIterable<Measurement> {
  await open(path, options)

  for await (const data of subscribe()) {
    const parsedData = parse(data)
    switch (parsedData) {
      case ActionReply.ZEROED_BALANCE:
        break

      case ActionReply.CHANGED_UNITS:
        break

      default:
        yield parsedData
        break
    }
  }
}

function disconnectFromScale(): Promise<void> {
  return close()
}

async function listenForReply(type: ActionReply): Promise<void> {
  const data = await subscribeOnce()
  const reply = parse(data)
  if (reply === type) {
    return Promise.resolve()
  }

  // Wait for next data
  return listenForReply(type)
}

async function tareBalance(): Promise<void> {
  // There is a slight race condition here:
  // The listenForReply promise is created after the write-success and resume-promise events
  //   are handled by the event loop
  // In listenForReply, we start listening for the responding reply
  // In the case that the device responds and its corresponding data event is handled
  //   before the listenForReply promise is created,
  //   it will not resolve until an additional zeroed reply is received
  // However, there is nothing we can do about this because
  //   we cannot control what order the event loop processes events
  await write('Z')
  return listenForReply(ActionReply.ZEROED_BALANCE)
}

async function changeUnits(): Promise<void> {
  // Same race condition applies as in tareBalance()
  await write('U')
  return listenForReply(ActionReply.CHANGED_UNITS)
}

export {
  connectToScale,
  disconnectFromScale,
  tareBalance,
  changeUnits,
}
