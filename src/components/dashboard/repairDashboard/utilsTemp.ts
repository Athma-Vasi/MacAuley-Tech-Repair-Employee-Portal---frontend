import { BarChartData } from "../../charts/responsiveBarChart/types";
import { CalendarChartData } from "../../charts/responsiveCalendarChart/types";
import { LineChartData } from "../../charts/responsiveLineChart/types";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  Month,
  RepairCategory,
  RepairDailyMetric,
  RepairMonthlyMetric,
  RepairYearlyMetric,
  Year,
} from "../types";
import { SelectedDateRepairMetrics } from "./utils";

type RepairMetricChartsKey = "unitsRepaired" | "revenue";
type RepairMetricBarCharts = Record<RepairMetricChartsKey, BarChartData[]>;
type RepairMetricCalendarCharts = Record<RepairMetricChartsKey, CalendarChartData[]>;
type RepairMetricLineCharts = {
  revenue: { id: "Revenue"; data: { x: string; y: number }[] }[];
  unitsRepaired: { id: "Units Repaired"; data: { x: string; y: number }[] }[];
};

type ReturnRepairChartsInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedRepairCategory: RepairCategory | "All Repairs";
  selectedDateRepairMetrics: SelectedDateRepairMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type RepairMetricsCharts = {
  daily: {
    bar: RepairMetricBarCharts;
    calendar: RepairMetricCalendarCharts;
    line: RepairMetricLineCharts;
  };
  monthly: {
    bar: RepairMetricBarCharts;
    calendar: RepairMetricCalendarCharts;
    line: RepairMetricLineCharts;
  };
  yearly: {
    bar: RepairMetricBarCharts;
    line: RepairMetricLineCharts;
  };
};

