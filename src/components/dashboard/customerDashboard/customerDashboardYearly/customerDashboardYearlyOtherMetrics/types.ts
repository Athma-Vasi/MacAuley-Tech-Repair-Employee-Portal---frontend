import { CustomerMetricsChurnRetentionChartsKey } from "../../utils";

type CustomerDashboardYearlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: CustomerMetricsChurnRetentionChartsKey;
  otherMetricsLineChartYAxisVariable: CustomerMetricsChurnRetentionChartsKey;
};

type CustomerDashboardYearlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type CustomerDashboardYearlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardYearlyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"];
      payload: CustomerMetricsChurnRetentionChartsKey;
    }
  | {
      type: CustomerDashboardYearlyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];
      payload: CustomerMetricsChurnRetentionChartsKey;
    };

export type {
  CustomerDashboardYearlyOtherMetricsAction,
  CustomerDashboardYearlyOtherMetricsDispatch,
  CustomerDashboardYearlyOtherMetricsState,
};
