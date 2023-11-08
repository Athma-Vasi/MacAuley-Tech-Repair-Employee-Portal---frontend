import {
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';

type CustomerDashboardMonthlyReturningState = {
  returningBarChartYAxisVariable: CustomerNewReturningObjKey;
  returningCalendarChartYAxisVariable: CustomerNewReturningCalendarObjKey;
  returningLineChartYAxisVariable: CustomerNewReturningObjKey;
  returningPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardMonthlyReturningAction = {
  setReturningBarChartYAxisVariable: 'setReturningBarChartYAxisVariable';
  setReturningCalendarChartYAxisVariable: 'setReturningCalendarChartYAxisVariable';
  setReturningLineChartYAxisVariable: 'setReturningLineChartYAxisVariable';
  setReturningPieChartYAxisVariable: 'setReturningPieChartYAxisVariable';
};

type CustomerDashboardMonthlyReturningDispatch =
  | {
      type:
        | CustomerDashboardMonthlyReturningAction['setReturningBarChartYAxisVariable']
        | CustomerDashboardMonthlyReturningAction['setReturningLineChartYAxisVariable'];

      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardMonthlyReturningAction['setReturningCalendarChartYAxisVariable'];
      payload: CustomerNewReturningCalendarObjKey;
    }
  | {
      type: CustomerDashboardMonthlyReturningAction['setReturningPieChartYAxisVariable'];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardMonthlyReturningAction,
  CustomerDashboardMonthlyReturningDispatch,
  CustomerDashboardMonthlyReturningState,
};
