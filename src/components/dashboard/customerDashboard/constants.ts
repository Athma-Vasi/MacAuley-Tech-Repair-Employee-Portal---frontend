import {
  CustomerMetricsChurnRetentionChartsKey,
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
  CustomerMetricsOverviewChartsKey,
} from "./utils";

const CUSTOMER_OVERVIEW_Y_AXIS_DATA: CustomerMetricsOverviewChartsKey[] = [
  "overview",
  "new",
  "returning",
];

const CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA: CustomerMetricsNewReturningChartsKey[] =
  ["total", "all", "overview", "sales", "online", "inStore", "repair"];

const CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA: CustomerMetricsNewReturningCalendarChartsKey[] =
  ["total", "sales", "online", "inStore", "repair"];

const CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA: CustomerMetricsNewReturningPieChartsKey[] =
  ["overview", "all", "sales"];

const CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA: CustomerMetricsChurnRetentionChartsKey[] = [
  "overview",
  "churnRate",
  "retentionRate",
];

export {
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
};
