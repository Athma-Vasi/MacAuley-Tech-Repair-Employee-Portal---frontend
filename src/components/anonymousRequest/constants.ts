import { REQUEST_STATUS, URGENCY_DATA } from '../../constants/data';
import {
  DATE_FULL_RANGE_REGEX,
  EMAIL_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import { ResourceRoutePaths } from '../../types';
import {
  returnDateFullRangeValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnPhoneNumberValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Anonymous Request',
    ariaLabel:
      'Enter title, (optional) secure contact number, (required) secure contact email and request kind',
  },

  {
    description: 'Request Details',
    ariaLabel: 'Enter request description, additional information, and urgency',
  },

  {
    description: 'Review and Proceed',
    ariaLabel: 'Review and proceed',
  },
];

const CREATE_ANON_REQUEST_MAX_STEPPER_POSITION = 3;

const ANONYMOUS_REQUEST_KINDS = [
  'Benefits and compensation',
  'Bullying and intimidation',
  'Company security',
  'Customer service',
  'Discrimination',
  'Diversity and inclusion',
  'Employee conflict',
  'Ethical concerns',
  'LGBTQIA+',
  'Managerial issues',
  'Environmental concerns',
  'Workload and stress',
  'Workplace safety',
  'Workplace harassment',
];

const ANONYMOUS_REQUEST_QUERY_DATA: ComponentQueryData[] = [
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
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Secure Contact Number',
    value: 'secureContactNumber',
    inputKind: 'textInput',
    regex: PHONE_NUMBER_REGEX,
    regexValidationFn: returnPhoneNumberValidationText,
  },
  {
    label: 'Secure Contact Email',
    value: 'secureContactEmail',
    inputKind: 'textInput',
    regex: EMAIL_REGEX,
    regexValidationFn: returnEmailValidationText,
  },
  {
    label: 'Request Kind',
    value: 'requestKind',
    inputKind: 'selectInput',
    selectData: ANONYMOUS_REQUEST_KINDS,
  },
  {
    label: 'Request Description',
    value: 'requestDescription',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Additional Information',
    value: 'additionalInformation',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Urgency',
    value: 'urgency',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  {
    label: 'Request Status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const ANONYMOUS_REQUEST_ROUTES: ResourceRoutePaths = {
  manager: 'actions/general/anonymous-request',
  admin: 'actions/general/anonymous-request',
  employee: 'actions/general/anonymous-request/user',
};

export {
  ANONYMOUS_REQUEST_KINDS,
  ANONYMOUS_REQUEST_QUERY_DATA,
  ANONYMOUS_REQUEST_ROUTES,
  CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
};
