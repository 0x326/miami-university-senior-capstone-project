import React from 'react'

import {
  List,
  Map,
} from 'immutable'

import {
  Typography,
} from '@rmwc/typography'

import '@material/typography/dist/mdc.typography.css'

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
  bottleTypes: List<BottleType>;
  experimentData: ExperimentData;
  cages: Cages;
}

function ExperimentDashboard(props: Props): JSX.Element {
  const {
    bottleTypes,
    cages,
    experimentData,
  } = props

  return (
    <>
      <Typography use="headline1">Experiment Dashboard</Typography>
      {cages.map((cageId) => (
        <CageSessions
          key={cageId}
          cageNumber={cageId}
          bottleTypes={bottleTypes}
          cageData={experimentData.get(cageId)}
        />
      ))}
    </>
  )
}

export default ExperimentDashboard
