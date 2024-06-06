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
  returnColorVariantValidationText,
  returnDimensionsValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnMobileCameraResolutionValidationText,
  returnObjectKeyValidationText,
  returnSocketChipsetValidationText,
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  COLOR_VARIANT_REGEX,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  OBJECT_KEY_REGEX,
  SMARTPHONE_CHIPSET_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import { CreateProductAction, MemoryUnit, MobileOs } from "../types";

type CreateSmartphoneProps = {
  areSmartphoneFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areSmartphoneFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isSmartphoneBatteryCapacityFocused: boolean;
  isSmartphoneBatteryCapacityValid: boolean;
  isSmartphoneCameraFocused: boolean;
  isSmartphoneCameraValid: boolean;
  isSmartphoneChipsetFocused: boolean;
  isSmartphoneChipsetValid: boolean;
  isSmartphoneColorFocused: boolean;
  isSmartphoneColorValid: boolean;
  isSmartphoneDisplayFocused: boolean;
  isSmartphoneDisplayValid: boolean;
  isSmartphoneRamCapacityFocused: boolean;
  isSmartphoneRamCapacityValid: boolean;
  isSmartphoneResolutionHorizontalFocused: boolean;
  isSmartphoneResolutionHorizontalValid: boolean;
  isSmartphoneResolutionVerticalFocused: boolean;
  isSmartphoneResolutionVerticalValid: boolean;
  isSmartphoneStorageCapacityFocused: boolean;
  isSmartphoneStorageCapacityValid: boolean;
  padding: MantineNumberSize;
  smartphoneBatteryCapacity: string; // mAh
  smartphoneCamera: string; // 108 MP, 64 MP, etc.
  smartphoneChipset: string;
  smartphoneColor: string;
  smartphoneDisplay: string;
  smartphoneFieldsAdditionalMap: Map<number, [string, string]>;
  smartphoneOs: MobileOs;
  smartphoneRamCapacity: string;
  smartphoneRamCapacityUnit: MemoryUnit;
  smartphoneResolutionHorizontal: string;
  smartphoneResolutionVertical: string;
  smartphoneStorageCapacity: string; // GB
};

