import { MONTHS } from '../constants';
import { Year } from '../types';
import {
  CustomerDashboardAction,
  CustomerDashboardDispatch,
  CustomerDashboardState,
} from './types';
import {
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
} from './utils';

const initialSelectedDate = new Date().getDate().toString().padStart(2, '0');
const initialSelectedMonth = MONTHS[new Date().getMonth()];
const initialSelectedYear = new Date().getFullYear().toString() as Year;

const initialCustomerDashboardState: CustomerDashboardState = {
  customerChartsData: null,
  customerCardsInfo: null,
  selectedCalendarView: 'Daily',
  selectedStoreLocationView: 'All Locations',
  selectedDate: initialSelectedDate,
  selectedMonth: initialSelectedMonth,
  selectedYear: initialSelectedYear,

  selectedYYYYMMDD: `${initialSelectedYear}-${
    new Date().getMonth() + 1
  }-${initialSelectedDate}`,
};

const customerDashboardAction: CustomerDashboardAction = {
  setCustomerChartsData: 'setCustomerChartsData',
  setCustomerCardsInfo: 'setCustomerCardsInfo',
  setSelectedCalendarView: 'setSelectedCalendarView',
  setSelectedStoreLocationView: 'setSelectedStoreLocationView',
  setSelectedDate: 'setSelectedDate',
  setSelectedMonth: 'setSelectedMonth',
  setSelectedYear: 'setSelectedYear',

  setSelectedYYYYMMDD: 'setSelectedYYYYMMDD',
};

function customerDashboardReducer(
  state: CustomerDashboardState,
  action: CustomerDashboardDispatch
): CustomerDashboardState {
  switch (action.type) {
    case customerDashboardAction.setCustomerChartsData:
      return {
        ...state,
        customerChartsData: action.payload,
      };

    case customerDashboardAction.setCustomerCardsInfo:
      return {
        ...state,
        customerCardsInfo: action.payload,
      };

    case customerDashboardAction.setSelectedCalendarView:
      return {
        ...state,
        selectedCalendarView: action.payload,
      };

    case customerDashboardAction.setSelectedStoreLocationView:
      return {
        ...state,
        selectedStoreLocationView: action.payload,
      };

    case customerDashboardAction.setSelectedDate:
      return {
        ...state,
        selectedDate: action.payload,
      };

    case customerDashboardAction.setSelectedMonth:
      return {
        ...state,
        selectedMonth: action.payload,
      };

    case customerDashboardAction.setSelectedYear:
      return {
        ...state,
        selectedYear: action.payload,
      };

    case customerDashboardAction.setSelectedYYYYMMDD:
      return {
        ...state,
        selectedYYYYMMDD: action.payload,
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
