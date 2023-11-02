import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardYearlyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  // overview -> line
  overviewLineChartYAxisVariable: CustomerOverviewObjKey;

  // new
  // new -> bar
  newBarChartYAxisVariable: CustomerNewReturningObjKey;
  // new -> line
  newLineChartYAxisVariable: CustomerNewReturningObjKey;
  // new -> pie
  newPieChartYAxisVariable: CustomerNewReturningPieObjKey;

  // returning
  // returning -> bar
  returningBarChartYAxisVariable: CustomerNewReturningObjKey;
  // returning -> line
  returningLineChartYAxisVariable: CustomerNewReturningObjKey;
  // returning -> pie
  returningPieChartYAxisVariable: CustomerNewReturningPieObjKey;

  // churn retention
  // churn retention -> bar
  churnRetentionBarChartYAxisVariable: CustomerChurnRetentionObjKey;
  // churn retention -> line
  churnRetentionLineChartYAxisVariable: CustomerChurnRetentionObjKey;
};

type CustomerDashboardYearlyAction = {
  // overview
  setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable';
  setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable';

  // new
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable';
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable';
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable';

  // returning
  setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable';
  setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable';
  setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable';

  // churn retention
  setChurnRetentionBarChartYAxisVariable: 'setChurnRetentionBarChartYAxisVariable';
  setChurnRetentionLineChartYAxisVariable: 'setChurnRetentionLineChartYAxisVariable';
};

type CustomerDashboardYearlyDispatch =
  | {
      type:
        | CustomerDashboardYearlyAction['setOverviewBarChartYAxisVariable']
        | CustomerDashboardYearlyAction['setOverviewLineChartYAxisVariable'];

      payload: CustomerOverviewObjKey;
    }
  | {
      type:
        | CustomerDashboardYearlyAction['setNewBarChartYAxisVariable']
        | CustomerDashboardYearlyAction['setNewLineChartYAxisVariable']
        | CustomerDashboardYearlyAction['setReturningBarChartYAxisVariable']
        | CustomerDashboardYearlyAction['setReturningLineChartYAxisVariable'];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type:
        | CustomerDashboardYearlyAction['setNewPieChartYAxisVariable']
        | CustomerDashboardYearlyAction['setReturningPieChartYAxisVariable'];

      payload: CustomerNewReturningPieObjKey;
    }
  | {
      type:
        | CustomerDashboardYearlyAction['setChurnRetentionBarChartYAxisVariable']
        | CustomerDashboardYearlyAction['setChurnRetentionLineChartYAxisVariable'];

      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
};
