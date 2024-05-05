import {
  FinancialDashboardAction,
  FinancialDashboardDispatch,
  FinancialDashboardState,
} from "./types";

const initialFinancialDashboardState: FinancialDashboardState = {
  financialMetricsCards: null,
  financialMetricsCharts: null,
  isLoading: false,
  loadingMessage: "",
};

const financialDashboardAction: FinancialDashboardAction = {
  setFinancialMetricsCards: "setFinancialMetricsCards",
  setFinancialMetricsCharts: "setFinancialMetricsCharts",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function financialDashboardReducer(
  state: FinancialDashboardState,
  action: FinancialDashboardDispatch
): FinancialDashboardState {
  switch (action.type) {
    case financialDashboardAction.setFinancialMetricsCards:
      return { ...state, financialMetricsCards: action.payload };
    case financialDashboardAction.setFinancialMetricsCharts:
      return { ...state, financialMetricsCharts: action.payload };
    case financialDashboardAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case financialDashboardAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };

    default:
      return state;
  }
}

export {
  financialDashboardAction,
  financialDashboardReducer,
  initialFinancialDashboardState,
};
