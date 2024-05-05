import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { returnThemeColors } from "../../../../utils";
import { BusinessMetricStoreLocation, DashboardFinancialMetric, Year } from "../../types";
import { FinancialMetricsCharts } from "../utils";
import { FinancialMetricsCards } from "../utilsTSX";
import FinancialDashboardYearlyExpenses from "./financialDashboardYearlyExpenses/FinancialDashboardYearlyExpenses";
import FinancialDashboardYearlyOtherMetrics from "./financialDashboardYearlyOtherMetrics/FinancialDashboardYearlyOtherMetrics";
import FinancialDashboardYearlyProfit from "./financialDashboardYearlyProfit/FinancialDashboardYearlyProfit";
import FinancialDashboardYearlyRevenue from "./financialDashboardYearlyRevenue/FinancialDashboardYearlyRevenue";
import FinancialDashboardYearlyTransactions from "./financialDashboardYearlyTransactions/FinancialDashboardYearlyTransactions";

type FinancialDashboardYearlyProps = {
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: string;
  yearlyCards: FinancialMetricsCards["yearlyCards"];
  yearlyCharts: FinancialMetricsCharts["yearlyCharts"];
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
};

function FinancialDashboardYearly({
  day,
  financialMetric,
  month,
  storeLocation,
  year,
  yearlyCards,
  yearlyCharts,
}: FinancialDashboardYearlyProps) {
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
