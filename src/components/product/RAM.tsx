import { Stack } from "@mantine/core";

import { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import { AdditionalFields } from "./AdditionalFields";
import { MEMORY_UNIT_DATA, RAM_MEMORY_TYPE_DATA } from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { MemoryType, MemoryUnit } from "./types";

type RAMProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  ramColor: string;
  ramDataRate: string;
  ramModulesCapacity: string;
  ramModulesCapacityUnit: MemoryUnit;
  ramModulesQuantity: string;
  ramTiming: string;
  ramType: MemoryType;
  ramVoltage: string;
  stepperPages: StepperPage[];
};

function RAM({
  additionalFields,
  additionalFieldsFormData,
  parentAction,
  parentDispatch,
  productCategory,
  ramColor,
  ramDataRate,
  ramModulesCapacity,
  ramModulesCapacityUnit,
  ramModulesQuantity,
  ramTiming,
  ramType,
  ramVoltage,
  stepperPages,
}: RAMProps) {
  const ramColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramColor",
        stepperPages,
        validValueAction: parentAction.setRamColor,
        value: ramColor,
      }}
    />
  );

  const ramDataRateTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramDataRate",
        stepperPages,
        validValueAction: parentAction.setRamDataRate,
        value: ramDataRate,
      }}
    />
  );

  const ramModulesCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramModulesCapacity",
        stepperPages,
        validValueAction: parentAction.setRamModulesCapacity,
        value: ramModulesCapacity,
      }}
    />
  );

  const ramModulesCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        name: "ramModulesCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setRamModulesCapacityUnit,
        value: ramModulesCapacityUnit,
      }}
    />
  );

  const ramModulesQuantityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramModulesQuantity",
        stepperPages,
        validValueAction: parentAction.setRamModulesQuantity,
        value: ramModulesQuantity,
      }}
    />
  );

  const ramTimingTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramTiming",
        stepperPages,
        validValueAction: parentAction.setRamTiming,
        value: ramTiming,
      }}
    />
  );

  const ramTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: RAM_MEMORY_TYPE_DATA,
        name: "ramType",
        parentDispatch,
        validValueAction: parentAction.setRamType,
        value: ramType,
      }}
    />
  );

  const ramVoltageTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "ramVoltage",
        stepperPages,
        validValueAction: parentAction.setRamVoltage,
        value: ramVoltage,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      additionalFieldsFormData={additionalFieldsFormData}
      page={12}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {ramColorTextInput}
      {ramDataRateTextInput}
      {ramModulesCapacityTextInput}
      {ramModulesCapacityUnitSelectInput}
      {ramModulesQuantityTextInput}
      {ramTimingTextInput}
      {ramTypeSelectInput}
      {ramVoltageTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { RAM };
