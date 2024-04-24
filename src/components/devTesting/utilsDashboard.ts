import { StoreLocation } from "../../types";
import {
  BusinessMetric,
  DaysInMonthsInYears,
  LocationYearSpread,
  Month,
  ProductCategory,
  ProductDailyMetric,
  ProductMetric,
  ProductMonthlyMetric,
  ProductYearlyMetric,
  RepairCategory,
} from "../dashboard/types";
import {
  returnDaysInMonthsInYears,
  returnRandomOnlineTransactions,
  returnUnitsRevenueTuple,
} from "../dashboard/utils";
import { BUSINESS_METRICS_TEMPLATE } from "./constantsDashboard";

type CreateRandomMetricsInput = {
  daysPerMonth: number[];
  months: Month[];
  productCategories: ProductCategory[];
  repairCategories: RepairCategory[];
  storeLocations: StoreLocation[];
};

function createRandomBusinessMetrics2({
  daysPerMonth,
  months,
  productCategories,
  repairCategories,
  storeLocations,
}: CreateRandomMetricsInput) {
  const storeLocationsBusinessMetrics = storeLocations.map((storeLocation) => {
    const storeLocationBusinessMetrics: BusinessMetric = {
      ...BUSINESS_METRICS_TEMPLATE,
      storeLocation,
    };

    const daysInMonthsInYears = returnDaysInMonthsInYears({
      daysPerMonth,
      months,
      yearStart:
        storeLocation === "Edmonton" ? 2013 : storeLocation === "Calgary" ? 2017 : 2019,
      yearEnd: 2024,
    });

    // create product metrics for each store location
    // aggregate product metrics for each store location into 'All Locations' metrics

    // create repair metrics for each store location
    // aggregate repair metrics for each store location into 'All Locations' metrics

    // create customer metrics for each store location
    // aggregate customer metrics for each store location into 'All Locations' metrics

    // use product and repair metrics in creating financial metrics
    // aggregate financial metrics for each store location into 'All Locations' metrics
  });

  return storeLocationsBusinessMetrics;
}

/**
 *  productMetrics: {
    name: ProductCategory;

    yearlyMetrics: {
      year: string;
      unitsSold: {
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
        unitsSold: {
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
          unitsSold: {
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
 */

type CreateRandomProductMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  productCategories: ProductCategory[];
  storeLocation: StoreLocation;
  yearOnlineTransactionsSpread: LocationYearSpread;
  yearUnitsSoldSpread: LocationYearSpread;
};

type CreateRandomProductMetricsOutput = Promise<Omit<ProductMetric[], "All Products">>;

