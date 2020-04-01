import {
  List,
  Map,
} from 'immutable'

import dayjs from 'dayjs'

import {
  CageId,
  ExperimentData,
  RackId,
} from './routes/experiment-dashboard/ExperimentDashboard'
import {
  ExperimentMetaData,
} from './routes/experiments/new/NewExperimentView'
import {
  CageData,
} from './routes/experiment-dashboard/CageSessions'
import {
  DisplayName,
} from './types'
import {
  ExperimentId,
} from './App'

const sampleExperimentMetadata = Map<ExperimentId, ExperimentMetaData>()
  .withMutations((experimentMap) => experimentMap
    .set('experiment-1', {
      experimentName: 'Experiment 1',
      experimentLeadName: 'Dr. Quinn',
      startDate: dayjs('2020-01-01'),
      lastUpdated: dayjs('2020-02-04'),
      sessionCount: 20,
      bottlesPerCage: 2,
      treatments: ['h2o', 'EtOH'],
    })
    .set('experiment-2', {
      experimentName: 'Experiment 2',
      experimentLeadName: 'Prof. Stahr',
      startDate: dayjs('2020-01-07'),
      lastUpdated: dayjs('2020-01-08'),
      sessionCount: 20,
      bottlesPerCage: 2,
      treatments: ['h2o', 'EtOH'],
    }))

const sampleExperiments = Map<ExperimentId, ExperimentData>()
  .withMutations((experimentMap) => experimentMap
    .set('experiment-1', Map<RackId, Map<CageId, CageData>>().withMutations((map) => map
      .set(1, Map<CageId, CageData>().withMutations((rackData) => rackData
        .set(1, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 3)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 2)
                  .set('EtOH', 8)),
              },
            ),
          })))
        .set(2, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 9)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 1)
                  .set('EtOH', 4)),
              },
            ),
          })))))
      .set(2, Map<CageId, CageData>().withMutations((rackData) => rackData
        .set(3, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 3)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 5)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 2)
                  .set('EtOH', 8)),
              },
            ),
          })))
        .set(4, List().withMutations((cageData) => cageData
          .push({
            sessionNumber: 1,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 9)
                  .set('EtOH', 9)),
              },
            ),
          })
          .push({
            sessionNumber: 2,
            cageSessionData: List.of(
              {
                rowLabel: 'Before',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 10)
                  .set('EtOH', 10)),
              },
              {
                rowLabel: 'After',
                rowData: Map().withMutations((rowData) => rowData
                  .set('H₂0', 1)
                  .set('EtOH', 4)),
              },
            ),
          }))))))))

const sampleExperimentDisplayNames = Map<ExperimentId, DisplayName>()
  .set('experiment-1', 'Experiment 1')
  .set('experiment-2', 'Experiment 2')

const sampleExperimentDisplayOrder = List.of('experiment-1', 'experiment-2')

const sampleCageDisplayOrders = Map<RackId, List<CageId>>()
  .withMutations((map) => map
    .set(1, List.of(1, 2))
    .set(2, List.of(3, 4)))

const sampleRackDisplayOrder = List.of(1, 2)

export {
  sampleExperiments,
  sampleExperimentMetadata,
  sampleExperimentDisplayNames,
  sampleExperimentDisplayOrder,
  sampleCageDisplayOrders,
  sampleRackDisplayOrder,
}
