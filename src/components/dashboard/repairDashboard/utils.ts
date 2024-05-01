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

type ReturnSelectedDateRepairMetricsInput = {
  businessMetrics: BusinessMetric[];
  day: string;
  month: Month;
  months: Month[];
  selectedRepairCategory: RepairCategory | "All Repairs";
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
};

type SelectedDateRepairMetrics = {
  dayRepairMetrics: {
    selectedDayMetrics?: RepairDailyMetric;
    prevDayMetrics?: RepairDailyMetric;
  };
  monthRepairMetrics: {
    selectedMonthMetrics?: RepairMonthlyMetric;
    prevMonthMetrics?: RepairMonthlyMetric;
  };
  yearRepairMetrics: {
    selectedYearMetrics?: RepairYearlyMetric;
    prevYearMetrics?: RepairYearlyMetric;
  };
};

function returnSelectedDateRepairMetrics({
  businessMetrics,
  day,
  month,
  months,
  selectedRepairCategory,
  storeLocation,
  year,
}: ReturnSelectedDateRepairMetricsInput): SelectedDateRepairMetrics {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' repair category
  const selectedRepairMetrics = currentStoreMetrics?.repairMetrics.find(
    (repairMetric) => repairMetric.name === selectedRepairCategory
  );

  // selected year's repair metrics
  const selectedYearMetrics = selectedRepairMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === year
  );
  const prevYearMetrics = selectedRepairMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === (parseInt(year) - 1).toString()
  );

  const yearRepairMetrics = {
    selectedYearMetrics,
    prevYearMetrics,
  };

  // selected month's repair metrics
  const selectedMonthMetrics = selectedYearMetrics?.monthlyMetrics.find(
    (monthlyMetric) => monthlyMetric.month === month
  );
  const prevPrevYearMetrics = selectedRepairMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === (parseInt(year) - 2).toString()
  );
  const prevMonthMetrics =
    month === "January"
      ? prevPrevYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) => monthlyMetric.month === "December"
        )
      : selectedYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) => monthlyMetric.month === months[months.indexOf(month) - 1]
        );

  const monthRepairMetrics = {
    selectedMonthMetrics,
    prevMonthMetrics,
  };

  // selected day's repair metrics
  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );

  const prevDayMetrics =
    day === "01"
      ? monthRepairMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === "31" ||
            dailyMetric.day === "30" ||
            dailyMetric.day === "29" ||
            dailyMetric.day === "28"
        )
      : selectedMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === (parseInt(day) - 1).toString().padStart(2, "0")
        );

  const dayRepairMetrics = {
    selectedDayMetrics,
    prevDayMetrics,
  };

  return {
    dayRepairMetrics,
    monthRepairMetrics,
    yearRepairMetrics,
  };
}

type ReturnRepairChartsDataInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedRepairCategory: RepairCategory | "All Repairs";
  selectedDateRepairMetrics: SelectedDateRepairMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type RepairMetricChartsObjKey = "unitsRepaired" | "revenue";
type RepairMetricBarChartsObj = Record<RepairMetricChartsObjKey, BarChartData[]>;
type RepairMetricCalendarChartsObj = Record<
  RepairMetricChartsObjKey,
  CalendarChartData[]
