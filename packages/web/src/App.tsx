// TODO (0x326) [2020-04-01] Remove extraneous @material dependencies
// TODO (0x326) [2020-04-01] Remove extraneous @rmwc dependencies

import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'

import uuid from 'uuid/v4'

import ExperimentDashboard, {
  ExperimentData,
  CageDisplayOrder,
  CageId,
  RackId,
  RackDisplayOrder,
} from './routes/experiment-dashboard/ExperimentDashboard'

import ExperimentsSwitch from './routes/experiments'

import {
  CageData,
} from './routes/experiment-dashboard/CageSessions'

import {
  BottleType,
  RouteId,
  DisplayName,
  RouteMap,
} from './types'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'
import NoMatch from './routes/NoMatch'

export type ExperimentId = RouteId

const viewOptions: RouteMap = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments'))

const App: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [bottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experiments, setExperiments] = useState(Map<ExperimentId, ExperimentData>()
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
            })))))))))
  const [experimentDisplayNames, setExperimentDisplayNames] = useState(
    Map<ExperimentId, DisplayName>()
      .set('experiment-1', 'Experiment 1')
      .set('experiment-2', 'Experiment 2'),
  )
  const [experimentDisplayOrder, setExperimentDisplayOrder] = useState(List.of('experiment-1', 'experiment-2'))
  const [cageDisplayOrders] = useState<CageDisplayOrder>(Map<RackId, List<CageId>>()
    .withMutations((map) => map
      .set(1, List.of(1, 2))
      .set(2, List.of(3, 4))))
  const [rackDisplayOrder] = useState<RackDisplayOrder>(List.of(1, 2))

  return (
    <>
      <AppModalDrawer
        title="Scale Interface Tool"
        subtitle="A Senior Design Project"
        open={isDrawerOpen}
        onClose={(): void => setIsDrawerOpen(false)}
        viewOptions={viewOptions}
      />
      <Switch>
        <Route exact path="/">
          <ul>
            <li>
              <Link to="/experiment-dashboard">Experiment Dashboard</Link>
            </li>
            <li>
              <Link to="/experiments">Experiments</Link>
            </li>
            <li>
              <Link to="/experiments/new">New Experiment</Link>
            </li>
          </ul>
        </Route>
        <Route path="/experiment-dashboard">
          <ExperimentDashboard
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            bottleTypes={bottleTypes}
            experimentData={experiments.get('experiment-1') as ExperimentData}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrders={cageDisplayOrders}
          />
        </Route>
        <Route path="/experiments">
          <ExperimentsSwitch
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            experimentIds={experimentDisplayOrder}
            experiments={experimentDisplayNames}
            onCreateExperiment={((experimentMetaData): void => {
              const {
                experimentName,
              } = experimentMetaData

              const experimentId = uuid()
              setExperiments((prevExperiments) => prevExperiments.set(experimentId, Map()))
              setExperimentDisplayNames((prevExperimentDisplayNames) => prevExperimentDisplayNames
                .set(experimentId, experimentName))
              setExperimentDisplayOrder((prevExperimentDisplayOrder) => prevExperimentDisplayOrder
                .push(experimentId))

              history.push('/experiments')
            })}
          />
        </Route>
        <Route path="*">
          <NoMatch
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            suggestedNavigationLink={viewOptions}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App
