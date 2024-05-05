import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardMonthlyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  expensesLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardMonthlyExpensesAction = {
  setExpensesBarChartYAxisVariable: "setExpensesBarChartYAxisVariable";
  setExpensesCalendarChartYAxisVariable: "setExpensesCalendarChartYAxisVariable";
  setExpensesLineChartYAxisVariable: "setExpensesLineChartYAxisVariable";
  setExpensesPieChartYAxisVariable: "setExpensesPieChartYAxisVariable";
};

type FinancialDashboardMonthlyExpensesDispatch =
  | {
      type:
        | FinancialDashboardMonthlyExpensesAction["setExpensesBarChartYAxisVariable"]
        | FinancialDashboardMonthlyExpensesAction["setExpensesLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyExpensesAction["setExpensesCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardMonthlyExpensesAction["setExpensesPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardMonthlyExpensesAction,
  FinancialDashboardMonthlyExpensesDispatch,
  FinancialDashboardMonthlyExpensesState,
};
