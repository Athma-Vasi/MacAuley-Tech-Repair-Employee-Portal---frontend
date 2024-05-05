import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardYearlyExpensesState = {
  expensesBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  expensesPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardYearlyExpensesAction = {
  setExpensesBarChartYAxisVariable: "setExpensesBarChartYAxisVariable";
  setExpensesLineChartYAxisVariable: "setExpensesLineChartYAxisVariable";
  setExpensesPieChartYAxisVariable: "setExpensesPieChartYAxisVariable";
};

type FinancialDashboardYearlyExpensesDispatch =
  | {
      type:
        | FinancialDashboardYearlyExpensesAction["setExpensesBarChartYAxisVariable"]
        | FinancialDashboardYearlyExpensesAction["setExpensesLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardYearlyExpensesAction["setExpensesPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardYearlyExpensesAction,
  FinancialDashboardYearlyExpensesDispatch,
  FinancialDashboardYearlyExpensesState,
};
