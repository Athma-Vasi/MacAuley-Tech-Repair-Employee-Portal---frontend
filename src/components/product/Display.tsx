import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { DISPLAY_PANEL_TYPE_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { DisplayPanelType } from "./types";

type DisplayProps = {
  additionalFields: Array<[string, string]>;
  displayAspectRatio: string;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Display({
  additionalFields,
  displayAspectRatio,
  displayPanelType,
  displayRefreshRate,
  displayResolutionHorizontal,
  displayResolutionVertical,
  displayResponseTime,
  displaySize,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: DisplayProps) {
  const displayAspectRatioTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayAspectRatio",
        stepperPages,
        validValueAction: parentAction.setDisplayAspectRatio,
        value: displayAspectRatio,
      }}
    />
  );

  const displayPanelTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DISPLAY_PANEL_TYPE_DATA,
        name: "displayPanelType",
        parentDispatch,
        validValueAction: parentAction.setDisplayPanelType,
        value: displayPanelType,
      }}
    />
  );

  const displayRefreshRateTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayRefreshRate",
        stepperPages,
        validValueAction: parentAction.setDisplayRefreshRate,
        value: displayRefreshRate,
      }}
    />
  );

  const displayResolutionHorizontalTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResolutionHorizontal",
        stepperPages,
        validValueAction: parentAction.setDisplayResolutionHorizontal,
        value: displayResolutionHorizontal,
      }}
    />
  );

  const displayResolutionVerticalTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResolutionVertical",
        stepperPages,
        validValueAction: parentAction.setDisplayResolutionVertical,
        value: displayResolutionVertical,
      }}
    />
  );

  const displayResponseTimeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResponseTime",
        stepperPages,
        validValueAction: parentAction.setDisplayResponseTime,
        value: displayResponseTime,
      }}
    />
  );

  const displaySizeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displaySize",
        stepperPages,
        validValueAction: parentAction.setDisplaySize,
        value: displaySize,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={4}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {displayAspectRatioTextInput}
      {displayPanelTypeSelectInput}
      {displayRefreshRateTextInput}
      {displayResolutionHorizontalTextInput}
      {displayResolutionVerticalTextInput}
      {displayResponseTimeTextInput}
      {displaySizeTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Display };
