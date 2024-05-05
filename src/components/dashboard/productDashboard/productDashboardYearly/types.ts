import { ProductMetricsChartKey } from "../utils";

type ProductDashboardYearlyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricsChartKey;
  revenueLineChartYAxisVariable: ProductMetricsChartKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricsChartKey;
  unitsSoldLineChartYAxisVariable: ProductMetricsChartKey;
};

type ProductDashboardYearlyAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";

  setUnitsSoldBarChartYAxisVariable: "setUnitsSoldBarChartYAxisVariable";
  setUnitsSoldLineChartYAxisVariable: "setUnitsSoldLineChartYAxisVariable";
};

type ProductDashboardYearlyDispatch = {
  type:
    | ProductDashboardYearlyAction["setRevenueBarChartYAxisVariable"]
    | ProductDashboardYearlyAction["setRevenueLineChartYAxisVariable"]
    | ProductDashboardYearlyAction["setUnitsSoldBarChartYAxisVariable"]
    | ProductDashboardYearlyAction["setUnitsSoldLineChartYAxisVariable"];

  payload: ProductMetricsChartKey;
};

export type {
  ProductDashboardYearlyAction,
  ProductDashboardYearlyDispatch,
  ProductDashboardYearlyState,
};
