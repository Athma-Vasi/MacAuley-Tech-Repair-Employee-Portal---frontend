import {
  FinancialDashboardMonthlyExpensesAction,
  FinancialDashboardMonthlyExpensesDispatch,
  FinancialDashboardMonthlyExpensesState,
} from './types';

const initialFinancialDashboardMonthlyExpensesState: FinancialDashboardMonthlyExpensesState =
  {
    expensesBarChartYAxisVariable: 'total',
    expensesCalendarChartYAxisVariable: 'total',
    expensesLineChartYAxisVariable: 'total',
    expensesPieChartYAxisVariable: 'overview',
  };

const financialDashboardMonthlyExpensesAction: FinancialDashboardMonthlyExpensesAction =
  {
    setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable',
    setExpensesCalendarChartYAxisVariable:
      'setExpensesCalendarChartYAxisVariable',
    setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable',
    setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable',
  };

function financialDashboardMonthlyExpensesReducer(
  state: FinancialDashboardMonthlyExpensesState,
  action: FinancialDashboardMonthlyExpensesDispatch
): FinancialDashboardMonthlyExpensesState {
  switch (action.type) {
    case financialDashboardMonthlyExpensesAction.setExpensesBarChartYAxisVariable:
      return {
        ...state,
        expensesBarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyExpensesAction.setExpensesCalendarChartYAxisVariable:
      return {
        ...state,
        expensesCalendarChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyExpensesAction.setExpensesLineChartYAxisVariable:
      return {
        ...state,
        expensesLineChartYAxisVariable: action.payload,
      };
    case financialDashboardMonthlyExpensesAction.setExpensesPieChartYAxisVariable:
      return {
        ...state,
        expensesPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardMonthlyExpensesAction,
  financialDashboardMonthlyExpensesReducer,
  initialFinancialDashboardMonthlyExpensesState,
};
