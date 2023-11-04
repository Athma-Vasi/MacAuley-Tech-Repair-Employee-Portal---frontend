import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardMonthlyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  transactionsLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardMonthlyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: 'setTransactionsBarChartYAxisVariable';
  setTransactionsCalendarChartYAxisVariable: 'setTransactionsCalendarChartYAxisVariable';
  setTransactionsLineChartYAxisVariable: 'setTransactionsLineChartYAxisVariable';
  setTransactionsPieChartYAxisVariable: 'setTransactionsPieChartYAxisVariable';
};

type FinancialDashboardMonthlyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction['setTransactionsBarChartYAxisVariable']
        | FinancialDashboardMonthlyTransactionsAction['setTransactionsLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction['setTransactionsCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction['setTransactionsPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardMonthlyTransactionsAction,
  FinancialDashboardMonthlyTransactionsDispatch,
  FinancialDashboardMonthlyTransactionsState,
};
