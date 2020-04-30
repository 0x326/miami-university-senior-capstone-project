import React, {
  useState,
  useEffect,
} from 'react'
import { ExperimentData } from '../../../experiment-dashboard/ExperimentDashboard'
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

  import '@material/form-field/dist/mdc.form-field.css'
import { CageData } from '../../../experiment-dashboard/CageSessions'
import { Button } from '@rmwc/button'
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import * as XLSX from 'xlsx'

interface Props {
  updatedExperiments: ExperimentData;
  workbook: XLSX.WorkBook | undefined;
}

function SessionSummary(props: Props): JSX.Element {
  const {
    updatedExperiments,
    workbook,
  } = props

  const [data, setData] = useState("")

  return (
    <>
    <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" />
            <TopAppBarTitle>End of Session</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
      }}>
        <Button raised onClick={() => {
          if(workbook != undefined) {
            XLSX.writeFile(workbook, 'out.xlsx')
          }
        }}>Download Experiment</Button>
      </div>

      <br />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
      }}>
        <Button raised>Restart Session</Button>
      </div>
    {// TRIED MESSING WITH TABLES, FAILED MISERABLY :C
    }
        {/* <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>
                {`Session ${updatedExperiments}`}
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
      </DataTable> */}
      <span>{data}</span>
      <Button onClick={() => {
        let temp = ""
        let counter = 1;
        updatedExperiments.forEach(rack => {
          rack.forEach(cage => {
            temp += "\nCage " + counter + ": "
            const sessionData = cage.last()
            const lastSessionData = JSON.stringify(sessionData).split(':')
            temp += "Current Session Summary: " + JSON.stringify(sessionData) + '<br/>'
            // cage.forEach(cageData => {
            //   temp += "\nCurrent Session Summary: " + JSON.stringify(cageData.cageSessionData.last())
            // })
            counter++
          })
        })
        setData(temp)
      }}>Click</Button>
    </>
  )
}
export default SessionSummary
