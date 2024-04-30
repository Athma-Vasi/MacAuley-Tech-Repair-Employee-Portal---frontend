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
  return calendarView === "Daily" ? (
    <FinancialDashboardDaily
      businessMetrics={businessMetrics}
      day={selectedDate}
      financialMetric={financialMetric}
      month={selectedYYYYMMDD.split("-")[1]}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : calendarView === "Monthly" ? (
    <FinancialDashboardMonthly
      businessMetrics={businessMetrics}
      day={selectedDate}
      financialMetric={financialMetric}
      month={selectedYYYYMMDD.split("-")[1]}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocation={storeLocationView}
      storeLocationView={storeLocationView}
      year={selectedYear}
    />
  ) : (
    <FinancialDashboardYearly
      businessMetrics={businessMetrics}
      day={selectedDate}
      financialMetric={financialMetric}
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

export default FinancialDashboard;
