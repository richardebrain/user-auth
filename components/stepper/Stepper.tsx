import React from 'react'
import { Stepper } from 'react-form-stepper'

const StepperContainer = () => {
    return (
        <Stepper
            steps={[{ label: 'step 1' }, { label: 'step 2' }, { label: 'step 2' }]}
            activeStep={1}
         
        />

    )
}

export default StepperContainer