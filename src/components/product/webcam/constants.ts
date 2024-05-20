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
  LARGE_INTEGER_REGEX,
  PRODUCT_AVAILABILITY_DATA,
  WEBCAM_FRAME_RATE_DATA,
  WEBCAM_INTERFACE_DATA,
  WEBCAM_MICROPHONE_DATA,
  WEBCAM_RESOLUTION_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const WEBCAM_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Webcam Resolution",
    value: "webcamResolution",
    inputKind: "selectInput",
    selectData: WEBCAM_RESOLUTION_DATA,
  },
  {
    label: "Webcam Color",
    value: "webcamColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Webcam Interface",
    value: "webcamInterface",
    inputKind: "selectInput",
    selectData: WEBCAM_INTERFACE_DATA,
  },
  {
    label: "Webcam Microphone",
    value: "webcamMicrophone",
    inputKind: "selectInput",
    selectData: WEBCAM_MICROPHONE_DATA,
  },
  {
    label: "Webcam Frame Rate",
    value: "webcamFrameRate",
    inputKind: "selectInput",
    selectData: WEBCAM_FRAME_RATE_DATA,
  },
];

const WEBCAM_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/webcam",
  manager: "product-category/webcam",
  employee: "product-category/webcam",
};

export { WEBCAM_QUERY_DATA, WEBCAM_RESOURCE_ROUTE_PATHS };
