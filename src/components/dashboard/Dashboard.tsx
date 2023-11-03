import {
  Flex,
  Group,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { COLORS_SWATCHES, STORE_LOCATION_DATA } from '../../constants/data';
import { logState, returnThemeColors } from '../../utils';
import {
  CALENDAR_VIEW_TABS_DATA,
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  STORE_LOCATION_VIEW_TABS_DATA,
} from './constants';
import {
  dashboardAction,
  dashboardReducer,
  initialDashboardState,
} from './state';
import {
  createRandomBusinessMetrics,
  splitSelectedCalendarDate,
} from './utils';
import FinancialDashboard from './financialDashboard/FinancialDashboard';
import RepairDashboard from './repairDashboard/RepairDashboard';
import {
  DashboardCalendarView,
  BusinessMetricStoreLocation,
  Year,
  Month,
} from './types';
import CustomerDashboard from './customerDashboard/CustomerDashboard';
import { useGlobalState } from '../../hooks';

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
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const {
    businessMetrics,
    selectedCalendarView,
    selectedStoreLocationView,
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
  }, [dashboardState]);

  if (!businessMetrics.length) {
    return null;
  }

  const createdYYYYMMDDInput = (
    <TextInput
      aria-label='Please enter date in format "date-date-month-month-year-year-year-year"'
      description="View metrics for selected calendar date."
      label="Calendar Date"
      max={new Date().toISOString().split('T')[0]}
      min={
        selectedStoreLocationView === 'Vancouver'
          ? new Date(2019, 0, 1).toISOString().split('T')[0]
          : selectedStoreLocationView === 'Calgary'
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

  // calendar tabs
  const createdCalendarTabs = (
    <Tabs
      value={selectedCalendarView}
      onTabChange={(value) => {
        dashboardDispatch({
          type: dashboardAction.setSelectedCalendarView,
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

  // store location tabs
  const createdStoreLocationTabs = (
    <Flex
      direction="column"
      bg={backgroundColor}
      w="100%"
      style={{
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 4,
      }}
    >
      <Group position="apart">
        <Tabs
          value={selectedStoreLocationView}
          onTabChange={(value) => {
            dashboardDispatch({
              type: dashboardAction.setSelectedStoreLocationView,
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
        {displayYYYYMMDDInput}
      </Group>
      {createdCalendarTabs}
    </Flex>
  );

  const { selectedDate, selectedMonth, selectedYear } =
    splitSelectedCalendarDate({
      calendarDate: selectedYYYYMMDD,
      months: MONTHS,
    });

  const displayCustomerDashboard = (
    <CustomerDashboard
      businessMetrics={businessMetrics}
      selectedCalendarView={selectedCalendarView}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedStoreLocationView={selectedStoreLocationView}
      selectedYYYYMMDD={selectedYYYYMMDD}
      selectedYear={selectedYear}
    />
  );

  // const displayFinancialDashboard = (
  //   <FinancialDashboard businessMetrics={businessMetrics} />
  // );

  // const displayRepairDashboard = (
  //   <RepairDashboard businessMetrics={businessMetrics} />
  // );

  const displayDashboardComponent = (
    <Stack w="100%">
      <Title order={2}>Dashboard</Title>
      <Text size="sm">Welcome to your dashboard</Text>
      {createdStoreLocationTabs}
      {displayCustomerDashboard}
      {/* {displayFinancialDashboard} */}
      {/* {displayRepairDashboard} */}
    </Stack>
  );

  return displayDashboardComponent;
}

export default Dashboard;
