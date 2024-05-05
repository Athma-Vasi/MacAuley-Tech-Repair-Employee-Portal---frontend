import { ProductMetricsCalendarKey, ProductMetricsChartKey } from "../utils";

type ProductDashboardDailyState = {
  revenueBarChartYAxisVariable: ProductMetricsChartKey;
  revenueCalendarChartYAxisVariable: ProductMetricsCalendarKey;
  revenueLineChartYAxisVariable: ProductMetricsChartKey;

  unitsSoldBarChartYAxisVariable: ProductMetricsChartKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricsCalendarKey;
  unitsSoldLineChartYAxisVariable: ProductMetricsChartKey;
};

type ProductDashboardDailyAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueCalendarChartYAxisVariable: "setRevenueCalendarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";

  setUnitsSoldBarChartYAxisVariable: "setUnitsSoldBarChartYAxisVariable";
  setUnitsSoldCalendarChartYAxisVariable: "setUnitsSoldCalendarChartYAxisVariable";
  setUnitsSoldLineChartYAxisVariable: "setUnitsSoldLineChartYAxisVariable";
};

type ProductDashboardDailyDispatch =
  | {
      type:
        | ProductDashboardDailyAction["setRevenueBarChartYAxisVariable"]
        | ProductDashboardDailyAction["setRevenueLineChartYAxisVariable"]
        | ProductDashboardDailyAction["setUnitsSoldBarChartYAxisVariable"]
        | ProductDashboardDailyAction["setUnitsSoldLineChartYAxisVariable"];

      payload: ProductMetricsChartKey;
    }
  | {
      type:
        | ProductDashboardDailyAction["setRevenueCalendarChartYAxisVariable"]
        | ProductDashboardDailyAction["setUnitsSoldCalendarChartYAxisVariable"];

      payload: ProductMetricsCalendarKey;
    };

export type {
  ProductDashboardDailyAction,
  ProductDashboardDailyDispatch,
  ProductDashboardDailyState,
};
