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
//   returnMediumIntegerValidationText,
//   returnObjectKeyValidationText,
//   returnRamTimingValidationText,
//   returnRamVoltageValidationText,
//   returnSmallIntegerValidationText,
//   returnUserDefinedFieldValueValidationText,
// } from "../../../utils";
// import { AccessibleTextAreaInputCreatorInfo } from "../../wrappers";
// import {
//   COLOR_VARIANT_REGEX,
//   MEDIUM_INTEGER_REGEX,
//   MEMORY_UNIT_SELECT_INPUT_DATA,
//   OBJECT_KEY_REGEX,
//   RAM_MEMORY_TYPE_DATA,
//   RAM_TIMING_REGEX,
//   RAM_VOLTAGE_REGEX,
//   SMALL_INTEGER_REGEX,
//   USER_DEFINED_VALUE_REGEX,
// } from "../constants";
// import { CreateProductDispatch } from "../dispatch";
// import { CreateProductAction, MemoryType, MemoryUnit } from "../types";

// type CreateRamProps = {
//   areRamFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
//   areRamFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
//   createProductAction: CreateProductAction;
//   createProductDispatch: React.Dispatch<CreateProductDispatch>;
//   currentlySelectedAdditionalFieldIndex: number;
//   isRamColorFocused: boolean;
//   isRamColorValid: boolean;
//   isRamDataRateFocused: boolean;
//   isRamDataRateValid: boolean;
//   isRamModulesCapacityFocused: boolean;
//   isRamModulesCapacityValid: boolean;
//   isRamModulesQuantityFocused: boolean;
//   isRamModulesQuantityValid: boolean;
//   isRamTimingFocused: boolean;
//   isRamTimingValid: boolean;
//   isRamVoltageFocused: boolean;
//   isRamVoltageValid: boolean;
//   padding: MantineNumberSize;
//   ramColor: string;
//   ramDataRate: string;
//   ramFieldsAdditionalMap: Map<number, [string, string]>;
//   ramModulesCapacity: string;
//   ramModulesCapacityUnit: MemoryUnit;
//   ramModulesQuantity: string;
//   ramTiming: string;
//   ramType: MemoryType;
//   ramVoltage: string;
// };

// function CreateRam({
//   areRamFieldsAdditionalMapFocused,
//   areRamFieldsAdditionalMapValid,
//   createProductAction,
//   createProductDispatch,
//   currentlySelectedAdditionalFieldIndex,
//   isRamColorFocused,
//   isRamColorValid,
//   isRamDataRateFocused,
//   isRamDataRateValid,
//   isRamModulesCapacityFocused,
//   isRamModulesCapacityValid,
//   isRamModulesQuantityFocused,
//   isRamModulesQuantityValid,
//   isRamTimingFocused,
//   isRamTimingValid,
//   isRamVoltageFocused,
//   isRamVoltageValid,
//   padding,
//   ramColor,
//   ramDataRate,
//   ramFieldsAdditionalMap,
//   ramModulesCapacity,
//   ramModulesCapacityUnit,
//   ramModulesQuantity,
//   ramTiming,
//   ramType,
//   ramVoltage,
// }: CreateRamProps) {
//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    VALIDATION USE EFFECTS
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM DATA RATE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = MEDIUM_INTEGER_REGEX.test(ramDataRate);

//     createProductDispatch({
//       type: createProductAction.setIsRamDataRateValid,
//       payload: isValid,
//     });
//   }, [createProductAction.setIsRamDataRateValid, createProductDispatch, ramDataRate]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM MODULES QUANTITY
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = SMALL_INTEGER_REGEX.test(ramModulesQuantity);

//     createProductDispatch({
//       type: createProductAction.setIsRamModulesQuantityValid,
//       payload: isValid,
//     });
//   }, [
//     createProductAction.setIsRamModulesQuantityValid,
//     createProductDispatch,
//     ramModulesQuantity,
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM MODULES CAPACITY
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = MEDIUM_INTEGER_REGEX.test(ramModulesCapacity);

//     createProductDispatch({
//       type: createProductAction.setIsRamModulesCapacityValid,
//       payload: isValid,
//     });
//   }, [
//     createProductAction.setIsRamModulesCapacityValid,
//     createProductDispatch,
//     ramModulesCapacity,
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM VOLTAGE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = RAM_VOLTAGE_REGEX.test(ramVoltage);

//     createProductDispatch({
//       type: createProductAction.setIsRamVoltageValid,
//       payload: isValid,
//     });
//   }, [createProductAction.setIsRamVoltageValid, createProductDispatch, ramVoltage]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM COLOR
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = COLOR_VARIANT_REGEX.test(ramColor);

