import { DescriptionMap } from '../wrappers';

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

const LEAVE_REQUEST_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Leave request details',
      ariaLabel:
        'Enter start date, end date, reason for leave, delegated to employee, delegated responsibilities, additional comments and acknowledgement',
    },
  ],
  [
    2,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review accuracy of entered information before proceeding',
    },
  ],
]);

const LEAVE_REQUEST_MAX_STEPPER_POSITION = 2;

export {
  LEAVE_REQUEST_DESCRIPTION_MAP,
  LEAVE_REQUEST_MAX_STEPPER_POSITION,
  REASON_FOR_LEAVE_DATA,
};
