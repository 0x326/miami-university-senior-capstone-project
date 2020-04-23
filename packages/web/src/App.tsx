// TODO (0x326) [2020-05-10] Remove extraneous @material dependencies
// TODO (0x326) [2020-05-10] Remove extraneous @rmwc dependencies

import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  Route,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom'

import ExperimentDashboard, {
  ExperimentData,
  CageDisplayOrder,
  RackDisplayOrder,
} from './routes/experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from './routes/experiments/new/NewExperimentView'

import ExperimentsSwitch from './routes/experiments'

import {
  BottleType,
  RouteId,
  DisplayName,
  RouteMap,
  experimentId,
} from './types'

import useSnackbar from './useSnackbar'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'
import NoMatch from './routes/NoMatch'
import ScaleApiTester from './ScaleApiTester'
import LandingPage from './routes/home'
import AddCages from './routes/experiments/add-cage/AddCages'

export type ExperimentId = RouteId

const viewOptions: RouteMap = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments')
  .set('scale-api-tester', 'Scale API tester'))

const App: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [snackbar] = useSnackbar()

  const [bottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentMetadata, setExperimentMetadata] = useState(Map<ExperimentId, ExperimentMetaData>())
  const [experiments, setExperiments] = useState(Map<ExperimentId, ExperimentData>())
  const [cageDisplayOrders, setCageDisplayOrders] = useState<CageDisplayOrder>(Map())
  const [rackDisplayOrder, setRackDisplayOrder] = useState<RackDisplayOrder>(List())
  const [dummyMap, setDummyMap] = useState(Map<List<number>, boolean>())
  const [comments, setComments] = useState({})

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
          <Redirect to="/home" />
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
            experimentMetadata={experimentMetadata}
            experiments={experiments}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrders}
            dummyMap={dummyMap}
            comments={comments}
            onCreateExperiment={((experimentMetaData): void => {
              setExperimentMetadata(Map<string, ExperimentMetaData>().set(experimentId, experimentMetaData))
              history.push('/experiments/record/view')
            })}
          />
        </Route>
        <Route path="/home">
          <LandingPage
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            onExperimentDataChange={(newExperimentData, newMetaData, newRackDisplayOrder, newCageDisplayOrders, newDummyMap, comments): void => {
              setExperiments(newExperimentData)
              setExperimentMetadata(newMetaData)
              setRackDisplayOrder(newRackDisplayOrder)
              setCageDisplayOrders(newCageDisplayOrders)
              setDummyMap(newDummyMap)
              setComments(comments)
            }}
            metaData={experimentMetadata}
          />
        </Route>
        <Route path="/experiments/add-cage">
          <AddCages
            addCages={(numberCages): void => console.log(numberCages)}
          />
        </Route>
        <Route path="/scale-api-tester">
          <ScaleApiTester />
        </Route>
        <Route path="*">
          <NoMatch
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            suggestedNavigationLink={viewOptions}
          />
        </Route>
      </Switch>
      {snackbar}
    </>
  )
}

export default App
