import {
  CustomerDashboardDailyOverviewAction,
  CustomerDashboardDailyOverviewDispatch,
  CustomerDashboardDailyOverviewState,
} from './types';

const initialCustomerDashboardDailyOverviewState: CustomerDashboardDailyOverviewState =
  {
    overviewBarChartYAxisVariable: 'overview',
    overviewCalendarChartYAxisVariable: 'overview',
    overviewLineChartYAxisVariable: 'overview',
  };

const customerDashboardDailyOverviewAction: CustomerDashboardDailyOverviewAction =
  {
    setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable',
    setOverviewCalendarChartYAxisVariable:
      'setOverviewCalendarChartYAxisVariable',
    setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable',
  };

function customerDashboardDailyOverviewReducer(
  state: CustomerDashboardDailyOverviewState,
  action: CustomerDashboardDailyOverviewDispatch
): CustomerDashboardDailyOverviewState {
  switch (action.type) {
    case customerDashboardDailyOverviewAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyOverviewAction.setOverviewCalendarChartYAxisVariable:
      return {
        ...state,
        overviewCalendarChartYAxisVariable: action.payload,
      };
    case customerDashboardDailyOverviewAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardDailyOverviewAction,
  customerDashboardDailyOverviewReducer,
  initialCustomerDashboardDailyOverviewState,
};
