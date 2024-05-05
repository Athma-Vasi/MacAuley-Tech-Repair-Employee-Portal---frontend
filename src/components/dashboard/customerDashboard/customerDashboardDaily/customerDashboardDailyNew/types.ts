import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardDailyNewState = {
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardDailyNewAction = {
  setNewBarChartYAxisVariable: "setNewBarChartYAxisVariable";
  setNewCalendarChartYAxisVariable: "setNewCalendarChartYAxisVariable";
  setNewLineChartYAxisVariable: "setNewLineChartYAxisVariable";
  setNewPieChartYAxisVariable: "setNewPieChartYAxisVariable";
};

type CustomerDashboardDailyNewDispatch =
  | {
      type:
        | CustomerDashboardDailyNewAction["setNewBarChartYAxisVariable"]
        | CustomerDashboardDailyNewAction["setNewLineChartYAxisVariable"];
      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardDailyNewAction["setNewCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      type: CustomerDashboardDailyNewAction["setNewPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardDailyNewAction,
  CustomerDashboardDailyNewDispatch,
  CustomerDashboardDailyNewState,
};
