import { promises as fs } from 'fs'
import * as os from 'os'
import _ from 'lodash'
import Joi from '@hapi/joi'

// workaround for a recursive type definition
// eq to: type SubLabel = [string, Array<string | SubLabel>]
type SubLabel = [string, Array<string | SubLabelArray>]
interface SubLabelArray extends Array<SubLabel> { }

type Session = {
  [key: string]: number
}

type Cage = {
  cageWeight: number
  cageLabel: string
  sessions: Array<Session>
}

type Experiment = {
  name: string
  primaryExperimenter: string
  dateInitialized: number
  lastUpdate: number
  isComplete: boolean
  totalSessions: number
  totalColsBegin: number
  totalColsMid: number
  totalColsEnd: number
  subSessionLabelsBegin: Array<string | SubLabel>
  subSessionLabelsMid: Array<string | SubLabel>
  subSessionLabelsEnd: Array<string | SubLabel>
  cages: Array<Cage>
}

// wraps an experiment to provide the path of the file it was read from
type ExperimentWrapper = {
  path: string
  data: Experiment
}

// TODO: figure out how to ensure the usb drive is mounted to same path
// we can't just save it in fstab because we don't know the uuid of the drive
const ROOT_PATH: string | null
  = fs.readdir(`/media/${os.userInfo().username}/test_usb`)
    .then(res => {
      if (res.includes('SCALE_INTERFACE_DAT'))
        return true
      else
        return false
    })
    .catch(() => {
      return false
    }) ?
    `/media/${os.userInfo().username}/test_usb/SCALE_INTERFACE_DAT` :
    null

async function getRootDir(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (ROOT_PATH)
      resolve(ROOT_PATH)
    reject()
  })
}


// valid: used joi to validate data. Returns promise that resolves if data is valid
// TODO: ensure strings are lower case
async function valid(data: any): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!data)
      reject(new Error("==Data sent to valid() is null"))

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
          Joi.link('/subSessionLabelsBegin')),
      subSessionLabelsMid: Joi.array()
        .items(
          Joi.string(),
          Joi.link('/subSessionLabelsMid')),
      subSessionLabelsEnd: Joi.array()
        .items(
          Joi.string(),
          Joi.link('/subSessionLabelsEnd')),
      cages: Joi.array().items(
        Joi.object({
          cageWeight: Joi.number().required(),
          cageLabel: Joi.string().required(),
          sessions: Joi.array()
            .items(Joi.object({}).pattern(/./, Joi.number()))
            .max(Joi.ref('/totalSessions'))
        }),
      )
    })

    schema.validateAsync(data)
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

// listExperiments:
// TOOD: use path library
async function listExperiments(query: any): Promise<Array<ExperimentWrapper>> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!query.path)
        reject(new Error("No query path provided"))

      const allFiles = await fs.readdir(
        query.path,
        { encoding: 'UTF-8' })

      let ret: Array<ExperimentWrapper> = []
      for (let experimentPath of allFiles) {
        const wrappedExperiment = await getExperiment(`${query.path}/${experimentPath}`)
        if (wrappedExperiment)
          ret.push(wrappedExperiment)
      }

      if (query.filter)
        ret = ret.filter(member => _.isMatch(member.data, query.filter))

      resolve(ret)
    } catch (err) {
      reject(err)
    }
  })
}


////////////////////////////////////////////////////////////////////////////////////////////
//  experiment file names:                                                                //
//  to make certain operations quicker, we can encode certain information in file names   //
//  so that we don't have to open an experiment file to test whether it matches a query.  //
//                                                                                        //
//  Proposed format:                                                                      //
//  <experimentName>_<dateInitialized>_<primaryExperimenter>                              //
//                                                                                        //
// We should also store active experiments in an /active dir and archived experiments in  //
// a /archive dir                                                                         //
////////////////////////////////////////////////////////////////////////////////////////////

// listExperimentPaths: returns a list of file paths matching query
async function listExperimentPaths(query: any): Promise<Array<string | Buffer>> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!query.path)
        reject(new Error("No path provided"))

      let ret: Array<string | Buffer> = await fs.readdir(query.path, { encoding: 'UTF-8' })

      if (query.dateStart && query.dateEnd)
        ret = ret.filter(path => {
          path = path as string
          const dateMatch = path.match(/_(\d*?)_/)
          if (!dateMatch)
            reject(new Error(`File at path: ${query.path}/${path} has improperly formmatted name`))
          else {
            const date = new Date(Number(dateMatch[1]))
            // filter date if not within range
            return date >= query.dateStart && date <= query.dateEnd
          }
        })

      ret = ret.filter(path => {
        path = path as string
        const lMatch = path.match(/^(.*?)_/)
        const rMatch = path.match(/_([^_]*?)$/)
        if (!lMatch || !rMatch)
          reject(new Error(`File at path: ${query.path}/${path} has improperly formmatted name`))
        else
          return lMatch[1].includes(query.experimentName) &&
            rMatch[1].includes(query.primaryExperimenter)
      })

      resolve(ret)

    } catch (error) {
      reject(error)
    }
  })
}


// getExperiment: returns experiment object parsed from file at absolute path
async function getExperiment(path: string): Promise<ExperimentWrapper> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'UTF-8' })
      .then(data => {
        data = data as string
        const parsed: any = JSON.parse(data)
        valid(parsed)
          .then(() => {
            resolve({
              path: path,
              data: parsed as Experiment
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

// writeExperiment: simply writes stringified experiment json to file at path.
// TODO: maybe do validation here instead of outside
async function writeExperiment(wrapped: ExperimentWrapper): Promise<void> {
  return await fs.writeFile(wrapped.path, JSON.stringify(wrapped.data))
}

export {
  getRootDir,
  valid,
  listExperiments,
  listExperimentPaths,
  getExperiment,
  writeExperiment,
}
