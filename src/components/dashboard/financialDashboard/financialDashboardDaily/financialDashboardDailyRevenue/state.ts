import {
  FinancialDashboardDailyRevenueAction,
  FinancialDashboardDailyRevenueDispatch,
  FinancialDashboardDailyRevenueState,
} from './types';

const initialFinancialDashboardDailyRevenueState: FinancialDashboardDailyRevenueState =
  {
    revenueBarChartYAxisVariable: 'total',
    revenueCalendarChartYAxisVariable: 'total',
    revenueLineChartYAxisVariable: 'total',
    revenuePieChartYAxisVariable: 'overview',
  };

const financialDashboardDailyRevenueAction: FinancialDashboardDailyRevenueAction =
  {
    setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
    setRevenueCalendarChartYAxisVariable:
      'setRevenueCalendarChartYAxisVariable',
    setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',
    setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable',
  };

function financialDashboardDailyRevenueReducer(
  state: FinancialDashboardDailyRevenueState,
  action: FinancialDashboardDailyRevenueDispatch
): FinancialDashboardDailyRevenueState {
  switch (action.type) {
    case financialDashboardDailyRevenueAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyRevenueAction.setRevenueCalendarChartYAxisVariable:
      return {
        ...state,
        revenueCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyRevenueAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyRevenueAction.setRevenuePieChartYAxisVariable:
      return {
        ...state,
        revenuePieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardDailyRevenueAction,
  financialDashboardDailyRevenueReducer,
  initialFinancialDashboardDailyRevenueState,
};
