import React, { useState } from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Map,
} from 'immutable'

import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import { Button } from '@rmwc/button'

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
  confirmationMessage: string;
  setConfirmMessage: () => void;
}

function LandingPage(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    onExperimentDataChange,
  } = props

  const history = useHistory()
  const [confirmationMessage, setConfirmMessage] = useState('Not File Submission')

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

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          raised
          onClick={() => history.push('/experiments/new')}
        >
          New Experiment
        </Button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
      </div>

      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>{confirmationMessage}</span>
      </div>

      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          raised
          onClick={() => {
            if (confirmationMessage === '') {
              alert('Please upload an experiment to begin session precheck.')
            } else {
              history.push('/experiments/record/view')
            }
          }}
        >
          Start Session Precheck
        </Button>
      </div>
    </>
  )
}

export default LandingPage
