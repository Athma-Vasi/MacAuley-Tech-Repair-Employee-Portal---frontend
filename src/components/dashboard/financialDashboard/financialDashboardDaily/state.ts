import {
  FinancialDashboardDailyAction,
  FinancialDashboardDailyDispatch,
  FinancialDashboardDailyState,
} from './types';

const initialFinancialDashboardDailyState: FinancialDashboardDailyState = {
  // profit
  // profit -> bar
  profitBarChartYAxisVariable: 'total',
  // profit -> calendar
  profitCalendarChartYAxisVariable: 'total',
  // profit -> line
  profitLineChartYAxisVariable: 'total',
  // profit -> pie
  profitPieChartYAxisVariable: 'overview',

  // revenue
  // revenue -> bar
  revenueBarChartYAxisVariable: 'total',
  // revenue -> calendar
  revenueCalendarChartYAxisVariable: 'total',
  // revenue -> line
  revenueLineChartYAxisVariable: 'total',
  // revenue -> pie
  revenuePieChartYAxisVariable: 'overview',

  // expenses
  // expenses -> bar
  expensesBarChartYAxisVariable: 'total',
  // expenses -> calendar
  expensesCalendarChartYAxisVariable: 'total',
  // expenses -> line
  expensesLineChartYAxisVariable: 'total',
  // expenses -> pie
  expensesPieChartYAxisVariable: 'overview',

  // transactions
  // transactions -> bar
  transactionsBarChartYAxisVariable: 'total',
  // transactions -> calendar
  transactionsCalendarChartYAxisVariable: 'total',
  // transactions -> line
  transactionsLineChartYAxisVariable: 'total',
  // transactions -> pie
  transactionsPieChartYAxisVariable: 'overview',

  // other metrics
  // other metrics -> bar
  otherMetricsBarChartYAxisVariable: 'netProfitMargin',
  // other metrics -> calendar
  otherMetricsCalendarChartYAxisVariable: 'netProfitMargin',
  // other metrics -> line
  otherMetricsLineChartYAxisVariable: 'netProfitMargin',
};

const financialDashboardDailyAction: FinancialDashboardDailyAction = {
  // profit
  setProfitBarChartYAxisVariable: 'setProfitBarChartYAxisVariable',
  setProfitCalendarChartYAxisVariable: 'setProfitCalendarChartYAxisVariable',
  setProfitLineChartYAxisVariable: 'setProfitLineChartYAxisVariable',
  setProfitPieChartYAxisVariable: 'setProfitPieChartYAxisVariable',

  // revenue
  setRevenueBarChartYAxisVariable: 'setRevenueBarChartYAxisVariable',
  setRevenueCalendarChartYAxisVariable: 'setRevenueCalendarChartYAxisVariable',
  setRevenueLineChartYAxisVariable: 'setRevenueLineChartYAxisVariable',
  setRevenuePieChartYAxisVariable: 'setRevenuePieChartYAxisVariable',

  // expenses
  setExpensesBarChartYAxisVariable: 'setExpensesBarChartYAxisVariable',
  setExpensesCalendarChartYAxisVariable:
    'setExpensesCalendarChartYAxisVariable',
  setExpensesLineChartYAxisVariable: 'setExpensesLineChartYAxisVariable',
  setExpensesPieChartYAxisVariable: 'setExpensesPieChartYAxisVariable',

  // transactions
  setTransactionsBarChartYAxisVariable: 'setTransactionsBarChartYAxisVariable',
  setTransactionsCalendarChartYAxisVariable:
    'setTransactionsCalendarChartYAxisVariable',
  setTransactionsLineChartYAxisVariable:
    'setTransactionsLineChartYAxisVariable',
  setTransactionsPieChartYAxisVariable: 'setTransactionsPieChartYAxisVariable',

  // other metrics
  setOtherMetricsBarChartYAxisVariable: 'setOtherMetricsBarChartYAxisVariable',
  setOtherMetricsCalendarChartYAxisVariable:
    'setOtherMetricsCalendarChartYAxisVariable',
  setOtherMetricsLineChartYAxisVariable:
    'setOtherMetricsLineChartYAxisVariable',
};

