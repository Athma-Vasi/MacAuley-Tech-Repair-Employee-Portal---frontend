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
import FinancialDashboardYearlyExpenses from "./financialDashboardYearlyExpenses/FinancialDashboardYearlyExpenses";
import FinancialDashboardYearlyOtherMetrics from "./financialDashboardYearlyOtherMetrics/FinancialDashboardYearlyOtherMetrics";
import FinancialDashboardYearlyProfit from "./financialDashboardYearlyProfit/FinancialDashboardYearlyProfit";
import FinancialDashboardYearlyRevenue from "./financialDashboardYearlyRevenue/FinancialDashboardYearlyRevenue";
import FinancialDashboardYearlyTransactions from "./financialDashboardYearlyTransactions/FinancialDashboardYearlyTransactions";

function FinancialDashboardYearly({
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

  const selectedDateFinancialMetrics = returnSelectedDateFinancialMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    storeLocation: storeLocationView,
    year: selectedYear,
  });

  const { yearlyCharts } = returnFinancialMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateFinancialMetrics,
    storeLocation: storeLocationView,
  });

  const { yearlyCards } = returnFinancialMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateFinancialMetrics,
    width,
  });

  const displayFinancialMetricCategory =
    financialMetric === "Profit" ? (
      <FinancialDashboardYearlyProfit
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsProfit={yearlyCards.profit}
        yearlyChartsProfit={yearlyCharts.profit}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Revenue" ? (
      <FinancialDashboardYearlyRevenue
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsRevenue={yearlyCards.revenue}
        yearlyChartsRevenue={yearlyCharts.revenue}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Expenses" ? (
      <FinancialDashboardYearlyExpenses
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsExpenses={yearlyCards.expenses}
        yearlyChartsExpenses={yearlyCharts.expenses}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Transactions" ? (
      <FinancialDashboardYearlyTransactions
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsTransactions={yearlyCards.transactions}
        yearlyChartsTransactions={yearlyCharts.transactions}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <FinancialDashboardYearlyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsOtherMetrics={yearlyCards.otherMetrics}
        yearlyChartsOtherMetrics={yearlyCharts.otherMetrics}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  const displayFinancialDashboardYearly = (
    <Stack w="100%">{displayFinancialMetricCategory}</Stack>
  );

  return displayFinancialDashboardYearly;
}

export default FinancialDashboardYearly;