function CreateSmartphone({
  areSmartphoneFieldsAdditionalMapFocused,
  areSmartphoneFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isSmartphoneBatteryCapacityFocused,
  isSmartphoneBatteryCapacityValid,
  isSmartphoneCameraFocused,
  isSmartphoneCameraValid,
  isSmartphoneChipsetFocused,
  isSmartphoneChipsetValid,
  isSmartphoneColorFocused,
  isSmartphoneColorValid,
  isSmartphoneDisplayFocused,
  isSmartphoneDisplayValid,
  isSmartphoneRamCapacityFocused,
  isSmartphoneRamCapacityValid,
  isSmartphoneResolutionHorizontalFocused,
  isSmartphoneResolutionHorizontalValid,
  isSmartphoneResolutionVerticalFocused,
  isSmartphoneResolutionVerticalValid,
  isSmartphoneStorageCapacityFocused,
  isSmartphoneStorageCapacityValid,
  padding,
  smartphoneBatteryCapacity,
  smartphoneCamera,
  smartphoneChipset,
  smartphoneColor,
  smartphoneDisplay,
  smartphoneFieldsAdditionalMap,
  smartphoneOs,
  smartphoneRamCapacity,
  smartphoneRamCapacityUnit,
  smartphoneResolutionHorizontal,
  smartphoneResolutionVertical,
  smartphoneStorageCapacity,
}: CreateSmartphoneProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMARTPHONE_CHIPSET_REGEX.test(smartphoneChipset);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneChipsetValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneChipsetValid,
    createProductDispatch,
    smartphoneChipset,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(smartphoneDisplay);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneDisplayValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneDisplayValid,
    createProductDispatch,
    smartphoneDisplay,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneResolutionHorizontalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneResolutionHorizontalValid,
    createProductDispatch,
    smartphoneResolutionHorizontal,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneResolutionVerticalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneResolutionVerticalValid,
    createProductDispatch,
    smartphoneResolutionVertical,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RAM CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(smartphoneRamCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneRamCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneRamCapacityValid,
    createProductDispatch,
    smartphoneRamCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(smartphoneStorageCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneStorageCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneStorageCapacityValid,
    createProductDispatch,
    smartphoneStorageCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE BATTERY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(smartphoneBatteryCapacity);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneBatteryCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneBatteryCapacityValid,
    createProductDispatch,
    smartphoneBatteryCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE CAMERA
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(smartphoneCamera);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneCameraValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneCameraValid,
    createProductDispatch,
    smartphoneCamera,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(smartphoneColor);

    createProductDispatch({
      type: createProductAction.setIsSmartphoneColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsSmartphoneColorValid,
    createProductDispatch,
    smartphoneColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingSmartphoneFieldAdditional = smartphoneFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingSmartphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingSmartphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    smartphoneFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areSmartphoneHardcodedRequiredInputsInError =
      !isSmartphoneChipsetValid ||
      !isSmartphoneDisplayValid ||
      !isSmartphoneResolutionHorizontalValid ||
      !isSmartphoneResolutionVerticalValid ||
      !isSmartphoneRamCapacityValid ||
      !isSmartphoneStorageCapacityValid ||
      !isSmartphoneBatteryCapacityValid ||
      !isSmartphoneCameraValid ||
      !isSmartphoneColorValid;

    const areSmartphoneFieldsAdditionalMapInError = Array.from(
      areSmartphoneFieldsAdditionalMapValid
    ).some(([_key, value]) => value.includes(false));

    const areSmartphoneInputsInError =
      areSmartphoneHardcodedRequiredInputsInError ||
      areSmartphoneFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setPageInError,
      payload: {
        kind: areSmartphoneInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areSmartphoneFieldsAdditionalMapValid,
    createProductAction.setPageInError,
    createProductDispatch,
    isSmartphoneBatteryCapacityValid,
    isSmartphoneCameraValid,
    isSmartphoneChipsetValid,
    isSmartphoneColorValid,
    isSmartphoneDisplayValid,
    isSmartphoneRamCapacityValid,
    isSmartphoneResolutionHorizontalValid,
    isSmartphoneResolutionVerticalValid,
    isSmartphoneStorageCapacityValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE OS
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSmartphoneOsSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOBILE_OS_DATA,
      description: "",
      label: "Smartphone OS",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneOs,
          payload: event.currentTarget.value as MobileOs,
        });
      },
      value: smartphoneOs,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [smartphoneChipsetInputErrorText, smartphoneChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "smartphone chipset",
      inputText: smartphoneChipset,
      isInputTextFocused: isSmartphoneChipsetFocused,
      isValidInputText: isSmartphoneChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: smartphoneChipset,
        contentKind: "smartphone chipset",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdSmartphoneChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneChipsetInputErrorText,
        valid: smartphoneChipsetInputValidText,
      },
      inputText: smartphoneChipset,
      isValidInputText: isSmartphoneChipsetValid,
      label: "Smartphone Chipset",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneChipsetFocused,
          payload: true,
        });
      },
      placeholder: "Enter smartphone chipset",
      required: true,
      semanticName: "smartphone chipset",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [smartphoneDisplayInputErrorText, smartphoneDisplayInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "smartphone display",
      inputText: smartphoneDisplay,
      isInputTextFocused: isSmartphoneDisplayFocused,
      isValidInputText: isSmartphoneDisplayValid,
      regexValidationText: returnDimensionsValidationText({
        content: smartphoneDisplay,
        contentKind: "smartphone display",
      }),
    });

  // screenreader accessible text input element
  const [createdSmartphoneDisplayTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneDisplayInputErrorText,
        valid: smartphoneDisplayInputValidText,
      },
      inputText: smartphoneDisplay,
      isValidInputText: isSmartphoneDisplayValid,
      label: "Smartphone Display (inches)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneDisplayFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneDisplay,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneDisplayFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000.00",
      required: true,
      semanticName: "smartphone display",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    smartphoneResolutionHorizontalInputErrorText,
    smartphoneResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "smartphone resolution horizontal",
    inputText: smartphoneResolutionHorizontal,
    isInputTextFocused: isSmartphoneResolutionHorizontalFocused,
    isValidInputText: isSmartphoneResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionHorizontal,
      contentKind: "smartphone resolution horizontal",
    }),
  });

  // screenreader accessible text input element
  const [createdSmartphoneResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionHorizontalInputErrorText,
          valid: smartphoneResolutionHorizontalInputValidText,
        },
        inputText: smartphoneResolutionHorizontal,
        isValidInputText: isSmartphoneResolutionHorizontalValid,
        label: "Smartphone Resolution Horizontal (pixels)",
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: "Format: 000000",
        required: true,
        semanticName: "smartphone resolution horizontal",
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    smartphoneResolutionVerticalInputErrorText,
    smartphoneResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "smartphone resolution vertical",
    inputText: smartphoneResolutionVertical,
    isInputTextFocused: isSmartphoneResolutionVerticalFocused,
    isValidInputText: isSmartphoneResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionVertical,
      contentKind: "smartphone resolution vertical",
    }),
  });

  // screenreader accessible text input element
  const [createdSmartphoneResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionVerticalInputErrorText,
          valid: smartphoneResolutionVerticalInputValidText,
        },
        inputText: smartphoneResolutionVertical,
        isValidInputText: isSmartphoneResolutionVerticalValid,
        label: "Smartphone Resolution Vertical (pixels)",
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionVerticalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneResolutionVertical,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsSmartphoneResolutionVerticalFocused,
            payload: true,
          });
        },
        placeholder: "Format: 000000",
        required: true,
        semanticName: "smartphone resolution vertical",
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RAM CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [smartphoneRamCapacityInputErrorText, smartphoneRamCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "smartphone ram capacity",
      inputText: smartphoneRamCapacity,
      isInputTextFocused: isSmartphoneRamCapacityFocused,
      isValidInputText: isSmartphoneRamCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: smartphoneRamCapacity,
        contentKind: "smartphone ram capacity",
      }),
    });

  // screenreader accessible text input element
  const [createdSmartphoneRamCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneRamCapacityInputErrorText,
        valid: smartphoneRamCapacityInputValidText,
      },
      inputText: smartphoneRamCapacity,
      isValidInputText: isSmartphoneRamCapacityValid,
      label: "Smartphone RAM Capacity (GB)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneRamCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneRamCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneRamCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "smartphone ram capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RAM CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSmartphoneRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: "",
        label: "Smartphone RAM Capacity Unit",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneRamCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: smartphoneRamCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [
    smartphoneStorageCapacityInputErrorText,
    smartphoneStorageCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "smartphone storage capacity",
    inputText: smartphoneStorageCapacity,
    isInputTextFocused: isSmartphoneStorageCapacityFocused,
    isValidInputText: isSmartphoneStorageCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: smartphoneStorageCapacity,
      contentKind: "smartphone storage capacity",
    }),
  });

  // screenreader accessible text input element
  const [createdSmartphoneStorageCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneStorageCapacityInputErrorText,
        valid: smartphoneStorageCapacityInputValidText,
      },
      inputText: smartphoneStorageCapacity,
      isValidInputText: isSmartphoneStorageCapacityValid,
      label: "Smartphone Storage Capacity (GB)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneStorageCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneStorageCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneStorageCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "smartphone storage capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE BATTERY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    smartphoneBatteryCapacityInputErrorText,
    smartphoneBatteryCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "smartphone battery capacity",
    inputText: smartphoneBatteryCapacity,
    isInputTextFocused: isSmartphoneBatteryCapacityFocused,
    isValidInputText: isSmartphoneBatteryCapacityValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneBatteryCapacity,
      contentKind: "smartphone battery capacity",
    }),
  });

  // screenreader accessible text input element
  const [createdSmartphoneBatteryCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneBatteryCapacityInputErrorText,
        valid: smartphoneBatteryCapacityInputValidText,
      },
      inputText: smartphoneBatteryCapacity,
      isValidInputText: isSmartphoneBatteryCapacityValid,
      label: "Smartphone Battery Capacity (mAh)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneBatteryCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneBatteryCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneBatteryCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000000",
      required: true,
      semanticName: "smartphone battery capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE CAMERA
  // ╰─────────────────────────────────────────────────────────────────╯
  const [smartphoneCameraInputErrorText, smartphoneCameraInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "smartphone camera",
      inputText: smartphoneCamera,
      isInputTextFocused: isSmartphoneCameraFocused,
      isValidInputText: isSmartphoneCameraValid,
      regexValidationText: returnMobileCameraResolutionValidationText({
        content: smartphoneCamera,
        contentKind: "smartphone camera",
        maxLength: 84,
        minLength: 4,
      }),
    });

  // screenreader accessible text input element
  const [createdSmartphoneCameraTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneCameraInputErrorText,
        valid: smartphoneCameraInputValidText,
      },
      inputText: smartphoneCamera,
      isValidInputText: isSmartphoneCameraValid,
      label: "Smartphone Camera",
      maxLength: 84,
      minLength: 4,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneCameraFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneCamera,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneCameraFocused,
          payload: true,
        });
      },
      placeholder: "Enter smartphone camera",
      required: true,
      semanticName: "smartphone camera",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [smartphoneColorInputErrorText, smartphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "smartphone color",
      inputText: smartphoneColor,
      isInputTextFocused: isSmartphoneColorFocused,
      isValidInputText: isSmartphoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: smartphoneColor,
        contentKind: "smartphone color",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdSmartphoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneColorInputErrorText,
        valid: smartphoneColorInputValidText,
      },
      inputText: smartphoneColor,
      isValidInputText: isSmartphoneColorValid,
      label: "Smartphone Color",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsSmartphoneColorFocused,
          payload: true,
        });
      },
      placeholder: "Enter smartphone color",
      required: true,
      semanticName: "smartphone color",
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   SMARTPHONE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddSmartphoneFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional Smartphone field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setSmartphoneFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
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
  const smartphoneFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalMapKeysInputErrorText,
      smartphoneFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Smartphone field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Smartphone field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      smartphoneFieldsAdditionalMapKeysInputErrorText,
      smartphoneFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const smartphoneFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalMapValuesInputErrorText,
      smartphoneFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Smartphone field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Smartphone field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      smartphoneFieldsAdditionalMapValuesInputErrorText,
      smartphoneFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdSmartphoneFieldsAdditionalMapTextInputElements = Array.from(
    smartphoneFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const smartphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: smartphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: smartphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
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
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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
        semanticName: `additional Smartphone field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const smartphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: smartphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: smartphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areSmartphoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
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
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
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
        semanticName: `additional Smartphone field value ${mapKey + 1}`,
      };

    const [
      createdSmartphoneFieldsAdditionalMapKeysTextAreaInput,
      createdSmartphoneFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      smartphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
      smartphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Smartphone field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Smartphone field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`smartphoneFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Smartphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdSmartphoneFieldsAdditionalMapKeysTextAreaInput}
          {createdSmartphoneFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displaySmartphoneFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Smartphone field ${smartphoneFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddSmartphoneFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displaySmartphoneSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Smartphone Specifications</Title>
        {displaySmartphoneFieldsAdditionalMapButton}
      </Group>
      {createdSmartphoneOsSelectInput}
      {createdSmartphoneChipsetTextInput}
      {createdSmartphoneDisplayTextInput}
      {createdSmartphoneResolutionHorizontalTextInput}
      {createdSmartphoneResolutionVerticalTextInput}
      {createdSmartphoneColorTextInput}
      {createdSmartphoneRamCapacityTextInput}
      {createdSmartphoneRamCapacityUnitSelectInput}
      {createdSmartphoneStorageCapacityTextInput}
      {createdSmartphoneBatteryCapacityTextInput}
      {createdSmartphoneCameraTextInput}
      {createdSmartphoneFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displaySmartphoneSpecificationsInputs;
}

export default CreateSmartphone;
