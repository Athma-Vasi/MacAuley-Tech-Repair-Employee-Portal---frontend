import { CustomerMetricsChurnRetentionChartsKey } from "../../utils";

type CustomerDashboardMonthlyOtherMetricsState = {
  otherMetricsBarChartYAxisVariable: CustomerMetricsChurnRetentionChartsKey;
  otherMetricsLineChartYAxisVariable: CustomerMetricsChurnRetentionChartsKey;
};

type CustomerDashboardMonthlyOtherMetricsAction = {
  setOtherMetricsBarChartYAxisVariable: "setOtherMetricsBarChartYAxisVariable";
  setOtherMetricsLineChartYAxisVariable: "setOtherMetricsLineChartYAxisVariable";
};

type CustomerDashboardMonthlyOtherMetricsDispatch =
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction["setOtherMetricsBarChartYAxisVariable"];
      payload: CustomerMetricsChurnRetentionChartsKey;
    }
  | {
      type: CustomerDashboardMonthlyOtherMetricsAction["setOtherMetricsLineChartYAxisVariable"];
      payload: CustomerMetricsChurnRetentionChartsKey;
    };

export type {
  CustomerDashboardMonthlyOtherMetricsAction,
  CustomerDashboardMonthlyOtherMetricsDispatch,
  CustomerDashboardMonthlyOtherMetricsState,
};
