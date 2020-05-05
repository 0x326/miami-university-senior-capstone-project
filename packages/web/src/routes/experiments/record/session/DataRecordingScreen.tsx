import React, {
  useState,
  useEffect,
} from 'react'

import {
  Typography,
} from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import { Button } from '@rmwc/button'

import { TextField } from '@rmwc/textfield'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Measurement, MeasurementType } from 'api-interfaces/dist/scale-data'

import {
  scaleData,
} from '../../../../apiBindings'

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

  const [weight, setWeight] = useState<Measurement>({
    value: 0,
    type: MeasurementType.STABLE_WEIGHT,
    unit: 'g',
  })

  useEffect(() => {
    try {
      scaleData((measurement) => {
        setWeight(measurement)
      })
      // eslint-disable-next-line no-empty
    } catch (error) { }
  })

  return (
    <>
      <Typography use="body1" tag="p">
        {bottleName}
        <br />
        <TextField
          label="Enter Weight"
          type="double"
          value={weight.value}
          onChange={(newWeight): void => setWeight({
            type: MeasurementType.STABLE_WEIGHT,
            value: newWeight.currentTarget.value,
            unit: 'g',
          })}
        />
      </Typography>

      <Button
        raised
        onClick={(): void => onSubmit(weight.value)}
        label={!isLast ? 'Next' : 'Finish'}
      />
    </>
  )
}

export default DataRecordingScreen
