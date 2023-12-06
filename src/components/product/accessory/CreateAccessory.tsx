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
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  ACCESSORY_TYPE_REGEX,
  COLOR_VARIANT_REGEX,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import { CreateProductAction, PeripheralsInterface } from "../types";

type CreateAccessoryProps = {
  accessoryColor: string;
  accessoryFieldsAdditionalMap: Map<number, [string, string]>;
  accessoryInterface: PeripheralsInterface;
  accessoryType: string;
  areAccessoryFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areAccessoryFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isAccessoryColorFocused: boolean;
  isAccessoryColorValid: boolean;
  isAccessoryTypeFocused: boolean;
  isAccessoryTypeValid: boolean;
  padding: MantineNumberSize;
};

function CreateAccessory({
  accessoryColor,
  accessoryFieldsAdditionalMap,
  accessoryInterface,
  accessoryType,
  areAccessoryFieldsAdditionalMapFocused,
  areAccessoryFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isAccessoryColorFocused,
  isAccessoryColorValid,
  isAccessoryTypeFocused,
  isAccessoryTypeValid,
  padding,
}: CreateAccessoryProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = ACCESSORY_TYPE_REGEX.test(accessoryType);

    createProductDispatch({
      type: createProductAction.setIsAccessoryTypeValid,
      payload: isValid,
    });
  }, [accessoryType, createProductAction.setIsAccessoryTypeValid, createProductDispatch]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(accessoryColor);

    createProductDispatch({
      type: createProductAction.setIsAccessoryColorValid,
      payload: isValid,
    });
  }, [
    accessoryColor,
    createProductAction.setIsAccessoryColorValid,
    createProductDispatch,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingAccessoryFieldAdditional = accessoryFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingAccessoryFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingAccessoryFieldAdditional;
    const isKeyValid = OBJECT_KEY_REGEX.test(key);

    createProductDispatch({
      type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    currentlySelectedAdditionalFieldIndex,
    accessoryFieldsAdditionalMap,
    createProductDispatch,
    createProductAction.setAreAccessoryFieldsAdditionalMapValid,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝

  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areAccessoryInputsHardcodedInError =
      !isAccessoryTypeValid || !isAccessoryColorValid;

    const areAccessoryInputsUserDefinedInError = Array.from(
      areAccessoryFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areAccessoryInputsInError =
      areAccessoryInputsHardcodedInError || areAccessoryInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areAccessoryInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areAccessoryFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isAccessoryColorValid,
    isAccessoryTypeValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY TYPE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [accessoryTypeInputErrorText, accessoryTypeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "accessory type",
      inputText: accessoryType,
      isInputTextFocused: isAccessoryTypeFocused,
      isValidInputText: isAccessoryTypeValid,
      regexValidationText: returnBrandNameValidationText({
        content: accessoryType,
        contentKind: "accessory type",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdAccessoryTypeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: accessoryTypeInputErrorText,
        valid: accessoryTypeInputValidText,
      },
      inputText: accessoryType,
      isValidInputText: isAccessoryTypeValid,
      label: "Accessory Type",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryTypeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryType,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryTypeFocused,
          payload: true,
        });
      },
      placeholder: "Enter accessory type",
      required: true,
      semanticName: "accessory type",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [accessoryColorInputErrorText, accessoryColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "accessory color",
      inputText: accessoryColor,
      isInputTextFocused: isAccessoryColorFocused,
      isValidInputText: isAccessoryColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: accessoryColor,
        contentKind: "accessory color",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdAccessoryColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: accessoryColorInputErrorText,
        valid: accessoryColorInputValidText,
      },
      inputText: accessoryColor,
      isValidInputText: isAccessoryColorValid,
      label: "Accessory Color",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsAccessoryColorFocused,
          payload: true,
        });
      },
      placeholder: "Enter accessory color",
      required: true,
      semanticName: "accessory color",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ACCESSORY INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯

  // select input element creator
  const [createdAccessoryInterfaceSelectInput] = returnAccessibleSelectInputElements([
    {
      data: PERIPHERALS_INTERFACE_DATA,
      description: "",
      label: "Accessory Interface",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryInterface,
          payload: event.currentTarget.value as PeripheralsInterface,
        });
      },
      value: accessoryInterface,
      required: true,
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    ACCESSORY ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddAccessoryFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional Accessory field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setAccessoryFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
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
  const accessoryFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      accessoryFieldsAdditionalMapKeysInputErrorText,
      accessoryFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Accessory field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areAccessoryFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Accessory field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      accessoryFieldsAdditionalMapKeysInputErrorText,
      accessoryFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const accessoryFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(accessoryFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      accessoryFieldsAdditionalMapValuesInputErrorText,
      accessoryFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Accessory field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areAccessoryFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Accessory field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      accessoryFieldsAdditionalMapValuesInputErrorText,
      accessoryFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdAccessoryFieldsAdditionalMapTextInputElements = Array.from(
    accessoryFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const accessoryFieldsAdditionalMapKeyTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: accessoryFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: accessoryFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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
            type: createProductAction.setAccessoryFieldsAdditionalMap,
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
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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
        semanticName: `additional Accessory field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const accessoryFieldsAdditionalMapValueTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: accessoryFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: accessoryFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areAccessoryFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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
            type: createProductAction.setAccessoryFieldsAdditionalMap,
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
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
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
        semanticName: `additional Accessory field value ${mapKey + 1}`,
      };

    const [
      createdAccessoryFieldsAdditionalMapKeyTextAreaInput,
      createdAccessoryFieldsAdditionalMapValueTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      accessoryFieldsAdditionalMapKeyTextInputCreatorInfo,
      accessoryFieldsAdditionalMapValueTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setAccessoryFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreAccessoryFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Accessory field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Accessory field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`accessoryFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Accessory field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdAccessoryFieldsAdditionalMapKeyTextAreaInput}
          {createdAccessoryFieldsAdditionalMapValueTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayAccessoryFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Accessory field ${accessoryFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddAccessoryFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayAccessorySpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Accessory Specifications</Title>
        {displayAccessoryFieldsAdditionalMapButton}
      </Group>
      {createdAccessoryTypeTextInput}
      {createdAccessoryColorTextInput}
      {createdAccessoryInterfaceSelectInput}
      {createdAccessoryFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayAccessorySpecificationsInputs;
}

export default CreateAccessory;
