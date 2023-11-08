import {
  CustomerDashboardMonthlyOtherMetricsAction,
  CustomerDashboardMonthlyOtherMetricsDispatch,
  CustomerDashboardMonthlyOtherMetricsState,
} from './types';

const initialCustomerDashboardMonthlyOtherMetricsState: CustomerDashboardMonthlyOtherMetricsState =
  {
    otherMetricsBarChartYAxisVariable: 'overview',
    otherMetricsLineChartYAxisVariable: 'overview',
  };

const customerDashboardMonthlyOtherMetricsAction: CustomerDashboardMonthlyOtherMetricsAction =
  {
    setOtherMetricsBarChartYAxisVariable:
      'setOtherMetricsBarChartYAxisVariable',
    setOtherMetricsLineChartYAxisVariable:
      'setOtherMetricsLineChartYAxisVariable',
  };

function customerDashboardMonthlyOtherMetricsReducer(
  state: CustomerDashboardMonthlyOtherMetricsState,
  action: CustomerDashboardMonthlyOtherMetricsDispatch
): CustomerDashboardMonthlyOtherMetricsState {
  switch (action.type) {
    case customerDashboardMonthlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };
    case customerDashboardMonthlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
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
