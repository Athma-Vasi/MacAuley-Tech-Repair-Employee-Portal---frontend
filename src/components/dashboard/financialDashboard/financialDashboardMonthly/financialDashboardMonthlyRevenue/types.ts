import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardMonthlyRevenueState = {
  revenueBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenueCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  revenueLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenuePieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardMonthlyRevenueAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';
  setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable';
};

type FinancialDashboardMonthlyRevenueDispatch =
  | {
      type:
        | FinancialDashboardMonthlyRevenueAction['setRevenueBarChartYAxisVariable']
        | FinancialDashboardMonthlyRevenueAction['setRevenueLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyRevenueAction['setRevenueCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyRevenueAction['setRevenuePieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardMonthlyRevenueAction,
  FinancialDashboardMonthlyRevenueDispatch,
  FinancialDashboardMonthlyRevenueState,
};
