import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardDailyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  expensesLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardDailyExpensesAction = {
  setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable';
  setExpensesCalendarChartYAxisVariable: 'setExpensesCalendarChartYAxisVariable';
  setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable';
  setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable';
};

type FinancialDashboardDailyExpensesDispatch =
  | {
      type:
        | FinancialDashboardDailyExpensesAction['setExpensesBarChartYAxisVariable']
        | FinancialDashboardDailyExpensesAction['setExpensesLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyExpensesAction['setExpensesCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardDailyExpensesAction['setExpensesPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardDailyExpensesAction,
  FinancialDashboardDailyExpensesDispatch,
  FinancialDashboardDailyExpensesState,
};
