import type { ValidationFunctionsTable } from "../../types";
import type { InputsValidationsMap } from "../query/utils";

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

export { addSelectedFieldValidation };
