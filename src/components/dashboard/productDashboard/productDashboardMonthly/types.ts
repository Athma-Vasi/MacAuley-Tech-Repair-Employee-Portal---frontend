import { ProductMetricChartKey, ProductMetricCalendarObjKey } from "../utilsOld";

type ProductDashboardMonthlyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricChartKey;
  revenueCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  revenueLineChartYAxisVariable: ProductMetricChartKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricChartKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  unitsSoldLineChartYAxisVariable: ProductMetricChartKey;
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

      payload: ProductMetricChartKey;
    }
  | {
      type:
        | ProductDashboardMonthlyAction["setRevenueCalendarChartYAxisVariable"]
        | ProductDashboardMonthlyAction["setUnitsSoldCalendarChartYAxisVariable"];

      payload: ProductMetricCalendarObjKey;
    };

export type {
  ProductDashboardMonthlyAction,
  ProductDashboardMonthlyDispatch,
  ProductDashboardMonthlyState,
};
