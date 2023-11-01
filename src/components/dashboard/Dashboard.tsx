import { Stack, Text, Title } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { STORE_LOCATION_DATA } from '../../constants/data';
import { logState } from '../../utils';
import {
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
} from './constants';
import CustomerDashboard from './customerDashboard/CustomerDashboard';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import { createRandomBusinessMetrics } from './utils';
import FinancialDashboard from './financialDashboard/FinancialDashboard';
import RepairDashboard from './repairDashboard/RepairDashboard';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const { businessMetrics } = dashboardState;

  useEffect(() => {
    const businessMetrics = createRandomBusinessMetrics({
      daysPerMonth: DAYS_PER_MONTH,
      months: MONTHS,
      productCategories: PRODUCT_CATEGORIES,
      repairCategories: REPAIR_CATEGORIES,
      storeLocations: STORE_LOCATION_DATA,
    });

    dashboardDispatch({
      type: dashboardAction.setBusinessMetrics,
      payload: businessMetrics,
    });
  }, []);

  useEffect(() => {
    logState({
      state: dashboardState,
      groupLabel: 'Dashboard State',
    });
  }, [dashboardState]);

  if (!businessMetrics.length) {
    return null;
  }

  // const displayCustomerDashboard = (
  //   <CustomerDashboard businessMetrics={businessMetrics} />
  // );

  const displayFinancialDashboard = (
    <FinancialDashboard businessMetrics={businessMetrics} />
  );

  // const displayRepairDashboard = (
  //   <RepairDashboard businessMetrics={businessMetrics} />
  // );

  const displayDashboardComponent = (
    <Stack w="100%">
      <Title order={2}>Dashboard</Title>
      <Text size="sm">Welcome to your dashboard</Text>
      {/* {displayCustomerDashboard} */}
      {displayFinancialDashboard}
      {/* {displayRepairDashboard} */}
    </Stack>
  );

  return displayDashboardComponent;
}

export default Dashboard;
