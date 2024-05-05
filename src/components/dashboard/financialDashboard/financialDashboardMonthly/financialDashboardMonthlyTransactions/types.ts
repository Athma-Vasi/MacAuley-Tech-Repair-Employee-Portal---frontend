import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardMonthlyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  transactionsLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardMonthlyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: "setTransactionsBarChartYAxisVariable";
  setTransactionsCalendarChartYAxisVariable: "setTransactionsCalendarChartYAxisVariable";
  setTransactionsLineChartYAxisVariable: "setTransactionsLineChartYAxisVariable";
  setTransactionsPieChartYAxisVariable: "setTransactionsPieChartYAxisVariable";
};

type FinancialDashboardMonthlyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction["setTransactionsBarChartYAxisVariable"]
        | FinancialDashboardMonthlyTransactionsAction["setTransactionsLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction["setTransactionsCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyTransactionsAction["setTransactionsPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardMonthlyTransactionsAction,
  FinancialDashboardMonthlyTransactionsDispatch,
  FinancialDashboardMonthlyTransactionsState,
};
