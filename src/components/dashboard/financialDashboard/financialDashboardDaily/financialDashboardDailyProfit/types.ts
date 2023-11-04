import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardDailyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  profitLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardDailyProfitAction = {
  setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable';
  setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable';
  setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable';
  setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable';
};

type FinancialDashboardDailyProfitDispatch =
  | {
      type:
        | FinancialDashboardDailyProfitAction['setProfitBarChartYAxisVariable']
        | FinancialDashboardDailyProfitAction['setProfitLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyProfitAction['setProfitCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyProfitAction['setProfitPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardDailyProfitAction,
  FinancialDashboardDailyProfitDispatch,
  FinancialDashboardDailyProfitState,
};
