import {
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";

type CustomerDashboardYearlyReturningState = {
  returningBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerDashboardYearlyReturningAction = {
  setReturningBarChartYAxisVariable: "setReturningBarChartYAxisVariable";
  setReturningLineChartYAxisVariable: "setReturningLineChartYAxisVariable";
  setReturningPieChartYAxisVariable: "setReturningPieChartYAxisVariable";
};

type CustomerDashboardYearlyReturningDispatch =
  | {
      type:
        | CustomerDashboardYearlyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardYearlyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      type: CustomerDashboardYearlyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardYearlyReturningAction,
  CustomerDashboardYearlyReturningDispatch,
  CustomerDashboardYearlyReturningState,
};
