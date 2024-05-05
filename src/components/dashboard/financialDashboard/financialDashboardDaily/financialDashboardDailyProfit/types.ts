import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsCalendarChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardDailyProfitState = {
  profitBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitCalendarChartYAxisVariable: FinancialMetricsCalendarChartsKey;
  profitLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  profitPieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardDailyProfitAction = {
  setProfitBarChartYAxisVariable: "setProfitBarChartYAxisVariable";
  setProfitCalendarChartYAxisVariable: "setProfitCalendarChartYAxisVariable";
  setProfitLineChartYAxisVariable: "setProfitLineChartYAxisVariable";
  setProfitPieChartYAxisVariable: "setProfitPieChartYAxisVariable";
};

type FinancialDashboardDailyProfitDispatch =
  | {
      type:
        | FinancialDashboardDailyProfitAction["setProfitBarChartYAxisVariable"]
        | FinancialDashboardDailyProfitAction["setProfitLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardDailyProfitAction["setProfitCalendarChartYAxisVariable"];
      payload: FinancialMetricsCalendarChartsKey;
    }
  | {
      type: FinancialDashboardDailyProfitAction["setProfitPieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardDailyProfitAction,
  FinancialDashboardDailyProfitDispatch,
  FinancialDashboardDailyProfitState,
};
