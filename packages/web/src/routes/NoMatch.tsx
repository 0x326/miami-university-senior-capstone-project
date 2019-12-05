import React, {
  useEffect,
} from 'react'

import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@rmwc/top-app-bar'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'

import {
  useLocation,
  Link,
} from 'react-router-dom'

import {
  captureEvent as sentryCaptureEvent,
} from '@sentry/browser'
import { Typography } from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import {
  RouteMap,
} from '../types'

interface Props {
  onDrawerOpen: () => void;
  suggestedNavigationLink: RouteMap;
}

function NoMatch(props: Props): JSX.Element {
  const {
    onDrawerOpen,
    suggestedNavigationLink,
  } = props

  const location = useLocation()

  useEffect(() => {
    sentryCaptureEvent({
      message: '404 Error',
      timestamp: Date.now(),
      environment: location.pathname,
    })
  }, [location])

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon="menu" onClick={onDrawerOpen} />
            <TopAppBarTitle>404 - Not Found</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd />
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Typography use="headline5">Page Not Found</Typography>
      <Typography use="body1">
        <p>
          The page at
          {' '}
          <code>{location.pathname}</code>
          {' '}
          cannot be found
        </p>
        <p>
          <Typography use="overline">Common pages</Typography>
          <ul>
            {suggestedNavigationLink.entrySeq().map(([routeUrl, displayName]) => (
              <li key={routeUrl}>
                <Link to={routeUrl}>
                  {displayName}
                </Link>
              </li>
            ))}
          </ul>
        </p>
      </Typography>
    </>
  )
}

export default NoMatch
