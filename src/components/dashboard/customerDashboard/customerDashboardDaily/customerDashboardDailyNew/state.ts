import {
  CustomerDashboardDailyNewAction,
  CustomerDashboardDailyNewDispatch,
  CustomerDashboardDailyNewState,
} from './types';

const initialCustomerDashboardDailyNewState: CustomerDashboardDailyNewState = {
  newBarChartYAxisVariable: 'total',
  newCalendarChartYAxisVariable: 'total',
  newLineChartYAxisVariable: 'total',
  newPieChartYAxisVariable: 'overview',
};

const customerDashboardDailyNewAction: CustomerDashboardDailyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable',
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable',
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable',
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable',
};

function customerDashboardDailyNewReducer(
  state: CustomerDashboardDailyNewState,
  action: CustomerDashboardDailyNewDispatch
): CustomerDashboardDailyNewState {
  switch (action.type) {
    case customerDashboardDailyNewAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyNewAction.setNewCalendarChartYAxisVariable:
      return {
        ...state,
        newCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyNewAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyNewAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardDailyNewAction,
  customerDashboardDailyNewReducer,
  initialCustomerDashboardDailyNewState,
};
