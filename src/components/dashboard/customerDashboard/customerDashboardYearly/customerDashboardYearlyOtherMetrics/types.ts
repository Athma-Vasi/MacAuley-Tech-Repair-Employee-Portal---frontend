import { CustomerChurnRetentionObjKey } from '../../utils';

type CustomerDashboardYearlyOtherMetricsState = {
  churnRetentionBarChartYAxisVariable: CustomerChurnRetentionObjKey;
  churnRetentionLineChartYAxisVariable: CustomerChurnRetentionObjKey;
};

type CustomerDashboardYearlyOtherMetricsAction = {
  setChurnRetentionBarChartYAxisVariable: 'setChurnRetentionBarChartYAxisVariable';
  setChurnRetentionLineChartYAxisVariable: 'setChurnRetentionLineChartYAxisVariable';
};

type CustomerDashboardYearlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardYearlyOtherMetricsAction['setChurnRetentionBarChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    }
  | {
      type: CustomerDashboardYearlyOtherMetricsAction['setChurnRetentionLineChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardYearlyOtherMetricsAction,
  CustomerDashboardYearlyOtherMetricsDispatch,
  CustomerDashboardYearlyOtherMetricsState,
};
