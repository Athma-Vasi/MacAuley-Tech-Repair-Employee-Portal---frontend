import { DescriptionMap } from '../stepperWrapper';

const ADDRESS_CHANGE_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Contact details',
      ariaLabel:
        'Enter country, address line, city, province or state, postal or zip code, and contact number',
    },
  ],
  [
    2,
    {
      description: 'Review and proceed',
      ariaLabel:
        'Review all the information you have entered and ensure they are correct before proceeding',
    },
  ],
]);

const ADDRESS_CHANGE_MAX_STEPPER_POSITION = 2;

export { ADDRESS_CHANGE_DESCRIPTION_MAP, ADDRESS_CHANGE_MAX_STEPPER_POSITION };
