// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Experiment,
} from 'api-interfaces/dist/common'

import {
  mkdir,
  rmdir,
  readdir,
  readFile,
  writeFile,
  unlink,
} from './fs'

import {
  listExperimentPaths,
  writeExperiment,
  getExperiment,
  listExperiments,
} from './fsOperations'

const TEST_DIRECTORY = './SCALE_INTERFACE_DAT/'
const ACTIVE = './SCALE_INTERFACE_DAT/active/'
const ARCHIVE = './SCALE_INTERFACE_DAT/archive/'

async function readJSON(
  path: string,
): Promise<{
  fileContent: string;
  parsedContent: object;
}> {
  const fileBuffer = await readFile(path, {
    boundary: 'src/sampleExperiments/',
  })
  const fileContent = String(fileBuffer)
  const parsedContent = JSON.parse(fileContent)
  return {
    fileContent: JSON.stringify(parsedContent),
    parsedContent,
  }
}

beforeEach(async () => {
  try {
    await mkdir('./SCALE_INTERFACE_DAT/', {
      mode: 0o777,
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { /* Do Nothing */ }

  try {
    await mkdir('./SCALE_INTERFACE_DAT/active', {
      mode: 0o777,
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { /* Do Nothing */ }

  try {
    await mkdir('./SCALE_INTERFACE_DAT/archive', {
      mode: 0o777,
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { /* Do Nothing */ }
})

afterEach(async () => {
  const activeDirectory = await readdir('./SCALE_INTERFACE_DAT/active', {
    boundary: TEST_DIRECTORY,
  })
  const archiveDirectory = await readdir('./SCALE_INTERFACE_DAT/archive', {
    boundary: TEST_DIRECTORY,
  })

  try {
    await Promise.all([
      ...activeDirectory.map((fileName) => unlink(ACTIVE + fileName, {
        boundary: ACTIVE,
      })),
      ...archiveDirectory.map((fileName) => unlink(ARCHIVE + fileName, {
        boundary: ARCHIVE,
      })),
    ])
  } catch (error) { console.error(error) }

  try {
    await rmdir('./SCALE_INTERFACE_DAT/active', {
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { /* Do Nothing */ }

  try {
    await rmdir('./SCALE_INTERFACE_DAT/archive', {
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { console.error(error) }

  try {
    await rmdir('./SCALE_INTERFACE_DAT/', {
      boundary: TEST_DIRECTORY,
    })
  } catch (error) { /* Do Nothing */ }
})

// These tests will assume the variable being tested is being sent a value of the correct type.
describe('Test valid', () => {
  describe('testing name', () => {
    it('writes an experiment with an empty name value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/emptyName.json')
      const exampleExperimentName = '_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })

    it('writes an experiment with an underscore in name value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/underscoreInName.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing primaryExperimenter', () => {
    it('writes an experiment with an empty primaryExperimenter value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/emptyPrimaryExperimenter.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })

    it('writes an experiment with an underscore in the primaryExperimenter value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/underscoreInPrimaryExperimenter.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_dr_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing dateInitialized', () => {
    it('writes an experiment with a zero dateInitialized value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/zeroDateInitialized.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing lastUpdated', () => {
    it('writes an experiment with a zero lastUpdated value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/zeroLastUpdated.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })

  // isComplete does not need to be tested because both possible values are valid.

  describe('testing totalSessions', () => {
    it('writes an experiment with a zero totalSessions value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/zeroTotalSessions.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })

  describe('testing totColsBegin vs subSessionLabelsBegin', () => {
    it('writes an experiment with a zero totalSessions value', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/zeroTotalSessions.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })
})

describe('Test getExperiment', () => {
  it('returns an experiment', async () => {
    const { fileContent } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName = 'Addiction Study 12_1571826295869_quinn'

    await writeFile(ACTIVE + exampleExperimentName, fileContent, {
      boundary: TEST_DIRECTORY,
    })
    const rtnExpr = await getExperiment(ACTIVE + exampleExperimentName)
    expect(JSON.stringify(rtnExpr.data))
      .toBe(fileContent)
  })
})


describe('Test listExperiments', () => {
  // No saved experiments
  test('Empty return array', async () => {
    const { parsedContent: exampleExperiment } = await readJSON('src/sampleExperiments/valid.json')

    await expect(listExperiments({
      path: ACTIVE,
      filter: exampleExperiment as Experiment,
    }))
      .resolves.toHaveLength(0)
  })

  // One saved experiment
  test('One element returned', async () => {
    const { parsedContent: exampleExperiment, fileContent } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName = 'Addiction Study 12_1571826295869_quinn'

    await writeFile(ACTIVE + exampleExperimentName, fileContent, {
      boundary: TEST_DIRECTORY,
    })

    // Genrate comparison array
    const compareListExperiments = [exampleExperiment]
    await expect(listExperiments({
      path: ACTIVE,
      filter: exampleExperiment as Experiment,
    }))
      .resolves.toBe(compareListExperiments)
  })
})

// Need to fix listExperimentPaths function. It is returning the experiment names and not the paths.
describe('Test listExperimentPaths', () => {
  it('returns no experiment path', async () => {
    expect(await listExperimentPaths({
      path: ACTIVE,
      experimentName: '',
      primaryExperimenter: '',
      dateStart: new Date(1572730420004),
      dateEnd: new Date(1572730420004),
    }))
      .toEqual([])
  })

  it('returns one experiment path', async () => {
    const { fileContent } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

    await writeFile(ACTIVE + exampleExperimentName, fileContent, {
      boundary: TEST_DIRECTORY,
    })
    expect(await listExperimentPaths({
      path: ACTIVE,
      experimentName: 'Addiction Study 12',
      primaryExperimenter: 'quinn',
      dateStart: new Date(1572730420004),
      dateEnd: new Date(1572730420004),
    }))
      .toBe([ACTIVE + exampleExperimentName])
  })

  it('returns multiple experiment paths', async () => {
    const { fileContent } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

    const { fileContent: fileContent2 } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName2 = 'Addiction Study 12_1572730420004_quinn2'

    await writeFile(ACTIVE + exampleExperimentName, fileContent, {
      boundary: TEST_DIRECTORY,
    })
    await writeFile(ACTIVE + exampleExperimentName2, fileContent2, {
      boundary: TEST_DIRECTORY,
    })
    expect(await listExperimentPaths({
      path: ACTIVE,
      experimentName: 'Addiction Study 12',
      primaryExperimenter: 'quinn',
      dateStart: new Date(1572730420004),
      dateEnd: new Date(1572730420004),
    }))
      .toBe([
        ACTIVE + exampleExperimentName,
        ACTIVE + exampleExperimentName2,
      ])
  })
})

describe('Test writeExperiment', () => {
  it('writes a valid experiment', async () => {
    const { parsedContent: exampleExperiment, fileContent } = await readJSON('src/sampleExperiments/valid.json')
    const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'
    await writeExperiment({
      path: ACTIVE + exampleExperimentName,
      data: exampleExperiment as Experiment,
    })

    const experimentFile = await readFile(ACTIVE + exampleExperimentName, {
      boundary: TEST_DIRECTORY,
    })
    expect((experimentFile.toString()))
      .toBe(fileContent)
  })

  describe('Test incorrect experiment format', () => {
    it('does not write an experiment without the name variable', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/noName.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })

    it('it does not write an experiment adding a new variable, totalBottlesPerSession', async () => {
      const { parsedContent: exampleInvalidExperiment } = await readJSON('src/sampleExperiments/noExtraKeys.json')
      const exampleExperimentName = 'Addiction Study 12_1572730420004_quinn'

      await expect(writeExperiment({
        path: ACTIVE + exampleExperimentName,
        data: exampleInvalidExperiment as Experiment,
      }))
        .rejects.toBeInstanceOf(Error)
    })
  })
})
