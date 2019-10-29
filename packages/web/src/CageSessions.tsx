import React from 'react'

import {
  List,
} from 'immutable'

import {
  CollapsibleList,
  ListItem,
} from '@rmwc/list'

import CageSessionTable from './CageSessionTable'

import '@material/list/dist/mdc.list.css'

import {
  BottleState,
  BottleType,
  SessionNumber,
} from './types'

interface Props {
  cageNumber: number;
  data: List<[SessionNumber, List<[BottleState, Map<BottleType, number>]>]>;
  bottleTypes: List<BottleType>;
}

function CageSessions(props: Props): JSX.Element {
  const {
    cageNumber,
    data,
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
        {data.map(([sessionNumber, datum]) => (
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