//     createProductDispatch({
//       type: createProductAction.setIsRamColorValid,
//       payload: isValid,
//     });
//   }, [createProductAction.setIsRamColorValid, createProductDispatch, ramColor]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM TIMING
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const isValid = RAM_TIMING_REGEX.test(ramTiming);

//     createProductDispatch({
//       type: createProductAction.setIsRamTimingValid,
//       payload: isValid,
//     });
//   }, [createProductAction.setIsRamTimingValid, createProductDispatch, ramTiming]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM FIELDS ADDITIONAL
//   // ╰─────────────────────────────────────────────────────────────────╯
//   useEffect(() => {
//     const currentlyUpdatingRamFieldAdditional = ramFieldsAdditionalMap.get(
//       currentlySelectedAdditionalFieldIndex
//     );

//     if (!currentlyUpdatingRamFieldAdditional) {
//       return;
//     }

//     const [key, value] = currentlyUpdatingRamFieldAdditional;

//     const isKeyValid = OBJECT_KEY_REGEX.test(key);
//     createProductDispatch({
//       type: createProductAction.setAreRamFieldsAdditionalMapValid,
//       payload: {
//         operation: "update",
//         data: isKeyValid,
//         index: currentlySelectedAdditionalFieldIndex,
//         kind: "key",
//       },
//     });

//     const isValueValid = USER_DEFINED_VALUE_REGEX.test(value);
//     createProductDispatch({
//       type: createProductAction.setAreRamFieldsAdditionalMapValid,
//       payload: {
//         operation: "update",
//         data: isValueValid,
//         index: currentlySelectedAdditionalFieldIndex,
//         kind: "value",
//       },
//     });
//   }, [
//     createProductAction.setAreRamFieldsAdditionalMapValid,
//     createProductDispatch,
//     currentlySelectedAdditionalFieldIndex,
//     ramFieldsAdditionalMap,
//   ]);

//   // ╔═════════════════════════════════════════════════════════════════╗
//   //   STEPPER STATE UPDATE
//   // ╚═════════════════════════════════════════════════════════════════╝
//   useEffect(() => {
//     // required inputs with empty string count as error
//     // optional inputs with empty string count as valid
//     // select inputs are not included as they always have a default value

//     const areRamInputsHardcodedInError =
//       !isRamDataRateValid ||
//       !isRamModulesQuantityValid ||
//       !isRamModulesCapacityValid ||
//       !isRamVoltageValid ||
//       !isRamColorValid ||
//       !isRamTimingValid;

//     const areRamInputsUserDefinedInError = Array.from(
//       areRamFieldsAdditionalMapValid
//     ).some(([_key, value]) => value.includes(false));

//     const areRamInputsInError =
//       areRamInputsHardcodedInError || areRamInputsUserDefinedInError;

//     createProductDispatch({
//       type: createProductAction.setPageInError,
//       payload: {
//         kind: areRamInputsInError ? "add" : "delete",
//         step: 1,
//       },
//     });
//   }, [
//     areRamFieldsAdditionalMapValid,
//     createProductAction.setPageInError,
//     createProductDispatch,
//     isRamColorValid,
//     isRamDataRateValid,
//     isRamModulesCapacityValid,
//     isRamModulesQuantityValid,
//     isRamTimingValid,
//     isRamVoltageValid,
//   ]);

