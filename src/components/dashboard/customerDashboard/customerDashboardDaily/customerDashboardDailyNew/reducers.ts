import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import { customerDashboardDailyNewAction } from "./actions";
import {
  CustomerDashboardDailyNewAction,
  CustomerDashboardDailyNewDispatch,
  CustomerDashboardDailyNewState,
} from "./types";

function customerDashboardDailyNewReducer(
  state: CustomerDashboardDailyNewState,
  dispatch: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  const reducer = customerDashboardDailyNewReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerDashboardDailyNewReducers = new Map<
  CustomerDashboardDailyNewAction[keyof CustomerDashboardDailyNewAction],
  (
    state: CustomerDashboardDailyNewState,
    dispatch: CustomerDashboardDailyNewDispatch
  ) => CustomerDashboardDailyNewState
>([
  [
    customerDashboardDailyNewAction.setNewPieChartYAxisVariable,
    customerDashboardDailyNewReducer_setNewPieChartYAxisVariable,
  ],
  [
    customerDashboardDailyNewAction.setNewLineChartYAxisVariable,
    customerDashboardDailyNewReducer_setNewLineChartYAxisVariable,
  ],
  [
    customerDashboardDailyNewAction.setNewCalendarChartYAxisVariable,
    customerDashboardDailyNewReducer_setNewCalendarChartYAxisVariable,
  ],
  [
    customerDashboardDailyNewAction.setNewBarChartYAxisVariable,
    customerDashboardDailyNewReducer_setNewBarChartYAxisVariable,
  ],
]);

function customerDashboardDailyNewReducer_setNewPieChartYAxisVariable(
  state: CustomerDashboardDailyNewState,
  dispatch: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  return {
    ...state,
    newPieChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningPieChartsKey,
  };
}

function customerDashboardDailyNewReducer_setNewLineChartYAxisVariable(
  state: CustomerDashboardDailyNewState,
  dispatch: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  return {
    ...state,
    newLineChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

function customerDashboardDailyNewReducer_setNewCalendarChartYAxisVariable(
  state: CustomerDashboardDailyNewState,
  dispatch: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  return {
    ...state,
    newCalendarChartYAxisVariable:
      dispatch.payload as CustomerMetricsNewReturningCalendarChartsKey,
  };
}

function customerDashboardDailyNewReducer_setNewBarChartYAxisVariable(
  state: CustomerDashboardDailyNewState,
  dispatch: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  return {
    ...state,
    newBarChartYAxisVariable: dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

export { customerDashboardDailyNewReducer };
