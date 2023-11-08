import { MantineNumberSize, Stack } from '@mantine/core';

import { FinancialMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardFinancialMetric,
  Year,
} from '../../types';
import { FinancialMetricsCharts } from '../utils';
import FinancialDashboardMonthlyExpenses from './financialDashboardMonthlyExpenses/FinancialDashboardMonthlyExpenses';
import FinancialDashboardMonthlyOtherMetrics from './financialDashboardMonthlyOtherMetrics/FinancialDashboardMonthlyOtherMetrics';
import FinancialDashboardMonthlyProfit from './financialDashboardMonthlyProfit/FinancialDashboardMonthlyProfit';
import FinancialDashboardMonthlyRevenue from './financialDashboardMonthlyRevenue/FinancialDashboardMonthlyRevenue';
import FinancialDashboardMonthlyTransactions from './financialDashboardMonthlyTransactions/FinancialDashboardMonthlyTransactions';

function FinancialDashboardMonthly({
  borderColor,
  businessMetrics,
  monthlyCards,
  monthlyCharts,
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
  monthlyCards: FinancialMetricsCards['monthlyCards'];
  monthlyCharts: FinancialMetricsCharts['monthlyCharts'];
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
    ) : financialMetric === 'Revenue' ? (
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
    ) : financialMetric === 'Expenses' ? (
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
    ) : financialMetric === 'Transactions' ? (
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
