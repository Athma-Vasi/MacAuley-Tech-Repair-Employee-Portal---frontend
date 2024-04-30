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
