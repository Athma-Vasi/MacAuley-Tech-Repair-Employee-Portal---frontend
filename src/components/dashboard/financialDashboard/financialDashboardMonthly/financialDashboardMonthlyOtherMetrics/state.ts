import {
  FinancialDashboardMonthlyOtherMetricsAction,
  FinancialDashboardMonthlyOtherMetricsDispatch,
  FinancialDashboardMonthlyOtherMetricsState,
} from './types';

const initialFinancialDashboardMonthlyOtherMetricsState: FinancialDashboardMonthlyOtherMetricsState =
  {
    otherMetricsBarChartYAxisVariable: 'netProfitMargin',
    otherMetricsCalendarChartYAxisVariable: 'netProfitMargin',
    otherMetricsLineChartYAxisVariable: 'netProfitMargin',
  };

const financialDashboardMonthlyOtherMetricsAction: FinancialDashboardMonthlyOtherMetricsAction =
  {
    // other metrics
    setOtherMetricsBarChartYAxisVariable:
      'setOtherMetricsBarChartYAxisVariable',
    setOtherMetricsCalendarChartYAxisVariable:
      'setOtherMetricsCalendarChartYAxisVariable',
    setOtherMetricsLineChartYAxisVariable:
      'setOtherMetricsLineChartYAxisVariable',
  };

function financialDashboardMonthlyOtherMetricsReducer(
  state: FinancialDashboardMonthlyOtherMetricsState,
  action: FinancialDashboardMonthlyOtherMetricsDispatch
): FinancialDashboardMonthlyOtherMetricsState {
  switch (action.type) {
    case financialDashboardMonthlyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };

    case financialDashboardMonthlyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable:
      return {
        ...state,
        otherMetricsCalendarChartYAxisVariable: action.payload,
      };

    case financialDashboardMonthlyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  financialDashboardMonthlyOtherMetricsAction,
  financialDashboardMonthlyOtherMetricsReducer,
  initialFinancialDashboardMonthlyOtherMetricsState,
};
