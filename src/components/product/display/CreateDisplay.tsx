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
  returnDimensionsValidationText,
  returnDisplayAspectRatioValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  DIMENSIONS_REGEX,
  DISPLAY_ASPECT_RATIO_REGEX,
  DISPLAY_PANEL_TYPE_DATA,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  OBJECT_KEY_REGEX,
  USER_DEFINED_VALUE_REGEX,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import { CreateProductAction, DisplayPanelType } from "../types";

type CreateDisplayProps = {
  areDisplayFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areDisplayFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  displayAspectRatio: string;
  displayFieldsAdditionalMap: Map<number, [string, string]>;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string; // inches
  isDisplayAspectRatioFocused: boolean;
  isDisplayAspectRatioValid: boolean;
  isDisplayRefreshRateFocused: boolean;
  isDisplayRefreshRateValid: boolean;
  isDisplayResolutionHorizontalFocused: boolean;
  isDisplayResolutionHorizontalValid: boolean;
  isDisplayResolutionVerticalFocused: boolean;
  isDisplayResolutionVerticalValid: boolean;
  isDisplayResponseTimeFocused: boolean;
  isDisplayResponseTimeValid: boolean;
  isDisplaySizeFocused: boolean;
  isDisplaySizeValid: boolean;
  padding: MantineNumberSize;
};

