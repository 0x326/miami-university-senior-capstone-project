import {
  writeExperiment,
} from './fsOperations'


const PORT = 8081
const PATH = `C:/Users/USER/Documents/School Work/Capstone/SCALE_INTERFACE_DAT/active/test study 99_1571826295869_quinn`


it('writes a valid experiment', async () => {
  const exampleExperiment = JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  await writeExperiment({ path: PATH, data: exampleExperiment })
})

// describe('Returns any amount of experiments', () => {

//   // No saved experiments
//   test('Empty return array', () => {
//     expect(listExperiments({ path, filter: emptyExperiment })).resolves.toHaveLength(0)
//   })

//   // One saved experiment
//   test('One element returned', () => {
//     writeExperiment(new ExperimentWrapper(path, exampleExperiment))

//     // Genrate comparison array
//     const compareListExperiments = [new ExperimentWrapper(path, exampleExperiment)]
//     expect(Promise.resolve(listExperiments({ path }))).resolves.toBe(compareListExperiments)
//   })

//   // Multiple saved experiments
//   test('Multiple elements returned', () => {
//     writeExperiment(new ExperimentWrapper(path, exampleExperiment))
//     writeExperiment(new ExperimentWrapper(path, exampleExperiment))

//     // Generate comparison array
//     const compareListExperiments = [
//       new ExperimentWrapper(path, exampleExperiment),
//       new ExperimentWrapper(path, exampleExperiment),
//       new ExperimentWrapper(path, exampleExperiment),
//     ]
//     expect(Promise.resolve(listExperiments({ path }))).resolves.toBe(compareListExperiments)
//   })
// })
