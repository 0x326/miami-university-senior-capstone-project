// TODO (0x326) [2020-05-10] Remove extraneous @material dependencies
// TODO (0x326) [2020-05-10] Remove extraneous @rmwc dependencies

import React, {
  useEffect,
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

import {
  v4 as uuid4,
} from 'uuid'

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
} from './types'

import useSnackbar from './useSnackbar'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'
import NoMatch from './routes/NoMatch'
import ScaleApiTester from './ScaleApiTester'
import LandingPage from './routes/home'

export type ExperimentId = RouteId

const viewOptions: RouteMap = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments')
  .set('scale-api-tester', 'Scale API tester'))

const App: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [snackbar, snackbarQueuePush] = useSnackbar()

  const [bottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentMetadata, setExperimentMetadata] = useState(Map<ExperimentId, ExperimentMetaData>())
  const [experiments, setExperiments] = useState(Map<ExperimentId, ExperimentData>())
  const [experimentDisplayNames, setExperimentDisplayNames] = useState(Map<ExperimentId, DisplayName>())
  const [experimentDisplayOrder, setExperimentDisplayOrder] = useState(List<ExperimentId>())
  const [cageDisplayOrders, setCageDisplayOrders] = useState<CageDisplayOrder>(Map())
  const [rackDisplayOrder, setRackDisplayOrder] = useState<RackDisplayOrder>(List())

  useEffect(() => {
    import('./sampleData')
      .then(({
        sampleExperimentMetadata,
        sampleExperiments,
        sampleExperimentDisplayNames,
        sampleExperimentDisplayOrder,
        sampleCageDisplayOrders,
        sampleRackDisplayOrder,
      }) => {
        setExperimentMetadata(sampleExperimentMetadata)
        setExperiments(sampleExperiments)
        setExperimentDisplayNames(sampleExperimentDisplayNames)
        setExperimentDisplayOrder(sampleExperimentDisplayOrder)
        setCageDisplayOrders(sampleCageDisplayOrders)
        setRackDisplayOrder(sampleRackDisplayOrder)

        snackbarQueuePush({
          message: 'Sample data loaded',
          actions: List(),
        })
      })
  }, [snackbarQueuePush])

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
            experimentIds={experimentDisplayOrder}
            experiments={experimentDisplayNames}
            experimentMetadata={experimentMetadata}
            onCreateExperiment={((experimentMetaData): void => {
              const {
                experimentName,
              } = experimentMetaData

              const experimentId = uuid4()
              setExperiments((prevExperiments) => prevExperiments.set(experimentId, Map()))
              setExperimentDisplayNames((prevExperimentDisplayNames) => prevExperimentDisplayNames
                .set(experimentId, experimentName))
              setExperimentDisplayOrder((prevExperimentDisplayOrder) => prevExperimentDisplayOrder
                .push(experimentId))

              history.push('/experiments')
            })}
          />
        </Route>
        <Route path="/home">
          <LandingPage
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
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
