import React, { useState } from 'react'

import {
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'

import {
  CageSessionData
} from '../experiment-dashboard/CageSessionTable'

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
import ScaleApiTester from '../../ScaleApiTester'
import { CageData } from '../experiment-dashboard/CageSessions'

import {
  displayToWB, DummyMap, Comments,
} from '../../xlsx'

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
  } = props

  const { url } = useRouteMatch() || { url: '' }
  const history = useHistory()
  const cages = [1, 2, 3, 4, 5]
  const cageList = List(cages)
  // todo refactor this
  let updatedExperiments = experiments
  let updatedCdo = cageDisplayOrder
  const [x, setx] = useState(updatedExperiments)
  const [y, sety] = useState(updatedCdo)

  // why don't state vars update immediatley

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
            onRecord={(): void => history.push(`${url}/record/session`)}
            onConnect={connectScale}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ScaleApiTester />
        </Route>
        <Route path="/experiments/add-cage">
          <AddCages
            addCages={(numCages): void => {
              console.log("before", updatedExperiments.getIn([experimentId]).toJS())
              const experiment = updatedExperiments.get(experimentId)
              let lastRid = 1
              if (experiment) {
                const cageIds = experiment.keySeq().flatMap(rid => {
                  lastRid = rid
                  return (experiment.get(rid) as Map<number, CageData>).keySeq()
                }).toList()

                const newCageIds: number[] = []

                const lastElt = cageIds.get(-1, 0)
                for (let i = lastElt + 1; i <= lastElt + Number(numCages); ++i)
                  newCageIds.push(i)

                const withNewCages = updatedExperiments.asMutable()
                const withNewCdo = updatedCdo.asMutable()
                for (let cid of newCageIds) {
                  withNewCages.setIn([experimentId, lastRid, cid], List<Readonly<{
                    sessionNumber: number;
                    cageSessionData: CageSessionData;
                  }>>())
                  withNewCdo.setIn([lastRid], withNewCdo.getIn([lastRid]).push(cid)) // godless
                }
                updatedExperiments = withNewCages.asImmutable()
                updatedCdo = withNewCdo.asMutable()
                setx(updatedExperiments)
                sety(updatedCdo)
                console.log("after", updatedExperiments.getIn([experimentId]).toJS())
              }
            }}
          />
        </Route>
        <Route exact path={`${url}/record/session`}>
          <ExperimentRecordSessionView
            experiment={x.get(experimentId) as ExperimentData}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={y}
            experimentMetadata={experimentMetadata.get(experimentId) as ExperimentMetaData}
            onEnd={(newData): void => {
              let withNewData = x.asMutable()
              console.log('before')
              console.log(withNewData.toJS())

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

                let cageData = withNewData.getIn([experimentId, rid, cid]) as CageData
                const last = cageData.last(null)
                const isNewSession = last ? last.cageSessionData.size === 2 : true // 2 because pre and post

                // eslint-disable-next-line no-shadow
                const rowData = Map<BottleType, number>().withMutations((rowData) => {
                  for (const bott of botts) {
                    rowData.set(bott, newData.get(List.of<any>(rid, cid, bott)) as any)
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
                  withNewData.setIn([experimentId, rid, cid], cageData)
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
                  withNewData.setIn([experimentId, rid, cid], cageData)
                }
              })
              updatedExperiments = withNewData.asImmutable()
              setx(updatedExperiments)
              console.log('after')
              console.log(updatedExperiments.toJS())

              console.log("==cdo", updatedCdo.toJS())
              console.log("==cdo2", y.toJS())

              // temporary. download updated experiment data for verification
              console.log('to xlsx')
              const wb = displayToWB(experimentMetadata.get(experimentId) as any,
                updatedExperiments.get(experimentId) as any,
                rackDisplayOrder, y, dummyMap, comments)

              XLSX.writeFile(wb, 'out.xlsx')


              history.push(`${url}/record/summary`)
            }}
            cageIds={cageList}
          />
        </Route>
        <Route exact path={`${url}/record/summary`}>
          <SessionSummary
            updatedExperiments={updatedExperiments.get(experimentId) as ExperimentData}
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
