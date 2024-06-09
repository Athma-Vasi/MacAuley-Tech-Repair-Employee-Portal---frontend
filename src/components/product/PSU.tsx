import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import {
  PSU_EFFICIENCY_RATING_DATA,
  PSU_FORM_FACTOR_DATA,
  PSU_MODULARITY_DATA,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { PsuEfficiency, PsuFormFactor, PsuModularity } from "./types";

type PSUProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
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
  additionalFieldsFormData,
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
        stepperPages,
        validValueAction: parentAction.setPsuWattage,
        value: psuWattage,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      additionalFieldsFormData={additionalFieldsFormData}
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
