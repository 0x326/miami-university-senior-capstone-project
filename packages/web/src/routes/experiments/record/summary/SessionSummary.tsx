import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import '@rmwc/data-table/data-table.css'

import '@material/textfield/dist/mdc.textfield.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'

import '@material/form-field/dist/mdc.form-field.css'
import { Button } from '@rmwc/button'
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import * as XLSX from 'xlsx'

import { ExperimentData } from '../../../experiment-dashboard/ExperimentDashboard'
import { useHistory } from 'react-router-dom'

interface Props {
  onStartNewSession(): void;
  updatedExperiments: ExperimentData;
  workbook: XLSX.WorkBook | undefined;
}

function SessionSummary(props: Props): JSX.Element {
  const {
    onStartNewSession,
    updatedExperiments,
    workbook,
  } = props


  const history = useHistory()
  const [data, setData] = useState('')

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" />
            <TopAppBarTitle>End of Session</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
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
          fontSize: '24px',
        }}
      >
      <span><b>Open the downloaded experiment to ensure all values are correct.</b></span>
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
      <Button raised>Restart Session</Button>
      </div>
        <br/>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Choose "Restart Session" to erase current session data and start over.</span>
      </div>

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
        <Button raised onClick={() => { onStartNewSession() }}>Start New Session</Button>
      </div>
        <br/>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label>Choose "Start New Session" to record another session.</label>
      </div>
    </>
  )
}
export default SessionSummary
