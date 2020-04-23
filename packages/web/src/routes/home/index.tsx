import React, { useState } from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Map,
} from 'immutable'

import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import {
  experimentId,
} from '../../types'

import {
  ExperimentId,
} from '../../App'


import {
  ExperimentMetaData,
} from '../experiments/new/NewExperimentView'

import {
  binToDisplay, DummyMap, Comments,
} from '../../xlsx'
import { ExperimentData, RackDisplayOrder, CageDisplayOrder } from '../experiment-dashboard/ExperimentDashboard'

import FileInput from './FileInput'

interface Props {
  onDrawerOpen: () => void;
  onExperimentDataChange: (newExperimentData: Map<string, ExperimentData>,
    newMetaData: Map<string, ExperimentMetaData>,
    newRackDisplayOrder: RackDisplayOrder,
    newCageDisplayOrder: CageDisplayOrder,
    newDummyMap: DummyMap,
    comments: Comments) => void;
  metaData: Map<ExperimentId, ExperimentMetaData>;
}

function LandingPage(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    onExperimentDataChange,
    metaData,
  } = props

  const history = useHistory()
  const [confirmationMessage, setConfirmMessage] = useState('')

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
        onClick={(e) => history.push('/experiments/new')}
      >
New Experiment
      </button>

      <FileInput
        onFileUpload={(fileData) => {
          // Call xlsx library
          try {
            const [meta, ex, rdo, cdo, dm, co] = binToDisplay(new Uint8Array(fileData))
            console.log(meta, ex, rdo, cdo, dm)
            // Ask parent to update experiment data
            onExperimentDataChange(ex, Map<string, ExperimentMetaData>().set(experimentId, meta), rdo, cdo, dm, co)
            setConfirmMessage('File Uploaded')
          } catch (error) {
            alert('The uploaded file is not a proper experiment file.\n\nProper Experiment files can only be created within this application.')
          }
        }}
      />
      <br />
      <span>{confirmationMessage}</span>
      <br />
      <br />
      <button
        onClick={(e) => {
          if (confirmationMessage == '') {
            alert('Please upload an experiment to begin session precheck.')
          } else {
            history.push('/experiments/record/view')
          }
        }}
      >
Start Session Precheck
      </button>
    </>
  )
}

export default LandingPage
