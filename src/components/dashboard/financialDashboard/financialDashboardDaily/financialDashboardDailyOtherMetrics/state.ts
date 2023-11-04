import {
  FinancialDashboardDailyOtherMetricsAction,
  FinancialDashboardDailyOtherMetricsDispatch,
  FinancialDashboardDailyOtherMetricsState,
} from './types';

const initialFinancialDashboardDailyOtherMetricsState: FinancialDashboardDailyOtherMetricsState =
  {
    otherMetricsBarChartYAxisVariable: 'netProfitMargin',
    otherMetricsCalendarChartYAxisVariable: 'netProfitMargin',
    otherMetricsLineChartYAxisVariable: 'netProfitMargin',
  };

const financialDashboardDailyOtherMetricsAction: FinancialDashboardDailyOtherMetricsAction =
  {
    // other metrics
    setOtherMetricsBarChartYAxisVariable:
      'setOtherMetricsBarChartYAxisVariable',
    setOtherMetricsCalendarChartYAxisVariable:
      'setOtherMetricsCalendarChartYAxisVariable',
    setOtherMetricsLineChartYAxisVariable:
      'setOtherMetricsLineChartYAxisVariable',
  };

function financialDashboardDailyOtherMetricsReducer(
  state: FinancialDashboardDailyOtherMetricsState,
  action: FinancialDashboardDailyOtherMetricsDispatch
): FinancialDashboardDailyOtherMetricsState {
  switch (action.type) {
    case financialDashboardDailyOtherMetricsAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };

    case financialDashboardDailyOtherMetricsAction.setOtherMetricsCalendarChartYAxisVariable:
      return {
        ...state,
        otherMetricsCalendarChartYAxisVariable: action.payload,
      };

    case financialDashboardDailyOtherMetricsAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  financialDashboardDailyOtherMetricsAction,
  financialDashboardDailyOtherMetricsReducer,
  initialFinancialDashboardDailyOtherMetricsState,
};
