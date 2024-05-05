import { RepairMetricsCards } from "../jsxHelpers";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Month,
  Year,
} from "../types";
import { RepairMetricsCharts } from "./utils";

type RepairDashboardChildrenProps = {
  businessMetrics: BusinessMetric[];
  day: string;
  repairMetric: DashboardRepairMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  storeLocationView: BusinessMetricStoreLocation;
};

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

export type {
  RepairDashboardAction,
  RepairDashboardChildrenProps,
  RepairDashboardDispatch,
  RepairDashboardState,
};
