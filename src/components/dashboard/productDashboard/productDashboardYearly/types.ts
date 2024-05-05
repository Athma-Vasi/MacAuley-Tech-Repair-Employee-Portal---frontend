import { ProductMetricChartKey } from "../utils";

type ProductDashboardYearlyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricChartKey;
  revenueLineChartYAxisVariable: ProductMetricChartKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricChartKey;
  unitsSoldLineChartYAxisVariable: ProductMetricChartKey;
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

  payload: ProductMetricChartKey;
};

export type {
  ProductDashboardYearlyAction,
  ProductDashboardYearlyDispatch,
  ProductDashboardYearlyState,
};
