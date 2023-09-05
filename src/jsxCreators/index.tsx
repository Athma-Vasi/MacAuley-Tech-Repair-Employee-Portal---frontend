import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Center,
  Grid,
  Group,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';

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
  AccessibleSliderInputCreatorInfo,
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
  SliderWrapper,
  TextAreaInputWrapper,
  TextInputWrapper,
  TextWrapper,
} from '../components/wrappers';
import { RegexValidationProps } from '../utils';
import { TbCheck, TbExclamationCircle } from 'react-icons/tb';
import { useGlobalState } from '../hooks';

// The functions : AccessibleErrorValidTextElements and AccessibleErrorValidTextElementsForDynamicInputs return a tuple [error, valid] or tuple[error[], valid[]] of accessible text elements for screen readers to read out based on the state of the controlled input

// Separating the error/valid states of the inputs allows the differently abled to easily distinguish input state as the aria-describedBy attribute of the returnAccessible${input kind}Elements creator functions is used to link the input with the error/valid text and forces the screen reader to immediately read out the text as the input state changes, providing instant feedback.

type AccessibleErrorValidTextElemProps = {
  inputElementKind: string;
  inputText: string;
  isValidInputText: boolean;
  isInputTextFocused: boolean;
  regexValidationText?: string | undefined;
};

/**
 * @returns a tuple [error, valid] of accessible text elements
 * - For example, if the input element is focused and the input text is valid/invalid, then the screen reader will read out '${inputElementKind} is valid'  or '${regexValidationText}'
 * @param AccessibleErrorValidTextElemProps - the object containing the input element
 * @property {object.inputElementKind} - the semantic label of input element (e.g. 'username', 'password', 'email'). Must be identical to the semanticName used in the creator info object passed to the creator functions
 * @property {object.inputText} - the text in the input element
 * @property {object.isValidInputText} - whether the input text is valid
 * @property {object.isInputTextFocused} - whether the input element is focused - only show the accessible text elements if the input element is focused
 * @property {object.regexValidationText} - the text to show if the input text is invalid
 */
