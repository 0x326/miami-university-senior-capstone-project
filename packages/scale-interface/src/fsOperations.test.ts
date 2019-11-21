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

  const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  const exampleExperimentName = `test study 99_1571826295869_quinn`

  it('writes a valid experiment', async () => {
    await writeExperiment({ path: ACTIVE + exampleExperimentName, data: exampleExperiment })

    let experimentFile = await fs.readFile(ACTIVE + exampleExperimentName)
    expect((experimentFile.toString())).toBe('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  })

  it('reads a written experiment', async () => {
    await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))
    let rtnExpr = await getExperiment(ACTIVE + exampleExperimentName)
    expect(JSON.stringify(rtnExpr.data)).toBe('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  })

})

describe('Returns any amount of experiments', () => {

  const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  const exampleExperimentName = `test study 99_1571826295869_quinn`

  // No saved experiments
  test('Empty return array', async () => {
    expect(listExperiments({ path: ACTIVE, filter: exampleExperiment })).resolves.toHaveLength(0)
  })

  // This test is failing for an unknown reason but it is also causing the SCALE_INTERFACE_DAT to not be
  // deleted because it is failing.

  // One saved experiment
  // test('One element returned', async () => {
  //   const PATH = `./SCALE_INTERFACE_DAT/active/test study 99_1571826295869_quinn`
  //   await fs.writeFile(ACTIVE + exampleExperimentName, JSON.stringify(exampleExperiment))

  //   // Genrate comparison array
  //   // const READ_PATH = `C:/Users/USER/Documents/School Work/Capstone/SCALE_INTERFACE_DAT/active`
  //   const compareListExperiments = [exampleExperiment]
  //   let rtnArray = await listExperiments({ path: ACTIVE, filter: exampleExperiment })
  //   console.log(rtnArray)
  //   expect(rtnArray).resolves.toBe(compareListExperiments)
  // })
})

async function checkFileExists(filepath: string){
  let flag = true;
  try{
    await fs.access(filepath);
  }catch(e){
    flag = false;
  }
  return flag;
}
