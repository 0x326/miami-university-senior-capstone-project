import React, {
  useState,
} from 'react'

import {
  List,
  Map,
} from 'immutable'

import ExperimentDashboard, {
  ExperimentData,
  Cages,
  CageId,
} from './ExperimentDashboard'

import {
  CageData,
} from './CageSessions'

import {
  CageSessionData,
} from './CageSessionTable'

import {
  BottleType,
} from './types'

import './App.css'

const App: React.FC = () => {
  const [bottleTypes, setBottleTypes] = useState<List<BottleType>>(List.of('H₂0', 'EtOH'))
  const [experimentData, setExperimentData] = useState<ExperimentData>(Map((List.of(
    [1, (List.of(
      [1, (List.of(
        ['Before', Map(List.of(
          ['H₂0', 5],
          ['EtOH', 10],
        ))],
      ) as unknown as CageSessionData)],
    ) as CageData)],
  ) as List<[CageId, CageData]>)))
  const [cages, setCages] = useState<Cages>(List.of(1))

  return (
    <>
      <ExperimentDashboard
        bottleTypes={bottleTypes}
        experimentData={experimentData}
        cages={cages}
      />
    </>
  )
}

export default App
