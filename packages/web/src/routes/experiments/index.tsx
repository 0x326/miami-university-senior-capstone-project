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
  const [updatedExperiments, setUpdatedExperiments] = useState(Map<string, ExperimentData>())
  const [workbookDownload, setWorkbookDownload] = useState(Map<string, XLSX.WorkBook>())

  return (
    <>
      <Switch>
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={(experimentMetaData): void => {
              onCreateExperiment(experimentMetaData)
            }}
          />
        </Route>
        <Route exact path={`${url}/record/view`}>
          <ExperimentMetadataView
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onAddCages={(): void => history.push(`${url}/add-cage`)}
            onRecord={(): void => {
              // TODO: Add check for 1 or more cages in an experiment.
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

              // temporary. download updated experiment data for verification
              console.log('to xlsx')
              const wb = displayToWB(experimentMetadata.get(experimentId) as any,
                expWithNewData.get(experimentId) as any,
                rackDisplayOrder, cageDisplayOrder, dummyMap, comments)

              setWorkbookDownload(Map<string, XLSX.WorkBook>().set(experimentId, wb))
              XLSX.writeFile(wb, 'out.xlsx')

              history.push(`${url}/record/summary`)
            }}
          />
        </Route>
        <Route exact path={`${url}/record/summary`}>
          <SessionSummary
            onStartNewSession={() => {
              onStartNewSession()
            }}
            updatedExperiments={updatedExperiments.get(experimentId) as ExperimentData}
            workbook={workbookDownload.get(experimentId) as XLSX.WorkBook}
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
