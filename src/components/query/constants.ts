import { CheckboxRadioSelectData } from "../../types";
import {
  ComparisonOperator,
  GeneralSearchCase,
  LimitPerPage,
  LogicalOperator,
  SortDirection,
} from "./types";

const MAX_LINKS_AMOUNT = 11;

const COMPARISON_OPERATORS_DATA: CheckboxRadioSelectData<ComparisonOperator> = [
  { label: "equal to", value: "equal to" },
  { label: "not equal to", value: "not equal to" },
  { label: "greater than", value: "greater than" },
  { label: "greater than or equal to", value: "greater than or equal to" },
  { label: "less than", value: "less than" },
  { label: "less than or equal to", value: "less than or equal to" },
  // { label: "contains", value: "contains" },
  // { label: "does not contain", value: "does not contain" },
  // { label: "starts with", value: "starts with" },
  // { label: "ends with", value: "ends with" },
  // { label: "is empty", value: "is empty" },
  // { label: "is not empty", value: "is not empty" },
];

const IN_OPERATOR_DATA: CheckboxRadioSelectData = [{ label: "in", value: "in" }];
const BOOLEAN_OPERATOR_DATA: CheckboxRadioSelectData = [
  { label: "equal to", value: "eq" },
];

const LOGICAL_OPERATORS_DATA: CheckboxRadioSelectData<LogicalOperator> = [
  { label: "and", value: "and" },
  { label: "nor", value: "nor" },
  { label: "or", value: "or" },
];

const SORT_DIRECTION_DATA: CheckboxRadioSelectData<SortDirection> = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const QUERY_SEARCH_CASE_DATA: GeneralSearchCase[] = [
  "case-sensitive",
  "case-insensitive",
];

const LIMIT_PER_PAGE_DATA: LimitPerPage[] = ["10", "25", "50", "75"];

export {
  BOOLEAN_OPERATOR_DATA,
  COMPARISON_OPERATORS_DATA,
  IN_OPERATOR_DATA,
  LIMIT_PER_PAGE_DATA,
  LOGICAL_OPERATORS_DATA,
  MAX_LINKS_AMOUNT,
  QUERY_SEARCH_CASE_DATA,
  SORT_DIRECTION_DATA,
};
