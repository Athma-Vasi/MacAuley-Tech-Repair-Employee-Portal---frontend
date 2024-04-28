import { PROPERTY_DESCRIPTOR } from "../../constants/data";
import { StoreLocation } from "../../types";
import { returnToFixedFloat } from "../../utils";
import { DAYS_PER_MONTH, MONTHS } from "../dashboard/constants";
import {
  BusinessMetric,
  CustomerDailyMetric,
  CustomerMetrics,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  DailyFinancialMetric,
  DaysInMonthsInYears,
  FinancialMetricCategory,
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
  YearlyFinancialMetric,
} from "../dashboard/types";
import {
  returnDaysInMonthsInYears,
  returnRandomChurnRate,
  returnRandomCustomers,
  returnRandomNewCustomers,
  returnRandomOnlineTransactions,
  returnUnitsRepairedRevenueTuple,
  returnUnitsRevenueTuple,
} from "../dashboard/utils";
import { BUSINESS_METRICS_TEMPLATE } from "./constantsDashboard";

// //
// //
// type StoreLocation = "Calgary" | "Edmonton" | "Vancouver" | "All Locations";
// type LocationYearSpread = Record<StoreLocation, Record<string, [number, number]>>;
// //
// //

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
        storeLocation === "Calgary" ? 2017 : storeLocation === "Vancouver" ? 2019 : 2013,
      yearEnd: 2024,
    });

    // create product metrics for each store location
    // create repair metrics for each store location
    // create customer metrics for each store location

    // aggregate product metrics for each store location into 'All Locations' metrics
    // aggregate repair metrics for each store location into 'All Locations' metrics
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

type CreateRandomProductMetricsOutput = Omit<ProductMetric[], "All Products">;

function createRandomProductMetrics({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearOnlineTransactionsSpread,
  yearUnitsSoldSpread,
}: CreateRandomProductMetricsInput): CreateRandomProductMetricsOutput {
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
            createProductCategoryUnitsRevenueTuple({
              categoryType: productCategory,
              storeLocation,
              year,
              yearUnitsSoldSpread,
            });

          const randomOnlineFraction = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearOnlineTransactionsSpread,
            defaultMax: 0.3,
            defaultMin: 0.1,
            returnFraction: true,
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

/**
 * - aggregate product metrics for each store location into 'All Products' metrics
 */
function createAggregatedProductMetrics(
  productMetrics: Omit<ProductMetric[], "All Products">
): ProductMetric {
  const PRODUCT_METRIC_TEMPLATE: ProductMetric = {
    name: "All Products",
    yearlyMetrics: [],
  };

  return productMetrics.reduce<ProductMetric>((productMetricsAcc, productMetric) => {
    const PRODUCT_METRIC_TEMPLATE_DAILY: ProductDailyMetric = {
      day: "",
      unitsSold: {
        inStore: 0,
        online: 0,
        total: 0,
      },
      revenue: {
        inStore: 0,
        online: 0,
        total: 0,
      },
    };
    const PRODUCT_METRIC_TEMPLATE_MONTHLY: ProductMonthlyMetric = {
      month: "January",
      unitsSold: {
        inStore: 0,
        online: 0,
        total: 0,
      },
      revenue: {
        inStore: 0,
        online: 0,
        total: 0,
      },
      dailyMetrics: [],
    };

    const PRODUCT_METRIC_TEMPLATE_YEARLY: ProductYearlyMetric = {
      year: "2021",
      unitsSold: {
        inStore: 0,
        online: 0,
        total: 0,
      },
      revenue: {
        inStore: 0,
        online: 0,
        total: 0,
      },
      monthlyMetrics: [],
    };

    const { yearlyMetrics } = productMetric;

    const aggregatedYearlyProductMetrics = yearlyMetrics.map((productYearlyMetric) => {
      const { year, revenue, unitsSold, monthlyMetrics } = productYearlyMetric;

      const existingYearlyMetric = productMetricsAcc.yearlyMetrics.find(
        (productYearlyMetricAcc) => productYearlyMetricAcc.year === year
      ) ?? { ...PRODUCT_METRIC_TEMPLATE_YEARLY, year };

      const aggregatedYearlyMetric = {
        ...existingYearlyMetric,
        revenue: {
          ...existingYearlyMetric.revenue,
          total: existingYearlyMetric.revenue.total + revenue.total,
          online: existingYearlyMetric.revenue.online + revenue.online,
          inStore: existingYearlyMetric.revenue.inStore + revenue.inStore,
        },
        unitsSold: {
          ...existingYearlyMetric.unitsSold,
          total: existingYearlyMetric.unitsSold.total + unitsSold.total,
          online: existingYearlyMetric.unitsSold.online + unitsSold.online,
          inStore: existingYearlyMetric.unitsSold.inStore + unitsSold.inStore,
        },
      };

      const aggregatedMonthlyProductMetrics = monthlyMetrics.map(
        (productMonthlyMetric) => {
          const { month, dailyMetrics, revenue, unitsSold } = productMonthlyMetric;

          const existingMonthlyMetric = aggregatedYearlyMetric.monthlyMetrics.find(
            (productMonthlyMetricAcc) => productMonthlyMetricAcc.month === month
          ) ?? { ...PRODUCT_METRIC_TEMPLATE_MONTHLY, month };

          const aggregatedDailyRepairMetrics = dailyMetrics.map((productDailyMetric) => {
            const { day, revenue, unitsSold } = productDailyMetric;

            const existingDailyMetric = existingMonthlyMetric.dailyMetrics.find(
              (productDailyMetricAcc) => productDailyMetricAcc.day === day
            ) ?? { ...PRODUCT_METRIC_TEMPLATE_DAILY, day };

            const aggregatedDailyMetric = {
              ...existingDailyMetric,
              revenue: {
                ...existingDailyMetric.revenue,
                total: existingDailyMetric.revenue.total + revenue.total,
                online: existingDailyMetric.revenue.online + revenue.online,
                inStore: existingDailyMetric.revenue.inStore + revenue.inStore,
              },
              unitsSold: {
                ...existingDailyMetric.unitsSold,
                total: existingDailyMetric.unitsSold.total + unitsSold.total,
                online: existingDailyMetric.unitsSold.online + unitsSold.online,
                inStore: existingDailyMetric.unitsSold.inStore + unitsSold.inStore,
              },
            };

            return aggregatedDailyMetric;
          });

          const aggregatedMonthlyMetric = {
            ...existingMonthlyMetric,
            revenue: {
              ...existingMonthlyMetric.revenue,
              total: existingMonthlyMetric.revenue.total + revenue.total,
              online: existingMonthlyMetric.revenue.online + revenue.online,
              inStore: existingMonthlyMetric.revenue.inStore + revenue.inStore,
            },
            unitsSold: {
              ...existingMonthlyMetric.unitsSold,
              total: existingMonthlyMetric.unitsSold.total + unitsSold.total,
              online: existingMonthlyMetric.unitsSold.online + unitsSold.online,
              inStore: existingMonthlyMetric.unitsSold.inStore + unitsSold.inStore,
            },
            dailyMetrics: aggregatedDailyRepairMetrics,
          };

          return aggregatedMonthlyMetric;
        }
      );

      aggregatedYearlyMetric.monthlyMetrics = aggregatedMonthlyProductMetrics;

      return aggregatedYearlyMetric;
    });

    productMetricsAcc.yearlyMetrics = aggregatedYearlyProductMetrics;

    return productMetricsAcc;
  }, PRODUCT_METRIC_TEMPLATE);
}

/**
 * - aggregate all store locations' product metrics into a separate 'All Locations' store
 */
function createAllLocationsAggregatedProductMetrics(businessMetrics: BusinessMetric[]) {
  // find all product metrics for each store location
  const initialProductMetrics: Record<string, ProductMetric[]> = {
    edmontonProductMetrics: [],
    calgaryProductMetrics: [],
    vancouverProductMetrics: [],
  };

  const { calgaryProductMetrics, edmontonProductMetrics, vancouverProductMetrics } =
    businessMetrics.reduce((productMetricsAcc, businessMetric) => {
      const { storeLocation, productMetrics } = businessMetric;

      switch (storeLocation) {
        case "Calgary": {
          productMetricsAcc.calgaryProductMetrics = productMetrics;
          break;
        }
        case "Edmonton": {
          productMetricsAcc.edmontonProductMetrics = structuredClone(productMetrics);
          break;
        }
        // case "Vancouver"
        default: {
          productMetricsAcc.vancouverProductMetrics = productMetrics;
          break;
        }
      }

      return productMetricsAcc;
    }, initialProductMetrics);

  // as edmonton metrics are a superset of all other stores' metrics, it is being used as
  // the base to which all other store locations' metrics are aggregated into

  const aggregatedBaseProductMetrics = aggregateStoresIntoBaseProductMetrics({
    baseProductMetrics: edmontonProductMetrics,
    storeProductMetrics: calgaryProductMetrics,
  });

  const aggregatedAllLocationsProductMetrics = aggregateStoresIntoBaseProductMetrics({
    baseProductMetrics: aggregatedBaseProductMetrics,
    storeProductMetrics: vancouverProductMetrics,
  });

  function aggregateStoresIntoBaseProductMetrics({
    baseProductMetrics,
    storeProductMetrics,
  }: {
    baseProductMetrics: ProductMetric[];
    storeProductMetrics: ProductMetric[];
  }) {
    return storeProductMetrics.reduce<ProductMetric[]>(
      (baseProductMetricsAcc, storeProductMetric) => {
        const { name, yearlyMetrics } = storeProductMetric;

        // find base product metric with the same name
        const baseProductMetric = baseProductMetricsAcc.find(
          (baseProductMetric) => baseProductMetric.name === name
        );
        if (!baseProductMetric) {
          return baseProductMetricsAcc;
        }

        yearlyMetrics.forEach((storeYearlyMetric) => {
          const {
            year,
            revenue: yearlyRevenue,
            unitsSold: yearlyUnitsSold,
            monthlyMetrics,
          } = storeYearlyMetric;

          // find base yearly metric with the same year
          const baseYearlyMetric = baseProductMetric.yearlyMetrics.find(
            (baseYearlyMetric) => baseYearlyMetric.year === year
          );
          if (!baseYearlyMetric) {
            return;
          }

          baseYearlyMetric.revenue.total += yearlyRevenue.total;
          baseYearlyMetric.revenue.online += yearlyRevenue.online;
          baseYearlyMetric.revenue.inStore += yearlyRevenue.inStore;

          baseYearlyMetric.unitsSold.total += yearlyUnitsSold.total;
          baseYearlyMetric.unitsSold.online += yearlyUnitsSold.online;
          baseYearlyMetric.unitsSold.inStore += yearlyUnitsSold.inStore;

          monthlyMetrics.forEach((storeMonthlyMetric) => {
            const {
              month,
              revenue: monthlyRevenue,
              unitsSold: monthlyUnitsSold,
              dailyMetrics,
            } = storeMonthlyMetric;

            // find base monthly metric with the same month
            const baseMonthlyMetric = baseYearlyMetric.monthlyMetrics.find(
              (baseMonthlyMetric) => baseMonthlyMetric.month === month
            );
            if (!baseMonthlyMetric) {
              return;
            }

            baseMonthlyMetric.revenue.total += monthlyRevenue.total;
            baseMonthlyMetric.revenue.online += monthlyRevenue.online;
            baseMonthlyMetric.revenue.inStore += monthlyRevenue.inStore;

            baseMonthlyMetric.unitsSold.total += monthlyUnitsSold.total;
            baseMonthlyMetric.unitsSold.online += monthlyUnitsSold.online;
            baseMonthlyMetric.unitsSold.inStore += monthlyUnitsSold.inStore;

            dailyMetrics.forEach((storeDailyMetric) => {
              const { day, revenue, unitsSold } = storeDailyMetric;

              // find base daily metric with the same day
              const baseDailyMetric = baseMonthlyMetric.dailyMetrics.find(
                (baseDailyMetric) => baseDailyMetric.day === day
              );
              if (!baseDailyMetric) {
                return;
              }

              baseDailyMetric.revenue.total += revenue.total;
              baseDailyMetric.revenue.online += revenue.online;
              baseDailyMetric.revenue.inStore += revenue.inStore;

              baseDailyMetric.unitsSold.total += unitsSold.total;
              baseDailyMetric.unitsSold.online += unitsSold.online;
              baseDailyMetric.unitsSold.inStore += unitsSold.inStore;
            });
          });
        });

        return baseProductMetricsAcc;
      },
      baseProductMetrics
    );
  }

  return aggregatedAllLocationsProductMetrics;
}

/**
 *repairMetrics: {
    name: RepairCategory;
    yearlyMetrics: {
      year: string;
      revenue: number;
      unitsRepaired: number;

      monthlyMetrics: {
        month: string;
        revenue: number;
        unitsRepaired: number;

        dailyMetrics: {
          day: string;
          revenue: number;
          unitsRepaired: number;
        }[];
      }[];
    }[];    
  }[]
 */

type CreateRandomRepairMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  repairCategories: RepairCategory[];
  storeLocation: StoreLocation;
  yearUnitsRepairedSpread: LocationYearSpread;
};

