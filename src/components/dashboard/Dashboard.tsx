import {
  Accordion,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import localforage from "localforage";
import { ChangeEvent, useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES, STORE_LOCATION_DATA } from "../../constants/data";
import { globalAction } from "../../context/globalProvider/state";
import { useGlobalState } from "../../hooks";
import { returnAccessibleSelectInputElements } from "../../jsxCreators";
import { logState, returnThemeColors } from "../../utils";
import { AccessibleSelectInputCreatorInfo, ImageWrapper } from "../wrappers";
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
} from "./constants";
import { CustomerMetrics } from "./customer/CustomerMetrics";
import { FinancialMetrics } from "./financial/FinancialMetrics";
import { ProductMetrics } from "./product/ProductMetrics";
import { RepairMetrics } from "./repair/RepairMetrics";
import { dashboardAction, dashboardReducer, initialDashboardState } from "./state";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetric,
  DashboardFinancialMetric,
  DashboardMetricsView,
  DashboardProductMetric,
  DashboardRepairMetric,
  Year,
} from "./types";
import {
  createRandomBusinessMetrics,
  returnIsTabDisabled,
  splitSelectedCalendarDate,
} from "./utils";
import React from "react";

function Dashboard() {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initialDashboardState
  );

  const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

  const {
    appThemeColors: { backgroundColor },
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
    isLoading,
    loadingMessage,
  } = dashboardState;

  // useEffect(() => {
  //   globalDispatch({
  //     type: globalAction.setCustomizeChartsPageDataSelectedYYYYMMDD,
  //     payload: initialDashboardState.selectedYYYYMMDD,
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   globalDispatch({
  //     type: globalAction.setCustomizeChartsPageDataSelectedYYYYMMDD,
  //     payload: initialDashboardState.selectedYYYYMMDD,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedYYYYMMDD]);

  const isComponentMountedRef = React.useRef(false);
  useEffect(() => {
    isComponentMountedRef.current = true;
    const isMounted = isComponentMountedRef.current;

    async function createBusinessMetrics() {
      try {
        if (businessMetrics?.length) {
          return;
        }

        dashboardDispatch({
          type: dashboardAction.setIsLoading,
          payload: true,
        });

        const existingMetrics = await localforage.getItem<BusinessMetric[]>(
          "businessMetrics"
        );
        if (existingMetrics && isMounted) {
          dashboardDispatch({
            type: dashboardAction.setBusinessMetrics,
            payload: existingMetrics,
          });

          dashboardDispatch({
            type: dashboardAction.setIsLoading,
            payload: false,
          });

          return;
        }

        console.time("createRandomBusinessMetrics");

        const createdBusinessMetrics = await createRandomBusinessMetrics({
          daysPerMonth: DAYS_PER_MONTH,
          months: MONTHS,
          productCategories: PRODUCT_CATEGORIES,
          repairCategories: REPAIR_CATEGORIES,
          storeLocations: STORE_LOCATION_DATA.map((obj) => obj.value),
        });

        console.timeEnd("createRandomBusinessMetrics");

        if (!isMounted) {
          return;
        }

        dashboardDispatch({
          type: dashboardAction.setBusinessMetrics,
          payload: createdBusinessMetrics,
        });

        localforage.setItem<BusinessMetric[]>("businessMetrics", createdBusinessMetrics);

        dashboardDispatch({
          type: dashboardAction.setIsLoading,
          payload: false,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        showBoundary(error);
      }
    }

    createBusinessMetrics();

    return () => {
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayLoadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={2}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <ImageWrapper
            creatorInfoObject={{
              customHeight: 100,
              customWidth: 100,
              imageAlt: "intense generation...",
              imageSrc: "https://media1.tenor.com/m/H4b3ave7P08AAAAC/typing-busy.gif",
            }}
          />
          <Text>{loadingMessage}</Text>
          <Loader />
        </Stack>
      }
      transitionDuration={500}
    />
  );

  if (!businessMetrics?.length) {
    return displayLoadingOverlay;
  }

  const { selectedDate, selectedMonth, selectedYear } = splitSelectedCalendarDate({
    calendarDate: selectedYYYYMMDD,
    months: MONTHS,
  });

  const isTabDisabled = returnIsTabDisabled(storeLocationView, selectedYear);

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
          <Tabs.Tab
            key={`${idx}-${metricsView}`}
            value={metricsView}
            disabled={isTabDisabled}
          >
            {metricsView}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );

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
          <Tabs.Tab
            key={`${idx}-${calendarView}`}
            value={calendarView}
            disabled={isTabDisabled}
          >
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
      max={new Date().toISOString().split("T")[0]}
      min={
        storeLocationView === "Vancouver"
          ? new Date(2019, 0, 1).toISOString().split("T")[0]
          : storeLocationView === "Calgary"
          ? new Date(2017, 0, 1).toISOString().split("T")[0]
          : new Date(2013, 0, 1).toISOString().split("T")[0]
      }
      onChange={(event) => {
        const { value } = event.currentTarget;
        dashboardDispatch({
          type: dashboardAction.setSelectedYYYYMMDD,
          payload: value,
        });

        globalDispatch({
          type: globalAction.setCustomizeChartsPageDataSelectedYYYYMMDD,
          payload: value,
        });
      }}
      type="date"
      value={selectedYYYYMMDD}
    />
  );
  const displayYYYYMMDDInput = <Group w={330}>{createdYYYYMMDDInput}</Group>;

  const financialMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo =
    {
      data: FINANCIALS_METRICS_SELECT_INPUT_DATA,
      description: "Select financial metric category to view.",
      label: "Category",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        dashboardDispatch({
          type: dashboardAction.setFinancialMetric,
          payload: event.currentTarget.value as DashboardFinancialMetric,
        });
      },
      value: financialMetric,
    };

  const filteredCustomerMetricsSelectInputData =
    CUSTOMER_METRICS_SELECT_INPUT_DATA.filter((data) =>
      calendarView === "Daily" ? data !== "Other Metrics" : data
    );

  const customerMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: filteredCustomerMetricsSelectInputData,
    description: "Select customer metric category to view.",
    label: "Category",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      dashboardDispatch({
        type: dashboardAction.setCustomerMetric,
        payload: event.currentTarget.value as DashboardCustomerMetric,
      });
    },
    value: customerMetric,
  };

  const productMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: PRODUCT_METRICS_SELECT_INPUT_DATA,
    description: "Select product metric category to view.",
    label: "Category",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      dashboardDispatch({
        type: dashboardAction.setProductMetric,
        payload: event.currentTarget.value as DashboardProductMetric,
      });
    },
    value: productMetric,
  };

  const repairMetricCategorySelectInputCreatorInfo: AccessibleSelectInputCreatorInfo = {
    data: REPAIR_METRICS_SELECT_INPUT_DATA,
    description: "Select repair metric category to view.",
    label: "Category",
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      dashboardDispatch({
        type: dashboardAction.setRepairMetric,
        payload: event.currentTarget.value as DashboardRepairMetric,
      });
    },
    value: repairMetric,
  };

  const [createdMetricCategorySelectInput] = returnAccessibleSelectInputElements([
    metricsView === "Financials"
      ? financialMetricCategorySelectInputCreatorInfo
      : metricsView === "Customers"
      ? customerMetricCategorySelectInputCreatorInfo
      : metricsView === "Products"
      ? productMetricCategorySelectInputCreatorInfo
      : repairMetricCategorySelectInputCreatorInfo,
  ]);

  const createdStoreLocationTabs = (
    <Accordion
      w="100%"
      bg={backgroundColor}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        position: "sticky",
        top: 0,
        zIndex: 4,
      }}
    >
      <Accordion.Item value="Refine Metrics View">
        <Accordion.Control>
          <Title order={5}>Refine Metrics View</Title>
        </Accordion.Control>

        <Accordion.Panel>
          <Group position="apart">
            <Stack w={500}>
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
                  {STORE_LOCATION_VIEW_TABS_DATA.map((storeLocationView, idx) => {
                    const isStoreLocationTabDisabled =
                      (storeLocationView === "Vancouver" &&
                        Number(selectedYear) < 2019) ||
                      (storeLocationView === "Calgary" && Number(selectedYear) < 2017) ||
                      (storeLocationView === "Edmonton" && Number(selectedYear) < 2013);

                    return (
                      <Tabs.Tab
                        key={`${idx}-${storeLocationView}`}
                        value={storeLocationView}
                        disabled={isStoreLocationTabDisabled}
                      >
                        {storeLocationView}
                      </Tabs.Tab>
                    );
                  })}
                </Tabs.List>
              </Tabs>

              {createdMetricsTabs}

              {createdCalendarTabs}
            </Stack>
            <Group w={400} align="flex-end">
              {createdMetricCategorySelectInput}
              {displayYYYYMMDDInput}
            </Group>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const displayMetricsView =
    metricsView === "Financials" ? (
      // <FinancialDashboard
      //   businessMetrics={businessMetrics}
      //   calendarView={calendarView}
      //   selectedDate={selectedDate}
      //   financialMetric={financialMetric}
      //   selectedMonth={selectedMonth}
      //   storeLocationView={storeLocationView}
      //   selectedYYYYMMDD={selectedYYYYMMDD}
      //   selectedYear={selectedYear}
      // />

      <FinancialMetrics
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        storeLocationView={storeLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : metricsView === "Customers" ? (
      // <CustomerDashboard
      //   businessMetrics={businessMetrics}
      //   calendarView={calendarView}
      //   customerMetric={customerMetric}
      //   selectedDate={selectedDate}
      //   selectedMonth={selectedMonth}
      //   storeLocationView={storeLocationView}
      //   selectedYYYYMMDD={selectedYYYYMMDD}
      //   selectedYear={selectedYear}
      // />
      <CustomerMetrics
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        storeLocationView={storeLocationView}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
      />
    ) : metricsView === "Products" ? (
      // <ProductDashboard
      //   businessMetrics={businessMetrics}
      //   calendarView={calendarView}
      //   productMetric={productMetric}
      //   selectedDate={selectedDate}
      //   selectedMonth={selectedMonth}
      //   selectedYYYYMMDD={selectedYYYYMMDD}
      //   selectedYear={selectedYear}
      //   storeLocationView={storeLocationView}
      // />
      <ProductMetrics
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
        storeLocationView={storeLocationView}
      />
    ) : (
      // <RepairDashboard
      //   businessMetrics={businessMetrics}
      //   calendarView={calendarView}
      //   repairMetric={repairMetric}
      //   selectedDate={selectedDate}
      //   selectedMonth={selectedMonth}
      //   selectedYYYYMMDD={selectedYYYYMMDD}
      //   selectedYear={selectedYear}
      //   storeLocationView={storeLocationView}
      // />

      <RepairMetrics
        businessMetrics={businessMetrics}
        calendarView={calendarView}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        selectedYYYYMMDD={selectedYYYYMMDD}
        selectedYear={selectedYear}
        storeLocationView={storeLocationView}
      />
    );

  const dashboard = (
    <Stack w="100%">
      <Title order={2}>Dashboard</Title>
      <Text size="sm">Welcome to your dashboard</Text>
      {displayLoadingOverlay}
      {createdStoreLocationTabs}
      {displayMetricsView}
    </Stack>
  );

  return dashboard;
}

export default Dashboard;
