import { CustomerMetricsOverviewChartsKey } from "../../utils";

type CustomerDashboardYearlyOverviewState = {
  overviewBarChartYAxisVariable: CustomerMetricsOverviewChartsKey;
  overviewLineChartYAxisVariable: CustomerMetricsOverviewChartsKey;
};

type CustomerDashboardYearlyOverviewAction = {
  setOverviewBarChartYAxisVariable: "setOverviewBarChartYAxisVariable";
  setOverviewLineChartYAxisVariable: "setOverviewLineChartYAxisVariable";
};

type CustomerDashboardYearlyOverviewDispatch = {
  type:
    | CustomerDashboardYearlyOverviewAction["setOverviewBarChartYAxisVariable"]
    | CustomerDashboardYearlyOverviewAction["setOverviewLineChartYAxisVariable"];
  payload: CustomerMetricsOverviewChartsKey;
};

export type {
  CustomerDashboardYearlyOverviewAction,
  CustomerDashboardYearlyOverviewDispatch,
  CustomerDashboardYearlyOverviewState,
};
