import { ProductMetricBarLineChartObjKey } from '../utils';

type ProductDashboardYearlyState = {
  // revenue
  revenueBarChartYAxisVariable: ProductMetricBarLineChartObjKey;
  revenueLineChartYAxisVariable: ProductMetricBarLineChartObjKey;

  // units sold
  unitsSoldBarChartYAxisVariable: ProductMetricBarLineChartObjKey;
  unitsSoldLineChartYAxisVariable: ProductMetricBarLineChartObjKey;
};

type ProductDashboardYearlyAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';

  setUnitsSoldBarChartYAxisVariable: 'setUnitsSoldBarChartYAxisVariable';
  setUnitsSoldLineChartYAxisVariable: 'setUnitsSoldLineChartYAxisVariable';
};

type ProductDashboardYearlyDispatch = {
  type:
    | ProductDashboardYearlyAction['setRevenueBarChartYAxisVariable']
    | ProductDashboardYearlyAction['setRevenueLineChartYAxisVariable']
    | ProductDashboardYearlyAction['setUnitsSoldBarChartYAxisVariable']
    | ProductDashboardYearlyAction['setUnitsSoldLineChartYAxisVariable'];

  payload: ProductMetricBarLineChartObjKey;
};

export type {
  ProductDashboardYearlyAction,
  ProductDashboardYearlyDispatch,
  ProductDashboardYearlyState,
};
