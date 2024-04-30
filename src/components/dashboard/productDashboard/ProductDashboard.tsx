import { COLORS_SWATCHES } from "../../../constants/data";
import { useGlobalState } from "../../../hooks";
import { returnThemeColors } from "../../../utils";
import { MONTHS } from "../constants";
import { returnProductMetricsCards } from "../jsxHelpers";
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
import { returnProductMetricsCharts, returnSelectedDateProductMetrics } from "./utils";

function ProductDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  productMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  productMetric: DashboardProductMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  const {
    globalState: { padding, width, themeObject },
  } = useGlobalState();

  const {
    appThemeColors: { borderColor },
    generalColors: { redColorShade, greenColorShade },
  } = returnThemeColors({
    colorsSwatches: COLORS_SWATCHES,
    themeObject,
  });

  const selectedDateProductMetrics = returnSelectedDateProductMetrics({
    businessMetrics,
    day: selectedDate,
    month: selectedMonth,
    months: MONTHS,
    selectedProductCategory: productMetric,
    storeLocation: storeLocationView,
    year: selectedYear,
  });
  console.log("selectedDateProductMetrics", selectedDateProductMetrics);

  const productChartsData = returnProductMetricsCharts({
    businessMetrics,
    months: MONTHS,
    selectedDateProductMetrics,
    storeLocation: storeLocationView,
    selectedProductCategory: productMetric,
  });
  console.log("productChartsData", productChartsData);

  const productCardsInfo = returnProductMetricsCards({
    greenColorShade,
    padding,
    redColorShade,
    selectedDateProductMetrics,
    width,
  });
  console.log("productCardsInfo", productCardsInfo);

  const { dailyCharts, monthlyCharts, yearlyCharts } = productChartsData;
  const { dailyCards, monthlyCards, yearlyCards } = productCardsInfo;

  const displayProductDashboard =
    calendarView === "Daily" ? (
      <ProductDashboardDaily
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        dailyCards={dailyCards}
        dailyCharts={dailyCharts}
        day={selectedDate}
        month={selectedYYYYMMDD.split("-")[1]}
        padding={padding}
        productMetric={productMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : calendarView === "Monthly" ? (
      <ProductDashboardMonthly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        monthlyCards={monthlyCards}
        monthlyCharts={monthlyCharts}
        month={selectedYYYYMMDD.split("-")[1]}
        padding={padding}
        productMetric={productMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    ) : (
      <ProductDashboardYearly
        borderColor={borderColor}
        businessMetrics={businessMetrics}
        day={selectedDate}
        yearlyCards={yearlyCards}
        yearlyCharts={yearlyCharts}
        month={selectedYYYYMMDD.split("-")[1]}
        padding={padding}
        productMetric={productMetric}
        storeLocation={storeLocationView}
        width={width}
        year={selectedYear}
      />
    );

  return displayProductDashboard;
}

export default ProductDashboard;
