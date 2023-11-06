import {
  RepairDashboardDailyAction,
  RepairDashboardDailyDispatch,
  RepairDashboardDailyState,
} from './types';

const initialRepairDashboardDailyState: RepairDashboardDailyState = {
  barChartYAxisVariable: 'revenue',
  calendarChartYAxisVariable: 'revenue',
  lineChartYAxisVariable: 'revenue',
};

const repairDashboardDailyAction: RepairDashboardDailyAction = {
  setBarChartYAxisVariable: 'setBarChartYAxisVariable',
  setCalendarChartYAxisVariable: 'setCalendarChartYAxisVariable',
  setLineChartYAxisVariable: 'setLineChartYAxisVariable',
};

function repairDashboardDailyReducer(
  state: RepairDashboardDailyState,
  action: RepairDashboardDailyDispatch
): RepairDashboardDailyState {
  switch (action.type) {
    case repairDashboardDailyAction.setBarChartYAxisVariable:
      return {
        ...state,
        barChartYAxisVariable: action.payload,
      };

    case repairDashboardDailyAction.setCalendarChartYAxisVariable:
      return {
        ...state,
        calendarChartYAxisVariable: action.payload,
      };

    case repairDashboardDailyAction.setLineChartYAxisVariable:
      return {
        ...state,
        lineChartYAxisVariable: action.payload,
      };

    default:
      return state;
  }
}

export {
  initialRepairDashboardDailyState,
  repairDashboardDailyAction,
  repairDashboardDailyReducer,
};
