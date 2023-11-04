import {
  FinancialDashboardYearlyTransactionsAction,
  FinancialDashboardYearlyTransactionsDispatch,
  FinancialDashboardYearlyTransactionsState,
} from './types';

const initialFinancialDashboardYearlyTransactionsState: FinancialDashboardYearlyTransactionsState =
  {
    transactionsBarChartYAxisVariable: 'total',
    transactionsLineChartYAxisVariable: 'total',
    transactionsPieChartYAxisVariable: 'overview',
  };

const financialDashboardYearlyTransactionsAction: FinancialDashboardYearlyTransactionsAction =
  {
    setTransactionsBarChartYAxisVariable:
      'setTransactionsBarChartYAxisVariable',
    setTransactionsLineChartYAxisVariable:
      'setTransactionsLineChartYAxisVariable',
    setTransactionsPieChartYAxisVariable:
      'setTransactionsPieChartYAxisVariable',
  };

function financialDashboardYearlyTransactionsReducer(
  state: FinancialDashboardYearlyTransactionsState,
  action: FinancialDashboardYearlyTransactionsDispatch
): FinancialDashboardYearlyTransactionsState {
  switch (action.type) {
    case financialDashboardYearlyTransactionsAction.setTransactionsBarChartYAxisVariable:
      return {
        ...state,
        transactionsBarChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyTransactionsAction.setTransactionsLineChartYAxisVariable:
      return {
        ...state,
        transactionsLineChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyTransactionsAction.setTransactionsPieChartYAxisVariable:
      return {
        ...state,
        transactionsPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardYearlyTransactionsAction,
  financialDashboardYearlyTransactionsReducer,
  initialFinancialDashboardYearlyTransactionsState,
};