function financialDashboardDailyReducer(
  state: FinancialDashboardDailyState,
  action: FinancialDashboardDailyDispatch
): FinancialDashboardDailyState {
  switch (action.type) {
    // profit

    // profit -> bar
    case financialDashboardDailyAction.setProfitBarChartYAxisVariable:
      return {
        ...state,
        profitBarChartYAxisVariable: action.payload,
      };

    // profit -> calendar
    case financialDashboardDailyAction.setProfitCalendarChartYAxisVariable:
      return {
        ...state,
        profitCalendarChartYAxisVariable: action.payload,
      };

    // profit -> line
    case financialDashboardDailyAction.setProfitLineChartYAxisVariable:
      return {
        ...state,
        profitLineChartYAxisVariable: action.payload,
      };

    // profit -> pie
    case financialDashboardDailyAction.setProfitPieChartYAxisVariable:
      return {
        ...state,
        profitPieChartYAxisVariable: action.payload,
      };

    // revenue

    // revenue -> bar
    case financialDashboardDailyAction.setRevenueBarChartYAxisVariable:
      return {
        ...state,
        revenueBarChartYAxisVariable: action.payload,
      };

    // revenue -> calendar
    case financialDashboardDailyAction.setRevenueCalendarChartYAxisVariable:
      return {
        ...state,
        revenueCalendarChartYAxisVariable: action.payload,
      };

    // revenue -> line
    case financialDashboardDailyAction.setRevenueLineChartYAxisVariable:
      return {
        ...state,
        revenueLineChartYAxisVariable: action.payload,
      };

    // revenue -> pie
    case financialDashboardDailyAction.setRevenuePieChartYAxisVariable:
      return {
        ...state,
        revenuePieChartYAxisVariable: action.payload,
      };

    // expenses

    // expenses -> bar
    case financialDashboardDailyAction.setExpensesBarChartYAxisVariable:
      return {
        ...state,
        expensesBarChartYAxisVariable: action.payload,
      };

    // expenses -> calendar
    case financialDashboardDailyAction.setExpensesCalendarChartYAxisVariable:
      return {
        ...state,
        expensesCalendarChartYAxisVariable: action.payload,
      };

    // expenses -> line
    case financialDashboardDailyAction.setExpensesLineChartYAxisVariable:
      return {
        ...state,
        expensesLineChartYAxisVariable: action.payload,
      };

    // expenses -> pie
    case financialDashboardDailyAction.setExpensesPieChartYAxisVariable:
      return {
        ...state,
        expensesPieChartYAxisVariable: action.payload,
      };

    // transactions

    // transactions -> bar
    case financialDashboardDailyAction.setTransactionsBarChartYAxisVariable:
      return {
        ...state,
        transactionsBarChartYAxisVariable: action.payload,
      };

    // transactions -> calendar
    case financialDashboardDailyAction.setTransactionsCalendarChartYAxisVariable:
      return {
        ...state,
        transactionsCalendarChartYAxisVariable: action.payload,
      };

    // transactions -> line
    case financialDashboardDailyAction.setTransactionsLineChartYAxisVariable:
      return {
        ...state,
        transactionsLineChartYAxisVariable: action.payload,
      };

    // transactions -> pie
    case financialDashboardDailyAction.setTransactionsPieChartYAxisVariable:
      return {
        ...state,
        transactionsPieChartYAxisVariable: action.payload,
      };

    // other metrics

    // other metrics -> bar
    case financialDashboardDailyAction.setOtherMetricsBarChartYAxisVariable:
      return {
        ...state,
        otherMetricsBarChartYAxisVariable: action.payload,
      };

    // other metrics -> calendar
    case financialDashboardDailyAction.setOtherMetricsCalendarChartYAxisVariable:
      return {
        ...state,
        otherMetricsCalendarChartYAxisVariable: action.payload,
      };

    // other metrics -> line
    case financialDashboardDailyAction.setOtherMetricsLineChartYAxisVariable:
      return {
        ...state,
        otherMetricsLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  financialDashboardDailyAction,
  financialDashboardDailyReducer,
  initialFinancialDashboardDailyState,
};