//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    INPUT CREATION
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM DATA RATE
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramDataRateInputErrorText, ramDataRateInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram data rate",
//       inputText: ramDataRate,
//       isInputTextFocused: isRamDataRateFocused,
//       isValidInputText: isRamDataRateValid,
//       regexValidationText: returnMediumIntegerValidationText({
//         content: ramDataRate,
//         contentKind: "ram data rate",
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamDataRateTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramDataRateInputErrorText,
//         valid: ramDataRateInputValidText,
//       },
//       inputText: ramDataRate,
//       isValidInputText: isRamDataRateValid,
//       label: "RAM Data Rate (MT/s)",
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamDataRateFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamDataRate,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamDataRateFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Format: 0000",
//       required: true,
//       semanticName: "ram data rate",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM MODULES QUANTITY
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramModulesQuantityInputErrorText, ramModulesQuantityInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram modules quantity",
//       inputText: ramModulesQuantity,
//       isInputTextFocused: isRamModulesQuantityFocused,
//       isValidInputText: isRamModulesQuantityValid,
//       regexValidationText: returnSmallIntegerValidationText({
//         content: ramModulesQuantity,
//         contentKind: "ram modules quantity",
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamModulesQuantityTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramModulesQuantityInputErrorText,
//         valid: ramModulesQuantityInputValidText,
//       },
//       inputText: ramModulesQuantity,
//       isValidInputText: isRamModulesQuantityValid,
//       label: "RAM Modules Quantity",
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamModulesQuantityFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamModulesQuantity,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamModulesQuantityFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Format: 00",
//       required: true,
//       semanticName: "ram modules quantity",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM MODULES CAPACITY
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramModulesCapacityInputErrorText, ramModulesCapacityInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram modules capacity",
//       inputText: ramModulesCapacity,
//       isInputTextFocused: isRamModulesCapacityFocused,
//       isValidInputText: isRamModulesCapacityValid,
//       regexValidationText: returnMediumIntegerValidationText({
//         content: ramModulesCapacity,
//         contentKind: "ram modules capacity",
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamModulesCapacityTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramModulesCapacityInputErrorText,
//         valid: ramModulesCapacityInputValidText,
//       },
//       inputText: ramModulesCapacity,
//       isValidInputText: isRamModulesCapacityValid,
//       label: "RAM Modules Capacity",
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamModulesCapacityFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamModulesCapacity,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamModulesCapacityFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Format: 0000",
//       required: true,
//       semanticName: "ram modules capacity",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM MODULES CAPACITY UNIT
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdRamModulesCapacityUnitSelectInput] = returnAccessibleSelectInputElements([
//     {
//       data: MEMORY_UNIT_SELECT_INPUT_DATA,
//       description: "",
//       label: "RAM Modules Capacity Unit",
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamModulesCapacityUnit,
//           payload: event.currentTarget.value as MemoryUnit,
//         });
//       },
//       value: ramModulesCapacityUnit,
//       required: true,
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM TYPE
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdRamTypeSelectInput] = returnAccessibleSelectInputElements([
//     {
//       data: RAM_MEMORY_TYPE_DATA,
//       description: "",
//       label: "RAM Type",
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamType,
//           payload: event.currentTarget.value as MemoryType,
//         });
//       },
//       value: ramType,
//       required: true,
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM COLOR
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramColorInputErrorText, ramColorInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram color",
//       inputText: ramColor,
//       isInputTextFocused: isRamColorFocused,
//       isValidInputText: isRamColorValid,
//       regexValidationText: returnColorVariantValidationText({
//         content: ramColor,
//         contentKind: "ram color",
//         maxLength: 30,
//         minLength: 2,
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamColorTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramColorInputErrorText,
//         valid: ramColorInputValidText,
//       },
//       inputText: ramColor,
//       isValidInputText: isRamColorValid,
//       label: "RAM Color",
//       maxLength: 30,
//       minLength: 2,
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamColorFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamColor,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamColorFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Enter RAM color",
//       required: true,
//       semanticName: "ram color",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM VOLTAGE
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramVoltageInputErrorText, ramVoltageInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram voltage",
//       inputText: ramVoltage,
//       isInputTextFocused: isRamVoltageFocused,
//       isValidInputText: isRamVoltageValid,
//       regexValidationText: returnRamVoltageValidationText({
//         content: ramVoltage,
//         contentKind: "ram voltage",
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamVoltageTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramVoltageInputErrorText,
//         valid: ramVoltageInputValidText,
//       },
//       inputText: ramVoltage,
//       isValidInputText: isRamVoltageValid,
//       label: "RAM Voltage (V)",
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamVoltageFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamVoltage,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamVoltageFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Format: 0.00",
//       required: true,
//       semanticName: "ram voltage",
//     },
//   ]);

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    RAM TIMING
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // screenreader accessible text input elements
//   const [ramTimingInputErrorText, ramTimingInputValidText] =
//     AccessibleErrorValidTextElements({
//       inputElementKind: "ram timing",
//       inputText: ramTiming,
//       isInputTextFocused: isRamTimingFocused,
//       isValidInputText: isRamTimingValid,
//       regexValidationText: returnRamTimingValidationText({
//         content: ramTiming,
//         contentKind: "ram timing",
//         maxLength: 14,
//         minLength: 7,
//       }),
//     });

//   // screenreader accessible text input element
//   const [createdRamTimingTextInput] = returnAccessibleTextInputElements([
//     {
//       description: {
//         error: ramTimingInputErrorText,
//         valid: ramTimingInputValidText,
//       },
//       inputText: ramTiming,
//       isValidInputText: isRamTimingValid,
//       label: "RAM Timing",
//       maxLength: 14,
//       minLength: 7,
//       onBlur: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamTimingFocused,
//           payload: false,
//         });
//       },
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamTiming,
//           payload: event.currentTarget.value,
//         });
//       },
//       onFocus: () => {
//         createProductDispatch({
//           type: createProductAction.setIsRamTimingFocused,
//           payload: true,
//         });
//       },
//       placeholder: "Format: 00-00-00-00 or 0-0-0-0",
//       required: true,
//       semanticName: "ram timing",
//     },
//   ]);

//   // ╔═════════════════════════════════════════════════════════════════╗
//   //   RAM ADDITIONAL FIELDS
//   // ╚═════════════════════════════════════════════════════════════════╝

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    ADD ADDITIONAL FIELD BUTTON
//   // ╰─────────────────────────────────────────────────────────────────╯
//   const [createdAddRamFieldsAdditionalMapButton] = returnAccessibleButtonElements([
//     {
//       buttonLabel: "Add",
//       semanticDescription: "Add new additional RAM field",
//       semanticName: "Add new field",
//       leftIcon: <TbPlus />,
//       buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
//         createProductDispatch({
//           type: createProductAction.setRamFieldsAdditionalMap,
//           payload: {
//             operation: "add",
//             data: ["", ""],
//           },
//         });

//         createProductDispatch({
//           type: createProductAction.setAreRamFieldsAdditionalMapFocused,
//           payload: {
//             operation: "add",
//             data: [false, false],
//           },
//         });

//         createProductDispatch({
//           type: createProductAction.setAreRamFieldsAdditionalMapValid,
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
//   const ramFieldsAdditionalMapKeysErrorValidTextElements: [JSX.Element, JSX.Element][] =
//     Array.from(ramFieldsAdditionalMap).map((keyFieldValue) => {
//       const [mapKey, [field, _value]] = keyFieldValue;

//       // error/valid text elements that are consumed by the text input element creator
//       const [
//         ramFieldsAdditionalMapKeysInputErrorText,
//         ramFieldsAdditionalMapKeysInputValidText,
//       ] = AccessibleErrorValidTextElements({
//         inputElementKind: `additional RAM field name ${mapKey + 1}`,
//         inputText: field,
//         isInputTextFocused: areRamFieldsAdditionalMapFocused.get(mapKey)?.[0] ?? false,
//         isValidInputText: areRamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
//         regexValidationText: returnObjectKeyValidationText({
//           content: field,
//           contentKind: `additional RAM field name ${mapKey + 1}`,
//           maxLength: 75,
//           minLength: 1,
//         }),
//       });

//       return [
//         ramFieldsAdditionalMapKeysInputErrorText,
//         ramFieldsAdditionalMapKeysInputValidText,
//       ];
//     });

//   // ╭─────────────────────────────────────────────────────────────────╮
//   //    ERROR/VALID ELEMENTS TUPLE => FIELD VALUES
//   // ╰─────────────────────────────────────────────────────────────────╯

//   // returns an array of tuples containing the error and valid text elements for each field value
//   const ramFieldsAdditionalMapValuesErrorValidTextElements: [JSX.Element, JSX.Element][] =
//     Array.from(ramFieldsAdditionalMap).map((keyFieldValue) => {
//       const [mapKey, [_field, value]] = keyFieldValue;

//       // error/valid text elements that are consumed by the text input element creator
//       const [
//         ramFieldsAdditionalMapValuesInputErrorText,
//         ramFieldsAdditionalMapValuesInputValidText,
//       ] = AccessibleErrorValidTextElements({
//         inputElementKind: `additional RAM field value ${mapKey + 1}`,
//         inputText: value,
//         isInputTextFocused: areRamFieldsAdditionalMapFocused.get(mapKey)?.[1] ?? false,
//         isValidInputText: areRamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
//         regexValidationText: returnUserDefinedFieldValueValidationText({
//           content: value,
//           contentKind: `additional RAM field value ${mapKey + 1}`,
//           maxLength: 2000,
//           minLength: 2,
//         }),
//       });

//       return [
//         ramFieldsAdditionalMapValuesInputErrorText,
//         ramFieldsAdditionalMapValuesInputValidText,
//       ];
//     });

//   const createdRamFieldsAdditionalMapTextInputElements = Array.from(
//     ramFieldsAdditionalMap
//   ).map((keyFieldValue) => {
//     const [mapKey, [field, value]] = keyFieldValue;

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD NAME
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const ramFieldsAdditionalMapKeysTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
//       {
//         description: {
//           error: ramFieldsAdditionalMapKeysErrorValidTextElements[mapKey][0],
//           valid: ramFieldsAdditionalMapKeysErrorValidTextElements[mapKey][1],
//         },
//         inputText: field,
//         isValidInputText: areRamFieldsAdditionalMapValid.get(mapKey)?.[0] ?? false,
//         label: `Name ${mapKey + 1}`,
//         maxLength: 75,
//         minLength: 1,
//         onBlur: () => {
//           createProductDispatch({
//             type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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
//             type: createProductAction.setRamFieldsAdditionalMap,
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
//             type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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
//         semanticName: `additional RAM field name ${mapKey + 1}`,
//       };

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    ADDITIONAL FIELD ACCESSIBLE TEXT INPUT => FIELD VALUE
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const ramFieldsAdditionalMapValuesTextInputCreatorInfo: AccessibleTextAreaInputCreatorInfo =
//       {
//         description: {
//           error: ramFieldsAdditionalMapValuesErrorValidTextElements[mapKey][0],
//           valid: ramFieldsAdditionalMapValuesErrorValidTextElements[mapKey][1],
//         },
//         inputText: value,
//         isValidInputText: areRamFieldsAdditionalMapValid.get(mapKey)?.[1] ?? false,
//         label: `Value ${mapKey + 1}`,
//         maxLength: 2000,
//         minLength: 2,
//         onBlur: () => {
//           createProductDispatch({
//             type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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
//             type: createProductAction.setRamFieldsAdditionalMap,
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
//             type: createProductAction.setAreRamFieldsAdditionalMapFocused,
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
//         semanticName: `additional RAM field value ${mapKey + 1}`,
//       };

//     const [
//       createdRamFieldsAdditionalMapKeysTextAreaInput,
//       createdRamFieldsAdditionalMapValuesTextAreaInput,
//     ] = returnAccessibleTextAreaInputElements([
//       ramFieldsAdditionalMapKeysTextInputCreatorInfo,
//       ramFieldsAdditionalMapValuesTextInputCreatorInfo,
//     ]);

//     // ╭─────────────────────────────────────────────────────────────────╮
//     //    DELETE FIELD BUTTON
//     // ╰─────────────────────────────────────────────────────────────────╯
//     const [createdDeleteButton] = returnAccessibleButtonElements([
//       {
//         buttonLabel: "Delete",
//         buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
//           createProductDispatch({
//             type: createProductAction.setRamFieldsAdditionalMap,
//             payload: {
//               operation: "remove",
//               index: mapKey,
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setAreRamFieldsAdditionalMapFocused,
//             payload: {
//               operation: "remove",
//               index: mapKey,
//             },
//           });

//           createProductDispatch({
//             type: createProductAction.setAreRamFieldsAdditionalMapValid,
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
//         semanticDescription: `Delete additional RAM field ${mapKey + 1}`,
//         semanticName: "Delete field and value",
//       },
//     ]);

//     const displayDeleteButton = (
//       <Tooltip label={`Delete additional RAM field ${mapKey + 1}`}>
//         <Group>{createdDeleteButton}</Group>
//       </Tooltip>
//     );

//     return (
//       <Stack key={`ramFieldsAdditionalMap-${mapKey}`} pt={padding} w="100%">
//         <Group position="apart">
//           <Text size="md" weight={600}>{`Additional RAM field ${mapKey + 1}`}</Text>
//           {displayDeleteButton}
//         </Group>
//         <Group position="apart">
//           {createdRamFieldsAdditionalMapKeysTextAreaInput}
//           {createdRamFieldsAdditionalMapValuesTextAreaInput}
//         </Group>
//       </Stack>
//     );
//   });

//   // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//   //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//   //    INPUT DISPLAY
//   //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
//   // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

//   const displayRamFieldsAdditionalMapButton = (
//     <Tooltip label={`Add additional RAM field ${ramFieldsAdditionalMap.size + 1}`}>
//       <Group>{createdAddRamFieldsAdditionalMapButton}</Group>
//     </Tooltip>
//   );

//   const displayRamSpecificationsInputs = (
//     <Group py={padding} position="apart" w="100%">
//       <Group w="100%" position="apart">
//         <Title order={4}>Memory (RAM) Specifications</Title>
//         {displayRamFieldsAdditionalMapButton}
//       </Group>
//       {createdRamDataRateTextInput}
//       {createdRamModulesQuantityTextInput}
//       {createdRamModulesCapacityTextInput}
//       {createdRamModulesCapacityUnitSelectInput}
//       {createdRamTypeSelectInput}
//       {createdRamColorTextInput}
//       {createdRamVoltageTextInput}
//       {createdRamTimingTextInput}
//       {createdRamFieldsAdditionalMapTextInputElements}
//     </Group>
//   );

//   return displayRamSpecificationsInputs;
// }

// export default CreateRam;
