import { ComponentQueryData } from '../components/queryBuilder';
import type { Country, PostalCode, QueryResponseData } from '../types';

function returnEmailValidationText(email: string): string {
  const usernamePartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  const domainPartRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  const subdomainPartRegex =
    /^\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

  const emailRegexTupleArr: [boolean, string][] = [
    [usernamePartRegex.test(email), 'Must contain a valid username part.'],
    [domainPartRegex.test(email), 'Must contain a valid domain part.'],
    [
      subdomainPartRegex.test(email),
      'Must contain a valid (optional) subdomain part.',
    ],
  ];

  const validationText = emailRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid email. ${validationText}` : '';
}

function returnUsernameRegexValidationText(username: string): string {
  const usernameLengthRegex = /^(?=.{3,20}$)/;
  const usernameStartRegex = /^(?![-_.])/;
  const usernameConsecutiveRegex = /^(?!.*[-_.]{2})/;
  const usernameCharacterRegex = /^[a-zA-Z0-9-_.]+$/;
  const usernameEndRegex = /(?<![-_.])$/;

  const usernameRegexTupleArr: [boolean, string][] = [
    [
      usernameLengthRegex.test(username),
      'Must be between 3 and 20 characters.',
    ],
    [
      usernameStartRegex.test(username),
      'Cannot start with a hyphen, underscore, or period.',
    ],
    [
      usernameConsecutiveRegex.test(username),
      'Cannot contain two hyphens, underscores, or periods in a row.',
    ],
    [
      usernameCharacterRegex.test(username),
      'Can only contain alphanumeric characters, hyphens, underscores, or periods.',
    ],
    [
      usernameEndRegex.test(username),
      'Cannot end with a hyphen, underscore, or period.',
    ],
  ];

  const validationText = usernameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid username. ${validationText}` : '';
}

/**
 * contentKind is used to specify the semantic html input label, and is used in the returned validation error string for improved accessibility.
 */
type RegexValidationProps = {
  content: string;
  contentKind: string;
  minLength: number;
  maxLength: number;
};

/**
 * Performs basic serial id validation [A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 */
function returnSerialIdValidationText({
  content,
  contentKind,
  minLength,
  maxLength,
}: RegexValidationProps): string {
  const serialIdLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const alphanumericOrSpecialCharacterRegex =
    /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;

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
  minLength,
  maxLength,
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
  minLength,
  maxLength,
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
  const imageTypeValidationRegex = /^jpeg|png|gif$/;
  // const imageSizeValidationRegex = /^.{0,1000000}$/;

  const imageRegexTupleArr: [boolean, string][] = [
    [imageKindValidationRegex.test(imageKind), 'Must be an image kind.'],
    [
      imageTypeValidationRegex.test(imageType),
      'Must be a jpeg, png, or gif type.',
    ],
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
  minLength,
  maxLength,
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
  maxLength,
  minLength,
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

function returnPhoneNumberValidationText(phoneNumber: string): string {
  const phoneNumberRegex = /^\+\(1\)\(\d{3}\)[ ]\d{3}-\d{4}$/;
  const isValidRegex = phoneNumberRegex.test(phoneNumber);
  if (!isValidRegex) {
    return "Invalid phone number. Must be a valid North American phone number of format +(1)(234) 567-8901. Only numbers, parentheses, spaces, '+' and hyphens are allowed.";
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

function returnDateValidationText(date: string): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/;

  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

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

  return validationText ? `Invalid date. ${validationText}` : '';
}

function returnDateNearFutureValidationText(date: string): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[3-6])$/;

  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

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
      `Date of ${date} must be in the future.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid date. ${validationText}` : '';
}

function returnDateNearPastValidationText(date: string): string {
  // /^(?:202[0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:202[0-3])$/;

  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

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
      `Date of ${date} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid date. ${validationText}` : '';
}

function returnDateFullRangeValidationText(date: string): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-6])$/;

  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

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
      `Date of ${date} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid date. ${validationText}` : '';
}

