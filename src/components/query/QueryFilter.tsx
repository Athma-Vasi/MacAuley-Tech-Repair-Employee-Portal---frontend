import { Accordion, Group, Stack, Text, Timeline, Title } from "@mantine/core";
import React from "react";
import { TbChevronDown, TbLink } from "react-icons/tb";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleDateTimeInput } from "../accessibleInputs/AccessibleDateTimeInput";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction, queryAction } from "./actions";
import { MAX_LINKS_AMOUNT } from "./constants";
import { ModifyQueryChainPayload, QueryChain } from "./types";
import { OperatorsInputType } from "./utils";

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

type QueryFilterProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  collectionName: string;
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterOperator: string;
  filterFieldSelectInputData: CheckboxRadioSelectData;
  filterChain: QueryChain;
  filterChainDispatch: React.Dispatch<{
    action: QueryAction["modifyFilterChain"];
    payload: ModifyQueryChainPayload;
  }>;
  filterValue: string;
  queryFilterDispatch: QueryFilterDispatch;
  projectedFieldsSet: Set<string>;
  queryAction: QueryAction;
  selectInputsDataMap: Map<string, CheckboxRadioSelectData>;
  validatedInputsKeyMap: Map<string, ValidationKey>;
};

function QueryFilter<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  collectionName,
  fieldNamesOperatorsTypesMap,
  filterField,
  filterFieldSelectInputData,
  filterOperator,
  filterChain,
  filterChainDispatch,
  filterValue,
  queryFilterDispatch,
  projectedFieldsSet,
  queryAction,
  selectInputsDataMap,
  validatedInputsKeyMap,
}: QueryFilterProps<ValidValueAction, InvalidValueAction>) {
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
        queryFilterDispatchData: {
          fieldNamesOperatorsTypesMap,
          queryFilterDispatch,
          selectInputsDataMap,
        },
        validValueAction: queryAction.setFilterOperator,
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
    validatedInputsKeyMap,
  });

  const disabledScreenreaderText =
    filterChain.length === MAX_LINKS_AMOUNT
      ? "Max filter links amount reached"
      : "Value is empty";
  const addFilterStatementsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add filter link to chain",
        disabledScreenreaderText,
        disabled: filterChain.length === MAX_LINKS_AMOUNT || filterValue === "",
        kind: "add",
        onClick: () => {
          filterChainDispatch({
            action: queryAction.modifyFilterChain,
            payload: {
              index: filterChain.length,
              kind: "insert",
              value: [filterField, filterOperator, filterValue],
            },
          });
        },
      }}
    />
  );

  const filterChainElements = filterChain.map(([field, operator, value], index) => {
    const filterLinkStatement = `${splitCamelCase(field)} is ${operator} ${splitCamelCase(
      value
    )}`;

    const deleteFilterLinkButton = (
      <AccessibleButton
        attributes={{
          enabledScreenreaderText: `Delete link ${filterLinkStatement}`,
          index,
          kind: "delete",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChain,
              payload: {
                index,
                kind: "delete",
                value: [filterField, filterOperator, filterValue],
              },
            });
          },
        }}
      />
    );

    const insertFilterLinkButton = (
      <AccessibleButton
        attributes={{
          disabled: index === MAX_LINKS_AMOUNT - 1,
          disabledScreenreaderText: "Max filter links amount reached",
          enabledScreenreaderText: `Insert link before ${filterLinkStatement}`,
          index,
          kind: "insert",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChain,
              payload: {
                index,
                kind: "insert",
                value: [filterField, filterOperator, filterValue],
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
          enabledScreenreaderText: `Move link ${filterLinkStatement} up`,
          index,
          kind: "up",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChain,
              payload: {
                index,
                kind: "slideUp",
                value: [filterField, filterOperator, filterValue],
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
          enabledScreenreaderText: `Move link ${filterLinkStatement} down`,
          index,
          kind: "down",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            filterChainDispatch({
              action: queryAction.modifyFilterChain,
              payload: {
                index,
                kind: "slideDown",
                value: [filterField, filterOperator, filterValue],
              },
            });
          },
        }}
      />
    );

    const buttons = (
      <Group>
        {deleteFilterLinkButton}
        {insertFilterLinkButton}
        {slideFilterChainUpButton}
        {slideFilterChainDownButton}
      </Group>
    );

    return (
      <Timeline.Item key={`timeline-link-${index}`} bullet={<TbLink />}>
        <Text>{`${filterLinkStatement} ${
          filterChain.length > 1 && index !== filterChain.length - 1 ? "and" : ""
        }`}</Text>
        {buttons}
      </Timeline.Item>
    );
  });

  const timelineAccordion = (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Filter Chain">
        <Accordion.Control disabled={filterChain.length === 0}>
          <Text size="lg">Filter Chain</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            <Text size="md">{`Select ${collectionName} where:`}</Text>
            <Timeline active={Number.MAX_SAFE_INTEGER}>{filterChainElements}</Timeline>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <Stack>
      {timelineAccordion}
      {fieldSelectInput}
      {filterOperatorSelectInput}
      {dynamicValueInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

function createDynamicValueInput({
  fieldNamesOperatorsTypesMap,
  filterField,
  filterValue,
  queryFilterDispatch,
  selectInputsDataMap,
  validatedInputsKeyMap,
}: {
  fieldNamesOperatorsTypesMap: Map<string, OperatorsInputType>;
  filterField: string;
  filterValue: string;
  queryFilterDispatch: QueryFilterDispatch;
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
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ],
            name,
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
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
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
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
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
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
            queryFilterDispatchData: {
              fieldNamesOperatorsTypesMap,
              queryFilterDispatch,
              selectInputsDataMap,
            },
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

export { QueryFilter };
export type { QueryFilterDispatch, QueryFilterDispatchData };
