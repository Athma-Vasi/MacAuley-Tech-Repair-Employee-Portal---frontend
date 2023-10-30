import {
  CustomerChurnRetentionMapKey,
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
} from '../utils';

type CustomerDashboardMonthlyState = {
  newYAxisSelection: CustomerNewMapKey;
  overviewYAxisSelection: CustomerOverviewMapKey;
  returningYAxisSelection: CustomerReturningMapKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionMapKey;
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
      payload: CustomerNewMapKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewMapKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setReturningYAxisSelection'];
      payload: CustomerReturningMapKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setChurnRetentionYAxisSelection'];
      payload: CustomerChurnRetentionMapKey;
    };

export type {
  CustomerDashboardMonthlyAction,
  CustomerDashboardMonthlyDispatch,
  CustomerDashboardMonthlyState,
};
