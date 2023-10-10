import type {
  Action,
  ActionsGeneral,
  PhoneNumber,
  RequestStatus,
  TimeRailway,
  Urgency,
} from '../../../types';

type PrinterMake =
  | 'HP'
  | 'Canon'
  | 'Epson'
  | 'Brother'
  | 'Xerox'
  | 'Ricoh'
  | 'Lexmark'
  | 'Dell'
  | 'Kyocera'
  | 'Sharp'
  | 'Konica Minolta'
  | 'Toshiba TEC'
  | 'OKI'
  | 'Panasonic'
  | 'Fujitsu'
  | 'Zebra Technologies';

type PrinterIssueSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsGeneral;
  title: string;
  contactNumber: PhoneNumber | string;
  contactEmail: string;
  dateOfOccurrence: string;
  timeOfOccurrence: TimeRailway;
  printerMake: PrinterMake;
  printerModel: string;
  printerSerialNumber: string;
  printerIssueDescription: string;
  urgency: Urgency;
  additionalInformation: string;
  requestStatus: RequestStatus;
};

type PrinterIssueDocument = PrinterIssueSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreatePrinterIssueState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  contactNumber: PhoneNumber | string;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  contactEmail: string;
  isValidContactEmail: boolean;
  isContactEmailFocused: boolean;

  dateOfOccurrence: string;
  isValidDateOfOccurrence: boolean;
  isDateOfOccurrenceFocused: boolean;

  timeOfOccurrence: TimeRailway | string;
  isValidTimeOfOccurrence: boolean;
  isTimeOfOccurrenceFocused: boolean;

  printerMake: PrinterMake;
  printerModel: string;
  isValidPrinterModel: boolean;
  isPrinterModelFocused: boolean;

  printerSerialNumber: string;
  isValidPrinterSerialNumber: boolean;
  isPrinterSerialNumberFocused: boolean;

  printerIssueDescription: string;
  isValidPrinterIssueDescription: boolean;
  isPrinterIssueDescriptionFocused: boolean;

  urgency: Urgency;

  additionalInformation: string;
  isValidAdditionalInformation: boolean;
  isAdditionalInformationFocused: boolean;

  triggerFormSubmit: boolean;
  currentStepperPosition: number;
  stepsInError: Set<number>;

  isSubmitting: boolean;
  submitMessage: string;
  isSuccessful: boolean;
  successMessage: string;
  isLoading: boolean;
  loadingMessage: string;
};

type CreatePrinterIssueAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setContactNumber: 'setContactNumber';
  setIsValidContactNumber: 'setIsValidContactNumber';
  setIsContactNumberFocused: 'setIsContactNumberFocused';

  setContactEmail: 'setContactEmail';
  setIsValidContactEmail: 'setIsValidContactEmail';
  setIsContactEmailFocused: 'setIsContactEmailFocused';

  setDateOfOccurrence: 'setDateOfOccurrence';
  setIsValidDateOfOccurrence: 'setIsValidDateOfOccurrence';
  setIsDateOfOccurrenceFocused: 'setIsDateOfOccurrenceFocused';

  setTimeOfOccurrence: 'setTimeOfOccurrence';
  setIsValidTimeOfOccurrence: 'setIsValidTimeOfOccurrence';
  setIsTimeOfOccurrenceFocused: 'setIsTimeOfOccurrenceFocused';

  setPrinterMake: 'setPrinterMake';
  setPrinterModel: 'setPrinterModel';
  setIsValidPrinterModel: 'setIsValidPrinterModel';
  setIsPrinterModelFocused: 'setIsPrinterModelFocused';

  setPrinterSerialNumber: 'setPrinterSerialNumber';
  setIsValidPrinterSerialNumber: 'setIsValidPrinterSerialNumber';
  setIsPrinterSerialNumberFocused: 'setIsPrinterSerialNumberFocused';

  setPrinterIssueDescription: 'setPrinterIssueDescription';
  setIsValidPrinterIssueDescription: 'setIsValidPrinterIssueDescription';
  setIsPrinterIssueDescriptionFocused: 'setIsPrinterIssueDescriptionFocused';

  setUrgency: 'setUrgency';

  setAdditionalInformation: 'setAdditionalInformation';
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation';
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused';

  setTriggerFormSubmit: 'setTriggerFormSubmit';
  setCurrentStepperPosition: 'setCurrentStepperPosition';
  setStepsInError: 'setStepsInError';

  setIsSubmitting: 'setIsSubmitting';
  setSubmitMessage: 'setSubmitMessage';
  setIsSuccessful: 'setIsSuccessful';
  setSuccessMessage: 'setSuccessMessage';
  setIsLoading: 'setIsLoading';
  setLoadingMessage: 'setLoadingMessage';
};

type SetStepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type CreatePrinterIssueDispatch =
  | {
      type:
        | CreatePrinterIssueAction['setTitle']
        | CreatePrinterIssueAction['setContactEmail']
        | CreatePrinterIssueAction['setPrinterModel']
        | CreatePrinterIssueAction['setPrinterSerialNumber']
        | CreatePrinterIssueAction['setPrinterIssueDescription']
        | CreatePrinterIssueAction['setAdditionalInformation']
        | CreatePrinterIssueAction['setSubmitMessage']
        | CreatePrinterIssueAction['setSuccessMessage']
        | CreatePrinterIssueAction['setLoadingMessage']
        | CreatePrinterIssueAction['setDateOfOccurrence'];

      payload: string;
    }
  | {
      type:
        | CreatePrinterIssueAction['setIsValidTitle']
        | CreatePrinterIssueAction['setIsTitleFocused']
        | CreatePrinterIssueAction['setIsValidContactNumber']
        | CreatePrinterIssueAction['setIsContactNumberFocused']
        | CreatePrinterIssueAction['setIsValidContactEmail']
        | CreatePrinterIssueAction['setIsContactEmailFocused']
        | CreatePrinterIssueAction['setIsValidPrinterModel']
        | CreatePrinterIssueAction['setIsPrinterModelFocused']
        | CreatePrinterIssueAction['setIsValidPrinterSerialNumber']
        | CreatePrinterIssueAction['setIsPrinterSerialNumberFocused']
        | CreatePrinterIssueAction['setIsValidPrinterIssueDescription']
        | CreatePrinterIssueAction['setIsPrinterIssueDescriptionFocused']
        | CreatePrinterIssueAction['setIsValidAdditionalInformation']
        | CreatePrinterIssueAction['setIsAdditionalInformationFocused']
        | CreatePrinterIssueAction['setIsValidDateOfOccurrence']
        | CreatePrinterIssueAction['setIsDateOfOccurrenceFocused']
        | CreatePrinterIssueAction['setIsTimeOfOccurrenceFocused']
        | CreatePrinterIssueAction['setIsValidTimeOfOccurrence']
        | CreatePrinterIssueAction['setTriggerFormSubmit']
        | CreatePrinterIssueAction['setIsSubmitting']
        | CreatePrinterIssueAction['setIsSuccessful']
        | CreatePrinterIssueAction['setIsLoading'];

      payload: boolean;
    }
  | {
      type: CreatePrinterIssueAction['setTimeOfOccurrence'];
      payload: TimeRailway | string;
    }
  | {
      type: CreatePrinterIssueAction['setPrinterMake'];
      payload: PrinterMake;
    }
  | {
      type: CreatePrinterIssueAction['setUrgency'];
      payload: Urgency;
    }
  | {
      type: CreatePrinterIssueAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreatePrinterIssueAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    }
  | {
      type: CreatePrinterIssueAction['setContactNumber'];
      payload: PhoneNumber | string;
    };

type CreatePrinterIssueReducer = (
  state: CreatePrinterIssueState,
  action: CreatePrinterIssueDispatch
) => CreatePrinterIssueState;

export type {
  CreatePrinterIssueAction,
  CreatePrinterIssueDispatch,
  CreatePrinterIssueReducer,
  CreatePrinterIssueState,
  PrinterIssueDocument,
  PrinterIssueSchema,
  PrinterMake,
  SetStepsInErrorPayload,
};
