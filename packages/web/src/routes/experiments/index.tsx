import React, { useState } from 'react'

import {
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'


import {
  List,
  Map,
} from 'immutable'

import * as XLSX from 'xlsx'

import dayjs from 'dayjs'

import {
  DisplayName,
  RouteId,
  experimentId,
  BottleType,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'

import { RackId, CageId, ExperimentData } from '../experiment-dashboard/ExperimentDashboard'

import {
  DummyMap, Comments, displayToWB,
} from '../../xlsx'


import { CageData } from '../experiment-dashboard/CageSessions'

import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'
import ExperimentRecordSessionView from './record/session/ExperimentRecordSessionView'
import ExperimentMetadataView from './record/view/ExperimentMetadataView'


import AddCages from './add-cage/AddCages'
import SessionSummary from './record/summary/SessionSummary'
// import dayjs from 'dayjs'


interface Props {
  onDrawerOpen: () => void;
  experiments: Map<ExperimentId, ExperimentData>;
  rackDisplayOrder: List<RackId>;
  cageDisplayOrder: Map<RackId, List<CageId>>;
  experimentMetadata: Map<ExperimentId, ExperimentMetaData>;
  dummyMap: DummyMap;
  comments: Comments;
  onCreateExperiment: (experimentMetaData: ExperimentMetaData) => void;
  connectScale: () => void;
  onAddCages: (numCages: number) => void;
  onNewWeights: (newData: Map<List<React.ReactText>, number>) => void;
  onRestartSession: () => void;
  onStartNewSession: () => void;
  scaleConnectionStatus: boolean;
  connectionStatus: string;
}

function ExperimentsSwitch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    experiments,
    rackDisplayOrder,
    cageDisplayOrder,
    onCreateExperiment,
    onAddCages,
    onRestartSession,
    onStartNewSession,
    experimentMetadata,
    dummyMap,
    comments,
    connectScale,
    scaleConnectionStatus,
    connectionStatus,
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()
  const [updatedExperiments, setUpdatedExperiments] = useState(experiments)
  const [updatedMetaData, setUpdatedMetaData] = useState(experimentMetadata)

  return (
    <>
      <Switch>
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={(experimentMetaData): void => {
              setUpdatedMetaData(Map<ExperimentId, ExperimentMetaData>().set(experimentId, experimentMetaData))
              onCreateExperiment(experimentMetaData)
            }}
          />
        </Route>
        <Route exact path={`${url}/record/view`}>
          <ExperimentMetadataView
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onAddCages={(): void => history.push(`${url}/add-cage`)}
            onRecord={(): void => {
              const areCages = cageDisplayOrder.keySeq()
                .reduce((acc, k) => acc || (cageDisplayOrder.get(k) as any).size > 0, false)
              if (!areCages) {
                alert('Your experiment is empty! Please add cages to record weights to.')
                return
              }
              if (scaleConnectionStatus) {
                history.push(`${url}/record/session`)
              } else {
                const scaleCheck = window.confirm('The scale is currently not connected. Continuing will require enterting weights manually.\n\nWould you like to continue?')
                if (scaleCheck) {
                  history.push(`${url}/record/session`)
                }
              }
            }}
            onConnect={connectScale}
            scaleConnectionStatus={scaleConnectionStatus}
            scaleConnectionStatusLabel={connectionStatus}
          />
        </Route>
        <Route path="/experiments/add-cage">
          <AddCages
            addCages={(numberCages): void => {
              onAddCages(Number(numberCages))
              console.log(updatedExperiments.toJS())
              history.push('/experiments/record/view')
            }}
          />
        </Route>
        <Route exact path={`${url}/record/session`}>
          <ExperimentRecordSessionView
            experiment={experiments.get(experimentId) as ExperimentData}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrder}
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onEnd={(newData): void => {
              const expWithNewData = experiments.asMutable()
              console.log('before')
              console.log(expWithNewData.toJS())

              // bottles grouped by weight for simpler iteration {[rid, cid]: [bott1, bott2, ...], ...}
              const grouped = newData.keySeq().reduce((accumulator, x) => {
                const [rid, cid, bott] = x.toArray()
                const k = List.of<any>(rid, cid)
                const alreadyStored = accumulator.get(k, null)

                if (alreadyStored === null) {
                  return accumulator.set(k, List.of(bott as string))
                }
                return accumulator.set(k, alreadyStored.push(bott as string))
              }, Map<List<number>, List<string>>())


              grouped.entrySeq().forEach((elt) => {
                const [rid, cid] = elt[0].toArray()
                const botts = elt[1].toArray()

                let cageData = expWithNewData.getIn([experimentId, rid, cid]) as CageData
                const last = cageData.last(null)
                const isNewSession = last ? last.cageSessionData.size === 2 : true // 2 because pre and post

                const rowData = Map<BottleType, number>().withMutations((rd) => {
                  for (const bott of botts) {
                    rd.set(bott, newData.get(List.of<any>(rid, cid, bott)) as any)
                  }
                })

                if (isNewSession) {
                  // when new session, append pre to new session
                  cageData = cageData.push({
                    sessionNumber: last ? last.sessionNumber + 1 : 1,
                    cageSessionData: List.of<any>({
                      rowLabel: 'pre',
                      rowData,
                    }),
                  })
                  expWithNewData.setIn([experimentId, rid, cid], cageData)
                } else {
                  // otherwise, append a post to past session
                  const past = cageData.get(-1)
                  const toUpdate = cageData.pop()
                  if (past) {
                    const updated = toUpdate.push({
                      sessionNumber: past.sessionNumber,
                      cageSessionData: past.cageSessionData.push({
                        rowLabel: 'post',
                        rowData: rowData as any,
                      }),
                    })
                    cageData = updated
                  }
                  expWithNewData.setIn([experimentId, rid, cid], cageData)
                }
              })
              console.log('after')
              setUpdatedExperiments(expWithNewData.asImmutable())
              console.log(expWithNewData.toJS())

              const mdWithCurrentDate = updatedMetaData.withMutations((mdMap) => {
                const md = mdMap.get(experimentId) as ExperimentMetaData
                md.lastUpdated = dayjs()
                mdMap.set(experimentId, md)
              })
              setUpdatedMetaData(mdWithCurrentDate)
              const md = mdWithCurrentDate.get(experimentId) as ExperimentMetaData

              console.log('md', md)

              const wb = displayToWB(md,
                expWithNewData.get(experimentId) as any,
                rackDisplayOrder, cageDisplayOrder, dummyMap, comments)

              XLSX.writeFile(wb, `${md.experimentLeadName}_${md.experimentName}_${md.lastUpdated}.xlsx`)

              history.push(`${url}/record/summary`)
            }}
          />
        </Route>
        <Route exact path={`${url}/record/summary`}>
          <SessionSummary
            onStartNewSession={() => onStartNewSession()}
            onRestartSession={() => onRestartSession()}
          />
        </Route>
        <Route path="*">
          <NoMatch
            onDrawerOpen={onDrawerOpen}
            suggestedNavigationLink={Map<RouteId, DisplayName>()
              .set(`${url}/`, 'Experiment List')}
          />
        </Route>
      </Switch>
    </>
  )
}

export default ExperimentsSwitch
