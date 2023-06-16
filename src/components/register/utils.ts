function returnPasswordRegexValidationText(password: string) {
  const passwordLengthRegex = /^(?=.{8,32}$)/;
  const passwordUppercaseRegex = /^(?=.*[A-Z])/;
  const passwordLowercaseRegex = /^(?=.*[a-z])/;
  const passwordNumberRegex = /^(?=.*[0-9])/;
  const passwordSpecialCharacterRegex = /^(?=.*[!@#$%^&*])/;
  const passwordSpaceRegex = /^(?!.*\s)/;

  const passwordRegexObj: Record<string, [number, boolean]> = {
    passwordLength: [0, passwordLengthRegex.test(password)],
    passwordUppercase: [1, passwordUppercaseRegex.test(password)],
    passwordLowercase: [2, passwordLowercaseRegex.test(password)],
    passwordNumber: [3, passwordNumberRegex.test(password)],
    passwordSpecialCharacter: [4, passwordSpecialCharacterRegex.test(password)],
    passwordSpace: [5, passwordSpaceRegex.test(password)],
  };

  const passwordValidationTextMap = new Map<number, string>([
    [0, 'Must be between 8 and 32 characters.'],
    [1, 'Must contain at least one uppercase letter.'],
    [2, 'Must contain at least one lowercase letter.'],
    [3, 'Must contain at least one number.'],
    [4, 'Must contain at least one special character.'],
    [5, 'Cannot contain spaces.'],
  ]);

  const passwordRegexValidationText: string = Object.values(passwordRegexObj)
    .filter((tuple: [number, boolean]) => !tuple[1])
    .map((tuple: [number, boolean]) => passwordValidationTextMap.get(tuple[0]))
    .join(' ');

  return passwordRegexValidationText;
}

export { returnPasswordRegexValidationText };
