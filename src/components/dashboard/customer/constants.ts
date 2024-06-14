import {
  CustomerMetricsChurnRetentionChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "./chartsData";
import { CustomerMetricsCategory } from "./types";

const CUSTOMER_METRICS_CATEGORY_DATA: CustomerMetricsCategory[] = [
  "new",
  "returning",
  "churn",
];

const CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA: CustomerMetricsNewReturningChartsKey[] =
  ["total", "all", "overview", "sales", "online", "inStore", "repair"];

const CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA: CustomerMetricsNewReturningPieChartsKey[] =
  ["overview", "all", "sales"];

const CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA: CustomerMetricsChurnRetentionChartsKey[] = [
  "overview",
  "churnRate",
  "retentionRate",
];

export {
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_METRICS_CATEGORY_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
};
