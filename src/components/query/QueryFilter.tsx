import { Stack } from "@mantine/core";
import React from "react";

import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../types";
import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction, queryAction } from "./actions";
import { LOGICAL_OPERATORS_DATA, MAX_LINKS_AMOUNT } from "./constants";
import {
  LogicalOperator,
  ModifyQueryChainPayload,
  ModifyQueryChainsDispatch,
  QueryChain,
  QueryDispatch,
  QueryState,
} from "./types";
import {
  InputsValidationsMap,
  OperatorsInputType,
  removeProjectionExclusionFields,
} from "./utils";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";

type SetFilterInputValuesDispatch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = React.Dispatch<
  | {
      action: ValidValueAction;
      payload: {
        fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
        value: string;
        selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
      };
    }
  | {
      action: InvalidValueAction;
      payload: SetPageInErrorPayload;
    }
>;

type SetFilterInputValuesDispatchData<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  setFilterInputValuesDispatch: SetFilterInputValuesDispatch<
    ValidValueAction,
    InvalidValueAction
  >;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
};

type QueryFilterProps<ValidValueAction extends string = string> = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterFieldSelectInputData: CheckboxRadioSelectData;
  inputsValidationsMap: InputsValidationsMap;
  modifyQueryChainsDispatch: ModifyQueryChainsDispatch;
  parentDispatch: React.Dispatch<QueryDispatch>;
  queryState: QueryState;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  setFilterInputValuesDispatch: SetFilterInputValuesDispatch<ValidValueAction>;
};

function QueryFilter<ValidValueAction extends string = string>({
  fieldNamesOperatorsTypesMap,
  filterFieldSelectInputData,
  inputsValidationsMap,
  modifyQueryChainsDispatch,
  parentDispatch,
  queryState,
  selectInputsDataMap,
  setFilterInputValuesDispatch,
}: QueryFilterProps<ValidValueAction>) {
  const {
    filterField,
    filterComparisonOperator,
    filterLogicalOperator,
    filterValue,
    isError,
    projectionExclusionFields,
    queryChains,
  } = queryState;
  const logicalOperatorChainsMap = queryChains.filter;
  const chainLength = Array.from(logicalOperatorChainsMap).reduce(
    (acc, [_key, value]) => {
      acc += value.length;
      return acc;
    },
    0
  );

  const logicalOperatorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: LOGICAL_OPERATORS_DATA,
        name: "filterLogicalOperator",
        parentDispatch,
        validValueAction: queryAction.setFilterLogicalOperator,
        value: filterLogicalOperator,
      }}
    />
  );

  const data = removeProjectionExclusionFields(
    projectionExclusionFields,
    filterFieldSelectInputData
  );
  const disabled = data.length === 0;

  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data,
        disabled,
        name: "filterField",
        setFilterInputValuesDispatchData: {
          fieldNamesOperatorsTypesMap,
          setFilterInputValuesDispatch,
          selectInputsDataMap,
        },
        validValueAction: queryAction.setFilterField as ValidValueAction,
        value: filterField,
      }}
    />
  );

  const filterComparisonOperatorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: fieldNamesOperatorsTypesMap.get(filterField)?.operators ?? [],
        disabled,
        name: "filterComparisonOperator",
        setFilterInputValuesDispatchData: {
          fieldNamesOperatorsTypesMap,
          setFilterInputValuesDispatch,
          selectInputsDataMap,
        },
        validValueAction: queryAction.setFilterComparisonOperator as ValidValueAction,
        value: filterComparisonOperator,
      }}
    />
  );

  const dynamicValueInput = createDynamicValueInput({
    disabled,
    fieldNamesOperatorsTypesMap,
    filterField,
    filterValue,
    setFilterInputValuesDispatch,
    selectInputsDataMap,
    inputsValidationsMap,
  });

  const addFilterLinkButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add filter link to chain",
        disabledScreenreaderText:
          chainLength === MAX_LINKS_AMOUNT
            ? "Max query links amount reached"
            : isError
            ? "Value cannot be invalid"
            : "Value cannot be empty",
        disabled:
          disabled || isError || chainLength === MAX_LINKS_AMOUNT || filterValue === "",
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          modifyQueryChainsDispatch({
            action: queryAction.modifyQueryChains,
            payload: {
              index: chainLength,
              logicalOperator: filterLogicalOperator,
              queryChainActions: "insert",
              queryChainKind: "filter",
              queryLink: [filterField, filterComparisonOperator, filterValue],
            },
          });
        },
      }}
    />
  );

  return (
    <Stack>
      {logicalOperatorSelectInput}
      {fieldSelectInput}
      {filterComparisonOperatorSelectInput}
      {dynamicValueInput}
      {addFilterLinkButton}
    </Stack>
  );
}

