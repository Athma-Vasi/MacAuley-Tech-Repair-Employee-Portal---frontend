import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardYearlyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardYearlyProfitAction = {
  setProfitBarChartYAxisVariable: "setProfitBarChartYAxisVariable";
  setProfitLineChartYAxisVariable: "setProfitLineChartYAxisVariable";
  setProfitPieChartYAxisVariable: "setProfitPieChartYAxisVariable";
};

type FinancialDashboardYearlyProfitDispatch =
  | {
      type:
        | FinancialDashboardYearlyProfitAction["setProfitBarChartYAxisVariable"]
        | FinancialDashboardYearlyProfitAction["setProfitLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardYearlyProfitAction["setProfitPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardYearlyProfitAction,
  FinancialDashboardYearlyProfitDispatch,
  FinancialDashboardYearlyProfitState,
};
