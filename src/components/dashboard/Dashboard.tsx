import { Group, Stack, Text, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { STORE_LOCATION_DATA } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { logState } from '../../utils';
import {
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  YEAR_CHURN_RATE_SPREAD,
  YEAR_CONVERSION_RATE_SPREAD,
  YEAR_CUSTOMERS_SPREAD,
  YEAR_NEW_CUSTOMERS_SPREAD,
  YEAR_PROFIT_MARGIN_SPREAD,
  YEAR_TRANSACTIONS_SPREAD,
} from './constants';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import {
  SelectedCustomerMetrics,
  createRandomBusinessMetrics,
  returnCustomerSunburstChartData,
  returnSelectedCustomerMetrics,
} from './utils';
import {
  returnDashboardChartCardInfo,
  returnDashboardChartCard,
} from '../../jsxCreators';
import { SunburstChartData } from '../charts/responsiveSunburstChart/types';
import { ResponsiveSunburstChart } from '../charts';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const {
    globalState: { padding, rowGap, width, themeObject },
  } = useGlobalState();

  const { businessMetrics, selectedCustomerMetrics } = dashboardState;

  useEffect(() => {
    const businessMetrics = createRandomBusinessMetrics({
      daysPerMonth: DAYS_PER_MONTH,
      months: MONTHS,
      productCategories: PRODUCT_CATEGORIES,
      repairCategories: REPAIR_CATEGORIES,
      storeLocations: STORE_LOCATION_DATA,
      yearChurnRateSpread: YEAR_CHURN_RATE_SPREAD,
      yearConversionRateSpread: YEAR_CONVERSION_RATE_SPREAD,
      yearCustomersSpread: YEAR_CUSTOMERS_SPREAD,
      yearNewCustomersSpread: YEAR_NEW_CUSTOMERS_SPREAD,
      yearProfitMarginSpread: YEAR_PROFIT_MARGIN_SPREAD,
      yearTransactionsSpread: YEAR_TRANSACTIONS_SPREAD,
    });

    const customerMetrics = returnSelectedCustomerMetrics({
      businessMetrics,
      day: new Date().getDate().toString().padStart(2, '0'),
      month: MONTHS[new Date().getMonth()],
      months: MONTHS,
      storeLocation: 'Edmonton',
      year: '2023',
    });

    dashboardDispatch({
      type: dashboardAction.setBusinessMetrics,
      payload: businessMetrics,
    });

    dashboardDispatch({
      type: dashboardAction.setSelectedCustomerMetrics,
      payload: customerMetrics,
    });
  }, []);

  useEffect(() => {
    logState({
      state: dashboardState,
      groupLabel: 'Dashboard State',
    });
  }, [dashboardState]);

  if (!businessMetrics.length || !Object.keys(selectedCustomerMetrics).length) {
    return null;
  }

  const { dailyChartCards, monthlyChartCards, yearlyChartCards } =
    returnDashboardChartCardInfo({
      customerMetrics: selectedCustomerMetrics,
      padding,
      width,
    });

  const {
    dailyCustomersSunburstChartData,
    monthlyCustomersSunburstChartData,
    yearlyCustomersSunburstChartData,
  } = returnCustomerSunburstChartData(selectedCustomerMetrics);

  // DAILY OVERVIEW
  const dailyTitle = <Title order={4}>Daily Overview</Title>;
  const dailyChartCardsDisplay = dailyChartCards.map((chartCardInfo, idx) => (
    <Group key={`${chartCardInfo.value}-${idx}`}>
      {returnDashboardChartCard(chartCardInfo)}
    </Group>
  ));
  const dailyCustomersSunburstChartDisplay = (
    <ResponsiveSunburstChart
      sunburstChartData={dailyCustomersSunburstChartData}
      hideControls
      valueFormat={(value) => `${value} customers`}
    />
  );
  const displayDailyOverviewSection = (
    <Stack w="100%">
      {dailyTitle}
      {dailyChartCardsDisplay}
      {dailyCustomersSunburstChartDisplay}
    </Stack>
  );

  // MONTHLY OVERVIEW
  const monthlyTitle = <Title order={4}>Monthly Overview</Title>;
  const monthlyChartCardsDisplay = monthlyChartCards.map(
    (chartCardInfo, idx) => (
      <Group key={`${chartCardInfo.value}-${idx}`}>
        {returnDashboardChartCard(chartCardInfo)}
      </Group>
    )
  );
  const monthlyCustomersSunburstChartDisplay = (
    <ResponsiveSunburstChart
      sunburstChartData={monthlyCustomersSunburstChartData}
      hideControls
      valueFormat={(value) => `${value} customers`}
    />
  );
  const displayMonthlyOverviewSection = (
    <Stack w="100%">
      {monthlyTitle}
      {monthlyChartCardsDisplay}
      {monthlyCustomersSunburstChartDisplay}
    </Stack>
  );

  // YEARLY OVERVIEW
  const yearlyTitle = <Title order={4}>Yearly Overview</Title>;
  const yearlyChartCardsDisplay = yearlyChartCards.map((chartCardInfo, idx) => (
    <Group key={`${chartCardInfo.value}-${idx}`}>
      {returnDashboardChartCard(chartCardInfo)}
    </Group>
  ));
  const yearlyCustomersSunburstChartDisplay = (
    <ResponsiveSunburstChart
      sunburstChartData={yearlyCustomersSunburstChartData}
      hideControls
      valueFormat={(value) => `${value} customers`}
    />
  );
  const displayYearlyOverviewSection = (
    <Stack w="100%">
      {yearlyTitle}
      {yearlyChartCardsDisplay}
      {yearlyCustomersSunburstChartDisplay}
    </Stack>
  );

  const displayDashboardComponent = (
    <Stack w="100%">
      <Title order={2}>Dashboard</Title>
      <Text size="sm">Welcome to your dashboard</Text>

      {displayDailyOverviewSection}
      {displayMonthlyOverviewSection}
      {displayYearlyOverviewSection}
    </Stack>
  );

  return displayDashboardComponent;
}

export default Dashboard;
