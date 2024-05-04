import {
  RepairDashboardAction,
  RepairDashboardDispatch,
  RepairDashboardState,
} from "./types";

const repairDashboardState: RepairDashboardState = {
  repairMetricsCards: {
    dailyCards: [],
    monthlyCards: [],
    yearlyCards: [],
  },
  repairMetricsCharts: {
    daily: {
      bar: {
        revenue: [],
        unitsRepaired: [],
      },
      calendar: {
        revenue: [],
        unitsRepaired: [],
      },
      line: {
        revenue: [],
        unitsRepaired: [],
      },
    },
    monthly: {
      bar: {
        revenue: [],
        unitsRepaired: [],
      },
      calendar: {
        revenue: [],
        unitsRepaired: [],
      },
      line: {
        revenue: [],
        unitsRepaired: [],
      },
    },
    yearly: {
      bar: {
        revenue: [],
        unitsRepaired: [],
      },
      line: {
        revenue: [],
        unitsRepaired: [],
      },
    },
  },
};

const repairDashboardAction: RepairDashboardAction = {
  setRepairMetricsCards: "setRepairMetricsCards",
  setRepairMetricsCharts: "setRepairMetricsCharts",
};

function repairDashboardReducer(
  state: RepairDashboardState,
  action: RepairDashboardDispatch
): RepairDashboardState {
  switch (action.type) {
    case repairDashboardAction.setRepairMetricsCards:
      return { ...state, repairMetricsCards: action.payload };
    case repairDashboardAction.setRepairMetricsCharts:
      return { ...state, repairMetricsCharts: action.payload };
    default:
      return state;
  }
}

export { repairDashboardAction, repairDashboardReducer, repairDashboardState };
