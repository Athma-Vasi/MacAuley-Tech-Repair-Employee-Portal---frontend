import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCustomerMetric,
  Month,
  Year,
} from "../types";

type CustomerDashboardChildrenProps = {
  businessMetrics: BusinessMetric[];
  customerMetric: DashboardCustomerMetric;
  day: string;
  month: string;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  storeLocation: BusinessMetricStoreLocation;
  storeLocationView: BusinessMetricStoreLocation;
  year: Year;
};

export type { CustomerDashboardChildrenProps };
