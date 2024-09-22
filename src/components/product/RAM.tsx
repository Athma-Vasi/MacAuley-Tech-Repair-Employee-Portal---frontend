import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { MEMORY_TYPE_DATA, MEMORY_UNIT_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { MemoryType, MemoryUnit } from "./types";

type RAMProps = {
  additionalFields: Array<[string, string]>;
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
        parentDispatch,
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
        parentDispatch,
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
        parentDispatch,
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
        parentDispatch,
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
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setRamTiming,
        value: ramTiming,
      }}
    />
  );

  const ramTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_TYPE_DATA,
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
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setRamVoltage,
        value: ramVoltage,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
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
