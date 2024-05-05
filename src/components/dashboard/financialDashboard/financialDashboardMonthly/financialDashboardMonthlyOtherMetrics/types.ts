import { FinancialMetricsOtherMetricsChartsKey } from "../../utils";

type FinancialDashboardMonthlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
  otherMetricsCalendarChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
  otherMetricsLineChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
};

type FinancialDashboardMonthlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsCalendarChartYAxisVariable: "setOtherMetricsCalendarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type FinancialDashboardMonthlyOtherMetricsDispatch = {
  type:
    | FinancialDashboardMonthlyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"]
    | FinancialDashboardMonthlyOtherMetricsAction["setOtherMetricsCalendarChartYAxisVariable"]
    | FinancialDashboardMonthlyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];

  payload: FinancialMetricsOtherMetricsChartsKey;
};

export type {
  FinancialDashboardMonthlyOtherMetricsAction,
  FinancialDashboardMonthlyOtherMetricsDispatch,
  FinancialDashboardMonthlyOtherMetricsState,
};
