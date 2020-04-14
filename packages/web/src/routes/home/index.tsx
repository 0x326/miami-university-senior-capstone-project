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

import {
  binToDisplay,
} from '../../xlsx'

interface Props {
  onDrawerOpen: () => void;
  // onExperimentDataChange: (newExperimentData) => void
}

function LandingPage(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    // onExperimentDataChange,
  } = props

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

    <button
      onClick={e => history.push('/experiments/new') }
    >New Experiment</button>

    <FileInput
      onFileUpload={(fileData) => {
        // Call xlsx library
        console.log(binToDisplay(new Uint8Array(fileData)))

        // Ask parent to update experiment data
        // onExperimentDataChange(/* This is where the new imported experiment data will be inserted*/)
      }}
    />
    </>
  )
}

export default LandingPage
