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

export interface CageSessionData extends List<Readonly<{
  rowLabel: BottleState;
  rowData: Map<BottleType, number>;
}>> {}

interface Props {
  sessionNumber: number;
  bottleTypes: List<BottleType>;
  data: CageSessionData;
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
                {`Session ${sessionNumber}`}
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
            {data.map(({ rowLabel, rowData }) => (
              <DataTableRow
                key={rowLabel}
              >
                <DataTableCell>{rowLabel}</DataTableCell>
                {bottleTypes.map((bottleType) => (
                  <DataTableCell
                    key={bottleType}
                    alignEnd
                  >
                    {rowData.get(bottleType)}
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
