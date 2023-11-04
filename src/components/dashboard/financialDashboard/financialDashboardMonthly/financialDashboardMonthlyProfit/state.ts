import {
  FinancialDashboardMonthlyProfitAction,
  FinancialDashboardMonthlyProfitDispatch,
  FinancialDashboardMonthlyProfitState,
} from './types';

const initialFinancialDashboardMonthlyProfitState: FinancialDashboardMonthlyProfitState =
  {
    profitBarChartYAxisVariable: 'total',
    profitCalendarChartYAxisVariable: 'total',
    profitLineChartYAxisVariable: 'total',
    profitPieChartYAxisVariable: 'overview',
  };

const financialDashboardMonthlyProfitAction: FinancialDashboardMonthlyProfitAction =
  {
    setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable',
    setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable',
    setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable',
    setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable',
  };

function financialDashboardMonthlyProfitReducer(
  state: FinancialDashboardMonthlyProfitState,
  action: FinancialDashboardMonthlyProfitDispatch
): FinancialDashboardMonthlyProfitState {
  switch (action.type) {
    case financialDashboardMonthlyProfitAction.setProfitBarChartYAxisVariable:
      return {
        ...state,
        profitBarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyProfitAction.setProfitCalendarChartYAxisVariable:
      return {
        ...state,
        profitCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyProfitAction.setProfitLineChartYAxisVariable:
      return {
        ...state,
        profitLineChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyProfitAction.setProfitPieChartYAxisVariable:
      return {
        ...state,
        profitPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardMonthlyProfitAction,
  financialDashboardMonthlyProfitReducer,
  initialFinancialDashboardMonthlyProfitState,
};
