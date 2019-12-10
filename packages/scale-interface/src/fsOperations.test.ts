/* eslint-disable security/detect-non-literal-fs-filename */
import { promises as fs } from 'fs'

import {
  listExperimentPaths,
  writeExperiment,
  getExperiment,
  listExperiments,
} from './fsOperations'


const ACTIVE = './SCALE_INTERFACE_DAT/active/'
const ARCHIVE = './SCALE_INTERFACE_DAT/archive/'


beforeEach(async () => {
  try {
    await fs.mkdir('./SCALE_INTERFACE_DAT/', 0o777)
  } catch (error) { /* Do Nothing */ }
  try {
    await fs.mkdir('./SCALE_INTERFACE_DAT/active', 0o777)
  } catch (error) { /* Do Nothing */ }
  try {
    await fs.mkdir('./SCALE_INTERFACE_DAT/archive', 0o777)
  } catch (error) { /* Do Nothing */ }
})

afterEach(async () => {
  const activeDirectory = await fs.readdir('./SCALE_INTERFACE_DAT/active')
  const archiveDirectory = await fs.readdir('./SCALE_INTERFACE_DAT/archive')

  try {
    await Promise.all([
      ...activeDirectory.map((fileName) => fs.unlink(ACTIVE + fileName)),
      ...archiveDirectory.map((fileName) => fs.unlink(ARCHIVE + fileName)),
    ])
  } catch (error) { console.error(error) }

  try {
    await fs.rmdir('./SCALE_INTERFACE_DAT/active')
  } catch (error) { /* Do Nothing */ }
  try {
    await fs.rmdir('./SCALE_INTERFACE_DAT/archive')
  } catch (error) { console.error(error) }
  try {
    await fs.rmdir('./SCALE_INTERFACE_DAT/')
  } catch (error) { /* Do Nothing */ }
})

// These tests will assume the variable being tested is being sent a value of the correct type.
describe('Test valid', () => {
  describe('testing name', () => {
    it('writes an experiment with an empty name value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"","primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = '_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })

    it('writes an experiment with an underscore in name value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction_Study 12","primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing primaryExperimenter', () => {
    it('writes an experiment with an empty primaryExperimenter value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })

    it('writes an experiment with an underscore in the primaryExperimenter value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"dr_quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_dr_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing dateInitialized', () => {
    it('writes an experiment with a zero dateInitialized value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":0,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing lastUpdated', () => {
    it('writes an experiment with a zero lastUpdated value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":0,"lastUpdated":0,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })

  // isComplete does not need to be tested because both possible values are valid.

  describe('testing totalSessions', () => {
    it('writes an experiment with a zero totalSessions value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":0,"lastUpdated":0,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing totColsBegin vs subSessionLabelsBegin', () => {
    it('writes an experiment with a zero totalSessions value', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":0,"lastUpdated":0,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })
})

describe('Test getExperiment', () => {
  it('returns an experiment', async () => {
    const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
    const exampleExperimentName = 'Addiction Study 12_1571826295869_quinn'

    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))
    const rtnExpr = await getExperiment(ACTIVE + exampleExperimentName)
    expect(JSON.stringify(rtnExpr.data)).toBe(JSON.stringify(exampleExperiment))
  })
})


describe('Test listExperiments', () => {
  const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  const exampleExperimentName = 'Addiction Study 12_1571826295869_quinn'

  // No saved experiments
  test('Empty return array', async () => {
    await expect(listExperiments({ path: ACTIVE, filter: exampleExperiment }))
      .resolves.toHaveLength(0)
  })

  // One saved experiment
  test('One element returned', async () => {
    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))

    // Genrate comparison array
    const compareListExperiments = [exampleExperiment]
    await expect(listExperiments({
      path: ACTIVE,
      filter: exampleExperiment,
    })).resolves.toBe(compareListExperiments)
  })
})

// Need to fix listExperimentPaths function. It is returning the experiment names and not the paths.
describe('Test listExperimentPaths', () => {
  it('returns no experiment path', async () => {
    expect(await listExperimentPaths({ path: ACTIVE, experimentName: '', primaryExperimenter: '', dateStart: new Date(1572730420004), dateEnd: new Date(1572730420004) }))
      .toEqual([])
  })

  it('returns one experiment path', async () => {
    const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))
    expect(await listExperimentPaths({ path: ACTIVE, experimentName: 'Addiction Study 12', primaryExperimenter: 'quinn', dateStart: new Date(1572730420004), dateEnd: new Date(1572730420004) })).toBe([ACTIVE + exampleExperimentName])
  })

  it('returns multiple experiment paths', async () => {
    const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

    const exampleExperiment2 = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
    const exampleExperimentName2 = 'Addiction Study 12_1572730420004_quinn2'

    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))
    await fs.writeFile(ACTIVE + exampleExperimentName2, JSON.stringify(exampleExperiment2))
    expect(await listExperimentPaths({ path: ACTIVE, experimentName: 'Addiction Study 12', primaryExperimenter: 'quinn', dateStart: new Date(1572730420004), dateEnd: new Date(1572730420004) })).toBe([ACTIVE + exampleExperimentName, ACTIVE + exampleExperimentName2])
  })
})

describe('Test writeExperiment', () => {
  it('writes a valid experiment', async () => {
    const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'
    await writeExperiment({
      path: ACTIVE + exampleExperimentName,
      data: exampleExperiment,
    })

    const experimentFile = await fs.readFile(ACTIVE + exampleExperimentName)
    expect((experimentFile.toString())).toBe(JSON.stringify(exampleExperiment))
  })

  describe('Test incorrect experiment format', () => {
    it('does not write an experiment without the name variable', async () => {
      const exampleInvalidExperiment = JSON.parse('{"primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })

    it('it does not write an experiment adding a new variable, totalBottlesPerSession', async () => {
      const exampleInvalidExperiment = JSON.parse('{"name":"Addiction Study 12", "primaryExperimenter":"quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":6,"totalColsMid":6,"totalColsEnd":4, "totalBottlesPerSession":3, "subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment,
      })).rejects.toBeInstanceOf(Error)
    })
  })
})
