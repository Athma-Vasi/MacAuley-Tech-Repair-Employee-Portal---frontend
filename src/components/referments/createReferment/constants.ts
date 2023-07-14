import { DescriptionObjectsArray } from '../../wrappers';

const CREATE_REFERMENT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Candidate details',
    ariaLabel:
      'Enter candidate: full name, email, contact number, current job title, current company, and profile URL',
  },

  {
    description: 'Position details',
    ariaLabel:
      'Enter position: referred for, job description, and referral reason, and additional information, and privacy consent',
  },

  {
    description: 'Review form',
    ariaLabel: 'Review accuracy of form and proceed',
  },
];

const CREATE_REFERMENT_MAX_STEPPER_POSITION = 3;

export {
  CREATE_REFERMENT_DESCRIPTION_OBJECTS,
  CREATE_REFERMENT_MAX_STEPPER_POSITION,
};
