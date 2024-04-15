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
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  OBJECT_KEY_REGEX,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import {
  CreateProductAction,
  MemoryType,
  MemoryUnit,
  MotherboardFormFactor,
} from "../types";

type CreateMotherboardProps = {
  areMotherboardFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areMotherboardFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isMotherboardChipsetFocused: boolean;
  isMotherboardChipsetValid: boolean;
  isMotherboardM2SlotsFocused: boolean;
  isMotherboardM2SlotsValid: boolean;
  isMotherboardMemoryMaxCapacityFocused: boolean;
  isMotherboardMemoryMaxCapacityValid: boolean;
  isMotherboardMemorySlotsFocused: boolean;
  isMotherboardMemorySlotsValid: boolean;
  isMotherboardPcie3SlotsFocused: boolean;
  isMotherboardPcie3SlotsValid: boolean;
  isMotherboardPcie4SlotsFocused: boolean;
  isMotherboardPcie4SlotsValid: boolean;
  isMotherboardPcie5SlotsFocused: boolean;
  isMotherboardPcie5SlotsValid: boolean;
  isMotherboardSataPortsFocused: boolean;
  isMotherboardSataPortsValid: boolean;
  isMotherboardSocketFocused: boolean;
  isMotherboardSocketValid: boolean;
  motherboardChipset: string;
  motherboardFieldsAdditionalMap: Map<number, [string, string]>;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardM2Slots: string;
  motherboardMemoryMaxCapacity: string;
  motherboardMemoryMaxCapacityUnit: MemoryUnit;
  motherboardMemorySlots: string;
  motherboardMemoryType: MemoryType;
  motherboardPcie3Slots: string;
  motherboardPcie4Slots: string;
  motherboardPcie5Slots: string;
  motherboardSataPorts: string;
  motherboardSocket: string;
  padding: MantineNumberSize;
};

