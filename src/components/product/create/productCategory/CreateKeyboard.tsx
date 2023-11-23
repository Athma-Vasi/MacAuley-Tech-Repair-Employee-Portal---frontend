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
} from '../../../../jsxCreators';
import {
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
import {
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  OBJECT_KEY_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  USER_DEFINED_VALUE_REGEX,
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  PeripheralsInterface,
} from '../types';

type CreateKeyboardProps = {
  areKeyboardFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areKeyboardFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  keyboardBacklight: KeyboardBacklight;
  keyboardFieldsAdditionalMap: Map<number, [string, string]>;
  keyboardInterface: PeripheralsInterface;
  keyboardLayout: KeyboardLayout;
  keyboardSwitch: KeyboardSwitch;
  padding: MantineNumberSize;
};

function CreateKeyboard({
  areKeyboardFieldsAdditionalMapFocused,
  areKeyboardFieldsAdditionalMapValid,
  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  keyboardBacklight,
  keyboardFieldsAdditionalMap,
  keyboardInterface,
  keyboardLayout,
  keyboardSwitch,
  padding,
}: CreateKeyboardProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingKeyboardFieldAdditional =
      keyboardFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingKeyboardFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingKeyboardFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreKeyboardFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    keyboardFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areKeyboardInputsUserDefinedInError = Array.from(
      areKeyboardFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areKeyboardInputsUserDefinedInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areKeyboardFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    keyboardBacklight,
    keyboardInterface,
    keyboardLayout,
    keyboardSwitch,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD SWITCH
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdKeyboardSwitchSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_SWITCH_DATA,
        description: '',
        label: 'Keyboard Switch',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardSwitch,
            payload: event.currentTarget.value as KeyboardSwitch,
          });
        },
        value: keyboardSwitch,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD LAYOUT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdKeyboardLayoutSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_LAYOUT_DATA,
        description: '',
        label: 'Keyboard Layout',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardLayout,
            payload: event.currentTarget.value as KeyboardLayout,
          });
        },
        value: keyboardLayout,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD BACKLIGHT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdKeyboardBacklightSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: KEYBOARD_BACKLIGHT_DATA,
        description: '',
        label: 'Keyboard Backlight',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardBacklight,
            payload: event.currentTarget.value as KeyboardBacklight,
          });
        },
        value: keyboardBacklight,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdKeyboardInterfaceSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: PERIPHERALS_INTERFACE_DATA,
        description: '',
        label: 'Keyboard Interface',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardInterface,
            payload: event.currentTarget.value as PeripheralsInterface,
          });
        },
        value: keyboardInterface,
        required: true,
      },
    ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   KEYBOARD ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddKeyboardFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional Keyboard field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
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
  const keyboardFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(keyboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      keyboardFieldsAdditionalMapKeysInputErrorText,
      keyboardFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areKeyboardFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      keyboardFieldsAdditionalMapKeysInputErrorText,
      keyboardFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const keyboardFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(keyboardFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      keyboardFieldsAdditionalMapValuesInputErrorText,
      keyboardFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areKeyboardFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      keyboardFieldsAdditionalMapValuesInputErrorText,
      keyboardFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdKeyboardFieldsAdditionalMapTextInputElements = Array.from(
    keyboardFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const keyboardFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            keyboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid:
            keyboardFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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
            type: createProductAction.setKeyboardFieldsAdditionalMap,
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
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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
    const keyboardFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            keyboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            keyboardFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areKeyboardFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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
            type: createProductAction.setKeyboardFieldsAdditionalMap,
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
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
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
      createdKeyboardFieldsAdditionalMapKeysTextAreaInput,
      createdKeyboardFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      keyboardFieldsAdditionalMapKeysTextInputCreatorInfo,
      keyboardFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setKeyboardFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreKeyboardFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Keyboard field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Keyboard field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack
        key={`keyboardFieldsAdditionalMap-${mapKey}`}
        pt={padding}
        w="100%"
      >
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Keyboard field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdKeyboardFieldsAdditionalMapKeysTextAreaInput}
          {createdKeyboardFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayKeyboardFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Keyboard field ${
        keyboardFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddKeyboardFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayKeyboardSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Keyboard Specifications</Title>
        {displayKeyboardFieldsAdditionalMapButton}
      </Group>
      {createdKeyboardSwitchSelectInput}
      {createdKeyboardLayoutSelectInput}
      {createdKeyboardBacklightSelectInput}
      {createdKeyboardInterfaceSelectInput}
      {createdKeyboardFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayKeyboardSpecificationsInputs;
}

export default CreateKeyboard;
