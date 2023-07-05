const REGISTER_URL = '/users';

/**
 * - [A-Za-z]{2,30} matches any letter, ensuring that the text is between 2 and 30 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const NAME_REGEX = /^[A-Za-z]{2,30}$/i;

/**
 * \+1 matches the literal "+1" characters. This represents the international dialing code for the United States and Canada.
 * \(\d{3}\) matches a literal "(" character, followed by any three digits, followed by a literal ")" character.
 * \d{3} matches any three digits.
 * - matches a literal "-" character.
 * \d{4} matches any four digits.
 * ^ and $ ensure that the entire string matches the regex.
 */
const PHONE_NUMBER_REGEX = /^\+1\(\d{3}\)\(\d{3}\) \d{3}-\d{4}$/;

/**
 * - [A-Za-z0-9\s.,#-] matches any letter, number, whitespace, period, comma, hash, or hyphen.
 * - {2,75} ensures that the text is between 2 and 75 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s.,#-]{2,75}$/i;

/**
 * - [A-Za-z\s.\-'] matches any letter, whitespace, period, hyphen, or apostrophe.
 * - {2,75} ensures that the text is between 2 and 75 characters long.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const CITY_REGEX = /^[A-Za-z\s.\-']{2,75}$/i;

/**
 * - [A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d matches any letter, followed by a digit, followed by a letter, followed by an optional space or hyphen, followed by a digit, followed by a letter, followed by a digit.
 * - ^ and $ ensure that the entire string matches the regex.
 * - i makes the regex case-insensitive.
 */
const POSTAL_CODE_REGEX_CANADA = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i;

/**
 * - \d{5}(?:[-\s]\d{4})? matches any digit, followed by 5 digits, followed by an optional hyphen or space, followed by 4 digits.
 * - ^ and $ ensure that the entire string matches the regex.
 */
const POSTAL_CODE_REGEX_US = /^\d{5}(?:[-\s]\d{4})?$/;

const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const STATES_US = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export {
  REGISTER_URL,
  NAME_REGEX,
  ADDRESS_LINE_REGEX,
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
  PROVINCES,
  STATES_US,
  POSTAL_CODE_REGEX_CANADA,
  POSTAL_CODE_REGEX_US,
};
