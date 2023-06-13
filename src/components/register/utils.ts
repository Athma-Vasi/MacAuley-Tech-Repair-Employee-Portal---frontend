function returnEmailRegexValidationText(email: string) {
  const usernamePartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  const domainPartRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  const subdomainPartRegex =
    /^\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

  const emailRegexObj: Record<string, [number, boolean]> = {
    usernamePart: [0, usernamePartRegex.test(email)],
    domainPart: [1, domainPartRegex.test(email)],
    subdomainPart: [2, subdomainPartRegex.test(email)],
  };

  const emailValidationTextMap = new Map<number, string>([
    [0, 'Must contain a valid username part.'],
    [1, 'Must contain a valid domain part.'],
    [2, 'Must contain a valid subdomain part.'],
  ]);

  const emailRegexValidationText = Object.values(emailRegexObj)
    .filter((tuple: [number, boolean]) => !tuple[1])
    .map((tuple: [number, boolean]) => emailValidationTextMap.get(tuple[0]))
    .join(' ');

  return emailRegexValidationText;
}

function returnUsernameRegexValidationText(username: string) {
  const usernameLengthRegex = /^(?=.{3,20}$)/;
  const usernameStartRegex = /^(?![-_.])/;
  const usernameConsecutiveRegex = /^(?!.*[-_.]{2})/;
  const usernameCharacterRegex = /^[a-zA-Z0-9-_.]+$/;
  const usernameEndRegex = /(?<![-_.])$/;

  const usernameRegexObj: Record<string, [number, boolean]> = {
    usernameLength: [0, usernameLengthRegex.test(username)],
    usernameStart: [1, usernameStartRegex.test(username)],
    usernameConsecutive: [2, usernameConsecutiveRegex.test(username)],
    usernameCharacter: [3, usernameCharacterRegex.test(username)],
    usernameEnd: [4, usernameEndRegex.test(username)],
  };

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

  const usernameRegexValidationText: string = Object.values(usernameRegexObj)
    .filter((tuple: [number, boolean]) => !tuple[1])
    .map((tuple: [number, boolean]) => usernameValidationTextMap.get(tuple[0]))
    .join(' ');

  return usernameRegexValidationText;
}

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

export {
  returnEmailRegexValidationText,
  returnUsernameRegexValidationText,
  returnPasswordRegexValidationText,
};
