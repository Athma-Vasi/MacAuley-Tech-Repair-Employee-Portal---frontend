import {
  CustomerDashboardYearlyOverviewAction,
  CustomerDashboardYearlyOverviewDispatch,
  CustomerDashboardYearlyOverviewState,
} from './types';

const initialCustomerDashboardYearlyOverviewState: CustomerDashboardYearlyOverviewState =
  {
    overviewBarChartYAxisVariable: 'overview',
    overviewLineChartYAxisVariable: 'overview',
  };

const customerDashboardYearlyOverviewAction: CustomerDashboardYearlyOverviewAction =
  {
    setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable',
    setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable',
  };

function customerDashboardYearlyOverviewReducer(
  state: CustomerDashboardYearlyOverviewState,
  action: CustomerDashboardYearlyOverviewDispatch
): CustomerDashboardYearlyOverviewState {
  switch (action.type) {
    case customerDashboardYearlyOverviewAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    case customerDashboardYearlyOverviewAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardYearlyOverviewAction,
  customerDashboardYearlyOverviewReducer,
  initialCustomerDashboardYearlyOverviewState,
};
