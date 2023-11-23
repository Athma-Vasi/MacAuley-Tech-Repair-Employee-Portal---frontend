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
  areHeadphoneFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areHeadphoneFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  headphoneColor: string;
  headphoneDriver: string;
  headphoneFieldsAdditionalMap: Map<number, [string, string]>;
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
  areHeadphoneFieldsAdditionalMapFocused,
  areHeadphoneFieldsAdditionalMapValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  headphoneColor,
  headphoneDriver,
  headphoneFieldsAdditionalMap,
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
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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
      headphoneFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingHeadphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingHeadphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    headphoneFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areHeadphoneInputsHardcodedInError =
      !isHeadphoneDriverValid ||
      !isHeadphoneFrequencyResponseValid ||
      !isHeadphoneImpedanceValid ||
      !isHeadphoneColorValid;

    const areHeadphoneInputsUserDefinedInError = Array.from(
      areHeadphoneFieldsAdditionalMapValid
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
    areHeadphoneFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isHeadphoneColorValid,
    isHeadphoneDriverValid,
    isHeadphoneFrequencyResponseValid,
    isHeadphoneImpedanceValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

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

  // error/valid text elements
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

  // screenreader accessible text input element
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

  // error/valid text elements
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

  // screenreader accessible text input element
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

  // error/valid text elements
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

  // screenreader accessible text input element
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

  // error/valid text elements
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

  // screenreader accessible text input element
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
  const [createdAddHeadphoneFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional Headphone field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
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
  const headphoneFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalMapKeysInputErrorText,
      headphoneFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      headphoneFieldsAdditionalMapKeysInputErrorText,
      headphoneFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const headphoneFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(headphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      headphoneFieldsAdditionalMapValuesInputErrorText,
      headphoneFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areHeadphoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      headphoneFieldsAdditionalMapValuesInputErrorText,
      headphoneFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdHeadphoneFieldsAdditionalMapTextInputElements = Array.from(
    headphoneFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const headphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            headphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            headphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
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
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const headphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            headphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            headphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areHeadphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
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
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
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
      createdHeadphoneFieldsAdditionalMapKeysTextAreaInput,
      createdHeadphoneFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      headphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
      headphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setHeadphoneFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreHeadphoneFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Headphone field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Headphone field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack
        key={`headphoneFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Headphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdHeadphoneFieldsAdditionalMapKeysTextAreaInput}
          {createdHeadphoneFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayHeadphoneFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Headphone field ${
        headphoneFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddHeadphoneFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayHeadphoneSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Headphone Specifications</Title>
        {displayHeadphoneFieldsAdditionalMapButton}
      </Group>
      {createdHeadphoneTypeSelectInput}
      {createdHeadphoneDriverTextInput}
      {createdHeadphoneFrequencyResponseTextInput}
      {createdHeadphoneImpedanceTextInput}
      {createdHeadphoneColorTextInput}
      {createdHeadphoneInterfaceSelectInput}
      {createdHeadphoneFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayHeadphoneSpecificationsInputs;
}

export default CreateHeadphone;
