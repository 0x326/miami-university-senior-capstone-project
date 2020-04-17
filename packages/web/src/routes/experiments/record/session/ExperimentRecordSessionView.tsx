import React, {
  useState,
} from 'react'

import {
  List,
  Map
} from 'immutable'

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
  BottleType,
} from '../../../../types'

import {
  CageId,
} from '../../../experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'

import { TextField } from '@rmwc/textfield'
import DataRecordingScreen from './DataRecordingScreen'


interface Props {
  experimentMetadata: ExperimentMetaData;
  onEnd: () => void;
}

function ExperimentRecodSessionView(props: Props): JSX.Element {
  const {
    experimentMetadata,
    onEnd,
  } = props

  // const {
  //   // experimentName,
  //   experimentLeadName,
  //   startDate,
  //   lastUpdated,
  //   sessionCount,
  //   bottlesPerCage,
  // } = experimentMetadata

  const [bottleTypesToRecord, setBottleTypesToRecord] = useState(List<BottleType>())
  const [bottleType, setBottleType] = useState<BottleType>('H₂0')
  const [cageIdsToRecord, setCageIdsToRecord] = useState(List<CageId>())
  const [dataEntries, setDataEntries] = useState(Map<CageId, number>())
  const [experimentName, setExperimentName] = useState(experimentMetadata.experimentName)

  const cageIdToRecord: number = cageIdsToRecord.first()

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
        bottleName={`Bottle ${cageIdToRecord} (${bottleType})`}
        isLast={cageIdsToRecord.size <= 1}
        onSubmit={(weight: number): void => {
          setDataEntries((prevDataEntries) => prevDataEntries
            .set(cageIdToRecord, weight))

          if (cageIdsToRecord.size <= 1 && bottleTypesToRecord.size >= 2) {
            setCageIdsToRecord(cageIdsToRecord)

            const newBottleTypesToRecord = bottleTypesToRecord.shift()
            setBottleType(newBottleTypesToRecord.first())
            setBottleTypesToRecord(newBottleTypesToRecord)
          } else {
            setCageIdsToRecord((prevCageIdsToRecord) => prevCageIdsToRecord.shift())
          }

          if (cageIdsToRecord.size <= 1 && bottleTypesToRecord.size <= 1) {
            onEnd()
          }
        }}
      />
    </>
  )
}

export default ExperimentRecodSessionView
