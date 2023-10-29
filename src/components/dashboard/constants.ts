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

/**
 * - random daily transactions spread between [min, max] per year
 */
const YEAR_TRANSACTIONS_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [1, 2],
    '2014': [2, 3],
    '2015': [2, 5],
    '2016': [3, 7],
    '2017': [5, 9],
    '2018': [5, 11],
    '2019': [7, 13],
    '2020': [15, 17],
    '2021': [17, 19],
    '2022': [17, 19],
    '2023': [13, 15],
  },
  Calgary: {
    '2017': [1, 2],
    '2018': [2, 4],
    '2019': [3, 7],
    '2020': [7, 9],
    '2021': [9, 11],
    '2022': [9, 11],
    '2023': [5, 7],
  },
  Vancouver: {
    '2019': [1, 2],
    '2020': [3, 5],
    '2021': [5, 9],
    '2022': [5, 9],
    '2023': [2, 4],
  },
};

const YEAR_PROFIT_MARGIN_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [0.03, 0.13],
    '2014': [0.04, 0.14],
    '2015': [0.05, 0.15],
    '2016': [0.06, 0.16],
    '2017': [0.11, 0.21],
    '2018': [0.13, 0.23],
    '2019': [0.15, 0.25],
    '2020': [0.25, 0.35],
    '2021': [0.27, 0.37],
    '2022': [0.27, 0.37],
    '2023': [0.23, 0.33],
  },
  Calgary: {
    '2017': [0.07, 0.17],
    '2018': [0.08, 0.18],
    '2019': [0.09, 0.19],
    '2020': [0.15, 0.25],
    '2021': [0.17, 0.27],
    '2022': [0.17, 0.27],
    '2023': [0.13, 0.23],
  },
  Vancouver: {
    '2019': [0.09, 0.19],
    '2020': [0.13, 0.23],
    '2021': [0.17, 0.27],
    '2022': [0.17, 0.27],
    '2023': [0.15, 0.25],
  },
};
/**
 * @see https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/
 */
const YEAR_CONVERSION_RATE_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [0.01, 0.011],
    '2014': [0.011, 0.012],
    '2015': [0.012, 0.013],
    '2016': [0.013, 0.014],
    '2017': [0.02, 0.025],
    '2018': [0.025, 0.03],
    '2019': [0.03, 0.035],
    '2020': [0.035, 0.04],
    '2021': [0.04, 0.045],
    '2022': [0.04, 0.045],
    '2023': [0.035, 0.04],
  },
  Calgary: {
    '2017': [0.02, 0.025],
    '2018': [0.025, 0.03],
    '2019': [0.03, 0.035],
    '2020': [0.035, 0.04],
    '2021': [0.04, 0.045],
    '2022': [0.04, 0.045],
    '2023': [0.035, 0.04],
  },
  Vancouver: {
    '2019': [0.03, 0.035],
    '2020': [0.035, 0.04],
    '2021': [0.04, 0.045],
    '2022': [0.04, 0.045],
    '2023': [0.035, 0.04],
  },
};

/**
 * @see https://customergauge.com/blog/average-churn-rate-by-industry
 */
const YEAR_CHURN_RATE_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [0.3, 0.4],
    '2014': [0.25, 0.3],
    '2015': [0.2, 0.25],
    '2016': [0.18, 0.22],
    '2017': [0.16, 0.2],
    '2018': [0.15, 0.18],
    '2019': [0.13, 0.16],
    '2020': [0.1, 0.12],
    '2021': [0.09, 0.11],
    '2022': [0.09, 0.11],
    '2023': [0.1, 0.12],
  },
  Calgary: {
    '2017': [0.18, 0.22],
    '2018': [0.15, 0.18],
    '2019': [0.13, 0.16],
    '2020': [0.1, 0.12],
    '2021': [0.09, 0.11],
    '2022': [0.09, 0.11],
    '2023': [0.1, 0.12],
  },
  Vancouver: {
    '2019': [0.13, 0.16],
    '2020': [0.1, 0.12],
    '2021': [0.09, 0.11],
    '2022': [0.09, 0.11],
    '2023': [0.1, 0.12],
  },
};

/**
 * - random daily customers spread between [min, max] per year
 */
const YEAR_CUSTOMERS_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [60, 260],
    '2014': [80, 280],
    '2015': [100, 300],
    '2016': [120, 320],
    '2017': [220, 420],
    '2018': [260, 460],
    '2019': [300, 500],
    '2020': [500, 700],
    '2021': [540, 740],
    '2022': [540, 740],
    '2023': [460, 660],
  },
  Calgary: {
    '2017': [60, 260],
    '2018': [80, 280],
    '2019': [100, 300],
    '2020': [120, 320],
    '2021': [220, 420],
    '2022': [260, 460],
    '2023': [300, 500],
  },
  Vancouver: {
    '2019': [80, 280],
    '2020': [180, 380],
    '2021': [340, 460],
    '2022': [460, 540],
    '2023': [300, 460],
  },
};

/**
 * - random daily new customers fraction spread between [min, max] per year
 */
const YEAR_NEW_CUSTOMERS_SPREAD: LocationYearSpread = {
  Edmonton: {
    '2013': [0.6, 0.7],
    '2014': [0.5, 0.6],
    '2015': [0.4, 0.5],
    '2016': [0.35, 0.45],
    '2017': [0.3, 0.4],
    '2018': [0.25, 0.35],
    '2019': [0.25, 0.3],
    '2020': [0.2, 0.25],
    '2021': [0.2, 0.25],
    '2022': [0.2, 0.25],
    '2023': [0.15, 0.2],
  },
  Calgary: {
    '2017': [0.6, 0.7],
    '2018': [0.5, 0.6],
    '2019': [0.4, 0.5],
    '2020': [0.35, 0.45],
    '2021': [0.3, 0.4],
    '2022': [0.25, 0.35],
    '2023': [0.25, 0.3],
  },
  Vancouver: {
    '2019': [0.6, 0.7],
    '2020': [0.5, 0.6],
    '2021': [0.4, 0.5],
    '2022': [0.35, 0.45],
    '2023': [0.3, 0.4],
  },
};

const SALES_CATEGORY_SELECTION: SalesCategorySelection[] = [
  'Financial Metrics',
  'Products',
  'Repairs',
];

const CALENDAR_TABS_DATA = [
  {
    label: 'Daily',
    message: 'Daily Customer Data',
  },
  {
    label: 'Monthly',
    message: 'Monthly Customer Data',
  },
  {
    label: 'Yearly',
    message: 'Yearly Customer Data',
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
  YEAR_CHURN_RATE_SPREAD,
  YEAR_CONVERSION_RATE_SPREAD,
  YEAR_CUSTOMERS_SPREAD,
  YEAR_NEW_CUSTOMERS_SPREAD,
  YEAR_PROFIT_MARGIN_SPREAD,
  YEAR_TRANSACTIONS_SPREAD,
};
