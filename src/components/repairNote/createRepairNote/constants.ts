import { DescriptionObjectsArray } from '../../wrappers';

const CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Customer information',
    ariaLabel:
      "Enter customer's name, phone number, email, address, city, state or province, country, and postal code",
  },
  {
    description: 'Repair item information',
    ariaLabel:
      "Enter repair item's name, serial id, date received, and description of issue",
  },
  {
    description: 'Repair information',
    ariaLabel:
      'Enter required repairs, parts needed, parts needed models, part under warranty, estimated repair cost, estimated completion date, and repair priority',
  },
  {
    description: 'Review and proceed',
    ariaLabel: 'Review all the information you have entered',
  },
];

const CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION = 4;

export {
  CREATE_REPAIR_NOTE_DESCRIPTION_OBJECTS,
  CREATE_REPAIR_NOTE_MAX_STEPPER_POSITION,
};
