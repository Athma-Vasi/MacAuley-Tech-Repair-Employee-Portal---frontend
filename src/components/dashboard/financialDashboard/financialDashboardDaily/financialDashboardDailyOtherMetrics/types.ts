import { FinancialOtherMetricsObjKey } from '../../utils';

type FinancialDashboardDailyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialOtherMetricsObjKey;
  otherMetricsCalendarChartYAxisVariable: FinancialOtherMetricsObjKey;
  otherMetricsLineChartYAxisVariable: FinancialOtherMetricsObjKey;
};

type FinancialDashboardDailyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable';
  setOtherMetricsCalendarChartYAxisVariable: 'setOtherMetricsCalendarChartYAxisVariable';
  setOtherMetricsLineChartYAxisVariable: 'setOtherMetricsLineChartYAxisVariable';
};

type FinancialDashboardDailyOtherMetricsDispatch = {
  type:
    | FinancialDashboardDailyOtherMetricsAction['setOtherMetricsBarChartYAxisVariable']
    | FinancialDashboardDailyOtherMetricsAction['setOtherMetricsCalendarChartYAxisVariable']
    | FinancialDashboardDailyOtherMetricsAction['setOtherMetricsLineChartYAxisVariable'];

  payload: FinancialOtherMetricsObjKey;
};

export type {
  FinancialDashboardDailyOtherMetricsAction,
  FinancialDashboardDailyOtherMetricsDispatch,
  FinancialDashboardDailyOtherMetricsState,
};
