import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { MONTHS } from "../../constants";
import { returnFinancialMetricsCards } from "../../jsxHelpers";
import { FinancialDashboardChildrenProps } from "../types";
import {
  returnFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from "../utils";
import FinancialDashboardDailyExpenses from "./financialDashboardDailyExpenses/FinancialDashboardDailyExpenses";
import FinancialDashboardDailyOtherMetrics from "./financialDashboardDailyOtherMetrics/FinancialDashboardDailyOtherMetrics";
import FinancialDashboardDailyProfit from "./financialDashboardDailyProfit/FinancialDashboardDailyProfit";
import FinancialDashboardDailyRevenue from "./financialDashboardDailyRevenue/FinancialDashboardDailyRevenue";
import FinancialDashboardDailyTransactions from "./financialDashboardDailyTransactions/FinancialDashboardDailyTransactions";

function FinancialDashboardDaily({
  businessMetrics,
  day,
  financialMetric,
  month,
  selectedDate,
  selectedMonth,
  selectedYear,
  storeLocation,
  storeLocationView,
  year,
}: FinancialDashboardChildrenProps) {
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

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

  const { dailyCharts } = returnFinancialMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateFinancialMetrics,
    storeLocation: storeLocationView,
  });

  const { dailyCards } = returnFinancialMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateFinancialMetrics,
    width,
  });

  const displayFinancialMetricCategory =
    financialMetric === "Profit" ? (
      <FinancialDashboardDailyProfit
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsProfit={dailyCards.profit}
        dailyChartsProfit={dailyCharts.profit}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Revenue" ? (
      <FinancialDashboardDailyRevenue
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsRevenue={dailyCards.revenue}
        dailyChartsRevenue={dailyCharts.revenue}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Expenses" ? (
      <FinancialDashboardDailyExpenses
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsExpenses={dailyCards.expenses}
        dailyChartsExpenses={dailyCharts.expenses}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Transactions" ? (
      <FinancialDashboardDailyTransactions
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsTransactions={dailyCards.transactions}
        dailyChartsTransactions={dailyCharts.transactions}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <FinancialDashboardDailyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsOtherMetrics={dailyCards.otherMetrics}
        dailyChartsOtherMetrics={dailyCharts.otherMetrics}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  const displayFinancialDashboardDaily = (
    <Stack w="100%">{displayFinancialMetricCategory}</Stack>
  );

  return displayFinancialDashboardDaily;
}

export default FinancialDashboardDaily;
