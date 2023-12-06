import {
  interquartileRange,
  max,
  mean,
  median,
  min,
  mode,
  standardDeviation,
} from "simple-statistics";

import { StoreLocation } from "../../types";
import { returnToFixedFloat, splitCamelCase } from "../../utils";
import { BarChartData } from "../charts/responsiveBarChart/types";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  CustomerDailyMetric,
  CustomerMetrics,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  DailyFinancialMetric,
  DashboardCalendarView,
  DashboardMetricsView,
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
} from "./types";

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
        }[]
      }
    }
  }

  financialMetrics: {
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
      }[];
    }[];
  }[];  

  productMetrics: {
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


  repairMetrics: {
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
};
*/

function returnChartTitleNavigateLinks({
  calendarView,
  day = "01",
  metricCategory,
  metricsView,
  month = "01",
  months,
  productMetric,
  storeLocation,
  yAxisBarChartVariable,
  yAxisCalendarChartVariable,
  yAxisLineChartVariable,
  yAxisPieChartVariable,
  year,
}: {
  calendarView: DashboardCalendarView;
  day?: string;
  metricCategory: string; // 'overview' | 'all' | 'new' | 'returning' | 'total' ...
  metricsView: DashboardMetricsView; // 'customers' | 'financials' | 'products' | 'repairs'
  month?: string;
  months?: Month[];
  productMetric?: ProductCategory | "All Products";
  storeLocation: BusinessMetricStoreLocation;
  yAxisBarChartVariable: string;
  yAxisCalendarChartVariable?: string;
  yAxisLineChartVariable: string;
  yAxisPieChartVariable?: string;
  year: Year;
}) {
  const xAxisVariable =
    calendarView === "Daily" ? "Days" : calendarView === "Monthly" ? "Months" : "Years";

  console.group("returnChartTitleNavigateLinks");
  console.log("metricCategory: ", metricCategory);
  console.log("metricsView: ", metricsView);
  console.log("yAxisBarChartVariable: ", yAxisBarChartVariable);
  console.log("yAxisCalendarChartVariable: ", yAxisCalendarChartVariable);
  console.log("yAxisLineChartVariable: ", yAxisLineChartVariable);
  console.log("yAxisPieChartVariable: ", yAxisPieChartVariable);
  console.log("productMetric: ", productMetric);
  console.log("calendarView: ", calendarView);
  console.log("xAxisVariable: ", xAxisVariable);
  console.log("months: ", months);
  console.log("month: ", month);
  console.log("year: ", year);
  console.log("day: ", day);
  console.log("storeLocation: ", storeLocation);
  console.groupEnd();

  const yAxisBarChartPrefix =
    yAxisBarChartVariable.toLowerCase() === metricCategory.toLowerCase()
      ? `${productMetric ? productMetric : ""} ${metricCategory} `
      : `${productMetric ? productMetric : ""} ${splitCamelCase(
          yAxisBarChartVariable
        )} ${metricCategory} ` ?? "";

  const yAxisCalendarChartPrefix =
    yAxisCalendarChartVariable?.toLowerCase() === metricCategory.toLowerCase()
      ? `${productMetric ? productMetric : ""} ${metricCategory} `
      : `${productMetric ? productMetric : ""} ${splitCamelCase(
          yAxisCalendarChartVariable ?? ""
        )} ${metricCategory} ` ?? "";

  const yAxisLineChartPrefix =
    yAxisLineChartVariable.toLowerCase() === metricCategory.toLowerCase()
      ? `${productMetric ? productMetric : ""} ${metricCategory} `
      : `${productMetric ? productMetric : ""} ${splitCamelCase(
          yAxisLineChartVariable
        )} ${metricCategory} ` ?? "";

  const yAxisPieChartPrefix =
    yAxisPieChartVariable?.toLowerCase() === metricCategory.toLowerCase()
      ? `${productMetric ? productMetric : ""} ${metricCategory} `
      : `${productMetric ? productMetric : ""} ${splitCamelCase(
          yAxisPieChartVariable ?? ""
        )} ${metricCategory} ` ?? "";

  const barChartHeading =
    calendarView === "Daily"
      ? `${yAxisBarChartPrefix} vs. ${xAxisVariable} for ${
          months?.[parseInt(month) - 1] ?? ""
        }, ${year} at ${storeLocation}`
      : calendarView === "Monthly"
      ? `${yAxisBarChartPrefix} vs. ${xAxisVariable} for ${year} at ${storeLocation}`
      : `${yAxisBarChartPrefix} vs. ${xAxisVariable} for All Business Years at ${storeLocation}`;

  const calendarChartHeading =
    calendarView === "Daily"
      ? `${yAxisCalendarChartPrefix} vs. ${xAxisVariable} for ${
          months?.[parseInt(month) - 1] ?? ""
        }, ${year} at ${storeLocation}`
      : calendarView === "Monthly"
      ? `${yAxisCalendarChartPrefix} vs. ${xAxisVariable} for ${year} at ${storeLocation}`
      : `${yAxisCalendarChartPrefix} vs. ${xAxisVariable} for All Business Years at ${storeLocation}`;

  const lineChartHeading =
    calendarView === "Daily"
      ? `${yAxisLineChartPrefix} vs. ${xAxisVariable} for ${
          months?.[parseInt(month) - 1] ?? ""
        }, ${year} at ${storeLocation}`
      : calendarView === "Monthly"
      ? `${yAxisLineChartPrefix} vs. ${xAxisVariable} for ${year} at ${storeLocation}`
      : `${yAxisLineChartPrefix} vs. ${xAxisVariable} for All Business Years at ${storeLocation}`;

  const pieChartHeading =
    calendarView === "Daily"
      ? `${yAxisPieChartPrefix} for ${day}, ${
          months?.[parseInt(month) - 1] ?? ""
        }, ${year} at ${storeLocation}`
      : calendarView === "Monthly"
      ? `${yAxisPieChartPrefix} for ${
          months?.[parseInt(month) - 1] ?? ""
        }, ${year} at ${storeLocation}`
      : `${yAxisPieChartPrefix} for ${year} at ${storeLocation}`;

  const expandBarChartNavigateLink = `/home/dashboard/${metricsView}-${calendarView}-${splitCamelCase(
    metricCategory
  )
    .split(" ")
    .join("-")}-bar-chart`;

  const expandCalendarChartNavigateLink = `/home/dashboard/${metricsView}-${calendarView}-${splitCamelCase(
    metricCategory
  )
    .split(" ")
    .join("-")}-calendar-chart`;

  const expandLineChartNavigateLink = `/home/dashboard/${metricsView}-${calendarView}-${splitCamelCase(
    metricCategory
  )
    .split(" ")
    .join("-")}-line-chart`;

  const expandPieChartNavigateLink = `/home/dashboard/${metricsView}-${calendarView}-${splitCamelCase(
    metricCategory
  )
    .split(" ")
    .join("-")}-pie-chart`;

  return {
    barChartHeading,
    calendarChartHeading,
    expandBarChartNavigateLink,
    expandCalendarChartNavigateLink,
    expandLineChartNavigateLink,
    expandPieChartNavigateLink,
    lineChartHeading,
    pieChartHeading,
  };
}

type StatisticsObject = {
  min: {
    value: number;
    occurred: string;
  };
  max: {
    value: number;
    occurred: string;
  };
  arithmeticMean: number;
  mode: number;
  median: number;
  standardDeviation: number;
  interquartileRange: number;
};
/**
 * Return statistics for each key in the barChartsObj of the dailyChartsObj returned by the `return${metric}ChartData` functions
 * - where metric = Customer | Financial | Product | Repair
 * - example input from CustomerMetrics' overview section: type CustomerMetricsCharts = {
    dailyCharts: {
      overview: {
        barChartsObj: Record<'overview' | 'new' | 'returning', BarChartData[]>;
        ...
      };
      ...
    };
    ...
  };
 * - barChartsObj is the input for this function
 * - barChartsObj is used as it is generated (along with lineChartsObj) for all metrics and sub-metrics, and has a reasonably simple structure (when compared to lineChartsObj)
 */
function returnStatistics<
  BarObjKeys extends string = string,
  BarChartObj extends Record<string, string | number> = Record<string, string | number>
>(
  barChartsObj: Record<BarObjKeys, BarChartData<BarChartObj>[]>
): Map<BarObjKeys, StatisticsObject> {
  return Object.entries(barChartsObj).reduce(
    (statisticsAcc, [_barObjKey, barObjsArr]) => {
      // barObjsArr is an array of BarChartObj
      if (Array.isArray(barObjsArr)) {
        // returns an map without the 'Days', 'Months', and 'Years' keyVals
        const filteredBarObjsArr = barObjsArr.reduce(
          (filteredBarObjAcc, barObj: BarChartObj) => {
            Object.entries(barObj).forEach(([key, value]) => {
              if (key === "Days" || key === "Months" || key === "Years") {
                return;
              }

              filteredBarObjAcc.has(key)
                ? filteredBarObjAcc.get(key).push(value)
                : filteredBarObjAcc.set(key, [value]);
            });

            return filteredBarObjAcc;
          },
          new Map<Omit<[keyof BarChartObj], "Days" | "Months" | "Years">, number[]>()
        );

        Array.from(filteredBarObjsArr).forEach((filteredBarObj) => {
          const [key, value] = filteredBarObj as [BarObjKeys, number[]];
          // create statistics object
          // min
          const minVal = min(value);

          // min occurence date
          // find the first barObj that has the minVal
          const minOccurenceBarObj = barObjsArr.find((barObj) =>
            Object.entries(barObj).find(([_, val]) => val === minVal)
          );
          // return the keyVal that has the minVal
          const [minOccurenceKey, minOccurenceVal] = Object.entries(
            minOccurenceBarObj
          ).filter(([_, val]) => val !== minVal)[0];
          // format the date (key will be either 'Days', 'Months', or 'Years')
          const minOccurenceDate = `${minOccurenceKey.slice(
            0,
            minOccurenceKey.length - 1
          )} - ${minOccurenceVal}`;

          // max
          const maxVal = max(value);

          // max occurence date
          // find the first barObj that has the maxVal
          const maxOccurenceBarObj = barObjsArr.find((barObj) =>
            Object.entries(barObj).find(([_, val]) => val === maxVal)
          );
          // return the keyVal that has the maxVal
          const [maxOccurenceKey, maxOccurenceVal] = Object.entries(
            maxOccurenceBarObj
          ).filter(([_, val]) => val !== maxVal)[0];
          // format the date (key will be either 'Days', 'Months', or 'Years')
          const maxOccurenceDate = `${maxOccurenceKey.slice(
            0,
            maxOccurenceKey.length - 1
          )} - ${maxOccurenceVal}`;

          // mean
          const meanVal = mean(value);
          // mode
          const modeVal = mode(value);
          // median
          const medianVal = median(value);

          // standard deviation
          const standardDeviationVal = standardDeviation(value);
          // interquartile range
          const interquartileRangeVal = interquartileRange(value);

          const statisticsObj: StatisticsObject = {
            min: {
              value: minVal,
              occurred: minOccurenceDate ?? "",
            },
            max: {
              value: maxVal,
              occurred: maxOccurenceDate ?? "",
            },
            arithmeticMean: meanVal,
            mode: modeVal,
            median: medianVal,
            standardDeviation: standardDeviationVal,
            interquartileRange: interquartileRangeVal,
          };

          statisticsAcc.set(key, statisticsObj);
        });
      }

      return statisticsAcc;
    },
    new Map<BarObjKeys, StatisticsObject>()
  );
}

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
    const slicedMonths = isCurrentYear
      ? months.slice(0, currentMonth + 1)
      : months.slice(monthStart, monthEnd + 1);

    const daysInMonthsMap = slicedMonths.reduce((monthsAcc, month, monthIdx) => {
      const days = daysPerMonth[monthIdx];
      const isCurrentMonth = isCurrentYear && monthIdx === currentMonth;
      const currentDay = isCurrentYear
        ? isCurrentMonth
          ? new Date().getDate()
          : days
        : days;

      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      const daysWithLeapYear = monthIdx === 1 && isLeapYear ? currentDay + 1 : currentDay;

      const daysRange = Array.from({ length: daysWithLeapYear }, (_, idx) => idx + 1).map(
        (day) => day.toString().padStart(2, "0")
      );

      monthsAcc.set(month, daysRange);

      return monthsAcc;
    }, new Map<Month, string[]>());

    yearsAcc.set(year.toString() as Year, daysInMonthsMap);

    return yearsAcc;
  }, new Map<Year, Map<Month, string[]>>());
}

