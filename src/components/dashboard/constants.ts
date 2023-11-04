import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardFinancialsView,
  DashboardMetricsView,
  Month,
  ProductCategory,
  RepairCategory,
} from './types';

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const MONTHS: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Desktop Computers',
  'Laptops',
  'Central Processing Units (CPUs)',
  'Graphics Processing Units (GPUs)',
  'Motherboards',
  'Memory (RAM)',
  'Storage',
  'Power Supplies',
  'Computer Cases',
  'Computer Peripherals',
  'Monitors',
  'Keyboards',
  'Mice',
  'Headphones',
  'Speakers',
  'Smartphones',
  'Tablets',
  'Accessories',
];

const REPAIR_CATEGORIES: RepairCategory[] = [
  'Computer Components',
  'Peripherals',
  'Electronics',
  'Mobile Devices',
  'Audio/Video',
  'Accessories',
];

const CALENDAR_VIEW_TABS_DATA: DashboardCalendarView[] = [
  'Daily',
  'Monthly',
  'Yearly',
];

const FINANCIALS_VIEW_TABS_DATA: DashboardFinancialsView[] = [
  'Profit',
  'Revenue',
  'Expenses',
  'Transactions',
  'Other Metrics',
];

const METRICS_VIEW_TABS_DATA: DashboardMetricsView[] = [
  'Financials',
  'Customers',
  'Products',
  'Repairs',
];

const STORE_LOCATION_VIEW_TABS_DATA: BusinessMetricStoreLocation[] = [
  'All Locations',
  'Edmonton',
  'Calgary',
  'Vancouver',
];

const BUSINESS_METRIC_STORE_LOCATIONS: BusinessMetricStoreLocation[] = [
  'All Locations',
  'Edmonton',
  'Calgary',
  'Vancouver',
];

export {
  BUSINESS_METRIC_STORE_LOCATIONS,
  CALENDAR_VIEW_TABS_DATA,
  DAYS_PER_MONTH,
  FINANCIALS_VIEW_TABS_DATA,
  METRICS_VIEW_TABS_DATA,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  STORE_LOCATION_VIEW_TABS_DATA,
};
