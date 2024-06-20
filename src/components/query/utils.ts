import { ValidationKey } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  InputType,
  StepperChild,
  StepperPage,
} from "../../types";
import { splitCamelCase } from "../../utils";
import {
  ComparisonOperators,
  FilterInputsType,
  QueryOperators,
  SortInputsType,
} from "./types";

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

  const userIdInput: StepperChild = {
    inputType: "text",
    name: "userId",
    validationKey: "userId",
  };

  const clonedStepperPages = structuredClone(stepperPages);
  clonedStepperPages[0].children.push(
    createdAtInput,
    updatedAtInput,
    usernameInput,
    userIdInput
  );

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
  const projectionInputSet = new Set<InputType>(["checkbox"]); // can apply projection: exclusion | inclusion
  const searchInputSet = new Set<InputType>(["text"]); // can apply regex search
  const sortInputsSet = new Set<SortInputsType>(["date", "number", "time"]); // can apply sort: ascending | descending
  const comparisonOperatorsInputsSet = new Set<InputType>(["date", "number", "time"]); // can apply comparison operators

  const comparisonOperators: CheckboxRadioSelectData<ComparisonOperators> = [
    { label: "Equal to", value: "equal to" },
    { label: "Greater than or equal to", value: "greater than or equal to" },
    { label: "Greater than", value: "greater than" },
    { label: "Less than or equal to", value: "less than or equal to" },
    { label: "Less than", value: "less than" },
  ];
  const inOperator: CheckboxRadioSelectData = [{ label: "In", value: "in" }];
  const booleanOperator: CheckboxRadioSelectData = [
    { label: "Equal to", value: "equal to" },
  ];

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
      selectInputsDataMap,
      searchFieldSelectData,
      sortFieldSelectData,
      validatedInputsKeyMap,
    } = acc;

    page.children.forEach((child) => {
      const { inputType, name, checkboxInputData, selectInputData, validationKey } =
        child;

      const checkboxRadioSelectData = { label: splitCamelCase(name), value: name };

      const operatorsInputTypeObject = {
        inputType,
        operators: comparisonOperatorsInputsSet.has(inputType)
          ? comparisonOperators
          : inputType === "boolean"
          ? booleanOperator
          : inOperator,
      } as OperatorsInputType;

      fieldNamesOperatorsTypesMap.set(name, operatorsInputTypeObject);

      if (filterInputsTypeSet.has(inputType as FilterInputsType)) {
        filterFieldSelectInputData.push(checkboxRadioSelectData);
      }

      if (projectionInputSet.has(inputType)) {
        acc.projectionCheckboxData = checkboxInputData ?? [];
      }

      if (searchInputSet.has(inputType)) {
        searchFieldSelectData.push(checkboxRadioSelectData);

        if (validationKey) {
          validatedInputsKeyMap.set(name, validationKey);
        }
      }

      if (sortInputsSet.has(inputType as SortInputsType)) {
        sortFieldSelectData.push(checkboxRadioSelectData);
      }

      if (selectInputData) {
        selectInputsDataMap.set(name, selectInputData);
      }
    });

    return acc;
  }, initialAcc);
}

export { createQueryInputsData };
export type { OperatorsInputType, QueryInputsData };
