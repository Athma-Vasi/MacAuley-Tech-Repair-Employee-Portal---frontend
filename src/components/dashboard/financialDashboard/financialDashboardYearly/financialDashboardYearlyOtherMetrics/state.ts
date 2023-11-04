import {
  FinancialDashboardYearlyOtherMetricsAction,
  FinancialDashboardYearlyOtherMetricsDispatch,
  FinancialDashboardYearlyOtherMetricsState,
} from './types';

const initialFinancialDashboardYearlyOtherMetricsState: FinancialDashboardYearlyOtherMetricsState =
  {
    otherMetricsBarChartYAxisVariable: 'netProfitMargin',
    otherMetricsLineChartYAxisVariable: 'netProfitMargin',
  };

const financialDashboardYearlyOtherMetricsAction: FinancialDashboardYearlyOtherMetricsAction =
  {
    // other metrics
    setOtherMetricsBarChartYAxisVariable:
      'setOtherMetricsBarChartYAxisVariable',
    setOtherMetricsLineChartYAxisVariable:
      'setOtherMetricsLineChartYAxisVariable',
  };

function financialDashboardYearlyOtherMetricsReducer(
  state: FinancialDashboardYearlyOtherMetricsState,
  action: FinancialDashboardYearlyOtherMetricsDispatch
): FinancialDashboardYearlyOtherMetricsState {
  switch (action.type) {
    case financialDashboardYearlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };

    case financialDashboardYearlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  financialDashboardYearlyOtherMetricsAction,
  financialDashboardYearlyOtherMetricsReducer,
  initialFinancialDashboardYearlyOtherMetricsState,
};
