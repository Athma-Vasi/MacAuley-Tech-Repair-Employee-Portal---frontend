import { CustomerMetricsOverviewChartsKey } from "../../utils";
import {
  CustomerDashboardDailyOverviewAction,
  customerDashboardDailyOverviewAction,
} from "./actions";
import {
  CustomerDashboardDailyOverviewDispatch,
  CustomerDashboardDailyOverviewState,
} from "./types";

function customerDashboardDailyOverviewReducer(
  state: CustomerDashboardDailyOverviewState,
  dispatch: CustomerDashboardDailyOverviewDispatch
): CustomerDashboardDailyOverviewState {
  const reducer = customerDashboardDailyOverviewReducers.get(dispatch.action);
  return reducer ? reducer(state, dispatch) : state;
}

const customerDashboardDailyOverviewReducers = new Map<
  CustomerDashboardDailyOverviewAction[keyof CustomerDashboardDailyOverviewAction],
  (
    state: CustomerDashboardDailyOverviewState,
    dispatch: CustomerDashboardDailyOverviewDispatch
  ) => CustomerDashboardDailyOverviewState
>([
  [
    customerDashboardDailyOverviewAction.setOverviewBarChartYAxisVariable,
    customerDashboardDailyOverviewReducer_setOverviewBarChartYAxisVariable,
  ],
  [
    customerDashboardDailyOverviewAction.setOverviewCalendarChartYAxisVariable,
    customerDashboardDailyOverviewReducer_setOverviewCalendarChartYAxisVariable,
  ],
  [
    customerDashboardDailyOverviewAction.setOverviewLineChartYAxisVariable,
    customerDashboardDailyOverviewReducer_setOverviewLineChartYAxisVariable,
  ],
]);

function customerDashboardDailyOverviewReducer_setOverviewBarChartYAxisVariable(
  state: CustomerDashboardDailyOverviewState,
  dispatch: CustomerDashboardDailyOverviewDispatch
): CustomerDashboardDailyOverviewState {
  return {
    ...state,
    overviewBarChartYAxisVariable: dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

function customerDashboardDailyOverviewReducer_setOverviewCalendarChartYAxisVariable(
  state: CustomerDashboardDailyOverviewState,
  dispatch: CustomerDashboardDailyOverviewDispatch
): CustomerDashboardDailyOverviewState {
  return {
    ...state,
    overviewCalendarChartYAxisVariable:
      dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

function customerDashboardDailyOverviewReducer_setOverviewLineChartYAxisVariable(
  state: CustomerDashboardDailyOverviewState,
  dispatch: CustomerDashboardDailyOverviewDispatch
): CustomerDashboardDailyOverviewState {
  return {
    ...state,
    overviewLineChartYAxisVariable: dispatch.payload as CustomerMetricsOverviewChartsKey,
  };
}

export { customerDashboardDailyOverviewReducer };
