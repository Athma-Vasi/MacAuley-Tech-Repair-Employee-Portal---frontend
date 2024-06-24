import { Stack, Text } from "@mantine/core";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { MAX_LINKS_AMOUNT, QUERY_SEARCH_CASE_DATA } from "./constants";
import { GeneralSearchCase, ModifyQueryChainPayload, QueryChain } from "./types";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";

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
  queryAction: QueryAction;
  querySearchDispatch: QuerySearchDispatch<ValidValueAction, InvalidValueAction>;
  searchChain: QueryChain;
  searchChainDispatch: SearchChainDispatch<ValidValueAction>;
  searchField: string;
  searchFieldSelectData: CheckboxRadioSelectData;
  searchValue: string;
  validatedInputsKeyMap: Map<string, ValidationKey>;
};

function QuerySearch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  queryAction,
  querySearchDispatch,
  searchChain,
  searchChainDispatch,
  searchField,
  searchFieldSelectData,
  searchValue,
  validatedInputsKeyMap,
}: QuerySearchProps<ValidValueAction, InvalidValueAction>) {
  const fieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: searchFieldSelectData,
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
          name: "searchValue",
          validationKey: validatedInputsKeyMap.get("searchValue") ?? "allowAll",
        },
      ],
      description: "",
    },
  ];

  const valueTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        name: "searchValue",
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
          searchChain.length === MAX_LINKS_AMOUNT
            ? "Max query links amount reached"
            : "Value is empty",
        disabled: searchChain.length === MAX_LINKS_AMOUNT || searchValue === "",
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          searchChainDispatch({
            action: queryAction.modifyQueryChains as ValidValueAction,
            payload: {
              index: searchChain.length,
              queryChainActions: "insert",
              queryChainKind: "search",
              value: [searchField, "", searchValue],
            },
          });
        },
      }}
    />
  );

  return (
    <Stack>
      {fieldSelectInput}
      {valueTextAreaInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QuerySearch };
export type { QuerySearchDispatch, SearchChainDispatch };
