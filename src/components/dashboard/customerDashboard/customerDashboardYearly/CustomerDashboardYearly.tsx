import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { BusinessMetricStoreLocation, DashboardCustomerMetric, Year } from "../../types";
import { CustomerMetricsCharts } from "../utils";
import { CustomerMetricsCards } from "../utilsTSX";
import CustomerDashboardYearlyNew from "./customerDashboardYearlyNew/CustomerDashboardYearlyNew";
import CustomerDashboardYearlyOtherMetrics from "./customerDashboardYearlyOtherMetrics/CustomerDashboardYearlyOtherMetrics";
import CustomerDashboardYearlyOverview from "./customerDashboardYearlyOverview/CustomerDashboardYearlyOverview";
import CustomerDashboardYearlyReturning from "./customerDashboardYearlyReturning/CustomerDashboardYearlyReturning";

type CustomerDashboardYearlyProps = {
  day: string;
  customerMetric: DashboardCustomerMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  yearlyCharts: CustomerMetricsCharts["yearlyCharts"];
  yearlyCards: CustomerMetricsCards["yearlyCards"];
};

function CustomerDashboardYearly({
  customerMetric,
  day,
  month,
  yearlyCards,
  yearlyCharts,
  storeLocation,
  year,
}: CustomerDashboardYearlyProps) {
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const componentWidth =
    width < 480
      ? width * 0.93
      : width < 768
      ? width - 40
      : width < 1024
      ? (width - 225) * 0.8
      : width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight = width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

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
