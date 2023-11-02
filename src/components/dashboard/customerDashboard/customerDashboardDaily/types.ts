import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardDailyState = {
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
};

type CustomerDashboardDailyAction = {
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
};

type CustomerDashboardDailyDispatch =
  | {
      type:
        | CustomerDashboardDailyAction['setOverviewBarChartYAxisVariable']
        | CustomerDashboardDailyAction['setOverviewCalendarChartYAxisVariable']
        | CustomerDashboardDailyAction['setOverviewLineChartYAxisVariable'];

      payload: CustomerOverviewObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewBarChartYAxisVariable']
        | CustomerDashboardDailyAction['setNewLineChartYAxisVariable']
        | CustomerDashboardDailyAction['setReturningBarChartYAxisVariable']
        | CustomerDashboardDailyAction['setReturningLineChartYAxisVariable'];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewCalendarChartYAxisVariable']
        | CustomerDashboardDailyAction['setReturningCalendarChartYAxisVariable'];

      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewPieChartYAxisVariable']
        | CustomerDashboardDailyAction['setReturningPieChartYAxisVariable'];

      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
};
