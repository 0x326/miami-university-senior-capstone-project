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
  CageId, RackId, ExperimentData,
} from '../../../experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from '../../new/NewExperimentView'

import { connect, scaleData } from '../../../../apiBindings'

import DataRecordingScreen from './DataRecordingScreen'


interface Props {
  experiment: ExperimentData;
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: ExperimentMetaData;
  onEnd: (newData: Map<List<number | string>, number>) => void;
  cageIds: List<number>;
}

function ExperimentRecordSessionView(props: Props): JSX.Element {
  const {
    experiment,
    rackDisplayOrder,
    cageDisplayOrder,
    experimentMetadata,
    onEnd,
  } = props

  const {
    experimentName,
    treatments,
    experimentLeadName,
    startDate,
    lastUpdated,
    sessionCount,
    bottlesPerCage,
    // weighsPerBottle,
  } = experimentMetadata

  const sessLim = experimentMetadata.sessionCount
  const [newData, setNewData] = useState(Map<List<number | string>, number>())
  const [refsToRecord] = useState((): [RackId, CageId, BottleType, boolean][] => {
    const ret: [RackId, CageId, BottleType, boolean][] = []
    // first collect rid cids that need a post session
    for (const bott of treatments) {
      for (const rid of rackDisplayOrder.toArray()) {
        const cids = cageDisplayOrder.get(rid, null)
        if (cids !== null) {
          for (const cid of cids.toArray()) {
            const cage = experiment.getIn([rid, cid], null)
            if (cage === null)
              continue
            const lastSess = cage.get(-1, null)
            if (lastSess === null)
              continue
            if (lastSess.cageSessionData.size === 1) // then it must need a post session
              ret.push([rid, cid, bott, true])
          }
        }
      }
    }
    // then collect rid cids in need of pre session
    for (const bott of treatments) {
      for (const rid of rackDisplayOrder.toArray()) {
        const cids = cageDisplayOrder.get(rid, null)
        if (cids !== null) {
          for (const cid of cids.toArray()) {
            const cage = experiment.getIn([rid, cid], null)
            if (cage === null) {
              continue
            }
            const lastSess = cage.get(-1, null)
            if (lastSess === null) // then it's a brand new cage (needs a pre session)
              ret.push([rid, cid, bott, false])
            else if (lastSess.sessionNumber < sessLim && lastSess.cageSessionData.size == 2)
              ret.push([rid, cid, bott, false])
          }
        }
      }
    }
    console.log("rec order", ret)
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

      <h1>Recording POST sessions THEN PRE </h1>
      <span>{JSON.stringify(newData.toJS())}</span>

      // todo: refactor this
      <DataRecordingScreen
        bottleName={refsToRecord.length > 0
          ? `Cage ${refsToRecord[0][1]}, Bottle (${refsToRecord[0][2]})`
          : null}
        isLast={refsToRecord.length === 0}
        onSubmit={(weight: number): void => {
          const refToRecord = refsToRecord.shift()
          if (refToRecord) {
            const [rid, cid, bott, isPre] = refToRecord
            console.log(experiment.getIn([rid, cid]).toJS())
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
