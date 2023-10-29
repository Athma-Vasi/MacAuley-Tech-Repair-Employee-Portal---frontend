import { v4 as uuidv4 } from 'uuid';

import { StoreLocation } from '../../types';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
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
  }
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

type ReturnProductCategoriesInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  productCategories: ProductCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: LocationYearSpread;
};

function returnProductCategories({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearTransactionsSpread,
}: ReturnProductCategoriesInput): ProductMetric[] {
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

type ReturnAggregatedProductMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  financialMetricsTemplate: FinancialMetric;
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  productCategories: ProductMetric[];
};

function returnAggregatedProductMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  financialMetricsTemplate,
  monthlyFinancialMetricsTemplate,
  productCategories,
}: ReturnAggregatedProductMetricsInput): FinancialMetric[] {
  return productCategories.reduce(
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

              existingMonthlyFinancialMetric.revenue += revenue.total;
              existingMonthlyFinancialMetric.sales.revenue.total +=
                revenue.total;
              existingMonthlyFinancialMetric.sales.revenue.online +=
                revenue.online;
              existingMonthlyFinancialMetric.sales.revenue.inStore +=
                revenue.inStore;
              existingMonthlyFinancialMetric.orders += orders.total;
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

          existingYearlyFinancialMetric.revenue += revenue.total;
          existingYearlyFinancialMetric.sales.revenue.total += revenue.total;
          existingYearlyFinancialMetric.sales.revenue.online += revenue.online;
          existingYearlyFinancialMetric.sales.revenue.inStore +=
            revenue.inStore;
          existingYearlyFinancialMetric.orders += orders.total;
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

type ReturnAggregatedRepairMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: FinancialMetric[];
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  repairMetrics: RepairMetric[];
  financialMetricsTemplate: FinancialMetric;
};

function returnAggregatedRepairMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  monthlyFinancialMetricsTemplate,
  repairMetrics,
  financialMetricsTemplate,
}: ReturnAggregatedRepairMetricsInput): FinancialMetric[] {
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

            existingMonthlyFinancialMetric.revenue += revenue;
            existingMonthlyFinancialMetric.repairs.revenue += revenue;
            existingMonthlyFinancialMetric.repairs.orders += orders;
            existingMonthlyFinancialMetric.orders += orders;

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

        existingYearlyFinancialMetric.revenue += revenue;
        existingYearlyFinancialMetric.repairs.revenue += revenue;
        existingYearlyFinancialMetric.repairs.orders += orders;
        existingYearlyFinancialMetric.orders += orders;

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

function returnAllStoreLocationsAggregatedMetrics({
  storeLocationsBusinessMetrics,
}: {
  storeLocationsBusinessMetrics: BusinessMetric[];
}) {
  const businessMetricsTemplate: BusinessMetric = {
    storeLocation: 'All Locations',
    customerMetrics: {
      totalCustomers: 0,
      lifetimeValue: 0,
      yearlyMetrics: [],
    },
    financialMetrics: [],
    productCategories: [],
    repairMetrics: [],
  };

  return [];
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
      productCategories: [],
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

    const createdProductCategories = returnProductCategories({
      daysInMonthsInYears,
      productCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationBusinessMetrics.productCategories = createdProductCategories;

    const createdRepairCategories = returnRepairMetrics({
      daysInMonthsInYears,
      repairCategories,
      storeLocation,
      yearTransactionsSpread,
    });
    storeLocationBusinessMetrics.repairMetrics = createdRepairCategories;

    const aggregatedProductCategoryMetrics = returnAggregatedProductMetrics({
      productCategories: createdProductCategories,
      financialMetrics: storeLocationBusinessMetrics.financialMetrics,
      dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
      financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
      monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
    });
    storeLocationBusinessMetrics.financialMetrics =
      aggregatedProductCategoryMetrics;

    const aggregatedRepairCategoryMetrics = returnAggregatedRepairMetrics({
      repairMetrics: createdRepairCategories,
      financialMetrics: storeLocationBusinessMetrics.financialMetrics,
      dailyFinancialMetricsTemplate: DAILY_METRICS_TEMPLATE,
      financialMetricsTemplate: FINANCIAL_METRICS_TEMPLATE,
      monthlyFinancialMetricsTemplate: MONTHLY_METRICS_TEMPLATE,
    });
    storeLocationBusinessMetrics.financialMetrics =
      aggregatedRepairCategoryMetrics;

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

  return storeLocationsBusinessMetrics;
}

export { createRandomBusinessMetrics };
