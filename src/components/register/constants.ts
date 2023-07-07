import { DescriptionMap } from './stepperWrapper/types';

const REGISTER_URL = '/users';

const REGISTER_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Authentication',
      ariaLabel: 'Enter email, username, password and confirm password',
    },
  ],
  [
    2,
    {
      description: 'Personal',
      ariaLabel:
        'Enter first name, middle name, last name, preferred name, profile picture url, and (optionally) preferred pronouns',
    },
  ],
  [
    3,
    {
      description: 'Contact',
      ariaLabel:
        'Enter country, address line, city, province or state, postal or zip code, and contact number',
    },
  ],
  [
    4,
    {
      description: 'Additional',
      ariaLabel:
        'Enter job position, department, emergency contact name, emergency contact number, and start date',
    },
  ],
  [
    5,
    {
      description: 'Review',
      ariaLabel: 'Review all the information you have entered',
    },
  ],
]);

export { REGISTER_DESCRIPTION_MAP, REGISTER_URL };
