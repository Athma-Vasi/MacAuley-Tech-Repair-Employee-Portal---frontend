import { Stack, Text } from "@mantine/core";
import { VALIDATION_FUNCTIONS_TABLE, ValidationKey } from "../../constants/validations";
import { SetPageInErrorPayload, StepperPage } from "../../types";
import { AccessibleSegmentedControl } from "../accessibleInputs/AccessibleSegmentedControl";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { QueryAction } from "./actions";
import { QUERY_SEARCH_CASE_DATA } from "./constants";
import { GeneralSearchCase, ModifyQueryChainsDispatch, QueryDispatch } from "./types";
import { InputsValidationsMap } from "./utils";
import React from "react";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";

type QuerySearchProps<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
> = {
  generalSearchExclusionValue: string;
  generalSearchInclusionValue: string;
  generalSearchCase: GeneralSearchCase;
  queryAction: QueryAction;
  parentDispatch: React.Dispatch<QueryDispatch>;
  inputsValidationsMap: InputsValidationsMap;
};

function QuerySearch<
  ValidValueAction extends string = string,
  InvalidValueAction extends string = string
>({
  generalSearchCase,
  generalSearchExclusionValue,
  generalSearchInclusionValue,
  queryAction,
  parentDispatch,
  inputsValidationsMap,
}: QuerySearchProps<ValidValueAction, InvalidValueAction>) {
  type QuerySearchState = {
    exclusion: string;
    inclusion: string;
    pagesInError: Set<number>;
  };
  const initialQuerySearchState: QuerySearchState = {
    exclusion: generalSearchExclusionValue,
    inclusion: generalSearchInclusionValue,
    pagesInError: new Set(),
  };

  type QuerySearchActions = {
    setExclusion: "setExclusion";
    setInclusion: "setInclusion";
    setPageInError: "setPageInError";
  };
  const querySearchActions: QuerySearchActions = {
    setExclusion: "setExclusion",
    setInclusion: "setInclusion",
    setPageInError: "setPageInError",
  };

  type QuerySearchDispatch =
    | {
        action: QuerySearchActions["setExclusion"] | QuerySearchActions["setInclusion"];
        payload: string;
      }
    | {
        action: QuerySearchActions["setPageInError"];
        payload: SetPageInErrorPayload;
      };

  function querySearchReducer(state: QuerySearchState, dispatch: QuerySearchDispatch) {
    switch (dispatch.action) {
      case querySearchActions.setExclusion:
        return { ...state, exclusion: dispatch.payload };

      case querySearchActions.setInclusion:
        return { ...state, inclusion: dispatch.payload };

      case querySearchActions.setPageInError: {
        const { kind, page } = dispatch.payload as SetPageInErrorPayload;
        const pagesInError = new Set(state.pagesInError);
        kind === "add" ? pagesInError.add(page) : pagesInError.delete(page);

        return {
          ...state,
          pagesInError,
        };
      }

      default:
        return state;
    }
  }

  const [querySearchState, querySearchDispatch] = React.useReducer(
    querySearchReducer,
    initialQuerySearchState
  );
  const { exclusion, inclusion, pagesInError } = querySearchState;

  const stepperPages: StepperPage[] = [
    {
      children: [
        {
          inputType: "text",
          name: "inclusion",
          validationKey: "inclusion",
        },
        {
          inputType: "text",
          name: "exclusion",
          validationKey: "exclusion",
        },
      ],
      description: "",
    },
  ];

  const generalSearchInclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: querySearchActions.setPageInError,
        name: "inclusion",
        parentDispatch: querySearchDispatch,
        stepperPages,
        validValueAction: querySearchActions.setInclusion,
        value: generalSearchInclusionValue,
      }}
    />
  );

  const generalSearchExclusionTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: querySearchActions.setPageInError,
        name: "exclusion",
        parentDispatch: querySearchDispatch,
        stepperPages,
        validValueAction: querySearchActions.setExclusion,
        value: generalSearchExclusionValue,
      }}
    />
  );

  const caseSensitiveSegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: QUERY_SEARCH_CASE_DATA,
        name: "case",
        parentDispatch,
        validValueAction: queryAction.setGeneralSearchCase,
        value: generalSearchCase,
      }}
    />
  );

  const addSearchLinkButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add filter link to chain",
        disabledScreenreaderText: "Please fix error(s) before proceeding",
        disabled: pagesInError.size > 0,
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          parentDispatch({
            action: queryAction.setGeneralSearchExclusionValue,
            payload: exclusion,
          });

          parentDispatch({
            action: queryAction.setGeneralSearchInclusionValue,
            payload: inclusion,
          });
        },
      }}
    />
  );

  const generalSearchSection = (
    <Stack>
      <Text size="md">Search</Text>
      {caseSensitiveSegmentedControl}
      {generalSearchInclusionTextInput}
      {generalSearchExclusionTextInput}
      {addSearchLinkButton}
    </Stack>
  );

  return generalSearchSection;
}

export { QuerySearch };
