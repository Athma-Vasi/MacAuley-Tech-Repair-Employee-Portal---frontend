import {
  FinancialDashboardMonthlyTransactionsAction,
  FinancialDashboardMonthlyTransactionsDispatch,
  FinancialDashboardMonthlyTransactionsState,
} from './types';

const initialFinancialDashboardMonthlyTransactionsState: FinancialDashboardMonthlyTransactionsState =
  {
    transactionsBarChartYAxisVariable: 'total',
    transactionsCalendarChartYAxisVariable: 'total',
    transactionsLineChartYAxisVariable: 'total',
    transactionsPieChartYAxisVariable: 'overview',
  };

const financialDashboardMonthlyTransactionsAction: FinancialDashboardMonthlyTransactionsAction =
  {
    setTransactionsBarChartYAxisVariable:
      'setTransactionsBarChartYAxisVariable',
    setTransactionsCalendarChartYAxisVariable:
      'setTransactionsCalendarChartYAxisVariable',
    setTransactionsLineChartYAxisVariable:
      'setTransactionsLineChartYAxisVariable',
    setTransactionsPieChartYAxisVariable:
      'setTransactionsPieChartYAxisVariable',
  };

function financialDashboardMonthlyTransactionsReducer(
  state: FinancialDashboardMonthlyTransactionsState,
  action: FinancialDashboardMonthlyTransactionsDispatch
): FinancialDashboardMonthlyTransactionsState {
  switch (action.type) {
    case financialDashboardMonthlyTransactionsAction.setTransactionsBarChartYAxisVariable:
      return {
        ...state,
        transactionsBarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyTransactionsAction.setTransactionsCalendarChartYAxisVariable:
      return {
        ...state,
        transactionsCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyTransactionsAction.setTransactionsLineChartYAxisVariable:
      return {
        ...state,
        transactionsLineChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyTransactionsAction.setTransactionsPieChartYAxisVariable:
      return {
        ...state,
        transactionsPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardMonthlyTransactionsAction,
  financialDashboardMonthlyTransactionsReducer,
  initialFinancialDashboardMonthlyTransactionsState,
};
