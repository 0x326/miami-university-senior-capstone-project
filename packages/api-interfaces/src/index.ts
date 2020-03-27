import {
  GetExperimentEndpoint,
  GetExperimentOptions,
  GetExperimentResponse,
} from './get-experiment'

import {
  GetRootDirEndpoint,
  GetRootDirOptions,
  GetRootDirResponse,
} from './get-root-dir'

import {
  ListExperimentPathsEndpoint,
  ListExperimentPathsOptions,
  ListExperimentPathsResponse,
} from './list-experiment-paths'

import {
  ListExperimentsEndpoint,
  ListExperimentsOptions,
  ListExperimentsResponse,
} from './list-experiments'

import {
  ScaleDataEndpoint,
} from './scale-data'

import {
  WriteExperimentEndpoint,
  WriteExperimentOptions,
  WriteExperimentResponse,
} from './write-experiment'

export type Endpoint = GetExperimentEndpoint
  | GetRootDirEndpoint
  | ListExperimentPathsEndpoint
  | ListExperimentsEndpoint
  | ScaleDataEndpoint
  | WriteExperimentEndpoint

export type EndpointOptions = GetExperimentOptions
  | GetRootDirOptions
  | ListExperimentPathsOptions
  | ListExperimentsOptions
  | WriteExperimentOptions

export type EndpointResponse = GetExperimentResponse
| GetRootDirResponse
| ListExperimentPathsResponse
| ListExperimentsResponse
| WriteExperimentResponse
