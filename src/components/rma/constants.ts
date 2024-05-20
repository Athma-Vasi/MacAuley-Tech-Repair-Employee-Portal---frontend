import {
  DATE_FULL_RANGE_REGEX,
  GRAMMAR_TEXTAREA_INPUT_REGEX,
  MONEY_REGEX,
  SERIAL_ID_REGEX,
} from "../../constants/regex";
import { ResourceRoutePaths } from "../../types";
import {
  returnDateFullRangeValidationText,
  returnFloatAmountValidationText,
  returnGrammarValidationText,
  returnSerialIdValidationText,
} from "../../utils";
import { CURRENCY_DATA } from "../benefit/constants";
import { PRODUCT_CATEGORIES } from "../dashboard/constants";
import { ComponentQueryData } from "../queryBuilder";

const RMA_QUERY_DATA: ComponentQueryData[] = [
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
    label: "Product SKU",
    value: "productSku",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "Purchase Price",
    value: "purchasePrice",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "Purchase Currency",
    value: "purchaseCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "Product Category",
    value: "productCategory",
    inputKind: "selectInput",
    selectData: PRODUCT_CATEGORIES,
  },
  {
    label: "RMA Code",
    value: "rmaCode",
    inputKind: "textInput",
    regex: SERIAL_ID_REGEX,
    regexValidationFn: returnSerialIdValidationText,
  },
  {
    label: "RMA Amount",
    value: "rmaAmount",
    inputKind: "numberInput",
    regex: MONEY_REGEX,
    regexValidationFn: returnFloatAmountValidationText,
  },
  {
    label: "RMA Currency",
    value: "rmaCurrency",
    inputKind: "selectInput",
    selectData: CURRENCY_DATA,
  },
  {
    label: "RMA Reason",
    value: "rmaReason",
    inputKind: "textInput",
    regex: GRAMMAR_TEXTAREA_INPUT_REGEX,
    regexValidationFn: returnGrammarValidationText,
  },
  {
    label: "RMA Status",
    value: "rmaStatus",
    inputKind: "selectInput",
    selectData: ["Pending", "Received", "Cancelled"],
  },
];

const RMA_RESOURCE_ROUTE_PATHS: ResourceRoutePaths = {
  admin: "rma",
  manager: "rma",
  employee: "rma",
};

export { RMA_QUERY_DATA, RMA_RESOURCE_ROUTE_PATHS };
