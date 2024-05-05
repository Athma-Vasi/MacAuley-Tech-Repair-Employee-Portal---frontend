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
  DashboardRepairMetric,
  Month,
  Year,
} from "../types";
import RepairDashboardDaily from "./repairDashboardDaily/RepairDashboardDaily";
import RepairDashboardMonthly from "./repairDashboardMonthly/RepairDashboardMonthly";
import RepairDashboardYearly from "./repairDashboardYearly/RepairDashboardYearly";
import {
  initialRepairDashboardState,
  repairDashboardAction,
  repairDashboardReducer,
} from "./state";
import { createRepairMetricsCharts, createSelectedDateRepairMetrics } from "./utils";
import { returnRepairMetricsCards } from "./utilsTSX";

type RepairDashboardProps = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  repairMetric: DashboardRepairMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
};

function RepairDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  repairMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: RepairDashboardProps) {
  const [repairDashboardState, repairDashboardDispatch] = useReducer(
    repairDashboardReducer,
    initialRepairDashboardState
  );
  const { repairMetricsCards, repairMetricsCharts, isLoading, loadingMessage } =
    repairDashboardState;

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

    async function generateRepairChartsCards() {
      repairDashboardDispatch({
        type: repairDashboardAction.setIsLoading,
        payload: true,
      });
      repairDashboardDispatch({
        type: repairDashboardAction.setLoadingMessage,
        payload: "Generating Repair Metrics... Please wait...",
      });

      try {
        const selectedDateRepairMetrics = createSelectedDateRepairMetrics({
          businessMetrics,
          day: selectedDate,
          month: selectedMonth,
          months: MONTHS,
          selectedRepairCategory: repairMetric,
          storeLocation: storeLocationView,
          year: selectedYear,
        });

        console.log("selectedDateRepairMetrics", selectedDateRepairMetrics);

        const { dailyCharts, monthlyCharts, yearlyCharts } =
          await createRepairMetricsCharts({
            businessMetrics,
            months: MONTHS,
            selectedDateRepairMetrics,
            storeLocation: storeLocationView,
            selectedRepairCategory: repairMetric,
          });

        const { dailyCards, monthlyCards, yearlyCards } = await returnRepairMetricsCards({
          greenColorShade,
          padding,
          redColorShade,
          selectedDateRepairMetrics,
          width,
        });

        if (!isMounted) {
          return;
        }

        repairDashboardDispatch({
          type: repairDashboardAction.setRepairMetricsCards,
          payload: {
            dailyCards,
            monthlyCards,
            yearlyCards,
          },
        });

        repairDashboardDispatch({
          type: repairDashboardAction.setRepairMetricsCharts,
          payload: {
            dailyCharts,
            monthlyCharts,
            yearlyCharts,
          },
        });

        repairDashboardDispatch({
          type: repairDashboardAction.setIsLoading,
          payload: false,
        });

        repairDashboardDispatch({
          type: repairDashboardAction.setLoadingMessage,
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

    if (businessMetrics?.length || !repairMetricsCards || !repairMetricsCharts) {
      generateRepairChartsCards();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD]);

  if (!businessMetrics?.length || !repairMetricsCards || !repairMetricsCharts) {
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

  const { dailyCards, monthlyCards, yearlyCards } = repairMetricsCards;
  const { dailyCharts, monthlyCharts, yearlyCharts } = repairMetricsCharts;

  const repairDashboard =
    calendarView === "Daily" ? (
      <RepairDashboardDaily
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    ) : calendarView === "Monthly" ? (
      <RepairDashboardMonthly
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    ) : (
      <RepairDashboardYearly
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        repairMetric={repairMetric}
        storeLocation={storeLocationView}
        year={selectedYear}
      />
    );

  return (
    <Stack>
      {loadingOverlay}
      {repairDashboard}
    </Stack>
  );
}

export default RepairDashboard;
