import {
  GetExperimentEndpoint,
} from './get-experiment'

import {
  GetRootDirEndpoint,
} from './get-root-dir'

import {
  ListExperimentPathsEndpoint,
} from './list-experiment-paths'

import {
  ListExperimentsEndpoint,
} from './list-experiments'

import {
  ScaleDataEndpoint,
} from './scale-data'

import {
  WriteExperimentEndpoint,
} from './write-experiment'

export type Endpoint = GetExperimentEndpoint
  | GetRootDirEndpoint
  | ListExperimentPathsEndpoint
  | ListExperimentsEndpoint
  | ScaleDataEndpoint
  | WriteExperimentEndpoint
