import { DashboardAction, DashboardDispatch, DashboardState, Year } from "./types";

const initialSelectedDate = new Date().getDate().toString().padStart(2, "0");
const initialSelectedMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
const initialSelectedYear = new Date().getFullYear().toString() as Year;

const initialDashboardState: DashboardState = {
  triggerReRender: false,
  businessMetrics: [],
  calendarView: "Daily",
  customerMetric: "Overview",
  financialMetric: "Profit",
  metricsView: "Financials",
  productMetric: "All Products",
  repairMetric: "All Repairs",
  storeLocationView: "All Locations",
  selectedYYYYMMDD: `${initialSelectedYear}-${initialSelectedMonth}-${initialSelectedDate}`,
  // selectedYear: '2019',
  // selectedYYYYMMDD: `${2019}-${
  //   new Date().getMonth() + 1
  // }-${initialSelectedDate}`,
};

const dashboardAction: DashboardAction = {
  triggerReRender: "triggerReRender",
  setBusinessMetrics: "setBusinessMetrics",
  setCalendarView: "setCalendarView",
  setCustomerMetric: "setCustomerMetric",
  setFinancialMetric: "setFinancialMetric",
  setMetricsView: "setMetricsView",
  setProductMetric: "setProductMetric",
  setRepairMetric: "setRepairMetric",
  setStoreLocationView: "setStoreLocationView",
  setSelectedYYYYMMDD: "setSelectedYYYYMMDD",
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardDispatch
): DashboardState {
  switch (action.type) {
    case dashboardAction.triggerReRender:
      return {
        ...state,
        triggerReRender: !state.triggerReRender,
      };

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

    default:
      return state;
  }
}

export { dashboardAction, dashboardReducer, initialDashboardState };
