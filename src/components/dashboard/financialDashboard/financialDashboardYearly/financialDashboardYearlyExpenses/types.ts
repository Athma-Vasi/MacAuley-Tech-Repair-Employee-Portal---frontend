import {
  FinancialMetricBarLineObjKey,
  FinancialMetricPieObjKey,
} from '../../utils';

type FinancialDashboardYearlyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesLineChartYAxisVariable: FinancialMetricBarLineObjKey;
  expensesPieChartYAxisVariable: FinancialMetricPieObjKey;
};

type FinancialDashboardYearlyExpensesAction = {
  setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable';
  setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable';
  setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable';
};

type FinancialDashboardYearlyExpensesDispatch =
  | {
      type:
        | FinancialDashboardYearlyExpensesAction['setExpensesBarChartYAxisVariable']
        | FinancialDashboardYearlyExpensesAction['setExpensesLineChartYAxisVariable'];
      payload: FinancialMetricBarLineObjKey;
    }
  | {
      type:
        | FinancialDashboardYearlyExpensesAction['setExpensesPieChartYAxisVariable'];
      payload: FinancialMetricPieObjKey;
    };

export type {
  FinancialDashboardYearlyExpensesAction,
  FinancialDashboardYearlyExpensesDispatch,
  FinancialDashboardYearlyExpensesState,
};
