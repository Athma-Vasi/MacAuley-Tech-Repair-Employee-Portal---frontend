import {
  FinancialDashboardDailyExpensesAction,
  FinancialDashboardDailyExpensesDispatch,
  FinancialDashboardDailyExpensesState,
} from './types';

const initialFinancialDashboardDailyExpensesState: FinancialDashboardDailyExpensesState =
  {
    expensesBarChartYAxisVariable: 'total',
    expensesCalendarChartYAxisVariable: 'total',
    expensesLineChartYAxisVariable: 'total',
    expensesPieChartYAxisVariable: 'overview',
  };

const financialDashboardDailyExpensesAction: FinancialDashboardDailyExpensesAction =
  {
    setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable',
    setExpensesCalendarChartYAxisVariable:
      'setExpensesCalendarChartYAxisVariable',
    setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable',
    setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable',
  };

function financialDashboardDailyExpensesReducer(
  state: FinancialDashboardDailyExpensesState,
  action: FinancialDashboardDailyExpensesDispatch
): FinancialDashboardDailyExpensesState {
  switch (action.type) {
    case financialDashboardDailyExpensesAction.setExpensesBarChartYAxisVariable:
      return {
        ...state,
        expensesBarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyExpensesAction.setExpensesCalendarChartYAxisVariable:
      return {
        ...state,
        expensesCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyExpensesAction.setExpensesLineChartYAxisVariable:
      return {
        ...state,
        expensesLineChartYAxisVariable: action.payload,
      };
    case financialDashboardDailyExpensesAction.setExpensesPieChartYAxisVariable:
      return {
        ...state,
        expensesPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardDailyExpensesAction,
  financialDashboardDailyExpensesReducer,
  initialFinancialDashboardDailyExpensesState,
};
