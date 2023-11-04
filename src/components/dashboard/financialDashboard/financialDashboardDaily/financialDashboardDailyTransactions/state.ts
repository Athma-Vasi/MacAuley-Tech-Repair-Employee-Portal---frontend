import {
  FinancialDashboardDailyTransactionsAction,
  FinancialDashboardDailyTransactionsDispatch,
  FinancialDashboardDailyTransactionsState,
} from './types';

const initialFinancialDashboardDailyTransactionsState: FinancialDashboardDailyTransactionsState =
  {
    transactionsBarChartYAxisVariable: 'total',
    transactionsCalendarChartYAxisVariable: 'total',
    transactionsLineChartYAxisVariable: 'total',
    transactionsPieChartYAxisVariable: 'overview',
  };

const financialDashboardDailyTransactionsAction: FinancialDashboardDailyTransactionsAction =
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

function financialDashboardDailyTransactionsReducer(
  state: FinancialDashboardDailyTransactionsState,
  action: FinancialDashboardDailyTransactionsDispatch
): FinancialDashboardDailyTransactionsState {
  switch (action.type) {
    case financialDashboardDailyTransactionsAction.setTransactionsBarChartYAxisVariable:
      return {
        ...state,
        transactionsBarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyTransactionsAction.setTransactionsCalendarChartYAxisVariable:
      return {
        ...state,
        transactionsCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyTransactionsAction.setTransactionsLineChartYAxisVariable:
      return {
        ...state,
        transactionsLineChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyTransactionsAction.setTransactionsPieChartYAxisVariable:
      return {
        ...state,
        transactionsPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardDailyTransactionsAction,
  financialDashboardDailyTransactionsReducer,
  initialFinancialDashboardDailyTransactionsState,
};
