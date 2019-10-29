import React from 'react'

import {
  List,
} from 'immutable'

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell,
} from '@rmwc/data-table'

import '@rmwc/data-table/data-table.css'

import {
  BottleState,
  BottleType,
} from './types'

interface Props {
  sessionNumber: number;
  bottleTypes: List<BottleType>;
  data: List<[BottleState, Map<BottleType, number>]>;
}

function CageSessionTable(props: Props): JSX.Element {
  const {
    sessionNumber,
    bottleTypes,
    data,
  } = props

  return (
    <>
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>
                Session
                {sessionNumber}
              </DataTableHeadCell>
              {bottleTypes.map((bottleType) => (
                <DataTableHeadCell
                  key={bottleType}
                  alignEnd
                >
                  {bottleType}
                </DataTableHeadCell>
              ))}
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {data.map(([label, labelData]) => (
              <DataTableRow
                key={label}
              >
                <DataTableCell>{label}</DataTableCell>
                {bottleTypes.map((bottleType) => (
                  <DataTableCell
                    key={bottleType}
                    alignEnd
                  >
                    {labelData.get(bottleType)}
                  </DataTableCell>
                ))}
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    </>
  )
}

export default CageSessionTable
