export interface Cage {
  cageWeight: number;
  cageLabel: string;
  sessions: Array<Session>;
}

export interface Session {
  [key: string]: number;
}

export enum Status {
  OK = 'OK',
  FAIL = 'FAIL'
}

export interface Response<Data> {
  status: Status;
  data: Data;
  message?: string;
}

export type GetRootDirEndpoint = '/get-root-dir'
const getRootDirEndpoint: GetRootDirEndpoint = '/get-root-dir'

export interface GetRootDirResponse extends Response<string> {}

export interface Experiment {
  name: string;
  primaryExperimenter: string;
  dateInitialized: number;
  lastUpdate: number;
  isComplete: boolean;
  totalSessions: number;
  totalColsBegin: number;
  totalColsMid: number;
  totalColsEnd: number;
  subSessionLabelsBegin: Array<string | SubLabel>;
  subSessionLabelsMid: Array<string | SubLabel>;
  subSessionLabelsEnd: Array<string | SubLabel>;
  cages: Array<Cage>;
}

// wraps an experiment to provide the path of the file it was read from
export interface ExperimentWrapper {
  path: string;
  data: Experiment;
}

export type ListExperimentsEndpoint = '/list-experiments'
const listExperimentsEndpoint: ListExperimentsEndpoint = '/list-experiments'

export interface ListExperimentsOptions {
  path: string;
  filter: null | Experiment;
}

export interface ListExperimentsResponse extends Response<Array<ExperimentWrapper>> {}

export type GetExperimentEndpoint = '/get-experiment'
const getExperimentEndpoint: GetExperimentEndpoint = '/get-experiment'

export interface GetExperimentOptions {
  path: string;
}

export interface GetExperimentResponse extends Response<ExperimentWrapper> {}

export type ListExperimentPathsEndpoint = '/list-experiment-paths'
const listExperimentPathsEndpoint: ListExperimentPathsEndpoint = '/list-experiment-paths'

export interface ListExperimentPathsOptions {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ListExperimentPathsResponse extends Response<Array<string>> {}

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

// workaround for a recursive type definition
// eq to: type SubLabel = [string, Array<string | SubLabel>]
type SubLabel = [string, Array<string | SubLabelArray>]
interface SubLabelArray extends Array<SubLabel> { }

export type WriteExperimentEndpoint = '/write-experiment'
const writeExperimentEndpoint: WriteExperimentEndpoint = '/write-experiment'

export type Unit = 'g' | 'pc' | '%' | 'oz' | 'lb' | 'ozt' | 'ct' | 'momme' | 'dwt' | 'grain' | 'tael'

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

export interface WriteExperimentResponse extends Response<null> {}

export type ScaleDataEndpoint = '/scale-data'
const scaleDataEndpoint: ScaleDataEndpoint = '/scale-data'


// Copy the contents of Measurement and other undefined interfaces into here
// so that we don't depend on Node.js-only components
export interface ScaleData extends Measurement {
  type: MeasurementType;
  value: number;
  unit: Unit;
}

export {
  getRootDirEndpoint,
  listExperimentsEndpoint,
  getExperimentEndpoint,
  listExperimentPathsEndpoint,
  writeExperimentEndpoint,
  scaleDataEndpoint,
}
