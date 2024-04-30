import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardFinancialMetric,
  Month,
  Year,
} from "../types";

type FinancialDashboardChildrenProps = {
  businessMetrics: BusinessMetric[];
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: string;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  storeLocation: BusinessMetricStoreLocation;
  storeLocationView: BusinessMetricStoreLocation;
  year: Year;
};

export type { FinancialDashboardChildrenProps };
