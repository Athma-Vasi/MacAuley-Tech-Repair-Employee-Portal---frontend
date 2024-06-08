export {};
// import { Group, MantineNumberSize, Stack, Text, Title, Tooltip } from "@mantine/core";
// import { ChangeEvent, MouseEvent, useEffect } from "react";
// import { TbPlus, TbTrash } from "react-icons/tb";

// import {
//   AccessibleErrorValidTextElements,
//   returnAccessibleButtonElements,
//   returnAccessibleSelectInputElements,
//   returnAccessibleTextAreaInputElements,
//   returnAccessibleTextInputElements,
// } from "../../../jsxCreators";
// import {
//   returnColorVariantValidationText,
//   returnFrequencyResponseValidationText,
//   returnObjectKeyValidationText,
//   returnUserDefinedFieldValueValidationText,
// } from "../../../utils";
// import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
// import {
//   COLOR_VARIANT_REGEX,
//   FREQUENCY_RESPONSE_REGEX,
//   MICROPHONE_INTERFACE_DATA,
//   MICROPHONE_POLAR_PATTERN_DATA,
//   MICROPHONE_TYPE_DATA,
//   OBJECT_KEY_REGEX,
//   USER_DEFINED_VALUE_REGEX,
// } from "../constants";
// import { CreateProductDispatch } from "../dispatch";
// import {
//   CreateProductAction,
//   MicrophoneInterface,
//   MicrophonePolarPattern,
//   MicrophoneType,
// } from "../types";

// type CreateMicrophoneProps = {
//   areMicrophoneFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
//   areMicrophoneFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
//   createProductAction: CreateProductAction;
//   createProductDispatch: React.Dispatch<CreateProductDispatch>;
//   currentlySelectedAdditionalFieldIndex: number;
//   isMicrophoneColorFocused: boolean;
//   isMicrophoneColorValid: boolean;
//   isMicrophoneFrequencyResponseFocused: boolean;
//   isMicrophoneFrequencyResponseValid: boolean;
//   microphoneColor: string;
//   microphoneFieldsAdditionalMap: Map<number, [string, string]>;
//   microphoneFrequencyResponse: string;
//   microphoneInterface: MicrophoneInterface;
//   microphonePolarPattern: MicrophonePolarPattern;
//   microphoneType: MicrophoneType;
//   padding: MantineNumberSize;
// };

// function CreateMicrophone({
//   areMicrophoneFieldsAdditionalMapFocused,
//   areMicrophoneFieldsAdditionalMapValid,
//   createProductAction,
//   createProductDispatch,
//   currentlySelectedAdditionalFieldIndex,
//   isMicrophoneColorFocused,
//   isMicrophoneColorValid,
//   isMicrophoneFrequencyResponseFocused,
//   isMicrophoneFrequencyResponseValid,
//   microphoneColor,
//   microphoneFieldsAdditionalMap,
//   microphoneFrequencyResponse,
//   microphoneInterface,
//   microphonePolarPattern,
//   microphoneType,
//   padding,
// }: CreateMicrophoneProps) {
//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    VALIDATION USE EFFECTS
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE COLOR
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = COLOR_VARIANT_REGEX.test(microphoneColor);

//     createProductDispatch({
//       type: createProductAction.setIsMicrophoneColorValid,
//       payload: isValid,
//     });
//   }, [
//     createProductAction.setIsMicrophoneColorValid,
//     createProductDispatch,
//     microphoneColor,
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE FREQUENCY RESPONSE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = FREQUENCY_RESPONSE_REGEX.test(microphoneFrequencyResponse);

