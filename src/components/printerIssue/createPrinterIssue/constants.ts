import { DescriptionMap } from '../../wrappers';

const CREATE_PRINTER_ISSUE_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Personal and contact details',
      ariaLabel:
        'Enter title, contact number, contact email, date and time of occurence',
    },
  ],
  [
    2,
    {
      description: 'Printer details',
      ariaLabel:
        'Enter printer: make, model, serial number, description of issue, and any additional information',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review the accuracy of information entered and proceed',
    },
  ],
]);

const CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION = 3;

export {
  CREATE_PRINTER_ISSUE_DESCRIPTION_MAP,
  CREATE_PRINTER_ISSUE_MAX_STEPPER_POSITION,
};
