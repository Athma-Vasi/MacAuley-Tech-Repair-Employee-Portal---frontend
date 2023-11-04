import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  Month,
  Year,
} from '../types';

function ProductDashboard({
  businessMetrics,
  selectedCalendarView,
  selectedDate,
  selectedMonth,
  selectedStoreLocationView,
  selectedYear,
  selectedYYYYMMDD,
}: {
  businessMetrics: BusinessMetric[];
  selectedCalendarView: DashboardCalendarView;
  selectedDate: string;
  selectedMonth: Month;
  selectedStoreLocationView: BusinessMetricStoreLocation;
  selectedYear: Year;
  selectedYYYYMMDD: string;
}) {
  return <></>;
}
