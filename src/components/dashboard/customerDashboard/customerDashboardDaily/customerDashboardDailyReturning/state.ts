import {
  CustomerDashboardDailyReturningAction,
  CustomerDashboardDailyReturningDispatch,
  CustomerDashboardDailyReturningState,
} from './types';

const initialCustomerDashboardDailyReturningState: CustomerDashboardDailyReturningState =
  {
    returningBarChartYAxisVariable: 'total',
    returningCalendarChartYAxisVariable: 'total',
    returningLineChartYAxisVariable: 'total',
    returningPieChartYAxisVariable: 'overview',
  };

const customerDashboardDailyReturningAction: CustomerDashboardDailyReturningAction =
  {
    setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable',
    setReturningCalendarChartYAxisVariable:
      'setReturningCalendarChartYAxisVariable',
    setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable',
    setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable',
  };

function customerDashboardDailyReturningReducer(
  state: CustomerDashboardDailyReturningState,
  action: CustomerDashboardDailyReturningDispatch
): CustomerDashboardDailyReturningState {
  switch (action.type) {
    case customerDashboardDailyReturningAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyReturningAction.setReturningCalendarChartYAxisVariable:
      return {
        ...state,
        returningCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyReturningAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyReturningAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardDailyReturningAction,
  customerDashboardDailyReturningReducer,
  initialCustomerDashboardDailyReturningState,
};
