import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { MEMORY_UNIT_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { MemoryUnit } from "./types";

type CPUProps = {
  additionalFields: Array<[string, string]>;
  cpuCores: string;
  cpuFrequency: string;
  cpuL1CacheCapacity: string;
  cpuL1CacheCapacityUnit: MemoryUnit;
  cpuL2CacheCapacity: string;
  cpuL2CacheCapacityUnit: MemoryUnit;
  cpuL3CacheCapacity: string;
  cpuL3CacheCapacityUnit: MemoryUnit;
  cpuSocket: string;
  cpuWattage: string;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function CPU({
  additionalFields,
  cpuCores,
  cpuFrequency,
  cpuL1CacheCapacity,
  cpuL1CacheCapacityUnit,
  cpuL2CacheCapacity,
  cpuL2CacheCapacityUnit,
  cpuL3CacheCapacity,
  cpuL3CacheCapacityUnit,
  cpuSocket,
  cpuWattage,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: CPUProps) {
  const cpuCoresTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Cores",
        name: "cpuCores",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuCores,
        value: cpuCores,
      }}
    />
  );

  const cpuFrequencyTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Frequency (GHz)",
        name: "cpuFrequency",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuFrequency,
        value: cpuFrequency,
      }}
    />
  );

  const cpuL1CacheCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "L1 Cache Capacity",
        name: "cpuL1CacheCapacity",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuL1CacheCapacity,
        value: cpuL1CacheCapacity,
      }}
    />
  );

  const cpuL1CacheCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        label: "L1 Cache Capacity Unit",
        name: "cpuL1CacheCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setCpuL1CacheCapacityUnit,
        value: cpuL1CacheCapacityUnit,
      }}
    />
  );

  const cpuL2CacheCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "L2 Cache Capacity",
        name: "cpuL2CacheCapacity",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuL2CacheCapacity,
        value: cpuL2CacheCapacity,
      }}
    />
  );

  const cpuL2CacheCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        label: "L2 Cache Capacity Unit",
        name: "cpuL2CacheCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setCpuL2CacheCapacityUnit,
        value: cpuL2CacheCapacityUnit,
      }}
    />
  );

  const cpuL3CacheCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "L3 Cache Capacity",
        name: "cpuL3CacheCapacity",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuL3CacheCapacity,
        value: cpuL3CacheCapacity,
      }}
    />
  );

  const cpuL3CacheCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        label: "L3 Cache Capacity Unit",
        name: "cpuL3CacheCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setCpuL3CacheCapacityUnit,
        value: cpuL3CacheCapacityUnit,
      }}
    />
  );

  const cpuSocketTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Socket",
        name: "cpuSocket",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuSocket,
        value: cpuSocket,
      }}
    />
  );

  const cpuWattageTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        label: "Wattage",
        name: "cpuWattage",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setCpuWattage,
        value: cpuWattage,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={3}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {cpuCoresTextInput}
      {cpuFrequencyTextInput}
      {cpuL1CacheCapacityTextInput}
      {cpuL1CacheCapacityUnitSelectInput}
      {cpuL2CacheCapacityTextInput}
      {cpuL2CacheCapacityUnitSelectInput}
      {cpuL3CacheCapacityTextInput}
      {cpuL3CacheCapacityUnitSelectInput}
      {cpuSocketTextInput}
      {cpuWattageTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { CPU };
