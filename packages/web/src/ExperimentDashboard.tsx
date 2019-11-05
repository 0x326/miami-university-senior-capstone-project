import React from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar'

import '@material/top-app-bar/dist/mdc.top-app-bar.css'

import CageSessions, {
  CageData,
} from './CageSessions'

import {
  BottleType,
} from './types'

export type CageId = number
export interface ExperimentData extends Map<CageId, CageData> {}
export interface Cages extends List<CageId> {}

interface Props {
  onDrawerOpen: () => void;
  bottleTypes: List<BottleType>;
  experimentData: ExperimentData;
  cages: Cages;
}

function ExperimentDashboard(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    bottleTypes,
    cages,
    experimentData,
  } = props

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
            <TopAppBarTitle>Experiment Dashboard</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      {cages
        .filter((cageId) => experimentData.has(cageId))
        .map((cageId) => (
          <CageSessions
            key={cageId}
            cageNumber={cageId}
            bottleTypes={bottleTypes}
            cageData={experimentData.get(cageId) as CageData}
          />
        ))}
    </>
  )
}

export default ExperimentDashboard
