import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
} from '../utils';

type CustomerDashboardYearlyState = {
  newYAxisBarVariablesSelection: CustomerNewReturningObjKey;
  overviewBarChartYAxisVariable: CustomerOverviewObjKey;
  returningYAxisLineBarVariablesSelection: CustomerNewReturningObjKey;
  churnRetentionYAxisSelection: CustomerChurnRetentionObjKey;
};

type CustomerDashboardYearlyAction = {
  setNewYAxisLineBarVariablesSelection: 'setNewYAxisLineBarVariablesSelection';
  setOverviewYAxisVariablesSelection: 'setOverviewYAxisVariablesSelection';
  setReturningYAxisLineBarSelection: 'setReturningYAxisLineBarSelection';
  setChurnRetentionYAxisSelection: 'setChurnRetentionYAxisSelection';
};

type CustomerDashboardYearlyDispatch =
  | {
      type: CustomerDashboardYearlyAction['setNewYAxisLineBarVariablesSelection'];
      payload: CustomerNewReturningObjKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setOverviewYAxisVariablesSelection'];
      payload: CustomerOverviewObjKey;
    }
  | {
      type: CustomerDashboardYearlyAction['setReturningYAxisLineBarSelection'];
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
