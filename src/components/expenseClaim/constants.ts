import { REQUEST_STATUS } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { CURRENCY_DATA } from '../benefits/constants';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const EXPENSE_CLAIM_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Expense Details',
    ariaLabel:
      'Enter expense claim kind, amount, currency, date, description, additional comments, acknowledgement and receipt',
  },
  {
    description: 'Upload Receipts',
    ariaLabel: 'Select up to 3 images of receipts to upload',
  },
  {
    description: 'Review and Proceed',
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

const EXPENSE_CLAIM_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Expense Claim Kind',
    value: 'expenseClaimKind',
    inputKind: 'selectInput',
    selectData: EXPENSE_CLAIM_KIND_DATA,
  },
  {
    label: 'Expense Claim Amount',
    value: 'expenseClaimAmount',
    inputKind: 'numberInput',
  },
  {
    label: 'Expense Claim Currency',
    value: 'expenseClaimCurrency',
    inputKind: 'selectInput',
    selectData: CURRENCY_DATA,
  },
  {
    label: 'Expense Claim Date',
    value: 'expenseClaimDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Expense Claim Description',
    value: 'expenseClaimDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Additional Comments',
    value: 'additionalComments',
    inputKind: 'textInput',
  },
  {
    label: 'Acknowledgement',
    value: 'acknowledgement',
    inputKind: 'booleanInput',
    booleanData: [true, false],
  },
  {
    label: 'Request Status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
];

const EXPENSE_CLAIM__ROUTE_PATHS: ResourceRoutePaths = {
  manager: '/api/v1/actions/company/expense-claim',
  admin: '/api/v1/actions/company/expense-claim',
  employee: '/api/v1/actions/company/expense-claim/user',
};

const EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY = new Set(['fileUploads']);

export {
  EXPENSE_CLAIM__ROUTE_PATHS,
  EXPENSE_CLAIM_DESCRIPTION_OBJECTS,
  EXPENSE_CLAIM_KIND_DATA,
  EXPENSE_CLAIM_MAX_IMG_AMOUNT,
  EXPENSE_CLAIM_MAX_IMG_SIZE,
  EXPENSE_CLAIM_MAX_STEPPER_POSITION,
  EXPENSE_CLAIM_QUERY_DATA,
  EXPENSE_CLAIMS_EXCLUDED_FIELDS_FROM_DISPLAY,
};
