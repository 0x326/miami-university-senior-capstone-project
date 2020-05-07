import React from 'react'

import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@rmwc/top-app-bar'

import {
  Typography,
} from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import { Button } from '@rmwc/button'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'


dayjs.extend(relativeTime)

interface Props {
    experimentMetadata: ExperimentMetaData;
    onRecord: () => void;
    onAddCages: () => void;
    onConnect: () => void;
    scaleConnectionStatus: boolean;
    scaleConnectionStatusLabel: string;
}

function ExperimentMetadataView(props: Props): JSX.Element {
  const {
    experimentMetadata,
    onRecord,
    onAddCages,
    onConnect,
    scaleConnectionStatusLabel,
  } = props


  const {
    experimentName,
    experimentLeadName,
    startDate,
    lastUpdated,
    sessionCount,
    bottlesPerCage,
    treatments,
  } = experimentMetadata

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" />
            <TopAppBarTitle>{experimentName}</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <h1>Experiment Information</h1>

      </div>


      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Primary Experimentor:
          {' '}
          {experimentLeadName}
        </Typography>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Start Date:
          {' '}
          {startDate.format('YYYY-MM-DD')}
        </Typography>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Last Updated:
          {' '}
          {lastUpdated.fromNow()}
        </Typography>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Sessions per Cage:
          {' '}
          {sessionCount}
        </Typography>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Bottles per Cage:
          {' '}
          {bottlesPerCage}
        </Typography>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography use="body1" tag="p">
                Treatments:
          {' '}
          {treatments.join(', ')}
        </Typography>

      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Click here to add more cages to the current experiment</span>

      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button label="Add Cages" raised onClick={onAddCages} />

      </div>

      <br />

      <hr style={{ width: '75%' }} />


      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <h1>Scale Connection</h1>

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Click here to connect to the scale</span>

      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button label="Connect Scale" raised onClick={onConnect} />

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
          {' '}
          Scale Connection Status:
          {' '}
          {scaleConnectionStatusLabel}
        </span>

      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button label="Begin" raised onClick={onRecord} />

      </div>

      <br />

    </>
  )
}

export default ExperimentMetadataView
