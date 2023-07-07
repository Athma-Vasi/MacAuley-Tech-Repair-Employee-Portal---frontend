import './style.css';

import { Button, Group, Stepper, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';

import type { StepperWrapperProps } from './types';

function StepperWrapper({
  children,
  currentStepperPosition,
  parentComponentAction,
  registerDispatch,
}: StepperWrapperProps) {
  const stepperRef = useRef<HTMLButtonElement>(null);

  // sets focus on current step on each form page, for screen reader accessibility
  useEffect(() => {
    stepperRef.current?.focus();
  }, [currentStepperPosition]);

  return (
    <>
      <Stepper
        active={currentStepperPosition}
        onStepClick={(step) => {
          registerDispatch({
            type: parentComponentAction.setCurrentStepperPosition,
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
          aria-current={currentStepperPosition === 0 ? 'step' : undefined}
          ref={currentStepperPosition === 0 ? stepperRef : undefined}
          className="hide-outline"
        >
          <Text>Enter authentication information</Text>
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Enter personal information"
          aria-current={currentStepperPosition === 1 ? 'step' : undefined}
          ref={currentStepperPosition === 1 ? stepperRef : undefined}
          className="hide-outline"
        >
          <Text>Enter personal information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Third step"
          description="Enter contact information"
          aria-current={currentStepperPosition === 2 ? 'step' : undefined}
          ref={currentStepperPosition === 2 ? stepperRef : undefined}
          className="hide-outline"
        >
          <Text>Enter contact information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Fourth step"
          description="Enter additional information"
          aria-current={currentStepperPosition === 3 ? 'step' : undefined}
          ref={currentStepperPosition === 3 ? stepperRef : undefined}
          className="hide-outline"
        >
          <Text>Enter additional information</Text>
        </Stepper.Step>

        <Stepper.Step
          label="Final step"
          description="Review information"
          aria-current={currentStepperPosition === 4 ? 'step' : undefined}
          ref={currentStepperPosition === 4 ? stepperRef : undefined}
          className="hide-outline"
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

      {/* stepper nav buttons */}
      <Group position="center" mt="xl">
        <Button
          variant="default"
          aria-label="Press enter to go back to the previous step in the form"
          disabled={currentStepperPosition === 0}
          onClick={() => {
            const currentStep = currentStepperPosition;
            registerDispatch({
              type: parentComponentAction.setCurrentStepperPosition,
              payload: currentStep > 0 ? currentStep - 1 : currentStep + 1,
            });
          }}
        >
          Back
        </Button>
        <Button
          aria-label="Press enter to go to the next step in the form"
          disabled={currentStepperPosition === 4}
          onClick={() => {
            const currentStep = currentStepperPosition;
            registerDispatch({
              type: parentComponentAction.setCurrentStepperPosition,
              payload: currentStep < 4 ? currentStep + 1 : currentStep - 1,
            });
          }}
        >
          Next step
        </Button>
      </Group>
    </>
  );
}

export { StepperWrapper };
