import { VALIDATION_FUNCTIONS_TABLE, ValidationKey } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  InputType,
  StepperChild,
  StepperPage,
  Validation,
} from "../../types";
import { splitCamelCase } from "../../utils";
import {
  BOOLEAN_OPERATOR_DATA,
  COMPARISON_OPERATORS_DATA,
  IN_OPERATOR_DATA,
} from "./constants";
import { FilterInputsType, QueryOperator, SortInputsType } from "./types";

function addInputsToStepperPages(stepperPages: StepperPage[]): StepperPage[] {
  // createdAt and updatedAt are guaranteed to exist in all models and are used as initial values for filter & sort
  // username and userId exist in all models except AnonymousRequest and are used as initial values for search
  // the fields must be added here because the stepper pages are used to populate and validate query inputs

  const createdAtInput: StepperChild = {
    inputType: "date",
    name: "createdAt",
    validationKey: "dateFullRange",
  };

  const updatedAtInput: StepperChild = {
    inputType: "date",
    name: "updatedAt",
    validationKey: "dateFullRange",
  };

  const usernameInput: StepperChild = {
    inputType: "text",
    name: "username",
    validationKey: "username",
  };

  const clonedStepperPages = structuredClone(stepperPages);
  clonedStepperPages[0].children.push(createdAtInput, updatedAtInput, usernameInput);

  return clonedStepperPages;
}

type OperatorsInputType = {
  operators: CheckboxRadioSelectData<QueryOperator>;
  inputType: InputType;
};

type InputsValidationsMap = Map<
  string,
  { validationKey: ValidationKey; validation: Validation }
>;

type QueryInputsData = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  /** field names */
  filterFieldSelectInputData: CheckboxRadioSelectData;
  /** Map<field names, select data> */
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  projectionCheckboxData: CheckboxRadioSelectData;
  /** for search section */
  searchFieldSelectInputData: CheckboxRadioSelectData;
  /** for sort section */
  sortFieldSelectData: CheckboxRadioSelectData;
  /** Map<field names, validationKey> */
  inputsValidationsMap: InputsValidationsMap;
};

/**
 * - Extracts the names, input data from the stepper pages and used in the corresponding query sections
 */
function createQueryInputsData(stepperPages: StepperPage[]): QueryInputsData {
  // data created with these input types can have a subset of operators applied to them

  const filterInputsTypeSet = new Set<FilterInputsType>([
    "boolean", // 'equal to' operator
    "date", // comparison operators
    "number", // comparison operators
    "select", // 'in' operator
    "time", // comparison operators
  ]);
  const sortInputsSet = new Set<SortInputsType>(["date", "number", "time"]); // can apply sort: ascending | descending
  const comparisonOperatorsInputsSet = new Set<InputType>(["date", "number", "time"]); // can apply comparison operators
  const validatedInputsSet = new Set<InputType>(["text", "date", "number", "time"]);

  const initialAcc: QueryInputsData = {
    fieldNamesOperatorsTypesMap: new Map<string, OperatorsInputType>(),
    filterFieldSelectInputData: [],
    selectInputsDataMap: new Map<string, CheckboxRadioSelectData>(),
    projectionCheckboxData: [],
    searchFieldSelectInputData: [],
    sortFieldSelectData: [],
    inputsValidationsMap: new Map(),
  };

  const stepperPagesWithAddedInputs = addInputsToStepperPages(stepperPages);
  return stepperPagesWithAddedInputs.reduce<QueryInputsData>((acc, page) => {
    const {
      fieldNamesOperatorsTypesMap,
      filterFieldSelectInputData,
      projectionCheckboxData,
      selectInputsDataMap,
      searchFieldSelectInputData,
      sortFieldSelectData,
      inputsValidationsMap,
    } = acc;

    page.children.forEach((child) => {
      const { inputType, name, selectInputData, validationKey } = child;

      const checkboxRadioSelectData = { label: splitCamelCase(name), value: name };

      const operatorsInputTypeObject = {
        inputType,
        operators: comparisonOperatorsInputsSet.has(inputType)
          ? COMPARISON_OPERATORS_DATA
          : inputType === "boolean"
          ? BOOLEAN_OPERATOR_DATA
          : IN_OPERATOR_DATA,
      } as OperatorsInputType;
      fieldNamesOperatorsTypesMap.set(name, operatorsInputTypeObject);

      projectionCheckboxData.push(checkboxRadioSelectData);

      if (filterInputsTypeSet.has(inputType as FilterInputsType)) {
        filterFieldSelectInputData.push(checkboxRadioSelectData);
      }

      if (inputType === "text") {
        searchFieldSelectInputData.push(checkboxRadioSelectData);
      }

      if (sortInputsSet.has(inputType as SortInputsType)) {
        sortFieldSelectData.push(checkboxRadioSelectData);
      }

      if (selectInputData !== undefined) {
        selectInputsDataMap.set(name, selectInputData);
      }

      if (validatedInputsSet.has(inputType)) {
        if (validationKey === undefined) {
          return acc;
        }

        if (inputType === "text") {
          // searchValue is the name of the dynamic input in search section
          // this ensures that the searchValue input, which may consist of text input type, is validated correctly
          inputsValidationsMap.set(name, {
            validationKey,
            validation: VALIDATION_FUNCTIONS_TABLE[validationKey],
          });

          return acc;
        }

        // filterValue is the name of the dynamic input in query filter section
        // this ensures that the filterValue input, which may consist of date, number, or time input types, is validated correctly
        inputsValidationsMap.set(name, {
          validationKey,
          validation: VALIDATION_FUNCTIONS_TABLE[validationKey],
        });

        console.group("createQueryInputsData");
        console.log("validationKey", validationKey);
        console.log("validation", VALIDATION_FUNCTIONS_TABLE[validationKey]);
        console.groupEnd();
      }
    });

    return acc;
  }, initialAcc);
}

function removeProjectionExclusionFields(
  projectionExclusionFields: string[],
  selectData: CheckboxRadioSelectData
) {
  const exclusionFieldsSet = new Set(projectionExclusionFields);

  return selectData.reduce<CheckboxRadioSelectData>((acc, field) => {
    if (!exclusionFieldsSet.has(field.value)) {
      acc.push(structuredClone(field));
    }

    return acc;
  }, []);
}

export { createQueryInputsData, removeProjectionExclusionFields };
export type { InputsValidationsMap, OperatorsInputType, QueryInputsData };
