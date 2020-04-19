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
  experimentId,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'

import ExperimentMetadataView from './record/view/ExperimentMetadataView'
import ExperimentRecordDataView from './record/session/ExperimentRecordSessionView'
import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'
import { RackId, CageId,} from '../experiment-dashboard/ExperimentDashboard'
import ScaleApiTester from '../../ScaleApiTester'

interface Props {
  onDrawerOpen: () => void;
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: Map<ExperimentId, ExperimentMetaData>;
  onCreateExperiment: (experimentMetaData: ExperimentMetaData) => void;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    rackDisplayOrder,
    cageDisplayOrder,
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
          <br/><br/><br/><br/><br/>
          <ScaleApiTester />
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
