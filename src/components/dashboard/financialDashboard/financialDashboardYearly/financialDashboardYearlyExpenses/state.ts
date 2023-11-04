import {
  FinancialDashboardYearlyExpensesAction,
  FinancialDashboardYearlyExpensesDispatch,
  FinancialDashboardYearlyExpensesState,
} from './types';

const initialFinancialDashboardYearlyExpensesState: FinancialDashboardYearlyExpensesState =
  {
    expensesBarChartYAxisVariable: 'total',
    expensesLineChartYAxisVariable: 'total',
    expensesPieChartYAxisVariable: 'overview',
  };

const financialDashboardYearlyExpensesAction: FinancialDashboardYearlyExpensesAction =
  {
    setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable',
    setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable',
    setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable',
  };

function financialDashboardYearlyExpensesReducer(
  state: FinancialDashboardYearlyExpensesState,
  action: FinancialDashboardYearlyExpensesDispatch
): FinancialDashboardYearlyExpensesState {
  switch (action.type) {
    case financialDashboardYearlyExpensesAction.setExpensesBarChartYAxisVariable:
      return {
        ...state,
        expensesBarChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyExpensesAction.setExpensesLineChartYAxisVariable:
      return {
        ...state,
        expensesLineChartYAxisVariable: action.payload,
      };
    case financialDashboardYearlyExpensesAction.setExpensesPieChartYAxisVariable:
      return {
        ...state,
        expensesPieChartYAxisVariable: action.payload,
      };
    default:
      return state;
  }
}

export {
  financialDashboardYearlyExpensesAction,
  financialDashboardYearlyExpensesReducer,
  initialFinancialDashboardYearlyExpensesState,
};
