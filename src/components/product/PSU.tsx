import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { PsuEfficiency, PsuFormFactor, PsuModularity } from "./types";

type PSUProps = {
  additionalFields: Array<[string, string]>;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  psuEfficiency: PsuEfficiency;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;
  stepperPages: StepperPage[];
};

function PSU({
  additionalFields,
  parentAction,
  parentDispatch,
  productCategory,
  psuEfficiency,
  psuFormFactor,
  psuModularity,
  psuWattage,
  stepperPages,
}: PSUProps) {
  const psuEfficiencySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PSU_EFFICIENCY_RATING_DATA,
        name: "psuEfficiency",
        parentDispatch,
        validValueAction: parentAction.setPsuEfficiency,
        value: psuEfficiency,
      }}
    />
  );

  const psuFormFactorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PSU_FORM_FACTOR_DATA,
        name: "psuFormFactor",
        parentDispatch,
        validValueAction: parentAction.setPsuFormFactor,
        value: psuFormFactor,
      }}
    />
  );

  const psuModularitySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PSU_MODULARITY_DATA,
        name: "psuModularity",
        parentDispatch,
        validValueAction: parentAction.setPsuModularity,
        value: psuModularity,
      }}
    />
  );

  const psuWattageTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "psuWattage",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setPsuWattage,
        value: psuWattage,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={11}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {psuEfficiencySelectInput}
      {psuFormFactorSelectInput}
      {psuModularitySelectInput}
      {psuWattageTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { PSU };
