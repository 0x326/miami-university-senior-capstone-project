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

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  ExperimentMetaData,
} from '../new/NewExperimentView'

dayjs.extend(relativeTime)

interface Props {
  experimentMetadata: ExperimentMetaData;
}

function ExperimentMetadataView(props: Props): JSX.Element {
  const {
    experimentMetadata,
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
      <Typography use="body1" tag="p">
        Primary Experimentor:
        {' '}
        {experimentLeadName}
      </Typography>
      <Typography use="body1" tag="p">
        Start Date:
        {' '}
        {startDate.format('YYYY-MM-DD')}
      </Typography>
      <Typography use="body1" tag="p">
        Last Updated:
        {' '}
        {lastUpdated.fromNow()}
      </Typography>
      <Typography use="body1" tag="p">
        Sessions per Cage:
        {' '}
        {sessionCount}
      </Typography>
      <Typography use="body1" tag="p">
        Bottles per Cage:
        {' '}
        {bottlesPerCage}
      </Typography>
      <Typography use="body1" tag="p">
        Treatments:
        {' '}
        {treatments.join(', ')}
      </Typography>
    </>
  )
}

export default ExperimentMetadataView
