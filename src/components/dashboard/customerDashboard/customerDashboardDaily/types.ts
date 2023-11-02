import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardDailyState = {
  // overview
  // overview -> bar
  overviewBarChartYAxisVariables: CustomerOverviewObjKey;
  // overview -> calendar
  overviewCalendarChartYAxisVariables: CustomerOverviewObjKey;
  // overview -> line
  overviewLineChartYAxisVariables: CustomerOverviewObjKey;

  // new
  // new -> bar
  newBarChartYAxisVariables: CustomerNewReturningObjKey;
  // new -> calendar
  newCalendarChartYAxisVariables: CustomerNewReturningCalendarObjKey;
  // new -> line
  newLineChartYAxisVariables: CustomerNewReturningObjKey;
  // new -> pie
  newPieChartYAxisVariables: CustomerNewReturningPieObjKey;

  // returning
  // returning -> bar
  returningBarChartYAxisVariables: CustomerNewReturningObjKey;
  // returning -> calendar
  returningCalendarChartYAxisVariables: CustomerNewReturningCalendarObjKey;
  // returning -> line
  returningLineChartYAxisVariables: CustomerNewReturningObjKey;
  // returning -> pie
  returningPieChartYAxisVariables: CustomerNewReturningPieObjKey;
};

type CustomerDashboardDailyAction = {
  // overview
  setOverviewBarChartYAxisVariables: 'setOverviewBarChartYAxisVariables';
  setOverviewCalendarChartYAxisVariables: 'setOverviewCalendarChartYAxisVariables';
  setOverviewLineChartYAxisVariables: 'setOverviewLineChartYAxisVariables';

  // new
  setNewBarChartYAxisVariables: 'setNewBarChartYAxisVariables';
  setNewCalendarChartYAxisVariables: 'setNewCalendarChartYAxisVariables';
  setNewLineChartYAxisVariables: 'setNewLineChartYAxisVariables';
  setNewPieChartYAxisVariables: 'setNewPieChartYAxisVariables';

  // returning
  setReturningBarChartYAxisVariables: 'setReturningBarChartYAxisVariables';
  setReturningCalendarChartYAxisVariables: 'setReturningCalendarChartYAxisVariables';
  setReturningLineChartYAxisVariables: 'setReturningLineChartYAxisVariables';
  setReturningPieChartYAxisVariables: 'setReturningPieChartYAxisVariables';
};

type CustomerDashboardDailyDispatch =
  | {
      type:
        | CustomerDashboardDailyAction['setOverviewBarChartYAxisVariables']
        | CustomerDashboardDailyAction['setOverviewCalendarChartYAxisVariables']
        | CustomerDashboardDailyAction['setOverviewLineChartYAxisVariables'];

      payload: CustomerOverviewObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewBarChartYAxisVariables']
        | CustomerDashboardDailyAction['setNewLineChartYAxisVariables']
        | CustomerDashboardDailyAction['setReturningBarChartYAxisVariables']
        | CustomerDashboardDailyAction['setReturningLineChartYAxisVariables'];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewCalendarChartYAxisVariables']
        | CustomerDashboardDailyAction['setReturningCalendarChartYAxisVariables'];

      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type:
        | CustomerDashboardDailyAction['setNewPieChartYAxisVariables']
        | CustomerDashboardDailyAction['setReturningPieChartYAxisVariables'];

      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
};
