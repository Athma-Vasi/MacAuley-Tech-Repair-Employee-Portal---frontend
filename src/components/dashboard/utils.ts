import { v4 as uuidv4 } from 'uuid';

import { StoreLocation } from '../../types';
import {
  BusinessMetric,
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
            ? new Date().getDate()
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
 * type BusinessMetric = {
  storeLocation: StoreLocation;

  customerMetrics: {
    totalCustomers: number;
    lifetimeValue: number;

    yearlyMetrics: {
      year: Year;
      customers: {
        total: number;
        new: {
          total: number;
          sales: {
            total: number;
            online: number;
            inStore: number;
          };
          repair: number;
        };
        returning: {
          total: number;
          sales: {
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
        month: Month;
        customers: {
          total: number;
          new: {
            total: number;
            sales: {
              total: number;
              online: number;
              inStore: number;
            };
            repair: number;
          };
          returning: {
            total: number;
            sales: {
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
          day: string;
          customers: {
            total: number;
            new: {
              total: number;
              sales: {
                total: number;
                online: number;
                inStore: number;
              };
              repair: number;
            };
            returning: {
              total: number;
              sales: {
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
    year: Year;
    averageOrderValue: number;
    conversionRate: number;
    expenses: number;
    netProfitMargin: number;
    orders: number;
    profit: number;
    revenue: number;
  
    repairs: {
      revenue: number;
      orders: number;
    };
  
    sales: {
      orders: {
        total: number;
        online: number;
        inStore: number;
      };
      revenue: {
        total: number;
        online: number;
        inStore: number;
      };
    };

    monthlyMetrics: {
      month: Month;
      averageOrderValue: number;
      conversionRate: number;
      expenses: number;
      netProfitMargin: number;
      orders: number;
      profit: number;
      revenue: number;

      repairs: {
        revenue: number;
        orders: number;
      };
    
      sales: {
        orders: {
          total: number;
          online: number;
          inStore: number;
        };
        revenue: {
          total: number;
          online: number;
          inStore: number;
        };
      };           

      dailyMetrics: {
        day: string;
        averageOrderValue: number;
        conversionRate: number;
        expenses: number;
        netProfitMargin: number;
        orders: number;
        profit: number;
        revenue: number;

        repairs: {
          orders: number;
          revenue: number;
        };
      
        sales: {
          orders: {
            inStore: number;
            online: number;
            total: number;
          };
          revenue: {
            inStore: number;
            online: number;
            total: number;
          };
        };                     
      }[];
    }[];
  }[];  

  productMetrics: {
    name: ProductCategory;

    yearlyMetrics: {
      year: string;
      orders: {
        total: number;
        online: number;
        inStore: number;
      };
      revenue: {
        total: number;
        online: number;
        inStore: number;
      };

      monthlyMetrics: {
        month: string;
        orders: {
          total: number;
          online: number;
          inStore: number;
        };
        revenue: {
          total: number;
          online: number;
          inStore: number;
        };

        dailyMetrics: {
          day: string;
          orders: {
            total: number;
            online: number;
            inStore: number;
          };
          revenue: {
            total: number;
            online: number;
            inStore: number;
          };
        }[];
      }[];
    }[];    
  }


  repairMetrics: {
    name: RepairCategory;
    yearlyMetrics: {
      year: string;
      revenue: number;
      orders: number;

      monthlyMetrics: {
        month: string;
        revenue: number;
        orders: number;

        dailyMetrics: {
          day: string;
          revenue: number;
          orders: number;
        }[];
      }[];
    }[];    
  }[]
};
*/

type ReturnRepairMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  repairCategories: RepairCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: LocationYearSpread;
};

function returnRepairMetrics({
  daysInMonthsInYears,
  repairCategories,
  storeLocation,
  yearTransactionsSpread,
}: ReturnRepairMetricsInput): RepairMetric[] {
  return repairCategories.map((repairCategory) => {
    const repairYearlyMetrics = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const repairMonthlyMetrics = Array.from(daysInMonthsMap).map(
          (monthTuple) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const repairDailyMetrics = daysRange.map((date) => {
              const [dailyUnitsRepaired, dailyRevenue] =
                returnTransactionsRevenueTuple({
                  category: 'repair',
                  categoryType: repairCategory,
                  storeLocation,
                  year,
                  yearTransactionsSpread,
                });

              const repairDailyMetric: RepairDailyMetric = {
                day: date,
                orders: dailyUnitsRepaired,
                revenue: dailyRevenue,
              };

              return repairDailyMetric;
            });

            const [repairMonthlyRevenue, repairMonthlyUnitsRepaired] =
              repairDailyMetrics.reduce(
                (monthlyRepairMetricsAcc, dailyRepairMetric) => {
                  monthlyRepairMetricsAcc[0] += dailyRepairMetric.revenue;
                  monthlyRepairMetricsAcc[1] += dailyRepairMetric.orders;

                  return monthlyRepairMetricsAcc;
                },
                [0, 0]
              );

            const monthlyRepairMetric: RepairMonthlyMetric = {
              month,
              revenue: repairMonthlyRevenue,
              orders: repairMonthlyUnitsRepaired,
              dailyMetrics: repairDailyMetrics,
            };

            return monthlyRepairMetric;
          }
        );

        const [repairYearlyRevenue, repairYearlyUnitsRepaired] =
          repairMonthlyMetrics.reduce(
            (yearlyRepairMetricsAcc, monthlyRepairMetric) => {
              yearlyRepairMetricsAcc[0] += monthlyRepairMetric.revenue;
              yearlyRepairMetricsAcc[1] += monthlyRepairMetric.orders;

              return yearlyRepairMetricsAcc;
            },
            [0, 0]
          );

        const yearlyRepairMetric: RepairYearlyMetric = {
          year: year.toString() as Year,
          revenue: repairYearlyRevenue,
          orders: repairYearlyUnitsRepaired,
          monthlyMetrics: repairMonthlyMetrics,
        };

        return yearlyRepairMetric;
      }
    );

    const repairCategoryObj: RepairMetric = {
      name: repairCategory,
      yearlyMetrics: repairYearlyMetrics,
    };

    return repairCategoryObj;
  });
}

type ReturnProductMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  productCategories: ProductCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: LocationYearSpread;
};

function returnProductMetrics({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearTransactionsSpread,
}: ReturnProductMetricsInput): ProductMetric[] {
  return productCategories.map((productCategory) => {
    const productYearlyMetrics = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const productMonthlyMetrics = Array.from(daysInMonthsMap).map(
          (monthTuple) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const productDailyMetrics = daysRange.map((date) => {
              const [productDailyUnitsSold, productDailySalesRevenue] =
                returnTransactionsRevenueTuple({
                  category: 'product',
                  categoryType: productCategory,
                  storeLocation,
                  year,
                  yearTransactionsSpread,
                });

              const productOnlineFraction = Math.random() * (0.8 - 0.5) + 0.5; // spread between 0.5 and 0.8

              const productDailyOnlineOrders = Math.round(
                productDailyUnitsSold * productOnlineFraction
              );
              const productDailyInStoreOrders =
                productDailyUnitsSold - productDailyOnlineOrders;

              const productDailyOnlineSalesRevenue =
                productOnlineFraction * productDailySalesRevenue;
              const productDailyInStoreSalesRevenue =
                productDailySalesRevenue - productDailyOnlineSalesRevenue;

              const productDailyMetric: ProductDailyMetric = {
                day: date,
                orders: {
                  inStore: productDailyInStoreOrders,
                  online: productDailyOnlineOrders,
                  total: productDailyUnitsSold,
                },
                revenue: {
                  inStore: productDailyInStoreSalesRevenue,
                  online: productDailyOnlineSalesRevenue,
                  total: productDailySalesRevenue,
                },
              };

              return productDailyMetric;
            });

            const [
              productMonthlySalesRevenue,
              productMonthlyOnlineSalesRevenue,
              productMonthlyInStoreSalesRevenue,
              productMonthlyOrders,
              productMonthlyOnlineOrders,
              productMonthlyInStoreOrders,
            ] = productDailyMetrics.reduce(
              (monthlyRepairMetricsAcc, dailyRepairMetric) => {
                monthlyRepairMetricsAcc[0] += dailyRepairMetric.revenue.total;
                monthlyRepairMetricsAcc[1] += dailyRepairMetric.revenue.online;
                monthlyRepairMetricsAcc[2] += dailyRepairMetric.revenue.inStore;
                monthlyRepairMetricsAcc[3] += dailyRepairMetric.orders.total;
                monthlyRepairMetricsAcc[4] += dailyRepairMetric.orders.online;
                monthlyRepairMetricsAcc[5] += dailyRepairMetric.orders.inStore;

                return monthlyRepairMetricsAcc;
              },
              [0, 0, 0, 0, 0, 0]
            );

            const productMonthlyMetric: ProductMonthlyMetric = {
              month,
              orders: {
                inStore: productMonthlyInStoreOrders,
                online: productMonthlyOnlineOrders,
                total: productMonthlyOrders,
              },
              revenue: {
                inStore: productMonthlyInStoreSalesRevenue,
                online: productMonthlyOnlineSalesRevenue,
                total: productMonthlySalesRevenue,
              },
              dailyMetrics: productDailyMetrics,
            };

            return productMonthlyMetric;
          }
        );

        const [
          productYearlySalesRevenue,
          productYearlyOnlineSalesRevenue,
          productYearlyInStoreSalesRevenue,
          productYearlyOrders,
          productYearlyOnlineOrders,
          productYearlyInStoreOrders,
        ] = productMonthlyMetrics.reduce(
          (yearlyProductMetricsAcc, monthlyRepairMetric) => {
            yearlyProductMetricsAcc[0] += monthlyRepairMetric.revenue.total;
            yearlyProductMetricsAcc[1] += monthlyRepairMetric.revenue.online;
            yearlyProductMetricsAcc[2] += monthlyRepairMetric.revenue.inStore;
            yearlyProductMetricsAcc[3] += monthlyRepairMetric.orders.total;
            yearlyProductMetricsAcc[4] += monthlyRepairMetric.orders.online;
            yearlyProductMetricsAcc[5] += monthlyRepairMetric.orders.inStore;

            return yearlyProductMetricsAcc;
          },
          [0, 0, 0, 0, 0, 0]
        );

        const productYearlyMetric: ProductYearlyMetric = {
          year: year.toString() as Year,
          orders: {
            inStore: productYearlyInStoreOrders,
            online: productYearlyOnlineOrders,
            total: productYearlyOrders,
          },
          revenue: {
            inStore: productYearlyInStoreSalesRevenue,
            online: productYearlyOnlineSalesRevenue,
            total: productYearlySalesRevenue,
          },
          monthlyMetrics: productMonthlyMetrics,
        };

        return productYearlyMetric;
      }
    );

    const productMetric: ProductMetric = {
      name: productCategory,
      yearlyMetrics: productYearlyMetrics,
    };

    return productMetric;
  });
}

type ReturnAggregatedProductIntoFinancialMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  financialMetricsTemplate: FinancialMetric;
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  productMetrics: ProductMetric[];
};

function returnAggregatedProductIntoFinancialMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  financialMetricsTemplate,
  monthlyFinancialMetricsTemplate,
  productMetrics,
}: ReturnAggregatedProductIntoFinancialMetricsInput): FinancialMetric[] {
  return productMetrics.reduce(
    (aggregatedYearlyMetricsAcc, productCategory) => {
      const { yearlyMetrics } = productCategory;

      const newYearlyFinancialMetrics = yearlyMetrics.map(
        (productYearlyMetric, productYearlyMetricIdx) => {
          const { monthlyMetrics } = productYearlyMetric;

          const newMonthlyFinancialMetrics = monthlyMetrics.map(
            (productMonthlyMetric, productMonthlyMetricIdx) => {
              const { dailyMetrics } = productMonthlyMetric;

              const newDailyFinancialMetrics = dailyMetrics.map(
                (productDailyMetric, productDailyMetricIdx) => {
                  const { day, orders, revenue } = productDailyMetric;

                  const existingDailyFinancialMetric =
                    aggregatedYearlyMetricsAcc[productYearlyMetricIdx]
                      ?.monthlyMetrics[productMonthlyMetricIdx]?.dailyMetrics[
                      productDailyMetricIdx
                    ] ?? {
                      ...dailyFinancialMetricsTemplate,
                      day,
                    };

                  const newDailyFinancialMetric: DailyFinancialMetric = {
                    ...existingDailyFinancialMetric,
                    orders: existingDailyFinancialMetric.orders + orders.total,
                    revenue:
                      existingDailyFinancialMetric.revenue + revenue.total,
                    sales: {
                      orders: {
                        total:
                          existingDailyFinancialMetric.sales.orders.total +
                          orders.total,
                        online:
                          existingDailyFinancialMetric.sales.orders.online +
                          orders.online,
                        inStore:
                          existingDailyFinancialMetric.sales.orders.inStore +
                          orders.inStore,
                      },
                      revenue: {
                        total:
                          existingDailyFinancialMetric.sales.revenue.total +
                          revenue.total,
                        online:
                          existingDailyFinancialMetric.sales.revenue.online +
                          revenue.online,
                        inStore:
                          existingDailyFinancialMetric.sales.revenue.inStore +
                          revenue.total,
                      },
                    },
                  };

                  return newDailyFinancialMetric;
                }
              );

              const { month, orders, revenue } = productMonthlyMetric;

              const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
                productYearlyMetricIdx
              ]?.monthlyMetrics[productMonthlyMetricIdx] ?? {
                ...monthlyFinancialMetricsTemplate,
                month,
              };

              // aggregate monthly metrics
              // revenue
              existingMonthlyFinancialMetric.revenue += revenue.total;
              // revenue -> sales
              existingMonthlyFinancialMetric.sales.revenue.total +=
                revenue.total;
              existingMonthlyFinancialMetric.sales.revenue.online +=
                revenue.online;
              existingMonthlyFinancialMetric.sales.revenue.inStore +=
                revenue.inStore;
              // orders
              existingMonthlyFinancialMetric.orders += orders.total;
              // orders -> sales
              existingMonthlyFinancialMetric.sales.orders.total += orders.total;
              existingMonthlyFinancialMetric.sales.orders.online +=
                orders.online;
              existingMonthlyFinancialMetric.sales.orders.inStore +=
                orders.inStore;

              existingMonthlyFinancialMetric.dailyMetrics =
                newDailyFinancialMetrics;

              return existingMonthlyFinancialMetric;
            }
          );

          const { orders, revenue, year } = productYearlyMetric;

          const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
            productYearlyMetricIdx
          ] ?? {
            ...financialMetricsTemplate,
            year,
            monthlyMetrics: Array.from({
              length: newMonthlyFinancialMetrics.length,
            }),
          };

          // aggregate yearly metrics
          // revenue
          existingYearlyFinancialMetric.revenue += revenue.total;
          // revenue -> sales
          existingYearlyFinancialMetric.sales.revenue.total += revenue.total;
          existingYearlyFinancialMetric.sales.revenue.online += revenue.online;
          existingYearlyFinancialMetric.sales.revenue.inStore +=
            revenue.inStore;
          // orders
          existingYearlyFinancialMetric.orders += orders.total;
          // orders -> sales
          existingYearlyFinancialMetric.sales.orders.total += orders.total;
          existingYearlyFinancialMetric.sales.orders.online += orders.online;
          existingYearlyFinancialMetric.sales.orders.inStore += orders.inStore;

          existingYearlyFinancialMetric.monthlyMetrics =
            newMonthlyFinancialMetrics;

          return existingYearlyFinancialMetric;
        }
      );

      aggregatedYearlyMetricsAcc = newYearlyFinancialMetrics;

      return aggregatedYearlyMetricsAcc;
    },
    financialMetrics
  );
}

type ReturnAggregatedRepairIntoFinancialMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  repairMetrics: RepairMetric[];
  financialMetricsTemplate: FinancialMetric;
};

function returnAggregatedRepairIntoFinancialMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  monthlyFinancialMetricsTemplate,
  repairMetrics,
  financialMetricsTemplate,
}: ReturnAggregatedRepairIntoFinancialMetricsInput): FinancialMetric[] {
  return repairMetrics.reduce((aggregatedYearlyMetricsAcc, repairMetric) => {
    const { yearlyMetrics } = repairMetric;

    const newYearlyFinancialMetrics = yearlyMetrics.map(
      (repairYearlyMetric, repairYearlyMetricIdx) => {
        const { monthlyMetrics, year } = repairYearlyMetric;

        const newMonthlyFinancialMetrics = monthlyMetrics.map(
          (repairMonthlyMetric, repairMonthlyMetricIdx) => {
            const { dailyMetrics } = repairMonthlyMetric;

            const newDailyFinancialMetrics = dailyMetrics.map(
              (repairDailyMetric, repairDailyMetricIdx) => {
                const { day, orders, revenue } = repairDailyMetric;

                const existingDailyFinancialMetric = aggregatedYearlyMetricsAcc[
                  repairYearlyMetricIdx
                ]?.monthlyMetrics[repairMonthlyMetricIdx]?.dailyMetrics[
                  repairDailyMetricIdx
                ] ?? {
                  ...dailyFinancialMetricsTemplate,
                  day,
                };

                const newDailyFinancialMetric: DailyFinancialMetric = {
                  ...existingDailyFinancialMetric,
                  revenue: existingDailyFinancialMetric.revenue + revenue,
                  repairs: {
                    revenue:
                      existingDailyFinancialMetric.repairs.revenue + revenue,
                    orders:
                      existingDailyFinancialMetric.repairs.orders + orders,
                  },
                  orders: existingDailyFinancialMetric.orders + orders,
                };

                return newDailyFinancialMetric;
              }
            );

            const { month, orders, revenue } = repairMonthlyMetric;

            const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
              repairYearlyMetricIdx
            ]?.monthlyMetrics[repairMonthlyMetricIdx] ?? {
              ...monthlyFinancialMetricsTemplate,
              month,
            };

            // aggregate monthly metrics
            // revenue
            existingMonthlyFinancialMetric.revenue += revenue;
            // revenue -> repairs
            existingMonthlyFinancialMetric.repairs.revenue += revenue;
            // orders
            existingMonthlyFinancialMetric.orders += orders;
            // orders -> repairs
            existingMonthlyFinancialMetric.repairs.orders += orders;

            existingMonthlyFinancialMetric.dailyMetrics =
              newDailyFinancialMetrics;

            return existingMonthlyFinancialMetric;
          }
        );

        const { orders, revenue } = repairYearlyMetric;

        const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
          repairYearlyMetricIdx
        ] ?? {
          ...financialMetricsTemplate,
          year,
        };

        // aggregate yearly metrics
        existingYearlyFinancialMetric.revenue += revenue;
        // revenue -> repairs
        existingYearlyFinancialMetric.repairs.revenue += revenue;
        // orders
        existingYearlyFinancialMetric.orders += orders;
        // orders -> repairs
        existingYearlyFinancialMetric.repairs.orders += orders;

        existingYearlyFinancialMetric.monthlyMetrics =
          newMonthlyFinancialMetrics;

        return existingYearlyFinancialMetric;
      }
    );

    aggregatedYearlyMetricsAcc = newYearlyFinancialMetrics;

    return aggregatedYearlyMetricsAcc;
  }, financialMetrics);
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

