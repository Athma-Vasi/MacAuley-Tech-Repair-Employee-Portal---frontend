import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

type ReturnAccessibleTextElemProps = {
  inputElementKind: string;
  inputText: string;
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};

/**
 * @returns a tuple [error, valid] of accessible text elements for screen readers to read out based on the state of the controlled input
 * - For example, if the input element is focused and the input text is valid/invalid, then the screen reader will read out '${inputElementKind} is valid'  or '${regexValidationText}'
 * @param inputElementKind - the semantic label of input element (e.g. 'username', 'password', 'email')
 * @param inputText - the text in the input element
 * @param isValidInputText - whether the input text is valid
 * @param isInputTextFocused - whether the input element is focused - only show the accessible text elements if the input element is focused
 * @param regexValidationText - the text to show if the input text is invalid
 */
function returnAccessibleTextElements({
  inputElementKind,
  inputText,
  isValidInputText,
  isInputTextFocused,
  regexValidationText,
}: ReturnAccessibleTextElemProps): JSX.Element[] {
  return [
    // error text elem
    <Text
      id={`${inputElementKind.split(' ').join('-')}-input-note-error`}
      style={{
        display:
          isInputTextFocused && inputText && !isValidInputText
            ? 'block'
            : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} /> {regexValidationText}
    </Text>,
    // valid text elem
    <Text
      id={`${inputElementKind.split(' ').join('-')}-input-note-valid`}
      style={{
        display:
          isInputTextFocused && inputText && isValidInputText
            ? 'block'
            : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faCheck} />{' '}
      {`${inputElementKind[0].toUpperCase()}${inputElementKind.slice(
        1
      )} is valid`}
    </Text>,
  ];
}

export { returnAccessibleTextElements };
