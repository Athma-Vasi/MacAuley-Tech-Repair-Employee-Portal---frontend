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

export { returnPasswordRegexValidationText };
