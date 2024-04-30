import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardRepairMetric,
  Month,
  Year,
} from "../types";

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

export type { RepairDashboardChildrenProps };
