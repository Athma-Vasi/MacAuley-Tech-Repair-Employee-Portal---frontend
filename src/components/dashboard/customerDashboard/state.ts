import {
  CustomerDashboardAction,
  CustomerDashboardDispatch,
  CustomerDashboardState,
} from './types';
import { SelectedCustomerMetrics } from './utils';

const initialCustomerDashboardState: CustomerDashboardState = {
  selectedCustomerMetrics: {} as SelectedCustomerMetrics,
  selectedCalendarView: 'Daily',
};

const customerDashboardAction: CustomerDashboardAction = {
  setSelectedCustomerMetrics: 'setSelectedCustomerMetrics',
  setSelectedCalendarView: 'setSelectedCalendarView',
};

function customerDashboardReducer(
  state: CustomerDashboardState,
  action: CustomerDashboardDispatch
): CustomerDashboardState {
  switch (action.type) {
    case customerDashboardAction.setSelectedCustomerMetrics:
      return {
        ...state,
        selectedCustomerMetrics: action.payload,
      };

    case customerDashboardAction.setSelectedCalendarView:
      return {
        ...state,
        selectedCalendarView: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardAction,
  customerDashboardReducer,
  initialCustomerDashboardState,
};
