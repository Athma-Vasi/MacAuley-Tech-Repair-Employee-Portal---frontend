import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from "../../../constants/regex";
import { ResourceRoutePaths } from "../../../types";
import {
  returnBrandNameValidationText,
  returnDateFullRangeValidationText,
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnSerialIdValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnWeightValidationText,
} from "../../../utils";
import { CURRENCY_DATA } from "../../benefits/constants";
import { ComponentQueryData } from "../../queryBuilder";
import {
  BRAND_REGEX,
  DIMENSION_UNIT_DATA,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_DATA,
  MOTHERBOARD_CHIPSET_REGEX,
  MOTHERBOARD_FORM_FACTOR_DATA,
  MOTHERBOARD_MEMORY_TYPE_DATA,
  MOTHERBOARD_SOCKET_REGEX,
  PRODUCT_AVAILABILITY_DATA,
  SMALL_INTEGER_REGEX,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const MOTHERBOARD_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Motherboard Socket",
    value: "motherboardSocket",
    inputKind: "textInput",
    regex: MOTHERBOARD_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Motherboard Chipset",
    value: "motherboardChipset",
    inputKind: "textInput",
    regex: MOTHERBOARD_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "Motherboard Form Factor",
    value: "motherboardFormFactor",
    inputKind: "selectInput",
    selectData: MOTHERBOARD_FORM_FACTOR_DATA,
  },
  {
    label: "Motherboard Memory Max",
    value: "motherboardMemoryMax",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Motherboard Memory Max Unit",
    value: "motherboardMemoryMaxUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Motherboard Memory Slots",
    value: "motherboardMemorySlots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard Memory Type",
    value: "motherboardMemoryType",
    inputKind: "selectInput",
    selectData: MOTHERBOARD_MEMORY_TYPE_DATA,
  },
  {
    label: "Motherboard SATA Ports",
    value: "motherboardSataPorts",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard M.2 Slots",
    value: "motherboardM2Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 3.0 Slots",
    value: "motherboardPcie3Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 4.0 Slots",
    value: "motherboardPcie4Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "Motherboard PCIe 5.0 Slots",
    value: "motherboardPcie5Slots",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
];

const MOTHERBOARD_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/motherboard",
  manager: "product-category/motherboard",
  employee: "product-category/motherboard",
};

export { MOTHERBOARD_QUERY_DATA, MOTHERBOARD_RESOURCE_ROUTE_PATHS };