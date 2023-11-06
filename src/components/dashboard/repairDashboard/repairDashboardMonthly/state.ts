import {
  RepairDashboardMonthlyAction,
  RepairDashboardMonthlyDispatch,
  RepairDashboardMonthlyState,
} from './types';

const initialRepairDashboardMonthlyState: RepairDashboardMonthlyState = {
  barChartYAxisVariable: 'revenue',
  calendarChartYAxisVariable: 'revenue',
  lineChartYAxisVariable: 'revenue',
};

const repairDashboardMonthlyAction: RepairDashboardMonthlyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable',
  setCalendarChartYAxisVariable: 'setCalendarChartYAxisVariable',
  setLineChartYAxisVariable: 'setLineChartYAxisVariable',
};

function repairDashboardMonthlyReducer(
  state: RepairDashboardMonthlyState,
  action: RepairDashboardMonthlyDispatch
): RepairDashboardMonthlyState {
  switch (action.type) {
    case repairDashboardMonthlyAction.setBarChartYAxisVariable:
      return {
        ...state,
        barChartYAxisVariable: action.payload,
      };

    case repairDashboardMonthlyAction.setCalendarChartYAxisVariable:
      return {
        ...state,
        calendarChartYAxisVariable: action.payload,
      };

    case repairDashboardMonthlyAction.setLineChartYAxisVariable:
      return {
        ...state,
        lineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialRepairDashboardMonthlyState,
  repairDashboardMonthlyAction,
  repairDashboardMonthlyReducer,
};
