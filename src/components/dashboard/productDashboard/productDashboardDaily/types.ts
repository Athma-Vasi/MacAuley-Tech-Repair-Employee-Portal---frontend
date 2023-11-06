import {
  ProductMetricBarLineChartObjKey,
  ProductMetricCalendarObjKey,
} from '../utils';

type ProductDashboardDailyState = {
  // revenue
  barChartYAxisVariable: ProductMetricBarLineChartObjKey;
  revenueCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  revenueLineChartYAxisVariable: ProductMetricBarLineChartObjKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricBarLineChartObjKey;
  unitsSoldCalendarChartYAxisVariable: ProductMetricCalendarObjKey;
  unitsSoldLineChartYAxisVariable: ProductMetricBarLineChartObjKey;
};

type ProductDashboardDailyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable';
  setUnitsSoldCalendarChartYAxisVariable: 'setUnitsSoldCalendarChartYAxisVariable';
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable';
};

type ProductDashboardDailyDispatch =
  | {
      type:
        | ProductDashboardDailyAction['setRevenueBarChartYAxisVariable']
        | ProductDashboardDailyAction['setRevenueLineChartYAxisVariable']
        | ProductDashboardDailyAction['setUnitsSoldBarChartYAxisVariable']
        | ProductDashboardDailyAction['setUnitsSoldLineChartYAxisVariable'];

      payload: ProductMetricBarLineChartObjKey;
    }
  | {
      type:
        | ProductDashboardDailyAction['setRevenueCalendarChartYAxisVariable']
        | ProductDashboardDailyAction['setUnitsSoldCalendarChartYAxisVariable'];

      payload: ProductMetricCalendarObjKey;
    };

export type {
  ProductDashboardDailyAction,
  ProductDashboardDailyDispatch,
  ProductDashboardDailyState,
};
