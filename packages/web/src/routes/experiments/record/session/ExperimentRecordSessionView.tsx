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
  CageId, RackId,
} from '../../../experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'

import { TextField } from '@rmwc/textfield'
import DataRecordingScreen from './DataRecordingScreen'


interface Props {
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: ExperimentMetaData;
  onEnd: () => void;
  cageIds: List<number>,
}

function ExperimentRecodSessionView(props: Props): JSX.Element {
  const {
    rackDisplayOrder,
    cageDisplayOrder,
    experimentMetadata,
    onEnd,
    cageIds,
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

  const [bottleTypesToRecord, setBottleTypesToRecord] = useState(List(treatments))
  const [bottleType, setBottleType] = useState<BottleType>(List(treatments).first())
  const [cageIdsToRecord, setCageIdsToRecord] = useState(cageIds)
  const [dataEntries, setDataEntries] = useState(Map<[RackId, CageId], number>())

  // [rid, cid, bott][]
  // 1, 2
  // 1: a b c
  // 2: d e
  // cids.map

  const refsToRecord: [RackId, CageId][] = []
  for (let rid of rackDisplayOrder.toArray()) {
    const cids = cageDisplayOrder.get(rid, null)
    if (cids !== null) {
      for (let _ of treatments) {
        for (let cid of cids.toArray()) {
          refsToRecord.push([rid, cid])
        }
      }
    }
  }

  // const cageIdToRecord: number = cageIdsToRecord.first()

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
        bottleName={`Rack ${refsToRecord[0]}, Bottle ${refsToRecord[1]} (${refsToRecord[2]})`}
        isLast={cageIdsToRecord.size <= 1}
        onSubmit={(weight: number): void => {
          const refToRecord = refsToRecord.shift()
          if (refToRecord) {
            const [rid, cid] = refToRecord
          }


          // if (cageDisplayOrder.get(rid, null)) {}



          // setDataEntries((prevDataEntries) => prevDataEntries
          //   .set(cageIdToRecord, weight))

          // if (cageIdsToRecord.size <= 1 && bottleTypesToRecord.size >= 2) {
          //   setCageIdsToRecord(cageIdsToRecord)

          //   const newBottleTypesToRecord = bottleTypesToRecord.shift()
          //   setBottleType(newBottleTypesToRecord.first())
          //   setBottleTypesToRecord(newBottleTypesToRecord)
          // } else {
          //   setCageIdsToRecord((prevCageIdsToRecord) => prevCageIdsToRecord.shift())
          // }

          if (cageIdsToRecord.size <= 1 && bottleTypesToRecord.size <= 1) {
            onEnd()
          }
        }}
      />
    </>
  )
}

export default ExperimentRecodSessionView
