import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardDailyRevenueState = {
  revenueBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenueCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  revenueLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenuePieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardDailyRevenueAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueCalendarChartYAxisVariable: "setRevenueCalendarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";
  setRevenuePieChartYAxisVariable: "setRevenuePieChartYAxisVariable";
};

type FinancialDashboardDailyRevenueDispatch =
  | {
      type:
        | FinancialDashboardDailyRevenueAction["setRevenueBarChartYAxisVariable"]
        | FinancialDashboardDailyRevenueAction["setRevenueLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardDailyRevenueAction["setRevenueCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardDailyRevenueAction["setRevenuePieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardDailyRevenueAction,
  FinancialDashboardDailyRevenueDispatch,
  FinancialDashboardDailyRevenueState,
};
