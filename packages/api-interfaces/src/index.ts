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

export interface Response {
  status: Status;
  data?: ExperimentWrapper | Array<ExperimentWrapper> | Array<string> | string;
  message?: string;
}

const getRootDirEndpoint = '/get-root-dir'

export interface GetRootDirResponse extends Response {
  status: Status;
  data: string;
}

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

const listExperimentsEndpoint = '/list-experiments'

export interface ListExperimentsOptions {
  path: string;
  filter: null | Experiment;
}

export interface ListExperimentsResponse extends Response {
  status: Status;
  data?: Array<ExperimentWrapper>;
  message?: string;
}

const getExperimentEndpoint = '/get-experiment'

export interface GetExperimentOptions {
  path: string;
}

export interface GetExperimentResponse extends Response {
  status: Status;
  data?: ExperimentWrapper;
  message?: string;
}

const listExperimentPathsEndpoint = '/list-experiment-paths'

export interface ListExperimentPathsOptions {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ListExperimentPathsResponse extends Response {
  status: Status;
  data?: Array<string>;
  message?: string;
}

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

const writeExperimentEndpoint = '/write-experiment'

export type Unit = 'g' | 'pc' | '%' | 'oz' | 'lb' | 'ozt' | 'ct' | 'momme' | 'dwt' | 'grain' | 'tael'

export interface WriteExperimentOptions {
  path: string;
  data: Experiment;
}

export interface WriteExperimentResponse extends Response {
  status: Status;
  message?: string;
}

const scaleDataEndpoint = '/scale-data'


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
  scaleDataEndpoint
}
