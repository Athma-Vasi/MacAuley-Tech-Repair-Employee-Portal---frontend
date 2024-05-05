import { CustomerChurnRetentionObjKey } from "../../utilsOld";

type CustomerDashboardYearlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: CustomerChurnRetentionObjKey;
  otherMetricsLineChartYAxisVariable: CustomerChurnRetentionObjKey;
};

type CustomerDashboardYearlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type CustomerDashboardYearlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardYearlyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"];
      payload: CustomerChurnRetentionObjKey;
    }
  | {
      type: CustomerDashboardYearlyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardYearlyOtherMetricsAction,
  CustomerDashboardYearlyOtherMetricsDispatch,
  CustomerDashboardYearlyOtherMetricsState,
};
