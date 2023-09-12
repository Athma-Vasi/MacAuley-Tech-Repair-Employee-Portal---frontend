import {
  DEPARTMENT_DATA,
  REQUEST_STATUS,
  URGENCY_DATA,
} from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
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
  },
  {
    label: 'Resource Description',
    value: 'resourceDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Reason for Request',
    value: 'reasonForRequest',
    inputKind: 'textInput',
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
  },
  {
    label: 'Additional Information',
    value: 'additionalInformation',
    inputKind: 'textInput',
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
