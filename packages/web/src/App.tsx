// TODO @0x326 [2019-11-06]: Remove this eslint directive
/* eslint no-unused-vars: "warn" */

import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
} from '@rmwc/drawer'

import ExperimentDashboard, {
  ExperimentData,
  Cages,
  CageId,
} from './ExperimentDashboard'

import {
  CageData,
} from './CageSessions'

import {
  BottleType,
} from './types'

import './App.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@material/drawer/dist/mdc.drawer.css'

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [bottleTypes, setBottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentData, setExperimentData] = useState<ExperimentData>(
    Map<CageId, CageData>().withMutations((map) => map
      .set(1, List().withMutations((cageData) => cageData
        .push({
          sessionNumber: 1,
          cageSessionData: List.of(
            {
              rowLabel: 'Before',
              rowData: Map().withMutations((rowData) => rowData
                .set('H₂0', 5)
                .set('EtOH', 10)),
            },
          ),
        })))),
  )
  const [cages, setCages] = useState<Cages>(List.of(1))

  return (
    <>
      <Drawer
        modal
        open={isDrawerOpen}
        onClose={(): void => setIsDrawerOpen(false)}
      >
        <DrawerHeader>
          <DrawerTitle>Scale Interface Tool</DrawerTitle>
          <DrawerSubtitle>A Senior Design Project</DrawerSubtitle>
        </DrawerHeader>
      </Drawer>
      <ExperimentDashboard
        onDrawerOpen={(): void => setIsDrawerOpen(true)}
        bottleTypes={bottleTypes}
        experimentData={experimentData}
        cages={cages}
      />
    </>
  )
}

export default App
