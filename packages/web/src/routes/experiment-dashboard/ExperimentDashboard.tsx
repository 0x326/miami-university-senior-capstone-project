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
  TopAppBarActionItem,
} from '@rmwc/top-app-bar'

import '@material/top-app-bar/dist/mdc.top-app-bar.css'


import {
  CollapsibleList,
  SimpleListItem,
} from '@rmwc/list'

import '@material/list/dist/mdc.list.css'
import '@rmwc/list/collapsible-list.css'

import {
  BottleType,
} from '../../types'

import CageSessions, {
  CageData,
} from './CageSessions'

export type RackId = number
export type CageId = number
export interface ExperimentData extends Map<RackId, Map<CageId, CageData>> {}
export interface CageDisplayOrder extends Map<RackId, List<CageId>> {}
export interface RackDisplayOrder extends List<RackId> {}

interface Props {
  onDrawerOpen: () => void;
  bottleTypes: List<BottleType>;
  experimentData: ExperimentData;
  cageDisplayOrders: CageDisplayOrder;
  rackDisplayOrder: RackDisplayOrder;
}

function ExperimentDashboard(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    bottleTypes,
    cageDisplayOrders,
    rackDisplayOrder,
    experimentData,
  } = props

  const displayableExperimentData:
    List<Readonly<[List<Readonly<[CageData, CageId]>>, RackId]>> = (rackDisplayOrder
      .map((rackId) => cageDisplayOrders.get(rackId))
      .zip(rackDisplayOrder)
      .filter(([cageDisplayOrder, rackId]) => cageDisplayOrder !== undefined
        && experimentData.has(rackId)) as List<[List<CageId>, RackId]>)
      .map(([cageDisplayOrder, rackId]) => [
        (cageDisplayOrder
          .map((cageId) => [
            (experimentData.get(rackId) as Map<CageId, CageData>).get(cageId),
            cageId,
          ])
          .filterNot(([cageData]) => cageData === undefined) as List<[CageData, CageId]>),
        rackId,
      ])

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
            <TopAppBarTitle>Experiment Dashboard</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem icon="cloud_download" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      {displayableExperimentData.map(([rackData, rackId]) => (
        <>
          <CollapsibleList
            handle={(
              <SimpleListItem
                text={`Rack ${rackId}`}
                metaIcon="chevron_right"
              />
            )}
          >
            {rackData.map(([cageData, cageId]) => (
              <CageSessions
                key={cageId}
                cageNumber={cageId}
                bottleTypes={bottleTypes}
                cageData={cageData}
              />
            ))}
          </CollapsibleList>
        </>
      ))}
    </>
  )
}

export default ExperimentDashboard
