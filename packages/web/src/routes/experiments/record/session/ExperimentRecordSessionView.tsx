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
  CageId,
  BottleType,
} from '../../../types'

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

  const [bottleTypesToRecord, setBottleTypesToRecord] = useState(List<BottleType>())
  const [bottleType, setBottleType] = useState<BottleType>('H₂0')
  const [cageIdsToRecord, setCageIdsToRecord] = useState(List<CageId>())
  const [dataEntries, setDataEntries] = useState(Map<CageId, number>())

  const cageIdToRecord = cageIdsToRecord.first()

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
            // TODO (wael27) [2020-03-29]: Think about switching to next bottle type

            setCageIdsToRecord()  // TODO (wael27) [2020-03-29]: Reset to the full list

            const newBottleTypesToRecord = bottleTypesToRecord.shift()
            setBottleType(newBottleTypesToRecord.first())
            setBottleTypesToRecord(newBottleTypesToRecord)
          } else {
            setCageIdsToRecord((prevCageIdsToRecord) => prevCageIdsToRecord.shift())
          }

          // TODO (wael27) [2020-03-29]: Call when we are done with the last bottle of the last bottle type
          onEnd(dataEntries)
        }}
      />
    </>
  )
}

export default ExperimentRecodSessionView
