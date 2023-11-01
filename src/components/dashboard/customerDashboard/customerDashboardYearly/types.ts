import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardYearlyState = {
  newYAxisSelection: CustomerNewReturningObjKey;
  overviewYAxisSelection: CustomerOverviewObjKey;
  returningYAxisSelection: CustomerNewReturningObjKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionObjKey;
};

type CustomerDashboardYearlyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection';
  setOverviewYAxisSelection: 'setOverviewYAxisSelection';
  setReturningYAxisSelection: 'setReturningYAxisSelection';
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection';
};

type CustomerDashboardYearlyDispatch =
  | {
      type: CustomerDashboardYearlyAction['setNewYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewObjKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setReturningYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setChurnRetentionYAxisSelection'];
      payload: CustomerChurnRetentionObjKey;
    };

export type {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
};
