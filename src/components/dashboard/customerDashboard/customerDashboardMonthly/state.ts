import {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
} from './types';

const initialCustomerDashboardMonthlyState: CustomerDashboardMonthlyState = {
  newYAxisBarVariablesSelection: 'overview',
  overviewBarChartYAxisVariable: 'overview',
  returningYAxisLineBarVariablesSelection: 'overview',
  churnRetentionYAxisSelection: 'overview',
};

const customerDashboardMonthlyAction: CustomerDashboardMonthlyAction = {
  setNewYAxisLineBarVariablesSelection: 'setNewYAxisLineBarVariablesSelection',
  setOverviewYAxisVariablesSelection: 'setOverviewYAxisVariablesSelection',
  setReturningYAxisLineBarSelection: 'setReturningYAxisLineBarSelection',
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection',
};

function customerDashboardMonthlyReducer(
  state: CustomerDashboardMonthlyState,
  action: CustomerDashboardMonthlyDispatch
): CustomerDashboardMonthlyState {
  switch (action.type) {
    case customerDashboardMonthlyAction.setNewYAxisLineBarVariablesSelection:
      return {
        ...state,
        newYAxisBarVariablesSelection: action.payload,
      };

    case customerDashboardMonthlyAction.setOverviewYAxisVariablesSelection:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    case customerDashboardMonthlyAction.setReturningYAxisLineBarSelection:
      return {
        ...state,
        returningYAxisLineBarVariablesSelection: action.payload,
      };

    case customerDashboardMonthlyAction.setChurnRetentionYAxisSelection:
      return {
        ...state,
        churnRetentionYAxisSelection: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardMonthlyAction,
  customerDashboardMonthlyReducer,
  initialCustomerDashboardMonthlyState,
};
