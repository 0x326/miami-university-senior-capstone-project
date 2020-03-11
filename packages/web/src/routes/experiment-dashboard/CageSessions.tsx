import React from 'react'

import {
  List,
} from 'immutable'

import {
  CollapsibleList,
  SimpleListItem,
} from '@rmwc/list'

import {
  BottleType,
} from '../../types'

import CageSessionTable, {
  CageSessionData,
} from './CageSessionTable'

import '@material/list/dist/mdc.list.css'
import '@rmwc/list/collapsible-list.css'


export interface CageData extends List<Readonly<{
  sessionNumber: number;
  cageSessionData: CageSessionData;
}>> { }
export interface Cage {
  isDummy: boolean;
  cageData: CageData;
}

interface Props {
  cageNumber: number;
  cageData: CageData;
  bottleTypes: List<BottleType>;
  isEditable: boolean;
  onCageDataChange: (newCageData: CageData) => void;
}

function CageSessions(props: Props): JSX.Element {
  const {
    cageNumber,
    cageData,
    bottleTypes,
    isEditable,
    onCageDataChange,
  } = props

  return (
    <>
      <CollapsibleList
        handle={(
          <SimpleListItem
            text={`Cage ${cageNumber}`}
            metaIcon="chevron_right"
          />
        )}
      >
        {cageData.map(({ sessionNumber, cageSessionData }, cageDataIndex) => (
          <CageSessionTable
            key={sessionNumber}
            sessionNumber={sessionNumber}
            bottleTypes={bottleTypes}
            data={cageSessionData}
            isEditable={isEditable}
            onDataChange={(newData): void => {
              onCageDataChange(cageData.set(cageDataIndex, {
                sessionNumber,
                cageSessionData: newData,
              }))
            }}
          />
        ))}
      </CollapsibleList>
    </>
  )
}


export default CageSessions
