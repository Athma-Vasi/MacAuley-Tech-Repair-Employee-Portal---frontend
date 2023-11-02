import {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
} from './types';

const initialCustomerDashboardYearlyState: CustomerDashboardYearlyState = {
  newYAxisBarVariablesSelection: 'overview',
  overviewBarChartYAxisVariable: 'overview',
  returningYAxisLineBarVariablesSelection: 'overview',
  churnRetentionYAxisSelection: 'overview',
};

const customerDashboardYearlyAction: CustomerDashboardYearlyAction = {
  setNewYAxisLineBarVariablesSelection: 'setNewYAxisLineBarVariablesSelection',
  setOverviewYAxisVariablesSelection: 'setOverviewYAxisVariablesSelection',
  setReturningYAxisLineBarSelection: 'setReturningYAxisLineBarSelection',
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection',
};

function customerDashboardYearlyReducer(
  state: CustomerDashboardYearlyState,
  action: CustomerDashboardYearlyDispatch
): CustomerDashboardYearlyState {
  switch (action.type) {
    case customerDashboardYearlyAction.setNewYAxisLineBarVariablesSelection:
      return {
        ...state,
        newYAxisBarVariablesSelection: action.payload,
      };

    case customerDashboardYearlyAction.setOverviewYAxisVariablesSelection:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    case customerDashboardYearlyAction.setReturningYAxisLineBarSelection:
      return {
        ...state,
        returningYAxisLineBarVariablesSelection: action.payload,
      };

    case customerDashboardYearlyAction.setChurnRetentionYAxisSelection:
      return {
        ...state,
        churnRetentionYAxisSelection: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardYearlyAction,
  customerDashboardYearlyReducer,
  initialCustomerDashboardYearlyState,
};
