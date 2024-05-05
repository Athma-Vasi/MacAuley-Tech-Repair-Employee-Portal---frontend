import { ProductMetricsCharts } from "./utils";
import { ProductMetricsCards } from "./utilsTSX";

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

export type { ProductDashboardAction, ProductDashboardDispatch, ProductDashboardState };
