import React, {
  useState,
  FormEvent,
} from 'react'

import {
  useHistory,
} from 'react-router-dom'

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

import dayjs from 'dayjs'

function NewExperiment(): JSX.Element {
  const history = useHistory()

  const [experimentName, setExperimentName] = useState('')
  const [experimentLeadName, setExperimentLeadName] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [sessionCount, setSessionCount] = useState('1')
  const [bottlesPerCage, setBottlesPerCage] = useState('1')
  const [weighsPerBottle, setWeighsPerBottle] = useState('1')

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
            <TopAppBarActionItem icon="done" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <FormField>
        <Grid>
          <GridCell span={4}>
            <TextField
              label="Experiment Name"
              type="text"
              value={experimentName}
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
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setBottlesPerCage(event.currentTarget.value)
              }}
            />
          </GridCell>
          <GridCell span={4}>
            <TextField
              label="Weighs per bottle"
              type="number"
              value={weighsPerBottle}
              onChange={(event: FormEvent<HTMLInputElement>): void => {
                setWeighsPerBottle(event.currentTarget.value)
              }}
            />
          </GridCell>
        </Grid>
      </FormField>
    </>
  )
}

export default NewExperiment
