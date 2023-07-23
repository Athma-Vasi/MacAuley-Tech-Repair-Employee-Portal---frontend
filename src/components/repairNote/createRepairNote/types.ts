import {
  Country,
  PhoneNumber,
  PostalCode,
  Province,
  SetStepsInErrorPayload,
  StatesUS,
  Urgency,
} from '../../../types';
import { PartsNeeded, RequiredRepairs } from '../types';

type CreateRepairNoteState = {
  // customer information
  customerName: string;
  isValidCustomerName: boolean;
  isCustomerNameFocused: boolean;

  customerPhone: PhoneNumber | string;
  isValidCustomerPhone: boolean;
  isCustomerPhoneFocused: boolean;

  customerEmail: string;
  isValidCustomerEmail: boolean;
  isCustomerEmailFocused: boolean;

  customerAddressLine: string;
  isValidCustomerAddressLine: boolean;
  isCustomerAddressLineFocused: boolean;

  customerCity: string;
  isValidCustomerCity: boolean;
  isCustomerCityFocused: boolean;

  customerState: StatesUS;
  customerProvince: Province;
  customerCountry: string;

  customerPostalCode: PostalCode;
  isValidCustomerPostalCode: boolean;
  isCustomerPostalCodeFocused: boolean;

  // part information
  partName: string;
  isValidPartName: boolean;
  isPartNameFocused: boolean;

  partSerialId: string;
  isValidPartSerialId: boolean;
  isPartSerialIdFocused: boolean;

  dateReceived: string;
  isValidDateReceived: boolean;
  isDateReceivedFocused: boolean;

  descriptionOfIssue: string;
  isValidDescriptionOfIssue: boolean;
  isDescriptionOfIssueFocused: boolean;

  initialInspectionNotes: string;
  isValidInitialInspectionNotes: boolean;
  isInitialInspectionNotesFocused: boolean;

  // repair information
  requiredRepairs: RequiredRepairs[];
  partsNeeded: PartsNeeded[];
  partsNeededModels: string;
  isValidPartsNeededModels: boolean;
  isPartsNeededModelsFocused: boolean;

  partUnderWarranty: boolean;
  estimatedRepairCost: number;
  isValidEstimatedRepairCost: boolean;
  isEstimatedRepairCostFocused: boolean;

  estimatedCompletionDate: string;
  isValidEstimatedCompletionDate: boolean;
  isEstimatedCompletionDateFocused: boolean;

  repairPriority: Urgency;

  // work order id is generated by the system
  // rest of the information is updated by the repair technician after the initial repair note is created

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isError: boolean;
  errorMessage: string;
  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreateRepairNoteAction = {
  // customer information
  setCustomerName: 'setCustomerName';
  setIsValidCustomerName: 'setIsValidCustomerName';
  setIsCustomerNameFocused: 'setIsCustomerNameFocused';

  setCustomerPhone: 'setCustomerPhone';
  setIsValidCustomerPhone: 'setIsValidCustomerPhone';
  setIsCustomerPhoneFocused: 'setIsCustomerPhoneFocused';

  setCustomerEmail: 'setCustomerEmail';
  setIsValidCustomerEmail: 'setIsValidCustomerEmail';
  setIsCustomerEmailFocused: 'setIsCustomerEmailFocused';

  setCustomerAddressLine: 'setCustomerAddressLine';
  setIsValidCustomerAddressLine: 'setIsValidCustomerAddressLine';
  setIsCustomerAddressLineFocused: 'setIsCustomerAddressLineFocused';

  setCustomerCity: 'setCustomerCity';
  setIsValidCustomerCity: 'setIsValidCustomerCity';
  setIsCustomerCityFocused: 'setIsCustomerCityFocused';

  setCustomerState: 'setCustomerState';
  setCustomerProvince: 'setCustomerProvince';
  setCustomerCountry: 'setCustomerCountry';

  setCustomerPostalCode: 'setCustomerPostalCode';
  setIsValidCustomerPostalCode: 'setIsValidCustomerPostalCode';
  setIsCustomerPostalCodeFocused: 'setIsCustomerPostalCodeFocused';

  // part information
  setPartName: 'setPartName';
  setIsValidPartName: 'setIsValidPartName';
  setIsPartNameFocused: 'setIsPartNameFocused';

  setPartSerialId: 'setPartSerialId';
  setIsValidPartSerialId: 'setIsValidPartSerialId';
  setIsPartSerialIdFocused: 'setIsPartSerialIdFocused';

  setDateReceived: 'setDateReceived';
  setIsValidDateReceived: 'setIsValidDateReceived';
  setIsDateReceivedFocused: 'setIsDateReceivedFocused';

  setDescriptionOfIssue: 'setDescriptionOfIssue';
  setIsValidDescriptionOfIssue: 'setIsValidDescriptionOfIssue';
  setIsDescriptionOfIssueFocused: 'setIsDescriptionOfIssueFocused';

  setInitialInspectionNotes: 'setInitialInspectionNotes';
  setIsValidInitialInspectionNotes: 'setIsValidInitialInspectionNotes';
  setIsInitialInspectionNotesFocused: 'setIsInitialInspectionNotesFocused';

  // repair information
  setRequiredRepairs: 'setRequiredRepairs';
  setPartsNeeded: 'setPartsNeeded';
  setPartsNeededModels: 'setPartsNeededModels';
  setIsValidPartsNeededModels: 'setIsValidPartsNeededModels';
  setIsPartsNeededModelsFocused: 'setIsPartsNeededModelsFocused';

  setPartUnderWarranty: 'setPartUnderWarranty';
  setEstimatedRepairCost: 'setEstimatedRepairCost';
  setIsValidEstimatedRepairCost: 'setIsValidEstimatedRepairCost';
  setIsEstimatedRepairCostFocused: 'setIsEstimatedRepairCostFocused';

  setEstimatedCompletionDate: 'setEstimatedCompletionDate';
  setIsValidEstimatedCompletionDate: 'setIsValidEstimatedCompletionDate';
  setIsEstimatedCompletionDateFocused: 'setIsEstimatedCompletionDateFocused';

  setRepairPriority: 'setRepairPriority';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsError: 'setIsError';
  setErrorMessage: 'setErrorMessage';
  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type CreateRepairNoteDispatch =
  | {
      // all string payloads
      type:
        | CreateRepairNoteAction['setCustomerName']
        | CreateRepairNoteAction['setCustomerEmail']
        | CreateRepairNoteAction['setCustomerAddressLine']
        | CreateRepairNoteAction['setCustomerCity']
        | CreateRepairNoteAction['setPartName']
        | CreateRepairNoteAction['setPartSerialId']
        | CreateRepairNoteAction['setDateReceived']
        | CreateRepairNoteAction['setDescriptionOfIssue']
        | CreateRepairNoteAction['setInitialInspectionNotes']
        | CreateRepairNoteAction['setPartsNeededModels']
        | CreateRepairNoteAction['setEstimatedCompletionDate']
        | CreateRepairNoteAction['setErrorMessage']
        | CreateRepairNoteAction['setSubmitMessage']
        | CreateRepairNoteAction['setSuccessMessage']
        | CreateRepairNoteAction['setLoadingMessage'];

      payload: string;
    }
  // all boolean payloads
  | {
      type:
        | CreateRepairNoteAction['setIsValidCustomerName']
        | CreateRepairNoteAction['setIsCustomerNameFocused']
        | CreateRepairNoteAction['setIsValidCustomerEmail']
        | CreateRepairNoteAction['setIsCustomerEmailFocused']
        | CreateRepairNoteAction['setIsValidCustomerPhone']
        | CreateRepairNoteAction['setIsCustomerPhoneFocused']
        | CreateRepairNoteAction['setIsValidCustomerAddressLine']
        | CreateRepairNoteAction['setIsCustomerAddressLineFocused']
        | CreateRepairNoteAction['setIsValidCustomerCity']
        | CreateRepairNoteAction['setIsCustomerCityFocused']
        | CreateRepairNoteAction['setIsValidCustomerPostalCode']
        | CreateRepairNoteAction['setIsCustomerPostalCodeFocused']
        | CreateRepairNoteAction['setIsValidPartName']
        | CreateRepairNoteAction['setIsPartNameFocused']
        | CreateRepairNoteAction['setIsValidPartSerialId']
        | CreateRepairNoteAction['setIsPartSerialIdFocused']
        | CreateRepairNoteAction['setIsValidDateReceived']
        | CreateRepairNoteAction['setIsDateReceivedFocused']
        | CreateRepairNoteAction['setIsValidDescriptionOfIssue']
        | CreateRepairNoteAction['setIsDescriptionOfIssueFocused']
        | CreateRepairNoteAction['setIsValidInitialInspectionNotes']
        | CreateRepairNoteAction['setIsInitialInspectionNotesFocused']
        | CreateRepairNoteAction['setIsValidPartsNeededModels']
        | CreateRepairNoteAction['setIsPartsNeededModelsFocused']
        | CreateRepairNoteAction['setPartUnderWarranty']
        | CreateRepairNoteAction['setIsValidEstimatedRepairCost']
        | CreateRepairNoteAction['setIsEstimatedRepairCostFocused']
        | CreateRepairNoteAction['setIsValidEstimatedCompletionDate']
        | CreateRepairNoteAction['setIsEstimatedCompletionDateFocused']
        | CreateRepairNoteAction['setTriggerFormSubmit']
        | CreateRepairNoteAction['setIsError']
        | CreateRepairNoteAction['setIsSubmitting']
        | CreateRepairNoteAction['setIsSuccessful']
        | CreateRepairNoteAction['setIsLoading'];

      payload: boolean;
    }
  | {
      // all PhoneNumber payloads
      type: CreateRepairNoteAction['setCustomerPhone'];
      payload: PhoneNumber | string;
    }
  | {
      // all PostalCode payloads
      type: CreateRepairNoteAction['setCustomerPostalCode'];
      payload: PostalCode;
    }
  | {
      // all Province payloads
      type: CreateRepairNoteAction['setCustomerProvince'];
      payload: Province;
    }
  | {
      // all StatesUS payloads
      type: CreateRepairNoteAction['setCustomerState'];
      payload: StatesUS;
    }
  | {
      // all Country payloads
      type: CreateRepairNoteAction['setCustomerCountry'];
      payload: Country;
    }
  | {
      // all Urgency payloads
      type: CreateRepairNoteAction['setRepairPriority'];
      payload: Urgency;
    }
  | {
      // all RequiredRepairs payloads
      type: CreateRepairNoteAction['setRequiredRepairs'];
      payload: RequiredRepairs[];
    }
  | {
      // all PartsNeeded payloads
      type: CreateRepairNoteAction['setPartsNeeded'];
      payload: PartsNeeded[];
    }
  | {
      // all number payloads
      type:
        | CreateRepairNoteAction['setEstimatedRepairCost']
        | CreateRepairNoteAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      // all Set<number> payloads
      type: CreateRepairNoteAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type CreateRepairNoteReducer = (
  state: CreateRepairNoteState,
  action: CreateRepairNoteDispatch
) => CreateRepairNoteState;

export type {
  CreateRepairNoteAction,
  CreateRepairNoteDispatch,
  CreateRepairNoteReducer,
  CreateRepairNoteState,
};
