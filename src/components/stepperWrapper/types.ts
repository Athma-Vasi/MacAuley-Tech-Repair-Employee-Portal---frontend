/**
 * @key {number} - The step number. Starts with 1.
 * @property {description} - The description of the step. Will be displayed in the stepper.
 * @property {ariaLabel} - The aria-label of the step. Will be read aloud by screen readers.
 */
type DescriptionMap = Map<
  number,
  {
    description: string;
    ariaLabel: string;
  }
>;

/**
 * @property {children} - The component (in sections) that will be 'stepped' through.
 * @property {descriptionMap} - The map of descriptions for each step
 * @property {stepsInError} - The set of steps that have errors.
 * @property {maxStepperPosition} - The maximum step number. Always 1 greater than the number of steps(which is computed from the length of descriptionMap).
 * @property {currentStepperPosition} - The current step number.
 * @property {setCurrentStepperPosition} - a string literal that is the value of ${parentComponent}Action.setCurrentStepperPosition
 * @property {parentComponentDispatch} - The dispatch function of the parent component.
 */
type StepperWrapperProps = {
  children?: React.ReactNode;
  descriptionMap: DescriptionMap;
  stepsInError: Set<number>;
  maxStepperPosition: number;
  currentStepperPosition: number;
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  parentComponentDispatch: React.Dispatch<{
    type: 'setCurrentStepperPosition';
    payload: number;
  }>;
};

export type { DescriptionMap, StepperWrapperProps };
