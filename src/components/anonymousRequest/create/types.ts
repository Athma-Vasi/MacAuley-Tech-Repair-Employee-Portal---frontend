import {
  Action,
  ActionsGeneral,
  PhoneNumber,
  RequestStatus,
  SetStepsInErrorPayload,
  Urgency,
} from '../../../types';

type AnonymousRequestKind =
  | 'Workplace safety'
  | 'Employee conflict'
  | 'Workplace harassment'
  | 'Company security'
  | 'Diversity and inclusion'
  | 'LGBTQIA+';

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
  requestStatus: RequestStatus;
};

type AnonymousRequestDocument = AnonymousRequestSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CreateAnonymousRequestState = {
  title: string;
  isValidTitle: boolean;
  isTitleFocused: boolean;

  secureContactNumber: PhoneNumber | string;
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

type CreateAnonymousRequestDispatch =
  | {
      type:
        | CreateAnonymousRequestAction['setTitle']
        | CreateAnonymousRequestAction['setSecureContactNumber']
        | CreateAnonymousRequestAction['setSecureContactEmail']
        | CreateAnonymousRequestAction['setRequestDescription']
        | CreateAnonymousRequestAction['setAdditionalInformation']
        | CreateAnonymousRequestAction['setLoadingMessage']
        | CreateAnonymousRequestAction['setSubmitMessage']
        | CreateAnonymousRequestAction['setSuccessMessage'];
      payload: string;
    }
  | {
      type:
        | CreateAnonymousRequestAction['setIsValidTitle']
        | CreateAnonymousRequestAction['setIsTitleFocused']
        | CreateAnonymousRequestAction['setIsValidSecureContactNumber']
        | CreateAnonymousRequestAction['setIsSecureContactNumberFocused']
        | CreateAnonymousRequestAction['setIsValidSecureContactEmail']
        | CreateAnonymousRequestAction['setIsSecureContactEmailFocused']
        | CreateAnonymousRequestAction['setIsValidRequestDescription']
        | CreateAnonymousRequestAction['setIsRequestDescriptionFocused']
        | CreateAnonymousRequestAction['setIsValidAdditionalInformation']
        | CreateAnonymousRequestAction['setIsAdditionalInformationFocused']
        | CreateAnonymousRequestAction['setTriggerFormSubmit']
        | CreateAnonymousRequestAction['setIsSubmitting']
        | CreateAnonymousRequestAction['setIsSuccessful']
        | CreateAnonymousRequestAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: CreateAnonymousRequestAction['setRequestKind'];
      payload: AnonymousRequestKind;
    }
  | {
      type: CreateAnonymousRequestAction['setUrgency'];
      payload: Urgency;
    }
  | {
      type: CreateAnonymousRequestAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: CreateAnonymousRequestAction['setStepsInError'];
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