function createDynamicValueInput<ValidValueAction extends string = string>({
  disabled,
  fieldNamesOperatorsTypesMap,
  filterField,
  filterValue,
  setFilterInputValuesDispatch,
  selectInputsDataMap,
  inputsValidationsMap,
}: {
  disabled: boolean;
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterValue: string;
  setFilterInputValuesDispatch: SetFilterInputValuesDispatch<ValidValueAction>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  inputsValidationsMap: InputsValidationsMap;
}) {
  const operatorTypes = fieldNamesOperatorsTypesMap.get(filterField);
  if (operatorTypes === undefined) {
    return null;
  }

  const { inputType } = operatorTypes;
  const name = `${splitCamelCase(filterField)} Value`;

  if (inputType === "boolean") {
    return (
      <AccessibleSelectInput
        attributes={{
          data: [
            { label: "True", value: "true" },
            { label: "False", value: "false" },
          ],
          disabled,
          name,
          setFilterInputValuesDispatchData: {
            fieldNamesOperatorsTypesMap,
            setFilterInputValuesDispatch,
            selectInputsDataMap,
          },
          validValueAction: queryAction.setFilterValue as ValidValueAction,
          value: filterValue,
        }}
      />
    );
  }

  if (inputType === "select") {
    return (
      <AccessibleSelectInput
        attributes={{
          data: selectInputsDataMap.get(filterField) ?? [],
          disabled,
          name,
          setFilterInputValuesDispatchData: {
            fieldNamesOperatorsTypesMap,
            setFilterInputValuesDispatch,
            selectInputsDataMap,
          },
          validValueAction: queryAction.setFilterValue as ValidValueAction,
          value: filterValue,
        }}
      />
    );
  }

  const validationObject = inputsValidationsMap.get(filterField);
  if (validationObject === undefined) {
    return null;
  }

  const { validation, validationKey } = validationObject;
  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType,
          name,
          validationKey,
        },
      ],
      description: "",
    },
  ];

  const validationFunctionsTable: ValidationFunctionsTable = {
    ...VALIDATION_FUNCTIONS_TABLE,
    filterValue: validation,
  };

  switch (inputType) {
    case "date": {
      return (
        <AccessibleDateTimeInput
          attributes={{
            dateKind: "full date",
            disabled,
            inputKind: "date",
            invalidValueAction: queryAction.setIsError,
            name,
            setFilterInputValuesDispatchData: {
              fieldNamesOperatorsTypesMap,
              setFilterInputValuesDispatch,
              selectInputsDataMap,
            },
            stepperPages,
            validationFunctionsTable,
            validValueAction: queryAction.setFilterValue as ValidValueAction,
            value: filterValue,
          }}
        />
      );
    }

    case "number": {
      return (
        <AccessibleTextInput
          attributes={{
            disabled,
            invalidValueAction: queryAction.setIsError,
            name,
            stepperPages,
            validValueAction: queryAction.setFilterValue,
            value: filterValue,
          }}
        />
      );
    }

    case "time": {
      return (
        <AccessibleDateTimeInput
          attributes={{
            disabled,
            inputKind: "time",
            invalidValueAction: queryAction.setIsError,
            name,
            setFilterInputValuesDispatchData: {
              fieldNamesOperatorsTypesMap,
              setFilterInputValuesDispatch,
              selectInputsDataMap,
            },
            stepperPages,
            validationFunctionsTable,
            validValueAction: queryAction.setFilterValue as ValidValueAction,
            value: filterValue,
          }}
        />
      );
    }

    default:
      return null;
  }
}

export { QueryFilter };
export type { SetFilterInputValuesDispatch, SetFilterInputValuesDispatchData };
