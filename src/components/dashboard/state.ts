import {
  DashboardAction,
  DashboardDispatch,
  DashboardState,
  FinancialMetric,
} from './types';
import { SelectedCustomerMetrics } from './utils';

const initialDashboardState: DashboardState = {
  businessMetrics: [],
  selectedCustomerMetrics: {} as SelectedCustomerMetrics,
};

const dashboardAction: DashboardAction = {
  setBusinessMetrics: 'setBusinessMetrics',
  setSelectedCustomerMetrics: 'setSelectedCustomerMetrics',
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardDispatch
): DashboardState {
  switch (action.type) {
    case dashboardAction.setBusinessMetrics:
      return {
        ...state,
        businessMetrics: action.payload,
      };

    case dashboardAction.setSelectedCustomerMetrics:
      return {
        ...state,
        selectedCustomerMetrics: action.payload,
      };

    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
