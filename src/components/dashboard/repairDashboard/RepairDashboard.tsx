import { useEffect } from 'react';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';
import {
  returnRepairChartsData,
  returnSelectedDateRepairMetrics,
} from './utils';
import { MONTHS } from '../constants';

function RepairDashboard({
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
  //   const selectedRepairMetrics = returnSelectedDateRepairMetrics({
  //     businessMetrics,
  //     day: '01',
  //     month: 'January',
  //     months: MONTHS,
  //     selectedRepairCategory: 'Computer Components',
  //     storeLocation: 'All Locations',
  //     year: '2021',
  //   });
  //   console.log('selectedRepairMetrics', selectedRepairMetrics);
  //   const repairChartsData = returnRepairChartsData({
  //     businessMetrics,
  //     months: MONTHS,
  //     selectedRepairCategory: 'Computer Components',
  //     selectedRepairMetrics,
  //     storeLocation: 'All Locations',
  //   });
  //   console.log('repairChartsData', repairChartsData);
  // }, []);

  return <></>;
}

export default RepairDashboard;
