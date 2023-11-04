import {
  FinancialDashboardYearlyProfitAction,
  FinancialDashboardYearlyProfitDispatch,
  FinancialDashboardYearlyProfitState,
} from './types';

const initialFinancialDashboardYearlyProfitState: FinancialDashboardYearlyProfitState =
  {
    profitBarChartYAxisVariable: 'total',
    profitLineChartYAxisVariable: 'total',
    profitPieChartYAxisVariable: 'overview',
  };

const financialDashboardYearlyProfitAction: FinancialDashboardYearlyProfitAction =
  {
    setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable',
    setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable',
    setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable',
  };

function financialDashboardYearlyProfitReducer(
  state: FinancialDashboardYearlyProfitState,
  action: FinancialDashboardYearlyProfitDispatch
): FinancialDashboardYearlyProfitState {
  switch (action.type) {
    case financialDashboardYearlyProfitAction.setProfitBarChartYAxisVariable:
      return {
        ...state,
        profitBarChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyProfitAction.setProfitLineChartYAxisVariable:
      return {
        ...state,
        profitLineChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyProfitAction.setProfitPieChartYAxisVariable:
      return {
        ...state,
        profitPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardYearlyProfitAction,
  financialDashboardYearlyProfitReducer,
  initialFinancialDashboardYearlyProfitState,
};
