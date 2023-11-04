import {
  FinancialMetricBarLineObjKey,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardMonthlyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesCalendarChartYAxisVariable: FinancialMetricCalendarObjKey;
  expensesLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardMonthlyExpensesAction = {
  setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable';
  setExpensesCalendarChartYAxisVariable: 'setExpensesCalendarChartYAxisVariable';
  setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable';
  setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable';
};

type FinancialDashboardMonthlyExpensesDispatch =
  | {
      type:
        | FinancialDashboardMonthlyExpensesAction['setExpensesBarChartYAxisVariable']
        | FinancialDashboardMonthlyExpensesAction['setExpensesLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyExpensesAction['setExpensesCalendarChartYAxisVariable'];
      payload: FinancialMetricCalendarObjKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyExpensesAction['setExpensesPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardMonthlyExpensesAction,
  FinancialDashboardMonthlyExpensesDispatch,
  FinancialDashboardMonthlyExpensesState,
};
