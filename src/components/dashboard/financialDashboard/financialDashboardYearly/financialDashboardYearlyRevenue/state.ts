import {
  FinancialDashboardYearlyRevenueAction,
  FinancialDashboardYearlyRevenueDispatch,
  FinancialDashboardYearlyRevenueState,
} from './types';

const initialFinancialDashboardYearlyRevenueState: FinancialDashboardYearlyRevenueState =
  {
    revenueBarChartYAxisVariable: 'total',
    revenueLineChartYAxisVariable: 'total',
    revenuePieChartYAxisVariable: 'overview',
  };

const financialDashboardYearlyRevenueAction: FinancialDashboardYearlyRevenueAction =
  {
    setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
    setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',
    setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable',
  };

function financialDashboardYearlyRevenueReducer(
  state: FinancialDashboardYearlyRevenueState,
  action: FinancialDashboardYearlyRevenueDispatch
): FinancialDashboardYearlyRevenueState {
  switch (action.type) {
    case financialDashboardYearlyRevenueAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyRevenueAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyRevenueAction.setRevenuePieChartYAxisVariable:
      return {
        ...state,
        revenuePieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardYearlyRevenueAction,
  financialDashboardYearlyRevenueReducer,
  initialFinancialDashboardYearlyRevenueState,
};
