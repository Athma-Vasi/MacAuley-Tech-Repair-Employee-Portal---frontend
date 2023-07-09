import { DescriptionMap } from '../stepperWrapper';

const CREATE_ANON_REQUEST_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Anonymous request details',
      ariaLabel:
        'Enter title, secure contact number, secure contact email, request kind, request description, additional information, and urgency',
    },
  ],
  [
    2,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review and proceed',
    },
  ],
]);

const CREATE_ANON_REQUEST_MAX_STEPPER_POSITION = 2;

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
  CREATE_ANON_REQUEST_DESCRIPTION_MAP,
  CREATE_ANON_REQUEST_MAX_STEPPER_POSITION,
};
