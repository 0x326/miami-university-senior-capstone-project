import React from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
} from '@rmwc/drawer'
import {
  List as RMWCList,
  ListItem,
} from '@rmwc/list'
import {
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

import {
  RouteMap,
} from './types'

import '@material/drawer/dist/mdc.drawer.css'

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  viewOptions: RouteMap;
}

function AppModalDrawer(props: Props): JSX.Element {
  const {
    open,
    onClose,
    viewOptions,
  } = props

  const {
    params: {
      viewId,
    },
  } = useRouteMatch('/:viewId') || {
    params: {
      viewId: '',
    },
  }
  const history = useHistory()

  return (
    <Drawer
      modal
      open={open}
      onClose={onClose}
    >
      <DrawerHeader>
        <DrawerTitle>Scale Interface Tool</DrawerTitle>
        <DrawerSubtitle>A Senior Design Project</DrawerSubtitle>
      </DrawerHeader>
      <DrawerContent>
        <RMWCList>
          {viewOptions.entrySeq().map(([routeId, displayName]) => (
            <ListItem
              key={routeId}
              activated={routeId === viewId}
              onClick={(): void => history.push(`/${routeId}`)}
            >
              {displayName}
            </ListItem>
          ))}
        </RMWCList>
      </DrawerContent>
    </Drawer>
  )
}

export default AppModalDrawer
