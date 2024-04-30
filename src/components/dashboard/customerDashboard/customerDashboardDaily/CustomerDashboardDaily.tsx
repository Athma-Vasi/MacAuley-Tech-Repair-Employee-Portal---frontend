import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { MONTHS } from "../../constants";
import { returnCustomerMetricsCards } from "../../jsxHelpers";
import { CustomerDashboardChildrenProps } from "../types";
import { returnCustomerMetricsCharts, returnSelectedDateCustomerMetrics } from "../utils";
import CustomerDashboardDailyNew from "./customerDashboardDailyNew/CustomerDashboardDailyNew";
import CustomerDashboardDailyOverview from "./customerDashboardDailyOverview/CustomerDashboardDailyOverview";
import CustomerDashboardDailyReturning from "./customerDashboardDailyReturning/CustomerDashboardDailyReturning";

function CustomerDashboardDaily({
  businessMetrics,
  customerMetric,
  day,
  month,
  selectedDate,
  selectedMonth,
  selectedYear,
  storeLocation,
  storeLocationView,
  year,
}: CustomerDashboardChildrenProps) {
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

  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight = width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

  const selectedDateCustomerMetrics = returnSelectedDateCustomerMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  const { dailyCharts } = returnCustomerMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateCustomerMetrics,
    storeLocation: storeLocationView,
  });

  const { dailyCards } = returnCustomerMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateCustomerMetrics,
    width,
  });

  const displayCustomerDashboardDaily =
    customerMetric === "Overview" ? (
      <CustomerDashboardDailyOverview
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsOverview={dailyCards.overview}
        dailyChartsOverview={dailyCharts.overview}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === "New" ? (
      <CustomerDashboardDailyNew
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsNew={dailyCards.new}
        dailyChartsNew={dailyCharts.new}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <CustomerDashboardDailyReturning
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsReturning={dailyCards.returning}
        dailyChartsReturning={dailyCharts.returning}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  return displayCustomerDashboardDaily;
}

export default CustomerDashboardDaily;
