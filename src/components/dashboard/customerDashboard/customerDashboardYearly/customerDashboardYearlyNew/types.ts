import {
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
} from '../../utils';

type CustomerDashboardYearlyNewState = {
  newBarChartYAxisVariable: CustomerNewReturningObjKey;
  newLineChartYAxisVariable: CustomerNewReturningObjKey;
  newPieChartYAxisVariable: CustomerNewReturningPieObjKey;
};

type CustomerDashboardYearlyNewAction = {
  setNewBarChartYAxisVariable: 'setNewBarChartYAxisVariable';
  setNewLineChartYAxisVariable: 'setNewLineChartYAxisVariable';
  setNewPieChartYAxisVariable: 'setNewPieChartYAxisVariable';
};

type CustomerDashboardYearlyNewDispatch =
  | {
      type:
        | CustomerDashboardYearlyNewAction['setNewBarChartYAxisVariable']
        | CustomerDashboardYearlyNewAction['setNewLineChartYAxisVariable'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardYearlyNewAction['setNewPieChartYAxisVariable'];
      payload: CustomerNewReturningPieObjKey;
    };

export type {
  CustomerDashboardYearlyNewAction,
  CustomerDashboardYearlyNewDispatch,
  CustomerDashboardYearlyNewState,
};
