import React from 'react'

import {
  List,
} from 'immutable'

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
  Grid,
  GridCell,
} from '@rmwc/grid'
import '@material/layout-grid/dist/mdc.layout-grid.css'

import {
  Typography,
} from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'
import {
  Card,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardPrimaryAction,
} from '@rmwc/card'
import '@material/card/dist/mdc.card.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css'

import {
  Tooltip,
} from '@rmwc/tooltip'
import '@rmwc/tooltip/tooltip.css'

import {
  RouteId,
  RouteMap,
} from '../../types'

interface Props {
  onDrawerOpen: () => void;
  onNewExperimentAction: () => void;
  experimentIds: List<RouteId>;
  experiments: RouteMap;
}

function ExperimentList(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    onNewExperimentAction,
    experimentIds,
    experiments,
  } = props

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
            <TopAppBarTitle>Experiments</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <Tooltip content="New Experiment">
              <TopAppBarActionItem
                icon="add"
                onClick={onNewExperimentAction}
              />
            </Tooltip>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Grid>
        {experimentIds.map((experimentId) => (
          <GridCell
            key={experimentId}
            span={4}
          >
            <Card>
              <CardPrimaryAction>
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                  <Typography use="headline6" tag="h2">
                    {experiments.get(experimentId) || 'Untitled'}
                  </Typography>
                </div>
              </CardPrimaryAction>
              <CardActions>
                <CardActionButtons />
                <CardActionIcons>
                  <Tooltip content="Done">
                    <CardActionIcon icon="done" />
                  </Tooltip>
                  <Tooltip content="Remove">
                    <CardActionIcon icon="delete" />
                  </Tooltip>
                </CardActionIcons>
              </CardActions>
            </Card>
          </GridCell>
        ))}
      </Grid>
    </>
  )
}

export default ExperimentList
