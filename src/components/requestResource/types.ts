import type { Department, Urgency } from '../../types';

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
};

type RequestResourceDocument = RequestResourceSchema & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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
};

type RequestResourcePayload =
  | string
  | number
  | boolean
  | Department
  | RequestResourceKind
  | Urgency;

type RequestResourceDispatch = {
  type: RequestResourceAction[keyof RequestResourceAction];
  payload: RequestResourcePayload;
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
  RequestResourcePayload,
  RequestResourceReducer,
  RequestResourceSchema,
  RequestResourceState,
  Urgency,
};
