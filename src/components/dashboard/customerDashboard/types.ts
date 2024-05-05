import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCustomerMetric,
  Month,
  Year,
} from "../types";
import { CustomerMetricsCharts } from "./utils";
import { CustomerMetricsCards } from "./utilsTSX";

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

type CustomerDashboardState = {
  customerMetricsCards: CustomerMetricsCards | null;
  customerMetricsCharts: CustomerMetricsCharts | null;
  isLoading: boolean;
  loadingMessage: string;
};

type CustomerDashboardAction = {
  setCustomerMetricsCards: "setCustomerMetricsCards";
  setCustomerMetricsCharts: "setCustomerMetricsCharts";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type CustomerDashboardDispatch =
  | {
      type: CustomerDashboardAction["setCustomerMetricsCards"];
      payload: CustomerMetricsCards;
    }
  | {
      type: CustomerDashboardAction["setCustomerMetricsCharts"];
      payload: CustomerMetricsCharts;
    }
  | {
      type: CustomerDashboardAction["setIsLoading"];
      payload: boolean;
    }
  | {
      type: CustomerDashboardAction["setLoadingMessage"];
      payload: string;
    };

export type {
  CustomerDashboardAction,
  CustomerDashboardChildrenProps,
  CustomerDashboardDispatch,
  CustomerDashboardState,
};
