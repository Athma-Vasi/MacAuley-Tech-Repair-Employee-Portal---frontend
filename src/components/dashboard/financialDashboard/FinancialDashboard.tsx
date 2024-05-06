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
  DashboardFinancialMetric,
  Month,
  Year,
} from "../types";
import FinancialDashboardDaily from "./financialDashboardDaily/FinancialDashboardDaily";
import FinancialDashboardMonthly from "./financialDashboardMonthly/FinancialDashboardMonthly";
import FinancialDashboardYearly from "./financialDashboardYearly/FinancialDashboardYearly";
import {
  financialDashboardAction,
  financialDashboardReducer,
  initialFinancialDashboardState,
} from "./state";
import {
  createFinancialMetricsCharts,
  returnSelectedDateFinancialMetrics,
} from "./utils";
import { createFinancialMetricsCards } from "./utilsTSX";

function FinancialDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  financialMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  financialMetric: DashboardFinancialMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  const [financialDashboardState, financialDashboardDispatch] = useReducer(
    financialDashboardReducer,
    initialFinancialDashboardState
  );
  const { financialMetricsCards, financialMetricsCharts, isLoading, loadingMessage } =
    financialDashboardState;

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

    async function generateFinancialChartsCards() {
      financialDashboardDispatch({
        type: financialDashboardAction.setIsLoading,
        payload: true,
      });
      financialDashboardDispatch({
        type: financialDashboardAction.setLoadingMessage,
        payload: "Loading repair metrics...",
      });

      try {
        const selectedDateFinancialMetrics = returnSelectedDateFinancialMetrics({
          businessMetrics,
          day: selectedDate,
          month: selectedMonth,
          months: MONTHS,
          storeLocation: storeLocationView,
          year: selectedYear,
        });

        console.log("selectedDateFinancialMetrics", selectedDateFinancialMetrics);

        const financialMetricsCharts = await createFinancialMetricsCharts({
          businessMetrics,
          months: MONTHS,
          selectedDateFinancialMetrics,
          storeLocation: storeLocationView,
        });

        const financialMetricsCards = await createFinancialMetricsCards({
          greenColorShade,
          padding,
          redColorShade,
          selectedDateFinancialMetrics,
          width,
        });

        if (!isMounted) {
          return;
        }

        financialDashboardDispatch({
          type: financialDashboardAction.setFinancialMetricsCards,
          payload: financialMetricsCards,
        });

        financialDashboardDispatch({
          type: financialDashboardAction.setFinancialMetricsCharts,
          payload: financialMetricsCharts,
        });

        financialDashboardDispatch({
          type: financialDashboardAction.setIsLoading,
          payload: false,
        });

        financialDashboardDispatch({
          type: financialDashboardAction.setLoadingMessage,
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

    if (businessMetrics?.length || !financialMetricsCards || !financialMetricsCharts) {
      generateFinancialChartsCards();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD, storeLocationView, financialMetric]);

  if (!businessMetrics?.length || !financialMetricsCards || !financialMetricsCharts) {
    return null;
  }

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

  const { dailyCards, monthlyCards, yearlyCards } = financialMetricsCards;
  const { dailyCharts, monthlyCharts, yearlyCharts } = financialMetricsCharts;

  const financialDashboard =
    calendarView === "Daily" ? (
      <FinancialDashboardDaily
        day={selectedDate}
        financialMetric={financialMetric}
        month={selectedYYYYMMDD.split("-")[1]}
        year={selectedYear}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        storeLocation={storeLocationView}
      />
    ) : calendarView === "Monthly" ? (
      <FinancialDashboardMonthly
        day={selectedDate}
        financialMetric={financialMetric}
        month={selectedYYYYMMDD.split("-")[1]}
        storeLocation={storeLocationView}
        year={selectedYear}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
      />
    ) : (
      <FinancialDashboardYearly
        day={selectedDate}
        financialMetric={financialMetric}
        month={selectedYYYYMMDD.split("-")[1]}
        storeLocation={storeLocationView}
        year={selectedYear}
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
      />
    );

  return (
    <Stack>
      {loadingOverlay}
      {financialDashboard}
    </Stack>
  );
}

export default FinancialDashboard;
