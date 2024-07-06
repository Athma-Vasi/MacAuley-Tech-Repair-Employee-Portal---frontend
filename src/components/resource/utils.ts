import { InputType } from "zlib";

import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  StepperPage,
  ValidationFunctionsTable,
} from "../../types";
import { formatDate, replaceLastCommaWithAnd } from "../../utils";
import { InputsValidationsMap } from "../query/utils";
import { KEYS_WITH_DATE_VALUES_SET } from "./constants";

function createResourceInputsData(stepperPages: Array<StepperPage>): {
  checkboxInputsSet: Set<string>;
  inputsValidationsMap: InputsValidationsMap;
  dateInputsSet: Set<string>;
  selectInputsSet: Set<string>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  textInputsSet: Set<string>;
} {
  const validatedInputsSet = new Set<InputType>(["text", "date", "number", "time"]);

  const initialAcc = {
    checkboxInputsSet: new Set<string>(),
    inputsValidationsMap: new Map(),
    dateInputsSet: new Set<string>(),
    selectInputsSet: new Set<string>(),
    selectInputsDataMap: new Map(),
    textInputsSet: new Set<string>(),
  };

  return stepperPages.reduce((acc, stepperPage) => {
    const {
      checkboxInputsSet,
      dateInputsSet,
      inputsValidationsMap,
      selectInputsSet,
      selectInputsDataMap,
      textInputsSet,
    } = acc;

    stepperPage.children.forEach((child) => {
      const { inputType, name, validationKey, selectInputData } = child;

      inputType === "checkbox"
        ? checkboxInputsSet.add(name)
        : inputType === "date" || inputType === "time"
        ? dateInputsSet.add(name)
        : inputType === "select" || inputType === "boolean"
        ? selectInputsSet.add(name)
        : inputType === "number" || inputType === "text"
        ? textInputsSet.add(name)
        : void 0;

      if (selectInputData !== undefined) {
        selectInputsDataMap.set(name, selectInputData);
      }

      if (validatedInputsSet.has(inputType)) {
        if (validationKey === undefined) {
          return acc;
        }

        inputsValidationsMap.set(name, {
          validationKey,
          validation: VALIDATION_FUNCTIONS_TABLE[validationKey],
        });
      }
    });

    return acc;
  }, initialAcc);
}

function addSelectedFieldValidation(
  inputsValidationsMap: InputsValidationsMap,
  selectedField: string,
  validationFunctionsTable: ValidationFunctionsTable
): ValidationFunctionsTable {
  const validationObject = inputsValidationsMap.get(selectedField);

  if (validationObject === undefined) {
    return {
      ...validationFunctionsTable,
    };
  }

  const { validation } = validationObject;

  return {
    ...validationFunctionsTable,
    editFieldValue: validation,
  };
}

function formatDocumentValue(
  key: string,
  value: unknown,
  sliceNumber = 17
): { slicedValue: string; unSlicedValue: string } {
  const unSlicedValue =
    typeof value === "boolean"
      ? value === true
        ? "Yes"
        : "No"
      : Array.isArray(value)
      ? replaceLastCommaWithAnd(value.join(","))
      : typeof value === "object" && value !== null
      ? ""
      : KEYS_WITH_DATE_VALUES_SET.has(key)
      ? formatDate({
          date: value as string,
          formatOptions: { year: "numeric", month: "numeric", day: "numeric" },
          locale: "en-US",
        })
      : value?.toString() ?? "";

  return {
    slicedValue:
      unSlicedValue.length > sliceNumber
        ? `${unSlicedValue.slice(0, sliceNumber)}...`
        : unSlicedValue,
    unSlicedValue,
  };
}

export { addSelectedFieldValidation, createResourceInputsData, formatDocumentValue };