function createRandomRepairMetrics({
  daysInMonthsInYears,
  repairCategories,
  storeLocation,
  yearUnitsRepairedSpread,
}: CreateRandomRepairMetricsInput): RepairMetric[] {
  return repairCategories.map((repairCategory) => {
    const yearlyRepairMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
      const [year, daysInMonthsMap] = yearTuple;

      const monthlyRepairMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
        const [month, daysRange] = monthTuple;

        const dailyRepairMetrics = daysRange.map((day) => {
          const [dailyRepairUnits, dailyRepairRevenue] =
            createRepairCategoryUnitsRepairedRevenueTuple({
              categoryType: repairCategory,
              storeLocation,
              year,
              yearUnitsRepairedSpread,
            });

          const dailyRepairMetric: RepairDailyMetric = {
            day,
            unitsRepaired: dailyRepairUnits,
            revenue: dailyRepairRevenue,
          };

          return dailyRepairMetric;
        });

        const [monthlyRepairTotalUnitsRepaired, monthlyRepairTotalRevenue] =
          dailyRepairMetrics.reduce(
            (monthlyRepairMetricsAcc, dailyRepairMetric) => {
              monthlyRepairMetricsAcc[0] += dailyRepairMetric.unitsRepaired;
              monthlyRepairMetricsAcc[1] += dailyRepairMetric.revenue;

              return monthlyRepairMetricsAcc;
            },
            [0, 0]
          );

        const monthlyRepairMetric: RepairMonthlyMetric = {
          month,
          unitsRepaired: monthlyRepairTotalUnitsRepaired,
          revenue: monthlyRepairTotalRevenue,
          dailyMetrics: dailyRepairMetrics,
        };

        return monthlyRepairMetric;
      });

      const [yearlyRepairTotalUnitsRepaired, yearlyRepairTotalRevenue] =
        monthlyRepairMetrics.reduce(
          (yearlyRepairMetricsAcc, monthlyRepairMetric) => {
            yearlyRepairMetricsAcc[0] += monthlyRepairMetric.unitsRepaired;
            yearlyRepairMetricsAcc[1] += monthlyRepairMetric.revenue;

            return yearlyRepairMetricsAcc;
          },
          [0, 0]
        );

      const yearlyRepairMetric: RepairYearlyMetric = {
        year,
        unitsRepaired: yearlyRepairTotalUnitsRepaired,
        revenue: yearlyRepairTotalRevenue,
        monthlyMetrics: monthlyRepairMetrics,
      };

      return yearlyRepairMetric;
    });

    const randomRepairMetrics: RepairMetric = {
      name: repairCategory,
      yearlyMetrics: yearlyRepairMetrics,
    };

    return randomRepairMetrics;
  });
}

/**
 * - aggregate repair metrics for each store location into 'All Repairs' metrics
 */
function createAggregatedRepairMetrics(
  repairMetrics: Omit<RepairMetric[], "All Repairs">
): RepairMetric {
  const REPAIR_METRIC_TEMPLATE: RepairMetric = {
    name: "All Repairs",
    yearlyMetrics: [],
  };

  return repairMetrics.reduce<RepairMetric>((repairMetricsAcc, repairMetric) => {
    const REPAIR_METRIC_TEMPLATE_DAILY: RepairDailyMetric = {
      day: "",
      revenue: 0,
      unitsRepaired: 0,
    };
    const REPAIR_METRIC_TEMPLATE_MONTHLY: RepairMonthlyMetric = {
      month: "January",
      revenue: 0,
      unitsRepaired: 0,
      dailyMetrics: [],
    };
    const REPAIR_METRIC_TEMPLATE_YEARLY: RepairYearlyMetric = {
      year: "2021",
      revenue: 0,
      unitsRepaired: 0,
      monthlyMetrics: [],
    };

    const { yearlyMetrics } = repairMetric;

    const aggregatedYearlyRepairMetrics = yearlyMetrics.map((repairYearlyMetric) => {
      const { year, revenue, unitsRepaired, monthlyMetrics } = repairYearlyMetric;

      const existingYearlyMetric = repairMetricsAcc.yearlyMetrics.find(
        (repairYearlyMetricAcc) => repairYearlyMetricAcc.year === year
      ) ?? { ...REPAIR_METRIC_TEMPLATE_YEARLY, year };

      const aggregatedYearlyMetric = {
        ...existingYearlyMetric,
        revenue: existingYearlyMetric.revenue + revenue,
        unitsRepaired: existingYearlyMetric.unitsRepaired + unitsRepaired,
      };

      const aggregatedMonthlyRepairMetrics = monthlyMetrics.map((repairMonthlyMetric) => {
        const { month, dailyMetrics, revenue, unitsRepaired } = repairMonthlyMetric;

        const existingMonthlyMetric = aggregatedYearlyMetric.monthlyMetrics.find(
          (repairMonthlyMetricAcc) => repairMonthlyMetricAcc.month === month
        ) ?? { ...REPAIR_METRIC_TEMPLATE_MONTHLY, month };

        const aggregatedDailyRepairMetrics = dailyMetrics.map((repairDailyMetric) => {
          const { day, revenue, unitsRepaired } = repairDailyMetric;

          const existingDailyMetric = existingMonthlyMetric.dailyMetrics.find(
            (repairDailyMetricAcc) => repairDailyMetricAcc.day === day
          ) ?? { ...REPAIR_METRIC_TEMPLATE_DAILY, day };

          const aggregatedDailyMetric = {
            ...existingDailyMetric,
            revenue: existingDailyMetric.revenue + revenue,
            unitsRepaired: existingDailyMetric.unitsRepaired + unitsRepaired,
          };

          return aggregatedDailyMetric;
        });

        const aggregatedMonthlyMetric = {
          ...existingMonthlyMetric,
          revenue: existingMonthlyMetric.revenue + revenue,
          unitsRepaired: existingMonthlyMetric.unitsRepaired + unitsRepaired,
          dailyMetrics: aggregatedDailyRepairMetrics,
        };

        return aggregatedMonthlyMetric;
      });
      aggregatedYearlyMetric.monthlyMetrics = aggregatedMonthlyRepairMetrics;

      return aggregatedYearlyMetric;
    });

    repairMetricsAcc.yearlyMetrics = aggregatedYearlyRepairMetrics;

    return repairMetricsAcc;
  }, REPAIR_METRIC_TEMPLATE);
}

