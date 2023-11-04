import { MantineNumberSize, Stack } from '@mantine/core';

import { FinancialMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardFinancialMetric,
  Year,
} from '../../types';
import { FinancialMetricsCharts } from '../utils';
import FinancialDashboardYearlyExpenses from './financialDashboardYearlyExpenses/FinancialDashboardYearlyExpenses';
import FinancialDashboardYearlyOtherMetrics from './financialDashboardYearlyOtherMetrics/FinancialDashboardYearlyOtherMetrics';
import FinancialDashboardYearlyProfit from './financialDashboardYearlyProfit/FinancialDashboardYearlyProfit';
import FinancialDashboardYearlyRevenue from './financialDashboardYearlyRevenue/FinancialDashboardYearlyRevenue';
import FinancialDashboardYearlyTransactions from './financialDashboardYearlyTransactions/FinancialDashboardYearlyTransactions';

function FinancialDashboardYearly({
  borderColor,
  businessMetrics,
  yearlyCards,
  yearlyCharts,
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
  yearlyCards: FinancialMetricsCards['yearlyCards'];
  yearlyCharts: FinancialMetricsCharts['yearlyCharts'];
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
      <FinancialDashboardYearlyProfit
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsProfit={yearlyCards.profit}
        yearlyChartsProfit={yearlyCharts.profit}
        day={day}
        month={month}
        padding={padding}
        width={width}
        year={year}
      />
    ) : financialMetric === 'Revenue' ? (
      <FinancialDashboardYearlyRevenue
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsRevenue={yearlyCards.revenue}
        yearlyChartsRevenue={yearlyCharts.revenue}
        day={day}
        month={month}
        padding={padding}
        width={width}
        year={year}
      />
    ) : financialMetric === 'Expenses' ? (
      <FinancialDashboardYearlyExpenses
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsExpenses={yearlyCards.expenses}
        yearlyChartsExpenses={yearlyCharts.expenses}
        day={day}
        month={month}
        padding={padding}
        width={width}
        year={year}
      />
    ) : financialMetric === 'Transactions' ? (
      <FinancialDashboardYearlyTransactions
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        yearlyCardsTransactions={yearlyCards.transactions}
        yearlyChartsTransactions={yearlyCharts.transactions}
        day={day}
        month={month}
        padding={padding}
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
