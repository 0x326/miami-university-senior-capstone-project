import React from 'react'

import {
  List,
} from 'immutable'

import {
  CollapsibleList,
  ListItem,
} from '@rmwc/list'

import CageSessionTable, {
  CageSessionData,
} from './CageSessionTable'

import '@material/list/dist/mdc.list.css'

import {
  BottleType,
} from './types'

export interface CageData extends List<Readonly<{
  sessionNumber: number;
  cageSessionData: CageSessionData;
}>> {}

interface Props {
  cageNumber: number;
  cageData: CageData;
  bottleTypes: List<BottleType>;
}

function CageSessions(props: Props): JSX.Element {
  const {
    cageNumber,
    cageData,
    bottleTypes,
  } = props

  return (
    <>
      <CollapsibleList
        handle={(
          <ListItem>
            Cage
            {cageNumber}
          </ListItem>
        )}
      >
        {cageData.map(({ sessionNumber, cageSessionData }) => (
          <CageSessionTable
            key={sessionNumber}
            sessionNumber={sessionNumber}
            bottleTypes={bottleTypes}
            data={cageSessionData}
          />
        ))}
      </CollapsibleList>
    </>
  )
}


export default CageSessions
