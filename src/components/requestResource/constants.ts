import { DescriptionObjectsArray } from '../wrappers';

const REQUEST_RESOURCE_KIND_DATA = ['Hardware', 'Software', 'Access', 'Other'];

const REQUEST_RESOURCE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Resource details',
    ariaLabel: 'Enter department, resource kind, quantity and description',
  },

  {
    description: 'Reason and urgency',
    ariaLabel:
      'Enter reason for request, urgency, additional information and date needed by',
  },

  {
    description: 'Review and proceed',
    ariaLabel: 'Review accuracy of information and proceed',
  },
];

const REQUEST_RESOURCE_MAX_STEPPER_POSITION = 3;

export {
  REQUEST_RESOURCE_DESCRIPTION_OBJECTS,
  REQUEST_RESOURCE_KIND_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
};
