import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { CustomerDashboardDailyNewAction } from "./actions";

type CustomerDashboardDailyNewState = {
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newCalendarChartYAxisVariable: CustomerMetricsNewReturningCalendarChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
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

export type { CustomerDashboardDailyNewDispatch, CustomerDashboardDailyNewState };
