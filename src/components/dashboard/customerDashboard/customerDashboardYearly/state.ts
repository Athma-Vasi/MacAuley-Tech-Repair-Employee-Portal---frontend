import {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
} from './types';

const initialCustomerDashboardYearlyState: CustomerDashboardYearlyState = {
  newYAxisSelection: 'Overview',
  overviewYAxisSelection: 'Overview',
  returningYAxisSelection: 'Overview',
  churnRetentionYAxisSelection: 'Overview',
};

const customerDashboardYearlyAction: CustomerDashboardYearlyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection',
  setOverviewYAxisSelection: 'setOverviewYAxisSelection',
  setReturningYAxisSelection: 'setReturningYAxisSelection',
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection',
};

function customerDashboardYearlyReducer(
  state: CustomerDashboardYearlyState,
  action: CustomerDashboardYearlyDispatch
): CustomerDashboardYearlyState {
  switch (action.type) {
    case customerDashboardYearlyAction.setNewYAxisSelection:
      return {
        ...state,
        newYAxisSelection: action.payload,
      };

    case customerDashboardYearlyAction.setOverviewYAxisSelection:
      return {
        ...state,
        overviewYAxisSelection: action.payload,
      };

    case customerDashboardYearlyAction.setReturningYAxisSelection:
      return {
        ...state,
        returningYAxisSelection: action.payload,
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
