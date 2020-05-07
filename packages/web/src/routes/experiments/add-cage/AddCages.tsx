/* eslint-disable linebreak-style */
import React, {
  useState,
  FormEvent,
} from 'react'

import {
  TopAppBar,
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

import '@rmwc/tooltip/tooltip.css'

import { useHistory } from 'react-router-dom'
import { Button } from '@rmwc/button'


interface Props {
  addCages: (numberCages: string) => void;
}

function AddCages(props: Props): JSX.Element {
  const {
    addCages,
  } = props

  const [numberCages, setNumberCages] = useState('0')
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
            <TopAppBarTitle>Add Cages</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />

      <br />
      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Add Cages</h1>
      </div>

      <br />
      <br />
      <br />

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
                label="Cages to add"
                type="number"
                value={numberCages}
                onChange={(event: FormEvent<HTMLInputElement>): void => {
                  setNumberCages(event.currentTarget.value)
                }}
              />
            </GridCell>
          </Grid>
        </FormField>
      </div>

      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          label="Submit"
          raised
          onClick={(): void => {
            addCages(numberCages)
          }}
        />
      </div>
    </>
  )
}

export default AddCages
