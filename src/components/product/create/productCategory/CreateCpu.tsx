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
  returnCpuFrequencyValidationText,
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  OBJECT_KEY_REGEX,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  MemoryUnit,
} from '../types';

type CreateCpuProps = {
  areCpuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areCpuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  cpuCores: string;
  cpuFieldsAdditionalMap: Map<number, [string, string]>;
  cpuFrequency: string;
  cpuL1CacheCapacity: string;
  cpuL1CacheCapacityUnit: MemoryUnit;
  cpuL2CacheCapacity: string;
  cpuL2CacheCapacityUnit: MemoryUnit;
  cpuL3CacheCapacity: string;
  cpuL3CacheCapacityUnit: MemoryUnit;
  cpuSocket: string;
  cpuWattage: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isCpuCoresFocused: boolean;
  isCpuCoresValid: boolean;
  isCpuFrequencyFocused: boolean;
  isCpuFrequencyValid: boolean;
  isCpuL1CacheCapacityFocused: boolean;
  isCpuL1CacheCapacityValid: boolean;
  isCpuL2CacheCapacityFocused: boolean;
  isCpuL2CacheCapacityValid: boolean;
  isCpuL3CacheCapacityFocused: boolean;
  isCpuL3CacheCapacityValid: boolean;
  isCpuSocketFocused: boolean;
  isCpuSocketValid: boolean;
  isCpuWattageFocused: boolean;
  isCpuWattageValid: boolean;
  padding: MantineNumberSize;
};

