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
  isProjectionDisabled?: boolean;
  parentDispatch: QueryProjectionDispatch<ValidValueAction>;
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

  return (
    <Accordion chevron={<TbChevronDown />}>
      <Accordion.Item value="Projection">
        <Accordion.Control
          disabled={isProjectionDisabled || projectionCheckboxData.length === 0}
        >
          <Text size="lg">Projection</Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>{projectionCheckboxInput}</Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export { QueryProjection };
export type { QueryProjectionDispatch };
