import { CheckboxRadioSelectData } from "../../types";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { QueryAction } from "./actions";
import { QueryDispatch } from "./types";

type QueryProjectionProps = {
  parentDispatch: React.Dispatch<QueryDispatch>;
  projectionCheckboxData: CheckboxRadioSelectData;
  projectionExclusionFields: string[];
  queryAction: QueryAction;
};

function QueryProjection({
  parentDispatch,
  projectionCheckboxData,
  projectionExclusionFields,
  queryAction,
}: QueryProjectionProps) {
  return (
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
