import {
  Set,
} from 'immutable'

import SerialPort from 'serialport'

import {
  open,
  write,
  subscribe,
  subscribeOnce,
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
        break

      case ActionReply.CHANGED_UNITS:
        break

      default:
        dataCallback(parsedData)
        break
    }
  })
}

function disconnectFromScale(): void {

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
