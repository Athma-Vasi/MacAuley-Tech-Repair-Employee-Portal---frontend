import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardYearlyTransactionsState = {
  transactionsBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  transactionsPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardYearlyTransactionsAction = {
  setTransactionsBarChartYAxisVariable: "setTransactionsBarChartYAxisVariable";
  setTransactionsLineChartYAxisVariable: "setTransactionsLineChartYAxisVariable";
  setTransactionsPieChartYAxisVariable: "setTransactionsPieChartYAxisVariable";
};

type FinancialDashboardYearlyTransactionsDispatch =
  | {
      type:
        | FinancialDashboardYearlyTransactionsAction["setTransactionsBarChartYAxisVariable"]
        | FinancialDashboardYearlyTransactionsAction["setTransactionsLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardYearlyTransactionsAction["setTransactionsPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardYearlyTransactionsAction,
  FinancialDashboardYearlyTransactionsDispatch,
  FinancialDashboardYearlyTransactionsState,
};
