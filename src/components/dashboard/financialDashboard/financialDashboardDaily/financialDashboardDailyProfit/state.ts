import {
  FinancialDashboardDailyProfitAction,
  FinancialDashboardDailyProfitDispatch,
  FinancialDashboardDailyProfitState,
} from './types';

const initialFinancialDashboardDailyProfitState: FinancialDashboardDailyProfitState =
  {
    profitBarChartYAxisVariable: 'total',
    profitCalendarChartYAxisVariable: 'total',
    profitLineChartYAxisVariable: 'total',
    profitPieChartYAxisVariable: 'overview',
  };

const financialDashboardDailyProfitAction: FinancialDashboardDailyProfitAction =
  {
    setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable',
    setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable',
    setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable',
    setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable',
  };

function financialDashboardDailyProfitReducer(
  state: FinancialDashboardDailyProfitState,
  action: FinancialDashboardDailyProfitDispatch
): FinancialDashboardDailyProfitState {
  switch (action.type) {
    case financialDashboardDailyProfitAction.setProfitBarChartYAxisVariable:
      return {
        ...state,
        profitBarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyProfitAction.setProfitCalendarChartYAxisVariable:
      return {
        ...state,
        profitCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyProfitAction.setProfitLineChartYAxisVariable:
      return {
        ...state,
        profitLineChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyProfitAction.setProfitPieChartYAxisVariable:
      return {
        ...state,
        profitPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardDailyProfitAction,
  financialDashboardDailyProfitReducer,
  initialFinancialDashboardDailyProfitState,
};
