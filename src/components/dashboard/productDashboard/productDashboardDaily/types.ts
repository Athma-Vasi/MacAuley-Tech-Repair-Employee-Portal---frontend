import { ProductMetricChartKey, ProductMetricCalendarObjKey } from "../utilsOld";

type ProductDashboardDailyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricChartKey;
  revenueCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  revenueLineChartYAxisVariable: ProductMetricChartKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricChartKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  unitsSoldLineChartYAxisVariable: ProductMetricChartKey;
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

      payload: ProductMetricChartKey;
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
