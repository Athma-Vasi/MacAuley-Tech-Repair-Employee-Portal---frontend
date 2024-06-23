import { ValidationKey } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  InputType,
  StepperChild,
  StepperPage,
} from "../../types";
import { splitCamelCase } from "../../utils";
import {
  BOOLEAN_OPERATOR_DATA,
  COMPARISON_OPERATORS_DATA,
  IN_OPERATOR_DATA,
} from "./constants";
import { FilterInputsType, QueryOperators, SortInputsType } from "./types";

function addInputsToStepperPages(stepperPages: StepperPage[]): StepperPage[] {
  // createdAt and updatedAt are guaranteed to exist in all models and are used as initial values for filter & sort
  // username and userId exist in all models except AnonymousRequest and are used as initial values for search
  // the fields must be added here because the stepper pages are used to populate and validate query inputs

  const createdAtInput: StepperChild = {
    inputType: "date",
    name: "createdAt",
    validationKey: "date",
  };

  const updatedAtInput: StepperChild = {
    inputType: "date",
    name: "updatedAt",
    validationKey: "date",
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
  operators: CheckboxRadioSelectData<QueryOperators>;
  inputType: InputType;
};

type QueryInputsData = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  /** field names */
  filterFieldSelectInputData: CheckboxRadioSelectData;
  /** Map<field names, select data> */
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  projectionCheckboxData: CheckboxRadioSelectData;
  /** for search section */
  searchFieldSelectData: CheckboxRadioSelectData;
  /** for sort section */
  sortFieldSelectData: CheckboxRadioSelectData;
  /** Map<field names, validationKey> */
  validatedInputsKeyMap: Map<string, ValidationKey>;
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

  const initialAcc: QueryInputsData = {
    fieldNamesOperatorsTypesMap: new Map<string, OperatorsInputType>(),
    filterFieldSelectInputData: [],
    selectInputsDataMap: new Map<string, CheckboxRadioSelectData>(),
    projectionCheckboxData: [],
    searchFieldSelectData: [],
    sortFieldSelectData: [],
    validatedInputsKeyMap: new Map<string, ValidationKey>(),
  };

  const stepperPagesWithAddedInputs = addInputsToStepperPages(stepperPages);
  return stepperPagesWithAddedInputs.reduce<QueryInputsData>((acc, page) => {
    const {
      fieldNamesOperatorsTypesMap,
      filterFieldSelectInputData,
      projectionCheckboxData,
      selectInputsDataMap,
      searchFieldSelectData,
      sortFieldSelectData,
      validatedInputsKeyMap,
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
        searchFieldSelectData.push(checkboxRadioSelectData);

        if (validationKey !== undefined) {
          validatedInputsKeyMap.set(name, validationKey);
        }
      }

      if (sortInputsSet.has(inputType as SortInputsType)) {
        sortFieldSelectData.push(checkboxRadioSelectData);
      }

      if (selectInputData !== undefined) {
        selectInputsDataMap.set(name, selectInputData);
      }
    });

    return acc;
  }, initialAcc);
}

export { createQueryInputsData };
export type { OperatorsInputType, QueryInputsData };
