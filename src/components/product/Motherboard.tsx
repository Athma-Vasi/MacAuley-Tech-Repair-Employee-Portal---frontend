import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import {
  MEMORY_TYPE_DATA,
  MEMORY_UNIT_DATA,
  MOTHERBOARD_FORM_FACTOR_DATA,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { MemoryType, MemoryUnit, MotherboardFormFactor } from "./types";

type MotherboardProps = {
  additionalFields: Array<[string, string]>;
  motherboardChipset: string;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardM2Slots: string;
  motherboardMemoryMaxCapacity: string;
  motherboardMemoryMaxCapacityUnit: MemoryUnit;
  motherboardMemorySlots: string;
  motherboardMemoryType: MemoryType;
  motherboardPcie3Slots: string;
  motherboardPcie4Slots: string;
  motherboardPcie5Slots: string;
  motherboardSataPorts: string;
  motherboardSocket: string;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Motherboard({
  additionalFields,
  motherboardChipset,
  motherboardFormFactor,
  motherboardM2Slots,
  motherboardMemoryMaxCapacity,
  motherboardMemoryMaxCapacityUnit,
  motherboardMemorySlots,
  motherboardMemoryType,
  motherboardPcie3Slots,
  motherboardPcie4Slots,
  motherboardPcie5Slots,
  motherboardSataPorts,
  motherboardSocket,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: MotherboardProps) {
  const motherboardChipsetTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardChipset",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardChipset,
        value: motherboardChipset,
      }}
    />
  );

  const motherBoardFormFactorSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MOTHERBOARD_FORM_FACTOR_DATA,
        name: "motherboardFormFactor",
        parentDispatch,
        validValueAction: parentAction.setMotherboardFormFactor,
        value: motherboardFormFactor,
      }}
    />
  );

  const motherboardM2SlotsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardM2Slots",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardM2Slots,
        value: motherboardM2Slots,
      }}
    />
  );

  const motherboardMemoryMaxCapacityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardMemoryMaxCapacity",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardMemoryMaxCapacity,
        value: motherboardMemoryMaxCapacity,
      }}
    />
  );

  const motherboardMemoryMaxCapacityUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_UNIT_DATA,
        name: "motherboardMemoryMaxCapacityUnit",
        parentDispatch,
        validValueAction: parentAction.setMotherboardMemoryMaxCapacityUnit,
        value: motherboardMemoryMaxCapacityUnit,
      }}
    />
  );

  const motherboardMemorySlotsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardMemorySlots",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardMemorySlots,
        value: motherboardMemorySlots,
      }}
    />
  );

  const motherboardMemoryTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: MEMORY_TYPE_DATA,
        name: "motherboardMemoryType",
        parentDispatch,
        validValueAction: parentAction.setMotherboardMemoryType,
        value: motherboardMemoryType,
      }}
    />
  );

  const motherboardPcie3SlotsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardPcie3Slots",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardPcie3Slots,
        value: motherboardPcie3Slots,
      }}
    />
  );

  const motherboardPcie4SlotsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardPcie4Slots",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardPcie4Slots,
        value: motherboardPcie4Slots,
      }}
    />
  );

  const motherboardPcie5SlotsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardPcie5Slots",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardPcie5Slots,
        value: motherboardPcie5Slots,
      }}
    />
  );

  const motherboardSataPortsTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardSataPorts",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardSataPorts,
        value: motherboardSataPorts,
      }}
    />
  );

  const motherboardSocketTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "motherboardSocket",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setMotherboardSocket,
        value: motherboardSocket,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={9}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {motherboardChipsetTextInput}
      {motherBoardFormFactorSelectInput}
      {motherboardM2SlotsTextInput}
      {motherboardMemoryMaxCapacityTextInput}
      {motherboardMemoryMaxCapacityUnitSelectInput}
      {motherboardMemorySlotsTextInput}
      {motherboardMemoryTypeSelectInput}
      {motherboardPcie3SlotsTextInput}
      {motherboardPcie4SlotsTextInput}
      {motherboardPcie5SlotsTextInput}
      {motherboardSataPortsTextInput}
      {motherboardSocketTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Motherboard };
