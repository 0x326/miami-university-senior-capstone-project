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

import {
  DisplayName,
  RouteId,
  experimentId,
  BottleState,
  BottleType,
} from '../../types'

import NoMatch from '../NoMatch'
import {
  ExperimentId,
} from '../../App'

import ExperimentMetadataView from './record/view/ExperimentMetadataView'
import ExperimentRecordDataView from './record/session/ExperimentRecordSessionView'
import NewExperiment, {
  ExperimentMetaData,
} from './new/NewExperimentView'
import { RackId, CageId, ExperimentData, } from '../experiment-dashboard/ExperimentDashboard'
import ScaleApiTester from '../../ScaleApiTester'
import { Experiment } from 'api-interfaces/dist/common'
import { CageData } from '../experiment-dashboard/CageSessions'

import {
  displayToWB, DummyMap, Comments
} from '../../xlsx'

import * as XLSX from 'xlsx'
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
  connectScale:() => void;
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
    experimentMetadata,
    dummyMap,
    comments,
    connectScale,
    scaleConnectionStatus,
    connectionStatus,
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()
  const cages = [1, 2, 3, 4, 5]
  const cageList = List(cages)
  const [updatedExperiments, setUpdatedExperiments] = useState(Map<string, ExperimentData>());
  const [workbookDownload, setWorkbookDownload] = useState(Map<string, XLSX.WorkBook>())

  return (
    <>
      <Switch>
        <Route exact path={`${url}/new`}>
          <NewExperiment
            onCancelAction={(): void => history.push(`${url}/`)}
            onDoneAction={onCreateExperiment}
          />
        </Route>
        <Route exact path={`${url}/record/view`}>
          <ExperimentMetadataView
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onAddCages={(): void => history.push(`${url}/add-cage`)}
            onRecord={(): void => {
              if(scaleConnectionStatus) {
                history.push(`${url}/record/session`)
              } else {
                const scaleCheck = window.confirm("The scale is currently not connected. Continuing will require enterting weights manually.\n\nWould you like to continue?")
                if(scaleCheck) {
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
            addCages={(numberCages): void => console.log(numberCages)}
          />
        </Route>
        <Route exact path={`${url}/record/session`}>
          <ExperimentRecordDataView
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrder}
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onEnd={(newData): void => {
              let updatedExperiments = experiments.asMutable()
              console.log('before')
              console.log(updatedExperiments.toJS())

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


              grouped.entrySeq().forEach(e => {
                const [rid, cid] = e[0].toArray()
                const botts = e[1].toArray()

                let cageData = updatedExperiments.getIn([experimentId, rid, cid]) as CageData
                const last = cageData.last(null)
                const isNewSession = last ? last.cageSessionData.size === 2 : true // 2 because pre and post

                const rowData = Map<BottleType, number>().withMutations(rowData => {
                  for (let bott of botts) {
                    rowData.set(bott, newData.get(List.of<any>(rid, cid, bott)) as any)
                  }
                })

                if (isNewSession) {
                  // when new session, append pre to new session
                  cageData = cageData.push({
                    sessionNumber: last ? last.sessionNumber + 1 : 1,
                    cageSessionData: List.of<any>({
                      rowLabel: "pre",
                      rowData: rowData,
                    })
                  })
                  updatedExperiments.setIn([experimentId, rid, cid], cageData)
                } else {
                  // otherwise, append a post to past session
                  let past = cageData.get(-1)
                  let toUpdate = cageData.pop()
                  if (past) {
                    const updated = toUpdate.push({
                      sessionNumber: past.sessionNumber,
                      cageSessionData: past.cageSessionData.push({
                        rowLabel: 'post',
                        rowData: rowData as any,
                      })
                    })
                    cageData = updated
                  }
                  updatedExperiments.setIn([experimentId, rid, cid], cageData)
                }
              })
              console.log('after')
              updatedExperiments = updatedExperiments.asImmutable()
              setUpdatedExperiments(updatedExperiments)
              console.log(updatedExperiments.toJS())

              // temporary. download updated experiment data for verification
              console.log('to xlsx')
              const wb = displayToWB(experimentMetadata.get(experimentId) as any,
                updatedExperiments.get(experimentId) as any,
                rackDisplayOrder, cageDisplayOrder, dummyMap, comments)

              setWorkbookDownload(Map<string, XLSX.WorkBook>().set(experimentId, wb))
              // XLSX.writeFile(wb, 'out.xlsx')


              history.push(`${url}/record/summary`)
            }}
            cageIds={cageList}
          />
        </Route>
        <Route exact path={`${url}/record/summary`}>
          <SessionSummary
            updatedExperiments= {updatedExperiments.get(experimentId) as ExperimentData}
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
