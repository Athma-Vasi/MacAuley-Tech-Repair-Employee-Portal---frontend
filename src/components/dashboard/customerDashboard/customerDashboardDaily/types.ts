import { CustomerNewReturningObjKey, CustomerOverviewObjKey } from '../utils';

type CustomerDashboardDailyState = {
  newYAxisSelection: CustomerNewReturningObjKey;
  overviewYAxisSelection: CustomerOverviewObjKey;
  returningYAxisSelection: CustomerNewReturningObjKey;
};

type CustomerDashboardDailyAction = {
  setNewYAxisSelection: 'setNewYAxisSelection';
  setOverviewYAxisSelection: 'setOverviewYAxisSelection';
  setReturningYAxisSelection: 'setReturningYAxisSelection';
};

type CustomerDashboardDailyDispatch =
  | {
      type: CustomerDashboardDailyAction['setNewYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardDailyAction['setOverviewYAxisSelection'];
      payload: CustomerOverviewObjKey;
    }
  | {
      type: CustomerDashboardDailyAction['setReturningYAxisSelection'];
      payload: CustomerNewReturningObjKey;
    };

export type {
  CustomerDashboardDailyAction,
  CustomerDashboardDailyDispatch,
  CustomerDashboardDailyState,
};
