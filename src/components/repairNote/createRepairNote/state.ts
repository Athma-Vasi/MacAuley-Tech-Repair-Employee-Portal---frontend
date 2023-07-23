import {
  CreateRepairNoteAction,
  CreateRepairNoteDispatch,
  CreateRepairNoteState,
} from './types';

const initialCreateRepairNoteState: CreateRepairNoteState = {
  // customer information
  customerName: '',
  isValidCustomerName: false,
  isCustomerNameFocused: false,

  customerPhone: '+(1)',
  isValidCustomerPhone: false,
  isCustomerPhoneFocused: false,

  customerEmail: '',
  isValidCustomerEmail: false,
  isCustomerEmailFocused: false,

  customerAddressLine: '',
  isValidCustomerAddressLine: false,
  isCustomerAddressLineFocused: false,

  customerCity: '',
  isValidCustomerCity: false,
  isCustomerCityFocused: false,

  customerState: 'Alabama',
  customerProvince: 'Alberta',
  customerCountry: 'Canada',
  customerPostalCode: '',
  isValidCustomerPostalCode: false,
  isCustomerPostalCodeFocused: false,

  // part information
  partName: '',
  isValidPartName: false,
  isPartNameFocused: false,

  partSerialId: '',
  isValidPartSerialId: false,
  isPartSerialIdFocused: false,

  dateReceived: '',
  isValidDateReceived: false,
  isDateReceivedFocused: false,

  descriptionOfIssue: '',
  isValidDescriptionOfIssue: false,
  isDescriptionOfIssueFocused: false,

  initialInspectionNotes: '',
  isValidInitialInspectionNotes: false,
  isInitialInspectionNotesFocused: false,

  // repair information
  requiredRepairs: [],
  partsNeeded: [],
  partsNeededModels: '',
  isValidPartsNeededModels: false,
  isPartsNeededModelsFocused: false,

  partUnderWarranty: false,
  estimatedRepairCost: 0,
  isValidEstimatedRepairCost: false,
  isEstimatedRepairCostFocused: false,

  estimatedCompletionDate: '',
  isValidEstimatedCompletionDate: false,
  isEstimatedCompletionDateFocused: false,

  repairPriority: 'low',

  // rest of the information is updated by the repair technician after the initial repair note is created

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

const createRepairNoteAction: CreateRepairNoteAction = {
  // customer information
  setCustomerName: 'setCustomerName',
  setIsValidCustomerName: 'setIsValidCustomerName',
  setIsCustomerNameFocused: 'setIsCustomerNameFocused',

  setCustomerPhone: 'setCustomerPhone',
  setIsValidCustomerPhone: 'setIsValidCustomerPhone',
  setIsCustomerPhoneFocused: 'setIsCustomerPhoneFocused',

  setCustomerEmail: 'setCustomerEmail',
  setIsValidCustomerEmail: 'setIsValidCustomerEmail',
  setIsCustomerEmailFocused: 'setIsCustomerEmailFocused',

  setCustomerAddressLine: 'setCustomerAddressLine',
  setIsValidCustomerAddressLine: 'setIsValidCustomerAddressLine',
  setIsCustomerAddressLineFocused: 'setIsCustomerAddressLineFocused',

  setCustomerCity: 'setCustomerCity',
  setIsValidCustomerCity: 'setIsValidCustomerCity',
  setIsCustomerCityFocused: 'setIsCustomerCityFocused',

  setCustomerState: 'setCustomerState',
  setCustomerProvince: 'setCustomerProvince',
  setCustomerCountry: 'setCustomerCountry',

  setCustomerPostalCode: 'setCustomerPostalCode',
  setIsValidCustomerPostalCode: 'setIsValidCustomerPostalCode',
  setIsCustomerPostalCodeFocused: 'setIsCustomerPostalCodeFocused',

  // part information
  setPartName: 'setPartName',
  setIsValidPartName: 'setIsValidPartName',
  setIsPartNameFocused: 'setIsPartNameFocused',

  setPartSerialId: 'setPartSerialId',
  setIsValidPartSerialId: 'setIsValidPartSerialId',
  setIsPartSerialIdFocused: 'setIsPartSerialIdFocused',

  setDateReceived: 'setDateReceived',
  setIsValidDateReceived: 'setIsValidDateReceived',
  setIsDateReceivedFocused: 'setIsDateReceivedFocused',

  setDescriptionOfIssue: 'setDescriptionOfIssue',
  setIsValidDescriptionOfIssue: 'setIsValidDescriptionOfIssue',
  setIsDescriptionOfIssueFocused: 'setIsDescriptionOfIssueFocused',

  setInitialInspectionNotes: 'setInitialInspectionNotes',
  setIsValidInitialInspectionNotes: 'setIsValidInitialInspectionNotes',
  setIsInitialInspectionNotesFocused: 'setIsInitialInspectionNotesFocused',

  // repair information
  setRequiredRepairs: 'setRequiredRepairs',
  setPartsNeeded: 'setPartsNeeded',
  setPartsNeededModels: 'setPartsNeededModels',
  setIsValidPartsNeededModels: 'setIsValidPartsNeededModels',
  setIsPartsNeededModelsFocused: 'setIsPartsNeededModelsFocused',

  setPartUnderWarranty: 'setPartUnderWarranty',
  setEstimatedRepairCost: 'setEstimatedRepairCost',
  setIsValidEstimatedRepairCost: 'setIsValidEstimatedRepairCost',
  setIsEstimatedRepairCostFocused: 'setIsEstimatedRepairCostFocused',

  setEstimatedCompletionDate: 'setEstimatedCompletionDate',
  setIsValidEstimatedCompletionDate: 'setIsValidEstimatedCompletionDate',
  setIsEstimatedCompletionDateFocused: 'setIsEstimatedCompletionDateFocused',

  setRepairPriority: 'setRepairPriority',

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

function createRepairNoteReducer(
  state: CreateRepairNoteState,
  action: CreateRepairNoteDispatch
): CreateRepairNoteState {
  switch (action.type) {
    // customer information
    case createRepairNoteAction.setCustomerName:
      return {
        ...state,
        customerName: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerName:
      return {
        ...state,
        isValidCustomerName: action.payload,
      };
    case createRepairNoteAction.setIsCustomerNameFocused:
      return {
        ...state,
        isCustomerNameFocused: action.payload,
      };

    case createRepairNoteAction.setCustomerPhone:
      return {
        ...state,
        customerPhone: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerPhone:
      return {
        ...state,
        isValidCustomerPhone: action.payload,
      };
    case createRepairNoteAction.setIsCustomerPhoneFocused:
      return {
        ...state,
        isCustomerPhoneFocused: action.payload,
      };

    case createRepairNoteAction.setCustomerEmail:
      return {
        ...state,
        customerEmail: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerEmail:
      return {
        ...state,
        isValidCustomerEmail: action.payload,
      };
    case createRepairNoteAction.setIsCustomerEmailFocused:
      return {
        ...state,
        isCustomerEmailFocused: action.payload,
      };

    case createRepairNoteAction.setCustomerAddressLine:
      return {
        ...state,
        customerAddressLine: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerAddressLine:
      return {
        ...state,
        isValidCustomerAddressLine: action.payload,
      };
    case createRepairNoteAction.setIsCustomerAddressLineFocused:
      return {
        ...state,
        isCustomerAddressLineFocused: action.payload,
      };

    case createRepairNoteAction.setCustomerCity:
      return {
        ...state,
        customerCity: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerCity:
      return {
        ...state,
        isValidCustomerCity: action.payload,
      };
    case createRepairNoteAction.setIsCustomerCityFocused:
      return {
        ...state,
        isCustomerCityFocused: action.payload,
      };

    case createRepairNoteAction.setCustomerState:
      return {
        ...state,
        customerState: action.payload,
      };
    case createRepairNoteAction.setCustomerProvince:
      return {
        ...state,
        customerProvince: action.payload,
      };
    case createRepairNoteAction.setCustomerCountry:
      return {
        ...state,
        customerCountry: action.payload,
      };

    case createRepairNoteAction.setCustomerPostalCode:
      return {
        ...state,
        customerPostalCode: action.payload,
      };
    case createRepairNoteAction.setIsValidCustomerPostalCode:
      return {
        ...state,
        isValidCustomerPostalCode: action.payload,
      };
    case createRepairNoteAction.setIsCustomerPostalCodeFocused:
      return {
        ...state,
        isCustomerPostalCodeFocused: action.payload,
      };

    // part information
    case createRepairNoteAction.setPartName:
      return {
        ...state,
        partName: action.payload,
      };
    case createRepairNoteAction.setIsValidPartName:
      return {
        ...state,
        isValidPartName: action.payload,
      };
    case createRepairNoteAction.setIsPartNameFocused:
      return {
        ...state,
        isPartNameFocused: action.payload,
      };

    case createRepairNoteAction.setPartSerialId:
      return {
        ...state,
        partSerialId: action.payload,
      };
    case createRepairNoteAction.setIsValidPartSerialId:
      return {
        ...state,
        isValidPartSerialId: action.payload,
      };
    case createRepairNoteAction.setIsPartSerialIdFocused:
      return {
        ...state,
        isPartSerialIdFocused: action.payload,
      };

    case createRepairNoteAction.setDateReceived:
      return {
        ...state,
        dateReceived: action.payload,
      };
    case createRepairNoteAction.setIsValidDateReceived:
      return {
        ...state,
        isValidDateReceived: action.payload,
      };
    case createRepairNoteAction.setIsDateReceivedFocused:
      return {
        ...state,
        isDateReceivedFocused: action.payload,
      };

    case createRepairNoteAction.setDescriptionOfIssue:
      return {
        ...state,
        descriptionOfIssue: action.payload,
      };
    case createRepairNoteAction.setIsValidDescriptionOfIssue:
      return {
        ...state,
        isValidDescriptionOfIssue: action.payload,
      };
    case createRepairNoteAction.setIsDescriptionOfIssueFocused:
      return {
        ...state,
        isDescriptionOfIssueFocused: action.payload,
      };

    case createRepairNoteAction.setInitialInspectionNotes:
      return {
        ...state,
        initialInspectionNotes: action.payload,
      };
    case createRepairNoteAction.setIsValidInitialInspectionNotes:
      return {
        ...state,
        isValidInitialInspectionNotes: action.payload,
      };
    case createRepairNoteAction.setIsInitialInspectionNotesFocused:
      return {
        ...state,
        isInitialInspectionNotesFocused: action.payload,
      };

    // repair information
    case createRepairNoteAction.setRequiredRepairs:
      return {
        ...state,
        requiredRepairs: action.payload,
      };
    case createRepairNoteAction.setPartsNeeded:
      return {
        ...state,
        partsNeeded: action.payload,
      };
    case createRepairNoteAction.setPartsNeededModels:
      return {
        ...state,
        partsNeededModels: action.payload,
      };
    case createRepairNoteAction.setIsValidPartsNeededModels:
      return {
        ...state,
        isValidPartsNeededModels: action.payload,
      };
    case createRepairNoteAction.setIsPartsNeededModelsFocused:
      return {
        ...state,
        isPartsNeededModelsFocused: action.payload,
      };

    case createRepairNoteAction.setPartUnderWarranty:
      return {
        ...state,
        partUnderWarranty: action.payload,
      };
    case createRepairNoteAction.setEstimatedRepairCost:
      return {
        ...state,
        estimatedRepairCost: action.payload,
      };
    case createRepairNoteAction.setIsValidEstimatedRepairCost:
      return {
        ...state,
        isValidEstimatedRepairCost: action.payload,
      };
    case createRepairNoteAction.setIsEstimatedRepairCostFocused:
      return {
        ...state,
        isEstimatedRepairCostFocused: action.payload,
      };

    case createRepairNoteAction.setEstimatedCompletionDate:
      return {
        ...state,
        estimatedCompletionDate: action.payload,
      };
    case createRepairNoteAction.setIsValidEstimatedCompletionDate:
      return {
        ...state,
        isValidEstimatedCompletionDate: action.payload,
      };
    case createRepairNoteAction.setIsEstimatedCompletionDateFocused:
      return {
        ...state,
        isEstimatedCompletionDateFocused: action.payload,
      };

    case createRepairNoteAction.setRepairPriority:
      return {
        ...state,
        repairPriority: action.payload,
      };

    case createRepairNoteAction.setTriggerFormSubmit:
      return {
        ...state,
        triggerFormSubmit: action.payload,
      };
    case createRepairNoteAction.setCurrentStepperPosition:
      return {
        ...state,
        currentStepperPosition: action.payload,
      };
    case createRepairNoteAction.setStepsInError: {
      const { kind, step } = action.payload;
      const stepsInError = structuredClone(state.stepsInError);
      kind === 'add' ? stepsInError.add(step) : stepsInError.delete(step);

      return { ...state, stepsInError };
    }

    case createRepairNoteAction.setIsError:
      return {
        ...state,
        isError: action.payload,
      };
    case createRepairNoteAction.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case createRepairNoteAction.setIsSubmitting:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case createRepairNoteAction.setSubmitMessage:
      return {
        ...state,
        submitMessage: action.payload,
      };
    case createRepairNoteAction.setIsSuccessful:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    case createRepairNoteAction.setSuccessMessage:
      return {
        ...state,
        successMessage: action.payload,
      };
    case createRepairNoteAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case createRepairNoteAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  createRepairNoteAction,
  createRepairNoteReducer,
  initialCreateRepairNoteState,
};
