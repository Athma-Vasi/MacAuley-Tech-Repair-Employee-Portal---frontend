import {
  faCheck,
  faInfoCircle,
  faPhoneAlt,
  faRefresh,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  NativeSelect,
  PasswordInput,
  SelectItem,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';

import { registerAction } from '../components/register/state';

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

type AccessibleTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired: boolean;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
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
): JSX.Element[] {
  return infoArray.map((info) => {
    const {
      semanticName,
      inputText,
      isValidInputText,
      label,
      ariaRequired,
      ariaAutoComplete = 'none',
      description,
      placeholder,
      initialInputValue = '',
      icon = null,
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
        aria-autocomplete={ariaAutoComplete}
        description={isValidInputText ? description.valid : description.error}
        placeholder={placeholder}
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
        autoComplete={autoComplete}
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdTextInput;
  });
}

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
): JSX.Element[] {
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
        aria-label={`Currently selected ${value}`}
        aria-required={required}
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

type AccessiblePasswordInputCreatorInfo = {
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
};

function returnAccessiblePasswordInputElements(
  infoArray: AccessiblePasswordInputCreatorInfo[]
): JSX.Element[] {
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
      icon = null,
      onChange,
      onFocus,
      onBlur,
      minLength = 8,
      maxLength = 32,
      withAsterisk = false,
      required = false,
    } = info;

    const createdPasswordInput = (
      <PasswordInput
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
        placeholder={placeholder}
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
        description={isValidInputText ? description.valid : description.error}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdPasswordInput;
  });
}

/**
 * <TextInput
        size="sm"
        w="100%"
        color="dark"
        label="Personal contact number"
        aria-required
        aria-describedby={
          isValidContactNumber
            ? 'contact-number-input-note-valid'
            : 'contact-number-input-note-error'
        }
        description={
          isValidContactNumber
            ? contactNumberInputValidText
            : contactNumberInputErrorText
        }
        placeholder="Enter contact number"
        autoComplete="off"
        aria-invalid={isValidContactNumber ? false : true}
        value={contactNumber}
        onKeyDown={(event) => {
          if (event.key === 'Backspace') {
            if (contactNumber.length === 14) {
              registerDispatch({
                type: registerAction.setContactNumber,
                payload: contactNumber.slice(0, -1),
              });
            } else if (contactNumber.length === 9) {
              registerDispatch({
                type: registerAction.setContactNumber,
                payload: contactNumber.slice(0, -1),
              });
            }
          }
        }}
        rightSection={
          <Tooltip label="Reset value to +(1)">
            <Button
              type="button"
              size="xs"
              variant="white"
              aria-label="Reset personal contact number value to +(1)"
              mr="md"
            >
              <FontAwesomeIcon
                icon={faRefresh}
                cursor="pointer"
                color="gray"
                onClick={() => {
                  registerDispatch({
                    type: registerAction.setContactNumber,
                    payload: '+(1)',
                  });
                }}
              />
            </Button>
          </Tooltip>
        }
        icon={
          isValidContactNumber ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : null
        }
        error={!isValidContactNumber && contactNumber !== '+(1)'}
        onChange={(event) => {
          registerDispatch({
            type: registerAction.setContactNumber,
            payload: event.currentTarget.value,
          });
        }}
        onFocus={() => {
          registerDispatch({
            type: registerAction.setIsContactNumberFocused,
            payload: true,
          });
        }}
        onBlur={() => {
          registerDispatch({
            type: registerAction.setIsContactNumberFocused,
            payload: false,
          });
        }}
        maxLength={18}
      />
 */

