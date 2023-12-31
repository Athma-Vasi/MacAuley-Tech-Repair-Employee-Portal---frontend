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
  returnCpuFrequencyValidationText,
  returnDateFullRangeValidationText,
  returnDimensionsValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnLargeIntegerValidationText,
  returnMediumIntegerValidationText,
  returnRamTimingValidationText,
  returnRamVoltageValidationText,
  returnSerialIdValidationText,
  returnSmallIntegerValidationText,
  returnSocketChipsetValidationText,
  returnWeightValidationText,
} from "../../../utils";
import { CURRENCY_DATA } from "../../benefits/constants";
import { ComponentQueryData } from "../../queryBuilder";
import {
  BRAND_REGEX,
  COLOR_VARIANT_REGEX,
  CPU_FREQUENCY_REGEX,
  CPU_SOCKET_REGEX,
  DIMENSION_UNIT_DATA,
  DIMENSIONS_REGEX,
  GPU_CHIPSET_REGEX,
  LARGE_INTEGER_REGEX,
  MEDIUM_INTEGER_REGEX,
  MEMORY_UNIT_DATA,
  PRODUCT_AVAILABILITY_DATA,
  RAM_MEMORY_TYPE_DATA,
  RAM_TIMING_REGEX,
  RAM_VOLTAGE_REGEX,
  SMALL_INTEGER_REGEX,
  STORAGE_FORM_FACTOR_DATA,
  STORAGE_INTERFACE_DATA,
  STORAGE_TYPE_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const LAPTOP_QUERY_DATA: ComponentQueryData[] = [
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
  // cpu
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
  // gpu
  {
    label: "GPU Chipset",
    value: "cpuChipset",
    inputKind: "textInput",
    regex: GPU_CHIPSET_REGEX,
    regexValidationFn: returnSocketChipsetValidationText,
  },
  {
    label: "GPU Memory (GB)",
    value: "gpuMemory",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "GPU Core Clock (MHz)",
    value: "gpuCoreClock",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "GPU Boost Clock (MHz)",
    value: "gpuBoostClock",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "GPU TDP (W)",
    value: "gpuTdp",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  // ram
  {
    label: "RAM Data Rate (MT/s)",
    value: "ramDataRate",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "RAM Modules Quantity",
    value: "ramModulesQuantity",
    inputKind: "numberInput",
    regex: SMALL_INTEGER_REGEX,
    regexValidationFn: returnSmallIntegerValidationText,
  },
  {
    label: "RAM Modules Capacity",
    value: "ramModulesCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "RAM Modules Capacity Unit",
    value: "ramModulesCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "RAM Memory Type",
    value: "ramMemoryType",
    inputKind: "selectInput",
    selectData: RAM_MEMORY_TYPE_DATA,
  },
  {
    label: "RAM Color",
    value: "ramColor",
    inputKind: "textInput",
    regex: COLOR_VARIANT_REGEX,
    regexValidationFn: returnColorVariantValidationText,
  },
  {
    label: "RAM Voltage (V)",
    value: "ramVoltage",
    inputKind: "numberInput",
    regex: RAM_VOLTAGE_REGEX,
    regexValidationFn: returnRamVoltageValidationText,
  },
  {
    label: "RAM Timing",
    value: "ramTiming",
    inputKind: "textInput",
    regex: RAM_TIMING_REGEX,
    regexValidationFn: returnRamTimingValidationText,
  },
  // storage

  {
    label: "Storage Type",
    value: "storageType",
    inputKind: "selectInput",
    selectData: STORAGE_TYPE_DATA,
  },
  {
    label: "Storage Capacity",
    value: "storageCapacity",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Storage Capacity Unit",
    value: "storageCapacityUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Storage Cache",
    value: "storageCache",
    inputKind: "numberInput",
    regex: MEDIUM_INTEGER_REGEX,
    regexValidationFn: returnMediumIntegerValidationText,
  },
  {
    label: "Storage Cache Unit",
    value: "storageCacheUnit",
    inputKind: "selectInput",
    selectData: MEMORY_UNIT_DATA,
  },
  {
    label: "Storage Form Factor",
    value: "storageFormFactor",
    inputKind: "selectInput",
    selectData: STORAGE_FORM_FACTOR_DATA,
  },
  {
    label: "Storage Interface",
    value: "storageInterface",
    inputKind: "selectInput",
    selectData: STORAGE_INTERFACE_DATA,
  },
];

const LAPTOP_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/laptop",
  manager: "product-category/laptop",
  employee: "product-category/laptop",
};

export { LAPTOP_QUERY_DATA, LAPTOP_RESOURCE_ROUTE_PATHS };
