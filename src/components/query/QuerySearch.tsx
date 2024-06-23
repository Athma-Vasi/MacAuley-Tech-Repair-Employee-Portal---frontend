import { Stack } from "@mantine/core";

import { ValidationKey } from "../../constants/validations";
import { CheckboxRadioSelectData, SetPageInErrorPayload, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { MAX_LINKS_AMOUNT } from "./constants";
import { ModifyQueryChainPayload, QueryChain } from "./types";

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
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  isGeneralSearchCaseSensitive?: boolean;
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
  generalSearchExclusionValue,
  generalSearchInclusionValue,
  isGeneralSearchCaseSensitive,
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
        {
          inputType: "text",
          name: "include",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
        },
        {
          inputType: "text",
          name: "exclude",
          validationKey: validatedInputsKeyMap.get("include") ?? "allowAll",
        },
      ],
      description: "text area",
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

  const generalSearchInclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "include",
        stepperPages,
        validValueAction: queryAction.setGeneralSearchInclusionValue as ValidValueAction,
        value: generalSearchInclusionValue,
      }}
    />
  );

  const generalSearchExclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: queryAction.setIsError as InvalidValueAction,
        name: "exclude",
        stepperPages,
        validValueAction: queryAction.setGeneralSearchExclusionValue as ValidValueAction,
        value: generalSearchExclusionValue,
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
      {generalSearchInclusionTextInput}
      {generalSearchExclusionTextInput}
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QuerySearch };
export type { QuerySearchDispatch, SearchChainDispatch };
