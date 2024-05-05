import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardDailyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  expensesLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardDailyExpensesAction = {
  setExpensesBarChartYAxisVariable: "setExpensesBarChartYAxisVariable";
  setExpensesCalendarChartYAxisVariable: "setExpensesCalendarChartYAxisVariable";
  setExpensesLineChartYAxisVariable: "setExpensesLineChartYAxisVariable";
  setExpensesPieChartYAxisVariable: "setExpensesPieChartYAxisVariable";
};

type FinancialDashboardDailyExpensesDispatch =
  | {
      type:
        | FinancialDashboardDailyExpensesAction["setExpensesBarChartYAxisVariable"]
        | FinancialDashboardDailyExpensesAction["setExpensesLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardDailyExpensesAction["setExpensesCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardDailyExpensesAction["setExpensesPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardDailyExpensesAction,
  FinancialDashboardDailyExpensesDispatch,
  FinancialDashboardDailyExpensesState,
};
