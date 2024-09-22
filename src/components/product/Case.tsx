import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { CASE_SIDE_PANEL_DATA, CASE_TYPE_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { CaseSidePanel, CaseType } from "./types";

type CaseProps = {
  additionalFields: Array<[string, string]>;
  caseColor: string;
  caseSidePanel: CaseSidePanel;
  caseType: CaseType;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Case({
  additionalFields,
  caseColor,
  caseSidePanel,
  caseType,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: CaseProps) {
  const caseColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "caseColor",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCaseColor,
        value: caseColor,
      }}
    />
  );

  const caseSidePanelSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CASE_SIDE_PANEL_DATA,
        name: "caseSidePanel",
        parentDispatch,
        validValueAction: parentAction.setCaseSidePanel,
        value: caseSidePanel,
      }}
    />
  );

  const caseTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CASE_TYPE_DATA,
        name: "caseType",
        parentDispatch,
        validValueAction: parentAction.setCaseType,
        value: caseType,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={2}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {caseColorTextInput}
      {caseSidePanelSelectInput}
      {caseTypeSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Case };
