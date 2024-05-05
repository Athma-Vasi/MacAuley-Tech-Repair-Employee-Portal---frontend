import { ProductMetricsChartKey, ProductMetricCalendarObjKey } from "../utilsOld";

type ProductDashboardDailyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricsChartKey;
  revenueCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  revenueLineChartYAxisVariable: ProductMetricsChartKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricsChartKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
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

      payload: ProductMetricCalendarObjKey;
    };

export type {
  ProductDashboardDailyAction,
  ProductDashboardDailyDispatch,
  ProductDashboardDailyState,
};