function CreateDisplay({
  areDisplayFieldsAdditionalMapFocused,
  areDisplayFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  displayAspectRatio,
  displayFieldsAdditionalMap,
  displayPanelType,
  displayRefreshRate,
  displayResolutionHorizontal,
  displayResolutionVertical,
  displayResponseTime,
  displaySize,
  isDisplayAspectRatioFocused,
  isDisplayAspectRatioValid,
  isDisplayRefreshRateFocused,
  isDisplayRefreshRateValid,
  isDisplayResolutionHorizontalFocused,
  isDisplayResolutionHorizontalValid,
  isDisplayResolutionVerticalFocused,
  isDisplayResolutionVerticalValid,
  isDisplayResponseTimeFocused,
  isDisplayResponseTimeValid,
  isDisplaySizeFocused,
  isDisplaySizeValid,
  padding,
}: CreateDisplayProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY SIZE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(displaySize);

    createProductDispatch({
      type: createProductAction.setIsDisplaySizeValid,
      payload: isValid,
    });
  }, [createProductAction.setIsDisplaySizeValid, createProductDispatch, displaySize]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(displayResolutionHorizontal);

    createProductDispatch({
      type: createProductAction.setIsDisplayResolutionHorizontalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsDisplayResolutionHorizontalValid,
    createProductDispatch,
    displayResolutionHorizontal,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = LARGE_INTEGER_REGEX.test(displayResolutionVertical);

    createProductDispatch({
      type: createProductAction.setIsDisplayResolutionVerticalValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsDisplayResolutionVerticalValid,
    createProductDispatch,
    displayResolutionVertical,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY REFRESH RATE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = MEDIUM_INTEGER_REGEX.test(displayRefreshRate);

    createProductDispatch({
      type: createProductAction.setIsDisplayRefreshRateValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsDisplayRefreshRateValid,
    createProductDispatch,
    displayRefreshRate,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESPONSE TIME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DIMENSIONS_REGEX.test(displayResponseTime);

    createProductDispatch({
      type: createProductAction.setIsDisplayResponseTimeValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsDisplayResponseTimeValid,
    createProductDispatch,
    displayResponseTime,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY ASPECT RATIO
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DISPLAY_ASPECT_RATIO_REGEX.test(displayAspectRatio);

    createProductDispatch({
      type: createProductAction.setIsDisplayAspectRatioValid,
      payload: isValid,
    });
  }, [
    createProductAction.setIsDisplayAspectRatioValid,
    createProductDispatch,
    displayAspectRatio,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingDisplayFieldAdditional = displayFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingDisplayFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingDisplayFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreDisplayFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    displayFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areDisplayInputsHardcodedInError =
      !isDisplayAspectRatioValid ||
      !isDisplayRefreshRateValid ||
      !isDisplayResolutionHorizontalValid ||
      !isDisplayResolutionVerticalValid ||
      !isDisplayResponseTimeValid ||
      !isDisplaySizeValid;

    const areDisplayInputsUserDefinedInError = Array.from(
      areDisplayFieldsAdditionalMapValid
    ).some(([_key, value]) => !value);

    const areDisplayInputsInError =
      areDisplayInputsHardcodedInError || areDisplayInputsUserDefinedInError;

    createProductDispatch({
      type: createProductAction.setStepsInError,
      payload: {
        kind: areDisplayInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areDisplayFieldsAdditionalMapValid,
    createProductAction.setStepsInError,
    createProductDispatch,
    isDisplayAspectRatioValid,
    isDisplayRefreshRateValid,
    isDisplayResolutionHorizontalValid,
    isDisplayResolutionVerticalValid,
    isDisplayResponseTimeValid,
    isDisplaySizeValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY SIZE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [displaySizeInputErrorText, displaySizeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "display size",
      inputText: displaySize,
      isInputTextFocused: isDisplaySizeFocused,
      isValidInputText: isDisplaySizeValid,
      regexValidationText: returnDimensionsValidationText({
        content: displaySize,
        contentKind: "display size",
      }),
    });

  // screenreader accessible text input element
  const [createdDisplaySizeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displaySizeInputErrorText,
        valid: displaySizeInputValidText,
      },
      inputText: displaySize,
      isValidInputText: isDisplaySizeValid,
      label: "Display Size (inches)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplaySizeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplaySize,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplaySizeFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000.00",
      required: true,
      semanticName: "display size",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESOLUTION HORIZONTAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    displayResolutionHorizontalInputErrorText,
    displayResolutionHorizontalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "display resolution horizontal",
    inputText: displayResolutionHorizontal,
    isInputTextFocused: isDisplayResolutionHorizontalFocused,
    isValidInputText: isDisplayResolutionHorizontalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: displayResolutionHorizontal,
      contentKind: "display resolution horizontal",
    }),
  });

  // screenreader accessible text input element
  const [createdDisplayResolutionHorizontalTextInput] = returnAccessibleTextInputElements(
    [
      {
        description: {
          error: displayResolutionHorizontalInputErrorText,
          valid: displayResolutionHorizontalInputValidText,
        },
        inputText: displayResolutionHorizontal,
        isValidInputText: isDisplayResolutionHorizontalValid,
        label: "Display Resolution Horizontal (pixels)",
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionHorizontalFocused,
            payload: false,
          });
        },
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayResolutionHorizontal,
            payload: event.currentTarget.value,
          });
        },
        onFocus: () => {
          createProductDispatch({
            type: createProductAction.setIsDisplayResolutionHorizontalFocused,
            payload: true,
          });
        },
        placeholder: "Format: 000000",
        required: true,
        semanticName: "display resolution horizontal",
      },
    ]
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESOLUTION VERTICAL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [
    displayResolutionVerticalInputErrorText,
    displayResolutionVerticalInputValidText,
  ] = AccessibleErrorValidTextElements({
    inputElementKind: "display resolution vertical",
    inputText: displayResolutionVertical,
    isInputTextFocused: isDisplayResolutionVerticalFocused,
    isValidInputText: isDisplayResolutionVerticalValid,
    regexValidationText: returnLargeIntegerValidationText({
      content: displayResolutionVertical,
      contentKind: "display resolution vertical",
    }),
  });

  // screenreader accessible text input element
  const [createdDisplayResolutionVerticalTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displayResolutionVerticalInputErrorText,
        valid: displayResolutionVerticalInputValidText,
      },
      inputText: displayResolutionVertical,
      isValidInputText: isDisplayResolutionVerticalValid,
      label: "Display Resolution Vertical (pixels)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayResolutionVerticalFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayResolutionVertical,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayResolutionVerticalFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000000",
      required: true,
      semanticName: "display resolution vertical",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY REFRESH RATE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [displayRefreshRateInputErrorText, displayRefreshRateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "display refresh rate",
      inputText: displayRefreshRate,
      isInputTextFocused: isDisplayRefreshRateFocused,
      isValidInputText: isDisplayRefreshRateValid,
      regexValidationText: returnMediumIntegerValidationText({
        content: displayRefreshRate,
        contentKind: "display refresh rate",
      }),
    });

  // screenreader accessible text input element
  const [createdDisplayRefreshRateTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displayRefreshRateInputErrorText,
        valid: displayRefreshRateInputValidText,
      },
      inputText: displayRefreshRate,
      isValidInputText: isDisplayRefreshRateValid,
      label: "Display Refresh Rate (Hz)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayRefreshRateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayRefreshRate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayRefreshRateFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000",
      required: true,
      semanticName: "display refresh rate",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY PANEL TYPE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdDisplayPanelTypeSelectInput] = returnAccessibleSelectInputElements([
    {
      data: DISPLAY_PANEL_TYPE_DATA,
      description: "",
      label: "Display Panel Type",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayPanelType,
          payload: event.currentTarget.value as DisplayPanelType,
        });
      },
      value: displayPanelType,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY RESPONSE TIME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [displayResponseTimeInputErrorText, displayResponseTimeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "display response time",
      inputText: displayResponseTime,
      isInputTextFocused: isDisplayResponseTimeFocused,
      isValidInputText: isDisplayResponseTimeValid,
      regexValidationText: returnDimensionsValidationText({
        content: displayResponseTime,
        contentKind: "display response time",
      }),
    });

  // screenreader accessible text input element
  const [createdDisplayResponseTimeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displayResponseTimeInputErrorText,
        valid: displayResponseTimeInputValidText,
      },
      inputText: displayResponseTime,
      isValidInputText: isDisplayResponseTimeValid,
      label: "Display Response Time (ms)",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayResponseTimeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayResponseTime,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayResponseTimeFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000.00",
      required: true,
      semanticName: "display response time",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY ASPECT RATIO
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [displayAspectRatioInputErrorText, displayAspectRatioInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "display aspect ratio",
      inputText: displayAspectRatio,
      isInputTextFocused: isDisplayAspectRatioFocused,
      isValidInputText: isDisplayAspectRatioValid,
      regexValidationText: returnDisplayAspectRatioValidationText({
        content: displayAspectRatio,
        contentKind: "display aspect ratio",
        maxLength: 5,
        minLength: 3,
      }),
    });

  // screenreader accessible text input element
  const [createdDisplayAspectRatioTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: displayAspectRatioInputErrorText,
        valid: displayAspectRatioInputValidText,
      },
      inputText: displayAspectRatio,
      isValidInputText: isDisplayAspectRatioValid,
      label: "Display Aspect Ratio",
      maxLength: 5,
      minLength: 3,
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayAspectRatioFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayAspectRatio,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsDisplayAspectRatioFocused,
          payload: true,
        });
      },
      placeholder: "Format: 00:00",
      required: true,
      semanticName: "display aspect ratio",
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddDisplayFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional Display field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setDisplayFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
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
  const displayFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(displayFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      displayFieldsAdditionalMapKeysInputErrorText,
      displayFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Display field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused: areDisplayFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areDisplayFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Display field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      displayFieldsAdditionalMapKeysInputErrorText,
      displayFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯
  // returns an array of tuples containing the error and valid text elements for each field value
  const displayFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(displayFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // error/valid text elements that are consumed by the text input element creator
    const [
      displayFieldsAdditionalMapValuesInputErrorText,
      displayFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Display field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused: areDisplayFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areDisplayFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Display field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      displayFieldsAdditionalMapValuesInputErrorText,
      displayFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdDisplayFieldsAdditionalMapTextInputElements = Array.from(
    displayFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const displayFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: displayFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: displayFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areDisplayFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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
            type: createProductAction.setDisplayFieldsAdditionalMap,
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
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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
        semanticName: `additional Display field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const displayFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: displayFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: displayFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areDisplayFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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
            type: createProductAction.setDisplayFieldsAdditionalMap,
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
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
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
        semanticName: `additional Display field value ${mapKey + 1}`,
      };

    const [
      createdDisplayFieldsAdditionalMapKeysTextAreaInput,
      createdDisplayFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      displayFieldsAdditionalMapKeysTextInputCreatorInfo,
      displayFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setDisplayFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreDisplayFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Display field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Display field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`displayFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Display field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdDisplayFieldsAdditionalMapKeysTextAreaInput}
          {createdDisplayFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayDisplayFieldsAdditionalMapButton = (
    <Tooltip
      label={`Add additional Display field ${displayFieldsAdditionalMap.size + 1}`}
    >
      <Group>{createdAddDisplayFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayDisplaySpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Display Specifications</Title>
        {displayDisplayFieldsAdditionalMapButton}
      </Group>
      {createdDisplaySizeTextInput}
      {createdDisplayResolutionHorizontalTextInput}
      {createdDisplayResolutionVerticalTextInput}
      {createdDisplayRefreshRateTextInput}
      {createdDisplayPanelTypeSelectInput}
      {createdDisplayResponseTimeTextInput}
      {createdDisplayAspectRatioTextInput}
      {createdDisplayFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayDisplaySpecificationsInputs;
}

export default CreateDisplay;
