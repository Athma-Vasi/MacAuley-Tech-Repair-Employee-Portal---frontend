import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, InputType, StepperPage } from "../../types";
import { splitCamelCase } from "../../utils";

type ComparisonOperators =
  | "equal to"
  | "greater than or equal to"
  | "greater than"
  | "less than or equal to"
  | "less than";

type QueryInputsData = {
  fieldNamesOperatorsMap: Map<string, CheckboxRadioSelectData>;
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
function separateQueryInputsData(stepperPages: StepperPage[]): QueryInputsData {
  // these input types can have filter operators applied to them
  const filterInputsTypeSet = new Set<InputType>([
    "boolean", // equal to operator
    "date", // comparison operators
    "number", // comparison operators
    "select", // in operator
    "time", // comparison operators
  ]);
  const projectionInputSet = new Set<InputType>(["checkbox"]); // can apply projection: exclusion | inclusion
  const sortInputsSet = new Set<InputType>(["date", "number"]); // can apply sort
  const comparableOperatorsInputsSet = new Set<InputType>(["date", "number", "time"]); // can apply comparison operators

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
    fieldNamesOperatorsMap: new Map<string, CheckboxRadioSelectData>(),
    filterFieldSelectInputData: [],
    selectInputsDataMap: new Map<string, CheckboxRadioSelectData>(),
    projectionCheckboxData: [],
    searchFieldSelectData: [],
    sortFieldSelectData: [],
    validatedInputsKeyMap: new Map<string, ValidationKey>(),
  };

  return stepperPages.reduce<QueryInputsData>((acc, page) => {
    const {
      fieldNamesOperatorsMap,
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

      fieldNamesOperatorsMap.set(
        name,
        comparableOperatorsInputsSet.has(inputType)
          ? comparisonOperators
          : inputType === "boolean"
          ? booleanOperator
          : inOperator
      );

      if (filterInputsTypeSet.has(inputType)) {
        filterFieldSelectInputData.push(checkboxRadioSelectData);
      }

      if (projectionInputSet.has(inputType)) {
        acc.projectionCheckboxData = checkboxInputData ?? [];
      }

      if (inputType === "text") {
        searchFieldSelectData.push(checkboxRadioSelectData);

        if (validationKey) {
          validatedInputsKeyMap.set(name, validationKey);
        }
      }

      if (sortInputsSet.has(inputType)) {
        sortFieldSelectData.push(checkboxRadioSelectData);
      }

      if (selectInputData) {
        selectInputsDataMap.set(name, selectInputData);
      }
    });

    return acc;
  }, initialAcc);
}

export { separateQueryInputsData };
export type { QueryInputsData };
