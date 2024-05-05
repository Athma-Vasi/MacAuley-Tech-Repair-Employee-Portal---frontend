import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardDailyReturningState = {
  returningBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  returningLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardDailyReturningAction = {
  setReturningBarChartYAxisVariable: "setReturningBarChartYAxisVariable";
  setReturningCalendarChartYAxisVariable: "setReturningCalendarChartYAxisVariable";
  setReturningLineChartYAxisVariable: "setReturningLineChartYAxisVariable";
  setReturningPieChartYAxisVariable: "setReturningPieChartYAxisVariable";
};

type CustomerDashboardDailyReturningDispatch =
  | {
      type:
        | CustomerDashboardDailyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardDailyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardDailyReturningAction["setReturningCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      type: CustomerDashboardDailyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardDailyReturningAction,
  CustomerDashboardDailyReturningDispatch,
  CustomerDashboardDailyReturningState,
};
