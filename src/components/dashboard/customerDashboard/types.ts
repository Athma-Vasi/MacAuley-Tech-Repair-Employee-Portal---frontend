import { StoreLocation } from '../../../types';
import { ReturnDashboardCustomerCardInfoOutput } from '../jsxHelpers';
import { BusinessMetricStoreLocation, Month, Year } from '../types';
import {
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
} from './utils';

type DashboardCalendarView = 'Yearly' | 'Monthly' | 'Daily';

type YAxisCustomerChartSelection = {
  newYAxis: CustomerNewMapKey;
  overviewYAxis: CustomerOverviewMapKey;
  returningYAxis: CustomerReturningMapKey;
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
