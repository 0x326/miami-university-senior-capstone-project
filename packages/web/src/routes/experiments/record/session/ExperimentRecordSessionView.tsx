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
import { TextField } from '@rmwc/textfield'


dayjs.extend(relativeTime)

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
      <Typography use="body1" tag="p">
        Bottle 1
        <br/>
        <TextField
          label="Enter Weight"
          type="double"
        />
      </Typography>

      {/* while (int i<{...bottlesPerCage}) {

      } */}
      <Button label="Finish" raised onClick={onEnd} />
    </>
  )
}

export default ExperimentRecodSessionView
