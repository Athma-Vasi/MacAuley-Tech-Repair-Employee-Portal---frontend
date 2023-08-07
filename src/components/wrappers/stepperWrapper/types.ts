/**
 * An array of objects, where each object contains a description and an aria label for a step in the stepper component.
 * @typedef {Array} DescriptionObjectsArray
 * @property {string} description - The description of the step.
 * @property {string} ariaLabel - The aria label for the step.
 */
type DescriptionObjectsArray = Array<{
  description: string;
  ariaLabel: string;
}>;

/**
 * Props for the StepperWrapper component.
 * @typedef {Object} StepperWrapperProps
 * @property {string} [childrenTitle] - The title of the children.
 * @property {boolean} [allowNextStepsSelect] - Whether or not to allow the user to select steps that are not the next step.
 * @property {React.ReactNode} [children] - The component (in sections) that will be 'stepped' through.
 * @property {DescriptionObjectsArray} descriptionObjectsArray - Array of descriptions for each step.
 * @property {Set<number>} stepsInError - The set of steps that have errors.
 * @property {number} maxStepperPosition - The maximum step number. Always equal to the number of steps (either declared at author time, or if dynamically generated: computed from the length of descriptionObjectsArray).
 * @property {number} currentStepperPosition - The current step number.
 * @property {'setCurrentStepperPosition'} setCurrentStepperPosition - A string literal that is the value of ${parentComponent}Action.setCurrentStepperPosition.
 * @property {React.Dispatch<{type: 'setCurrentStepperPosition'; payload: number;}>} parentComponentDispatch - The dispatch function of the parent component.
 * @property {{id: string; dynamicSetStepperDispatch: React.Dispatch<{type: 'setCurrentStepperPositions'; payload: {id: string; currentStepperPosition: number;};}>;}} [dynamicStepperProps] - The props for a dynamic stepper. Used by the SurveyBuilder component.
 */
type StepperWrapperProps = {
  allowNextStepsSelect?: boolean | undefined;
  childrenTitle?: string;
  children?: React.ReactNode;
  currentStepperPosition: number;
  descriptionObjectsArray: DescriptionObjectsArray;
  maxStepperPosition: number;
  parentComponentDispatch?: React.Dispatch<{
    type: 'setCurrentStepperPosition';
    payload: number;
  }>;
  dynamicStepperProps?: {
    id: string;
    dynamicSetStepperDispatch: React.Dispatch<{
      type: 'setCurrentStepperPosition';
      payload: {
        id: string;
        currentStepperPosition: number;
      };
    }>;
  };

  setCurrentStepperPosition: 'setCurrentStepperPosition';
  stepsInError: Set<number>;
};

export type { DescriptionObjectsArray, StepperWrapperProps };
