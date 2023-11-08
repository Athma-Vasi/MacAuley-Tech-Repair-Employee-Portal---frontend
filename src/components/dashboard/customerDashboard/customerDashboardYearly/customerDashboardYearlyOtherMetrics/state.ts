import {
  CustomerDashboardYearlyOtherMetricsAction,
  CustomerDashboardYearlyOtherMetricsDispatch,
  CustomerDashboardYearlyOtherMetricsState,
} from './types';

const initialCustomerDashboardYearlyOtherMetricsState: CustomerDashboardYearlyOtherMetricsState =
  {
    churnRetentionBarChartYAxisVariable: 'overview',
    churnRetentionLineChartYAxisVariable: 'overview',
  };

const customerDashboardYearlyOtherMetricsAction: CustomerDashboardYearlyOtherMetricsAction =
  {
    setChurnRetentionBarChartYAxisVariable:
      'setChurnRetentionBarChartYAxisVariable',
    setChurnRetentionLineChartYAxisVariable:
      'setChurnRetentionLineChartYAxisVariable',
  };

function customerDashboardYearlyOtherMetricsReducer(
  state: CustomerDashboardYearlyOtherMetricsState,
  action: CustomerDashboardYearlyOtherMetricsDispatch
): CustomerDashboardYearlyOtherMetricsState {
  switch (action.type) {
    case customerDashboardYearlyOtherMetricsAction.setChurnRetentionBarChartYAxisVariable:
      return {
        ...state,
        churnRetentionBarChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyOtherMetricsAction.setChurnRetentionLineChartYAxisVariable:
      return {
        ...state,
        churnRetentionLineChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardYearlyOtherMetricsAction,
  customerDashboardYearlyOtherMetricsReducer,
  initialCustomerDashboardYearlyOtherMetricsState,
};
