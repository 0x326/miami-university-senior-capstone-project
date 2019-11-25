import {
  writeExperiment,
  getExperiment,
  listExperiments,
} from './fsOperations'

import { promises as fs } from 'fs'


const PORT = 8081
const ROOT = `./SCALE_INTERFACE_DAT/`
const ACTIVE = `./SCALE_INTERFACE_DAT/active/`
const ARCHIVE = `./SCALE_INTERFACE_DAT/archive/`

async function readJSON(
  path: string
): Promise<{
  fileContent: string;
  parsedContent: object;
}> {
  const fileBuffer = await fs.readFile(path)
  const fileContent = String(fileBuffer)
  const parsedContent = JSON.parse(fileContent)
  return {
    fileContent: JSON.stringify(parsedContent),
    parsedContent,
  }
}

beforeEach(async () => {
  try {
    await fs.mkdir(`./SCALE_INTERFACE_DAT/`, 0o777)
  } catch(error){ /* Do Nothing */ }
  try {
    await fs.mkdir(`./SCALE_INTERFACE_DAT/active`, 0o777)
  } catch(error){ /* Do Nothing */ }
  try {
    await fs.mkdir(`./SCALE_INTERFACE_DAT/archive`, 0o777)
  } catch(error){ /* Do Nothing */ }
})

afterEach(async () => {
  var activeDir = await fs.readdir(`./SCALE_INTERFACE_DAT/active`)
  var archiveDir = await fs.readdir(`./SCALE_INTERFACE_DAT/archive`)

  try {
    activeDir.forEach(async function(fileName) {
      await fs.unlink(ACTIVE + fileName)
    })
    archiveDir.forEach(async function(fileName) {
      await fs.unlink(ARCHIVE + fileName)
    })
  } catch(error) { console.error(error) }

  try {
    await fs.rmdir(`./SCALE_INTERFACE_DAT/active`)
  } catch(error) { /* Do Nothing */ }
  try {
    await fs.rmdir(`./SCALE_INTERFACE_DAT/archive`)
  } catch(error) { console.error(error) }
  try {
    await fs.rmdir(`./SCALE_INTERFACE_DAT/`)
  } catch(error) { /* Do Nothing */ }
})

describe('Reading and writing an experiment', () => {

  it('writes a valid experiment', async () => {
    const { fileContent, parsedContent: exampleExperiment } = await readJSON('sampleExperiments/valid.json')
    const exampleExperimentName = `Addiction Study 12_1571826295869_quinn`
    await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleExperiment })

    let experimentFile = await fs.readFile(ACTIVE + exampleExperimentName)
    expect(experimentFile.toString()).toBe(fileContent)
  })

  it('writes an experiment without a name variable', async () => {
    // Missing name variable
    const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/noName.json')
    const exampleInvalidExperimentName = `Addiction Study 12_1571826295869_quinn`

    // This is behaving properly but Jest is not detecting an error is being thrown
    expect(await writeExperiment({ path: ACTIVE + exampleInvalidExperimentName, data: exampleInvalidExperiment })).toThrowError()
  })

  describe('invalid Filenames being written', async () => {

    it('writes an invalid experiment Filename', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/valid2.json')
      // Valid experiment filename: test invalidstudy 99_1571826295869_quinn
      const exampleInvalidExperimentName = `test invalidName`

      expect(await writeExperiment({ path: ACTIVE + exampleInvalidExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

    it('writes an empty name experiment Filename', async () => {
      const { fileContent, parsedContent: exampleExperiment } = await readJSON('sampleExperiments/valid3.json')
      const exampleInvalidExperimentName = `_1571826295869_quinn`
      await writeExperiment({ path: ACTIVE + exampleInvalidExperimentName, data: exampleExperiment })

      let experimentFile = await fs.readFile(ACTIVE + exampleInvalidExperimentName)
      expect((experimentFile.toString())).toBe(fileContent)
    })

    it('writes an empty date experiment Filename', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/noDate.json')
      // Valid experiment filename: test invalidstudy 99_1571826295869_quinn
      const exampleInvalidExperimentName = `Addiction Study 12__quinn`

      expect(await writeExperiment({ path: ACTIVE + exampleInvalidExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

    it('writes an empty primaryExperimenter experiment Filename', async () => {
      const { fileContent, parsedContent: exampleExperiment } = await readJSON('sampleExperiments/valid4.json')
      const exampleExperimentName = `Addiction Study 12_1571826295869_`
      await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleExperiment })

      let experimentFile = await fs.readFile(ACTIVE + exampleExperimentName)
      expect((experimentFile.toString())).toBe(fileContent)
    })
  })

  it('reads a written experiment', async () => {
    const { fileContent, parsedContent: exampleExperiment } = await readJSON('sampleExperiments/valid5.json')
    const exampleExperimentName = `Addiction Study 12_1571826295869_quinn`
    await fs.writeFile(ACTIVE + exampleExperimentName, fileContent)
    let rtnExpr = await getExperiment(ACTIVE + exampleExperimentName)
    expect(JSON.stringify(rtnExpr.data)).toBe(fileContent)
  })

})

describe('Returns any amount of experiments', () => {

  const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  const exampleExperimentName = `Addiction Study 12_1571826295869_quinn`

  // No saved experiments
  test('Empty return array', async () => {
    expect(listExperiments({ path: ACTIVE, filter: exampleExperiment })).resolves.toHaveLength(0)
  })

  // TODO: listExperiments is not working!
  // One saved experiment
  test('One element returned', async () => {
    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))

    // Genrate comparison array
    const compareListExperiments = [exampleExperiment]
    let rtnArray = await listExperiments({ path: ACTIVE, filter: exampleExperiment })
    expect(rtnArray).resolves.toBe(compareListExperiments)
  })
})

// These tests will assume the variable being tested is being sent a value of the correct type.
describe('testing valid funciton', () => {

  describe('testing name', () => {

    it('writes an experiment with an empty name value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/emptyName.json')
      const exampleExperimentName = `_1572730420004_quinn`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

    it('writes an experiment with an underscore in name value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/underscoreInName.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_quinn`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

  describe('testing primaryExperimenter', () => {

    it('writes an experiment with an empty primaryExperimenter value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/emptyPrimaryExperimenter.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

    it('writes an experiment with an underscore in the primaryExperimenter value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/underscoreInPrimaryExperimenter.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_dr_quinn`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

  describe('testing dateInitialized', () => {

    it('writes an experiment with a zero dateInitialized value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/zeroDateInitialized.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

    // This should not happen so it can likely be removed
    it('writes an experiment with an underscore in the dateInitialized value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/underscoreInDateInitialized.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_dr_quinn`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

  describe('testing lastUpdated', () => {

    it('writes an experiment with a zero lastUpdated value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/zeroLastUpdated.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

  // isComplete does not need to be tested because both possible values are valid.

  describe('testing totalSessions', () => {

    it('writes an experiment with a zero totalSessions value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/zeroTotalSessions.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

  describe('testing totColsBegin vs subSessionLabelsBegin', () => {

    it('writes an experiment with a zero totalSessions value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('sampleExperiments/zeroTotalSessions.json')
      const exampleExperimentName = `Addiction Study 12_1572730420004_`

      // TODO: This is behaving properly but Jest is not detecting an error is being thrown
      expect(await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleInvalidExperiment })).toThrowError()
    })

  })

})

describe('Test getExperiment', () => {

})

describe('Test listExperiments', () => {

})

describe('Test listExperimentPaths', () => {

})

describe('Test writeExperiment', () => {

})
