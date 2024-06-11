import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { CustomerDashboardDailyReturningAction } from "./actions";

type CustomerDashboardDailyReturningState = {
  returningPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
  returningLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  returningCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  returningBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
};

type CustomerDashboardDailyReturningDispatch =
  | {
      action:
        | CustomerDashboardDailyReturningAction["setReturningBarChartYAxisVariable"]
        | CustomerDashboardDailyReturningAction["setReturningLineChartYAxisVariable"];

      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      action: CustomerDashboardDailyReturningAction["setReturningCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      action: CustomerDashboardDailyReturningAction["setReturningPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardDailyReturningDispatch,
  CustomerDashboardDailyReturningState,
};
