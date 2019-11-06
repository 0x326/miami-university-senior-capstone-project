// TODO @0x326 [2019-11-06]: Remove this eslint directive
/* eslint no-unused-vars: "warn" */

import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import ExperimentDashboard, {
  ExperimentData,
  Cages,
  CageId,
} from './ExperimentDashboard'

import {
  CageData,
} from './CageSessions'

import {
  BottleType,
} from './types'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'

const viewOptions = Map<string, string>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard'))

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [bottleTypes, setBottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentData, setExperimentData] = useState<ExperimentData>(
    Map<CageId, CageData>().withMutations((map) => map
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
        })))),
  )
  const [cages, setCages] = useState<Cages>(List.of(1, 2))

  return (
    <>
      <BrowserRouter>
        <AppModalDrawer
          title="Scale Interface Tool"
          subtitle="A Senior Design Project"
          open={isDrawerOpen}
          onClose={(): void => setIsDrawerOpen(false)}
          viewOptions={viewOptions}
        />
        <Switch>
          <Route exact path="/">
            <Link to="/experiment-dashboard">Experiment Dashboard</Link>
          </Route>
          <Route path="/experiment-dashboard">
            <ExperimentDashboard
              onDrawerOpen={(): void => setIsDrawerOpen(true)}
              bottleTypes={bottleTypes}
              experimentData={experimentData}
              cages={cages}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
