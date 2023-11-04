import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardMonthlyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  profitLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardMonthlyProfitAction = {
  setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable';
  setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable';
  setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable';
  setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable';
};

type FinancialDashboardMonthlyProfitDispatch =
  | {
      type:
        | FinancialDashboardMonthlyProfitAction['setProfitBarChartYAxisVariable']
        | FinancialDashboardMonthlyProfitAction['setProfitLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyProfitAction['setProfitCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyProfitAction['setProfitPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardMonthlyProfitAction,
  FinancialDashboardMonthlyProfitDispatch,
  FinancialDashboardMonthlyProfitState,
};
