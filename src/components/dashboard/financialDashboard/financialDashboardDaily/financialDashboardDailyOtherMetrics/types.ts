import { FinancialMetricsOtherMetricsChartsKey } from "../../utils";

type FinancialDashboardDailyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
  otherMetricsCalendarChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
  otherMetricsLineChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
};

type FinancialDashboardDailyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsCalendarChartYAxisVariable: "setOtherMetricsCalendarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type FinancialDashboardDailyOtherMetricsDispatch = {
  type:
    | FinancialDashboardDailyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"]
    | FinancialDashboardDailyOtherMetricsAction["setOtherMetricsCalendarChartYAxisVariable"]
    | FinancialDashboardDailyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];

  payload: FinancialMetricsOtherMetricsChartsKey;
};

export type {
  FinancialDashboardDailyOtherMetricsAction,
  FinancialDashboardDailyOtherMetricsDispatch,
  FinancialDashboardDailyOtherMetricsState,
};
