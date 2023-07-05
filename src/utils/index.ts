function returnEmailRegexValidationText(email: string) {
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

  return emailRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');
}

function returnUsernameRegexValidationText(username: string) {
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

  return usernameRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');
}

function returnNoteTitleValidationText(title: string) {
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

  return titleRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');
}

function returnNoteContentValidationText(content: string) {
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

  return contentRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');
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
  formatDate,
};
