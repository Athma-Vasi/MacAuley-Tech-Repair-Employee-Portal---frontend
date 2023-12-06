import {
  BusinessMetricStoreLocation,
  DashboardCalendarView,
  DashboardCustomerMetric,
  DashboardFinancialMetric,
  DashboardMetricsView,
  DashboardProductMetric,
  DashboardRepairMetric,
  Month,
  ProductCategory,
  RepairCategory,
} from "./types";

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const MONTHS: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Accessory",
  "Central Processing Unit (CPU)",
  "Computer Case",
  "Desktop Computer",
  "Graphics Processing Unit (GPU)",
  "Headphone",
  "Keyboard",
  "Laptop",
  "Memory (RAM)",
  "Mouse",
  "Microphone",
  "Display",
  "Motherboard",
  "Power Supply Unit (PSU)",
  "Smartphone",
  "Speaker",
  "Storage",
  "Tablet",
  "Webcam",
];

const REPAIR_CATEGORIES: RepairCategory[] = [
  "Accessory",
  "Audio/Video",
  "Computer Component",
  "Electronic Device",
  "Mobile Device",
  "Peripheral",
];

const CALENDAR_VIEW_TABS_DATA: DashboardCalendarView[] = ["Daily", "Monthly", "Yearly"];

const FINANCIALS_METRICS_SELECT_INPUT_DATA: DashboardFinancialMetric[] = [
  "Profit",
  "Revenue",
  "Expenses",
  "Transactions",
  "Other Metrics",
];

const CUSTOMER_METRICS_SELECT_INPUT_DATA: DashboardCustomerMetric[] = [
  "Overview",
  "New",
  "Returning",
  "Other Metrics",
];

const PRODUCT_METRICS_SELECT_INPUT_DATA: DashboardProductMetric[] = [
  "All Products",
  ...PRODUCT_CATEGORIES,
];

const REPAIR_METRICS_SELECT_INPUT_DATA: DashboardRepairMetric[] = [
  "All Repairs",
  ...REPAIR_CATEGORIES,
];

const METRICS_VIEW_TABS_DATA: DashboardMetricsView[] = [
  "Financials",
  "Customers",
  "Products",
  "Repairs",
];

const STORE_LOCATION_VIEW_TABS_DATA: BusinessMetricStoreLocation[] = [
  "All Locations",
  "Edmonton",
  "Calgary",
  "Vancouver",
];

const BUSINESS_METRIC_STORE_LOCATIONS: BusinessMetricStoreLocation[] = [
  "All Locations",
  "Edmonton",
  "Calgary",
  "Vancouver",
];

const YEARS_SET = new Set([
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
]);

const PERCENTAGE_METRICS_SET = new Set([
  "Net Profit Margin",
  "Conversion Rate",
  "Churn Rate",
  "Retention Rate",
]);
const UNITLESS_METRICS_SET = new Set(["Units Sold", "Units Repaired"]);

export {
  BUSINESS_METRIC_STORE_LOCATIONS,
  CALENDAR_VIEW_TABS_DATA,
  CUSTOMER_METRICS_SELECT_INPUT_DATA,
  DAYS_PER_MONTH,
  FINANCIALS_METRICS_SELECT_INPUT_DATA,
  METRICS_VIEW_TABS_DATA,
  MONTHS,
  PERCENTAGE_METRICS_SET,
  PRODUCT_CATEGORIES,
  PRODUCT_METRICS_SELECT_INPUT_DATA,
  REPAIR_CATEGORIES,
  REPAIR_METRICS_SELECT_INPUT_DATA,
  STORE_LOCATION_VIEW_TABS_DATA,
  UNITLESS_METRICS_SET,
  YEARS_SET,
};
