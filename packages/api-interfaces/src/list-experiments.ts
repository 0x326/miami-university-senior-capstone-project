import {
  Experiment,
  ExperimentWrapper,
} from './common'

export type ListExperimentsEndpoint = '/list-experiments'
export const listExperimentsEndpoint: ListExperimentsEndpoint = '/list-experiments'

export interface ListExperimentsOptions {
  path: string;
  filter: null | Experiment;
}

export type ListExperimentsResponse = Array<ExperimentWrapper>
