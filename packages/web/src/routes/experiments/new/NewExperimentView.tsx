import React, {
  useState,
  FormEvent,
} from 'react'

import {
  TopAppBar,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@rmwc/top-app-bar'

import {
  FormField,
} from '@rmwc/formfield'
import '@material/form-field/dist/mdc.form-field.css'

import {
  Grid,
  GridCell,
} from '@rmwc/grid'

import {
  TextField,
} from '@rmwc/textfield'
import '@material/textfield/dist/mdc.textfield.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'

import {
  Tooltip,
} from '@rmwc/tooltip'
import '@rmwc/tooltip/tooltip.css'

import dayjs, {
  Dayjs,
} from 'dayjs'
import { useHistory } from 'react-router-dom'
import { Button } from '@rmwc/button'

export interface ExperimentMetaData extends Readonly<{
  experimentName: string;
  experimentLeadName: string;
  startDate: Dayjs;
  lastUpdated: Dayjs;
  sessionCount: number;
  bottlesPerCage: number;
  treatments: string[];
}> { }

interface Props {
  onCancelAction: () => void;
  onDoneAction: (experimentMetaData: ExperimentMetaData) => void;
}

function NewExperiment(props: Props): JSX.Element {
  const {
    onDoneAction,
  } = props

  const [experimentName, setExperimentName] = useState('')
  const [experimentLeadName, setExperimentLeadName] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [sessionCount, setSessionCount] = useState('1')
  const [bottlesPerCage, setBottlesPerCage] = useState('1')
  const [treatments, setTreatments] = useState('')

  const isExperimentNameValid = experimentName.length > 0
  const isExperimentLeadNameValid = experimentLeadName.length > 0
  const isStartDateValid = dayjs(startDate).isValid()
  const isSessionCountValid = Number(sessionCount) > 0
  const isBottlesPerCageValid = Number(bottlesPerCage) > 0
  const isTreatmentsValid = treatments.trim().split(',').length > 0 && treatments.trim().split(',')[0] && treatments.trim().split(',').length == Number(bottlesPerCage)

  const areAllFieldsValid = [
    isExperimentNameValid,
    isExperimentLeadNameValid,
    isStartDateValid,
    isSessionCountValid,
    isBottlesPerCageValid,
    isTreatmentsValid,
  ].every((valid) => valid)

  const history = useHistory()

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon
              icon="chevron_left"
              onClick={(): void => history.goBack()}
            />
            <TopAppBarTitle>New Experiment</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <br/>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       <h1>New Experiment Form</h1>
      </div>

      <br/>
      <br/>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <FormField>
        <Grid>
          <GridCell span={4}>
            <TextField
              label="Experiment Name"
              type="text"
              value={experimentName}
              invalid={!isExperimentNameValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setExperimentName(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Experiment Lead Name"
              type="text"
              value={experimentLeadName}
              invalid={!isExperimentLeadNameValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setExperimentLeadName(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Start date"
              type="date"
              value={startDate}
              invalid={!isStartDateValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setStartDate(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Number of sessions"
              type="number"
              value={sessionCount}
              invalid={!isSessionCountValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setSessionCount(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Bottles per cage"
              type="number"
              value={bottlesPerCage}
              invalid={!isBottlesPerCageValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setBottlesPerCage(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Treatment Names"
              type="text"
              value={treatments}
              invalid={!isTreatmentsValid}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setTreatments(event.currentTarget.value)
              }}
            />
          </GridCell>
        </Grid>
      </FormField>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label><b>Separate treatments by commas (Ex: h20, Eth0)</b></label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <b>Bottles per cage must equal the number of treatment names</b>
        </div>

          <br />
          <br />

        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
            raised
            disabled={!areAllFieldsValid}
            onClick={(): boolean | void => {
              if (areAllFieldsValid) {
                onDoneAction({
                  experimentName,
                  experimentLeadName,
                  startDate: dayjs(startDate),
                  lastUpdated: dayjs(),
                  sessionCount: Number(sessionCount),
                  bottlesPerCage: Number(bottlesPerCage),
                  treatments: treatments.trim().split(',').map((x) => x.trim()), // store as list
                })
              }
            }}
          >
            Create new experiment and begin session
          </Button>
          </div>
    </>
  )
}

export default NewExperiment
