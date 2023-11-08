import { CustomerChurnRetentionObjKey } from '../../utils';

type CustomerDashboardMonthlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: CustomerChurnRetentionObjKey;
  otherMetricsLineChartYAxisVariable: CustomerChurnRetentionObjKey;
};

type CustomerDashboardMonthlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable';
  setOtherMetricsLineChartYAxisVariable: 'setOtherMetricsLineChartYAxisVariable';
};

type CustomerDashboardMonthlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction['setOtherMetricsBarChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    }
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction['setOtherMetricsLineChartYAxisVariable'];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardMonthlyOtherMetricsAction,
  CustomerDashboardMonthlyOtherMetricsDispatch,
  CustomerDashboardMonthlyOtherMetricsState,
};