function returnFinancialMetrics({
  financialMetrics,
  storeLocation,
  yearConversionRateSpread,
  yearProfitMarginSpread,
}: ReturnFinancialMetricsInput): FinancialMetric[] {
  return financialMetrics.map((financialMetric) => {
    const { monthlyMetrics, year } = financialMetric;

    const newMonthlyFinancialMetrics = monthlyMetrics.map(
      (monthlyFinancialMetric) => {
        const { dailyMetrics } = monthlyFinancialMetric;

        const newDailyFinancialMetrics = dailyMetrics.map(
          (dailyFinancialMetric) => {
            const { revenue, orders } = dailyFinancialMetric;

            const dailyAverageOrderValue = revenue / orders;
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
            const dailyProfit = revenue * dailyNetProfitMargin;
            const dailyExpenses = revenue - dailyProfit;

            const newDailyFinancialMetric: DailyFinancialMetric = {
              ...dailyFinancialMetric,
              averageOrderValue: dailyAverageOrderValue,
              conversionRate: dailyConversionRate,
              expenses: dailyExpenses,
              netProfitMargin: dailyNetProfitMargin,
              profit: dailyProfit,
            };

            return newDailyFinancialMetric;
          }
        );

        const dailyAverageOrderValues = newDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.averageOrderValue
        );
        const monthlyAverageOrderValue =
          dailyAverageOrderValues.reduce(
            (acc, dailyAverageOrderValue) => acc + dailyAverageOrderValue,
            0
          ) / dailyAverageOrderValues.length;

        const dailyConversionRates = newDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.conversionRate
        );
        const monthlyConversionRate =
          dailyConversionRates.reduce(
            (acc, dailyConversionRate) => acc + dailyConversionRate,
            0
          ) / dailyConversionRates.length;

        const [monthlyExpenses, monthlyProfit] =
          newDailyFinancialMetrics.reduce(
            (monthlyFinancialMetricsAcc, dailyMetric) => {
              monthlyFinancialMetricsAcc[0] += dailyMetric.expenses;
              monthlyFinancialMetricsAcc[1] += dailyMetric.profit;

              return monthlyFinancialMetricsAcc;
            },
            [0, 0]
          );
        const monthlyNetProfitMargin = monthlyProfit / monthlyExpenses;

        const newMonthlyFinancialMetric: MonthlyFinancialMetric = {
          ...monthlyFinancialMetric,
          averageOrderValue: monthlyAverageOrderValue,
          conversionRate: monthlyConversionRate,
          expenses: monthlyExpenses,
          profit: monthlyProfit,
          netProfitMargin: monthlyNetProfitMargin,
          dailyMetrics: newDailyFinancialMetrics,
        };

        return newMonthlyFinancialMetric;
      }
    );

    const monthlyAverageOrderValues = newMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => monthlyFinancialMetric.averageOrderValue
    );
    const yearlyAverageOrderValue =
      monthlyAverageOrderValues.reduce(
        (acc, monthlyAverageOrderValue) => acc + monthlyAverageOrderValue,
        0
      ) / monthlyAverageOrderValues.length;

    const monthlyConversionRates = newMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => monthlyFinancialMetric.conversionRate
    );
    const yearlyConversionRate =
      monthlyConversionRates.reduce(
        (acc, monthlyConversionRate) => acc + monthlyConversionRate,
        0
      ) / monthlyConversionRates.length;

    const [yearlyExpenses, yearlyProfit] = newMonthlyFinancialMetrics.reduce(
      (yearlyFinancialMetricsAcc, monthlyFinancialMetric) => {
        yearlyFinancialMetricsAcc[0] += monthlyFinancialMetric.expenses;
        yearlyFinancialMetricsAcc[1] += monthlyFinancialMetric.profit;

        return yearlyFinancialMetricsAcc;
      },
      [0, 0]
    );
    const yearlyNetProfitMargin = yearlyProfit / yearlyExpenses;

    const newFinancialMetric: FinancialMetric = {
      ...financialMetric,
      averageOrderValue: yearlyAverageOrderValue,
      conversionRate: yearlyConversionRate,
      expenses: yearlyExpenses,
      profit: yearlyProfit,
      netProfitMargin: yearlyNetProfitMargin,
      monthlyMetrics: newMonthlyFinancialMetrics,
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
              day: date,
              customers: {
                total: dailyCustomersTotal,
                new: {
                  repair: dailyNewRepairCustomers,
                  sales: {
                    total: dailyNewSalesCustomers,
                    inStore: dailyNewSalesInStoreCustomers,
                    online: dailyNewSalesOnlineCustomers,
                  },
                  total: dailyNewCustomers,
                },
                returning: {
                  repair: dailyReturningRepairCustomers,
                  sales: {
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
            month,
            customers: {
              new: {
                repair: 0,
                sales: {
                  inStore: 0,
                  online: 0,
                  total: 0,
                },
                total: 0,
              },
              returning: {
                repair: 0,
                sales: {
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
        year,
        customers: {
          total: 0,
          new: {
            repair: 0,
            sales: {
              inStore: 0,
              online: 0,
              total: 0,
            },
            total: 0,
          },
          returning: {
            repair: 0,
            sales: {
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

function returnAllLocationsAggregatedCustomerMetrics(
  storeLocationsBusinessMetrics: BusinessMetric[]
) {
  // find edmonton store
  const edmontonStore = storeLocationsBusinessMetrics.find(
    (storeLocationBusinessMetrics) =>
      storeLocationBusinessMetrics.storeLocation === 'Edmonton'
  );
  // clone edmonton store customer metrics
  const clonedEdmontonCustomerMetrics = structuredClone(
    edmontonStore?.customerMetrics
  ) as CustomerMetrics; // Edmonton store is guaranteed to exist and all customer fields overlap with other stores

  const allLocationsCustomerMetrics = storeLocationsBusinessMetrics.reduce(
    (allLocationsCustomerMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === 'Edmonton') {
        return allLocationsCustomerMetricsAcc;
      }

      const { customerMetrics } = storeLocationBusinessMetrics;
      const { totalCustomers, yearlyMetrics: yearlyCustomerMetrics } =
        customerMetrics;

      /**
         * yearlyMetrics: {
            year: Year;
            customers: {
              total: number;
              new: {
                total: number;
                sales: {
                  total: number;
                  online: number;
                  inStore: number;
                };
                repair: number;
              };
              returning: {
                total: number;
                sales: {
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
              month: Month;
              customers: {
                total: number;
                new: {
                  total: number;
                  sales: {
                    total: number;
                    online: number;
                    inStore: number;
                  };
                  repair: number;
                };
                returning: {
                  total: number;
                  sales: {
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
              day: string;
              customers: {
                total: number;
                new: {
                  total: number;
                  sales: {
                    total: number;
                    online: number;
                    inStore: number;
                  };
                  repair: number;
                };
                returning: {
                  total: number;
                  sales: {
                    total: number;
                    online: number;
                    inStore: number;
                  };
                  repair: number;
                };
              };
            }
          }          
         */

      yearlyCustomerMetrics.forEach(
        (yearlyCustomerMetric, yearlyCustomerMetricIdx) => {
          const {
            customers: yearlyCustomers,
            monthlyMetrics: monthlyCustomerMetrics,
            year,
          } = yearlyCustomerMetric;

          // find existing yearly customer metric
          const existingYearlyCustomerMetric =
            clonedEdmontonCustomerMetrics?.yearlyMetrics.find(
              (existingYearlyCustomerMetric) =>
                existingYearlyCustomerMetric.year === year
            ) as CustomerYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

          // update it with the new store's yearly customer metric
          existingYearlyCustomerMetric.customers.total += yearlyCustomers.total;
          // new
          existingYearlyCustomerMetric.customers.new.total +=
            yearlyCustomers.new.total;
          // new -> sales
          existingYearlyCustomerMetric.customers.new.sales.total +=
            yearlyCustomers.new.sales.total;
          // new -> sales -> online
          existingYearlyCustomerMetric.customers.new.sales.online +=
            yearlyCustomers.new.sales.online;
          // new -> sales -> in store
          existingYearlyCustomerMetric.customers.new.sales.inStore +=
            yearlyCustomers.new.sales.inStore;
          // new -> repair
          existingYearlyCustomerMetric.customers.new.repair +=
            yearlyCustomers.new.repair;

          // returning
          existingYearlyCustomerMetric.customers.returning.total +=
            yearlyCustomers.returning.total;
          // returning -> sales
          existingYearlyCustomerMetric.customers.returning.sales.total +=
            yearlyCustomers.returning.sales.total;
          // returning -> sales -> online
          existingYearlyCustomerMetric.customers.returning.sales.online +=
            yearlyCustomers.returning.sales.online;
          // returning -> sales -> in store
          existingYearlyCustomerMetric.customers.returning.sales.inStore +=
            yearlyCustomers.returning.sales.inStore;
          // returning -> repair
          existingYearlyCustomerMetric.customers.returning.repair +=
            yearlyCustomers.returning.repair;

          // average the churn rates
          const existingYearlyCustomerChurnRate =
            existingYearlyCustomerMetric.customers.churnRate;
          const averageYearlyChurnRate =
            (yearlyCustomers.churnRate + existingYearlyCustomerChurnRate) / 2;
          existingYearlyCustomerMetric.customers.churnRate =
            averageYearlyChurnRate;

          // average the retention rates
          const existingYearlyCustomerRetentionRate =
            existingYearlyCustomerMetric.customers.retentionRate;
          const averageYearlyRetentionRate =
            yearlyCustomers.retentionRate / 2 +
            existingYearlyCustomerRetentionRate / 2;
          existingYearlyCustomerMetric.customers.retentionRate =
            averageYearlyRetentionRate;

          // update monthly metrics
          monthlyCustomerMetrics.forEach(
            (monthlyCustomerMetric, monthlyCustomerMetricIdx) => {
              const {
                customers: monthlyCustomers,
                dailyMetrics: dailyCustomerMetrics,
                month,
              } = monthlyCustomerMetric;

              // find existing monthly customer metric
              const existingMonthlyCustomerMetric =
                existingYearlyCustomerMetric.monthlyMetrics.find(
                  (existingMonthlyCustomerMetric) =>
                    existingMonthlyCustomerMetric.month === month
                ) as CustomerMonthlyMetric; // month is guaranteed to exist (all stores start on Jan)

              // update it with the new store's monthly customer metric
              existingMonthlyCustomerMetric.customers.total +=
                monthlyCustomers.total;
              // new
              existingMonthlyCustomerMetric.customers.new.total +=
                monthlyCustomers.new.total;
              // new -> sales
              existingMonthlyCustomerMetric.customers.new.sales.total +=
                monthlyCustomers.new.sales.total;
              // new -> sales -> online
              existingMonthlyCustomerMetric.customers.new.sales.online +=
                monthlyCustomers.new.sales.online;
              // new -> sales -> in store
              existingMonthlyCustomerMetric.customers.new.sales.inStore +=
                monthlyCustomers.new.sales.inStore;
              // new -> repair
              existingMonthlyCustomerMetric.customers.new.repair +=
                monthlyCustomers.new.repair;

              // returning
              existingMonthlyCustomerMetric.customers.returning.total +=
                monthlyCustomers.returning.total;
              // returning -> sales
              existingMonthlyCustomerMetric.customers.returning.sales.total +=
                monthlyCustomers.returning.sales.total;
              // returning -> sales -> online
              existingMonthlyCustomerMetric.customers.returning.sales.online +=
                monthlyCustomers.returning.sales.online;
              // returning -> sales -> in store
              existingMonthlyCustomerMetric.customers.returning.sales.inStore +=
                monthlyCustomers.returning.sales.inStore;
              // returning -> repair
              existingMonthlyCustomerMetric.customers.returning.repair +=
                monthlyCustomers.returning.repair;

              // average the churn rates
              const existingMonthlyCustomerChurnRate =
                existingMonthlyCustomerMetric.customers.churnRate;
              const averageMonthlyChurnRate =
                (monthlyCustomers.churnRate +
                  existingMonthlyCustomerChurnRate) /
                2;
              existingMonthlyCustomerMetric.customers.churnRate =
                averageMonthlyChurnRate;

              // average the retention rates
              const existingMonthlyCustomerRetentionRate =
                existingMonthlyCustomerMetric.customers.retentionRate;
              const averageMonthlyRetentionRate =
                (monthlyCustomers.retentionRate +
                  existingMonthlyCustomerRetentionRate) /
                2;
              existingMonthlyCustomerMetric.customers.retentionRate =
                averageMonthlyRetentionRate;

              // update daily metrics
              dailyCustomerMetrics.forEach((dailyCustomerMetric) => {
                const { customers } = dailyCustomerMetric;

                // find existing daily customer metric
                const existingDailyCustomerMetric =
                  existingMonthlyCustomerMetric.dailyMetrics.find(
                    (existingDailyCustomerMetric) =>
                      existingDailyCustomerMetric.day ===
                      dailyCustomerMetric.day
                  ) as CustomerDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

                // update it with the new store's daily customer metric
                existingDailyCustomerMetric.customers.total += customers.total;
                // new
                existingDailyCustomerMetric.customers.new.total +=
                  customers.new.total;
                // new -> sales
                existingDailyCustomerMetric.customers.new.sales.total +=
                  customers.new.sales.total;
                // new -> sales -> online
                existingDailyCustomerMetric.customers.new.sales.online +=
                  customers.new.sales.online;
                // new -> sales -> in store
                existingDailyCustomerMetric.customers.new.sales.inStore +=
                  customers.new.sales.inStore;
                // new -> repair
                existingDailyCustomerMetric.customers.new.repair +=
                  customers.new.repair;

                // returning
                existingDailyCustomerMetric.customers.returning.total +=
                  customers.returning.total;
                // returning -> sales
                existingDailyCustomerMetric.customers.returning.sales.total +=
                  customers.returning.sales.total;
                // returning -> sales -> online
                existingDailyCustomerMetric.customers.returning.sales.online +=
                  customers.returning.sales.online;
                // returning -> sales -> in store
                existingDailyCustomerMetric.customers.returning.sales.inStore +=
                  customers.returning.sales.inStore;
                // returning -> repair
                existingDailyCustomerMetric.customers.returning.repair +=
                  customers.returning.repair;
              });
            }
          );
        }
      );

      // update total customers
      clonedEdmontonCustomerMetrics.totalCustomers += totalCustomers;

      // update lifetime value
      // find average of all store's lifetime values
      const lifetimeValues = storeLocationsBusinessMetrics.map(
        (storeLocationBusinessMetrics) =>
          storeLocationBusinessMetrics.customerMetrics.lifetimeValue
      );
      const averageLifetimeValue =
        lifetimeValues.reduce((acc, lifetimeValue) => acc + lifetimeValue, 0) /
        lifetimeValues.length;
      clonedEdmontonCustomerMetrics.lifetimeValue = averageLifetimeValue;

      return allLocationsCustomerMetricsAcc;
    },
    clonedEdmontonCustomerMetrics
  );

  return allLocationsCustomerMetrics;
}

function returnAllLocationsAggregatedRepairMetrics(
  storeLocationBusinessMetrics: BusinessMetric[]
) {
  // find edmonton store
  const edmontonStore = storeLocationBusinessMetrics.find(
    (storeLocationBusinessMetrics) =>
      storeLocationBusinessMetrics.storeLocation === 'Edmonton'
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store repair metrics
  const clonedEdmontonRepairMetrics = structuredClone(
    edmontonStore.repairMetrics
  ) as RepairMetric[]; // all edmonton store repair fields overlap with other stores

  const allLocationsRepairMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsRepairMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === 'Edmonton') {
        return allLocationsRepairMetricsAcc;
      }

      const { repairMetrics } = storeLocationBusinessMetrics;

      /**
       * repairMetrics: {
         name: RepairCategory;
         yearlyMetrics: {
           year: string;
           revenue: number;
           orders: number;
         
           monthlyMetrics: {
             month: string;
             revenue: number;
             orders: number;
           
             dailyMetrics: {
               day: string;
               revenue: number;
               orders: number;
             }[];
           }[];
         }[];    
       }[]
       */

      repairMetrics.forEach((repairMetric) => {
        const { name, yearlyMetrics } = repairMetric;

        // find existing repair metric
        const existingRepairCategoryMetric = clonedEdmontonRepairMetrics.find(
          (existingRepairMetric) => existingRepairMetric.name === name
        ) as RepairMetric; // repair category is guaranteed to exist (edmonton store overlaps all repair categories of other stores)

        yearlyMetrics.forEach((yearlyRepairMetric) => {
          const {
            monthlyMetrics: monthlyRepairMetrics,
            orders,
            revenue,
            year,
          } = yearlyRepairMetric;

          // find existing yearly repair metric
          const existingYearlyRepairMetric =
            existingRepairCategoryMetric.yearlyMetrics.find(
              (existingYearlyRepairMetric) =>
                existingYearlyRepairMetric.year === year
            ) as RepairYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

          // update existing yearly repair metric
          existingYearlyRepairMetric.orders += orders;
          existingYearlyRepairMetric.revenue += revenue;

          // update monthly repair metrics
          monthlyRepairMetrics.forEach((monthlyRepairMetric) => {
            const {
              dailyMetrics: dailyRepairMetrics,
              month,
              orders,
              revenue,
            } = monthlyRepairMetric;

            // find existing monthly repair metric
            const existingMonthlyRepairMetric =
              existingYearlyRepairMetric.monthlyMetrics.find(
                (existingMonthlyRepairMetric) =>
                  existingMonthlyRepairMetric.month === month
              ) as RepairMonthlyMetric; // month is guaranteed to exist (all stores start on Jan)

            // update existing monthly repair metric
            existingMonthlyRepairMetric.orders += orders;
            existingMonthlyRepairMetric.revenue += revenue;

            // update daily repair metrics
            dailyRepairMetrics.forEach((dailyRepairMetric) => {
              const { day, orders, revenue } = dailyRepairMetric;

              // find existing daily repair metric
              const existingDailyRepairMetric =
                existingMonthlyRepairMetric.dailyMetrics.find(
                  (existingDailyRepairMetric) =>
                    existingDailyRepairMetric.day === day
                ) as RepairDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

              // update existing daily repair metric
              existingDailyRepairMetric.orders += orders;
              existingDailyRepairMetric.revenue += revenue;
            });
          });
        });
      });

      return allLocationsRepairMetricsAcc;
    },
    clonedEdmontonRepairMetrics
  );

  return allLocationsRepairMetrics;
}

function returnAllLocationsAggregatedFinancialMetrics(
  storeLocationBusinessMetrics: BusinessMetric[]
) {
  // find edmonton store
  const edmontonStore = storeLocationBusinessMetrics.find(
    (storeLocationBusinessMetrics) =>
      storeLocationBusinessMetrics.storeLocation === 'Edmonton'
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store financial metrics
  const clonedEdmontonFinancialMetrics = structuredClone(
    edmontonStore.financialMetrics
  ) as FinancialMetric[]; // all edmonton store financial fields overlap with other stores

  const allLocationsFinancialMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsFinancialMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === 'Edmonton') {
        return allLocationsFinancialMetricsAcc;
      }

      const { financialMetrics } = storeLocationBusinessMetrics;

      /**
       * financialMetrics: {
         year: Year;
         averageOrderValue: number;
         conversionRate: number;
         expenses: number;
         profit: number;
         netProfitMargin: number;
         orders: number;
         revenue: number;
       
         repairs: {
           orders: number;
           revenue: number;
         };
       
         sales: {
           orders: {
             total: number;
             online: number;
             inStore: number;
           };
           revenue: {
             total: number;
             online: number;
             inStore: number;
           };
         };
       
         monthlyMetrics: {
           month: Month;
           averageOrderValue: number;
           conversionRate: number;
           expenses: number;
           profit: number;
           netProfitMargin: number;
           orders: number;
           revenue: number;
       
           repairs: {
             orders: number;
             revenue: number;
           };
       
           sales: {
             orders: {
               total: number;
               online: number;
               inStore: number;
             };
             revenue: {
               total: number;
               online: number;
               inStore: number;
             };
           };
       
           dailyMetrics: {
             day: string;
             averageOrderValue: number;
             conversionRate: number;
             expenses: number;
             profit: number;
             netProfitMargin: number;
             orders: number;
             revenue: number;
       
             repairs: {
               orders: number;
               revenue: number;
             };
       
             sales: {
               orders: {
                 total: number;
                 online: number;
                 inStore: number;
               };
               revenue: {
                 total: number;
                 online: number;
                 inStore: number;
               };
             };
           }[];
         }[];
       }[]
       */

      financialMetrics.forEach((financialMetric) => {
        const { monthlyMetrics: monthlyFinancialMetrics, year } =
          financialMetric;

        // find existing financial metric
        const existingFinancialMetric = clonedEdmontonFinancialMetrics.find(
          (existingFinancialMetric) => existingFinancialMetric.year === year
        ) as FinancialMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

        // aggregate existing financial metric
        existingFinancialMetric.expenses += financialMetric.expenses;
        existingFinancialMetric.profit += financialMetric.profit;
        existingFinancialMetric.orders += financialMetric.orders;
        existingFinancialMetric.revenue += financialMetric.revenue;

        // aggregate repairs
        existingFinancialMetric.repairs.orders +=
          financialMetric.repairs.orders;
        existingFinancialMetric.repairs.revenue +=
          financialMetric.repairs.revenue;

        // aggregate sales
        // sales -> orders
        existingFinancialMetric.sales.orders.total +=
          financialMetric.sales.orders.total;
        existingFinancialMetric.sales.orders.online +=
          financialMetric.sales.orders.online;
        existingFinancialMetric.sales.orders.inStore +=
          financialMetric.sales.orders.inStore;
        // sales -> revenue
        existingFinancialMetric.sales.revenue.total +=
          financialMetric.sales.revenue.total;
        existingFinancialMetric.sales.revenue.online +=
          financialMetric.sales.revenue.online;
        existingFinancialMetric.sales.revenue.inStore +=
          financialMetric.sales.revenue.inStore;

        // average the average order values
        const averageOrderValues = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.averageOrderValue
        );
        const averageAverageOrderValue =
          averageOrderValues.reduce(
            (acc, averageOrderValue) => acc + averageOrderValue,
            0
          ) / averageOrderValues.length;
        existingFinancialMetric.averageOrderValue =
          (existingFinancialMetric.averageOrderValue +
            averageAverageOrderValue) /
          2;

        // average the conversion rates
        const conversionRates = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.conversionRate
        );
        const averageConversionRate =
          conversionRates.reduce(
            (acc, conversionRate) => acc + conversionRate,
            0
          ) / conversionRates.length;
        existingFinancialMetric.conversionRate =
          (existingFinancialMetric.conversionRate + averageConversionRate) / 2;

        // average the net profit margins
        const netProfitMargins = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.netProfitMargin
        );
        const averageNetProfitMargin =
          netProfitMargins.reduce(
            (acc, netProfitMargin) => acc + netProfitMargin,
            0
          ) / netProfitMargins.length;
        existingFinancialMetric.netProfitMargin =
          (existingFinancialMetric.netProfitMargin + averageNetProfitMargin) /
          2;

        // aggregate monthly financial metrics
        monthlyFinancialMetrics.forEach((monthlyFinancialMetric) => {
          const {
            dailyMetrics: dailyFinancialMetrics,
            month,
            expenses,
            profit,
            orders,
            revenue,
            repairs,
            sales,
          } = monthlyFinancialMetric;

          // find existing monthly financial metric
          const existingMonthlyFinancialMetric =
            existingFinancialMetric.monthlyMetrics.find(
              (existingMonthlyFinancialMetric) =>
                existingMonthlyFinancialMetric.month === month
            ) as MonthlyFinancialMetric; // month is guaranteed to exist (all stores start on Jan)

          // aggregate existing monthly financial metric
          existingMonthlyFinancialMetric.expenses += expenses;
          existingMonthlyFinancialMetric.profit += profit;
          existingMonthlyFinancialMetric.orders += orders;
          existingMonthlyFinancialMetric.revenue += revenue;

          // aggregate repairs
          existingMonthlyFinancialMetric.repairs.orders += repairs.orders;
          existingMonthlyFinancialMetric.repairs.revenue += repairs.revenue;

          // aggregate sales
          // sales -> orders
          existingMonthlyFinancialMetric.sales.orders.total +=
            sales.orders.total;
          existingMonthlyFinancialMetric.sales.orders.online +=
            sales.orders.online;
          existingMonthlyFinancialMetric.sales.orders.inStore +=
            sales.orders.inStore;
          // sales -> revenue
          existingMonthlyFinancialMetric.sales.revenue.total +=
            sales.revenue.total;
          existingMonthlyFinancialMetric.sales.revenue.online +=
            sales.revenue.online;
          existingMonthlyFinancialMetric.sales.revenue.inStore +=
            sales.revenue.inStore;

          // average the average order values
          const averageOrderValues = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.averageOrderValue
          );
          const averageMonthlyAverageOrderValue =
            averageOrderValues.reduce(
              (acc, averageOrderValue) => acc + averageOrderValue,
              0
            ) / averageOrderValues.length;
          existingMonthlyFinancialMetric.averageOrderValue =
            (existingMonthlyFinancialMetric.averageOrderValue +
              averageMonthlyAverageOrderValue) /
            2;

          // average the conversion rates
          const conversionRates = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.conversionRate
          );
          const averageMonthlyConversionRate =
            conversionRates.reduce(
              (acc, conversionRate) => acc + conversionRate,
              0
            ) / conversionRates.length;
          existingMonthlyFinancialMetric.conversionRate =
            (existingMonthlyFinancialMetric.conversionRate +
              averageMonthlyConversionRate) /
            2;

          // average the net profit margins
          const averageNetProfitMargins = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.netProfitMargin
          );
          const averageMonthlyNetProfitMargin =
            averageNetProfitMargins.reduce(
              (acc, netProfitMargin) => acc + netProfitMargin,
              0
            ) / averageNetProfitMargins.length;
          existingMonthlyFinancialMetric.netProfitMargin =
            (existingMonthlyFinancialMetric.netProfitMargin +
              averageMonthlyNetProfitMargin) /
            2;

          // aggregate daily financial metrics
          dailyFinancialMetrics.forEach((dailyFinancialMetric) => {
            const { day, expenses, profit, orders, revenue, repairs, sales } =
              dailyFinancialMetric;

            // find existing daily financial metric
            const existingDailyFinancialMetric =
              existingMonthlyFinancialMetric.dailyMetrics.find(
                (existingDailyFinancialMetric) =>
                  existingDailyFinancialMetric.day === day
              ) as DailyFinancialMetric; // day is guaranteed to exist (all stores start on Jan. 01)

            // aggregate existing daily financial metric
            existingDailyFinancialMetric.expenses += expenses;
            existingDailyFinancialMetric.profit += profit;
            existingDailyFinancialMetric.orders += orders;
            existingDailyFinancialMetric.revenue += revenue;

            // aggregate repairs
            existingDailyFinancialMetric.repairs.orders += repairs.orders;
            existingDailyFinancialMetric.repairs.revenue += repairs.revenue;

            // aggregate sales
            // sales -> orders
            existingDailyFinancialMetric.sales.orders.total +=
              sales.orders.total;
            existingDailyFinancialMetric.sales.orders.online +=
              sales.orders.online;
            existingDailyFinancialMetric.sales.orders.inStore +=
              sales.orders.inStore;
            // sales -> revenue
            existingDailyFinancialMetric.sales.revenue.total +=
              sales.revenue.total;
            existingDailyFinancialMetric.sales.revenue.online +=
              sales.revenue.online;
            existingDailyFinancialMetric.sales.revenue.inStore +=
              sales.revenue.inStore;

            // average the average order values
            const averageOrderValues = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.averageOrderValue
            );
            const averageDailyAverageOrderValue =
              averageOrderValues.reduce(
                (acc, averageOrderValue) => acc + averageOrderValue,
                0
              ) / averageOrderValues.length;
            existingDailyFinancialMetric.averageOrderValue =
              existingDailyFinancialMetric.averageOrderValue +
              averageDailyAverageOrderValue / 2;

            // average the conversion rates
            const conversionRates = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.conversionRate
            );
            const averageDailyConversionRate =
              conversionRates.reduce(
                (acc, conversionRate) => acc + conversionRate,
                0
              ) / conversionRates.length;
            existingDailyFinancialMetric.conversionRate =
              (existingDailyFinancialMetric.conversionRate +
                averageDailyConversionRate) /
              2;

            // average the net profit margins
            const averageNetProfitMargins = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.netProfitMargin
            );
            const averageDailyNetProfitMargin =
              averageNetProfitMargins.reduce(
                (acc, netProfitMargin) => acc + netProfitMargin,
                0
              ) / averageNetProfitMargins.length;
            existingDailyFinancialMetric.netProfitMargin =
              existingDailyFinancialMetric.netProfitMargin +
              averageDailyNetProfitMargin / 2;
          });
        });
      });

      return allLocationsFinancialMetricsAcc;
    },
    clonedEdmontonFinancialMetrics
  );

  return allLocationsFinancialMetrics;
}

