import { ComponentQueryData } from '../queryBuilder';

const LEAVE_REQUESTS_QUERY_DATA: ComponentQueryData[] = [
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
  {
    label: 'Acknowledgement',
    value: 'acknowledgement',
    inputKind: 'selectInput',
    selectData: ['true', 'false'],
  },
];

const LEAVE_REQUESTS_PATHS = {
  manager: '/api/v1/actions/company/leave-request',
  admin: '/api/v1/actions/company/leave-request',
  employee: '/api/v1/actions/company/leave-request/user',
};

export { LEAVE_REQUESTS_PATHS, LEAVE_REQUESTS_QUERY_DATA };
