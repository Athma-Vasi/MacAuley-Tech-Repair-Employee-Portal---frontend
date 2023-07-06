import { Currency } from '../components/benefits/createBenefit/types';

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

type RegexValidationProps = {
  content: string;
  contentKind: string;
  minLength: number;
  maxLength: number;
};

/**
 * Performs basic grammar validation [.,!?():;"'-] on a string of variable length, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
 * contentKind is used to specify the type of content being validated, and is used in the returned validation error string.
 */
function returnGenericGrammarValidationText({
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
 * Performs money validation on a number based on currency type, and returns a string corresponding to the validation error. If no validation error is found, an empty string is returned.
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

  const moneyRegexTupleArr: [boolean, string][] = [
    [numberPresentRegex.test(money), 'Must contain at least one number.'],
    [
      beforeSeperatorRegex.test(money),
      'Must be between 1 and 6 digits before the separator.',
    ],
    [
      afterSeperatorRegex.test(money),
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
  returnGenericGrammarValidationText,
  returnMoneyValidationText,
  formatDate,
};
