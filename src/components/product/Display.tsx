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
  DISPLAY_PANEL_TYPE_DATA,
  MAX_ADDITIONAL_FIELDS_AMOUNT,
  PRODUCT_CATEGORY_PAGE_TABLE,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { DisplayPanelType } from "./types";

type DisplayProps = {
  additionalFields: Array<[string, string]>;
  additionalFieldsFormData: FormData;
  displayAspectRatio: string;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  productCategory: ProductCategory;
  stepperPages: StepperPage[];
};

function Display({
  additionalFields,
  additionalFieldsFormData,
  displayAspectRatio,
  displayPanelType,
  displayRefreshRate,
  displayResolutionHorizontal,
  displayResolutionVertical,
  displayResponseTime,
  displaySize,
  parentAction,
  parentDispatch,
  productCategory,
  stepperPages,
}: DisplayProps) {
  const displayAspectRatioTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayAspectRatio",
        stepperPages,
        validValueAction: parentAction.setDisplayAspectRatio,
        value: displayAspectRatio,
      }}
    />
  );

  const displayPanelTypeSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DISPLAY_PANEL_TYPE_DATA,
        name: "displayPanelType",
        parentDispatch,
        validValueAction: parentAction.setDisplayPanelType,
        value: displayPanelType,
      }}
    />
  );

  const displayRefreshRateTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayRefreshRate",
        stepperPages,
        validValueAction: parentAction.setDisplayRefreshRate,
        value: displayRefreshRate,
      }}
    />
  );

  const displayResolutionHorizontalTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResolutionHorizontal",
        stepperPages,
        validValueAction: parentAction.setDisplayResolutionHorizontal,
        value: displayResolutionHorizontal,
      }}
    />
  );

  const displayResolutionVerticalTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResolutionVertical",
        stepperPages,
        validValueAction: parentAction.setDisplayResolutionVertical,
        value: displayResolutionVertical,
      }}
    />
  );

  const displayResponseTimeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displayResponseTime",
        stepperPages,
        validValueAction: parentAction.setDisplayResponseTime,
        value: displayResponseTime,
      }}
    />
  );

  const displaySizeTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "displaySize",
        stepperPages,
        validValueAction: parentAction.setDisplaySize,
        value: displaySize,
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
      {displayAspectRatioTextInput}
      {displayPanelTypeSelectInput}
      {displayRefreshRateTextInput}
      {displayResolutionHorizontalTextInput}
      {displayResolutionVerticalTextInput}
      {displayResponseTimeTextInput}
      {displaySizeTextInput}
      {additionalTextInputs}
      {addAdditionalFieldButton}
      {imageInput}
    </Stack>
  );
}

export { Display };
