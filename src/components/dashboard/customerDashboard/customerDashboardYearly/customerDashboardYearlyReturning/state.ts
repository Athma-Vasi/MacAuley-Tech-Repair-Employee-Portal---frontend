import {
  CustomerDashboardYearlyReturningAction,
  CustomerDashboardYearlyReturningDispatch,
  CustomerDashboardYearlyReturningState,
} from './types';

const initialCustomerDashboardYearlyReturningState: CustomerDashboardYearlyReturningState =
  {
    returningBarChartYAxisVariable: 'total',
    returningLineChartYAxisVariable: 'total',
    returningPieChartYAxisVariable: 'overview',
  };

const customerDashboardYearlyReturningAction: CustomerDashboardYearlyReturningAction =
  {
    setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable',
    setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable',
    setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable',
  };

function customerDashboardYearlyReturningReducer(
  state: CustomerDashboardYearlyReturningState,
  action: CustomerDashboardYearlyReturningDispatch
): CustomerDashboardYearlyReturningState {
  switch (action.type) {
    case customerDashboardYearlyReturningAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyReturningAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyReturningAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardYearlyReturningAction,
  customerDashboardYearlyReturningReducer,
  initialCustomerDashboardYearlyReturningState,
};
