import {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
} from './types';

const initialCustomerDashboardDailyState: CustomerDashboardDailyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariables: 'overview',
  // overview -> calendar
  overviewCalendarChartYAxisVariables: 'overview',
  // overview -> line
  overviewLineChartYAxisVariables: 'overview',

  // new
  // new -> bar
  newBarChartYAxisVariables: 'total',
  // new -> calendar
  newCalendarChartYAxisVariables: 'total',
  // new -> line
  newLineChartYAxisVariables: 'total',
  // new -> pie
  newPieChartYAxisVariables: 'overview',

  // returning
  // returning -> bar
  returningBarChartYAxisVariables: 'total',
  // returning -> calendar
  returningCalendarChartYAxisVariables: 'total',
  // returning -> line
  returningLineChartYAxisVariables: 'total',
  // returning -> pie
  returningPieChartYAxisVariables: 'overview',
};

const customerDashboardDailyAction: CustomerDashboardDailyAction = {
  // overview
  setOverviewBarChartYAxisVariables: 'setOverviewBarChartYAxisVariables',
  setOverviewCalendarChartYAxisVariables:
    'setOverviewCalendarChartYAxisVariables',
  setOverviewLineChartYAxisVariables: 'setOverviewLineChartYAxisVariables',

  // new
  setNewBarChartYAxisVariables: 'setNewBarChartYAxisVariables',
  setNewCalendarChartYAxisVariables: 'setNewCalendarChartYAxisVariables',
  setNewLineChartYAxisVariables: 'setNewLineChartYAxisVariables',
  setNewPieChartYAxisVariables: 'setNewPieChartYAxisVariables',

  // returning
  setReturningBarChartYAxisVariables: 'setReturningBarChartYAxisVariables',
  setReturningCalendarChartYAxisVariables:
    'setReturningCalendarChartYAxisVariables',
  setReturningLineChartYAxisVariables: 'setReturningLineChartYAxisVariables',
  setReturningPieChartYAxisVariables: 'setReturningPieChartYAxisVariables',
};

function customerDashboardDailyReducer(
  state: CustomerDashboardDailyState,
  action: CustomerDashboardDailyDispatch
): CustomerDashboardDailyState {
  switch (action.type) {
    // overview

    // overview -> bar
    case customerDashboardDailyAction.setOverviewBarChartYAxisVariables:
      return {
        ...state,
        overviewBarChartYAxisVariables: action.payload,
      };

    // overview -> calendar
    case customerDashboardDailyAction.setOverviewCalendarChartYAxisVariables:
      return {
        ...state,
        overviewCalendarChartYAxisVariables: action.payload,
      };

    // overview -> line
    case customerDashboardDailyAction.setOverviewLineChartYAxisVariables:
      return {
        ...state,
        overviewLineChartYAxisVariables: action.payload,
      };

    // new

    // new -> bar
    case customerDashboardDailyAction.setNewBarChartYAxisVariables:
      return {
        ...state,
        newBarChartYAxisVariables: action.payload,
      };

    // new -> calendar
    case customerDashboardDailyAction.setNewCalendarChartYAxisVariables:
      return {
        ...state,
        newCalendarChartYAxisVariables: action.payload,
      };

    // new -> line
    case customerDashboardDailyAction.setNewLineChartYAxisVariables:
      return {
        ...state,
        newLineChartYAxisVariables: action.payload,
      };

    // new -> pie
    case customerDashboardDailyAction.setNewPieChartYAxisVariables:
      return {
        ...state,
        newPieChartYAxisVariables: action.payload,
      };

    // returning

    // returning -> bar
    case customerDashboardDailyAction.setReturningBarChartYAxisVariables:
      return {
        ...state,
        returningBarChartYAxisVariables: action.payload,
      };

    // returning -> calendar
    case customerDashboardDailyAction.setReturningCalendarChartYAxisVariables:
      return {
        ...state,
        returningCalendarChartYAxisVariables: action.payload,
      };

    // returning -> line
    case customerDashboardDailyAction.setReturningLineChartYAxisVariables:
      return {
        ...state,
        returningLineChartYAxisVariables: action.payload,
      };

    // returning -> pie
    case customerDashboardDailyAction.setReturningPieChartYAxisVariables:
      return {
        ...state,
        returningPieChartYAxisVariables: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardDailyAction,
  customerDashboardDailyReducer,
  initialCustomerDashboardDailyState,
};
