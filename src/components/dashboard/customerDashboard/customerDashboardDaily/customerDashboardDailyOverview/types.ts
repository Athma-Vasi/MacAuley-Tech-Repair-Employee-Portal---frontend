import { CustomerMetricsOverviewChartsKey } from "../../utils";

type CustomerDashboardDailyOverviewState = {
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewCalendarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerDashboardDailyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewCalendarChartYAxisVariable: "setOverviewCalendarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardDailyOverviewDispatch = {
  type:
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
