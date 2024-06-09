import { Stack } from "@mantine/core";
import { CURRENCY_DATA } from "../../constants/data";
import { Currency, StepperPage } from "../../types";
import { AccessibleSelectInput } from "../accessibleInputs/AccessibleSelectInput";
import { AccessibleTextAreaInput } from "../accessibleInputs/AccessibleTextAreaInput";
import { AccessibleTextInput } from "../accessibleInputs/text/AccessibleTextInput";
import { ProductCategory } from "../dashboard/types";
import { CreateProductAction } from "./actions";
import {
  DIMENSION_UNIT_DATA,
  PRODUCT_AVAILABILITY_DATA,
  WEIGHT_UNIT_DATA,
} from "./constants";
import { CreateProductDispatch } from "./dispatch";
import { ProductAvailability, WeightUnit, DimensionUnit } from "./types";

type ProductPageOneProps = {
  additionalComments: string;
  availability: ProductAvailability;
  brand: string;
  currency: Currency;
  description: string;
  dimensionHeight: string;
  dimensionHeightUnit: DimensionUnit;
  dimensionLength: string;
  dimensionLengthUnit: DimensionUnit;
  dimensionWidth: string;
  dimensionWidthUnit: DimensionUnit;
  model: string;
  parentAction: CreateProductAction;
  parentDispatch: React.Dispatch<CreateProductDispatch>;
  price: string;
  quantity: string;
  stepperPages: StepperPage[];
  weight: string;
  weightUnit: WeightUnit;
};

function ProductPageOne({
  additionalComments,
  availability,
  brand,
  currency,
  description,
  dimensionHeight,
  dimensionHeightUnit,
  dimensionLength,
  dimensionLengthUnit,
  dimensionWidth,
  dimensionWidthUnit,
  model,
  parentAction,
  parentDispatch,
  price,
  quantity,
  stepperPages,
  weight,
  weightUnit,
}: ProductPageOneProps) {
  const additionalCommentsTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "additionalComments",
        stepperPages,
        validValueAction: parentAction.setAdditionalComments,
        value: additionalComments,
      }}
    />
  );

  const availabilitySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: PRODUCT_AVAILABILITY_DATA,
        name: "availability",
        parentDispatch,
        validValueAction: parentAction.setAvailability,
        value: availability,
      }}
    />
  );

  const brandTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "brand",
        stepperPages,
        validValueAction: parentAction.setBrand,
        value: brand,
      }}
    />
  );

  const currencySelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: CURRENCY_DATA,
        name: "currency",
        parentDispatch,
        validValueAction: parentAction.setCurrency,
        value: currency,
      }}
    />
  );

  const descriptionTextAreaInput = (
    <AccessibleTextAreaInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "description",
        stepperPages,
        validValueAction: parentAction.setDescription,
        value: description,
      }}
    />
  );

  const dimensionHeightTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "dimensionHeight",
        stepperPages,
        validValueAction: parentAction.setDimensionHeight,
        value: dimensionHeight,
      }}
    />
  );

  const dimensionHeightUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DIMENSION_UNIT_DATA,
        name: "dimensionHeightUnit",
        parentDispatch,
        validValueAction: parentAction.setDimensionHeightUnit,
        value: dimensionHeightUnit,
      }}
    />
  );

  const dimensionLengthTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "dimensionLength",
        stepperPages,
        validValueAction: parentAction.setDimensionLength,
        value: dimensionLength,
      }}
    />
  );

  const dimensionLengthUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DIMENSION_UNIT_DATA,
        name: "dimensionLengthUnit",
        parentDispatch,
        validValueAction: parentAction.setDimensionLengthUnit,
        value: dimensionLengthUnit,
      }}
    />
  );

  const dimensionWidthTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "dimensionWidth",
        stepperPages,
        validValueAction: parentAction.setDimensionWidth,
        value: dimensionWidth,
      }}
    />
  );

  const dimensionWidthUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: DIMENSION_UNIT_DATA,
        name: "dimensionWidthUnit",
        parentDispatch,
        validValueAction: parentAction.setDimensionWidthUnit,
        value: dimensionWidthUnit,
      }}
    />
  );

  const modelTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "model",
        stepperPages,
        validValueAction: parentAction.setModel,
        value: model,
      }}
    />
  );

  const priceTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "price",
        stepperPages,
        validValueAction: parentAction.setPrice,
        value: price,
      }}
    />
  );

  const quantityTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "quantity",
        stepperPages,
        validValueAction: parentAction.setQuantity,
        value: quantity,
      }}
    />
  );

  const weightTextInput = (
    <AccessibleTextInput
      attributes={{
        invalidValueAction: parentAction.setPageInError,
        name: "weight",
        stepperPages,
        validValueAction: parentAction.setWeight,
        value: weight,
      }}
    />
  );

  const weightUnitSelectInput = (
    <AccessibleSelectInput
      attributes={{
        data: WEIGHT_UNIT_DATA,
        name: "weightUnit",
        parentDispatch,
        validValueAction: parentAction.setWeightUnit,
        value: weightUnit,
      }}
    />
  );

  return (
    <Stack>
      {modelTextInput}
      {brandTextInput}
      {descriptionTextAreaInput}
      {additionalCommentsTextAreaInput}
      {availabilitySelectInput}
      {priceTextInput}
      {currencySelectInput}
      {quantityTextInput}
      {weightTextInput}
      {weightUnitSelectInput}
      {dimensionHeightTextInput}
      {dimensionHeightUnitSelectInput}
      {dimensionLengthTextInput}
      {dimensionLengthUnitSelectInput}
      {dimensionWidthTextInput}
      {dimensionWidthUnitSelectInput}
    </Stack>
  );
}

export { ProductPageOne };
