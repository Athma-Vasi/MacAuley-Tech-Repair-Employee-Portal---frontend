import html2canvas from 'html2canvas';
import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

import { DecodedToken } from '../components/login/types';
import { ColorsSwatches } from '../constants/data';
import { ThemeObject } from '../context/globalProvider/types';
import type { Country, PostalCode, QueryResponseData } from '../types';

/**
 * contentKind is used to specify the semantic html input label, and is used in the returned validation error string for improved accessibility.
 */
type RegexValidationProps = {
  content: string;
  contentKind: string;
  minLength?: number;
  maxLength?: number;
};

function returnEmailValidationText({
  content,
  contentKind,
  maxLength = 61,
  minLength = 0,
}: RegexValidationProps): string {
  const usernamePartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  // /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/
  const domainPartRegex = new RegExp(
    `^[a-zA-Z0-9](?:[a-zA-Z0-9-]{${minLength},${maxLength}}[a-zA-Z0-9])?$`
  );
  // /^\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/
  const subdomainPartRegex = new RegExp(
    `^\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{${minLength},${maxLength}}[a-zA-Z0-9])?$`
  );

  const emailRegexTupleArr: [boolean, string][] = [
    [usernamePartRegex.test(content), 'Must contain a valid username part.'],
    [domainPartRegex.test(content), 'Must contain a valid domain part.'],
    [
      subdomainPartRegex.test(content),
      'Must contain a valid (optional) subdomain part.',
    ],
  ];

  const validationText = emailRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

function returnUsernameRegexValidationText({
  content,
  contentKind,
  minLength = 3,
  maxLength = 20,
}: RegexValidationProps): string {
  const usernameLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const usernameStartRegex = /^(?![-_.])/;
  const usernameConsecutiveRegex = /^(?!.*[-_.]{2})/;
  const usernameCharacterRegex = /^[a-zA-Z0-9-_.]+$/;
  const usernameEndRegex = /(?<![-_.])$/;

  const usernameRegexTupleArr: [boolean, string][] = [
    [
      usernameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      usernameStartRegex.test(content),
      'Cannot start with a hyphen, underscore, or period.',
    ],
    [
      usernameConsecutiveRegex.test(content),
      'Cannot contain two hyphens, underscores, or periods in a row.',
    ],
    [
      usernameCharacterRegex.test(content),
      'Can only contain alphanumeric characters, hyphens, underscores, or periods.',
    ],
    [
      usernameEndRegex.test(content),
      'Cannot end with a hyphen, underscore, or period.',
    ],
  ];

  const validationText = usernameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

/**
 * Performs basic serial id validation [A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnSerialIdValidationText({
  content,
  contentKind,
  minLength = 1,
  maxLength = 100,
}: RegexValidationProps): string {
  const serialIdLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const alphanumericOrSpecialCharacterRegex =
    /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\w\s]+$/;

  const serialIdRegexTupleArr: [boolean, string][] = [
    [
      serialIdLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],

    [
      atleastOneAlphanumericRegex.test(content),
      'Must contain at least one alphanumeric character.',
    ],

    [
      alphanumericOrSpecialCharacterRegex.test(content),
      'Can only contain alphanumeric characters or special characters.',
    ],
  ];

  const validationText = serialIdRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

/**
 * Performs note text validation [A-Za-z0-9\s.,!?():;"'-] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnNoteTextValidationText({
  content,
  contentKind,
  minLength = 2,
  maxLength = 75,
}: RegexValidationProps): string {
  const contentLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;

  const contentRegexTupleArr: [boolean, string][] = [
    [
      atleastOneAlphanumericRegex.test(content),
      'Must contain at least one alphanumeric character.',
    ],
    [
      wordCharacterWhitespacePunctuationRegex.test(content),
      'Can only contain alphanumeric characters, whitespace, or punctuation.',
    ],
    [
      contentLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
  ];

  const validationText = contentRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

/**
 * Performs basic grammar validation [.,!?():;"'-] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnGrammarValidationText({
  content,
  contentKind,
  minLength = 2,
  maxLength = 100,
}: RegexValidationProps): string {
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;
  // const grammar = /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{2,75}$/i;
  // const unicode = /[\p{L}-]+/gu;
  // const wordCharacterWhitespacePunctuationRegex = new RegExp(
  //   `(${grammar.source})|(${unicode.source})`,
  //   'gu'
  // );

  const contentLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);

  const joinedContent = content.split('\n').join('');

  const contentRegexTupleArr: [boolean, string][] = [
    [
      atleastOneAlphanumericRegex.test(joinedContent),
      'Must contain at least one alphanumeric character.',
    ],
    [
      wordCharacterWhitespacePunctuationRegex.test(joinedContent),
      'Can only contain alphanumeric characters, whitespace, or punctuation.',
    ],
    [
      contentLengthRegex.test(joinedContent),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
  ];

  const validationText = contentRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnImageValidationText(image: File | Blob) {
  const imageKind = image.type.split('/')[0];
  const imageType = image.type.split('/')[1];
  const imageSize = image.size;

  const imageKindValidationRegex = /^image$/;
  const imageTypeValidationRegex = /^jpeg|png$/;
  // const imageSizeValidationRegex = /^.{0,1000000}$/;

  const imageRegexTupleArr: [boolean, string][] = [
    [imageKindValidationRegex.test(imageKind), 'Must be an image kind.'],
    [imageTypeValidationRegex.test(imageType), 'Must be a jpeg or png.'],
    [imageSize < 1000000, 'Must be less than 1 MB.'],
  ];

  const validationText = imageRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `${validationText}` : '';
}

function returnAcknowledgementValidationText(content: string) {
  /**
   * const ACKNOWLEDGEMENT_TEXT_INPUT_REGEX =
  /^I solemnly swear that I am up to no good\.$/i;
   */

  const acknowledgementTextRegex =
    /^I solemnly swear that I am up to no good\.$/i;

  const validationText = acknowledgementTextRegex.test(content)
    ? ''
    : 'Invalid acknowledgement text.';

  return validationText;
}

/**
 * Performs basic address validation [A-Za-z0-9\s.,#-] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnAddressValidationText({
  content,
  contentKind,
  minLength = 2,
  maxLength = 75,
}: RegexValidationProps): string {
  // /^[A-Za-z0-9\s.,#-]{2,75}$/i
  const addressLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const addressCharacterRegex = /^[A-Za-z0-9\s.,#-]+$/;

  const addressRegexTupleArr: [boolean, string][] = [
    [
      addressLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      addressCharacterRegex.test(content),
      'Can only contain alphanumeric characters, spaces, periods, commas, hyphens, or pound signs.',
    ],
  ];

  const validationText = addressRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

/**
 * Performs basic city validation [A-Za-z\s.\-'] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnCityValidationText({
  content,
  contentKind,
  maxLength = 75,
  minLength = 2,
}: RegexValidationProps): string {
  // /^[A-Za-z\s.\-']{2,75}$/i
  const cityLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const cityCharacterRegex = /^[A-Za-z\s.\-']+$/;

  const cityRegexTupleArr: [boolean, string][] = [
    [cityLengthRegex.test(content), 'Must be between 2 and 75 characters.'],
    [
      cityCharacterRegex.test(content),
      'Can only contain alphabetical characters, spaces, periods, or hyphens.',
    ],
  ];

  const validationText = cityRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnPhoneNumberValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  const phoneNumberRegex = /^\+\(1\)\(\d{3}\)[ ]\d{3}-\d{4}$/;
  const isValidRegex = phoneNumberRegex.test(content);
  if (!isValidRegex) {
    return `Invalid ${contentKind}. Must be a valid North American phone number of format +(1)(234) 567-8901. Only numbers, parentheses, spaces, '+' and hyphens are allowed.`;
  }

  return '';
}

type ReturnPostalCodeValidationTextInput = {
  postalCode: PostalCode;
  country: Country;
};

function returnPostalCodeValidationText({
  postalCode,
  country,
}: ReturnPostalCodeValidationTextInput): string {
  if (country === 'United States') {
    const postalCodeRegex = /^\d{5}(?:[-]\d{4})?$/;
    const isValidRegex = postalCodeRegex.test(postalCode);
    if (!isValidRegex) {
      return 'Invalid zip code. Must be a valid US zip code of either five digits or the ZIP+4 format with five digits, a hyphen, and four additional digits. Only numbers and hyphens are allowed.';
    }
    return '';
  }

  // canada
  const firstPartRegex = /^[A-Za-z]\d[A-Za-z]$/i;
  const secondPartRegex = /^\d[A-Za-z]\d$/i;

  const firstPart = postalCode.split(' ')[0];
  const secondPart = postalCode.split(' ')[1];

  const canadianPostalCodeTupleArr: [boolean, string][] = [
    [
      firstPartRegex.test(firstPart),
      'Forward Sortation Area must consist of a letter, digit, letter.',
    ],
    [
      secondPartRegex.test(secondPart),
      'Local Delivery Unit must consist of a digit, letter, digit.',
    ],
  ];

  const validationText = canadianPostalCodeTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid postal code. ${validationText}` : '';
}

function returnDateValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/;

  const day = content.split('-')[2];
  const month = content.split('-')[1];
  const year = content.split('-')[0];

  const dateValidationTupleArr: [boolean, string][] = [
    [
      day ? dayRegex.test(day) : true,
      'Must be a valid day. Cannot be greater than 31.',
    ],
    [
      month ? monthRegex.test(month) : true,
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      year ? yearRegex.test(year) : true,
      'Must be a valid year between 1900 and 2024.',
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

function returnDateNearFutureValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[3-6])$/;

  const day = content.split('-')[2];
  const month = content.split('-')[1];
  const year = content.split('-')[0];

  const isDayInPast = day ? parseInt(day) < new Date().getDate() : false;
  const isMonthInPast = month
    ? parseInt(month) < new Date().getMonth() + 1
    : false;
  const isYearInPast = year ? parseInt(year) < new Date().getFullYear() : false;

  const isEnteredYearMonthDayInPast = isYearInPast
    ? isMonthInPast
      ? isDayInPast
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInPast = isYearInPast
    ? isMonthInPast
      ? true
      : false
    : false;
  const isEnteredDayInPast = day ? parseInt(day) < new Date().getDate() : false;

  const dateValidationTupleArr: [boolean, string][] = [
    [
      day ? dayRegex.test(day) : true,
      'Must be a valid day. Cannot be greater than 31.',
    ],
    [
      month ? monthRegex.test(month) : true,
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      year ? yearRegex.test(year) : true,
      'Must be a valid year between 2023 and 2026.',
    ],
    [
      isEnteredYearMonthInPast && !isEnteredDayInPast ? false : true,
      `Month of ${month} must be in the future.`,
    ],
    [
      isEnteredDayInPast && !isEnteredYearMonthInPast ? false : true,
      `Day of ${day} must be in the future.`,
    ],
    [
      isEnteredYearMonthDayInPast ? false : true,
      `Date of ${content} must be in the future.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

function returnDateNearPastValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  // /^(?:202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[0-3])$/;

  const day = content.split('-')[2];
  const month = content.split('-')[1];
  const year = content.split('-')[0];

  const isDayInFuture = day ? parseInt(day) > new Date().getDate() : false;
  const isMonthInFuture = month
    ? parseInt(month) > new Date().getMonth() + 1
    : false;
  const isYearInFuture = year
    ? parseInt(year) > new Date().getFullYear()
    : false;

  const isEnteredYearMonthDayInFuture = isYearInFuture
    ? isMonthInFuture
      ? isDayInFuture
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInFuture = isYearInFuture
    ? isMonthInFuture
      ? true
      : false
    : false;
  const isEnteredDayInFuture = day
    ? parseInt(day) > new Date().getDate()
    : false;

  const dateValidationTupleArr: [boolean, string][] = [
    [
      day ? dayRegex.test(day) : true,
      'Must be a valid day. Cannot be greater than 31.',
    ],
    [
      month ? monthRegex.test(month) : true,
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      year ? yearRegex.test(year) : true,
      'Must be a valid year between 2020 and 2023.',
    ],
    [
      isEnteredYearMonthInFuture && !isEnteredDayInFuture ? false : true,
      `Month of ${month} must be in the past.`,
    ],
    [
      isEnteredDayInFuture && !isEnteredYearMonthInFuture ? false : true,
      `Day of ${day} must be in the past.`,
    ],
    [
      isEnteredYearMonthDayInFuture ? false : true,
      `Date of ${content} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

function returnDateFullRangeValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-6])$/;

  const day = content.split('-')[2];
  const month = content.split('-')[1];
  const year = content.split('-')[0];

  const isDayInFuture = day ? parseInt(day) > new Date().getDate() : false;
  const isMonthInFuture = month
    ? parseInt(month) > new Date().getMonth() + 1
    : false;
  const isYearInFuture = year
    ? parseInt(year) > new Date().getFullYear()
    : false;

  const isEnteredYearMonthDayInFuture = isYearInFuture
    ? isMonthInFuture
      ? isDayInFuture
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInFuture = isYearInFuture
    ? isMonthInFuture
      ? true
      : false
    : false;
  const isEnteredDayInFuture = day
    ? parseInt(day) > new Date().getDate()
    : false;

  const dateValidationTupleArr: [boolean, string][] = [
    [
      day ? dayRegex.test(day) : true,
      'Must be a valid day. Cannot be greater than 31.',
    ],
    [
      month ? monthRegex.test(month) : true,
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      year ? yearRegex.test(year) : true,
      'Must be a valid year between 1900 and 2026.',
    ],
    [
      isEnteredYearMonthInFuture && !isEnteredDayInFuture ? false : true,
      `Month of ${month} must be in the past.`,
    ],
    [
      isEnteredDayInFuture && !isEnteredYearMonthInFuture ? false : true,
      `Day of ${day} must be in the past.`,
    ],
    [
      isEnteredYearMonthDayInFuture ? false : true,
      `Date of ${content} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

function returnDateOfBirthValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/;

  const day = content.split('-')[2];
  const month = content.split('-')[1];
  const year = content.split('-')[0];

  const isDayInFuture = day ? parseInt(day) > new Date().getDate() : false;
  const isMonthInFuture = month
    ? parseInt(month) > new Date().getMonth() + 1
    : false;
  const isYearInFuture = year
    ? parseInt(year) > new Date().getFullYear()
    : false;

  const isEnteredYearMonthDayInFuture = isYearInFuture
    ? isMonthInFuture
      ? isDayInFuture
        ? true
        : false
      : false
    : false;
  const isEnteredYearMonthInFuture = isYearInFuture
    ? isMonthInFuture
      ? true
      : false
    : false;
  const isEnteredDayInFuture = day
    ? parseInt(day) > new Date().getDate()
    : false;

  const dateValidationTupleArr: [boolean, string][] = [
    [
      day ? dayRegex.test(day) : true,
      'Must be a valid day. Cannot be greater than 31.',
    ],
    [
      month ? monthRegex.test(month) : true,
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      year ? yearRegex.test(year) : true,
      'Must be a valid year between 1900 and 2023.',
    ],
    [
      isEnteredYearMonthInFuture && !isEnteredDayInFuture ? false : true,
      `Month of ${month} must be in the past.`,
    ],
    [
      isEnteredDayInFuture && !isEnteredYearMonthInFuture ? false : true,
      `Day of ${day} must be in the past.`,
    ],
    [
      isEnteredYearMonthDayInFuture ? false : true,
      `Date of ${content} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind} of birth. ${validationText}`
    : '';
}

/**
 * Performs money validation on a number and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 * kind - semantic html input name
 */
function returnFloatAmountValidationText({
  content,
  contentKind,
  minLength = 4,
  maxLength = 9,
}: RegexValidationProps): string {
  // /^(?=.*[0-9])\d{1,6}(?:[,.]\d{0,2})?$/
  const numberPresentRegex = /^(?=.*[0-9])/;
  // const numberLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  // only numbers and either comma or decimal regex
  const onlyNumbersAndCommaOrDecimalRegex = /^[0-9,.]+$/;

  const beforeSeparatorAmount = content.includes('.')
    ? content.split('.')[0]
    : content.split(',')[0];
  const afterSeparatorAmount = content.includes('.')
    ? content.split('.')[1]
    : content.split(',')[1];

  const amountRegexTupleArr: [boolean, string][] = [
    [numberPresentRegex.test(content), 'Must contain at least one number.'],
    [
      onlyNumbersAndCommaOrDecimalRegex.test(content),
      'Must only contain numbers, commas, or decimals.',
    ],
    [
      beforeSeparatorAmount?.length < 7 ?? false,
      'Must be between 1 and 6 digits before the separator.',
    ],
    [
      afterSeparatorAmount?.length < 3 ?? false,
      'Must be between 0 and 2 digits after the separator.',
    ],
  ];

  const validationText = amountRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnUrlValidationText({
  content,
  contentKind,
}: RegexValidationProps): string {
  // /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  const protocolRegex = /^(https?:\/\/)/;
  const optionalSubdomainRegex = /^(www\.)?/;
  const domainRegex = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/;
  const topLevelDomainRegex = /\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

  const urlRegexTupleArr: [boolean, string][] = [
    [protocolRegex.test(content), "Must begin with 'http://' or 'https://'."],
    [
      optionalSubdomainRegex.test(content),
      'Must begin with www. or no subdomain.',
    ],
    [domainRegex.test(content), 'Must contain a valid domain name.'],
    [
      topLevelDomainRegex.test(content),
      'Must contain a valid top-level domain.',
    ],
  ];

  const validationText = urlRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

type FormatDateProps = {
  date: string;
  locale: string;
  formatOptions: Intl.DateTimeFormatOptions;
};
function formatDate({ date, locale, formatOptions }: FormatDateProps): string {
  return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(date));
}

function returnNameValidationText({
  content,
  contentKind,
  maxLength = 100,
  minLength = 2,
}: RegexValidationProps): string {
  const nameLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const nameCharacterRegex = /^[a-zA-Z\s.\-']+$/;

  const nameRegexTupleArr: [boolean, string][] = [
    [
      nameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      nameCharacterRegex.test(content),
      'Must only contain letters, spaces, periods, hyphens, and apostrophes.',
    ],
  ];

  const validationText = nameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnPrinterMakeModelValidationText({
  content,
  contentKind,
  maxLength = 50,
  minLength = 1,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s.,'()-]{1,50}$/i
  const printerMakeModelLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const printerMakeModelCharacterRegex = /^[a-zA-Z0-9\s.,'()-]+$/;

  const printerMakeModelRegexTupleArr: [boolean, string][] = [
    [
      printerMakeModelLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      printerMakeModelCharacterRegex.test(content),
      'Must only contain letters, numbers, spaces, periods, commas, apostrophes, hyphens, and parentheses.',
    ],
  ];

  const validationText = printerMakeModelRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnPrinterSerialNumberValidationText({
  content,
  contentKind,
  maxLength = 50,
  minLength = 1,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9]{1,50}$/i
  const printerSerialNumberLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const printerSerialNumberCharacterRegex = /^[a-zA-Z0-9]+$/;

  const printerSerialNumberRegexTupleArr: [boolean, string][] = [
    [
      printerSerialNumberLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      printerSerialNumberCharacterRegex.test(content),
      'Must only contain letters and numbers.',
    ],
  ];

  const validationText = printerSerialNumberRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnTimeRailwayValidationText({
  content,
  contentKind,
  maxLength = 5,
  minLength = 4,
}: RegexValidationProps): string {
  // /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  const timeRailwayLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const timeRailwayCharacterRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  const timeRailwayRegexTupleArr: [boolean, string][] = [
    [
      timeRailwayLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      timeRailwayCharacterRegex.test(content),
      'Must be a valid time in 24-hour format.',
    ],
  ];

  const validationText = timeRailwayRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnIntegerValidationText({
  content,
  contentKind,
  maxLength = 6,
  minLength = 1,
}: RegexValidationProps): string {
  // /^\d{1,6}$/
  const integerLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const integerCharacterRegex = /^\d+$/;

  const integerRegexTupleArr: [boolean, string][] = [
    [
      integerLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [integerCharacterRegex.test(content), 'Must only contain numbers.'],
  ];

  const validationText = integerRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnFilenameValidationText({
  content,
  contentKind,
  maxLength = 50,
  minLength = 1,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s.,'()-]{1,50}$/i
  const filenameLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const filenameCharacterRegex = /^[a-zA-Z0-9\s.,'()-]+$/;

  const filenameRegexTupleArr: [boolean, string][] = [
    [
      filenameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      filenameCharacterRegex.test(content),
      'Must only contain letters, numbers, spaces, periods, commas, apostrophes, hyphens, and parentheses.',
    ],
  ];

  const validationText = filenameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnBrandNameValidationText({
  content,
  contentKind,
  maxLength = 30,
  minLength = 2,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s-]{2,30}$/
  const brandNameLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const brandNameCharacterRegex = /^[a-zA-Z0-9\s-]+$/;

  const brandNameRegexTupleArr: [boolean, string][] = [
    [
      brandNameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      brandNameCharacterRegex.test(content),
      'Must only contain letters, numbers, spaces, and hyphens.',
    ],
  ];

  const validationText = brandNameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnProductWeightValidationText({
  content,
  contentKind,
  maxLength = 9,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1,6}(\.[0-9]{1,2})?$/
  const productWeightLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const productWeightZeroValue = Number(content) === 0;
  const productWeightCharacterRegex = /^[0-9.]+$/;
  const productDimensionsSextupleDigitBeforeDecimal = content.includes('.')
    ? content.split('.')[0].length === 3
    : Number(content) < 1_000_000;
  // test for 23. or 0.
  const productDimensionsSextupleDecimal = content.includes('.')
    ? content.at(-1) === '.'
    : false;

  const productWeightRegexTupleArr: [boolean, string][] = [
    [
      productWeightLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [!productWeightZeroValue, 'Must not be empty or have zero value.'],
    [
      productWeightCharacterRegex.test(content),
      'Must only contain numbers and periods.',
    ],
    [
      productDimensionsSextupleDigitBeforeDecimal,
      'Must only have 6 digits before decimal.',
    ],
    [!productDimensionsSextupleDecimal, 'Must not end with a decimal.'],
  ];

  const validationText = productWeightRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnProductDimensionsValidationText({
  content,
  contentKind,
  maxLength = 6,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1,3}(\.[0-9]{1,2})?$/
  const productDimensionsLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const productDimensionsZeroValue = Number(content) === 0;
  const productDimensionsCharacterRegex = /^[0-9.]+$/;
  const productDimensionsSingleDigitBeforeDecimal = content.includes('.')
    ? content.split('.')[0].length === 3
    : Number(content) < 1000;
  // test for 23. or 0.
  const productDimensionsSingleDecimalRegex = content.includes('.')
    ? content.at(-1) === '.'
    : false;

  const productDimensionsRegexTupleArr: [boolean, string][] = [
    [
      productDimensionsLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [!productDimensionsZeroValue, 'Must not be empty or have zero value.'],
    [
      productDimensionsCharacterRegex.test(content),
      'Must only contain numbers and periods.',
    ],
    [
      productDimensionsSingleDigitBeforeDecimal,
      'Must only have 3 digits before decimal.',
    ],
    [!productDimensionsSingleDecimalRegex, 'Must not end with a decimal.'],
  ];

  const validationText = productDimensionsRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnLargeIntegerValidationText({
  content,
  contentKind,
  maxLength = 6,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1,6}$/
  const largeIntegerLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const largeIntegerCharacterRegex = /^[0-9]+$/;
  const largeIntegerZeroValue = Number(content) === 0;

  const largeIntegerRegexTupleArr: [boolean, string][] = [
    [
      largeIntegerLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      largeIntegerCharacterRegex.test(content),
      'Must only contain whole numbers.',
    ],
    [!largeIntegerZeroValue, 'Must not be empty or have zero value.'],
  ];

  const validationText = largeIntegerRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnSmallIntegerValidationText({
  content,
  contentKind,
  maxLength = 2,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1,2}$/
  const smallIntegerLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const smallIntegerCharacterRegex = /^[0-9]+$/;
  const smallIntegerZeroValue = Number(content) === 0;

  const smallIntegerRegexTupleArr: [boolean, string][] = [
    [
      smallIntegerLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      smallIntegerCharacterRegex.test(content),
      'Must only contain whole numbers.',
    ],
    [!smallIntegerZeroValue, 'Must not be empty or have zero value.'],
  ];

  const validationText = smallIntegerRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnMediumIntegerValidationText({
  content,
  contentKind,
  maxLength = 4,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1,4}$/
  const mediumIntegerLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const mediumIntegerCharacterRegex = /^[0-9]+$/;
  const mediumIntegerZeroValue = Number(content) === 0;

  const mediumIntegerRegexTupleArr: [boolean, string][] = [
    [
      mediumIntegerLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      mediumIntegerCharacterRegex.test(content),
      'Must only contain whole numbers.',
    ],
    [!mediumIntegerZeroValue, 'Must not be empty or have zero value.'],
  ];

  const validationText = mediumIntegerRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnCpuFrequencyValidationText({
  content,
  contentKind,
  maxLength = 4,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-9]{1}(\.[0-9]{1,2})?$/

  const cpuFrequencyLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const cpuFrequencyCharacterRegex = /^[0-9.]+$/;
  const cpuFrequencyZeroValue = Number(content) === 0;
  const cpuFrequencySingleDigitBeforeDecimal = content.includes('.')
    ? content.split('.')[0].length === 1
    : Number(content) < 10;
  // test for 23. or 0.
  const cpuFrequencySingleDecimal = content.includes('.')
    ? content.at(-1) === '.'
    : false;

  const cpuFrequencyRegexTupleArr: [boolean, string][] = [
    [
      cpuFrequencyLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      cpuFrequencyCharacterRegex.test(content),
      'Must only contain numbers and periods.',
    ],
    [!cpuFrequencyZeroValue, 'Must not be empty or have zero value.'],
    [
      cpuFrequencySingleDigitBeforeDecimal,
      'Must only have a single digit before the decimal.',
    ],
    [!cpuFrequencySingleDecimal, 'Must not end with a decimal.'],
  ];

  const validationText = cpuFrequencyRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnRamVoltageValidationText({
  content,
  contentKind,
  maxLength = 4,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^$|^0*$)[0-1]{1}(\.[0-9]{1,2})?$/
  const ramVoltageLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const ramVoltageCharacterRegex = /^[0-9.]+$/;
  const ramVoltageZeroValue = Number(content) === 0;
  const ramVoltageSingleDigitBeforeDecimal = content.includes('.')
    ? content.split('.')[0].length === 1
    : Number(content) < 2;
  // test for 23. or 0.
  const ramVoltageSingleDecimal = content.includes('.')
    ? content.at(-1) === '.'
    : false;

  const ramVoltageRegexTupleArr: [boolean, string][] = [
    [
      ramVoltageLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      ramVoltageCharacterRegex.test(content),
      'Must only contain numbers and periods.',
    ],
    [!ramVoltageZeroValue, 'Must not be empty or have zero value.'],
    [
      ramVoltageSingleDigitBeforeDecimal,
      'Must only have a single digit (< 2) before the decimal.',
    ],
    [!ramVoltageSingleDecimal, 'Must not end with a decimal.'],
  ];

  const validationText = ramVoltageRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnSocketChipsetValidationText({
  content,
  contentKind,
  maxLength = 30,
  minLength = 2,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s.,'()-]{2,30}$/
  const socketChipsetNameLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const socketChipsetNameCharacterRegex = /^[a-zA-Z0-9\s.,'()-]+$/;

  const socketChipsetNameRegexTupleArr: [boolean, string][] = [
    [
      socketChipsetNameLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      socketChipsetNameCharacterRegex.test(content),
      'Must only contain letters, numbers, spaces, periods, commas, apostrophes, hyphens, and parentheses.',
    ],
  ];

  const validationText = socketChipsetNameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnColorVariantValidationText({
  content,
  contentKind,
  maxLength = 30,
  minLength = 2,
}: RegexValidationProps): string {
  // /^[a-zA-Z0-9\s-]{2,30}$/

  const colorVariantLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const colorVariantCharacterRegex = /^[a-zA-Z0-9\s-]+$/;

  const colorVariantRegexTupleArr: [boolean, string][] = [
    [
      colorVariantLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      colorVariantCharacterRegex.test(content),
      'Must only contain letters, numbers, spaces, and hyphens.',
    ],
  ];

  const validationText = colorVariantRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnRamTimingValidationText({
  content,
  contentKind,
  maxLength = 14,
  minLength = 7,
}: RegexValidationProps): string {
  // /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}$/
  const ramTimingLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const ramTimingCharacterRegex =
    /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}$/;

  const ramTimingRegexTupleArr: [boolean, string][] = [
    [
      ramTimingLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      ramTimingCharacterRegex.test(content),
      'Must be a valid RAM timing in the format 00-00-00-00.',
    ],
  ];

  const validationText = ramTimingRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function returnDisplayAspectRatioValidationText({
  content,
  contentKind,
  maxLength = 5,
  minLength = 5,
}: RegexValidationProps): string {
  // /^[0-9]{1,2}:[0-9]{1,2}$/
  const monitorAspectRatioLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const monitorAspectRatioCharacterRegex = /^[0-9]{1,2}:[0-9]{1,2}$/;

  const monitorAspectRatioRegexTupleArr: [boolean, string][] = [
    [
      monitorAspectRatioLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      monitorAspectRatioCharacterRegex.test(content),
      'Must be a valid monitor aspect ratio in the format 00:00.',
    ],
  ];

  const validationText = monitorAspectRatioRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function returnFrequencyResponseValidationText({
  content,
  contentKind,
  maxLength = 14,
  minLength = 8,
}: RegexValidationProps): string {
  // /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/
  const speakerFrequencyResponseLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const speakerFrequencyResponseCharacterRegex =
    /^[0-9]{1,2}[\s]{0,1}Hz[\s]{0,1}-[\s]{0,1}[0-9]{1,2}[\s]{0,1}kHz$/;

  const speakerFrequencyResponseRegexTupleArr: [boolean, string][] = [
    [
      speakerFrequencyResponseLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      speakerFrequencyResponseCharacterRegex.test(content),
      'Must be a valid speaker frequency response in the format 00Hz-00kHz with optional single spaces.',
    ],
  ];

  const validationText = speakerFrequencyResponseRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function returnMobileCameraResolutionValidationText({
  content,
  contentKind,
  maxLength = 72,
  minLength = 4,
}: RegexValidationProps): string {
  // /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){1,12}$/
  const mobileCameraResolutionLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const mobileCameraResolutionCharacterRegex =
    /^([0-9]{1,3} MP)(?:, ([0-9]{1,3} MP)){1,12}$/;

  const mobileCameraResolutionRegexTupleArr: [boolean, string][] = [
    [
      mobileCameraResolutionLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      mobileCameraResolutionCharacterRegex.test(content),
      'Must be a valid mobile camera resolution in the format 0 MP, 00 MP, 000 MP',
    ],
  ];

  const validationText = mobileCameraResolutionRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function returnObjectKeyValidationText({
  content,
  contentKind,
  maxLength = 75,
  minLength = 1,
}: RegexValidationProps): string {
  // /^[^"'\s\\]{1,75}$/;
  const objectKeyLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const objectKeyCharacterRegex = /^[^"'\s\\]+$/;

  const objectKeyRegexTupleArr: [boolean, string][] = [
    [
      objectKeyLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      objectKeyCharacterRegex.test(content),
      'Must not contain spaces, quotes, or backslashes.',
    ],
  ];

  const validationText = objectKeyRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function returnUserDefinedFieldValueValidationText({
  content,
  contentKind,
  maxLength = 75,
  minLength = 1,
}: RegexValidationProps): string {
  // /^(?!^\s*$)[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\w\s]{2,2000}$/i
  const userDefinedValueLengthRegex = new RegExp(
    `^(?=.{${minLength},${maxLength}}$)`
  );
  const userDefinedValueCharacterRegex =
    /^(?!^\s*$)[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\w\s]{2,2000}$/;

  const userDefinedValueRegexTupleArr: [boolean, string][] = [
    [
      userDefinedValueLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      userDefinedValueCharacterRegex.test(content),
      'Must not contain only whitespace.',
    ],
  ];

  const validationText = userDefinedValueRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${contentKind.charAt(0).toUpperCase()}${contentKind.slice(
        1
      )}: ${validationText}`
    : '';
}

function logState({
  state,
  groupLabel = 'state',
  isStringify = false,
}: {
  state: Record<string, any>;
  groupLabel?: string;
  isStringify?: boolean;
}) {
  console.group(groupLabel);
  Object.entries(state).forEach(([key, value]) => {
    let identifyKey = `${key}: `;
    if (value instanceof Map) {
      identifyKey = `🗺️ Map : ${key}: `;
      value = Array.from(value.entries());
    } else if (value instanceof Set) {
      identifyKey = `⚝ Set : ${key}: `;
      value = Array.from(value);
    }

    isStringify
      ? console.log(identifyKey, JSON.stringify(value, null, 2))
      : console.log(identifyKey, value);
  });
  console.groupEnd();
}

type FilterFieldsFromObjectInput<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >
> = {
  object: Obj;
  fieldsToFilter: Array<keyof Obj>;
};
/**
 * Pure function: Filters specified fields from an object and returns a new object with the remaining fields.
 *
 * @template Obj - The type of the input object.
 * @param {FilterFieldsFromObjectInput<Obj>} input - The input containing the object and fields to filter.
 * @returns {Partial<Obj>} A new object with the specified fields filtered out.
 */
function filterFieldsFromObject<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >
>({ object, fieldsToFilter }: FilterFieldsFromObjectInput<Obj>): Partial<Obj> {
  return Object.entries(object).reduce((obj, [key, value]) => {
    if (fieldsToFilter.includes(key)) {
      return obj;
    }
    obj[key] = value;

    return obj;
  }, Object.create(null));
}

type AddFieldsToObjectInput<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >
> = {
  object: Obj;
  fieldValuesTuples: [keyof Obj, Obj[keyof Obj]][]; // [key, value][]
  options?: PropertyDescriptor;
};
/**
 * Pure function: Adds fields to an object using the specified key-value pairs and options.
 *
 * @template Obj - The type of the input object.
 * @param {AddFieldsToObjectInput<Obj>} input - The input containing the object, field-value tuples, and options.
 * @returns {Obj} A new object with the added fields.
 */
function addFieldsToObject<
  Obj extends Record<string | number | symbol, any> = Record<
    string | symbol | number,
    any
  >
>({
  object,
  fieldValuesTuples,
  options = {
    writable: true,
    enumerable: true,
    configurable: true,
  },
}: AddFieldsToObjectInput<Obj>): Obj {
  return fieldValuesTuples.reduce((obj, [key, value]) => {
    Object.defineProperty(obj, key, {
      value,
      ...options,
    });

    return obj;
  }, structuredClone(object));
}

type UrlBuilderInput = {
  protocol?: string;
  host?: string;
  port?: string;
  path?: string;
  query?: string;
  hash?: string;
};
function urlBuilder({
  hash = '',
  host = 'localhost',
  path = '',
  port = '5500',
  protocol = 'http',
  query = '',
}: UrlBuilderInput): URL {
  return new URL(`${protocol}://${host}:${port}/api/v1/${path}${query}${hash}`);
}

type GroupQueryResponseInput<Doc> = {
  queryResponseData: QueryResponseData<Doc>[];
  groupBySelection: string;
  currentSelectionData: string[];
};
type GroupQueryResponseOutput<Doc> = {
  groupedBy: Map<string | number, QueryResponseData<Doc>[]>;
  // rest: Record<string, number>[];
};
/**
 * Groups query response data by a specified field and groups omitted fields as "rest".
 *
 * This function takes query response data, a field for grouping, and the current selection data.
 * It organizes the query response data into groups based on the provided grouping field
 *
 * @template Doc - The type of the documents in the query response data.
 *
 * @param {GroupQueryResponseInput<Doc>} params - Parameters for grouping query response data.
 * @param {Array<QueryResponseData<Doc>>} params.queryResponseData - The data to be grouped.
 * @param {string} params.groupBySelection - The field used for grouping.
 * @param {string[]} params.currentSelectionData - The current selection data.
 *
 * @returns {GroupQueryResponseOutput<Doc>} An object containing grouped data and "rest" data.
 */
function groupQueryResponse<Doc>({
  queryResponseData,
  groupBySelection,
  currentSelectionData,
}: GroupQueryResponseInput<Doc>): GroupQueryResponseOutput<Doc> {
  if (groupBySelection === 'none') {
    const groupedBy = queryResponseData.reduce(
      (
        acc: Map<string | number, QueryResponseData<Doc>[]>,
        queryResponseObj: QueryResponseData<Doc>
      ) => {
        // acc.set('results', [...(acc.get('results') ?? []), queryResponseObj]);
        const prevResults = acc.get('results') ?? [];
        acc.set('results', [...prevResults, queryResponseObj]);

        return acc;
      },
      new Map()
    );

    return {
      groupedBy,
    };
  }

  const groupedBy = queryResponseData.reduce(
    (
      acc: Map<string | number, Array<QueryResponseData<Doc>>>,
      queryResponseObj: QueryResponseData<Doc>
    ) => {
      // find the value of the groupBySelection field
      const groupBySelectionValue =
        Object.entries(queryResponseObj).find(
          ([key, _]) => key === groupBySelection
        )?.[1] ?? '';

      // if the groupBySelection field exists in the queryResponseObj
      if (Object.hasOwn(queryResponseObj, groupBySelection)) {
        // if groupedBy map does not have the groupBySelectionValue as a key
        if (!acc.has(groupBySelectionValue)) {
          // if groupBySelectionValue is a string[] (checkbox data)
          if (Array.isArray(groupBySelectionValue)) {
            groupBySelectionValue.forEach((value) => {
              // create it with an array as value and push the object to the array

              acc.set(value, [queryResponseObj]);
            });
          } else {
            // create it with an array as value and push the object to the array
            acc.set(groupBySelectionValue, [queryResponseObj]);
          }
        } else {
          // if it has key already, push the object to the array
          acc.get(groupBySelectionValue)?.push(queryResponseObj);
        }
      }

      return acc;
    },
    new Map()
  );

  const sortedGroupedBy = new Map(
    [...groupedBy.entries()].sort((a, b) => {
      const aKey = a[0];
      const bKey = b[0];

      return typeof aKey === 'string' && typeof bKey === 'string'
        ? aKey.localeCompare(bKey)
        : typeof aKey === 'number' && typeof bKey === 'number'
        ? aKey - bKey
        : 0;
    })
  );

  return {
    groupedBy: sortedGroupedBy,
  };
}

/**
 * Splits a camelCase or PascalCase string into words and capitalizes the first letter.
 *
 * This function takes a camelCase or PascalCase string as input and splits it into words
 * by inserting spaces between lowercase and uppercase letters. The first letter of the
 * resulting string is then capitalized.
 *
 * @param {string} word - The camelCase or PascalCase string to be processed.
 * @returns {string} A new string with words separated and the first letter capitalized.
 */
function splitCamelCase(word: string): string {
  // Replace lowercase-uppercase pairs with a space in between
  const splitStr = word.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Capitalize the first letter of the resulting string
  return splitStr.charAt(0).toUpperCase() + splitStr.slice(1);
}

/**
 * Replaces the last comma in a string with ' and ' if needed.
 *
 * This function takes a string as input and replaces the last comma in the string with ' and '
 * if the string contains at least one comma. It then returns the modified string.
 *
 * @param {string} str - The input string to process.
 * @returns {string} A new string with the last comma replaced by ' and ' if applicable.
 */
function replaceLastCommaWithAnd(str: string): string {
  // returns an array of matches of all occurrences of a comma
  const commaCount = str.match(/,/g)?.length ?? 0;
  // /(?=[^,]*$)/: matches a comma that is followed by zero or more non-comma characters until the end of the string, using a positive lookahead assertion (?=...).
  const strWithAnd = str.replace(/,(?=[^,]*$)/, commaCount > 0 ? ' and' : '');

  return strWithAnd;
}

function replaceLastCommaWithOr(str: string): string {
  // returns an array of matches of all occurrences of a comma
  const commaCount = str.match(/,/g)?.length ?? 0;
  // /(?=[^,]*$)/: matches a comma that is followed by zero or more non-comma characters until the end of the string, using a positive lookahead assertion (?=...).
  const strWithOr = str.replace(/,(?=[^,]*$)/, commaCount > 0 ? ' or' : '');

  return strWithOr;
}

function flattenObjectIterative<
  Obj extends Record<string, any> = Record<string, any>
>(obj: Obj): Obj {
  const queue = [obj] as Record<string, any>[];
  const flatObj = Object.create(null);

  while (queue.length > 0) {
    const shifted = queue.shift();
    if (!shifted) {
      break;
    }

    Object.entries(shifted).forEach(([key, value]) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        queue.push(value);
      } else {
        flatObj[key] = value;
      }
    });
  }

  return flatObj;
}

type GroupByFieldInput<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >
> = {
  objectArray: Obj[];
  field?: keyof Obj;
  callbackFn?: (obj: Obj) => string | number;
};

function groupByField<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >
>({
  objectArray,
  field,
  callbackFn,
}: GroupByFieldInput<Obj>): Record<string | symbol | number, Obj[]> {
  if (!objectArray.length) {
    return Object.create(null);
  }
  if (!field && !callbackFn) {
    return Object.create(null);
  }

  return objectArray.reduce(
    (objAcc: Record<string | symbol | number, Obj[]>, obj) => {
      const objField = callbackFn ? callbackFn(obj) : field ? obj[field] : '';
      const propertyDescriptor: PropertyDescriptor = {
        writable: true,
        enumerable: true,
        configurable: true,
      };

      Object.hasOwn(objAcc, objField)
        ? Object.defineProperty(objAcc, objField, {
            value: [...objAcc[objField], obj],
            ...propertyDescriptor,
          })
        : Object.defineProperty(objAcc, objField, {
            value: [obj],
            ...propertyDescriptor,
          });

      return objAcc;
    },
    Object.create(null)
  );
}

/**
 * @desc Consolidates all the theme colors/strings creation logic used throughout into a single creator function (DRY).
 * @param {ThemeObject} themeObject - The theme object (from GlobalState)
 * @param {ColorsSwatches} colorsSwatches - The colors swatches object: implements the Open-Color color scheme. @see https://yeun.github.io/open-color/
 * @returns An object containing the theme colors.
 */
function returnThemeColors({
  themeObject,
  colorsSwatches,
}: {
  themeObject: ThemeObject;
  colorsSwatches: ColorsSwatches;
}) {
  const { colorScheme, primaryColor, primaryShade } = themeObject;
  const { dark, gray, red, green, cyan } = colorsSwatches;

  const lightSchemeGray = gray[8];
  const darkSchemeGray = gray[5];
  const textColor = colorScheme === 'light' ? lightSchemeGray : darkSchemeGray;
  const iconGray = textColor;
  const chartTextColor = colorScheme === 'light' ? gray[8] : dark[7];

  const colorShade =
    colorScheme === 'light' ? primaryShade.light : primaryShade.dark;
  const themeColorShades = Object.entries(colorsSwatches).find(
    ([color, _shades]) => color === primaryColor
  )?.[1];
  const themeColorShade = themeColorShades
    ? themeColorShades[colorShade]
    : gray[5];
  // all color shades
  const grayColorShade = gray[colorShade];
  const grayBorderShade = colorScheme === 'light' ? gray[2] : gray[8];
  const redColorShade = red[colorShade];
  const greenColorShade = green[colorShade];
  const cyanColorShade = cyan[colorShade];
  const sliderLabelColor = gray[3];
  const navLinkHoverShade = colorScheme === 'light' ? gray[2] : gray[8];
  const navLinkActiveShade = themeColorShades
    ? colorScheme === 'light'
      ? themeColorShades[1]
      : ''
    : gray[5];

  const generalColors = {
    chartTextColor,
    cyanColorShade,
    darkSchemeGray,
    grayBorderShade,
    grayColorShade,
    greenColorShade,
    iconGray,
    lightSchemeGray,
    navLinkActiveShade,
    navLinkHoverShade,
    redColorShade,
    sliderLabelColor,
    textColor,
    themeColorShade,
    themeColorShades,
  };

  // app colors
  const borderColor =
    colorScheme === 'light' ? `1px solid ${gray[3]}` : `1px solid ${gray[8]}`;
  const backgroundColor =
    colorScheme === 'light'
      ? // ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
        '#f5f5f5'
      : dark[6];
  const redBorderColor = `1px solid ${redColorShade}`;
  const appThemeColors = {
    borderColor,
    backgroundColor,
    redBorderColor,
  };

  // for table display
  const tableHeadersBgColor = colorScheme === 'light' ? gray[4] : gray[8];
  const headersIconColor = colorScheme === 'light' ? gray[5] : gray[7];
  const headerBorderColor =
    colorScheme === 'light' ? `2px solid ${gray[2]}` : `2px solid ${gray[7]}`;
  const rowsBorderColor =
    colorScheme === 'light' ? `1px solid ${gray[2]}` : `1px solid ${gray[8]}`;
  const textHighlightColor = colorScheme === 'light' ? gray[3] : gray[6];
  const tablesThemeColors = {
    tableHeadersBgColor,
    headerBorderColor,
    headersIconColor,
    rowsBorderColor,
    textHighlightColor,
  };

  // directory graph colors
  const edgeStrokeColor = colorScheme === 'light' ? dark[5] : gray[8];
  const nodeBackgroundColor =
    colorScheme === 'light'
      ? // ? 'radial-gradient(circle, #f9f9f9 50%, #f5f5f5 100%)'
        '#f5f5f5'
      : dark[6];
  const nodeBorderColor =
    colorScheme === 'light' ? `1px solid ${dark[1]}` : `1px solid ${gray[8]}`;
  const nodeTextColor = colorScheme === 'light' ? gray[8] : gray[5];
  const directoryGraphThemeColors = {
    edgeStrokeColor,
    nodeBackgroundColor,
    nodeBorderColor,
    nodeTextColor,
  };

  // for ScrollArea styles
  const scrollBarStyle = {
    scrollbar: {
      '&, &:hover': {
        background: colorScheme === 'dark' ? dark[6] : gray[0],
      },

      '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
        backgroundColor: themeColorShade,
      },

      '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
        backgroundColor: themeColorShade,
      },
    },

    corner: {
      opacity: 1,
      background: colorScheme === 'dark' ? dark[6] : gray[0],
    },
  };

  return {
    appThemeColors,
    directoryGraphThemeColors,
    generalColors,
    scrollBarStyle,
    tablesThemeColors,
  };
}

/**
 * @description Pure function. Shuffles an array using the Fisher-Yates algorithm. @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray<T>(array: T[]): T[] {
  if (!array.length) {
    return array;
  }

  let currentIndex = array.length;
  let randomIndex = 0;
  const clonedArray = structuredClone(array);

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [clonedArray[currentIndex], clonedArray[randomIndex]] = [
      clonedArray[randomIndex],
      clonedArray[currentIndex],
    ];
  }

  return clonedArray;
}

type ToggleNavlinksActiveInput<
  Obj extends Record<string | symbol | number, any> = Record<
    string | symbol | number,
    any
  >
> = {
  navlinksState: Obj;
  toggledNavlink: keyof Obj;
  payload: Obj[keyof Obj];
};
/**
 * @description Toggles the currently clicked navlink to active and all other navlinks to inactive
 * @param param0  - Destructured object
 * @param navlinksState - The current state of the navlinks
 * @param toggledNavlink - The navlink that was clicked
 * @param payload - The payload to set the navlink to
 * @returns  - An object with all navlinks set to inactive except the toggled navlink
 */
function toggleNavlinksActive<
  Obj extends Record<string | symbol | number, any>
>({
  navlinksState,
  toggledNavlink,
  payload,
}: ToggleNavlinksActiveInput<Obj>): Obj {
  return Object.keys(navlinksState).reduce(
    (acc: Obj, navlink) => {
      if (navlink === toggledNavlink) {
        return { ...acc, [navlink]: payload };
      }
      return { ...acc, [navlink]: false };
    },

    Object.create(null)
  );
}

// function to display elapsed time from given date
function returnElapsedTime(date: string) {
  const now = new Date();
  const then = new Date(date);
  const elapsed = now.getTime() - then.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  } else if (hours === 24) {
    return '1 day ago';
  } else if (hours >= 1) {
    return `${hours} hours ago`;
  } else if (minutes >= 1) {
    return `${minutes} minutes ago`;
  } else if (seconds >= 1) {
    return `${seconds} seconds ago`;
  } else {
    return 'just now';
  }
}

function returnTimeRemaining(date: string) {
  const now = new Date();
  const then = new Date(date);
  const remaining = then.getTime() - now.getTime();
  const seconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} days left`;
  } else if (hours === 24) {
    return '1 day left';
  } else if (hours >= 1) {
    return `${hours} hours left`;
  } else if (minutes >= 1) {
    return `${minutes} minutes left`;
  } else if (seconds >= 1) {
    return `${seconds} seconds left`;
  } else {
    return 'just now';
  }
}

function returnIsAccessTokenExpired(accessToken: string): {
  isAccessTokenExpired: boolean;
} {
  const decodedToken: DecodedToken = jwtDecode(accessToken);
  const { exp: accessTokenExpiration } = decodedToken;
  // buffer of 10 seconds to refresh access token
  const isAccessTokenExpired =
    accessTokenExpiration * 1000 - 10000 < Date.now();

  return { isAccessTokenExpired };
}

/**
 * @description replaces hyphens & underscores with spaces and capitalizes the first letter of each word
 */
function splitWordIntoUpperCasedSentence(sentence: string): string {
  return sentence
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * @description creates marks for slider wrapper component
 */
function returnSliderMarks({
  max,
  min,
  precision = 0,
  steps = 2,
  symbol = '',
}: {
  max: number;
  min: number;
  steps?: number;
  precision?: number;
  symbol?: string;
}): { value: number; label: string }[] {
  const step = (max - min) / steps;

  return Array.from({ length: steps + 1 }, (_, i) => {
    const value = min + step * i;
    const valueFormatted = value.toFixed(precision);

    return {
      value: parseInt(valueFormatted),
      label: `${valueFormatted}${symbol}`,
    };
  });
}

type CaptureScreenshotInput = {
  chartRef: any;
  screenshotFilename: string;
  screenshotImageQuality: number;
  screenshotImageType: string;
};
/**
 * Captures a screenshot of a chart rendered in the browser and triggers a download.
 * @see https://medium.com/@pro.grb.studio/how-to-screencapture-in-reactjs-step-by-step-guide-b435e8b53e11
 * @param {CaptureScreenshotInput} options - Options for capturing the screenshot.
 * @param {any} options.chartRef - A reference to the chart element to capture.
 * @param {string} options.screenshotFilename - The desired filename for the screenshot.
 * @param {number} options.screenshotImageQuality - The quality of the screenshot image (0-1).
 * @param {string} options.screenshotImageType - The type of the image (image/webp, 'image/png', 'image/jpeg').
 * @returns {Promise<void>}
 */
async function captureScreenshot({
  chartRef,
  screenshotFilename,
  screenshotImageQuality,
  screenshotImageType,
}: CaptureScreenshotInput): Promise<void> {
  const canvasPromise = html2canvas(chartRef.current, {
    useCORS: true,
  });
  canvasPromise.then((canvas) => {
    const dataURL = canvas.toDataURL(
      screenshotImageType,
      screenshotImageQuality
    );
    // Create an image element from the data URL
    const img = new Image();
    img.src = dataURL;
    // Create a link element
    const a = document.createElement('a');
    // a.innerHTML = 'DOWNLOAD';
    // a.target = '_blank';
    // Set the href of the link to the data URL of the image
    a.href = img.src;

    const filename = screenshotFilename ? screenshotFilename : uuidv4();
    const extension = screenshotImageType.split('/')[1];

    // Set the download attribute of the link
    a.download = `${filename}.${extension}`;
    // Append the link to the page
    document.body.appendChild(a);
    // Click the link to trigger the download
    a.click();
    // Remove the link from the page
    document.body.removeChild(a);
  });
}

function addCommaSeparator(numStr: string | number): string {
  return numStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function returnToFixedFloat(num: number, precision = 4): number {
  return Number(num.toFixed(precision));
}

export {
  addCommaSeparator,
  addFieldsToObject,
  captureScreenshot,
  filterFieldsFromObject,
  flattenObjectIterative,
  formatDate,
  groupByField,
  groupQueryResponse,
  logState,
  replaceLastCommaWithAnd,
  replaceLastCommaWithOr,
  returnAcknowledgementValidationText,
  returnAddressValidationText,
  returnBrandNameValidationText,
  returnCityValidationText,
  returnColorVariantValidationText,
  returnCpuFrequencyValidationText,
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnDateNearPastValidationText,
  returnDateOfBirthValidationText,
  returnDateValidationText,
  returnDisplayAspectRatioValidationText,
  returnElapsedTime,
  returnEmailValidationText,
  returnFilenameValidationText,
  returnFloatAmountValidationText,
  returnFrequencyResponseValidationText,
  returnGrammarValidationText,
  returnImageValidationText,
  returnIntegerValidationText,
  returnIsAccessTokenExpired,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnMobileCameraResolutionValidationText,
  returnNameValidationText,
  returnNoteTextValidationText,
  returnObjectKeyValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnProductDimensionsValidationText,
  returnProductWeightValidationText,
  returnRamTimingValidationText,
  returnRamVoltageValidationText,
  returnSerialIdValidationText,
  returnSliderMarks,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnThemeColors,
  returnTimeRailwayValidationText,
  returnTimeRemaining,
  returnToFixedFloat,
  returnUrlValidationText,
  returnUserDefinedFieldValueValidationText,
  returnUsernameRegexValidationText,
  shuffleArray,
  splitCamelCase,
  splitWordIntoUpperCasedSentence,
  toggleNavlinksActive,
  urlBuilder,
};

export type { RegexValidationProps };
