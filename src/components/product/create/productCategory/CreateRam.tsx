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
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnRamTimingValidationText,
  returnRamVoltageValidationText,
  returnSmallIntegerValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  OBJECT_KEY_REGEX,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  RAM_VOLTAGE_REGEX,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  MemoryType,
  MemoryUnit,
} from '../types';

type CreateRamProps = {
  areRamFieldsAdditionalFocused: Map<number, [boolean, boolean]>;
  areRamFieldsAdditionalValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isRamColorFocused: boolean;
  isRamColorValid: boolean;
  isRamDataRateFocused: boolean;
  isRamDataRateValid: boolean;
  isRamModulesCapacityFocused: boolean;
  isRamModulesCapacityValid: boolean;
  isRamModulesQuantityFocused: boolean;
  isRamModulesQuantityValid: boolean;
  isRamTimingFocused: boolean;
  isRamTimingValid: boolean;
  isRamVoltageFocused: boolean;
  isRamVoltageValid: boolean;
  padding: MantineNumberSize;
  ramColor: string;
  ramDataRate: string;
  ramFieldsAdditional: Map<number, [string, string]>;
  ramModulesCapacity: string;
  ramModulesCapacityUnit: MemoryUnit;
  ramModulesQuantity: string;
  ramTiming: string;
  ramType: MemoryType;
  ramVoltage: string;
};

