import { DescriptionObjectsArray } from '../wrappers';

const ADDRESS_CHANGE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Contact details',
    ariaLabel:
      'Enter country, address line, city, province or state, postal or zip code, and contact number',
  },

  {
    description: 'Review and proceed',
    ariaLabel:
      'Review all the information you have entered and ensure they are correct before proceeding',
  },
];

const ADDRESS_CHANGE_MAX_STEPPER_POSITION = 2;

const COUNTRIES_DATA = ['Canada', 'United States'];

export {
  ADDRESS_CHANGE_DESCRIPTION_OBJECTS,
  ADDRESS_CHANGE_MAX_STEPPER_POSITION,
  COUNTRIES_DATA,
};
