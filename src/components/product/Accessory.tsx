import { Stack } from "@mantine/core";

import type { StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import type { ProductCategory } from "../dashboard/types";
import { AdditionalFields } from "./AdditionalFields";
import type { CreateProductAction } from "./actions";
import { PERIPHERALS_INTERFACE_DATA } from "./constants";
import type { CreateProductDispatch } from "./dispatch";
import type { PeripheralsInterface } from "./types";

type AccessoryProps = {
  accessoryColor: string;
  accessoryInterface: PeripheralsInterface;
  accessoryType: string;
  additionalFields: Array<[string, string]>;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Accessory({
  accessoryColor,
  accessoryInterface,
  accessoryType,
  additionalFields,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: AccessoryProps) {
  const accessoryColorTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "accessoryColor",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setAccessoryColor,
        value: accessoryColor,
      }}
    />
  );

  const accessoryInterfaceSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PERIPHERALS_INTERFACE_DATA,
        name: "accessoryInterface",
        parentDispatch,
        validValueAction: parentAction.setAccessoryInterface,
        value: accessoryInterface,
      }}
    />
  );

  const accessoryTypeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "accessoryType",
        parentDispatch,
        stepperPages,
        validValueAction: parentAction.setAccessoryType,
        value: accessoryType,
      }}
    />
  );

  const additionalFieldsAndImage = (
    <AdditionalFields
      additionalFields={additionalFields}
      page={1}
      parentAction={parentAction}
      parentDispatch={parentDispatch}
      productCategory={productCategory}
      stepperPages={stepperPages}
    />
  );

  return (
    <Stack>
      {accessoryColorTextInput}
      {accessoryInterfaceSelectInput}
      {accessoryTypeTextInput}
      {additionalFieldsAndImage}
    </Stack>
  );
}

export { Accessory };

/**
 * const addAdditionalFieldButton = (
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
 */
