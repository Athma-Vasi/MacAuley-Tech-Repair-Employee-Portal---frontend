import { Loader, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { COLORS_SWATCHES } from "../../../constants/data";
import { globalAction } from "../../../context/globalProvider/state";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { MONTHS } from "../constants";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetric,
  Month,
  Year,
} from "../types";
import CustomerDashboardDaily from "./customerDashboardDaily/CustomerDashboardDaily";
import CustomerDashboardMonthly from "./customerDashboardMonthly/CustomerDashboardMonthly";
import CustomerDashboardYearly from "./customerDashboardYearly/CustomerDashboardYearly";
import {
  customerDashboardAction,
  customerDashboardReducer,
  initialCustomerDashboardState,
} from "./state";
import { createCustomerMetricsCharts, returnSelectedDateCustomerMetrics } from "./utils";
import { createCustomerMetricsCards } from "./utilsTSX";

type CustomerDashboardProps = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  customerMetric: DashboardCustomerMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
};

function CustomerDashboard({
  businessMetrics,
  calendarView,
  customerMetric,
  selectedDate,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: CustomerDashboardProps) {
  const [customerDashboardState, customerDashboardDispatch] = useReducer(
    customerDashboardReducer,
    initialCustomerDashboardState
  );
  const { customerMetricsCards, customerMetricsCharts, isLoading, loadingMessage } =
    customerDashboardState;

  const {
    globalState: { themeObject, padding, width },
    globalDispatch,
  } = useGlobalState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const {
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  useEffect(() => {
    let isMounted = true;

    async function generateCustomerChartsCards() {
      customerDashboardDispatch({
        type: customerDashboardAction.setIsLoading,
        payload: true,
      });
      customerDashboardDispatch({
        type: customerDashboardAction.setLoadingMessage,
        payload: "Loading customer metrics...",
      });

      try {
        const selectedDateCustomerMetrics = returnSelectedDateCustomerMetrics({
          businessMetrics,
          day: selectedDate,
          month: selectedMonth,
          months: MONTHS,
          storeLocation: storeLocationView,
          year: selectedYear,
        });

        console.log("selectedDateCustomerMetrics", selectedDateCustomerMetrics);

        const customerMetricsCharts = await createCustomerMetricsCharts({
          businessMetrics,
          months: MONTHS,
          selectedDateCustomerMetrics,
          storeLocation: storeLocationView,
        });

        const customerMetricsCards = await createCustomerMetricsCards({
          greenColorShade,
          padding,
          redColorShade,
          selectedDateCustomerMetrics,
          width,
        });

        if (!isMounted) {
          return;
        }

        customerDashboardDispatch({
          type: customerDashboardAction.setCustomerMetricsCards,
          payload: customerMetricsCards,
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setCustomerMetricsCharts,
          payload: customerMetricsCharts,
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setIsLoading,
          payload: false,
        });

        customerDashboardDispatch({
          type: customerDashboardAction.setLoadingMessage,
          payload: "",
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage: error?.message ?? "Unknown error occurred. Please try again.",
            errorCallback: () => {
              navigate("/home");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      }
    }

    if (businessMetrics?.length || !customerMetricsCards || !customerMetricsCharts) {
      generateCustomerChartsCards();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD, storeLocationView, customerMetric]);

  if (!businessMetrics?.length || !customerMetricsCards || !customerMetricsCharts) {
    return null;
  }

  const { dailyCards, monthlyCards, yearlyCards } = customerMetricsCards;
  const { dailyCharts, monthlyCharts, yearlyCharts } = customerMetricsCharts;

  const customerDashboard =
    calendarView === "Daily" ? (
      <CustomerDashboardDaily
        customerMetric={customerMetric}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    ) : calendarView === "Monthly" ? (
      <CustomerDashboardMonthly
        customerMetric={customerMetric}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    ) : (
      <CustomerDashboardYearly
        customerMetric={customerMetric}
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    );

  const loadingOverlay = (
    <LoadingOverlay
      visible={isLoading}
      zIndex={2}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Loader />
          <Text>{loadingMessage}</Text>
        </Stack>
      }
      transitionDuration={500}
    />
  );

  return (
    <Stack>
      {loadingOverlay}
      {customerDashboard}
    </Stack>
  );
}

export default CustomerDashboard;
