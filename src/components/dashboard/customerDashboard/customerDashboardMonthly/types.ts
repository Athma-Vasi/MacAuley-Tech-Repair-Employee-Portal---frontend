import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardMonthlyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  // overview -> calendar
  overviewCalendarChartYAxisVariable: CustomerOverviewObjKey;
  // overview -> line
  overviewLineChartYAxisVariable: CustomerOverviewObjKey;

  // new
  // new -> bar
  newBarChartYAxisVariable: CustomerNewReturningObjKey;
  // new -> calendar
  newCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
  // new -> line
  newLineChartYAxisVariable: CustomerNewReturningObjKey;
  // new -> pie
  newPieChartYAxisVariable: CustomerNewReturningPieObjKey;

  // returning
  // returning -> bar
  returningBarChartYAxisVariable: CustomerNewReturningObjKey;
  // returning -> calendar
  returningCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
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

type CustomerDashboardMonthlyAction = {
  // overview
  setOverviewBarChartYAxisVariable: 'setOverviewBarChartYAxisVariable';
  setOverviewCalendarChartYAxisVariable: 'setOverviewCalendarChartYAxisVariable';
  setOverviewLineChartYAxisVariable: 'setOverviewLineChartYAxisVariable';

  // new
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable';
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable';
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable';
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable';

  // returning
  setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable';
  setReturningCalendarChartYAxisVariable: 'setReturningCalendarChartYAxisVariable';
  setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable';
  setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable';

  // churn retention
  setChurnRetentionBarChartYAxisVariable: 'setChurnRetentionBarChartYAxisVariable';
  setChurnRetentionLineChartYAxisVariable: 'setChurnRetentionLineChartYAxisVariable';
};

type CustomerDashboardMonthlyDispatch =
  | {
      type:
        | CustomerDashboardMonthlyAction['setOverviewBarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setOverviewCalendarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setOverviewLineChartYAxisVariable'];

      payload: CustomerOverviewObjKey;
    }
  | {
      type:
        | CustomerDashboardMonthlyAction['setNewBarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setNewLineChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setReturningBarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setReturningLineChartYAxisVariable'];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type:
        | CustomerDashboardMonthlyAction['setNewCalendarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setReturningCalendarChartYAxisVariable'];

      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type:
        | CustomerDashboardMonthlyAction['setNewPieChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setReturningPieChartYAxisVariable'];

      payload: CustomerNewReturningPieObjKey;
    }
  | {
      type:
        | CustomerDashboardMonthlyAction['setChurnRetentionBarChartYAxisVariable']
        | CustomerDashboardMonthlyAction['setChurnRetentionLineChartYAxisVariable'];

      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
};
