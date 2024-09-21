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

type GPUProps = {
  gpuBoostClock: string;
  gpuChipset: string;
  gpuCoreClock: string;
  gpuMemoryCapacity: string;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuTdp: string;
  additionalFields: Array<[string, string]>;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function GPU({
  gpuBoostClock,
  gpuChipset,
  gpuCoreClock,
  gpuMemoryCapacity,
  gpuMemoryCapacityUnit,
  gpuTdp,
  additionalFields,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: GPUProps) {
  const gpuBoostClockTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "gpuBoostClock",
        stepperPages,
        validValueAction: parentAction.setGpuBoostClock,
        value: gpuBoostClock,
      }}
    />
  );

  const gpuChipsetTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "gpuChipset",
        stepperPages,
        validValueAction: parentAction.setGpuChipset,
        value: gpuChipset,
      }}
    />
  );

  const gpuCoreClockTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "gpuCoreClock",
        stepperPages,
        validValueAction: parentAction.setGpuCoreClock,
        value: gpuCoreClock,
      }}
    />
  );

  const gpuMemoryCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "gpuMemoryCapacity",
        stepperPages,
        validValueAction: parentAction.setGpuMemoryCapacity,
        value: gpuMemoryCapacity,
      }}
    />
  );

  const gpuMemoryCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        name: "gpuMemoryCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setGpuMemoryCapacityUnit,
        value: gpuMemoryCapacityUnit,
      }}
    />
  );

  const gpuTdpTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "gpuTdp",
        stepperPages,
        validValueAction: parentAction.setGpuTdp,
        value: gpuTdp,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={5}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {gpuBoostClockTextInput}
      {gpuChipsetTextInput}
      {gpuCoreClockTextInput}
      {gpuMemoryCapacityTextInput}
      {gpuMemoryCapacityUnitSelectInput}
      {gpuTdpTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { GPU };
