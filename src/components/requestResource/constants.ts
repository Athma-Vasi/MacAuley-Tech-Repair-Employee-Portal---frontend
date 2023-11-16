import {
  DEPARTMENT_DATA,
  REQUEST_STATUS,
  URGENCY_DATA,
} from '../../constants/data';
import {
  DATE_FULL_RANGE_REGEX,
  DATE_NEAR_FUTURE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  MONEY_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import { ResourceRoutePaths } from '../../types';
import {
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnGrammarValidationText,
  returnFloatAmountValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const REQUEST_RESOURCE_KIND_DATA = ['Hardware', 'Software', 'Access', 'Other'];

const REQUEST_RESOURCE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Resource Details',
    ariaLabel: 'Enter department, resource kind, quantity and description',
  },

  {
    description: 'Reason and Urgency',
    ariaLabel:
      'Enter reason for request, urgency, additional information and date needed by',
  },

  {
    description: 'Review and Proceed',
    ariaLabel: 'Review accuracy of information and proceed',
  },
];

const REQUEST_RESOURCE_MAX_STEPPER_POSITION = 3;

const REQUEST_RESOURCE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Username',
    value: 'username',
    inputKind: 'textInput',
    regex: USERNAME_REGEX,
    regexValidationFn: returnUsernameRegexValidationText,
  },
  {
    label: 'Created Date',
    value: 'createdAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Updated Date',
    value: 'updatedAt',
    inputKind: 'dateInput',
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: 'Department',
    value: 'department',
    inputKind: 'selectInput',
    selectData: DEPARTMENT_DATA,
  },
  {
    label: 'Resource Type',
    value: 'resourceType',
    inputKind: 'selectInput',
    selectData: REQUEST_RESOURCE_KIND_DATA,
  },
  {
    label: 'Resource Quantity',
    value: 'resourceQuantity',
    inputKind: 'numberInput',
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: 'Resource Description',
    value: 'resourceDescription',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Reason for Request',
    value: 'reasonForRequest',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Urgency',
    value: 'urgency',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  {
    label: 'Date Needed By',
    value: 'dateNeededBy',
    inputKind: 'dateInput',
    regex: DATE_NEAR_FUTURE_REGEX,
    regexValidationFn: returnDateNearFutureValidationText,
  },
  {
    label: 'Additional Information',
    value: 'additionalInformation',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Request Status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const REQUEST_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: 'actions/company/request-resource',
  admin: 'actions/company/request-resource',
  employee: 'actions/company/request-resource/user',
};

export {
  REQUEST_RESOURCE_DESCRIPTION_OBJECTS,
  REQUEST_RESOURCE_KIND_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
  REQUEST_RESOURCE_PATHS,
  REQUEST_RESOURCE_QUERY_DATA,
};
