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
        allowNextStepsSelect={false}
      >
        {/* step one */}
        <Stepper.Step
          label="First step"
          description="Enter authentication information"
          aria-label="Authentication information"
          aria-current={currentStepperPosition === 0 ? 'step' : undefined}
        >
          <Text>Enter authentication information</Text>
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Enter personal information"
          aria-label="Personal information"
          aria-current={currentStepperPosition === 1 ? 'step' : undefined}
        >
          <Text>Enter personal information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Third step"
          description="Enter contact information"
          aria-label="Contact information"
          aria-current={currentStepperPosition === 2 ? 'step' : undefined}
        >
          <Text>Enter contact information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Fourth step"
          description="Enter additional information"
          aria-label="Additional information"
          aria-current={currentStepperPosition === 3 ? 'step' : undefined}
        >
          <Text>Enter additional information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Final step"
          description="Review information"
          aria-label="Review information"
          aria-current={currentStepperPosition === 4 ? 'step' : undefined}
        >
          <Text>Review information</Text>
        </Stepper.Step>

        <Stepper.Completed>
          <Text color="dark">
            Looks great! Click back button to modify any information.
          </Text>
        </Stepper.Completed>
      </Stepper>
      {children}
    </>
  );
}

export { StepperWrapper };
