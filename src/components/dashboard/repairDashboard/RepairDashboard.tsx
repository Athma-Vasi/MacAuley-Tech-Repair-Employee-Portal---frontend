import { useEffect } from 'react';

import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { returnThemeColors } from '../../../utils';
import { MONTHS } from '../constants';
import { returnRepairMetricsCards } from '../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardRepairMetric,
  Month,
  Year,
} from '../types';
import RepairDashboardDaily from './repairDashboardDaily/RepairDashboardDaily';
import RepairDashboardMonthly from './repairDashboardMonthly/RepairDashboardMonthly';
import RepairDashboardYearly from './repairDashboardYearly/RepairDashboardYearly';
import {
  returnRepairMetricsCharts,
  returnSelectedDateRepairMetrics,
} from './utils';

function RepairDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  repairMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  repairMetric: DashboardRepairMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
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

  const selectedDateRepairMetrics = returnSelectedDateRepairMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    selectedRepairCategory: repairMetric,
    storeLocation: storeLocationView,
    year: selectedYear,
  });
  console.log('selectedDateRepairMetrics', selectedDateRepairMetrics);

  const repairChartsData = returnRepairMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateRepairMetrics,
    storeLocation: storeLocationView,
    selectedRepairCategory: repairMetric,
  });
  console.log('repairChartsData', repairChartsData);

  const repairCardsInfo = returnRepairMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateRepairMetrics,
    width,
  });
  console.log('repairCardsInfo', repairCardsInfo);

  const { dailyCharts, monthlyCharts, yearlyCharts } = repairChartsData;
  const { dailyCards, monthlyCards, yearlyCards } = repairCardsInfo;

  const displayRepairDashboard =
    calendarView === 'Daily' ? (
      <RepairDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : calendarView === 'Monthly' ? (
      <RepairDashboardMonthly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        padding={padding}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : (
      <RepairDashboardYearly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        padding={padding}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
      />
    );

  return displayRepairDashboard;
}

export default RepairDashboard;
