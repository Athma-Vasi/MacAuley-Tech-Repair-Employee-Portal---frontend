import { StoreLocation } from '../../types';

type DashboardCalendarView = 'Daily' | 'Monthly' | 'Yearly';
type DashboardMetricsView = 'Financials' | 'Customers' | 'Products' | 'Repairs';
type DashboardFinancialMetric =
  | 'Expenses'
  | 'Profit'
  | 'Revenue'
  | 'Transactions'
  | 'Other Metrics';
type DashboardCustomerMetrics = 'Overview' | 'New' | 'Returning';
type DashboardProductMetrics = ProductCategory;
type DashboardRepairMetrics = RepairCategory;

type DashboardState = {
  businessMetrics: BusinessMetric[];
  calendarView: DashboardCalendarView;
  customerMetric: DashboardCustomerMetrics;
  financialMetric: DashboardFinancialMetric;
  metricsView: DashboardMetricsView;
  productMetric: DashboardProductMetrics;
  repairMetric: DashboardRepairMetrics;
  selectedYYYYMMDD: string;
  storeLocationView: BusinessMetricStoreLocation;
};

type DashboardAction = {
  setBusinessMetrics: 'setBusinessMetrics';
  setCalendarView: 'setCalendarView';
  setCustomerMetric: 'setCustomerMetric';
  setFinancialMetric: 'setFinancialMetric';
  setMetricsView: 'setMetricsView';
  setProductMetric: 'setProductMetric';
  setRepairMetric: 'setRepairMetric';
  setSelectedYYYYMMDD: 'setSelectedYYYYMMDD';
  setStoreLocationView: 'setStoreLocationView';
};

type DashboardDispatch =
  | {
      type: DashboardAction['setBusinessMetrics'];
      payload: BusinessMetric[];
    }
  | {
      type: DashboardAction['setCalendarView'];
      payload: DashboardCalendarView;
    }
  | {
      type: DashboardAction['setCustomerMetric'];
      payload: DashboardCustomerMetrics;
    }
  | {
      type: DashboardAction['setFinancialMetric'];
      payload: DashboardFinancialMetric;
    }
  | {
      type: DashboardAction['setMetricsView'];
      payload: DashboardMetricsView;
    }
  | {
      type: DashboardAction['setProductMetric'];
      payload: DashboardProductMetrics;
    }
  | {
      type: DashboardAction['setRepairMetric'];
      payload: DashboardRepairMetrics;
    }
  | {
      type: DashboardAction['setStoreLocationView'];
      payload: BusinessMetricStoreLocation;
    }
  | {
      type: DashboardAction['setSelectedYYYYMMDD'];
      payload: string;
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

type CustomerMetricCategory = {
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
    new: CustomerMetricCategory;
    returning: CustomerMetricCategory;
    churnRate: number;
    retentionRate: number;
  };
  monthlyMetrics: CustomerMonthlyMetric[];
};

type CustomerMonthlyMetric = {
  month: Month;
  customers: {
    total: number;
    new: CustomerMetricCategory;
    returning: CustomerMetricCategory;
    churnRate: number;
    retentionRate: number;
  };
  dailyMetrics: CustomerDailyMetric[];
};

type CustomerDailyMetric = {
  day: string;
  customers: {
    total: number;
    new: CustomerMetricCategory;
    returning: CustomerMetricCategory;
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
  DashboardCustomerMetrics,
  DashboardDispatch,
  DashboardFinancialMetric,
  DashboardMetricsView,
  DashboardProductMetrics,
  DashboardRepairMetrics,
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
  Year,
  YearlyFinancialMetric,
};
