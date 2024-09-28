import type { CheckboxRadioSelectData } from "../../types";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { queryAction } from "./actions";
import type { QueryDispatch, QueryState } from "./types";

type QueryProjectionProps = {
  hideProjection: boolean;
  parentDispatch: React.Dispatch<QueryDispatch>;
  projectionCheckboxData: CheckboxRadioSelectData;
  queryState: QueryState;
};

function QueryProjection({
  hideProjection = false,
  parentDispatch,
  projectionCheckboxData,
  queryState,
}: QueryProjectionProps) {
  const { projectionExclusionFields } = queryState;

  return hideProjection ? null : (
    <AccessibleCheckboxInputGroup
      attributes={{
        inputData: projectionCheckboxData,
        name: "exclusionFields",
        parentDispatch,
        validValueAction: queryAction.setProjectionExclusionFields,
        value: projectionExclusionFields,
      }}
    />
  );
}

export { QueryProjection };
