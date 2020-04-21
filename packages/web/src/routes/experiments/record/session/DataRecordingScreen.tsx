import React, {
  useState,
} from 'react'

import {
  Typography,
} from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import { Button } from '@rmwc/button'

import { TextField } from '@rmwc/textfield'

interface Props {
  bottleName: string | null;
  isLast: boolean;
  onSubmit: (weight: number) => void;
}

function DataRecordingScreen(props: Props): JSX.Element {
  const {
    bottleName,
    isLast,
    onSubmit,
  } = props

  const [weight, setWeight] = useState(0)
  return (
    <>
      <Typography use="body1" tag="p">
        {bottleName}
        <br />
        <TextField
          label="Enter Weight"
          type="double"
          value={weight}
          onChange={(newWeight) => setWeight(newWeight.currentTarget.value)}
        />
      </Typography>

      <Button
        raised
        onClick={() => onSubmit(weight)}
        label={!isLast ? 'Next' : 'Finish'}
      />
    </>
  )
}

export default DataRecordingScreen