function createAllLocationsAggregatedRepairMetrics(
  businessMetrics: BusinessMetric[]
): RepairMetric[] {
  // find all repair metrics for each store location
  const initialRepairMetrics: Record<string, RepairMetric[]> = {
    edmontonRepairMetrics: [],
    calgaryRepairMetrics: [],
    vancouverRepairMetrics: [],
  };

  const { calgaryRepairMetrics, edmontonRepairMetrics, vancouverRepairMetrics } =
    businessMetrics.reduce((repairMetricsAcc, businessMetric) => {
      const { storeLocation, repairMetrics } = businessMetric;

      switch (storeLocation) {
        case "Calgary": {
          repairMetricsAcc.calgaryRepairMetrics = repairMetrics;
          break;
        }
        case "Edmonton": {
          repairMetricsAcc.edmontonRepairMetrics = structuredClone(repairMetrics);
          break;
        }
        // case "Vancouver"
        default: {
          repairMetricsAcc.vancouverRepairMetrics = repairMetrics;
          break;
        }
      }

      return repairMetricsAcc;
    }, initialRepairMetrics);

  // as edmonton metrics are a superset of all other stores' metrics, it is being used as
  // the base to which all other store locations' metrics are aggregated into

  const aggregatedBaseRepairMetrics = aggregateStoresIntoBaseRepairMetrics({
    baseRepairMetrics: edmontonRepairMetrics,
    storeRepairMetrics: calgaryRepairMetrics,
  });

  const aggregatedAllLocationsRepairMetrics = aggregateStoresIntoBaseRepairMetrics({
    baseRepairMetrics: aggregatedBaseRepairMetrics,
    storeRepairMetrics: vancouverRepairMetrics,
  });

  function aggregateStoresIntoBaseRepairMetrics({
    baseRepairMetrics,
    storeRepairMetrics,
  }: {
    baseRepairMetrics: RepairMetric[];
    storeRepairMetrics: RepairMetric[];
  }) {
    return storeRepairMetrics.reduce<RepairMetric[]>(
      (baseRepairMetricsAcc, storeRepairMetric) => {
        const { name, yearlyMetrics } = storeRepairMetric;

        // find base repair metric with the same name
        const baseRepairMetric = baseRepairMetricsAcc.find(
          (baseRepairMetric) => baseRepairMetric.name === name
        );
        if (!baseRepairMetric) {
          return baseRepairMetricsAcc;
        }

        yearlyMetrics.forEach((storeYearlyMetric) => {
          const {
            year,
            revenue: yearlyRevenue,
            unitsRepaired: yearlyUnitsRepaired,
            monthlyMetrics,
          } = storeYearlyMetric;

          // find base yearly metric with the same year
          const baseYearlyMetric = baseRepairMetric.yearlyMetrics.find(
            (baseYearlyMetric) => baseYearlyMetric.year === year
          );
          if (!baseYearlyMetric) {
            return;
          }

          baseYearlyMetric.revenue += yearlyRevenue;
          baseYearlyMetric.unitsRepaired += yearlyUnitsRepaired;

          monthlyMetrics.forEach((storeMonthlyMetric) => {
            const {
              month,
              revenue: monthlyRevenue,
              unitsRepaired: monthlyUnitsRepaired,
              dailyMetrics,
            } = storeMonthlyMetric;

            // find base monthly metric with the same month
            const baseMonthlyMetric = baseYearlyMetric.monthlyMetrics.find(
              (baseMonthlyMetric) => baseMonthlyMetric.month === month
            );
            if (!baseMonthlyMetric) {
              return;
            }

            baseMonthlyMetric.revenue += monthlyRevenue;
            baseMonthlyMetric.unitsRepaired += monthlyUnitsRepaired;

            dailyMetrics.forEach((storeDailyMetric) => {
              const { day, revenue, unitsRepaired } = storeDailyMetric;

              // find base daily metric with the same day
              const baseDailyMetric = baseMonthlyMetric.dailyMetrics.find(
                (baseDailyMetric) => baseDailyMetric.day === day
              );
              if (!baseDailyMetric) {
                return;
              }

              baseDailyMetric.revenue += revenue;
              baseDailyMetric.unitsRepaired += unitsRepaired;
            });
          });
        });

        return baseRepairMetricsAcc;
      },
      baseRepairMetrics
    );
  }

  return aggregatedAllLocationsRepairMetrics;
}

/**
 * customerMetrics: {
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
        }[]
      }
    }
  }
 */

type CreateRandomCustomerMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  storeLocation: StoreLocation;
  yearChurnRateSpread: LocationYearSpread;
  yearCustomersSpread: LocationYearSpread;
  yearNewCustomersSpread: LocationYearSpread;
};

