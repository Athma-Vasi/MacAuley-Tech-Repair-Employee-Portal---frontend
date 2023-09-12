import { REQUEST_STATUS } from '../../constants/data';
import { CheckBoxMultipleData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_ENDORSEMENT_MAX_STEPPER_POSITION = 3;

const CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Employee Endorsement',
    ariaLabel: 'Enter title, user to be endorsed and summary of endorsement',
  },

  {
    description: 'Attribute(s) Endorsed',
    ariaLabel: 'Select attributes to be endorsed',
  },

  {
    description: 'Review and Proceed',
    ariaLabel: 'Review accuracy of entered information before proceeding',
  },
];

const EMPLOYEE_ATTRIBUTES_DATA: CheckBoxMultipleData = [
  { value: 'teamwork and collaboration', label: 'Teamwork and collaboration' },
  { value: 'leadership and mentorship', label: 'Leadership and mentorship' },
  { value: 'technical expertise', label: 'Technical expertise' },
  {
    value: 'adaptibility and flexibility',
    label: 'Adaptibility and flexibility',
  },
  { value: 'problem solving', label: 'Problem solving' },
  { value: 'customer service', label: 'Customer service' },
  { value: 'initiative and proactivity', label: 'Initiative and proactivity' },
  { value: 'communication', label: 'Communication' },
  {
    value: 'reliability and dependability',
    label: 'Reliability and dependability',
  },
];

const ATTRIBUTE_ENDORSED_SELECT_OPTIONS = [
  'teamwork and collaboration',
  'leadership and mentorship',
  'technical expertise',
  'adaptibility and flexibility',
  'problem solving',
  'customer service',
  'initiative and proactivity',
  'communication',
  'reliability and dependability',
];

const ENDORSEMENTS_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Attribute endorsed',
    value: 'attributeEndorsed',
    inputKind: 'selectInput',
    selectData: ATTRIBUTE_ENDORSED_SELECT_OPTIONS,
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
  {
    label: 'User to be endorsed',
    value: 'userToBeEndorsed',
    inputKind: 'textInput',
  },
  {
    label: 'Summary of endorsement',
    value: 'summaryOfEndorsement',
    inputKind: 'textInput',
  },
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
];

const ENDORSEMENTS_PATHS = {
  manager: 'actions/general/endorsement',
  admin: 'actions/general/endorsement',
  employee: 'actions/general/endorsement/user',
};

export {
  CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS,
  CREATE_ENDORSEMENT_MAX_STEPPER_POSITION,
  EMPLOYEE_ATTRIBUTES_DATA,
  ENDORSEMENTS_PATHS,
  ENDORSEMENTS_QUERY_DATA,
};
