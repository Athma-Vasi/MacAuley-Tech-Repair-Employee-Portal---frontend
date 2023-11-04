import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardYearlyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardYearlyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: 'setTransactionsBarChartYAxisVariable';
  setTransactionsLineChartYAxisVariable: 'setTransactionsLineChartYAxisVariable';
  setTransactionsPieChartYAxisVariable: 'setTransactionsPieChartYAxisVariable';
};

type FinancialDashboardYearlyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardYearlyTransactionsAction['setTransactionsBarChartYAxisVariable']
        | FinancialDashboardYearlyTransactionsAction['setTransactionsLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardYearlyTransactionsAction['setTransactionsPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardYearlyTransactionsAction,
  FinancialDashboardYearlyTransactionsDispatch,
  FinancialDashboardYearlyTransactionsState,
};
