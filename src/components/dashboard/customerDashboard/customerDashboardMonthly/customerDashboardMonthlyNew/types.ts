import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardMonthlyNewState = {
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardMonthlyNewAction = {
  setNewBarChartYAxisVariable: "setNewBarChartYAxisVariable";
  setNewCalendarChartYAxisVariable: "setNewCalendarChartYAxisVariable";
  setNewLineChartYAxisVariable: "setNewLineChartYAxisVariable";
  setNewPieChartYAxisVariable: "setNewPieChartYAxisVariable";
};

type CustomerDashboardMonthlyNewDispatch =
  | {
      type:
        | CustomerDashboardMonthlyNewAction["setNewBarChartYAxisVariable"]
        | CustomerDashboardMonthlyNewAction["setNewLineChartYAxisVariable"];
      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardMonthlyNewAction["setNewCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      type: CustomerDashboardMonthlyNewAction["setNewPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardMonthlyNewAction,
  CustomerDashboardMonthlyNewDispatch,
  CustomerDashboardMonthlyNewState,
};
