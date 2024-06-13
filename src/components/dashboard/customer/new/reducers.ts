import {
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../chartsData";
import { CustomerMetricsNewAction, customerMetricsNewAction } from "./actions";
import { CustomerMetricsNewDispatch, CustomerMetricsNewState } from "./types";

function customerMetricsNewReducer(
  state: CustomerMetricsNewState,
  dispatch: CustomerMetricsNewDispatch
): CustomerMetricsNewState {
  const reducer = customerMetricsNewReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerMetricsNewReducers = new Map<
  CustomerMetricsNewAction[keyof CustomerMetricsNewAction],
  (
    state: CustomerMetricsNewState,
    dispatch: CustomerMetricsNewDispatch
  ) => CustomerMetricsNewState
>([
  [
    customerMetricsNewAction.setNewBarChartYAxisVariable,
    customerMetricsNewReducer_setNewBarChartYAxisVariable,
  ],
  [
    customerMetricsNewAction.setNewLineChartYAxisVariable,
    customerMetricsNewReducer_setNewLineChartYAxisVariable,
  ],
  [
    customerMetricsNewAction.setNewPieChartYAxisVariable,
    customerMetricsNewReducer_setNewPieChartYAxisVariable,
  ],
]);

function customerMetricsNewReducer_setNewBarChartYAxisVariable(
  state: CustomerMetricsNewState,
  dispatch: CustomerMetricsNewDispatch
): CustomerMetricsNewState {
  return {
    ...state,
    newBarChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

function customerMetricsNewReducer_setNewLineChartYAxisVariable(
  state: CustomerMetricsNewState,
  dispatch: CustomerMetricsNewDispatch
): CustomerMetricsNewState {
  return {
    ...state,
    newLineChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

function customerMetricsNewReducer_setNewPieChartYAxisVariable(
  state: CustomerMetricsNewState,
  dispatch: CustomerMetricsNewDispatch
): CustomerMetricsNewState {
  return {
    ...state,
    newPieChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningPieChartsKey,
  };
}

export { customerMetricsNewReducer };
