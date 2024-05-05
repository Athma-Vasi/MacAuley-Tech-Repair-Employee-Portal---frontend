import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardMonthlyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  profitLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardMonthlyProfitAction = {
  setProfitBarChartYAxisVariable: "setProfitBarChartYAxisVariable";
  setProfitCalendarChartYAxisVariable: "setProfitCalendarChartYAxisVariable";
  setProfitLineChartYAxisVariable: "setProfitLineChartYAxisVariable";
  setProfitPieChartYAxisVariable: "setProfitPieChartYAxisVariable";
};

type FinancialDashboardMonthlyProfitDispatch =
  | {
      type:
        | FinancialDashboardMonthlyProfitAction["setProfitBarChartYAxisVariable"]
        | FinancialDashboardMonthlyProfitAction["setProfitLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardMonthlyProfitAction["setProfitCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardMonthlyProfitAction["setProfitPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardMonthlyProfitAction,
  FinancialDashboardMonthlyProfitDispatch,
  FinancialDashboardMonthlyProfitState,
};
