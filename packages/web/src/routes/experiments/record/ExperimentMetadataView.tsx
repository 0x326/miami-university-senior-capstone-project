import React, {
  useState,
} from 'react'

import {
  TopAppBar,
  TopAppBarActionItem,
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

import {
  ExperimentMetaData,
} from '../new/NewExperimentView'

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
    weighsPerBottle,
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
        {lastUpdated.format('YYYY-MM-DD')}
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
        Weights per Bottle:
        {' '}
        {weighsPerBottle}
      </Typography>
    </>
  )
}

export default ExperimentMetadataView
