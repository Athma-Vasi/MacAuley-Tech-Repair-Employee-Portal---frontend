import { Department } from '../../types';
import type {
  RequestResourceAction,
  RequestResourceDispatch,
  RequestResourceKind,
  RequestResourceState,
  Urgency,
} from './types';

const initialRequestResourceState: RequestResourceState = {
  department: 'Administration',
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
};

function requestResourceReducer(
  state: RequestResourceState,
  action: RequestResourceDispatch
): RequestResourceState {
  switch (action.type) {
    case requestResourceAction.setDepartment:
      return {
        ...state,
        department: action.payload as Department,
      };
    case requestResourceAction.setResourceType:
      return {
        ...state,
        resourceType: action.payload as RequestResourceKind,
      };

    case requestResourceAction.setResourceQuantity:
      return {
        ...state,
        resourceQuantity: action.payload as string,
      };
    case requestResourceAction.setIsValidResourceQuantity:
      return {
        ...state,
        isValidResourceQuantity: action.payload as boolean,
      };
    case requestResourceAction.setIsResourceQuantityFocused:
      return {
        ...state,
        isResourceQuantityFocused: action.payload as boolean,
      };

    case requestResourceAction.setResourceDescription:
      return {
        ...state,
        resourceDescription: action.payload as string,
      };
    case requestResourceAction.setIsValidResourceDescription:
      return {
        ...state,
        isValidResourceDescription: action.payload as boolean,
      };
    case requestResourceAction.setIsResourceDescriptionFocused:
      return {
        ...state,
        isResourceDescriptionFocused: action.payload as boolean,
      };

    case requestResourceAction.setReasonForRequest:
      return {
        ...state,
        reasonForRequest: action.payload as string,
      };
    case requestResourceAction.setIsValidReasonForRequest:
      return {
        ...state,
        isValidReasonForRequest: action.payload as boolean,
      };
    case requestResourceAction.setIsReasonForRequestFocused:
      return {
        ...state,
        isReasonForRequestFocused: action.payload as boolean,
      };

    case requestResourceAction.setUrgency:
      return {
        ...state,
        urgency: action.payload as Urgency,
      };

    case requestResourceAction.setDateNeededBy:
      return {
        ...state,
        dateNeededBy: action.payload as string,
      };
    case requestResourceAction.setIsValidDateNeededBy:
      return {
        ...state,
        isValidDateNeededBy: action.payload as boolean,
      };
    case requestResourceAction.setIsDateNeededByFocused:
      return {
        ...state,
        isDateNeededByFocused: action.payload as boolean,
      };

    case requestResourceAction.setAdditionalInformation:
      return {
        ...state,
        additionalInformation: action.payload as string,
      };
    case requestResourceAction.setIsValidAdditionalInformation:
      return {
        ...state,
        isValidAdditionalInformation: action.payload as boolean,
      };
    case requestResourceAction.setIsAdditionalInformationFocused:
      return {
        ...state,
        isAdditionalInformationFocused: action.payload as boolean,
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
