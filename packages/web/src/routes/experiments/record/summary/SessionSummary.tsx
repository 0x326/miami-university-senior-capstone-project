import React, {
  useState,
  useEffect,
} from 'react'

import { ExperimentData } from '../../../experiment-dashboard/ExperimentDashboard'

interface Props {
  updatedExperiments: ExperimentData;
}

function SessionSummary(props: Props): JSX.Element {
  const {
    updatedExperiments,
  } = props

  return (
    <>
      <span>{JSON.stringify(updatedExperiments)}</span>
    </>
  )
}
export default SessionSummary
