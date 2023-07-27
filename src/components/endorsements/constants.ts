import { CheckBoxMultipleData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const CREATE_ENDORSEMENT_MAX_STEPPER_POSITION = 3;

const CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Employee endorsement',
    ariaLabel: 'Enter title, user to be endorsed and summary of endorsement',
  },

  {
    description: 'Attribute(s) endorsed',
    ariaLabel: 'Select attributes to be endorsed',
  },

  {
    description: 'Review and proceed',
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

/**
 * const LEAVE_REQUESTS_QUERY_DATA: ComponentQueryData[] = [
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
    label: 'Start date',
    value: 'startDate',
    inputKind: 'dateInput',
  },
  {
    label: 'End date',
    value: 'endDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Reason for leave',
    value: 'reasonForLeave',
    inputKind: 'selectInput',
    selectData: [
      'Vacation',
      'Medical',
      'Parental',
      'Bereavement',
      'Jury Duty',
      'Military',
      'Education',
      'Religious',
      'Other',
    ],
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: ['pending', 'approved', 'rejected'],
  },
  {
    label: 'Delegated to employee',
    value: 'delegatedToEmployee',
    inputKind: 'textInput',
  },
  {
    label: 'Delegated responsibilities',
    value: 'delegatedResponsibilities',
    inputKind: 'textInput',
  },
  {
    label: 'Additional comments',
    value: 'additionalComments',
    inputKind: 'textInput',
  },
];
 */

const ENDORSEMENTS_QUERY_DATA: ComponentQueryData[] = [
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
  // {
  //   label: 'Attribute endorsed',
  //   value: 'attributeEndorsed',
  //   inputKind: 'selectInput',
  //   selectData: [
  //     'teamwork and collaboration',
  //     'leadership and mentorship',
  //     'technical expertise',
  //     'adaptibility and flexibility',
  //     'problem solving',
  //     'customer service',
  //     'initiative and proactivity',
  //     'communication',
  //     'reliability and dependability',
  //   ],
  // },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: ['pending', 'approved', 'rejected'],
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
];

export {
  CREATE_ENDORSEMENT_DESCRIPTION_OBJECTS,
  CREATE_ENDORSEMENT_MAX_STEPPER_POSITION,
  EMPLOYEE_ATTRIBUTES_DATA,
  ENDORSEMENTS_QUERY_DATA,
};
