import React from 'react'

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

function NewExperiment(): JSX.Element {
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
            <TopAppBarActionItem icon="done" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <FormField>
        <Grid>
          <GridCell span={4}>
            <TextField label="Experiment Name" type="text" />
          </GridCell>
          <GridCell span={4}>
            <TextField label="Experiment Lead Name" type="text" />
          </GridCell>
          <GridCell span={4}>
            <TextField label="Start date" type="date" />
          </GridCell>
          <GridCell span={4}>
            <TextField label="Number of sessions" type="number" />
          </GridCell>
          <GridCell span={4}>
            <TextField label="Bottles per cage" type="number" />
          </GridCell>
          <GridCell span={4}>
            <TextField label="Weights per bottle" type="number" />
          </GridCell>
        </Grid>
      </FormField>
    </>
  )
}

export default NewExperiment
