import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardMonthlyReturningState = {
  returningBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  returningLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardMonthlyReturningAction = {
  setReturningBarChartYAxisVariable: "setReturningBarChartYAxisVariable";
  setReturningCalendarChartYAxisVariable: "setReturningCalendarChartYAxisVariable";
  setReturningLineChartYAxisVariable: "setReturningLineChartYAxisVariable";
  setReturningPieChartYAxisVariable: "setReturningPieChartYAxisVariable";
};

type CustomerDashboardMonthlyReturningDispatch =
  | {
      type:
        | CustomerDashboardMonthlyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardMonthlyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardMonthlyReturningAction["setReturningCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      type: CustomerDashboardMonthlyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardMonthlyReturningAction,
  CustomerDashboardMonthlyReturningDispatch,
  CustomerDashboardMonthlyReturningState,
};
