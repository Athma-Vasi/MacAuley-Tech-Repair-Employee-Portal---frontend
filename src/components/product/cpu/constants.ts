import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from "../../../constants/regex";
import { ResourceRoutePaths } from "../../../types";
import {
  returnBrandNameValidationText,
  returnCpuFrequencyValidationText,
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
import { CURRENCY_DATA } from "../../benefit/constants";
import { ComponentQueryData } from "../../queryBuilder";
import {
  BRAND_REGEX,
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  DIMENSION_UNIT_DATA,
  DIMENSIONS_REGEX,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_DATA,
  PRODUCT_AVAILABILITY_DATA,
  SMALL_INTEGER_REGEX,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const CPU_QUERY_DATA: ComponentQueryData[] = [
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
  // page 1
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
    label: "CPU Socket",
    value: "cpuSocket",
    inputKind: "textInput",
    regex: CPU_SOCKET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "CPU Frequency (GHz)",
    value: "cpuFrequency",
    inputKind: "numberInput",
    regex: CPU_FREQUENCY_REGEX,
    regexValidationFn: returnCpuFrequencyValidationText,
  },
  {
    label: "CPU Cores",
    value: "cpuCores",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "CPU L1 Cache",
    value: "cpuL1Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L1 Cache Unit",
    value: "cpuL1CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "CPU L2 Cache",
    value: "cpuL2Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L2 Cache Unit",
    value: "cpuL2CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "CPU L3 Cache",
    value: "cpuL3Cache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "CPU L3 Cache Unit",
    value: "cpuL3CacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
];

const CPU_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/cpu",
  manager: "product-category/cpu",
  employee: "product-category/cpu",
};

export { CPU_QUERY_DATA, CPU_RESOURCE_ROUTE_PATHS };
