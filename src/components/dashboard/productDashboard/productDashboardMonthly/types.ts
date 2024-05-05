import { ProductMetricsCalendarKey, ProductMetricsChartKey } from "../utils";

type ProductDashboardMonthlyState = {
  revenueBarChartYAxisVariable: ProductMetricsChartKey;
  revenueCalendarChartYAxisVariable: ProductMetricsCalendarKey;
  revenueLineChartYAxisVariable: ProductMetricsChartKey;

  unitsSoldBarChartYAxisVariable: ProductMetricsChartKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricsCalendarKey;
  unitsSoldLineChartYAxisVariable: ProductMetricsChartKey;
};

type ProductDashboardMonthlyAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueCalendarChartYAxisVariable: "setRevenueCalendarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";

  setUnitsSoldBarChartYAxisVariable: "setUnitsSoldBarChartYAxisVariable";
  setUnitsSoldCalendarChartYAxisVariable: "setUnitsSoldCalendarChartYAxisVariable";
  setUnitsSoldLineChartYAxisVariable: "setUnitsSoldLineChartYAxisVariable";
};

type ProductDashboardMonthlyDispatch =
  | {
      type:
        | ProductDashboardMonthlyAction["setRevenueBarChartYAxisVariable"]
        | ProductDashboardMonthlyAction["setRevenueLineChartYAxisVariable"]
        | ProductDashboardMonthlyAction["setUnitsSoldBarChartYAxisVariable"]
        | ProductDashboardMonthlyAction["setUnitsSoldLineChartYAxisVariable"];

      payload: ProductMetricsChartKey;
    }
  | {
      type:
        | ProductDashboardMonthlyAction["setRevenueCalendarChartYAxisVariable"]
        | ProductDashboardMonthlyAction["setUnitsSoldCalendarChartYAxisVariable"];

      payload: ProductMetricsCalendarKey;
    };

export type {
  ProductDashboardMonthlyAction,
  ProductDashboardMonthlyDispatch,
  ProductDashboardMonthlyState,
};
