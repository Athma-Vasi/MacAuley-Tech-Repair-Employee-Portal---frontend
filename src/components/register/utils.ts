import { RegexValidationProps } from '../../utils';

function returnPasswordRegexValidationText({
  content,
  contentKind,
  minLength = 8,
  maxLength = 32,
}: RegexValidationProps): string {
  // const passwordLengthRegex = /^(?=.{8,32}$)/;
  const passwordLengthRegex = new RegExp(`^(?=.{${minLength},${maxLength}}$)`);
  const passwordUppercaseRegex = /^(?=.*[A-Z])/;
  const passwordLowercaseRegex = /^(?=.*[a-z])/;
  const passwordNumberRegex = /^(?=.*[0-9])/;
  const passwordSpecialCharacterRegex = /^(?=.*[!@#$%^&*])/;
  const passwordSpaceRegex = /^(?!.*\s)/;

  const passwordRegexTupleArr: [boolean, string][] = [
    [
      passwordLengthRegex.test(content),
      `Must be between ${minLength} and ${maxLength} characters.`,
    ],
    [
      passwordUppercaseRegex.test(content),
      'Must contain at least one uppercase letter.',
    ],
    [
      passwordLowercaseRegex.test(content),
      'Must contain at least one lowercase letter.',
    ],
    [passwordNumberRegex.test(content), 'Must contain at least one number.'],
    [
      passwordSpecialCharacterRegex.test(content),
      'Must contain at least one special character.',
    ],
    [passwordSpaceRegex.test(content), 'Cannot contain spaces.'],
  ];

  const validationText = passwordRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
}

export { returnPasswordRegexValidationText };
