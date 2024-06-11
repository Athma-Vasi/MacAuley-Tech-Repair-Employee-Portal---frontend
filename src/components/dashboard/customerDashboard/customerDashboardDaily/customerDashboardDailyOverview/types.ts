import { CustomerMetricsOverviewChartsKey } from "../../utils";
import { CustomerDashboardDailyOverviewAction } from "./actions";

type CustomerDashboardDailyOverviewState = {
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewCalendarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerDashboardDailyOverviewDispatch = {
  action:
    | CustomerDashboardDailyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerMetricsOverviewChartsKey;
};

export type {
  CustomerDashboardDailyOverviewDispatch,
  CustomerDashboardDailyOverviewState,
};
