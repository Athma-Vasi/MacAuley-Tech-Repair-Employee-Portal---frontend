import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardDailyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  transactionsLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  transactionsPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardDailyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: 'setTransactionsBarChartYAxisVariable';
  setTransactionsCalendarChartYAxisVariable: 'setTransactionsCalendarChartYAxisVariable';
  setTransactionsLineChartYAxisVariable: 'setTransactionsLineChartYAxisVariable';
  setTransactionsPieChartYAxisVariable: 'setTransactionsPieChartYAxisVariable';
};

type FinancialDashboardDailyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardDailyTransactionsAction['setTransactionsBarChartYAxisVariable']
        | FinancialDashboardDailyTransactionsAction['setTransactionsLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyTransactionsAction['setTransactionsCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyTransactionsAction['setTransactionsPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardDailyTransactionsAction,
  FinancialDashboardDailyTransactionsDispatch,
  FinancialDashboardDailyTransactionsState,
};
