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

// eslint-disable-next-line import/no-extraneous-dependencies
import '@material/list/dist/mdc.list.css'
import '@rmwc/list/collapsible-list.css'

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
          <SimpleListItem
            text={`Cage ${cageNumber}`}
            metaIcon="chevron_right"
          />
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
