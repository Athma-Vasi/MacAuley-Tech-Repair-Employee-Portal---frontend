import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { MONTHS } from "../../constants";
import { returnFinancialMetricsCards } from "../../utilsTSX";
import { FinancialDashboardChildrenProps } from "../types";
import {
  returnFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from "../utils";
import FinancialDashboardMonthlyExpenses from "./financialDashboardMonthlyExpenses/FinancialDashboardMonthlyExpenses";
import FinancialDashboardMonthlyOtherMetrics from "./financialDashboardMonthlyOtherMetrics/FinancialDashboardMonthlyOtherMetrics";
import FinancialDashboardMonthlyProfit from "./financialDashboardMonthlyProfit/FinancialDashboardMonthlyProfit";
import FinancialDashboardMonthlyRevenue from "./financialDashboardMonthlyRevenue/FinancialDashboardMonthlyRevenue";
import FinancialDashboardMonthlyTransactions from "./financialDashboardMonthlyTransactions/FinancialDashboardMonthlyTransactions";
import { DashboardFinancialMetric, Month, Year } from "../../types";
import { StoreLocation } from "../../../../types";
import { FinancialMetricsCharts } from "../utils";
import { FinancialMetricsCards } from "../utilsTSX";

type FinancialDashboardMonthlyProps = {
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: Month;
  monthlyCards: FinancialMetricsCards["monthlyCards"];
  monthlyCharts: FinancialMetricsCharts["monthlyCharts"];
  storeLocation: StoreLocation;
  year: Year;
};

function FinancialDashboardMonthly({
  day,
  financialMetric,
  month,
  monthlyCards,
  monthlyCharts,
  storeLocation,
  year,
}: FinancialDashboardMonthlyProps) {
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
