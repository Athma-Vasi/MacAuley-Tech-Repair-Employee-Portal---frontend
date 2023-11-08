import {
  FinancialDashboardMonthlyRevenueAction,
  FinancialDashboardMonthlyRevenueDispatch,
  FinancialDashboardMonthlyRevenueState,
} from './types';

const initialFinancialDashboardMonthlyRevenueState: FinancialDashboardMonthlyRevenueState =
  {
    revenueBarChartYAxisVariable: 'total',
    revenueCalendarChartYAxisVariable: 'total',
    revenueLineChartYAxisVariable: 'total',
    revenuePieChartYAxisVariable: 'overview',
  };

const financialDashboardMonthlyRevenueAction: FinancialDashboardMonthlyRevenueAction =
  {
    setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
    setRevenueCalendarChartYAxisVariable:
      'setRevenueCalendarChartYAxisVariable',
    setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',
    setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable',
  };

function financialDashboardMonthlyRevenueReducer(
  state: FinancialDashboardMonthlyRevenueState,
  action: FinancialDashboardMonthlyRevenueDispatch
): FinancialDashboardMonthlyRevenueState {
  switch (action.type) {
    case financialDashboardMonthlyRevenueAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyRevenueAction.setRevenueCalendarChartYAxisVariable:
      return {
        ...state,
        revenueCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyRevenueAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyRevenueAction.setRevenuePieChartYAxisVariable:
      return {
        ...state,
        revenuePieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardMonthlyRevenueAction,
  financialDashboardMonthlyRevenueReducer,
  initialFinancialDashboardMonthlyRevenueState,
};
