import { Text } from '@mantine/core';

import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';
import { useEffect } from 'react';
import {
  returnFinancialChartsData,
  returnSelectedDateFinancialMetrics,
} from './utils';
import { MONTHS } from '../constants';

function FinancialDashboard({
  businessMetrics,
  selectedCalendarView,
  selectedDate,
  selectedMonth,
  selectedStoreLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  selectedCalendarView: DashboardCalendarView;
  selectedDate: string;
  selectedMonth: Month;
  selectedStoreLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  // useEffect(() => {
  //   const selectedFinancialMetrics = returnSelectedDateFinancialMetrics({
  //     businessMetrics,
  //     day: '01',
  //     month: 'January',
  //     months: MONTHS,
  //     storeLocation: 'All Locations',
  //     year: '2021',
  //   });
  //   console.log('selectedFinancialMetrics', selectedFinancialMetrics);
  //   const financialChartsData = returnFinancialChartsData({
  //     businessMetrics,
  //     months: MONTHS,
  //     selectedFinancialMetrics,
  //     storeLocation: 'All Locations',
  //   });
  //   console.log('financialChartsData', financialChartsData);
  // }, []);

  return <Text>Financial Dashboard</Text>;
}

export default FinancialDashboard;
