import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardProductMetric,
  Month,
  Year,
} from "../types";

type ProductDashboardChildrenProps = {
  businessMetrics: BusinessMetric[];
  day: string;
  month: string;
  productMetric: DashboardProductMetric;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  storeLocation: BusinessMetricStoreLocation;
  storeLocationView: BusinessMetricStoreLocation;
  year: Year;
};

export type { ProductDashboardChildrenProps };
