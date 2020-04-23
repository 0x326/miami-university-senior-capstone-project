/* eslint-disable linebreak-style */
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

import { List, Map } from 'immutable'

import { ExperimentId } from '../../../App'
import { ExperimentData, CageDisplayOrder, RackDisplayOrder } from '../../experiment-dashboard/ExperimentDashboard'
import { DisplayName } from '../../../types'

import { ExperimentMetaData } from '../new/NewExperimentView'


interface Props {
// experimentMetadata: Map<ExperimentId, ExperimentMetaData>;
// experimentsMap: Map<ExperimentId, ExperimentData>;
// experimentDisplayNames: Map<ExperimentId, DisplayName>;
// experimentDisplayOrder: List<ExperimentId>;
// cageDisplayOrders: CageDisplayOrder;
// rackDisplayOrder: RackDisplayOrder;
}

function AddCages(props: Props): JSX.Element {
  // const {
  //   // experimentMetadata,
  //   // experimentsMap,
  //   // experimentDisplayNames,
  //   // experimentDisplayOrder,
  //   // cageDisplayOrders,
  //   // rackDisplayOrder,
  // } = props

  const history = useHistory()

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon
              icon="chevron_left"
              onClick={(e) => history.goBack()}
            />
            <TopAppBarTitle>add cages</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
        </TopAppBarRow>
      </TopAppBar>
      <FormField>
        <Grid>
          <GridCell span={4}>
            <TextField
              label="Cages to add"
              type="number"
              value={0}
            />
          </GridCell>
        </Grid>
      </FormField>
    </>
  )
}

export default AddCages
