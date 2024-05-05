import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { BusinessMetricStoreLocation, DashboardCustomerMetric, Year } from "../../types";
import { CustomerMetricsCharts } from "../utils";
import { CustomerMetricsCards } from "../utilsTSX";
import CustomerDashboardMonthlyNew from "./customerDashboardMonthlyNew/CustomerDashboardMonthlyNew";
import CustomerDashboardMonthlyOtherMetrics from "./customerDashboardMonthlyOtherMetrics/CustomerDashboardMonthlyOtherMetrics";
import CustomerDashboardMonthlyOverview from "./customerDashboardMonthlyOverview/CustomerDashboardMonthlyOverview";
import CustomerDashboardMonthlyReturning from "./customerDashboardMonthlyReturning/CustomerDashboardMonthlyReturning";

type CustomerDashboardMonthlyProps = {
  day: string;
  customerMetric: DashboardCustomerMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  monthlyCharts: CustomerMetricsCharts["monthlyCharts"];
  monthlyCards: CustomerMetricsCards["monthlyCards"];
};

function CustomerDashboardMonthly({
  customerMetric,
  monthlyCards,
  monthlyCharts,
  day,
  month,
  storeLocation,
  year,
}: CustomerDashboardMonthlyProps) {
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

  const customerDashboardMonthly =
    customerMetric === "Overview" ? (
      <CustomerDashboardMonthlyOverview
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsOverview={monthlyCards.overview}
        monthlyChartsOverview={monthlyCharts.overview}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === "New" ? (
      <CustomerDashboardMonthlyNew
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsNew={monthlyCards.new}
        monthlyChartsNew={monthlyCharts.new}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === "Returning" ? (
      <CustomerDashboardMonthlyReturning
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsReturning={monthlyCards.returning}
        monthlyChartsReturning={monthlyCharts.returning}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <CustomerDashboardMonthlyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsOtherMetrics={[
          ...monthlyCards.churnRate,
          ...monthlyCards.retentionRate,
        ]}
        monthlyChartsOtherMetrics={monthlyCharts.churnRetention}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  return customerDashboardMonthly;
}

export default CustomerDashboardMonthly;
