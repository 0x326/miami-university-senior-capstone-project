import {
  PassThrough,
} from 'stream'

import {
  promisify,
} from 'util'

import SerialPort from 'serialport'

const {
  Readline,
} = SerialPort.parsers

type PortWrite = (arg1: string | number[] | Buffer) => Promise<number>
type PortClose = () => Promise<void>
type ParserOnce = () => {
  attachPromise: Promise<void>;
  dataPromise: Promise<string>;
}

let serialPort: {
  port: SerialPort;
  parser: SerialPort.parsers.Readline;
  portWrite: PortWrite;
  portClose: PortClose;
  parserOnce: ParserOnce;
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
  const portOpen = promisify(port.open.bind(port))
  const portWrite = promisify(port.write.bind(port)) as unknown as PortWrite
  const portClose = promisify(port.close.bind(port)) as unknown as PortClose

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

  const parserOnce: ParserOnce = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resolveAttach: (() => void) | any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rejectAttach: ((error: Error) => void) | any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resolveData: ((data: string) => void) | any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rejectData: ((error: Error) => void) | any

    const attachPromise: Promise<void> = new Promise((resolve, reject): void => {
      [resolveAttach, rejectAttach] = [resolve, reject]
    })
    const dataPromise: Promise<string> = new Promise((resolve, reject): void => {
      [resolveData, rejectData] = [resolve, reject]
    })

    try {
      parser.once('data', (data: string) => resolveData(data))
      parser.once('error', (error: Error) => rejectData(error))
      resolveAttach()
    } catch (error) {
      rejectAttach(error)
      rejectData(error)
    }

    return {
      attachPromise,
      dataPromise,
    }
  }

  serialPort = { port, parser, portWrite, portClose, parserOnce }

  // Open port
  return portOpen()
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

export enum ActionReply {
  ZEROED_BALANCE,
  CHANGED_UNITS,
}

export enum MeasurementType {
  STABLE_WEIGHT = 'ST',
  STABLE_COUNTING = 'QT',
  UNSTABLE_WEIGHT = 'US',
  OUT_OF_RANGE = 'OL',
}

export interface Measurement {
  type: MeasurementType;
  value: number;
  unit: Unit;
}

export type Unit = 'g' | 'pc' | '%' | 'oz' | 'lb' | 'ozt' | 'ct' | 'momme' | 'dwt' | 'grain' | 'tael'

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

function subscribe(includeActionReplies: true): AsyncGenerator<Measurement | ActionReply>
function subscribe(includeActionReplies?: false): AsyncGenerator<Measurement>
async function* subscribe(includeActionReplies = false): AsyncGenerator<Measurement | ActionReply> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort

  // Pipe into new stream to allow multiple users
  const parserCopy = new PassThrough()
  parser.pipe(parserCopy)

  // Set the stream to 'flowing' if it is not already
  setImmediate(() => parser.resume())
  for await (const data of parserCopy) {
    const parsedData = parse(data)
    switch (parsedData) {
      case ActionReply.ZEROED_BALANCE:
      case ActionReply.CHANGED_UNITS:
        if (includeActionReplies === true) {
          yield parsedData
        }
        break

      default:
        yield parsedData
        break
    }
  }
}

function subscribeOnce(includeActionReplies: true): Promise<Measurement | ActionReply>
function subscribeOnce(includeActionReplies?: false): Promise<Measurement>
async function subscribeOnce(includeActionReplies = false): Promise<Measurement | ActionReply> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
    parserOnce,
  } = serialPort
  const {
    attachPromise,
    dataPromise,
  } = parserOnce()

  await attachPromise
  // Set the stream to 'flowing' if it is not already
  parser.resume()
  const data = await dataPromise
  const parsedData = parse(data)
  switch (parsedData) {
    case ActionReply.ZEROED_BALANCE:
    case ActionReply.CHANGED_UNITS:
      if (includeActionReplies === false) {
        return subscribeOnce(includeActionReplies)
      }
      return parsedData

    default:
      return parsedData
  }
}

async function listenForReply(type: ActionReply): Promise<void> {
  const reply = await subscribeOnce(true)
  if (reply === type) {
    return Promise.resolve()
  }

  // Wait for next data
  return listenForReply(type)
}

async function requestBalance(): Promise<Measurement> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort

  // Pauses input stream
  parser.pause()
  await write('Q\r\n')
  return subscribeOnce()
}

async function tareBalance(): Promise<void> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort

  // Pauses input stream
  parser.pause()
  await write('Z\r\n')
  return listenForReply(ActionReply.ZEROED_BALANCE)
}

async function changeUnits(): Promise<void> {
  if (serialPort === null) {
    throw new Error('Port is not open')
  }

  const {
    parser,
  } = serialPort

  // Pauses input stream
  parser.pause()
  await write('U\r\n')
  return listenForReply(ActionReply.CHANGED_UNITS)
}

export {
  open,
  close,
  subscribe,
  subscribeOnce,
  requestBalance,
  tareBalance,
  changeUnits,
}
