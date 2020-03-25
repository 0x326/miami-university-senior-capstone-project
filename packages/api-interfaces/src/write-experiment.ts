import {
  Response,
  Experiment,
} from './common'

export type WriteExperimentEndpoint = '/write-experiment'
export const writeExperimentEndpoint: WriteExperimentEndpoint = '/write-experiment'

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

export interface WriteExperimentResponse extends Response<null> {}
