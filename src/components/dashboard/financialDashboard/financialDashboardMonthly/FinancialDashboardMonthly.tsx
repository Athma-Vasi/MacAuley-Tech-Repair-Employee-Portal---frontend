import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { MONTHS } from "../../constants";
import { returnFinancialMetricsCards } from "../../jsxHelpers";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardFinancialMetric,
  Month,
  Year,
} from "../../types";
import {
  returnFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from "../utils";
import FinancialDashboardMonthlyExpenses from "./financialDashboardMonthlyExpenses/FinancialDashboardMonthlyExpenses";
import FinancialDashboardMonthlyOtherMetrics from "./financialDashboardMonthlyOtherMetrics/FinancialDashboardMonthlyOtherMetrics";
import FinancialDashboardMonthlyProfit from "./financialDashboardMonthlyProfit/FinancialDashboardMonthlyProfit";
import FinancialDashboardMonthlyRevenue from "./financialDashboardMonthlyRevenue/FinancialDashboardMonthlyRevenue";
import FinancialDashboardMonthlyTransactions from "./financialDashboardMonthlyTransactions/FinancialDashboardMonthlyTransactions";

function FinancialDashboardMonthly({
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
}: {
  businessMetrics: BusinessMetric[];
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: string;
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
  storeLocation: BusinessMetricStoreLocation;
  storeLocationView: BusinessMetricStoreLocation;
  year: Year;
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

  const { monthlyCharts } = returnFinancialMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateFinancialMetrics,
    storeLocation: storeLocationView,
  });

  const { monthlyCards } = returnFinancialMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateFinancialMetrics,
    width,
  });

  const displayFinancialMetricCategory =
    financialMetric === "Profit" ? (
      <FinancialDashboardMonthlyProfit
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsProfit={monthlyCards.profit}
        monthlyChartsProfit={monthlyCharts.profit}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Revenue" ? (
      <FinancialDashboardMonthlyRevenue
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsRevenue={monthlyCards.revenue}
        monthlyChartsRevenue={monthlyCharts.revenue}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Expenses" ? (
      <FinancialDashboardMonthlyExpenses
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsExpenses={monthlyCards.expenses}
        monthlyChartsExpenses={monthlyCharts.expenses}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : financialMetric === "Transactions" ? (
      <FinancialDashboardMonthlyTransactions
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsTransactions={monthlyCards.transactions}
        monthlyChartsTransactions={monthlyCharts.transactions}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <FinancialDashboardMonthlyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsOtherMetrics={monthlyCards.otherMetrics}
        monthlyChartsOtherMetrics={monthlyCharts.otherMetrics}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  const displayFinancialDashboardMonthly = (
    <Stack w="100%">{displayFinancialMetricCategory}</Stack>
  );

  return displayFinancialDashboardMonthly;
}

export default FinancialDashboardMonthly;
