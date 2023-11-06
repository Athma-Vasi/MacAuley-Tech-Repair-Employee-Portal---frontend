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

function repairDashboardYearlyReducer(
  state: RepairDashboardYearlyState,
  action: RepairDashboardYearlyDispatch
): RepairDashboardYearlyState {
  switch (action.type) {
    case repairDashboardYearlyAction.setBarChartYAxisVariable:
      return {
        ...state,
        barChartYAxisVariable: action.payload,
      };

    case repairDashboardYearlyAction.setLineChartYAxisVariable:
      return {
        ...state,
        lineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialRepairDashboardYearlyState,
  repairDashboardYearlyAction,
  repairDashboardYearlyReducer,
};
