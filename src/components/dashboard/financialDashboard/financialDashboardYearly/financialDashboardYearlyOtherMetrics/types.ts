import { FinancialOtherMetricsObjKey } from '../../utils';

type FinancialDashboardYearlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: FinancialOtherMetricsObjKey;
  otherMetricsLineChartYAxisVariable: FinancialOtherMetricsObjKey;
};

type FinancialDashboardYearlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable';
  setOtherMetricsLineChartYAxisVariable: 'setOtherMetricsLineChartYAxisVariable';
};

type FinancialDashboardYearlyOtherMetricsDispatch = {
  type:
    | FinancialDashboardYearlyOtherMetricsAction['setOtherMetricsBarChartYAxisVariable']
    | FinancialDashboardYearlyOtherMetricsAction['setOtherMetricsLineChartYAxisVariable'];

  payload: FinancialOtherMetricsObjKey;
};

export type {
  FinancialDashboardYearlyOtherMetricsAction,
  FinancialDashboardYearlyOtherMetricsDispatch,
  FinancialDashboardYearlyOtherMetricsState,
};
