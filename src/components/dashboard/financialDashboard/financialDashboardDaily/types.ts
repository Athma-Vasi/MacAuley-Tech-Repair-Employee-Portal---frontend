import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialOtherMetricsObjKey,
} from '../utils';

type FinancialDashboardDailyState = {
  // profit
  // profit -> bar
  profitBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  // profit -> calendar
  profitCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  // profit -> line
  profitLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  // profit -> pie
  profitPieChartYAxisVariable: FinancialMetricPieObjKey;

  // revenue
  // revenue -> bar
  revenueBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  // revenue -> calendar
  revenueCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  // revenue -> line
  revenueLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  // revenue -> pie
  revenuePieChartYAxisVariable: FinancialMetricPieObjKey;

  // expenses
  // expenses -> bar
  expensesBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  // expenses -> calendar
  expensesCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  // expenses -> line
  expensesLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  // expenses -> pie
  expensesPieChartYAxisVariable: FinancialMetricPieObjKey;

  // transactions
  // transactions -> bar
  transactionsBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  // transactions -> calendar
  transactionsCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  // transactions -> line
  transactionsLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  // transactions -> pie
  transactionsPieChartYAxisVariable: FinancialMetricPieObjKey;

  // other metrics
  // other metrics -> bar
  otherMetricsBarChartYAxisVariable: FinancialOtherMetricsObjKey;
  // other metrics -> calendar
  otherMetricsCalendarChartYAxisVariable: FinancialOtherMetricsObjKey;
  // other metrics -> line
  otherMetricsLineChartYAxisVariable: FinancialOtherMetricsObjKey;
};

type FinancialDashboardDailyAction = {
  // profit
  setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable';
  setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable';
  setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable';
  setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable';

  // revenue
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable';
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable';
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable';
  setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable';

  // expenses
  setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable';
  setExpensesCalendarChartYAxisVariable: 'setExpensesCalendarChartYAxisVariable';
  setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable';
  setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable';

  // transactions
  setTransactionsBarChartYAxisVariable: 'setTransactionsBarChartYAxisVariable';
  setTransactionsCalendarChartYAxisVariable: 'setTransactionsCalendarChartYAxisVariable';
  setTransactionsLineChartYAxisVariable: 'setTransactionsLineChartYAxisVariable';
  setTransactionsPieChartYAxisVariable: 'setTransactionsPieChartYAxisVariable';

  // other metrics
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable';
  setOtherMetricsCalendarChartYAxisVariable: 'setOtherMetricsCalendarChartYAxisVariable';
  setOtherMetricsLineChartYAxisVariable: 'setOtherMetricsLineChartYAxisVariable';
};

type FinancialDashboardDailyDispatch =
  | {
      type:
        | FinancialDashboardDailyAction['setProfitBarChartYAxisVariable']
        | FinancialDashboardDailyAction['setProfitLineChartYAxisVariable']
        | FinancialDashboardDailyAction['setRevenueBarChartYAxisVariable']
        | FinancialDashboardDailyAction['setRevenueLineChartYAxisVariable']
        | FinancialDashboardDailyAction['setExpensesBarChartYAxisVariable']
        | FinancialDashboardDailyAction['setExpensesLineChartYAxisVariable']
        | FinancialDashboardDailyAction['setTransactionsBarChartYAxisVariable']
        | FinancialDashboardDailyAction['setTransactionsLineChartYAxisVariable'];

      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyAction['setProfitCalendarChartYAxisVariable']
        | FinancialDashboardDailyAction['setRevenueCalendarChartYAxisVariable']
        | FinancialDashboardDailyAction['setExpensesCalendarChartYAxisVariable']
        | FinancialDashboardDailyAction['setTransactionsCalendarChartYAxisVariable'];

      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyAction['setProfitPieChartYAxisVariable']
        | FinancialDashboardDailyAction['setRevenuePieChartYAxisVariable']
        | FinancialDashboardDailyAction['setExpensesPieChartYAxisVariable']
        | FinancialDashboardDailyAction['setTransactionsPieChartYAxisVariable'];

      payload: FinancialMetricPieObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyAction['setOtherMetricsBarChartYAxisVariable']
        | FinancialDashboardDailyAction['setOtherMetricsCalendarChartYAxisVariable']
        | FinancialDashboardDailyAction['setOtherMetricsLineChartYAxisVariable'];

      payload: FinancialOtherMetricsObjKey;
    };

export type {
  FinancialDashboardDailyAction,
  FinancialDashboardDailyDispatch,
  FinancialDashboardDailyState,
};
