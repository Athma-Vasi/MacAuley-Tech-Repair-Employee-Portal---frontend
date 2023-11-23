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
  returnDimensionsValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnMobileCameraResolutionValidationText,
  returnObjectKeyValidationText,
  returnSocketChipsetValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../../wrappers';
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
} from '../../constants';
import {
  CreateProductAction,
  CreateProductDispatch,
  MemoryUnit,
  MobileOs,
} from '../types';

type CreateSmartphoneProps = {
  areSmartphoneFieldsAdditionalFocused: Map<number, [boolean, boolean]>;
  areSmartphoneFieldsAdditionalValid: Map<number, [boolean, boolean]>;
  borderColor: string;
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
  smartphoneFieldsAdditional: Map<number, [string, string]>;
  smartphoneOs: MobileOs;
  smartphoneRamCapacity: string;
  smartphoneRamCapacityUnit: MemoryUnit;
  smartphoneResolutionHorizontal: string;
  smartphoneResolutionVertical: string;
  smartphoneStorageCapacity: string; // GB
};

function CreateSmartphone({
  areSmartphoneFieldsAdditionalFocused,
  areSmartphoneFieldsAdditionalValid,
  borderColor,
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
  smartphoneFieldsAdditional,
  smartphoneOs,
  smartphoneRamCapacity,
  smartphoneRamCapacityUnit,
  smartphoneResolutionHorizontal,
  smartphoneResolutionVertical,
  smartphoneStorageCapacity,
}: CreateSmartphoneProps) {
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

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
    const currentlyUpdatingSmartphoneFieldAdditional =
      smartphoneFieldsAdditional.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingSmartphoneFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingSmartphoneFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreSmartphoneFieldsAdditionalValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreSmartphoneFieldsAdditionalValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    smartphoneFieldsAdditional,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areSmartphoneHardcodedInputsInError =
      !isSmartphoneChipsetValid ||
      !isSmartphoneDisplayValid ||
      !isSmartphoneResolutionHorizontalValid ||
      !isSmartphoneResolutionVerticalValid ||
      !isSmartphoneRamCapacityValid ||
      !isSmartphoneStorageCapacityValid ||
      !isSmartphoneBatteryCapacityValid ||
      !isSmartphoneCameraValid ||
      !isSmartphoneColorValid;

    const areSmartphoneFieldsAdditionalInError = Array.from(
      areSmartphoneFieldsAdditionalValid
    ).some(([_key, value]) => !value);

    const areSmartphoneInputsInError =
      areSmartphoneHardcodedInputsInError ||
      areSmartphoneFieldsAdditionalInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areSmartphoneInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areSmartphoneFieldsAdditionalValid,
    createProductAction.setStepsInError,
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

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE OS
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSmartphoneOsSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOBILE_OS_DATA,
      description: '',
      label: 'Smartphone OS',
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

  // screenreader error/valid text elements
  const [smartphoneChipsetInputErrorText, smartphoneChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone chipset',
      inputText: smartphoneChipset,
      isInputTextFocused: isSmartphoneChipsetFocused,
      isValidInputText: isSmartphoneChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: smartphoneChipset,
        contentKind: 'smartphone chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // accessible text input element creator
  const [createdSmartphoneChipsetTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: smartphoneChipsetInputErrorText,
          valid: smartphoneChipsetInputValidText,
        },
        inputText: smartphoneChipset,
        isValidInputText: isSmartphoneChipsetValid,
        label: 'Smartphone Chipset',
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
        placeholder: 'Enter smartphone chipset',
        required: true,
        semanticName: 'smartphone chipset',
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [smartphoneDisplayInputErrorText, smartphoneDisplayInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone display',
      inputText: smartphoneDisplay,
      isInputTextFocused: isSmartphoneDisplayFocused,
      isValidInputText: isSmartphoneDisplayValid,
      regexValidationText: returnDimensionsValidationText({
        content: smartphoneDisplay,
        contentKind: 'smartphone display',
      }),
    });

  // accessible text input element creator
  const [createdSmartphoneDisplayTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: smartphoneDisplayInputErrorText,
          valid: smartphoneDisplayInputValidText,
        },
        inputText: smartphoneDisplay,
        isValidInputText: isSmartphoneDisplayValid,
        label: 'Smartphone Display (inches)',
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
        placeholder: 'Format: 000.00',
        required: true,
        semanticName: 'smartphone display',
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [
    smartphoneResolutionHorizontalInputErrorText,
    smartphoneResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone resolution horizontal',
    inputText: smartphoneResolutionHorizontal,
    isInputTextFocused: isSmartphoneResolutionHorizontalFocused,
    isValidInputText: isSmartphoneResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionHorizontal,
      contentKind: 'smartphone resolution horizontal',
    }),
  });

  // accessible text input element creator
  const [createdSmartphoneResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionHorizontalInputErrorText,
          valid: smartphoneResolutionHorizontalInputValidText,
        },
        inputText: smartphoneResolutionHorizontal,
        isValidInputText: isSmartphoneResolutionHorizontalValid,
        label: 'Smartphone Resolution Horizontal (pixels)',
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
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone resolution horizontal',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [
    smartphoneResolutionVerticalInputErrorText,
    smartphoneResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone resolution vertical',
    inputText: smartphoneResolutionVertical,
    isInputTextFocused: isSmartphoneResolutionVerticalFocused,
    isValidInputText: isSmartphoneResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneResolutionVertical,
      contentKind: 'smartphone resolution vertical',
    }),
  });

  // accessible text input element creator
  const [createdSmartphoneResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneResolutionVerticalInputErrorText,
          valid: smartphoneResolutionVerticalInputValidText,
        },
        inputText: smartphoneResolutionVertical,
        isValidInputText: isSmartphoneResolutionVerticalValid,
        label: 'Smartphone Resolution Vertical (pixels)',
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
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone resolution vertical',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RAM CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [
    smartphoneRamCapacityInputErrorText,
    smartphoneRamCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone ram capacity',
    inputText: smartphoneRamCapacity,
    isInputTextFocused: isSmartphoneRamCapacityFocused,
    isValidInputText: isSmartphoneRamCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: smartphoneRamCapacity,
      contentKind: 'smartphone ram capacity',
    }),
  });

  // accessible text input element creator
  const [createdSmartphoneRamCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneRamCapacityInputErrorText,
          valid: smartphoneRamCapacityInputValidText,
        },
        inputText: smartphoneRamCapacity,
        isValidInputText: isSmartphoneRamCapacityValid,
        label: 'Smartphone RAM Capacity (GB)',
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
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'smartphone ram capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE RAM CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSmartphoneRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'Smartphone RAM Capacity Unit',
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
    inputElementKind: 'smartphone storage capacity',
    inputText: smartphoneStorageCapacity,
    isInputTextFocused: isSmartphoneStorageCapacityFocused,
    isValidInputText: isSmartphoneStorageCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: smartphoneStorageCapacity,
      contentKind: 'smartphone storage capacity',
    }),
  });

  // accessible text input element creator
  const [createdSmartphoneStorageCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneStorageCapacityInputErrorText,
          valid: smartphoneStorageCapacityInputValidText,
        },
        inputText: smartphoneStorageCapacity,
        isValidInputText: isSmartphoneStorageCapacityValid,
        label: 'Smartphone Storage Capacity (GB)',
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
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'smartphone storage capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE BATTERY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [
    smartphoneBatteryCapacityInputErrorText,
    smartphoneBatteryCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'smartphone battery capacity',
    inputText: smartphoneBatteryCapacity,
    isInputTextFocused: isSmartphoneBatteryCapacityFocused,
    isValidInputText: isSmartphoneBatteryCapacityValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: smartphoneBatteryCapacity,
      contentKind: 'smartphone battery capacity',
    }),
  });

  // accessible text input element creator
  const [createdSmartphoneBatteryCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: smartphoneBatteryCapacityInputErrorText,
          valid: smartphoneBatteryCapacityInputValidText,
        },
        inputText: smartphoneBatteryCapacity,
        isValidInputText: isSmartphoneBatteryCapacityValid,
        label: 'Smartphone Battery Capacity (mAh)',
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
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'smartphone battery capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE CAMERA
  // ╰─────────────────────────────────────────────────────────────────╯
  const [smartphoneCameraInputErrorText, smartphoneCameraInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone camera',
      inputText: smartphoneCamera,
      isInputTextFocused: isSmartphoneCameraFocused,
      isValidInputText: isSmartphoneCameraValid,
      regexValidationText: returnMobileCameraResolutionValidationText({
        content: smartphoneCamera,
        contentKind: 'smartphone camera',
        maxLength: 84,
        minLength: 4,
      }),
    });

  // accessible text input element creator
  const [createdSmartphoneCameraTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneCameraInputErrorText,
        valid: smartphoneCameraInputValidText,
      },
      inputText: smartphoneCamera,
      isValidInputText: isSmartphoneCameraValid,
      label: 'Smartphone Camera',
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
      placeholder: 'Enter smartphone camera',
      required: true,
      semanticName: 'smartphone camera',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SMARTPHONE COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // screenreader error/valid text elements
  const [smartphoneColorInputErrorText, smartphoneColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'smartphone color',
      inputText: smartphoneColor,
      isInputTextFocused: isSmartphoneColorFocused,
      isValidInputText: isSmartphoneColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: smartphoneColor,
        contentKind: 'smartphone color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // accessible text input element creator
  const [createdSmartphoneColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: smartphoneColorInputErrorText,
        valid: smartphoneColorInputValidText,
      },
      inputText: smartphoneColor,
      isValidInputText: isSmartphoneColorValid,
      label: 'Smartphone Color',
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
      placeholder: 'Enter smartphone color',
      required: true,
      semanticName: 'smartphone color',
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   SMARTPHONE ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddSmartphoneFieldsAdditionalButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditional,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalValid,
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
  const smartphoneFieldsAdditionalKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalKeysInputErrorText,
      smartphoneFieldsAdditionalKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areSmartphoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      smartphoneFieldsAdditionalKeysInputErrorText,
      smartphoneFieldsAdditionalKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const smartphoneFieldsAdditionalValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(smartphoneFieldsAdditional).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader error/valid text elements that are consumed by the text input element creator
    const [
      smartphoneFieldsAdditionalValuesInputErrorText,
      smartphoneFieldsAdditionalValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areSmartphoneFieldsAdditionalFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areSmartphoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      smartphoneFieldsAdditionalValuesInputErrorText,
      smartphoneFieldsAdditionalValuesInputValidText,
    ];
  });

  const createdSmartphoneFieldsAdditionalTextInputElements = Array.from(
    smartphoneFieldsAdditional
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const smartphoneFieldsAdditionalKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            smartphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][0],
          valid:
            smartphoneFieldsAdditionalKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areSmartphoneFieldsAdditionalValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
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
            type: createProductAction.setSmartphoneFieldsAdditional,
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
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
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
    const smartphoneFieldsAdditionalValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            smartphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][0],
          valid:
            smartphoneFieldsAdditionalValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areSmartphoneFieldsAdditionalValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
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
            type: createProductAction.setSmartphoneFieldsAdditional,
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
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
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
      createdSmartphoneFieldsAdditionalKeysTextAreaInput,
      createdSmartphoneFieldsAdditionalValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      smartphoneFieldsAdditionalKeysTextInputCreatorInfo,
      smartphoneFieldsAdditionalValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setSmartphoneFieldsAdditional,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreSmartphoneFieldsAdditionalValid,
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
      <Stack key={`smartphoneFieldsAdditional-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Smartphone field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdSmartphoneFieldsAdditionalKeysTextAreaInput}
          {createdSmartphoneFieldsAdditionalValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  const displaySmartphoneFieldsAdditionalButton = (
    <Tooltip
      label={`Add new additional field ${smartphoneFieldsAdditional.size + 1}`}
    >
      <Group>{createdAddSmartphoneFieldsAdditionalButton}</Group>
    </Tooltip>
  );

  const displaySmartphoneSpecificationsInputs = (
    <Group
      py={padding}
      position="apart"
      style={{ borderBottom: borderColor }}
      w="100%"
    >
      <Group w="100%" position="apart">
        <Title order={4}>Smartphone Specifications</Title>
        {displaySmartphoneFieldsAdditionalButton}
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
      {createdSmartphoneFieldsAdditionalTextInputElements}
    </Group>
  );

  return displaySmartphoneSpecificationsInputs;
}

export default CreateSmartphone;
