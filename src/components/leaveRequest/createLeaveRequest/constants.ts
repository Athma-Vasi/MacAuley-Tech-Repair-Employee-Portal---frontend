import { DescriptionObjectsArray } from '../../wrappers';

const REASON_FOR_LEAVE_DATA = [
  'Vacation',
  'Medical',
  'Parental',
  'Bereavement',
  'Jury Duty',
  'Military',
  'Education',
  'Religious',
  'Other',
];

const LEAVE_REQUEST_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Leave request details',
    ariaLabel:
      'Enter start date, end date, reason for leave, delegated to employee, delegated responsibilities, additional comments and acknowledgement',
  },

  {
    description: 'Review and proceed',
    ariaLabel: 'Review accuracy of entered information before proceeding',
  },
];

const LEAVE_REQUEST_MAX_STEPPER_POSITION = 2;

export {
  LEAVE_REQUEST_DESCRIPTION_OBJECTS,
  LEAVE_REQUEST_MAX_STEPPER_POSITION,
  REASON_FOR_LEAVE_DATA,
};
