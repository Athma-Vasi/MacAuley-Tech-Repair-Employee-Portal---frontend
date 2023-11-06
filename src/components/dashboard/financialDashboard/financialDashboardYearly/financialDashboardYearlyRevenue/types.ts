import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardYearlyRevenueState = {
  barChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenueLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenuePieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardYearlyRevenueAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';
  setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable';
};

type FinancialDashboardYearlyRevenueDispatch =
  | {
      type:
        | FinancialDashboardYearlyRevenueAction['setRevenueBarChartYAxisVariable']
        | FinancialDashboardYearlyRevenueAction['setRevenueLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardYearlyRevenueAction['setRevenuePieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardYearlyRevenueAction,
  FinancialDashboardYearlyRevenueDispatch,
  FinancialDashboardYearlyRevenueState,
};