function CreateCpu({
  areCpuFieldsAdditionalMapFocused,
  areCpuFieldsAdditionalMapValid,
  borderColor,
  cpuCores,
  cpuFieldsAdditionalMap,
  cpuFrequency,
  cpuL1CacheCapacity,
  cpuL1CacheCapacityUnit,
  cpuL2CacheCapacity,
  cpuL2CacheCapacityUnit,
  cpuL3CacheCapacity,
  cpuL3CacheCapacityUnit,
  cpuSocket,
  cpuWattage,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isCpuCoresFocused,
  isCpuCoresValid,
  isCpuFrequencyFocused,
  isCpuFrequencyValid,
  isCpuL1CacheCapacityFocused,
  isCpuL1CacheCapacityValid,
  isCpuL2CacheCapacityFocused,
  isCpuL2CacheCapacityValid,
  isCpuL3CacheCapacityFocused,
  isCpuL3CacheCapacityValid,
  isCpuSocketFocused,
  isCpuSocketValid,
  isCpuWattageFocused,
  isCpuWattageValid,
  padding,
}: CreateCpuProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU SOCKET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CPU_SOCKET_REGEX.test(cpuSocket);

    createProductDispatch({
      type: createProductAction.setIsCpuSocketValid,
      payload: isValid,
    });
  }, [
    cpuSocket,
    createProductAction.setIsCpuSocketValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU FREQUENCY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CPU_FREQUENCY_REGEX.test(cpuFrequency);

    createProductDispatch({
      type: createProductAction.setIsCpuFrequencyValid,
      payload: isValid,
    });
  }, [
    cpuFrequency,
    createProductAction.setIsCpuFrequencyValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU CORES
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(cpuCores);

    createProductDispatch({
      type: createProductAction.setIsCpuCoresValid,
      payload: isValid,
    });
  }, [cpuCores, createProductAction.setIsCpuCoresValid, createProductDispatch]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L1 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL1CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL1CacheCapacityValid,
      payload: isValid,
    });
  }, [
    cpuL1CacheCapacity,
    createProductAction.setIsCpuL1CacheCapacityValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L2 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL2CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL2CacheCapacityValid,
      payload: isValid,
    });
  }, [
    cpuL2CacheCapacity,
    createProductAction.setIsCpuL2CacheCapacityValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L3 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuL3CacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsCpuL3CacheCapacityValid,
      payload: isValid,
    });
  }, [
    cpuL3CacheCapacity,
    createProductAction.setIsCpuL3CacheCapacityValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(cpuWattage);

    createProductDispatch({
      type: createProductAction.setIsCpuWattageValid,
      payload: isValid,
    });
  }, [
    cpuWattage,
    createProductAction.setIsCpuWattageValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingCpuFieldAdditional = cpuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingCpuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingCpuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreCpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreCpuFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    currentlySelectedAdditionalFieldIndex,
    cpuFieldsAdditionalMap,
    createProductDispatch,
    createProductAction.setAreCpuFieldsAdditionalMapValid,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areCpuFieldsAdditionalMapInError = Array.from(
      areCpuFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areCpuInputsInError =
      !isCpuSocketValid ||
      !isCpuFrequencyValid ||
      !isCpuCoresValid ||
      !isCpuL1CacheCapacityValid ||
      !isCpuL2CacheCapacityValid ||
      !isCpuL3CacheCapacityValid ||
      !isCpuWattageValid ||
      areCpuFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areCpuInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areCpuFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isCpuCoresValid,
    isCpuFrequencyValid,
    isCpuL1CacheCapacityValid,
    isCpuL2CacheCapacityValid,
    isCpuL3CacheCapacityValid,
    isCpuSocketValid,
    isCpuWattageValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU SOCKET
  // ╰─────────────────────────────────────────────────────────────────╯
  // accessible screen reader text elements
  const [cpuSocketInputErrorText, cpuSocketInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu socket',
      inputText: cpuSocket,
      isInputTextFocused: isCpuSocketFocused,
      isValidInputText: isCpuSocketValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: cpuSocket,
        contentKind: 'cpu socket',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdCpuSocketTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuSocketInputErrorText,
        valid: cpuSocketInputValidText,
      },
      inputText: cpuSocket,
      isValidInputText: isCpuSocketValid,
      label: 'CPU Socket',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuSocketFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuSocket,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuSocketFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU socket',
      required: true,
      semanticName: 'cpu socket',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU FREQUENCY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuFrequencyInputErrorText, cpuFrequencyInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu frequency',
      inputText: cpuFrequency,
      isInputTextFocused: isCpuFrequencyFocused,
      isValidInputText: isCpuFrequencyValid,
      regexValidationText: returnCpuFrequencyValidationText({
        content: cpuFrequency,
        contentKind: 'cpu frequency',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuFrequencyTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuFrequencyInputErrorText,
        valid: cpuFrequencyInputValidText,
      },
      inputText: cpuFrequency,
      isValidInputText: isCpuFrequencyValid,
      label: 'CPU Frequency (GHz)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuFrequencyFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuFrequency,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuFrequencyFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 0.0 or 0.00',
      required: true,
      semanticName: 'cpu frequency',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU CORES
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuCoresInputErrorText, cpuCoresInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu cores',
      inputText: cpuCores,
      isInputTextFocused: isCpuCoresFocused,
      isValidInputText: isCpuCoresValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: cpuCores,
        contentKind: 'cpu cores',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuCoresTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuCoresInputErrorText,
        valid: cpuCoresInputValidText,
      },
      inputText: cpuCores,
      isValidInputText: isCpuCoresValid,
      label: 'CPU Cores',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuCoresFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuCores,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuCoresFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU cores',
      required: true,
      semanticName: 'cpu cores',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L1 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuL1CacheCapacityInputErrorText, cpuL1CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L1 cache capacity',
      inputText: cpuL1CacheCapacity,
      isInputTextFocused: isCpuL1CacheCapacityFocused,
      isValidInputText: isCpuL1CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL1CacheCapacity,
        contentKind: 'cpu L1 cache capacity',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuL1CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL1CacheCapacityInputErrorText,
          valid: cpuL1CacheCapacityInputValidText,
        },
        inputText: cpuL1CacheCapacity,
        isValidInputText: isCpuL1CacheCapacityValid,
        label: 'CPU L1 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL1CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL1CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL1CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L1 cache capacity',
        required: true,
        semanticName: 'cpu L1 cache capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L1 CACHE CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCpuL1CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'CPU L1 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL1CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL1CacheCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L2 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuL2CacheCapacityInputErrorText, cpuL2CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L2 cache capacity',
      inputText: cpuL2CacheCapacity,
      isInputTextFocused: isCpuL2CacheCapacityFocused,
      isValidInputText: isCpuL2CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL2CacheCapacity,
        contentKind: 'cpu L2 cache capacity',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuL2CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL2CacheCapacityInputErrorText,
          valid: cpuL2CacheCapacityInputValidText,
        },
        inputText: cpuL2CacheCapacity,
        isValidInputText: isCpuL2CacheCapacityValid,
        label: 'CPU L2 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL2CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL2CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL2CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L2 cache capacity',
        required: true,
        semanticName: 'cpu L2 cache capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L2 CACHE CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCpuL2CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'CPU L2 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL2CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL2CacheCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L3 CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuL3CacheCapacityInputErrorText, cpuL3CacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu L3 cache capacity',
      inputText: cpuL3CacheCapacity,
      isInputTextFocused: isCpuL3CacheCapacityFocused,
      isValidInputText: isCpuL3CacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuL3CacheCapacity,
        contentKind: 'cpu L3 cache capacity',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuL3CacheCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: cpuL3CacheCapacityInputErrorText,
          valid: cpuL3CacheCapacityInputValidText,
        },
        inputText: cpuL3CacheCapacity,
        isValidInputText: isCpuL3CacheCapacityValid,
        label: 'CPU L3 Cache Capacity',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL3CacheCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL3CacheCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsCpuL3CacheCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Enter CPU L3 cache capacity',
        required: true,
        semanticName: 'cpu L3 cache capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU L3 CACHE CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCpuL3CacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'CPU L3 Cache Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuL3CacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: cpuL3CacheCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU WATTAGE
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [cpuWattageInputErrorText, cpuWattageInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'cpu wattage',
      inputText: cpuWattage,
      isInputTextFocused: isCpuWattageFocused,
      isValidInputText: isCpuWattageValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: cpuWattage,
        contentKind: 'cpu wattage',
      }),
    });

  // screenreader accessible text input element
  const [createdCpuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cpuWattageInputErrorText,
        valid: cpuWattageInputValidText,
      },
      inputText: cpuWattage,
      isValidInputText: isCpuWattageValid,
      label: 'CPU Wattage',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuWattageFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setCpuWattage,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsCpuWattageFocused,
          payload: true,
        });
      },
      placeholder: 'Enter CPU wattage',
      required: true,
      semanticName: 'cpu wattage',
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   CPU ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddCpuFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapValid,
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
  const cpuFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(cpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      cpuFieldsAdditionalMapKeysInputErrorText,
      cpuFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areCpuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areCpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      cpuFieldsAdditionalMapKeysInputErrorText,
      cpuFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const cpuFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(cpuFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      cpuFieldsAdditionalMapValuesInputErrorText,
      cpuFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areCpuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areCpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      cpuFieldsAdditionalMapValuesInputErrorText,
      cpuFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdCpuFieldsAdditionalMapTextInputElements = Array.from(
    cpuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const cpuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: cpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: cpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areCpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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
            type: createProductAction.setCpuFieldsAdditionalMap,
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
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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
    const cpuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: cpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: cpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areCpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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
            type: createProductAction.setCpuFieldsAdditionalMap,
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
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
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
      createdCpuFieldsAdditionalMapKeysTextAreaInput,
      createdCpuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      cpuFieldsAdditionalMapKeysTextInputCreatorInfo,
      cpuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setCpuFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreCpuFieldsAdditionalMapValid,
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
      <Stack key={`cpuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Cpu field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdCpuFieldsAdditionalMapKeysTextAreaInput}
          {createdCpuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayCpuFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${cpuFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddCpuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayCpuSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group position="apart" w="100%">
        <Title order={4}>CPU Specifications</Title>
        {displayCpuFieldsAdditionalMapButton}
      </Group>
      {createdCpuSocketTextInput}
      {createdCpuWattageTextInput}
      {createdCpuFrequencyTextInput}
      {createdCpuCoresTextInput}
      {createdCpuL1CacheCapacityTextInput}
      {createdCpuL1CacheCapacityUnitSelectInput}
      {createdCpuL2CacheCapacityTextInput}
      {createdCpuL2CacheCapacityUnitSelectInput}
      {createdCpuL3CacheCapacityTextInput}
      {createdCpuL3CacheCapacityUnitSelectInput}
      {createdCpuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayCpuSpecificationsInputs;
}

export default CreateCpu;
