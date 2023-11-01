import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardMonthlyState = {
  newYAxisSelection: CustomerNewReturningObjKey;
  overviewYAxisSelection: CustomerOverviewObjKey;
  returningYAxisSelection: CustomerNewReturningObjKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionObjKey;
};

type CustomerDashboardMonthlyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection';
  setOverviewYAxisSelection: 'setOverviewYAxisSelection';
  setReturningYAxisSelection: 'setReturningYAxisSelection';
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection';
};

type CustomerDashboardMonthlyDispatch =
  | {
      type: CustomerDashboardMonthlyAction['setNewYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewObjKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setReturningYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setChurnRetentionYAxisSelection'];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
};
