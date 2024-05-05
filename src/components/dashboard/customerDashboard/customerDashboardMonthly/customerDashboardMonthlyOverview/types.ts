import { CustomerMetricsOverviewChartsKey } from "../../utils";

type CustomerDashboardMonthlyOverviewState = {
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewCalendarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerDashboardMonthlyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewCalendarChartYAxisVariable: "setOverviewCalendarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardMonthlyOverviewDispatch = {
  type:
    | CustomerDashboardMonthlyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardMonthlyOverviewAction["setOverviewCalendarChartYAxisVariable"]
    | CustomerDashboardMonthlyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerMetricsOverviewChartsKey;
};

export type {
  CustomerDashboardMonthlyOverviewAction,
  CustomerDashboardMonthlyOverviewDispatch,
  CustomerDashboardMonthlyOverviewState,
};
