import { DescriptionMap } from '../wrappers';

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

const CREATE_BENEFIT_DESCRIPTION_MAP: DescriptionMap = new Map([
  [
    1,
    {
      description: 'Plan details',
      ariaLabel: 'Enter plan name, description, start date, and plan kind',
    },
  ],
  [
    2,
    {
      description: 'Plan contributions',
      ariaLabel:
        'Enter currency, employer and employee contributions, and plan status',
    },
  ],
  [
    3,
    {
      description: 'Review and proceed',
      ariaLabel:
        'Please review plan details and ensure accuracy of information before proceeding',
    },
  ],
]);

const CREATE_BENEFIT_MAX_STEPPER_POSITION = 3;

export {
  BENEFIT_PLAN_DATA,
  CREATE_BENEFIT_DESCRIPTION_MAP,
  CREATE_BENEFIT_MAX_STEPPER_POSITION,
  CURRENCY_DATA,
  PLAN_DESCRIPTION_REGEX,
  PLAN_NAME_REGEX,
};
