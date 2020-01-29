import React, {
  FormEvent,
} from 'react'

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
  TextField,
} from '@rmwc/textfield'

import '@material/textfield/dist/mdc.textfield.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'

import {
  FormField,
} from '@rmwc/formfield'

import '@material/form-field/dist/mdc.form-field.css'

import {
  BottleState,
  BottleType,
} from '../../types'

export interface CageSessionData extends List<Readonly<{
  rowLabel: BottleState;
  rowData: Map<BottleType, number>;
}>> {}

interface Props {
  isEditable: boolean;
  sessionNumber: number;
  bottleTypes: List<BottleType>;
  data: CageSessionData;
  onDataChange: (newData: CageSessionData) => void;
}

function CageSessionTable(props: Props): JSX.Element {
  const {
    isEditable,
    sessionNumber,
    bottleTypes,
    data,
    onDataChange,
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
            {data.map(({ rowLabel, rowData }, rowIndex) => (
              <DataTableRow
                key={rowLabel}
              >
                <DataTableCell>{rowLabel}</DataTableCell>
                {bottleTypes.map((bottleType) => (
                  <DataTableCell
                    key={bottleType}
                    alignEnd
                  >
                    {isEditable === false && rowData.get(bottleType)}
                    {isEditable === true && (
                      <FormField>
                        <TextField
                          label={bottleType}
                          value={rowData.get(bottleType)}
                          onChange={(event: FormEvent<HTMLInputElement>): void => {
                            onDataChange(data
                              .set(rowIndex, {
                                rowLabel,
                                rowData: rowData.set(bottleType, Number(event.currentTarget.value)),
                              }))
                          }}
                        />
                      </FormField>
                    )}
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
