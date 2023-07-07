import { RegisterAction, RegisterDispatch } from '../types';

type DescriptionMap = Map<
  number,
  {
    /**
     * The description of the step. Will be displayed in the stepper.
     */
    description: string;
    /**
     * The aria-label of the step. Will be read aloud by screen readers.
     */
    ariaLabel: string;
  }
>;

type StepperWrapperProps = {
  children?: React.ReactNode;
  stepInError: number;
  descriptionMap: DescriptionMap;
  currentStepperPosition: number;
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  parentComponentDispatch: React.Dispatch<{
    type: 'setCurrentStepperPosition';
    payload: number;
  }>;
};

export type { DescriptionMap, StepperWrapperProps };
