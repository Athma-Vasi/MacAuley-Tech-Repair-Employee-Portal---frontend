import {
  CustomerDashboardMonthlyReturningAction,
  CustomerDashboardMonthlyReturningDispatch,
  CustomerDashboardMonthlyReturningState,
} from './types';

const initialCustomerDashboardMonthlyReturningState: CustomerDashboardMonthlyReturningState =
  {
    returningBarChartYAxisVariable: 'total',
    returningCalendarChartYAxisVariable: 'total',
    returningLineChartYAxisVariable: 'total',
    returningPieChartYAxisVariable: 'overview',
  };

const customerDashboardMonthlyReturningAction: CustomerDashboardMonthlyReturningAction =
  {
    setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable',
    setReturningCalendarChartYAxisVariable:
      'setReturningCalendarChartYAxisVariable',
    setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable',
    setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable',
  };

function customerDashboardMonthlyReturningReducer(
  state: CustomerDashboardMonthlyReturningState,
  action: CustomerDashboardMonthlyReturningDispatch
): CustomerDashboardMonthlyReturningState {
  switch (action.type) {
    case customerDashboardMonthlyReturningAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyReturningAction.setReturningCalendarChartYAxisVariable:
      return {
        ...state,
        returningCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyReturningAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyReturningAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardMonthlyReturningAction,
  customerDashboardMonthlyReturningReducer,
  initialCustomerDashboardMonthlyReturningState,
};
