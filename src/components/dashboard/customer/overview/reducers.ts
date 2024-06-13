import { CustomerMetricsOverviewChartsKey } from "../chartsData";
import { CustomerMetricsOverviewAction, customerMetricsOverviewAction } from "./actions";
import { CustomerMetricsOverviewDispatch, CustomerMetricsOverviewState } from "./types";

function customerMetricsOverviewReducer(
  state: CustomerMetricsOverviewState,
  dispatch: CustomerMetricsOverviewDispatch
): CustomerMetricsOverviewState {
  const reducer = customerMetricsOverviewReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerMetricsOverviewReducers = new Map<
  CustomerMetricsOverviewAction[keyof CustomerMetricsOverviewAction],
  (
    state: CustomerMetricsOverviewState,
    dispatch: CustomerMetricsOverviewDispatch
  ) => CustomerMetricsOverviewState
>([
  [
    customerMetricsOverviewAction.setOverviewBarChartYAxisVariable,
    customerMetricsOverviewReducer_setOverviewBarChartYAxisVariable,
  ],
  [
    customerMetricsOverviewAction.setOverviewCalendarChartYAxisVariable,
    customerMetricsOverviewReducer_setOverviewCalendarChartYAxisVariable,
  ],
  [
    customerMetricsOverviewAction.setOverviewLineChartYAxisVariable,
    customerMetricsOverviewReducer_setOverviewLineChartYAxisVariable,
  ],
]);

function customerMetricsOverviewReducer_setOverviewBarChartYAxisVariable(
  state: CustomerMetricsOverviewState,
  dispatch: CustomerMetricsOverviewDispatch
): CustomerMetricsOverviewState {
  return {
    ...state,
    overviewBarChartYAxisVariable: dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

function customerMetricsOverviewReducer_setOverviewCalendarChartYAxisVariable(
  state: CustomerMetricsOverviewState,
  dispatch: CustomerMetricsOverviewDispatch
): CustomerMetricsOverviewState {
  return {
    ...state,
    overviewCalendarChartYAxisVariable:
      dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

function customerMetricsOverviewReducer_setOverviewLineChartYAxisVariable(
  state: CustomerMetricsOverviewState,
  dispatch: CustomerMetricsOverviewDispatch
): CustomerMetricsOverviewState {
  return {
    ...state,
    overviewLineChartYAxisVariable: dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

export { customerMetricsOverviewReducer };
