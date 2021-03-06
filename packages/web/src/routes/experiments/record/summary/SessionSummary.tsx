import React from 'react'

import '@rmwc/data-table/data-table.css'

import '@material/textfield/dist/mdc.textfield.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'

import '@material/form-field/dist/mdc.form-field.css'
import { Button } from '@rmwc/button'
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

interface Props {
  onRestartSession(): void;
  onStartNewSession(): void;
}

function SessionSummary(props: Props): JSX.Element {
  const {
    onRestartSession,
    onStartNewSession,
  } = props

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
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
        <Button raised onClick={() => onRestartSession()}>Restart Session</Button>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          Choose &quot;Restart Session&quot; to erase current session data and start over.
            This will keep any cages you may have added.
        </span>
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
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Choose &quot;Start New Session&quot; to record another session.</span>
      </div>
    </>
  )
}
export default SessionSummary
