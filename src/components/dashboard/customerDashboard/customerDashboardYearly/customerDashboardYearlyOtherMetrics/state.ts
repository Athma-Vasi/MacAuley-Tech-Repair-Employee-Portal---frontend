import {
  CustomerDashboardYearlyOtherMetricsAction,
  CustomerDashboardYearlyOtherMetricsDispatch,
  CustomerDashboardYearlyOtherMetricsState,
} from './types';

const initialCustomerDashboardYearlyOtherMetricsState: CustomerDashboardYearlyOtherMetricsState =
  {
    otherMetricsBarChartYAxisVariable: 'overview',
    otherMetricsLineChartYAxisVariable: 'overview',
  };

const customerDashboardYearlyOtherMetricsAction: CustomerDashboardYearlyOtherMetricsAction =
  {
    setOtherMetricsBarChartYAxisVariable:
      'setOtherMetricsBarChartYAxisVariable',
    setOtherMetricsLineChartYAxisVariable:
      'setOtherMetricsLineChartYAxisVariable',
  };

function customerDashboardYearlyOtherMetricsReducer(
  state: CustomerDashboardYearlyOtherMetricsState,
  action: CustomerDashboardYearlyOtherMetricsDispatch
): CustomerDashboardYearlyOtherMetricsState {
  switch (action.type) {
    case customerDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };
    case customerDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
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
