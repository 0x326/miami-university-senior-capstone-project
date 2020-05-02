import React, {
  useState,
  useEffect,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  Route,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom'

import * as XLSX from 'xlsx'

import ExperimentDashboard, {
  ExperimentData,
  CageDisplayOrder,
  RackDisplayOrder,
  RackId,
  CageId,
} from './routes/experiment-dashboard/ExperimentDashboard'

import {
  ExperimentMetaData,
} from './routes/experiments/new/NewExperimentView'

import ExperimentsSwitch from './routes/experiments'

import {
  BottleType,
  RouteId,
  DisplayName,
  RouteMap,
  experimentId,
} from './types'

import useSnackbar from './useSnackbar'

import {
  connect,
} from './apiBindings'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import AppModalDrawer from './AppModalDrawer'
import NoMatch from './routes/NoMatch'
import ScaleApiTester from './ScaleApiTester'
import LandingPage from './routes/home'
import AddCages from './routes/experiments/add-cage/AddCages'
import { CageData } from './routes/experiment-dashboard/CageSessions'
import { CageSessionData } from './routes/experiment-dashboard/CageSessionTable'
import { displayToWB } from './xlsx'

export type ExperimentId = RouteId

const viewOptions: RouteMap = Map<ExperimentId, DisplayName>().withMutations((map) => map
  .set('experiment-dashboard', 'Experiment Dashboard')
  .set('experiments', 'Experiments')
  .set('scale-api-tester', 'Scale API tester'))

const App: React.FC = () => {
  const history = useHistory()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [snackbar] = useSnackbar()

  const [bottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentMetadata, setExperimentMetadata] = useState(Map<ExperimentId, ExperimentMetaData>())
  const [experiments, setExperiments] = useState(Map<ExperimentId, ExperimentData>())
  const [cageDisplayOrders, setCageDisplayOrders] = useState(Map<RackId, List<CageId>>())
  const [rackDisplayOrder, setRackDisplayOrder] = useState(List<RackId>())
  const [dummyMap, setDummyMap] = useState(Map<List<number>, boolean>())
  const [comments, setComments] = useState({})

  const [connected, setConnected] = useState(false)

  return (
    <>
      <AppModalDrawer
        title="Scale Interface Tool"
        subtitle="A Senior Design Project"
        open={isDrawerOpen}
        onClose={(): void => setIsDrawerOpen(false)}
        viewOptions={viewOptions}
      />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/experiment-dashboard">
          <ExperimentDashboard
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            bottleTypes={bottleTypes}
            experimentData={experiments.get('experiment-1') as ExperimentData}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrders={cageDisplayOrders}
          />
        </Route>
        <Route path="/experiments">
          <ExperimentsSwitch
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            experimentMetadata={experimentMetadata}
            experiments={experiments}
            rackDisplayOrder={rackDisplayOrder}
            cageDisplayOrder={cageDisplayOrders}
            dummyMap={dummyMap}
            comments={comments}
            onCreateExperiment={((experimentMetaData): void => {
              // assuming just 1 rack for now
              setExperimentMetadata(Map<string, ExperimentMetaData>().set(experimentId, experimentMetaData))
              let blankExp = Map<ExperimentId, ExperimentData>()
              blankExp.set(experimentId, Map<RackId, Map<CageId, CageData>>())
              blankExp = blankExp.setIn([experimentId, 1], Map<CageId, CageData>())
              setExperiments(blankExp)
              setCageDisplayOrders(Map<RackId, List<CageId>>().withMutations(x => x.set(1, List<CageId>())))
              setRackDisplayOrder(List.of<RackId>(1))
              history.push('/experiments/record/view')
            })}
            connectScale={() => {
              connect()
                .then(() => setConnected(true),
                  () => {}/* Do something for the case an error occurs */)
            }}
            onAddCages={((numCages): void => {
              console.log("before", experiments.getIn([experimentId]).toJS())
              const experiment = experiments.get(experimentId)
              let lastRid = 1
              if (experiment) {
                const cageIds = experiment.keySeq().flatMap(rid => {
                  lastRid = rid
                  return (experiment.get(rid) as Map<number, CageData>).keySeq()
                }).toList()

                const newCageIds: number[] = []

                const lastElt = cageIds.get(-1, 0)
                for (let i = lastElt + 1; i <= lastElt + numCages; ++i)
                  newCageIds.push(i)

                const withNewCages = experiments.asMutable()
                const withNewCdo = cageDisplayOrders.asMutable()
                for (let cid of newCageIds) {
                  if (cid) {
                    withNewCages.setIn([experimentId, lastRid, cid], List<Readonly<{
                      sessionNumber: number;
                      cageSessionData: CageSessionData;
                    }>>())
                    withNewCdo.setIn([lastRid], withNewCdo.getIn([lastRid]).push(cid))
                  }
                }
                console.log("withNewCages", withNewCages.toJS())
                console.log("withNewCdo", withNewCdo.toJS())
                setExperiments(withNewCages.asImmutable())
                setCageDisplayOrders(withNewCdo.asImmutable())
              }
            })}
            onNewWeights={((newData): void => {
              let withNewData = experiments.asMutable()
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
              setExperiments(withNewData.asImmutable())
              // updatedExperiments = withNewData.asImmutable()
              // setx(updatedExperiments)
              console.log('after')
              console.log(withNewData.toJS())

              // temporary. download updated experiment data for verification
              console.log('to xlsx')
              const wb = displayToWB(experimentMetadata.get(experimentId) as any,
                withNewData.asImmutable().get(experimentId) as any,
                rackDisplayOrder, cageDisplayOrders, dummyMap, comments)

              XLSX.writeFile(wb, 'out.xlsx')

              // history.push(`${url}/record/summary`)
            })}
          />
        </Route>
        <Route path="/home">
          <LandingPage
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            onExperimentDataChange={(newExperimentData, newMetaData, newRackDisplayOrder, newCageDisplayOrders,
              newDummyMap, comments): void => {
              setExperiments(newExperimentData)
              setExperimentMetadata(newMetaData)
              setRackDisplayOrder(newRackDisplayOrder)
              setCageDisplayOrders(newCageDisplayOrders)
              setDummyMap(newDummyMap)
              setComments(comments)
            }}
            metaData={experimentMetadata}
          />
        </Route>
        <Route path="/experiments/add-cage">
          <AddCages
            addCages={(numberCages): void => console.log(numberCages)}
          />
        </Route>
        <Route path="/scale-api-tester">
          <ScaleApiTester />
        </Route>
        <Route path="*">
          <NoMatch
            onDrawerOpen={(): void => setIsDrawerOpen(true)}
            suggestedNavigationLink={viewOptions}
          />
        </Route>
      </Switch>
      {snackbar}
    </>
  )
}

export default App
