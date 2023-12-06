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
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  OBJECT_KEY_REGEX,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import {
  CreateProductAction,
  MemoryUnit,
  StorageFormFactor,
  StorageInterface,
  StorageType,
} from "../types";

type CreateStorageProps = {
  areStorageFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areStorageFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isStorageCacheCapacityFocused: boolean;
  isStorageCacheCapacityValid: boolean;
  isStorageCapacityFocused: boolean;
  isStorageCapacityValid: boolean;
  padding: MantineNumberSize;
  storageCacheCapacity: string;
  storageCacheCapacityUnit: MemoryUnit;
  storageCapacity: string;
  storageCapacityUnit: MemoryUnit;
  storageFieldsAdditionalMap: Map<number, [string, string]>;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;
  storageType: StorageType;
};

function CreateStorage({
  areStorageFieldsAdditionalMapFocused,
  areStorageFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isStorageCacheCapacityFocused,
  isStorageCacheCapacityValid,
  isStorageCapacityFocused,
  isStorageCapacityValid,
  padding,
  storageCacheCapacity,
  storageCacheCapacityUnit,
  storageCapacity,
  storageCapacityUnit,
  storageFieldsAdditionalMap,
  storageFormFactor,
  storageInterface,
  storageType,
}: CreateStorageProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(storageCapacity);

    createProductDispatch({
      type: createProductAction.setIsStorageCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsStorageCapacityValid,
    createProductDispatch,
    storageCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(storageCacheCapacity);

    createProductDispatch({
      type: createProductAction.setIsStorageCacheCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsStorageCacheCapacityValid,
    createProductDispatch,
    storageCacheCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE FIELDS ADDITIONAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingStorageFieldAdditional = storageFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingStorageFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingStorageFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreStorageFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreStorageFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreStorageFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    storageFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areStorageHardcodedRequiredInputsInError =
      !isStorageCapacityValid || !isStorageCacheCapacityValid;

    const areStorageFieldsAdditionalMapInError = Array.from(
      areStorageFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areStorageInputsInError =
      areStorageHardcodedRequiredInputsInError || areStorageFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areStorageInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areStorageFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isStorageCacheCapacityValid,
    isStorageCapacityValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdStorageTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: STORAGE_TYPE_DATA,
      description: "",
      label: "Storage Type",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageType,
          payload: event.currentTarget.value as StorageType,
        });
      },
      value: storageType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [storageCapacityInputErrorText, storageCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "storage capacity",
      inputText: storageCapacity,
      isInputTextFocused: isStorageCapacityFocused,
      isValidInputText: isStorageCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: storageCapacity,
        contentKind: "storage capacity",
      }),
    });

  // screenreader accessible text input element
  const [createdStorageCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: storageCapacityInputErrorText,
        valid: storageCapacityInputValidText,
      },
      inputText: storageCapacity,
      isValidInputText: isStorageCapacityValid,
      label: "Storage Capacity",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "storage capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdStorageCapacityUnitSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MEMORY_UNIT_SELECT_INPUT_DATA,
      description: "",
      label: "Storage Capacity Unit",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageCapacityUnit,
          payload: event.currentTarget.value as MemoryUnit,
        });
      },
      value: storageCapacityUnit,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CACHE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [storageCacheCapacityInputErrorText, storageCacheCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "storage cache capacity",
      inputText: storageCacheCapacity,
      isInputTextFocused: isStorageCacheCapacityFocused,
      isValidInputText: isStorageCacheCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: storageCacheCapacity,
        contentKind: "storage cache capacity",
      }),
    });

  // screenreader accessible text input element
  const [createdStorageCacheCapacityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: storageCacheCapacityInputErrorText,
        valid: storageCacheCapacityInputValidText,
      },
      inputText: storageCacheCapacity,
      isValidInputText: isStorageCacheCapacityValid,
      label: "Storage Cache Capacity",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCacheCapacityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageCacheCapacity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsStorageCacheCapacityFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "storage cache capacity",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE CACHE CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdStorageCacheCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: "",
        label: "Storage Cache Capacity Unit",
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageCacheCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: storageCacheCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE FORM FACTOR
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdStorageFormFactorSelectInput] = returnAccessibleSelectInputElements([
    {
      data: STORAGE_FORM_FACTOR_DATA,
      description: "",
      label: "Storage Form Factor",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageFormFactor,
          payload: event.currentTarget.value as StorageFormFactor,
        });
      },
      value: storageFormFactor,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdStorageInterfaceSelectInput] = returnAccessibleSelectInputElements([
    {
      data: STORAGE_INTERFACE_DATA,
      description: "",
      label: "Storage Interface",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageInterface,
          payload: event.currentTarget.value as StorageInterface,
        });
      },
      value: storageInterface,
      required: true,
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STORAGE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddStorageFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional Storage field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setStorageFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreStorageFieldsAdditionalMapValid,
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
  const storageFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(storageFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      storageFieldsAdditionalMapKeysInputErrorText,
      storageFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Storage field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused: areStorageFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areStorageFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Storage field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      storageFieldsAdditionalMapKeysInputErrorText,
      storageFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯
  // returns an array of tuples containing the error and valid text elements for each field value
  const storageFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(storageFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      storageFieldsAdditionalMapValuesInputErrorText,
      storageFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Storage field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused: areStorageFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areStorageFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Storage field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      storageFieldsAdditionalMapValuesInputErrorText,
      storageFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdStorageFieldsAdditionalMapTextInputElements = Array.from(
    storageFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const storageFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: storageFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: storageFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areStorageFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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
            type: createProductAction.setStorageFieldsAdditionalMap,
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
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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
        semanticName: `additional Storage field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const storageFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: storageFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: storageFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areStorageFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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
            type: createProductAction.setStorageFieldsAdditionalMap,
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
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
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
        semanticName: `additional Storage field value ${mapKey + 1}`,
      };

    const [
      createdStorageFieldsAdditionalMapKeysTextAreaInput,
      createdStorageFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      storageFieldsAdditionalMapKeysTextInputCreatorInfo,
      storageFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setStorageFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreStorageFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Storage field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Storage field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`storageFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Storage field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdStorageFieldsAdditionalMapKeysTextAreaInput}
          {createdStorageFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayStorageFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Storage field ${storageFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddStorageFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayStorageSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Storage Specifications</Title>
        {displayStorageFieldsAdditionalMapButton}
      </Group>
      {createdStorageTypeSelectInput}
      {createdStorageInterfaceSelectInput}
      {createdStorageCapacityTextInput}
      {createdStorageCapacityUnitSelectInput}
      {createdStorageCacheCapacityTextInput}
      {createdStorageCacheCapacityUnitSelectInput}
      {createdStorageFormFactorSelectInput}
      {createdStorageFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayStorageSpecificationsInputs;
}

export default CreateStorage;
