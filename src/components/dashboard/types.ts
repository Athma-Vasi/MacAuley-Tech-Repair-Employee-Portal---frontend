import { StoreLocation } from '../../types';

type SalesCategorySelection = 'Financial Metrics' | 'Products' | 'Repairs';
type SalesMetricSelection = 'Yearly' | 'Monthly' | 'Daily';
type SalesDataEntryType = 'Transactions' | 'Revenue';

type DashboardState = {
  businessMetrics: BusinessMetric[];
};

type DashboardAction = {
  setBusinessMetrics: 'setBusinessMetrics';
};

type DashboardDispatch = {
  type: DashboardAction['setBusinessMetrics'];
  payload: BusinessMetric[];
};

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

type Year =
  | '2013'
  | '2014'
  | '2015'
  | '2016'
  | '2017'
  | '2018'
  | '2019'
  | '2020'
  | '2021'
  | '2022'
  | '2023';

type DaysInMonthsInYears = Map<Year, Map<Month, string[]>>;

type ProductCategory =
  | 'Desktop Computers'
  | 'Laptops'
  | 'Central Processing Units (CPUs)'
  | 'Graphics Processing Units (GPUs)'
  | 'Motherboards'
  | 'Memory (RAM)'
  | 'Storage'
  | 'Power Supplies'
  | 'Computer Cases'
  | 'Computer Peripherals'
  | 'Monitors'
  | 'Keyboards'
  | 'Mice'
  | 'Headphones'
  | 'Speakers'
  | 'Smartphones'
  | 'Tablets'
  | 'Accessories';

type RepairCategory =
  | 'Computer Components'
  | 'Peripherals'
  | 'Electronics'
  | 'Mobile Devices'
  | 'Audio/Video'
  | 'Accessories';

type LocationYearSpread = Record<
  StoreLocation,
  Record<string, [number, number]>
>;

type FinancialMetricCategory = {
  total: number;
  repair: number;
  sales: {
    total: number;
    inStore: number;
    online: number;
  };
};

type YearlyFinancialMetric = {
  year: Year;
  averageOrderValue: number;
  conversionRate: number;
  netProfitMargin: number;

  expenses: FinancialMetricCategory;
  profit: FinancialMetricCategory;
  revenue: FinancialMetricCategory;
  transactions: FinancialMetricCategory;

  monthlyMetrics: MonthlyFinancialMetric[];
};

type MonthlyFinancialMetric = {
  month: Month;
  averageOrderValue: number;
  conversionRate: number;
  netProfitMargin: number;

  expenses: FinancialMetricCategory;
  profit: FinancialMetricCategory;
  revenue: FinancialMetricCategory;
  transactions: FinancialMetricCategory;

  dailyMetrics: DailyFinancialMetric[];
};

type DailyFinancialMetric = {
  day: string;
  averageOrderValue: number;
  conversionRate: number;
  netProfitMargin: number;

  expenses: FinancialMetricCategory;
  profit: FinancialMetricCategory;
  revenue: FinancialMetricCategory;
  transactions: FinancialMetricCategory;
};

type CustomerMetrics = {
  totalCustomers: number;
  lifetimeValue: number;

  yearlyMetrics: CustomerYearlyMetric[];
};

type CustomersNewReturningMetric = {
  total: number;
  sales: {
    total: number;
    online: number;
    inStore: number;
  };
  repair: number;
};

type CustomerYearlyMetric = {
  year: Year;
  customers: {
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
    churnRate: number;
    retentionRate: number;
  };
  monthlyMetrics: CustomerMonthlyMetric[];
};

type CustomerMonthlyMetric = {
  month: Month;
  customers: {
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
    churnRate: number;
    retentionRate: number;
  };
  dailyMetrics: CustomerDailyMetric[];
};

type CustomerDailyMetric = {
  day: string;
  customers: {
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
  };
};

type ProductMetricCategory = {
  total: number;
  online: number;
  inStore: number;
};

type ProductMetric = {
  name: ProductCategory;
  yearlyMetrics: ProductYearlyMetric[];
};

type ProductYearlyMetric = {
  year: Year;
  transactions: ProductMetricCategory;
  revenue: ProductMetricCategory;

  monthlyMetrics: ProductMonthlyMetric[];
};

type ProductMonthlyMetric = {
  month: Month;
  transactions: ProductMetricCategory;
  revenue: ProductMetricCategory;

  dailyMetrics: ProductDailyMetric[];
};

type ProductDailyMetric = {
  day: string;
  transactions: ProductMetricCategory;
  revenue: ProductMetricCategory;
};

type RepairMetric = {
  name: RepairCategory;
  yearlyMetrics: RepairYearlyMetric[];
};

type RepairYearlyMetric = {
  year: Year;
  revenue: number;
  transactions: number;

  monthlyMetrics: RepairMonthlyMetric[];
};

type RepairMonthlyMetric = {
  month: Month;
  revenue: number;
  transactions: number;

  dailyMetrics: RepairDailyMetric[];
};

type RepairDailyMetric = {
  day: string;
  revenue: number;
  transactions: number;
};

type BusinessMetricStoreLocation = 'All Locations' | StoreLocation;

type BusinessMetric = {
  storeLocation: BusinessMetricStoreLocation;
  customerMetrics: CustomerMetrics;
  financialMetrics: YearlyFinancialMetric[];
  productMetrics: ProductMetric[];
  repairMetrics: RepairMetric[];
};

type DashboardCalendarView = 'Yearly' | 'Monthly' | 'Daily';

export type {
  BusinessMetric,
  BusinessMetricStoreLocation,
  CustomerDailyMetric,
  CustomerMetrics,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  DailyFinancialMetric,
  DashboardAction,
  DashboardCalendarView,
  DashboardDispatch,
  DashboardState,
  DaysInMonthsInYears,
  LocationYearSpread,
  Month,
  MonthlyFinancialMetric,
  ProductCategory,
  ProductDailyMetric,
  ProductMetric,
  ProductMonthlyMetric,
  ProductYearlyMetric,
  RepairCategory,
  RepairDailyMetric,
  RepairMetric,
  RepairMonthlyMetric,
  RepairYearlyMetric,
  SalesCategorySelection,
  SalesDataEntryType,
  SalesMetricSelection,
  Year,
  YearlyFinancialMetric,
};
