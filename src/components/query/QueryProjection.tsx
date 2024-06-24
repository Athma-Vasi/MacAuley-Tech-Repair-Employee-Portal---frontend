import { Accordion, Stack, Text } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";

import { CheckboxRadioSelectData } from "../../types";
import { AccessibleCheckboxInputGroup } from "../accessibleInputs/AccessibleCheckboxInput";
import { QueryAction } from "./actions";

type QueryProjectionDispatch<ValidValueAction extends string = string> = React.Dispatch<{
  action: ValidValueAction;
  payload: string[];
}>;

type QueryProjectionProps<ValidValueAction extends string = string> = {
  parentDispatch: QueryProjectionDispatch<ValidValueAction>;
  projectionCheckboxData: CheckboxRadioSelectData;
  projectionFields: string[];
  queryAction: QueryAction;
};

function QueryProjection<ValidValueAction extends string = string>({
  parentDispatch,
  projectionCheckboxData,
  projectionFields,
  queryAction,
}: QueryProjectionProps<ValidValueAction>) {
  return (
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
}

export { QueryProjection };
export type { QueryProjectionDispatch };
