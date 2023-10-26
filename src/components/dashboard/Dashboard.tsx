import {
  Button,
  Group,
  Modal,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';

import { STORE_LOCATION_DATA } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { returnAccessibleSelectInputElements } from '../../jsxCreators';
import { StoreLocation } from '../../types';
import { logState } from '../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
  ResponsiveRadialBarChart,
  ResponsiveSunburstChart,
} from '../charts';
import { SunburstChartData } from '../charts/responsiveSunburstChart/types';
import {
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  SALES_CATEGORY_SELECTION,
  SALES_DATA_ENTRY_TYPE,
  YEAR_CHURN_RATE_SPREAD,
  YEAR_CONVERSION_RATE_SPREAD,
  YEAR_CUSTOMERS_SPREAD,
  YEAR_PROFIT_MARGIN_SPREAD,
  YEAR_TRANSACTIONS_SPREAD,
} from './constants';
import { DashboardChartCard } from './DashboardChartCard';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import {
  FinancialMetric,
  ProductCategoryMetric,
  RepairCategoryMetric,
  SalesCategorySelection,
  BusinessMetrics,
  SalesDataEntryType,
} from './types';
import { createRandomBusinessMetrics } from './utils';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const {
    globalState: { padding, rowGap, width, themeObject },
  } = useGlobalState();

  const { businessMetrics } = dashboardState;

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
      yearProfitMarginSpread: YEAR_PROFIT_MARGIN_SPREAD,
      yearTransactionsSpread: YEAR_TRANSACTIONS_SPREAD,
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

  const displayDashboardComponent = (
    <Group w="100%">
      <Text>Dashboard</Text>
    </Group>
  );

  return displayDashboardComponent;
}

export default Dashboard;
