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
  'Workplace safety',
  'Employee conflict',
  'Workplace harassment',
  'Company security',
  'Diversity and inclusion',
  'LGBTQIA+',
];

export {
  ANONYMOUS_REQUEST_KINDS,
  CREATE_ANON_REQUEST_DESCRIPTION_OBJECTS,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
};
