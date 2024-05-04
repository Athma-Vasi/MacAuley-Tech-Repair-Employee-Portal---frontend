import { RepairMetricsCards } from "../jsxHelpers";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Month,
  Year,
} from "../types";
import { RepairMetricsCharts } from "./utilsTemp";

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
  repairMetricsCards: RepairMetricsCards;
  repairMetricsCharts: RepairMetricsCharts;
};

type RepairDashboardAction = {
  setRepairMetricsCards: "setRepairMetricsCards";
  setRepairMetricsCharts: "setRepairMetricsCharts";
};

type RepairDashboardDispatch =
  | { type: RepairDashboardAction["setRepairMetricsCards"]; payload: RepairMetricsCards }
  | {
      type: RepairDashboardAction["setRepairMetricsCharts"];
      payload: RepairMetricsCharts;
    };

export type {
  RepairDashboardAction,
  RepairDashboardChildrenProps,
  RepairDashboardDispatch,
  RepairDashboardState,
};
