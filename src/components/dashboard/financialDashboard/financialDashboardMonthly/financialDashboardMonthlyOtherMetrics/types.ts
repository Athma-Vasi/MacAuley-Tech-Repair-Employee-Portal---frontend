import { FinancialOtherMetricsObjKey } from '../../utils';

type FinancialDashboardMonthlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialOtherMetricsObjKey;
  otherMetricsCalendarChartYAxisVariable: FinancialOtherMetricsObjKey;
  otherMetricsLineChartYAxisVariable: FinancialOtherMetricsObjKey;
};

type FinancialDashboardMonthlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable';
  setOtherMetricsCalendarChartYAxisVariable: 'setOtherMetricsCalendarChartYAxisVariable';
  setOtherMetricsLineChartYAxisVariable: 'setOtherMetricsLineChartYAxisVariable';
};

type FinancialDashboardMonthlyOtherMetricsDispatch = {
  type:
    | FinancialDashboardMonthlyOtherMetricsAction['setOtherMetricsBarChartYAxisVariable']
    | FinancialDashboardMonthlyOtherMetricsAction['setOtherMetricsCalendarChartYAxisVariable']
    | FinancialDashboardMonthlyOtherMetricsAction['setOtherMetricsLineChartYAxisVariable'];

  payload: FinancialOtherMetricsObjKey;
};

export type {
  FinancialDashboardMonthlyOtherMetricsAction,
  FinancialDashboardMonthlyOtherMetricsDispatch,
  FinancialDashboardMonthlyOtherMetricsState,
};
