import { DashboardAction, DashboardDispatch, DashboardState, Year } from "./types";

const initialSelectedDate = new Date().getDate().toString().padStart(2, "0");
const initialSelectedMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
const initialSelectedYear = new Date().getFullYear().toString() as Year;

const initialDashboardState: DashboardState = {
  businessMetrics: [],
  calendarView: "Daily",
  customerMetric: "Overview",
  financialMetric: "Profit",
  metricsView: "Repairs",
  productMetric: "All Products",
  repairMetric: "All Repairs",
  storeLocationView: "All Locations",
  selectedYYYYMMDD: `${initialSelectedYear}-${initialSelectedMonth}-${initialSelectedDate}`,
  isLoading: true,
  loadingMessage: "Generating metrics... Please wait...",
};

const dashboardAction: DashboardAction = {
  setBusinessMetrics: "setBusinessMetrics",
  setCalendarView: "setCalendarView",
  setCustomerMetric: "setCustomerMetric",
  setFinancialMetric: "setFinancialMetric",
  setMetricsView: "setMetricsView",
  setProductMetric: "setProductMetric",
  setRepairMetric: "setRepairMetric",
  setStoreLocationView: "setStoreLocationView",
  setSelectedYYYYMMDD: "setSelectedYYYYMMDD",
  setIsLoading: "setIsLoading",
  setLoadingMessage: "setLoadingMessage",
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardDispatch
): DashboardState {
  switch (action.type) {
    case dashboardAction.setBusinessMetrics:
      return {
        ...state,
        businessMetrics: action.payload,
      };

    case dashboardAction.setCalendarView:
      return {
        ...state,
        calendarView: action.payload,
      };

    case dashboardAction.setCustomerMetric:
      return {
        ...state,
        customerMetric: action.payload,
      };

    case dashboardAction.setFinancialMetric:
      return {
        ...state,
        financialMetric: action.payload,
      };

    case dashboardAction.setMetricsView:
      return {
        ...state,
        metricsView: action.payload,
      };

    case dashboardAction.setProductMetric:
      return {
        ...state,
        productMetric: action.payload,
      };

    case dashboardAction.setRepairMetric:
      return {
        ...state,
        repairMetric: action.payload,
      };

    case dashboardAction.setStoreLocationView:
      return {
        ...state,
        storeLocationView: action.payload,
      };

    case dashboardAction.setSelectedYYYYMMDD:
      return {
        ...state,
        selectedYYYYMMDD: action.payload,
      };

    case dashboardAction.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case dashboardAction.setLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload,
      };

    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
