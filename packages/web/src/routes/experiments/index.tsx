import React from 'react'

import {
  useRouteMatch,
  Switch,
  Route,
} from 'react-router-dom'

import {
  List,
} from 'immutable'

import {
  RouteId,
  RouteMap,
} from '../../types'

import ExperimentList from './ExperimentList'

interface Props {
  onDrawerOpen: () => void;
  experimentIds: List<RouteId>;
  experiments: RouteMap;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    experimentIds,
    experiments,
  } = props

  const { url } = useRouteMatch() || { url: '' }

  return (
    <>
      <Switch>
        <Route exact path={`${url}/`}>
          <ExperimentList
            onDrawerOpen={onDrawerOpen}
            experimentIds={experimentIds}
            experiments={experiments}
          />
        </Route>
      </Switch>
    </>
  )
}

export default ExperimentsSwitch
