import {
  CustomerMetricsNewReturningCalendarChartsKey,
  CustomerMetricsNewReturningChartsKey,
  CustomerMetricsNewReturningPieChartsKey,
} from "../../utils";
import {
  CustomerDashboardDailyReturningAction,
  customerDashboardDailyReturningAction,
} from "./actions";
import {
  CustomerDashboardDailyReturningDispatch,
  CustomerDashboardDailyReturningState,
} from "./types";

function customerDashboardDailyReturningReducer(
  state: CustomerDashboardDailyReturningState,
  dispatch: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  const reducer = customerDashboardDailyReturningReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerDashboardDailyReturningReducers = new Map<
  CustomerDashboardDailyReturningAction[keyof CustomerDashboardDailyReturningAction],
  (
    state: CustomerDashboardDailyReturningState,
    dispatch: CustomerDashboardDailyReturningDispatch
  ) => CustomerDashboardDailyReturningState
>([
  [
    customerDashboardDailyReturningAction.setReturningBarChartYAxisVariable,
    customerDashboardDailyReturningReducer_setReturningBarChartYAxisVariable,
  ],
  [
    customerDashboardDailyReturningAction.setReturningLineChartYAxisVariable,
    customerDashboardDailyReturningReducer_setReturningLineChartYAxisVariable,
  ],
  [
    customerDashboardDailyReturningAction.setReturningCalendarChartYAxisVariable,
    customerDashboardDailyReturningReducer_setReturningCalendarChartYAxisVariable,
  ],
  [
    customerDashboardDailyReturningAction.setReturningPieChartYAxisVariable,
    customerDashboardDailyReturningReducer_setReturningPieChartYAxisVariable,
  ],
]);

function customerDashboardDailyReturningReducer_setReturningBarChartYAxisVariable(
  state: CustomerDashboardDailyReturningState,
  dispatch: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  return {
    ...state,
    returningBarChartYAxisVariable:
      dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

function customerDashboardDailyReturningReducer_setReturningLineChartYAxisVariable(
  state: CustomerDashboardDailyReturningState,
  dispatch: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  return {
    ...state,
    returningLineChartYAxisVariable:
      dispatch.payload as CustomerMetricsNewReturningChartsKey,
  };
}

function customerDashboardDailyReturningReducer_setReturningCalendarChartYAxisVariable(
  state: CustomerDashboardDailyReturningState,
  dispatch: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  return {
    ...state,
    returningCalendarChartYAxisVariable:
      dispatch.payload as CustomerMetricsNewReturningCalendarChartsKey,
  };
}

function customerDashboardDailyReturningReducer_setReturningPieChartYAxisVariable(
  state: CustomerDashboardDailyReturningState,
  dispatch: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  return {
    ...state,
    returningPieChartYAxisVariable:
      dispatch.payload as CustomerMetricsNewReturningPieChartsKey,
  };
}

export { customerDashboardDailyReturningReducer };
