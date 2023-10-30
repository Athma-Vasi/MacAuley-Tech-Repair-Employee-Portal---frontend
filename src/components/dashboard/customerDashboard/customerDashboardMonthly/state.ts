import {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
} from './types';

const initialCustomerDashboardMonthlyState: CustomerDashboardMonthlyState = {
  newYAxisSelection: 'Overview',
  overviewYAxisSelection: 'Overview',
  returningYAxisSelection: 'Overview',
  churnRetentionYAxisSelection: 'Overview',
};

const customerDashboardMonthlyAction: CustomerDashboardMonthlyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection',
  setOverviewYAxisSelection: 'setOverviewYAxisSelection',
  setReturningYAxisSelection: 'setReturningYAxisSelection',
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection',
};

function customerDashboardMonthlyReducer(
  state: CustomerDashboardMonthlyState,
  action: CustomerDashboardMonthlyDispatch
): CustomerDashboardMonthlyState {
  switch (action.type) {
    case customerDashboardMonthlyAction.setNewYAxisSelection:
      return {
        ...state,
        newYAxisSelection: action.payload,
      };

    case customerDashboardMonthlyAction.setOverviewYAxisSelection:
      return {
        ...state,
        overviewYAxisSelection: action.payload,
      };

    case customerDashboardMonthlyAction.setReturningYAxisSelection:
      return {
        ...state,
        returningYAxisSelection: action.payload,
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
