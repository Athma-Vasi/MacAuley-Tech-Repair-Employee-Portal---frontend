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
} from '../../../jsxCreators';
import {
  returnColorVariantValidationText,
  returnDimensionsValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnMobileCameraResolutionValidationText,
  returnObjectKeyValidationText,
  returnSocketChipsetValidationText,
  returnUserDefinedFieldValueValidationText,
} from '../../../utils';
import { AccessibleTextAreaInputCreatorInfo } from '../../wrappers';
import {
  COLOR_VARIANT_REGEX,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_SELECT_INPUT_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  OBJECT_KEY_REGEX,
  TABLET_CHIPSET_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from '../constants';
import { CreateProductDispatch } from '../dispatches';
import { CreateProductAction, MemoryUnit, MobileOs } from '../types';

type CreateTabletProps = {
  areTabletFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areTabletFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isTabletBatteryCapacityFocused: boolean;
  isTabletBatteryCapacityValid: boolean;
  isTabletCameraFocused: boolean;
  isTabletCameraValid: boolean;
  isTabletChipsetFocused: boolean;
  isTabletChipsetValid: boolean;
  isTabletColorFocused: boolean;
  isTabletColorValid: boolean;
  isTabletDisplayFocused: boolean;
  isTabletDisplayValid: boolean;
  isTabletRamCapacityFocused: boolean;
  isTabletRamCapacityValid: boolean;
  isTabletResolutionHorizontalFocused: boolean;
  isTabletResolutionHorizontalValid: boolean;
  isTabletResolutionVerticalFocused: boolean;
  isTabletResolutionVerticalValid: boolean;
  isTabletStorageCapacityFocused: boolean;
  isTabletStorageCapacityValid: boolean;
  padding: MantineNumberSize;
  tabletBatteryCapacity: string; // mAh
  tabletCamera: string; // 108 MP, 64 MP, etc.
  tabletChipset: string;
  tabletColor: string;
  tabletDisplay: string;
  tabletFieldsAdditionalMap: Map<number, [string, string]>;
  tabletOs: MobileOs;
  tabletRamCapacity: string;
  tabletRamCapacityUnit: MemoryUnit;
  tabletResolutionHorizontal: string;
  tabletResolutionVertical: string;
  tabletStorageCapacity: string; // GB
};

function CreateTablet({
  areTabletFieldsAdditionalMapFocused,
  areTabletFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isTabletBatteryCapacityFocused,
  isTabletBatteryCapacityValid,
  isTabletCameraFocused,
  isTabletCameraValid,
  isTabletChipsetFocused,
  isTabletChipsetValid,
  isTabletColorFocused,
  isTabletColorValid,
  isTabletDisplayFocused,
  isTabletDisplayValid,
  isTabletRamCapacityFocused,
  isTabletRamCapacityValid,
  isTabletResolutionHorizontalFocused,
  isTabletResolutionHorizontalValid,
  isTabletResolutionVerticalFocused,
  isTabletResolutionVerticalValid,
  isTabletStorageCapacityFocused,
  isTabletStorageCapacityValid,
  padding,
  tabletBatteryCapacity,
  tabletCamera,
  tabletChipset,
  tabletColor,
  tabletDisplay,
  tabletFieldsAdditionalMap,
  tabletOs,
  tabletRamCapacity,
  tabletRamCapacityUnit,
  tabletResolutionHorizontal,
  tabletResolutionVertical,
  tabletStorageCapacity,
}: CreateTabletProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = TABLET_CHIPSET_REGEX.test(tabletChipset);

    createProductDispatch({
      type: createProductAction.setIsTabletChipsetValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletChipsetValid,
    createProductDispatch,
    tabletChipset,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(tabletDisplay);

    createProductDispatch({
      type: createProductAction.setIsTabletDisplayValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletDisplayValid,
    createProductDispatch,
    tabletDisplay,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsTabletResolutionHorizontalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletResolutionHorizontalValid,
    createProductDispatch,
    tabletResolutionHorizontal,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsTabletResolutionVerticalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletResolutionVerticalValid,
    createProductDispatch,
    tabletResolutionVertical,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RAM CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(tabletRamCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletRamCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletRamCapacityValid,
    createProductDispatch,
    tabletRamCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(tabletStorageCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletStorageCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletStorageCapacityValid,
    createProductDispatch,
    tabletStorageCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET BATTERY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(tabletBatteryCapacity);

    createProductDispatch({
      type: createProductAction.setIsTabletBatteryCapacityValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletBatteryCapacityValid,
    createProductDispatch,
    tabletBatteryCapacity,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET CAMERA
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MOBILE_CAMERA_REGEX.test(tabletCamera);

    createProductDispatch({
      type: createProductAction.setIsTabletCameraValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletCameraValid,
    createProductDispatch,
    tabletCamera,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(tabletColor);

    createProductDispatch({
      type: createProductAction.setIsTabletColorValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsTabletColorValid,
    createProductDispatch,
    tabletColor,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingTabletFieldAdditional =
      tabletFieldsAdditionalMap.get(currentlySelectedAdditionalFieldIndex);

    if (!currentlyUpdatingTabletFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingTabletFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreTabletFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'key',
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreTabletFieldsAdditionalMapValid,
      payload: {
        operation: 'update',
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: 'value',
      },
    });
  }, [
    createProductAction.setAreTabletFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    tabletFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areTabletHardcodedRequiredInputsInError =
      !isTabletChipsetValid ||
      !isTabletDisplayValid ||
      !isTabletResolutionHorizontalValid ||
      !isTabletResolutionVerticalValid ||
      !isTabletRamCapacityValid ||
      !isTabletStorageCapacityValid ||
      !isTabletBatteryCapacityValid ||
      !isTabletCameraValid ||
      !isTabletColorValid;

    const areTabletFieldsAdditionalMapInError = Array.from(
      areTabletFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areTabletInputsInError =
      areTabletHardcodedRequiredInputsInError ||
      areTabletFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areTabletInputsInError ? 'add' : 'delete',
        step: 1,
      },
    });
  }, [
    areTabletFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isTabletBatteryCapacityValid,
    isTabletCameraValid,
    isTabletChipsetValid,
    isTabletColorValid,
    isTabletDisplayValid,
    isTabletRamCapacityValid,
    isTabletResolutionHorizontalValid,
    isTabletResolutionVerticalValid,
    isTabletStorageCapacityValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET OS
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdTabletOsSelectInput] = returnAccessibleSelectInputElements([
    {
      data: MOBILE_OS_DATA,
      description: '',
      label: 'Tablet OS',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletOs,
          payload: event.currentTarget.value as MobileOs,
        });
      },
      value: tabletOs,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET CHIPSET
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [tabletChipsetInputErrorText, tabletChipsetInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet chipset',
      inputText: tabletChipset,
      isInputTextFocused: isTabletChipsetFocused,
      isValidInputText: isTabletChipsetValid,
      regexValidationText: returnSocketChipsetValidationText({
        content: tabletChipset,
        contentKind: 'tablet chipset',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdTabletChipsetTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletChipsetInputErrorText,
        valid: tabletChipsetInputValidText,
      },
      inputText: tabletChipset,
      isValidInputText: isTabletChipsetValid,
      label: 'Tablet Chipset',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletChipsetFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletChipset,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletChipsetFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet chipset',
      required: true,
      semanticName: 'tablet chipset',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET DISPLAY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [tabletDisplayInputErrorText, tabletDisplayInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet display',
      inputText: tabletDisplay,
      isInputTextFocused: isTabletDisplayFocused,
      isValidInputText: isTabletDisplayValid,
      regexValidationText: returnDimensionsValidationText({
        content: tabletDisplay,
        contentKind: 'tablet display',
      }),
    });

  // screenreader accessible text input element
  const [createdTabletDisplayTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletDisplayInputErrorText,
        valid: tabletDisplayInputValidText,
      },
      inputText: tabletDisplay,
      isValidInputText: isTabletDisplayValid,
      label: 'Tablet Display (inches)',
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletDisplayFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletDisplay,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletDisplayFocused,
          payload: true,
        });
      },
      placeholder: 'Format: 000.00',
      required: true,
      semanticName: 'tablet display',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    tabletResolutionHorizontalInputErrorText,
    tabletResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet resolution horizontal',
    inputText: tabletResolutionHorizontal,
    isInputTextFocused: isTabletResolutionHorizontalFocused,
    isValidInputText: isTabletResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletResolutionHorizontal,
      contentKind: 'tablet resolution horizontal',
    }),
  });

  // screenreader accessible text input element
  const [createdTabletResolutionHorizontalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletResolutionHorizontalInputErrorText,
          valid: tabletResolutionHorizontalInputValidText,
        },
        inputText: tabletResolutionHorizontal,
        isValidInputText: isTabletResolutionHorizontalValid,
        label: 'Tablet Resolution Horizontal (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet resolution horizontal',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    tabletResolutionVerticalInputErrorText,
    tabletResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet resolution vertical',
    inputText: tabletResolutionVertical,
    isInputTextFocused: isTabletResolutionVerticalFocused,
    isValidInputText: isTabletResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletResolutionVertical,
      contentKind: 'tablet resolution vertical',
    }),
  });

  // screenreader accessible text input element
  const [createdTabletResolutionVerticalTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletResolutionVerticalInputErrorText,
          valid: tabletResolutionVerticalInputValidText,
        },
        inputText: tabletResolutionVertical,
        isValidInputText: isTabletResolutionVerticalValid,
        label: 'Tablet Resolution Vertical (pixels)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionVerticalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletResolutionVertical,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletResolutionVerticalFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet resolution vertical',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RAM CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [tabletRamCapacityInputErrorText, tabletRamCapacityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet ram capacity',
      inputText: tabletRamCapacity,
      isInputTextFocused: isTabletRamCapacityFocused,
      isValidInputText: isTabletRamCapacityValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: tabletRamCapacity,
        contentKind: 'tablet ram capacity',
      }),
    });

  // screenreader accessible text input element
  const [createdTabletRamCapacityTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: tabletRamCapacityInputErrorText,
          valid: tabletRamCapacityInputValidText,
        },
        inputText: tabletRamCapacity,
        isValidInputText: isTabletRamCapacityValid,
        label: 'Tablet RAM Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletRamCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletRamCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletRamCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'tablet ram capacity',
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET RAM CAPACITY UNIT
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdTabletRamCapacityUnitSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: MEMORY_UNIT_SELECT_INPUT_DATA,
        description: '',
        label: 'Tablet RAM Capacity Unit',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletRamCapacityUnit,
            payload: event.currentTarget.value as MemoryUnit,
          });
        },
        value: tabletRamCapacityUnit,
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET STORAGE CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [
    tabletStorageCapacityInputErrorText,
    tabletStorageCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet storage capacity',
    inputText: tabletStorageCapacity,
    isInputTextFocused: isTabletStorageCapacityFocused,
    isValidInputText: isTabletStorageCapacityValid,
    regexValidationText: returnMediumIntegerValidationText({
      content: tabletStorageCapacity,
      contentKind: 'tablet storage capacity',
    }),
  });

  // screenreader accessible text input element
  const [createdTabletStorageCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletStorageCapacityInputErrorText,
          valid: tabletStorageCapacityInputValidText,
        },
        inputText: tabletStorageCapacity,
        isValidInputText: isTabletStorageCapacityValid,
        label: 'Tablet Storage Capacity (GB)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletStorageCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletStorageCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletStorageCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 0000',
        required: true,
        semanticName: 'tablet storage capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET BATTERY CAPACITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    tabletBatteryCapacityInputErrorText,
    tabletBatteryCapacityInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: 'tablet battery capacity',
    inputText: tabletBatteryCapacity,
    isInputTextFocused: isTabletBatteryCapacityFocused,
    isValidInputText: isTabletBatteryCapacityValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: tabletBatteryCapacity,
      contentKind: 'tablet battery capacity',
    }),
  });

  // screenreader accessible text input element
  const [createdTabletBatteryCapacityTextInput] =
    returnAccessibleTextInputElements([
      {
        description: {
          error: tabletBatteryCapacityInputErrorText,
          valid: tabletBatteryCapacityInputValidText,
        },
        inputText: tabletBatteryCapacity,
        isValidInputText: isTabletBatteryCapacityValid,
        label: 'Tablet Battery Capacity (mAh)',
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletBatteryCapacityFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletBatteryCapacity,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsTabletBatteryCapacityFocused,
            payload: true,
          });
        },
        placeholder: 'Format: 000000',
        required: true,
        semanticName: 'tablet battery capacity',
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET CAMERA
  // ╰─────────────────────────────────────────────────────────────────╯
  const [tabletCameraInputErrorText, tabletCameraInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet camera',
      inputText: tabletCamera,
      isInputTextFocused: isTabletCameraFocused,
      isValidInputText: isTabletCameraValid,
      regexValidationText: returnMobileCameraResolutionValidationText({
        content: tabletCamera,
        contentKind: 'tablet camera',
        maxLength: 84,
        minLength: 4,
      }),
    });

  // screenreader accessible text input element
  const [createdTabletCameraTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletCameraInputErrorText,
        valid: tabletCameraInputValidText,
      },
      inputText: tabletCamera,
      isValidInputText: isTabletCameraValid,
      label: 'Tablet Camera',
      maxLength: 84,
      minLength: 4,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletCameraFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletCamera,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletCameraFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet camera',
      required: true,
      semanticName: 'tablet camera',
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    TABLET COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [tabletColorInputErrorText, tabletColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: 'tablet color',
      inputText: tabletColor,
      isInputTextFocused: isTabletColorFocused,
      isValidInputText: isTabletColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: tabletColor,
        contentKind: 'tablet color',
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdTabletColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: tabletColorInputErrorText,
        valid: tabletColorInputValidText,
      },
      inputText: tabletColor,
      isValidInputText: isTabletColorValid,
      label: 'Tablet Color',
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setTabletColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsTabletColorFocused,
          payload: true,
        });
      },
      placeholder: 'Enter tablet color',
      required: true,
      semanticName: 'tablet color',
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   TABLET ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddTabletFieldsAdditionalMapButton] =
    returnAccessibleButtonElements([
      {
        buttonLabel: 'Add',
        semanticDescription: 'Add new additional Tablet field',
        semanticName: 'Add new field',
        leftIcon: <TbPlus />,
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'add',
              data: ['', ''],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'add',
              data: [false, false],
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapValid,
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
  const tabletFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(tabletFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      tabletFieldsAdditionalMapKeysInputErrorText,
      tabletFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Tablet field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused:
        areTabletFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText:
        areTabletFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Tablet field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      tabletFieldsAdditionalMapKeysInputErrorText,
      tabletFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const tabletFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(tabletFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      tabletFieldsAdditionalMapValuesInputErrorText,
      tabletFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Tablet field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused:
        areTabletFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText:
        areTabletFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Tablet field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      tabletFieldsAdditionalMapValuesInputErrorText,
      tabletFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdTabletFieldsAdditionalMapTextInputElements = Array.from(
    tabletFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const tabletFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: tabletFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: tabletFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText:
          areTabletFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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
            type: createProductAction.setTabletFieldsAdditionalMap,
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
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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
        semanticName: `additional Tablet field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const tabletFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error:
            tabletFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid:
            tabletFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText:
          areTabletFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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
            type: createProductAction.setTabletFieldsAdditionalMap,
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
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
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
        semanticName: `additional Tablet field value ${mapKey + 1}`,
      };

    const [
      createdTabletFieldsAdditionalMapKeysTextAreaInput,
      createdTabletFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      tabletFieldsAdditionalMapKeysTextInputCreatorInfo,
      tabletFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: 'Delete',
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setTabletFieldsAdditionalMap,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapFocused,
            payload: {
              operation: 'remove',
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreTabletFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Tablet field ${mapKey + 1}`,
        semanticName: 'Delete field and value',
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Tablet field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`tabletFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Tablet field ${
            mapKey + 1
          }`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdTabletFieldsAdditionalMapKeysTextAreaInput}
          {createdTabletFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayTabletFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Tablet field ${
        tabletFieldsAdditionalMap.size + 1
      }`}
    >
      <Group>{createdAddTabletFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayTabletSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Tablet Specifications</Title>
        {displayTabletFieldsAdditionalMapButton}
      </Group>
      {createdTabletOsSelectInput}
      {createdTabletChipsetTextInput}
      {createdTabletDisplayTextInput}
      {createdTabletResolutionHorizontalTextInput}
      {createdTabletResolutionVerticalTextInput}
      {createdTabletColorTextInput}
      {createdTabletRamCapacityTextInput}
      {createdTabletRamCapacityUnitSelectInput}
      {createdTabletStorageCapacityTextInput}
      {createdTabletBatteryCapacityTextInput}
      {createdTabletCameraTextInput}
      {createdTabletFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayTabletSpecificationsInputs;
}

export { CreateTablet };
