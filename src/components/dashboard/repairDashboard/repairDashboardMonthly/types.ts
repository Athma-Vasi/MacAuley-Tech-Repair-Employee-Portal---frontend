import { RepairMetricChartsObjKey } from '../utils';

type RepairDashboardMonthlyState = {
  barChartYAxisVariable: RepairMetricChartsObjKey;
  calendarChartYAxisVariable: RepairMetricChartsObjKey;
  lineChartYAxisVariable: RepairMetricChartsObjKey;
};

type RepairDashboardMonthlyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable';
  setCalendarChartYAxisVariable: 'setCalendarChartYAxisVariable';
  setLineChartYAxisVariable: 'setLineChartYAxisVariable';
};

type RepairDashboardMonthlyDispatch = {
  type:
    | RepairDashboardMonthlyAction['setBarChartYAxisVariable']
    | RepairDashboardMonthlyAction['setLineChartYAxisVariable']
    | RepairDashboardMonthlyAction['setCalendarChartYAxisVariable'];

  payload: RepairMetricChartsObjKey;
};

export type {
  RepairDashboardMonthlyAction,
  RepairDashboardMonthlyDispatch,
  RepairDashboardMonthlyState,
};
