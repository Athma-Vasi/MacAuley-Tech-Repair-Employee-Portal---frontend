import './style.css';

import { faCheck, faExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Group, Stepper, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';

import { numberSpellingMap } from './constants';
import type { StepperWrapperProps } from './types';

function StepperWrapper({
  allowNextStepsSelect = false,
  children,
  descriptionObjectsArray,
  stepsInError,
  maxStepperPosition,
  currentStepperPosition,
  setCurrentStepperPosition,
  parentComponentDispatch,
}: StepperWrapperProps) {
  const stepperRef = useRef<HTMLButtonElement>(null);

  // sets focus on current step on each form page, for screen reader accessibility
  useEffect(() => {
    stepperRef.current?.focus();
  }, [currentStepperPosition]);

  const successMessage = '˖ ࣪‧₊˚⋆✩٩(ˊᗜˋ*)و ✩  Looks great! You are good to go!';
  const errorMessage = `(｡•́︿•̀｡)  Oh dear! Looks like there ${
    stepsInError.size > 1 ? 'are' : 'is'
  } ${stepsInError.size > 1 ? 'some' : 'an'} error${
    stepsInError.size > 1 ? 's' : ''
  } on step${stepsInError.size > 1 ? 's' : ''}: ${
    Array.from(stepsInError)
      .sort((a, z) => (a < z ? -1 : a > z ? 1 : 0))
      .map((step) => {
        const numberSpelling = numberSpellingMap.get(step);
        return `${numberSpelling
          ?.charAt(0)
          .toUpperCase()}${numberSpelling?.slice(1)}`;
      })
      .join(', ') ?? ''
  }. Please fix the error to proceed!`;

  return (
    <>
      <Stepper
        active={currentStepperPosition}
        onStepClick={(step) => {
          parentComponentDispatch({
            type: setCurrentStepperPosition,
            payload: step,
          });
        }}
        breakpoint="sm"
        allowNextStepsSelect={allowNextStepsSelect}
      >
        {descriptionObjectsArray.map((value, index) => {
          const { ariaLabel, description } = value;

          const capsLabel = `Step ${numberSpellingMap
            .get(index)?.[0]
            .toUpperCase()}${numberSpellingMap.get(index)?.slice(1)}`;

          return (
            <Stepper.Step
              key={`step-${index}`}
              label={capsLabel}
              description={description}
              aria-label={ariaLabel}
              aria-current={
                currentStepperPosition === index ? 'step' : undefined
              }
              //the mantine stepper uses 0-based indexing
              ref={currentStepperPosition === index ? stepperRef : undefined}
              className="hide-outline"
              color={stepsInError.has(index) ? 'red' : undefined}
              completedIcon={
                stepsInError.has(index) ? (
                  <FontAwesomeIcon icon={faX} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} />
                )
              }
            >
              <Text>{description}</Text>
            </Stepper.Step>
          );
        })}

        {/* final page */}
        <Stepper.Completed>
          <Text color="dark">
            {stepsInError.size === 0 ? successMessage : errorMessage}
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
            parentComponentDispatch({
              type: setCurrentStepperPosition,
              payload: currentStep > 0 ? currentStep - 1 : currentStep + 1,
            });
          }}
        >
          Back
        </Button>
        <Button
          aria-label="Press enter to go to the next step in the form"
          disabled={currentStepperPosition === maxStepperPosition}
          onClick={() => {
            const currentStep = currentStepperPosition;
            parentComponentDispatch({
              type: setCurrentStepperPosition,
              payload:
                currentStep < maxStepperPosition
                  ? currentStep + 1
                  : currentStep - 1,
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

/**
 * <Stepper.Step
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
 */
