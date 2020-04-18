import React from 'react'

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

import {
  DisplayName,
  RouteId,
  RouteMap,
  experimentId,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'

import ExperimentList from './ExperimentList'
import ExperimentMetadataView from './record/view/ExperimentMetadataView'
import ExperimentRecordDataView from './record/session/ExperimentRecordSessionView'
import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'
import { RackId, CageId,} from '../experiment-dashboard/ExperimentDashboard'

interface Props {
  onDrawerOpen: () => void;
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  // experimentIds: List<RouteId>;
  // experiments: RouteMap;
  experimentMetadata: Map<ExperimentId, ExperimentMetaData>;
  onCreateExperiment: (experimentMetaData: ExperimentMetaData) => void;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    rackDisplayOrder,
    cageDisplayOrder,
    // experimentIds,
    // experiments,
    onCreateExperiment,
    experimentMetadata,
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()
  const cages = [1,2,3,4,5];
  const cageList = List(cages);

  return (
    <>
      <Switch>
        {/* <Route exact path={`${url}/`}>
          <ExperimentList
            onDrawerOpen={onDrawerOpen}
            onNewExperimentAction={(): void => history.push(`${url}/new`)}
            experimentIds={experimentIds}
            experiments={experiments}
          />
        </Route> */}
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={onCreateExperiment}
          />
        </Route>
        <Route exact path={`${url}/record/view`}>
          <ExperimentMetadataView
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onRecord={(): void => history.push(`${url}/record/session`)}
          />
        </Route>
        <Route exact path={`${url}/record/session`}>
          <ExperimentRecordDataView
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrder}
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onEnd={(): void => history.push(`${url}/record/view`)}
            cageIds={cageList}
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
