import type { Action, ActionsGeneral, Urgency } from '../../../types';

type PrinterIssueSchema = {
  userId: string;
  username: string;
  action: Action;
  category: ActionsGeneral;
  title: string;
  contactNumber: string;
  contactEmail: string;
  printerMake: string;
  printerModel: string;
  printerSerialNumber: string;
  printerIssueDescription: string;
  urgency: Urgency;
  additionalInformation: string;
};

type PrinterIssueDocument = PrinterIssueSchema & {
  _id: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
};

type CreatePrinterIssueState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  contactNumber: string;
  isValidContactNumber: boolean;
  isContactNumberFocused: boolean;

  contactEmail: string;
  isValidContactEmail: boolean;
  isContactEmailFocused: boolean;

  printerMake: string;
  isValidPrinterMake: boolean;
  isPrinterMakeFocused: boolean;

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

  setPrinterMake: 'setPrinterMake';
  setIsValidPrinterMake: 'setIsValidPrinterMake';
  setIsPrinterMakeFocused: 'setIsPrinterMakeFocused';

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

type SetStepsInErrorPayload = {
  kind: 'add' | 'delete';
  step: number;
};

type CreatePrinterIssueDispatch =
  | {
      type:
        | 'setTitle'
        | 'setContactNumber'
        | 'setContactEmail'
        | 'setPrinterMake'
        | 'setPrinterModel'
        | 'setPrinterSerialNumber'
        | 'setPrinterIssueDescription'
        | 'setAdditionalInformation'
        | 'setErrorMessage'
        | 'setSubmitMessage'
        | 'setSuccessMessage'
        | 'setLoadingMessage';
      payload: string;
    }
  | {
      type:
        | 'setIsValidTitle'
        | 'setIsValidContactNumber'
        | 'setIsValidContactEmail'
        | 'setIsValidPrinterMake'
        | 'setIsValidPrinterModel'
        | 'setIsValidPrinterSerialNumber'
        | 'setIsValidPrinterIssueDescription'
        | 'setIsValidAdditionalInformation'
        | 'setIsError'
        | 'setIsSubmitting'
        | 'setIsSuccessful'
        | 'setIsLoading';
      payload: boolean;
    }
  | {
      type:
        | 'setIsTitleFocused'
        | 'setIsContactNumberFocused'
        | 'setIsContactEmailFocused'
        | 'setIsPrinterMakeFocused'
        | 'setIsPrinterModelFocused'
        | 'setIsPrinterSerialNumberFocused'
        | 'setIsPrinterIssueDescriptionFocused'
        | 'setIsAdditionalInformationFocused';
      payload: boolean;
    }
  | {
      type: 'setUrgency';
      payload: Urgency;
    }
  | {
      type: 'setCurrentStepperPosition';
      payload: number;
    }
  | {
      type: 'setStepsInError';
      payload: SetStepsInErrorPayload;
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
  SetStepsInErrorPayload,
};
