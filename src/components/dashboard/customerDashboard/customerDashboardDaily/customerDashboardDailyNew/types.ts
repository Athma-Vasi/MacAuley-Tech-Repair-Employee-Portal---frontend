import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';

type CustomerDashboardDailyNewState = {
  newBarChartYAxisVariable: CustomerNewReturningObjKey;
  newCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
  newLineChartYAxisVariable: CustomerNewReturningObjKey;
  newPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardDailyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable';
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable';
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable';
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable';
};

type CustomerDashboardDailyNewDispatch =
  | {
      type:
        | CustomerDashboardDailyNewAction['setNewBarChartYAxisVariable']
        | CustomerDashboardDailyNewAction['setNewLineChartYAxisVariable'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardDailyNewAction['setNewCalendarChartYAxisVariable'];
      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type: CustomerDashboardDailyNewAction['setNewPieChartYAxisVariable'];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardDailyNewAction,
  CustomerDashboardDailyNewDispatch,
  CustomerDashboardDailyNewState,
};
