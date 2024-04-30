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

function RepairDashboard({
  businessMetrics,
  calendarView,
  selectedDate,
  repairMetric,
  selectedMonth,
  storeLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  selectedDate: string;
  repairMetric: DashboardRepairMetric;
  selectedMonth: Month;
  storeLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  return calendarView === "Daily" ? (
    <RepairDashboardDaily
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      repairMetric={repairMetric}
      storeLocation={storeLocationView}
      year={selectedYear}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocationView={storeLocationView}
    />
  ) : calendarView === "Monthly" ? (
    <RepairDashboardMonthly
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      repairMetric={repairMetric}
      storeLocation={storeLocationView}
      year={selectedYear}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocationView={storeLocationView}
    />
  ) : (
    <RepairDashboardYearly
      businessMetrics={businessMetrics}
      day={selectedDate}
      month={selectedYYYYMMDD.split("-")[1]}
      repairMetric={repairMetric}
      storeLocation={storeLocationView}
      year={selectedYear}
      selectedDate={selectedDate}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      storeLocationView={storeLocationView}
    />
  );
}

export default RepairDashboard;