function splitSelectedCalendarDate({
  calendarDate,
  months,
}: {
  calendarDate: string;
  months: Month[];
}): {
  selectedDate: string;
  selectedMonth: Month;
  selectedYear: Year;
} {
  const [year, month, date] = calendarDate.split("-") as [Year, string, string];

  return {
    selectedDate: date.toString().padStart(2, "0"),
    selectedMonth: months[parseInt(month) - 1],
    selectedYear: year,
  };
}

type ReturnUnitsRevenueTupleInput = {
  categoryType: ProductCategory;
  storeLocation: StoreLocation;
  year: string;
  yearUnitsSoldSpread: LocationYearSpread;
};
/**
 * - calculates the number of unitsSold and revenue for a specific category and location based on predefined rules and randomization within specified ranges.
 *
 * @param {ReturnUnitsRevenueTupleInput} options - The options for generating the unitsSold and revenue tuple.
 * @returns {[number, number]} - An array containing the number of unitsSold and the corresponding revenue.
 *
 * @param {RepairCategory | ProductCategory} options.categoryType - The specific type within the category.
 * @param {StoreLocation} options.storeLocation - The location or store where the calculations are done.
 * @param {string} options.year - The year for which the calculations are performed.
 * @param {LocationYearSpread} options.yearUnitsSoldSpread - The spread of transaction data for the year and location.
 */
function returnUnitsRevenueTuple({
  categoryType,
  storeLocation,
  year,
  yearUnitsSoldSpread,
}: ReturnUnitsRevenueTupleInput) {
  function returnRandomUnits() {
    const store = yearUnitsSoldSpread[storeLocation];
    const yearSpread = Object.entries(store).find(
      ([yearKey]) => yearKey === year
    )?.[1] ?? [3, 5];
    const [min, max] = yearSpread;

    return Math.round(Math.random() * (max - min) + min); // spread between max and min
  }

  const units =
    categoryType === "Desktop Computer" ||
    categoryType === "Laptop" ||
    categoryType === "Smartphone" ||
    categoryType === "Tablet"
      ? returnRandomUnits()
      : categoryType === "Central Processing Unit (CPU)" ||
        categoryType === "Graphics Processing Unit (GPU)" ||
        categoryType === "Motherboard" ||
        categoryType === "Headphone" ||
        categoryType === "Speaker" ||
        categoryType === "Display" ||
        categoryType === "Power Supply Unit (PSU)"
      ? returnRandomUnits() + 5
      : categoryType === "Accessory"
      ? returnRandomUnits() + 30
      : returnRandomUnits() + 7;

  const revenue =
    categoryType === "Desktop Computer" ||
    categoryType === "Laptop" ||
    categoryType === "Smartphone" ||
    categoryType === "Tablet"
      ? units * Math.round(Math.random() * (2200 - 300) + 300) // spread between 300 and 2200
      : categoryType === "Central Processing Unit (CPU)" ||
        categoryType === "Graphics Processing Unit (GPU)"
      ? units * Math.round(Math.random() * (900 - 150) + 150) // spread between 150 and 900
      : categoryType === "Motherboard" ||
        categoryType === "Headphone" ||
        categoryType === "Speaker" ||
        categoryType === "Display" ||
        categoryType === "Power Supply Unit (PSU)"
      ? units * Math.round(Math.random() * (700 - 150) + 150) // spread between 150 and 700
      : categoryType === "Keyboard" ||
        categoryType === "Memory (RAM)" ||
        categoryType === "Mouse" ||
        categoryType === "Storage"
      ? units * Math.round(Math.random() * (300 - 100) + 100) // spread between 100 and 300
      : units * Math.round(Math.random() * (100 - 50) + 50); // spread between 50 and 100

  return [units, revenue];
}

type ReturnUnitsRepairedRevenueTupleInput = {
  categoryType: RepairCategory;
  storeLocation: StoreLocation;
  year: string;
  yearUnitsRepairedSpread: LocationYearSpread;
};

function returnUnitsRepairedRevenueTuple({
  categoryType,
  storeLocation,
  year,
  yearUnitsRepairedSpread,
}: ReturnUnitsRepairedRevenueTupleInput) {
  function returnRandomUnitsRepaired() {
    const store = yearUnitsRepairedSpread[storeLocation];
    const yearSpread = Object.entries(store).find(
      ([yearKey]) => yearKey === year
    )?.[1] ?? [3, 5];
    const [min, max] = yearSpread;

    return Math.round(Math.random() * (max - min) + min); // spread between max and min
  }

  const units = returnRandomUnitsRepaired();

  const revenue =
    categoryType === "Computer Component" || categoryType === "Electronic Device"
      ? units * Math.round(Math.random() * (400 - 150) + 150) // spread between 150 and 400
      : categoryType === "Mobile Device"
      ? units * Math.round(Math.random() * (200 - 125) + 125) // spread between 200 and 125
      : units * Math.round(Math.random() * (150 - 50) + 50); // spread between 50 and 150

  return [units, revenue];
}

type ReturnRepairMetricsInput = {
  daysInMonthsInYears: DaysInMonthsInYears;
  repairCategories: RepairCategory[];
  storeLocation: StoreLocation;
  yearUnitsRepairedSpread: LocationYearSpread;
};

function returnRepairMetrics({
  daysInMonthsInYears,
  repairCategories,
  storeLocation,
  yearUnitsRepairedSpread,
}: ReturnRepairMetricsInput): RepairMetric[] {
  return repairCategories.map((repairCategory) => {
    const repairYearlyMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
      const [year, daysInMonthsMap] = yearTuple;

      const repairMonthlyMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
        const [month, daysRange] = monthTuple;

        // daily repair trends
        const repairDailyMetrics = daysRange.map((date) => {
          const [dailyUnitsRepaired, dailyRevenue] = returnUnitsRepairedRevenueTuple({
            categoryType: repairCategory,
            storeLocation,
            year,
            yearUnitsRepairedSpread,
          });

          const repairDailyMetric: RepairDailyMetric = {
            day: date,
            revenue: Math.round(dailyRevenue),
            unitsRepaired: Math.round(dailyUnitsRepaired),
          };

          return repairDailyMetric;
        });

        const [repairMonthlyRevenue, repairMonthlyUnitsRepaired] =
          repairDailyMetrics.reduce(
            (monthlyRepairMetricsAcc, dailyRepairMetric) => {
              monthlyRepairMetricsAcc[0] += dailyRepairMetric.revenue;
              monthlyRepairMetricsAcc[1] += dailyRepairMetric.unitsRepaired;

              return monthlyRepairMetricsAcc;
            },
            [0, 0]
          );

        const monthlyRepairMetric: RepairMonthlyMetric = {
          month,
          revenue: Math.round(repairMonthlyRevenue),
          unitsRepaired: Math.round(repairMonthlyUnitsRepaired),
          dailyMetrics: repairDailyMetrics,
        };

        return monthlyRepairMetric;
      });

      const [repairYearlyRevenue, repairYearlyUnitsRepaired] =
        repairMonthlyMetrics.reduce(
          (yearlyRepairMetricsAcc, monthlyRepairMetric) => {
            yearlyRepairMetricsAcc[0] += monthlyRepairMetric.revenue;
            yearlyRepairMetricsAcc[1] += monthlyRepairMetric.unitsRepaired;

            return yearlyRepairMetricsAcc;
          },
          [0, 0]
        );

      const yearlyRepairMetric: RepairYearlyMetric = {
        year: year,
        revenue: Math.round(repairYearlyRevenue),
        unitsRepaired: Math.round(repairYearlyUnitsRepaired),
        monthlyMetrics: repairMonthlyMetrics,
      };

      return yearlyRepairMetric;
    });

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
  yearOnlineTransactionsSpread: LocationYearSpread;
  yearUnitsSoldSpread: LocationYearSpread;
};