function createRandomCustomerMetricsInput({
  daysInMonthsInYears,
  storeLocation,
  yearChurnRateSpread,
  yearCustomersSpread,
  yearNewCustomersSpread,
}: CreateRandomCustomerMetricsInput): CustomerMetrics {
  const yearlyCustomersMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
    const [year, daysInMonthsMap] = yearTuple;

    const monthlyCustomersMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
      const [month, daysRange] = monthTuple;

      const dailyCustomersMetrics = daysRange.map((day) => {
        /**
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
        }[]
        */

        const dailyTotalCustomers = createRandomNumber({
          storeLocation,
          year,
          yearUnitsSpread: yearCustomersSpread,
          defaultMax: 15,
          defaultMin: 5,
        });

        const dailyNewCustomersFraction = createRandomNumber({
          storeLocation,
          year,
          yearUnitsSpread: yearNewCustomersSpread,
          defaultMax: 0.2,
          defaultMin: 0.1,
          returnFraction: true,
        });
        const dailyNewCustomers = Math.round(
          dailyTotalCustomers * dailyNewCustomersFraction
        );

        const dailyNewCustomersRepairFraction = Math.random() * (0.15 - 0.05) + 0.05;
        const dailyNewCustomersRepair = Math.round(
          dailyNewCustomers * dailyNewCustomersRepairFraction
        );

        const dailyNewCustomersSales = dailyNewCustomers - dailyNewCustomersRepair;

        const dailyNewCustomersOnlineFraction = Math.random() * (0.9 - 0.7) + 0.7;
        const dailyNewCustomersOnline = Math.round(
          dailyNewCustomersSales * dailyNewCustomersOnlineFraction
        );

        const dailyNewCustomersInStore = dailyNewCustomersSales - dailyNewCustomersOnline;

        const dailyReturningCustomers = dailyTotalCustomers - dailyNewCustomers;

        const dailyReturningCustomersRepairFraction =
          Math.random() * (0.15 - 0.05) + 0.05;
        const dailyReturningCustomersRepair = Math.round(
          dailyReturningCustomers * dailyReturningCustomersRepairFraction
        );

        const dailyReturningCustomersSales =
          dailyReturningCustomers - dailyReturningCustomersRepair;

        const dailyReturningCustomersOnlineFraction = Math.random() * (0.9 - 0.7) + 0.7;
        const dailyReturningCustomersOnline = Math.round(
          dailyReturningCustomersSales * dailyReturningCustomersOnlineFraction
        );

        const dailyReturningCustomersInStore =
          dailyReturningCustomersSales - dailyReturningCustomersOnline;

        const dailyCustomersMetric: CustomerDailyMetric = {
          day,
          customers: {
            total: dailyTotalCustomers,
            new: {
              total: dailyNewCustomers,
              sales: {
                total: dailyNewCustomersSales,
                online: dailyNewCustomersOnline,
                inStore: dailyNewCustomersInStore,
              },
              repair: dailyNewCustomersRepair,
            },
            returning: {
              total: dailyReturningCustomers,
              sales: {
                total: dailyReturningCustomersSales,
                online: dailyReturningCustomersOnline,
                inStore: dailyReturningCustomersInStore,
              },
              repair: dailyReturningCustomersRepair,
            },
          },
        };

        return dailyCustomersMetric;
      });

      const initialMonthlyCustomersMetrics: CustomerMonthlyMetric = {
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
        dailyMetrics: dailyCustomersMetrics,
      };

      const monthlyCustomersMetrics = dailyCustomersMetrics.reduce(
        (monthlyCustomersMetricsAcc, dailyCustomersMetric) => {
          monthlyCustomersMetricsAcc.customers.total +=
            dailyCustomersMetric.customers.total;

          monthlyCustomersMetricsAcc.customers.new.total +=
            dailyCustomersMetric.customers.new.total;
          monthlyCustomersMetricsAcc.customers.new.repair +=
            dailyCustomersMetric.customers.new.repair;
          monthlyCustomersMetricsAcc.customers.new.sales.total +=
            dailyCustomersMetric.customers.new.sales.total;
          monthlyCustomersMetricsAcc.customers.new.sales.online +=
            dailyCustomersMetric.customers.new.sales.online;
          monthlyCustomersMetricsAcc.customers.new.sales.inStore +=
            dailyCustomersMetric.customers.new.sales.inStore;

          monthlyCustomersMetricsAcc.customers.returning.total +=
            dailyCustomersMetric.customers.returning.total;
          monthlyCustomersMetricsAcc.customers.returning.repair +=
            dailyCustomersMetric.customers.returning.repair;
          monthlyCustomersMetricsAcc.customers.returning.sales.total +=
            dailyCustomersMetric.customers.returning.sales.total;
          monthlyCustomersMetricsAcc.customers.returning.sales.online +=
            dailyCustomersMetric.customers.returning.sales.online;
          monthlyCustomersMetricsAcc.customers.returning.sales.inStore +=
            dailyCustomersMetric.customers.returning.sales.inStore;

          return monthlyCustomersMetricsAcc;
        },
        initialMonthlyCustomersMetrics
      );

      const monthlyCustomersChurnRate = createRandomNumber({
        storeLocation,
        year,
        yearUnitsSpread: yearChurnRateSpread,
        defaultMax: 0.3,
        defaultMin: 0.1,
      });
      monthlyCustomersMetrics.customers.churnRate = monthlyCustomersChurnRate;

      const monthlyCustomersRetentionRate = 1 - monthlyCustomersChurnRate;
      monthlyCustomersMetrics.customers.retentionRate = monthlyCustomersRetentionRate;

      return monthlyCustomersMetrics;
    });

    const initialYearlyCustomersMetrics: CustomerYearlyMetric = {
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
      monthlyMetrics: monthlyCustomersMetrics,
    };

    const yearlyCustomersMetrics = monthlyCustomersMetrics.reduce(
      (yearlyCustomersMetricsAcc, monthlyCustomersMetric) => {
        yearlyCustomersMetricsAcc.customers.total +=
          monthlyCustomersMetric.customers.total;

        yearlyCustomersMetricsAcc.customers.new.total +=
          monthlyCustomersMetric.customers.new.total;
        yearlyCustomersMetricsAcc.customers.new.repair +=
          monthlyCustomersMetric.customers.new.repair;
        yearlyCustomersMetricsAcc.customers.new.sales.total +=
          monthlyCustomersMetric.customers.new.sales.total;
        yearlyCustomersMetricsAcc.customers.new.sales.online +=
          monthlyCustomersMetric.customers.new.sales.online;
        yearlyCustomersMetricsAcc.customers.new.sales.inStore +=
          monthlyCustomersMetric.customers.new.sales.inStore;

        yearlyCustomersMetricsAcc.customers.returning.total +=
          monthlyCustomersMetric.customers.returning.total;
        yearlyCustomersMetricsAcc.customers.returning.repair +=
          monthlyCustomersMetric.customers.returning.repair;
        yearlyCustomersMetricsAcc.customers.returning.sales.total +=
          monthlyCustomersMetric.customers.returning.sales.total;
        yearlyCustomersMetricsAcc.customers.returning.sales.online +=
          monthlyCustomersMetric.customers.returning.sales.online;
        yearlyCustomersMetricsAcc.customers.returning.sales.inStore +=
          monthlyCustomersMetric.customers.returning.sales.inStore;
        return yearlyCustomersMetricsAcc;
      },
      initialYearlyCustomersMetrics
    );

    const yearlyCustomersChurnRate = monthlyCustomersMetrics.reduce(
      (yearlyCustomersChurnRateAcc, monthlyCustomersMetric) =>
        (yearlyCustomersChurnRateAcc += monthlyCustomersMetric.customers.churnRate),
      0
    );
    yearlyCustomersMetrics.customers.churnRate = yearlyCustomersChurnRate;

    const yearlyCustomersRetentionRate = 1 - yearlyCustomersChurnRate;
    yearlyCustomersMetrics.customers.retentionRate = yearlyCustomersRetentionRate;

    return yearlyCustomersMetrics;
  });

  const randomCustomerLifetimeValue = Math.round(Math.random() * (2000 - 1000) + 1000);
  const randomCustomerTotalCustomers = yearlyCustomersMetrics.reduce(
    (totalCustomersAcc, yearlyCustomersMetric) =>
      (totalCustomersAcc += yearlyCustomersMetric.customers.total),
    0
  );

  const randomCustomerMetrics: CustomerMetrics = {
    totalCustomers: randomCustomerTotalCustomers,
    lifetimeValue: randomCustomerLifetimeValue,
    yearlyMetrics: yearlyCustomersMetrics,
  };

  return randomCustomerMetrics;
}

