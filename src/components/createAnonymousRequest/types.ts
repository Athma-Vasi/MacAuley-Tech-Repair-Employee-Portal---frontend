import {
  Action,
  ActionsGeneral,
  SetStepsInErrorPayload,
  Urgency,
} from '../../types';

type AnonymousRequestKind =
  | 'workplace safety'
  | 'employee conflict'
  | 'workplace harassment'
  | 'company security'
  | 'diversity and inclusion'
  | 'lgbtqia+';

type AnonymousRequestSchema = {
  // action and category are added in the create handler
  action: Action;
  category: ActionsGeneral;

  title: string;
  secureContactNumber: string;
  secureContactEmail: string;
  requestKind: AnonymousRequestKind;
  requestDescription: string;
  additionalInformation: string;
  urgency: Urgency;
};

type AnonymousRequestDocument = AnonymousRequestSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CreateAnonymousRequestState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  secureContactNumber: string;
  isValidSecureContactNumber: boolean;
  isSecureContactNumberFocused: boolean;

  secureContactEmail: string;
  isValidSecureContactEmail: boolean;
  isSecureContactEmailFocused: boolean;

  requestKind: AnonymousRequestKind;

  requestDescription: string;
  isValidRequestDescription: boolean;
  isRequestDescriptionFocused: boolean;

  additionalInformation: string;
  isValidAdditionalInformation: boolean;
  isAdditionalInformationFocused: boolean;

  urgency: Urgency;

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

type CreateAnonymousRequestAction = {
  setTitle: 'setTitle';
  setIsValidTitle: 'setIsValidTitle';
  setIsTitleFocused: 'setIsTitleFocused';

  setSecureContactNumber: 'setSecureContactNumber';
  setIsValidSecureContactNumber: 'setIsValidSecureContactNumber';
  setIsSecureContactNumberFocused: 'setIsSecureContactNumberFocused';

  setSecureContactEmail: 'setSecureContactEmail';
  setIsValidSecureContactEmail: 'setIsValidSecureContactEmail';
  setIsSecureContactEmailFocused: 'setIsSecureContactEmailFocused';

  setRequestKind: 'setRequestKind';

  setRequestDescription: 'setRequestDescription';
  setIsValidRequestDescription: 'setIsValidRequestDescription';
  setIsRequestDescriptionFocused: 'setIsRequestDescriptionFocused';

  setAdditionalInformation: 'setAdditionalInformation';
  setIsValidAdditionalInformation: 'setIsValidAdditionalInformation';
  setIsAdditionalInformationFocused: 'setIsAdditionalInformationFocused';

  setUrgency: 'setUrgency';

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

type CreateAnonymousRequestDispatch =
  | {
      type:
        | 'setTitle'
        | 'setSecureContactNumber'
        | 'setSecureContactEmail'
        | 'setRequestDescription'
        | 'setAdditionalInformation'
        | 'setLoadingMessage'
        | 'setErrorMessage'
        | 'setSubmitMessage'
        | 'setSuccessMessage';
      payload: string;
    }
  | {
      type:
        | 'setIsValidTitle'
        | 'setIsValidSecureContactNumber'
        | 'setIsValidSecureContactEmail'
        | 'setIsValidRequestDescription'
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
        | 'setIsSecureContactNumberFocused'
        | 'setIsSecureContactEmailFocused'
        | 'setIsRequestDescriptionFocused'
        | 'setIsAdditionalInformationFocused';
      payload: boolean;
    }
  | {
      type: 'setRequestKind';
      payload: AnonymousRequestKind;
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

type CreateAnonymousRequestReducer = (
  state: CreateAnonymousRequestState,
  action: CreateAnonymousRequestDispatch
) => CreateAnonymousRequestState;

export type {
  AnonymousRequestDocument,
  AnonymousRequestKind,
  AnonymousRequestSchema,
  CreateAnonymousRequestAction,
  CreateAnonymousRequestDispatch,
  CreateAnonymousRequestReducer,
  CreateAnonymousRequestState,
};
