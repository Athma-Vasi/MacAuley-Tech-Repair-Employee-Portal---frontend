import { COLORS_SWATCHES } from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import { returnThemeColors } from '../../../utils';
import { MONTHS } from '../constants';
import { returnFinancialMetricsCards } from '../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardFinancialMetric,
  Month,
  Year,
} from '../types';
import FinancialDashboardDaily from './financialDashboardDaily/FinancialDashboardDaily';
import FinancialDashboardMonthly from './financialDashboardMonthly/FinancialDashboardMonthly';
import {
  returnFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from './utils';

function FinancialDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  financialMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  financialMetric: DashboardFinancialMetric;
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

  const selectedDateFinancialMetrics = returnSelectedDateFinancialMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  console.log('selectedDateFinancialMetrics', selectedDateFinancialMetrics);

  const financialChartsData = returnFinancialMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateFinancialMetrics,
    storeLocation: storeLocationView,
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
    calendarView === 'Daily' ? (
      <FinancialDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        day={selectedDate}
        financialMetric={financialMetric}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : calendarView === 'Monthly' ? (
      <FinancialDashboardMonthly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        financialMetric={financialMetric}
        month={selectedYYYYMMDD.split('-')[1]}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        padding={padding}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : null;

  return displayFinancialCalendarInfo;
}

export default FinancialDashboard;
