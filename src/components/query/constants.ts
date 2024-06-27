import { CheckboxRadioSelectData } from "../../types";
import {
  ComparisonOperator,
  LogicalOperator,
  GeneralSearchCase,
  SortDirection,
} from "./types";

const MAX_LINKS_AMOUNT = 11;

const COMPARISON_OPERATORS_DATA: CheckboxRadioSelectData<ComparisonOperator> = [
  { label: "equal to", value: "$eq" },
  { label: "not equal to", value: "$ne" },
  { label: "greater than", value: "$gt" },
  { label: "greater than or equal to", value: "$gte" },
  { label: "less than", value: "$lt" },
  { label: "less than or equal to", value: "$lte" },
  //   { label: "contains", value: "contains" },
  //   { label: "does not contain", value: "does not contain" },
  //   { label: "starts with", value: "starts with" },
  //   { label: "ends with", value: "ends with" },
  //   { label: "is empty", value: "is empty" },
  //   { label: "is not empty", value: "is not empty" },
];

const IN_OPERATOR_DATA: CheckboxRadioSelectData = [{ label: "In", value: "$in" }];
const BOOLEAN_OPERATOR_DATA: CheckboxRadioSelectData = [
  { label: "Equal to", value: "$eq" },
];

const LOGICAL_OPERATORS_DATA: CheckboxRadioSelectData<LogicalOperator> = [
  { label: "And", value: "$and" },
  { label: "Nor", value: "$nor" },
  { label: "Not", value: "$not" },
  { label: "Or", value: "$or" },
];

const SORT_DIRECTION_DATA: CheckboxRadioSelectData<SortDirection> = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const QUERY_SEARCH_CASE_DATA: GeneralSearchCase[] = [
  "case-sensitive",
  "case-insensitive",
];

export {
  BOOLEAN_OPERATOR_DATA,
  COMPARISON_OPERATORS_DATA,
  IN_OPERATOR_DATA,
  LOGICAL_OPERATORS_DATA,
  MAX_LINKS_AMOUNT,
  QUERY_SEARCH_CASE_DATA,
  SORT_DIRECTION_DATA,
};