function createAllLocationsAggregatedCustomerMetrics(businessMetrics: BusinessMetric[]) {
  // find all customer metrics for each store location
  const initialCustomerMetrics: Record<string, CustomerMetrics> = {
    edmontonCustomerMetrics: {
      lifetimeValue: 0,
      totalCustomers: 0,
      yearlyMetrics: [],
    },
    calgaryCustomerMetrics: {
      lifetimeValue: 0,
      totalCustomers: 0,
      yearlyMetrics: [],
    },
    vancouverCustomerMetrics: {
      lifetimeValue: 0,
      totalCustomers: 0,
      yearlyMetrics: [],
    },
  };

  const { calgaryCustomerMetrics, edmontonCustomerMetrics, vancouverCustomerMetrics } =
    businessMetrics.reduce((customerMetricsAcc, businessMetric) => {
      const { storeLocation, customerMetrics } = businessMetric;

      switch (storeLocation) {
        case "Calgary": {
          customerMetricsAcc.calgaryCustomerMetrics = customerMetrics;
          break;
        }
        case "Edmonton": {
          customerMetricsAcc.edmontonCustomerMetrics = structuredClone(customerMetrics);
          break;
        }
        // case "Vancouver"
        default: {
          customerMetricsAcc.vancouverCustomerMetrics = customerMetrics;
          break;
        }
      }

      return customerMetricsAcc;
    }, initialCustomerMetrics);

  // as edmonton metrics are a superset of all other stores' metrics, it is being used as
  // the base to which all other store locations' metrics are aggregated into

  const aggregatedBaseCustomerMetrics = aggregateStoresIntoBaseCustomerMetrics({
    baseCustomerMetrics: edmontonCustomerMetrics,
    storeCustomerMetrics: calgaryCustomerMetrics,
  });

  const aggregatedAllLocationsCustomerMetrics = aggregateStoresIntoBaseCustomerMetrics({
    baseCustomerMetrics: aggregatedBaseCustomerMetrics,
    storeCustomerMetrics: vancouverCustomerMetrics,
  });

  function aggregateStoresIntoBaseCustomerMetrics({
    baseCustomerMetrics,
    storeCustomerMetrics,
  }: {
    baseCustomerMetrics: CustomerMetrics;
    storeCustomerMetrics: CustomerMetrics;
  }) {
    const { lifetimeValue, totalCustomers, yearlyMetrics } = storeCustomerMetrics;

    baseCustomerMetrics.lifetimeValue =
      (baseCustomerMetrics.lifetimeValue + lifetimeValue) / 2;
    baseCustomerMetrics.totalCustomers += totalCustomers;

    return yearlyMetrics.reduce<CustomerMetrics>(
      (baseCustomerMetricsAcc, storeCustomerMetric) => {
        const { year, customers, monthlyMetrics } = storeCustomerMetric;
        const {
          total,
          new: newCustomers,
          returning: returningCustomers,
          churnRate,
          retentionRate,
        } = customers;

        // find base yearly metric with the same year
        const baseYearlyMetric = baseCustomerMetricsAcc.yearlyMetrics.find(
          (baseYearlyMetric) => baseYearlyMetric.year === year
        );
        if (!baseYearlyMetric) {
          return baseCustomerMetricsAcc;
        }

        baseYearlyMetric.customers.total += total;
        baseYearlyMetric.customers.new.total += newCustomers.total;
        baseYearlyMetric.customers.new.repair += newCustomers.repair;
        baseYearlyMetric.customers.new.sales.total += newCustomers.sales.total;
        baseYearlyMetric.customers.new.sales.online += newCustomers.sales.online;
        baseYearlyMetric.customers.new.sales.inStore += newCustomers.sales.inStore;

        baseYearlyMetric.customers.returning.total += returningCustomers.total;
        baseYearlyMetric.customers.returning.repair += returningCustomers.repair;
        baseYearlyMetric.customers.returning.sales.total +=
          returningCustomers.sales.total;
        baseYearlyMetric.customers.returning.sales.online +=
          returningCustomers.sales.online;
        baseYearlyMetric.customers.returning.sales.inStore +=
          returningCustomers.sales.inStore;

        baseYearlyMetric.customers.churnRate =
          (baseYearlyMetric.customers.churnRate + churnRate) / 2;
        baseYearlyMetric.customers.retentionRate =
          (baseYearlyMetric.customers.retentionRate + retentionRate) / 2;

        monthlyMetrics.forEach((storeMonthlyMetric) => {
          const { month, customers, dailyMetrics } = storeMonthlyMetric;
          const {
            total,
            new: newCustomers,
            returning: returningCustomers,
            churnRate,
            retentionRate,
          } = customers;

          // find base monthly metric with the same month
          const baseMonthlyMetric = baseYearlyMetric.monthlyMetrics.find(
            (baseMonthlyMetric) => baseMonthlyMetric.month === month
          );
          if (!baseMonthlyMetric) {
            return;
          }

          baseMonthlyMetric.customers.total += total;
          baseMonthlyMetric.customers.new.total += newCustomers.total;
          baseMonthlyMetric.customers.new.repair += newCustomers.repair;
          baseMonthlyMetric.customers.new.sales.total += newCustomers.sales.total;
          baseMonthlyMetric.customers.new.sales.online += newCustomers.sales.online;
          baseMonthlyMetric.customers.new.sales.inStore += newCustomers.sales.inStore;

          baseMonthlyMetric.customers.returning.total += returningCustomers.total;
          baseMonthlyMetric.customers.returning.repair += returningCustomers.repair;
          baseMonthlyMetric.customers.returning.sales.total +=
            returningCustomers.sales.total;
          baseMonthlyMetric.customers.returning.sales.online +=
            returningCustomers.sales.online;
          baseMonthlyMetric.customers.returning.sales.inStore +=
            returningCustomers.sales.inStore;

          baseMonthlyMetric.customers.churnRate =
            (baseMonthlyMetric.customers.churnRate + churnRate) / 2;
          baseMonthlyMetric.customers.retentionRate =
            (baseMonthlyMetric.customers.retentionRate + retentionRate) / 2;

          dailyMetrics.forEach((storeDailyMetric) => {
            const { day, customers } = storeDailyMetric;
            const { total, new: newCustomers, returning: returningCustomers } = customers;

            // find base daily metric with the same day
            const baseDailyMetric = baseMonthlyMetric.dailyMetrics.find(
              (baseDailyMetric) => baseDailyMetric.day === day
            );
            if (!baseDailyMetric) {
              return;
            }

            baseDailyMetric.customers.total += total;
            baseDailyMetric.customers.new.total += newCustomers.total;
            baseDailyMetric.customers.new.repair += newCustomers.repair;
            baseDailyMetric.customers.new.sales.total += newCustomers.sales.total;
            baseDailyMetric.customers.new.sales.online += newCustomers.sales.online;
            baseDailyMetric.customers.new.sales.inStore += newCustomers.sales.inStore;

            baseDailyMetric.customers.returning.total += returningCustomers.total;
            baseDailyMetric.customers.returning.repair += returningCustomers.repair;
            baseDailyMetric.customers.returning.sales.total +=
              returningCustomers.sales.total;
            baseDailyMetric.customers.returning.sales.online +=
              returningCustomers.sales.online;
            baseDailyMetric.customers.returning.sales.inStore +=
              returningCustomers.sales.inStore;
          });
        });

        return baseCustomerMetricsAcc;
      },
      baseCustomerMetrics
    );
  }

  return aggregatedAllLocationsCustomerMetrics;
}

/**
 * financialMetrics: {
    year: Year;
    averageOrderValue: number;
    conversionRate: number;
    netProfitMargin: number;

    expenses: {
      total: number;
      repair: number;
      sales: {
        total: number;
        inStore: number;
        online: number;
      };
    };

    profit: {
      total: number;
      repair: number;
      sales: {
        total: number;
        inStore: number;
        online: number;
      };
    };

    revenue: {
      total: number;
      repair: number;
      sales: {
        total: number;
        inStore: number;
        online: number;
      };
    };

    transactions: {
      total: number;
      repair: number;
      sales: {
        total: number;
        inStore: number;
        online: number;
      };
    };

    monthlyMetrics: {
      month: Month;
      averageOrderValue: number;
      conversionRate: number;
      netProfitMargin: number;

      expenses: {
        total: number;
        repair: number;
        sales: {
          total: number;
          inStore: number;
          online: number;
        };
      };
    
      profit: {
        total: number;
        repair: number;
        sales: {
          total: number;
          inStore: number;
          online: number;
        };
      };
    
      revenue: {
        total: number;
        repair: number;
        sales: {
          total: number;
          inStore: number;
          online: number;
        };
      };
    
      transactions: {
        total: number;
        repair: number;
        sales: {
          total: number;
          inStore: number;
          online: number;
        };
      };          

      dailyMetrics: {
        day: string;
        averageOrderValue: number;
        conversionRate: number;
        netProfitMargin: number;
      
        // generated
        expenses: {
          total: number;
          repair: number;
          sales: {
            total: number;
            inStore: number;
            online: number;
          };
        };
      
        // calculated from expenses and revenue
        profit: {
          total: number;
          repair: number;
          sales: {
            total: number;
            inStore: number;
            online: number;
          };
        };
      
        // aggregated from metrics
        revenue: {
          total: number;
          repair: number;
          sales: {
            total: number;
            inStore: number;
            online: number;
          };
        };
      
        // aggregated from metrics
        transactions: {
          total: number;
          repair: number;
          sales: {
            total: number;
            inStore: number;
            online: number;
          };
        };                     
      }[];
    }[];
  }[];
 */

type CreateRandomFinancialMetricsInput = {
  businessMetrics: BusinessMetric[];
  daysInMonthsInYears: DaysInMonthsInYears;
  storeLocations: StoreLocation[];
  yearConversionRateSpread: LocationYearSpread;
  yearOnlineExpensesSpread: LocationYearSpread;
  yearOnlineProfitSpread: LocationYearSpread;
  yearOnlineTransactionsSpread: LocationYearSpread;
  yearProfitMarginSpread: LocationYearSpread;
  yearRepairExpensesSpread: LocationYearSpread;
  yearRepairProfitSpread: LocationYearSpread;
};

