import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { MONTHS } from "../../constants";
import { returnCustomerMetricsCards } from "../../jsxHelpers";
import { CustomerDashboardChildrenProps } from "../types";
import { returnCustomerMetricsCharts, returnSelectedDateCustomerMetrics } from "../utils";
import CustomerDashboardYearlyNew from "./customerDashboardYearlyNew/CustomerDashboardYearlyNew";
import CustomerDashboardYearlyOtherMetrics from "./customerDashboardYearlyOtherMetrics/CustomerDashboardYearlyOtherMetrics";
import CustomerDashboardYearlyOverview from "./customerDashboardYearlyOverview/CustomerDashboardYearlyOverview";
import CustomerDashboardYearlyReturning from "./customerDashboardYearlyReturning/CustomerDashboardYearlyReturning";

function CustomerDashboardYearly({
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

  const { yearlyCharts } = returnCustomerMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateCustomerMetrics,
    storeLocation: storeLocationView,
  });

  const { yearlyCards } = returnCustomerMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateCustomerMetrics,
    width,
  });

  const displayCustomerDashboardYearly =
    customerMetric === "Overview" ? (
      <CustomerDashboardYearlyOverview
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsOverview={yearlyCards.overview}
        yearlyChartsOverview={yearlyCharts.overview}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === "New" ? (
      <CustomerDashboardYearlyNew
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsNew={yearlyCards.new}
        yearlyChartsNew={yearlyCharts.new}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === "Returning" ? (
      <CustomerDashboardYearlyReturning
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsReturning={yearlyCards.returning}
        yearlyChartsReturning={yearlyCharts.returning}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <CustomerDashboardYearlyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsOtherMetrics={[...yearlyCards.churnRate, ...yearlyCards.retentionRate]}
        yearlyChartsOtherMetrics={yearlyCharts.churnRetention}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  return displayCustomerDashboardYearly;
}

export default CustomerDashboardYearly;
