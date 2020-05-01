import React from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Map,
} from 'immutable'

import {
  experimentId,
} from '../../types'

import {
  ExperimentId,
} from '../../App'


import FileInput from './FileInput'
import {
  ExperimentMetaData,
} from '../experiments/new/NewExperimentView'
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarActionItem, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import {
  binToDisplay, DummyMap,
} from '../../xlsx'
import { ExperimentData, RackDisplayOrder, CageDisplayOrder } from '../experiment-dashboard/ExperimentDashboard'

interface Props {
  onDrawerOpen: () => void;
  onExperimentDataChange: (newExperimentData : Map<string, ExperimentData>,
    newMetaData: Map<string, ExperimentMetaData>,
    newRackDisplayOrder: RackDisplayOrder,
    newCageDisplayOrder: CageDisplayOrder,
    newDummyMap: DummyMap) => void,
  metaData: Map<ExperimentId, ExperimentMetaData>,
}

function LandingPage(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    onExperimentDataChange,
    metaData,
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
      onClick={e => history.push('/experiments/new')}
    >New Experiment</button>

    <FileInput
      onFileUpload={(fileData) => {
        // Call xlsx library
        const [meta, ex, rdo, cdo, dm] = binToDisplay(new Uint8Array(fileData))
        console.log(meta, ex, rdo, cdo, dm)

        // Ask parent to update experiment data
        onExperimentDataChange(ex, Map<string, ExperimentMetaData>().set(experimentId, meta), rdo, cdo, dm)

      }}
    />
    <span>{JSON.stringify(metaData)}</span>
    <br/>
    <button
      onClick={e => history.push('/')}
    >Start Session</button>
    </>
  )
}

export default LandingPage
