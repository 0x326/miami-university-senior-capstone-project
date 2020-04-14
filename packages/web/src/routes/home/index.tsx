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

import {
  DisplayName,
  RouteId,
  RouteMap,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'


import FileInput from './FileInput'
import NewExperiment, {
  ExperimentMetaData,
} from '../experiments/new/NewExperimentView'
import { Button } from '@rmwc/button'
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarActionItem, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'
import { Tooltip } from '@rmwc/tooltip'

interface Props {
  onDrawerOpen: () => void;
}

function LandingPage(props: Props): JSX.Element {
  const {
    onDrawerOpen,
  } = props

  const [file, setFile] = useState("A file");
  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()

  return (
    <>
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
          <TopAppBarTitle>Home</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust />
    <Button
      onClick={e => history.push('/experiments/new') }
    >New Experiment</Button>
    <Button
      value={file}
      onClick={e => setFile("New File")}
      type="file"
    >Import Experiment</Button>
    <span>{file}</span>
    </>
  )
}

export default LandingPage
