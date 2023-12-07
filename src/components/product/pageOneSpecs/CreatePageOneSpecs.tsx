import { Currency } from "../../../types";
import { ProductAvailability, WeightUnit, DimensionUnit } from "../types";

type CreatePageOneSpecsProps = {
  // brand
  brand: string;
  isBrandValid: boolean;
  isBrandFocused: boolean;
  // model
  model: string;
  isModelValid: boolean;
  isModelFocused: boolean;
  // description
  description: string;
  isDescriptionValid: boolean;
  isDescriptionFocused: boolean;
  // price
  price: string;
  isPriceValid: boolean;
  isPriceFocused: boolean;
  // currency
  currency: Currency;
  // availability
  availability: ProductAvailability;
  // quantity
  quantity: string;
  isQuantityValid: boolean;
  isQuantityFocused: boolean;
  // weight
  weight: string;
  isWeightValid: boolean;
  isWeightFocused: boolean;
  weightUnit: WeightUnit;
  // dimensions
  // length
  dimensionLength: string;
  isDimensionLengthValid: boolean;
  isDimensionLengthFocused: boolean;
  // length unit
  dimensionLengthUnit: DimensionUnit;
  // width
  dimensionWidth: string;
  isDimensionWidthValid: boolean;
  isDimensionWidthFocused: boolean;
  // width unit
  dimensionWidthUnit: DimensionUnit;
  // height
  dimensionHeight: string;
  isDimensionHeightValid: boolean;
  isDimensionHeightFocused: boolean;
  // height unit
  dimensionHeightUnit: DimensionUnit;
  // additional comments
  additionalComments: string;
  isAdditionalCommentsValid: boolean;
  isAdditionalCommentsFocused: boolean;
};

function CreatePageOneSpecs(props: CreatePageOneSpecsProps) {
  const {
    // brand
    brand,
    isBrandValid,
    isBrandFocused,
    // model
    model,
    isModelValid,
    isModelFocused,
    // description
    description,
    isDescriptionValid,
    isDescriptionFocused,
    // price
    price,
    isPriceValid,
    isPriceFocused,
    // currency
    currency,
    // availability
    availability,
    // quantity
    quantity,
    isQuantityValid,
    isQuantityFocused,
    // weight
    weight,
    isWeightValid,
    isWeightFocused,
    weightUnit,
    // dimensions
    // length
    dimensionLength,
    isDimensionLengthValid,
    isDimensionLengthFocused,
    // length unit
    dimensionLengthUnit,
    // width
    dimensionWidth,
    isDimensionWidthValid,
    isDimensionWidthFocused,
    // width unit
    dimensionWidthUnit,
    // height
    dimensionHeight,
    isDimensionHeightValid,
    isDimensionHeightFocused,
    // height unit
    dimensionHeightUnit,
    // additional comments
    additionalComments,
    isAdditionalCommentsValid,
    isAdditionalCommentsFocused,
  } = props;
}

export default CreatePageOneSpecs;