function returnProductMetrics({
  daysInMonthsInYears,
  productCategories,
  storeLocation,
  yearOnlineTransactionsSpread,
  yearUnitsSoldSpread,
}: ReturnProductMetricsInput): Omit<ProductMetric[], "All Products"> {
  return productCategories.map((productCategory) => {
    const productYearlyMetrics = Array.from(daysInMonthsInYears).map((yearTuple) => {
      const [year, daysInMonthsMap] = yearTuple;

      const productMonthlyMetrics = Array.from(daysInMonthsMap).map((monthTuple) => {
        const [month, daysRange] = monthTuple;

        // daily repair trends
        const productDailyMetrics = daysRange.map((date) => {
          const [productDailyUnitsSold, productDailySalesRevenue] =
            returnUnitsRevenueTuple({
              categoryType: productCategory,
              storeLocation,
              year,
              yearUnitsSoldSpread,
            });

          const productOnlineFraction = returnRandomOnlineTransactions({
            storeLocation,
            year,
            yearOnlineTransactionsSpread,
          });

          // units sold online
          const productDailyOnlineOrders = Math.round(
            productDailyUnitsSold * productOnlineFraction
          );
          // units sold in store
          const productDailyInStoreOrders = Math.round(
            productDailyUnitsSold - productDailyOnlineOrders
          );

          // sales revenue online
          const productDailyOnlineSalesRevenue = Math.round(
            productOnlineFraction * productDailySalesRevenue
          );
          // sales revenue in store
          const productDailyInStoreSalesRevenue = Math.round(
            productDailySalesRevenue - productDailyOnlineSalesRevenue
          );

          const productDailyMetric: ProductDailyMetric = {
            day: date,
            revenue: {
              inStore: productDailyInStoreSalesRevenue,
              online: productDailyOnlineSalesRevenue,
              total: productDailySalesRevenue,
            },

            unitsSold: {
              inStore: productDailyInStoreOrders,
              online: productDailyOnlineOrders,
              total: productDailyUnitsSold,
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
            monthlyRepairMetricsAcc[3] += dailyRepairMetric.unitsSold.total;
            monthlyRepairMetricsAcc[4] += dailyRepairMetric.unitsSold.online;
            monthlyRepairMetricsAcc[5] += dailyRepairMetric.unitsSold.inStore;

            return monthlyRepairMetricsAcc;
          },
          [0, 0, 0, 0, 0, 0]
        );

        const productMonthlyMetric: ProductMonthlyMetric = {
          month,
          unitsSold: {
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
      });

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
          yearlyProductMetricsAcc[3] += monthlyRepairMetric.unitsSold.total;
          yearlyProductMetricsAcc[4] += monthlyRepairMetric.unitsSold.online;
          yearlyProductMetricsAcc[5] += monthlyRepairMetric.unitsSold.inStore;

          return yearlyProductMetricsAcc;
        },
        [0, 0, 0, 0, 0, 0]
      );

      const productYearlyMetric: ProductYearlyMetric = {
        year,
        unitsSold: {
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
    });

    const productMetric: ProductMetric = {
      name: productCategory,
      yearlyMetrics: productYearlyMetrics,
    };

    return productMetric;
  });
}

function returnProductMetricsWithAggregatedAllProducts(
  productMetrics: Omit<ProductMetric[], "All Products">
): ProductMetric {
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

  const PRODUCT_METRIC_TEMPLATE: ProductMetric = {
    name: "All Products",
    yearlyMetrics: [],
  };

  return productMetrics.reduce((productMetricsAcc, productMetric) => {
    const { yearlyMetrics } = productMetric;

    const aggregatedYearlyProductMetrics = yearlyMetrics.map(
      (productYearlyMetric, productYearlyMetricIdx) => {
        const { year, revenue, unitsSold, monthlyMetrics } = productYearlyMetric;
        // find the corresponding yearly metric in the aggregated product metric
        const existingYearlyMetric = productMetricsAcc.yearlyMetrics.find(
          (productYearlyMetricAcc) => productYearlyMetricAcc.year === year
        ) ?? { ...PRODUCT_METRIC_TEMPLATE_YEARLY, year };

        // aggregate yearly metrics
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

        // find the corresponding monthly metric in the aggregated product metric
        const aggregatedMonthlyProductMetrics = monthlyMetrics.map(
          (productMonthlyMetric, productMonthlyMetricIdx) => {
            const { month, dailyMetrics, revenue, unitsSold } = productMonthlyMetric;

            const existingMonthlyMetric = aggregatedYearlyMetric.monthlyMetrics.find(
              (productMonthlyMetricAcc) => productMonthlyMetricAcc.month === month
            ) ?? { ...PRODUCT_METRIC_TEMPLATE_MONTHLY, month };

            // find the corresponding daily metric in the aggregated product metric
            const aggregatedDailyRepairMetrics = dailyMetrics.map(
              (productDailyMetric, productDailyMetricIdx) => {
                const { day, revenue, unitsSold } = productDailyMetric;

                const existingDailyMetric = existingMonthlyMetric.dailyMetrics.find(
                  (productDailyMetricAcc) => productDailyMetricAcc.day === day
                ) ?? { ...PRODUCT_METRIC_TEMPLATE_DAILY, day };

                // aggregate daily metrics
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
              }
            );

            // aggregate monthly metrics
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
      }
    );

    productMetricsAcc.yearlyMetrics = aggregatedYearlyProductMetrics;

    return productMetricsAcc;
  }, PRODUCT_METRIC_TEMPLATE);
}

function returnRepairMetricsWithAggregatedAllRepairs(
  repairMetrics: Omit<RepairMetric[], "All Repairs">
): RepairMetric {
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
  const REPAIR_METRIC_TEMPLATE: RepairMetric = {
    name: "All Repairs",
    yearlyMetrics: [],
  };

  return repairMetrics.reduce((repairMetricsAcc, repairMetric) => {
    const { yearlyMetrics } = repairMetric;

    const aggregatedYearlyRepairMetrics = yearlyMetrics.map((repairYearlyMetric) => {
      const { year, revenue, unitsRepaired, monthlyMetrics } = repairYearlyMetric;
      // find the corresponding yearly metric in the aggregated repair metric
      const existingYearlyMetric = repairMetricsAcc.yearlyMetrics.find(
        (repairYearlyMetricAcc) => repairYearlyMetricAcc.year === year
      ) ?? { ...REPAIR_METRIC_TEMPLATE_YEARLY, year };

      // aggregate yearly metrics
      const aggregatedYearlyMetric = {
        ...existingYearlyMetric,
        revenue: existingYearlyMetric.revenue + revenue,
        unitsRepaired: existingYearlyMetric.unitsRepaired + unitsRepaired,
      };

      // find the corresponding monthly metric in the aggregated repair metric
      const aggregatedMonthlyRepairMetrics = monthlyMetrics.map((repairMonthlyMetric) => {
        const { month, dailyMetrics, revenue, unitsRepaired } = repairMonthlyMetric;

        const existingMonthlyMetric = aggregatedYearlyMetric.monthlyMetrics.find(
          (repairMonthlyMetricAcc) => repairMonthlyMetricAcc.month === month
        ) ?? { ...REPAIR_METRIC_TEMPLATE_MONTHLY, month };

        // find the corresponding daily metric in the aggregated repair metric
        const aggregatedDailyRepairMetrics = dailyMetrics.map((repairDailyMetric) => {
          const { day, revenue, unitsRepaired } = repairDailyMetric;

          const existingDailyMetric = existingMonthlyMetric.dailyMetrics.find(
            (repairDailyMetricAcc) => repairDailyMetricAcc.day === day
          ) ?? { ...REPAIR_METRIC_TEMPLATE_DAILY, day };

          // aggregate daily metrics
          const aggregatedDailyMetric = {
            ...existingDailyMetric,
            revenue: existingDailyMetric.revenue + revenue,
            unitsRepaired: existingDailyMetric.unitsRepaired + unitsRepaired,
          };

          return aggregatedDailyMetric;
        });

        // aggregate monthly metrics
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

type ReturnAggregatedProductIntoFinancialMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: YearlyFinancialMetric[];
  financialMetricsTemplate: YearlyFinancialMetric;
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  productMetrics: ProductMetric[];
};

function returnAggregatedProductIntoFinancialMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  financialMetricsTemplate,
  monthlyFinancialMetricsTemplate,
  productMetrics,
}: ReturnAggregatedProductIntoFinancialMetricsInput): YearlyFinancialMetric[] {
  return productMetrics.reduce((aggregatedYearlyMetricsAcc, productMetric) => {
    const { yearlyMetrics, name } = productMetric;
    // all products is already aggregated
    if (name !== "All Products") {
      return aggregatedYearlyMetricsAcc;
    }

    const aggregatedYearlyFinancialMetrics = yearlyMetrics.map(
      (productYearlyMetric, productYearlyMetricIdx) => {
        const { monthlyMetrics } = productYearlyMetric;

        const aggregatedMonthlyFinancialMetrics = monthlyMetrics.map(
          (productMonthlyMetric, productMonthlyMetricIdx) => {
            const { dailyMetrics } = productMonthlyMetric;

            const newDailyFinancialMetrics = dailyMetrics.map(
              (productDailyMetric, productDailyMetricIdx) => {
                const { day, revenue } = productDailyMetric;

                const existingDailyFinancialMetric = aggregatedYearlyMetricsAcc[
                  productYearlyMetricIdx
                ]?.monthlyMetrics[productMonthlyMetricIdx]?.dailyMetrics[
                  productDailyMetricIdx
                ] ?? {
                  ...dailyFinancialMetricsTemplate,
                  day,
                };

                const newDailyFinancialMetric: DailyFinancialMetric = {
                  ...existingDailyFinancialMetric,
                  revenue: {
                    ...existingDailyFinancialMetric.revenue,
                    total: existingDailyFinancialMetric.revenue.total + revenue.total,
                    sales: {
                      total:
                        existingDailyFinancialMetric.revenue.sales.total + revenue.total,
                      online:
                        existingDailyFinancialMetric.revenue.sales.online +
                        revenue.online,
                      inStore:
                        existingDailyFinancialMetric.revenue.sales.inStore +
                        revenue.inStore,
                    },
                  },
                };

                return newDailyFinancialMetric;
              }
            );

            const { month, revenue } = productMonthlyMetric;

            const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
              productYearlyMetricIdx
            ]?.monthlyMetrics[productMonthlyMetricIdx] ?? {
              ...monthlyFinancialMetricsTemplate,
              month,
            };

            // aggregate monthly metrics
            const aggregatedExistingMonthlyFinancialMetric = {
              ...existingMonthlyFinancialMetric,
              revenue: {
                ...existingMonthlyFinancialMetric.revenue,
                total: existingMonthlyFinancialMetric.revenue.total + revenue.total,
                sales: {
                  ...existingMonthlyFinancialMetric.revenue.sales,
                  total:
                    existingMonthlyFinancialMetric.revenue.sales.total + revenue.total,
                  online:
                    existingMonthlyFinancialMetric.revenue.sales.online + revenue.online,
                  inStore:
                    existingMonthlyFinancialMetric.revenue.sales.inStore +
                    revenue.inStore,
                },
              },

              dailyMetrics: newDailyFinancialMetrics,
            };

            return aggregatedExistingMonthlyFinancialMetric;
          }
        );

        const { revenue, year } = productYearlyMetric;

        const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
          productYearlyMetricIdx
        ] ?? {
          ...financialMetricsTemplate,
          year,
          monthlyMetrics: Array.from({
            length: aggregatedMonthlyFinancialMetrics.length,
          }),
        };

        // aggregate yearly metrics
        const aggregatedExistingYearlyFinancialMetric = {
          ...existingYearlyFinancialMetric,
          revenue: {
            ...existingYearlyFinancialMetric.revenue,
            total: existingYearlyFinancialMetric.revenue.total + revenue.total,
            sales: {
              ...existingYearlyFinancialMetric.revenue.sales,
              total: existingYearlyFinancialMetric.revenue.sales.total + revenue.total,
              online: existingYearlyFinancialMetric.revenue.sales.online + revenue.online,
              inStore:
                existingYearlyFinancialMetric.revenue.sales.inStore + revenue.inStore,
            },
          },

          monthlyMetrics: aggregatedMonthlyFinancialMetrics,
        };

        return aggregatedExistingYearlyFinancialMetric;
      }
    );

    aggregatedYearlyMetricsAcc = aggregatedYearlyFinancialMetrics;

    return aggregatedYearlyMetricsAcc;
  }, financialMetrics);
}

type ReturnAggregatedRepairIntoFinancialMetricsInput = {
  dailyFinancialMetricsTemplate: DailyFinancialMetric;
  financialMetrics: YearlyFinancialMetric[];
  monthlyFinancialMetricsTemplate: MonthlyFinancialMetric;
  repairMetrics: RepairMetric[];
  financialMetricsTemplate: YearlyFinancialMetric;
};

function returnAggregatedRepairIntoFinancialMetrics({
  dailyFinancialMetricsTemplate,
  financialMetrics,
  monthlyFinancialMetricsTemplate,
  repairMetrics,
  financialMetricsTemplate,
}: ReturnAggregatedRepairIntoFinancialMetricsInput): YearlyFinancialMetric[] {
  return repairMetrics.reduce((aggregatedYearlyMetricsAcc, repairMetric) => {
    const { yearlyMetrics, name } = repairMetric;
    // all repairs is already aggregated
    if (name !== "All Repairs") {
      return aggregatedYearlyMetricsAcc;
    }

    const aggregatedYearlyFinancialMetrics = yearlyMetrics.map(
      (repairYearlyMetric, repairYearlyMetricIdx) => {
        const { monthlyMetrics, year } = repairYearlyMetric;

        const aggregatedMonthlyFinancialMetrics = monthlyMetrics.map(
          (repairMonthlyMetric, repairMonthlyMetricIdx) => {
            const { dailyMetrics } = repairMonthlyMetric;

            const aggregatedDailyFinancialMetrics = dailyMetrics.map(
              (repairDailyMetric, repairDailyMetricIdx) => {
                const { day, revenue } = repairDailyMetric;

                const existingDailyFinancialMetric = aggregatedYearlyMetricsAcc[
                  repairYearlyMetricIdx
                ]?.monthlyMetrics[repairMonthlyMetricIdx]?.dailyMetrics[
                  repairDailyMetricIdx
                ] ?? {
                  ...dailyFinancialMetricsTemplate,
                  day,
                };

                const aggregatedDailyFinancialMetric: DailyFinancialMetric = {
                  ...existingDailyFinancialMetric,

                  revenue: {
                    ...existingDailyFinancialMetric.revenue,
                    total: existingDailyFinancialMetric.revenue.total + revenue,
                    repair: existingDailyFinancialMetric.revenue.repair + revenue,
                  },
                };

                return aggregatedDailyFinancialMetric;
              }
            );

            const { month, revenue } = repairMonthlyMetric;

            const existingMonthlyFinancialMetric = aggregatedYearlyMetricsAcc[
              repairYearlyMetricIdx
            ]?.monthlyMetrics[repairMonthlyMetricIdx] ?? {
              ...monthlyFinancialMetricsTemplate,
              month,
            };

            // aggregate monthly metrics
            const aggregatedExistingMonthlyFinancialMetric = {
              ...existingMonthlyFinancialMetric,

              revenue: {
                ...existingMonthlyFinancialMetric.revenue,
                total: existingMonthlyFinancialMetric.revenue.total + revenue,
                repair: existingMonthlyFinancialMetric.revenue.repair + revenue,
              },

              dailyMetrics: aggregatedDailyFinancialMetrics,
            };

            return aggregatedExistingMonthlyFinancialMetric;
          }
        );

        const { revenue } = repairYearlyMetric;

        const existingYearlyFinancialMetric = aggregatedYearlyMetricsAcc[
          repairYearlyMetricIdx
        ] ?? {
          ...financialMetricsTemplate,
          year,
        };

        // aggregate yearly metrics
        const aggregatedExistingYearlyFinancialMetric = {
          ...existingYearlyFinancialMetric,
          revenue: {
            ...existingYearlyFinancialMetric.revenue,
            total: existingYearlyFinancialMetric.revenue.total + revenue,
            repair: existingYearlyFinancialMetric.revenue.repair + revenue,
          },

          monthlyMetrics: aggregatedMonthlyFinancialMetrics,
        };

        return aggregatedExistingYearlyFinancialMetric;
      }
    );

    aggregatedYearlyMetricsAcc = aggregatedYearlyFinancialMetrics;

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
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.1, 0.2,
  ];
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
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomRepairExpenses({
  storeLocation,
  year,
  yearRepairExpensesSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearRepairExpensesSpread: LocationYearSpread;
}) {
  const store = yearRepairExpensesSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomOnlineExpenses({
  storeLocation,
  year,
  yearOnlineExpensesSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearOnlineExpensesSpread: LocationYearSpread;
}) {
  const store = yearOnlineExpensesSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomOnlineProfit({
  storeLocation,
  year,
  yearOnlineProfitSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearOnlineProfitSpread: LocationYearSpread;
}) {
  const store = yearOnlineProfitSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomRepairProfit({
  storeLocation,
  year,
  yearRepairProfitSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearRepairProfitSpread: LocationYearSpread;
}) {
  const store = yearRepairProfitSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

function returnRandomOnlineTransactions({
  storeLocation,
  year,
  yearOnlineTransactionsSpread,
}: {
  storeLocation: StoreLocation;
  year: Year;
  yearOnlineTransactionsSpread: LocationYearSpread;
}) {
  const store = yearOnlineTransactionsSpread[storeLocation];
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.01, 0.03,
  ];
  const [min, max] = yearSpread;

  return Math.random() * (max - min) + min;
}

type ReturnFinancialMetricsInput = {
  allProductsMetric: ProductMetric;
  allRepairsMetric: RepairMetric;
  financialMetrics: YearlyFinancialMetric[];
  storeLocation: StoreLocation;
  yearConversionRateSpread: LocationYearSpread;
  yearOnlineExpensesSpread: LocationYearSpread;
  yearOnlineProfitSpread: LocationYearSpread;
  yearOnlineTransactionsSpread: LocationYearSpread;
  yearRepairExpensesSpread: LocationYearSpread;
  yearRepairProfitSpread: LocationYearSpread;
  yearProfitMarginSpread: LocationYearSpread;
};

function returnFinancialMetrics({
  allProductsMetric,
  allRepairsMetric,
  financialMetrics,
  storeLocation,
  yearConversionRateSpread,
  yearOnlineExpensesSpread,
  yearOnlineProfitSpread,
  yearOnlineTransactionsSpread,
  yearRepairExpensesSpread,
  yearRepairProfitSpread,
  yearProfitMarginSpread,
}: ReturnFinancialMetricsInput): YearlyFinancialMetric[] {
  return financialMetrics.map((financialMetric) => {
    const { monthlyMetrics, year } = financialMetric;

    const aggregatedMonthlyFinancialMetrics = monthlyMetrics.map(
      (monthlyFinancialMetric) => {
        const { dailyMetrics } = monthlyFinancialMetric;

        const aggregatedDailyFinancialMetrics = dailyMetrics.map(
          (dailyFinancialMetric) => {
            const { revenue } = dailyFinancialMetric;

            // daily -> net profit margin
            const dailyNetProfitMargin = returnRandomProfitMargin({
              storeLocation,
              year,
              yearProfitMarginSpread,
            });
            // daily -> profit
            // daily -> profit -> total
            const dailyProfit = Math.round(revenue.total * dailyNetProfitMargin);
            // daily -> profit -> repair
            const dailyRepairProfitFraction = returnRandomRepairProfit({
              storeLocation,
              year,
              yearRepairProfitSpread,
            });
            const dailyRepairProfit = Math.round(dailyProfit * dailyRepairProfitFraction);
            // daily -> profit -> sales -> total
            const dailySalesProfit = Math.round(dailyProfit - dailyRepairProfit);
            // daily -> profit -> sales -> online
            const dailyOnlineProfitFraction = returnRandomOnlineProfit({
              storeLocation,
              year,
              yearOnlineProfitSpread,
            });
            const dailyOnlineProfit = Math.round(
              dailySalesProfit * dailyOnlineProfitFraction
            );
            // daily -> profit -> sales -> inStore
            const dailyInStoreProfit = Math.round(dailySalesProfit - dailyOnlineProfit);

            // daily -> expenses
            // daily -> expenses -> total
            const dailyExpenses = Math.round(revenue.total - dailyProfit);
            // daily -> expenses -> repair
            const dailyRepairExpenseFraction = returnRandomRepairExpenses({
              storeLocation,
              year,
              yearRepairExpensesSpread,
            });
            const dailyRepairExpenses = Math.round(
              dailyExpenses * dailyRepairExpenseFraction
            );
            // daily -> expenses -> sales -> total
            const dailySalesExpenses = Math.round(dailyExpenses - dailyRepairExpenses);
            // daily -> expenses -> sales -> online
            const dailyOnlineExpenseFraction = returnRandomOnlineExpenses({
              storeLocation,
              year,
              yearOnlineExpensesSpread,
            });
            const dailyOnlineExpenses = Math.round(
              dailySalesExpenses * dailyOnlineExpenseFraction
            );
            // daily -> expenses -> sales -> inStore
            const dailyInStoreExpenses = Math.round(
              dailySalesExpenses - dailyOnlineExpenses
            );

            // daily -> transactions

            // corresponding day's total units sold in all products
            const dailyProductsSold =
              allProductsMetric.yearlyMetrics
                .find((productYearlyMetric) => productYearlyMetric.year === year)
                ?.monthlyMetrics.find(
                  (productMonthlyMetric) =>
                    productMonthlyMetric.month === monthlyFinancialMetric.month
                )
                ?.dailyMetrics.find(
                  (productDailyMetric) =>
                    productDailyMetric.day === dailyFinancialMetric.day
                )?.unitsSold.total ?? 0;

            // corresponding day's total units repaired in all repairs
            const dailyUnitsRepaired =
              allRepairsMetric.yearlyMetrics
                .find((repairYearlyMetric) => repairYearlyMetric.year === year)
                ?.monthlyMetrics.find(
                  (repairMonthlyMetric) =>
                    repairMonthlyMetric.month === monthlyFinancialMetric.month
                )
                ?.dailyMetrics.find(
                  (repairDailyMetric) =>
                    repairDailyMetric.day === dailyFinancialMetric.day
                )?.unitsRepaired ?? 0;

            const randomTransactionsFraction = Math.random() * (0.8 - 0.4) + 0.4;
            const dailyTransactions = Math.round(
              (dailyProductsSold + dailyUnitsRepaired) * randomTransactionsFraction
            );

            // daily -> transactions -> repair
            const dailyRepairTransactionsFraction = Math.random() * (0.2 - 0.1) + 0.1;
            const dailyRepairTransactions = Math.round(
              dailyUnitsRepaired * dailyRepairTransactionsFraction
            );

            // daily -> transactions -> sales
            const dailySalesTransactions = Math.round(
              dailyTransactions - dailyRepairTransactions
            );

            // daily -> transactions -> online
            const dailyOnlineTransactionsFraction = returnRandomOnlineTransactions({
              storeLocation,
              year,
              yearOnlineTransactionsSpread,
            });
            const dailyOnlineTransactions = Math.round(
              dailySalesTransactions * dailyOnlineTransactionsFraction
            );

            // daily -> transactions -> inStore
            const dailyInStoreTransactions = Math.round(
              dailySalesTransactions - dailyOnlineTransactions
            );

            // daily -> average order value
            const dailyAverageOrderValue = returnToFixedFloat(
              revenue.total / dailyTransactions
            );
            // daily -> conversion rate
            let dailyConversionRate = returnRandomConversionRate({
              storeLocation,
              year,
              yearConversionRateSpread,
            });
            dailyConversionRate = returnToFixedFloat(dailyConversionRate);

            const aggregatedDailyFinancialMetric: DailyFinancialMetric = {
              ...dailyFinancialMetric,
              averageOrderValue: dailyAverageOrderValue,
              conversionRate: dailyConversionRate,
              netProfitMargin: dailyNetProfitMargin,

              expenses: {
                total: dailyExpenses,
                repair: dailyRepairExpenses,
                sales: {
                  total: dailySalesExpenses,
                  online: dailyOnlineExpenses,
                  inStore: dailyInStoreExpenses,
                },
              },

              profit: {
                total: dailyProfit,
                repair: dailyRepairProfit,
                sales: {
                  total: dailySalesProfit,
                  online: dailyOnlineProfit,
                  inStore: dailyInStoreProfit,
                },
              },

              transactions: {
                total: dailyTransactions,
                repair: dailyRepairTransactions,
                sales: {
                  total: dailySalesTransactions,
                  online: dailyOnlineTransactions,
                  inStore: dailyInStoreTransactions,
                },
              },
            };

            return aggregatedDailyFinancialMetric;
          }
        );

        // monthly aggregation

        const dailyAverageOrderValues = aggregatedDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.averageOrderValue
        );
        let monthlyAverageOrderValue =
          dailyAverageOrderValues.reduce(
            (acc, dailyAverageOrderValue) => acc + dailyAverageOrderValue,
            0
          ) / dailyAverageOrderValues.length;
        monthlyAverageOrderValue = Math.round(monthlyAverageOrderValue);

        const dailyConversionRates = aggregatedDailyFinancialMetrics.map(
          (dailyFinancialMetric) => dailyFinancialMetric.conversionRate
        );
        let monthlyConversionRate =
          dailyConversionRates.reduce(
            (acc, dailyConversionRate) => acc + dailyConversionRate,
            0
          ) / dailyConversionRates.length;
        monthlyConversionRate = returnToFixedFloat(monthlyConversionRate);

        const [
          // expenses
          monthlyExpenses,
          monthlyRepairExpenses,
          monthlySalesExpenses,
          monthlyOnlineExpenses,
          monthlyInStoreExpenses,
          // profit
          monthlyProfit,
          monthlyRepairProfit,
          monthlySalesProfit,
          monthlyOnlineProfit,
          monthlyInStoreProfit,
          // transactions
          monthlyTransactions,
          monthlyRepairTransactions,
          monthlySalesTransactions,
          monthlyOnlineTransactions,
          monthlyInStoreTransactions,
        ] = aggregatedDailyFinancialMetrics.reduce(
          (monthlyFinancialMetricsAcc, dailyMetric) => {
            // expenses
            monthlyFinancialMetricsAcc[0] += dailyMetric.expenses.total;
            monthlyFinancialMetricsAcc[1] += dailyMetric.expenses.repair;
            monthlyFinancialMetricsAcc[2] += dailyMetric.expenses.sales.total;
            monthlyFinancialMetricsAcc[3] += dailyMetric.expenses.sales.online;
            monthlyFinancialMetricsAcc[4] += dailyMetric.expenses.sales.inStore;
            // profit
            monthlyFinancialMetricsAcc[5] += dailyMetric.profit.total;
            monthlyFinancialMetricsAcc[6] += dailyMetric.profit.repair;
            monthlyFinancialMetricsAcc[7] += dailyMetric.profit.sales.total;
            monthlyFinancialMetricsAcc[8] += dailyMetric.profit.sales.online;
            monthlyFinancialMetricsAcc[9] += dailyMetric.profit.sales.inStore;
            // transactions
            monthlyFinancialMetricsAcc[10] += dailyMetric.transactions.total;
            monthlyFinancialMetricsAcc[11] += dailyMetric.transactions.repair;
            monthlyFinancialMetricsAcc[12] += dailyMetric.transactions.sales.total;
            monthlyFinancialMetricsAcc[13] += dailyMetric.transactions.sales.online;
            monthlyFinancialMetricsAcc[14] += dailyMetric.transactions.sales.inStore;

            return monthlyFinancialMetricsAcc;
          },
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );

        const monthlyNetProfitMargin = returnToFixedFloat(
          monthlyProfit / monthlyExpenses
        );

        const aggregatedMonthlyFinancialMetric: MonthlyFinancialMetric = {
          ...monthlyFinancialMetric,
          averageOrderValue: monthlyAverageOrderValue,
          conversionRate: monthlyConversionRate,
          netProfitMargin: monthlyNetProfitMargin,

          expenses: {
            total: monthlyExpenses,
            repair: monthlyRepairExpenses,
            sales: {
              total: monthlySalesExpenses,
              online: monthlyOnlineExpenses,
              inStore: monthlyInStoreExpenses,
            },
          },

          profit: {
            total: monthlyProfit,
            repair: monthlyRepairProfit,
            sales: {
              total: monthlySalesProfit,
              online: monthlyOnlineProfit,
              inStore: monthlyInStoreProfit,
            },
          },

          transactions: {
            total: monthlyTransactions,
            repair: monthlyRepairTransactions,
            sales: {
              total: monthlySalesTransactions,
              online: monthlyOnlineTransactions,
              inStore: monthlyInStoreTransactions,
            },
          },

          dailyMetrics: aggregatedDailyFinancialMetrics,
        };

        return aggregatedMonthlyFinancialMetric;
      }
    );

    // yearly aggregation

    const monthlyAverageOrderValues = aggregatedMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => monthlyFinancialMetric.averageOrderValue
    );
    let yearlyAverageOrderValue =
      monthlyAverageOrderValues.reduce(
        (acc, monthlyAverageOrderValue) => acc + monthlyAverageOrderValue,
        0
      ) / monthlyAverageOrderValues.length;
    yearlyAverageOrderValue = returnToFixedFloat(yearlyAverageOrderValue);

    const monthlyConversionRates = aggregatedMonthlyFinancialMetrics.map(
      (monthlyFinancialMetric) => monthlyFinancialMetric.conversionRate
    );
    let yearlyConversionRate =
      monthlyConversionRates.reduce(
        (acc, monthlyConversionRate) => acc + monthlyConversionRate,
        0
      ) / monthlyConversionRates.length;
    yearlyConversionRate = returnToFixedFloat(yearlyConversionRate);

    const [
      // expenses
      yearlyExpenses,
      yearlyRepairExpenses,
      yearlySalesExpenses,
      yearlyOnlineExpenses,
      yearlyInStoreExpenses,
      // profit
      yearlyProfit,
      yearlyRepairProfit,
      yearlySalesProfit,
      yearlyOnlineProfit,
      yearlyInStoreProfit,
      // transactions
      yearlyTransactions,
      yearlyRepairTransactions,
      yearlySalesTransactions,
      yearlyOnlineTransactions,
      yearlyInStoreTransactions,
    ] = aggregatedMonthlyFinancialMetrics.reduce(
      (yearlyFinancialMetricsAcc, monthlyFinancialMetric) => {
        // expenses
        yearlyFinancialMetricsAcc[0] += monthlyFinancialMetric.expenses.total;
        yearlyFinancialMetricsAcc[1] += monthlyFinancialMetric.expenses.repair;
        yearlyFinancialMetricsAcc[2] += monthlyFinancialMetric.expenses.sales.total;
        yearlyFinancialMetricsAcc[3] += monthlyFinancialMetric.expenses.sales.online;
        yearlyFinancialMetricsAcc[4] += monthlyFinancialMetric.expenses.sales.inStore;
        // profit
        yearlyFinancialMetricsAcc[5] += monthlyFinancialMetric.profit.total;
        yearlyFinancialMetricsAcc[6] += monthlyFinancialMetric.profit.repair;
        yearlyFinancialMetricsAcc[7] += monthlyFinancialMetric.profit.sales.total;
        yearlyFinancialMetricsAcc[8] += monthlyFinancialMetric.profit.sales.online;
        yearlyFinancialMetricsAcc[9] += monthlyFinancialMetric.profit.sales.inStore;
        // transactions
        yearlyFinancialMetricsAcc[10] += monthlyFinancialMetric.transactions.total;
        yearlyFinancialMetricsAcc[11] += monthlyFinancialMetric.transactions.repair;
        yearlyFinancialMetricsAcc[12] += monthlyFinancialMetric.transactions.sales.total;
        yearlyFinancialMetricsAcc[13] += monthlyFinancialMetric.transactions.sales.online;
        yearlyFinancialMetricsAcc[14] +=
          monthlyFinancialMetric.transactions.sales.inStore;

        return yearlyFinancialMetricsAcc;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    const yearlyNetProfitMargin = returnToFixedFloat(yearlyProfit / yearlyExpenses);

    const newFinancialMetric: YearlyFinancialMetric = {
      ...financialMetric,
      averageOrderValue: yearlyAverageOrderValue,
      conversionRate: yearlyConversionRate,
      netProfitMargin: yearlyNetProfitMargin,

      expenses: {
        total: yearlyExpenses,
        repair: yearlyRepairExpenses,
        sales: {
          total: yearlySalesExpenses,
          online: yearlyOnlineExpenses,
          inStore: yearlyInStoreExpenses,
        },
      },

      profit: {
        total: yearlyProfit,
        repair: yearlyRepairProfit,
        sales: {
          total: yearlySalesProfit,
          online: yearlyOnlineProfit,
          inStore: yearlyInStoreProfit,
        },
      },

      transactions: {
        total: yearlyTransactions,
        repair: yearlyRepairTransactions,
        sales: {
          total: yearlySalesTransactions,
          online: yearlyOnlineTransactions,
          inStore: yearlyInStoreTransactions,
        },
      },

      monthlyMetrics: aggregatedMonthlyFinancialMetrics,
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
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    5, 15,
  ];
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
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.1, 0.3,
  ];
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
  const yearSpread = Object.entries(store).find(([yearKey]) => yearKey === year)?.[1] ?? [
    0.2, 0.1,
  ];
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
            const dailyNewRepairCustomersFraction = Math.random() * (0.15 - 0.05) + 0.05; // spread between 0.05 and 0.15
            const dailyNewRepairCustomers = Math.round(
              dailyNewCustomers * dailyNewRepairCustomersFraction
            );
            // new -> sales
            const dailyNewSalesCustomers = dailyNewCustomers - dailyNewRepairCustomers;
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
            const dailyReturningCustomers = dailyCustomersTotal - dailyNewCustomers;
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
              dailyReturningSalesCustomers * dailyReturningSalesOnlineCustomersFraction
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
              monthlyCustomerMetricsAcc.customers.new.total += customers.new.total;
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
              monthlyCustomerMetricsAcc.customers.new.repair += customers.new.repair;

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
          monthlyCustomerMetric.customers.retentionRate = monthlyCustomerRetentionRate;

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
          yearlyCustomerMetricsAcc.customers.new.sales.total += customers.new.sales.total;
          // new -> sales -> online
          yearlyCustomerMetricsAcc.customers.new.sales.online +=
            customers.new.sales.online;
          // new -> sales -> in store
          yearlyCustomerMetricsAcc.customers.new.sales.inStore +=
            customers.new.sales.inStore;
          // new -> repair
          yearlyCustomerMetricsAcc.customers.new.repair += customers.new.repair;

          // returning
          yearlyCustomerMetricsAcc.customers.returning.total += customers.returning.total;
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
      yearlyCustomerMetric.customers.retentionRate = yearlyCustomerRetentionRate;

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
      storeLocationBusinessMetrics.storeLocation === "Edmonton"
  );
  // clone edmonton store customer metrics
  const clonedEdmontonCustomerMetrics = structuredClone(
    edmontonStore?.customerMetrics
  ) as CustomerMetrics; // Edmonton store is guaranteed to exist and all customer fields overlap with other stores

  const allLocationsCustomerMetrics = storeLocationsBusinessMetrics.reduce(
    (allLocationsCustomerMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === "Edmonton") {
        return allLocationsCustomerMetricsAcc;
      }

      const { customerMetrics } = storeLocationBusinessMetrics;
      const { totalCustomers, yearlyMetrics: yearlyCustomerMetrics } = customerMetrics;

      yearlyCustomerMetrics.forEach((yearlyCustomerMetric, yearlyCustomerMetricIdx) => {
        const {
          customers: yearlyCustomers,
          monthlyMetrics: monthlyCustomerMetrics,
          year,
        } = yearlyCustomerMetric;

        // find existing yearly customer metric
        const existingYearlyCustomerMetric =
          clonedEdmontonCustomerMetrics?.yearlyMetrics.find(
            (existingYearlyCustomerMetric) => existingYearlyCustomerMetric.year === year
          ) as CustomerYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

        // update it with the new store's yearly customer metric
        existingYearlyCustomerMetric.customers.total += yearlyCustomers.total;
        // new
        existingYearlyCustomerMetric.customers.new.total += yearlyCustomers.new.total;
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
        existingYearlyCustomerMetric.customers.new.repair += yearlyCustomers.new.repair;

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
        existingYearlyCustomerMetric.customers.churnRate = averageYearlyChurnRate;

        // average the retention rates
        const existingYearlyCustomerRetentionRate =
          existingYearlyCustomerMetric.customers.retentionRate;
        const averageYearlyRetentionRate =
          yearlyCustomers.retentionRate / 2 + existingYearlyCustomerRetentionRate / 2;
        existingYearlyCustomerMetric.customers.retentionRate = averageYearlyRetentionRate;

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
            existingMonthlyCustomerMetric.customers.total += monthlyCustomers.total;
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
              (monthlyCustomers.churnRate + existingMonthlyCustomerChurnRate) / 2;
            existingMonthlyCustomerMetric.customers.churnRate = averageMonthlyChurnRate;

            // average the retention rates
            const existingMonthlyCustomerRetentionRate =
              existingMonthlyCustomerMetric.customers.retentionRate;
            const averageMonthlyRetentionRate =
              (monthlyCustomers.retentionRate + existingMonthlyCustomerRetentionRate) / 2;
            existingMonthlyCustomerMetric.customers.retentionRate =
              averageMonthlyRetentionRate;

            // update daily metrics
            dailyCustomerMetrics.forEach((dailyCustomerMetric) => {
              const { customers } = dailyCustomerMetric;

              // find existing daily customer metric
              const existingDailyCustomerMetric =
                existingMonthlyCustomerMetric.dailyMetrics.find(
                  (existingDailyCustomerMetric) =>
                    existingDailyCustomerMetric.day === dailyCustomerMetric.day
                ) as CustomerDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

              // update it with the new store's daily customer metric
              existingDailyCustomerMetric.customers.total += customers.total;
              // new
              existingDailyCustomerMetric.customers.new.total += customers.new.total;
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
              existingDailyCustomerMetric.customers.new.repair += customers.new.repair;

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
      });

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
      storeLocationBusinessMetrics.storeLocation === "Edmonton"
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store repair metrics
  const clonedEdmontonRepairMetrics = structuredClone(
    edmontonStore.repairMetrics
  ) as RepairMetric[]; // all edmonton store repair fields overlap with other stores

  const allLocationsRepairMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsRepairMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === "Edmonton") {
        return allLocationsRepairMetricsAcc;
      }

      const { repairMetrics } = storeLocationBusinessMetrics;

      repairMetrics.forEach((repairMetric) => {
        const { name, yearlyMetrics } = repairMetric;

        // find existing repair metric
        const existingRepairCategoryMetric = clonedEdmontonRepairMetrics.find(
          (existingRepairMetric) => existingRepairMetric.name === name
        ) as RepairMetric; // repair category is guaranteed to exist (edmonton store overlaps all repair categories of other stores)

        // aggregate yearly repair metrics
        yearlyMetrics.forEach((yearlyRepairMetric) => {
          const {
            monthlyMetrics: monthlyRepairMetrics,
            unitsRepaired,
            revenue,
            year,
          } = yearlyRepairMetric;

          // find existing yearly repair metric
          const existingYearlyRepairMetric =
            existingRepairCategoryMetric.yearlyMetrics.find(
              (existingYearlyRepairMetric) => existingYearlyRepairMetric.year === year
            ) as RepairYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

          // yearly
          // yearly -> unitsRepaired
          existingYearlyRepairMetric.unitsRepaired += unitsRepaired;
          // yearly -> revenue
          existingYearlyRepairMetric.revenue += revenue;

          // monthly repair metrics
          monthlyRepairMetrics.forEach((monthlyRepairMetric) => {
            const {
              dailyMetrics: dailyRepairMetrics,
              month,
              unitsRepaired,
              revenue,
            } = monthlyRepairMetric;

            // find existing monthly repair metric
            const existingMonthlyRepairMetric =
              existingYearlyRepairMetric.monthlyMetrics.find(
                (existingMonthlyRepairMetric) =>
                  existingMonthlyRepairMetric.month === month
              ) as RepairMonthlyMetric; // month is guaranteed to exist (all stores start on Jan)

            // monthly
            // monthly -> unitsRepaired
            existingMonthlyRepairMetric.unitsRepaired += unitsRepaired;
            // monthly -> revenue
            existingMonthlyRepairMetric.revenue += revenue;

            // aggregate daily repair metrics
            dailyRepairMetrics.forEach((dailyRepairMetric) => {
              const { day, unitsRepaired, revenue } = dailyRepairMetric;

              // find existing daily repair metric
              const existingDailyRepairMetric =
                existingMonthlyRepairMetric.dailyMetrics.find(
                  (existingDailyRepairMetric) => existingDailyRepairMetric.day === day
                ) as RepairDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

              // daily
              // daily -> unitsRepaired
              existingDailyRepairMetric.unitsRepaired += unitsRepaired;
              // daily -> revenue
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
      storeLocationBusinessMetrics.storeLocation === "Edmonton"
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store financial metrics
  const clonedEdmontonFinancialMetrics = structuredClone(
    edmontonStore.financialMetrics
  ) as YearlyFinancialMetric[]; // all edmonton store financial fields overlap with other stores

  const allLocationsFinancialMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsFinancialMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === "Edmonton") {
        return allLocationsFinancialMetricsAcc;
      }

      const { financialMetrics } = storeLocationBusinessMetrics;

      financialMetrics.forEach((financialMetric) => {
        const {
          monthlyMetrics: monthlyFinancialMetrics,
          year,
          expenses,
          profit,
          revenue,
          transactions,
        } = financialMetric;

        // find existing financial metric
        const existingFinancialMetric = clonedEdmontonFinancialMetrics.find(
          (existingFinancialMetric) => existingFinancialMetric.year === year
        ) as YearlyFinancialMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

        // aggregate yearly financial metric

        // yearly
        // yearly -> average order value
        const averageOrderValues = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.averageOrderValue
        );
        const averageAverageOrderValue =
          averageOrderValues.reduce(
            (acc, averageOrderValue) => acc + averageOrderValue,
            0
          ) / averageOrderValues.length;
        existingFinancialMetric.averageOrderValue = Math.round(
          (existingFinancialMetric.averageOrderValue + averageAverageOrderValue) / 2
        );

        // yearly -> conversion rate
        const conversionRates = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.conversionRate
        );
        const averageConversionRate =
          conversionRates.reduce((acc, conversionRate) => acc + conversionRate, 0) /
          conversionRates.length;
        existingFinancialMetric.conversionRate = returnToFixedFloat(
          (existingFinancialMetric.conversionRate + averageConversionRate) / 2
        );

        // yearly -> net profit margin
        const netProfitMargins = financialMetrics.map(
          (yearlyFinancialMetric) => yearlyFinancialMetric.netProfitMargin
        );
        const averageNetProfitMargin =
          netProfitMargins.reduce((acc, netProfitMargin) => acc + netProfitMargin, 0) /
          netProfitMargins.length;
        existingFinancialMetric.netProfitMargin = returnToFixedFloat(
          (existingFinancialMetric.netProfitMargin + averageNetProfitMargin) / 2
        );

        // yearly -> expenses
        // yearly -> expenses -> total
        existingFinancialMetric.expenses.total += expenses.total;
        // yearly -> expenses -> repair
        existingFinancialMetric.expenses.repair += expenses.repair;
        // yearly -> expenses -> sales
        // yearly -> expenses -> sales -> total
        existingFinancialMetric.expenses.sales.total += expenses.sales.total;
        // yearly -> expenses -> sales -> online
        existingFinancialMetric.expenses.sales.online += expenses.sales.online;
        // yearly -> expenses -> sales -> in store
        existingFinancialMetric.expenses.sales.inStore += expenses.sales.inStore;

        // yearly -> profit
        // yearly -> profit -> total
        existingFinancialMetric.profit.total += profit.total;
        // yearly -> profit -> repair
        existingFinancialMetric.profit.repair += profit.repair;
        // yearly -> profit -> sales
        // yearly -> profit -> sales -> total
        existingFinancialMetric.profit.sales.total += profit.sales.total;
        // yearly -> profit -> sales -> online
        existingFinancialMetric.profit.sales.online += profit.sales.online;
        // yearly -> profit -> sales -> in store
        existingFinancialMetric.profit.sales.inStore += profit.sales.inStore;

        // yearly -> revenue
        // yearly -> revenue -> total
        existingFinancialMetric.revenue.total += revenue.total;
        // yearly -> revenue -> repair
        existingFinancialMetric.revenue.repair += revenue.repair;
        // yearly -> revenue -> sales
        // yearly -> revenue -> sales -> total
        existingFinancialMetric.revenue.sales.total += revenue.sales.total;
        // yearly -> revenue -> sales -> online
        existingFinancialMetric.revenue.sales.online += revenue.sales.online;
        // yearly -> revenue -> sales -> in store
        existingFinancialMetric.revenue.sales.inStore += revenue.sales.inStore;

        // yearly -> transactions
        // yearly -> transactions -> total
        existingFinancialMetric.transactions.total += transactions.total;
        // yearly -> transactions -> repair
        existingFinancialMetric.transactions.repair += transactions.repair;
        // yearly -> transactions -> sales
        // yearly -> transactions -> sales -> total
        existingFinancialMetric.transactions.sales.total += transactions.sales.total;
        // yearly -> transactions -> sales -> online
        existingFinancialMetric.transactions.sales.online += transactions.sales.online;
        // yearly -> transactions -> sales -> in store
        existingFinancialMetric.transactions.sales.inStore += transactions.sales.inStore;

        // aggregate monthly financial metrics

        monthlyFinancialMetrics.forEach((monthlyFinancialMetric) => {
          const {
            dailyMetrics: dailyFinancialMetrics,
            expenses,
            month,
            profit,
            revenue,
            transactions,
          } = monthlyFinancialMetric;

          // find existing monthly financial metric
          const existingMonthlyFinancialMetric =
            existingFinancialMetric.monthlyMetrics.find(
              (existingMonthlyFinancialMetric) =>
                existingMonthlyFinancialMetric.month === month
            ) as MonthlyFinancialMetric; // month is guaranteed to exist (all stores start on Jan)

          // aggregate existing monthly financial metric

          // monthly
          // monthly -> average order value
          const averageOrderValues = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.averageOrderValue
          );
          const averageMonthlyAverageOrderValue =
            averageOrderValues.reduce(
              (acc, averageOrderValue) => acc + averageOrderValue,
              0
            ) / averageOrderValues.length;
          existingMonthlyFinancialMetric.averageOrderValue = Math.round(
            (existingMonthlyFinancialMetric.averageOrderValue +
              averageMonthlyAverageOrderValue) /
              2
          );

          // monthly -> conversion rate
          const conversionRates = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.conversionRate
          );
          const averageMonthlyConversionRate =
            conversionRates.reduce((acc, conversionRate) => acc + conversionRate, 0) /
            conversionRates.length;
          existingMonthlyFinancialMetric.conversionRate = returnToFixedFloat(
            (existingMonthlyFinancialMetric.conversionRate +
              averageMonthlyConversionRate) /
              2
          );

          // monthly -> net profit margin
          const averageNetProfitMargins = monthlyFinancialMetrics.map(
            (monthlyFinancialMetric) => monthlyFinancialMetric.netProfitMargin
          );
          const averageMonthlyNetProfitMargin =
            averageNetProfitMargins.reduce(
              (acc, netProfitMargin) => acc + netProfitMargin,
              0
            ) / averageNetProfitMargins.length;
          existingMonthlyFinancialMetric.netProfitMargin = returnToFixedFloat(
            (existingMonthlyFinancialMetric.netProfitMargin +
              averageMonthlyNetProfitMargin) /
              2
          );

          // monthly -> expenses
          // monthly -> expenses -> total
          existingMonthlyFinancialMetric.expenses.total += expenses.total;
          // monthly -> expenses -> repair
          existingMonthlyFinancialMetric.expenses.repair += expenses.repair;
          // monthly -> expenses -> sales
          // monthly -> expenses -> sales -> total
          existingMonthlyFinancialMetric.expenses.sales.total += expenses.sales.total;
          // monthly -> expenses -> sales -> online
          existingMonthlyFinancialMetric.expenses.sales.online += expenses.sales.online;
          // monthly -> expenses -> sales -> in store
          existingMonthlyFinancialMetric.expenses.sales.inStore += expenses.sales.inStore;

          // monthly -> profit
          // monthly -> profit -> total
          existingMonthlyFinancialMetric.profit.total += profit.total;
          // monthly -> profit -> repair
          existingMonthlyFinancialMetric.profit.repair += profit.repair;
          // monthly -> profit -> sales
          // monthly -> profit -> sales -> total
          existingMonthlyFinancialMetric.profit.sales.total += profit.sales.total;
          // monthly -> profit -> sales -> online
          existingMonthlyFinancialMetric.profit.sales.online += profit.sales.online;
          // monthly -> profit -> sales -> in store
          existingMonthlyFinancialMetric.profit.sales.inStore += profit.sales.inStore;

          // monthly -> revenue
          // monthly -> revenue -> total
          existingMonthlyFinancialMetric.revenue.total += revenue.total;
          // monthly -> revenue -> repair
          existingMonthlyFinancialMetric.revenue.repair += revenue.repair;
          // monthly -> revenue -> sales
          // monthly -> revenue -> sales -> total
          existingMonthlyFinancialMetric.revenue.sales.total += revenue.sales.total;
          // monthly -> revenue -> sales -> online
          existingMonthlyFinancialMetric.revenue.sales.online += revenue.sales.online;
          // monthly -> revenue -> sales -> in store
          existingMonthlyFinancialMetric.revenue.sales.inStore += revenue.sales.inStore;

          // monthly -> transactions
          // monthly -> transactions -> total
          existingMonthlyFinancialMetric.transactions.total += transactions.total;
          // monthly -> transactions -> repair
          existingMonthlyFinancialMetric.transactions.repair += transactions.repair;
          // monthly -> transactions -> sales
          // monthly -> transactions -> sales -> total
          existingMonthlyFinancialMetric.transactions.sales.total +=
            transactions.sales.total;
          // monthly -> transactions -> sales -> online
          existingMonthlyFinancialMetric.transactions.sales.online +=
            transactions.sales.online;
          // monthly -> transactions -> sales -> in store
          existingMonthlyFinancialMetric.transactions.sales.inStore +=
            transactions.sales.inStore;

          // aggregate daily financial metrics
          dailyFinancialMetrics.forEach((dailyFinancialMetric) => {
            const { day, expenses, profit, revenue, transactions } = dailyFinancialMetric;

            // find existing daily financial metric
            const existingDailyFinancialMetric =
              existingMonthlyFinancialMetric.dailyMetrics.find(
                (existingDailyFinancialMetric) => existingDailyFinancialMetric.day === day
              ) as DailyFinancialMetric; // day is guaranteed to exist (all stores start on Jan. 01)

            // aggregate daily financial metric

            // daily
            // average the average order values
            const averageOrderValues = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.averageOrderValue
            );
            const averageDailyAverageOrderValue =
              averageOrderValues.reduce(
                (acc, averageOrderValue) => acc + averageOrderValue,
                0
              ) / averageOrderValues.length;
            existingDailyFinancialMetric.averageOrderValue = Math.round(
              existingDailyFinancialMetric.averageOrderValue +
                averageDailyAverageOrderValue / 2
            );

            // average the conversion rates
            const conversionRates = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.conversionRate
            );
            const averageDailyConversionRate =
              conversionRates.reduce((acc, conversionRate) => acc + conversionRate, 0) /
              conversionRates.length;
            existingDailyFinancialMetric.conversionRate = returnToFixedFloat(
              (existingDailyFinancialMetric.conversionRate + averageDailyConversionRate) /
                2
            );

            // average the net profit margins
            const averageNetProfitMargins = dailyFinancialMetrics.map(
              (dailyFinancialMetric) => dailyFinancialMetric.netProfitMargin
            );
            const averageDailyNetProfitMargin =
              averageNetProfitMargins.reduce(
                (acc, netProfitMargin) => acc + netProfitMargin,
                0
              ) / averageNetProfitMargins.length;
            existingDailyFinancialMetric.netProfitMargin = returnToFixedFloat(
              existingDailyFinancialMetric.netProfitMargin +
                averageDailyNetProfitMargin / 2
            );

            // daily -> expenses
            // daily -> expenses -> total
            existingDailyFinancialMetric.expenses.total += expenses.total;
            // daily -> expenses -> repair
            existingDailyFinancialMetric.expenses.repair += expenses.repair;
            // daily -> expenses -> sales
            // daily -> expenses -> sales -> total
            existingDailyFinancialMetric.expenses.sales.total += expenses.sales.total;
            // daily -> expenses -> sales -> online
            existingDailyFinancialMetric.expenses.sales.online += expenses.sales.online;
            // daily -> expenses -> sales -> in store
            existingDailyFinancialMetric.expenses.sales.inStore += expenses.sales.inStore;

            // daily -> profit
            // daily -> profit -> total
            existingDailyFinancialMetric.profit.total += profit.total;
            // daily -> profit -> repair
            existingDailyFinancialMetric.profit.repair += profit.repair;
            // daily -> profit -> sales
            // daily -> profit -> sales -> total
            existingDailyFinancialMetric.profit.sales.total += profit.sales.total;
            // daily -> profit -> sales -> online
            existingDailyFinancialMetric.profit.sales.online += profit.sales.online;
            // daily -> profit -> sales -> in store
            existingDailyFinancialMetric.profit.sales.inStore += profit.sales.inStore;

            // daily -> revenue
            // daily -> revenue -> total
            existingDailyFinancialMetric.revenue.total += revenue.total;
            // daily -> revenue -> repair
            existingDailyFinancialMetric.revenue.repair += revenue.repair;
            // daily -> revenue -> sales
            // daily -> revenue -> sales -> total
            existingDailyFinancialMetric.revenue.sales.total += revenue.sales.total;
            // daily -> revenue -> sales -> online
            existingDailyFinancialMetric.revenue.sales.online += revenue.sales.online;
            // daily -> revenue -> sales -> in store
            existingDailyFinancialMetric.revenue.sales.inStore += revenue.sales.inStore;

            // daily -> transactions
            // daily -> transactions -> total
            existingDailyFinancialMetric.transactions.total += transactions.total;
            // daily -> transactions -> repair
            existingDailyFinancialMetric.transactions.repair += transactions.repair;
            // daily -> transactions -> sales
            // daily -> transactions -> sales -> total
            existingDailyFinancialMetric.transactions.sales.total +=
              transactions.sales.total;
            // daily -> transactions -> sales -> online
            existingDailyFinancialMetric.transactions.sales.online +=
              transactions.sales.online;
            // daily -> transactions -> sales -> in store
            existingDailyFinancialMetric.transactions.sales.inStore +=
              transactions.sales.inStore;
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
      storeLocationBusinessMetrics.storeLocation === "Edmonton"
  ) as BusinessMetric; // edmonton store is guaranteed to exist

  // clone edmonton store product metrics
  const clonedEdmontonProductMetrics = structuredClone(
    edmontonStore.productMetrics
  ) as ProductMetric[]; // all edmonton store product fields overlap with other stores

  const allLocationsProductMetrics = storeLocationBusinessMetrics.reduce(
    (allLocationsProductMetricsAcc, storeLocationBusinessMetrics) => {
      // ignore edmonton store as it is the template
      if (storeLocationBusinessMetrics.storeLocation === "Edmonton") {
        return allLocationsProductMetricsAcc;
      }

      const { productMetrics } = storeLocationBusinessMetrics;

      productMetrics.forEach((productMetric) => {
        const { name, yearlyMetrics } = productMetric;

        // find existing product metric
        const existingProductCategoryMetric = clonedEdmontonProductMetrics.find(
          (existingProductMetric) => existingProductMetric.name === name
        ) as ProductMetric; // product category is guaranteed to exist (edmonton store overlaps all product categories of other stores)

        yearlyMetrics.forEach((yearlyProductMetric) => {
          const {
            monthlyMetrics: monthlyProductMetrics,
            unitsSold,
            revenue,
            year,
          } = yearlyProductMetric;

          // find existing yearly product metric
          const existingYearlyProductMetric =
            existingProductCategoryMetric.yearlyMetrics.find(
              (existingYearlyProductMetric) => existingYearlyProductMetric.year === year
            ) as ProductYearlyMetric; // year is guaranteed to exist (edmonton store overlaps all years of other stores)

          // aggregate existing yearly product metric

          // yearly -> unitsSold
          // yearly -> unitsSold -> total
          existingYearlyProductMetric.unitsSold.total += unitsSold.total;
          // yearly -> unitsSold -> online
          existingYearlyProductMetric.unitsSold.online += unitsSold.online;
          // yearly -> unitsSold -> in store
          existingYearlyProductMetric.unitsSold.inStore += unitsSold.inStore;

          // yearly -> revenue
          // yearly -> revenue -> total
          existingYearlyProductMetric.revenue.total += revenue.total;
          // yearly -> revenue -> online
          existingYearlyProductMetric.revenue.online += revenue.online;
          // yearly -> revenue -> in store
          existingYearlyProductMetric.revenue.inStore += revenue.inStore;

          // aggregate monthly product metrics
          monthlyProductMetrics.forEach((monthlyProductMetric) => {
            const {
              dailyMetrics: dailyProductMetrics,
              month,
              unitsSold,
              revenue,
            } = monthlyProductMetric;

            // find existing monthly product metric
            const existingMonthlyProductMetric =
              existingYearlyProductMetric.monthlyMetrics.find(
                (existingMonthlyProductMetric) =>
                  existingMonthlyProductMetric.month === month
              ) as ProductMonthlyMetric; // month is guaranteed to exist (all stores start on Jan)

            // aggregate existing monthly product metric

            // monthly -> unitsSold
            // monthly -> unitsSold -> total
            existingMonthlyProductMetric.unitsSold.total += unitsSold.total;
            // monthly -> unitsSold -> online
            existingMonthlyProductMetric.unitsSold.online += unitsSold.online;
            // monthly -> unitsSold -> in store
            existingMonthlyProductMetric.unitsSold.inStore += unitsSold.inStore;

            // monthly -> revenue
            // monthly -> revenue -> total
            existingMonthlyProductMetric.revenue.total += revenue.total;
            // monthly -> revenue -> online
            existingMonthlyProductMetric.revenue.online += revenue.online;
            // monthly -> revenue -> in store
            existingMonthlyProductMetric.revenue.inStore += revenue.inStore;

            // aggregate daily product metrics
            dailyProductMetrics.forEach((dailyProductMetric) => {
              const { day, unitsSold, revenue } = dailyProductMetric;

              // find existing daily product metric
              const existingDailyProductMetric =
                existingMonthlyProductMetric.dailyMetrics.find(
                  (existingDailyProductMetric) => existingDailyProductMetric.day === day
                ) as ProductDailyMetric; // day is guaranteed to exist (all stores start on Jan. 01)

              // aggregate existing daily product metric

              // daily -> unitsSold
              // daily -> unitsSold -> total
              existingDailyProductMetric.unitsSold.total += unitsSold.total;
              // daily -> unitsSold -> online
              existingDailyProductMetric.unitsSold.online += unitsSold.online;
              // daily -> unitsSold -> in store
              existingDailyProductMetric.unitsSold.inStore += unitsSold.inStore;

              // daily -> revenue
              // daily -> revenue -> total
              existingDailyProductMetric.revenue.total += revenue.total;
              // daily -> revenue -> online
              existingDailyProductMetric.revenue.online += revenue.online;
              // daily -> revenue -> in store
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
};

function createRandomBusinessMetrics({
  daysPerMonth,
  months,
  productCategories,
  repairCategories,
  storeLocations,
}: CreateRandomBusinessMetricsInput): BusinessMetric[] {
  /**
   * - random daily unitsSold spread between [min, max] per year
   */
  const YEAR_UNITS_SOLD_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [1, 2],
      "2014": [2, 3],
      "2015": [2, 5],
      "2016": [3, 7],
      "2017": [5, 9],
      "2018": [5, 11],
      "2019": [7, 13],
      "2020": [15, 17],
      "2021": [17, 19],
      "2022": [17, 19],
      "2023": [13, 15],
    },
    Calgary: {
      "2017": [1, 2],
      "2018": [2, 4],
      "2019": [3, 7],
      "2020": [7, 9],
      "2021": [9, 11],
      "2022": [9, 11],
      "2023": [5, 7],
    },
    Vancouver: {
      "2019": [1, 2],
      "2020": [3, 5],
      "2021": [5, 9],
      "2022": [5, 9],
      "2023": [2, 4],
    },
  };

  /**
   * - random daily unitsRepaired spread between [min, max] per year
   */
  const YEAR_UNITS_REPAIRED_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [1, 2],
      "2014": [1, 3],
      "2015": [2, 4],
      "2016": [3, 5],
      "2017": [5, 7],
      "2018": [5, 9],
      "2019": [7, 11],
      "2020": [6, 8],
      "2021": [5, 8],
      "2022": [7, 11],
      "2023": [10, 13],
    },
    Calgary: {
      "2017": [2, 4],
      "2018": [2, 5],
      "2019": [6, 9],
      "2020": [5, 8],
      "2021": [4, 7],
      "2022": [6, 9],
      "2023": [8, 11],
    },
    Vancouver: {
      "2019": [3, 5],
      "2020": [6, 9],
      "2021": [5, 8],
      "2022": [6, 9],
      "2023": [9, 11],
    },
  };

  /**
   * - random daily unitsSold spread between [min, max] per year
   */
  const YEAR_PROFIT_MARGIN_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.03, 0.13],
      "2014": [0.04, 0.14],
      "2015": [0.05, 0.15],
      "2016": [0.06, 0.16],
      "2017": [0.11, 0.21],
      "2018": [0.13, 0.23],
      "2019": [0.15, 0.25],
      "2020": [0.25, 0.35],
      "2021": [0.27, 0.37],
      "2022": [0.27, 0.37],
      "2023": [0.23, 0.33],
    },
    Calgary: {
      "2017": [0.07, 0.17],
      "2018": [0.08, 0.18],
      "2019": [0.09, 0.19],
      "2020": [0.15, 0.25],
      "2021": [0.17, 0.27],
      "2022": [0.17, 0.27],
      "2023": [0.13, 0.23],
    },
    Vancouver: {
      "2019": [0.09, 0.19],
      "2020": [0.13, 0.23],
      "2021": [0.17, 0.27],
      "2022": [0.17, 0.27],
      "2023": [0.15, 0.25],
    },
  };

  /**
   * ratio of repair profit to total profit spread between [min, max] per year
   */
  const YEAR_REPAIR_PROFIT_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0, 0.01],
      "2014": [0.01, 0.015],
      "2015": [0.015, 0.02],
      "2016": [0.02, 0.025],
      "2017": [0.05, 0.055],
      "2018": [0.055, 0.06],
      "2019": [0.06, 0.065],
      "2020": [0.08, 0.085],
      "2021": [0.085, 0.09],
      "2022": [0.085, 0.09],
      "2023": [0.075, 0.08],
    },
    Calgary: {
      "2017": [0.02, 0.025],
      "2018": [0.025, 0.03],
      "2019": [0.03, 0.035],
      "2020": [0.05, 0.055],
      "2021": [0.055, 0.06],
      "2022": [0.055, 0.06],
      "2023": [0.045, 0.05],
    },
    Vancouver: {
      "2019": [0.03, 0.035],
      "2020": [0.045, 0.05],
      "2021": [0.055, 0.06],
      "2022": [0.055, 0.06],
      "2023": [0.05, 0.055],
    },
  };

  /**
   * ratio of online profit to (total profit - repair profit) spread between [min, max] per year
   */
  const YEAR_ONLINE_PROFIT_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.3, 0.35],
      "2014": [0.35, 0.4],
      "2015": [0.4, 0.45],
      "2016": [0.45, 0.5],
      "2017": [0.5, 0.55],
      "2018": [0.55, 0.6],
      "2019": [0.6, 0.65],
      "2020": [0.65, 0.7],
      "2021": [0.7, 0.75],
      "2022": [0.7, 0.75],
      "2023": [0.65, 0.7],
    },
    Calgary: {
      "2017": [0.4, 0.45],
      "2018": [0.45, 0.5],
      "2019": [0.5, 0.55],
      "2020": [0.55, 0.6],
      "2021": [0.6, 0.65],
      "2022": [0.6, 0.65],
      "2023": [0.55, 0.6],
    },
    Vancouver: {
      "2019": [0.45, 0.5],
      "2020": [0.55, 0.6],
      "2021": [0.6, 0.65],
      "2022": [0.6, 0.65],
      "2023": [0.55, 0.6],
    },
  };

  /**
   * ratio of repair expenses to total expenses spread between [min, max] per year
   */
  const YEAR_REPAIR_EXPENSES_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.23, 0.25],
      "2014": [0.21, 0.23],
      "2015": [0.19, 0.21],
      "2016": [0.17, 0.19],
      "2017": [0.15, 0.17],
      "2018": [0.13, 0.15],
      "2019": [0.11, 0.13],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.1],
      "2023": [0.1, 0.11],
    },
    Calgary: {
      "2017": [0.15, 0.17],
      "2018": [0.13, 0.15],
      "2019": [0.11, 0.13],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.1],
      "2023": [0.1, 0.11],
    },
    Vancouver: {
      "2019": [0.11, 0.13],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.1],
      "2023": [0.1, 0.11],
    },
  };

  /**
   * ratio of online expenses to sales expenses spread between [min, max] per year
   */
  const YEAR_ONLINE_EXPENSES_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.2, 0.22],
      "2014": [0.18, 0.2],
      "2015": [0.16, 0.18],
      "2016": [0.14, 0.16],
      "2017": [0.1, 0.12],
      "2018": [0.08, 0.1],
      "2019": [0.06, 0.08],
      "2020": [0.05, 0.07],
      "2021": [0.04, 0.06],
      "2022": [0.04, 0.06],
      "2023": [0.05, 0.07],
    },
    Calgary: {
      "2017": [0.14, 0.16],
      "2018": [0.12, 0.14],
      "2019": [0.1, 0.12],
      "2020": [0.08, 0.1],
      "2021": [0.06, 0.08],
      "2022": [0.06, 0.08],
      "2023": [0.05, 0.07],
    },
    Vancouver: {
      "2019": [0.1, 0.12],
      "2020": [0.08, 0.1],
      "2021": [0.06, 0.08],
      "2022": [0.06, 0.08],
      "2023": [0.05, 0.07],
    },
  };

  /**
   * ratio of online transactions to total transactions spread between [min, max] per year
   */
  const YEAR_ONLINE_TRANSACTIONS_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.15, 0.25],
      "2014": [0.2, 0.25],
      "2015": [0.25, 0.3],
      "2016": [0.3, 0.35],
      "2017": [0.35, 0.4],
      "2018": [0.4, 0.45],
      "2019": [0.45, 0.5],
      "2020": [0.65, 0.85],
      "2021": [0.65, 0.75],
      "2022": [0.65, 0.75],
      "2023": [0.6, 0.7],
    },
    Calgary: {
      "2017": [0.35, 0.4],
      "2018": [0.4, 0.45],
      "2019": [0.45, 0.5],
      "2020": [0.65, 0.85],
      "2021": [0.65, 0.75],
      "2022": [0.65, 0.75],
      "2023": [0.6, 0.7],
    },
    Vancouver: {
      "2019": [0.45, 0.5],
      "2020": [0.65, 0.85],
      "2021": [0.65, 0.75],
      "2022": [0.65, 0.75],
      "2023": [0.6, 0.7],
    },
  };

  /**
   * conversion rate spread between [min, max] per year
   * @see https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/
   */
  const YEAR_CONVERSION_RATE_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.01, 0.011],
      "2014": [0.011, 0.012],
      "2015": [0.012, 0.013],
      "2016": [0.013, 0.014],
      "2017": [0.02, 0.025],
      "2018": [0.025, 0.03],
      "2019": [0.03, 0.035],
      "2020": [0.035, 0.04],
      "2021": [0.04, 0.045],
      "2022": [0.04, 0.045],
      "2023": [0.035, 0.04],
    },
    Calgary: {
      "2017": [0.02, 0.025],
      "2018": [0.025, 0.03],
      "2019": [0.03, 0.035],
      "2020": [0.035, 0.04],
      "2021": [0.04, 0.045],
      "2022": [0.04, 0.045],
      "2023": [0.035, 0.04],
    },
    Vancouver: {
      "2019": [0.03, 0.035],
      "2020": [0.035, 0.04],
      "2021": [0.04, 0.045],
      "2022": [0.04, 0.045],
      "2023": [0.035, 0.04],
    },
  };

  /**
   * churn rate spread between [min, max] per year
   * @see https://customergauge.com/blog/average-churn-rate-by-industry
   */
  const YEAR_CHURN_RATE_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.3, 0.4],
      "2014": [0.25, 0.3],
      "2015": [0.2, 0.25],
      "2016": [0.18, 0.22],
      "2017": [0.16, 0.2],
      "2018": [0.15, 0.18],
      "2019": [0.13, 0.16],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.11],
      "2023": [0.1, 0.12],
    },
    Calgary: {
      "2017": [0.18, 0.22],
      "2018": [0.15, 0.18],
      "2019": [0.13, 0.16],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.11],
      "2023": [0.1, 0.12],
    },
    Vancouver: {
      "2019": [0.13, 0.16],
      "2020": [0.1, 0.12],
      "2021": [0.09, 0.11],
      "2022": [0.09, 0.11],
      "2023": [0.1, 0.12],
    },
  };

  /**
   * - random daily customers spread between [min, max] per year
   */
  const YEAR_CUSTOMERS_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [60, 260],
      "2014": [80, 280],
      "2015": [100, 300],
      "2016": [120, 320],
      "2017": [220, 420],
      "2018": [260, 460],
      "2019": [300, 500],
      "2020": [500, 700],
      "2021": [540, 740],
      "2022": [540, 740],
      "2023": [460, 660],
    },
    Calgary: {
      "2017": [60, 260],
      "2018": [80, 280],
      "2019": [100, 300],
      "2020": [120, 320],
      "2021": [220, 420],
      "2022": [260, 460],
      "2023": [300, 500],
    },
    Vancouver: {
      "2019": [80, 280],
      "2020": [180, 380],
      "2021": [340, 460],
      "2022": [460, 540],
      "2023": [300, 460],
    },
  };

  /**
   * - random daily new customers fraction spread between [min, max] per year
   */
  const YEAR_NEW_CUSTOMERS_SPREAD: LocationYearSpread = {
    Edmonton: {
      "2013": [0.6, 0.7],
      "2014": [0.5, 0.7],
      "2015": [0.4, 0.6],
      "2016": [0.35, 0.55],
      "2017": [0.3, 0.5],
      "2018": [0.25, 0.45],
      "2019": [0.25, 0.4],
      "2020": [0.2, 0.35],
      "2021": [0.2, 0.35],
      "2022": [0.2, 0.35],
      "2023": [0.15, 0.3],
    },
    Calgary: {
      "2017": [0.6, 0.7],
      "2018": [0.5, 0.7],
      "2019": [0.4, 0.6],
      "2020": [0.35, 0.55],
      "2021": [0.3, 0.5],
      "2022": [0.25, 0.45],
      "2023": [0.25, 0.4],
    },
    Vancouver: {
      "2019": [0.6, 0.7],
      "2020": [0.5, 0.7],
      "2021": [0.4, 0.6],
      "2022": [0.35, 0.55],
      "2023": [0.3, 0.5],
    },
  };

  const FINANCIAL_METRICS_TEMPLATE: YearlyFinancialMetric = {
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

  const MONTHLY_METRICS_TEMPLATE: MonthlyFinancialMetric = {
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

  const DAILY_METRICS_TEMPLATE: DailyFinancialMetric = {
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

  const BUSINESS_METRIC_TEMPLATE: BusinessMetric = {
    storeLocation: "Edmonton",
    customerMetrics: {
      totalCustomers: 0,
      lifetimeValue: 0,
      yearlyMetrics: [],
    },
    financialMetrics: [],
    productMetrics: [],
    repairMetrics: [],
  };

  const storeLocationsBusinessMetrics = storeLocations.map((storeLocation) => {
    const storeLocationBusinessMetrics: BusinessMetric = {
      ...BUSINESS_METRIC_TEMPLATE,
      storeLocation,
    };

    const daysInMonthsInYears = returnDaysInMonthsInYears({
      daysPerMonth,
      months,
      yearStart:
        storeLocation === "Edmonton" ? 2013 : storeLocation === "Calgary" ? 2017 : 2019,
      yearEnd: 2023,
      // yearStart: 2019,
      // yearEnd: 2019,
    });

    const createdProductMetrics = returnProductMetrics({
      daysInMonthsInYears,
      productCategories,
      storeLocation,
      yearOnlineTransactionsSpread: YEAR_ONLINE_TRANSACTIONS_SPREAD,
      yearUnitsSoldSpread: YEAR_UNITS_SOLD_SPREAD,
    });
    storeLocationBusinessMetrics.productMetrics = createdProductMetrics;

    const allProductsProductMetric = returnProductMetricsWithAggregatedAllProducts(
      storeLocationBusinessMetrics.productMetrics
    );
    storeLocationBusinessMetrics.productMetrics.unshift(allProductsProductMetric);

    const createdRepairMetrics = returnRepairMetrics({
      daysInMonthsInYears,
      repairCategories,
      storeLocation,
      yearUnitsRepairedSpread: YEAR_UNITS_REPAIRED_SPREAD,
    });
    storeLocationBusinessMetrics.repairMetrics = createdRepairMetrics;

    const allRepairsRepairMetric = returnRepairMetricsWithAggregatedAllRepairs(
      storeLocationBusinessMetrics.repairMetrics
    );
    storeLocationBusinessMetrics.repairMetrics.unshift(allRepairsRepairMetric);

    const aggregatedProductIntoFinancialMetrics =
      returnAggregatedProductIntoFinancialMetrics({
        productMetrics: createdProductMetrics,
        financialMetrics: storeLocationBusinessMetrics.financialMetrics,
        dailyFinancialMetricsTemplate: { ...DAILY_METRICS_TEMPLATE },
        financialMetricsTemplate: { ...FINANCIAL_METRICS_TEMPLATE },
        monthlyFinancialMetricsTemplate: { ...MONTHLY_METRICS_TEMPLATE },
      });
    storeLocationBusinessMetrics.financialMetrics = aggregatedProductIntoFinancialMetrics;

    const aggregatedRepairIntoFinancialMetrics =
      returnAggregatedRepairIntoFinancialMetrics({
        repairMetrics: createdRepairMetrics,
        financialMetrics: storeLocationBusinessMetrics.financialMetrics,
        dailyFinancialMetricsTemplate: { ...DAILY_METRICS_TEMPLATE },
        financialMetricsTemplate: { ...FINANCIAL_METRICS_TEMPLATE },
        monthlyFinancialMetricsTemplate: { ...MONTHLY_METRICS_TEMPLATE },
      });
    storeLocationBusinessMetrics.financialMetrics = aggregatedRepairIntoFinancialMetrics;

    const createdFinancialMetrics = returnFinancialMetrics({
      allProductsMetric: allProductsProductMetric,
      allRepairsMetric: allRepairsRepairMetric,
      financialMetrics: storeLocationBusinessMetrics.financialMetrics,
      storeLocation,
      yearConversionRateSpread: YEAR_CONVERSION_RATE_SPREAD,
      yearOnlineExpensesSpread: YEAR_ONLINE_EXPENSES_SPREAD,
      yearOnlineProfitSpread: YEAR_ONLINE_PROFIT_SPREAD,
      yearOnlineTransactionsSpread: YEAR_ONLINE_TRANSACTIONS_SPREAD,
      yearRepairExpensesSpread: YEAR_REPAIR_EXPENSES_SPREAD,
      yearRepairProfitSpread: YEAR_REPAIR_PROFIT_SPREAD,
      yearProfitMarginSpread: YEAR_PROFIT_MARGIN_SPREAD,
    });
    storeLocationBusinessMetrics.financialMetrics = createdFinancialMetrics;

    const createdCustomerMetrics = returnCustomerMetrics({
      daysInMonthsInYears,
      storeLocation,
      yearChurnRateSpread: YEAR_CHURN_RATE_SPREAD,
      yearCustomersSpread: YEAR_CUSTOMERS_SPREAD,
      yearNewCustomersSpread: YEAR_NEW_CUSTOMERS_SPREAD,
    });
    storeLocationBusinessMetrics.customerMetrics = createdCustomerMetrics;

    return storeLocationBusinessMetrics;
  });

  // aggregate all locations
  const allLocationBusinessMetrics: BusinessMetric = {
    ...BUSINESS_METRIC_TEMPLATE,
    storeLocation: "All Locations",
  };

  // aggregate all locations customer metrics
  const allLocationsAggregatedCustomerMetrics =
    returnAllLocationsAggregatedCustomerMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.customerMetrics = allLocationsAggregatedCustomerMetrics;

  // aggregate all locations financial metrics
  const allLocationsAggregatedFinancialMetrics =
    returnAllLocationsAggregatedFinancialMetrics(storeLocationsBusinessMetrics);
  allLocationBusinessMetrics.financialMetrics = allLocationsAggregatedFinancialMetrics;

  // aggregate all locations product metrics
  const allLocationsAggregatedProductMetrics = returnAllLocationsAggregatedProductMetrics(
    storeLocationsBusinessMetrics
  );
  allLocationBusinessMetrics.productMetrics = allLocationsAggregatedProductMetrics;

  // aggregate all locations repair metrics
  const allLocationsAggregatedRepairMetrics = returnAllLocationsAggregatedRepairMetrics(
    storeLocationsBusinessMetrics
  );
  allLocationBusinessMetrics.repairMetrics = allLocationsAggregatedRepairMetrics;

  storeLocationsBusinessMetrics.push(allLocationBusinessMetrics);

  return storeLocationsBusinessMetrics;
}

export {
  createRandomBusinessMetrics,
  returnChartTitleNavigateLinks,
  returnStatistics,
  splitSelectedCalendarDate,
};
export type { StatisticsObject };
