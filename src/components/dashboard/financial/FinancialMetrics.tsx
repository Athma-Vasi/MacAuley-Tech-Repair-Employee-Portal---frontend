import { Loader, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useEffect, useReducer, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { logState, returnThemeColors } from "../../../utils";
import { AccessibleSegmentedControl } from "../../accessibleInputs/AccessibleSegmentedControl";
import { MONTHS } from "../constants";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from "../types";

type FinancialMetricsProps = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
};

function FinancialMetrics({
  businessMetrics,
  calendarView,
  selectedDate,
  selectedMonth,
  selectedYYYYMMDD,
  selectedYear,
  storeLocationView,
}: FinancialMetricsProps) {
  const [financialMetricsState, financialMetricsDispatch] = useReducer(
    financialMetricsReducer,
    initialFinancialMetricsState
  );
  const { cards, category, charts, isGenerating } = financialMetricsState;

  const {
    globalState: { themeObject, padding, width },
  } = useGlobalState();

  const { showBoundary } = useErrorBoundary();

  const {
    generalColors: { redColorShade, greenColorShade },
    appThemeColors: { borderColor },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const isComponentMountedRef = useRef(false);
  useEffect(() => {
    isComponentMountedRef.current = true;
    const isMounted = isComponentMountedRef.current;

    async function generateFinancialChartsCards() {
      financialMetricsDispatch({
        action: financialMetricsAction.setIsGenerating,
        payload: true,
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

        financialMetricsDispatch({
          action: financialMetricsAction.setCards,
          payload: financialMetricsCards,
        });

        financialMetricsDispatch({
          action: financialMetricsAction.setCharts,
          payload: financialMetricsCharts,
        });

        financialMetricsDispatch({
          action: financialMetricsAction.setIsGenerating,
          payload: false,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        showBoundary(error);
      }
    }

    if (businessMetrics?.length || !cards || !charts) {
      generateFinancialChartsCards();
    }

    return () => {
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD, storeLocationView]);

  if (!businessMetrics?.length || !cards || !charts) {
    return null;
  }

  logState({
    state: financialMetricsState,
    groupLabel: "FinancialMetrics",
  });

  const categorySegmentedControl = (
    <AccessibleSegmentedControl
      attributes={{
        data: CUSTOMER_METRICS_CATEGORY_DATA as any,
        name: "category",
        parentDispatch: financialMetricsDispatch,
        validValueAction: financialMetricsAction.setCategory,
        value: category,
      }}
    />
  );

  const newReturning = (
    <NewReturning
      borderColor={borderColor}
      calendarView={calendarView}
      chartHeight={382}
      chartWidth={612}
      financialMetricsCards={cards}
      financialMetricsCharts={charts}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      padding={padding}
      metricCategory={category}
      metricsView="Financials"
      storeLocation={storeLocationView}
      width={width}
      year={selectedYear}
    />
  );

  const churnRetention = (
    <ChurnRetention
      borderColor={borderColor}
      calendarView={calendarView}
      chartHeight={382}
      chartWidth={612}
      financialMetricsCards={cards}
      financialMetricsCharts={charts}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      padding={padding}
      metricCategory={category}
      metricsView="Financials"
      storeLocation={storeLocationView}
      width={width}
      year={selectedYear}
    />
  );

  const loadingOverlay = (
    <LoadingOverlay
      visible={isGenerating}
      zIndex={2}
      overlayBlur={9}
      overlayOpacity={0.99}
      radius={4}
      loader={
        <Stack align="center">
          <Loader />
          <Text>Generating charts ... Please wait ...</Text>
        </Stack>
      }
      transitionDuration={500}
    />
  );

  const financialMetrics = (
    <Stack>
      {loadingOverlay}
      {categorySegmentedControl}
      {category === "new" || category === "returning" ? newReturning : churnRetention}
    </Stack>
  );

  return financialMetrics;
}

export { FinancialMetrics };
