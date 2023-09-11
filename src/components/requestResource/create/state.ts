import type {
  RequestResourceAction,
  RequestResourceDispatch,
  RequestResourceState,
} from './types';

const initialRequestResourceState: RequestResourceState = {
  department: 'Store Administration',
  resourceType: 'Access',

  resourceQuantity: '0',
  isValidResourceQuantity: false,
  isResourceQuantityFocused: false,

  resourceDescription: '',
  isValidResourceDescription: false,
  isResourceDescriptionFocused: false,

  reasonForRequest: '',
  isValidReasonForRequest: false,
  isReasonForRequestFocused: false,

  urgency: 'low',

  dateNeededBy: '',
  isValidDateNeededBy: false,
  isDateNeededByFocused: false,

  additionalInformation: '',
  isValidAdditionalInformation: false,
  isAdditionalInformationFocused: false,

  triggerFormSubmit: false,
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

const requestResourceAction: RequestResourceAction = {
  setDepartment: 'setDepartment',
  setResourceType: 'setResourceType',

  setResourceQuantity: 'setResourceQuantity',
  setIsValidResourceQuantity: 'setIsValidResourceQuantity',
  setIsResourceQuantityFocused: 'setIsResourceQuantityFocused',

  setResourceDescription: 'setResourceDescription',
  setIsValidResourceDescription: 'setIsValidResourceDescription',
  setIsResourceDescriptionFocused: 'setIsResourceDescriptionFocused',

  setReasonForRequest: 'setReasonForRequest',
  setIsValidReasonForRequest: 'setIsValidReasonForRequest',
  setIsReasonForRequestFocused: 'setIsReasonForRequestFocused',

  setUrgency: 'setUrgency',

  setDateNeededBy: 'setDateNeededBy',
  setIsValidDateNeededBy: 'setIsValidDateNeededBy',
  setIsDateNeededByFocused: 'setIsDateNeededByFocused',

  setAdditionalInformation: 'setAdditionalInformation',
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation',
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused',

  setTriggerFormSubmit: 'setTriggerFormSubmit',
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

function requestResourceReducer(
  state: RequestResourceState,
  action: RequestResourceDispatch
): RequestResourceState {
  switch (action.type) {
    case requestResourceAction.setDepartment:
      return {
        ...state,
        department: action.payload,
      };
    case requestResourceAction.setResourceType:
      return {
        ...state,
        resourceType: action.payload,
      };
    case requestResourceAction.setResourceQuantity:
      return {
        ...state,
        resourceQuantity: action.payload,
      };
    case requestResourceAction.setIsValidResourceQuantity:
      return {
        ...state,
        isValidResourceQuantity: action.payload,
      };
    case requestResourceAction.setIsResourceQuantityFocused:
      return {
        ...state,
        isResourceQuantityFocused: action.payload,
      };
    case requestResourceAction.setResourceDescription:
      return {
        ...state,
        resourceDescription: action.payload,
      };
    case requestResourceAction.setIsValidResourceDescription:
      return {
        ...state,
        isValidResourceDescription: action.payload,
      };
    case requestResourceAction.setIsResourceDescriptionFocused:
      return {
        ...state,
        isResourceDescriptionFocused: action.payload,
      };
    case requestResourceAction.setReasonForRequest:
      return {
        ...state,
        reasonForRequest: action.payload,
      };
    case requestResourceAction.setIsValidReasonForRequest:
      return {
        ...state,
        isValidReasonForRequest: action.payload,
      };
    case requestResourceAction.setIsReasonForRequestFocused:
      return {
        ...state,
        isReasonForRequestFocused: action.payload,
      };
    case requestResourceAction.setUrgency:
      return {
        ...state,
        urgency: action.payload,
      };
    case requestResourceAction.setDateNeededBy:
      return {
        ...state,
        dateNeededBy: action.payload,
      };
    case requestResourceAction.setIsValidDateNeededBy:
      return {
        ...state,
        isValidDateNeededBy: action.payload,
      };
    case requestResourceAction.setIsDateNeededByFocused:
      return {
        ...state,
        isDateNeededByFocused: action.payload,
      };
    case requestResourceAction.setAdditionalInformation:
      return {
        ...state,
        additionalInformation: action.payload,
      };
    case requestResourceAction.setIsValidAdditionalInformation:
      return {
        ...state,
        isValidAdditionalInformation: action.payload,
      };
    case requestResourceAction.setIsAdditionalInformationFocused:
      return {
        ...state,
        isAdditionalInformationFocused: action.payload,
      };

    case requestResourceAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case requestResourceAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case requestResourceAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }
    case requestResourceAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case requestResourceAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case requestResourceAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case requestResourceAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case requestResourceAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case requestResourceAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case requestResourceAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case requestResourceAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  initialRequestResourceState,
  requestResourceAction,
  requestResourceReducer,
};
