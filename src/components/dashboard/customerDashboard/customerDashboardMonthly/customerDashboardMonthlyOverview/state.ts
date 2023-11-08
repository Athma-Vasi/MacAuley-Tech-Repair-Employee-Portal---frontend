import {
  CustomerDashboardMonthlyOverviewAction,
  CustomerDashboardMonthlyOverviewDispatch,
  CustomerDashboardMonthlyOverviewState,
} from './types';

const initialCustomerDashboardMonthlyOverviewState: CustomerDashboardMonthlyOverviewState =
  {
    overviewBarChartYAxisVariable: 'overview',
    overviewCalendarChartYAxisVariable: 'overview',
    overviewLineChartYAxisVariable: 'overview',
  };

const customerDashboardMonthlyOverviewAction: CustomerDashboardMonthlyOverviewAction =
  {
    setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable',
    setOverviewCalendarChartYAxisVariable:
      'setOverviewCalendarChartYAxisVariable',
    setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable',
  };

function customerDashboardMonthlyOverviewReducer(
  state: CustomerDashboardMonthlyOverviewState,
  action: CustomerDashboardMonthlyOverviewDispatch
): CustomerDashboardMonthlyOverviewState {
  switch (action.type) {
    case customerDashboardMonthlyOverviewAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyOverviewAction.setOverviewCalendarChartYAxisVariable:
      return {
        ...state,
        overviewCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyOverviewAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardMonthlyOverviewAction,
  customerDashboardMonthlyOverviewReducer,
  initialCustomerDashboardMonthlyOverviewState,
};
