import type { Country, PostalCode } from '../types';

function returnEmailRegexValidationText(email: string): string {
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

function returnNoteTitleValidationText(title: string): string {
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const alphanumericOrSpecialCharacterRegex =
    /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
  const titleLengthRegex = /^(?=.{1,100}$)/;

  const titleRegexTupleArr: [boolean, string][] = [
    [
      atleastOneAlphanumericRegex.test(title),
      'Must contain at least one alphanumeric character.',
    ],
    [
      alphanumericOrSpecialCharacterRegex.test(title),
      'Can only contain alphanumeric characters or special characters.',
    ],
    [titleLengthRegex.test(title), 'Must be between 1 and 100 characters.'],
  ];

  const validationText = titleRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid title. ${validationText}` : '';
}

function returnNoteContentValidationText(content: string): string {
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;
  const contentLengthRegex = /^(?=.{1,1000}$)/;

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
      'Must be between 1 and 1000 characters.',
    ],
  ];

  const validationText = contentRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid content. ${validationText}` : '';
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
  const contentLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);

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
    ? `Invalid ${contentKind[0].toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
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
    ? `Invalid ${contentKind[0].toUpperCase()}${contentKind.slice(
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
    ? `Invalid ${contentKind[0].toUpperCase()}${contentKind.slice(
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

/**
 * Performs money validation on a number and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 * kind - semantic html input name
 */
function returnMoneyValidationText({
  money,
  kind,
}: {
  money: string;
  kind: string;
}): string {
  // /^(?=.*[0-9])\d{0,6}(?:[,.]\d{0,2})?$/
  const numberPresentRegex = /^(?=.*[0-9])/;
  const beforeSeperatorRegex = /^\d{0,6}/;
  const afterSeperatorRegex = /(?:[,.]\d{0,2})?$/;
  const numberLengthRegex = new RegExp(
    `^${beforeSeperatorRegex.source}${afterSeperatorRegex.source}$`
  );

  const beforeSeparatorAmount = money.includes('.')
    ? money.split('.')[0]
    : money.split(',')[0];
  const afterSeparatorAmount = money.includes('.')
    ? money.split('.')[1]
    : money.split(',')[1];

  const moneyRegexTupleArr: [boolean, string][] = [
    [numberPresentRegex.test(money), 'Must contain at least one number.'],
    [
      beforeSeperatorRegex.test(beforeSeparatorAmount),
      'Must be between 1 and 6 digits before the separator.',
    ],
    [
      afterSeperatorRegex.test(afterSeparatorAmount),
      'Must be between 0 and 2 digits after the separator.',
    ],
    [
      numberLengthRegex.test(money),
      'Must be between 1 and 6 digits before the separator, and 0 to 2 digits after the separator.',
    ],
  ];

  const validationText = moneyRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText
    ? `Invalid ${kind[0].toUpperCase()}${kind.slice(1)}. ${validationText}`
    : '';
}

function returnUrlValidationText(url: string): string {
  // /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  const protocolRegex = /^(https?:\/\/)/;
  const optionalSubdomainRegex = /^(www\.)?/;
  const domainRegex = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/;
  const topLevelDomainRegex = /\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

  const urlRegexTupleArr: [boolean, string][] = [
    [protocolRegex.test(url), 'Must begin with http:// or https://'],
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
  date: Date;
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
    ? `Invalid ${contentKind[0].toUpperCase()}${contentKind.slice(
        1
      )}. ${validationText}`
    : '';
}

export {
  formatDate,
  returnAddressValidationText,
  returnCityValidationText,
  returnDateValidationText,
  returnEmailRegexValidationText,
  returnGrammarValidationText,
  returnMoneyValidationText,
  returnNameValidationText,
  returnNoteContentValidationText,
  returnNoteTitleValidationText,
  returnPhoneNumberValidationText,
  returnPostalCodeValidationText,
  returnUrlValidationText,
  returnUsernameRegexValidationText,
};

export type { RegexValidationProps };
