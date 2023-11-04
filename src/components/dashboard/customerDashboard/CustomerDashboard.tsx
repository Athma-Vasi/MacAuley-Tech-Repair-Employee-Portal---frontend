import { Stack } from '@mantine/core';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { returnThemeColors } from '../../../utils';
import { MONTHS } from '../constants';
import { returnCustomerMetricsCards } from '../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';
import CustomerDashboardDaily from './customerDashboardDaily/CustomerDashboardDaily';
import CustomerDashboardMonthly from './customerDashboardMonthly/CustomerDashboardMonthly';
import CustomerDashboardYearly from './customerDashboardYearly/CustomerDashboardYearly';
import {
  returnCustomerMetricsCharts,
  returnSelectedDateCustomerMetrics,
} from './utils';

function CustomerDashboard({
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
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const selectedDateCustomerMetrics = returnSelectedDateCustomerMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: selectedStoreLocationView,
    year: selectedYear,
  });

  const customerChartsData = returnCustomerMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateCustomerMetrics,
    storeLocation: selectedStoreLocationView,
  });

  const customerCardsInfo = returnCustomerMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateCustomerMetrics,
    width,
  });

  const displayCustomerCalendarInfo =
    selectedCalendarView === 'Daily' ? (
      <CustomerDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={customerCardsInfo.dailyCards}
        dailyCharts={customerChartsData.dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
      />
    ) : selectedCalendarView === 'Monthly' ? (
      <CustomerDashboardMonthly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        monthlyCards={customerCardsInfo.monthlyCards}
        monthlyCharts={customerChartsData.monthlyCharts}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
      />
    ) : (
      <CustomerDashboardYearly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
        yearlyCards={customerCardsInfo.yearlyCards}
        yearlyCharts={customerChartsData.yearlyCharts}
      />
    );

  const displayCustomerDashboardComponent = (
    <Stack w="100%" p={padding}>
      {displayCustomerCalendarInfo}
    </Stack>
  );

  return displayCustomerDashboardComponent;
}

export default CustomerDashboard;
