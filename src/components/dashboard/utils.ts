import { v4 as uuidv4 } from 'uuid';

import { StoreLocation } from '../../types';
import {
  BusinessMetrics,
  CustomerDailyMetric,
  CustomerMetrics,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  DailyFinancialMetric,
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
  RepairCategoryMetric,
  RepairCategoryMonthlyMetric,
  RepairCategoryYearlyMetric,
  Year,
} from './types';

type ReturnDaysInMonthsInYearsInput = {
  daysPerMonth: number[];
  months: Month[];
  monthEnd?: number;
  monthStart?: number;
  yearEnd: number;
  yearStart: number;
};
/**
 * Generate a map of days in months for a range of years.
 * @param {ReturnDaysInMonthsInYearsInput} options - The options for generating the map.
 * @returns {DaysInMonthsInYears} - A map of days in months for each year.
 *
 * @param {number[]} options.daysPerMonth - The number of days in each month.
 * @param {Month[]} options.months - The months in a year.
 * @param {number} options.monthEnd - The end month (0-11) of the range (default: 11, December).
 * @param {number} options.monthStart - The start month (0-11) of the range (default: 0, January).
 * @param {number} options.yearEnd - The end year of the range.
 * @param {number} options.yearStart - The start year of the range.
 *
 * @throws {RangeError} When `yearStart` is greater than `yearEnd`.
 */
function returnDaysInMonthsInYears({
  daysPerMonth,
  months,
  monthEnd = 11,
  monthStart = 0,
  yearEnd,
  yearStart,
}: ReturnDaysInMonthsInYearsInput): DaysInMonthsInYears {
  const yearsRange = Array.from(
    { length: yearEnd - yearStart + 1 },
    (_, idx) => idx + yearStart
  );

  return yearsRange.reduce((yearsAcc, year) => {
    const isCurrentYear = year === new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const isCurrentMonth =
      isCurrentYear && currentMonth === new Date().getMonth();
    const slicedMonths = isCurrentYear
      ? months.slice(0, currentMonth + 1)
      : months.slice(monthStart, monthEnd + 1);

    const daysInMonthsMap = slicedMonths.reduce(
      (monthsAcc, month, monthIdx) => {
        const days = daysPerMonth[monthIdx];
        const currentDay = isCurrentYear
          ? isCurrentMonth
            ? new Date().getDate() - 1 === -1
              ? 0
              : new Date().getDate() - 1
            : days
          : days;

        const isLeapYear =
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const daysWithLeapYear =
          monthIdx === 1 && isLeapYear ? currentDay + 1 : currentDay;

        const daysRange = Array.from(
          { length: daysWithLeapYear },
          (_, idx) => idx + 1
        ).map((day) => day.toString().padStart(2, '0'));

        monthsAcc.set(month, daysRange);

        return monthsAcc;
      },
      new Map<Month, string[]>()
    );

    yearsAcc.set(year.toString() as Year, daysInMonthsMap);

    return yearsAcc;
  }, new Map<Year, Map<Month, string[]>>());
}

type ReturnTransactionsRevenueTupleInput = {
  category: 'repair' | 'product';
  categoryType: RepairCategory | ProductCategory;
  storeLocation: StoreLocation;
  year: string;
  yearTransactionsSpread: LocationYearSpread;
};
/**
 * - calculates the number of transactions and revenue for a specific category and location based on predefined rules and randomization within specified ranges.
 *
 * @param {ReturnTransactionsRevenueTupleInput} options - The options for generating the transactions and revenue tuple.
 * @returns {[number, number]} - An array containing the number of transactions and the corresponding revenue.
 *
 * @param {'repair' | 'product'} options.category - The category for which transactions and revenue are calculated.
 * @param {RepairCategory | ProductCategory} options.categoryType - The specific type within the category.
 * @param {StoreLocation} options.storeLocation - The location or store where the calculations are done.
 * @param {string} options.year - The year for which the calculations are performed.
 * @param {LocationYearSpread} options.yearTransactionsSpread - The spread of transaction data for the year and location.
 */
function returnTransactionsRevenueTuple({
  category,
  categoryType,
  storeLocation,
  year,
  yearTransactionsSpread,
}: ReturnTransactionsRevenueTupleInput) {
  function returnRandomTransactions() {
    const store = yearTransactionsSpread[storeLocation];
    const yearSpread = Object.entries(store).find(
      ([yearKey]) => yearKey === year
    )?.[1] ?? [3, 5];
    const [min, max] = yearSpread;

    return Math.round(Math.random() * (max - min) + min); // spread between max and min
  }

  const transactions =
    category === 'product'
      ? categoryType === 'Desktop Computers' ||
        categoryType === 'Laptops' ||
        categoryType === 'Smartphones' ||
        categoryType === 'Tablets'
        ? returnRandomTransactions()
        : categoryType === 'Central Processing Units (CPUs)' ||
          categoryType === 'Graphics Processing Units (GPUs)' ||
          categoryType === 'Motherboards' ||
          categoryType === 'Headphones' ||
          categoryType === 'Speakers' ||
          categoryType === 'Monitors' ||
          categoryType === 'Power Supplies'
        ? returnRandomTransactions() + 5
        : categoryType === 'Accessories'
        ? returnRandomTransactions() + 30
        : returnRandomTransactions() + 7
      : // repair category
        returnRandomTransactions();

  const revenue =
    category === 'product'
      ? categoryType === 'Desktop Computers' ||
        categoryType === 'Laptops' ||
        categoryType === 'Smartphones' ||
        categoryType === 'Tablets'
        ? transactions * Math.round(Math.random() * (2200 - 300) + 300) // spread between 300 and 2200
        : categoryType === 'Central Processing Units (CPUs)' ||
          categoryType === 'Graphics Processing Units (GPUs)'
        ? transactions * Math.round(Math.random() * (900 - 150) + 150) // spread between 150 and 900
        : categoryType === 'Motherboards' ||
          categoryType === 'Headphones' ||
          categoryType === 'Speakers' ||
          categoryType === 'Monitors' ||
          categoryType === 'Power Supplies'
        ? transactions * Math.round(Math.random() * (700 - 150) + 150) // spread between 150 and 700
        : categoryType === 'Keyboards' ||
          categoryType === 'Memory (RAM)' ||
          categoryType === 'Mice' ||
          categoryType === 'Storage'
        ? transactions * Math.round(Math.random() * (300 - 100) + 100) // spread between 100 and 300
        : transactions * Math.round(Math.random() * (100 - 50) + 50) // spread between 50 and 100
      : // repair category
      categoryType === 'Computer Components' || categoryType === 'Electronics'
      ? transactions * Math.round(Math.random() * (400 - 150) + 150) // spread between 150 and 400
      : categoryType === 'Mobile Devices'
      ? transactions * Math.round(Math.random() * (200 - 125) + 125) // spread between 200 and 125
      : transactions * Math.round(Math.random() * (150 - 50) + 50); // spread between 50 and 150

  return [transactions, revenue];
}