/**
 * repairMetrics: {
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

async function returnRepairMetricsCharts2({
  businessMetrics,
  months,
  selectedDateRepairMetrics,
  selectedRepairCategory,
  storeLocation,
}: ReturnRepairChartsInput): Promise<RepairMetricsCharts> {
  // selected year's metrics
  const {
    yearRepairMetrics: { selectedYearMetrics },
  } = selectedDateRepairMetrics;
  const selectedYear =
    selectedYearMetrics?.year ?? (new Date().getFullYear().toString() as Year);

  // selected month's metrics
  const {
    monthRepairMetrics: { selectedMonthMetrics },
  } = selectedDateRepairMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? "January";
  const monthNumber = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' repair category
  const repairMetrics = currentStoreMetrics?.repairMetrics.find(
    (repairMetric) => repairMetric.name === selectedRepairCategory
  );

  // templates used to create charts data

  const BAR_CHART_DATA_TEMPLATE: RepairMetricBarCharts = {
    revenue: [],
    unitsRepaired: [],
  };

  const CALENDAR_CHART_DATA_TEMPLATE: RepairMetricCalendarCharts = {
    revenue: [],
    unitsRepaired: [],
  };

  const LINE_CHART_DATA_TEMPLATE: RepairMetricLineCharts = {
    revenue: [{ id: "Revenue", data: [] }],
    unitsRepaired: [{ id: "Units Repaired", data: [] }],
  };

  console.log("before await");

  const [dailyRepairMetrics, monthlyRepairMetrics, yearlyRepairMetrics] =
    await Promise.all([
      createDailyRepairCharts({
        barChartsTemplate: BAR_CHART_DATA_TEMPLATE,
        calendarChartsTemplate: CALENDAR_CHART_DATA_TEMPLATE,
        dailyMetrics: selectedMonthMetrics?.dailyMetrics,
        lineChartsTemplate: LINE_CHART_DATA_TEMPLATE,
        monthNumber,
        selectedYear,
      }),
      createMonthlyRepairCharts({
        barChartsTemplate: BAR_CHART_DATA_TEMPLATE,
        calendarChartsTemplate: CALENDAR_CHART_DATA_TEMPLATE,
        lineChartsTemplate: LINE_CHART_DATA_TEMPLATE,
        monthlyMetrics: selectedYearMetrics?.monthlyMetrics,
        months,
        selectedYear,
      }),
      createYearlyRepairCharts({
        barChartsTemplate: BAR_CHART_DATA_TEMPLATE,
        lineChartsTemplate: LINE_CHART_DATA_TEMPLATE,
        yearlyMetrics: repairMetrics?.yearlyMetrics,
      }),
    ]);

  console.log("after await");

  return {
    daily: dailyRepairMetrics,
    monthly: monthlyRepairMetrics,
    yearly: yearlyRepairMetrics,
  };
}

type CreateDailyRepairChartsInput = {
  barChartsTemplate: RepairMetricBarCharts;
  calendarChartsTemplate: RepairMetricCalendarCharts;
  dailyMetrics?: RepairDailyMetric[];
  lineChartsTemplate: RepairMetricLineCharts;
  monthNumber: string;
  selectedYear: Year;
};

async function createDailyRepairCharts({
  barChartsTemplate,
  calendarChartsTemplate,
  dailyMetrics,
  lineChartsTemplate,
  monthNumber,
  selectedYear,
}: CreateDailyRepairChartsInput) {
  if (!dailyMetrics) {
    return {
      bar: barChartsTemplate,
      calendar: calendarChartsTemplate,
      line: lineChartsTemplate,
    };
  }

  const [
    dailyRepairMetricsBarCharts,
    dailyRepairMetricsCalendarCharts,
    dailyRepairMetricsLineCharts,
  ] = dailyMetrics.reduce(
    (dailyRepairChartsAcc, dailyRepairMetric) => {
      const [
        dailyRepairMetricBarChartsAcc,
        dailyRepairMetricCalendarChartsAcc,
        dailyRepairMetricLineChartsAcc,
      ] = dailyRepairChartsAcc;

      const { day, revenue, unitsRepaired } = dailyRepairMetric;

      const dailyUnitsRepairedBarChart: BarChartData = {
        Days: day,
        "Units Repaired": unitsRepaired,
      };
      dailyRepairMetricBarChartsAcc.unitsRepaired.push(dailyUnitsRepairedBarChart);

      const dailyRevenueBarChart: BarChartData = {
        Days: day,
        Revenue: revenue,
      };
      dailyRepairMetricBarChartsAcc.revenue.push(dailyRevenueBarChart);

      const dailyUnitsRepairedCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: unitsRepaired,
      };
      dailyRepairMetricCalendarChartsAcc.unitsRepaired.push(
        dailyUnitsRepairedCalendarChart
      );

      const dailyRevenueCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue,
      };
      dailyRepairMetricCalendarChartsAcc.revenue.push(dailyRevenueCalendarChart);

      const dailyRepairUnitsRepairedLineChart = {
        x: day,
        y: unitsRepaired,
      };
      dailyRepairMetricLineChartsAcc.unitsRepaired
        .find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
        ?.data.push(dailyRepairUnitsRepairedLineChart);

      const dailyRepairRevenueLineChart = {
        x: day,
        y: revenue,
      };
      dailyRepairMetricLineChartsAcc.revenue
        .find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
        ?.data.push(dailyRepairRevenueLineChart);

      return dailyRepairChartsAcc;
    },
    [
      structuredClone(barChartsTemplate),
      structuredClone(calendarChartsTemplate),
      structuredClone(lineChartsTemplate),
    ]
  );

  return {
    bar: dailyRepairMetricsBarCharts,
    calendar: dailyRepairMetricsCalendarCharts,
    line: dailyRepairMetricsLineCharts,
  };
}

type CreateMonthlyRepairChartsInput = {
  barChartsTemplate: RepairMetricBarCharts;
  calendarChartsTemplate: RepairMetricCalendarCharts;
  lineChartsTemplate: RepairMetricLineCharts;
  monthlyMetrics?: RepairMonthlyMetric[];
  months: Month[];
  selectedYear: Year;
};

function createMonthlyRepairCharts({
  barChartsTemplate,
  calendarChartsTemplate,
  lineChartsTemplate,
  monthlyMetrics,
  months,
  selectedYear,
}: CreateMonthlyRepairChartsInput) {
  if (!monthlyMetrics) {
    return {
      bar: barChartsTemplate,
      calendar: calendarChartsTemplate,
      line: lineChartsTemplate,
    };
  }

  const [
    monthlyRepairMetricsBarCharts,
    monthlyRepairMetricsCalendarCharts,
    monthlyRepairMetricsLineCharts,
  ] = monthlyMetrics.reduce(
    (monthlyRepairChartsAcc, monthlyRepairMetric) => {
      const [
        monthlyRepairMetricBarChartsAcc,
        monthlyRepairMetricCalendarChartsAcc,
        monthlyRepairMetricLineChartsAcc,
      ] = monthlyRepairChartsAcc;

      const { month, revenue, unitsRepaired } = monthlyRepairMetric;
      const monthNumberStr = (months.indexOf(month) + 1).toString().padStart(2, "0");

      // prevents current month of current year from being added to charts
      const currentYear = new Date().getFullYear().toString();
      const isCurrentYear = selectedYear === currentYear;
      const currentMonth = new Date().toLocaleString("default", { month: "long" });
      const isCurrentMonth = month === currentMonth;

      if (isCurrentYear && isCurrentMonth) {
        return monthlyRepairChartsAcc;
      }

      const monthlyUnitsRepairedBarChart: BarChartData = {
        Months: month,
        "Units Repaired": unitsRepaired,
      };
      monthlyRepairMetricBarChartsAcc.unitsRepaired.push(monthlyUnitsRepairedBarChart);

      const monthlyRevenueBarChart: BarChartData = {
        Months: month,
        Revenue: revenue,
      };
      monthlyRepairMetricBarChartsAcc.revenue.push(monthlyRevenueBarChart);

      const monthlyUnitsRepairedCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumberStr}-01`,
        value: unitsRepaired,
      };
      monthlyRepairMetricCalendarChartsAcc.unitsRepaired.push(
        monthlyUnitsRepairedCalendarChart
      );

      const monthlyRevenueCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumberStr}-01`,
        value: revenue,
      };
      monthlyRepairMetricCalendarChartsAcc.revenue.push(monthlyRevenueCalendarChart);

      const monthlyRepairUnitsRepairedLineChart = {
        x: month,
        y: unitsRepaired,
      };
      monthlyRepairMetricLineChartsAcc.unitsRepaired
        .find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
        ?.data.push(monthlyRepairUnitsRepairedLineChart);

      const monthlyRepairRevenueLineChart = {
        x: month,
        y: revenue,
      };
      monthlyRepairMetricLineChartsAcc.revenue
        .find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
        ?.data.push(monthlyRepairRevenueLineChart);

      return monthlyRepairChartsAcc;
    },
    [
      structuredClone(barChartsTemplate),
      structuredClone(calendarChartsTemplate),
      structuredClone(lineChartsTemplate),
    ]
  );

  return {
    bar: monthlyRepairMetricsBarCharts,
    calendar: monthlyRepairMetricsCalendarCharts,
    line: monthlyRepairMetricsLineCharts,
  };
}

type CreateYearlyRepairChartsInput = {
  barChartsTemplate: RepairMetricBarCharts;
  lineChartsTemplate: RepairMetricLineCharts;
  yearlyMetrics?: RepairYearlyMetric[];
};

function createYearlyRepairCharts({
  barChartsTemplate,
  lineChartsTemplate,
  yearlyMetrics,
}: CreateYearlyRepairChartsInput) {
  if (!yearlyMetrics) {
    return {
      bar: barChartsTemplate,
      line: lineChartsTemplate,
    };
  }

  console.log("inside createYearlyRepairCharts");

  const [yearlyRepairMetricsBarCharts, yearlyRepairMetricsLineCharts] =
    yearlyMetrics.reduce(
      (yearlyRepairChartsAcc, yearlyRepairMetric) => {
        const [yearlyRepairMetricBarChartsAcc, yearlyRepairMetricLineChartsAcc] =
          yearlyRepairChartsAcc;

        const { year, revenue, unitsRepaired } = yearlyRepairMetric;

        const yearlyUnitsRepairedBarChart: BarChartData = {
          Years: year,
          "Units Repaired": unitsRepaired,
        };
        yearlyRepairMetricBarChartsAcc.unitsRepaired.push(yearlyUnitsRepairedBarChart);

        const yearlyRevenueBarChart: BarChartData = {
          Years: year,
          Revenue: revenue,
        };
        yearlyRepairMetricBarChartsAcc.revenue.push(yearlyRevenueBarChart);

        const yearlyRepairUnitsRepairedLineChart = {
          x: year,
          y: unitsRepaired,
        };
        yearlyRepairMetricLineChartsAcc.unitsRepaired
          .find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
          ?.data.push(yearlyRepairUnitsRepairedLineChart);

        const yearlyRepairRevenueLineChart = {
          x: year,
          y: revenue,
        };
        yearlyRepairMetricLineChartsAcc.revenue
          .find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
          ?.data.push(yearlyRepairRevenueLineChart);

        return yearlyRepairChartsAcc;
      },
      [structuredClone(barChartsTemplate), structuredClone(lineChartsTemplate)]
    );

  return {
    bar: yearlyRepairMetricsBarCharts,
    line: yearlyRepairMetricsLineCharts,
  };
}

export { returnRepairMetricsCharts2 };