function createRandomFinancialMetrics({
  businessMetrics,
  daysInMonthsInYears,
  storeLocations,
  yearConversionRateSpread,
  yearOnlineExpensesSpread,
  yearOnlineProfitSpread,
  yearOnlineTransactionsSpread,
  yearProfitMarginSpread,
  yearRepairExpensesSpread,
  yearRepairProfitSpread,
}: CreateRandomFinancialMetricsInput): YearlyFinancialMetric[][] {
  const YEARLY_FINANCIAL_METRICS_TEMPLATE: YearlyFinancialMetric = {
    year: "2013",
    averageOrderValue: 0,
    conversionRate: 0,
    netProfitMargin: 0,

    expenses: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    profit: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    revenue: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    transactions: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    monthlyMetrics: [],
  };

  const MONTHLY_FINANCIAL_METRICS_TEMPLATE: MonthlyFinancialMetric = {
    month: "January",
    averageOrderValue: 0,
    conversionRate: 0,
    netProfitMargin: 0,

    expenses: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    profit: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    revenue: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    transactions: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    dailyMetrics: [],
  };

  const DAILY_FINANCIAL_METRICS_TEMPLATE: DailyFinancialMetric = {
    day: "2021-01-01",
    averageOrderValue: 0,
    conversionRate: 0,
    netProfitMargin: 0,

    expenses: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    profit: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    revenue: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },

    transactions: {
      total: 0,
      repair: 0,
      sales: {
        total: 0,
        online: 0,
        inStore: 0,
      },
    },
  };

  return storeLocations.map((storeLocation) => {
    // for this store location, find the created product and repair metrics
    const businessMetric = businessMetrics.find(
      (businessMetric) => businessMetric.storeLocation === storeLocation
    );
    if (!businessMetric) {
      return [];
    }

    const { productMetrics, repairMetrics } = businessMetric;

    // 'All Products' category in productMetrics is already aggregated from other product categories
    const allProductsCategory = productMetrics.find(
      (productMetric) => productMetric.name === "All Products"
    );
    // 'All Repairs' category in repairMetrics is already aggregated from other repair categories
    const allRepairsCategory = repairMetrics.find(
      (repairMetric) => repairMetric.name === "All Repairs"
    );
    if (!allProductsCategory || !allRepairsCategory) {
      return [];
    }

    const yearlyFinancialMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
      const [year, daysInMonthsMap] = yearTuple;

      // for each year, find the product and repair metrics
      const yearlyProductMetrics = allProductsCategory.yearlyMetrics.find(
        (yearlyProductMetric) => yearlyProductMetric.year === year
      );
      const yearlyRepairMetrics = allRepairsCategory.yearlyMetrics.find(
        (yearlyRepairMetric) => yearlyRepairMetric.year === year
      );
      if (!yearlyProductMetrics || !yearlyRepairMetrics) {
        return YEARLY_FINANCIAL_METRICS_TEMPLATE;
      }

      const monthlyFinancialMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
        const [month, daysRange] = monthTuple;

        // for each month, find the product and repair metrics
        const monthlyProductMetrics = yearlyProductMetrics.monthlyMetrics.find(
          (monthlyProductMetric) => monthlyProductMetric.month === month
        );
        const monthlyRepairMetrics = yearlyRepairMetrics.monthlyMetrics.find(
          (monthlyRepairMetric) => monthlyRepairMetric.month === month
        );
        if (!monthlyProductMetrics || !monthlyRepairMetrics) {
          return MONTHLY_FINANCIAL_METRICS_TEMPLATE;
        }

        const dailyFinancialMetrics = daysRange.map((day) => {
          // for each day, find the product and repair metrics
          const dailyProductMetrics = monthlyProductMetrics.dailyMetrics.find(
            (dailyProductMetric) => dailyProductMetric.day === day
          );
          const dailyRepairMetrics = monthlyRepairMetrics.dailyMetrics.find(
            (dailyRepairMetric) => dailyRepairMetric.day === day
          );
          if (!dailyProductMetrics || !dailyRepairMetrics) {
            return DAILY_FINANCIAL_METRICS_TEMPLATE;
          }

          // aggregate transactions from product and repair metrics
          const dailyTransactions: FinancialMetricCategory = {
            total: dailyProductMetrics.unitsSold.total + dailyRepairMetrics.unitsRepaired,
            repair: dailyRepairMetrics.unitsRepaired,
            sales: {
              total: dailyProductMetrics.unitsSold.total,
              inStore: dailyProductMetrics.unitsSold.inStore,
              online: dailyProductMetrics.unitsSold.online,
            },
          };

          // aggregate revenue from product and repair metrics
          const dailyRevenue: FinancialMetricCategory = {
            total: dailyProductMetrics.revenue.total + dailyRepairMetrics.revenue,
            repair: dailyRepairMetrics.revenue,
            sales: {
              total: dailyProductMetrics.revenue.total,
              inStore: dailyProductMetrics.revenue.inStore,
              online: dailyProductMetrics.revenue.inStore,
            },
          };

          const dailyAverageOrderValue = Math.round(
            dailyRevenue.total / dailyTransactions.total
          );

          let dailyConversionRate = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearConversionRateSpread,
            defaultMax: 0.03,
            defaultMin: 0.01,
          });
          dailyConversionRate = returnToFixedFloat(dailyConversionRate);

          // generate expenses to calculate profit

          const dailyNetProfitMargin = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearProfitMarginSpread,
            defaultMax: 0.3,
            defaultMin: 0.1,
            returnFraction: true,
          });

          const dailyProfit = Math.round(dailyRevenue.total * dailyNetProfitMargin);

          const dailyRepairProfitFraction = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearRepairProfitSpread,
            defaultMax: 0.3,
            defaultMin: 0.1,
            returnFraction: true,
          });
          const dailyRepairProfit = Math.round(dailyRepairProfitFraction * dailyProfit);

          const dailySalesProfit = Math.round(dailyProfit - dailyRepairProfit);

          const dailyOnlineProfitFraction = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearOnlineProfitSpread,
            defaultMax: 0.03,
            defaultMin: 0.01,
            returnFraction: true,
          });
          const dailyOnlineProfit = Math.round(
            dailySalesProfit * dailyOnlineProfitFraction
          );

          const dailyInStoreProfit = dailySalesProfit - dailyOnlineProfit;

          const dailyProfits: FinancialMetricCategory = {
            total: dailyProfit,
            repair: dailyRepairProfit,
            sales: {
              total: dailySalesProfit,
              inStore: dailyInStoreProfit,
              online: dailyOnlineProfit,
            },
          };

          const dailyExpense = Math.round(dailyRevenue.total - dailyProfit);

          const dailyRepairExpenseFraction = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearRepairExpensesSpread,
            defaultMax: 0.3,
            defaultMin: 0.1,
            returnFraction: true,
          });
          const dailyRepairExpense = Math.round(
            dailyRepairExpenseFraction * dailyExpense
          );

          const dailySalesExpense = dailyExpense - dailyRepairExpense;

          const dailyOnlineExpenseFraction = createRandomNumber({
            storeLocation,
            year,
            yearUnitsSpread: yearOnlineExpensesSpread,
            defaultMax: 0.03,
            defaultMin: 0.01,
            returnFraction: true,
          });
          const dailyOnlineExpense = Math.round(
            dailySalesExpense * dailyOnlineExpenseFraction
          );

          const dailyInStoreExpense = dailySalesExpense - dailyOnlineExpense;

          const dailyExpenses: FinancialMetricCategory = {
            total: dailyExpense,
            repair: dailyRepairExpense,
            sales: {
              total: dailySalesExpense,
              inStore: dailyInStoreExpense,
              online: dailyOnlineExpense,
            },
          };

          const dailyFinancialMetric: DailyFinancialMetric = {
            day,
            averageOrderValue: dailyAverageOrderValue,
            conversionRate: dailyConversionRate,
            netProfitMargin: dailyNetProfitMargin,
            expenses: dailyExpenses,
            profit: dailyProfits,
            revenue: dailyRevenue,
            transactions: dailyTransactions,
          };

          return dailyFinancialMetric;
        });

        // aggregate created daily financial metrics into monthly financial metrics

        const monthlyFinancialMetric =
          dailyFinancialMetrics.reduce<MonthlyFinancialMetric>(
            (monthlyFinancialMetricAcc, dailyFinancialMetric) => {
              monthlyFinancialMetricAcc.averageOrderValue +=
                dailyFinancialMetric.averageOrderValue;
              monthlyFinancialMetricAcc.conversionRate +=
                dailyFinancialMetric.conversionRate;
              monthlyFinancialMetricAcc.netProfitMargin +=
                dailyFinancialMetric.netProfitMargin;

              monthlyFinancialMetricAcc.expenses.total +=
                dailyFinancialMetric.expenses.total;
              monthlyFinancialMetricAcc.expenses.repair +=
                dailyFinancialMetric.expenses.repair;
              monthlyFinancialMetricAcc.expenses.sales.total +=
                dailyFinancialMetric.expenses.sales.total;
              monthlyFinancialMetricAcc.expenses.sales.inStore +=
                dailyFinancialMetric.expenses.sales.inStore;
              monthlyFinancialMetricAcc.expenses.sales.online +=
                dailyFinancialMetric.expenses.sales.online;

              monthlyFinancialMetricAcc.profit.total += dailyFinancialMetric.profit.total;
              monthlyFinancialMetricAcc.profit.repair +=
                dailyFinancialMetric.profit.repair;
              monthlyFinancialMetricAcc.profit.sales.total +=
                dailyFinancialMetric.profit.sales.total;
              monthlyFinancialMetricAcc.profit.sales.inStore +=
                dailyFinancialMetric.profit.sales.inStore;
              monthlyFinancialMetricAcc.profit.sales.online +=
                dailyFinancialMetric.profit.sales.online;

              monthlyFinancialMetricAcc.revenue.total +=
                dailyFinancialMetric.revenue.total;
              monthlyFinancialMetricAcc.revenue.repair +=
                dailyFinancialMetric.revenue.repair;
              monthlyFinancialMetricAcc.revenue.sales.total +=
                dailyFinancialMetric.revenue.sales.total;
              monthlyFinancialMetricAcc.revenue.sales.inStore +=
                dailyFinancialMetric.revenue.sales.inStore;
              monthlyFinancialMetricAcc.revenue.sales.online +=
                dailyFinancialMetric.revenue.sales.online;

              monthlyFinancialMetricAcc.transactions.total +=
                dailyFinancialMetric.transactions.total;
              monthlyFinancialMetricAcc.transactions.repair +=
                dailyFinancialMetric.transactions.repair;
              monthlyFinancialMetricAcc.transactions.sales.total +=
                dailyFinancialMetric.transactions.sales.total;
              monthlyFinancialMetricAcc.transactions.sales.inStore +=
                dailyFinancialMetric.transactions.sales.inStore;
              monthlyFinancialMetricAcc.transactions.sales.online +=
                dailyFinancialMetric.transactions.sales.online;

              return monthlyFinancialMetricAcc;
            },
            structuredClone(MONTHLY_FINANCIAL_METRICS_TEMPLATE)
          );

        monthlyFinancialMetric.averageOrderValue = returnToFixedFloat(
          monthlyFinancialMetric.averageOrderValue / dailyFinancialMetrics.length
        );
        monthlyFinancialMetric.conversionRate = returnToFixedFloat(
          monthlyFinancialMetric.conversionRate / dailyFinancialMetrics.length
        );
        monthlyFinancialMetric.netProfitMargin = returnToFixedFloat(
          monthlyFinancialMetric.netProfitMargin / dailyFinancialMetrics.length
        );

        return monthlyFinancialMetric;
      });

      // aggregate created monthly financial metrics into yearly financial metrics

      const yearlyFinancialMetric = monthlyFinancialMetrics.reduce<YearlyFinancialMetric>(
        (yearlyFinancialMetricAcc, monthlyFinancialMetric) => {
          yearlyFinancialMetricAcc.averageOrderValue +=
            monthlyFinancialMetric.averageOrderValue;
          yearlyFinancialMetricAcc.conversionRate +=
            monthlyFinancialMetric.conversionRate;
          yearlyFinancialMetricAcc.netProfitMargin +=
            monthlyFinancialMetric.netProfitMargin;

          yearlyFinancialMetricAcc.expenses.total +=
            monthlyFinancialMetric.expenses.total;
          yearlyFinancialMetricAcc.expenses.repair +=
            monthlyFinancialMetric.expenses.repair;
          yearlyFinancialMetricAcc.expenses.sales.total +=
            monthlyFinancialMetric.expenses.sales.total;
          yearlyFinancialMetricAcc.expenses.sales.inStore +=
            monthlyFinancialMetric.expenses.sales.inStore;
          yearlyFinancialMetricAcc.expenses.sales.online +=
            monthlyFinancialMetric.expenses.sales.online;

          yearlyFinancialMetricAcc.profit.total += monthlyFinancialMetric.profit.total;
          yearlyFinancialMetricAcc.profit.repair += monthlyFinancialMetric.profit.repair;
          yearlyFinancialMetricAcc.profit.sales.total +=
            monthlyFinancialMetric.profit.sales.total;
          yearlyFinancialMetricAcc.profit.sales.inStore +=
            monthlyFinancialMetric.profit.sales.inStore;
          yearlyFinancialMetricAcc.profit.sales.online +=
            monthlyFinancialMetric.profit.sales.online;

          yearlyFinancialMetricAcc.revenue.total += monthlyFinancialMetric.revenue.total;
          yearlyFinancialMetricAcc.revenue.repair +=
            monthlyFinancialMetric.revenue.repair;
          yearlyFinancialMetricAcc.revenue.sales.total +=
            monthlyFinancialMetric.revenue.sales.total;
          yearlyFinancialMetricAcc.revenue.sales.inStore +=
            monthlyFinancialMetric.revenue.sales.inStore;
          yearlyFinancialMetricAcc.revenue.sales.online +=
            monthlyFinancialMetric.revenue.sales.online;

          yearlyFinancialMetricAcc.transactions.total +=
            monthlyFinancialMetric.transactions.total;
          yearlyFinancialMetricAcc.transactions.repair +=
            monthlyFinancialMetric.transactions.repair;
          yearlyFinancialMetricAcc.transactions.sales.total +=
            monthlyFinancialMetric.transactions.sales.total;
          yearlyFinancialMetricAcc.transactions.sales.inStore +=
            monthlyFinancialMetric.transactions.sales.inStore;
          yearlyFinancialMetricAcc.transactions.sales.online +=
            monthlyFinancialMetric.transactions.sales.online;

          return yearlyFinancialMetricAcc;
        },
        structuredClone(YEARLY_FINANCIAL_METRICS_TEMPLATE)
      );

      yearlyFinancialMetric.averageOrderValue = returnToFixedFloat(
        yearlyFinancialMetric.averageOrderValue / monthlyFinancialMetrics.length
      );
      yearlyFinancialMetric.conversionRate = returnToFixedFloat(
        yearlyFinancialMetric.conversionRate / monthlyFinancialMetrics.length
      );
      yearlyFinancialMetric.netProfitMargin = returnToFixedFloat(
        yearlyFinancialMetric.netProfitMargin / monthlyFinancialMetrics.length
      );

      return yearlyFinancialMetric;
    });

    return yearlyFinancialMetrics;
  });
}

