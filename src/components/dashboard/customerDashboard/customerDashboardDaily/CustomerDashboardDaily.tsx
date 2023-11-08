import { MantineNumberSize } from '@mantine/core';

import { CustomerMetricsCards } from '../../jsxHelpers';
import {
  BusinessMetricStoreLocation,
  DashboardCustomerMetric,
  Year,
} from '../../types';
import { CustomerMetricsCharts } from '../utils';
import CustomerDashboardDailyNew from './customerDashboardDailyNew/CustomerDashboardDailyNew';
import CustomerDashboardDailyOverview from './customerDashboardDailyOverview/CustomerDashboardDailyOverview';
import CustomerDashboardDailyReturning from './customerDashboardDailyReturning/CustomerDashboardDailyReturning';

function CustomerDashboardDaily({
  borderColor,
  customerMetric,
  dailyCards,
  dailyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  customerMetric: DashboardCustomerMetric;
  dailyCards: CustomerMetricsCards['dailyCards'];
  dailyCharts: CustomerMetricsCharts['dailyCharts'];
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

  const displayCustomerDashboardDaily =
    customerMetric === 'Overview' ? (
      <CustomerDashboardDailyOverview
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsOverview={dailyCards.overview}
        dailyChartsOverview={dailyCharts.overview}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : customerMetric === 'New' ? (
      <CustomerDashboardDailyNew
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsNew={dailyCards.new}
        dailyChartsNew={dailyCharts.new}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    ) : (
      <CustomerDashboardDailyReturning
        borderColor={borderColor}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        dailyCardsReturning={dailyCards.returning}
        dailyChartsReturning={dailyCharts.returning}
        day={day}
        month={month}
        padding={padding}
        storeLocation={storeLocation}
        width={width}
        year={year}
      />
    );

  return displayCustomerDashboardDaily;
}

export default CustomerDashboardDaily;
