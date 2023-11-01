import {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
} from './types';

const initialCustomerDashboardDailyState: CustomerDashboardDailyState = {
  newYAxisSelection: 'overview',
  overviewYAxisSelection: 'overview',
  returningYAxisSelection: 'overview',
};

const customerDashboardDailyAction: CustomerDashboardDailyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection',
  setOverviewYAxisSelection: 'setOverviewYAxisSelection',
  setReturningYAxisSelection: 'setReturningYAxisSelection',
};

function customerDashboardDailyReducer(
  state: CustomerDashboardDailyState,
  action: CustomerDashboardDailyDispatch
): CustomerDashboardDailyState {
  switch (action.type) {
    case customerDashboardDailyAction.setNewYAxisSelection:
      return {
        ...state,
        newYAxisSelection: action.payload,
      };

    case customerDashboardDailyAction.setOverviewYAxisSelection:
      return {
        ...state,
        overviewYAxisSelection: action.payload,
      };

    case customerDashboardDailyAction.setReturningYAxisSelection:
      return {
        ...state,
        returningYAxisSelection: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardDailyAction,
  customerDashboardDailyReducer,
  initialCustomerDashboardDailyState,
};
