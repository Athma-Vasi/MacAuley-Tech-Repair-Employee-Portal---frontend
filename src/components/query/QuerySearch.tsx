import { Stack, Text } from "@mantine/core";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { splitCamelCase } from "../../utils";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction, queryAction } from "./actions";
import {
  LOGICAL_OPERATORS_DATA,
  MAX_LINKS_AMOUNT,
  QUERY_SEARCH_CASE_DATA,
} from "./constants";
import {
  GeneralSearchCase,
  ModifyQueryChainPayload,
  QueryChain,
  QueryState,
} from "./types";
import { InputsValidationsMap, removeProjectionExclusionFields } from "./utils";

type QuerySearchDispatch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = React.Dispatch<
  | {
      action: ValidValueAction;
      payload: string;
    }
  | {
      action: InvalidValueAction;
      payload: SetPageInErrorPayload;
    }
>;

type SearchChainDispatch<ValidValueAction extends string = string> = React.Dispatch<{
  action: ValidValueAction;
  payload: ModifyQueryChainPayload;
}>;

type QuerySearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  inputsValidationsMap: InputsValidationsMap;
  querySearchDispatch: QuerySearchDispatch<ValidValueAction, InvalidValueAction>;
  queryState: QueryState;
  searchChainDispatch: SearchChainDispatch<ValidValueAction>;
  searchFieldSelectData: CheckboxRadioSelectData;
};

function QuerySearch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  inputsValidationsMap,
  querySearchDispatch,
  queryState,
  searchChainDispatch,
  searchFieldSelectData,
}: QuerySearchProps<ValidValueAction, InvalidValueAction>) {
  const {
    projectionExclusionFields,
    searchField,
    searchLogicalOperator,
    searchValue,
    queryChains,
  } = queryState;
  const logicalOperatorChainsMap = queryChains.search;
  const searchChainLength = Array.from(logicalOperatorChainsMap).reduce(
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
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setSearchLogicalOperator as ValidValueAction,
        value: searchLogicalOperator,
      }}
    />
  );

  const data = removeProjectionExclusionFields(
    projectionExclusionFields,
    searchFieldSelectData
  );
  const disabled = data.length === 0;

  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data,
        disabled,
        name: "searchField",
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setSearchField as ValidValueAction,
        value: searchField,
      }}
    />
  );

  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: `${splitCamelCase(searchField)} Value`,
          validationKey:
            inputsValidationsMap.get(searchField)?.validationKey ?? "allowAll",
        },
      ],
      description: "",
    },
  ];

  const valueTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        disabled,
        name: `${splitCamelCase(searchField)} Value`,
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        required: false,
        parentDispatch: querySearchDispatch,
        validValueAction: queryAction.setSearchValue as ValidValueAction,
        value: searchValue,
        stepperPages,
      }}
    />
  );

  const addFilterStatementsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add search link to chain",
        disabledScreenreaderText:
          searchChainLength === MAX_LINKS_AMOUNT
            ? "Max query links amount reached"
            : "Value is empty",
        disabled:
          disabled || searchChainLength === MAX_LINKS_AMOUNT || searchValue === "",
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          searchChainDispatch({
            action: queryAction.modifyQueryChains as ValidValueAction,
            payload: {
              index: searchChainLength,
              logicalOperator: searchLogicalOperator,
              queryChainActions: "insert",
              queryChainKind: "search",
              queryLink: [searchField, "", searchValue],
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
      {valueTextAreaInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QuerySearch };
export type { QuerySearchDispatch, SearchChainDispatch };
