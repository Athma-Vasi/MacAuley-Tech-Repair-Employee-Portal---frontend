function returnArticleTitleValidationText({
  str,
  kind,
}: {
  str: string;
  kind: string;
}): string {
  // /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{3,150}$/i
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;
  const strLengthRegex = /^(?=.{3,150}$)/;

  const strRegexTupleArr: [boolean, string][] = [
    [
      atleastOneAlphanumericRegex.test(str),
      'Must contain at least one alphanumeric character.',
    ],
    [
      wordCharacterWhitespacePunctuationRegex.test(str),
      'Can only contain alphanumeric characters, whitespace, or punctuation.',
    ],
    [strLengthRegex.test(str), 'Must be between 3 and 150 characters.'],
  ];

  const validationText = strRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid ${kind}. ${validationText}` : '';
}

const returnImageAltValidationText = returnArticleTitleValidationText;

function returnArticleParagraphValidationText(content: string): string {
  //  /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{1,2000}$/i
  const atleastOneAlphanumericRegex = /^(?=.*[A-Za-z0-9])/;
  const wordCharacterWhitespacePunctuationRegex = /^[\w\s.,!?():;"'-]+$/;
  const contentLengthRegex = /^(?=.{1,2000}$)/;

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
      'Must be between 1 and 20000 characters.',
    ],
  ];

  const validationText = contentRegexTupleArr
    .filter(([isValidRegex, _]: [boolean, string]) => !isValidRegex)
    .map(([_, validationText]: [boolean, string]) => validationText)
    .join(' ');

  return validationText ? `Invalid content. ${validationText}` : '';
}

export {
  returnArticleTitleValidationText,
  returnImageAltValidationText,
  returnArticleParagraphValidationText,
};
