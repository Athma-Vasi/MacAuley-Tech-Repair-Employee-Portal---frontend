import {
  CreateAnonymousRequestAction,
  CreateAnonymousRequestDispatch,
  CreateAnonymousRequestState,
} from './types';

const initialCreateAnonymousRequestState: CreateAnonymousRequestState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  secureContactNumber: '+(1)',
  isValidSecureContactNumber: false,
  isSecureContactNumberFocused: false,

  secureContactEmail: '',
  isValidSecureContactEmail: false,
  isSecureContactEmailFocused: false,

  requestKind: 'Workplace safety',

  requestDescription: '',
  isValidRequestDescription: false,
  isRequestDescriptionFocused: false,

  additionalInformation: '',
  isValidAdditionalInformation: false,
  isAdditionalInformationFocused: false,

  urgency: 'low',

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

const createAnonymousRequestAction: CreateAnonymousRequestAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setSecureContactNumber: 'setSecureContactNumber',
  setIsValidSecureContactNumber: 'setIsValidSecureContactNumber',
  setIsSecureContactNumberFocused: 'setIsSecureContactNumberFocused',

  setSecureContactEmail: 'setSecureContactEmail',
  setIsValidSecureContactEmail: 'setIsValidSecureContactEmail',
  setIsSecureContactEmailFocused: 'setIsSecureContactEmailFocused',

  setRequestKind: 'setRequestKind',

  setRequestDescription: 'setRequestDescription',
  setIsValidRequestDescription: 'setIsValidRequestDescription',
  setIsRequestDescriptionFocused: 'setIsRequestDescriptionFocused',

  setAdditionalInformation: 'setAdditionalInformation',
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation',
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused',

  setUrgency: 'setUrgency',

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

function createAnonymousRequestReducer(
  state: CreateAnonymousRequestState,
  action: CreateAnonymousRequestDispatch
): CreateAnonymousRequestState {
  switch (action.type) {
    case createAnonymousRequestAction.setTitle:
      return {
        ...state,
        title: action.payload,
      };
    case createAnonymousRequestAction.setIsValidTitle:
      return {
        ...state,
        isValidTitle: action.payload,
      };
    case createAnonymousRequestAction.setIsTitleFocused:
      return {
        ...state,
        isTitleFocused: action.payload,
      };
    case createAnonymousRequestAction.setSecureContactNumber:
      return {
        ...state,
        secureContactNumber: action.payload,
      };
    case createAnonymousRequestAction.setIsValidSecureContactNumber:
      return {
        ...state,
        isValidSecureContactNumber: action.payload,
      };
    case createAnonymousRequestAction.setIsSecureContactNumberFocused:
      return {
        ...state,
        isSecureContactNumberFocused: action.payload,
      };
    case createAnonymousRequestAction.setSecureContactEmail:
      return {
        ...state,
        secureContactEmail: action.payload,
      };
    case createAnonymousRequestAction.setIsValidSecureContactEmail:
      return {
        ...state,
        isValidSecureContactEmail: action.payload,
      };
    case createAnonymousRequestAction.setIsSecureContactEmailFocused:
      return {
        ...state,
        isSecureContactEmailFocused: action.payload,
      };
    case createAnonymousRequestAction.setRequestKind:
      return {
        ...state,
        requestKind: action.payload,
      };
    case createAnonymousRequestAction.setRequestDescription:
      return {
        ...state,
        requestDescription: action.payload,
      };
    case createAnonymousRequestAction.setIsValidRequestDescription:
      return {
        ...state,
        isValidRequestDescription: action.payload,
      };
    case createAnonymousRequestAction.setIsRequestDescriptionFocused:
      return {
        ...state,
        isRequestDescriptionFocused: action.payload,
      };
    case createAnonymousRequestAction.setAdditionalInformation:
      return {
        ...state,
        additionalInformation: action.payload,
      };
    case createAnonymousRequestAction.setIsValidAdditionalInformation:
      return {
        ...state,
        isValidAdditionalInformation: action.payload,
      };
    case createAnonymousRequestAction.setIsAdditionalInformationFocused:
      return {
        ...state,
        isAdditionalInformationFocused: action.payload,
      };
    case createAnonymousRequestAction.setUrgency:
      return {
        ...state,
        urgency: action.payload,
      };
    case createAnonymousRequestAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createAnonymousRequestAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }
    case createAnonymousRequestAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createAnonymousRequestAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createAnonymousRequestAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createAnonymousRequestAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createAnonymousRequestAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createAnonymousRequestAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createAnonymousRequestAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createAnonymousRequestAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  createAnonymousRequestAction,
  createAnonymousRequestReducer,
  initialCreateAnonymousRequestState,
};