function returnAllLocationsAggregatedProductMetrics(
  storeLocationBusinessMetrics: BusinessMetric[]
) {
  // find edmonton store
  const edmontonStore = storeLocationBusinessMetrics.find(
    (storeLocationBusinessMetrics) =>
      storeLocationBusinessMetrics.storeLocation === 'Edmonton'
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store product metrics
  const clonedEdmontonProductMetrics = structuredClone(
    edmontonStore.productMetrics
  ) as ProductMetric[]; // all edmonton store product fields overlap with other stores

  const allLocationsProductMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsProductMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === 'Edmonton') {
        return allLocationsProductMetricsAcc;
      }

      const { productMetrics } = storeLocationBusinessMetrics;

      /**
       * productMetrics: {
         name: ProductCategory;
           
         yearlyMetrics: {
           year: string;
           orders: {
             total: number;
             online: number;
             inStore: number;
           };
           revenue: {
             total: number;
             online: number;
             inStore: number;
           };
         
           monthlyMetrics: {
             month: string;
             orders: {
               total: number;
               online: number;
               inStore: number;
             };
             revenue: {
               total: number;
               online: number;
               inStore: number;
             };
           
             dailyMetrics: {
               day: string;
               orders: {
                 total: number;
                 online: number;
                 inStore: number;
               };
               revenue: {
                 total: number;
                 online: number;
                 inStore: number;
               };
             }[];
           }[];
         }[];    
        }[]
        */

      productMetrics.forEach((productMetric) => {
        const { name, yearlyMetrics } = productMetric;

        // find existing product metric
        const existingProductCategoryMetric = clonedEdmontonProductMetrics.find(
          (existingProductMetric) => existingProductMetric.name === name
        ) as ProductMetric; // product category is guaranteed to exist (edmonton store overlaps all product categories of other stores)

        yearlyMetrics.forEach((yearlyProductMetric) => {
          const {
            monthlyMetrics: monthlyProductMetrics,
            orders,
            revenue,
            year,
          } = yearlyProductMetric;

          // find existing yearly product metric
          const existingYearlyProductMetric =
            existingProductCategoryMetric.yearlyMetrics.find(
              (existingYearlyProductMetric) =>
                existingYearlyProductMetric.year === year
            ) as ProductYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

          // aggregate existing yearly product metric
          // yearly -> orders
          existingYearlyProductMetric.orders.total += orders.total;
          existingYearlyProductMetric.orders.online += orders.online;
          existingYearlyProductMetric.orders.inStore += orders.inStore;
          // yearly -> revenue
          existingYearlyProductMetric.revenue.total += revenue.total;
          existingYearlyProductMetric.revenue.online += revenue.online;
          existingYearlyProductMetric.revenue.inStore += revenue.inStore;

          // aggregate monthly product metrics
          monthlyProductMetrics.forEach((monthlyProductMetric) => {
            const {
              dailyMetrics: dailyProductMetrics,
              month,
              orders,
              revenue,
            } = monthlyProductMetric;

            // find existing monthly product metric
            const existingMonthlyProductMetric =
              existingYearlyProductMetric.monthlyMetrics.find(
                (existingMonthlyProductMetric) =>
                  existingMonthlyProductMetric.month === month
              ) as ProductMonthlyMetric; // month is guaranteed to exist (all stores start on Jan)

            // aggregate existing monthly product metric
            // monthly -> orders
            existingMonthlyProductMetric.orders.total += orders.total;
            existingMonthlyProductMetric.orders.online += orders.online;
            existingMonthlyProductMetric.orders.inStore += orders.inStore;
            // monthly -> revenue
            existingMonthlyProductMetric.revenue.total += revenue.total;
            existingMonthlyProductMetric.revenue.online += revenue.online;
            existingMonthlyProductMetric.revenue.inStore += revenue.inStore;

            // aggregate daily product metrics
            dailyProductMetrics.forEach((dailyProductMetric) => {
              const { day, orders, revenue } = dailyProductMetric;

              // find existing daily product metric
              const existingDailyProductMetric =
                existingMonthlyProductMetric.dailyMetrics.find(
                  (existingDailyProductMetric) =>
                    existingDailyProductMetric.day === day
                ) as ProductDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

              // aggregate existing daily product metric
              // daily -> orders
              existingDailyProductMetric.orders.total += orders.total;
              existingDailyProductMetric.orders.online += orders.online;
              existingDailyProductMetric.orders.inStore += orders.inStore;
              // daily -> revenue
              existingDailyProductMetric.revenue.total += revenue.total;
              existingDailyProductMetric.revenue.online += revenue.online;
              existingDailyProductMetric.revenue.inStore += revenue.inStore;
            });
          });
        });
      });

      return allLocationsProductMetricsAcc;
    },
    clonedEdmontonProductMetrics
  );

  return allLocationsProductMetrics;
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
}: CreateRandomBusinessMetricsInput): BusinessMetric[] {
  const FINANCIAL_METRICS_TEMPLATE: FinancialMetric = {
    year: '2013',
    averageOrderValue: 0,
    conversionRate: 0,
    expenses: 0,
    profit: 0,
    netProfitMargin: 0,
    orders: 0,
    revenue: 0,

    repairs: {
      orders: 0,
      revenue: 0,
    },

    sales: {
      orders: {
        total: 0,
        online: 0,
        inStore: 0,
      },
      revenue: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    monthlyMetrics: [],
  };

  const MONTHLY_METRICS_TEMPLATE: MonthlyFinancialMetric = {
    month: 'January',
    averageOrderValue: 0,
    conversionRate: 0,
    expenses: 0,
    profit: 0,
    netProfitMargin: 0,
    orders: 0,
    revenue: 0,

    repairs: {
      orders: 0,
      revenue: 0,
    },

    sales: {
      orders: {
        total: 0,
        online: 0,
        inStore: 0,
      },
      revenue: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    dailyMetrics: [],
  };

  const DAILY_METRICS_TEMPLATE: DailyFinancialMetric = {
    day: '2021-01-01',
    averageOrderValue: 0,
    conversionRate: 0,
    expenses: 0,
    profit: 0,
    netProfitMargin: 0,
    orders: 0,
    revenue: 0,

    repairs: {
      orders: 0,
      revenue: 0,
    },

    sales: {
      orders: {
        total: 0,
        online: 0,
        inStore: 0,
      },
      revenue: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },
  };

  const storeLocationsBusinessMetrics = storeLocations.map((storeLocation) => {
    const storeLocationBusinessMetrics: BusinessMetric = {
      storeLocation,
      customerMetrics: {
        totalCustomers: 0,
        lifetimeValue: 0,
        yearlyMetrics: [],
      },
      financialMetrics: [],
      productMetrics: [],
      repairMetrics: [],
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

    const createdProductMetrics = returnProductMetrics({
      daysInMonthsInYears,
      productCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationBusinessMetrics.productMetrics = createdProductMetrics;

    const createdRepairMetrics = returnRepairMetrics({
      daysInMonthsInYears,
      repairCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationBusinessMetrics.repairMetrics = createdRepairMetrics;

    const aggregatedProductIntoFinancialMetrics =
      returnAggregatedProductIntoFinancialMetrics({
        productMetrics: createdProductMetrics,
        financialMetrics: storeLocationBusinessMetrics.financialMetrics,
        dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
        financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
        monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
      });
    storeLocationBusinessMetrics.financialMetrics =
      aggregatedProductIntoFinancialMetrics;

    const aggregatedRepairIntoFinancialMetrics =
      returnAggregatedRepairIntoFinancialMetrics({
        repairMetrics: createdRepairMetrics,
        financialMetrics: storeLocationBusinessMetrics.financialMetrics,
        dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
        financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
        monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
      });
    storeLocationBusinessMetrics.financialMetrics =
      aggregatedRepairIntoFinancialMetrics;

    const createdFinancialMetrics = returnFinancialMetrics({
      financialMetrics: storeLocationBusinessMetrics.financialMetrics,
      storeLocation,
      yearConversionRateSpread,
      yearProfitMarginSpread,
    });
    storeLocationBusinessMetrics.financialMetrics = createdFinancialMetrics;

    const createdCustomerMetrics = returnCustomerMetrics({
      daysInMonthsInYears,
      storeLocation,
      yearChurnRateSpread,
      yearCustomersSpread,
      yearNewCustomersSpread,
    });
    storeLocationBusinessMetrics.customerMetrics = createdCustomerMetrics;

    return storeLocationBusinessMetrics;
  });

  // aggregate all locations
  const allLocationBusinessMetrics: BusinessMetric = {
    storeLocation: 'All Locations',
    customerMetrics: {
      totalCustomers: 0,
      lifetimeValue: 0,
      yearlyMetrics: [],
    },
    financialMetrics: [],
    productMetrics: [],
    repairMetrics: [],
  };

  // aggregate all locations customer metrics
  const allLocationsAggregatedCustomerMetrics =
    returnAllLocationsAggregatedCustomerMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.customerMetrics =
    allLocationsAggregatedCustomerMetrics;

  // aggregate all locations financial metrics
  const allLocationsAggregatedFinancialMetrics =
    returnAllLocationsAggregatedFinancialMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.financialMetrics =
    allLocationsAggregatedFinancialMetrics;

  // aggregate all locations product metrics
  const allLocationsAggregatedProductMetrics =
    returnAllLocationsAggregatedProductMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.productMetrics =
    allLocationsAggregatedProductMetrics;

  // aggregate all locations repair metrics
  const allLocationsAggregatedRepairMetrics =
    returnAllLocationsAggregatedRepairMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.repairMetrics =
    allLocationsAggregatedRepairMetrics;

  storeLocationsBusinessMetrics.push(allLocationBusinessMetrics);

  return storeLocationsBusinessMetrics;
}

export { createRandomBusinessMetrics };
