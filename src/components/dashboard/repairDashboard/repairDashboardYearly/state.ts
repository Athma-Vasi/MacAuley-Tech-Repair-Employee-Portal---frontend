import {
  RepairDashboardYearlyAction,
  RepairDashboardYearlyDispatch,
  RepairDashboardYearlyState,
} from './types';

const initialRepairDashboardYearlyState: RepairDashboardYearlyState = {
  barChartYAxisVariable: 'revenue',
  lineChartYAxisVariable: 'revenue',
};

const repairDashboardYearlyAction: RepairDashboardYearlyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable',
  setLineChartYAxisVariable: 'setLineChartYAxisVariable',
};

function setBarChartYAxisVariable_RepairDashboardYearly(
  state: RepairDashboardYearlyState,
  action: RepairDashboardYearlyDispatch
): RepairDashboardYearlyState {
  return {
    ...state,
    barChartYAxisVariable: action.payload,
  };
}

function setLineChartYAxisVariable_RepairDashboardYearly(
  state: RepairDashboardYearlyState,
  action: RepairDashboardYearlyDispatch
): RepairDashboardYearlyState {
  return {
    ...state,
    lineChartYAxisVariable: action.payload,
  };
}

const repairDashboardYearlyReducerMap = new Map<
  RepairDashboardYearlyAction[keyof RepairDashboardYearlyAction],
  (
    state: RepairDashboardYearlyState,
    action: RepairDashboardYearlyDispatch
  ) => RepairDashboardYearlyState
>([
  [
    repairDashboardYearlyAction.setBarChartYAxisVariable,
    setBarChartYAxisVariable_RepairDashboardYearly,
  ],
  [
    repairDashboardYearlyAction.setLineChartYAxisVariable,
    setLineChartYAxisVariable_RepairDashboardYearly,
  ],
]);

// function repairDashboardYearlyReducer(
//   state: RepairDashboardYearlyState,
//   action: RepairDashboardYearlyDispatch
// ): RepairDashboardYearlyState {
//   switch (action.type) {
//     case repairDashboardYearlyAction.setBarChartYAxisVariable:
//       return {
//         ...state,
//         barChartYAxisVariable: action.payload,
//       };

//     case repairDashboardYearlyAction.setLineChartYAxisVariable:
//       return {
//         ...state,
//         lineChartYAxisVariable: action.payload,
//       };

//     default:
//       return state;
//   }
// }

function repairDashboardYearlyReducer(
  state: RepairDashboardYearlyState,
  action: RepairDashboardYearlyDispatch
): RepairDashboardYearlyState {
  const reducer = repairDashboardYearlyReducerMap.get(action.type);
  return reducer ? reducer(state, action) : state;
}

export {
  initialRepairDashboardYearlyState,
  repairDashboardYearlyAction,
  repairDashboardYearlyReducer,
};
