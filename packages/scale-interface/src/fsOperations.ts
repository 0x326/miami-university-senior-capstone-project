import path from 'path'

import _ from 'lodash'
import Joi from '@hapi/joi'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Experiment,
} from 'api-interfaces/dist/common'

import {
  readFile,
  readdir,
  writeFile,
} from './fs'

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

const rootPath = './SCALE_INTERFACE_DAT'

/**
 * uses Joi to validate form of data.
 * @param data
 */
function valid(data: Experiment): Experiment {
  const {
    value,
    error,
  } = schema.validate(data)

  if (error !== undefined) {
    throw error
  }

  return value
}

/**
 * @param searchPath
 * @return experiment object parsed from file at absolute path
 */
async function getExperiment(
  searchPath: string,
): Promise<Experiment> {
  const data = await readFile(searchPath, {
    encoding: 'utf-8',
    boundary: rootPath,
  })
  const parsed = valid(JSON.parse(String(data)))

  return parsed
}


async function listExperiments(
  query: {
    path: string;
    filter: null | Experiment;
  },
): Promise<Array<Experiment>> {
  const {
    path: filePath,
    filter,
  } = query

  const allFiles = await readdir(filePath, {
    encoding: 'utf-8',
    boundary: rootPath,
  })

  const experiments: Array<Experiment> = await Promise.all(allFiles
    .map((experimentPath) => getExperiment(path.join(filePath, experimentPath))))

  if (filter !== null) {
    return experiments.filter((experiment) => _.isMatch(experiment, filter))
  }

  return experiments
}

/**
 *
 * @param query
 * @return a list of file paths matching query
 */
async function listExperimentPaths(
  query: {
    path: string;
    experimentName: string;
    primaryExperimenter: string;
    dateStart: Date;
    dateEnd: Date;
  },
): Promise<Array<string>> {
  const {
    path: filePath,
    experimentName,
    primaryExperimenter,
    dateStart,
    dateEnd,
  } = query

  let paths = await readdir(filePath, {
    encoding: 'utf-8',
    boundary: rootPath,
  })

  if (dateStart && dateEnd) {
    paths = paths.filter((experimentPath) => {
      const dateMatch = /_\d{13}_/.exec(experimentPath)
      if (!dateMatch) {
        throw new Error(`File at experimentPath: ${filePath}/${experimentPath} has improperly formmatted name`)
      } else {
        const date = new Date(Number(dateMatch[1]))
        // filter date if not within range
        return date >= dateStart && date <= dateEnd
      }
    })
  }

  paths = paths.filter((experimentPath) => {
    const lMatch = /^(.*?)_/.exec(experimentPath)
    const rMatch = /_([^_]*?)$/.exec(experimentPath)
    if (!lMatch || !rMatch) {
      throw new Error(`File at experimentPath: ${filePath}/${experimentPath} has improperly formmatted name`)
    } else {
      return lMatch[1].includes(experimentName)
        && rMatch[1].includes(primaryExperimenter)
    }
  })
  return paths
}


/**
 * simply writes stringified experiment json to file at path.
 */
async function writeExperiment(
  filePath: string,
  data: Experiment,
): Promise<void> {
  // validate file path
  const lMatch = /^.*?_/.exec(filePath)
  const rMatch = /_[^_]*?$/.exec(filePath)
  const dateMatch = /_\d{13}_/.exec(filePath)
  if (!lMatch || !rMatch || !dateMatch) {
    throw new Error(`Attempted to write experiment data with invalid path name: ${filePath}`)
  }
  return writeFile(filePath, JSON.stringify(valid(data)), {
    encoding: 'utf-8',
    boundary: rootPath,
  })
}

export {
  rootPath,
  valid,
  listExperiments,
  listExperimentPaths,
  getExperiment,
  writeExperiment,
}
