import { RepairMetricChartsKey } from "../utils";

type RepairDashboardDailyState = {
  barChartYAxisVariable: RepairMetricChartsKey;
  calendarChartYAxisVariable: RepairMetricChartsKey;
  lineChartYAxisVariable: RepairMetricChartsKey;
};

type RepairDashboardDailyAction = {
  setBarChartYAxisVariable: "setBarChartYAxisVariable";
  setCalendarChartYAxisVariable: "setCalendarChartYAxisVariable";
  setLineChartYAxisVariable: "setLineChartYAxisVariable";
};

type RepairDashboardDailyDispatch = {
  type:
    | RepairDashboardDailyAction["setBarChartYAxisVariable"]
    | RepairDashboardDailyAction["setLineChartYAxisVariable"]
    | RepairDashboardDailyAction["setCalendarChartYAxisVariable"];

  payload: RepairMetricChartsKey;
};

export type {
  RepairDashboardDailyAction,
  RepairDashboardDailyDispatch,
  RepairDashboardDailyState,
};
