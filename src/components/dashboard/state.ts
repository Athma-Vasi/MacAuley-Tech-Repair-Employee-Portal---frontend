import {
  DashboardAction,
  DashboardDispatch,
  DashboardState,
  FinancialMetric,
} from './types';

const initialDashboardState: DashboardState = {
  businessMetrics: [],
};

const dashboardAction: DashboardAction = {
  setBusinessMetrics: 'setBusinessMetrics',
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

    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
