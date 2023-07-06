import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';
import { ReturnArticleParagraphInputProps } from './types';

function returnArticleParagraphInputValidElements({
  article,
  isValidArticleParagraph,
  isArticleParagraphFocused,
}: ReturnArticleParagraphInputProps): JSX.Element[] {
  return article.map((paragraph, index) => (
    <Text
      key={`${index}`}
      id={`article-paragraph-input-note-valid-${index}`}
      style={{
        display:
          isArticleParagraphFocused[index] &&
          paragraph &&
          isValidArticleParagraph[index]
            ? 'block'
            : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} /> {`Paragraph ${index + 1} is valid`}
    </Text>
  ));
}

function returnArticleParagraphInputErrorElements({
  article,
  isValidArticleParagraph,
  isArticleParagraphFocused,
  returnRegexValidationText,
}: ReturnArticleParagraphInputProps): JSX.Element[] {
  return article.map((paragraph, index) => (
    <Text
      key={`${index}`}
      id={`article-paragraph-input-note-error-${index}`}
      style={{
        display:
          isArticleParagraphFocused[index] &&
          paragraph &&
          !isValidArticleParagraph[index]
            ? 'block'
            : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {returnRegexValidationText
        ? `Paragraph ${index + 1} ${returnRegexValidationText(paragraph)}`
        : ''}
    </Text>
  ));
}

export {
  returnArticleParagraphInputValidElements,
  returnArticleParagraphInputErrorElements,
};