/**
 * type BusinessMetrics = {
  storeLocation: StoreLocation;

  customerMetrics: {
    totalCustomers: number;
    lifetimeValue: number;

    yearlyMetrics: {
      // year: Year;
      // yearlyCustomers: number;
      // yearlyNewCustomers: number;
      // yearlyReturningCustomers: number;
      // yearlyCustomerChurnRate: number;
      // yearlyCustomerRetentionRate: number;

      // yearlySalesCustomers: number;
      // yearlyInStoreCustomers: number;
      // yearlyOnlineCustomers: number;
      // yearlyRepairCustomers: number;

      id: string;
      year: Year;
      customers: {
        id: string;
        total: number;
        new: {
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
        returning: {
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
        churnRate: number;
        retentionRate: number;
      };
  

      monthlyMetrics: {
        // month: Month;
        // monthlyCustomers: number;
        // monthlyNewCustomers: number;
        // monthlyReturningCustomers: number;
        // monthlyCustomerChurnRate: number;
        // monthlyCustomerRetentionRate: number; 

        // monthlySalesCustomers: number;
        // monthlyInStoreCustomers: number;
        // monthlyOnlineCustomers: number;
        // monthlyRepairCustomers: number;

        id: string;
        month: Month;
        customers: {
          id: string;
          total: number;
          new: {
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
          returning: {
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
          churnRate: number;
          retentionRate: number;
        };

        dailyMetrics: {
          // day: string;
          // dailyCustomers: number;
          // dailyNewCustomers: number;
          // dailyReturningCustomers: number;

          // dailySalesCustomers: number;
          // dailyInStoreCustomers: number;
          // dailyOnlineCustomers: number;
          // dailyRepairCustomers: number;

          id: string;
          day: string;
          customers: {
            id: string;
            total: number;
            new: {
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
            returning: {
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
          };
        }
      }
    }
  }

  financialMetrics: {
    year: string;
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

    monthlyMetrics: {
      month: string;
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

      dailyMetrics: {
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
                
      }[];
    }[];
  }[];

  productCategories: {
    productCategoryName: ProductCategory;

    productCategoryYearlyMetrics: {
      productCategoryYear: string;
      productCategoryYearlySalesRevenue: number;
      productCategoryYearlyOnlineSalesRevenue: number;
      productCategoryYearlyInStoreSalesRevenue: number;
      productCategoryYearlyUnitsSold: number;

      productCategoryMonthlyMetrics: {
        productCategoryMonth: string;
        productCategoryMonthlySalesRevenue: number;
        productCategoryMonthlyOnlineSalesRevenue: number;
        productCategoryMonthlyInStoreSalesRevenue: number;
        productCategoryMonthlyUnitsSold: number;

        productCategoryDailyMetrics: {
          productCategoryDay: string;
          productCategoryDailySalesRevenue: number;
          productCategoryDailyOnlineSalesRevenue: number;
          productCategoryDailyInStoreSalesRevenue: number;
          productCategoryDailyUnitsSold: number;
        }[];
      }[];
    }[];
  }[];
  repairCategories: {
    repairCategoryName: RepairCategory;

    repairCategoryYearlyMetrics: {
      repairCategoryYear: string;
      repairCategoryYearlyRevenue: number;
      repairCategoryYearlyUnitsRepaired: number;

      repairCategoryMonthlyMetrics: {
        repairCategoryMonth: string;
        repairCategoryMonthlyRevenue: number;
        repairCategoryMonthlyUnitsRepaired: number;

        repairCategoryDailyMetrics: {
          repairCategoryDay: string;
          repairCategoryDailyRevenue: number;
          repairCategoryDailyUnitsRepaired: number;
        }[];
      }[];
    }[];
  }[];
};
*/

type ReturnRepairCategoriesInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  repairCategories: RepairCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: LocationYearSpread;
};
/**
 * - Calculates randomly generated repair transactions and revenue for a given year and store location.
 *
 * - Daily transactions are generated then aggregated into monthly and yearly trends.
 *
 * @param {ReturnRepairCategoriesInput} options - The options for generating repair category trends.
 * @returns {RepairCategoryMetric[]} - An array of repair category trends for the specified years and location.
 *
 * @param {DaysInMonthsInYears} options.daysInMonthsInYears - Data containing days and months in multiple years.
 * @param {RepairCategory[]} options.repairCategories - An array of repair category types to calculate trends for.
 * @param {StoreLocation} options.storeLocation - The store location for which trends are calculated.
 * @param {LocationYearSpread} options.yearTransactionsSpread - The spread of transaction data for multiple years and the location.
 */
function returnRepairCategories({
  daysInMonthsInYears,
  repairCategories,
  storeLocation,
  yearTransactionsSpread,
}: ReturnRepairCategoriesInput): RepairCategoryMetric[] {
  return repairCategories.map((repairCategory) => {
    const repairCategoryYearlyMetrics = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const repairCategoryMonthlyMetrics = Array.from(daysInMonthsMap).map(
          (monthTuple) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const repairCategoryDailyMetrics = daysRange.map((date) => {
              const [
                repairCategoryDailyUnitsRepaired,
                repairCategoryDailyRevenue,
              ] = returnTransactionsRevenueTuple({
                category: 'repair',
                categoryType: repairCategory,
                storeLocation,
                year,
                yearTransactionsSpread,
              });

              const repairCategoryDailyMetric = {
                repairCategoryDay: date,
                repairCategoryDailyRevenue,
                repairCategoryDailyUnitsRepaired,
              };

              return repairCategoryDailyMetric;
            });

            const [
              repairCategoryMonthlyRevenue,
              repairCategoryMonthlyUnitsRepaired,
            ] = repairCategoryDailyMetrics.reduce(
              (monthlyRepairMetricsAcc, dailyRepairMetric) => {
                monthlyRepairMetricsAcc[0] +=
                  dailyRepairMetric.repairCategoryDailyRevenue;
                monthlyRepairMetricsAcc[1] +=
                  dailyRepairMetric.repairCategoryDailyUnitsRepaired;

                return monthlyRepairMetricsAcc;
              },
              [0, 0]
            );

            const monthlyRepairMetric: RepairCategoryMonthlyMetric = {
              repairCategoryMonth: month,
              repairCategoryMonthlyRevenue,
              repairCategoryMonthlyUnitsRepaired,
              repairCategoryDailyMetrics,
            };

            return monthlyRepairMetric;
          }
        );

        const [repairCategoryYearlyRevenue, repairCategoryYearlyUnitsRepaired] =
          repairCategoryMonthlyMetrics.reduce(
            (yearlyRepairMetricsAcc, monthlyRepairMetric) => {
              yearlyRepairMetricsAcc[0] +=
                monthlyRepairMetric.repairCategoryMonthlyRevenue;
              yearlyRepairMetricsAcc[1] +=
                monthlyRepairMetric.repairCategoryMonthlyUnitsRepaired;

              return yearlyRepairMetricsAcc;
            },
            [0, 0]
          );

        const yearlyRepairMetric: RepairCategoryYearlyMetric = {
          repairCategoryYear: year.toString() as Year,
          repairCategoryYearlyRevenue,
          repairCategoryYearlyUnitsRepaired,
          repairCategoryMonthlyMetrics,
        };

        return yearlyRepairMetric;
      }
    );

    const repairCategoryObj: RepairCategoryMetric = {
      repairCategoryName: repairCategory,
      repairCategoryYearlyMetrics,
    };

    return repairCategoryObj;
  });
}

type ReturnProductCategoriesInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  productCategories: ProductCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: LocationYearSpread;
};
/**
 * - Calculates randomly generated product transactions and revenue for a given year and store location.
 * - Daily transactions are generated then aggregated into monthly and yearly trends.
 *
 * @param {ReturnProductCategoriesInput} options - The options for generating product category trends.
 * @returns {ProductCategoryMetric[]} - An array of product category trends for the specified years and location.
 *
 * @param {DaysInMonthsInYears} options.daysInMonthsInYears - Data containing days and months in multiple years.
 * @param {ProductCategory[]} options.productCategories - An array of product category types to calculate trends for.
 * @param {StoreLocation} options.storeLocation - The store location for which trends are calculated.
 * @param {LocationYearSpread} options.yearTransactionsSpread - The spread of transaction data for multiple years and the location.
 */
function returnProductCategories({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearTransactionsSpread,
}: ReturnProductCategoriesInput): ProductCategoryMetric[] {
  return productCategories.map((productCategory) => {
    const productCategoryYearlyMetrics = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const productCategoryMonthlyMetrics = Array.from(daysInMonthsMap).map(
          (monthTuple) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const productCategoryDailyMetrics = daysRange.map((date) => {
              const [
                productCategoryDailyUnitsSold,
                productCategoryDailySalesRevenue,
              ] = returnTransactionsRevenueTuple({
                category: 'product',
                categoryType: productCategory,
                storeLocation,
                year,
                yearTransactionsSpread,
              });

              const productCategoryOnlineFraction =
                Math.random() * (0.8 - 0.5) + 0.5; // spread between 0.5 and 0.8
              const productCategoryDailyOnlineSalesRevenue = Math.round(
                productCategoryOnlineFraction * productCategoryDailySalesRevenue
              );
              const productCategoryInStoreFraction =
                1 - productCategoryOnlineFraction;
              const productCategoryDailyInStoreSalesRevenue = Math.round(
                productCategoryInStoreFraction *
                  productCategoryDailySalesRevenue
              );

              const productCategoryDailyMetric: ProductCategoryDailyMetric = {
                productCategoryDay: date,
                productCategoryDailySalesRevenue,
                productCategoryDailyOnlineSalesRevenue,
                productCategoryDailyInStoreSalesRevenue,
                productCategoryDailyUnitsSold,
              };

              return productCategoryDailyMetric;
            });

            const [
              productCategoryMonthlySalesRevenue,
              productCategoryMonthlyOnlineSalesRevenue,
              productCategoryMonthlyInStoreSalesRevenue,
              productCategoryMonthlyUnitsSold,
            ] = productCategoryDailyMetrics.reduce(
              (monthlyRepairMetricsAcc, dailyRepairMetric) => {
                monthlyRepairMetricsAcc[0] +=
                  dailyRepairMetric.productCategoryDailySalesRevenue;
                monthlyRepairMetricsAcc[1] +=
                  dailyRepairMetric.productCategoryDailyOnlineSalesRevenue;
                monthlyRepairMetricsAcc[2] +=
                  dailyRepairMetric.productCategoryDailyInStoreSalesRevenue;
                monthlyRepairMetricsAcc[3] +=
                  dailyRepairMetric.productCategoryDailyUnitsSold;

                return monthlyRepairMetricsAcc;
              },
              [0, 0, 0, 0]
            );

            const productCategoryMonthlyMetric: ProductCategoryMonthlyMetric = {
              productCategoryMonth: month,
              productCategoryMonthlySalesRevenue,
              productCategoryMonthlyOnlineSalesRevenue,
              productCategoryMonthlyInStoreSalesRevenue,
              productCategoryMonthlyUnitsSold,
              productCategoryDailyMetrics,
            };

            return productCategoryMonthlyMetric;
          }
        );

        const [
          productCategoryYearlySalesRevenue,
          productCategoryYearlyOnlineSalesRevenue,
          productCategoryYearlyInStoreSalesRevenue,
          productCategoryYearlyUnitsSold,
        ] = productCategoryMonthlyMetrics.reduce(
          (yearlyProductMetricsAcc, monthlyRepairMetric) => {
            yearlyProductMetricsAcc[0] +=
              monthlyRepairMetric.productCategoryMonthlySalesRevenue;
            yearlyProductMetricsAcc[1] +=
              monthlyRepairMetric.productCategoryMonthlyOnlineSalesRevenue;
            yearlyProductMetricsAcc[2] +=
              monthlyRepairMetric.productCategoryMonthlyInStoreSalesRevenue;
            yearlyProductMetricsAcc[3] +=
              monthlyRepairMetric.productCategoryMonthlyUnitsSold;

            return yearlyProductMetricsAcc;
          },
          [0, 0, 0, 0]
        );

        const productCategoryYearlyMetric: ProductCategoryYearlyMetric = {
          productCategoryYear: year.toString() as Year,
          productCategoryYearlySalesRevenue,
          productCategoryYearlyOnlineSalesRevenue,
          productCategoryYearlyInStoreSalesRevenue,
          productCategoryYearlyUnitsSold,
          productCategoryMonthlyMetrics,
        };

        return productCategoryYearlyMetric;
      }
    );

    const productCategoryObj: ProductCategoryMetric = {
      productCategoryName: productCategory,
      productCategoryYearlyMetrics,
    };

    return productCategoryObj;
  });
}

type ReturnAggregatedProductCategoryMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  financialMetricsTemplate: FinancialMetric;
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  productCategories: ProductCategoryMetric[];
};
/**
 * - Aggregates product category metrics into existing yearly, monthly, and daily financial metrics.
 *
 * @param {ReturnAggregatedProductCategoryMetricsInput} options - The options for aggregating product category metrics.
 * @returns {FinancialMetric[]} - An array of aggregated financial metrics.
 *
 * @param {DailyFinancialMetric} options.dailyFinancialMetricsTemplate - The template for daily financial metrics.
 * @param {FinancialMetric[]} options.financialMetrics - The existing financial metrics to aggregate into.
 * @param {FinancialMetric} options.financialMetricsTemplate - The template for financial metrics.
 * @param {MonthlyFinancialMetric} options.monthlyFinancialMetricsTemplate - The template for monthly financial metrics.
 * @param {ProductCategoryMetric[]} options.productCategories - The product category metrics to aggregate.
 *
 */
function returnAggregatedProductCategoryMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  financialMetricsTemplate,
  monthlyFinancialMetricsTemplate,
  productCategories,
}: ReturnAggregatedProductCategoryMetricsInput): FinancialMetric[] {
  return productCategories.reduce(
    (aggregatedYearlyMetricsAcc, productCategory) => {
      const { productCategoryYearlyMetrics } = productCategory;

      const newYearlyFinancialMetrics = productCategoryYearlyMetrics.map(
        (productCategoryYearlyMetric, productCategoryYearlyMetricIdx) => {
          const { productCategoryMonthlyMetrics, productCategoryYear } =
            productCategoryYearlyMetric;

          const newMonthlyFinancialMetrics = productCategoryMonthlyMetrics.map(
            (productCategoryMonthlyMetric, productCategoryMonthlyMetricIdx) => {
              const { productCategoryDailyMetrics } =
                productCategoryMonthlyMetric;

              const newDailyFinancialMetrics = productCategoryDailyMetrics.map(
                (productCategoryDailyMetric, productCategoryDailyMetricIdx) => {
                  const {
                    productCategoryDailyInStoreSalesRevenue,
                    productCategoryDailyOnlineSalesRevenue,
                    productCategoryDailySalesRevenue,
                    productCategoryDailyUnitsSold,
                    productCategoryDay,
                  } = productCategoryDailyMetric;

                  const existingDailyFinancialMetric =
                    aggregatedYearlyMetricsAcc[productCategoryYearlyMetricIdx]
                      ?.monthlyFinancialMetrics[productCategoryMonthlyMetricIdx]
                      ?.dailyFinancialMetrics[
                      productCategoryDailyMetricIdx
                    ] ?? {
                      ...dailyFinancialMetricsTemplate,
                      day: productCategoryDay,
                    };

                  const newDailyFinancialMetric: DailyFinancialMetric = {
                    ...existingDailyFinancialMetric,
                    dailyRevenue:
                      existingDailyFinancialMetric.dailyRevenue +
                      productCategoryDailySalesRevenue,
                    dailySalesRevenue:
                      existingDailyFinancialMetric.dailySalesRevenue +
                      productCategoryDailySalesRevenue,
                    dailyOnlineSalesRevenue:
                      existingDailyFinancialMetric.dailyOnlineSalesRevenue +
                      productCategoryDailyOnlineSalesRevenue,
                    dailyInStoreSalesRevenue:
                      existingDailyFinancialMetric.dailyInStoreSalesRevenue +
                      productCategoryDailyInStoreSalesRevenue,
                    dailyOrders:
                      existingDailyFinancialMetric.dailyOrders +
                      productCategoryDailyUnitsSold,
                    dailySalesOrders:
                      existingDailyFinancialMetric.dailySalesOrders +
                      productCategoryDailyUnitsSold,
                  };

                  return newDailyFinancialMetric;
                }
              );

              const {
                productCategoryMonth,
                productCategoryMonthlyInStoreSalesRevenue,
                productCategoryMonthlyOnlineSalesRevenue,
                productCategoryMonthlySalesRevenue,
                productCategoryMonthlyUnitsSold,
              } = productCategoryMonthlyMetric;

              const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
                productCategoryYearlyMetricIdx
              ]?.monthlyFinancialMetrics[productCategoryMonthlyMetricIdx] ?? {
                ...monthlyFinancialMetricsTemplate,
                month: productCategoryMonth,
                dailyFinancialMetrics: Array.from({
                  length: newDailyFinancialMetrics.length,
                }),
              };

              existingMonthlyFinancialMetric.totalMonthlyRevenue +=
                productCategoryMonthlySalesRevenue;
              existingMonthlyFinancialMetric.monthlySalesRevenue +=
                productCategoryMonthlySalesRevenue;
              existingMonthlyFinancialMetric.monthlyOnlineSalesRevenue +=
                productCategoryMonthlyOnlineSalesRevenue;
              existingMonthlyFinancialMetric.monthlyInStoreSalesRevenue +=
                productCategoryMonthlyInStoreSalesRevenue;
              existingMonthlyFinancialMetric.totalMonthlyOrders +=
                productCategoryMonthlyUnitsSold;
              existingMonthlyFinancialMetric.monthlySalesOrders +=
                productCategoryMonthlyUnitsSold;

              newDailyFinancialMetrics.forEach(
                (dailyFinancialMetric, dailyFinancialMetricIdx) => {
                  existingMonthlyFinancialMetric.dailyFinancialMetrics[
                    dailyFinancialMetricIdx
                  ] = dailyFinancialMetric;
                }
              );

              return existingMonthlyFinancialMetric;
            }
          );

          const {
            productCategoryYearlyInStoreSalesRevenue,
            productCategoryYearlyOnlineSalesRevenue,
            productCategoryYearlySalesRevenue,
            productCategoryYearlyUnitsSold,
          } = productCategoryYearlyMetric;

          const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
            productCategoryYearlyMetricIdx
          ] ?? {
            ...financialMetricsTemplate,
            year: productCategoryYear,
            monthlyFinancialMetrics: Array.from({
              length: newMonthlyFinancialMetrics.length,
            }),
          };

          existingYearlyFinancialMetric.yearlyRevenue +=
            productCategoryYearlySalesRevenue;
          existingYearlyFinancialMetric.yearlySalesRevenue +=
            productCategoryYearlySalesRevenue;
          existingYearlyFinancialMetric.yearlyOnlineSalesRevenue +=
            productCategoryYearlyOnlineSalesRevenue;
          existingYearlyFinancialMetric.yearlyInStoreSalesRevenue +=
            productCategoryYearlyInStoreSalesRevenue;
          existingYearlyFinancialMetric.yearlySalesOrders +=
            productCategoryYearlyUnitsSold;

          newMonthlyFinancialMetrics.forEach(
            (monthlyFinancialMetric, monthlyFinancialMetricIdx) => {
              existingYearlyFinancialMetric.monthlyFinancialMetrics[
                monthlyFinancialMetricIdx
              ] = monthlyFinancialMetric;
            }
          );

          return existingYearlyFinancialMetric;
        }
      );

      aggregatedYearlyMetricsAcc = newYearlyFinancialMetrics;

      return aggregatedYearlyMetricsAcc;
    },
    financialMetrics
  );
}

type ReturnAggregatedRepairCategoryMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  repairCategories: RepairCategoryMetric[];
  financialMetricsTemplate: FinancialMetric;
};
/**
 * - Aggregates repair category metrics into existing yearly, monthly, and daily financial metrics.
 *
 * @param {ReturnAggregatedRepairCategoryMetricsInput} options - The options for aggregating repair category metrics.
 * @returns {FinancialMetric[]} - An array of aggregated financial metrics.
 *
 * @param {DailyFinancialMetric} options.dailyFinancialMetricsTemplate - The template for daily financial metrics.
 * @param {FinancialMetric[]} options.financialMetrics - The existing financial metrics to aggregate into.
 * @param {FinancialMetric} options.financialMetricsTemplate - The template for financial metrics.
 * @param {MonthlyFinancialMetric} options.monthlyFinancialMetricsTemplate - The template for monthly financial metrics.
 * @param {RepairCategoryMetric[]} options.repairCategories - The repair category metrics to aggregate.
 */
function returnAggregatedRepairCategoryMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  monthlyFinancialMetricsTemplate,
  repairCategories,
  financialMetricsTemplate,
}: ReturnAggregatedRepairCategoryMetricsInput): FinancialMetric[] {
  return repairCategories.reduce(
    (aggregatedYearlyMetricsAcc, repairCategory) => {
      const { repairCategoryYearlyMetrics } = repairCategory;

      const newYearlyFinancialMetrics = repairCategoryYearlyMetrics.map(
        (repairCategoryYearlyMetric, repairCategoryYearlyMetricIdx) => {
          const { repairCategoryMonthlyMetrics, repairCategoryYear } =
            repairCategoryYearlyMetric;

          const newMonthlyFinancialMetrics = repairCategoryMonthlyMetrics.map(
            (repairCategoryMonthlyMetric, repairCategoryMonthlyMetricIdx) => {
              const { repairCategoryDailyMetrics } =
                repairCategoryMonthlyMetric;

              const newDailyFinancialMetrics = repairCategoryDailyMetrics.map(
                (repairCategoryDailyMetric, repairCategoryDailyMetricIdx) => {
                  const {
                    repairCategoryDailyRevenue,
                    repairCategoryDailyUnitsRepaired,
                    repairCategoryDay,
                  } = repairCategoryDailyMetric;

                  const existingDailyFinancialMetric =
                    aggregatedYearlyMetricsAcc[repairCategoryYearlyMetricIdx]
                      ?.monthlyFinancialMetrics[repairCategoryMonthlyMetricIdx]
                      ?.dailyFinancialMetrics[repairCategoryDailyMetricIdx] ?? {
                      ...dailyFinancialMetricsTemplate,
                      day: repairCategoryDay,
                    };

                  const newDailyFinancialMetric: DailyFinancialMetric = {
                    ...existingDailyFinancialMetric,
                    dailyRevenue:
                      existingDailyFinancialMetric.dailyRevenue +
                      repairCategoryDailyRevenue,
                    dailyRepairRevenue:
                      existingDailyFinancialMetric.dailyRepairRevenue +
                      repairCategoryDailyRevenue,
                    dailyRepairOrders:
                      existingDailyFinancialMetric.dailyRepairOrders +
                      repairCategoryDailyUnitsRepaired,
                    dailyOrders:
                      existingDailyFinancialMetric.dailyOrders +
                      repairCategoryDailyUnitsRepaired,
                  };

                  return newDailyFinancialMetric;
                }
              );

              const {
                repairCategoryMonth,
                repairCategoryMonthlyRevenue,
                repairCategoryMonthlyUnitsRepaired,
              } = repairCategoryMonthlyMetric;

              const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
                repairCategoryYearlyMetricIdx
              ]?.monthlyFinancialMetrics[repairCategoryMonthlyMetricIdx] ?? {
                ...monthlyFinancialMetricsTemplate,
                month: repairCategoryMonth,
                dailyFinancialMetrics: Array.from({
                  length: newDailyFinancialMetrics.length,
                }),
              };

              existingMonthlyFinancialMetric.totalMonthlyRevenue +=
                repairCategoryMonthlyRevenue;
              existingMonthlyFinancialMetric.monthlyRepairRevenue +=
                repairCategoryMonthlyRevenue;
              existingMonthlyFinancialMetric.monthlyRepairOrders +=
                repairCategoryMonthlyUnitsRepaired;
              existingMonthlyFinancialMetric.totalMonthlyOrders +=
                repairCategoryMonthlyUnitsRepaired;

              newDailyFinancialMetrics.forEach(
                (dailyFinancialMetric, dailyFinancialMetricIdx) => {
                  existingMonthlyFinancialMetric.dailyFinancialMetrics[
                    dailyFinancialMetricIdx
                  ] = dailyFinancialMetric;
                }
              );

              return existingMonthlyFinancialMetric;
            }
          );

          const {
            repairCategoryYearlyRevenue,
            repairCategoryYearlyUnitsRepaired,
          } = repairCategoryYearlyMetric;

          const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
            repairCategoryYearlyMetricIdx
          ] ?? {
            ...financialMetricsTemplate,
            year: repairCategoryYear,
            monthlyFinancialMetrics: Array.from({
              length: newMonthlyFinancialMetrics.length,
            }),
          };

          existingYearlyFinancialMetric.yearlyRevenue +=
            repairCategoryYearlyRevenue;
          existingYearlyFinancialMetric.yearlyRepairRevenue +=
            repairCategoryYearlyRevenue;
          existingYearlyFinancialMetric.yearlyRepairOrders +=
            repairCategoryYearlyUnitsRepaired;
          existingYearlyFinancialMetric.yearlyRepairOrders +=
            repairCategoryYearlyUnitsRepaired;

          newMonthlyFinancialMetrics.forEach(
            (monthlyFinancialMetric, monthlyFinancialMetricIdx) => {
              existingYearlyFinancialMetric.monthlyFinancialMetrics[
                monthlyFinancialMetricIdx
              ] = monthlyFinancialMetric;
            }
          );

          return existingYearlyFinancialMetric;
        }
      );

      aggregatedYearlyMetricsAcc = newYearlyFinancialMetrics;

      return aggregatedYearlyMetricsAcc;
    },
    financialMetrics
  );
}

