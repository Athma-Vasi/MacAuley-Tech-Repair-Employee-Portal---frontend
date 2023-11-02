import {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
} from './types';

const initialCustomerDashboardYearlyState: CustomerDashboardYearlyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariable: 'overview',
  // overview -> line
  overviewLineChartYAxisVariable: 'overview',

  // new
  // new -> bar
  newBarChartYAxisVariable: 'total',
  // new -> line
  newLineChartYAxisVariable: 'total',
  // new -> pie
  newPieChartYAxisVariable: 'overview',

  // returning
  // returning -> bar
  returningBarChartYAxisVariable: 'total',
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

const customerDashboardYearlyAction: CustomerDashboardYearlyAction = {
  // overview
  setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable',
  setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable',

  // new
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable',
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable',
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable',

  // returning
  setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable',
  setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable',
  setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable',

  // churn retention
  setChurnRetentionBarChartYAxisVariable:
    'setChurnRetentionBarChartYAxisVariable',
  setChurnRetentionLineChartYAxisVariable:
    'setChurnRetentionLineChartYAxisVariable',
};

function customerDashboardYearlyReducer(
  state: CustomerDashboardYearlyState,
  action: CustomerDashboardYearlyDispatch
): CustomerDashboardYearlyState {
  switch (action.type) {
    // overview

    // overview -> bar
    case customerDashboardYearlyAction.setOverviewBarChartYAxisVariable:
      return {
        ...state,
        overviewBarChartYAxisVariable: action.payload,
      };

    // overview -> line
    case customerDashboardYearlyAction.setOverviewLineChartYAxisVariable:
      return {
        ...state,
        overviewLineChartYAxisVariable: action.payload,
      };

    // new

    // new -> bar
    case customerDashboardYearlyAction.setNewBarChartYAxisVariable:
      return {
        ...state,
        newBarChartYAxisVariable: action.payload,
      };

    // new -> line
    case customerDashboardYearlyAction.setNewLineChartYAxisVariable:
      return {
        ...state,
        newLineChartYAxisVariable: action.payload,
      };

    // new -> pie
    case customerDashboardYearlyAction.setNewPieChartYAxisVariable:
      return {
        ...state,
        newPieChartYAxisVariable: action.payload,
      };

    // returning

    // returning -> bar
    case customerDashboardYearlyAction.setReturningBarChartYAxisVariable:
      return {
        ...state,
        returningBarChartYAxisVariable: action.payload,
      };

    // returning -> line
    case customerDashboardYearlyAction.setReturningLineChartYAxisVariable:
      return {
        ...state,
        returningLineChartYAxisVariable: action.payload,
      };

    // returning -> pie
    case customerDashboardYearlyAction.setReturningPieChartYAxisVariable:
      return {
        ...state,
        returningPieChartYAxisVariable: action.payload,
      };

    // churn retention

    // churn retention -> bar
    case customerDashboardYearlyAction.setChurnRetentionBarChartYAxisVariable:
      return {
        ...state,
        churnRetentionBarChartYAxisVariable: action.payload,
      };

    // churn retention -> line
    case customerDashboardYearlyAction.setChurnRetentionLineChartYAxisVariable:
      return {
        ...state,
        churnRetentionLineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardYearlyAction,
  customerDashboardYearlyReducer,
  initialCustomerDashboardYearlyState,
};
