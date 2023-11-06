import { RepairMetricChartsObjKey } from '../utils';

type RepairDashboardYearlyState = {
  barChartYAxisVariable: RepairMetricChartsObjKey;
  lineChartYAxisVariable: RepairMetricChartsObjKey;
};

type RepairDashboardYearlyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable';
  setLineChartYAxisVariable: 'setLineChartYAxisVariable';
};

type RepairDashboardYearlyDispatch = {
  type:
    | RepairDashboardYearlyAction['setBarChartYAxisVariable']
    | RepairDashboardYearlyAction['setLineChartYAxisVariable'];

  payload: RepairMetricChartsObjKey;
};

export type {
  RepairDashboardYearlyAction,
  RepairDashboardYearlyDispatch,
  RepairDashboardYearlyState,
};
