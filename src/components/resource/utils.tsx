import type { ValidationFunctionsTable } from "../../types";
import { formatDate, replaceLastCommaWithAnd } from "../../utils";
import type { InputsValidationsMap } from "../query/utils";
import { KEYS_WITH_DATE_VALUES_SET } from "./constants";

function addSelectedFieldValidation(
  inputsValidationsMap: InputsValidationsMap,
  selectedField: string,
  validationFunctionsTable: ValidationFunctionsTable,
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
  sliceNumber = 17,
): { slicedValue: string; unSlicedValue: string } {
  const unSlicedValue = typeof value === "boolean"
    ? value === true ? "Yes" : "No"
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
    slicedValue: unSlicedValue.length > sliceNumber
      ? `${unSlicedValue.slice(0, sliceNumber)}...`
      : unSlicedValue,
    unSlicedValue,
  };
}

export { addSelectedFieldValidation, formatDocumentValue };
