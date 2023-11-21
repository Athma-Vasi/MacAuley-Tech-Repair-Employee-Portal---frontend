import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Highlight,
  MantineNumberSize,
  ScrollArea,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import React, { CSSProperties, ReactNode } from 'react';
import { MdCalendarMonth, MdDateRange } from 'react-icons/md';
import {
  TbArrowDown,
  TbArrowUp,
  TbCheck,
  TbExclamationCircle,
} from 'react-icons/tb';

import type {
  AccessibleButtonCreatorInfo,
  AccessibleCheckboxGroupInputCreatorInfo,
  AccessibleCheckboxSingleInputCreatorInfo,
  AccessibleDateTimeInputCreatorInfo,
  AccessibleImageCreatorInfo,
  AccessibleNavLinkCreatorInfo,
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
  ImageWrapper,
  NativeSelectWrapper,
  NavLinkWrapper,
  PasswordInputWrapper,
  PhoneTextInputWrapper,
  RadioGroupInputsWrapper,
  RadioSingleInputWrapper,
  SliderWrapper,
  TextAreaInputWrapper,
  TextInputWrapper,
  TextWrapper,
} from '../components/wrappers';
import { COLORS_SWATCHES, PROPERTY_DESCRIPTOR } from '../constants/data';
import { useGlobalState } from '../hooks';
import {
  formatDate,
  RegexValidationProps,
  replaceLastCommaWithAnd,
  returnThemeColors,
  splitCamelCase,
} from '../utils';
import { RiCalendarLine } from 'react-icons/ri';

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
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

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
            <TbExclamationCircle color={redColorShade} size={22} />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="right">
            <Text>{regexValidationText}</Text>
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
      color={greenColorShade}
      w="100%"
      aria-live="polite"
    >
      <Grid columns={14}>
        <Grid.Col span={2}>
          <Group position="center">
            <TbCheck color={greenColorShade} size={22} />
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
  const {
    globalState: { themeObject },
  } = useGlobalState();

  const {
    generalColors: {
      greenColorShade,
      textColor,
      grayColorShade,
      redColorShade,
    },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

  return [
    // selected text elem
    <Text
      id={`${semanticName.split(' ').join('-')}-selected`}
      style={{ display: isSelected ? 'block' : 'none' }}
      color={theme === 'muted' ? textColor : greenColorShade}
      w="100%"
      aria-live="polite"
    >
      {theme === 'default' ? (
        <FontAwesomeIcon icon={faCheck} color={greenColorShade} />
      ) : null}{' '}
      {`${semanticName[0].toUpperCase()}${semanticName.slice(1)} selected${
        selectedDescription.length > 0 ? ` - ${selectedDescription}` : ''
      }`}
    </Text>,
    // deselected text elem
    <Text
      id={`${semanticName.split(' ').join('-')}-deselected`}
      style={{ display: !isSelected ? 'block' : 'none' }}
      color={
        theme === 'default'
          ? deselectedDescription.length > 0
            ? redColorShade
            : textColor
          : grayColorShade
      }
      w="100%"
      aria-live="polite"
    >
      {theme === 'default' ? (
        <FontAwesomeIcon icon={faInfoCircle} color={redColorShade} />
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

function returnAccessibleImageElements(
  creatorInfoObjectArray: AccessibleImageCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <ImageWrapper
      key={`${index}${creatorInfoObject.alt}`}
      creatorInfoObject={creatorInfoObject}
    />
  ));
}

function returnAccessibleNavLinkElements(
  creatorInfoObjectArray: AccessibleNavLinkCreatorInfo[]
) {
  return creatorInfoObjectArray.map((creatorInfoObject, index) => (
    <NavLinkWrapper
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

function returnHighlightedText({
  fieldValue,
  queryValuesArray,
  textHighlightColor,
}: {
  fieldValue: string | boolean | number | string[] | boolean[] | number[];
  queryValuesArray: string[];
  textHighlightColor: string;
}) {
  const stringifiedText =
    fieldValue === true
      ? 'Yes'
      : fieldValue === false
      ? 'No'
      : Array.isArray(fieldValue)
      ? replaceLastCommaWithAnd(
          fieldValue
            ?.map(
              (value) =>
                value.toString().charAt(0).toUpperCase() +
                value.toString().slice(1)
            )
            .join(', ')
        )
      : `${fieldValue?.toString().charAt(0).toUpperCase()}${fieldValue
          ?.toString()
          .slice(1)}`;

  // regex to determine if formattedValue has any terms in queryValuesArray
  const regex = queryValuesArray.length
    ? new RegExp(
        queryValuesArray
          .filter((value) => value) // remove empty strings
          .flatMap((value) => value.split(' ')) // split strings into words
          .join('|'),
        'gi'
      )
    : null;

  let returnedText: React.JSX.Element | React.JSX.Element[] | null = null;
  if (regex?.test(stringifiedText)) {
    returnedText = stringifiedText.split(' ').map((text, index) => {
      // word that has below symbol is also highlighted
      const wordWithoutPunctuation = text
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
        .toLowerCase()
        .split(' ');

      const flattenedQueryValuesArray = queryValuesArray
        .filter((value) => value) // remove empty strings
        .flatMap((value) => value.toLowerCase().split(' ')); // split strings into words

      // test with regex
      const isQueryArrayIncludesWord = flattenedQueryValuesArray.some(
        (queryValue) => {
          const regex = new RegExp(queryValue, 'gi');
          return regex.test(wordWithoutPunctuation.join(' '));
        }
      );

      if (isQueryArrayIncludesWord) {
        return (
          <Flex>
            <Highlight
              key={`${text}-${index}`}
              highlightStyles={{ backgroundColor: textHighlightColor }}
              highlight={text}
            >
              {text}
            </Highlight>
          </Flex>
        );
      }

      return <Text key={`${text}-${index}`}>{text}</Text>;
    });
  } else {
    returnedText = <Text>{stringifiedText}</Text>;
  }

  return returnedText;
}

type ReturnScrollableDocumentInfoInput = {
  borderColor: string;
  document: Record<string, any>;
  excludeKeys?: string[];
  fieldNamesWithDateValues: Set<string>;
  heading?: string;
  queryValuesArray: string[];
  rowGap: MantineNumberSize;
  scrollBarStyle: Record<string, any>;
  scrollViewportHeight?: number;
  textHighlightColor: string;
};

function returnScrollableDocumentInfo({
  borderColor,
  document,
  excludeKeys = [],
  fieldNamesWithDateValues,
  heading = 'Document Details:',
  queryValuesArray,
  rowGap,
  scrollBarStyle,
  scrollViewportHeight = 150,
  textHighlightColor,
}: ReturnScrollableDocumentInfoInput): React.JSX.Element {
  const [createdShowMoreButton, createdHideButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Show',
        leftIcon: <TbArrowDown />,
        buttonType: 'button',
        semanticDescription: 'Reveal more information',
        semanticName: 'Show more',
      },
      {
        buttonLabel: 'Hide',
        leftIcon: <TbArrowUp />,
        buttonType: 'button',
        semanticDescription: 'Hide revealed information',
        semanticName: 'Hide',
      },
    ]);

  const filteredDocumentTuples = Object.entries(document).filter(
    ([key]) => !excludeKeys.includes(key)
  );

  const displayScrollableDocument = (
    <Stack w="100%">
      <Text size="md">{heading}</Text>
      <ScrollArea
        p={rowGap}
        type="hover"
        offsetScrollbars
        styles={() => scrollBarStyle}
        style={{ border: borderColor, borderRadius: 4 }}
      >
        <Stack w="100%" h={scrollViewportHeight}>
          {filteredDocumentTuples.map(([key, value], index) => {
            const stringifiedKey = String(key);
            const splitCamelCaseKey =
              stringifiedKey === '_id'
                ? 'Document Id'
                : splitCamelCase(stringifiedKey);

            const formattedDateValue = fieldNamesWithDateValues.has(
              stringifiedKey
            )
              ? formatDate({
                  date: value,
                  formatOptions: {
                    dateStyle: 'full',
                    localeMatcher: 'best fit',
                    formatMatcher: 'best fit',
                  },
                  locale: 'en-US',
                })
              : key === 'createdAt' || key === 'updatedAt'
              ? formatDate({
                  date: value,
                  formatOptions: {
                    dateStyle: 'full',
                    timeStyle: 'long',
                    hour12: false,
                  },
                  locale: 'en-US',
                })
              : value;

            const highlightedText = returnHighlightedText({
              fieldValue: formattedDateValue,
              queryValuesArray,
              textHighlightColor,
            });

            const displayFieldValueRow = (
              <Grid
                columns={10}
                key={`${splitCamelCaseKey}-${value}-${index}`}
                style={{ borderBottom: borderColor }}
                gutter={rowGap}
                w="100%"
              >
                <Grid.Col span={4}>
                  <Text>{splitCamelCaseKey}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Spoiler
                    maxHeight={70}
                    showLabel={createdShowMoreButton}
                    hideLabel={createdHideButton}
                  >
                    <Flex wrap="wrap" gap={4}>
                      {highlightedText}
                    </Flex>
                  </Spoiler>
                </Grid.Col>
              </Grid>
            );

            return displayFieldValueRow;
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );

  return displayScrollableDocument;
}

export {
  AccessibleErrorValidTextElements,
  AccessibleErrorValidTextElementsForDynamicImageUploads,
  AccessibleErrorValidTextElementsForDynamicInputs,
  AccessibleSelectedDeselectedTextElements,
  returnAccessibleButtonElements,
  returnAccessibleCheckboxGroupInputsElements,
  returnAccessibleCheckboxSingleInputElements,
  returnAccessibleDateTimeElements,
  returnAccessibleDynamicRadioGroupInputsElements,
  returnAccessibleDynamicRadioSingleInputElements,
  returnAccessibleDynamicTextAreaInputElements,
  returnAccessibleDynamicTextInputElements,
  returnAccessibleImageElements,
  returnAccessibleNavLinkElements,
  returnAccessiblePasswordInputElements,
  returnAccessiblePhoneNumberTextInputElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleRadioSingleInputElements,
  returnAccessibleSelectInputElements,
  returnAccessibleSliderInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
  returnHighlightedText,
  returnScrollableDocumentInfo,
};
