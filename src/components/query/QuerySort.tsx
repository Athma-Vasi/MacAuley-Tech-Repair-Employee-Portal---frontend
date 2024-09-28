import { Stack } from "@mantine/core";
import type React from "react";

import type { CheckboxRadioSelectData } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { type QueryAction, queryAction } from "./actions";
import { MAX_LINKS_AMOUNT, SORT_DIRECTION_DATA } from "./constants";
import type { ModifyQueryChainPayload, QueryState } from "./types";
import { removeProjectionExclusionFields } from "./utils";

type QuerySortDispatch<ValidValueAction extends string = string> =
  React.Dispatch<{
    action: ValidValueAction;
    payload: string;
  }>;

type QuerySortProps<ValidValueAction extends string = string> = {
  querySortDispatch: QuerySortDispatch<ValidValueAction>;
  queryState: QueryState;
  sortChainDispatch: React.Dispatch<{
    action: QueryAction["modifyQueryChains"];
    payload: ModifyQueryChainPayload;
  }>;
  sortFieldSelectData: CheckboxRadioSelectData;
};

function QuerySort<ValidValueAction extends string = string>({
  querySortDispatch,
  queryState,
  sortChainDispatch,
  sortFieldSelectData,
}: QuerySortProps<ValidValueAction>) {
  const { projectionExclusionFields, queryChains, sortDirection, sortField } =
    queryState;
  const logicalOperatorChainsMap = queryChains.sort;
  const sortChainLength = Array.from(logicalOperatorChainsMap).reduce(
    (acc, [_key, value]) => {
      acc += value.length;
      return acc;
    },
    0,
  );

  const data = removeProjectionExclusionFields(
    projectionExclusionFields,
    sortFieldSelectData,
  );
  const disabled = data.length === 0;

  const sortFieldSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data,
        disabled,
        name: "sortField",
        parentDispatch: querySortDispatch,
        validValueAction: queryAction.setSortField as ValidValueAction,
        value: sortField,
      }}
    />
  );

  const sortDirectionSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: SORT_DIRECTION_DATA,
        disabled,
        name: "sortDirection",
        parentDispatch: querySortDispatch,
        validValueAction: queryAction.setSortDirection as ValidValueAction,
        value: sortDirection,
      }}
    />
  );

  const addSortLinkButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add search link to chain",
        disabledScreenreaderText: "Max query links amount reached",
        disabled: disabled || sortChainLength === MAX_LINKS_AMOUNT,
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>,
        ) => {
          sortChainDispatch({
            action: queryAction.modifyQueryChains,
            payload: {
              index: sortChainLength,
              logicalOperator: "and",
              queryChainActions: "insert",
              queryChainKind: "sort",
              queryLink: [sortField, "equal to", sortDirection],
            },
          });
        },
      }}
    />
  );

  return (
    <Stack>
      {sortFieldSelectInput}
      {sortDirectionSelectInput}
      {addSortLinkButton}
    </Stack>
  );
}

export { QuerySort };
export type { QuerySortDispatch };
