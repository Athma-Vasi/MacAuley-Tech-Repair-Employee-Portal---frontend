import {
  ProductDashboardAction,
  ProductDashboardDispatch,
  ProductDashboardState,
} from "./types";

const initialProductDashboardState: ProductDashboardState = {
  productMetricsCards: null,
  productMetricsCharts: null,
  isLoading: false,
  loadingMessage: "",
};

const productDashboardAction: ProductDashboardAction = {
  setProductMetricsCards: "setProductMetricsCards",
  setProductMetricsCharts: "setProductMetricsCharts",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function productDashboardReducer(
  state: ProductDashboardState,
  action: ProductDashboardDispatch
): ProductDashboardState {
  switch (action.type) {
    case productDashboardAction.setProductMetricsCards:
      return { ...state, productMetricsCards: action.payload };
    case productDashboardAction.setProductMetricsCharts:
      return { ...state, productMetricsCharts: action.payload };
    case productDashboardAction.setIsLoading:
      return { ...state, isLoading: action.payload };
    case productDashboardAction.setLoadingMessage:
      return { ...state, loadingMessage: action.payload };

    default:
      return state;
  }
}

export { initialProductDashboardState, productDashboardAction, productDashboardReducer };
