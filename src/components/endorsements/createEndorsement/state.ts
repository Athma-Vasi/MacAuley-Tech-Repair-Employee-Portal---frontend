import {
  CreateEndorsementAction,
  CreateEndorsementDispatch,
  CreateEndorsementState,
} from './types';

const initialCreateEndorsementState: CreateEndorsementState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  userToBeEndorsed: '',
  isValidUserToBeEndorsed: false,
  isUserToBeEndorsedFocused: false,

  summaryOfEndorsement: '',
  isValidSummaryOfEndorsement: false,
  isSummaryOfEndorsementFocused: false,

  attributeEndorsed: 'adaptibility and flexibility',

  currentStepperPosition: 0,
  stepsInError: new Set(),

  isError: false,
  errorMessage: '',
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

  setUserToBeEndorsed: 'setUserToBeEndorsed',
  setIsValidUserToBeEndorsed: 'setIsValidUserToBeEndorsed',
  setIsUserToBeEndorsedFocused: 'setIsUserToBeEndorsedFocused',

  setSummaryOfEndorsement: 'setSummaryOfEndorsement',
  setIsValidSummaryOfEndorsement: 'setIsValidSummaryOfEndorsement',
  setIsSummaryOfEndorsementFocused: 'setIsSummaryOfEndorsementFocused',

  setAttributeEndorsed: 'setAttributeEndorsed',

  setCurrentStepperPosition: 'setCurrentStepperPosition',
  setStepsInError: 'setStepsInError',

  setIsError: 'setIsError',
  setErrorMessage: 'setErrorMessage',
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

    case createEndorsementAction.setUserToBeEndorsed:
      return {
        ...state,
        userToBeEndorsed: action.payload,
      };
    case createEndorsementAction.setIsValidUserToBeEndorsed:
      return {
        ...state,
        isValidUserToBeEndorsed: action.payload,
      };
    case createEndorsementAction.setIsUserToBeEndorsedFocused:
      return {
        ...state,
        isUserToBeEndorsedFocused: action.payload,
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

    case createEndorsementAction.setAttributeEndorsed:
      return {
        ...state,
        attributeEndorsed: action.payload,
      };

    case createEndorsementAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createEndorsementAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      if (kind === 'add') {
        stepsInError.add(step);
      }
      if (kind === 'delete') {
        stepsInError.delete(step);
      }
      return {
        ...state,
        stepsInError,
      };
    }

    case createEndorsementAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createEndorsementAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
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
