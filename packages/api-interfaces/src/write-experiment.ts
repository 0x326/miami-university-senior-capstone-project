import {
  Experiment,
} from './common'

export type WriteExperimentEndpoint = '/write-experiment'
export const writeExperimentEndpoint: WriteExperimentEndpoint = '/write-experiment'

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

export type WriteExperimentResponse = null
