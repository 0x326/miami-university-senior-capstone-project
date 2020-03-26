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


import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'
import {
  DataRecordingScreen,
} from './DataRecordingScreen'
import { TextField } from '@rmwc/textfield'


interface Props {
  experimentMetadata: ExperimentMetaData;
  onEnd: () => void;
}

function ExperimentRecodSessionView(props: Props): JSX.Element {
  const {
    experimentMetadata,
    onEnd,
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

      <DataRecordingScreen
        bottleName="bottle 1"
        isLast={false}
        onSubmit={(weight) => console.log(`Got weight: ${weight}`)}
      />
    </>
  )
}

export default ExperimentRecodSessionView
