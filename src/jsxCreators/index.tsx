import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@mantine/core';

import type {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessiblePasswordInputCreatorInfo,
  AccessiblePhoneNumberTextInputCreatorInfo,
  AccessibleRadioGroupInputCreatorInfo,
  AccessibleRadioSingleInputCreatorInfo,
  AccessibleSelectInputCreatorInfo,
  AccessibleTextAreaInputCreatorInfo,
  AccessibleTextInputCreatorInfo,
} from '../components/wrappers';
import {
  ButtonWrapper,
  CheckboxGroupInputsWrapper,
  CheckboxSingleInputWrapper,
  DateTimeInputWrapper,
  NativeSelectWrapper,
  PasswordInputWrapper,
  PhoneTextInputWrapper,
  RadioGroupInputsWrapper,
  RadioSingleInputWrapper,
  TextAreaInputWrapper,
  TextInputWrapper,
  TextWrapper,
} from '../components/wrappers';
import { RegexValidationProps } from '../utils';

// The functions : returnAccessibleErrorValidTextElements and returnAccessibleErrorValidTextElementsForDynamicInputs return a tuple [error, valid] or tuple[error[], valid[]] of accessible text elements for screen readers to read out based on the state of the controlled input

// Separating the error/valid states of the inputs allows the differently abled to easily distinguish input state as the aria-describedBy attribute of the returnAccessible${input kind}Elements creator functions is used to link the input with the error/valid text and forces the screen reader to immediately read out the text as the input state changes, providing instant feedback.

type ReturnAccessibleErrorValidTextElemProps = {
  inputElementKind: string;
  inputText: string;
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};

/**
 * @returns a tuple [error, valid] of accessible text elements
 * - For example, if the input element is focused and the input text is valid/invalid, then the screen reader will read out '${inputElementKind} is valid'  or '${regexValidationText}'
 * @param ReturnAccessibleErrorValidTextElemProps - the object containing the input element
 * @property {object.inputElementKind} - the semantic label of input element (e.g. 'username', 'password', 'email'). Must be identical to the semanticName used in the creator info object passed to the creator functions
 * @property {object.inputText} - the text in the input element
 * @property {object.isValidInputText} - whether the input text is valid
 * @property {object.isInputTextFocused} - whether the input element is focused - only show the accessible text elements if the input element is focused
 * @property {object.regexValidationText} - the text to show if the input text is invalid
 */
function returnAccessibleErrorValidTextElements({
  inputElementKind,
  inputText,
  isValidInputText,
  isInputTextFocused,
  regexValidationText,
}: ReturnAccessibleErrorValidTextElemProps): [JSX.Element, JSX.Element] {
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
      {inputElementKind.length > 0
        ? `${inputElementKind[0].toUpperCase()}${inputElementKind.slice(
            1
          )} is valid`
        : ''}
    </Text>,
  ];
}

type ReturnAccessibleErrorValidTextElementsForDynamicInputsProps = {
  semanticName: string;
  inputTextArray: string[];
  areValidInputTexts: boolean[];
  areInputTextsFocused: boolean[];
  regexValidationProps: RegexValidationProps;
  regexValidationFunction?:
    | ((validationObj: RegexValidationProps) => string)
    | undefined;
};

/**
 * @returns a tuple[error[], valid[]] of accessible text elements
 * @param ReturnAccessibleErrorValidTextElementsForDynamicInputsProps - the object containing the input element
 * @property {object.semanticName} - the semantic label of input element (e.g. 'username', 'password', 'email'). Must be identical to the semanticName used in the creator info object passed to the creator functions
 * @property {object.inputTextArray} - the array of input texts
 * @property {object.areValidInputTexts} - the array of booleans that indicate whether the input text is valid
 * @property {object.areInputTextsFocused} - the array of booleans that indicate whether the input text is focused
 * @property {object.regexValidationProps} - the object containing the regex validation props that is passed to the regex validation function
 * @property {object.regexValidationFunction} - reference to the regex validation function
 */
