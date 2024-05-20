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
  returnMediumIntegerValidationText,
  returnSerialIdValidationText,
  returnSocketChipsetValidationText,
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
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_DATA,
  MOBILE_CAMERA_REGEX,
  MOBILE_OS_DATA,
  PRODUCT_AVAILABILITY_DATA,
  TABLET_CHIPSET_REGEX,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const TABLET_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Tablet OS",
    value: "tabletOs",
    inputKind: "selectInput",
    selectData: MOBILE_OS_DATA,
  },
  {
    label: "Tablet Chipset",
    value: "tabletChipset",
    inputKind: "textInput",
    regex: TABLET_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Tablet Display (in)",
    value: "tabletDisplay",
    inputKind: "numberInput",
    regex: DIMENSIONS_REGEX,
    regexValidationFn: returnDimensionsValidationText,
  },
  {
    label: "Tablet Horizontal Resolution",
    value: "tabletHorizontalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet Vertical Resolution",
    value: "tabletVerticalResolution",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet RAM Capacity",
    value: "tabletRamCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet RAM Capacity Unit",
    value: "tabletRamCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Tablet Storage (GB)",
    value: "tabletStorage",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Tablet Battery (mAh)",
    value: "tabletBattery",
    inputKind: "numberInput",
    regex: LARGE_INTEGER_REGEX,
    regexValidationFn: returnLargeIntegerValidationText,
  },
  {
    label: "Tablet Camera",
    value: "tabletCamera",
    inputKind: "textInput",
    regex: MOBILE_CAMERA_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "Tablet Color",
    value: "tabletColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
];

const TABLET_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/tablet",
  manager: "product-category/tablet",
  employee: "product-category/tablet",
};

export { TABLET_QUERY_DATA, TABLET_RESOURCE_ROUTE_PATHS };
