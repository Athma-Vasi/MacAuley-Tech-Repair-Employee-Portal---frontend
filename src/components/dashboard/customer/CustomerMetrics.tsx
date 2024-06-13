import { useEffect, useReducer, useRef } from "react";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetric,
  Month,
  Year,
} from "../types";
import { customerMetricsReducer } from "./reducers";
import { initialCustomerMetricsState } from "./state";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { MONTHS } from "../constants";
import { customerMetricsAction } from "./actions";
import { returnSelectedDateCustomerMetrics, createCustomerMetricsCharts } from "./utils";
import { createCustomerMetricsCards } from "./utilsTSX";

type CustomerMetricsProps = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  customerMetric: DashboardCustomerMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
};

function CustomerMetrics({
  businessMetrics,
  calendarView,
  customerMetric,
  selectedDate,
  selectedMonth,
  selectedYYYYMMDD,
  selectedYear,
  storeLocationView,
}: CustomerMetricsProps) {
  const [customerMetricsState, customerMetricsDispatch] = useReducer(
    customerMetricsReducer,
    initialCustomerMetricsState
  );
  const { customerMetricsCards, customerMetricsCharts, isGenerating } =
    customerMetricsState;

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

  const isComponentMountedRef = useRef(false);
  useEffect(() => {
    isComponentMountedRef.current = true;
    const isMounted = isComponentMountedRef.current;

    async function generateCustomerChartsCards() {
      customerMetricsDispatch({
        action: customerMetricsAction.setIsGenerating,
        payload: true,
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

        customerMetricsDispatch({
          action: customerMetricsAction.setCustomerMetricsCards,
          payload: customerMetricsCards,
        });

        customerMetricsDispatch({
          action: customerMetricsAction.setCustomerMetricsCharts,
          payload: customerMetricsCharts,
        });

        customerMetricsDispatch({
          action: customerMetricsAction.setIsGenerating,
          payload: false,
        });
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        showBoundary(error);
      }
    }

    if (businessMetrics?.length || !customerMetricsCards || !customerMetricsCharts) {
      generateCustomerChartsCards();
    }

    return () => {
      isComponentMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD, storeLocationView, customerMetric]);

  if (!businessMetrics?.length || !customerMetricsCards || !customerMetricsCharts) {
    return null;
  }

  return null;
}
