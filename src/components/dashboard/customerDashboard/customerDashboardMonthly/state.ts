import {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
} from './types';

const initialCustomerDashboardMonthlyState: CustomerDashboardMonthlyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariable: 'overview',
  // overview -> calendar
  overviewCalendarChartYAxisVariable: 'overview',
  // overview -> line
  overviewLineChartYAxisVariable: 'overview',

  // new
  // new -> bar
  newBarChartYAxisVariable: 'total',
  // new -> calendar
  newCalendarChartYAxisVariable: 'total',
  // new -> line
  newLineChartYAxisVariable: 'total',
  // new -> pie
  newPieChartYAxisVariable: 'overview',

  // returning
  // returning -> bar
  returningBarChartYAxisVariable: 'total',
  // returning -> calendar
  returningCalendarChartYAxisVariable: 'total',
  // returning -> line
  returningLineChartYAxisVariable: 'total',
  // returning -> pie
  returningPieChartYAxisVariable: 'overview',

  // churn retention
  // churn retention -> bar
  churnRetentionBarChartYAxisVariable: 'overview',
  // churn retention -> line
  churnRetentionLineChartYAxisVariable: 'overview',
};

const customerDashboardMonthlyAction: CustomerDashboardMonthlyAction = {
  // overview
  setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable',
  setOverviewCalendarChartYAxisVariable:
    'setOverviewCalendarChartYAxisVariable',
  setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable',

  // new
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable',
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable',
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable',
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable',

  // returning
  setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable',
  setReturningCalendarChartYAxisVariable:
    'setReturningCalendarChartYAxisVariable',
  setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable',
  setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable',

  // churn retention
  setChurnRetentionBarChartYAxisVariable:
    'setChurnRetentionBarChartYAxisVariable',
  setChurnRetentionLineChartYAxisVariable:
    'setChurnRetentionLineChartYAxisVariable',
};

function customerDashboardMonthlyReducer(
  state: CustomerDashboardMonthlyState,
  action: CustomerDashboardMonthlyDispatch
): CustomerDashboardMonthlyState {
  switch (action.type) {
    // overview

    // overview -> bar
    case customerDashboardMonthlyAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    // overview -> calendar
    case customerDashboardMonthlyAction.setOverviewCalendarChartYAxisVariable:
      return {
        ...state,
        overviewCalendarChartYAxisVariable: action.payload,
      };

    // overview -> line
    case customerDashboardMonthlyAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };

    // new

    // new -> bar
    case customerDashboardMonthlyAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };

    // new -> calendar
    case customerDashboardMonthlyAction.setNewCalendarChartYAxisVariable:
      return {
        ...state,
        newCalendarChartYAxisVariable: action.payload,
      };

    // new -> line
    case customerDashboardMonthlyAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };

    // new -> pie
    case customerDashboardMonthlyAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };

    // returning

    // returning -> bar
    case customerDashboardMonthlyAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };

    // returning -> calendar
    case customerDashboardMonthlyAction.setReturningCalendarChartYAxisVariable:
      return {
        ...state,
        returningCalendarChartYAxisVariable: action.payload,
      };

    // returning -> line
    case customerDashboardMonthlyAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };

    // returning -> pie
    case customerDashboardMonthlyAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
      };

    // churn retention

    // churn retention -> bar
    case customerDashboardMonthlyAction.setChurnRetentionBarChartYAxisVariable:
      return {
        ...state,
        churnRetentionBarChartYAxisVariable: action.payload,
      };

    // churn retention -> line
    case customerDashboardMonthlyAction.setChurnRetentionLineChartYAxisVariable:
      return {
        ...state,
        churnRetentionLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardMonthlyAction,
  customerDashboardMonthlyReducer,
  initialCustomerDashboardMonthlyState,
};