function returnRandomProfitMargin({
  storeLocation,
  year,
  yearProfitMarginSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearProfitMarginSpread: LocationYearSpread;
}) {
  const store = yearProfitMarginSpread[storeLocation];
  const yearSpread = Object.entries(store).find(
    ([yearKey]) => yearKey === year
  )?.[1] ?? [0.1, 0.2];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomConversionRate({
  storeLocation,
  year,
  yearConversionRateSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearConversionRateSpread: LocationYearSpread;
}) {
  const store = yearConversionRateSpread[storeLocation];
  const yearSpread = Object.entries(store).find(
    ([yearKey]) => yearKey === year
  )?.[1] ?? [0.01, 0.03];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

type ReturnFinancialMetricsInput = {
  financialMetrics: FinancialMetric[];
  storeLocation: StoreLocation;
  yearConversionRateSpread: LocationYearSpread;
  yearProfitMarginSpread: LocationYearSpread;
};
/**
 * - Calculates daily financial metrics from randomly generated transactions and revenue and aggregates them into monthly and yearly metrics.
 *
 * @param {ReturnFinancialMetricsInput} options - The options for generating financial metrics.
 * @returns {FinancialMetric[]} - An array of financial metrics.
 *
 * @param {FinancialMetric[]} options.financialMetrics - The financial metrics to calculate.
 * @param {StoreLocation} options.storeLocation - The store location for which to calculate financial metrics.
 * @param {LocationYearSpread} options.yearConversionRateSpread - The spread of conversion rates for multiple years and the location.
 * @param {LocationYearSpread} options.yearProfitMarginSpread - The spread of profit margins for multiple years and the location.
 */
function returnFinancialMetrics({
  financialMetrics,
  storeLocation,
  yearConversionRateSpread,
  yearProfitMarginSpread,
}: ReturnFinancialMetricsInput): FinancialMetric[] {
  return financialMetrics.map((financialMetric) => {
    const { monthlyFinancialMetrics, year } = financialMetric;

    const newMonthlyFinancialMetrics = monthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => {
        const { dailyFinancialMetrics } = monthlyFinancialMetric;

        const newDailyFinancialMetrics = dailyFinancialMetrics.map(
          (dailyFinancialMetric) => {
            const { dailyRevenue, dailyOrders } = dailyFinancialMetric;

            const dailyAverageOrderValue = dailyRevenue / dailyOrders;
            const dailyConversionRate = returnRandomConversionRate({
              storeLocation,
              year,
              yearConversionRateSpread,
            });
            const dailyNetProfitMargin = returnRandomProfitMargin({
              storeLocation,
              year,
              yearProfitMarginSpread,
            });
            const dailyProfit = dailyRevenue * dailyNetProfitMargin;
            const dailyExpenses = dailyRevenue - dailyProfit;

            const newDailyFinancialMetric: DailyFinancialMetric = {
              ...dailyFinancialMetric,
              dailyAverageOrderValue,
              dailyConversionRate,
              dailyExpenses,
              dailyNetProfitMargin,
              dailyProfit,
            };

            return newDailyFinancialMetric;
          }
        );

        const dailyAverageOrderValues = newDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.dailyAverageOrderValue
        );
        const monthlyAverageOrderValue =
          dailyAverageOrderValues.reduce(
            (acc, dailyAverageOrderValue) => acc + dailyAverageOrderValue,
            0
          ) / dailyAverageOrderValues.length;

        const dailyConversionRates = newDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.dailyConversionRate
        );
        const monthlyConversionRate =
          dailyConversionRates.reduce(
            (acc, dailyConversionRate) => acc + dailyConversionRate,
            0
          ) / dailyConversionRates.length;

        const [monthlyExpenses, monthlyProfit] =
          newDailyFinancialMetrics.reduce(
            (monthlyFinancialMetricsAcc, dailyMetric) => {
              monthlyFinancialMetricsAcc[0] += dailyMetric.dailyExpenses;
              monthlyFinancialMetricsAcc[1] += dailyMetric.dailyProfit;

              return monthlyFinancialMetricsAcc;
            },
            [0, 0]
          );
        const monthlyNetProfitMargin = monthlyProfit / monthlyExpenses;

        const newMonthlyFinancialMetric: MonthlyFinancialMetric = {
          ...monthlyFinancialMetric,
          monthlyAverageOrderValue,
          monthlyConversionRate,
          monthlyExpenses,
          monthlyProfit,
          monthlyNetProfitMargin,
          dailyFinancialMetrics: newDailyFinancialMetrics,
        };

        return newMonthlyFinancialMetric;
      }
    );

    const monthlyAverageOrderValues = newMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) =>
        monthlyFinancialMetric.monthlyAverageOrderValue
    );
    const yearlyAverageOrderValue =
      monthlyAverageOrderValues.reduce(
        (acc, monthlyAverageOrderValue) => acc + monthlyAverageOrderValue,
        0
      ) / monthlyAverageOrderValues.length;

    const monthlyConversionRates = newMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => monthlyFinancialMetric.monthlyConversionRate
    );
    const yearlyConversionRate =
      monthlyConversionRates.reduce(
        (acc, monthlyConversionRate) => acc + monthlyConversionRate,
        0
      ) / monthlyConversionRates.length;

    const [yearlyExpenses, yearlyProfit] = newMonthlyFinancialMetrics.reduce(
      (yearlyFinancialMetricsAcc, monthlyFinancialMetric) => {
        yearlyFinancialMetricsAcc[0] += monthlyFinancialMetric.monthlyExpenses;
        yearlyFinancialMetricsAcc[1] += monthlyFinancialMetric.monthlyProfit;

        return yearlyFinancialMetricsAcc;
      },
      [0, 0]
    );
    const yearlyNetProfitMargin = yearlyProfit / yearlyExpenses;

    const newFinancialMetric: FinancialMetric = {
      ...financialMetric,
      yearlyAverageOrderValue,
      yearlyConversionRate,
      yearlyExpenses,
      yearlyProfit,
      yearlyNetProfitMargin,
      monthlyFinancialMetrics: newMonthlyFinancialMetrics,
    };

    return newFinancialMetric;
  });
}

function returnRandomCustomers({
  year,
  storeLocation,
  yearCustomersSpread,
}: {
  year: Year;
  storeLocation: StoreLocation;
  yearCustomersSpread: LocationYearSpread;
}) {
  const store = yearCustomersSpread[storeLocation];
  const yearSpread = Object.entries(store).find(
    ([yearKey]) => yearKey === year
  )?.[1] ?? [5, 15];
  const [min, max] = yearSpread;

  return Math.round(Math.random() * (max - min) + min); // spread between max and min
}

function returnRandomChurnRate({
  year,
  storeLocation,
  yearChurnRateSpread,
}: {
  year: Year;
  storeLocation: StoreLocation;
  yearChurnRateSpread: LocationYearSpread;
}) {
  const store = yearChurnRateSpread[storeLocation];
  const yearSpread = Object.entries(store).find(
    ([yearKey]) => yearKey === year
  )?.[1] ?? [0.1, 0.3];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min; // spread between max and min
}

function returnRandomNewCustomers({
  year,
  storeLocation,
  yearNewCustomersSpread,
}: {
  year: Year;
  storeLocation: StoreLocation;
  yearNewCustomersSpread: LocationYearSpread;
}) {
  const store = yearNewCustomersSpread[storeLocation];
  const yearSpread = Object.entries(store).find(
    ([yearKey]) => yearKey === year
  )?.[1] ?? [0.2, 0.1];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min; // spread between max and min
}

type ReturnCustomerMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  storeLocation: StoreLocation;
  yearChurnRateSpread: LocationYearSpread;
  yearCustomersSpread: LocationYearSpread;
  yearNewCustomersSpread: LocationYearSpread;
};
/**
 * - Calculates randomly generated customer metrics for a given year and store location.
 * - Daily customers are generated then aggregated into monthly and yearly trends.
 *
 * @param {ReturnCustomerMetricsInput} options - The options for generating customer metrics.
 * @returns {CustomerMetrics} - An object containing customer metrics.
 *
 * @param {DaysInMonthsInYears} options.daysInMonthsInYears - Data containing days and months in multiple years.
 * @param {StoreLocation} options.storeLocation - The store location for which trends are calculated.
 * @param {LocationYearSpread} options.yearChurnRateSpread - The spread of churn rates for multiple years and the location.
 * @param {LocationYearSpread} options.yearCustomersSpread - The spread of customer data for multiple years and the location.
 * @param {LocationYearSpread} options.yearNewCustomersSpread - The spread of new customer data for multiple years and the location.
 */
