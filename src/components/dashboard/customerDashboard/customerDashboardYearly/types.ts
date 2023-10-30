import {
  CustomerChurnRetentionMapKey,
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
} from '../utils';

type CustomerDashboardYearlyState = {
  newYAxisSelection: CustomerNewMapKey;
  overviewYAxisSelection: CustomerOverviewMapKey;
  returningYAxisSelection: CustomerReturningMapKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionMapKey;
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
      payload: CustomerNewMapKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewMapKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setReturningYAxisSelection'];
      payload: CustomerReturningMapKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setChurnRetentionYAxisSelection'];
      payload: CustomerChurnRetentionMapKey;
    };

export type {
  CustomerDashboardYearlyAction,
  CustomerDashboardYearlyDispatch,
  CustomerDashboardYearlyState,
};
