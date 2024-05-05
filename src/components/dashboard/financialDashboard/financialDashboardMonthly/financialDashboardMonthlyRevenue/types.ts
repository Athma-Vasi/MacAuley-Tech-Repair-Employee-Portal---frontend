import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardMonthlyRevenueState = {
  revenueBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenueCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  revenueLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenuePieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardMonthlyRevenueAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueCalendarChartYAxisVariable: "setRevenueCalendarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";
  setRevenuePieChartYAxisVariable: "setRevenuePieChartYAxisVariable";
};

type FinancialDashboardMonthlyRevenueDispatch =
  | {
      type:
        | FinancialDashboardMonthlyRevenueAction["setRevenueBarChartYAxisVariable"]
        | FinancialDashboardMonthlyRevenueAction["setRevenueLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type:
        | FinancialDashboardMonthlyRevenueAction["setRevenueCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardMonthlyRevenueAction["setRevenuePieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardMonthlyRevenueAction,
  FinancialDashboardMonthlyRevenueDispatch,
  FinancialDashboardMonthlyRevenueState,
};
