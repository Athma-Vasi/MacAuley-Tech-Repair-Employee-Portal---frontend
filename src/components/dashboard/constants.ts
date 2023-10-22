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
        This metric measures the percentage of website visitors who make a purchase, indicating how effectively your website turns visitors into customers 
*/

import { STORE_LOCATION_DATA } from '../../constants/data';
import { StoreLocation } from '../../types';
import { returnDaysInMonthsInYears } from '../../utils';

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS = [
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

type YearTransactionsSpread = Record<string, Record<string, [number, number]>>;

const YEAR_TRANSACTIONS_SPREAD: YearTransactionsSpread = {
  Edmonton: {
    '2013': [0, 3],
    '2014': [1, 3],
    '2015': [2, 5],
    '2016': [3, 7],
    '2017': [5, 9],
    '2018': [5, 11],
    '2019': [7, 13],
    '2020': [15, 17],
    '2021': [17, 19],
    '2022': [13, 15],
  },
  Calgary: {
    '2017': [0, 3],
    '2018': [2, 4],
    '2019': [3, 7],
    '2020': [7, 9],
    '2021': [9, 11],
    '2022': [5, 7],
  },
  Vancouver: {
    '2019': [0, 3],
    '2020': [3, 5],
    '2021': [5, 9],
    '2022': [2, 4],
  },
};

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

function returnTransactionsRevenueTuple({
  category,
  categoryType,
  storeLocation,
  year,
  yearTransactionsSpread,
}: {
  category: 'repair' | 'product';
  categoryType: RepairCategory | ProductCategory;
  storeLocation: StoreLocation;
  year: string;
  yearTransactionsSpread: YearTransactionsSpread;
}) {
  function returnRandomTransactions() {
    const [min, max] = yearTransactionsSpread[storeLocation][year] ?? [3, 5];
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

function returnRepairCategories({
  daysInMonthsInYears,
  repairCategories,
  storeLocation,
  yearTransactionsSpread,
}: {
  daysInMonthsInYears: Map<string, Map<string, string[]>>;
  repairCategories: RepairCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: YearTransactionsSpread;
}): SalesData['repairCategories'] {
  return repairCategories.map((repairCategory) => {
    const repairCategoryYearlyTrends = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const repairCategoryMonthlyTrends = Array.from(daysInMonthsMap).map(
          (monthTuple, monthIdx) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const repairCategoryDailyTrends = daysRange.map((date) => {
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
              (monthlyRepairTrendsAcc, dailyRepairTrend) => {
                monthlyRepairTrendsAcc[0] +=
                  dailyRepairTrend.repairCategoryDailyRevenue;
                monthlyRepairTrendsAcc[1] +=
                  dailyRepairTrend.repairCategoryDailyUnitsRepaired;

                return monthlyRepairTrendsAcc;
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
            (yearlyRepairTrendsAcc, monthlyRepairTrend) => {
              yearlyRepairTrendsAcc[0] +=
                monthlyRepairTrend.repairCategoryMonthlyRevenue;
              yearlyRepairTrendsAcc[1] +=
                monthlyRepairTrend.repairCategoryMonthlyUnitsRepaired;

              return yearlyRepairTrendsAcc;
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
  storeLocation,
  yearTransactionsSpread,
}: {
  daysInMonthsInYears: Map<string, Map<string, string[]>>;
  productCategories: ProductCategory[];
  storeLocation: StoreLocation;
  yearTransactionsSpread: YearTransactionsSpread;
}): SalesData['productCategories'] {
  return productCategories.map((productCategory) => {
    const productCategoryYearlyTrends = Array.from(daysInMonthsInYears).map(
      (yearTuple) => {
        const [year, daysInMonthsMap] = yearTuple;

        const productCategoryMonthlyTrends = Array.from(daysInMonthsMap).map(
          (monthTuple, monthIdx) => {
            const [month, daysRange] = monthTuple;

            // daily repair trends
            const productCategoryDailyTrends = daysRange.map((date) => {
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
              (monthlyRepairTrendsAcc, dailyRepairTrend) => {
                monthlyRepairTrendsAcc[0] +=
                  dailyRepairTrend.productCategoryDailySalesRevenue;
                monthlyRepairTrendsAcc[1] +=
                  dailyRepairTrend.productCategoryDailyOnlineSalesRevenue;
                monthlyRepairTrendsAcc[2] +=
                  dailyRepairTrend.productCategoryDailyInStoreSalesRevenue;
                monthlyRepairTrendsAcc[3] +=
                  dailyRepairTrend.productCategoryDailyUnitsSold;

                return monthlyRepairTrendsAcc;
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
          (yearlyRepairTrendsAcc, monthlyRepairTrend) => {
            yearlyRepairTrendsAcc[0] +=
              monthlyRepairTrend.productCategoryMonthlySalesRevenue;
            yearlyRepairTrendsAcc[1] +=
              monthlyRepairTrend.productCategoryMonthlyOnlineSalesRevenue;
            yearlyRepairTrendsAcc[2] +=
              monthlyRepairTrend.productCategoryMonthlyInStoreSalesRevenue;
            yearlyRepairTrendsAcc[3] +=
              monthlyRepairTrend.productCategoryMonthlyUnitsSold;

            return yearlyRepairTrendsAcc;
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
    (clonedYearlyTrendsAcc, productCategory) => {
      const { productCategoryName, productCategoryYearlyTrends } =
        productCategory;

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

                  const currentAverageOrderValue =
                    productCategoryDailySalesRevenue /
                    productCategoryDailyUnitsSold;
                  let newDailyAverageOrderValue =
                    existingDailyTrend.dailyAverageOrderValue === 0
                      ? currentAverageOrderValue
                      : (existingDailyTrend.dailyAverageOrderValue +
                          currentAverageOrderValue) /
                        2;
                  newDailyAverageOrderValue = Number.isNaN(
                    newDailyAverageOrderValue
                  )
                    ? 0
                    : newDailyAverageOrderValue;

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

              const {
                productCategoryMonth,
                productCategoryMonthlyInStoreSalesRevenue,
                productCategoryMonthlyOnlineSalesRevenue,
                productCategoryMonthlySalesRevenue,
                productCategoryMonthlyUnitsSold,
              } = productCategoryMonthlyTrend;

              const existingMonthlyTrend = clonedYearlyTrendsAcc[
                productCategoryYearlyTrendIdx
              ]?.monthlyTrends[productCategoryMonthlyTrendIdx] ?? {
                ...monthlyTrendsTemplate,
                month: productCategoryMonth,
                dailyTrends: Array.from({ length: newDailyTrends.length }),
              };

              existingMonthlyTrend.totalMonthlyRevenue +=
                productCategoryMonthlySalesRevenue;
              existingMonthlyTrend.monthlySalesRevenue +=
                productCategoryMonthlySalesRevenue;
              existingMonthlyTrend.monthlyOnlineSalesRevenue +=
                productCategoryMonthlyOnlineSalesRevenue;
              existingMonthlyTrend.monthlyInStoreSalesRevenue +=
                productCategoryMonthlyInStoreSalesRevenue;
              existingMonthlyTrend.totalMonthlyOrders +=
                productCategoryMonthlyUnitsSold;

              const newMonthlyTrend: SalesData['yearlyTrends'][0]['monthlyTrends'][0] =
                newDailyTrends.reduce(
                  (monthlyTrendsAcc, dailyTrend, dailyTrendIdx) => {
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

          const {
            productCategoryYear,
            productCategoryYearlyInStoreSalesRevenue,
            productCategoryYearlyOnlineSalesRevenue,
            productCategoryYearlySalesRevenue,
            productCategoryYearlyUnitsSold,
          } = productCategoryYearlyTrend;

          const existingYearlyTrend = clonedYearlyTrendsAcc[
            productCategoryYearlyTrendIdx
          ] ?? {
            ...yearlyTrendsTemplate,
            year: productCategoryYear,
            monthlyTrends: Array.from({ length: newMonthlyTrends.length }),
          };

          existingYearlyTrend.yearlyRevenue +=
            productCategoryYearlySalesRevenue;
          existingYearlyTrend.yearlySalesRevenue +=
            productCategoryYearlySalesRevenue;
          existingYearlyTrend.yearlyOnlineSalesRevenue +=
            productCategoryYearlyOnlineSalesRevenue;
          existingYearlyTrend.yearlyInStoreSalesRevenue +=
            productCategoryYearlyInStoreSalesRevenue;
          existingYearlyTrend.yearlySalesOrders +=
            productCategoryYearlyUnitsSold;

          const newYearlyTrend: SalesData['yearlyTrends'][0] =
            newMonthlyTrends.reduce(
              (yearlyTrendsAcc, monthlyTrend, monthlyTrendIdx) => {
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

      clonedYearlyTrendsAcc = newYearlyTrends;
      //
      //
      return clonedYearlyTrendsAcc;
    },
    yearlyTrends
  );

  const yearlyTrendsWithRepairCategories = repairCategories.reduce(
    (clonedYearlyTrendsAcc, repairCategory) => {
      const { repairCategoryYearlyTrends } = repairCategory;

      const newYearlyTrends = repairCategoryYearlyTrends.map(
        (repairCategoryYearlyTrend, repairCategoryYearlyTrendIdx) => {
          const { repairCategoryMonthlyTrends } = repairCategoryYearlyTrend;

          const newMonthlyTrends = repairCategoryMonthlyTrends.map(
            (repairCategoryMonthlyTrend, repairCategoryMonthlyTrendIdx) => {
              const { repairCategoryDailyTrends } = repairCategoryMonthlyTrend;

              const newDailyTrends = repairCategoryDailyTrends.map(
                (repairCategoryDailyTrend, repairCategoryDailyTrendIdx) => {
                  const {
                    repairCategoryDailyRevenue,
                    repairCategoryDailyUnitsRepaired,
                    repairCategoryDay,
                  } = repairCategoryDailyTrend;

                  const existingDailyTrend = clonedYearlyTrendsAcc[
                    repairCategoryYearlyTrendIdx
                  ]?.monthlyTrends[repairCategoryMonthlyTrendIdx]?.dailyTrends[
                    repairCategoryDailyTrendIdx
                  ] ?? {
                    ...dailyTrendsTemplate,
                    day: repairCategoryDay,
                  };

                  const currentAverageOrderValue =
                    repairCategoryDailyRevenue /
                    repairCategoryDailyUnitsRepaired;
                  let newDailyAverageOrderValue =
                    existingDailyTrend.dailyAverageOrderValue === 0
                      ? currentAverageOrderValue
                      : (existingDailyTrend.dailyAverageOrderValue +
                          currentAverageOrderValue) /
                        2;
                  newDailyAverageOrderValue = Number.isNaN(
                    newDailyAverageOrderValue
                  )
                    ? 0
                    : newDailyAverageOrderValue;

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
                    Math.random() * (0.2 - 0.05) + 0.05; // spread between 0.05 and 0.2

                  const dailyProfit =
                    repairCategoryDailyRevenue * dailyNetProfitMargin;
                  const dailyExpenses =
                    repairCategoryDailyRevenue - dailyProfit;

                  const newDailyTrend: SalesData['yearlyTrends'][0]['monthlyTrends'][0]['dailyTrends'][0] =
                    {
                      ...existingDailyTrend,
                      dailyRevenue:
                        existingDailyTrend.dailyRevenue +
                        repairCategoryDailyRevenue,
                      dailyRepairRevenue:
                        existingDailyTrend.dailyRepairRevenue +
                        repairCategoryDailyRevenue,
                      dailyRepairOrders:
                        existingDailyTrend.dailyRepairOrders +
                        repairCategoryDailyUnitsRepaired,
                      dailyOrders:
                        existingDailyTrend.dailyOrders +
                        repairCategoryDailyUnitsRepaired,
                      dailyAverageOrderValue: newDailyAverageOrderValue,
                      dailyConversionRate: newDailyConversionRate,

                      dailyExpenses:
                        existingDailyTrend.dailyExpenses + dailyExpenses,
                      dailyProfit: existingDailyTrend.dailyProfit + dailyProfit,
                      dailyNetProfitMargin,
                    };

                  //
                  //
                  return newDailyTrend;
                }
              );

              const {
                repairCategoryMonth,
                repairCategoryMonthlyRevenue,
                repairCategoryMonthlyUnitsRepaired,
              } = repairCategoryMonthlyTrend;

              const existingMonthlyTrend = clonedYearlyTrendsAcc[
                repairCategoryYearlyTrendIdx
              ]?.monthlyTrends[repairCategoryMonthlyTrendIdx] ?? {
                ...monthlyTrendsTemplate,
                month: repairCategoryMonth,
                dailyTrends: Array.from({ length: newDailyTrends.length }),
              };

              existingMonthlyTrend.totalMonthlyRevenue +=
                repairCategoryMonthlyRevenue;
              existingMonthlyTrend.monthlyRepairRevenue +=
                repairCategoryMonthlyRevenue;
              existingMonthlyTrend.monthlyRepairOrders +=
                repairCategoryMonthlyUnitsRepaired;
              existingMonthlyTrend.totalMonthlyOrders +=
                repairCategoryMonthlyUnitsRepaired;

              const newMonthlyTrend: SalesData['yearlyTrends'][0]['monthlyTrends'][0] =
                newDailyTrends.reduce(
                  (monthlyTrendsAcc, dailyTrend, dailyTrendIdx) => {
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
                      monthlyTrendsAcc.monthlyAverageOrderValue === 0
                        ? monthlyAverageOrderValue
                        : (monthlyTrendsAcc.monthlyAverageOrderValue +
                            monthlyAverageOrderValue) /
                          2;

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
                      monthlyTrendsAcc.monthlyConversionRate === 0
                        ? monthlyConversionRate
                        : (monthlyTrendsAcc.monthlyConversionRate +
                            monthlyConversionRate) /
                          2;

                    // financial metrics
                    monthlyTrendsAcc.monthlyExpenses +=
                      dailyTrend.dailyExpenses;
                    monthlyTrendsAcc.monthlyProfit += dailyTrend.dailyProfit;
                    monthlyTrendsAcc.monthlyNetProfitMargin =
                      monthlyTrendsAcc.monthlyProfit /
                      monthlyTrendsAcc.monthlyRepairRevenue;

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

          const {
            repairCategoryYear,
            repairCategoryYearlyRevenue,
            repairCategoryYearlyUnitsRepaired,
          } = repairCategoryYearlyTrend;

          const existingYearlyTrend = clonedYearlyTrendsAcc[
            repairCategoryYearlyTrendIdx
          ] ?? {
            ...yearlyTrendsTemplate,
            year: repairCategoryYear,
            monthlyTrends: Array.from({ length: newMonthlyTrends.length }),
          };

          existingYearlyTrend.yearlyRevenue += repairCategoryYearlyRevenue;
          existingYearlyTrend.yearlyRepairRevenue +=
            repairCategoryYearlyRevenue;
          existingYearlyTrend.yearlyRepairOrders +=
            repairCategoryYearlyUnitsRepaired;
          existingYearlyTrend.yearlyRepairOrders +=
            repairCategoryYearlyUnitsRepaired;

          const newYearlyTrend: SalesData['yearlyTrends'][0] =
            newMonthlyTrends.reduce(
              (yearlyTrendsAcc, monthlyTrend, monthlyTrendIdx) => {
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
                  yearlyTrendsAcc.yearlyAverageOrderValue === 0
                    ? yearlyAverageOrderValue
                    : (yearlyTrendsAcc.yearlyAverageOrderValue +
                        yearlyAverageOrderValue) /
                      2;

                // average of all monthly conversion rates
                const monthlyConversionRates = newMonthlyTrends.map(
                  (monthlyTrend) => monthlyTrend.monthlyConversionRate
                );
                const yearlyConversionRate =
                  monthlyConversionRates.reduce(
                    (acc, monthlyConversionRate) => acc + monthlyConversionRate,
                    0
                  ) / monthlyConversionRates.length;
                yearlyTrendsAcc.yearlyConversionRate =
                  yearlyTrendsAcc.yearlyConversionRate === 0
                    ? yearlyConversionRate
                    : (yearlyTrendsAcc.yearlyConversionRate +
                        yearlyConversionRate) /
                      2;

                // financial metrics
                yearlyTrendsAcc.yearlyExpenses += monthlyTrend.monthlyExpenses;
                yearlyTrendsAcc.yearlyProfit += monthlyTrend.monthlyProfit;
                yearlyTrendsAcc.yearlyNetProfitMargin =
                  yearlyTrendsAcc.yearlyProfit /
                  yearlyTrendsAcc.yearlyRepairRevenue;

                yearlyTrendsAcc.monthlyTrends[monthlyTrendIdx] = monthlyTrend;

                return yearlyTrendsAcc;
              },
              existingYearlyTrend
            );

          return newYearlyTrend;
          //
          //
        }
      );

      clonedYearlyTrendsAcc = newYearlyTrends;

      return clonedYearlyTrendsAcc;
    },
    yearlyTrendsWithProductCategories
  );

  return yearlyTrendsWithRepairCategories;
}

function addFieldsToSalesData({
  daysPerMonth,
  months,
  productCategories,
  repairCategories,
  storeLocations,
  yearTransactionsSpread,
}: {
  daysPerMonth: number[];
  months: string[];
  productCategories: ProductCategory[];
  repairCategories: RepairCategory[];
  storeLocations: StoreLocation[];
  yearTransactionsSpread: YearTransactionsSpread;
}) {
  return storeLocations.map((storeLocation) => {
    const storeLocationSalesData: SalesData = {
      storeLocation,
      yearlyTrends: [],
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
      yearEnd: 2022,
      // yearStart: 2021,
      // yearEnd: 2022,
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

    const createdYearlyTrends = returnYearlyTrends({
      productCategories: createdProductCategories,
      repairCategories: createdRepairCategories,
      yearlyTrends: storeLocationSalesData.yearlyTrends,
    });
    storeLocationSalesData.yearlyTrends = createdYearlyTrends;

    return storeLocationSalesData;
  });
}

export {
  addFieldsToSalesData,
  DAYS_PER_MONTH,
  MONTHS,
  PRODUCT_CATEGORIES,
  REPAIR_CATEGORIES,
  YEAR_TRANSACTIONS_SPREAD,
};
export type {
  ProductCategory,
  RepairCategory,
  SalesData,
  StoreLocation,
  YearTransactionsSpread,
};
