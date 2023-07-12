import { DescriptionMap } from '../wrappers';

const EXPENSE_CLAIM_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Expense details',
      ariaLabel:
        'Enter expense claim kind, amount, currency, date, description, additional comments, acknowledgement and receipt',
    },
  ],
  [
    2,
    {
      description: 'Review and proceed',
      ariaLabel: 'Review accuracy of information and proceed',
    },
  ],
]);

const EXPENSE_CLAIM_MAX_STEPPER_POSITION = 2;

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

export {
  EXPENSE_CLAIM_DESCRIPTION_MAP,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
};
