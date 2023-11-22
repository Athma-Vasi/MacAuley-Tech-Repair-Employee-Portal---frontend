import {
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ChangeEvent, MouseEvent, useEffect } from 'react';
import { TbPlus, TbTrash } from 'react-icons/tb';

import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from '../../../../jsxCreators';
import {
  returnColorVariantValidationText,
  returnFrequencyResponseValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
  OBJECT_KEY_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
} from '../types';

type CreateMicrophoneProps = {
  areMicrophoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>;
  areMicrophoneFieldsAdditionalValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isMicrophoneColorFocused: boolean;
  isMicrophoneColorValid: boolean;
  isMicrophoneFrequencyResponseFocused: boolean;
  isMicrophoneFrequencyResponseValid: boolean;
  microphoneColor: string;
  microphoneFieldsAdditional: Map<number, [string, string]>;
  microphoneFrequencyResponse: string;
  microphoneInterface: MicrophoneInterface;
  microphonePolarPattern: MicrophonePolarPattern;
  microphoneType: MicrophoneType;
  padding: MantineNumberSize;
};

function CreateMicrophone({
  areMicrophoneFieldsAdditionalFocused,
  areMicrophoneFieldsAdditionalValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isMicrophoneColorFocused,
  isMicrophoneColorValid,
  isMicrophoneFrequencyResponseFocused,
  isMicrophoneFrequencyResponseValid,
  microphoneColor,
  microphoneFieldsAdditional,
  microphoneFrequencyResponse,
  microphoneInterface,
  microphonePolarPattern,
  microphoneType,
  padding,
}: CreateMicrophoneProps) {
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(microphoneColor);

    createProductDispatch({
      type: createProductAction.setIsMicrophoneColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMicrophoneColorValid,
    createProductDispatch,
    microphoneColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(microphoneFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsMicrophoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMicrophoneFrequencyResponseValid,
    createProductDispatch,
    microphoneFrequencyResponse,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingMicrophoneFieldAdditional =
      microphoneFieldsAdditional.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingMicrophoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMicrophoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMicrophoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMicrophoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreMicrophoneFieldsAdditionalValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    microphoneFieldsAdditional,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // select inputs are not included as they always have a default value
    // (required) inputs with empty string count as error

    const areMicrophoneInputsHardcodedInError =
      !isMicrophoneColorValid || !isMicrophoneFrequencyResponseValid;

    const areMicrophoneInputsUserDefinedInError = Array.from(
      areMicrophoneFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const areMicrophoneInputsInError =
      areMicrophoneInputsHardcodedInError ||
      areMicrophoneInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areMicrophoneInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areMicrophoneFieldsAdditionalValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isMicrophoneColorValid,
    isMicrophoneFrequencyResponseValid,
    microphoneInterface,
    microphonePolarPattern,
    microphoneType,
  ]);

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMicrophoneTypeSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_TYPE_DATA,
        description: '',
        label: 'Microphone Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneType,
            payload: event.currentTarget.value as MicrophoneType,
          });
        },
        value: microphoneType,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [microphoneColorInputErrorText, microphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'microphone color',
      inputText: microphoneColor,
      isInputTextFocused: isMicrophoneColorFocused,
      isValidInputText: isMicrophoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: microphoneColor,
        contentKind: 'microphone color',
      }),
    });

  // text input element creator
  const [createdMicrophoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: microphoneColorInputErrorText,
        valid: microphoneColorInputValidText,
      },
      inputText: microphoneColor,
      isValidInputText: isMicrophoneColorValid,
      label: 'Microphone Color',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMicrophoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMicrophoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMicrophoneColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter microphone color',
      required: true,
      semanticName: 'microphone color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMicrophoneInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_INTERFACE_DATA,
        description: '',
        label: 'Microphone Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneInterface,
            payload: event.currentTarget.value as MicrophoneInterface,
          });
        },
        value: microphoneInterface,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE POLAR PATTERN
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMicrophonePolarPatternSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MICROPHONE_POLAR_PATTERN_DATA,
        description: '',
        label: 'Microphone Polar Pattern',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophonePolarPattern,
            payload: event.currentTarget.value as MicrophonePolarPattern,
          });
        },
        value: microphonePolarPattern,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MICROPHONE FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [
    microphoneFrequencyResponseInputErrorText,
    microphoneFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'microphone frequency response',
    inputText: microphoneFrequencyResponse,
    isInputTextFocused: isMicrophoneFrequencyResponseFocused,
    isValidInputText: isMicrophoneFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: microphoneFrequencyResponse,
      contentKind: 'microphone frequency response',
    }),
  });

  // text input element creator
  const [createdMicrophoneFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: microphoneFrequencyResponseInputErrorText,
          valid: microphoneFrequencyResponseInputValidText,
        },
        inputText: microphoneFrequencyResponse,
        isValidInputText: isMicrophoneFrequencyResponseValid,
        label: 'Microphone Frequency Response (Hz-kHz)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: 'Enter microphone frequency response',
        required: true,
        semanticName: 'microphone frequency response',
      },
    ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   MICROPHONE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddMicrophoneFieldsAdditionalButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditional,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD NAMES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field name
  const microphoneFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(microphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      microphoneFieldsAdditionalKeysInputErrorText,
      microphoneFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMicrophoneFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areMicrophoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      microphoneFieldsAdditionalKeysInputErrorText,
      microphoneFieldsAdditionalKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const microphoneFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(microphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      microphoneFieldsAdditionalValuesInputErrorText,
      microphoneFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMicrophoneFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areMicrophoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      microphoneFieldsAdditionalValuesInputErrorText,
      microphoneFieldsAdditionalValuesInputValidText,
    ];
  });

  const createdMicrophoneFieldsAdditionalTextInputElements = Array.from(
    microphoneFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const microphoneFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            microphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid:
            microphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMicrophoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'key',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'key',
            },
          });
        },
        placeholder: 'Enter additional field name',
        required: true,
        semanticName: `additional field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const microphoneFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            microphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid:
            microphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areMicrophoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: false,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditional,
            payload: {
              operation: 'update',
              data: event.currentTarget.value,
              index: mapKey,
              kind: 'value',
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'update',
              data: true,
              index: mapKey,
              kind: 'value',
            },
          });
        },
        placeholder: 'Enter additional field value',
        required: true,
        semanticName: `additional field value ${mapKey + 1}`,
      };

    const [
      createdMicrophoneFieldsAdditionalKeysTextAreaInput,
      createdMicrophoneFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      microphoneFieldsAdditionalKeysTextInputCreatorInfo,
      microphoneFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMicrophoneFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMicrophoneFieldsAdditionalValid,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: -1,
          });
        },
        leftIcon: <TbTrash />,
        semanticDescription: `Delete additional field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`microphoneFieldsAdditional-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Microphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMicrophoneFieldsAdditionalKeysTextAreaInput}
          {createdMicrophoneFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displayMicrophoneFieldsAdditionalButton = (
    <Tooltip
      label={`Add new additional field ${microphoneFieldsAdditional.size + 1}`}
    >
      <Group>{createdAddMicrophoneFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displayMicrophoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Microphone Specifications</Title>
        {displayMicrophoneFieldsAdditionalButton}
      </Group>
      {createdMicrophoneTypeSelectInput}
      {createdMicrophoneColorTextInput}
      {createdMicrophoneInterfaceSelectInput}
      {createdMicrophonePolarPatternSelectInput}
      {createdMicrophoneFrequencyResponseTextInput}
      {createdMicrophoneFieldsAdditionalTextInputElements}
    </Group>
  );

  return displayMicrophoneSpecificationsInputs;
}

export default CreateMicrophone;
