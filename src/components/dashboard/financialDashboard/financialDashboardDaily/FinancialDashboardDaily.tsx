import { MantineNumberSize, Stack } from '@mantine/core';

import { FinancialMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardFinancialMetric,
  Year,
} from '../../types';
import { FinancialMetricsCharts } from '../utils';
import FinancialDashboardDailyExpenses from './financialDashboardDailyExpenses/FinancialDashboardDailyExpenses';
import FinancialDashboardDailyOtherMetrics from './financialDashboardDailyOtherMetrics/FinancialDashboardDailyOtherMetrics';
import FinancialDashboardDailyProfit from './financialDashboardDailyProfit/FinancialDashboardDailyProfit';
import FinancialDashboardDailyRevenue from './financialDashboardDailyRevenue/FinancialDashboardDailyRevenue';
import FinancialDashboardDailyTransactions from './financialDashboardDailyTransactions/FinancialDashboardDailyTransactions';

function FinancialDashboardDaily({
  borderColor,
  businessMetrics,
  dailyCards,
  dailyCharts,
  day,
  financialMetric,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  dailyCards: FinancialMetricsCards['dailyCards'];
  dailyCharts: FinancialMetricsCharts['dailyCharts'];
  day: string;
  financialMetric: DashboardFinancialMetric;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
  if (!businessMetrics.length) {
    return null;
  }

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
  const chartHeight =
    width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = componentWidth;

  const displayFinancialMetricCategory =
    financialMetric === 'Profit' ? (
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
    ) : financialMetric === 'Revenue' ? (
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
    ) : financialMetric === 'Expenses' ? (
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
    ) : financialMetric === 'Transactions' ? (
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
