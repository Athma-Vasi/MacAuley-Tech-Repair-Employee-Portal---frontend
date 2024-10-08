import { Group, Stack } from "@mantine/core";

import { INPUT_MAX_WIDTH, INPUT_MIN_WIDTH } from "../../constants/data";
import type { StepperChild, StepperPage } from "../../types";
import { AccessibleButton } from "../accessibleInputs/AccessibleButton";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import type { ProductCategory } from "../dashboard/types";
import type { CreateProductAction } from "./actions";
import {
  MAX_ADDITIONAL_FIELDS_AMOUNT,
  PRODUCT_CATEGORY_PAGE_TABLE,
} from "./constants";
import type { CreateProductDispatch } from "./dispatch";

type AdditionalFieldsProps = {
  additionalFields: Array<[string, string]>;
  page: number;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
  parentAction: CreateProductAction;
};

function AdditionalFields({
  stepperPages,
  additionalFields,
  page,
  parentAction,
  parentDispatch,
  productCategory,
}: AdditionalFieldsProps) {
  const addAdditionalFieldButton = (
    <AccessibleButton
      attributes={{
        disabled: additionalFields.length === MAX_ADDITIONAL_FIELDS_AMOUNT,
        disabledScreenreaderText: "Maximum additional fields amount reached",
        enabledScreenreaderText: "Add an additional field",
        kind: "add",
        onClick: (
          _event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.PointerEvent<HTMLButtonElement>,
        ) => {
          parentDispatch({
            action: parentAction.modifyAdditionalFieldsMap,
            payload: { operation: "add", productCategory },
          });

          // required for popover validation linking to stepper component
          const additionalFieldName: StepperChild = {
            inputType: "text",
            name: `Additional Field Name ${additionalFields.length + 1}`,
            validationKey: "objectKey",
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
              | React.PointerEvent<HTMLButtonElement>,
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
          enabledScreenreaderText: `Insert additional field before ${
            index + 1
          }`,
          index,
          kind: "insert",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>,
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
          enabledScreenreaderText: `Slide additional field ${index + 1} down`,
          index,
          kind: "down",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>,
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
          disabledScreenreaderText: `Additional field ${
            index + 1
          } is already at the top`,
          enabledScreenreaderText: `Slide additional field ${index + 1} up`,
          index,
          kind: "up",
          setIconAsLabel: true,
          onClick: (
            _event:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.PointerEvent<HTMLButtonElement>,
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
      <Stack
        key={`${productCategory}-${index.toString()}`}
        style={{ minWidth: INPUT_MIN_WIDTH, maxWidth: INPUT_MAX_WIDTH }}
        w="100%"
      >
        <Group>
          {fieldNameTextAreaInput}
          {fieldValueTextAreaInput}
        </Group>
        <Group>
          {deleteFieldButton}
          {insertFieldButton}
          {slideFieldUpButton}
          {slideFieldDownButton}
        </Group>
      </Stack>
    );
  });

  // const imageInput = (
  //   <AccessibleImageInput
  //     attributes={{
  //       invalidValueAction: parentAction.setPageInError,
  //       page,
  //       productCategory,
  //       productCategoryDispatch: parentDispatch,
  //       storageKey: "additionalFields",
  //       validValueAction: parentAction.setAdditionalFieldsFormDataMap,
  //     }}
  //   />
  // );

  return (
    <Stack>
      {/* {imageInput} */}
      {addAdditionalFieldButton}
      {additionalTextInputs}
    </Stack>
  );
}

export { AdditionalFields };