function returnCustomerMetrics({
  daysInMonthsInYears,
  storeLocation,
  yearChurnRateSpread,
  yearCustomersSpread,
  yearNewCustomersSpread,
}: ReturnCustomerMetricsInput): CustomerMetrics {
  const yearlyCustomerMetrics = Array.from(daysInMonthsInYears).map(
    (yearTuple: [Year, Map<Month, string[]>]) => {
      const [year, daysInMonthsMap] = yearTuple;

      const monthlyCustomerMetrics = Array.from(daysInMonthsMap).map(
        (monthTuple: [Month, string[]]) => {
          const [month, daysRange] = monthTuple;

          const dailyCustomerMetrics = daysRange.map((date: string) => {
            /**
             * id: string;
               day: string;
               customers: {
                 id: string;
                 total: number;
                 new: {
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
                 returning: {
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
               };
             */
            const dailyCustomersTotal = returnRandomCustomers({
              storeLocation,
              year,
              yearCustomersSpread,
            });
            // new
            const dailyNewCustomersFraction = returnRandomNewCustomers({
              storeLocation,
              year,
              yearNewCustomersSpread,
            });
            const dailyNewCustomers = Math.round(
              dailyCustomersTotal * dailyNewCustomersFraction
            );
            // new -> repair
            const dailyNewRepairCustomersFraction =
              Math.random() * (0.15 - 0.05) + 0.05; // spread between 0.05 and 0.15
            const dailyNewRepairCustomers = Math.round(
              dailyNewCustomers * dailyNewRepairCustomersFraction
            );
            // new -> sales
            const dailyNewSalesCustomers =
              dailyNewCustomers - dailyNewRepairCustomers;
            // new -> sales -> online
            const dailyNewSalesOnlineCustomersFraction =
              Math.random() * (0.9 - 0.7) + 0.7; // spread between 0.7 and 0.9
            const dailyNewSalesOnlineCustomers = Math.round(
              dailyNewSalesCustomers * dailyNewSalesOnlineCustomersFraction
            );
            // new -> sales -> in store
            const dailyNewSalesInStoreCustomers =
              dailyNewSalesCustomers - dailyNewSalesOnlineCustomers;

            // returning
            const dailyReturningCustomers =
              dailyCustomersTotal - dailyNewCustomers;
            // returning -> repair
            const dailyReturningRepairCustomersFraction =
              Math.random() * (0.15 - 0.05) + 0.05; // spread between 0.05 and 0.15
            const dailyReturningRepairCustomers = Math.round(
              dailyReturningCustomers * dailyReturningRepairCustomersFraction
            );
            // returning -> sales
            const dailyReturningSalesCustomers =
              dailyReturningCustomers - dailyReturningRepairCustomers;
            // returning -> sales -> online
            const dailyReturningSalesOnlineCustomersFraction =
              Math.random() * (0.9 - 0.7) + 0.7; // spread between 0.7 and 0.9
            const dailyReturningSalesOnlineCustomers = Math.round(
              dailyReturningSalesCustomers *
                dailyReturningSalesOnlineCustomersFraction
            );
            // returning -> sales -> in store
            const dailyReturningSalesInStoreCustomers =
              dailyReturningSalesCustomers - dailyReturningSalesOnlineCustomers;

            const dailyCustomerMetric: CustomerDailyMetric = {
              id: uuidv4(),
              day: date,
              customers: {
                id: uuidv4(),
                total: dailyCustomersTotal,
                new: {
                  id: uuidv4(),
                  repair: dailyNewRepairCustomers,
                  sales: {
                    id: uuidv4(),
                    total: dailyNewSalesCustomers,
                    inStore: dailyNewSalesInStoreCustomers,
                    online: dailyNewSalesOnlineCustomers,
                  },
                  total: dailyNewCustomers,
                },
                returning: {
                  id: uuidv4(),
                  repair: dailyReturningRepairCustomers,
                  sales: {
                    id: uuidv4(),
                    inStore: dailyReturningSalesInStoreCustomers,
                    online: dailyReturningSalesOnlineCustomers,
                    total: dailyReturningSalesCustomers,
                  },
                  total: dailyReturningCustomers,
                },
              },
            };

            return dailyCustomerMetric;
          });

          const monthlyCustomerMetricTemplate: CustomerMonthlyMetric = {
            id: uuidv4(),
            month,
            customers: {
              id: uuidv4(),
              new: {
                id: uuidv4(),
                repair: 0,
                sales: {
                  id: uuidv4(),
                  inStore: 0,
                  online: 0,
                  total: 0,
                },
                total: 0,
              },
              returning: {
                id: uuidv4(),
                repair: 0,
                sales: {
                  id: uuidv4(),
                  inStore: 0,
                  online: 0,
                  total: 0,
                },
                total: 0,
              },
              total: 0,
              churnRate: 0,
              retentionRate: 0,
            },
            dailyMetrics: dailyCustomerMetrics,
          };

          const monthlyCustomerMetric = dailyCustomerMetrics.reduce(
            (monthlyCustomerMetricsAcc, dailyCustomerMetric) => {
              const { customers } = dailyCustomerMetric;
              monthlyCustomerMetricsAcc.customers.total += customers.total;
              // new
              monthlyCustomerMetricsAcc.customers.new.total +=
                customers.new.total;
              // new -> sales
              monthlyCustomerMetricsAcc.customers.new.sales.total +=
                customers.new.sales.total;
              // new -> sales -> online
              monthlyCustomerMetricsAcc.customers.new.sales.online +=
                customers.new.sales.online;
              // new -> sales -> in store
              monthlyCustomerMetricsAcc.customers.new.sales.inStore +=
                customers.new.sales.inStore;
              // new -> repair
              monthlyCustomerMetricsAcc.customers.new.repair +=
                customers.new.repair;

              // returning
              monthlyCustomerMetricsAcc.customers.returning.total +=
                customers.returning.total;
              // returning -> sales
              monthlyCustomerMetricsAcc.customers.returning.sales.total +=
                customers.returning.sales.total;
              // returning -> sales -> online
              monthlyCustomerMetricsAcc.customers.returning.sales.online +=
                customers.returning.sales.online;
              // returning -> sales -> in store
              monthlyCustomerMetricsAcc.customers.returning.sales.inStore +=
                customers.returning.sales.inStore;
              // returning -> repair
              monthlyCustomerMetricsAcc.customers.returning.repair +=
                customers.returning.repair;

              return monthlyCustomerMetricsAcc;
            },
            monthlyCustomerMetricTemplate
          );

          const monthlyCustomerChurnRate = returnRandomChurnRate({
            storeLocation,
            year,
            yearChurnRateSpread,
          });
          monthlyCustomerMetric.customers.churnRate = monthlyCustomerChurnRate;

          const monthlyCustomerRetentionRate = 1 - monthlyCustomerChurnRate;
          monthlyCustomerMetric.customers.retentionRate =
            monthlyCustomerRetentionRate;

          return monthlyCustomerMetric;
        }
      );

      const yearlyCustomerMetricTemplate: CustomerYearlyMetric = {
        id: uuidv4(),
        year,
        customers: {
          id: uuidv4(),
          total: 0,
          new: {
            id: uuidv4(),
            repair: 0,
            sales: {
              id: uuidv4(),
              inStore: 0,
              online: 0,
              total: 0,
            },
            total: 0,
          },
          returning: {
            id: uuidv4(),
            repair: 0,
            sales: {
              id: uuidv4(),
              inStore: 0,
              online: 0,
              total: 0,
            },
            total: 0,
          },
          churnRate: 0,
          retentionRate: 0,
        },
        monthlyMetrics: monthlyCustomerMetrics,
      };

      const yearlyCustomerMetric = monthlyCustomerMetrics.reduce(
        (yearlyCustomerMetricsAcc, monthlyCustomerMetric) => {
          const { customers } = monthlyCustomerMetric;
          yearlyCustomerMetricsAcc.customers.total += customers.total;
          // new
          yearlyCustomerMetricsAcc.customers.new.total += customers.new.total;
          // new -> sales
          yearlyCustomerMetricsAcc.customers.new.sales.total +=
            customers.new.sales.total;
          // new -> sales -> online
          yearlyCustomerMetricsAcc.customers.new.sales.online +=
            customers.new.sales.online;
          // new -> sales -> in store
          yearlyCustomerMetricsAcc.customers.new.sales.inStore +=
            customers.new.sales.inStore;
          // new -> repair
          yearlyCustomerMetricsAcc.customers.new.repair += customers.new.repair;

          // returning
          yearlyCustomerMetricsAcc.customers.returning.total +=
            customers.returning.total;
          // returning -> sales
          yearlyCustomerMetricsAcc.customers.returning.sales.total +=
            customers.returning.sales.total;
          // returning -> sales -> online
          yearlyCustomerMetricsAcc.customers.returning.sales.online +=
            customers.returning.sales.online;
          // returning -> sales -> in store
          yearlyCustomerMetricsAcc.customers.returning.sales.inStore +=
            customers.returning.sales.inStore;
          // returning -> repair
          yearlyCustomerMetricsAcc.customers.returning.repair +=
            customers.returning.repair;

          return yearlyCustomerMetricsAcc;
        },
        yearlyCustomerMetricTemplate
      );

      // average of all monthly churn rates
      const monthlyCustomerChurnRates = monthlyCustomerMetrics.map(
        (monthlyCustomerMetric) => monthlyCustomerMetric.customers.churnRate
      );
      const yearlyCustomerChurnRate =
        monthlyCustomerChurnRates.reduce(
          (acc, monthlyCustomerChurnRate) => acc + monthlyCustomerChurnRate,
          0
        ) / monthlyCustomerChurnRates.length;
      yearlyCustomerMetric.customers.churnRate = yearlyCustomerChurnRate;

      const yearlyCustomerRetentionRate = 1 - yearlyCustomerChurnRate;
      yearlyCustomerMetric.customers.retentionRate =
        yearlyCustomerRetentionRate;

      return yearlyCustomerMetric;
    }
  );

  // random customer lifetime value
  const lifetimeValue = Math.round(Math.random() * (2000 - 1000) + 1000); // spread between 1000 and 2000
  const totalCustomers = yearlyCustomerMetrics.reduce(
    (acc, yearlyCustomerMetric) => acc + yearlyCustomerMetric.customers.total,
    0
  );

  const customerMetrics: CustomerMetrics = {
    lifetimeValue,
    totalCustomers,
    yearlyMetrics: yearlyCustomerMetrics,
  };

  return customerMetrics;
}

