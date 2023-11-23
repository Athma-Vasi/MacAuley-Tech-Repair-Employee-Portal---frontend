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
  returnLargeIntegerValidationText,
  returnObjectKeyValidationText,
  returnSmallIntegerValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  LARGE_INTEGER_REGEX,
  MOUSE_SENSOR_DATA,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  SMALL_INTEGER_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  MouseSensor,
  PeripheralsInterface,
} from '../types';

type CreateMouseProps = {
  areMouseFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areMouseFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isMouseButtonsFocused: boolean;
  isMouseButtonsValid: boolean;
  isMouseColorFocused: boolean;
  isMouseColorValid: boolean;
  isMouseDpiFocused: boolean;
  isMouseDpiValid: boolean;
  mouseButtons: string;
  mouseColor: string;
  mouseDpi: string;
  mouseFieldsAdditionalMap: Map<number, [string, string]>;
  mouseInterface: PeripheralsInterface;
  mouseSensor: MouseSensor;
  padding: MantineNumberSize;
};

function CreateMouse({
  areMouseFieldsAdditionalMapFocused,
  areMouseFieldsAdditionalMapValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isMouseButtonsFocused,
  isMouseButtonsValid,
  isMouseColorFocused,
  isMouseColorValid,
  isMouseDpiFocused,
  isMouseDpiValid,
  mouseButtons,
  mouseColor,
  mouseDpi,
  mouseFieldsAdditionalMap,
  mouseInterface,
  mouseSensor,
  padding,
}: CreateMouseProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE DPI
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(mouseDpi);

    createProductDispatch({
      type: createProductAction.setIsMouseDpiValid,
      payload: isValid,
    });
  }, [createProductAction.setIsMouseDpiValid, createProductDispatch, mouseDpi]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE BUTTONS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = SMALL_INTEGER_REGEX.test(mouseButtons);

    createProductDispatch({
      type: createProductAction.setIsMouseButtonsValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMouseButtonsValid,
    createProductDispatch,
    mouseButtons,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(mouseColor);

    createProductDispatch({
      type: createProductAction.setIsMouseColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsMouseColorValid,
    createProductDispatch,
    mouseColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingMouseFieldAdditional = mouseFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingMouseFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingMouseFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreMouseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreMouseFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreMouseFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    mouseFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areMouseInputsHardcodedInError =
      !isMouseButtonsValid || !isMouseColorValid || !isMouseDpiValid;

    const areMouseInputsUserDefinedInError = Array.from(
      areMouseFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areMouseInputsInError =
      areMouseInputsHardcodedInError || areMouseInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areMouseInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areMouseFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isMouseButtonsValid,
    isMouseColorValid,
    isMouseDpiValid,
    mouseInterface,
    mouseSensor,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE SENSOR
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMouseSensorSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOUSE_SENSOR_DATA,
      description: '',
      label: 'Mouse Sensor',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseSensor,
          payload: event.currentTarget.value as MouseSensor,
        });
      },
      value: mouseSensor,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE DPI
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [mouseDpiInputErrorText, mouseDpiInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse dpi',
      inputText: mouseDpi,
      isInputTextFocused: isMouseDpiFocused,
      isValidInputText: isMouseDpiValid,
      regexValidationText: returnLargeIntegerValidationText({
        content: mouseDpi,
        contentKind: 'mouse dpi',
      }),
    });

  // screenreader accessible text input element
  const [createdMouseDpiTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseDpiInputErrorText,
        valid: mouseDpiInputValidText,
      },
      inputText: mouseDpi,
      isValidInputText: isMouseDpiValid,
      label: 'Mouse DPI (dots per inch)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseDpiFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseDpi,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseDpiFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 000000',
      required: true,
      semanticName: 'mouse dpi',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE BUTTONS
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [mouseButtonsInputErrorText, mouseButtonsInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse buttons quantity',
      inputText: mouseButtons,
      isInputTextFocused: isMouseButtonsFocused,
      isValidInputText: isMouseButtonsValid,
      regexValidationText: returnSmallIntegerValidationText({
        content: mouseButtons,
        contentKind: 'mouse buttons quantity',
      }),
    });

  // screenreader accessible text input element
  const [createdMouseButtonsTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseButtonsInputErrorText,
        valid: mouseButtonsInputValidText,
      },
      inputText: mouseButtons,
      isValidInputText: isMouseButtonsValid,
      label: 'Mouse Buttons Quantity',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseButtonsFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseButtons,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseButtonsFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 00',
      required: true,
      semanticName: 'mouse buttons quantity',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [mouseColorInputErrorText, mouseColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'mouse color',
      inputText: mouseColor,
      isInputTextFocused: isMouseColorFocused,
      isValidInputText: isMouseColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: mouseColor,
        contentKind: 'mouse color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdMouseColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: mouseColorInputErrorText,
        valid: mouseColorInputValidText,
      },
      inputText: mouseColor,
      isValidInputText: isMouseColorValid,
      label: 'Mouse Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setMouseColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsMouseColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter mouse color',
      required: true,
      semanticName: 'mouse color',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdMouseInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Mouse Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: mouseInterface,
        required: true,
      },
    ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   MOUSE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddMouseFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapValid,
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
  const mouseFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(mouseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      mouseFieldsAdditionalMapKeysInputErrorText,
      mouseFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areMouseFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areMouseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      mouseFieldsAdditionalMapKeysInputErrorText,
      mouseFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const mouseFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(mouseFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      mouseFieldsAdditionalMapValuesInputErrorText,
      mouseFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areMouseFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areMouseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      mouseFieldsAdditionalMapValuesInputErrorText,
      mouseFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdMouseFieldsAdditionalMapTextInputElements = Array.from(
    mouseFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const mouseFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: mouseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: mouseFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areMouseFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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
            type: createProductAction.setMouseFieldsAdditionalMap,
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
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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
    const mouseFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            mouseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            mouseFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areMouseFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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
            type: createProductAction.setMouseFieldsAdditionalMap,
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
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
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
      createdMouseFieldsAdditionalMapKeysTextAreaInput,
      createdMouseFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      mouseFieldsAdditionalMapKeysTextInputCreatorInfo,
      mouseFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setMouseFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreMouseFieldsAdditionalMapValid,
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
      <Stack key={`mouseFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Mouse field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdMouseFieldsAdditionalMapKeysTextAreaInput}
          {createdMouseFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayMouseFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add new additional field ${mouseFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddMouseFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayMouseSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Mouse Specifications</Title>
        {displayMouseFieldsAdditionalMapButton}
      </Group>
      {createdMouseSensorSelectInput}
      {createdMouseDpiTextInput}
      {createdMouseButtonsTextInput}
      {createdMouseColorTextInput}
      {createdMouseInterfaceSelectInput}
      {createdMouseFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayMouseSpecificationsInputs;
}

export default CreateMouse;