function AccessibleErrorValidTextElements({
  inputElementKind,
  inputText,
  isValidInputText,
  isInputTextFocused,
  regexValidationText,
}: AccessibleErrorValidTextElemProps): [React.JSX.Element, React.JSX.Element] {
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const errorTextElement = (
    <Text
      id={`${inputElementKind.split(' ').join('-')}-input-note-error`}
      style={{
        display:
          isInputTextFocused && inputText && !isValidInputText
            ? 'block'
            : 'none',
      }}
      w="100%"
      aria-live="polite"
    >
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbExclamationCircle
              color={
                colorScheme === 'light'
                  ? colors.red[primaryShade.light]
                  : colors.red[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">{regexValidationText}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  const validTextElement = (
    <Text
      id={`${inputElementKind.split(' ').join('-')}-input-note-valid`}
      style={{
        display:
          isInputTextFocused && inputText && isValidInputText
            ? 'block'
            : 'none',
      }}
      color={
        colorScheme === 'light'
          ? colors.green[primaryShade.light]
          : colors.green[primaryShade.dark]
      }
      w="100%"
      aria-live="polite"
    >
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbCheck
              color={
                colorScheme === 'light'
                  ? colors.green[primaryShade.light]
                  : colors.green[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">
              {inputElementKind.length > 0
                ? `${inputElementKind[0].toUpperCase()}${inputElementKind.slice(
                    1
                  )} is valid`
                : ''}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  );

  return [errorTextElement, validTextElement];
}

type AccessibleErrorValidTextElementsForDynamicInputsProps = {
  semanticName: string;
  inputTextArray: string[];
  areValidInputTexts: boolean[];
  areInputTextsFocused: boolean[];
  regexValidationProps: RegexValidationProps[];
  regexValidationFunction?:
    | ((validationObj: RegexValidationProps) => string)
    | undefined;
};

/**
 * @returns a tuple[error[], valid[]] of accessible text elements
 * @param AccessibleErrorValidTextElementsForDynamicInputsProps - the object containing the input element
 * @property {object.semanticName} - the semantic label of input element (e.g. 'username', 'password', 'email'). Must be identical to the semanticName used in the creator info object passed to the creator functions
 * @property {object.inputTextArray} - the array of input texts
 * @property {object.areValidInputTexts} - the array of booleans that indicate whether the input text is valid
 * @property {object.areInputTextsFocused} - the array of booleans that indicate whether the input text is focused
 * @property {object.regexValidationProps} - the object[] containing the regex validation props that is passed to the regex validation function
 * @property {object.regexValidationFunction} - reference to the regex validation function
 */
function AccessibleErrorValidTextElementsForDynamicInputs({
  semanticName,
  inputTextArray,
  areValidInputTexts,
  areInputTextsFocused,
  regexValidationProps,
  regexValidationFunction,
}: AccessibleErrorValidTextElementsForDynamicInputsProps): [
  React.JSX.Element[],
  React.JSX.Element[]
] {
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const errorTextElements = inputTextArray.map((inputText, index) => (
    <Text
      key={`${index}`}
      id={`${semanticName.split(' ').join('-')}-${index + 1}-input-note-error`}
      style={{
        display:
          areInputTextsFocused[index] && inputText && !areValidInputTexts[index]
            ? 'block'
            : 'none',
      }}
      color="red"
      w="100%"
      aria-live="polite"
    >
      {/* <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {regexValidationFunction
        ? `${semanticName[0].toUpperCase()}${semanticName.slice(1)} ${
            index + 1
          } - ${regexValidationFunction(regexValidationProps[index])}`
        : ''} */}
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbExclamationCircle
              color={
                colorScheme === 'light'
                  ? colors.red[primaryShade.light]
                  : colors.red[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">
              {regexValidationFunction
                ? `${semanticName[0].toUpperCase()}${semanticName.slice(1)} ${
                    index + 1
                  } - ${regexValidationFunction(regexValidationProps[index])}`
                : ''}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  ));

  const validTextElements = inputTextArray.map((inputText, index) => (
    <Text
      key={`${index}`}
      id={`${semanticName.split(' ').join('-')}-${index + 1}-input-note-valid`}
      style={{
        display:
          areInputTextsFocused[index] && inputText && areValidInputTexts[index]
            ? 'block'
            : 'none',
      }}
      color="green"
      w="100%"
      aria-live="polite"
    >
      {/* <FontAwesomeIcon icon={faCheck} />{' '}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} ${
        index + 1
      } is valid`} */}
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbCheck
              color={
                colorScheme === 'light'
                  ? colors.green[primaryShade.light]
                  : colors.green[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">{`${semanticName[0].toUpperCase()}${semanticName.slice(
              1
            )} ${index + 1} is valid`}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  ));

  return [errorTextElements, validTextElements];
}

type AccessibleErrorValidTextElementsForDynamicImageUploadsProps = {
  semanticName: string;
  images: File[];
  imagePreviews: (File | Blob)[];
  areValidImageSizes: boolean[];
  areValidImageKinds: boolean[];
  areValidImageTypes: boolean[];
  validationFunction?: ((image: File | Blob) => string) | undefined;
};

/**
 * @returns a tuple[error[], valid[]] of accessible text elements
 * @param AccessibleErrorValidTextElementsForDynamicImageUploadsProps - the object containing the input element
 * @property {object.semanticName} - the semantic label of input element (e.g. 'username', 'password', 'email'). Must be identical to the semanticName used in the creator info object passed to the creator functions
 * @property {object.images} - the array of images
 * @property {object.areValidImageSizes} - the array of booleans that indicate whether the image size is valid
 * @property {object.areValidImageKinds} - the array of booleans that indicate whether the image kind is valid
 * @property {object.areValidImageTypes} - the array of booleans that indicate whether the image type is valid
 * @property {object.validationFunction} - reference to the validation function
 */
function AccessibleErrorValidTextElementsForDynamicImageUploads({
  semanticName,
  images,
  imagePreviews,
  areValidImageSizes,
  areValidImageKinds,
  areValidImageTypes,
  validationFunction,
}: AccessibleErrorValidTextElementsForDynamicImageUploadsProps): [
  React.JSX.Element[],
  React.JSX.Element[]
] {
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const errorTextElements = images.map((image, index) => (
    <Text
      key={`error-${index}-${image.name}`}
      id={`${semanticName.split(' ').join('-')}
      }-input-note-error-${index}`}
      style={{
        display:
          image &&
          (!areValidImageSizes[index] ||
            !areValidImageKinds[index] ||
            !areValidImageTypes[index])
            ? 'block'
            : 'none',
      }}
      size="sm"
      color="red"
      w="100%"
      aria-live="polite"
    >
      {/* <FontAwesomeIcon icon={faInfoCircle} />{' '}
      {validationFunction
        ? `${
            image.name.length > 17
              ? `${image.name.slice(0, 17)}...`
              : image.name
          } is not a valid image - ${validationFunction(imagePreviews[index])}`
        : ''} */}
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbExclamationCircle
              color={
                colorScheme === 'light'
                  ? colors.red[primaryShade.light]
                  : colors.red[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">
              {validationFunction
                ? `${
                    image.name.length > 17
                      ? `${image.name.slice(0, 17)}...`
                      : image.name
                  } is not a valid image - ${validationFunction(
                    imagePreviews[index]
                  )}`
                : ''}
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  ));

  const validTextElements = images.map((image, index) => (
    <Text
      key={`valid-${index}-${image.name}`}
      id={`${semanticName.split(' ').join('-')}-input-note-valid-${index}`}
      style={{
        display:
          image &&
          areValidImageSizes[index] &&
          areValidImageKinds[index] &&
          areValidImageTypes[index]
            ? 'block'
            : 'none',
      }}
      size="sm"
      color="green"
      w="100%"
      aria-live="polite"
    >
      {/* <FontAwesomeIcon icon={faCheck} />{' '}      
      {`${image.name} is valid`} */}
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbCheck
              color={
                colorScheme === 'light'
                  ? colors.green[primaryShade.light]
                  : colors.green[primaryShade.dark]
              }
              size={20}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="left">
            <Text size="sm">{`${image.name} is valid`}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Text>
  ));

  return [errorTextElements, validTextElements];
}

type ReturnAccessibleSelectedDeselectedTextElementsProps = {
  semanticName: string;
  isSelected: boolean;
  selectedDescription?: string;
  deselectedDescription?: string;
  theme?: 'muted' | 'default';
};

function AccessibleSelectedDeselectedTextElements({
  semanticName,
  isSelected,
  selectedDescription = '',
  deselectedDescription = '',
  theme = 'default',
}: ReturnAccessibleSelectedDeselectedTextElementsProps): [
  React.JSX.Element,
  React.JSX.Element
] {
  const { colors } = useMantineTheme();
  const {
    globalState: {
      themeObject: { colorScheme, primaryShade },
    },
  } = useGlobalState();

  const themeColor =
    theme === 'default'
      ? colorScheme === 'light'
        ? colors.green[primaryShade.light]
        : colors.green[primaryShade.dark]
      : colorScheme === 'light'
      ? colors.gray[primaryShade.light]
      : colors.gray[primaryShade.dark];

  return [
    // selected text elem
    <Text
      id={`${semanticName.split(' ').join('-')}-selected`}
      style={{
        display: isSelected ? 'block' : 'none',
      }}
      color={themeColor}
      w="100%"
      aria-live="polite"
      size="xs"
    >
      {theme === 'default' ? (
        <FontAwesomeIcon
          icon={faCheck}
          color={
            colorScheme === 'light'
              ? colors.green[primaryShade.light]
              : colors.green[primaryShade.dark]
          }
        />
      ) : null}{' '}
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
            ? colors.red[
                colorScheme === 'light' ? primaryShade.light : primaryShade.dark
              ]
            : colors.gray[
                colorScheme === 'light' ? primaryShade.light : primaryShade.dark
              ]
          : colors.gray[
              colorScheme === 'light' ? primaryShade.light : primaryShade.dark
            ]
      }
      w="100%"
      aria-live="polite"
      size="xs"
    >
      {theme === 'default' ? (
        <FontAwesomeIcon
          icon={faInfoCircle}
          color={
            colorScheme === 'light'
              ? colors.red[primaryShade.light]
              : colors.red[primaryShade.dark]
          }
        />
      ) : null}{' '}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} deselected${
        deselectedDescription.length > 0 ? ` - ${deselectedDescription}` : ''
      }`}
    </Text>,
  ];
}

function returnAccessibleButtonElements(
  creatorInfoObjectArray: AccessibleButtonCreatorInfo[]
): React.JSX.Element[] {
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
): React.JSX.Element[] {
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
): React.JSX.Element[] {
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
): React.JSX.Element[] {
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
): React.JSX.Element[] {
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
): React.JSX.Element[] {
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

function returnAccessibleSliderInputElements(
  creatorInfoObjectArray: AccessibleSliderInputCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <SliderWrapper
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
  AccessibleErrorValidTextElements,
  AccessibleErrorValidTextElementsForDynamicImageUploads,
  AccessibleErrorValidTextElementsForDynamicInputs,
  returnAccessiblePasswordInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleRadioSingleInputElements,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
};
