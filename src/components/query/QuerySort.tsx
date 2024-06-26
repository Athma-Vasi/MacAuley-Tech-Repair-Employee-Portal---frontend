import { Stack } from "@mantine/core";

import { CheckboxRadioSelectData } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { QueryAction } from "./actions";
import { MAX_LINKS_AMOUNT, SORT_DIRECTION_DATA } from "./constants";
import { ModifyQueryChainPayload, QueryChain, SortDirection } from "./types";
import { removeProjectionExclusionFields } from "./utils";

type QuerySortDispatch<ValidValueAction extends string = string> = React.Dispatch<{
  action: ValidValueAction;
  payload: string;
}>;

type QuerySortProps<ValidValueAction extends string = string> = {
  projectionExclusionFields: string[];
  queryAction: QueryAction;
  querySortDispatch: QuerySortDispatch<ValidValueAction>;
  sortChain: QueryChain;
  sortChainDispatch: React.Dispatch<{
    action: QueryAction["modifyQueryChains"];
    payload: ModifyQueryChainPayload;
  }>;
  sortDirection: SortDirection;
  sortField: string;
  sortFieldSelectData: CheckboxRadioSelectData;
};

function QuerySort<ValidValueAction extends string = string>({
  projectionExclusionFields,
  queryAction,
  querySortDispatch,
  sortChain,
  sortChainDispatch,
  sortDirection,
  sortField,
  sortFieldSelectData,
}: QuerySortProps<ValidValueAction>) {
  const data = removeProjectionExclusionFields(
    projectionExclusionFields,
    sortFieldSelectData
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

  const addFilterStatementsButton = (
    <AccessibleButton
      attributes={{
        enabledScreenreaderText: "Add search link to chain",
        disabledScreenreaderText: "Max query links amount reached",
        disabled: disabled || sortChain.length === MAX_LINKS_AMOUNT,
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          sortChainDispatch({
            action: queryAction.modifyQueryChains,
            payload: {
              index: sortChain.length,
              queryChainActions: "insert",
              queryChainKind: "sort",
              value: [sortField, "", sortDirection],
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
      {addFilterStatementsButton}
    </Stack>
  );
}

export { QuerySort };
export type { QuerySortDispatch };
