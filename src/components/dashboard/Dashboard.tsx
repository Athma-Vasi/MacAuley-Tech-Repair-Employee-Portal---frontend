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
import { TbCornerDownRight } from 'react-icons/tb';

import { COLORS_SWATCHES, STORE_LOCATION_DATA } from '../../constants/data';
import { useGlobalState } from '../../hooks';
import { logState, returnThemeColors } from '../../utils';
import {
  CALENDAR_VIEW_TABS_DATA,
  DAYS_PER_MONTH,
  FINANCIALS_VIEW_TABS_DATA,
  METRICS_VIEW_TABS_DATA,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
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
  DashboardFinancialsView,
  DashboardMetricsView,
} from './types';
import {
  createRandomBusinessMetrics,
  splitSelectedCalendarDate,
} from './utils';

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
    selectedCalendarView,
    selectedFinancialsView,
    selectedMetricsView,
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

  // metrics tabs
  const createdMetricsTabs = (
    <Tabs
      value={selectedMetricsView}
      onTabChange={(value) => {
        dashboardDispatch({
          type: dashboardAction.setSelectedMetricsView,
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

  // financials tabs
  const createdFinancialsTabs = (
    <Tabs
      value={selectedFinancialsView}
      onTabChange={(value) => {
        dashboardDispatch({
          type: dashboardAction.setSelectedFinancialsView,
          payload: value as DashboardFinancialsView,
        });
      }}
    >
      <Tabs.List>
        {FINANCIALS_VIEW_TABS_DATA.map((financialsView, idx) => (
          <Tabs.Tab key={`${idx}-${financialsView}`} value={financialsView}>
            {financialsView}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );

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
        <Stack>
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

          {createdMetricsTabs}

          {selectedMetricsView === 'Financials' ? createdFinancialsTabs : null}

          {createdCalendarTabs}
        </Stack>
        {displayYYYYMMDDInput}
      </Group>
    </Flex>
  );

  const { selectedDate, selectedMonth, selectedYear } =
    splitSelectedCalendarDate({
      calendarDate: selectedYYYYMMDD,
      months: MONTHS,
    });

  const displayMetricsView =
    selectedMetricsView === 'Financials' ? (
      <FinancialDashboard
        businessMetrics={businessMetrics}
        selectedCalendarView={selectedCalendarView}
        selectedDate={selectedDate}
        selectedFinancialsView={selectedFinancialsView}
        selectedMonth={selectedMonth}
        selectedStoreLocationView={selectedStoreLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : selectedMetricsView === 'Customers' ? (
      <CustomerDashboard
        businessMetrics={businessMetrics}
        selectedCalendarView={selectedCalendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedStoreLocationView={selectedStoreLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : selectedMetricsView === 'Products' ? (
      <RepairDashboard
        businessMetrics={businessMetrics}
        selectedCalendarView={selectedCalendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedStoreLocationView={selectedStoreLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : (
      <RepairDashboard
        businessMetrics={businessMetrics}
        selectedCalendarView={selectedCalendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedStoreLocationView={selectedStoreLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
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
