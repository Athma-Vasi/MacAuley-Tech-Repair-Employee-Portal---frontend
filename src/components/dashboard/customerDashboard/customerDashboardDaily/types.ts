import {
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
} from '../utils';

type CustomerDashboardDailyState = {
  newYAxisSelection: CustomerNewMapKey;
  overviewYAxisSelection: CustomerOverviewMapKey;
  returningYAxisSelection: CustomerReturningMapKey;
};

type CustomerDashboardDailyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection';
  setOverviewYAxisSelection: 'setOverviewYAxisSelection';
  setReturningYAxisSelection: 'setReturningYAxisSelection';
};

type CustomerDashboardDailyDispatch =
  | {
      type: CustomerDashboardDailyAction['setNewYAxisSelection'];
      payload: CustomerNewMapKey;
    }
  | {
      type: CustomerDashboardDailyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewMapKey;
    }
  | {
      type: CustomerDashboardDailyAction['setReturningYAxisSelection'];
      payload: CustomerReturningMapKey;
    };

export type {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
};
