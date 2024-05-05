import { FinancialMetricsCharts } from "./utils";
import { FinancialMetricsCards } from "./utilsTSX";

type FinancialDashboardState = {
  financialMetricsCards: FinancialMetricsCards | null;
  financialMetricsCharts: FinancialMetricsCharts | null;
  isLoading: boolean;
  loadingMessage: string;
};

type FinancialDashboardAction = {
  setFinancialMetricsCards: "setFinancialMetricsCards";
  setFinancialMetricsCharts: "setFinancialMetricsCharts";
  setIsLoading: "setIsLoading";
  setLoadingMessage: "setLoadingMessage";
};

type FinancialDashboardDispatch =
  | {
      type: FinancialDashboardAction["setFinancialMetricsCards"];
      payload: FinancialMetricsCards;
    }
  | {
      type: FinancialDashboardAction["setFinancialMetricsCharts"];
      payload: FinancialMetricsCharts;
    }
  | { type: FinancialDashboardAction["setIsLoading"]; payload: boolean }
  | { type: FinancialDashboardAction["setLoadingMessage"]; payload: string };

export type {
  FinancialDashboardAction,
  FinancialDashboardDispatch,
  FinancialDashboardState,
};
