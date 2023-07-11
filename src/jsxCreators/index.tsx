import {
  faCheck,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

import {
  ButtonWrapper,
  CheckboxInputWrapper,
  DateTimeInputWrapper,
  NativeSelectWrapper,
  PasswordInputWrapper,
  PhoneTextInputWrapper,
  RadioInputWrapper,
  TextAreaInputWrapper,
  TextInputWrapper,
} from '../components/wrappers';

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

type AccessibleButtonCreatorInfo = {
  buttonLabel: string;
  buttonOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  buttonDisabled?: boolean | undefined;
  buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  buttonVariant?:
    | 'outline'
    | 'white'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle'
    | undefined;
  compact?: boolean | undefined;
  leftIcon?: React.ReactNode | undefined;
  rightIcon?: React.ReactNode | undefined;
  semanticName: string;
  semanticDescription: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
};

function returnAccessibleButtonElements(
  creatorInfoObjectArray: AccessibleButtonCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdButton = (
      <ButtonWrapper
        key={`${index}${creatorInfoObject.buttonLabel}`}
        creatorInfoObject={creatorInfoObject}
      />
    );

    return createdButton;
  });
}

type AccessibleTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void | undefined;

  rightSection?: boolean | undefined;
  rightSectionIcon?: IconDefinition | null | undefined;
  rightSectionOnClick?: () => void | undefined;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessibleTextInputElements(
  creatorInfoObjectArray: AccessibleTextInputCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdTextInput = (
      <TextInputWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
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
  ref?: React.RefObject<HTMLSelectElement> | undefined;
  required?: boolean | undefined;
};

function returnAccessibleSelectInputElements(
  creatorInfoObjectArray: AccessibleSelectInputCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdSelectInput = (
      <NativeSelectWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
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
  ariaRequired?: boolean | undefined;
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
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
};

function returnAccessiblePasswordInputElements(
  creatorInfoObjectArray: AccessiblePasswordInputCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdPasswordInput = (
      <PasswordInputWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
      />
    );

    return createdPasswordInput;
  });
}

type AccessiblePhoneNumberTextInputCreatorInfo = {
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaRequired?: boolean | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
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
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessiblePhoneNumberTextInputElements(
  creatorInfoObjectArray: AccessiblePhoneNumberTextInputCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdPhoneNumberTextInput = (
      <PhoneTextInputWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
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
  ariaRequired?: boolean | undefined;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLTextAreaElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;

  autosize?: boolean | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
};

function returnAccessibleTextAreaInputElements(
  creatorInfoObjectArray: AccessibleTextAreaInputCreatorInfo[]
): JSX.Element[] {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdTextAreaInput = (
      <TextAreaInputWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
      />
    );

    return createdTextAreaInput;
  });
}

type AccessibleDateTimeInputCreatorInfo = {
  inputKind: 'date' | 'time';
  dateKind?: 'date near future' | 'date near past' | 'full date' | undefined;
  semanticName: string;
  inputText: string;
  isValidInputText: boolean;
  label: string;
  ariaAutoComplete?: 'both' | 'list' | 'none' | 'inline' | undefined;
  description: {
    error: JSX.Element;
    valid: JSX.Element;
  };
  placeholder: string;
  initialInputValue?: string | undefined;
  icon?: IconDefinition | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;

  min?: string | undefined;
  max?: string | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  autoComplete?: 'on' | 'off' | undefined;
};

function returnAccessibleDateTimeElements(
  creatorInfoObjectArray: AccessibleDateTimeInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => {
    const createdDateTimeInput = (
      <DateTimeInputWrapper
        key={`${index}${creatorInfoObject.label}`}
        creatorInfoObject={creatorInfoObject}
      />
    );

    return createdDateTimeInput;
  });
}

type AccessibleRadioInputCreatorInfo = {
  semanticName: string;
  label: string;
  description: {
    selected: string;
    deselected: string;
  };
  ariaRequired?: boolean | undefined;
  checked: boolean;
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    | undefined;
  disabled?: boolean | undefined;

  onChange: (event: React.ChangeEvent<HTMLInputElement> | string) => void;
  onClick: () => void;
  radioKind: 'single' | 'multiple';
  value?: string | undefined;

  withAsterisk?: boolean | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
};

function returnAccessibleRadioInputElements(
  creatorInfoObjectArray: AccessibleRadioInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <RadioInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

type AccessibleCheckboxInputCreatorInfo = {
  semanticName: string;
  accessibleDescription?:
    | {
        selected: string;
        deselected: string;
      }
    | undefined;
  ariarequired?: boolean | undefined;
  checkboxKind: 'single' | 'multiple';
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    | undefined;
  defaultValue?: [string] | undefined;
  description: {
    selected: string;
    deselected: string;
  };
  label: string;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  onChangeMultiple?: (value: string[]) => void | undefined;
  onChangeSingle?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | undefined;
  onClick?: () => void | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  value?: string[] | undefined;
};

function returnAccessibleCheckboxInputElements(
  creatorInfoObjectArray: AccessibleCheckboxInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <CheckboxInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

export {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxInputElements,
  returnAccessibleDateTimeElements,
  returnAccessiblePasswordInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleRadioInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextElements,
  returnAccessibleTextInputElements,
};

export type {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePasswordInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleRadioInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
  ReturnAccessibleTextElemProps,
};
