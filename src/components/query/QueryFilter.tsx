import { Stack } from "@mantine/core";
import React from "react";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction, queryAction } from "./actions";
import { SetFilterStatementsPayload } from "./types";
import { OperatorsInputType } from "./utils";
import { MAX_FILTER_LINKS_AMOUNT } from "./constants";

type QueryFilterProps = {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterOperator: string;
  filterFieldSelectInputData: CheckboxRadioSelectData;
  filterChain: Array<[string, string, string]>;
  filterChainDispatch: React.Dispatch<{
    action: string;
    payload: SetFilterStatementsPayload;
  }>;
  filterValue: string;
  parentDispatch: React.Dispatch<
    | {
        action: string;
        payload: string;
      }
    | {
        action: string;
        payload: SetPageInErrorPayload;
      }
  >;
  projectedFieldsSet: Set<string>;
  queryAction: QueryAction;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  validatedInputsKeyMap: Map<string, ValidationKey>;
};

function QueryFilter({
  fieldNamesOperatorsTypesMap,
  filterField,
  filterFieldSelectInputData,
  filterOperator,
  filterChain,
  filterChainDispatch,
  filterValue,
  parentDispatch,
  projectedFieldsSet,
  queryAction,
  selectInputsDataMap,
  validatedInputsKeyMap,
}: QueryFilterProps) {
  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: filterFieldSelectInputData,
        name: "filterField",
        parentDispatch,
        validValueAction: queryAction.setFilterField,
        value: filterField,
      }}
    />
  );

  const filterOperatorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: fieldNamesOperatorsTypesMap.get(filterField)?.operators ?? [],
        name: "operator",
        parentDispatch,
        validValueAction: queryAction.setFilterOperator,
        value: filterOperator,
      }}
    />
  );

  const dynamicValueInput = createDynamicValueInput({
    fieldNamesOperatorsTypesMap,
    filterField,
    filterValue,
    parentDispatch,
    selectInputsDataMap,
    validatedInputsKeyMap,
  });

  const addFilterStatementsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add filter statement to chain",
        disabledScreenreaderText: "Cannot add filter statement to chain",
        disabled: !filterField || !filterOperator || !filterValue,
        kind: "add",
        onClick: () => {
          filterChainDispatch({
            action: queryAction.modifyFilterChains,
            payload: {
              index: filterChain.length,
              kind: "add",
              value: [filterField, filterOperator, filterValue],
            },
          });
        },
      }}
    />
  );

  const filterChainElements = filterChain.map(([field, operator, value], index) => {
    const deleteFilterLinkButton = (
      <AccessibleButton
        attributes={{
          enabledScreenreaderText: `Delete filter link ${index + 1}`,
          index,
          kind: "delete",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChains,
              payload: {
                index,
                kind: "delete",
                value: [field, operator, value],
              },
            });
          },
        }}
      />
    );

    const insertFilterLinkButton = (
      <AccessibleButton
        attributes={{
          disabled: index === MAX_FILTER_LINKS_AMOUNT - 1,
          disabledScreenreaderText: "Max filter links amount reached",
          enabledScreenreaderText: `Insert chain before filter link ${index + 1}`,
          index,
          kind: "insert",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChains,
              payload: {
                index,
                kind: "insert",
                value: [field, operator, value],
              },
            });
          },
        }}
      />
    );

    const slideFilterChainUpButton = (
      <AccessibleButton
        attributes={{
          disabled: index === 0,
          disabledScreenreaderText: "Cannot move up. Already at the top",
          enabledScreenreaderText: `Move filter link ${index + 1} up`,
          index,
          kind: "up",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChains,
              payload: {
                index,
                kind: "slideUp",
                value: [field, operator, value],
              },
            });
          },
        }}
      />
    );

    const slideFilterChainDownButton = (
      <AccessibleButton
        attributes={{
          disabled: index === filterChain.length - 1,
          disabledScreenreaderText: "Cannot move link down. Already at the bottom",
          enabledScreenreaderText: `Move filter link ${index + 1} down`,
          index,
          kind: "down",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChains,
              payload: {
                index,
                kind: "slideDown",
                value: [field, operator, value],
              },
            });
          },
        }}
      />
    );
  });

  return (
    <Stack>
      {fieldSelectInput}
      {filterOperatorSelectInput}
      {dynamicValueInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QueryFilter };

function createDynamicValueInput({
  fieldNamesOperatorsTypesMap,
  filterField,
  filterValue,
  parentDispatch,
  selectInputsDataMap,
  validatedInputsKeyMap,
}: {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterValue: string;
  parentDispatch: React.Dispatch<
    | {
        action: string;
        payload: string;
      }
    | {
        action: string;
        payload: SetPageInErrorPayload;
      }
  >;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  validatedInputsKeyMap: Map<string, ValidationKey>;
}) {
  const operatorTypes = fieldNamesOperatorsTypesMap.get(filterField);
  if (!operatorTypes) {
    return null;
  }

  const name = "filterValue";

  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "date",
          name,
          validationKey: validatedInputsKeyMap.get(name) ?? "allowAll",
        },
      ],
      description: "Date",
    },
  ];

  const { inputType } = operatorTypes;

  switch (inputType) {
    case "boolean": {
      return (
        <AccessibleSelectInput
          attributes={{
            data: [
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ],
            name,
            parentDispatch,
            validValueAction: queryAction.setFilterValue,
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
            parentDispatch,
            stepperPages,
            validValueAction: queryAction.setFilterValue,
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
            parentDispatch,
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
            inputKind: "time",
            invalidValueAction: queryAction.setIsError,
            name,
            parentDispatch,
            stepperPages,
            validValueAction: queryAction.setFilterValue,
            value: filterValue,
          }}
        />
      );
    }

    default:
      return null;
  }
}
