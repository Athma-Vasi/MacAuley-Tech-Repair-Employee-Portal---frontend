import { Stack, Tabs, Text } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useGlobalState } from '../../../hooks';
import { CALENDAR_TABS_DATA, MONTHS } from '../constants';
import { returnDashboardCustomerCardInfo } from '../jsxHelpers';
import { BusinessMetric } from '../types';
import {
  customerDashboardAction,
  customerDashboardReducer,
  initialCustomerDashboardState,
} from './state';
import { DashboardCalendarView } from './types';
import { logState } from '../../../utils';
import CustomerDashboardDaily from './CustomerDashboardDaily';
import CustomerDashboardMonthly from './CustomerDashboardMonthly';
import CustomerDashboardYearly from './CustomerDashboardYearly';
import {
  returnCustomerChartsData,
  returnSelectedCustomerMetrics,
} from './utils';

function CustomerDashboard({
  businessMetrics,
}: {
  businessMetrics: BusinessMetric[];
}) {
  const [customerDashboardState, customerDashboardDispatch] = useReducer(
    customerDashboardReducer,
    initialCustomerDashboardState
  );

  const {
    globalState: { padding, width },
  } = useGlobalState();

  const { selectedCalendarView, selectedCustomerMetrics } =
    customerDashboardState;

  useEffect(() => {
    const customerMetrics = returnSelectedCustomerMetrics({
      businessMetrics,
      day: new Date().getDate().toString().padStart(2, '0'),
      month: MONTHS[new Date().getMonth()],
      months: MONTHS,
      storeLocation: 'Edmonton',
      year: '2023',
    });

    customerDashboardDispatch({
      type: customerDashboardAction.setSelectedCustomerMetrics,
      payload: customerMetrics,
    });
  }, []);

  // tabs component
  const createdCalendarTabs = (
    <Tabs
      value={selectedCalendarView}
      onTabChange={(value) => {
        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedCalendarView,
          payload: value as DashboardCalendarView,
        });
      }}
    >
      <Tabs.List>
        {CALENDAR_TABS_DATA.map((tabData) => (
          <Tabs.Tab key={tabData.label} value={tabData.label}>
            {tabData.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {CALENDAR_TABS_DATA.map((tabData) => (
        <Tabs.Panel key={tabData.label} value={tabData.label}>
          <Text>{tabData.message}</Text>
        </Tabs.Panel>
      ))}
    </Tabs>
  );

  const { dailyCards, monthlyCards, yearlyCards } =
    returnDashboardCustomerCardInfo({
      customerMetrics: selectedCustomerMetrics,
      padding,
      width,
    });

  const { dailyCharts, monthlyCharts, yearlyCharts } = returnCustomerChartsData(
    {
      businessMetrics,
      selectedCustomerMetrics,
      storeLocation: 'Edmonton',
    }
  );

  const displayCustomerCalendarInfo =
    selectedCalendarView === 'Daily' ? (
      <CustomerDashboardDaily
        businessMetrics={businessMetrics}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        padding={padding}
        selectedCustomerMetrics={selectedCustomerMetrics}
        storeLocation="Edmonton"
        width={width}
      />
    ) : selectedCalendarView === 'Monthly' ? (
      <CustomerDashboardMonthly
        businessMetrics={businessMetrics}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        padding={padding}
        selectedCustomerMetrics={selectedCustomerMetrics}
        storeLocation="Edmonton"
        width={width}
      />
    ) : (
      <CustomerDashboardYearly
        businessMetrics={businessMetrics}
        padding={padding}
        selectedCustomerMetrics={selectedCustomerMetrics}
        storeLocation="Edmonton"
        width={width}
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
      />
    );

  const displayCustomerDashboardComponent = (
    <Stack w="100%">
      {createdCalendarTabs}
      {displayCustomerCalendarInfo}
    </Stack>
  );

  useEffect(() => {
    logState({
      state: customerDashboardState,
      groupLabel: 'Customer Dashboard State',
    });
  }, [customerDashboardState]);

  return displayCustomerDashboardComponent;
}

export default CustomerDashboard;
