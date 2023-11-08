import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardDailyRevenueState = {
  revenueBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenueCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  revenueLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  revenuePieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardDailyRevenueAction = {
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';
  setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable';
};

type FinancialDashboardDailyRevenueDispatch =
  | {
      type:
        | FinancialDashboardDailyRevenueAction['setRevenueBarChartYAxisVariable']
        | FinancialDashboardDailyRevenueAction['setRevenueLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyRevenueAction['setRevenueCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyRevenueAction['setRevenuePieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardDailyRevenueAction,
  FinancialDashboardDailyRevenueDispatch,
  FinancialDashboardDailyRevenueState,
};