type CreateRandomBusinessMetricsInput = {
  daysPerMonth: number[];
  months: Month[];
  productCategories: ProductCategory[];
  repairCategories: RepairCategory[];
  storeLocations: StoreLocation[];
  yearChurnRateSpread: LocationYearSpread;
  yearConversionRateSpread: LocationYearSpread;
  yearCustomersSpread: LocationYearSpread;
  yearNewCustomersSpread: LocationYearSpread;
  yearProfitMarginSpread: LocationYearSpread;
  yearTransactionsSpread: LocationYearSpread;
};

function createRandomBusinessMetrics({
  daysPerMonth,
  months,
  productCategories,
  repairCategories,
  storeLocations,
  yearChurnRateSpread,
  yearConversionRateSpread,
  yearCustomersSpread,
  yearNewCustomersSpread,
  yearProfitMarginSpread,
  yearTransactionsSpread,
}: CreateRandomBusinessMetricsInput): BusinessMetrics[] {
  const FINANCIAL_METRICS_TEMPLATE: FinancialMetric = {
    year: '2022',
    yearlyAverageOrderValue: 0,
    yearlyConversionRate: 0,
    yearlyExpenses: 0,
    yearlyInStoreSalesRevenue: 0,
    yearlyNetProfitMargin: 0,
    yearlyOnlineSalesRevenue: 0,
    yearlyProfit: 0,
    yearlyRepairOrders: 0,
    yearlyRepairRevenue: 0,
    yearlyRevenue: 0,
    yearlySalesOrders: 0,
    yearlySalesRevenue: 0,

    monthlyFinancialMetrics: [],
  };

  const MONTHLY_METRICS_TEMPLATE: MonthlyFinancialMetric = {
    month: 'January',
    totalMonthlyRevenue: 0,
    monthlySalesRevenue: 0,
    monthlyRepairRevenue: 0,
    monthlyExpenses: 0,
    monthlyAverageOrderValue: 0,
    monthlyConversionRate: 0,
    monthlyInStoreSalesRevenue: 0,
    monthlyNetProfitMargin: 0,
    monthlyOnlineSalesRevenue: 0,
    monthlyProfit: 0,
    monthlyRepairOrders: 0,
    monthlySalesOrders: 0,
    totalMonthlyOrders: 0,

    dailyFinancialMetrics: [],
  };

  const DAILY_METRICS_TEMPLATE: DailyFinancialMetric = {
    dailyRevenue: 0,
    dailyExpenses: 0,
    dailySalesRevenue: 0,
    dailyInStoreSalesRevenue: 0,
    dailyOnlineSalesRevenue: 0,
    dailyRepairRevenue: 0,
    dailyProfit: 0,
    dailyNetProfitMargin: 0,
    dailyAverageOrderValue: 0,
    dailyConversionRate: 0,
    dailyOrders: 0,
    dailyRepairOrders: 0,
    dailySalesOrders: 0,
    day: '',
  };

  return storeLocations.map((storeLocation) => {
    const storeLocationSalesData: BusinessMetrics = {
      storeLocation,
      customerMetrics: {
        totalCustomers: 0,
        lifetimeValue: 0,
        yearlyMetrics: [],
      },
      financialMetrics: [],
      productCategories: [],
      repairCategories: [],
    };

    const daysInMonthsInYears = returnDaysInMonthsInYears({
      daysPerMonth,
      months,
      yearStart:
        storeLocation === 'Edmonton'
          ? 2013
          : storeLocation === 'Calgary'
          ? 2017
          : 2019,
      yearEnd: 2023,
      // yearStart: 2013,
      // yearEnd: 2013,
    });

    const createdProductCategories = returnProductCategories({
      daysInMonthsInYears,
      productCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationSalesData.productCategories = createdProductCategories;

    const createdRepairCategories = returnRepairCategories({
      daysInMonthsInYears,
      repairCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationSalesData.repairCategories = createdRepairCategories;

    const aggregatedProductCategoryMetrics =
      returnAggregatedProductCategoryMetrics({
        productCategories: createdProductCategories,
        financialMetrics: storeLocationSalesData.financialMetrics,
        dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
        financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
        monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
      });
    storeLocationSalesData.financialMetrics = aggregatedProductCategoryMetrics;

    const aggregatedRepairCategoryMetrics =
      returnAggregatedRepairCategoryMetrics({
        repairCategories: createdRepairCategories,
        financialMetrics: storeLocationSalesData.financialMetrics,
        dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
        financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
        monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
      });
    storeLocationSalesData.financialMetrics = aggregatedRepairCategoryMetrics;

    const createdFinancialMetrics = returnFinancialMetrics({
      financialMetrics: storeLocationSalesData.financialMetrics,
      storeLocation,
      yearConversionRateSpread,
      yearProfitMarginSpread,
    });
    storeLocationSalesData.financialMetrics = createdFinancialMetrics;

    const createdCustomerMetrics = returnCustomerMetrics({
      daysInMonthsInYears,
      storeLocation,
      yearChurnRateSpread,
      yearCustomersSpread,
      yearNewCustomersSpread,
    });
    storeLocationSalesData.customerMetrics = createdCustomerMetrics;

    return storeLocationSalesData;
  });
}

export { createRandomBusinessMetrics };
