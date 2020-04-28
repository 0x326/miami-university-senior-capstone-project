import React, {
  useState,
} from 'react'

import {
  List,
  Map,
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
import { connect, scaleData } from '../../../../apiBindings'


interface Props {
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: ExperimentMetaData;
  onEnd: (newData: Map<List<number | string>, number>) => void;
  cageIds: List<number>;
}

function ExperimentRecordSessionView(props: Props): JSX.Element {
  const {
    rackDisplayOrder,
    cageDisplayOrder,
    experimentMetadata,
    onEnd,
  } = props

  const {
    experimentName,
    treatments,
  } = experimentMetadata

  const [newData, setNewData] = useState(Map<List<number | string>, number>())
  const [refsToRecord] = useState((): [RackId, CageId, BottleType][] => {
    const ret: [RackId, CageId, BottleType][] = []
    for (const bott of treatments) {
      for (const rid of rackDisplayOrder.toArray()) {
        const cids = cageDisplayOrder.get(rid, null)
        if (cids !== null) {
          for (const cid of cids.toArray()) {
            ret.push([rid, cid, bott])
          }
        }
      }
    }
    return ret
  })

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

      <span>{JSON.stringify(newData.toJS())}</span>

      <DataRecordingScreen
        bottleName={refsToRecord.length > 0
          ? `Cage ${refsToRecord[0][1]}, Bottle (${refsToRecord[0][2]})`
          : null}
        isLast={refsToRecord.length === 0}
        onSubmit={(weight: number): void => {
          const refToRecord = refsToRecord.shift()
          if (refToRecord) {
            const [rid, cid, bott] = refToRecord
            setNewData(newData.set(List.of<any>(rid, cid, bott), Number(weight)))
          } else {
            onEnd(newData)
          }
        }}
      />
    </>
  )
}

export default ExperimentRecordSessionView
