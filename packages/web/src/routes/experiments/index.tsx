import React, { useState } from 'react'

import {
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'


import {
  List,
  Map,
} from 'immutable'

import * as XLSX from 'xlsx'

import {
  CageSessionData,
} from '../experiment-dashboard/CageSessionTable'

import {
  DisplayName,
  RouteId,
  experimentId,
  BottleType,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'

import { RackId, CageId, ExperimentData } from '../experiment-dashboard/ExperimentDashboard'
import ScaleApiTester from '../../ScaleApiTester'
import { CageData } from '../experiment-dashboard/CageSessions'

import {
  displayToWB, DummyMap, Comments,
} from '../../xlsx'

import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'
import ExperimentRecordSessionView from './record/session/ExperimentRecordSessionView'
import ExperimentMetadataView from './record/view/ExperimentMetadataView'


import AddCages from './add-cage/AddCages'
import SessionSummary from './record/summary/SessionSummary'

interface Props {
  onDrawerOpen: () => void;
  experiments: Map<ExperimentId, ExperimentData>;
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: Map<ExperimentId, ExperimentMetaData>;
  dummyMap: DummyMap;
  comments: Comments;
  onCreateExperiment: (experimentMetaData: ExperimentMetaData) => void;
  connectScale: () => void;
  onAddCages: (numCages: number) => void;
  onNewWeights: (newData: Map<List<React.ReactText>, number>) => void;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    experiments,
    rackDisplayOrder,
    cageDisplayOrder,
    onCreateExperiment,
    onAddCages,
    onNewWeights,
    experimentMetadata,
    dummyMap,
    comments,
    connectScale,
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()
  const cages = [1, 2, 3, 4, 5]
  const cageList = List(cages)

  return (
    <>
      <Switch>
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={(experimentMetaData): void => {
              onCreateExperiment(experimentMetaData)
            }}
          />
        </Route>
        <Route exact path={`${url}/record/view`}>
          <ExperimentMetadataView
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onAddCages={(): void => history.push(`${url}/add-cage`)}
            onRecord={(): void => history.push(`${url}/record/session`)}
            onConnect={connectScale}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ScaleApiTester />
        </Route>
        <Route path="/experiments/add-cage">
          <AddCages
            addCages={(numberCages): void => onAddCages(Number(numberCages))}
          />
        </Route>
        <Route exact path={`${url}/record/session`}>
          <ExperimentRecordSessionView
            experiment={experiments.get(experimentId) as ExperimentData}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrder}
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onEnd={(newData): void => onNewWeights(newData)}
            cageIds={cageList}
          />
        </Route>
        <Route exact path={`${url}/record/summary`}>
          <SessionSummary
            updatedExperiments={experiments.get(experimentId) as ExperimentData}
          />
        </Route>
        <Route path="*">
          <NoMatch
            onDrawerOpen={onDrawerOpen}
            suggestedNavigationLink={Map<RouteId, DisplayName>()
              .set(`${url}/`, 'Experiment List')}
          />
        </Route>
      </Switch>
    </>
  )
}

export default ExperimentsSwitch