function CreateMotherboard({
  areMotherboardFieldsAdditionalMapFocused,
  areMotherboardFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isMotherboardChipsetFocused,
  isMotherboardChipsetValid,
  isMotherboardM2SlotsFocused,
  isMotherboardM2SlotsValid,
  isMotherboardMemoryMaxCapacityFocused,
  isMotherboardMemoryMaxCapacityValid,
  isMotherboardMemorySlotsFocused,
  isMotherboardMemorySlotsValid,
  isMotherboardPcie3SlotsFocused,
  isMotherboardPcie3SlotsValid,
  isMotherboardPcie4SlotsFocused,
  isMotherboardPcie4SlotsValid,
  isMotherboardPcie5SlotsFocused,
  isMotherboardPcie5SlotsValid,
  isMotherboardSataPortsFocused,
  isMotherboardSataPortsValid,
  isMotherboardSocketFocused,
  isMotherboardSocketValid,
  motherboardChipset,
  motherboardFieldsAdditionalMap,
  motherboardFormFactor,
  motherboardM2Slots,
  motherboardMemoryMaxCapacity,
  motherboardMemoryMaxCapacityUnit,
  motherboardMemorySlots,
  motherboardMemoryType,
  motherboardPcie3Slots,
  motherboardPcie4Slots,
  motherboardPcie5Slots,
  motherboardSataPorts,
  motherboardSocket,
  padding,
}: CreateMotherboardProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD SOCKET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MOTHERBOARD_SOCKET_REGEX.test(motherboardSocket);

    createProductDispatch({
      type: createProductAction.setIsMotherboardSocketValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardSocketValid,
    createProductDispatch,
    motherboardSocket,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MOTHERBOARD_CHIPSET_REGEX.test(motherboardChipset);

    createProductDispatch({
      type: createProductAction.setIsMotherboardChipsetValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardChipsetValid,
    createProductDispatch,
    motherboardChipset,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY MAX CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(motherboardMemoryMaxCapacity);

    createProductDispatch({
      type: createProductAction.setIsMotherboardMemoryMaxCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardMemoryMaxCapacityValid,
    createProductDispatch,
    motherboardMemoryMaxCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardMemorySlots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardMemorySlotsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardMemorySlotsValid,
    createProductDispatch,
    motherboardMemorySlots,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD SATA PORTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardSataPorts);

    createProductDispatch({
      type: createProductAction.setIsMotherboardSataPortsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardSataPortsValid,
    createProductDispatch,
    motherboardSataPorts,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD M2 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardM2Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardM2SlotsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardM2SlotsValid,
    createProductDispatch,
    motherboardM2Slots,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE3 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie3Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie3SlotsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardPcie3SlotsValid,
    createProductDispatch,
    motherboardPcie3Slots,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE4 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie4Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie4SlotsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardPcie4SlotsValid,
    createProductDispatch,
    motherboardPcie4Slots,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE5 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(motherboardPcie5Slots);

    createProductDispatch({
      type: createProductAction.setIsMotherboardPcie5SlotsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMotherboardPcie5SlotsValid,
    createProductDispatch,
    motherboardPcie5Slots,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingMotherboardFieldAdditional =
      motherboardFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingMotherboardFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMotherboardFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreMotherboardFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    motherboardFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areMotherboardInputsHardcodedInError =
      !isMotherboardChipsetValid ||
      isMotherboardM2SlotsValid ||
      !isMotherboardMemoryMaxCapacityValid ||
      !isMotherboardMemorySlotsValid ||
      !isMotherboardPcie3SlotsValid ||
      !isMotherboardPcie4SlotsValid ||
      !isMotherboardSataPortsValid ||
      !isMotherboardSocketValid;

    const areMotherboardInputsUserDefinedInError = Array.from(
      areMotherboardFieldsAdditionalMapValid
    ).some(([_key, value]) => value.includes(false));

    const areMotherboardInputsInError =
      areMotherboardInputsHardcodedInError || areMotherboardInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areMotherboardInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areMotherboardFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isMotherboardChipsetValid,
    isMotherboardM2SlotsValid,
    isMotherboardMemoryMaxCapacityValid,
    isMotherboardMemorySlotsValid,
    isMotherboardPcie3SlotsValid,
    isMotherboardPcie4SlotsValid,
    isMotherboardSataPortsValid,
    isMotherboardSocketValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD SOCKET
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardSocketInputErrorText, motherboardSocketInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard socket",
      inputText: motherboardSocket,
      isInputTextFocused: isMotherboardSocketFocused,
      isValidInputText: isMotherboardSocketValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: motherboardSocket,
        contentKind: "motherboard socket",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardSocketTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardSocketInputErrorText,
        valid: motherboardSocketInputValidText,
      },
      inputText: motherboardSocket,
      isValidInputText: isMotherboardSocketValid,
      label: "Motherboard Socket",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardSocketFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardSocket,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardSocketFocused,
          payload: true,
        });
      },
      placeholder: "Enter motherboard socket",
      required: true,
      semanticName: "motherboard socket",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardChipsetInputErrorText, motherboardChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard chipset",
      inputText: motherboardChipset,
      isInputTextFocused: isMotherboardChipsetFocused,
      isValidInputText: isMotherboardChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: motherboardChipset,
        contentKind: "motherboard chipset",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardChipsetInputErrorText,
        valid: motherboardChipsetInputValidText,
      },
      inputText: motherboardChipset,
      isValidInputText: isMotherboardChipsetValid,
      label: "Motherboard Chipset",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardChipsetFocused,
          payload: true,
        });
      },
      placeholder: "Enter motherboard chipset",
      required: true,
      semanticName: "motherboard chipset",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD FORM FACTOR
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMotherboardFormFactorSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOTHERBOARD_FORM_FACTOR_DATA,
      description: "",
      label: "Motherboard Form Factor",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardFormFactor,
          payload: event.currentTarget.value as MotherboardFormFactor,
        });
      },
      value: motherboardFormFactor,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY MAX CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [
    motherboardMemoryMaxCapacityInputErrorText,
    motherboardMemoryMaxCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "motherboard memory max capacity",
    inputText: motherboardMemoryMaxCapacity,
    isInputTextFocused: isMotherboardMemoryMaxCapacityFocused,
    isValidInputText: isMotherboardMemoryMaxCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: motherboardMemoryMaxCapacity,
      contentKind: "motherboard memory max capacity",
    }),
  });

  // screenreader accessible text input element
  const [createdMotherboardMemoryMaxCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: motherboardMemoryMaxCapacityInputErrorText,
          valid: motherboardMemoryMaxCapacityInputValidText,
        },
        inputText: motherboardMemoryMaxCapacity,
        isValidInputText: isMotherboardMemoryMaxCapacityValid,
        label: "Motherboard Memory Max Capacity",
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemoryMaxCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemoryMaxCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsMotherboardMemoryMaxCapacityFocused,
            payload: true,
          });
        },
        placeholder: "Format: 0000",
        required: true,
        semanticName: "motherboard memory max capacity",
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY MAX CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMotherboardMemoryMaxCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: "",
        label: "Motherboard Memory Max Capacity Unit",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardMemoryMaxCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: motherboardMemoryMaxCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardMemorySlotsInputErrorText, motherboardMemorySlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard memory slots",
      inputText: motherboardMemorySlots,
      isInputTextFocused: isMotherboardMemorySlotsFocused,
      isValidInputText: isMotherboardMemorySlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardMemorySlots,
        contentKind: "motherboard memory slots",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardMemorySlotsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardMemorySlotsInputErrorText,
        valid: motherboardMemorySlotsInputValidText,
      },
      inputText: motherboardMemorySlots,
      isValidInputText: isMotherboardMemorySlotsValid,
      label: "Motherboard Memory Slots",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardMemorySlotsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardMemorySlots,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardMemorySlotsFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "motherboard memory slots",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD MEMORY TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMotherboardMemoryTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOTHERBOARD_MEMORY_TYPE_DATA,
      description: "",
      label: "Motherboard Memory Type",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardMemoryType,
          payload: event.currentTarget.value as MemoryType,
        });
      },
      value: motherboardMemoryType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD SATA PORTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardSataPortsInputErrorText, motherboardSataPortsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard sata ports",
      inputText: motherboardSataPorts,
      isInputTextFocused: isMotherboardSataPortsFocused,
      isValidInputText: isMotherboardSataPortsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardSataPorts,
        contentKind: "motherboard sata ports",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardSataPortsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardSataPortsInputErrorText,
        valid: motherboardSataPortsInputValidText,
      },
      inputText: motherboardSataPorts,
      isValidInputText: isMotherboardSataPortsValid,
      label: "Motherboard SATA Ports",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardSataPortsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardSataPorts,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardSataPortsFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "motherboard sata ports",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD M2 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardM2SlotsInputErrorText, motherboardM2SlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard m2 slots",
      inputText: motherboardM2Slots,
      isInputTextFocused: isMotherboardM2SlotsFocused,
      isValidInputText: isMotherboardM2SlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardM2Slots,
        contentKind: "motherboard m2 slots",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardM2SlotsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardM2SlotsInputErrorText,
        valid: motherboardM2SlotsInputValidText,
      },
      inputText: motherboardM2Slots,
      isValidInputText: isMotherboardM2SlotsValid,
      label: "Motherboard M.2 Slots",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardM2SlotsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardM2Slots,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardM2SlotsFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "motherboard m2 slots",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE3 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardPcie3SlotsInputErrorText, motherboardPcie3SlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard pcie3 slots",
      inputText: motherboardPcie3Slots,
      isInputTextFocused: isMotherboardPcie3SlotsFocused,
      isValidInputText: isMotherboardPcie3SlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardPcie3Slots,
        contentKind: "motherboard pcie3 slots",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardPcie3SlotsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardPcie3SlotsInputErrorText,
        valid: motherboardPcie3SlotsInputValidText,
      },
      inputText: motherboardPcie3Slots,
      isValidInputText: isMotherboardPcie3SlotsValid,
      label: "Motherboard PCIe3 Slots",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie3SlotsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie3Slots,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie3SlotsFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "motherboard pcie3 slots",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE4 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardPcie4SlotsInputErrorText, motherboardPcie4SlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard pcie4 slots",
      inputText: motherboardPcie4Slots,
      isInputTextFocused: isMotherboardPcie4SlotsFocused,
      isValidInputText: isMotherboardPcie4SlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardPcie4Slots,
        contentKind: "motherboard pcie4 slots",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardPcie4SlotsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardPcie4SlotsInputErrorText,
        valid: motherboardPcie4SlotsInputValidText,
      },
      inputText: motherboardPcie4Slots,
      isValidInputText: isMotherboardPcie4SlotsValid,
      label: "Motherboard PCIe4 Slots",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie4SlotsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie4Slots,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie4SlotsFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00",
      required: true,
      semanticName: "motherboard pcie4 slots",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD PCIE5 SLOTS
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader accessible text input elements
  const [motherboardPcie5SlotsInputErrorText, motherboardPcie5SlotsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "motherboard pcie5 slots",
      inputText: motherboardPcie5Slots,
      isInputTextFocused: isMotherboardPcie5SlotsFocused,
      isValidInputText: isMotherboardPcie5SlotsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: motherboardPcie5Slots,
        contentKind: "motherboard pcie5 slots",
      }),
    });

  // screenreader accessible text input element
  const [createdMotherboardPcie5SlotsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: motherboardPcie5SlotsInputErrorText,
        valid: motherboardPcie5SlotsInputValidText,
      },
      inputText: motherboardPcie5Slots,
      isValidInputText: isMotherboardPcie5SlotsValid,
      label: "Motherboard PCIe5 Slots",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie5SlotsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMotherboardPcie5Slots,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMotherboardPcie5SlotsFocused,
          payload: true,
        });
      },
      placeholder: "(Optional) Format: 00",
      required: false,
      semanticName: "motherboard pcie5 slots",
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   MOTHERBOARD ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddMotherboardFieldsAdditionalMapButton] = returnAccessibleButtonElements(
    [
      {
        buttonLabel: "Add",
        semanticDescription: "Add new additional Motherboard field",
        semanticName: "Add new field",
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: "add",
              data: ["", ""],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: "add",
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
            payload: {
              operation: "add",
              data: [false, false],
            },
          });
        },
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD NAMES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field name
  const motherboardFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(motherboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      motherboardFieldsAdditionalMapKeysInputErrorText,
      motherboardFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Motherboard field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMotherboardFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Motherboard field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      motherboardFieldsAdditionalMapKeysInputErrorText,
      motherboardFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯
  // returns an array of tuples containing the error and valid text elements for each field value
  const motherboardFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(motherboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      motherboardFieldsAdditionalMapValuesInputErrorText,
      motherboardFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Motherboard field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMotherboardFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Motherboard field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      motherboardFieldsAdditionalMapValuesInputErrorText,
      motherboardFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdMotherboardFieldsAdditionalMapTextInputElements = Array.from(
    motherboardFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const motherboardFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: motherboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: motherboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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
            type: createProductAction.setMotherboardFieldsAdditionalMap,
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
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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
        semanticName: `additional Motherboard field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const motherboardFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: motherboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: motherboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areMotherboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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
            type: createProductAction.setMotherboardFieldsAdditionalMap,
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
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
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
        semanticName: `additional Motherboard field value ${mapKey + 1}`,
      };

    const [
      createdMotherboardFieldsAdditionalMapKeysTextAreaInput,
      createdMotherboardFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      motherboardFieldsAdditionalMapKeysTextInputCreatorInfo,
      motherboardFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMotherboardFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMotherboardFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Motherboard field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Motherboard field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`motherboardFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Motherboard field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMotherboardFieldsAdditionalMapKeysTextAreaInput}
          {createdMotherboardFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayMotherboardFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Motherboard field ${
        motherboardFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddMotherboardFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayMotherboardSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Motherboard Specifications</Title>
        {displayMotherboardFieldsAdditionalMapButton}
      </Group>
      {createdMotherboardSocketTextInput}
      {createdMotherboardChipsetTextInput}
      {createdMotherboardFormFactorSelectInput}
      {createdMotherboardMemoryMaxCapacityTextInput}
      {createdMotherboardMemoryMaxCapacityUnitSelectInput}
      {createdMotherboardMemorySlotsTextInput}
      {createdMotherboardMemoryTypeSelectInput}
      {createdMotherboardSataPortsTextInput}
      {createdMotherboardM2SlotsTextInput}
      {createdMotherboardPcie3SlotsTextInput}
      {createdMotherboardPcie4SlotsTextInput}
      {createdMotherboardPcie5SlotsTextInput}
      {createdMotherboardFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayMotherboardSpecificationsInputs;
}

export default CreateMotherboard;
