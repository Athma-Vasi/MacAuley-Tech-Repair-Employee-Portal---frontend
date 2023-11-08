import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';

type CustomerDashboardMonthlyNewState = {
  newBarChartYAxisVariable: CustomerNewReturningObjKey;
  newCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
  newLineChartYAxisVariable: CustomerNewReturningObjKey;
  newPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardMonthlyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable';
  setNewCalendarChartYAxisVariable: 'setNewCalendarChartYAxisVariable';
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable';
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable';
};

type CustomerDashboardMonthlyNewDispatch =
  | {
      type:
        | CustomerDashboardMonthlyNewAction['setNewBarChartYAxisVariable']
        | CustomerDashboardMonthlyNewAction['setNewLineChartYAxisVariable'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardMonthlyNewAction['setNewCalendarChartYAxisVariable'];
      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type: CustomerDashboardMonthlyNewAction['setNewPieChartYAxisVariable'];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardMonthlyNewAction,
  CustomerDashboardMonthlyNewDispatch,
  CustomerDashboardMonthlyNewState,
};
