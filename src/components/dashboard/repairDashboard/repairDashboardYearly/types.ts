import { RepairMetricChartsKey } from "../utils";

type RepairDashboardYearlyState = {
  barChartYAxisVariable: RepairMetricChartsKey;
  lineChartYAxisVariable: RepairMetricChartsKey;
};

type RepairDashboardYearlyAction = {
  setBarChartYAxisVariable: "setBarChartYAxisVariable";
  setLineChartYAxisVariable: "setLineChartYAxisVariable";
};

type RepairDashboardYearlyDispatch = {
  type:
    | RepairDashboardYearlyAction["setBarChartYAxisVariable"]
    | RepairDashboardYearlyAction["setLineChartYAxisVariable"];

  payload: RepairMetricChartsKey;
};

export type {
  RepairDashboardYearlyAction,
  RepairDashboardYearlyDispatch,
  RepairDashboardYearlyState,
};
