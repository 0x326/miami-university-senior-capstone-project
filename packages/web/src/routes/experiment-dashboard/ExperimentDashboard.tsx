import React, {
  useState,
} from 'react'

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
  TopAppBarActionItem,
} from '@rmwc/top-app-bar'

import '@material/top-app-bar/dist/mdc.top-app-bar.css'

import {
  BottleType,
} from '../../types'

import CageSessions, {
  CageData,
} from './CageSessions'

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

  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editedExperimentData, setEditedExperimentData] = useState(experimentData)

  return (
    <>
      <TopAppBar>
        {isEditMode === false && (
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
              <TopAppBarTitle>Experiment Dashboard</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <TopAppBarActionItem icon="edit" title="Edit" onClick={() => setIsEditMode(true)} />
              <TopAppBarActionItem icon="cloud_download" />
            </TopAppBarSection>
          </TopAppBarRow>
        )}
        {isEditMode === true && (
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon icon="chevron_left" onClick={() => setIsEditMode(false)} />
              <TopAppBarTitle>Edit mode</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd />
          </TopAppBarRow>
        )}
      </TopAppBar>
      <TopAppBarFixedAdjust />
      {cages
        .filter((cageId) => experimentData.has(cageId))
        .map((cageId) => (
          <CageSessions
            key={cageId}
            cageNumber={cageId}
            bottleTypes={bottleTypes}
            cageData={editedExperimentData.get(cageId) as CageData}
            isEditable={isEditMode}
            onCageDataChange={(newCageData): void => {
              setEditedExperimentData(editedExperimentData.set(cageId, newCageData))
            }}
          />
        ))}
    </>
  )
}

export default ExperimentDashboard
