import type { RegexValidationProps } from '../../utils';

function returnArticleTitleValidationText({
  content,
  contentKind,
  maxLength,
  minLength,
}: RegexValidationProps): string {
  // /^(?=.*[A-Za-z0-9])[\w\s.,!?():;"'-]{3,150}$/i
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

  return validationText ? `Invalid ${contentKind}. ${validationText}` : '';
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
  returnArticleParagraphValidationText,
  returnArticleTitleValidationText,
  returnImageAltValidationText,
};
