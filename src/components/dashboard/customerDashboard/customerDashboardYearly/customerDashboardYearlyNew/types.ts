import {
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardYearlyNewState = {
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardYearlyNewAction = {
  setNewBarChartYAxisVariable: "setNewBarChartYAxisVariable";
  setNewLineChartYAxisVariable: "setNewLineChartYAxisVariable";
  setNewPieChartYAxisVariable: "setNewPieChartYAxisVariable";
};

type CustomerDashboardYearlyNewDispatch =
  | {
      type:
        | CustomerDashboardYearlyNewAction["setNewBarChartYAxisVariable"]
        | CustomerDashboardYearlyNewAction["setNewLineChartYAxisVariable"];
      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardYearlyNewAction["setNewPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardYearlyNewAction,
  CustomerDashboardYearlyNewDispatch,
  CustomerDashboardYearlyNewState,
};