function returnDateOfBirthValidationText(date: string): string {
  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^(?:19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/;

  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const year = date.split('-')[0];

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
      `Date of ${date} must be in the past.`,
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid date of birth. ${validationText}` : '';
}

/**
 * Performs money validation on a number and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 * kind - semantic html input name
 */
function returnNumberAmountValidationText({
  amount,
  kind,
}: {
  amount: string;
  kind: string;
}): string {
  // /^(?=.*[0-9])\d{0,6}(?:[,.]\d{0,2})?$/
  const numberPresentRegex = /^(?=.*[0-9])/;
  const beforeSeperatorRegex = /^\d{0,6}/;
  const afterSeperatorRegex = /(?:[,.]\d{0,2})?$/;
  const numberLengthRegex = new RegExp(
    `^${beforeSeperatorRegex.source}${afterSeperatorRegex.source}$`
  );

  const beforeSeparatorAmount = amount.includes('.')
    ? amount.split('.')[0]
    : amount.split(',')[0];
  const afterSeparatorAmount = amount.includes('.')
    ? amount.split('.')[1]
    : amount.split(',')[1];

  const amountRegexTupleArr: [boolean, string][] = [
    [numberPresentRegex.test(amount), 'Must contain at least one number.'],
    [
      beforeSeperatorRegex.test(beforeSeparatorAmount),
      'Must be between 1 and 6 digits before the separator.',
    ],
    [
      afterSeperatorRegex.test(afterSeparatorAmount),
      'Must be between 0 and 2 digits after the separator.',
    ],
    [
      numberLengthRegex.test(amount),
      'Must be between 1 and 6 digits before the separator, and 0 to 2 digits after the separator.',
    ],
  ];

  const validationText = amountRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${kind.charAt(0).toUpperCase()}${kind.slice(
        1
      )}. ${validationText}`
    : '';
}

function returnUrlValidationText(url: string): string {
  // /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  const protocolRegex = /^(https?:\/\/)/;
  const optionalSubdomainRegex = /^(www\.)?/;
  const domainRegex = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/;
  const topLevelDomainRegex = /\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

  const urlRegexTupleArr: [boolean, string][] = [
    [protocolRegex.test(url), "Must begin with 'http://' or 'https://'."],
    [optionalSubdomainRegex.test(url), 'Must begin with www. or no subdomain.'],
    [domainRegex.test(url), 'Must contain a valid domain name.'],
    [topLevelDomainRegex.test(url), 'Must contain a valid top-level domain.'],
  ];

  const validationText = urlRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid URL. ${validationText}` : '';
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
  maxLength,
  minLength,
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
  maxLength,
  minLength,
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
  maxLength,
  minLength,
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
  maxLength,
  minLength,
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

function filterFieldsFromObject({
  object,
  fieldsToFilter,
}: {
  object: Record<string, any>;
  fieldsToFilter: string[];
}): Record<string, any> {
  // const filteredObject = Object.fromEntries(
  //   Object.entries(structuredClone(object)).filter(
  //     ([key]) => !fieldsToFilter.includes(key)
  //   )
  // );

  // return filteredObject;

  return Object.entries(object).reduce((obj, [key, value]) => {
    if (!fieldsToFilter.includes(key)) {
      Object.defineProperty(obj, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    return obj;
  }, Object.create(null));
}

function addFieldsToObject({
  object,
  fieldValuesTuples,
  options = {
    writable: true,
    enumerable: true,
    configurable: true,
  },
}: {
  object: Record<string, any>;
  fieldValuesTuples: [string, any][];
  options?: {
    writable?: boolean;
    enumerable?: boolean;
    configurable?: boolean;
  };
}): Record<string, any> {
  return fieldValuesTuples.reduce((obj, [key, value]) => {
    Object.defineProperty(obj, key, {
      value,
      ...options,
    });

    return obj;
  }, structuredClone(object));

  // fieldValuesTuples.forEach(([key, value]) => {
  //   Object.defineProperty(object, key, {
  //     value,
  //     ...options,
  //   });
  // });
  // return object;
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
  port = '3500',
  protocol = 'http',
  query = '',
}: UrlBuilderInput): URL {
  return new URL(`${protocol}://${host}:${port}${path}${query}${hash}`);
}

type GroupQueryResponseInput<Doc> = {
  queryResponseData: QueryResponseData<Doc>[];
  groupBySelection: string;
  currentSelectionData: string[];
};
function groupQueryResponse<Doc>({
  queryResponseData,
  groupBySelection,
  currentSelectionData,
}: GroupQueryResponseInput<Doc>): {
  groupedBy: Map<string | number, QueryResponseData<Doc>[]>;
  rest: Record<string, number>[];
} {
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

      // if it does not exist, push the object to the array with key 'rest'
      else {
        if (!acc.has('results')) {
          acc.set('results', [queryResponseObj]);
        } else {
          acc.get('results')?.push(queryResponseObj);
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

  console.group('groupQueryResponse');
  console.log('groupBySelection', groupBySelection);
  console.log('currentSelectionData', currentSelectionData);
  console.log('queryResponseData', queryResponseData);
  console.log('groupedBy', groupedBy);
  console.log('sortedGroupedBy', sortedGroupedBy);
  console.groupEnd();

  // this allows user to see the rest of the values for groupedBy selection
  const groupedByKeysSet = new Set(Object.keys(Object.fromEntries(groupedBy)));
  const rest = currentSelectionData.reduce(
    (acc: Record<string, number>[], key) => {
      if (!groupedByKeysSet.has(key) && key.length > 0) {
        const newObj = Object.create(null);
        Object.defineProperty(newObj, key, {
          value: 0,
          enumerable: true,
          writable: true,
          configurable: true,
        });
        acc.push(newObj);
      }

      return acc;
    },
    []
  );

  return {
    groupedBy: sortedGroupedBy,
    rest,
  };
}

function splitCamelCase(word: string) {
  const splitStr = word.replace(/([a-z])([A-Z])/g, '$1 $2');
  return splitStr.charAt(0).toUpperCase() + splitStr.slice(1);
}

export {
  addFieldsToObject,
  filterFieldsFromObject,
  formatDate,
  groupQueryResponse,
  logState,
  returnAcknowledgementValidationText,
  returnAddressValidationText,
  returnCityValidationText,
  returnDateFullRangeValidationText,
  returnDateNearFutureValidationText,
  returnDateNearPastValidationText,
  returnDateOfBirthValidationText,
  returnDateValidationText,
  returnEmailValidationText,
  returnGrammarValidationText,
  returnImageValidationText,
  returnNameValidationText,
  returnNoteTextValidationText,
  returnNumberAmountValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
  returnPrinterMakeModelValidationText,
  returnPrinterSerialNumberValidationText,
  returnSerialIdValidationText,
  returnTimeRailwayValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
  splitCamelCase,
  urlBuilder,
};

export type { RegexValidationProps };
