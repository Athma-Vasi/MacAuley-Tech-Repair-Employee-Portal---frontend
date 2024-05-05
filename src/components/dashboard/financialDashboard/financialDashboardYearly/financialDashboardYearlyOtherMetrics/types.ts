import { FinancialMetricsOtherMetricsChartsKey } from "../../utils";

type FinancialDashboardYearlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
  otherMetricsLineChartYAxisVariable: FinancialMetricsOtherMetricsChartsKey;
};

type FinancialDashboardYearlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type FinancialDashboardYearlyOtherMetricsDispatch = {
  type:
    | FinancialDashboardYearlyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"]
    | FinancialDashboardYearlyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];

  payload: FinancialMetricsOtherMetricsChartsKey;
};

export type {
  FinancialDashboardYearlyOtherMetricsAction,
  FinancialDashboardYearlyOtherMetricsDispatch,
  FinancialDashboardYearlyOtherMetricsState,
};
