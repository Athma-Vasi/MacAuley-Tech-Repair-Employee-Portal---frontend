import { DescriptionObjectsArray } from '../../../wrappers';

const REPAIR_NOTE_REPAIR_STATUS_DATA = [
  'In progress',
  'Waiting for parts',
  'Awaiting approval',
  'Completed',
  'Cancelled',
];

const EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION = 2;

const EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Repair Note Details',
    ariaLabel:
      'Enter repair note, testing results, final repair cost and repair status',
  },
  {
    description: 'Review and Proceed',
    ariaLabel: 'Review accuracy of information and proceed',
  },
];

export {
  REPAIR_NOTE_REPAIR_STATUS_DATA,
  EDIT_REPAIR_NOTE_MAX_STEPPER_POSITION,
  EDIT_REPAIR_NOTE_DESCRIPTION_OBJECTS,
};
