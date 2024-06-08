import { Group, Stack } from "@mantine/core";

import { StepperChild, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleImageInput } from "../accessibleInputs/image";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import {
  MAX_ADDITIONAL_FIELDS_AMOUNT,
  MEMORY_UNIT_DATA,
  PRODUCT_CATEGORY_PAGE_TABLE,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { MemoryUnit } from "./types";

type CPUProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
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
  additionalFieldsFormData,
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
        name: "cpuCores",
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
        name: "cpuFrequency",
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
        name: "cpuL1CacheCapacity",
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
        name: "cpuL2CacheCapacity",
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
        name: "cpuL3CacheCapacity",
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
        name: "cpuSocket",
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
        name: "cpuWattage",
        stepperPages,
        validValueAction: parentAction.setCpuWattage,
        value: cpuWattage,
      }}
    />
  );

  const addAdditionalFieldButton = (
    <AccessibleButton
      attributes={{
        disabled: additionalFields.length === MAX_ADDITIONAL_FIELDS_AMOUNT,
        disabledScreenreaderText: "Maximum additional fields amount reached",
        enabledScreenreaderText: `Add an additional field`,
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>
        ) => {
          parentDispatch({
            action: parentAction.modifyAdditionalFieldsMap,
            payload: { operation: "add", productCategory },
          });

          // required for popover validation linking to stepper component
          const additionalFieldName: StepperChild = {
            inputType: "text",
            name: `Additional Field Name ${additionalFields.length + 1}`,
            validationKey: "textAreaInput",
          };

          parentDispatch({
            action: parentAction.addStepperChild,
            payload: {
              dynamicIndexes: [PRODUCT_CATEGORY_PAGE_TABLE[productCategory]],
              value: additionalFieldName,
            },
          });

          const additionalFieldValue: StepperChild = {
            inputType: "text",
            name: `Additional Field Value ${additionalFields.length + 1}`,
            validationKey: "textAreaInput",
          };

          parentDispatch({
            action: parentAction.addStepperChild,
            payload: {
              dynamicIndexes: [PRODUCT_CATEGORY_PAGE_TABLE[productCategory]],
              value: additionalFieldValue,
            },
          });
        },
      }}
    />
  );

  const additionalTextInputs = additionalFields.map((tuple, index) => {
    const [fieldName, fieldValue] = tuple;

    const fieldNameTextAreaInput = (
      <AccessibleTextAreaInput
        attributes={{
          dynamicIndexes: [index],
          invalidValueAction: parentAction.setPageInError,
          name: `Additional Field Name ${index + 1}`,
          productDispatchInfo: {
            kind: "fieldName",
            operation: "update",
            productCategory,
            productDispatch: parentDispatch,
          },
          stepperPages,
          validValueAction: parentAction.modifyAdditionalFieldsMap,
          value: fieldName,
        }}
      />
    );

    const fieldValueTextAreaInput = (
      <AccessibleTextAreaInput
        attributes={{
          dynamicIndexes: [index],
          invalidValueAction: parentAction.setPageInError,
          name: `Additional Field Value ${index + 1}`,
          productDispatchInfo: {
            kind: "fieldValue",
            operation: "update",
            productCategory,
            productDispatch: parentDispatch,
          },
          stepperPages,
          validValueAction: parentAction.modifyAdditionalFieldsMap,
          value: fieldValue,
        }}
      />
    );

    const deleteFieldButton = (
      <AccessibleButton
        attributes={{
          enabledScreenreaderText: `Delete additional field ${index + 1}`,
          index,
          kind: "delete",
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            parentDispatch({
              action: parentAction.modifyAdditionalFieldsMap,
              payload: {
                dynamicIndexes: [index],
                operation: "delete",
                productCategory,
              },
            });
          },
          setIconAsLabel: true,
        }}
      />
    );

    const insertFieldButton = (
      <AccessibleButton
        attributes={{
          disabled: additionalFields.length === MAX_ADDITIONAL_FIELDS_AMOUNT,
          disabledScreenreaderText: "Maximum additional fields amount reached",
          enabledScreenreaderText: `Insert additional field before ${index + 1}`,
          index,
          kind: "insert",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            parentDispatch({
              action: parentAction.modifyAdditionalFieldsMap,
              payload: {
                dynamicIndexes: [index],
                operation: "insert",
                productCategory,
              },
            });
          },
        }}
      />
    );

    const slideFieldDownButton = (
      <AccessibleButton
        attributes={{
          disabled: index === additionalFields.length - 1,
          disabledScreenreaderText: `Additional field ${
            index + 1
          } is already at the bottom`,
          enabledScreenreaderText: `Slide additional field down`,
          index,
          kind: "down",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            parentDispatch({
              action: parentAction.modifyAdditionalFieldsMap,
              payload: {
                dynamicIndexes: [index],
                operation: "slideDown",
                productCategory,
              },
            });
          },
        }}
      />
    );

    const slideFieldUpButton = (
      <AccessibleButton
        attributes={{
          disabled: index === 0,
          disabledScreenreaderText: `Additional field ${index + 1} is already at the top`,
          enabledScreenreaderText: `Slide additional field up`,
          index,
          kind: "up",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>
          ) => {
            parentDispatch({
              action: parentAction.modifyAdditionalFieldsMap,
              payload: {
                dynamicIndexes: [index],
                operation: "slideUp",
                productCategory,
              },
            });
          },
        }}
      />
    );

    return (
      <Stack key={`${productCategory}-${index}`}>
        <Group>
          {fieldNameTextAreaInput}
          {fieldValueTextAreaInput}
        </Group>
        <Group>
          {deleteFieldButton}
          {insertFieldButton}
          {slideFieldDownButton}
          {slideFieldUpButton}
        </Group>
      </Stack>
    );
  });

  const imageInput = (
    <AccessibleImageInput
      attributes={{
        formData: additionalFieldsFormData,
        invalidValueAction: parentAction.setPageInError,
        page: 1,
        productCategory,
        productCategoryDispatch: parentDispatch,
        stepperPages,
        validValueAction: parentAction.setAdditionalFieldsFormDataMap,
      }}
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
      {addAdditionalFieldButton}
      {additionalTextInputs}
      {imageInput}
    </Stack>
  );
}

export { CPU };
