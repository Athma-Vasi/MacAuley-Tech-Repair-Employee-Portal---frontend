import { CustomerMetricsOverviewChartsKey } from "../utils";
import { CustomerMetricsOverviewAction } from "./actions";

type CustomerMetricsOverviewState = {
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewCalendarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerMetricsOverviewDispatch = {
  action:
    | CustomerMetricsOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerMetricsOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerMetricsOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerMetricsOverviewChartsKey;
};

export type { CustomerMetricsOverviewDispatch, CustomerMetricsOverviewState };
