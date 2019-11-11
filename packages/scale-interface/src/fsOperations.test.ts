import {
  listExperiments,
  writeExperiment,
  Experiment,
  ExperimentWrapper,
} from './fsOperations'

describe('Returns any amount of experiments', () => {
  const exampleExperiment = new Experiment({
    name: 'Addiction Study 1',
    primaryExperimenter: 'Quinn',
    dateInitialized: new Date(),
    lastUpdated: new Date(),
    isComplete: false,
    totalSessions: 30,
    totalColsBegin: 8,
    totalColsMid: 6,
    totalColsEnd: 4,
    subSessionLabelsBegin: [
      'Cage Weight',
      'Cage',
      ['H20 Weights', ['Before', 'After 30m', 'After 24h']],
      ['20% ETOH Weights', ['Before', 'After 30m', 'After 24h']],
    ],
    subSessionLabelsMid: [
      'Cage',
      ['H20 Weights', ['Before', 'After 24h']],
      ['20% ETOH Weights', ['Before', 'After 24h']],
    ],
    subSessionLabelsEnd: [
      'Cage',
      ['H20 Weights', ['After 24h']],
      ['20% ETOH Weights', ['After 24h']],
    ],
    cages: [
      {
        cageWeight: 259,
        cageLabel: 'Cage 1 (Dummy)',
        sessions: [
          {
            'H20 Weights Begore': 432,
            'H20 Weights After 30m': 430,
            '20% ETOH Weights After 24h': 340,
          },
        ],
      },
    ],
  })

  const path = '/media/${os.userInfo().username}/test_usb'

  // No saved experiments
  test('Empty return array', () => {
    expect(listExperiments({ path })).resolves.toHaveLength(0)
  })

  // One saved experiment
  test('One element returned', () => {
    writeExperiment(new ExperimentWrapper(path, exampleExperiment))

    // Genrate comparison array
    const compareListExperiments = [new ExperimentWrapper(path, exampleExperiment)]
    expect(listExperiments({ path })).resolves.toBe(compareListExperiments)
  })

  // Multiple saved experiments
  test('Multiple elements returned', () => {
    writeExperiment(new ExperimentWrapper(path, exampleExperiment))
    writeExperiment(new ExperimentWrapper(path, exampleExperiment))

    // Generate comparison array
    const compareListExperiments = [
      new ExperimentWrapper(path, exampleExperiment),
      new ExperimentWrapper(path, exampleExperiment),
      new ExperimentWrapper(path, exampleExperiment),
    ]
    expect(listExperiments({ path })).resolves.toBe(compareListExperiments)
  })
})
