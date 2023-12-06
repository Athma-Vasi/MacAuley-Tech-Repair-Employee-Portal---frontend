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
  returnSerialIdValidationText,
  returnWeightValidationText,
} from "../../../utils";
import { CURRENCY_DATA } from "../../benefits/constants";
import { ComponentQueryData } from "../../queryBuilder";
import {
  BRAND_REGEX,
  DIMENSION_UNIT_DATA,
  DIMENSIONS_REGEX,
  KEYBOARD_BACKLIGHT_DATA,
  KEYBOARD_LAYOUT_DATA,
  KEYBOARD_SWITCH_DATA,
  LARGE_INTEGER_REGEX,
  PERIPHERALS_INTERFACE_DATA,
  PRODUCT_AVAILABILITY_DATA,
  WEIGHT_REGEX,
  WEIGHT_UNIT_DATA,
} from "../constants";

const KEYBOARD_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Keyboard Switch",
    value: "keyboardSwitch",
    inputKind: "selectInput",
    selectData: KEYBOARD_SWITCH_DATA,
  },
  {
    label: "Keyboard Layout",
    value: "keyboardLayout",
    inputKind: "selectInput",
    selectData: KEYBOARD_LAYOUT_DATA,
  },
  {
    label: "Keyboard Backlight",
    value: "keyboardBacklight",
    inputKind: "selectInput",
    selectData: KEYBOARD_BACKLIGHT_DATA,
  },
  {
    label: "Keyboard Interface",
    value: "keyboardInterface",
    inputKind: "selectInput",
    selectData: PERIPHERALS_INTERFACE_DATA,
  },
];

const KEYBOARD_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "product-category/keyboard",
  manager: "product-category/keyboard",
  employee: "product-category/keyboard",
};

export { KEYBOARD_QUERY_DATA, KEYBOARD_RESOURCE_ROUTE_PATHS };
