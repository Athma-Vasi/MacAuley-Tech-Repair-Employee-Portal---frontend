import { RepairMetricChartsKey } from "../utils";

type RepairDashboardMonthlyState = {
  barChartYAxisVariable: RepairMetricChartsKey;
  calendarChartYAxisVariable: RepairMetricChartsKey;
  lineChartYAxisVariable: RepairMetricChartsKey;
};

type RepairDashboardMonthlyAction = {
  setBarChartYAxisVariable: "setBarChartYAxisVariable";
  setCalendarChartYAxisVariable: "setCalendarChartYAxisVariable";
  setLineChartYAxisVariable: "setLineChartYAxisVariable";
};

type RepairDashboardMonthlyDispatch = {
  type:
    | RepairDashboardMonthlyAction["setBarChartYAxisVariable"]
    | RepairDashboardMonthlyAction["setLineChartYAxisVariable"]
    | RepairDashboardMonthlyAction["setCalendarChartYAxisVariable"];

  payload: RepairMetricChartsKey;
};

export type {
  RepairDashboardMonthlyAction,
  RepairDashboardMonthlyDispatch,
  RepairDashboardMonthlyState,
};
