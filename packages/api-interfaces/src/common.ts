export enum Status {
  OK = 'OK',
  FAIL = 'FAIL'
}

export interface Request<Options> {
  options: Options;
}

export interface Response<Data> {
  status: Status;
  data: Data | null;
  message?: string;
}

// workaround for a recursive type definition
// eq to: type SubLabel = [string, Array<string | SubLabel>]
type SubLabel = [string, Array<string | SubLabelArray>]
interface SubLabelArray extends Array<SubLabel> { }

export interface Session {
  [key: string]: number;
}

export interface Cage {
  cageWeight: number;
  cageLabel: string;
  sessions: Array<Session>;
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
