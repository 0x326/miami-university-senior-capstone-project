import React from 'react'
import ReactDOM from 'react-dom'
import { init as sentryInit } from '@sentry/browser'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const {
  REACT_APP_SENTRY_DSN,
} = process.env

if (process.env.NODE_ENV === 'production' && REACT_APP_SENTRY_DSN !== undefined) {
  sentryInit({
    dsn: `https://${REACT_APP_SENTRY_DSN}@sentry.io/1830093`,
  })
}

ReactDOM.render(<App />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
