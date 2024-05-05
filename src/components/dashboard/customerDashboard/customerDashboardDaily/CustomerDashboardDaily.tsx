import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { BusinessMetricStoreLocation, DashboardCustomerMetric, Year } from "../../types";
import { CustomerMetricsCharts } from "../utils";
import { CustomerMetricsCards } from "../utilsTSX";
import CustomerDashboardDailyNew from "./customerDashboardDailyNew/CustomerDashboardDailyNew";
import CustomerDashboardDailyOverview from "./customerDashboardDailyOverview/CustomerDashboardDailyOverview";
import CustomerDashboardDailyReturning from "./customerDashboardDailyReturning/CustomerDashboardDailyReturning";

type CustomerDashboardDailyProps = {
  day: string;
  customerMetric: DashboardCustomerMetric;
  month: string;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
  dailyCharts: CustomerMetricsCharts["dailyCharts"];
  dailyCards: CustomerMetricsCards["dailyCards"];
};

function CustomerDashboardDaily({
  customerMetric,
  day,
  dailyCharts,
  dailyCards,
  month,
  storeLocation,
  year,
}: CustomerDashboardDailyProps) {
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
