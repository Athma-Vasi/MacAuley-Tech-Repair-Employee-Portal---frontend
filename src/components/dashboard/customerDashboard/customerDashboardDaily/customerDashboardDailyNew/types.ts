import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { CustomerDashboardDailyNewAction } from "./actions";

type CustomerDashboardDailyNewState = {
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
};

type CustomerDashboardDailyNewDispatch =
  | {
      action:
        | CustomerDashboardDailyNewAction["setNewBarChartYAxisVariable"]
        | CustomerDashboardDailyNewAction["setNewLineChartYAxisVariable"];
      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      action: CustomerDashboardDailyNewAction["setNewCalendarChartYAxisVariable"];
      payload: CustomerMetricsNewReturningCalendarChartsKey;
    }
  | {
      action: CustomerDashboardDailyNewAction["setNewPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type {
  CustomerDashboardDailyNewAction,
  CustomerDashboardDailyNewDispatch,
  CustomerDashboardDailyNewState,
};
