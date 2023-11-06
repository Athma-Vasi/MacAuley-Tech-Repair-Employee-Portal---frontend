import { RepairMetricChartsObjKey } from '../utils';

type RepairDashboardDailyState = {
  barChartYAxisVariable: RepairMetricChartsObjKey;
  calendarChartYAxisVariable: RepairMetricChartsObjKey;
  lineChartYAxisVariable: RepairMetricChartsObjKey;
};

type RepairDashboardDailyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable';
  setCalendarChartYAxisVariable: 'setCalendarChartYAxisVariable';
  setLineChartYAxisVariable: 'setLineChartYAxisVariable';
};

type RepairDashboardDailyDispatch = {
  type:
    | RepairDashboardDailyAction['setBarChartYAxisVariable']
    | RepairDashboardDailyAction['setLineChartYAxisVariable']
    | RepairDashboardDailyAction['setCalendarChartYAxisVariable'];

  payload: RepairMetricChartsObjKey;
};

export type {
  RepairDashboardDailyAction,
  RepairDashboardDailyDispatch,
  RepairDashboardDailyState,
};
