import { Country, PostalCode } from '../../types';

function returnPasswordRegexValidationText(password: string) {
  const passwordLengthRegex = /^(?=.{8,32}$)/;
  const passwordUppercaseRegex = /^(?=.*[A-Z])/;
  const passwordLowercaseRegex = /^(?=.*[a-z])/;
  const passwordNumberRegex = /^(?=.*[0-9])/;
  const passwordSpecialCharacterRegex = /^(?=.*[!@#$%^&*])/;
  const passwordSpaceRegex = /^(?!.*\s)/;

  const passwordRegexTuple: [number, boolean][] = [
    [0, passwordLengthRegex.test(password)],
    [1, passwordUppercaseRegex.test(password)],
    [2, passwordLowercaseRegex.test(password)],
    [3, passwordNumberRegex.test(password)],
    [4, passwordSpecialCharacterRegex.test(password)],
    [5, passwordSpaceRegex.test(password)],
  ];

  const passwordValidationTextMap = new Map<number, string>([
    [0, 'Must be between 8 and 32 characters.'],
    [1, 'Must contain at least one uppercase letter.'],
    [2, 'Must contain at least one lowercase letter.'],
    [3, 'Must contain at least one number.'],
    [4, 'Must contain at least one special character.'],
    [5, 'Cannot contain spaces.'],
  ]);

  const passwordRegexValidationText: string = passwordRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      passwordValidationTextMap.get(position)
    )
    .join(' ');

  return passwordRegexValidationText;
}

function returnNameValidationText(name: string) {
  const nameLengthRegex = /^(?=.{2,30}$)/;
  const nameCharacterRegex = /^[a-zA-Z]+$/;

  const nameRegexTuple: [number, boolean][] = [
    [0, nameLengthRegex.test(name)],
    [1, nameCharacterRegex.test(name)],
  ];

  const nameValidationTextMap = new Map<number, string>([
    [0, 'Must be between 2 and 30 characters.'],
    [1, 'Can only contain alphabetical characters.'],
  ]);

  const nameRegexValidationText: string = nameRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      nameValidationTextMap.get(position)
    )
    .join(' ');

  return nameRegexValidationText;
}

function returnAddressLineValidationText(addressLine: string) {
  const addressLineLengthRegex = /^(?=.{2,75}$)/;
  const addressLineCharacterRegex = /^[A-Za-z0-9\s.,#-]+$/;

  const addressLineRegexTuple: [number, boolean][] = [
    [0, addressLineLengthRegex.test(addressLine)],
    [1, addressLineCharacterRegex.test(addressLine)],
  ];

  const addressLineValidationTextMap = new Map<number, string>([
    [0, 'Must be between 2 and 75 characters.'],
    [
      1,
      'Can only contain alphanumeric characters, spaces, periods, commas, hyphens, or pound signs.',
    ],
  ]);

  const addressLineRegexValidationText: string = addressLineRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      addressLineValidationTextMap.get(position)
    )
    .join(' ');

  return addressLineRegexValidationText;
}

function returnCityValidationText(city: string) {
  const cityLengthRegex = /^(?=.{2,75}$)/;
  const cityCharacterRegex = /^[A-Za-z\s.\-']+$/;

  const cityRegexTuple: [number, boolean][] = [
    [0, cityLengthRegex.test(city)],
    [1, cityCharacterRegex.test(city)],
  ];

  const cityValidationTextMap = new Map<number, string>([
    [0, 'Must be between 2 and 75 characters.'],
    [
      1,
      'Can only contain alphabetical characters, spaces, periods, or hyphens.',
    ],
  ]);

  const cityRegexValidationText: string = cityRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      cityValidationTextMap.get(position)
    )
    .join(' ');

  return cityRegexValidationText;
}

type ReturnPostalCodeValidationTextInput = {
  postalCode: PostalCode;
  country: Country;
};

function returnPostalCodeValidationText({
  postalCode,
  country,
}: ReturnPostalCodeValidationTextInput) {
  if (country === 'United States') {
    const postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    const isValidRegex = postalCodeRegex.test(postalCode);
    if (!isValidRegex) {
      return 'Must be a valid US postal code.';
    }
  }

  // canada
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i;
  const isValidRegex = postalCodeRegex.test(postalCode);
  if (!isValidRegex) {
    return 'Must be a valid Canadian postal code.';
  }

  return '';
}

export {
  returnPasswordRegexValidationText,
  returnNameValidationText,
  returnAddressLineValidationText,
  returnCityValidationText,
  returnPostalCodeValidationText,
};
