import React, { useState } from 'react'

import {
  useHistory,
} from 'react-router-dom'

import {
  Map,
} from 'immutable'

import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

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
    onExperimentDataChange,
  } = props

  const history = useHistory()
  const [confirmationMessage, setConfirmMessage] = useState('No File Submission')
  const [fileIsUpload, setFileIsUpload] = useState(false)

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle>Home</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <h1>New Experiment</h1>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <br />
        <br />

        <Button
          raised
          onClick={() => history.push('/experiments/new')}
        >
          New Experiment
        </Button>
      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Choose &quot;New Experiment&quot; to create a new experiment and start a weighing session.</span>
      </div>

      <br />
      <br />
      <br />

      <hr style={{ width: '75%' }} />

      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <h1>Import Experiment</h1>

      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <span> &emsp; &emsp;&emsp;&emsp;&emsp;</span>
        <FileInput
          onFileUpload={(fileData) => {
            // Call xlsx library
            try {
              const [meta, ex, rdo, cdo, dm, co] = binToDisplay(new Uint8Array(fileData))
              console.log(meta, ex, rdo, cdo, dm)
              // Ask parent to update experiment data
              onExperimentDataChange(ex, Map<string, ExperimentMetaData>().set(experimentId, meta), rdo, cdo, dm, co)
              setConfirmMessage('File Uploaded')
              setFileIsUpload(true)
            } catch (error) {
              alert('The uploaded file is not a proper experiment file.\n\nProper Experiment files can only be created within this application.')
            }
          }}
        />
      </div>

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
            console.log('conf', confirmationMessage)
            if (fileIsUpload) {
              history.push('/experiments/record/view')
            } else {
              alert('Please upload and submit an experiment to begin session precheck.')
            }
          }}
        >
          Start Session Precheck
        </Button>
      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Choose &quot;Start Session Precheck&quot; after you have uploaded a valid experiment file.</span>
      </div>
    </>
  )
}

export default LandingPage
