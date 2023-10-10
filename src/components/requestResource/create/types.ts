import type {
  Department,
  SetStepsInErrorPayload,
  Urgency,
} from '../../../types';
import { RequestStatus } from '../../../types';

type RequestResourceKind = 'Hardware' | 'Software' | 'Access' | 'Other';

type RequestResourceSchema = {
  userId: string;
  username: string;
  department: Department;
  resourceType: RequestResourceKind;
  resourceQuantity: number;
  resourceDescription: string;
  reasonForRequest: string;
  urgency: Urgency;
  dateNeededBy: string;
  additionalInformation: string;
  requestStatus: RequestStatus;
};

type RequestResourceDocument = RequestResourceSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RequestResourceState = {
  department: Department;
  resourceType: RequestResourceKind;

  resourceQuantity: string;
  isValidResourceQuantity: boolean;
  isResourceQuantityFocused: boolean;

  resourceDescription: string;
  isValidResourceDescription: boolean;
  isResourceDescriptionFocused: boolean;

  reasonForRequest: string;
  isValidReasonForRequest: boolean;
  isReasonForRequestFocused: boolean;

  urgency: Urgency;

  dateNeededBy: string;
  isValidDateNeededBy: boolean;
  isDateNeededByFocused: boolean;

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

type RequestResourceAction = {
  setDepartment: 'setDepartment';
  setResourceType: 'setResourceType';

  setResourceQuantity: 'setResourceQuantity';
  setIsValidResourceQuantity: 'setIsValidResourceQuantity';
  setIsResourceQuantityFocused: 'setIsResourceQuantityFocused';

  setResourceDescription: 'setResourceDescription';
  setIsValidResourceDescription: 'setIsValidResourceDescription';
  setIsResourceDescriptionFocused: 'setIsResourceDescriptionFocused';

  setReasonForRequest: 'setReasonForRequest';
  setIsValidReasonForRequest: 'setIsValidReasonForRequest';
  setIsReasonForRequestFocused: 'setIsReasonForRequestFocused';

  setUrgency: 'setUrgency';

  setDateNeededBy: 'setDateNeededBy';
  setIsValidDateNeededBy: 'setIsValidDateNeededBy';
  setIsDateNeededByFocused: 'setIsDateNeededByFocused';

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

// type RequestResourcePayload =
//   | string
//   | number
//   | boolean
//   | Department
//   | RequestResourceKind
//   | Urgency;

// type RequestResourceDispatch = {
//   type: RequestResourceAction[keyof RequestResourceAction];
//   payload: RequestResourcePayload;
// };

type RequestResourceDispatch =
  | {
      type:
        | RequestResourceAction['setResourceDescription']
        | RequestResourceAction['setResourceQuantity']
        | RequestResourceAction['setReasonForRequest']
        | RequestResourceAction['setAdditionalInformation']
        | RequestResourceAction['setDateNeededBy']
        | RequestResourceAction['setSubmitMessage']
        | RequestResourceAction['setSuccessMessage']
        | RequestResourceAction['setLoadingMessage'];
      payload: string;
    }
  | {
      type: RequestResourceAction['setDepartment'];
      payload: Department;
    }
  | {
      type: RequestResourceAction['setResourceType'];
      payload: RequestResourceKind;
    }
  | {
      type:
        | RequestResourceAction['setIsValidResourceQuantity']
        | RequestResourceAction['setIsResourceQuantityFocused']
        | RequestResourceAction['setIsValidResourceDescription']
        | RequestResourceAction['setIsResourceDescriptionFocused']
        | RequestResourceAction['setIsValidReasonForRequest']
        | RequestResourceAction['setIsReasonForRequestFocused']
        | RequestResourceAction['setIsValidDateNeededBy']
        | RequestResourceAction['setIsDateNeededByFocused']
        | RequestResourceAction['setIsValidAdditionalInformation']
        | RequestResourceAction['setIsAdditionalInformationFocused']
        | RequestResourceAction['setTriggerFormSubmit']
        | RequestResourceAction['setIsSubmitting']
        | RequestResourceAction['setIsSuccessful']
        | RequestResourceAction['setIsLoading'];
      payload: boolean;
    }
  | {
      type: RequestResourceAction['setUrgency'];
      payload: Urgency;
    }
  | {
      type: RequestResourceAction['setCurrentStepperPosition'];
      payload: number;
    }
  | {
      type: RequestResourceAction['setStepsInError'];
      payload: SetStepsInErrorPayload;
    };

type RequestResourceReducer = (
  state: RequestResourceState,
  action: RequestResourceDispatch
) => RequestResourceState;

export type {
  RequestResourceAction,
  RequestResourceDispatch,
  RequestResourceDocument,
  RequestResourceKind,
  RequestResourceReducer,
  RequestResourceSchema,
  RequestResourceState,
  Urgency,
};
