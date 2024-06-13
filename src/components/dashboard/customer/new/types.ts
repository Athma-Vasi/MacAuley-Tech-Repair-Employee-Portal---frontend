import {
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../chartsData";
import { CustomerMetricsNewAction } from "./actions";

type CustomerMetricsNewState = {
  newBarChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newLineChartYAxisVariable: CustomerMetricsNewReturningChartsKey;
  newPieChartYAxisVariable: CustomerMetricsNewReturningPieChartsKey;
};

type CustomerMetricsNewDispatch =
  | {
      action:
        | CustomerMetricsNewAction["setNewBarChartYAxisVariable"]
        | CustomerMetricsNewAction["setNewLineChartYAxisVariable"];
      payload: CustomerMetricsNewReturningChartsKey;
    }
  | {
      action: CustomerMetricsNewAction["setNewPieChartYAxisVariable"];
      payload: CustomerMetricsNewReturningPieChartsKey;
    };

export type { CustomerMetricsNewDispatch, CustomerMetricsNewState };
