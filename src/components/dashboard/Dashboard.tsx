import {
  Flex,
  Group,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { TbCornerDownRight } from 'react-icons/tb';

import { COLORS_SWATCHES, STORE_LOCATION_DATA } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { logState, returnThemeColors } from '../../utils';
import {
  CALENDAR_VIEW_TABS_DATA,
  CUSTOMER_METRICS_SELECT_INPUT_DATA,
  DAYS_PER_MONTH,
  FINANCIALS_METRICS_SELECT_INPUT_DATA,
  METRICS_VIEW_TABS_DATA,
  MONTHS,
  PRODUCT_CATEGORIES,
  PRODUCT_METRICS_SELECT_INPUT_DATA,
  REPAIR_CATEGORIES,
  REPAIR_METRICS_SELECT_INPUT_DATA,
  STORE_LOCATION_VIEW_TABS_DATA,
} from './constants';
import CustomerDashboard from './customerDashboard/CustomerDashboard';
import FinancialDashboard from './financialDashboard/FinancialDashboard';
import RepairDashboard from './repairDashboard/RepairDashboard';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetrics,
  DashboardFinancialMetric,
  DashboardMetricsView,
  DashboardProductMetric,
  DashboardRepairMetric,
} from './types';
import {
  createRandomBusinessMetrics,
  splitSelectedCalendarDate,
} from './utils';
import { AccessibleSelectInputCreatorInfo } from '../wrappers';
import { returnAccessibleSelectInputElements } from '../../jsxCreators';
import ProductDashboard from './productDashboard/ProductDashboard';

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor, backgroundColor },
    generalColors: { iconGray },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const {
    businessMetrics,
    calendarView,
    customerMetric,
    financialMetric,
    metricsView,
    productMetric,
    repairMetric,
    storeLocationView,
    selectedYYYYMMDD,
  } = dashboardState;

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

    // businessMetrics?.forEach((businessMetric) => {
    //   businessMetric.productMetrics.forEach((productMetric) => {
    //     const total = productMetric.yearlyMetrics.reduce(
    //       (acc, yearlyMetric) => {
    //         if (yearlyMetric.year === '2013') {
    //           console.group(businessMetric.storeLocation, productMetric.name);
    //           console.log(
    //             'yearlyMetric.revenue.total',
    //             yearlyMetric.revenue.total
    //           );
    //           console.groupEnd();

    //           acc += yearlyMetric.revenue.total;
    //         }

    //         return acc;
    //       },
    //       0
    //     );

    //     console.log('total', total);
    //   });
    // });
  }, [dashboardState]);

  if (!businessMetrics.length) {
    return null;
  }

  // metrics tabs
  const createdMetricsTabs = (
    <Tabs
      value={metricsView}
      onTabChange={(value) => {
        dashboardDispatch({
          type: dashboardAction.setMetricsView,
          payload: value as DashboardMetricsView,
        });
      }}
    >
      <Tabs.List>
        {METRICS_VIEW_TABS_DATA.map((metricsView, idx) => (
          <Tabs.Tab key={`${idx}-${metricsView}`} value={metricsView}>
            {metricsView}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );

  // calendar tabs
  const createdCalendarTabs = (
    <Tabs
      value={calendarView}
      onTabChange={(value) => {
        dashboardDispatch({
          type: dashboardAction.setCalendarView,
          payload: value as DashboardCalendarView,
        });
      }}
    >
      <Tabs.List>
        {CALENDAR_VIEW_TABS_DATA.map((calendarView, idx) => (
          <Tabs.Tab key={`${idx}-${calendarView}`} value={calendarView}>
            {calendarView}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );

  const createdYYYYMMDDInput = (
    <TextInput
      aria-label='Please enter date in format "date-date-month-month-year-year-year-year"'
      description="View metrics for selected calendar date."
      label="Calendar Date"
      max={new Date().toISOString().split('T')[0]}
      min={
        storeLocationView === 'Vancouver'
          ? new Date(2019, 0, 1).toISOString().split('T')[0]
          : storeLocationView === 'Calgary'
          ? new Date(2017, 0, 1).toISOString().split('T')[0]
          : new Date(2013, 0, 1).toISOString().split('T')[0]
      }
      onChange={(event) => {
        const { value } = event.currentTarget;
        dashboardDispatch({
          type: dashboardAction.setSelectedYYYYMMDD,
          payload: value,
        });
      }}
      type="date"
      value={selectedYYYYMMDD}
    />
  );
  const displayYYYYMMDDInput = <Group w={330}>{createdYYYYMMDDInput}</Group>;

  // financial metric select input
  const financialMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: FINANCIALS_METRICS_SELECT_INPUT_DATA,
      description: 'Select financial metric category to view.',
      label: 'Category',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dashboardDispatch({
          type: dashboardAction.setFinancialMetric,
          payload: event.currentTarget.value as DashboardFinancialMetric,
        });
      },
      value: financialMetric,
    };

  // customer metric select input
  const customerMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: CUSTOMER_METRICS_SELECT_INPUT_DATA,
      description: 'Select customer metric category to view.',
      label: 'Category',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dashboardDispatch({
          type: dashboardAction.setCustomerMetric,
          payload: event.currentTarget.value as DashboardCustomerMetrics,
        });
      },
      value: customerMetric,
    };

  // product metric select input
  const productMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: PRODUCT_METRICS_SELECT_INPUT_DATA,
      description: 'Select product metric category to view.',
      label: 'Category',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dashboardDispatch({
          type: dashboardAction.setProductMetric,
          payload: event.currentTarget.value as DashboardProductMetric,
        });
      },
      value: productMetric,
    };

  // repair metric select input
  const repairMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: REPAIR_METRICS_SELECT_INPUT_DATA,
      description: 'Select repair metric category to view.',
      label: 'Category',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dashboardDispatch({
          type: dashboardAction.setRepairMetric,
          payload: event.currentTarget.value as DashboardRepairMetric,
        });
      },
      value: repairMetric,
    };

  const [createdMetricCategorySelectInput] =
    returnAccessibleSelectInputElements([
      metricsView === 'Financials'
        ? financialMetricCategorySelectInputCreatorInfo
        : metricsView === 'Customers'
        ? customerMetricCategorySelectInputCreatorInfo
        : metricsView === 'Products'
        ? productMetricCategorySelectInputCreatorInfo
        : repairMetricCategorySelectInputCreatorInfo,
    ]);

  // store location tabs
  const createdStoreLocationTabs = (
    <Flex
      direction="column"
      bg={backgroundColor}
      pb={padding}
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
      w="100%"
    >
      <Group position="apart">
        <Stack>
          <Tabs
            value={storeLocationView}
            onTabChange={(value) => {
              dashboardDispatch({
                type: dashboardAction.setStoreLocationView,
                payload: value as BusinessMetricStoreLocation,
              });
            }}
          >
            <Tabs.List>
              {STORE_LOCATION_VIEW_TABS_DATA.map((storeLocationView, idx) => (
                <Tabs.Tab
                  key={`${idx}-${storeLocationView}`}
                  value={storeLocationView}
                >
                  {storeLocationView}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>

          {createdMetricsTabs}

          {createdCalendarTabs}
        </Stack>
        <Stack w={330}>
          {createdMetricCategorySelectInput}
          {displayYYYYMMDDInput}
        </Stack>
      </Group>
    </Flex>
  );

  const { selectedDate, selectedMonth, selectedYear } =
    splitSelectedCalendarDate({
      calendarDate: selectedYYYYMMDD,
      months: MONTHS,
    });

  const displayMetricsView =
    metricsView === 'Financials' ? (
      <FinancialDashboard
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        financialMetric={financialMetric}
        selectedMonth={selectedMonth}
        storeLocationView={storeLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : metricsView === 'Customers' ? (
      <CustomerDashboard
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        storeLocationView={storeLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : metricsView === 'Products' ? (
      <ProductDashboard
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        productMetric={productMetric}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
        storeLocationView={storeLocationView}
      />
    ) : (
      <RepairDashboard
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        repairMetric={repairMetric}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
        storeLocationView={storeLocationView}
      />
    );

  const displayDashboardComponent = (
    <Stack w="100%">
      <Title order={2}>Dashboard</Title>
      <Text size="sm">Welcome to your dashboard</Text>
      {createdStoreLocationTabs}
      {displayMetricsView}
    </Stack>
  );

  return displayDashboardComponent;
}

export default Dashboard;
