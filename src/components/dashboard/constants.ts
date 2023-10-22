/**
 * Sales Metrics:

    Total Sales:
        This is the cumulative revenue generated over a specific period, usually displayed as a sum or a graph of sales over time
    Sales by Channel:
        Breakdown of sales by various channels, including online sales, physical store sales, and other sales channels like third-party platforms or affiliate programs
    Sales by Product Category:
        Categorizing sales data by product type such as smartphones, laptops, and accessoriesThis helps identify top-performing product categories
    Average Order Value (AOV):
        AOV calculates the average amount spent per orderIt is computed as total revenue divided by the number of orders during a specific period
    Conversion Rate:
        This metric measures the percentage of website visitors who make a purchase, indicating how effectively your website turns visitors into customers */

import { STORE_LOCATION_DATA } from '../../constants/data';
import { StoreLocation } from '../../types';
import { returnDaysInMonthsInYears } from '../../utils';

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

type SalesData = {
  storeLocation: string;

  yearlyTrends: {
    year: string;
    yearlyRevenue: number;
    yearlyRepairRevenue: number;
    yearlySalesRevenue: number;
    yearlyOnlineSalesRevenue: number;
    yearlyInStoreSalesRevenue: number;
    yearlyRepairOrders: number;
    yearlySalesOrders: number;
    yearlyAverageOrderValue: number;
    yearlyConversionRate: number;

    // financial metrics
    yearlyExpenses: number; // Total expenses for the specified period
    yearlyProfit: number; // Total profit for the specified period
    yearlyNetProfitMargin: number; // Net profit margin as a percentage

    monthlyTrends: {
      month: string;
      totalMonthlyRevenue: number;
      monthlyRepairRevenue: number;
      monthlySalesRevenue: number;
      monthlyOnlineSalesRevenue: number;
      monthlyInStoreSalesRevenue: number;
      totalMonthlyOrders: number;
      monthlyRepairOrders: number;
      monthlySalesOrders: number;
      monthlyAverageOrderValue: number;
      monthlyConversionRate: number;

      // financial metrics
      monthlyExpenses: number; // Total expenses for the specified period
      monthlyProfit: number; // Total profit for the specified period
      monthlyNetProfitMargin: number; // Net profit margin as a percentage

      dailyTrends: {
        day: string;
        dailyRevenue: number;
        dailyRepairRevenue: number;
        dailySalesRevenue: number;
        dailyOnlineSalesRevenue: number;
        dailyInStoreSalesRevenue: number;
        dailyOrders: number;
        dailyRepairOrders: number;
        dailySalesOrders: number;
        dailyAverageOrderValue: number;
        dailyConversionRate: number;

        dailyExpenses: number; // Total expenses for the specified period
        dailyProfit: number; // Total profit for the specified period
        dailyNetProfitMargin: number; // Net profit margin as a percentage
      }[];
    }[];
  }[];
  productCategories: {
    productCategoryName: ProductCategory;

    productCategoryYearlyTrends: {
      productCategoryYear: string;
      productCategoryYearlySalesRevenue: number;
      productCategoryYearlyOnlineSalesRevenue: number;
      productCategoryYearlyInStoreSalesRevenue: number;
      productCategoryYearlyUnitsSold: number;

      productCategoryMonthlyTrends: {
        productCategoryMonth: string;
        productCategoryMonthlySalesRevenue: number;
        productCategoryMonthlyOnlineSalesRevenue: number;
        productCategoryMonthlyInStoreSalesRevenue: number;
        productCategoryMonthlyUnitsSold: number;

        productCategoryDailyTrends: {
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

    repairCategoryYearlyTrends: {
      repairCategoryYear: string;
      repairCategoryYearlyRevenue: number;
      repairCategoryYearlyUnitsRepaired: number;

      repairCategoryMonthlyTrends: {
        repairCategoryMonth: string;
        repairCategoryMonthlyRevenue: number;
        repairCategoryMonthlyUnitsRepaired: number;

        repairCategoryDailyTrends: {
          repairCategoryDay: string;
          repairCategoryDailyRevenue: number;
          repairCategoryDailyUnitsRepaired: number;
        }[];
      }[];
    }[];
  }[];
};

function returnRepairCategories({
  daysInMonthsInYears,
  repairCategories,
}: {
  repairCategories: RepairCategory[];
  daysInMonthsInYears: Map<string, Map<string, string[]>>;
}): SalesData['repairCategories'] {
  /**
     * repairCategories: {
    repairCategoryName: RepairCategory;
    repairCategoryRevenue: number;
    repairCategoryUnitsRepaired: number;
    repairCategoryYearlyTrends: {
      repairCategoryYear: string;
      repairCategoryYearlyRevenue: number;
      repairCategoryYearlyUnitsRepaired: number;

      repairCategoryMonthlyTrends: {
        repairCategoryMonth: string;
        repairCategoryMonthlyRevenue: number;
        repairCategoryMonthlyUnitsRepaired: number;

        repairCategoryDailyTrends: {
          repairCategoryDay: string;
          repairCategoryDailyRevenue: number;
          repairCategoryDailyUnitsRepaired: number;
        }[];
      }[];
    }[];
  }[];
     */

  return repairCategories.map((repairCategory) => {
    const repairCategoryYearlyTrends = Array.from(daysInMonthsInYears).map(
      (yearTuple, yearIdx) => {
        const [year, daysInMonthsMap] = yearTuple;

        const repairCategoryMonthlyTrends = Array.from(daysInMonthsMap).map(
          (monthTuple, monthIdx) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const repairCategoryDailyTrends = daysRange.map((date) => {
              //random repair units between 5 and 25
              const repairCategoryDailyUnitsRepaired = Math.round(
                Math.random() * (15 - 5) + 5 // spread between 5 and 15
              );

              const repairCategoryDailyRevenue =
                repairCategory === 'Computer Components' ||
                repairCategory === 'Electronics'
                  ? repairCategoryDailyUnitsRepaired *
                    Math.round(Math.random() * (400 - 150) + 150) // spread between 150 and 400
                  : repairCategory === 'Mobile Devices'
                  ? repairCategoryDailyUnitsRepaired *
                    Math.round(Math.random() * (200 - 125) + 125) // spread between 200 and 125
                  : repairCategoryDailyUnitsRepaired *
                    Math.round(Math.random() * (150 - 50) + 50); // spread between 50 and 150

              const repairCategoryDailyTrend = {
                repairCategoryDay: date,
                repairCategoryDailyRevenue,
                repairCategoryDailyUnitsRepaired,
              };

              return repairCategoryDailyTrend;
            });

            const [
              repairCategoryMonthlyRevenue,
              repairCategoryMonthlyUnitsRepaired,
            ] = repairCategoryDailyTrends.reduce(
              (dailyRepairTrendsAcc, dailyRepairTrend) => {
                dailyRepairTrendsAcc[0] +=
                  dailyRepairTrend.repairCategoryDailyRevenue;
                dailyRepairTrendsAcc[1] +=
                  dailyRepairTrend.repairCategoryDailyUnitsRepaired;

                return dailyRepairTrendsAcc;
              },
              [0, 0]
            );

            const monthlyRepairTrend: SalesData['repairCategories'][0]['repairCategoryYearlyTrends'][0]['repairCategoryMonthlyTrends'][0] =
              {
                repairCategoryMonth: month,
                repairCategoryMonthlyRevenue,
                repairCategoryMonthlyUnitsRepaired,
                repairCategoryDailyTrends,
              };

            return monthlyRepairTrend;
          }
        );

        const [repairCategoryYearlyRevenue, repairCategoryYearlyUnitsRepaired] =
          repairCategoryMonthlyTrends.reduce(
            (monthlyRepairTrendsAcc, monthlyRepairTrend) => {
              monthlyRepairTrendsAcc[0] +=
                monthlyRepairTrend.repairCategoryMonthlyRevenue;
              monthlyRepairTrendsAcc[1] +=
                monthlyRepairTrend.repairCategoryMonthlyUnitsRepaired;

              return monthlyRepairTrendsAcc;
            },
            [0, 0]
          );

        const yearlyRepairTrend = {
          repairCategoryYear: year.toString(),
          repairCategoryYearlyRevenue,
          repairCategoryYearlyUnitsRepaired,
          repairCategoryMonthlyTrends,
        };

        return yearlyRepairTrend;
      }
    );

    const repairCategoryObj = {
      repairCategoryName: repairCategory,
      repairCategoryYearlyTrends,
    } as SalesData['repairCategories'][0];

    return repairCategoryObj;
  });
}

function returnProductCategories({
  daysInMonthsInYears,
  productCategories,
}: {
  daysInMonthsInYears: Map<string, Map<string, string[]>>;
  productCategories: ProductCategory[];
}): SalesData['productCategories'] {
  /**
   * productCategories: {
    productCategoryName: ProductCategory;

    productCategoryYearlyTrends: {
      productCategoryYear: string;
      productCategoryYearlySalesRevenue: number;
      productCategoryYearlyOnlineSalesRevenue: number;
      productCategoryYearlyInStoreSalesRevenue: number;
      productCategoryYearlyUnitsSold: number;

      productCategoryMonthlyTrends: {
        productCategoryMonth: string;
        productCategoryMonthlySalesRevenue: number;
        productCategoryMonthlyOnlineSalesRevenue: number;
        productCategoryMonthlyInStoreSalesRevenue: number;
        productCategoryMonthlyUnitsSold: number;

        productCategoryDailyTrends: {
          productCategoryDay: string;
          productCategoryDailySalesRevenue: number;
          productCategoryDailyOnlineSalesRevenue: number;
          productCategoryDailyInStoreSalesRevenue: number;
          productCategoryDailyUnitsSold: number;
        }[];
      }[];
    }[];
  }[];
   */
  return productCategories.map((productCategory) => {
    const productCategoryYearlyTrends = Array.from(daysInMonthsInYears).map(
      (yearTuple, yearIdx) => {
        const [year, daysInMonthsMap] = yearTuple;

        const productCategoryMonthlyTrends = Array.from(daysInMonthsMap).map(
          (monthTuple, monthIdx) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const productCategoryDailyTrends = daysRange.map((date) => {
              //random repair units between 10 and 50
              const productCategoryDailyUnitsSold =
                productCategory === 'Desktop Computers' ||
                productCategory === 'Laptops' ||
                productCategory === 'Smartphones' ||
                productCategory === 'Tablets'
                  ? Math.round(Math.random() * (20 - 5) + 5) // spread between 5 and 20
                  : productCategory === 'Central Processing Units (CPUs)' ||
                    productCategory === 'Graphics Processing Units (GPUs)' ||
                    productCategory === 'Motherboards' ||
                    productCategory === 'Headphones' ||
                    productCategory === 'Speakers' ||
                    productCategory === 'Monitors' ||
                    productCategory === 'Power Supplies'
                  ? Math.round(Math.random() * (30 - 10) + 10) // spread between 10 and 30
                  : productCategory === 'Accessories'
                  ? Math.round(Math.random() * (100 - 50) + 50) // spread between 50 and 100
                  : Math.round(
                      Math.random() * (35 - 10) + 10 // spread between 10 and 35
                    );

              const productCategoryDailySalesRevenue =
                productCategory === 'Desktop Computers' ||
                productCategory === 'Laptops' ||
                productCategory === 'Smartphones' ||
                productCategory === 'Tablets'
                  ? productCategoryDailyUnitsSold *
                    Math.round(Math.random() * (2200 - 500) + 500) // spread between 500 and 2200
                  : productCategory === 'Central Processing Units (CPUs)' ||
                    productCategory === 'Graphics Processing Units (GPUs)'
                  ? productCategoryDailyUnitsSold *
                    Math.round(Math.random() * (900 - 150) + 150) // spread between 150 and 900
                  : productCategory === 'Motherboards' ||
                    productCategory === 'Headphones' ||
                    productCategory === 'Speakers' ||
                    productCategory === 'Monitors' ||
                    productCategory === 'Power Supplies'
                  ? productCategoryDailyUnitsSold *
                    Math.round(Math.random() * (500 - 150) + 150) // spread between 150 and 500
                  : productCategory === 'Keyboards' ||
                    productCategory === 'Memory (RAM)' ||
                    productCategory === 'Mice' ||
                    productCategory === 'Storage'
                  ? productCategoryDailyUnitsSold *
                    Math.round(Math.random() * (300 - 100) + 100) // spread between 100 and 300
                  : productCategoryDailyUnitsSold *
                    Math.round(Math.random() * (100 - 50) + 50); // spread between 50 and 100

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

              const productCategoryDailyTrend: SalesData['productCategories'][0]['productCategoryYearlyTrends'][0]['productCategoryMonthlyTrends'][0]['productCategoryDailyTrends'][0] =
                {
                  productCategoryDay: date,
                  productCategoryDailySalesRevenue,
                  productCategoryDailyOnlineSalesRevenue,
                  productCategoryDailyInStoreSalesRevenue,
                  productCategoryDailyUnitsSold,
                };

              return productCategoryDailyTrend;
            });

            const [
              productCategoryMonthlySalesRevenue,
              productCategoryMonthlyOnlineSalesRevenue,
              productCategoryMonthlyInStoreSalesRevenue,
              productCategoryMonthlyUnitsSold,
            ] = productCategoryDailyTrends.reduce(
              (dailyRepairTrendsAcc, dailyRepairTrend) => {
                dailyRepairTrendsAcc[0] +=
                  dailyRepairTrend.productCategoryDailySalesRevenue;
                dailyRepairTrendsAcc[1] +=
                  dailyRepairTrend.productCategoryDailyOnlineSalesRevenue;
                dailyRepairTrendsAcc[2] +=
                  dailyRepairTrend.productCategoryDailyInStoreSalesRevenue;
                dailyRepairTrendsAcc[3] +=
                  dailyRepairTrend.productCategoryDailyUnitsSold;

                return dailyRepairTrendsAcc;
              },
              [0, 0, 0, 0]
            );

            const monthlyRepairTrend: SalesData['productCategories'][0]['productCategoryYearlyTrends'][0]['productCategoryMonthlyTrends'][0] =
              {
                productCategoryMonth: month,
                productCategoryMonthlySalesRevenue,
                productCategoryMonthlyOnlineSalesRevenue,
                productCategoryMonthlyInStoreSalesRevenue,
                productCategoryMonthlyUnitsSold,
                productCategoryDailyTrends,
              };

            return monthlyRepairTrend;
          }
        );

        const [
          productCategoryYearlySalesRevenue,
          productCategoryYearlyOnlineSalesRevenue,
          productCategoryYearlyInStoreSalesRevenue,
          productCategoryYearlyUnitsSold,
        ] = productCategoryMonthlyTrends.reduce(
          (monthlyRepairTrendsAcc, monthlyRepairTrend) => {
            monthlyRepairTrendsAcc[0] +=
              monthlyRepairTrend.productCategoryMonthlySalesRevenue;
            monthlyRepairTrendsAcc[1] +=
              monthlyRepairTrend.productCategoryMonthlyOnlineSalesRevenue;
            monthlyRepairTrendsAcc[2] +=
              monthlyRepairTrend.productCategoryMonthlyInStoreSalesRevenue;
            monthlyRepairTrendsAcc[3] +=
              monthlyRepairTrend.productCategoryMonthlyUnitsSold;

            return monthlyRepairTrendsAcc;
          },
          [0, 0, 0, 0]
        );

        const yearlyRepairTrend: SalesData['productCategories'][0]['productCategoryYearlyTrends'][0] =
          {
            productCategoryYear: year.toString(),
            productCategoryYearlySalesRevenue,
            productCategoryYearlyOnlineSalesRevenue,
            productCategoryYearlyInStoreSalesRevenue,
            productCategoryYearlyUnitsSold,
            productCategoryMonthlyTrends,
          };

        return yearlyRepairTrend;
      }
    );

    const productCategoryObj: SalesData['productCategories'][0] = {
      productCategoryName: productCategory,
      productCategoryYearlyTrends,
    };

    return productCategoryObj;
  });
}

function returnYearlyTrends({
  productCategories,
  repairCategories,
  yearlyTrends,
}: {
  productCategories: SalesData['productCategories'];
  repairCategories: SalesData['repairCategories'];
  yearlyTrends: SalesData['yearlyTrends'];
}) {
  const yearlyTrendsTemplate: SalesData['yearlyTrends'][0] = {
    year: '',
    yearlyRevenue: 0,
    yearlyRepairRevenue: 0,
    yearlySalesRevenue: 0,
    yearlyOnlineSalesRevenue: 0,
    yearlyInStoreSalesRevenue: 0,
    yearlyRepairOrders: 0,
    yearlySalesOrders: 0,
    yearlyAverageOrderValue: 0,
    yearlyConversionRate: 0,

    // financial metrics
    yearlyExpenses: 0, // Total expenses for the specified period
    yearlyProfit: 0, // Total profit for the specified period
    yearlyNetProfitMargin: 0, // Net profit margin as a percentage

    monthlyTrends: [],
  };

  const monthlyTrendsTemplate: SalesData['yearlyTrends'][0]['monthlyTrends'][0] =
    {
      month: '',
      totalMonthlyRevenue: 0,
      monthlyRepairRevenue: 0,
      monthlySalesRevenue: 0,
      monthlyOnlineSalesRevenue: 0,
      monthlyInStoreSalesRevenue: 0,
      totalMonthlyOrders: 0,
      monthlyRepairOrders: 0,
      monthlySalesOrders: 0,
      monthlyAverageOrderValue: 0,
      monthlyConversionRate: 0,

      // financial metrics
      monthlyExpenses: 0, // Total expenses for the specified period
      monthlyProfit: 0, // Total profit for the specified period
      monthlyNetProfitMargin: 0, // Net profit margin as a percentage

      dailyTrends: [],
    };

  const dailyTrendsTemplate: SalesData['yearlyTrends'][0]['monthlyTrends'][0]['dailyTrends'][0] =
    {
      day: '',
      dailyRevenue: 0,
      dailyRepairRevenue: 0,
      dailySalesRevenue: 0,
      dailyOnlineSalesRevenue: 0,
      dailyInStoreSalesRevenue: 0,
      dailyOrders: 0,
      dailyRepairOrders: 0,
      dailySalesOrders: 0,
      dailyAverageOrderValue: 0,
      dailyConversionRate: 0,

      // financial metrics
      dailyExpenses: 0, // Total expenses for the specified period
      dailyProfit: 0, // Total profit for the specified period
      dailyNetProfitMargin: 0, // Net profit margin as a percentage
    };

  const yearlyTrendsWithProductCategories = productCategories.reduce(
    (clonedYearlyTrendsAcc, productCategory, productCategoryIdx) => {
      const { productCategoryName, productCategoryYearlyTrends } =
        productCategory;

      console.group('productCategoryName', productCategoryName);
      console.log('clonedYearlyTrendsAcc', clonedYearlyTrendsAcc);

      const newYearlyTrends = productCategoryYearlyTrends.map(
        (productCategoryYearlyTrend, productCategoryYearlyTrendIdx) => {
          const { productCategoryMonthlyTrends } = productCategoryYearlyTrend;

          const newMonthlyTrends = productCategoryMonthlyTrends.map(
            (productCategoryMonthlyTrend, productCategoryMonthlyTrendIdx) => {
              const { productCategoryDailyTrends } =
                productCategoryMonthlyTrend;

              const newDailyTrends = productCategoryDailyTrends.map(
                (productCategoryDailyTrend, productCategoryDailyTrendIdx) => {
                  const {
                    productCategoryDailyInStoreSalesRevenue,
                    productCategoryDailyOnlineSalesRevenue,
                    productCategoryDailySalesRevenue,
                    productCategoryDailyUnitsSold,
                    productCategoryDay,
                  } = productCategoryDailyTrend;

                  const existingDailyTrend = clonedYearlyTrendsAcc[
                    productCategoryYearlyTrendIdx
                  ]?.monthlyTrends[productCategoryMonthlyTrendIdx]?.dailyTrends[
                    productCategoryDailyTrendIdx
                  ] ?? {
                    ...dailyTrendsTemplate,
                    day: productCategoryDay,
                  };

                  // console.log({ existingDailyTrend });

                  /**
                     * dailyTrends: {
                        day: string;
                        dailyRevenue: number;
                        dailyRepairRevenue: number;
                        dailySalesRevenue: number;
                        dailyOnlineSalesRevenue: number;
                        dailyInStoreSalesRevenue: number;
                        dailyOrders: number;
                        dailyRepairOrders: number;
                        dailySalesOrders: number;
                        dailyAverageOrderValue: number;
                        dailyConversionRate: number;

                        dailyExpenses: number; // Total expenses for the specified period
                        dailyProfit: number; // Total profit for the specified period
                        dailyNetProfitMargin: number; // Net profit margin as a percentage
                      }[];
                     */

                  const currentAverageOrderValue =
                    productCategoryDailySalesRevenue /
                    productCategoryDailyUnitsSold;
                  const newDailyAverageOrderValue =
                    existingDailyTrend.dailyAverageOrderValue === 0
                      ? currentAverageOrderValue
                      : (existingDailyTrend.dailyAverageOrderValue +
                          currentAverageOrderValue) /
                        2;

                  // random conversion rate between 0.1 and 0.3
                  const currentConversionRate =
                    Math.random() * (0.3 - 0.1) + 0.1;
                  const newDailyConversionRate =
                    existingDailyTrend.dailyConversionRate === 0
                      ? currentConversionRate
                      : (existingDailyTrend.dailyConversionRate +
                          currentConversionRate) /
                        2;

                  // random profit margin
                  const dailyNetProfitMargin =
                    productCategoryName === 'Accessories'
                      ? Math.random() * (0.9 - 0.7) + 0.7 // spread between 0.7 and 0.9
                      : Math.random() * (0.3 - 0.1) + 0.1; // spread between 0.1 and 0.3

                  const dailyProfit =
                    productCategoryDailySalesRevenue * dailyNetProfitMargin;
                  const dailyExpenses =
                    productCategoryDailySalesRevenue - dailyProfit;

                  const newDailyTrend: SalesData['yearlyTrends'][0]['monthlyTrends'][0]['dailyTrends'][0] =
                    {
                      ...existingDailyTrend,
                      dailyRevenue:
                        existingDailyTrend.dailyRevenue +
                        productCategoryDailySalesRevenue,
                      dailySalesRevenue:
                        existingDailyTrend.dailySalesRevenue +
                        productCategoryDailySalesRevenue,
                      dailyOnlineSalesRevenue:
                        existingDailyTrend.dailyOnlineSalesRevenue +
                        productCategoryDailyOnlineSalesRevenue,
                      dailyInStoreSalesRevenue:
                        existingDailyTrend.dailyInStoreSalesRevenue +
                        productCategoryDailyInStoreSalesRevenue,
                      dailyOrders:
                        existingDailyTrend.dailyOrders +
                        productCategoryDailyUnitsSold,
                      dailySalesOrders:
                        existingDailyTrend.dailySalesOrders +
                        productCategoryDailyUnitsSold,
                      dailyAverageOrderValue: newDailyAverageOrderValue,
                      dailyConversionRate: newDailyConversionRate,

                      dailyExpenses:
                        existingDailyTrend.dailyExpenses + dailyExpenses,
                      dailyProfit: existingDailyTrend.dailyProfit + dailyProfit,
                      dailyNetProfitMargin,
                    };

                  return newDailyTrend;
                }
              );
              // console.group('productCategoryName', productCategoryName);
              // console.log('newDailyTrends', newDailyTrends);
              // console.groupEnd();

              /**
             * {
      month: string;
      totalMonthlyRevenue: number;
      monthlyRepairRevenue: number;
      monthlySalesRevenue: number;
      monthlyOnlineSalesRevenue: number;
      monthlyInStoreSalesRevenue: number;
      totalMonthlyOrders: number;
      monthlyRepairOrders: number;
      monthlySalesOrders: number;
      monthlyAverageOrderValue: number;
      monthlyConversionRate: number;

      // financial metrics
      monthlyExpenses: number; // Total expenses for the specified period
      monthlyProfit: number; // Total profit for the specified period
      monthlyNetProfitMargin: number; // Net profit margin as a percentage
             */

              const { productCategoryMonth } = productCategoryMonthlyTrend;

              const existingMonthlyTrend = clonedYearlyTrendsAcc[
                productCategoryYearlyTrendIdx
              ]?.monthlyTrends[productCategoryMonthlyTrendIdx] ?? {
                ...monthlyTrendsTemplate,
                month: productCategoryMonth,
                dailyTrends: Array.from({ length: newDailyTrends.length }),
              };

              const newMonthlyTrend: SalesData['yearlyTrends'][0]['monthlyTrends'][0] =
                newDailyTrends.reduce(
                  (monthlyTrendsAcc, dailyTrend, dailyTrendIdx) => {
                    monthlyTrendsAcc.totalMonthlyRevenue +=
                      dailyTrend.dailyRevenue;
                    monthlyTrendsAcc.monthlySalesRevenue +=
                      dailyTrend.dailySalesRevenue;
                    monthlyTrendsAcc.monthlyOnlineSalesRevenue +=
                      dailyTrend.dailyOnlineSalesRevenue;
                    monthlyTrendsAcc.monthlyInStoreSalesRevenue +=
                      dailyTrend.dailyInStoreSalesRevenue;
                    monthlyTrendsAcc.totalMonthlyOrders +=
                      dailyTrend.dailyOrders;
                    monthlyTrendsAcc.monthlySalesOrders +=
                      dailyTrend.dailySalesOrders;

                    // average of all daily average order values
                    const dailyAverageOrderValues = newDailyTrends.map(
                      (dailyTrend) => dailyTrend.dailyAverageOrderValue
                    );
                    const monthlyAverageOrderValue =
                      dailyAverageOrderValues.reduce(
                        (acc, dailyAverageOrderValue) =>
                          acc + dailyAverageOrderValue,
                        0
                      ) / dailyAverageOrderValues.length;
                    monthlyTrendsAcc.monthlyAverageOrderValue =
                      monthlyAverageOrderValue;

                    // average of all daily conversion rates
                    const dailyConversionRates = newDailyTrends.map(
                      (dailyTrend) => dailyTrend.dailyConversionRate
                    );
                    const monthlyConversionRate =
                      dailyConversionRates.reduce(
                        (acc, dailyConversionRate) => acc + dailyConversionRate,
                        0
                      ) / dailyConversionRates.length;
                    monthlyTrendsAcc.monthlyConversionRate =
                      monthlyConversionRate;

                    // financial metrics
                    monthlyTrendsAcc.monthlyExpenses +=
                      dailyTrend.dailyExpenses;
                    monthlyTrendsAcc.monthlyProfit += dailyTrend.dailyProfit;
                    monthlyTrendsAcc.monthlyNetProfitMargin =
                      monthlyTrendsAcc.monthlyProfit /
                      monthlyTrendsAcc.monthlySalesRevenue;

                    monthlyTrendsAcc.dailyTrends[dailyTrendIdx] = dailyTrend;

                    return monthlyTrendsAcc;
                  },
                  existingMonthlyTrend
                );

              return newMonthlyTrend;

              //
              //
            }
          );
          // console.group('productCategoryName', productCategoryName);
          // console.log('newMonthlyTrends', newMonthlyTrends);
          // console.groupEnd();

          /**
           * yearlyTrends: {
    year: string;
    yearlyRevenue: number;
    yearlyRepairRevenue: number;
    yearlySalesRevenue: number;
    yearlyOnlineSalesRevenue: number;
    yearlyInStoreSalesRevenue: number;
    yearlyRepairOrders: number;
    yearlySalesOrders: number;
    yearlyAverageOrderValue: number;
    yearlyConversionRate: number;

    // financial metrics
    yearlyTotalExpenses: number; // Total expenses for the specified period
    yearlyTotalProfit: number; // Total profit for the specified period
    yearlyNetProfitMargin: number; // Net profit margin as a percentage
           */
          const { productCategoryYear } = productCategoryYearlyTrend;
          const existingYearlyTrend = clonedYearlyTrendsAcc[
            productCategoryYearlyTrendIdx
          ] ?? {
            ...yearlyTrendsTemplate,
            year: productCategoryYear,
            monthlyTrends: Array.from({ length: newMonthlyTrends.length }),
          };

          const newYearlyTrend: SalesData['yearlyTrends'][0] =
            newMonthlyTrends.reduce(
              (yearlyTrendsAcc, monthlyTrend, monthlyTrendIdx) => {
                yearlyTrendsAcc.yearlyRevenue +=
                  monthlyTrend.totalMonthlyRevenue;
                yearlyTrendsAcc.yearlySalesRevenue +=
                  monthlyTrend.monthlySalesRevenue;
                yearlyTrendsAcc.yearlyOnlineSalesRevenue +=
                  monthlyTrend.monthlyOnlineSalesRevenue;
                yearlyTrendsAcc.yearlyInStoreSalesRevenue +=
                  monthlyTrend.monthlyInStoreSalesRevenue;
                yearlyTrendsAcc.yearlySalesOrders +=
                  monthlyTrend.totalMonthlyOrders;

                // average of all monthly average order values
                const monthlyAverageOrderValues = newMonthlyTrends.map(
                  (monthlyTrend) => monthlyTrend.monthlyAverageOrderValue
                );
                const yearlyAverageOrderValue =
                  monthlyAverageOrderValues.reduce(
                    (acc, monthlyAverageOrderValue) =>
                      acc + monthlyAverageOrderValue,
                    0
                  ) / monthlyAverageOrderValues.length;
                yearlyTrendsAcc.yearlyAverageOrderValue =
                  yearlyAverageOrderValue;

                // average of all monthly conversion rates
                const monthlyConversionRates = newMonthlyTrends.map(
                  (monthlyTrend) => monthlyTrend.monthlyConversionRate
                );
                const yearlyConversionRate =
                  monthlyConversionRates.reduce(
                    (acc, monthlyConversionRate) => acc + monthlyConversionRate,
                    0
                  ) / monthlyConversionRates.length;
                yearlyTrendsAcc.yearlyConversionRate = yearlyConversionRate;

                // financial metrics
                yearlyTrendsAcc.yearlyExpenses += monthlyTrend.monthlyExpenses;
                yearlyTrendsAcc.yearlyProfit += monthlyTrend.monthlyProfit;
                yearlyTrendsAcc.yearlyNetProfitMargin =
                  yearlyTrendsAcc.yearlyProfit /
                  yearlyTrendsAcc.yearlySalesRevenue;

                yearlyTrendsAcc.monthlyTrends[monthlyTrendIdx] = monthlyTrend;

                return yearlyTrendsAcc;
              },
              existingYearlyTrend
            );

          //
          //
          return newYearlyTrend;
        }
      );

      console.log('newYearlyTrends', newYearlyTrends);
      console.groupEnd();

      clonedYearlyTrendsAcc = newYearlyTrends;
      //
      //
      return clonedYearlyTrendsAcc;
    },
    structuredClone(yearlyTrends)
  );

  return yearlyTrendsWithProductCategories;
}

function addFieldsToSalesData({
  productCategories,
  repairCategories,
  storeLocations,
}: {
  productCategories: ProductCategory[];
  repairCategories: RepairCategory[];
  storeLocations: StoreLocation[];
}) {
  return storeLocations.map((storeLocation) => {
    const storeLocationSalesData: SalesData = {
      storeLocation,
      yearlyTrends: [],
      productCategories: [],
      repairCategories: [],
    };

    const daysInMonthsInYears = returnDaysInMonthsInYears({
      yearStart:
        storeLocation === 'Edmonton'
          ? 2015
          : storeLocation === 'Calgary'
          ? 2017
          : 2019,
      yearEnd: 2022,
    });

    const createdProductCategories = returnProductCategories({
      daysInMonthsInYears,
      productCategories,
    });
    console.log({ createdProductCategories });
    storeLocationSalesData.productCategories = createdProductCategories;

    const createdRepairCategories = returnRepairCategories({
      daysInMonthsInYears,
      repairCategories,
    });
    console.log({ createdRepairCategories });
    storeLocationSalesData.repairCategories = createdRepairCategories;

    const createdYearlyTrends = returnYearlyTrends({
      productCategories: createdProductCategories,
      repairCategories: createdRepairCategories,
      yearlyTrends: storeLocationSalesData.yearlyTrends,
    });
    storeLocationSalesData.yearlyTrends = createdYearlyTrends;

    // console.log(
    //   '2015-jan totalMonthlyRevenue',
    //   (() => {
    //     const jan2015 = createdYearlyTrends[0].monthlyTrends[0];
    //     const totalMonthlyRevenue = jan2015.dailyTrends.reduce(
    //       (acc, dailyTrend) => acc + dailyTrend.dailyRevenue,
    //       0
    //     );
    //     return totalMonthlyRevenue;
    //   })()
    // );
    //
    //
    //
    return storeLocationSalesData;
  });
}

export { addFieldsToSalesData, PRODUCT_CATEGORIES, REPAIR_CATEGORIES };
export type { ProductCategory, RepairCategory, SalesData, StoreLocation };