type AccessiblePhoneNumberTextInputCreatorInfo = {
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
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightSection?: boolean | undefined;
  rightSectionIcon?: IconDefinition | null | undefined;
  rightSectionOnClick?: () => void | undefined;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessiblePhoneNumberTextInputElements(
  infoArray: AccessiblePhoneNumberTextInputCreatorInfo[]
): JSX.Element[] {
  return infoArray.map((info) => {
    const {
      semanticName,
      inputText,
      isValidInputText,
      label,
      ariaRequired,
      description,
      placeholder,
      initialInputValue = '+(1)',
      icon = null,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      rightSection = false,
      rightSectionIcon = null,
      rightSectionOnClick = () => {},
      minLength = 18,
      maxLength = 18,
      withAsterisk = false,
      required = false,
      autoComplete = 'off',
    } = info;

    const createdPhoneNumberTextInput = (
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
        onKeyDown={onKeyDown}
        rightSection={
          rightSection ? (
            <Tooltip label={`Reset value to ${initialInputValue}`}>
              <Button
                type="button"
                size="xs"
                variant="white"
                aria-label={`Reset personal contact number value to ${initialInputValue}`}
                mr="md"
              >
                <FontAwesomeIcon
                  icon={rightSectionIcon ? rightSectionIcon : faPhoneAlt}
                  cursor="pointer"
                  color="gray"
                  onClick={rightSectionOnClick}
                />
              </Button>
            </Tooltip>
          ) : null
        }
        minLength={minLength}
        maxLength={maxLength}
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdPhoneNumberTextInput;
  });
}

type AccessibleTextAreaInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired: boolean;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon: IconDefinition | null;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;

  autosize?: boolean | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
};

function returnAccessibleTextAreaInputElements(
  infoArray: AccessibleTextAreaInputCreatorInfo[]
): JSX.Element[] {
  return infoArray.map((info) => {
    const {
      semanticName,
      inputText,
      isValidInputText,
      label,
      ariaRequired,
      ariaAutoComplete = 'none',
      description,
      placeholder,
      initialInputValue = '',
      icon = null,
      onChange,
      onFocus,
      onBlur,
      minLength = 2,
      maxLength = 2000,
      withAsterisk = false,
      required = false,
      autoComplete = 'off',
      autosize = false,
      minRows = 3,
      maxRows = 5,
    } = info;

    const createdTextAreaInput = (
      <Textarea
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
        aria-autocomplete={ariaAutoComplete}
        description={isValidInputText ? description.valid : description.error}
        placeholder={placeholder}
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
        autoComplete={autoComplete}
        withAsterisk={withAsterisk}
        required={required}
        autosize={autosize}
        minRows={minRows}
        maxRows={maxRows}
      />
    );

    return createdTextAreaInput;
  });
}

type AccessibleDateInputCreatorInfo = {
  inputKind: 'date' | 'time';
  dateKind?: 'date near future' | 'date near past' | 'full date' | undefined;
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired: boolean;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
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

  min?: string | undefined;
  max?: string | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessibleDateTimeElements(
  infoArr: AccessibleDateInputCreatorInfo[]
) {
  return infoArr.map((info) => {
    const {
      inputKind,
      dateKind = 'full date',
      semanticName,
      inputText,
      isValidInputText,
      label,
      ariaRequired,
      ariaAutoComplete = 'none',
      description,
      placeholder,
      initialInputValue = '',
      icon = null,
      onChange,
      onFocus,
      onBlur,
      min = new Date().toISOString().split('T')[0], // current date
      max = new Date(2024, 11, 31).toISOString().split('T')[0], // 31.12.2024
      minLength = 5,
      maxLength = 10,
      withAsterisk = false,
      required = false,
      autoComplete = 'off',
    } = info;

    const createdDateTimeInput = (
      <TextInput
        type={inputKind}
        size="sm"
        w="100%"
        color="dark"
        label={label}
        placeholder={placeholder}
        aria-autocomplete={ariaAutoComplete}
        autoComplete={autoComplete}
        aria-required={ariaRequired}
        aria-label={`Please enter ${semanticName} in format "${
          inputKind === 'date'
            ? 'on Chromium browsers: date-date-month-month-year-year-year-year, or in other browsers year-year-year-year-month-month-date-date'
            : 'hour-hour-minute-minute'
        }${
          dateKind === 'date near future'
            ? ' from today to 2026'
            : dateKind === 'date near past'
            ? ' from 2020 to today'
            : ' from 1900 to 2024'
        }`}
        aria-describedby={
          isValidInputText
            ? `${semanticName.split(' ').join('-')}-input-note-valid`
            : `${semanticName.split(' ').join('-')}-input-note-error`
        }
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
        description={isValidInputText ? description.valid : description.error}
        min={
          dateKind === 'full date'
            ? new Date(1900, 0, 1).toISOString().split('T')[0]
            : dateKind === 'date near past'
            ? new Date(2020, 0, 1).toISOString().split('T')[0]
            : dateKind === 'date near future'
            ? new Date().toISOString().split('T')[0]
            : min
        }
        max={
          dateKind === 'full date'
            ? new Date(2024, 11, 31).toISOString().split('T')[0]
            : dateKind === 'date near past'
            ? new Date().toISOString().split('T')[0]
            : dateKind === 'date near future'
            ? new Date(2026, 11, 31).toISOString().split('T')[0]
            : max
        }
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        minLength={
          inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : minLength
        }
        maxLength={
          inputKind === 'date' ? 10 : inputKind === 'time' ? 5 : maxLength
        }
        withAsterisk={withAsterisk}
        required={required}
      />
    );

    return createdDateTimeInput;
  });
}

export {
  returnAccessibleDateTimeElements,
  returnAccessiblePasswordInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
};

export type {
  AccessibleDateInputCreatorInfo,
  AccessiblePasswordInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  ReturnAccessibleTextElemProps,
};
