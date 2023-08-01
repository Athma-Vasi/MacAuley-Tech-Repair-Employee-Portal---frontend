import { DescriptionObjectsArray } from '../wrappers';

const EXPENSE_CLAIM_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Expense details',
    ariaLabel:
      'Enter expense claim kind, amount, currency, date, description, additional comments, acknowledgement and receipt',
  },
  {
    description: 'Upload receipts',
    ariaLabel: 'Select up to 3 images of receipts to upload',
  },
  {
    description: 'Review and proceed',
    ariaLabel: 'Review accuracy of information and proceed',
  },
];

const EXPENSE_CLAIM_MAX_STEPPER_POSITION = 3;

const EXPENSE_CLAIM_KIND_DATA = [
  'Travel and Accomodation',
  'Equipment and Supplies',
  'Communication and Utilities',
  'Training and Certifications',
  'Software and Licenses',
  'Marketing and Advertising',
  'Insurance',
  'Rent and Leasing',
  'Legal and Professional Fees',
  'Miscellaneous',
];

const EXPENSE_CLAIM_MAX_IMG_AMOUNT = 3;

const EXPENSE_CLAIM_MAX_IMG_SIZE = 1 * 1024 * 1024;

export {
  EXPENSE_CLAIM_DESCRIPTION_OBJECTS,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_IMG_AMOUNT,
  EXPENSE_CLAIM_MAX_IMG_SIZE,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
};
