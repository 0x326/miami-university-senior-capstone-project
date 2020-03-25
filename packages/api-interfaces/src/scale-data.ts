import {

} from './common'

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

export type ScaleDataEndpoint = '/scale-data'
export const scaleDataEndpoint: ScaleDataEndpoint = '/scale-data'

export interface ScaleData extends Measurement {
  type: MeasurementType;
  value: number;
  unit: Unit;
}