async function createRandomProductMetrics({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearOnlineTransactionsSpread,
  yearUnitsSoldSpread,
}: CreateRandomProductMetricsInput) {
  return productCategories.map((productCategory) => {
    const yearlyProductMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
      const [year, daysInMonthsMap] = yearTuple;

      const monthlyProductMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
        const [month, daysRange] = monthTuple;

        const dailyProductMetrics = daysRange.map((day) => {
          /**
     *  dailyMetrics: {
          day: string;
          unitsSold: {
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
     */

          const [dailyProductUnitsSold, dailyProductSalesRevenue] =
            returnUnitsRevenueTuple({
              categoryType: productCategory,
              storeLocation,
              year,
              yearUnitsSoldSpread,
            });

          const randomOnlineFraction = returnRandomOnlineTransactions({
            storeLocation,
            year,
            yearOnlineTransactionsSpread,
          });

          const dailyProductInStoreUnitsSold =
            dailyProductUnitsSold - dailyProductUnitsSold * randomOnlineFraction;

          const dailyProductInStoreRevenue =
            dailyProductSalesRevenue - dailyProductSalesRevenue * randomOnlineFraction;

          const dailyProductOnlineUnitsSold =
            dailyProductUnitsSold * randomOnlineFraction;

          const dailyProductOnlineRevenue =
            dailyProductSalesRevenue * randomOnlineFraction;

          const dailyProductMetric: ProductDailyMetric = {
            day,
            unitsSold: {
              inStore: dailyProductInStoreUnitsSold,
              online: dailyProductOnlineUnitsSold,
              total: dailyProductUnitsSold,
            },
            revenue: {
              inStore: dailyProductInStoreRevenue,
              online: dailyProductOnlineRevenue,
              total: dailyProductSalesRevenue,
            },
          };

          return dailyProductMetric;
        });

        const [
          monthlyProductTotalUnitsSold,
          monthlyProductOnlineUnitsSold,
          monthlyProductInStoreUnitsSold,
          monthlyProductTotalRevenue,
          monthlyProductOnlineRevenue,
          monthlyProductInStoreRevenue,
        ] = dailyProductMetrics.reduce(
          (monthlyProductMetricsAcc, dailyProductMetric) => {
            monthlyProductMetricsAcc[0] += dailyProductMetric.unitsSold.total;
            monthlyProductMetricsAcc[1] += dailyProductMetric.unitsSold.online;
            monthlyProductMetricsAcc[2] += dailyProductMetric.unitsSold.inStore;
            monthlyProductMetricsAcc[3] += dailyProductMetric.revenue.total;
            monthlyProductMetricsAcc[4] += dailyProductMetric.revenue.online;
            monthlyProductMetricsAcc[5] += dailyProductMetric.revenue.inStore;

            return monthlyProductMetricsAcc;
          },
          [0, 0, 0, 0, 0, 0]
        );

        const monthlyProductMetric: ProductMonthlyMetric = {
          month,
          unitsSold: {
            inStore: monthlyProductInStoreUnitsSold,
            online: monthlyProductOnlineUnitsSold,
            total: monthlyProductTotalUnitsSold,
          },
          revenue: {
            inStore: monthlyProductInStoreRevenue,
            online: monthlyProductOnlineRevenue,
            total: monthlyProductTotalRevenue,
          },
          dailyMetrics: dailyProductMetrics,
        };

        return monthlyProductMetric;
      });

      const [
        yearlyProductTotalUnitsSold,
        yearlyProductOnlineUnitsSold,
        yearlyProductInStoreUnitsSold,
        yearlyProductTotalRevenue,
        yearlyProductOnlineRevenue,
        yearlyProductInStoreRevenue,
      ] = monthlyProductMetrics.reduce(
        (yearlyProductMetricsAcc, monthlyProductMetric) => {
          yearlyProductMetricsAcc[0] += monthlyProductMetric.unitsSold.total;
          yearlyProductMetricsAcc[1] += monthlyProductMetric.unitsSold.online;
          yearlyProductMetricsAcc[2] += monthlyProductMetric.unitsSold.inStore;
          yearlyProductMetricsAcc[3] += monthlyProductMetric.revenue.total;
          yearlyProductMetricsAcc[4] += monthlyProductMetric.revenue.online;
          yearlyProductMetricsAcc[5] += monthlyProductMetric.revenue.inStore;

          return yearlyProductMetricsAcc;
        },
        [0, 0, 0, 0, 0, 0]
      );

      const yearlyProductMetric: ProductYearlyMetric = {
        year,
        unitsSold: {
          inStore: yearlyProductInStoreUnitsSold,
          online: yearlyProductOnlineUnitsSold,
          total: yearlyProductTotalUnitsSold,
        },
        revenue: {
          inStore: yearlyProductInStoreRevenue,
          online: yearlyProductOnlineRevenue,
          total: yearlyProductTotalRevenue,
        },
        monthlyMetrics: monthlyProductMetrics,
      };

      return yearlyProductMetric;
    });

    const randomProductMetrics: ProductMetric = {
      name: productCategory,
      yearlyMetrics: yearlyProductMetrics,
    };

    return randomProductMetrics;
  });
}
