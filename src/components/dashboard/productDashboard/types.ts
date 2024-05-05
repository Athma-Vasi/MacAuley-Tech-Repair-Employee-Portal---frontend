import { ProductMetricsCards } from "../utilsTSX";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardProductMetric,
  Month,
  Year,
} from "../types";
import { ProductMetricsCharts } from "./utils";

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

type ProductDashboardState = {
  productMetricsCards: ProductMetricsCards | null;
  productMetricsCharts: ProductMetricsCharts | null;
  isLoading: boolean;
  loadingMessage: string;
};

type ProductDashboardAction = {
  setProductMetricsCards: "setProductMetricsCards";
  setProductMetricsCharts: "setProductMetricsCharts";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type ProductDashboardDispatch =
  | {
      type: ProductDashboardAction["setProductMetricsCards"];
      payload: ProductMetricsCards;
    }
  | {
      type: ProductDashboardAction["setProductMetricsCharts"];
      payload: ProductMetricsCharts;
    }
  | { type: ProductDashboardAction["setIsLoading"]; payload: boolean }
  | { type: ProductDashboardAction["setLoadingMessage"]; payload: string };

export type {
  ProductDashboardAction,
  ProductDashboardChildrenProps,
  ProductDashboardDispatch,
  ProductDashboardState,
};