function createAllLocationsAggregatedFinancialMetrics(
  businessMetrics: BusinessMetric[]
): YearlyFinancialMetric[] {
  // find all financial metrics for each store location
  const initialFinancialMetrics: Record<string, YearlyFinancialMetric[]> = {
    edmontonFinancialMetrics: [],
    calgaryFinancialMetrics: [],
    vancouverFinancialMetrics: [],
  };

  const { calgaryFinancialMetrics, edmontonFinancialMetrics, vancouverFinancialMetrics } =
    businessMetrics.reduce((financialMetricsAcc, businessMetric) => {
      const { storeLocation, financialMetrics } = businessMetric;

      switch (storeLocation) {
        case "Calgary": {
          financialMetricsAcc.calgaryFinancialMetrics = financialMetrics;
          break;
        }
        case "Edmonton": {
          financialMetricsAcc.edmontonFinancialMetrics =
            structuredClone(financialMetrics);
          break;
        }
        // case "Vancouver"
        default: {
          financialMetricsAcc.vancouverFinancialMetrics = financialMetrics;
          break;
        }
      }

      return financialMetricsAcc;
    }, initialFinancialMetrics);

  // as edmonton metrics are a superset of all other stores' metrics, it is being used as
  // the base to which all other store locations' metrics are aggregated into

  const aggregatedBaseFinancialMetrics = aggregateStoresIntoBaseFinancialMetrics({
    baseFinancialMetrics: edmontonFinancialMetrics,
    storeFinancialMetrics: calgaryFinancialMetrics,
  });

  const aggregatedAllLocationsFinancialMetrics = aggregateStoresIntoBaseFinancialMetrics({
    baseFinancialMetrics: aggregatedBaseFinancialMetrics,
    storeFinancialMetrics: vancouverFinancialMetrics,
  });

  function aggregateStoresIntoBaseFinancialMetrics({
    baseFinancialMetrics,
    storeFinancialMetrics,
  }: {
    baseFinancialMetrics: YearlyFinancialMetric[];
    storeFinancialMetrics: YearlyFinancialMetric[];
  }) {
    return storeFinancialMetrics.reduce<YearlyFinancialMetric[]>(
      (baseFinancialMetricsAcc, storeFinancialMetric) => {
        const {
          year,
          averageOrderValue,
          conversionRate,
          netProfitMargin,
          expenses,
          monthlyMetrics,
          profit,
          revenue,
          transactions,
        } = storeFinancialMetric;

        // find base yearly metric with the same year
        const baseYearlyMetric = baseFinancialMetricsAcc.find(
          (baseYearlyMetric) => baseYearlyMetric.year === year
        );
        if (!baseYearlyMetric) {
          return baseFinancialMetricsAcc;
        }

        baseYearlyMetric.averageOrderValue =
          (baseYearlyMetric.averageOrderValue + averageOrderValue) / 2;
        baseYearlyMetric.conversionRate =
          (baseYearlyMetric.conversionRate + conversionRate) / 2;
        baseYearlyMetric.netProfitMargin =
          (baseYearlyMetric.netProfitMargin + netProfitMargin) / 2;

        baseYearlyMetric.expenses.total += expenses.total;
        baseYearlyMetric.expenses.repair += expenses.repair;
        baseYearlyMetric.expenses.sales.total += expenses.sales.total;
        baseYearlyMetric.expenses.sales.inStore += expenses.sales.inStore;
        baseYearlyMetric.expenses.sales.online += expenses.sales.online;

        baseYearlyMetric.profit.total += profit.total;
        baseYearlyMetric.profit.repair += profit.repair;
        baseYearlyMetric.profit.sales.total += profit.sales.total;
        baseYearlyMetric.profit.sales.inStore += profit.sales.inStore;
        baseYearlyMetric.profit.sales.online += profit.sales.online;

        baseYearlyMetric.revenue.total += revenue.total;
        baseYearlyMetric.revenue.repair += revenue.repair;
        baseYearlyMetric.revenue.sales.total += revenue.sales.total;
        baseYearlyMetric.revenue.sales.inStore += revenue.sales.inStore;
        baseYearlyMetric.revenue.sales.online += revenue.sales.online;

        baseYearlyMetric.transactions.total += transactions.total;
        baseYearlyMetric.transactions.repair += transactions.repair;
        baseYearlyMetric.transactions.sales.total += transactions.sales.total;
        baseYearlyMetric.transactions.sales.inStore += transactions.sales.inStore;
        baseYearlyMetric.transactions.sales.online += transactions.sales.online;

        monthlyMetrics.forEach((storeMonthlyMetric) => {
          const {
            month,
            averageOrderValue,
            conversionRate,
            netProfitMargin,
            expenses,
            profit,
            revenue,
            transactions,
            dailyMetrics,
          } = storeMonthlyMetric;

          // find base monthly metric with the same month
          const baseMonthlyMetric = baseYearlyMetric.monthlyMetrics.find(
            (baseMonthlyMetric) => baseMonthlyMetric.month === month
          );
          if (!baseMonthlyMetric) {
            return;
          }

          baseMonthlyMetric.averageOrderValue +=
            (baseMonthlyMetric.averageOrderValue + averageOrderValue) / 2;
          baseMonthlyMetric.conversionRate +=
            (baseMonthlyMetric.conversionRate + conversionRate) / 2;
          baseMonthlyMetric.netProfitMargin +=
            (baseMonthlyMetric.netProfitMargin + netProfitMargin) / 2;

          baseMonthlyMetric.expenses.total += expenses.total;
          baseMonthlyMetric.expenses.repair += expenses.repair;
          baseMonthlyMetric.expenses.sales.total += expenses.sales.total;
          baseMonthlyMetric.expenses.sales.inStore += expenses.sales.inStore;
          baseMonthlyMetric.expenses.sales.online += expenses.sales.online;

          baseMonthlyMetric.profit.total += profit.total;
          baseMonthlyMetric.profit.repair += profit.repair;
          baseMonthlyMetric.profit.sales.total += profit.sales.total;
          baseMonthlyMetric.profit.sales.inStore += profit.sales.inStore;
          baseMonthlyMetric.profit.sales.online += profit.sales.online;

          baseMonthlyMetric.revenue.total += revenue.total;
          baseMonthlyMetric.revenue.repair += revenue.repair;
          baseMonthlyMetric.revenue.sales.total += revenue.sales.total;
          baseMonthlyMetric.revenue.sales.inStore += revenue.sales.inStore;
          baseMonthlyMetric.revenue.sales.online += revenue.sales.online;

          baseMonthlyMetric.transactions.total += transactions.total;
          baseMonthlyMetric.transactions.repair += transactions.repair;
          baseMonthlyMetric.transactions.sales.total += transactions.sales.total;
          baseMonthlyMetric.transactions.sales.inStore += transactions.sales.inStore;
          baseMonthlyMetric.transactions.sales.online += transactions.sales.online;

          dailyMetrics.forEach((storeDailyMetric) => {
            const {
              day,
              averageOrderValue,
              conversionRate,
              netProfitMargin,
              expenses,
              profit,
              revenue,
              transactions,
            } = storeDailyMetric;

            // find base daily metric with the same day
            const baseDailyMetric = baseMonthlyMetric.dailyMetrics.find(
              (baseDailyMetric) => baseDailyMetric.day === day
            );
            if (!baseDailyMetric) {
              return;
            }

            baseDailyMetric.averageOrderValue +=
              (baseDailyMetric.averageOrderValue + averageOrderValue) / 2;
            baseDailyMetric.conversionRate +=
              (baseDailyMetric.conversionRate + conversionRate) / 2;
            baseDailyMetric.netProfitMargin +=
              (baseDailyMetric.netProfitMargin + netProfitMargin) / 2;

            baseDailyMetric.expenses.total += expenses.total;
            baseDailyMetric.expenses.repair += expenses.repair;
            baseDailyMetric.expenses.sales.total += expenses.sales.total;
            baseDailyMetric.expenses.sales.inStore += expenses.sales.inStore;
            baseDailyMetric.expenses.sales.online += expenses.sales.online;

            baseDailyMetric.profit.total += profit.total;
            baseDailyMetric.profit.repair += profit.repair;
            baseDailyMetric.profit.sales.total += profit.sales.total;
            baseDailyMetric.profit.sales.inStore += profit.sales.inStore;
            baseDailyMetric.profit.sales.online += profit.sales.online;

            baseDailyMetric.revenue.total += revenue.total;
            baseDailyMetric.revenue.repair += revenue.repair;
            baseDailyMetric.revenue.sales.total += revenue.sales.total;
            baseDailyMetric.revenue.sales.inStore += revenue.sales.inStore;
            baseDailyMetric.revenue.sales.online += revenue.sales.online;

            baseDailyMetric.transactions.total += transactions.total;
            baseDailyMetric.transactions.repair += transactions.repair;
            baseDailyMetric.transactions.sales.total += transactions.sales.total;
            baseDailyMetric.transactions.sales.inStore += transactions.sales.inStore;
            baseDailyMetric.transactions.sales.online += transactions.sales.online;
          });
        });

        return baseFinancialMetricsAcc;
      },
      baseFinancialMetrics
    );
  }

  return aggregatedAllLocationsFinancialMetrics;
}

