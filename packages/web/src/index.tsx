import React from 'react'
import ReactDOM from 'react-dom'
import { init as sentryInit } from '@sentry/browser'

import {
  HashRouter,
} from 'react-router-dom'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import {
  binToDisplay,
  displayToWB,
} from './xlsx'

const {
  REACT_APP_SENTRY_DSN,
} = process.env

if (process.env.NODE_ENV === 'production' && REACT_APP_SENTRY_DSN !== undefined) {
  sentryInit({
    dsn: `https://${REACT_APP_SENTRY_DSN}@sentry.io/1830093`,
  })
}

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// TODO [2020-05-01]: Remove these once the library is actually imported at least once elsewhere in the project
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
binToDisplay
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
displayToWB