//     createProductDispatch({
//       type: createProductAction.setIsMicrophoneFrequencyResponseValid,
//       payload: isValid,
//     });
//   }, [
//     createProductAction.setIsMicrophoneFrequencyResponseValid,
//     createProductDispatch,
//     microphoneFrequencyResponse,
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE FIELDS ADDITIONAL
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const currentlyUpdatingMicrophoneFieldAdditional = microphoneFieldsAdditionalMap.get(
//       currentlySelectedAdditionalFieldIndex
//     );

//     if (!currentlyUpdatingMicrophoneFieldAdditional) {
//       return;
//     }

//     const [key, value] = currentlyUpdatingMicrophoneFieldAdditional;

//     const isKeyValid = OBJECT_KEY_REGEX.test(key);
//     createProductDispatch({
//       type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
//       payload: {
//         operation: "update",
//         data: isKeyValid,
//         index: currentlySelectedAdditionalFieldIndex,
//         kind: "key",
//       },
//     });

//     const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
//     createProductDispatch({
//       type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
//       payload: {
//         operation: "update",
//         data: isValueValid,
//         index: currentlySelectedAdditionalFieldIndex,
//         kind: "value",
//       },
//     });
//   }, [
//     createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
//     createProductDispatch,
//     currentlySelectedAdditionalFieldIndex,
//     microphoneFieldsAdditionalMap,
//   ]);

//   // ╔═════════════════════════════════════════════════════════════════╗
//   //   STEPPER STATE UPDATE
//   // ╚═════════════════════════════════════════════════════════════════╝
//   useEffect(() => {
//     // required inputs with empty string count as error
//     // optional inputs with empty string count as valid
//     // select inputs are not included as they always have a default value

//     const areMicrophoneInputsHardcodedInError =
//       !isMicrophoneColorValid || !isMicrophoneFrequencyResponseValid;

//     const areMicrophoneInputsUserDefinedInError = Array.from(
//       areMicrophoneFieldsAdditionalMapValid
//     ).some(([_key, value]) => value.includes(false));

//     const areMicrophoneInputsInError =
//       areMicrophoneInputsHardcodedInError || areMicrophoneInputsUserDefinedInError;

//     createProductDispatch({
//       type: createProductAction.setPageInError,
//       payload: {
//         kind: areMicrophoneInputsInError ? "add" : "delete",
//         step: 1,
//       },
//     });
//   }, [
//     areMicrophoneFieldsAdditionalMapValid,
//     createProductAction.setPageInError,
//     createProductDispatch,
//     isMicrophoneColorValid,
//     isMicrophoneFrequencyResponseValid,
//     microphoneInterface,
//     microphonePolarPattern,
//     microphoneType,
//   ]);

//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    INPUT CREATION
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE TYPE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdMicrophoneTypeSelectInput] = returnAccessibleSelectInputElements([
//     {
//       data: MICROPHONE_TYPE_DATA,
//       description: "",
//       label: "Microphone Type",
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         createProductDispatch({
//           type: createProductAction.setMicrophoneType,
//           payload: event.currentTarget.value as MicrophoneType,
//         });
//       },
//       value: microphoneType,
//       required: true,
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE COLOR
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // error/valid text elements
//   const [microphoneColorInputErrorText, microphoneColorInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "microphone color",
//       inputText: microphoneColor,
//       isInputTextFocused: isMicrophoneColorFocused,
//       isValidInputText: isMicrophoneColorValid,
//       regexValidationText: returnColorVariantValidationText({
//         content: microphoneColor,
//         contentKind: "microphone color",
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdMicrophoneColorTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: microphoneColorInputErrorText,
//         valid: microphoneColorInputValidText,
//       },
//       inputText: microphoneColor,
//       isValidInputText: isMicrophoneColorValid,
//       label: "Microphone Color",
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsMicrophoneColorFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setMicrophoneColor,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsMicrophoneColorFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Enter microphone color",
//       required: true,
//       semanticName: "microphone color",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE INTERFACE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdMicrophoneInterfaceSelectInput] = returnAccessibleSelectInputElements([
//     {
//       data: MICROPHONE_INTERFACE_DATA,
//       description: "",
//       label: "Microphone Interface",
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         createProductDispatch({
//           type: createProductAction.setMicrophoneInterface,
//           payload: event.currentTarget.value as MicrophoneInterface,
//         });
//       },
//       value: microphoneInterface,
//       required: true,
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE POLAR PATTERN
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdMicrophonePolarPatternSelectInput] = returnAccessibleSelectInputElements([
//     {
//       data: MICROPHONE_POLAR_PATTERN_DATA,
//       description: "",
//       label: "Microphone Polar Pattern",
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         createProductDispatch({
//           type: createProductAction.setMicrophonePolarPattern,
//           payload: event.currentTarget.value as MicrophonePolarPattern,
//         });
//       },
//       value: microphonePolarPattern,
//       required: true,
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    MICROPHONE FREQUENCY RESPONSE
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // error/valid text elements
//   const [
//     microphoneFrequencyResponseInputErrorText,
//     microphoneFrequencyResponseInputValidText,
//   ] = AccessibleErrorValidTextElements({
//     inputElementKind: "microphone frequency response",
//     inputText: microphoneFrequencyResponse,
//     isInputTextFocused: isMicrophoneFrequencyResponseFocused,
//     isValidInputText: isMicrophoneFrequencyResponseValid,
//     regexValidationText: returnFrequencyResponseValidationText({
//       content: microphoneFrequencyResponse,
//       contentKind: "microphone frequency response",
//     }),
//   });

//   // screenreader accessible text input element
//   const [createdMicrophoneFrequencyResponseTextInput] = returnAccessibleTextInputElements(
//     [
//       {
//         description: {
//           error: microphoneFrequencyResponseInputErrorText,
//           valid: microphoneFrequencyResponseInputValidText,
//         },
//         inputText: microphoneFrequencyResponse,
//         isValidInputText: isMicrophoneFrequencyResponseValid,
//         label: "Microphone Frequency Response (Hz-kHz)",
//         onBlur: () => {
//           createProductDispatch({
//             type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
//             payload: false,
//           });
//         },
//         onChange: (event: ChangeEvent<HTMLInputElement>) => {
//           createProductDispatch({
//             type: createProductAction.setMicrophoneFrequencyResponse,
//             payload: event.currentTarget.value,
//           });
//         },
//         onFocus: () => {
//           createProductDispatch({
//             type: createProductAction.setIsMicrophoneFrequencyResponseFocused,
//             payload: true,
//           });
//         },
//         placeholder: "Format: 00 Hz - 00 kHz",
//         required: true,
//         semanticName: "microphone frequency response",
//       },
//     ]
//   );

//   // ╔═════════════════════════════════════════════════════════════════╗
//   //   MICROPHONE ADDITIONAL FIELDS
//   // ╚═════════════════════════════════════════════════════════════════╝

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    ADD ADDITIONAL FIELD BUTTON
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdAddMicrophoneFieldsAdditionalMapButton] = returnAccessibleButtonElements([
//     {
//       buttonLabel: "Add",
//       semanticDescription: "Add new additional Headphone field",
//       semanticName: "Add new field",
//       leftIcon: <TbPlus />,
//       buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
//         createProductDispatch({
//           type: createProductAction.setMicrophoneFieldsAdditionalMap,
//           payload: {
//             operation: "add",
//             data: ["", ""],
//           },
//         });

//         createProductDispatch({
//           type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//           payload: {
//             operation: "add",
//             data: [false, false],
//           },
//         });

//         createProductDispatch({
//           type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
//           payload: {
//             operation: "add",
//             data: [false, false],
//           },
//         });
//       },
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    ERROR/VALID ELEMENTS TUPLE => FIELD NAMES
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // returns an array of tuples containing the error and valid text elements for each field name
//   const microphoneFieldsAdditionalMapKeysErrorValidTextElements: [
//     JSX.Element,
//     JSX.Element
//   ][] = Array.from(microphoneFieldsAdditionalMap).map((keyFieldValue) => {
//     const [mapKey, [field, _value]] = keyFieldValue;

//     // error/valid text elements that are consumed by the text input element creator
//     const [
//       microphoneFieldsAdditionalMapKeysInputErrorText,
//       microphoneFieldsAdditionalMapKeysInputValidText,
//     ] = AccessibleErrorValidTextElements({
//       inputElementKind: `additional Microphone field name ${mapKey + 1}`,
//       inputText: field,
//       isInputTextFocused:
//         areMicrophoneFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
//       isValidInputText: areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
//       regexValidationText: returnObjectKeyValidationText({
//         content: field,
//         contentKind: `additional Microphone field name ${mapKey + 1}`,
//         maxLength: 75,
//         minLength: 1,
//       }),
//     });

//     return [
//       microphoneFieldsAdditionalMapKeysInputErrorText,
//       microphoneFieldsAdditionalMapKeysInputValidText,
//     ];
//   });

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // returns an array of tuples containing the error and valid text elements for each field value
//   const microphoneFieldsAdditionalMapValuesErrorValidTextElements: [
//     JSX.Element,
//     JSX.Element
//   ][] = Array.from(microphoneFieldsAdditionalMap).map((keyFieldValue) => {
//     const [mapKey, [_field, value]] = keyFieldValue;

//     // error/valid text elements that are consumed by the text input element creator
//     const [
//       microphoneFieldsAdditionalMapValuesInputErrorText,
//       microphoneFieldsAdditionalMapValuesInputValidText,
//     ] = AccessibleErrorValidTextElements({
//       inputElementKind: `additional Microphone field value ${mapKey + 1}`,
//       inputText: value,
//       isInputTextFocused:
//         areMicrophoneFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
//       isValidInputText: areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
//       regexValidationText: returnUserDefinedFieldValueValidationText({
//         content: value,
//         contentKind: `additional Microphone field value ${mapKey + 1}`,
//         maxLength: 2000,
//         minLength: 2,
//       }),
//     });

//     return [
//       microphoneFieldsAdditionalMapValuesInputErrorText,
//       microphoneFieldsAdditionalMapValuesInputValidText,
//     ];
//   });

//   const createdMicrophoneFieldsAdditionalMapTextInputElements = Array.from(
//     microphoneFieldsAdditionalMap
//   ).map((keyFieldValue) => {
//     const [mapKey, [field, value]] = keyFieldValue;

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const microphoneFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
//       {
//         description: {
//           error: microphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
//           valid: microphoneFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
//         },
//         inputText: field,
//         isValidInputText: areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
//         label: `Name ${mapKey + 1}`,
//         maxLength: 75,
//         minLength: 1,
//         onBlur: () => {
//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//             payload: {
//               operation: "update",
//               data: false,
//               index: mapKey,
//               kind: "key",
//             },
//           });
//         },
//         onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
//           createProductDispatch({
//             type: createProductAction.setMicrophoneFieldsAdditionalMap,
//             payload: {
//               operation: "update",
//               data: event.currentTarget.value,
//               index: mapKey,
//               kind: "key",
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
//             payload: mapKey,
//           });
//         },
//         onFocus: () => {
//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//             payload: {
//               operation: "update",
//               data: true,
//               index: mapKey,
//               kind: "key",
//             },
//           });
//         },
//         placeholder: "Enter additional field name",
//         required: true,
//         semanticName: `additional Microphone field name ${mapKey + 1}`,
//       };

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const microphoneFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
//       {
//         description: {
//           error: microphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
//           valid: microphoneFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
//         },
//         inputText: value,
//         isValidInputText: areMicrophoneFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
//         label: `Value ${mapKey + 1}`,
//         maxLength: 2000,
//         minLength: 2,
//         onBlur: () => {
//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//             payload: {
//               operation: "update",
//               data: false,
//               index: mapKey,
//               kind: "value",
//             },
//           });
//         },
//         onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
//           createProductDispatch({
//             type: createProductAction.setMicrophoneFieldsAdditionalMap,
//             payload: {
//               operation: "update",
//               data: event.currentTarget.value,
//               index: mapKey,
//               kind: "value",
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
//             payload: mapKey,
//           });
//         },
//         onFocus: () => {
//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//             payload: {
//               operation: "update",
//               data: true,
//               index: mapKey,
//               kind: "value",
//             },
//           });
//         },
//         placeholder: "Enter additional field value",
//         required: true,
//         semanticName: `additional Microphone field value ${mapKey + 1}`,
//       };

//     const [
//       createdMicrophoneFieldsAdditionalMapKeysTextAreaInput,
//       createdMicrophoneFieldsAdditionalMapValuesTextAreaInput,
//     ] = returnAccessibleTextAreaInputElements([
//       microphoneFieldsAdditionalMapKeysTextInputCreatorInfo,
//       microphoneFieldsAdditionalMapValuesTextInputCreatorInfo,
//     ]);

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    DELETE FIELD BUTTON
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const [createdDeleteButton] = returnAccessibleButtonElements([
//       {
//         buttonLabel: "Delete",
//         buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
//           createProductDispatch({
//             type: createProductAction.setMicrophoneFieldsAdditionalMap,
//             payload: {
//               operation: "remove",
//               index: mapKey,
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapFocused,
//             payload: {
//               operation: "remove",
//               index: mapKey,
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setAreMicrophoneFieldsAdditionalMapValid,
//             payload: {
//               operation: "remove",
//               index: mapKey,
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setCurrentlySelectedAdditionalFieldIndex,
//             payload: -1,
//           });
//         },
//         leftIcon: <TbTrash />,
//         semanticDescription: `Delete additional Microphone field ${mapKey + 1}`,
//         semanticName: "Delete field and value",
//       },
//     ]);

//     const displayDeleteButton = (
//       <Tooltip label={`Delete additional Microphone field ${mapKey + 1}`}>
//         <Group>{createdDeleteButton}</Group>
//       </Tooltip>
//     );

//     return (
//       <Stack key={`microphoneFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
//         <Group position="apart">
//           <Text size="md" weight={600}>{`Additional Microphone field ${
//             mapKey + 1
//           }`}</Text>
//           {displayDeleteButton}
//         </Group>
//         <Group position="apart">
//           {createdMicrophoneFieldsAdditionalMapKeysTextAreaInput}
//           {createdMicrophoneFieldsAdditionalMapValuesTextAreaInput}
//         </Group>
//       </Stack>
//     );
//   });

//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    INPUT DISPLAY
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   const displayMicrophoneFieldsAdditionalMapButton = (
//     <Tooltip
//       label={`Add additional Microphone field ${microphoneFieldsAdditionalMap.size + 1}`}
//     >
//       <Group>{createdAddMicrophoneFieldsAdditionalMapButton}</Group>
//     </Tooltip>
//   );

//   const displayMicrophoneSpecificationsInputs = (
//     <Group py={padding} position="apart" w="100%">
//       <Group w="100%" position="apart">
//         <Title order={4}>Microphone Specifications</Title>
//         {displayMicrophoneFieldsAdditionalMapButton}
//       </Group>
//       {createdMicrophoneTypeSelectInput}
//       {createdMicrophoneColorTextInput}
//       {createdMicrophoneInterfaceSelectInput}
//       {createdMicrophonePolarPatternSelectInput}
//       {createdMicrophoneFrequencyResponseTextInput}
//       {createdMicrophoneFieldsAdditionalMapTextInputElements}
//     </Group>
//   );

//   return displayMicrophoneSpecificationsInputs;
// }

// export default CreateMicrophone;
