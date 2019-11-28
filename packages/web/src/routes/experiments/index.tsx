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
} from '../../types'

import NoMatch from '../NoMatch'

import ExperimentList from './ExperimentList'
import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'

interface Props {
  onDrawerOpen: () => void;
  experimentIds: List<RouteId>;
  experiments: RouteMap;
  onCreateExperiment: (experimentMetaData: ExperimentMetaData) => void;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    experimentIds,
    experiments,
    onCreateExperiment,
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()

  return (
    <>
      <Switch>
        <Route exact path={`${url}/`}>
          <ExperimentList
            onDrawerOpen={onDrawerOpen}
            onNewExperimentAction={(): void => history.push(`${url}/new`)}
            experimentIds={experimentIds}
            experiments={experiments}
          />
        </Route>
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={onCreateExperiment}
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
