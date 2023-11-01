import { ReturnDashboardCustomerCardInfoOutput } from '../jsxHelpers';
import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';
import {
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
  ReturnCustomerChartsDataOutput,
} from './utils';

type YAxisCustomerChartSelection = {
  newYAxis: CustomerNewReturningObjKey;
  overviewYAxis: CustomerOverviewObjKey;
  returningYAxis: CustomerNewReturningObjKey;
};

type CustomerDashboardState = {
  customerChartsData: ReturnCustomerChartsDataOutput | null;
  customerCardsInfo: ReturnDashboardCustomerCardInfoOutput | null;
  selectedCalendarView: DashboardCalendarView;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  selectedStoreLocationView: BusinessMetricStoreLocation;

  selectedYYYYMMDD: string;
};

type CustomerDashboardAction = {
  setCustomerChartsData: 'setCustomerChartsData';
  setCustomerCardsInfo: 'setCustomerCardsInfo';
  setSelectedCalendarView: 'setSelectedCalendarView';
  setSelectedStoreLocationView: 'setSelectedStoreLocationView';
  setSelectedDate: 'setSelectedDate';
  setSelectedMonth: 'setSelectedMonth';
  setSelectedYear: 'setSelectedYear';

  setSelectedYYYYMMDD: 'setSelectedYYYYMMDD';
};

type CustomerDashboardDispatch =
  | {
      type: CustomerDashboardAction['setCustomerChartsData'];
      payload: ReturnCustomerChartsDataOutput;
    }
  | {
      type: CustomerDashboardAction['setCustomerCardsInfo'];
      payload: ReturnDashboardCustomerCardInfoOutput;
    }
  | {
      type: CustomerDashboardAction['setSelectedCalendarView'];
      payload: DashboardCalendarView;
    }
  | {
      type: CustomerDashboardAction['setSelectedStoreLocationView'];
      payload: BusinessMetricStoreLocation;
    }
  | {
      type:
        | CustomerDashboardAction['setSelectedDate']
        | CustomerDashboardAction['setSelectedYYYYMMDD'];
      payload: string;
    }
  | {
      type: CustomerDashboardAction['setSelectedMonth'];
      payload: Month;
    }
  | {
      type: CustomerDashboardAction['setSelectedYear'];
      payload: Year;
    };

export type {
  CustomerDashboardAction,
  CustomerDashboardDispatch,
  CustomerDashboardState,
  DashboardCalendarView,
  YAxisCustomerChartSelection,
};
