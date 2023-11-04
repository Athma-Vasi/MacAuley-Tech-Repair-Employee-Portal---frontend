import {
  DashboardAction,
  DashboardDispatch,
  DashboardState,
  Year,
} from './types';

const initialSelectedDate = new Date().getDate().toString().padStart(2, '0');
const initialSelectedMonth = new Date().getMonth() + 1;
const initialSelectedYear = new Date().getFullYear().toString() as Year;

const initialDashboardState: DashboardState = {
  businessMetrics: [],
  selectedCalendarView: 'Daily',
  selectedFinancialsView: 'Profit',
  selectedMetricsView: 'Financials',
  selectedStoreLocationView: 'All Locations',
  selectedYYYYMMDD: `${initialSelectedYear}-${initialSelectedMonth}-${initialSelectedDate}`,
  // selectedYear: '2019',
  // selectedYYYYMMDD: `${2019}-${
  //   new Date().getMonth() + 1
  // }-${initialSelectedDate}`,
};

const dashboardAction: DashboardAction = {
  setBusinessMetrics: 'setBusinessMetrics',
  setSelectedCalendarView: 'setSelectedCalendarView',
  setSelectedFinancialsView: 'setSelectedFinancialsView',
  setSelectedMetricsView: 'setSelectedMetricsView',
  setSelectedStoreLocationView: 'setSelectedStoreLocationView',
  setSelectedYYYYMMDD: 'setSelectedYYYYMMDD',
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

    case dashboardAction.setSelectedCalendarView:
      return {
        ...state,
        selectedCalendarView: action.payload,
      };

    case dashboardAction.setSelectedFinancialsView:
      return {
        ...state,
        selectedFinancialsView: action.payload,
      };

    case dashboardAction.setSelectedMetricsView:
      return {
        ...state,
        selectedMetricsView: action.payload,
      };

    case dashboardAction.setSelectedStoreLocationView:
      return {
        ...state,
        selectedStoreLocationView: action.payload,
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