function returnAccessibleErrorValidTextElementsForDynamicInputs({
  semanticName,
  inputTextArray,
  areValidInputTexts,
  areInputTextsFocused,
  regexValidationProps,
  regexValidationFunction,
}: ReturnAccessibleErrorValidTextElementsForDynamicInputsProps): [
  JSX.Element[],
  JSX.Element[]
] {
  return [
    // error text elems
    inputTextArray.map((inputText, index) => (
      <Text
        key={`${index}`}
        id={`${semanticName.split(' ').join('-')}
        }-input-note-error-${index}`}
        style={{
          display:
            areInputTextsFocused[index] &&
            inputText &&
            !areValidInputTexts[index]
              ? 'block'
              : 'none',
        }}
        color="red"
        w="100%"
        aria-live="polite"
      >
        <FontAwesomeIcon icon={faInfoCircle} />{' '}
        {regexValidationFunction
          ? `${semanticName[0].toUpperCase()}${semanticName.slice(1)} ${
              index + 1
            } - ${regexValidationFunction(regexValidationProps)}`
          : ''}
      </Text>
    )),
    // valid text elems
    inputTextArray.map((inputText, index) => (
      <Text
        key={`${index}`}
        id={`${semanticName.split(' ').join('-')}-input-note-valid-${index}`}
        style={{
          display:
            areInputTextsFocused[index] &&
            inputText &&
            areValidInputTexts[index]
              ? 'block'
              : 'none',
        }}
        color="green"
        w="100%"
        aria-live="polite"
      >
        <FontAwesomeIcon icon={faCheck} />{' '}
        {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} ${
          index + 1
        } is valid`}
      </Text>
    )),
  ];
}

type ReturnAccessibleSelectedDeselectedTextElementsProps = {
  semanticName: string;
  isSelected: boolean;
  selectedDescription?: string;
  deselectedDescription?: string;
  theme?: 'muted' | 'default';
};

function returnAccessibleSelectedDeselectedTextElements({
  semanticName,
  isSelected,
  selectedDescription = '',
  deselectedDescription = '',
  theme = 'default',
}: ReturnAccessibleSelectedDeselectedTextElementsProps): [
  JSX.Element,
  JSX.Element
] {
  return [
    // selected text elem
    <Text
      id={`${semanticName.split(' ').join('-')}-selected`}
      style={{
        display: isSelected ? 'block' : 'none',
      }}
      color={theme === 'default' ? 'green' : 'gray'}
      w="100%"
      aria-live="polite"
    >
      {theme === 'default' ? <FontAwesomeIcon icon={faCheck} /> : null}{' '}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} selected${
        selectedDescription.length > 0 ? ` - ${selectedDescription}` : ''
      }`}
    </Text>,
    // deselected text elem
    <Text
      id={`${semanticName.split(' ').join('-')}-deselected`}
      style={{
        display: !isSelected ? 'block' : 'none',
      }}
      color={
        theme === 'default'
          ? deselectedDescription.length > 0
            ? 'red'
            : 'gray'
          : 'gray'
      }
      w="100%"
      aria-live="polite"
      size="xs"
    >
      {theme === 'default' ? <FontAwesomeIcon icon={faInfoCircle} /> : null}{' '}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} deselected${
        deselectedDescription.length > 0 ? ` - ${deselectedDescription}` : ''
      }`}
    </Text>,
  ];
}

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

function returnAccessibleRadioSingleInputElements(
  creatorInfoObjectArray: AccessibleRadioSingleInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <RadioSingleInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleDynamicRadioSingleInputElements(
  creatorInfoObjectArray: AccessibleRadioSingleInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <RadioSingleInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleDynamicRadioGroupInputsElements(
  creatorInfoObjectArray: AccessibleRadioGroupInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <RadioGroupInputsWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleRadioGroupInputsElements(
  creatorInfoObjectArray: AccessibleRadioGroupInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <RadioGroupInputsWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleCheckboxSingleInputElements(
  creatorInfoObjectArray: AccessibleCheckboxSingleInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <CheckboxSingleInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleCheckboxGroupInputsElements(
  creatorInfoObjectArray: AccessibleCheckboxGroupInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <CheckboxGroupInputsWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleDynamicTextInputElements(
  creatorInfoObjectArray: AccessibleTextInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <TextInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleDynamicTextAreaInputElements(
  creatorInfoObjectArray: AccessibleTextAreaInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <TextAreaInputWrapper
      key={`${index}${creatorInfoObject.label}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

export {
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleDynamicRadioGroupInputsElements,
  returnAccessibleDynamicRadioSingleInputElements,
  returnAccessibleDynamicTextAreaInputElements,
  returnAccessibleDynamicTextInputElements,
  returnAccessibleErrorValidTextElements,
  returnAccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessiblePasswordInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleRadioSingleInputElements,
  returnAccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
};
