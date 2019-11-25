import { promises as fs } from 'fs'
import path from 'path'
import * as os from 'os'

import _ from 'lodash'
import Joi from '@hapi/joi'

// workaround for a recursive type definition
// eq to: type SubLabel = [string, Array<string | SubLabel>]
type SubLabel = [string, Array<string | SubLabelArray>]
interface SubLabelArray extends Array<SubLabel> { }

interface Session {
  [key: string]: number;
}

interface Cage {
  cageWeight: number;
  cageLabel: string;
  sessions: Array<Session>;
}

interface Experiment {
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
interface ExperimentWrapper {
  path: string;
  data: Experiment;
}

// TODO [2020-02-01] (wimmeldj): figure out how to ensure the usb drive is mounted to same path
const ROOT_PATH = `/media/${os.userInfo().username}/test_usb/SCALE_INTERFACE_DAT`

function getRootDir(): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    if (ROOT_PATH) resolve(ROOT_PATH)
    reject(new Error('Root path not available'))
  })
}

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .pattern(/^[^_]*$/) // anything but an underscore
    .required(),
  primaryExperimenter: Joi.string()
    .min(1)
    .pattern(/^[^_]*$/)
    .required(),
  dateInitialized: Joi.number()
    .integer()
    .greater(+new Date('2019'))
    .required(),
  lastUpdated: Joi.number()
    .integer()
    .greater(+new Date('2019'))
    .required(),
  isComplete: Joi.boolean()
    .required(),
  totalSessions: Joi.number()
    .integer()
    .greater(0)
    .required(),
  totalColsBegin: Joi.number()
    .integer()
    .required(),
  totalColsMid: Joi.number()
    .integer()
    .required(),
  totalColsEnd: Joi.number()
    .integer()
    .required(),
  subSessionLabelsBegin: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsBegin'),
    ),
  subSessionLabelsMid: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsMid'),
    ),
  subSessionLabelsEnd: Joi.array()
    .items(
      Joi.string(),
      Joi.link('/subSessionLabelsEnd'),
    ),
  cages: Joi.array().items(
    Joi.object({
      cageWeight: Joi.number().required(),
      cageLabel: Joi.string().required(),
      sessions: Joi.array()
        .items(Joi.object({}).pattern(/./, Joi.number()))
        .max(Joi.ref('/totalSessions')),
    }),
  ),
})

/**
 * uses Joi to validate form of data.
 * @param data
 */
async function valid(data: any): Promise<void> {
  if (!data) throw new Error('==Data sent to valid() is null')

  return schema.validateAsync(data)
}

/**
 * @param searchPath
 * @return experiment object parsed from file at absolute path
 */
async function getExperiment(searchPath: string): Promise<ExperimentWrapper> {
  const normalized = path.normalize(searchPath)
  const data = await fs.readFile(normalized, { encoding: 'UTF-8' }) as string
  const parsed: any = JSON.parse(data)
  await valid(parsed)
  return {
    path: normalized,
    data: parsed as Experiment,
  } as ExperimentWrapper
}


async function listExperiments(query: { path: string; filter: null | Experiment }):
  Promise<Array<ExperimentWrapper>> {
  if (!query.path) throw new Error('No query path provided')

  const allFiles: Array<string | Buffer> = await fs.readdir(
    query.path,
    { encoding: 'UTF-8' },
  )

  const experiments = []
  for (const experimentPath of allFiles) {
    const wrappedExperiment = await getExperiment(path.join(query.path, experimentPath as string))
    if (!query.filter) experiments.push(wrappedExperiment)
    if (query.filter
      && _.isMatch(wrappedExperiment.data, query.filter)) experiments.push(wrappedExperiment)
  }

  return experiments
}


// //////////////////////////////////////////////////////////////////////////////////////////
//  experiment file names:                                                                //
//  to make certain operations quicker, we can encode certain information in file names   //
//  so that we don't have to open an experiment file to test whether it matches a query.  //
//                                                                                        //
//  Proposed format:                                                                      //
//  <experimentName>_<dateInitialized>_<primaryExperimenter>                              //
//                                                                                        //
// We should also store active experiments in an /active dir and archived experiments in  //
// a /archive dir                                                                         //
// //////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param query
 * @return a list of file paths matching query
 */
async function listExperimentPaths(query: {
  path: string;
  experimentName: string;
  primaryExperimenter: string;
  dateStart: Date;
  dateEnd: Date;
}): Promise<Array<string | Buffer>> {
  if (!query.path) throw new Error('No path provided')

  let paths: Array<string | Buffer> = await fs.readdir(query.path, { encoding: 'UTF-8' })

  if (query.dateStart && query.dateEnd) {
    paths = paths.filter((path) => {
      path = path as string
      const dateMatch = /_\d{13}_/.exec(path)
      if (!dateMatch) throw new Error(`File at path: ${query.path}/${path} has improperly formmatted name`)
      else {
        const date = new Date(Number(dateMatch[1]))
        // filter date if not within range
        return date >= query.dateStart && date <= query.dateEnd
      }
    })
  }

  paths = paths.filter((path) => {
    const experimentName: string = query.experimentName ? query.experimentName : ''
    const primaryExperimenter: string = query.primaryExperimenter ? query.primaryExperimenter : ''
    path = path as string
    const lMatch = /^(.*?)_/.exec(path)
    const rMatch = /_([^_]*?)$/.exec(path)
    if (!lMatch || !rMatch) throw new Error(`File at path: ${query.path}/${path} has improperly formmatted name`)
    else {
      return lMatch[1].includes(experimentName)
        && rMatch[1].includes(primaryExperimenter)
    }
  })
  return paths
}


/**
 * simply writes stringified experiment json to file at path.
 * @param wrapped
 */
function writeExperiment(wrapped: { path: string; data: Experiment }): Promise<void> {
  return new Promise((resolve, reject) => {
    // validate file path
    const lMatch = /^.*?_/.exec(wrapped.path)
    const rMatch = /_[^_]*?$/.exec(wrapped.path)
    const dateMatch = /_\d{13}_/.exec(wrapped.path)
    /* eslint-disable curly, nonblock-statement-body-position */
    if (!lMatch || !rMatch || !dateMatch)
      reject(new Error(`Attempted to write experiment data with invalid path name: ${wrapped.path}`))
    /* eslint-enable curly, nonblock-statement-body-position */
    valid(wrapped.data)
      .then(() => resolve(fs.writeFile(wrapped.path, JSON.stringify(wrapped.data))))
  })
}

export {
  getRootDir,
  valid,
  listExperiments,
  listExperimentPaths,
  getExperiment,
  writeExperiment,
  ExperimentWrapper,
  Experiment,
}