>;
type RepairMetricLineChartsObj = {
  revenue: { id: "Revenue"; data: { x: string; y: number }[] }[];
  unitsRepaired: { id: "Units Repaired"; data: { x: string; y: number }[] }[];
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

type RepairMetricsCharts = {
  dailyCharts: {
    barChartsObj: RepairMetricBarChartsObj;
    calendarChartsObj: RepairMetricCalendarChartsObj;
    lineChartsObj: RepairMetricLineChartsObj;
  };
  monthlyCharts: {
    barChartsObj: RepairMetricBarChartsObj;
    calendarChartsObj: RepairMetricCalendarChartsObj;
    lineChartsObj: RepairMetricLineChartsObj;
  };
  yearlyCharts: {
    barChartsObj: RepairMetricBarChartsObj;
    lineChartsObj: RepairMetricLineChartsObj;
  };
};

function returnRepairMetricsCharts({
  businessMetrics,
  months,
  selectedRepairCategory,
  selectedDateRepairMetrics,
  storeLocation,
}: ReturnRepairChartsDataInput): RepairMetricsCharts {
  // selected year's metrics
  const {
    yearRepairMetrics: { selectedYearMetrics },
  } = selectedDateRepairMetrics;
  const selectedYear = selectedYearMetrics?.year ?? "2023";

  // selected month's metrics
  const {
    monthRepairMetrics: { selectedMonthMetrics },
  } = selectedDateRepairMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? "January";
  const monthNumber = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

  // templates

  // templates -> bar charts obj
  const BAR_CHART_OBJ_TEMPLATE: RepairMetricBarChartsObj = {
    revenue: [],
    unitsRepaired: [],
  };

  // templates -> calendar charts obj
  const CALENDAR_CHART_OBJ_TEMPLATE: RepairMetricCalendarChartsObj = {
    revenue: [],
    unitsRepaired: [],
  };

  // templates -> line charts obj
  const LINE_CHART_OBJ_TEMPLATE: RepairMetricLineChartsObj = {
    revenue: [{ id: "Revenue", data: [] }],
    unitsRepaired: [{ id: "Units Repaired", data: [] }],
  };

  // daily charts

  // daily charts -> bar charts obj
  const initialDailyRepairRepairMetricBarChartsObj =
    structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // daily charts -> calendar charts obj
  const initialDailyRepairRepairMetricCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> line charts obj
  const initialDailyRepairRepairMetricLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

  const [
    dailyRepairRepairMetricBarChartsObj,
    dailyRepairRepairMetricCalendarChartsObj,
    dailyRepairRepairMetricLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyRepairChartsAcc, dailyRepairMetric) => {
      const [
        dailyRepairRepairMetricBarChartsObjAcc,
        dailyRepairRepairMetricCalendarChartsObjAcc,
        dailyRepairRepairMetricLineChartsObjAcc,
      ] = dailyRepairChartsAcc;

      const { day, revenue, unitsRepaired } = dailyRepairMetric;

      // bar charts

      // bar charts -> unitsRepaired
      const dailyRepairUnitsRepairedBarChart: BarChartData = {
        Days: day,
        "Units Repaired": unitsRepaired,
      };
      dailyRepairRepairMetricBarChartsObjAcc.unitsRepaired.push(
        dailyRepairUnitsRepairedBarChart
      );

      // bar charts -> revenue
      const dailyRepairRevenueBarChart: BarChartData = {
        Days: day,
        Revenue: revenue,
      };
      dailyRepairRepairMetricBarChartsObjAcc.revenue.push(dailyRepairRevenueBarChart);

      // calendar charts

      // calendar charts -> unitsRepaired
      const dailyRepairUnitsRepairedCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: unitsRepaired,
      };
      dailyRepairRepairMetricCalendarChartsObjAcc.unitsRepaired.push(
        dailyRepairUnitsRepairedCalendarChart
      );

      // calendar charts -> revenue
      const dailyRepairRevenueCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue,
      };
      dailyRepairRepairMetricCalendarChartsObjAcc.revenue.push(
        dailyRepairRevenueCalendarChart
      );

      // line charts

      // line charts -> unitsRepaired
      const dailyRepairUnitsRepairedLineChart = {
        x: day,
        y: unitsRepaired,
      };
      dailyRepairRepairMetricLineChartsObjAcc.unitsRepaired
        .find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
        ?.data.push(dailyRepairUnitsRepairedLineChart);

      // line charts -> revenue
      const dailyRepairRevenueLineChart = {
        x: day,
        y: revenue,
      };
      dailyRepairRepairMetricLineChartsObjAcc.revenue
        .find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
        ?.data.push(dailyRepairRevenueLineChart);

      return dailyRepairChartsAcc;
    },
    [
      initialDailyRepairRepairMetricBarChartsObj,
      initialDailyRepairRepairMetricCalendarChartsObj,
      initialDailyRepairRepairMetricLineChartsObj,
    ]
  ) ?? [
    initialDailyRepairRepairMetricBarChartsObj,
    initialDailyRepairRepairMetricCalendarChartsObj,
    initialDailyRepairRepairMetricLineChartsObj,
  ];

  // monthly

  // monthly -> bar charts obj
  const initialMonthlyRepairRepairMetricBarChartsObj =
    structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // monthly -> calendar charts obj
  const initialMonthlyRepairRepairMetricCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> line charts obj
  const initialMonthlyRepairRepairMetricLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

  const [
    monthlyRepairRepairMetricBarChartsObj,
    monthlyRepairRepairMetricCalendarChartsObj,
    monthlyRepairRepairMetricLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyRepairChartsAcc, monthlyRepairMetric) => {
      const [
        monthlyRepairRepairMetricBarChartsObjAcc,
        monthlyRepairRepairMetricCalendarChartsObjAcc,
        monthlyRepairRepairMetricLineChartsObjAcc,
      ] = monthlyRepairChartsAcc;

      const { month, revenue, unitsRepaired } = monthlyRepairMetric;
      const monthNumberStr = (months.indexOf(month) + 1).toString().padStart(2, "0");

      // prevents current month of current year from being added to charts
      const currentYear = new Date().getFullYear().toString();
      const isCurrentYear = selectedYear === currentYear;
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      const isCurrentMonth = month === currentMonth;

      if (isCurrentYear && isCurrentMonth) {
        return monthlyRepairChartsAcc;
      }

      // bar charts

      // bar charts -> unitsRepaired
      const monthlyRepairUnitsRepairedBarChart: BarChartData = {
        Months: month,
        "Units Repaired": unitsRepaired,
      };
      monthlyRepairRepairMetricBarChartsObjAcc.unitsRepaired.push(
        monthlyRepairUnitsRepairedBarChart
      );

      // bar charts -> revenue
      const monthlyRepairRevenueBarChart: BarChartData = {
        Months: month,
        Revenue: revenue,
      };
      monthlyRepairRepairMetricBarChartsObjAcc.revenue.push(monthlyRepairRevenueBarChart);

      // calendar charts

      const { dailyMetrics } = monthlyRepairMetric;

      dailyMetrics.forEach((dailyRepairMetric) => {
        const { day, revenue, unitsRepaired } = dailyRepairMetric;

        // calendar charts -> unitsRepaired
        const monthlyRepairUnitsRepairedCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: unitsRepaired,
        };
        monthlyRepairRepairMetricCalendarChartsObjAcc.unitsRepaired.push(
          monthlyRepairUnitsRepairedCalendarChart
        );

        // calendar charts -> revenue
        const monthlyRepairRevenueCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue,
        };
        monthlyRepairRepairMetricCalendarChartsObjAcc.revenue.push(
          monthlyRepairRevenueCalendarChart
        );
      });

      // line charts

      // line charts -> unitsRepaired
      const monthlyRepairUnitsRepairedLineChart = {
        x: month,
        y: unitsRepaired,
      };
      monthlyRepairRepairMetricLineChartsObjAcc.unitsRepaired
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
        ?.data.push(monthlyRepairUnitsRepairedLineChart);

      // line charts -> revenue
      const monthlyRepairRevenueLineChart = {
        x: month,
        y: revenue,
      };
      monthlyRepairRepairMetricLineChartsObjAcc.revenue
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
        ?.data.push(monthlyRepairRevenueLineChart);

      return monthlyRepairChartsAcc;
    },
    [
      initialMonthlyRepairRepairMetricBarChartsObj,
      initialMonthlyRepairRepairMetricCalendarChartsObj,
      initialMonthlyRepairRepairMetricLineChartsObj,
    ]
  ) ?? [
    initialMonthlyRepairRepairMetricBarChartsObj,
    initialMonthlyRepairRepairMetricCalendarChartsObj,
    initialMonthlyRepairRepairMetricLineChartsObj,
  ];

  // yearly

  // yearly -> bar charts obj
  const initialYearlyRepairRepairMetricBarChartsObj =
    structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // yearly -> line charts obj
  const initialYearlyRepairRepairMetricLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' repair category
  const repairMetrics = currentStoreMetrics?.repairMetrics.find(
    (repairMetric) => repairMetric.name === selectedRepairCategory
  );

  const [yearlyRepairRepairMetricBarChartsObj, yearlyRepairRepairMetricLineChartsObj] =
    repairMetrics?.yearlyMetrics.reduce(
      (yearlyRepairChartsAcc, yearlyRepairMetric) => {
        const [
          yearlyRepairRepairMetricBarChartsObjAcc,
          yearlyRepairRepairMetricLineChartsObjAcc,
        ] = yearlyRepairChartsAcc;

        const { year, revenue, unitsRepaired } = yearlyRepairMetric;

        // prevents current year from being added to charts
        const currentYear = new Date().getFullYear();
        if (year === currentYear.toString()) {
          return yearlyRepairChartsAcc;
        }

        // bar charts

        // bar charts -> unitsRepaired
        const yearlyRepairUnitsRepairedBarChart: BarChartData = {
          Years: year,
          "Units Repaired": unitsRepaired,
        };
        yearlyRepairRepairMetricBarChartsObjAcc.unitsRepaired.push(
          yearlyRepairUnitsRepairedBarChart
        );

        // bar charts -> revenue
        const yearlyRepairRevenueBarChart: BarChartData = {
          Years: year,
          Revenue: revenue,
        };
        yearlyRepairRepairMetricBarChartsObjAcc.revenue.push(yearlyRepairRevenueBarChart);

        // line charts

        // line charts -> unitsRepaired
        const yearlyRepairUnitsRepairedLineChart = {
          x: year,
          y: unitsRepaired,
        };
        yearlyRepairRepairMetricLineChartsObjAcc.unitsRepaired
          ?.find((lineChartData: LineChartData) => lineChartData.id === "Units Repaired")
          ?.data.push(yearlyRepairUnitsRepairedLineChart);

        // line charts -> revenue
        const yearlyRepairRevenueLineChart = {
          x: year,
          y: revenue,
        };
        yearlyRepairRepairMetricLineChartsObjAcc.revenue
          ?.find((lineChartData: LineChartData) => lineChartData.id === "Revenue")
          ?.data.push(yearlyRepairRevenueLineChart);

        return yearlyRepairChartsAcc;
      },
      [
        initialYearlyRepairRepairMetricBarChartsObj,
        initialYearlyRepairRepairMetricLineChartsObj,
      ]
    ) ?? [
      initialYearlyRepairRepairMetricBarChartsObj,
      initialYearlyRepairRepairMetricLineChartsObj,
    ];

  return {
    dailyCharts: {
      barChartsObj: dailyRepairRepairMetricBarChartsObj,
      calendarChartsObj: dailyRepairRepairMetricCalendarChartsObj,
      lineChartsObj: dailyRepairRepairMetricLineChartsObj,
    },
    monthlyCharts: {
      barChartsObj: monthlyRepairRepairMetricBarChartsObj,
      calendarChartsObj: monthlyRepairRepairMetricCalendarChartsObj,
      lineChartsObj: monthlyRepairRepairMetricLineChartsObj,
    },
    yearlyCharts: {
      barChartsObj: yearlyRepairRepairMetricBarChartsObj,
      lineChartsObj: yearlyRepairRepairMetricLineChartsObj,
    },
  };
}

export { returnRepairMetricsCharts, returnSelectedDateRepairMetrics };

export type {
  RepairMetricBarChartsObj,
  RepairMetricCalendarChartsObj,
  RepairMetricChartsObjKey,
  RepairMetricLineChartsObj,
  RepairMetricsCharts,
  ReturnRepairChartsDataInput,
  SelectedDateRepairMetrics,
};
