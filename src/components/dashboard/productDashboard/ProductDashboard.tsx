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
  DashboardProductMetric,
  Month,
  Year,
} from "../types";
import ProductDashboardDaily from "./productDashboardDaily/ProductDashboardDaily";
import ProductDashboardMonthly from "./productDashboardMonthly/ProductDashboardMonthly";
import ProductDashboardYearly from "./productDashboardYearly/ProductDashboardYearly";
import {
  initialProductDashboardState,
  productDashboardAction,
  productDashboardReducer,
} from "./state";
import { createProductMetricsCharts, createSelectedDateProductMetrics } from "./utils";
import { returnProductMetricsCards2 } from "./utilsTSX";

type ProductDashboardProps = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  productMetric: DashboardProductMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
};

function ProductDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  productMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: ProductDashboardProps) {
  const [productDashboardState, productDashboardDispatch] = useReducer(
    productDashboardReducer,
    initialProductDashboardState
  );
  const { productMetricsCards, productMetricsCharts, isLoading, loadingMessage } =
    productDashboardState;

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

    async function generateProductChartsCards() {
      productDashboardDispatch({
        type: productDashboardAction.setIsLoading,
        payload: true,
      });
      productDashboardDispatch({
        type: productDashboardAction.setLoadingMessage,
        payload: "Loading repair metrics...",
      });

      try {
        const selectedDateProductMetrics = createSelectedDateProductMetrics({
          businessMetrics,
          day: selectedDate,
          month: selectedMonth,
          months: MONTHS,
          selectedProductCategory: productMetric,
          storeLocation: storeLocationView,
          year: selectedYear,
        });

        console.log("selectedDateProductMetrics", selectedDateProductMetrics);

        const { dailyCharts, monthlyCharts, yearlyCharts } =
          await createProductMetricsCharts({
            businessMetrics,
            months: MONTHS,
            selectedDateProductMetrics,
            storeLocation: storeLocationView,
            selectedProductCategory: productMetric,
          });

        const { dailyCards, monthlyCards, yearlyCards } =
          await returnProductMetricsCards2({
            greenColorShade,
            padding,
            redColorShade,
            selectedDateProductMetrics,
            width,
          });

        if (!isMounted) {
          return;
        }

        productDashboardDispatch({
          type: productDashboardAction.setProductMetricsCards,
          payload: {
            dailyCards,
            monthlyCards,
            yearlyCards,
          },
        });

        productDashboardDispatch({
          type: productDashboardAction.setProductMetricsCharts,
          payload: {
            dailyCharts,
            monthlyCharts,
            yearlyCharts,
          },
        });

        productDashboardDispatch({
          type: productDashboardAction.setIsLoading,
          payload: false,
        });

        productDashboardDispatch({
          type: productDashboardAction.setLoadingMessage,
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

    if (businessMetrics?.length || !productMetricsCards || !productMetricsCharts) {
      generateProductChartsCards();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYYYYMMDD]);

  if (!businessMetrics?.length || !productMetricsCards || !productMetricsCharts) {
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

  return calendarView === "Daily" ? (
    <ProductDashboardDaily
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      productMetric={productMetric}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : calendarView === "Monthly" ? (
    <ProductDashboardMonthly
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      productMetric={productMetric}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : (
    <ProductDashboardYearly
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      productMetric={productMetric}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  );
}

export default ProductDashboard;
