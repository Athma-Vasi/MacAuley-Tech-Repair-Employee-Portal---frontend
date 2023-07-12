import { DescriptionMap } from '../../wrappers';

const CREATE_REFERMENT_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Candidate details',
      ariaLabel:
        'Enter candidate: full name, email, contact number, current job title, current company, and profile URL',
    },
  ],
  [
    2,
    {
      description: 'Position details',
      ariaLabel:
        'Enter position: referred for, job description, and referral reason, and additional information, and privacy consent',
    },
  ],
  [
    3,
    {
      description: 'Review form',
      ariaLabel: 'Review accuracy of form and proceed',
    },
  ],
]);

const CREATE_REFERMENT_MAX_STEPPER_POSITION = 3;

export {
  CREATE_REFERMENT_DESCRIPTION_MAP,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
};
