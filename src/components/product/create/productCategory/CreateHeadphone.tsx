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
  returnSmallIntegerValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  HEADPHONE_INTERFACE_DATA,
  HEADPHONE_TYPE_DATA,
  MEDIUM_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  HeadphoneInterface,
  HeadphoneType,
} from '../types';

type CreateHeadphoneProps = {
  areHeadphoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>;
  areHeadphoneFieldsAdditionalValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  headphoneColor: string;
  headphoneDriver: string;
  headphoneFieldsAdditional: Map<number, [string, string]>;
  headphoneFrequencyResponse: string;
  headphoneImpedance: string;
  headphoneInterface: HeadphoneInterface;
  headphoneType: HeadphoneType;
  isHeadphoneColorFocused: boolean;
  isHeadphoneColorValid: boolean;
  isHeadphoneDriverFocused: boolean;
  isHeadphoneDriverValid: boolean;
  isHeadphoneFrequencyResponseFocused: boolean;
  isHeadphoneFrequencyResponseValid: boolean;
  isHeadphoneImpedanceFocused: boolean;
  isHeadphoneImpedanceValid: boolean;
  padding: MantineNumberSize;
};

function CreateHeadphone({
  areHeadphoneFieldsAdditionalFocused,
  areHeadphoneFieldsAdditionalValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  headphoneColor,
  headphoneDriver,
  headphoneFieldsAdditional,
  headphoneFrequencyResponse,
  headphoneImpedance,
  headphoneInterface,
  headphoneType,
  isHeadphoneColorFocused,
  isHeadphoneColorValid,
  isHeadphoneDriverFocused,
  isHeadphoneDriverValid,
  isHeadphoneFrequencyResponseFocused,
  isHeadphoneFrequencyResponseValid,
  isHeadphoneImpedanceFocused,
  isHeadphoneImpedanceValid,
  padding,
}: CreateHeadphoneProps) {
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE DRIVER
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(headphoneDriver);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneDriverValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsHeadphoneDriverValid,
    createProductDispatch,
    headphoneDriver,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = FREQUENCY_RESPONSE_REGEX.test(headphoneFrequencyResponse);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneFrequencyResponseValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsHeadphoneFrequencyResponseValid,
    createProductDispatch,
    headphoneFrequencyResponse,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE IMPEDANCE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(headphoneImpedance);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneImpedanceValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsHeadphoneImpedanceValid,
    createProductDispatch,
    headphoneImpedance,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(headphoneColor);

    createProductDispatch({
      type: createProductAction.setIsHeadphoneColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsHeadphoneColorValid,
    createProductDispatch,
    headphoneColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingHeadphoneFieldAdditional =
      headphoneFieldsAdditional.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingHeadphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingHeadphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreHeadphoneFieldsAdditionalValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    headphoneFieldsAdditional,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    const areHeadphoneInputsHardcodedInError =
      !isHeadphoneDriverValid ||
      !isHeadphoneFrequencyResponseValid ||
      !isHeadphoneImpedanceValid ||
      !isHeadphoneColorValid;

    const areHeadphoneInputsUserDefinedInError = Array.from(
      areHeadphoneFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const areHeadphoneInputsInError =
      areHeadphoneInputsHardcodedInError ||
      areHeadphoneInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areHeadphoneInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areHeadphoneFieldsAdditionalValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isHeadphoneColorValid,
    isHeadphoneDriverValid,
    isHeadphoneFrequencyResponseValid,
    isHeadphoneImpedanceValid,
  ]);

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdHeadphoneTypeSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: HEADPHONE_TYPE_DATA,
        description: 'Select headphone type',
        label: 'Headphone Type',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneType,
            payload: event.currentTarget.value as HeadphoneType,
          });
        },
        value: headphoneType,
        required: true,
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE DRIVER
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [headphoneDriverInputErrorText, headphoneDriverInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone driver',
      inputText: headphoneDriver,
      isInputTextFocused: isHeadphoneDriverFocused,
      isValidInputText: isHeadphoneDriverValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: headphoneDriver,
        contentKind: 'headphone driver',
      }),
    });

  // text input element creator
  const [createdHeadphoneDriverTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: headphoneDriverInputErrorText,
        valid: headphoneDriverInputValidText,
      },
      inputText: headphoneDriver,
      isValidInputText: isHeadphoneDriverValid,
      label: 'Headphone Driver (mm)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneDriverFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneDriver,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneDriverFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 00',
      required: true,
      semanticName: 'headphone driver',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE FREQUENCY RESPONSE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [
    headphoneFrequencyResponseInputErrorText,
    headphoneFrequencyResponseInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'headphone frequency response',
    inputText: headphoneFrequencyResponse,
    isInputTextFocused: isHeadphoneFrequencyResponseFocused,
    isValidInputText: isHeadphoneFrequencyResponseValid,
    regexValidationText: returnFrequencyResponseValidationText({
      content: headphoneFrequencyResponse,
      contentKind: 'headphone frequency response',
      maxLength: 14,
      minLength: 12,
    }),
  });

  // text input element creator
  const [createdHeadphoneFrequencyResponseTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: headphoneFrequencyResponseInputErrorText,
          valid: headphoneFrequencyResponseInputValidText,
        },
        inputText: headphoneFrequencyResponse,
        isValidInputText: isHeadphoneFrequencyResponseValid,
        label: 'Headphone Frequency Response (Hz - kHz)',
        maxLength: 14,
        minLength: 12,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneFrequencyResponseFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFrequencyResponse,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneFrequencyResponseFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00 Hz - 00 kHz or 0Hz-0kHz',
        required: true,
        semanticName: 'headphone frequency response',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE IMPEDANCE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [headphoneImpedanceInputErrorText, headphoneImpedanceInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone impedance',
      inputText: headphoneImpedance,
      isInputTextFocused: isHeadphoneImpedanceFocused,
      isValidInputText: isHeadphoneImpedanceValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: headphoneImpedance,
        contentKind: 'headphone impedance',
      }),
    });

  // text input element creator
  const [createdHeadphoneImpedanceTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: headphoneImpedanceInputErrorText,
          valid: headphoneImpedanceInputValidText,
        },
        inputText: headphoneImpedance,
        isValidInputText: isHeadphoneImpedanceValid,
        label: 'Headphone Impedance (Ω)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneImpedanceFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneImpedance,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsHeadphoneImpedanceFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'headphone impedance',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible error/valid text elements
  const [headphoneColorInputErrorText, headphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'headphone color',
      inputText: headphoneColor,
      isInputTextFocused: isHeadphoneColorFocused,
      isValidInputText: isHeadphoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: headphoneColor,
        contentKind: 'headphone color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // text input element creator
  const [createdHeadphoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: headphoneColorInputErrorText,
        valid: headphoneColorInputValidText,
      },
      inputText: headphoneColor,
      isValidInputText: isHeadphoneColorValid,
      label: 'Headphone Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setHeadphoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsHeadphoneColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter headphone color',
      required: true,
      semanticName: 'headphone color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    HEADPHONE INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdHeadphoneInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: HEADPHONE_INTERFACE_DATA,
        description: '',
        label: 'Headphone Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneInterface,
            payload: event.currentTarget.value as HeadphoneInterface,
          });
        },
        value: headphoneInterface,
        required: true,
      },
    ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   HEADPHONE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddHeadphoneFieldsAdditionalButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditional,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalValid,
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
  const headphoneFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalKeysInputErrorText,
      headphoneFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      headphoneFieldsAdditionalKeysInputErrorText,
      headphoneFieldsAdditionalKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const headphoneFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalValuesInputErrorText,
      headphoneFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      headphoneFieldsAdditionalValuesInputErrorText,
      headphoneFieldsAdditionalValuesInputValidText,
    ];
  });

  const createdHeadphoneFieldsAdditionalTextInputElements = Array.from(
    headphoneFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const headphoneFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: headphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid: headphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areHeadphoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
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
            type: createProductAction.setHeadphoneFieldsAdditional,
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
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
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
    const headphoneFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            headphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid:
            headphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areHeadphoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
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
            type: createProductAction.setHeadphoneFieldsAdditional,
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
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
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
      createdHeadphoneFieldsAdditionalKeysTextAreaInput,
      createdHeadphoneFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      headphoneFieldsAdditionalKeysTextInputCreatorInfo,
      headphoneFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalValid,
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
      <Stack key={`headphoneFieldsAdditional-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Headphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdHeadphoneFieldsAdditionalKeysTextAreaInput}
          {createdHeadphoneFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displayHeadphoneFieldsAdditionalButton = (
    <Tooltip
      label={`Add new additional field ${headphoneFieldsAdditional.size + 1}`}
    >
      <Group>{createdAddHeadphoneFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displayHeadphoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Headphone Specifications</Title>
        {displayHeadphoneFieldsAdditionalButton}
      </Group>
      {createdHeadphoneTypeSelectInput}
      {createdHeadphoneDriverTextInput}
      {createdHeadphoneFrequencyResponseTextInput}
      {createdHeadphoneImpedanceTextInput}
      {createdHeadphoneColorTextInput}
      {createdHeadphoneInterfaceSelectInput}
      {createdHeadphoneFieldsAdditionalTextInputElements}
    </Group>
  );

  return displayHeadphoneSpecificationsInputs;
}

export default CreateHeadphone;
