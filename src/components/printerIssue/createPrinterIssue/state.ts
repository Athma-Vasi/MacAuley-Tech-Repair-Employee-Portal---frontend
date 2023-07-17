import {
  CreatePrinterIssueAction,
  CreatePrinterIssueDispatch,
  CreatePrinterIssueState,
} from './types';

const initialCreatePrinterIssueState: CreatePrinterIssueState = {
  title: '',
  isValidTitle: false,
  isTitleFocused: false,

  contactNumber: '+(1)',
  isValidContactNumber: false,
  isContactNumberFocused: false,

  contactEmail: '',
  isValidContactEmail: false,
  isContactEmailFocused: false,

  dateOfOccurrence: '',
  isValidDateOfOccurrence: false,
  isDateOfOccurrenceFocused: false,

  timeOfOccurrence: '',
  isValidTimeOfOccurrence: false,
  isTimeOfOccurrenceFocused: false,

  printerMake: '',
  isValidPrinterMake: false,
  isPrinterMakeFocused: false,

  printerModel: '',
  isValidPrinterModel: false,
  isPrinterModelFocused: false,

  printerSerialNumber: '',
  isValidPrinterSerialNumber: false,
  isPrinterSerialNumberFocused: false,

  printerIssueDescription: '',
  isValidPrinterIssueDescription: false,
  isPrinterIssueDescriptionFocused: false,

  urgency: 'low',

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

const createPrinterIssueAction: CreatePrinterIssueAction = {
  setTitle: 'setTitle',
  setIsValidTitle: 'setIsValidTitle',
  setIsTitleFocused: 'setIsTitleFocused',

  setContactNumber: 'setContactNumber',
  setIsValidContactNumber: 'setIsValidContactNumber',
  setIsContactNumberFocused: 'setIsContactNumberFocused',

  setContactEmail: 'setContactEmail',
  setIsValidContactEmail: 'setIsValidContactEmail',
  setIsContactEmailFocused: 'setIsContactEmailFocused',

  setDateOfOccurrence: 'setDateOfOccurrence',
  setIsValidDateOfOccurrence: 'setIsValidDateOfOccurrence',
  setIsDateOfOccurrenceFocused: 'setIsDateOfOccurrenceFocused',

  setTimeOfOccurrence: 'setTimeOfOccurrence',
  setIsValidTimeOfOccurrence: 'setIsValidTimeOfOccurrence',
  setIsTimeOfOccurrenceFocused: 'setIsTimeOfOccurrenceFocused',

  setPrinterMake: 'setPrinterMake',
  setIsValidPrinterMake: 'setIsValidPrinterMake',
  setIsPrinterMakeFocused: 'setIsPrinterMakeFocused',

  setPrinterModel: 'setPrinterModel',
  setIsValidPrinterModel: 'setIsValidPrinterModel',
  setIsPrinterModelFocused: 'setIsPrinterModelFocused',

  setPrinterSerialNumber: 'setPrinterSerialNumber',
  setIsValidPrinterSerialNumber: 'setIsValidPrinterSerialNumber',
  setIsPrinterSerialNumberFocused: 'setIsPrinterSerialNumberFocused',

  setPrinterIssueDescription: 'setPrinterIssueDescription',
  setIsValidPrinterIssueDescription: 'setIsValidPrinterIssueDescription',
  setIsPrinterIssueDescriptionFocused: 'setIsPrinterIssueDescriptionFocused',

  setUrgency: 'setUrgency',

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

function createPrinterIssueReducer(
  state: CreatePrinterIssueState,
  action: CreatePrinterIssueDispatch
): CreatePrinterIssueState {
  switch (action.type) {
    case createPrinterIssueAction.setTitle:
      return {
        ...state,
        title: action.payload,
      };
    case createPrinterIssueAction.setIsValidTitle:
      return {
        ...state,
        isValidTitle: action.payload,
      };
    case createPrinterIssueAction.setIsTitleFocused:
      return {
        ...state,
        isTitleFocused: action.payload,
      };
    case createPrinterIssueAction.setContactNumber:
      return {
        ...state,
        contactNumber: action.payload,
      };
    case createPrinterIssueAction.setIsValidContactNumber:
      return {
        ...state,
        isValidContactNumber: action.payload,
      };
    case createPrinterIssueAction.setIsContactNumberFocused:
      return {
        ...state,
        isContactNumberFocused: action.payload,
      };
    case createPrinterIssueAction.setContactEmail:
      return {
        ...state,
        contactEmail: action.payload,
      };
    case createPrinterIssueAction.setIsValidContactEmail:
      return {
        ...state,
        isValidContactEmail: action.payload,
      };
    case createPrinterIssueAction.setIsContactEmailFocused:
      return {
        ...state,
        isContactEmailFocused: action.payload,
      };
    case createPrinterIssueAction.setDateOfOccurrence:
      return {
        ...state,
        dateOfOccurrence: action.payload,
      };
    case createPrinterIssueAction.setIsValidDateOfOccurrence:
      return {
        ...state,
        isValidDateOfOccurrence: action.payload,
      };
    case createPrinterIssueAction.setIsDateOfOccurrenceFocused:
      return {
        ...state,
        isDateOfOccurrenceFocused: action.payload,
      };
    case createPrinterIssueAction.setTimeOfOccurrence:
      return {
        ...state,
        timeOfOccurrence: action.payload,
      };
    case createPrinterIssueAction.setIsValidTimeOfOccurrence:
      return {
        ...state,
        isValidTimeOfOccurrence: action.payload,
      };
    case createPrinterIssueAction.setIsTimeOfOccurrenceFocused:
      return {
        ...state,
        isTimeOfOccurrenceFocused: action.payload,
      };
    case createPrinterIssueAction.setPrinterMake:
      return {
        ...state,
        printerMake: action.payload,
      };
    case createPrinterIssueAction.setIsValidPrinterMake:
      return {
        ...state,
        isValidPrinterMake: action.payload,
      };
    case createPrinterIssueAction.setIsPrinterMakeFocused:
      return {
        ...state,
        isPrinterMakeFocused: action.payload,
      };
    case createPrinterIssueAction.setPrinterModel:
      return {
        ...state,
        printerModel: action.payload,
      };
    case createPrinterIssueAction.setIsValidPrinterModel:
      return {
        ...state,
        isValidPrinterModel: action.payload,
      };
    case createPrinterIssueAction.setIsPrinterModelFocused:
      return {
        ...state,
        isPrinterModelFocused: action.payload,
      };
    case createPrinterIssueAction.setPrinterSerialNumber:
      return {
        ...state,
        printerSerialNumber: action.payload,
      };
    case createPrinterIssueAction.setIsValidPrinterSerialNumber:
      return {
        ...state,
        isValidPrinterSerialNumber: action.payload,
      };
    case createPrinterIssueAction.setIsPrinterSerialNumberFocused:
      return {
        ...state,
        isPrinterSerialNumberFocused: action.payload,
      };
    case createPrinterIssueAction.setPrinterIssueDescription:
      return {
        ...state,
        printerIssueDescription: action.payload,
      };
    case createPrinterIssueAction.setIsValidPrinterIssueDescription:
      return {
        ...state,
        isValidPrinterIssueDescription: action.payload,
      };
    case createPrinterIssueAction.setIsPrinterIssueDescriptionFocused:
      return {
        ...state,
        isPrinterIssueDescriptionFocused: action.payload,
      };
    case createPrinterIssueAction.setUrgency:
      return {
        ...state,
        urgency: action.payload,
      };
    case createPrinterIssueAction.setAdditionalInformation:
      return {
        ...state,
        additionalInformation: action.payload,
      };
    case createPrinterIssueAction.setIsValidAdditionalInformation:
      return {
        ...state,
        isValidAdditionalInformation: action.payload,
      };
    case createPrinterIssueAction.setIsAdditionalInformationFocused:
      return {
        ...state,
        isAdditionalInformationFocused: action.payload,
      };

    case createPrinterIssueAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createPrinterIssueAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createPrinterIssueAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = new Set(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return {
        ...state,
        stepsInError,
      };
    }
    case createPrinterIssueAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createPrinterIssueAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createPrinterIssueAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createPrinterIssueAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createPrinterIssueAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createPrinterIssueAction.setSuccessMessage:
      return {
        ...state,

        successMessage: action.payload,
      };
    case createPrinterIssueAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createPrinterIssueAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
}

export {
  createPrinterIssueAction,
  createPrinterIssueReducer,
  initialCreatePrinterIssueState,
};
