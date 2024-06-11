import { CustomerMetricsOverviewChartsKey } from "../../utils";
import { CustomerDashboardDailyOverviewAction } from "./actions";

type CustomerDashboardDailyOverviewState = {
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewCalendarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerDashboardDailyOverviewDispatch = {
  action:
    | CustomerDashboardDailyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerDashboardDailyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerMetricsOverviewChartsKey;
};

export type {
  CustomerDashboardDailyOverviewAction,
  CustomerDashboardDailyOverviewDispatch,
  CustomerDashboardDailyOverviewState,
};
