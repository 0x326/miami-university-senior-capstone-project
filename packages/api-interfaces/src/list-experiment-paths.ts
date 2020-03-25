import {
  Response,
} from './common'

export type ListExperimentPathsEndpoint = '/list-experiment-paths'
export const listExperimentPathsEndpoint: ListExperimentPathsEndpoint = '/list-experiment-paths'

export interface ListExperimentPathsOptions {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ListExperimentPathsResponse extends Response<Array<string>> {}
