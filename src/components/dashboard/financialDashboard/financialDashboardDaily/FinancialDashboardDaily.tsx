import { Stack } from "@mantine/core";

import { COLORS_SWATCHES } from "../../../../constants/data";
import { useGlobalState } from "../../../../hooks";
import { StoreLocation } from "../../../../types";
import { returnThemeColors } from "../../../../utils";
import { DashboardFinancialMetric, Month, Year } from "../../types";
import { FinancialMetricsCharts } from "../utils";
import { FinancialMetricsCards } from "../utilsTSX";
import FinancialDashboardDailyExpenses from "./financialDashboardDailyExpenses/FinancialDashboardDailyExpenses";
import FinancialDashboardDailyOtherMetrics from "./financialDashboardDailyOtherMetrics/FinancialDashboardDailyOtherMetrics";
import FinancialDashboardDailyProfit from "./financialDashboardDailyProfit/FinancialDashboardDailyProfit";
import FinancialDashboardDailyRevenue from "./financialDashboardDailyRevenue/FinancialDashboardDailyRevenue";
import FinancialDashboardDailyTransactions from "./financialDashboardDailyTransactions/FinancialDashboardDailyTransactions";

type FinancialDashboardDailyProps = {
  dailyCards: FinancialMetricsCards["dailyCards"];
  dailyCharts: FinancialMetricsCharts["dailyCharts"];
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: Month;
  storeLocation: StoreLocation;
  year: Year;
};

function FinancialDashboardDaily({
  dailyCards,
  dailyCharts,
  day,
  financialMetric,
  month,
  storeLocation,
  year,
}: FinancialDashboardDailyProps) {
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

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

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const financialDashboardDaily =
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

  return <Stack w="100%">{financialDashboardDaily}</Stack>;
}

export default FinancialDashboardDaily;
