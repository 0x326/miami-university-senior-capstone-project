import {
  ExperimentWrapper,
} from './common'

export type GetExperimentEndpoint = '/get-experiment'
export const getExperimentEndpoint: GetExperimentEndpoint = '/get-experiment'

export interface GetExperimentOptions {
  path: string;
}

export type GetExperimentResponse = ExperimentWrapper | null
