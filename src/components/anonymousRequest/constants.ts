import { REQUEST_STATUS, URGENCY_DATA } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Anonymous request',
    ariaLabel:
      'Enter title, (optional) secure contact number, (required) secure contact email and request kind',
  },

  {
    description: 'Request details',
    ariaLabel: 'Enter request description, additional information, and urgency',
  },

  {
    description: 'Review and proceed',
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
  { label: 'Username', value: 'username', inputKind: 'textInput' },
  {
    label: 'Created date',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated date',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Title',
    value: 'title',
    inputKind: 'textInput',
  },
  {
    label: 'Secure contact number',
    value: 'secureContactNumber',
    inputKind: 'textInput',
  },
  {
    label: 'Secure contact email',
    value: 'secureContactEmail',
    inputKind: 'textInput',
  },
  {
    label: 'Request kind',
    value: 'requestKind',
    inputKind: 'selectInput',
    selectData: ANONYMOUS_REQUEST_KINDS,
  },
  {
    label: 'Request description',
    value: 'requestDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Additional information',
    value: 'additionalInformation',
    inputKind: 'textInput',
  },
  {
    label: 'Urgency',
    value: 'urgency',
    inputKind: 'selectInput',
    selectData: URGENCY_DATA,
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const ANONYMOUS_REQUEST_ROUTES: ResourceRoutePaths = {
  manager: '/api/v1/actions/general/anonymous-request',
  admin: '/api/v1/actions/general/anonymous-request',
  employee: '/api/v1/actions/general/anonymous-request/user',
};

export {
  ANONYMOUS_REQUEST_KINDS,
  ANONYMOUS_REQUEST_QUERY_DATA,
  ANONYMOUS_REQUEST_ROUTES,
  CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
};
