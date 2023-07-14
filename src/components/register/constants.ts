import { DescriptionObjectsArray } from '../wrappers';

const REGISTER_URL = '/users';

const REGISTER_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Authentication',
    ariaLabel: 'Enter email, username, password and confirm password',
  },

  {
    description: 'Personal information',
    ariaLabel:
      'Enter first name, middle name, last name, preferred name, profile picture url, and (optionally) preferred pronouns',
  },

  {
    description: 'Contact details',
    ariaLabel:
      'Enter country, address line, city, province or state, postal or zip code, and contact number',
  },

  {
    description: 'Additional information',
    ariaLabel:
      'Enter job position, department, emergency contact name, emergency contact number, and start date',
  },

  {
    description: 'Review and proceed',
    ariaLabel: 'Review all the information you have entered',
  },
];

const MAX_STEPPER_POSITION = 5;

export { MAX_STEPPER_POSITION, REGISTER_DESCRIPTION_OBJECTS, REGISTER_URL };
