import { DescriptionMap } from '../wrappers';

const REQUEST_RESOURCE_KIND_DATA = ['Hardware', 'Software', 'Access', 'Other'];

const REQUEST_RESOURCE_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Resource details',
      ariaLabel: 'Enter department, resource kind, quantity and description',
    },
  ],
  [
    2,
    {
      description: 'Reason and urgency',
      ariaLabel:
        'Enter reason for request, urgency, additional information and date needed by',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review accuracy of information and proceed',
    },
  ],
]);

const REQUEST_RESOURCE_MAX_STEPPER_POSITION = 3;

export {
  REQUEST_RESOURCE_DESCRIPTION_MAP,
  REQUEST_RESOURCE_KIND_DATA,
  REQUEST_RESOURCE_MAX_STEPPER_POSITION,
};
