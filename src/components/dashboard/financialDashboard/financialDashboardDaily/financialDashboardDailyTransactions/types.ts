import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardDailyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  transactionsLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardDailyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: "setTransactionsBarChartYAxisVariable";
  setTransactionsCalendarChartYAxisVariable: "setTransactionsCalendarChartYAxisVariable";
  setTransactionsLineChartYAxisVariable: "setTransactionsLineChartYAxisVariable";
  setTransactionsPieChartYAxisVariable: "setTransactionsPieChartYAxisVariable";
};

type FinancialDashboardDailyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardDailyTransactionsAction["setTransactionsBarChartYAxisVariable"]
        | FinancialDashboardDailyTransactionsAction["setTransactionsLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardDailyTransactionsAction["setTransactionsCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type:
        | FinancialDashboardDailyTransactionsAction["setTransactionsPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardDailyTransactionsAction,
  FinancialDashboardDailyTransactionsDispatch,
  FinancialDashboardDailyTransactionsState,
};
