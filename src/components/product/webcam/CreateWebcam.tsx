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
  returnObjectKeyValidationText,
  returnUserDefinedFieldValueValidationText,
} from "../../../utils";
import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
import {
  COLOR_VARIANT_REGEX,
  OBJECT_KEY_REGEX,
  USER_DEFINED_VALUE_REGEX,
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
} from "../constants";
import { CreateProductDispatch } from "../dispatch";
import {
  CreateProductAction,
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
} from "../types";

type CreateWebcamProps = {
  areWebcamFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areWebcamFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  isWebcamColorFocused: boolean;
  isWebcamColorValid: boolean;
  padding: MantineNumberSize;
  webcamColor: string;
  webcamFieldsAdditionalMap: Map<number, [string, string]>;
  webcamFrameRate: WebcamFrameRate;
  webcamInterface: WebcamInterface;
  webcamMicrophone: WebcamMicrophone;
  webcamResolution: WebcamResolution;
};

function CreateWebcam({
  areWebcamFieldsAdditionalMapFocused,
  areWebcamFieldsAdditionalMapValid,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  isWebcamColorFocused,
  isWebcamColorValid,
  padding,
  webcamColor,
  webcamFieldsAdditionalMap,
  webcamFrameRate,
  webcamInterface,
  webcamMicrophone,
  webcamResolution,
}: CreateWebcamProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM COLOR
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = COLOR_VARIANT_REGEX.test(webcamColor);

    createProductDispatch({
      type: createProductAction.setIsWebcamColorValid,
      payload: isValid,
    });
  }, [createProductAction.setIsWebcamColorValid, createProductDispatch, webcamColor]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM ADDITIONAL FIELDS
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const currentlyUpdatingWebcamFieldAdditional = webcamFieldsAdditionalMap.get(
      currentlySelectedAdditionalFieldIndex
    );

    if (!currentlyUpdatingWebcamFieldAdditional) {
      return;
    }

    const [key, value] = currentlyUpdatingWebcamFieldAdditional;

    const isKeyValid = OBJECT_KEY_REGEX.test(key);
    createProductDispatch({
      type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isKeyValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "key",
      },
    });

    const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
    createProductDispatch({
      type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
      payload: {
        operation: "update",
        data: isValueValid,
        index: currentlySelectedAdditionalFieldIndex,
        kind: "value",
      },
    });
  }, [
    createProductAction.setAreWebcamFieldsAdditionalMapValid,
    createProductDispatch,
    currentlySelectedAdditionalFieldIndex,
    webcamFieldsAdditionalMap,
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  useEffect(() => {
    // required inputs with empty string count as error
    // optional inputs with empty string count as valid
    // select inputs are not included as they always have a default value

    const areWebcamHardcodedRequiredInputsInError = !isWebcamColorValid;

    const areWebcamFieldsAdditionalMapInError = Array.from(
      areWebcamFieldsAdditionalMapValid
    ).some(([_key, value]) => value.includes(false));

    const areWebcamInputsInError =
      areWebcamHardcodedRequiredInputsInError || areWebcamFieldsAdditionalMapInError;

    createProductDispatch({
      type: createProductAction.setPageInError,
      payload: {
        kind: areWebcamInputsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    areWebcamFieldsAdditionalMapValid,
    createProductAction.setPageInError,
    createProductDispatch,
    isWebcamColorValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM RESOLUTION
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdWebcamResolutionSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEBCAM_RESOLUTION_DATA,
      description: "",
      label: "Webcam Resolution",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamResolution,
          payload: event.currentTarget.value as WebcamResolution,
        });
      },
      value: webcamResolution,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM COLOR
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [webcamColorInputErrorText, webcamColorInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "webcam color",
      inputText: webcamColor,
      isInputTextFocused: isWebcamColorFocused,
      isValidInputText: isWebcamColorValid,
      regexValidationText: returnColorVariantValidationText({
        content: webcamColor,
        contentKind: "webcam color",
      }),
    });

  // accessible text input element
  const [createdWebcamColorTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: webcamColorInputErrorText,
        valid: webcamColorInputValidText,
      },
      inputText: webcamColor,
      isValidInputText: isWebcamColorValid,
      label: "Webcam Color",
      onBlur: () => {
        createProductDispatch({
          type: createProductAction.setIsWebcamColorFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamColor,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        createProductDispatch({
          type: createProductAction.setIsWebcamColorFocused,
          payload: true,
        });
      },
      placeholder: "Enter webcam color",
      required: true,
      semanticName: "webcam color",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM MICROPHONE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdWebcamMicrophoneSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEBCAM_MICROPHONE_DATA,
      description: "",
      label: "Webcam Microphone",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamMicrophone,
          payload: event.currentTarget.value as WebcamMicrophone,
        });
      },
      value: webcamMicrophone,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM INTERFACE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdWebcamInterfaceSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEBCAM_INTERFACE_DATA,
      description: "",
      label: "Webcam Interface",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamInterface,
          payload: event.currentTarget.value as WebcamInterface,
        });
      },
      value: webcamInterface,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //    WEBCAM FRAME RATE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdWebcamFrameRateSelectInput] = returnAccessibleSelectInputElements([
    {
      data: WEBCAM_FRAME_RATE_DATA,
      description: "",
      label: "Webcam Frame Rate",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamFrameRate,
          payload: event.currentTarget.value as WebcamFrameRate,
        });
      },
      value: webcamFrameRate,
      required: true,
    },
  ]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //   WEBCAM ADDITIONAL FIELDS
  // ╚═════════════════════════════════════════════════════════════════╝

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ADD ADDITIONAL FIELD BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdAddWebcamFieldsAdditionalMapButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Add",
      semanticDescription: "Add new additional Webcam field",
      semanticName: "Add new field",
      leftIcon: <TbPlus />,
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        createProductDispatch({
          type: createProductAction.setWebcamFieldsAdditionalMap,
          payload: {
            operation: "add",
            data: ["", ""],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
          payload: {
            operation: "add",
            data: [false, false],
          },
        });

        createProductDispatch({
          type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
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
  const webcamFieldsAdditionalMapKeysErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(webcamFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [field, _value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      webcamFieldsAdditionalMapKeysInputErrorText,
      webcamFieldsAdditionalMapKeysInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Webcam field name ${mapKey + 1}`,
      inputText: field,
      isInputTextFocused: areWebcamFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
      isValidInputText: areWebcamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
      regexValidationText: returnObjectKeyValidationText({
        content: field,
        contentKind: `additional Webcam field name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
      }),
    });

    return [
      webcamFieldsAdditionalMapKeysInputErrorText,
      webcamFieldsAdditionalMapKeysInputValidText,
    ];
  });

  // ╭─────────────────────────────────────────────────────────────────╮
  //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
  // ╰─────────────────────────────────────────────────────────────────╯

  // returns an array of tuples containing the error and valid text elements for each field value
  const webcamFieldsAdditionalMapValuesErrorValidTextElements: [
    JSX.Element,
    JSX.Element
  ][] = Array.from(webcamFieldsAdditionalMap).map((keyFieldValue) => {
    const [mapKey, [_field, value]] = keyFieldValue;

    // screenreader accessible error/valid text elements that are consumed by the text input element creator
    const [
      webcamFieldsAdditionalMapValuesInputErrorText,
      webcamFieldsAdditionalMapValuesInputValidText,
    ] = AccessibleErrorValidTextElements({
      inputElementKind: `additional Webcam field value ${mapKey + 1}`,
      inputText: value,
      isInputTextFocused: areWebcamFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
      isValidInputText: areWebcamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
      regexValidationText: returnUserDefinedFieldValueValidationText({
        content: value,
        contentKind: `additional Webcam field value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
      }),
    });

    return [
      webcamFieldsAdditionalMapValuesInputErrorText,
      webcamFieldsAdditionalMapValuesInputValidText,
    ];
  });

  const createdWebcamFieldsAdditionalMapTextInputElements = Array.from(
    webcamFieldsAdditionalMap
  ).map((keyFieldValue) => {
    const [mapKey, [field, value]] = keyFieldValue;

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
    // ╰─────────────────────────────────────────────────────────────────╯
    const webcamFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: webcamFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
          valid: webcamFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
        },
        inputText: field,
        isValidInputText: areWebcamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
        label: `Name ${mapKey + 1}`,
        maxLength: 75,
        minLength: 1,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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
            type: createProductAction.setWebcamFieldsAdditionalMap,
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
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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
        semanticName: `additional Webcam field name ${mapKey + 1}`,
      };

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
    // ╰─────────────────────────────────────────────────────────────────╯
    const webcamFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
      {
        description: {
          error: webcamFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
          valid: webcamFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
        },
        inputText: value,
        isValidInputText: areWebcamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
        label: `Value ${mapKey + 1}`,
        maxLength: 2000,
        minLength: 2,
        onBlur: () => {
          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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
            type: createProductAction.setWebcamFieldsAdditionalMap,
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
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
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
        semanticName: `additional Webcam field value ${mapKey + 1}`,
      };

    const [
      createdWebcamFieldsAdditionalMapKeysTextAreaInput,
      createdWebcamFieldsAdditionalMapValuesTextAreaInput,
    ] = returnAccessibleTextAreaInputElements([
      webcamFieldsAdditionalMapKeysTextInputCreatorInfo,
      webcamFieldsAdditionalMapValuesTextInputCreatorInfo,
    ]);

    // ╭─────────────────────────────────────────────────────────────────╮
    //    DELETE FIELD BUTTON
    // ╰─────────────────────────────────────────────────────────────────╯
    const [createdDeleteButton] = returnAccessibleButtonElements([
      {
        buttonLabel: "Delete",
        buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
          createProductDispatch({
            type: createProductAction.setWebcamFieldsAdditionalMap,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapFocused,
            payload: {
              operation: "remove",
              index: mapKey,
            },
          });

          createProductDispatch({
            type: createProductAction.setAreWebcamFieldsAdditionalMapValid,
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
        semanticDescription: `Delete additional Webcam field ${mapKey + 1}`,
        semanticName: "Delete field and value",
      },
    ]);

    const displayDeleteButton = (
      <Tooltip label={`Delete additional Webcam field ${mapKey + 1}`}>
        <Group>{createdDeleteButton}</Group>
      </Tooltip>
    );

    return (
      <Stack key={`webcamFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
        <Group position="apart">
          <Text size="md" weight={600}>{`Additional Webcam field ${mapKey + 1}`}</Text>
          {displayDeleteButton}
        </Group>
        <Group position="apart">
          {createdWebcamFieldsAdditionalMapKeysTextAreaInput}
          {createdWebcamFieldsAdditionalMapValuesTextAreaInput}
        </Group>
      </Stack>
    );
  });

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayWebcamFieldsAdditionalMapButton = (
    <Tooltip label={`Add additional Webcam field ${webcamFieldsAdditionalMap.size + 1}`}>
      <Group>{createdAddWebcamFieldsAdditionalMapButton}</Group>
    </Tooltip>
  );

  const displayWebcamSpecificationsInputs = (
    <Group py={padding} position="apart" w="100%">
      <Group w="100%" position="apart">
        <Title order={4}>Webcam Specifications</Title>
        {displayWebcamFieldsAdditionalMapButton}
      </Group>
      {createdWebcamResolutionSelectInput}
      {createdWebcamColorTextInput}
      {createdWebcamMicrophoneSelectInput}
      {createdWebcamInterfaceSelectInput}
      {createdWebcamFrameRateSelectInput}
      {createdWebcamFieldsAdditionalMapTextInputElements}
    </Group>
  );

  return displayWebcamSpecificationsInputs;
}

export default CreateWebcam;
