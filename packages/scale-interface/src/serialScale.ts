import {
  Set,
} from 'immutable'

import SerialPort from 'serialport'

import {
  open,
  write,
  subscribe,
} from './serial'

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

  const measurementType = MeasurementType[header as keyof typeof MeasurementType]
  if (measurementType === undefined) {
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

type Resolve = (value?: void | PromiseLike<void>) => void
type Reject = (reason?: Error) => void
let zeroCommandPromises: Set<[Resolve, Reject]> = Set()
let changeUnitCommandPromises: Set<[Resolve, Reject]> = Set()

function resolvePromises(promises: Set<[Resolve, Reject]>): void {
  for (const [resolve] of promises) {
    resolve()
  }
}

function rejectPromises(promises: Set<[Resolve, Reject]>, error: Error): void {
  for (const [, reject] of promises) {
    reject(error)
  }
}

async function connectToScale(
  path: string,
  dataCallback: (data: Measurement) => void,
  options: SerialPort.OpenOptions = {},
): Promise<void> {
  await open(path, options)
  subscribe((data) => {
    const parsedData = parse(data)
    switch (parsedData) {
      case ActionReply.ZEROED_BALANCE:
        resolvePromises(zeroCommandPromises)
        zeroCommandPromises = zeroCommandPromises.clear()
        break

      case ActionReply.CHANGED_UNITS:
        resolvePromises(changeUnitCommandPromises)
        changeUnitCommandPromises = changeUnitCommandPromises.clear()
        break

      default:
        dataCallback(parsedData)
        break
    }
  })
}

function disconnectFromScale(): void {
  rejectPromises(zeroCommandPromises, new Error('Disconnected from scale'))
  rejectPromises(changeUnitCommandPromises, new Error('Disconnected from scale'))
  zeroCommandPromises = zeroCommandPromises.clear()
  changeUnitCommandPromises = changeUnitCommandPromises.clear()
}

function listenForReply(type: ActionReply): Promise<void> {
  return new Promise((resolve, reject): void => {
    switch (type) {
      case ActionReply.ZEROED_BALANCE:
        zeroCommandPromises = zeroCommandPromises.add([resolve, reject])
        break

      case ActionReply.CHANGED_UNITS:
        changeUnitCommandPromises = changeUnitCommandPromises.add([resolve, reject])
        break

      default:
        reject(new Error(`${type} is not a supported ActionReply`))
    }
  })
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
