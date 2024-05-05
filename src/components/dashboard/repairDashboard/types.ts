import { RepairMetricsCharts } from "./utils";
import { RepairMetricsCards } from "./utilsTSX";

type RepairDashboardState = {
  repairMetricsCards: RepairMetricsCards | null;
  repairMetricsCharts: RepairMetricsCharts | null;
  isLoading: boolean;
  loadingMessage: string;
};

type RepairDashboardAction = {
  setRepairMetricsCards: "setRepairMetricsCards";
  setRepairMetricsCharts: "setRepairMetricsCharts";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type RepairDashboardDispatch =
  | { type: RepairDashboardAction["setRepairMetricsCards"]; payload: RepairMetricsCards }
  | {
      type: RepairDashboardAction["setRepairMetricsCharts"];
      payload: RepairMetricsCharts;
    }
  | { type: RepairDashboardAction["setIsLoading"]; payload: boolean }
  | { type: RepairDashboardAction["setLoadingMessage"]; payload: string };

export type { RepairDashboardAction, RepairDashboardDispatch, RepairDashboardState };
