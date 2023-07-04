function returnEmailRegexValidationText(email: string) {
  const usernamePartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  const domainPartRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  const subdomainPartRegex =
    /^\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

  const emailRegexTuple: [number, boolean][] = [
    [0, usernamePartRegex.test(email)],
    [1, domainPartRegex.test(email)],
    [2, subdomainPartRegex.test(email)],
  ];

  const emailValidationTextMap = new Map<number, string>([
    [0, 'Must contain a valid username part.'],
    [1, 'Must contain a valid domain part.'],
    [2, 'Must contain a valid (optional) subdomain part.'],
  ]);

  const emailRegexValidationText = emailRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      emailValidationTextMap.get(position)
    )
    .join(' ');

  return emailRegexValidationText;
}

function returnUsernameRegexValidationText(username: string) {
  const usernameLengthRegex = /^(?=.{3,20}$)/;
  const usernameStartRegex = /^(?![-_.])/;
  const usernameConsecutiveRegex = /^(?!.*[-_.]{2})/;
  const usernameCharacterRegex = /^[a-zA-Z0-9-_.]+$/;
  const usernameEndRegex = /(?<![-_.])$/;

  const usernameRegexTuple: [number, boolean][] = [
    [0, usernameLengthRegex.test(username)],
    [1, usernameStartRegex.test(username)],
    [2, usernameConsecutiveRegex.test(username)],
    [3, usernameCharacterRegex.test(username)],
    [4, usernameEndRegex.test(username)],
  ];

  const usernameValidationTextMap = new Map<number, string>([
    [0, 'Must be between 3 and 20 characters.'],
    [1, 'Cannot start with a hyphen, underscore, or period.'],
    [2, 'Cannot contain two hyphens, underscores, or periods in a row.'],
    [
      3,
      'Can only contain alphanumeric characters, hyphens, underscores, or periods.',
    ],
    [4, 'Cannot end with a hyphen, underscore, or period.'],
  ]);

  const usernameRegexValidationText: string = usernameRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      usernameValidationTextMap.get(position)
    )
    .join(' ');

  return usernameRegexValidationText;
}

function returnNoteTitleValidationText(title: string) {
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const alphanumericOrSpecialCharacterRegex =
    /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
  const titleLengthRegex = /^(?=.{1,100}$)/;

  const titleRegexTuple: [number, boolean][] = [
    [0, atleastOneAlphanumericRegex.test(title)],
    [1, alphanumericOrSpecialCharacterRegex.test(title)],
    [2, titleLengthRegex.test(title)],
  ];

  const titleRegexValidationMap = new Map<number, string>([
    [0, 'Must contain at least one alphanumeric character.'],
    [1, 'Can only contain alphanumeric characters or special characters.'],
    [2, 'Must be between 1 and 100 characters.'],
  ]);

  const titleRegexValidationText: string = titleRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      titleRegexValidationMap.get(position)
    )
    .join(' ');

  return titleRegexValidationText;
}

function returnNoteContentValidationText(content: string) {
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;
  const contentLengthRegex = /^(?=.{1,1000}$)/;

  const contentRegexTuple: [number, boolean][] = [
    [0, atleastOneAlphanumericRegex.test(content)],
    [1, wordCharacterWhitespacePunctuationRegex.test(content)],
    [2, contentLengthRegex.test(content)],
  ];

  const contentRegexValidationMap = new Map<number, string>([
    [0, 'Must contain at least one alphanumeric character.'],
    [
      1,
      'Can only contain alphanumeric characters, whitespace, or punctuation.',
    ],
    [2, 'Must be between 1 and 1000 characters.'],
  ]);

  const contentRegexValidationText: string = contentRegexTuple
    .filter(([_, isValidRegex]: [number, boolean]) => !isValidRegex)
    .map(([position, _]: [number, boolean]) =>
      contentRegexValidationMap.get(position)
    )
    .join(' ');

  return contentRegexValidationText;
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

type FormatDateProps = {
  date: Date;
  locale: string;
  formatOptions: Intl.DateTimeFormatOptions;
};
function formatDate({ date, locale, formatOptions }: FormatDateProps): string {
  return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(date));
}

export {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
  returnNoteTitleValidationText,
  returnNoteContentValidationText,
  returnNameValidationText,
  returnCityValidationText,
  formatDate,
};
