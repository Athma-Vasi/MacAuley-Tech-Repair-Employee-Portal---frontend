import {
  ProductMetricBarLineChartObjKey,
  ProductMetricCalendarObjKey,
} from '../utils';

type ProductDashboardMonthlyState = {
  // revenue
  barChartYAxisVariable: ProductMetricBarLineChartObjKey;
  revenueCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  revenueLineChartYAxisVariable: ProductMetricBarLineChartObjKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricBarLineChartObjKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  unitsSoldLineChartYAxisVariable: ProductMetricBarLineChartObjKey;
};

type ProductDashboardMonthlyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable';
  setUnitsSoldCalendarChartYAxisVariable: 'setUnitsSoldCalendarChartYAxisVariable';
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable';
};

type ProductDashboardMonthlyDispatch =
  | {
      type:
        | ProductDashboardMonthlyAction['setRevenueBarChartYAxisVariable']
        | ProductDashboardMonthlyAction['setRevenueLineChartYAxisVariable']
        | ProductDashboardMonthlyAction['setUnitsSoldBarChartYAxisVariable']
        | ProductDashboardMonthlyAction['setUnitsSoldLineChartYAxisVariable'];

      payload: ProductMetricBarLineChartObjKey;
    }
  | {
      type:
        | ProductDashboardMonthlyAction['setRevenueCalendarChartYAxisVariable']
        | ProductDashboardMonthlyAction['setUnitsSoldCalendarChartYAxisVariable'];

      payload: ProductMetricCalendarObjKey;
    };

export type {
  ProductDashboardMonthlyAction,
  ProductDashboardMonthlyDispatch,
  ProductDashboardMonthlyState,
};
