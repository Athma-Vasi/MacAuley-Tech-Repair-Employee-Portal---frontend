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

const CALENDAR_TABS_DATA = [
  {
    label: 'Daily',
    message: 'Daily customer metrics',
  },
  {
    label: 'Monthly',
    message: 'Monthly customer metrics',
  },
  {
    label: 'Yearly',
    message: 'Yearly customer metrics',
  },
];

const STORE_LOCATION_TABS_DATA = [
  {
    label: 'All Locations',
    message: "View all store locations' metrics ",
  },
  {
    label: 'Edmonton',
    message: 'View Edmonton store location metrics',
  },
  {
    label: 'Calgary',
    message: 'View Calgary store location metrics',
  },
  {
    label: 'Vancouver',
    message: 'View Vancouver store location metrics',
  },
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
  CALENDAR_TABS_DATA,
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  SALES_CATEGORY_SELECTION,
  SALES_DATA_ENTRY_TYPE,
  STORE_LOCATION_TABS_DATA,
};
