import {
  RepairDashboardAction,
  RepairDashboardDispatch,
  RepairDashboardState,
} from "./types";

const initialRepairDashboardState: RepairDashboardState = {
  repairMetricsCards: null,
  repairMetricsCharts: null,
  isLoading: false,
  loadingMessage: "",
};

const repairDashboardAction: RepairDashboardAction = {
  setRepairMetricsCards: "setRepairMetricsCards",
  setRepairMetricsCharts: "setRepairMetricsCharts",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
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
    case repairDashboardAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case repairDashboardAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };

    default:
      return state;
  }
}

export { initialRepairDashboardState, repairDashboardAction, repairDashboardReducer };
