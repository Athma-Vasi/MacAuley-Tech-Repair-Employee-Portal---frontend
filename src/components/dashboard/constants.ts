import {
  BusinessMetricStoreLocation,
  LocationYearSpread,
  Month,
  ProductCategory,
  RepairCategory,
  SalesCategorySelection,
  SalesDataEntryType,
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

const SALES_CATEGORY_SELECTION: SalesCategorySelection[] = [
  'Financial Metrics',
  'Products',
  'Repairs',
];

const CALENDAR_VIEW_TABS_DATA = ['Daily', 'Monthly', 'Yearly'];

const STORE_LOCATION_VIEW_TABS_DATA = [
  'All Locations',
  'Edmonton',
  'Calgary',
  'Vancouver',
];

const SALES_DATA_ENTRY_TYPE: SalesDataEntryType[] = ['Transactions', 'Revenue'];

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
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  SALES_CATEGORY_SELECTION,
  SALES_DATA_ENTRY_TYPE,
  STORE_LOCATION_VIEW_TABS_DATA,
};
