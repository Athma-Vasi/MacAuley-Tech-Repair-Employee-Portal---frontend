import {
  FinancialMetricsBarLineChartsKey,
  FinancialMetricsPieChartsKey,
} from "../../utils";

type FinancialDashboardYearlyRevenueState = {
  revenueBarChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenueLineChartYAxisVariable: FinancialMetricsBarLineChartsKey;
  revenuePieChartYAxisVariable: FinancialMetricsPieChartsKey;
};

type FinancialDashboardYearlyRevenueAction = {
  setRevenueBarChartYAxisVariable: "setRevenueBarChartYAxisVariable";
  setRevenueLineChartYAxisVariable: "setRevenueLineChartYAxisVariable";
  setRevenuePieChartYAxisVariable: "setRevenuePieChartYAxisVariable";
};

type FinancialDashboardYearlyRevenueDispatch =
  | {
      type:
        | FinancialDashboardYearlyRevenueAction["setRevenueBarChartYAxisVariable"]
        | FinancialDashboardYearlyRevenueAction["setRevenueLineChartYAxisVariable"];
      payload: FinancialMetricsBarLineChartsKey;
    }
  | {
      type: FinancialDashboardYearlyRevenueAction["setRevenuePieChartYAxisVariable"];
      payload: FinancialMetricsPieChartsKey;
    };

export type {
  FinancialDashboardYearlyRevenueAction,
  FinancialDashboardYearlyRevenueDispatch,
  FinancialDashboardYearlyRevenueState,
};
