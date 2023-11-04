import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardYearlyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  profitPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardYearlyProfitAction = {
  setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable';
  setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable';
  setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable';
};

type FinancialDashboardYearlyProfitDispatch =
  | {
      type:
        | FinancialDashboardYearlyProfitAction['setProfitBarChartYAxisVariable']
        | FinancialDashboardYearlyProfitAction['setProfitLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardYearlyProfitAction['setProfitPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardYearlyProfitAction,
  FinancialDashboardYearlyProfitDispatch,
  FinancialDashboardYearlyProfitState,
};
