import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { MONTHS } from "../constants";
import { returnCustomerMetricsCards } from "../jsxHelpers";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetric,
  Month,
  Year,
} from "../types";
import CustomerDashboardDaily from "./customerDashboardDaily/CustomerDashboardDaily";
import CustomerDashboardMonthly from "./customerDashboardMonthly/CustomerDashboardMonthly";
import CustomerDashboardYearly from "./customerDashboardYearly/CustomerDashboardYearly";
import { returnCustomerMetricsCharts, returnSelectedDateCustomerMetrics } from "./utils";

function CustomerDashboard({
  businessMetrics,
  calendarView,
  customerMetric,
  selectedDate,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  customerMetric: DashboardCustomerMetric;
  selectedDate: string;
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

  if (!businessMetrics.length) {
    return null;
  }

  const selectedDateCustomerMetrics = returnSelectedDateCustomerMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  const customerChartsData = returnCustomerMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateCustomerMetrics,
    storeLocation: storeLocationView,
  });

  const customerCardsInfo = returnCustomerMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateCustomerMetrics,
    width,
  });

  const displayCustomerCalendarInfo =
    calendarView === "Daily" ? (
      <CustomerDashboardDaily
        borderColor={borderColor}
        customerMetric={customerMetric}
        dailyCards={customerCardsInfo.dailyCards}
        dailyCharts={customerChartsData.dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        padding={padding}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : calendarView === "Monthly" ? (
      <CustomerDashboardMonthly
        borderColor={borderColor}
        customerMetric={customerMetric}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        monthlyCards={customerCardsInfo.monthlyCards}
        monthlyCharts={customerChartsData.monthlyCharts}
        padding={padding}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : (
      <CustomerDashboardYearly
        borderColor={borderColor}
        customerMetric={customerMetric}
        padding={padding}
        storeLocation={storeLocationView}
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
