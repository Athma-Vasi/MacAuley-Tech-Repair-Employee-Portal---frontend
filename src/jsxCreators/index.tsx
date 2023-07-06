import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

type ReturnAccessibleTextElemProps = {
  inputElementKind: string;
  inputText: string;
  kind: 'error' | 'valid';
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationTextFn: (inputText: string) => string;
};

function returnAccessibleTextElem({
  inputElementKind,
  inputText,
  kind,
  isValidInputText,
  isInputTextFocused,
  regexValidationTextFn,
}: ReturnAccessibleTextElemProps): JSX.Element | null {
  switch (kind) {
    case 'error': {
      return (
        <Text
          id={`${inputElementKind}-note-error`}
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
          <FontAwesomeIcon icon={faInfoCircle} />{' '}
          {regexValidationTextFn(inputText)}
        </Text>
      );
    }
    case 'valid': {
      return (
        <Text
          id={`${inputElementKind}-note-valid`}
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
          <FontAwesomeIcon icon={faCheck} /> {`${inputElementKind} is valid`}
        </Text>
      );
    }
    default: {
      return null;
    }
  }
}

export { returnAccessibleTextElem };
