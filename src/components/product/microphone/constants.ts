import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from "../../../constants/regex";
import { ResourceRoutePaths } from "../../../types";
import {
  returnBrandNameValidationText,
  returnColorVariantValidationText,
  returnDateFullRangeValidationText,
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnFrequencyResponseValidationText,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnSerialIdValidationText,
  returnWeightValidationText,
} from "../../../utils";
import { CURRENCY_DATA } from "../../benefit/constants";
import { ComponentQueryData } from "../../queryBuilder";
import {
  BRAND_REGEX,
  COLOR_VARIANT_REGEX,
  DIMENSION_UNIT_DATA,
  DIMENSIONS_REGEX,
  FREQUENCY_RESPONSE_REGEX,
  LARGE_INTEGER_REGEX,
  MICROPHONE_INTERFACE_DATA,
  MICROPHONE_POLAR_PATTERN_DATA,
  MICROPHONE_TYPE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const MICROPHONE_QUERY_DATA: ComponentQueryData[] = [
  {
    label: "Created Date",
    value: "createdAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Updated Date",
    value: "updatedAt",
    inputKind: "dateInput",
    regex: DATE_FULL_RANGE_REGEX,
    regexValidationFn: returnDateFullRangeValidationText,
  },
  {
    label: "Brand",
    value: "brand",
    inputKind: "textInput",
    regex: BRAND_REGEX,
    regexValidationFn: returnBrandNameValidationText,
  },
  {
    label: "Model",
    value: "model",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Price",
    value: "price",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Description",
    value: "description",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Currency",
    value: "currency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Availability",
    value: "availability",
    inputKind: "selectInput",
    selectData: PRODUCT_AVAILABILITY_DATA,
  },
  {
    label: "Quantity",
    value: "quantity",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Weight",
    value: "weight",
    inputKind: "numberInput",
    regex: WEIGHT_REGEX,
    regexValidationFn: returnWeightValidationText,
  },
  {
    label: "Weight Unit",
    value: "weightUnit",
    inputKind: "selectInput",
    selectData: WEIGHT_UNIT_DATA,
  },
  {
    label: "Length",
    value: "length",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Length Unit",
    value: "lengthUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Width",
    value: "width",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Width Unit",
    value: "widthUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Height",
    value: "height",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Height Unit",
    value: "heightUnit",
    inputKind: "selectInput",
    selectData: DIMENSION_UNIT_DATA,
  },
  {
    label: "Additional Details",
    value: "additionalDetails",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "Microphone Type",
    value: "microphoneType",
    inputKind: "selectInput",
    selectData: MICROPHONE_TYPE_DATA,
  },
  {
    label: "Microphone Polar Pattern",
    value: "microphonePolarPattern",
    inputKind: "selectInput",
    selectData: MICROPHONE_POLAR_PATTERN_DATA,
  },
  {
    label: "Microphone Frequency Response",
    value: "microphoneFrequencyResponse",
    inputKind: "textInput",
    regex: FREQUENCY_RESPONSE_REGEX,
    regexValidationFn: returnFrequencyResponseValidationText,
  },
  {
    label: "Microphone Color",
    value: "microphoneColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Microphone Interface",
    value: "microphoneInterface",
    inputKind: "selectInput",
    selectData: MICROPHONE_INTERFACE_DATA,
  },
];

const MICROPHONE_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/microphone",
  manager: "product-category/microphone",
  employee: "product-category/microphone",
};

export { MICROPHONE_QUERY_DATA, MICROPHONE_RESOURCE_ROUTE_PATHS };
