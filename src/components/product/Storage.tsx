import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  MEMORY_UNIT_DATA,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type {
  MemoryUnit,
  StorageFormFactor,
  StorageInterface,
  StorageType,
} from "./types";

type StorageProps = {
  additionalFields: Array<[string, string]>;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
  storageCacheCapacity: string;
  storageCacheCapacityUnit: MemoryUnit;
  storageCapacity: string;
  storageCapacityUnit: MemoryUnit;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;
  storageType: StorageType;
};

function Storage({
  additionalFields,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
  storageCacheCapacity,
  storageCacheCapacityUnit,
  storageCapacity,
  storageCapacityUnit,
  storageFormFactor,
  storageInterface,
  storageType,
}: StorageProps) {
  const storageCacheCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "storageCacheCapacity",
        stepperPages,
        validValueAction: parentAction.setStorageCacheCapacity,
        value: storageCacheCapacity,
      }}
    />
  );

  const storageCacheCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        name: "storageCacheCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setStorageCacheCapacityUnit,
        value: storageCacheCapacityUnit,
      }}
    />
  );

  const storageCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "storageCapacity",
        stepperPages,
        validValueAction: parentAction.setStorageCapacity,
        value: storageCapacity,
      }}
    />
  );

  const storageCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        name: "storageCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setStorageCapacityUnit,
        value: storageCapacityUnit,
      }}
    />
  );

  const storageFormFactorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: STORAGE_FORM_FACTOR_DATA,
        name: "storageFormFactor",
        parentDispatch,
        validValueAction: parentAction.setStorageFormFactor,
        value: storageFormFactor,
      }}
    />
  );

  const storageInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: STORAGE_INTERFACE_DATA,
        name: "storageInterface",
        parentDispatch,
        validValueAction: parentAction.setStorageInterface,
        value: storageInterface,
      }}
    />
  );

  const storageTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: STORAGE_TYPE_DATA,
        name: "storageType",
        parentDispatch,
        validValueAction: parentAction.setStorageType,
        value: storageType,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={14}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {storageCacheCapacityTextInput}
      {storageCacheCapacityUnitSelectInput}
      {storageCapacityTextInput}
      {storageCapacityUnitSelectInput}
      {storageFormFactorSelectInput}
      {storageInterfaceSelectInput}
      {storageTypeSelectInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Storage };
