import {
  faCheck,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NativeSelect, SelectItem, Text, TextInput } from '@mantine/core';

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
 * @param ReturnAccessibleTextElemProps - the object containing the input element
 * @property {object.inputElementKind} - the semantic label of input element (e.g. 'username', 'password', 'email')
 * @property {object.inputText} - the text in the input element
 * @property {object.isValidInputText} - whether the input text is valid
 * @property {object.isInputTextFocused} - whether the input element is focused - only show the accessible text elements if the input element is focused
 * @property {object.regexValidationText} - the text to show if the input text is invalid
 */
function returnAccessibleTextElements({
  inputElementKind,
  inputText,
  isValidInputText,
  isInputTextFocused,
  regexValidationText,
}: ReturnAccessibleTextElemProps): [JSX.Element, JSX.Element] {
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

/**
     * <TextInput
      size="sm"
      w="100%"
      color="dark"
      label="Title"
      aria-required
      aria-describedby={
        isValidTitle ? 'title-input-note-valid' : 'title-input-note-error'
      }
      description={isValidTitle ? titleInputValidText : titleInputErrorText}
      placeholder="Enter title of request"
      autoComplete="off"
      aria-invalid={isValidTitle ? false : true}
      value={title}
      icon={
        isValidTitle ? <FontAwesomeIcon icon={faCheck} color="green" /> : null
      }
      error={!isValidTitle && title !== ''}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setTitle,
          payload: event.currentTarget.value,
        });
      }}
      onFocus={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsTitleFocused,
          payload: true,
        });
      }}
      onBlur={() => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setIsTitleFocused,
          payload: false,
        });
      }}
      minLength={2}
      maxLength={75}
      withAsterisk
      required
    />
     */

type AccessibleTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired: boolean;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon: IconDefinition | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessibleTextInputElements(
  infoArray: AccessibleTextInputCreatorInfo[]
) {
  return infoArray.map((info) => {
    const {
      semanticName,
      inputText,
      isValidInputText,
      label,
      ariaRequired,
      description,
      placeholder,
      initialInputValue = '',
      icon,
      onChange,
      onFocus,
      onBlur,
      minLength = 2,
      maxLength = 75,
      withAsterisk = false,
      required = false,
      autoComplete = 'off',
    } = info;

    const createdTextInput = (
      <TextInput
        size="sm"
        w="100%"
        color="dark"
        label={label}
        aria-required={ariaRequired}
        aria-describedby={
          isValidInputText
            ? `${semanticName.split(' ').join('-')}-input-note-valid`
            : `${semanticName.split(' ').join('-')}-input-note-error`
        }
        description={isValidInputText ? description.valid : description.error}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={isValidInputText ? false : true}
        value={inputText}
        icon={
          isValidInputText ? (
            icon ? (
              <FontAwesomeIcon icon={icon} color="green" />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="green" />
            )
          ) : null
        }
        error={!isValidInputText && inputText !== initialInputValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdTextInput;
  });
}

/**
 * <NativeSelect
      size="sm"
      data={ANONYMOUS_REQUEST_KINDS}
      label="Request kind"
      description="Select the kind of request"
      value={requestKind}
      onChange={(event) => {
        createAnonymousRequestDispatch({
          type: createAnonymousRequestAction.setRequestKind,
          payload: event.currentTarget.value as AnonymousRequestKind,
        });
      }}
      withAsterisk
      required
    />
 */

type AccessibleSelectInputCreatorInfo = {
  data: string[];
  label: string;
  description: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  withAsterisk?: boolean | undefined;
  required?: boolean | undefined;
};

function returnAccessibleSelectInputElements(
  infoArray: AccessibleSelectInputCreatorInfo[]
) {
  return infoArray.map((info) => {
    const {
      data,
      label,
      description,
      value,
      onChange,
      withAsterisk = false,
      required = false,
    } = info;

    const createdSelectInput = (
      <NativeSelect
        size="sm"
        data={data}
        label={label}
        description={description}
        value={value}
        onChange={onChange}
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdSelectInput;
  });
}

export {
  returnAccessibleSelectInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
};

export type {
  AccessibleSelectInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  ReturnAccessibleTextElemProps,
};
