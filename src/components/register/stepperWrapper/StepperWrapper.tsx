import { Button, Group, Stepper, Text } from '@mantine/core';
import type { StepperWrapperProps } from './types';
import { useEffect } from 'react';

function StepperWrapper({
  children,
  currentStepperPosition,
  registerAction,
  registerDispatch,
}: StepperWrapperProps) {
  useEffect(() => {
    console.log(
      'StepperWrapper.tsx: useEffect: currentStepperPosition: ',
      currentStepperPosition
    );
  }, [currentStepperPosition]);

  return (
    <>
      <Stepper
        active={currentStepperPosition}
        onStepClick={(step) => {
          registerDispatch({
            type: registerAction.setCurrentStepperPosition,
            payload: step,
          });
        }}
        breakpoint="sm"
      >
        {/* step one */}
        <Stepper.Step
          label="First step"
          description="Enter authentication information"
        >
          <Text>Enter authentication information</Text>
        </Stepper.Step>
        {/* step two */}
        <Stepper.Step
          label="Second step"
          description="Enter personal information"
        >
          <Text>Enter personal information</Text>
        </Stepper.Step>
        {/* step three */}
        <Stepper.Step
          label="Third step"
          description="Enter contact information"
        >
          <Text>Enter contact information</Text>
        </Stepper.Step>
        {/* step four */}
        <Stepper.Step
          label="Fourth step"
          description="Enter additional information"
        >
          <Text>Enter additional information</Text>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Review information">
          <Text>Review information</Text>
        </Stepper.Step>
        <Stepper.Completed>
          <Text>Looks great! Click back button to modify any information.</Text>
        </Stepper.Completed>

        {children ? children : null}
      </Stepper>
    </>
  );
}

export { StepperWrapper };
