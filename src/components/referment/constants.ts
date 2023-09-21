import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  REQUEST_STATUS,
} from '../../constants/data';
import {
  DATE_FULL_RANGE_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  GRAMMAR_TEXT_INPUT_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX,
  USERNAME_REGEX,
} from '../../constants/regex';
import { ResourceRoutePaths } from '../../types';
import {
  returnDateFullRangeValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnNameValidationText,
  returnPhoneNumberValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
} from '../../utils';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_REFERMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Candidate Details',
    ariaLabel:
      'Enter candidate: full name, email, contact number, current job title, current company, and profile URL',
  },

  {
    description: 'Position Details',
    ariaLabel:
      'Enter position: referred for, job description, and referral reason, and additional information, and privacy consent',
  },

  {
    description: 'Review and Proceed',
    ariaLabel: 'Review accuracy of form and proceed',
  },
];

const CREATE_REFERMENT_MAX_STEPPER_POSITION = 3;

const REFERMENT_QUERY_DATA: ComponentQueryData[] = [
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
    label: 'Candidate Full Name',
    value: 'candidateFullName',
    inputKind: 'textInput',
    regex: FULL_NAME_REGEX,
    regexValidationFn: returnNameValidationText,
  },
  {
    label: 'Candidate Email',
    value: 'candidateEmail',
    inputKind: 'textInput',
    regex: EMAIL_REGEX,
    regexValidationFn: returnEmailValidationText,
  },
  {
    label: 'Candidate Contact Number',
    value: 'candidateContactNumber',
    inputKind: 'textInput',
    regex: PHONE_NUMBER_REGEX,
    regexValidationFn: returnPhoneNumberValidationText,
  },
  {
    label: 'Candidate Current Job Title',
    value: 'candidateCurrentJobTitle',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Candidate Current Company',
    value: 'candidateCurrentCompany',
    inputKind: 'textInput',
    regex: GRAMMAR_TEXT_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: 'Candidate Profile URL',
    value: 'candidateProfileUrl',
    inputKind: 'textInput',
    regex: URL_REGEX,
    regexValidationFn: returnUrlValidationText,
  },
  {
    label: 'Department Referred For',
    value: 'departmentReferredFor',
    inputKind: 'selectInput',
    selectData: DEPARTMENT_DATA,
  },
  {
    label: 'Position Referred For',
    value: 'positionReferredFor',
    inputKind: 'selectInput',
    selectData: JOB_POSITION_DATA,
  },
  {
    label: 'Position Job Description',
    value: 'positionJobDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Referral Reason',
    value: 'referralReason',
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
    label: 'Privacy Consent',
    value: 'privacyConsent',
    inputKind: 'booleanInput',
    booleanData: [true, false],
  },
  {
    label: 'Request Status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const REFERMENT_ROUTE_PATHS: ResourceRoutePaths = {
  manager: 'actions/general/referment',
  admin: 'actions/general/referment',
  employee: 'actions/general/referment/user',
};

export {
  CREATE_REFERMENT_DESCRIPTION_OBJECTS,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
  REFERMENT_QUERY_DATA,
  REFERMENT_ROUTE_PATHS,
};
