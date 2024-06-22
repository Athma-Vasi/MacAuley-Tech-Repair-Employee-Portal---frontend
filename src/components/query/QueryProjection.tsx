import { CheckboxRadioSelectData, SetPageInErrorPayload } from "../../types";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { QueryAction } from "./actions";

type QueryProjectionDispatch<ValidValueAction extends string = string> = React.Dispatch<{
  action: ValidValueAction;
  payload: string;
}>;

type QueryProjectionProps<ValidValueAction extends string = string> = {
  isProjectionDisabled?: boolean;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: string[];
  }>;
  projectionCheckboxData: CheckboxRadioSelectData;
  projectionFields: string[];
  queryAction: QueryAction;
};

function QueryProjection<ValidValueAction extends string = string>({
  isProjectionDisabled = false,
  parentDispatch,
  projectionCheckboxData,
  projectionFields,
  queryAction,
}: QueryProjectionProps<ValidValueAction>) {
  const projectionCheckboxInput = (
    <AccessibleCheckboxInputGroup
      attributes={{
        inputData: projectionCheckboxData,
        name: "exclusionFields",
        parentDispatch,
        validValueAction: queryAction.setProjectionFields as ValidValueAction,
        value: projectionFields,
      }}
    />
  );

  return projectionCheckboxInput;
}

export { QueryProjection };
export type { QueryProjectionDispatch };