function CreateRam({
  areRamFieldsAdditionalFocused,
  areRamFieldsAdditionalValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isRamColorFocused,
  isRamColorValid,
  isRamDataRateFocused,
  isRamDataRateValid,
  isRamModulesCapacityFocused,
  isRamModulesCapacityValid,
  isRamModulesQuantityFocused,
  isRamModulesQuantityValid,
  isRamTimingFocused,
  isRamTimingValid,
  isRamVoltageFocused,
  isRamVoltageValid,
  padding,
  ramColor,
  ramDataRate,
  ramFieldsAdditional,
  ramModulesCapacity,
  ramModulesCapacityUnit,
  ramModulesQuantity,
  ramTiming,
  ramType,
  ramVoltage,
}: CreateRamProps) {
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM DATA RATE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(ramDataRate);

    createProductDispatch({
      type: createProductAction.setIsRamDataRateValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsRamDataRateValid,
    createProductDispatch,
    ramDataRate,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM MODULES QUANTITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(ramModulesQuantity);

    createProductDispatch({
      type: createProductAction.setIsRamModulesQuantityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsRamModulesQuantityValid,
    createProductDispatch,
    ramModulesQuantity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM MODULES CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(ramModulesCapacity);

    createProductDispatch({
      type: createProductAction.setIsRamModulesCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsRamModulesCapacityValid,
    createProductDispatch,
    ramModulesCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM VOLTAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = RAM_VOLTAGE_REGEX.test(ramVoltage);

    createProductDispatch({
      type: createProductAction.setIsRamVoltageValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsRamVoltageValid,
    createProductDispatch,
    ramVoltage,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(ramColor);

    createProductDispatch({
      type: createProductAction.setIsRamColorValid,
      payload: isValid,
    });
  }, [createProductAction.setIsRamColorValid, createProductDispatch, ramColor]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM TIMING
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = RAM_TIMING_REGEX.test(ramTiming);

    createProductDispatch({
      type: createProductAction.setIsRamTimingValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsRamTimingValid,
    createProductDispatch,
    ramTiming,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingRamFieldAdditional = ramFieldsAdditional.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingRamFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingRamFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreRamFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreRamFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreRamFieldsAdditionalValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    ramFieldsAdditional,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areRamInputsHardcodedInError =
      !isRamDataRateValid ||
      !isRamModulesQuantityValid ||
      !isRamModulesCapacityValid ||
      !isRamVoltageValid ||
      !isRamColorValid ||
      !isRamTimingValid;

    const areRamInputsUserDefinedInError = Array.from(
      areRamFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const areRamInputsInError =
      areRamInputsHardcodedInError || areRamInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areRamInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areRamFieldsAdditionalValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isRamColorValid,
    isRamDataRateValid,
    isRamModulesCapacityValid,
    isRamModulesQuantityValid,
    isRamTimingValid,
    isRamVoltageValid,
  ]);

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM DATA RATE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramDataRateInputErrorText, ramDataRateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram data rate',
      inputText: ramDataRate,
      isInputTextFocused: isRamDataRateFocused,
      isValidInputText: isRamDataRateValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: ramDataRate,
        contentKind: 'ram data rate',
      }),
    });

  // accessible text input element creator
  const [createdRamDataRateTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramDataRateInputErrorText,
        valid: ramDataRateInputValidText,
      },
      inputText: ramDataRate,
      isValidInputText: isRamDataRateValid,
      label: 'RAM Data Rate (MT/s)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamDataRateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamDataRate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamDataRateFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0000',
      required: true,
      semanticName: 'ram data rate',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM MODULES QUANTITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramModulesQuantityInputErrorText, ramModulesQuantityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram modules quantity',
      inputText: ramModulesQuantity,
      isInputTextFocused: isRamModulesQuantityFocused,
      isValidInputText: isRamModulesQuantityValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: ramModulesQuantity,
        contentKind: 'ram modules quantity',
      }),
    });

  // accessible text input element creator
  const [createdRamModulesQuantityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: ramModulesQuantityInputErrorText,
          valid: ramModulesQuantityInputValidText,
        },
        inputText: ramModulesQuantity,
        isValidInputText: isRamModulesQuantityValid,
        label: 'RAM Modules Quantity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesQuantityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesQuantity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesQuantityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 00',
        required: true,
        semanticName: 'ram modules quantity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM MODULES CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramModulesCapacityInputErrorText, ramModulesCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram modules capacity',
      inputText: ramModulesCapacity,
      isInputTextFocused: isRamModulesCapacityFocused,
      isValidInputText: isRamModulesCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: ramModulesCapacity,
        contentKind: 'ram modules capacity',
      }),
    });

  // accessible text input element creator
  const [createdRamModulesCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: ramModulesCapacityInputErrorText,
          valid: ramModulesCapacityInputValidText,
        },
        inputText: ramModulesCapacity,
        isValidInputText: isRamModulesCapacityValid,
        label: 'RAM Modules Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsRamModulesCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'ram modules capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM MODULES CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdRamModulesCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'RAM Modules Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setRamModulesCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: ramModulesCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdRamTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: RAM_MEMORY_TYPE_DATA,
      description: '',
      label: 'RAM Type',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setRamType,
          payload: event.currentTarget.value as MemoryType,
        });
      },
      value: ramType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramColorInputErrorText, ramColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram color',
      inputText: ramColor,
      isInputTextFocused: isRamColorFocused,
      isValidInputText: isRamColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: ramColor,
        contentKind: 'ram color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // accessible text input element creator
  const [createdRamColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramColorInputErrorText,
        valid: ramColorInputValidText,
      },
      inputText: ramColor,
      isValidInputText: isRamColorValid,
      label: 'RAM Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter RAM color',
      required: true,
      semanticName: 'ram color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM VOLTAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramVoltageInputErrorText, ramVoltageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram voltage',
      inputText: ramVoltage,
      isInputTextFocused: isRamVoltageFocused,
      isValidInputText: isRamVoltageValid,
      regexValidationText: returnRamVoltageValidationText({
        content: ramVoltage,
        contentKind: 'ram voltage',
      }),
    });

  // accessible text input element creator
  const [createdRamVoltageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramVoltageInputErrorText,
        valid: ramVoltageInputValidText,
      },
      inputText: ramVoltage,
      isValidInputText: isRamVoltageValid,
      label: 'RAM Voltage (V)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamVoltageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamVoltage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamVoltageFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0.00',
      required: true,
      semanticName: 'ram voltage',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM TIMING
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [ramTimingInputErrorText, ramTimingInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'ram timing',
      inputText: ramTiming,
      isInputTextFocused: isRamTimingFocused,
      isValidInputText: isRamTimingValid,
      regexValidationText: returnRamTimingValidationText({
        content: ramTiming,
        contentKind: 'ram timing',
        maxLength: 14,
        minLength: 7,
      }),
    });

  // accessible text input element creator
  const [createdRamTimingTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: ramTimingInputErrorText,
        valid: ramTimingInputValidText,
      },
      inputText: ramTiming,
      isValidInputText: isRamTimingValid,
      label: 'RAM Timing',
      maxLength: 14,
      minLength: 7,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsRamTimingFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setRamTiming,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsRamTimingFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 00-00-00-00 or 0-0-0-0',
      required: true,
      semanticName: 'ram timing',
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   RAM ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddRamFieldsAdditionalButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Add',
      semanticDescription: 'Add new additional field',
      semanticName: 'Add new field',
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setRamFieldsAdditional,
          payload: {
            operation: 'add',
            data: ['', ''],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreRamFieldsAdditionalFocused,
          payload: {
            operation: 'add',
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreRamFieldsAdditionalValid,
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
  const ramFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(ramFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      ramFieldsAdditionalKeysInputErrorText,
      ramFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areRamFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areRamFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      ramFieldsAdditionalKeysInputErrorText,
      ramFieldsAdditionalKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const ramFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(ramFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      ramFieldsAdditionalValuesInputErrorText,
      ramFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areRamFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areRamFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      ramFieldsAdditionalValuesInputErrorText,
      ramFieldsAdditionalValuesInputValidText,
    ];
  });

  const createdRamFieldsAdditionalTextInputElements = Array.from(
    ramFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const ramFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: ramFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid: ramFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areRamFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalFocused,
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
            type: createProductAction.setRamFieldsAdditional,
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
            type: createProductAction.setAreRamFieldsAdditionalFocused,
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
    const ramFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: ramFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid: ramFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areRamFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalFocused,
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
            type: createProductAction.setRamFieldsAdditional,
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
            type: createProductAction.setAreRamFieldsAdditionalFocused,
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
      createdRamFieldsAdditionalKeysTextAreaInput,
      createdRamFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      ramFieldsAdditionalKeysTextInputCreatorInfo,
      ramFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setRamFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreRamFieldsAdditionalValid,
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
      <Stack key={`ramFieldsAdditional-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Ram field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdRamFieldsAdditionalKeysTextAreaInput}
          {createdRamFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displayRamFieldsAdditionalButton = (
    <Tooltip label={`Add new additional field ${ramFieldsAdditional.size + 1}`}>
      <Group>{createdAddRamFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displayRamSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Memory (RAM) Specifications</Title>
        {displayRamFieldsAdditionalButton}
      </Group>
      {createdRamDataRateTextInput}
      {createdRamModulesQuantityTextInput}
      {createdRamModulesCapacityTextInput}
      {createdRamModulesCapacityUnitSelectInput}
      {createdRamTypeSelectInput}
      {createdRamColorTextInput}
      {createdRamVoltageTextInput}
      {createdRamTimingTextInput}
      {createdRamFieldsAdditionalTextInputElements}
    </Group>
  );

  return displayRamSpecificationsInputs;
}

export default CreateRam;
