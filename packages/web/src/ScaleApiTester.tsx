import React, {
  useState,
} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Measurement,
} from 'api-interfaces/dist'

import {
  connect,
  scaleData,
} from './apiBindings'

function ScaleApiTester(): JSX.Element {
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [weight, setWeight] = useState<Measurement | null>(null)
  return (
    <>
      <p>
        You are currently
        {' '}
        {connectionStatus}
      </p>
      <p>
        <button
          type="button"
          onClick={(): void => {
            connect()
              .then(() => setConnectionStatus('connected'))
              .then(() => scaleData((measurement) => {
                setWeight(measurement)
              }))
              .catch(() => setConnectionStatus('error'))
          }}
        >
          Connect to Node.js server
        </button>
      </p>
      <p>
        The current weight is:
        {' '}
        {weight !== null && `${weight.value} ${weight.unit}`}
      </p>
    </>
  )
}

export default ScaleApiTester
