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
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  MEDIUM_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  SPEAKER_INTERFACE_DATA,
  SPEAKER_TYPE_DATA,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  SpeakerInterface,
  SpeakerType,
} from '../types';

type CreateSpeakerProps = {
  areSpeakerFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areSpeakerFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isSpeakerColorFocused: boolean;
  isSpeakerColorValid: boolean;
  isSpeakerFrequencyResponseFocused: boolean;
  isSpeakerFrequencyResponseValid: boolean;
  isSpeakerTotalWattageFocused: boolean;
  isSpeakerTotalWattageValid: boolean;
  padding: MantineNumberSize;
  speakerColor: string;
  speakerFieldsAdditionalMap: Map<number, [string, string]>;
  speakerFrequencyResponse: string;
  speakerInterface: SpeakerInterface;
  speakerTotalWattage: string;
  speakerType: SpeakerType;
};

function CreateSpeaker({
  areSpeakerFieldsAdditionalMapFocused,
  areSpeakerFieldsAdditionalMapValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isSpeakerColorFocused,
  isSpeakerColorValid,
  isSpeakerFrequencyResponseFocused,
  isSpeakerFrequencyResponseValid,
  isSpeakerTotalWattageFocused,
  isSpeakerTotalWattageValid,
  padding,
  speakerColor,
  speakerFieldsAdditionalMap,
  speakerFrequencyResponse,
  speakerInterface,
  speakerTotalWattage,
  speakerType,
}: CreateSpeakerProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER TOTAL WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(speakerTotalWattage);

    createProductDispatch({
      type: createProductAction.setIsSpeakerTotalWattageValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSpeakerTotalWattageValid,
    createProductDispatch,
    speakerTotalWattage,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(speakerFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsSpeakerFrequencyResponseValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSpeakerFrequencyResponseValid,
    createProductDispatch,
    speakerFrequencyResponse,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(speakerColor);

    createProductDispatch({
      type: createProductAction.setIsSpeakerColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSpeakerColorValid,
    createProductDispatch,
    speakerColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingSpeakerFieldAdditional =
      speakerFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingSpeakerFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingSpeakerFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreSpeakerFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    speakerFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areSpeakerHardcodedInputsInError =
      !isSpeakerTotalWattageValid ||
      !isSpeakerFrequencyResponseValid ||
      !isSpeakerColorValid;

    const areSpeakerFieldsAdditionalMapInError = Array.from(
      areSpeakerFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areSpeakerInputsInError =
      areSpeakerHardcodedInputsInError || areSpeakerFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areSpeakerInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areSpeakerFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isSpeakerColorValid,
    isSpeakerFrequencyResponseValid,
    isSpeakerTotalWattageValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSpeakerTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: SPEAKER_TYPE_DATA,
      description: '',
      label: 'Speaker Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setSpeakerType,
          payload: event.currentTarget.value as SpeakerType,
        });
      },
      value: speakerType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER TOTAL WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [speakerTotalWattageInputErrorText, speakerTotalWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'speaker total wattage',
      inputText: speakerTotalWattage,
      isInputTextFocused: isSpeakerTotalWattageFocused,
      isValidInputText: isSpeakerTotalWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: speakerTotalWattage,
        contentKind: 'speaker total wattage',
      }),
    });

  // accessible text input element creator
  const [createdSpeakerTotalWattageTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: speakerTotalWattageInputErrorText,
          valid: speakerTotalWattageInputValidText,
        },
        inputText: speakerTotalWattage,
        isValidInputText: isSpeakerTotalWattageValid,
        label: 'Speaker Total Wattage (W)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerTotalWattageFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerTotalWattage,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerTotalWattageFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'speaker total wattage',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [
    speakerFrequencyResponseInputErrorText,
    speakerFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'speaker frequency response',
    inputText: speakerFrequencyResponse,
    isInputTextFocused: isSpeakerFrequencyResponseFocused,
    isValidInputText: isSpeakerFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: speakerFrequencyResponse,
      contentKind: 'speaker frequency response',
      maxLength: 14,
      minLength: 8,
    }),
  });

  // accessible text input element creator
  const [createdSpeakerFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: speakerFrequencyResponseInputErrorText,
          valid: speakerFrequencyResponseInputValidText,
        },
        inputText: speakerFrequencyResponse,
        isValidInputText: isSpeakerFrequencyResponseValid,
        label: 'Speaker Frequency Response',
        maxLength: 14,
        minLength: 8,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSpeakerFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: '00 Hz - 00 kHz or 0Hz-0kHz',
        required: true,
        semanticName: 'speaker frequency response',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [speakerColorInputErrorText, speakerColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'speaker color',
      inputText: speakerColor,
      isInputTextFocused: isSpeakerColorFocused,
      isValidInputText: isSpeakerColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: speakerColor,
        contentKind: 'speaker color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // accessible text input element creator
  const [createdSpeakerColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: speakerColorInputErrorText,
        valid: speakerColorInputValidText,
      },
      inputText: speakerColor,
      isValidInputText: isSpeakerColorValid,
      label: 'Speaker Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSpeakerColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSpeakerColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSpeakerColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter speaker color',
      required: true,
      semanticName: 'speaker color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSpeakerInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: SPEAKER_INTERFACE_DATA,
        description: '',
        label: 'Speaker Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerInterface,
            payload: event.currentTarget.value as SpeakerInterface,
          });
        },
        value: speakerInterface,
        required: true,
      },
    ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   SPEAKER ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddSpeakerFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });
        },
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SCREENREADER ERROR/VALID ELEMENTS TUPLE => FIELD NAMES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field name
  const speakerFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(speakerFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      speakerFieldsAdditionalMapKeysInputErrorText,
      speakerFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areSpeakerFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      speakerFieldsAdditionalMapKeysInputErrorText,
      speakerFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SCREENREADER ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const speakerFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(speakerFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      speakerFieldsAdditionalMapValuesInputErrorText,
      speakerFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areSpeakerFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      speakerFieldsAdditionalMapValuesInputErrorText,
      speakerFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdSpeakerFieldsAdditionalMapTextInputElements = Array.from(
    speakerFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const speakerFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            speakerFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            speakerFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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
            type: createProductAction.setSpeakerFieldsAdditionalMap,
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
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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
    const speakerFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            speakerFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            speakerFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areSpeakerFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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
            type: createProductAction.setSpeakerFieldsAdditionalMap,
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
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
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
      createdSpeakerFieldsAdditionalMapKeysTextAreaInput,
      createdSpeakerFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      speakerFieldsAdditionalMapKeysTextInputCreatorInfo,
      speakerFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSpeakerFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSpeakerFieldsAdditionalMapValid,
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
      <Stack key={`speakerFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Speaker field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdSpeakerFieldsAdditionalMapKeysTextAreaInput}
          {createdSpeakerFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displaySpeakerFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${speakerFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddSpeakerFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displaySpeakerSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Speaker Specifications</Title>
        {displaySpeakerFieldsAdditionalMapButton}
      </Group>
      {createdSpeakerTypeSelectInput}
      {createdSpeakerTotalWattageTextInput}
      {createdSpeakerFrequencyResponseTextInput}
      {createdSpeakerColorTextInput}
      {createdSpeakerInterfaceSelectInput}
      {createdSpeakerFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displaySpeakerSpecificationsInputs;
}

export default CreateSpeaker;
