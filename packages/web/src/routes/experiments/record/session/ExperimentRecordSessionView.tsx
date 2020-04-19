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

import '@material/typography/dist/mdc.typography.css'

import {
  BottleType,
} from '../../../../types'

import {
  CageId, RackId,
} from '../../../experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'

import DataRecordingScreen from './DataRecordingScreen'


interface Props {
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: ExperimentMetaData;
  onEnd: () => void;
  cageIds: List<number>,
}

function ExperimentRecordSessionView(props: Props): JSX.Element {
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
  const [dataEntries, setDataEntries] = useState(Map<List<number | string>, number>())
  const [refsToRecord, setRefsToRecord] = useState((): [RackId, CageId, BottleType][] => {
    const ret: [RackId, CageId, BottleType][] = []
    for (let bott of treatments)
      for (let rid of rackDisplayOrder.toArray()) {
        const cids = cageDisplayOrder.get(rid, null)
        if (cids !== null)
          for (let cid of cids.toArray())
            ret.push([rid, cid, bott])
      }
    return ret
  })

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
        bottleName={`Rack ${refsToRecord[0][0]}, Cage ${refsToRecord[0][1]}, Bottle (${refsToRecord[0][2]})`}
        isLast={refsToRecord.length <= 1}
        onSubmit={(weight: number): void => {
          const refToRecord = refsToRecord.shift()
          console.log(refsToRecord.length)
          if (refsToRecord.length > 0 && refToRecord) {
            const [rid, cid, bott] = refToRecord
            setDataEntries(dataEntries.set(List.of<any>(rid, cid, bott), weight))
          } else {
            onEnd()
          }
        }}
      />
    </>
  )
}

export default ExperimentRecordSessionView
