import { InputType } from "zlib";

import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  StepperPage,
  ValidationFunctionsTable,
} from "../../types";
import { formatDate, replaceLastCommaWithAnd } from "../../utils";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { InputsValidationsMap } from "../query/utils";
import { ResourceAction } from "./actions";
import { KEYS_WITH_DATE_VALUES_SET } from "./constants";
import { ResourceDispatch } from "./types";

function createResourceInputsData(stepperPages: Array<StepperPage>): {
  checkboxInputsSet: Set<string>;
  checkboxInputsDataMap: Map<string, CheckboxRadioSelectData>;
  inputsValidationsMap: InputsValidationsMap;
  dateInputsSet: Set<string>;
  selectInputsSet: Set<string>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  textInputsSet: Set<string>;
  timeInputsSet: Set<string>;
} {
  const validatedInputsSet = new Set<InputType>(["text", "date", "number", "time"]);

  const initialAcc = {
    checkboxInputsSet: new Set<string>(),
    checkboxInputsDataMap: new Map(),
    inputsValidationsMap: new Map(),
    dateInputsSet: new Set<string>(),
    selectInputsSet: new Set<string>(),
    selectInputsDataMap: new Map(),
    textInputsSet: new Set<string>(),
    timeInputsSet: new Set<string>(),
  };

  return stepperPages.reduce((acc, stepperPage) => {
    const {
      checkboxInputsSet,
      checkboxInputsDataMap,
      dateInputsSet,
      inputsValidationsMap,
      selectInputsSet,
      selectInputsDataMap,
      textInputsSet,
      timeInputsSet,
    } = acc;

    stepperPage.children.forEach((child) => {
      const { inputType, name, validationKey, selectInputData, checkboxInputData } =
        child;

      inputType === "checkbox"
        ? checkboxInputsSet.add(name)
        : inputType === "date"
        ? dateInputsSet.add(name)
        : inputType === "select" || inputType === "boolean"
        ? selectInputsSet.add(name)
        : inputType === "number" || inputType === "text"
        ? textInputsSet.add(name)
        : inputType === "time"
        ? timeInputsSet.add(name)
        : void 0;

      if (checkboxInputData !== undefined) {
        checkboxInputsDataMap.set(name, checkboxInputData);
      }

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

function createEditDocumentInput({
  editFieldValue,
  editFieldValues,
  resourceAction,
  resourceDispatch,
  selectedField,
  stepperPages,
}: {
  editFieldValue: string;
  editFieldValues: string[];
  resourceAction: ResourceAction;
  resourceDispatch: React.Dispatch<ResourceDispatch>;
  selectedField: string;
  stepperPages: Array<StepperPage>;
}) {
  const {
    checkboxInputsSet,
    checkboxInputsDataMap,
    dateInputsSet,
    inputsValidationsMap,
    selectInputsDataMap,
    selectInputsSet,
    textInputsSet,
    timeInputsSet,
  } = createResourceInputsData(stepperPages);

  console.group("createEditDocumentInput");
  console.log("stepperPages", stepperPages);
  console.log("selectedField", selectedField);
  console.log("checkboxInputsSet", checkboxInputsSet);
  console.log("dateInputsSet", dateInputsSet);
  console.log("inputsValidationsMap", inputsValidationsMap);
  console.log("selectInputsSet", selectInputsSet);
  console.log("textInputsSet", textInputsSet);
  console.log("timeInputsSet", timeInputsSet);
  console.log(
    "addSelectedFieldValidation()",
    addSelectedFieldValidation(
      inputsValidationsMap,
      selectedField,
      VALIDATION_FUNCTIONS_TABLE
    )
  );
  console.groupEnd();

  if (selectedField === "") {
    return null;
  }

  const validationFunctionsTable = addSelectedFieldValidation(
    inputsValidationsMap,
    selectedField,
    VALIDATION_FUNCTIONS_TABLE
  );

  const clonedPages = structuredClone(stepperPages);
  const firstPage = clonedPages[0];
  firstPage.children.push({
    inputType: dateInputsSet.has(selectedField) ? "date" : "text",
    name: "editFieldValue",
    validationKey: "editFieldValue",
  });

  if (checkboxInputsSet.has(selectedField)) {
    return (
      <AccessibleCheckboxInputGroup
        attributes={{
          inputData: checkboxInputsDataMap.get(selectedField) ?? [],
          name: selectedField,
          parentDispatch: resourceDispatch,
          validValueAction: resourceAction.setEditFieldValues,
          value: editFieldValues,
        }}
      />
    );
  }

  if (dateInputsSet.has(selectedField)) {
    return (
      <AccessibleDateTimeInput
        attributes={{
          inputKind: timeInputsSet.has(selectedField) ? "time" : "date",
          invalidValueAction: resourceAction.setPageInError,
          name: "editFieldValue",
          parentDispatch: resourceDispatch,
          stepperPages: clonedPages,
          validationFunctionsTable,
          validValueAction: resourceAction.setEditFieldValue,
          value: editFieldValue,
        }}
      />
    );
  }

  if (selectInputsSet.has(selectedField)) {
    return (
      <AccessibleSelectInput
        attributes={{
          data: selectInputsDataMap.get(selectedField) ?? [],
          name: selectedField,
          parentDispatch: resourceDispatch,
          validValueAction: resourceAction.setEditFieldValue,
          value: editFieldValue,
        }}
      />
    );
  }

  if (textInputsSet.has(selectedField)) {
    return (
      <AccessibleTextAreaInput
        attributes={{
          invalidValueAction: resourceAction.setPageInError,
          name: "editFieldValue",
          parentDispatch: resourceDispatch,
          stepperPages: clonedPages,
          validationFunctionsTable,
          validValueAction: resourceAction.setEditFieldValue,
          value: editFieldValue,
        }}
      />
    );
  }

  return null;
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

export {
  addSelectedFieldValidation,
  createEditDocumentInput,
  createResourceInputsData,
  formatDocumentValue,
};
