import { Text } from '@mantine/core';

import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardFinancialsView,
  Month,
  Year,
} from '../types';
import { useEffect } from 'react';
import {
  returnFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from './utils';
import { MONTHS } from '../constants';
import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { returnThemeColors } from '../../../utils';
import {
  returnFinancialMetricsCards,
  returnFlattenedObject,
} from '../jsxHelpers';
import FinancialDashboardDaily from './financialDashboardDaily/FinancialDashboardDaily';

function FinancialDashboard({
  businessMetrics,
  selectedCalendarView,
  selectedDate,
  selectedFinancialsView,
  selectedMonth,
  selectedStoreLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  selectedCalendarView: DashboardCalendarView;
  selectedDate: string;
  selectedFinancialsView: DashboardFinancialsView;
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

  const selectedDateFinancialMetrics = returnSelectedDateFinancialMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: selectedStoreLocationView,
    year: selectedYear,
  });

  console.log('selectedDateFinancialMetrics', selectedDateFinancialMetrics);

  const financialChartsData = returnFinancialMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateFinancialMetrics,
    storeLocation: selectedStoreLocationView,
  });

  console.log('financialChartsData', financialChartsData);

  const financialCardsInfo = returnFinancialMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateFinancialMetrics,
    width,
  });

  console.log('financialCardsInfo', financialCardsInfo);

  const { dailyCards, monthlyCards, yearlyCards } = financialCardsInfo;
  const { dailyCharts, monthlyCharts, yearlyCharts } = financialChartsData;

  const displayFinancialCalendarInfo =
    selectedCalendarView === 'Daily' ? (
      <FinancialDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
      />
    ) : null;

  return displayFinancialCalendarInfo;
}

export default FinancialDashboard;
