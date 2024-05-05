import {
  CustomerDashboardAction,
  CustomerDashboardDispatch,
  CustomerDashboardState,
} from "./types";

const initialCustomerDashboardState: CustomerDashboardState = {
  customerMetricsCards: null,
  customerMetricsCharts: null,
  isLoading: false,
  loadingMessage: "",
};

const customerDashboardAction: CustomerDashboardAction = {
  setCustomerMetricsCards: "setCustomerMetricsCards",
  setCustomerMetricsCharts: "setCustomerMetricsCharts",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function customerDashboardReducer(
  state: CustomerDashboardState,
  action: CustomerDashboardDispatch
) {
  switch (action.type) {
    case customerDashboardAction.setCustomerMetricsCards:
      return {
        ...state,
        customerMetricsCards: action.payload,
      };
    case customerDashboardAction.setCustomerMetricsCharts:
      return {
        ...state,
        customerMetricsCharts: action.payload,
      };
    case customerDashboardAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case customerDashboardAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export {
  customerDashboardAction,
  customerDashboardReducer,
  initialCustomerDashboardState,
};
