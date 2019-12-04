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
  RackDisplayOrder,
} from './routes/experiment-dashboard/ExperimentDashboard'

import ExperimentsSwitch from './routes/experiments'

import {
  BottleType,
  RouteId,
  DisplayName,
  RouteMap,
} from './types'

import {
  sampleExperiments,
  sampleExperimentDisplayNames,
  sampleExperimentDisplayOrder,
  sampleCageDisplayOrders,
  sampleRackDisplayOrder,
} from './sampleData'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'

export type ExperimentId = RouteId

const viewOptions: RouteMap = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments'))

const App: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [bottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experiments, setExperiments] = useState(sampleExperiments)
  const [experimentDisplayNames, setExperimentDisplayNames] = useState(sampleExperimentDisplayNames)
  const [experimentDisplayOrder, setExperimentDisplayOrder] = useState(sampleExperimentDisplayOrder)
  const [cageDisplayOrders] = useState<CageDisplayOrder>(sampleCageDisplayOrders)
  const [rackDisplayOrder] = useState<RackDisplayOrder>(sampleRackDisplayOrder)

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
      </Switch>
    </>
  )
}

export default App
