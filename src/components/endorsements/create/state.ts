import {
  CreateEndorsementAction,
  CreateEndorsementDispatch,
  CreateEndorsementState,
  EmployeeAttributes,
} from './types';

const initialCreateEndorsementState: CreateEndorsementState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  employeeToBeEndorsed: '',
  isValidEmployeeToBeEndorsed: false,
  isEmployeeToBeEndorsedFocused: false,

  summaryOfEndorsement: '',
  isValidSummaryOfEndorsement: false,
  isSummaryOfEndorsementFocused: false,

  attributeEndorsed: ['adaptibility and flexibility'],

  triggerFormSubmit: false,
  currentStepperPosition: 0,
  stepsInError: new Set(),

  isSubmitting: false,
  submitMessage: '',
  isSuccessful: false,
  successMessage: '',
  isLoading: false,
  loadingMessage: '',
};

const createEndorsementAction: CreateEndorsementAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setEmployeeToBeEndorsed: 'setEmployeeToBeEndorsed',
  setIsValidEmployeeToBeEndorsed: 'setIsValidEmployeeToBeEndorsed',
  setIsEmployeeToBeEndorsedFocused: 'setIsEmployeeToBeEndorsedFocused',

  setSummaryOfEndorsement: 'setSummaryOfEndorsement',
  setIsValidSummaryOfEndorsement: 'setIsValidSummaryOfEndorsement',
  setIsSummaryOfEndorsementFocused: 'setIsSummaryOfEndorsementFocused',

  setAttributeEndorsed: 'setAttributeEndorsed',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsSubmitting: 'setIsSubmitting',
  setSubmitMessage: 'setSubmitMessage',
  setIsSuccessful: 'setIsSuccessful',
  setSuccessMessage: 'setSuccessMessage',
  setIsLoading: 'setIsLoading',
  setLoadingMessage: 'setLoadingMessage',
};

function createEndorsementReducer(
  state: CreateEndorsementState,
  action: CreateEndorsementDispatch
): CreateEndorsementState {
  switch (action.type) {
    case createEndorsementAction.setTitle:
      return {
        ...state,
        title: action.payload,
      };
    case createEndorsementAction.setIsValidTitle:
      return {
        ...state,
        isValidTitle: action.payload,
      };
    case createEndorsementAction.setIsTitleFocused:
      return {
        ...state,
        isTitleFocused: action.payload,
      };

    case createEndorsementAction.setEmployeeToBeEndorsed:
      return {
        ...state,
        employeeToBeEndorsed: action.payload,
      };
    case createEndorsementAction.setIsValidEmployeeToBeEndorsed:
      return {
        ...state,
        isValidEmployeeToBeEndorsed: action.payload,
      };
    case createEndorsementAction.setIsEmployeeToBeEndorsedFocused:
      return {
        ...state,
        isEmployeeToBeEndorsedFocused: action.payload,
      };

    case createEndorsementAction.setSummaryOfEndorsement:
      return {
        ...state,
        summaryOfEndorsement: action.payload,
      };
    case createEndorsementAction.setIsValidSummaryOfEndorsement:
      return {
        ...state,
        isValidSummaryOfEndorsement: action.payload,
      };
    case createEndorsementAction.setIsSummaryOfEndorsementFocused:
      return {
        ...state,
        isSummaryOfEndorsementFocused: action.payload,
      };

    case createEndorsementAction.setAttributeEndorsed: {
      return {
        ...state,
        attributeEndorsed: action.payload,
      };
    }

    case createEndorsementAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createEndorsementAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createEndorsementAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }

    case createEndorsementAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createEndorsementAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createEndorsementAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createEndorsementAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createEndorsementAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createEndorsementAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createEndorsementAction,
  createEndorsementReducer,
  initialCreateEndorsementState,
};
