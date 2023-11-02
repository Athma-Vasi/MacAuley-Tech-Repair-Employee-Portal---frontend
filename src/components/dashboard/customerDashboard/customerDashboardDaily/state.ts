import {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
} from './types';

const initialCustomerDashboardDailyState: CustomerDashboardDailyState = {
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
};

const customerDashboardDailyAction: CustomerDashboardDailyAction = {
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
};

function customerDashboardDailyReducer(
  state: CustomerDashboardDailyState,
  action: CustomerDashboardDailyDispatch
): CustomerDashboardDailyState {
  switch (action.type) {
    // overview

    // overview -> bar
    case customerDashboardDailyAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    // overview -> calendar
    case customerDashboardDailyAction.setOverviewCalendarChartYAxisVariable:
      return {
        ...state,
        overviewCalendarChartYAxisVariable: action.payload,
      };

    // overview -> line
    case customerDashboardDailyAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };

    // new

    // new -> bar
    case customerDashboardDailyAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };

    // new -> calendar
    case customerDashboardDailyAction.setNewCalendarChartYAxisVariable:
      return {
        ...state,
        newCalendarChartYAxisVariable: action.payload,
      };

    // new -> line
    case customerDashboardDailyAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };

    // new -> pie
    case customerDashboardDailyAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };

    // returning

    // returning -> bar
    case customerDashboardDailyAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };

    // returning -> calendar
    case customerDashboardDailyAction.setReturningCalendarChartYAxisVariable:
      return {
        ...state,
        returningCalendarChartYAxisVariable: action.payload,
      };

    // returning -> line
    case customerDashboardDailyAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };

    // returning -> pie
    case customerDashboardDailyAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
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
