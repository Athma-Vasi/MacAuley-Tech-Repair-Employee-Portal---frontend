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

function CustomerDashboard({
  businessMetrics,
  calendarView,
  customerMetric,
  selectedDate,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  customerMetric: DashboardCustomerMetric;
  selectedDate: string;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  return calendarView === "Daily" ? (
    <CustomerDashboardDaily
      businessMetrics={businessMetrics}
      customerMetric={customerMetric}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : calendarView === "Monthly" ? (
    <CustomerDashboardMonthly
      businessMetrics={businessMetrics}
      customerMetric={customerMetric}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : (
    <CustomerDashboardYearly
      businessMetrics={businessMetrics}
      customerMetric={customerMetric}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  );
}

export default CustomerDashboard;
