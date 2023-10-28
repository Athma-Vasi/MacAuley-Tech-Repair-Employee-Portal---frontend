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

type FinancialMetric = {
  year: Year;
  yearlyAverageOrderValue: number;
  yearlyConversionRate: number;
  yearlyExpenses: number;
  yearlyInStoreSalesRevenue: number;
  yearlyNetProfitMargin: number;
  yearlyOnlineSalesRevenue: number;
  yearlyProfit: number;
  yearlyRepairOrders: number;
  yearlyRepairRevenue: number;
  yearlyRevenue: number;
  yearlySalesOrders: number;
  yearlySalesRevenue: number;

  monthlyFinancialMetrics: MonthlyFinancialMetric[];
};

type MonthlyFinancialMetric = {
  month: Month;
  monthlyAverageOrderValue: number;
  monthlyConversionRate: number;
  monthlyExpenses: number;
  monthlyInStoreSalesRevenue: number;
  monthlyNetProfitMargin: number;
  monthlyOnlineSalesRevenue: number;
  monthlyProfit: number;
  monthlyRepairOrders: number;
  monthlyRepairRevenue: number;
  monthlySalesOrders: number;
  monthlySalesRevenue: number;
  totalMonthlyOrders: number;
  totalMonthlyRevenue: number;

  dailyFinancialMetrics: DailyFinancialMetric[];
};

type DailyFinancialMetric = {
  dailyAverageOrderValue: number;
  dailyConversionRate: number;
  dailyExpenses: number;
  dailyInStoreSalesRevenue: number;
  dailyNetProfitMargin: number;
  dailyOnlineSalesRevenue: number;
  dailyOrders: number;
  dailyProfit: number;
  dailyRepairOrders: number;
  dailyRepairRevenue: number;
  dailyRevenue: number;
  dailySalesOrders: number;
  dailySalesRevenue: number;
  day: string;
};

type CustomerMetrics = {
  totalCustomers: number;
  lifetimeValue: number;

  yearlyMetrics: CustomerYearlyMetric[];
};

// type CustomerYearlyMetric = {
//   year: Year;
//   yearlyCustomerChurnRate: number;
//   yearlyCustomerRetentionRate: number;
//   yearlyCustomers: number;
//   yearlyInStoreCustomers: number;
//   yearlyNewCustomers: number;
//   yearlyOnlineCustomers: number;
//   yearlyRepairCustomers: number;
//   yearlyReturningCustomers: number;
//   yearlySalesCustomers: number;

//   monthlyCustomerMetrics: CustomerMonthlyMetric[];
// };
type CustomersNewReturningMetric = {
  id: string;
  total: number;
  sales: {
    id: string;
    total: number;
    online: number;
    inStore: number;
  };
  repair: number;
};

type CustomerYearlyMetric = {
  id: string;
  year: Year;
  customers: {
    id: string;
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
    churnRate: number;
    retentionRate: number;
  };
  monthlyMetrics: CustomerMonthlyMetric[];
};

// type CustomerMonthlyMetric = {
//   month: Month;
//   monthlyCustomerChurnRate: number;
//   monthlyCustomerRetentionRate: number;
//   monthlyCustomers: number;
//   monthlyInStoreCustomers: number;
//   monthlyNewCustomers: number;
//   monthlyOnlineCustomers: number;
//   monthlyRepairCustomers: number;
//   monthlyReturningCustomers: number;
//   monthlySalesCustomers: number;

//   dailyCustomerMetrics: CustomerDailyMetric[];
// };
type CustomerMonthlyMetric = {
  id: string;
  month: Month;
  customers: {
    id: string;
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
    churnRate: number;
    retentionRate: number;
  };
  dailyMetrics: CustomerDailyMetric[];
};

// type CustomerDailyMetric = {
//   dailyCustomers: number;
//   dailyInStoreCustomers: number;
//   dailyNewCustomers: number;
//   dailyOnlineCustomers: number;
//   dailyRepairCustomers: number;
//   dailyReturningCustomers: number;
//   dailySalesCustomers: number;
//   day: string;
// };
type CustomerDailyMetric = {
  id: string;
  day: string;
  customers: {
    id: string;
    total: number;
    new: CustomersNewReturningMetric;
    returning: CustomersNewReturningMetric;
  };
};

type ProductCategoryDailyMetric = {
  productCategoryDay: string;
  productCategoryDailySalesRevenue: number;
  productCategoryDailyOnlineSalesRevenue: number;
  productCategoryDailyInStoreSalesRevenue: number;
  productCategoryDailyUnitsSold: number;
};

type ProductCategoryMonthlyMetric = {
  productCategoryMonth: Month;
  productCategoryMonthlySalesRevenue: number;
  productCategoryMonthlyOnlineSalesRevenue: number;
  productCategoryMonthlyInStoreSalesRevenue: number;
  productCategoryMonthlyUnitsSold: number;

  productCategoryDailyMetrics: ProductCategoryDailyMetric[];
};

type ProductCategoryYearlyMetric = {
  productCategoryYear: Year;
  productCategoryYearlySalesRevenue: number;
  productCategoryYearlyOnlineSalesRevenue: number;
  productCategoryYearlyInStoreSalesRevenue: number;
  productCategoryYearlyUnitsSold: number;

  productCategoryMonthlyMetrics: ProductCategoryMonthlyMetric[];
};

type ProductCategoryMetric = {
  productCategoryName: ProductCategory;

  productCategoryYearlyMetrics: ProductCategoryYearlyMetric[];
};

type RepairCategoryDailyMetric = {
  repairCategoryDay: string;
  repairCategoryDailyRevenue: number;
  repairCategoryDailyUnitsRepaired: number;
};

type RepairCategoryMonthlyMetric = {
  repairCategoryMonth: Month;
  repairCategoryMonthlyRevenue: number;
  repairCategoryMonthlyUnitsRepaired: number;

  repairCategoryDailyMetrics: RepairCategoryDailyMetric[];
};

type RepairCategoryYearlyMetric = {
  repairCategoryYear: Year;
  repairCategoryYearlyRevenue: number;
  repairCategoryYearlyUnitsRepaired: number;

  repairCategoryMonthlyMetrics: RepairCategoryMonthlyMetric[];
};

type RepairCategoryMetric = {
  repairCategoryName: RepairCategory;

  repairCategoryYearlyMetrics: RepairCategoryYearlyMetric[];
};

type BusinessMetric = {
  storeLocation: StoreLocation;
  customerMetrics: CustomerMetrics;
  financialMetrics: FinancialMetric[];
  productCategories: ProductCategoryMetric[];
  repairCategories: RepairCategoryMetric[];
};

export type {
  BusinessMetric,
  CustomerDailyMetric,
  CustomerMetrics,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  DailyFinancialMetric,
  DashboardAction,
  DashboardDispatch,
  DashboardState,
  DaysInMonthsInYears,
  FinancialMetric,
  LocationYearSpread,
  Month,
  MonthlyFinancialMetric,
  ProductCategory,
  ProductCategoryDailyMetric,
  ProductCategoryMetric,
  ProductCategoryMonthlyMetric,
  ProductCategoryYearlyMetric,
  RepairCategory,
  RepairCategoryDailyMetric,
  RepairCategoryMetric,
  RepairCategoryMonthlyMetric,
  RepairCategoryYearlyMetric,
  SalesCategorySelection,
  SalesDataEntryType,
  SalesMetricSelection,
  Year,
};
