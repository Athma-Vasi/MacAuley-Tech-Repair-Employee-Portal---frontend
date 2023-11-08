import { CustomerChurnRetentionObjKey } from '../../utils';

type CustomerDashboardMonthlyOtherMetricsState = {
  churnRetentionBarChartYAxisVariable: CustomerChurnRetentionObjKey;
  churnRetentionLineChartYAxisVariable: CustomerChurnRetentionObjKey;
};

type CustomerDashboardMonthlyOtherMetricsAction = {
  setChurnRetentionBarChartYAxisVariable: 'setChurnRetentionBarChartYAxisVariable';
  setChurnRetentionLineChartYAxisVariable: 'setChurnRetentionLineChartYAxisVariable';
};

type CustomerDashboardMonthlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction['setChurnRetentionBarChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    }
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction['setChurnRetentionLineChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardMonthlyOtherMetricsAction,
  CustomerDashboardMonthlyOtherMetricsDispatch,
  CustomerDashboardMonthlyOtherMetricsState,
};
