// import * as os from 'os'

import ws from 'ws'

import {
  // getRootDir,
  // listExperiments,
  writeExperiment,
  // Experiment,
  // ExperimentWrapper,
} from './fsOperations'

const PORT = 8080
const PATH = '.\\SCALE_INTERFACE_DAT\\active\\'

// const wsGetRoot = new ws(`ws://localhost:${PORT}/get-root-dir`)
// const wsListExperiments = new ws(`ws://localhost:${PORT}/list-experiments`)
// const wsGetExperiment = new ws(`ws://localhost:${PORT}/get-experiment`)
// const wsListPaths = new ws(`ws://localhost:${PORT}/list-experiment-paths`)
const wsWriteExperiment = new ws(`ws://localhost:${PORT}/write-experiment`)
// const wsScaleData = new ws(`ws://localhost:${PORT}/scale-data`)
wsWriteExperiment.addEventListener('message', (event) => {
  console.log('==/write-experiment')
  console.log(JSON.parse(event.data as string))
  console.log('===')
})
it('writes an empty experiment', () => {
  // const exampleExperiment = {
  //   name: 'Addiction Study 1',
  //   primaryExperimenter: 'Quinn',
  //   dateInitialized: new Date(),
  //   lastUpdated: new Date(),
  //   isComplete: false,
  //   totalSessions: 30,
  //   totalColsBegin: 8,
  //   totalColsMid: 6,
  //   totalColsEnd: 4,
  //   subSessionLabelsBegin: [
  //     'Cage Weight',
  //     'Cage',
  //     ['H20 Weights', ['Before', 'After 30m', 'After 24h']],
  //     ['20% ETOH Weights', ['Before', 'After 30m', 'After 24h']],
  //   ],
  //   subSessionLabelsMid: [
  //     'Cage',
  //     ['H20 Weights', ['Before', 'After 24h']],
  //     ['20% ETOH Weights', ['Before', 'After 24h']],
  //   ],
  //   subSessionLabelsEnd: [
  //     'Cage',
  //     ['H20 Weights', ['After 24h']],
  //     ['20% ETOH Weights', ['After 24h']],
  //   ],
  //   cages: [
  //     {
  //       cageWeight: 259,
  //       cageLabel: 'Cage 1 (Dummy)',
  //       sessions: [
  //         {
  //           'H20 Weights Begore': 432,
  //           'H20 Weights After 30m': 430,
  //           '20% ETOH Weights After 24h': 340,
  //         },
  //       ],
  //     },
  //   ],
  // }
  expect(writeExperiment({ path: PATH, data: '' }).catch()).toThrowError(new Error('==Data sent to valid() is null'))
})

// describe('Returns any amount of experiments', () => {
//   const exampleExperiment = {
//     name: 'Addiction Study 1',
//     primaryExperimenter: 'Quinn',
//     dateInitialized: new Date(),
//     lastUpdated: new Date(),
//     isComplete: false,
//     totalSessions: 30,
//     totalColsBegin: 8,
//     totalColsMid: 6,
//     totalColsEnd: 4,
//     subSessionLabelsBegin: [
//       'Cage Weight',
//       'Cage',
//       ['H20 Weights', ['Before', 'After 30m', 'After 24h']],
//       ['20% ETOH Weights', ['Before', 'After 30m', 'After 24h']],
//     ],
//     subSessionLabelsMid: [
//       'Cage',
//       ['H20 Weights', ['Before', 'After 24h']],
//       ['20% ETOH Weights', ['Before', 'After 24h']],
//     ],
//     subSessionLabelsEnd: [
//       'Cage',
//       ['H20 Weights', ['After 24h']],
//       ['20% ETOH Weights', ['After 24h']],
//     ],
//     cages: [
//       {
//         cageWeight: 259,
//         cageLabel: 'Cage 1 (Dummy)',
//         sessions: [
//           {
//             'H20 Weights Begore': 432,
//             'H20 Weights After 30m': 430,
//             '20% ETOH Weights After 24h': 340,
//           },
//         ],
//       },
//     ],
//   }


//   // eslint-disable-next-line no-template-curly-in-string
//   const path = 'C:/Users/USER/Documents/School Work/Capstone/SCALE_INTERFACE_DAT'

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
