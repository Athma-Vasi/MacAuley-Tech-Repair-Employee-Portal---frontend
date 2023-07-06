import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

type ReturnAccessibleTextElemProps = {
  inputElementKind: string;
  inputText: string;
  kind: 'error' | 'valid';
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};

/**
 * - Returns an accessible text element for an input element. This is used for screen readers to read out the state of the input element.
 * - For example, if the input element is focused and the input text is valid, then the screen reader will read out '${inputElementKind} is valid'.
 * - If the input element is focused and the input text is invalid, then the screen reader will read out the regex validation text.
 */
function returnAccessibleTextElem({
  inputElementKind,
  inputText,
  kind,
  isValidInputText,
  isInputTextFocused,
  regexValidationText,
}: ReturnAccessibleTextElemProps): JSX.Element | null {
  switch (kind) {
    case 'error': {
      return (
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
        </Text>
      );
    }
    case 'valid': {
      return (
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
        </Text>
      );
    }
    default: {
      return null;
    }
  }
}

export { returnAccessibleTextElem };
