import { MantineNumberSize } from '@mantine/core';

import { CustomerMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetricStoreLocation,
  DashboardCustomerMetric,
  Year,
} from '../../types';
import { CustomerMetricsCharts } from '../utils';
import CustomerDashboardMonthlyNew from './customerDashboardMonthlyNew/CustomerDashboardMonthlyNew';
import CustomerDashboardMonthlyOtherMetrics from './customerDashboardMonthlyOtherMetrics/CustomerDashboardMonthlyOtherMetrics';
import CustomerDashboardMonthlyOverview from './customerDashboardMonthlyOverview/CustomerDashboardMonthlyOverview';
import CustomerDashboardMonthlyReturning from './customerDashboardMonthlyReturning/CustomerDashboardMonthlyReturning';

function CustomerDashboardMonthly({
  borderColor,
  customerMetric,
  monthlyCards,
  monthlyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  customerMetric: DashboardCustomerMetric;
  monthlyCards: CustomerMetricsCards['monthlyCards'];
  monthlyCharts: CustomerMetricsCharts['monthlyCharts'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: Year;
}) {
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

  const displayCustomerDashboardMonthly =
    customerMetric === 'Overview' ? (
      <CustomerDashboardMonthlyOverview
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsOverview={monthlyCards.overview}
        monthlyChartsOverview={monthlyCharts.overview}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === 'New' ? (
      <CustomerDashboardMonthlyNew
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsNew={monthlyCards.new}
        monthlyChartsNew={monthlyCharts.new}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === 'Returning' ? (
      <CustomerDashboardMonthlyReturning
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsReturning={monthlyCards.returning}
        monthlyChartsReturning={monthlyCharts.returning}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <CustomerDashboardMonthlyOtherMetrics
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        monthlyCardsOtherMetrics={[
          ...monthlyCards.churnRate,
          ...monthlyCards.retentionRate,
        ]}
        monthlyChartsOtherMetrics={monthlyCharts.churnRetention}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  return displayCustomerDashboardMonthly;
}

export default CustomerDashboardMonthly;
