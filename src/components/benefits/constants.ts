import { REQUEST_STATUS } from '../../constants/data';
import { ResourceRoutePaths } from '../../types';
import { ComponentQueryData } from '../queryBuilder';
import { DescriptionObjectsArray } from '../wrappers';

const BENEFIT_PLAN_DATA = [
  'Health',
  'Dental',
  'Vision',
  'Life',
  'Disability',
  'Retirement',
  'Education',
  'Other',
];

const CURRENCY_DATA = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY'];

/**
 * - (?=.*[A-Za-z0-9]) is a positive lookahead assertion that requires the presence of at least one alphanumeric character. This ensures that the string contains at least one letter or digit.
 * - [\w\s.,!?():;"'-]{1,50} matches any word character, whitespace, or punctuation character between 1 and 50 times. This ensures that the string contains between 1 and 50 word characters, whitespace, or punctuation characters.
 * - The ^ and $ anchors ensure that the entire string is matched.
 * - The i flag makes the regex case insensitive.
 */
const PLAN_NAME_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,50}$/i;

/**
 * - (?=.*[A-Za-z0-9]) ensures that there is at least one alphanumeric character, preventing the input from consisting entirely of whitespace.
 * - [\w\s.,!?():;"'-] matches any word characters (\w includes alphanumeric characters and underscores), whitespace, and a range of allowed punctuation marks commonly used in grammar and punctuation: ., ,, !, ?, (, ), :, ;, ", ', -. The hyphen is placed at the end of the list to prevent it from being interpreted as a range of characters.
 * - {1,300} ensures that the text is between 1 and 300 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const PLAN_DESCRIPTION_REGEX = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,300}$/i;

const CREATE_BENEFIT_DESCRIPTION_OBJECTS: DescriptionObjectsArray = [
  {
    description: 'Plan Details',
    ariaLabel: 'Enter plan name, description, start date, and plan kind',
  },

  {
    description: 'Plan Contributions',
    ariaLabel:
      'Enter currency, employer and employee contributions, and plan status',
  },

  {
    description: 'Review and Proceed',
    ariaLabel:
      'Please review plan details and ensure accuracy of information before proceeding',
  },
];

const CREATE_BENEFIT_MAX_STEPPER_POSITION = 3;

const BENEFIT_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Plan name',
    value: 'planName',
    inputKind: 'textInput',
  },
  {
    label: 'Plan description',
    value: 'planDescription',
    inputKind: 'textInput',
  },
  {
    label: 'Plan kind',
    value: 'planKind',
    inputKind: 'selectInput',
    selectData: BENEFIT_PLAN_DATA,
  },
  {
    label: 'Plan start date',
    value: 'planStartDate',
    inputKind: 'dateInput',
  },
  {
    label: 'Is plan active',
    value: 'isPlanActive',
    inputKind: 'booleanInput',
    booleanData: [true, false],
  },
  {
    label: 'Currency',
    value: 'currency',
    inputKind: 'selectInput',
    selectData: CURRENCY_DATA,
  },
  {
    label: 'Employer contribution',
    value: 'employerContribution',
    inputKind: 'numberInput',
  },
  {
    label: 'Employee contribution',
    value: 'employeeContribution',
    inputKind: 'numberInput',
  },
  {
    label: 'Monthly premium',
    value: 'monthlyPremium',
    inputKind: 'numberInput',
  },
  {
    label: 'Request status',
    value: 'requestStatus',
    inputKind: 'selectInput',
    selectData: REQUEST_STATUS,
  },
  {
    label: 'Created date',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated date',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

const BENEFIT_RESOURCE_PATHS: ResourceRoutePaths = {
  manager: 'actions/company/benefit',
  admin: 'actions/company/benefit',
  employee: 'actions/company/benefit/user',
};

export {
  BENEFIT_PLAN_DATA,
  BENEFIT_QUERY_DATA,
  BENEFIT_RESOURCE_PATHS,
  CREATE_BENEFIT_DESCRIPTION_OBJECTS,
  CREATE_BENEFIT_MAX_STEPPER_POSITION,
  CURRENCY_DATA,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
};
