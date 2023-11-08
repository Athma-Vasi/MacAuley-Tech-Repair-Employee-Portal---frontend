import {
  CustomerDashboardMonthlyNewAction,
  CustomerDashboardMonthlyNewDispatch,
  CustomerDashboardMonthlyNewState,
} from './types';

const initialCustomerDashboardMonthlyNewState: CustomerDashboardMonthlyNewState =
  {
    newBarChartYAxisVariable: 'total',
    newCalendarChartYAxisVariable: 'total',
    newLineChartYAxisVariable: 'total',
    newPieChartYAxisVariable: 'overview',
  };

const customerDashboardMonthlyNewAction: CustomerDashboardMonthlyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable',
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable',
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable',
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable',
};

function customerDashboardMonthlyNewReducer(
  state: CustomerDashboardMonthlyNewState,
  action: CustomerDashboardMonthlyNewDispatch
): CustomerDashboardMonthlyNewState {
  switch (action.type) {
    case customerDashboardMonthlyNewAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyNewAction.setNewCalendarChartYAxisVariable:
      return {
        ...state,
        newCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyNewAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyNewAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardMonthlyNewAction,
  customerDashboardMonthlyNewReducer,
  initialCustomerDashboardMonthlyNewState,
};
