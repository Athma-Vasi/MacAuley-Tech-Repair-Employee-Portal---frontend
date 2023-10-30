import { Group, Stack, Tabs, Text, TextInput } from '@mantine/core';
import { useEffect, useReducer } from 'react';

import { useGlobalState } from '../../../hooks';
import {
  CALENDAR_TABS_DATA,
  MONTHS,
  STORE_LOCATION_TABS_DATA,
} from '../constants';
import { returnDashboardCustomerCardInfo } from '../jsxHelpers';
import { BusinessMetric, BusinessMetricStoreLocation, Year } from '../types';
import {
  customerDashboardAction,
  customerDashboardReducer,
  initialCustomerDashboardState,
} from './state';
import { DashboardCalendarView } from './types';
import { logState, returnThemeColors } from '../../../utils';
import CustomerDashboardDaily from './customerDashboardDaily/CustomerDashboardDaily';
import CustomerDashboardMonthly from './customerDashboardMonthly/CustomerDashboardMonthly';
import CustomerDashboardYearly from './customerDashboardYearly/CustomerDashboardYearly';
import {
  returnCustomerChartsData,
  returnSelectedDateCustomerMetrics,
} from './utils';
import { COLORS_SWATCHES } from '../../../constants/data';
import {
  AccessibleErrorValidTextElements,
  returnAccessibleDateTimeElements,
} from '../../../jsxCreators';

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
    globalState: { padding, width, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const {
    customerChartsData,
    customerCardsInfo,
    selectedCalendarView,
    selectedDate,
    selectedMonth,
    selectedStoreLocationView,
    selectedYear,
    selectedYYYYMMDD,
  } = customerDashboardState;

  useEffect(() => {
    const selectedCustomerMetrics = returnSelectedDateCustomerMetrics({
      businessMetrics,
      day: selectedDate,
      month: selectedMonth,
      months: MONTHS,
      storeLocation: selectedStoreLocationView,
      year: selectedYear,
    });

    const customerChartsData = returnCustomerChartsData({
      businessMetrics,
      months: MONTHS,
      selectedCustomerMetrics,
      storeLocation: selectedStoreLocationView,
    });

    customerDashboardDispatch({
      type: customerDashboardAction.setCustomerChartsData,
      payload: customerChartsData,
    });

    const customerCardsInfo = returnDashboardCustomerCardInfo({
      customerMetrics: selectedCustomerMetrics,
      padding,
      width,
    });

    customerDashboardDispatch({
      type: customerDashboardAction.setCustomerCardsInfo,
      payload: customerCardsInfo,
    });
  }, []);

  useEffect(() => {
    const selectedCustomerMetrics = returnSelectedDateCustomerMetrics({
      businessMetrics,
      day: selectedDate,
      month: selectedMonth,
      months: MONTHS,
      storeLocation: selectedStoreLocationView,
      year: selectedYear,
    });

    const customerChartsData = returnCustomerChartsData({
      businessMetrics,
      months: MONTHS,
      selectedCustomerMetrics,
      storeLocation: selectedStoreLocationView,
    });

    customerDashboardDispatch({
      type: customerDashboardAction.setCustomerChartsData,
      payload: customerChartsData,
    });

    const customerCardsInfo = returnDashboardCustomerCardInfo({
      customerMetrics: selectedCustomerMetrics,
      padding,
      width,
    });

    customerDashboardDispatch({
      type: customerDashboardAction.setCustomerCardsInfo,
      payload: customerCardsInfo,
    });
  }, [
    selectedStoreLocationView,
    selectedDate,
    selectedMonth,
    selectedYear,
    selectedCalendarView,
    selectedYYYYMMDD,
    businessMetrics,
  ]);

  useEffect(() => {
    logState({
      state: customerDashboardState,
      groupLabel: 'Customer Dashboard State',
    });
  }, [customerDashboardState]);

  if (!customerCardsInfo || !customerChartsData) {
    return null;
  }

  // store location tabs
  const createdStoreLocationTabs = (
    <Tabs
      value={selectedStoreLocationView}
      onTabChange={(value) => {
        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedStoreLocationView,
          payload: value as BusinessMetricStoreLocation,
        });
      }}
    >
      <Tabs.List>
        {STORE_LOCATION_TABS_DATA.map((tabData) => (
          <Tabs.Tab key={tabData.label} value={tabData.label}>
            {tabData.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {STORE_LOCATION_TABS_DATA.map((tabData) => (
        <Tabs.Panel key={tabData.label} value={tabData.label}>
          <Text>{tabData.message}</Text>
        </Tabs.Panel>
      ))}
    </Tabs>
  );

  const createdYYYYMMDDInput = (
    <TextInput
      type="date"
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
        const [year, month, date] = value.split('-');
        const YYYYMMDD = `${year}-${month}-${date}`;

        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedYYYYMMDD,
          payload: YYYYMMDD,
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedDate,
          payload: date.toString().padStart(2, '0'),
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedMonth,
          payload: MONTHS[parseInt(month) - 1],
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setSelectedYear,
          payload: year as Year,
        });
      }}
      value={selectedYYYYMMDD}
    />
  );
  const displayYYYYMMDDInput = <Group w={330}>{createdYYYYMMDDInput}</Group>;

  // calendar tabs
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

  // const { dailyCards, monthlyCards, yearlyCards } =
  //   returnDashboardCustomerCardInfo({
  //     customerMetrics: selectedCustomerMetrics,
  //     padding,
  //     width,
  //   });

  // const { dailyCharts, monthlyCharts, yearlyCharts } = returnCustomerChartsData(
  //   {
  //     businessMetrics,
  //     months: MONTHS,
  //     selectedCustomerMetrics,
  //     storeLocation: selectedStoreLocationView,
  //   }
  // );

  const displayCustomerCalendarInfo =
    selectedCalendarView === 'Daily' ? (
      <CustomerDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={customerCardsInfo.dailyCards}
        dailyCharts={customerChartsData.dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
      />
    ) : selectedCalendarView === 'Monthly' ? (
      <CustomerDashboardMonthly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        monthlyCards={customerCardsInfo.monthlyCards}
        monthlyCharts={customerChartsData.monthlyCharts}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
      />
    ) : (
      <CustomerDashboardYearly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        month={selectedYYYYMMDD.split('-')[1]}
        padding={padding}
        storeLocation={selectedStoreLocationView}
        width={width}
        year={selectedYear}
        yearlyCards={customerCardsInfo.yearlyCards}
        yearlyCharts={customerChartsData.yearlyCharts}
      />
    );

  const displayCustomerDashboardComponent = (
    <Stack w="100%" p={padding}>
      {createdStoreLocationTabs}
      {displayYYYYMMDDInput}
      {createdCalendarTabs}
      {displayCustomerCalendarInfo}
    </Stack>
  );

  return displayCustomerDashboardComponent;
}

export default CustomerDashboard;
