import {
  CustomerDashboardYearlyNewAction,
  CustomerDashboardYearlyNewDispatch,
  CustomerDashboardYearlyNewState,
} from './types';

const initialCustomerDashboardYearlyNewState: CustomerDashboardYearlyNewState =
  {
    newBarChartYAxisVariable: 'total',
    newLineChartYAxisVariable: 'total',
    newPieChartYAxisVariable: 'overview',
  };

const customerDashboardYearlyNewAction: CustomerDashboardYearlyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable',
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable',
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable',
};

function customerDashboardYearlyNewReducer(
  state: CustomerDashboardYearlyNewState,
  action: CustomerDashboardYearlyNewDispatch
): CustomerDashboardYearlyNewState {
  switch (action.type) {
    case customerDashboardYearlyNewAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyNewAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyNewAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardYearlyNewAction,
  customerDashboardYearlyNewReducer,
  initialCustomerDashboardYearlyNewState,
};
