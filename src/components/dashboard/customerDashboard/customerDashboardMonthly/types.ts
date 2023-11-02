import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardMonthlyState = {
  newYAxisBarVariablesSelection: CustomerNewReturningObjKey;
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  returningYAxisLineBarVariablesSelection: CustomerNewReturningObjKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionObjKey;
};

type CustomerDashboardMonthlyAction = {
  setNewYAxisLineBarVariablesSelection: 'setNewYAxisLineBarVariablesSelection';
  setOverviewYAxisVariablesSelection: 'setOverviewYAxisVariablesSelection';
  setReturningYAxisLineBarSelection: 'setReturningYAxisLineBarSelection';
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection';
};

type CustomerDashboardMonthlyDispatch =
  | {
      type: CustomerDashboardMonthlyAction['setNewYAxisLineBarVariablesSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setOverviewYAxisVariablesSelection'];
      payload: CustomerOverviewObjKey;
    }
  | {
      type: CustomerDashboardMonthlyAction['setReturningYAxisLineBarSelection'];
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
