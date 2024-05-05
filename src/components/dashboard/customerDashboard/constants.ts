import { SelectInputData } from "../../../types";
import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
} from "./utilsOld";

const CUSTOMER_OVERVIEW_Y_AXIS_DATA: SelectInputData = [
  { label: "Overview", value: "overview" },
  { label: "New", value: "new" },
  { label: "Returning", value: "returning" },
];

const CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA: SelectInputData = [
  { label: "Total", value: "total" },
  { label: "All", value: "all" },
  { label: "Overview", value: "overview" },
  { label: "Sales", value: "sales" },
  { label: "Online", value: "online" },
  { label: "In-Store", value: "inStore" },
  { label: "Repair", value: "repair" },
];

const CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA: SelectInputData = [
  { label: "Total", value: "total" },
  { label: "Sales", value: "sales" },
  { label: "Online", value: "online" },
  { label: "In-Store", value: "inStore" },
  { label: "Repair", value: "repair" },
];

const CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA: SelectInputData = [
  { label: "Overview", value: "overview" },
  { label: "All", value: "all" },
  { label: "Sales", value: "sales" },
];

const CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA: SelectInputData = [
  { label: "Overview", value: "overview" },
  { label: "Churn Rate", value: "churnRate" },
  { label: "Retention Rate", value: "retentionRate" },
];

export {
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
};
