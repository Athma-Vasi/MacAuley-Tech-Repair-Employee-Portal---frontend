import { Group, MantineNumberSize, Stack, Text, Title, Tooltip } from "@mantine/core";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import { TbPlus, TbTrash } from "react-icons/tb";

import {
  AccessibleErrorValidTextElements,
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
  returnAccessibleTextAreaInputElements,
  returnAccessibleTextInputElements,
} from "../../../jsxCreators";
import {
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  GPU_CHIPSET_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  OBJECT_KEY_REGEX,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import { CreateProductAction, MemoryUnit } from "../types";

type CreateGpuProps = {
  areGpuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areGpuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  gpuBoostClock: string;
  gpuChipset: string;
  gpuCoreClock: string;
  gpuFieldsAdditionalMap: Map<number, [string, string]>;
  gpuMemoryCapacity: string;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuTdp: string;
  isGpuBoostClockFocused: boolean;
  isGpuBoostClockValid: boolean;
  isGpuChipsetFocused: boolean;
  isGpuChipsetValid: boolean;
  isGpuCoreClockFocused: boolean;
  isGpuCoreClockValid: boolean;
  isGpuMemoryCapacityFocused: boolean;
  isGpuMemoryCapacityValid: boolean;
  isGpuTdpFocused: boolean;
  isGpuTdpValid: boolean;
  padding: MantineNumberSize;
};

function CreateGpu({
  areGpuFieldsAdditionalMapFocused,
  areGpuFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  gpuBoostClock,
  gpuChipset,
  gpuCoreClock,
  gpuFieldsAdditionalMap,
  gpuMemoryCapacity,
  gpuMemoryCapacityUnit,
  gpuTdp,
  isGpuBoostClockFocused,
  isGpuBoostClockValid,
  isGpuChipsetFocused,
  isGpuChipsetValid,
  isGpuCoreClockFocused,
  isGpuCoreClockValid,
  isGpuMemoryCapacityFocused,
  isGpuMemoryCapacityValid,
  isGpuTdpFocused,
  isGpuTdpValid,
  padding,
}: CreateGpuProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = GPU_CHIPSET_REGEX.test(gpuChipset);

    createProductDispatch({
      type: createProductAction.setIsGpuChipsetValid,
      payload: isValid,
    });
  }, [createProductAction.setIsGpuChipsetValid, createProductDispatch, gpuChipset]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU MEMORY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(gpuMemoryCapacity);

    createProductDispatch({
      type: createProductAction.setIsGpuMemoryCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsGpuMemoryCapacityValid,
    createProductDispatch,
    gpuMemoryCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU CORE CLOCK
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuCoreClock);

    createProductDispatch({
      type: createProductAction.setIsGpuCoreClockValid,
      payload: isValid,
    });
  }, [createProductAction.setIsGpuCoreClockValid, createProductDispatch, gpuCoreClock]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU BOOST CLOCK
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuBoostClock);

    createProductDispatch({
      type: createProductAction.setIsGpuBoostClockValid,
      payload: isValid,
    });
  }, [createProductAction.setIsGpuBoostClockValid, createProductDispatch, gpuBoostClock]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU TDP
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(gpuTdp);

    createProductDispatch({
      type: createProductAction.setIsGpuTdpValid,
      payload: isValid,
    });
  }, [createProductAction.setIsGpuTdpValid, createProductDispatch, gpuTdp]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingGpuFieldAdditional = gpuFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingGpuFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingGpuFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreGpuFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreGpuFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreGpuFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    gpuFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areGpuInputsHardcodedInError =
      !isGpuChipsetValid ||
      !isGpuMemoryCapacityValid ||
      !isGpuCoreClockValid ||
      !isGpuBoostClockValid ||
      !isGpuTdpValid;

    const areGpuInputsUserDefinedInError = Array.from(
      areGpuFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areGpuInputsInError =
      areGpuInputsHardcodedInError || areGpuInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areGpuInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areGpuFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isGpuBoostClockValid,
    isGpuChipsetValid,
    isGpuCoreClockValid,
    isGpuMemoryCapacityValid,
    isGpuTdpValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [gpuChipsetInputErrorText, gpuChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "gpu chipset",
      inputText: gpuChipset,
      isInputTextFocused: isGpuChipsetFocused,
      isValidInputText: isGpuChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: gpuChipset,
        contentKind: "gpu chipset",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdGpuChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuChipsetInputErrorText,
        valid: gpuChipsetInputValidText,
      },
      inputText: gpuChipset,
      isValidInputText: isGpuChipsetValid,
      label: "GPU Chipset",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuChipsetFocused,
          payload: true,
        });
      },
      placeholder: "Enter GPU chipset",
      required: true,
      semanticName: "gpu chipset",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU MEMORY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [gpuMemoryCapacityInputErrorText, gpuMemoryCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "gpu memory capacity",
      inputText: gpuMemoryCapacity,
      isInputTextFocused: isGpuMemoryCapacityFocused,
      isValidInputText: isGpuMemoryCapacityValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: gpuMemoryCapacity,
        contentKind: "gpu memory capacity",
      }),
    });

  // screenreader accessible text input element
  const [createdGpuMemoryCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuMemoryCapacityInputErrorText,
        valid: gpuMemoryCapacityInputValidText,
      },
      inputText: gpuMemoryCapacity,
      isValidInputText: isGpuMemoryCapacityValid,
      label: "GPU Memory Capacity (GB)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuMemoryCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuMemoryCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuMemoryCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "gpu memory capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU MEMORY CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdGpuMemoryCapacityUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MEMORY_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "GPU Memory Capacity Unit",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuMemoryCapacityUnit,
          payload: event.currentTarget.value as MemoryUnit,
        });
      },
      value: gpuMemoryCapacityUnit,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU CORE CLOCK
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [gpuCoreClockInputErrorText, gpuCoreClockInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "gpu core clock",
      inputText: gpuCoreClock,
      isInputTextFocused: isGpuCoreClockFocused,
      isValidInputText: isGpuCoreClockValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: gpuCoreClock,
        contentKind: "gpu core clock",
      }),
    });

  // screenreader accessible text input element
  const [createdGpuCoreClockTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuCoreClockInputErrorText,
        valid: gpuCoreClockInputValidText,
      },
      inputText: gpuCoreClock,
      isValidInputText: isGpuCoreClockValid,
      label: "GPU Core Clock (MHz)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuCoreClockFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuCoreClock,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuCoreClockFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "gpu core clock",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU BOOST CLOCK
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [gpuBoostClockInputErrorText, gpuBoostClockInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "gpu boost clock",
      inputText: gpuBoostClock,
      isInputTextFocused: isGpuBoostClockFocused,
      isValidInputText: isGpuBoostClockValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: gpuBoostClock,
        contentKind: "gpu boost clock",
      }),
    });

  // screenreader accessible text input element
  const [createdGpuBoostClockTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuBoostClockInputErrorText,
        valid: gpuBoostClockInputValidText,
      },
      inputText: gpuBoostClock,
      isValidInputText: isGpuBoostClockValid,
      label: "GPU Boost Clock (MHz)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuBoostClockFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuBoostClock,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuBoostClockFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "gpu boost clock",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU TDP
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [gpuTdpInputErrorText, gpuTdpInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "gpu wattage",
    inputText: gpuTdp,
    isInputTextFocused: isGpuTdpFocused,
    isValidInputText: isGpuTdpValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: gpuTdp,
      contentKind: "gpu wattage",
    }),
  });

  // screenreader accessible text input element
  const [createdGpuWattageTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: gpuTdpInputErrorText,
        valid: gpuTdpInputValidText,
      },
      inputText: gpuTdp,
      isValidInputText: isGpuTdpValid,
      label: "GPU Wattage (W)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuTdpFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuTdp,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsGpuTdpFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "gpu wattage",
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   GPU ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddGpuFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional GPU field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setGpuFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreGpuFieldsAdditionalMapValid,
          payload: {
            operation: "add",
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
  const gpuFieldsAdditionalMapKeysErrorValidTextElements: [JSX.Element, JSX.Element][] =
    Array.from(gpuFieldsAdditionalMap).map((keyFieldValue) => {
      const [mapKey, [field, _value]] = keyFieldValue;

      // error/valid text elements that are consumed by the text input element creator
      const [
        gpuFieldsAdditionalMapKeysInputErrorText,
        gpuFieldsAdditionalMapKeysInputValidText,
      ] = AccessibleErrorValidTextElements({
        inputElementKind: `additional GPU field name ${mapKey + 1}`,
        inputText: field,
        isInputTextFocused: areGpuFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
        isValidInputText: areGpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        regexValidationText: returnObjectKeyValidationText({
          content: field,
          contentKind: `additional GPU field name ${mapKey + 1}`,
          maxLength: 75,
          minLength: 1,
        }),
      });

      return [
        gpuFieldsAdditionalMapKeysInputErrorText,
        gpuFieldsAdditionalMapKeysInputValidText,
      ];
    });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const gpuFieldsAdditionalMapValuesErrorValidTextElements: [JSX.Element, JSX.Element][] =
    Array.from(gpuFieldsAdditionalMap).map((keyFieldValue) => {
      const [mapKey, [_field, value]] = keyFieldValue;

      // error/valid text elements that are consumed by the text input element creator
      const [
        gpuFieldsAdditionalMapValuesInputErrorText,
        gpuFieldsAdditionalMapValuesInputValidText,
      ] = AccessibleErrorValidTextElements({
        inputElementKind: `additional GPU field value ${mapKey + 1}`,
        inputText: value,
        isInputTextFocused: areGpuFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
        isValidInputText: areGpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        regexValidationText: returnUserDefinedFieldValueValidationText({
          content: value,
          contentKind: `additional GPU field value ${mapKey + 1}`,
          maxLength: 2000,
          minLength: 2,
        }),
      });

      return [
        gpuFieldsAdditionalMapValuesInputErrorText,
        gpuFieldsAdditionalMapValuesInputValidText,
      ];
    });

  const createdGpuFieldsAdditionalMapTextInputElements = Array.from(
    gpuFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const gpuFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: gpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: gpuFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areGpuFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: "update",
              data: false,
              index: mapKey,
              kind: "key",
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: "update",
              data: event.currentTarget.value,
              index: mapKey,
              kind: "key",
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: "update",
              data: true,
              index: mapKey,
              kind: "key",
            },
          });
        },
        placeholder: "Enter additional field name",
        required: true,
        semanticName: `additional GPU field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const gpuFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: gpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: gpuFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areGpuFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: "update",
              data: false,
              index: mapKey,
              kind: "value",
            },
          });
        },
        onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: "update",
              data: event.currentTarget.value,
              index: mapKey,
              kind: "value",
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: mapKey,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: "update",
              data: true,
              index: mapKey,
              kind: "value",
            },
          });
        },
        placeholder: "Enter additional field value",
        required: true,
        semanticName: `additional GPU field value ${mapKey + 1}`,
      };

    const [
      createdGpuFieldsAdditionalMapKeysTextAreaInput,
      createdGpuFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      gpuFieldsAdditionalMapKeysTextInputCreatorInfo,
      gpuFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setGpuFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreGpuFieldsAdditionalMapValid,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
            payload: -1,
          });
        },
        leftIcon: <TbTrash />,
        semanticDescription: `Delete additional GPU field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional GPU field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`gpuFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional GPU field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdGpuFieldsAdditionalMapKeysTextAreaInput}
          {createdGpuFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayGpuFieldsAdditionalMapButton = (
    <Tooltip label={`Add additional GPU field ${gpuFieldsAdditionalMap.size + 1}`}>
      <Group>{createdAddGpuFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayGpuSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>GPU Specifications</Title>
        {displayGpuFieldsAdditionalMapButton}
      </Group>
      {createdGpuChipsetTextInput}
      {createdGpuMemoryCapacityTextInput}
      {createdGpuMemoryCapacityUnitSelectInput}
      {createdGpuWattageTextInput}
      {createdGpuCoreClockTextInput}
      {createdGpuBoostClockTextInput}
      {createdGpuFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayGpuSpecificationsInputs;
}

export default CreateGpu;
