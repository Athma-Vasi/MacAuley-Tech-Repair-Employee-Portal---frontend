import {
  DEPARTMENT_DATA,
  JOB_POSITION_DATA,
  REQUEST_STATUS,
} from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_REFERMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Candidate details',
    ariaLabel:
      'Enter candidate: full name, email, contact number, current job title, current company, and profile URL',
  },

  {
    description: 'Position details',
    ariaLabel:
      'Enter position: referred for, job description, and referral reason, and additional information, and privacy consent',
  },

  {
    description: 'Review form',
    ariaLabel: 'Review accuracy of form and proceed',
  },
];

const CREATE_REFERMENT_MAX_STEPPER_POSITION = 3;

const REFERMENT_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Candidate Full Name',
    value: 'candidateFullName',
    inputKind: 'textInput',
  },
  {
    label: 'Candidate Email',
    value: 'candidateEmail',
    inputKind: 'textInput',
  },
  {
    label: 'Candidate Contact Number',
    value: 'candidateContactNumber',
    inputKind: 'textInput',
  },
  {
    label: 'Candidate Current Job Title',
    value: 'candidateCurrentJobTitle',
    inputKind: 'textInput',
  },
  {
    label: 'Candidate Current Company',
    value: 'candidateCurrentCompany',
    inputKind: 'textInput',
  },
  {
    label: 'Candidate Profile URL',
    value: 'candidateProfileUrl',
    inputKind: 'textInput',
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
  },
  {
    label: 'Additional Information',
    value: 'additionalInformation',
    inputKind: 'textInput',
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
  {
    label: 'Created At',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated At',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

const REFERMENT_ROUTE_PATHS: ResourceRoutePaths = {
  manager: '/api/v1/actions/general/referment',
  admin: '/api/v1/actions/general/referment',
  employee: '/api/v1/actions/general/referment/user',
};

export {
  CREATE_REFERMENT_DESCRIPTION_OBJECTS,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
  REFERMENT_QUERY_DATA,
  REFERMENT_ROUTE_PATHS,
};
