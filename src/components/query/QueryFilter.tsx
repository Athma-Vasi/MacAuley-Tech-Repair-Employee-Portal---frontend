import { Stack } from "@mantine/core";
import React from "react";

import { VALIDATION_FUNCTIONS_TABLE } from "../../constants/validations";
import {
  CheckboxRadioSelectData,
  SetPageInErrorPayload,
  StepperPage,
  ValidationFunctionsTable,
} from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction, queryAction } from "./actions";
import { MAX_LINKS_AMOUNT } from "./constants";
import { ModifyQueryChainPayload, QueryChain } from "./types";
import { InputsValidationsMap, OperatorsInputType } from "./utils";
import { splitCamelCase } from "../../utils";

type QueryFilterDispatch<
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

type QueryFilterDispatchData<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  queryFilterDispatch: QueryFilterDispatch<ValidValueAction, InvalidValueAction>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
};

type QueryFilterProps<ValidValueAction extends string = string> = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterChain: QueryChain;
  filterField: string;
  filterOperator: string;
  filterFieldSelectInputData: CheckboxRadioSelectData;
  filterChainDispatch: React.Dispatch<{
    action: QueryAction["modifyQueryChains"];
    payload: ModifyQueryChainPayload;
  }>;
  filterValue: string;
  inputsValidationsMap: InputsValidationsMap;
  isError: boolean;
  projectedFieldsSet: Set<string>;
  queryAction: QueryAction;
  queryFilterDispatch: QueryFilterDispatch<ValidValueAction>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
};

function QueryFilter<ValidValueAction extends string = string>({
  fieldNamesOperatorsTypesMap,
  filterChain,
  filterChainDispatch,
  filterField,
  filterFieldSelectInputData,
  filterOperator,
  filterValue,
  inputsValidationsMap,
  isError,
  projectedFieldsSet,
  queryAction,
  queryFilterDispatch,
  selectInputsDataMap,
}: QueryFilterProps<ValidValueAction>) {
  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: filterFieldSelectInputData,
        name: "filterField",
        queryFilterDispatchData: {
          fieldNamesOperatorsTypesMap,
          queryFilterDispatch,
          selectInputsDataMap,
        },
        validValueAction: queryAction.setFilterField as ValidValueAction,
        value: filterField,
      }}
    />
  );

  const filterOperatorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: fieldNamesOperatorsTypesMap.get(filterField)?.operators ?? [],
        name: "filterOperator",
        queryFilterDispatchData: {
          fieldNamesOperatorsTypesMap,
          queryFilterDispatch,
          selectInputsDataMap,
        },
        validValueAction: queryAction.setFilterOperator as ValidValueAction,
        value: filterOperator,
      }}
    />
  );

  const dynamicValueInput = createDynamicValueInput({
    fieldNamesOperatorsTypesMap,
    filterField,
    filterValue,
    queryFilterDispatch,
    selectInputsDataMap,
    inputsValidationsMap,
  });

  const addFilterLinkButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add filter link to chain",
        disabledScreenreaderText:
          filterChain.length === MAX_LINKS_AMOUNT
            ? "Max query links amount reached"
            : isError
            ? "Value cannot be invalid"
            : "Value cannot be empty",
        disabled:
          isError || filterChain.length === MAX_LINKS_AMOUNT || filterValue === "",
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          filterChainDispatch({
            action: queryAction.modifyQueryChains,
            payload: {
              index: filterChain.length,
              queryChainActions: "insert",
              queryChainKind: "filter",
              value: [filterField, filterOperator, filterValue],
            },
          });
        },
      }}
    />
  );

  return (
    <Stack>
      {fieldSelectInput}
      {filterOperatorSelectInput}
      {dynamicValueInput}
      {addFilterLinkButton}
    </Stack>
  );
}

function createDynamicValueInput<ValidValueAction extends string = string>({
  fieldNamesOperatorsTypesMap,
  filterField,
  filterValue,
  queryFilterDispatch,
  selectInputsDataMap,
  inputsValidationsMap,
}: {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterValue: string;
  queryFilterDispatch: QueryFilterDispatch<ValidValueAction>;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  inputsValidationsMap: InputsValidationsMap;
}) {
  const operatorTypes = fieldNamesOperatorsTypesMap.get(filterField);
  if (operatorTypes === undefined) {
    return null;
  }

  const { inputType } = operatorTypes;

  const validationObject = inputsValidationsMap.get(filterField);
  if (validationObject === undefined) {
    return null;
  }

  const { validation, validationKey } = validationObject;
  const name = `${splitCamelCase(filterField)} Value`;
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

  console.group("createDynamicValueInput");
  console.log("filterField", filterField);
  console.log("filterValue", filterValue);
  console.log("inputType", inputType);
  console.log("validationKey", validationKey);
  console.log("validation", validation);
  console.log("stepperPages", stepperPages);
  console.log("validationFunctionsTable", validationFunctionsTable);
  console.groupEnd();

  switch (inputType) {
    case "boolean": {
      return (
        <AccessibleSelectInput
          attributes={{
            data: [
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ],
            name,
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
            validValueAction: queryAction.setFilterValue as ValidValueAction,
            value: filterValue,
          }}
        />
      );
    }

    case "date": {
      return (
        <AccessibleDateTimeInput
          attributes={{
            dateKind: "full date",
            inputKind: "date",
            invalidValueAction: queryAction.setIsError,
            name,
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
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
            invalidValueAction: queryAction.setIsError,
            name,
            stepperPages,
            validValueAction: queryAction.setFilterValue,
            value: filterValue,
          }}
        />
      );
    }

    case "select": {
      return (
        <AccessibleSelectInput
          attributes={{
            data: selectInputsDataMap.get(filterField) ?? [],
            name,
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
            validValueAction: queryAction.setFilterValue as ValidValueAction,
            value: filterValue,
          }}
        />
      );
    }

    case "time": {
      return (
        <AccessibleDateTimeInput
          attributes={{
            inputKind: "time",
            invalidValueAction: queryAction.setIsError,
            name,
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
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
export type { QueryFilterDispatch, QueryFilterDispatchData };
