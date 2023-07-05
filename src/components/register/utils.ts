import { Country, PostalCode } from '../../types';

function returnPasswordRegexValidationText(password: string): string {
  const passwordLengthRegex = /^(?=.{8,32}$)/;
  const passwordUppercaseRegex = /^(?=.*[A-Z])/;
  const passwordLowercaseRegex = /^(?=.*[a-z])/;
  const passwordNumberRegex = /^(?=.*[0-9])/;
  const passwordSpecialCharacterRegex = /^(?=.*[!@#$%^&*])/;
  const passwordSpaceRegex = /^(?!.*\s)/;

  const passwordRegexTupleArr: [boolean, string][] = [
    [
      passwordLengthRegex.test(password),
      'Must be between 8 and 32 characters.',
    ],
    [
      passwordUppercaseRegex.test(password),
      'Must contain at least one uppercase letter.',
    ],
    [
      passwordLowercaseRegex.test(password),
      'Must contain at least one lowercase letter.',
    ],
    [passwordNumberRegex.test(password), 'Must contain at least one number.'],
    [
      passwordSpecialCharacterRegex.test(password),
      'Must contain at least one special character.',
    ],
    [passwordSpaceRegex.test(password), 'Cannot contain spaces.'],
  ];

  const validationText = passwordRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid password. ${validationText}` : '';
}

type ReturnNameValidationTextProps = {
  name: string;
  kind: 'firstName' | 'middleName' | 'lastName' | 'preferredName';
};

function returnNameValidationText({
  name,
  kind,
}: ReturnNameValidationTextProps): string {
  const nameLengthRegex = /^(?=.{2,30}$)/;
  const nameCharacterRegex = /^[a-zA-Z\s.\-']+$/;

  const nameRegexTupleArr: [boolean, string][] = [
    [nameLengthRegex.test(name), 'Must be between 2 and 30 characters.'],
    [
      nameCharacterRegex.test(name),
      'Can only contain alphabetical characters, spaces, periods, hyphens, or apostrophes.',
    ],
  ];

  const validationText = nameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${kind}. ${validationText}` : '';
}

function returnFullNameValidationText(fullName: string): string {
  const fullNameLengthRegex = /^(?=.{2,100}$)/;
  const fullNameCharacterRegex = /^[A-Za-z\s.\-']+$/;

  const fullNameRegexTupleArr: [boolean, string][] = [
    [
      fullNameLengthRegex.test(fullName),
      'Must be between 2 and 100 characters.',
    ],
    [
      fullNameCharacterRegex.test(fullName),
      'Can only contain alphabetical characters, spaces, periods, hyphens, or apostrophes.',
    ],
  ];

  const validationText = fullNameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid full name. ${validationText}` : '';
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

function returnAddressLineValidationText(addressLine: string): string {
  const addressLineLengthRegex = /^(?=.{2,75}$)/;
  const addressLineCharacterRegex = /^[A-Za-z0-9\s.,#-]+$/;

  const addressLineRegexTupleArr: [boolean, string][] = [
    [
      addressLineLengthRegex.test(addressLine),
      'Must be between 2 and 75 characters.',
    ],
    [
      addressLineCharacterRegex.test(addressLine),
      'Can only contain alphanumeric characters, spaces, periods, commas, hyphens, or pound signs.',
    ],
  ];

  const validationText = addressLineRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid address line. ${validationText}` : '';
}

function returnCityValidationText(city: string): string {
  const cityLengthRegex = /^(?=.{2,75}$)/;
  const cityCharacterRegex = /^[A-Za-z\s.\-']+$/;

  const cityRegexTupleArr: [boolean, string][] = [
    [cityLengthRegex.test(city), 'Must be between 2 and 75 characters.'],
    [
      cityCharacterRegex.test(city),
      'Can only contain alphabetical characters, spaces, periods, or hyphens.',
    ],
  ];

  const validationText = cityRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid city. ${validationText}` : '';
}

function returnPhoneNumberInputValidationText(phoneNumber: string): string {
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
    [dayRegex.test(day), 'Must be a valid day. Cannot be greater than 31.'],
    [
      monthRegex.test(month),
      'Must be a valid month. Cannot be greater than 12.',
    ],
    [
      yearRegex.test(year),
      'Must be a valid year. Must be between 1900 and 2024.',
    ],
  ];

  const validationText = dateValidationTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid date. ${validationText}` : '';
}

export {
  returnPasswordRegexValidationText,
  returnNameValidationText,
  returnAddressLineValidationText,
  returnUrlValidationText,
  returnCityValidationText,
  returnPostalCodeValidationText,
  returnPhoneNumberInputValidationText,
  returnFullNameValidationText,
  returnDateValidationText,
};
