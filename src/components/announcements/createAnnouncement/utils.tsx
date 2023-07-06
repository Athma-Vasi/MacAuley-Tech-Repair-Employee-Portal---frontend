import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';
import { ReturnArticleContentInputProps } from './types';

function returnArticleContentInputValidElements({
  article,
  isValidArticleParagraph,
  isArticleParagraphFocused,
}: ReturnArticleContentInputProps) {
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
      <FontAwesomeIcon icon={faCheck} /> Paragraph {index + 1} is valid
    </Text>
  ));
}

function returnArticleContentInputErrorElements({
  article,
  isValidArticleParagraph,
  isArticleParagraphFocused,
  returnRegexValidationText,
}: ReturnArticleContentInputProps) {
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
      {returnRegexValidationText ? returnRegexValidationText(paragraph) : ''}
    </Text>
  ));
}

export {
  returnArticleContentInputValidElements,
  returnArticleContentInputErrorElements,
};