type CreateRandomUnitsInput = {
  storeLocation: StoreLocation;
  year: string;
  yearUnitsSpread: LocationYearSpread;
  defaultMin?: number;
  defaultMax?: number;
  returnFraction?: boolean;
};
/**
 * - returns a random number of units sold for a specific store location and year
 */
function createRandomNumber({
  storeLocation,
  year,
  yearUnitsSpread,
  defaultMin = 3,
  defaultMax = 5,
  returnFraction = false,
}: CreateRandomUnitsInput) {
  const store = yearUnitsSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    defaultMin,
    defaultMax,
  ];
  const [min, max] = yearSpread;

  // console.group(yearUnitsSpread);
  // console.log({ min, max });
  // console.log("number", Math.round(Math.random() * (max - min) + min));
  // console.groupEnd();

  return returnFraction
    ? Math.random() * (max - min) + min
    : Math.round(Math.random() * (max - min) + min);
}

type CreateProductCategoryUnitsRevenueTupleInput = {
  categoryType: ProductCategory;
  storeLocation: StoreLocation;
  year: string;
  yearUnitsSoldSpread: LocationYearSpread;
};
/**
 * - calculates the number of unitsSold and revenue for a specific product category and store location
 */
function createProductCategoryUnitsRevenueTuple({
  categoryType,
  storeLocation,
  year,
  yearUnitsSoldSpread,
}: CreateProductCategoryUnitsRevenueTupleInput) {
  const unitsSold =
    categoryType === "Desktop Computer" ||
    categoryType === "Laptop" ||
    categoryType === "Smartphone" ||
    categoryType === "Tablet"
      ? createRandomNumber({ storeLocation, year, yearUnitsSpread: yearUnitsSoldSpread })
      : categoryType === "Central Processing Unit (CPU)" ||
        categoryType === "Graphics Processing Unit (GPU)" ||
        categoryType === "Motherboard" ||
        categoryType === "Headphone" ||
        categoryType === "Speaker" ||
        categoryType === "Display" ||
        categoryType === "Power Supply Unit (PSU)"
      ? createRandomNumber({
          storeLocation,
          year,
          yearUnitsSpread: yearUnitsSoldSpread,
        }) + 5
      : categoryType === "Accessory"
      ? createRandomNumber({
          storeLocation,
          year,
          yearUnitsSpread: yearUnitsSoldSpread,
        }) + 30
      : createRandomNumber({
          storeLocation,
          year,
          yearUnitsSpread: yearUnitsSoldSpread,
        }) + 7;

  const revenue =
    categoryType === "Desktop Computer" ||
    categoryType === "Laptop" ||
    categoryType === "Smartphone" ||
    categoryType === "Tablet"
      ? unitsSold * Math.round(Math.random() * (2200 - 300) + 300)
      : categoryType === "Central Processing Unit (CPU)" ||
        categoryType === "Graphics Processing Unit (GPU)"
      ? unitsSold * Math.round(Math.random() * (900 - 150) + 150)
      : categoryType === "Motherboard" ||
        categoryType === "Headphone" ||
        categoryType === "Speaker" ||
        categoryType === "Display" ||
        categoryType === "Power Supply Unit (PSU)"
      ? unitsSold * Math.round(Math.random() * (700 - 150) + 150)
      : categoryType === "Keyboard" ||
        categoryType === "Memory (RAM)" ||
        categoryType === "Mouse" ||
        categoryType === "Storage"
      ? unitsSold * Math.round(Math.random() * (300 - 100) + 100)
      : unitsSold * Math.round(Math.random() * (100 - 50) + 50);

  return [unitsSold, revenue];
}

type CreateRepairCategoryUnitsRepairedRevenueTupleInput = {
  categoryType: RepairCategory;
  storeLocation: StoreLocation;
  year: string;
  yearUnitsRepairedSpread: LocationYearSpread;
};

function createRepairCategoryUnitsRepairedRevenueTuple({
  categoryType,
  storeLocation,
  year,
  yearUnitsRepairedSpread,
}: CreateRepairCategoryUnitsRepairedRevenueTupleInput) {
  const unitsSold = createRandomNumber({
    storeLocation,
    year,
    yearUnitsSpread: yearUnitsRepairedSpread,
  });

  const revenue =
    categoryType === "Computer Component" || categoryType === "Electronic Device"
      ? unitsSold * Math.round(Math.random() * (400 - 150) + 150)
      : categoryType === "Mobile Device"
      ? unitsSold * Math.round(Math.random() * (200 - 125) + 125)
      : unitsSold * Math.round(Math.random() * (150 - 50) + 50);

  return [unitsSold, revenue];
}

export {
  createAggregatedProductMetrics,
  createAggregatedRepairMetrics,
  createAllLocationsAggregatedProductMetrics,
  createProductCategoryUnitsRevenueTuple,
  createRandomBusinessMetrics2,
  createRandomCustomerMetricsInput,
  createRandomFinancialMetrics,
  createRandomNumber,
  createRandomProductMetrics,
  createRandomRepairMetrics,
  createRepairCategoryUnitsRepairedRevenueTuple,
};
