import {
  CustomerDashboardMonthlyOtherMetricsAction,
  CustomerDashboardMonthlyOtherMetricsDispatch,
  CustomerDashboardMonthlyOtherMetricsState,
} from './types';

const initialCustomerDashboardMonthlyOtherMetricsState: CustomerDashboardMonthlyOtherMetricsState =
  {
    churnRetentionBarChartYAxisVariable: 'overview',
    churnRetentionLineChartYAxisVariable: 'overview',
  };

const customerDashboardMonthlyOtherMetricsAction: CustomerDashboardMonthlyOtherMetricsAction =
  {
    setChurnRetentionBarChartYAxisVariable:
      'setChurnRetentionBarChartYAxisVariable',
    setChurnRetentionLineChartYAxisVariable:
      'setChurnRetentionLineChartYAxisVariable',
  };

function customerDashboardMonthlyOtherMetricsReducer(
  state: CustomerDashboardMonthlyOtherMetricsState,
  action: CustomerDashboardMonthlyOtherMetricsDispatch
): CustomerDashboardMonthlyOtherMetricsState {
  switch (action.type) {
    case customerDashboardMonthlyOtherMetricsAction.setChurnRetentionBarChartYAxisVariable:
      return {
        ...state,
        churnRetentionBarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyOtherMetricsAction.setChurnRetentionLineChartYAxisVariable:
      return {
        ...state,
        churnRetentionLineChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  customerDashboardMonthlyOtherMetricsAction,
  customerDashboardMonthlyOtherMetricsReducer,
  initialCustomerDashboardMonthlyOtherMetricsState,
};
