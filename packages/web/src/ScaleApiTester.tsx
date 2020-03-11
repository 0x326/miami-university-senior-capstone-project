import React, {
  useState,
} from 'react'

import {
  connect,
  scaleData,
} from './apiBindings'

interface Props {

}

function ScaleApiTester(props: Props): JSX.Element {
  const {

  } = props

  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [weight, setWeight] = useState('Unknown')
  return (
    <>
      <p>
        You are currently {connectionStatus}
      </p>
      <p>
        <button onClick={() => {
          connect()
            .then(() => setConnectionStatus('connected'))
            .then(() => scaleData((measurement) => {
              // setWeight()
            }))
            .catch(() => setConnectionStatus('error'))
        }}
        >
          Connect to Node.js server
        </button>
      </p>
      <p>
        The current weight is: {weight}
      </p>
    </>
  )
}

export default ScaleApiTester
