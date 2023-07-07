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
 *
 * - Returns a tuple [error, valid] of accessible text elements for screen readers to read out based on the state of the input
 * - For example, if the input element is focused and the input text is valid, then the screen reader will read out '${inputElementKind} is valid'.
 * - If the input element is focused and the input text is invalid, then the screen reader will read out the regex validation text.
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
