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
  SessionNumber,
} from './types'

export interface CageData extends List<[SessionNumber, CageSessionData]> {}

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
        {cageData.map(([sessionNumber, datum]) => (
          <CageSessionTable
            key={sessionNumber}
            sessionNumber={sessionNumber}
            bottleTypes={bottleTypes}
            data={datum}
          />
        ))}
      </CollapsibleList>
    </>
  )
}


export default CageSessions
