import { toFixedFloat } from "../../../utils";
import { BarChartData } from "../../charts/responsiveBarChart/types";
import { CalendarChartData } from "../../charts/responsiveCalendarChart/types";
import { LineChartData } from "../../charts/responsiveLineChart/types";
import { PieChartData } from "../../charts/responsivePieChart/types";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DailyFinancialMetric,
  Month,
  MonthlyFinancialMetric,
  Year,
  YearlyFinancialMetric,
} from "../types";

type SelectedDateFinancialMetrics = {
  dayFinancialMetrics: {
    selectedDayMetrics?: DailyFinancialMetric;
    prevDayMetrics?: DailyFinancialMetric;
  };
  monthFinancialMetrics: {
    selectedMonthMetrics?: MonthlyFinancialMetric;
    prevMonthMetrics?: MonthlyFinancialMetric;
  };
  yearFinancialMetrics: {
    selectedYearMetrics?: YearlyFinancialMetric;
    prevYearMetrics?: YearlyFinancialMetric;
  };
};

function returnSelectedDateFinancialMetrics2({
  businessMetrics,
  day,
  month,
  months,
  storeLocation,
  year,
}: {
  businessMetrics: BusinessMetric[];
  day: string;
  month: Month;
  months: Month[];
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
}): SelectedDateFinancialMetrics {
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  const selectedYearMetrics = currentStoreMetrics?.financialMetrics.find(
    (yearlyMetric) => yearlyMetric.year === year
  );
  const prevYearMetrics = currentStoreMetrics?.financialMetrics.find(
    (yearlyMetric) => yearlyMetric.year === (parseInt(year) - 1).toString()
  );

  const yearFinancialMetrics = {
    selectedYearMetrics,
    prevYearMetrics,
  };

  const selectedMonthMetrics = selectedYearMetrics?.monthlyMetrics.find(
    (monthlyMetric) => monthlyMetric.month === month
  );
  const prevPrevYearMetrics = currentStoreMetrics?.financialMetrics.find(
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

  const monthFinancialMetrics = {
    selectedMonthMetrics,
    prevMonthMetrics,
  };

  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );

  const prevDayMetrics =
    day === "01"
      ? monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
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

  const dayFinancialMetrics = {
    selectedDayMetrics,
    prevDayMetrics,
  };

  return {
    dayFinancialMetrics,
    monthFinancialMetrics,
    yearFinancialMetrics,
  };
}

type ReturnFinancialMetricsChartsInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedDateFinancialMetrics: SelectedDateFinancialMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

/**
 * dailyMetrics: {
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
 */

type FinancialMetricBarLineChartsKey =
  | "total" // y-axis variables: total
  | "all" // y-axis variables: repair, in-store, online
  | "overview" // y-axis variables: sales, repair
  | "repair" // y-axis variables: repair
  | "sales" // y-axis variables: in-store, online
  | "inStore" // y-axis variables: in-store
  | "online"; // y-axis variables: online

type FinancialMetricBarCharts = Record<FinancialMetricBarLineChartsKey, BarChartData[]>; // y-axis variables: total, repair, in-store, online

type FinancialMetricLineCharts = {
  total: { id: "Total"; data: { x: string; y: number }[] }[];
  all: {
    id: "Repair" | "In-Store" | "Online";
    data: { x: string; y: number }[];
  }[];
  overview: {
    id: "Repair" | "Sales";
    data: { x: string; y: number }[];
  }[];
  repair: { id: "Repair"; data: { x: string; y: number }[] }[];
  sales: {
    id: "In-Store" | "Online";
    data: { x: string; y: number }[];
  }[];
  inStore: { id: "In-Store"; data: { x: string; y: number }[] }[];
  online: { id: "Online"; data: { x: string; y: number }[] }[];
}; // y-axis variables: total, repair, in-store, online

type FinancialMetricCalendarChartsKey =
  | "total" // y-axis variables: total
  | "repair" // y-axis variables: repair
  | "sales" // y-axis variables: sales
  | "inStore" // y-axis variables: in-store
  | "online"; // y-axis variables: online

type FinancialMetricCalendarCharts = Record<
  FinancialMetricCalendarChartsKey,
  CalendarChartData[]
>; // y-axis variables: total, repair, in-store, online

type FinancialOtherMetricsChartsKey =
  | "averageOrderValue" // y-axis variables: average order value
  | "conversionRate" // y-axis variables: conversion rate
  | "netProfitMargin"; // y-axis variables: net profit margin

type FinancialOtherMetricsBarCharts = Record<
  FinancialOtherMetricsChartsKey,
  BarChartData[]
>; // y-axis variables: average order value, conversion rate, net profit margin

type FinancialOtherMetricsLineCharts = {
  averageOrderValue: {
    id: "Average Order Value";
    data: { x: string; y: number }[];
  }[];
  conversionRate: { id: "Conversion Rate"; data: { x: string; y: number }[] }[];
  netProfitMargin: {
    id: "Net Profit Margin";
    data: { x: string; y: number }[];
  }[];
}; // y-axis variables: average order value, conversion rate, net profit margin

type FinancialOtherMetricsCalendarCharts = Record<
  FinancialOtherMetricsChartsKey,
  CalendarChartData[]
>; // y-axis variables: average order value, conversion rate, net profit margin

type FinancialMetricPieChartsKey =
  | "overview" // y-axis variables: repair, sales
  | "all" // y-axis variables: repair, in-store, online
  | "sales"; // y-axis variables: in-store, online

type FinancialMetricsPieCharts = Record<FinancialMetricPieChartsKey, PieChartData[]>; // y-axis variables: repair, sales, in-store, online

type FinancialMetricsCharts = {
  daily: {
    profit: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    expenses: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    revenue: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    transactions: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    otherMetrics: {
      bar: FinancialOtherMetricsBarCharts;
      calendar: FinancialOtherMetricsCalendarCharts;
      line: FinancialOtherMetricsLineCharts;
    };
  };
  monthly: {
    profit: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    expenses: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    revenue: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    transactions: {
      bar: FinancialMetricBarCharts;
      calendar: FinancialMetricCalendarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    otherMetrics: {
      bar: FinancialOtherMetricsBarCharts;
      calendar: FinancialOtherMetricsCalendarCharts;
      line: FinancialOtherMetricsLineCharts;
    };
  };
  yearly: {
    profit: {
      bar: FinancialMetricBarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    expenses: {
      bar: FinancialMetricBarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    revenue: {
      bar: FinancialMetricBarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    transactions: {
      bar: FinancialMetricBarCharts;
      line: FinancialMetricLineCharts;
      pie: FinancialMetricsPieCharts;
    };
    otherMetrics: {
      bar: FinancialOtherMetricsBarCharts;
      line: FinancialOtherMetricsLineCharts;
    };
  };
};

async function returnFinancialMetricsCharts2({
  businessMetrics,
  months,
  selectedDateFinancialMetrics,
  storeLocation,
}: ReturnFinancialMetricsChartsInput): Promise<FinancialMetricsCharts> {
  const {
    yearFinancialMetrics: { selectedYearMetrics },
  } = selectedDateFinancialMetrics;
  const selectedYear = selectedYearMetrics?.year ?? "2023";

  const {
    monthFinancialMetrics: { selectedMonthMetrics },
  } = selectedDateFinancialMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? "January";
  const monthIndex = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

  const {
    dayFinancialMetrics: { selectedDayMetrics },
  } = selectedDateFinancialMetrics;

  const BAR_CHARTS_TEMPLATE: FinancialMetricBarCharts = {
    total: [],
    all: [],
    overview: [],
    repair: [],
    sales: [],
    inStore: [],
    online: [],
  };

  const CALENDAR_CHARTS_TEMPLATE: FinancialMetricCalendarCharts = {
    total: [],
    repair: [],
    sales: [],
    inStore: [],
    online: [],
  };

  const LINE_CHARTS_TEMPLATE: FinancialMetricLineCharts = {
    total: [{ id: "Total", data: [] }],
    all: [
      { id: "Repair", data: [] },
      { id: "In-Store", data: [] },
      { id: "Online", data: [] },
    ],
    overview: [
      { id: "Repair", data: [] },
      { id: "Sales", data: [] },
    ],
    repair: [{ id: "Repair", data: [] }],
    sales: [
      { id: "In-Store", data: [] },
      { id: "Online", data: [] },
    ],
    inStore: [{ id: "In-Store", data: [] }],
    online: [{ id: "Online", data: [] }],
  };

  const OTHER_METRICS_BAR_CHARTS_TEMPLATE: FinancialOtherMetricsBarCharts = {
    averageOrderValue: [],
    conversionRate: [],
    netProfitMargin: [],
  };

  const OTHER_METRICS_CALENDAR_CHARTS_TEMPLATE: FinancialOtherMetricsCalendarCharts = {
    averageOrderValue: [],
    conversionRate: [],
    netProfitMargin: [],
  };

  const OTHER_METRICS_LINE_CHARTS_TEMPLATE: FinancialOtherMetricsLineCharts = {
    averageOrderValue: [{ id: "Average Order Value", data: [] }],
    conversionRate: [{ id: "Conversion Rate", data: [] }],
    netProfitMargin: [{ id: "Net Profit Margin", data: [] }],
  };

  const PIE_CHARTS_TEMPLATE: FinancialMetricsPieCharts = {
    overview: [],
    all: [],
    sales: [],
  };

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  const [dailyFinancialCharts, monthlyFinancialCharts, yearlyFinancialCharts] =
    await Promise.all([
      createDailyFinancialCharts({
        barChartsTemplate: BAR_CHARTS_TEMPLATE,
        calendarChartsTemplate: CALENDAR_CHARTS_TEMPLATE,
        dailyMetrics: selectedMonthMetrics?.dailyMetrics,
        lineChartsTemplate: LINE_CHARTS_TEMPLATE,
        monthIndex,
        otherMetricsBarChartsTemplate: OTHER_METRICS_BAR_CHARTS_TEMPLATE,
        otherMetricsCalendarChartsTemplate: OTHER_METRICS_CALENDAR_CHARTS_TEMPLATE,
        otherMetricsLineChartsTemplate: OTHER_METRICS_LINE_CHARTS_TEMPLATE,
        pieChartsTemplate: PIE_CHARTS_TEMPLATE,
        selectedDayMetrics,
        selectedYear,
      }),
      createMonthlyFinancialCharts({
        barChartsTemplate: BAR_CHARTS_TEMPLATE,
        calendarChartsTemplate: CALENDAR_CHARTS_TEMPLATE,
        lineChartsTemplate: LINE_CHARTS_TEMPLATE,
        monthIndex,
        otherMetricsBarChartsTemplate: OTHER_METRICS_BAR_CHARTS_TEMPLATE,
        otherMetricsCalendarChartsTemplate: OTHER_METRICS_CALENDAR_CHARTS_TEMPLATE,
        otherMetricsLineChartsTemplate: OTHER_METRICS_LINE_CHARTS_TEMPLATE,
        pieChartsTemplate: PIE_CHARTS_TEMPLATE,
        months,
        selectedYear,
        monthlyMetrics: selectedYearMetrics?.monthlyMetrics,
        selectedMonthMetrics,
      }),
      createYearlyFinancialCharts({
        barChartsTemplate: BAR_CHARTS_TEMPLATE,
        lineChartsTemplate: LINE_CHARTS_TEMPLATE,
        otherMetricsBarChartsTemplate: OTHER_METRICS_BAR_CHARTS_TEMPLATE,
        otherMetricsLineChartsTemplate: OTHER_METRICS_LINE_CHARTS_TEMPLATE,
        pieChartsTemplate: PIE_CHARTS_TEMPLATE,
        selectedYearMetrics,
        yearlyMetrics: currentStoreMetrics?.financialMetrics,
      }),
    ]);

  return {
    daily: dailyFinancialCharts,
    monthly: monthlyFinancialCharts,
    yearly: yearlyFinancialCharts,
  };
}

type CreateDailyFinancialChartsInput = {
  barChartsTemplate: FinancialMetricBarCharts;
  calendarChartsTemplate: FinancialMetricCalendarCharts;
  dailyMetrics?: DailyFinancialMetric[];
  lineChartsTemplate: FinancialMetricLineCharts;
  monthIndex: string;
  otherMetricsBarChartsTemplate: FinancialOtherMetricsBarCharts;
  otherMetricsCalendarChartsTemplate: FinancialOtherMetricsCalendarCharts;
  otherMetricsLineChartsTemplate: FinancialOtherMetricsLineCharts;
  pieChartsTemplate: FinancialMetricsPieCharts;
  selectedDayMetrics?: DailyFinancialMetric;
  selectedYear: Year;
};
async function createDailyFinancialCharts({
  barChartsTemplate,
  calendarChartsTemplate,
  dailyMetrics,
  lineChartsTemplate,
  monthIndex,
  otherMetricsBarChartsTemplate,
  otherMetricsCalendarChartsTemplate,
  otherMetricsLineChartsTemplate,
  pieChartsTemplate,
  selectedDayMetrics,
  selectedYear,
}: CreateDailyFinancialChartsInput): Promise<FinancialMetricsCharts["daily"]> {
  if (!dailyMetrics || !selectedDayMetrics) {
    return new Promise((resolve) => {
      resolve({
        profit: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        expenses: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        revenue: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        transactions: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        otherMetrics: {
          bar: otherMetricsBarChartsTemplate,
          calendar: otherMetricsCalendarChartsTemplate,
          line: otherMetricsLineChartsTemplate,
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        dailyProfitBarCharts,
        dailyProfitCalendarCharts,
        dailyProfitLineCharts,

        dailyExpensesBarCharts,
        dailyExpensesCalendarCharts,
        dailyExpensesLineCharts,

        dailyRevenueBarCharts,
        dailyRevenueCalendarCharts,
        dailyRevenueLineCharts,

        dailyTransactionsBarCharts,
        dailyTransactionsCalendarCharts,
        dailyTransactionsLineCharts,

        dailyOtherMetricsBarCharts,
        dailyOtherMetricsCalendarCharts,
        dailyOtherMetricsLineCharts,
      ] = dailyMetrics.reduce(
        (dailyMetricsChartsAcc, dailyMetric) => {
          const [
            dailyProfitBarChartsAcc,
            dailyProfitCalendarChartsAcc,
            dailyProfitLineChartsAcc,

            dailyExpensesBarChartsAcc,
            dailyExpensesCalendarChartsAcc,
            dailyExpensesLineChartsAcc,

            dailyRevenueBarChartsAcc,
            dailyRevenueCalendarChartsAcc,
            dailyRevenueLineChartsAcc,

            dailyTransactionsBarChartsAcc,
            dailyTransactionsCalendarChartsAcc,
            dailyTransactionsLineChartsAcc,

            dailyOtherMetricsBarChartsAcc,
            dailyOtherMetricsCalendarChartsAcc,
            dailyOtherMetricsLineChartsAcc,
          ] = dailyMetricsChartsAcc;

          const {
            day,
            profit: { total: totalProfit, repair: repairProfit, sales: salesProfit },
          } = dailyMetric;

          // profit

          // profit -> bar chart

          // profit -> bar chart -> total
          const dailyProfitTotalBarChart: BarChartData = {
            Days: day,
            Total: totalProfit,
          };
          dailyProfitBarChartsAcc.total.push(dailyProfitTotalBarChart);

          // profit -> bar chart -> all
          const dailyProfitAllBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
            "In-Store": salesProfit.inStore,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.all.push(dailyProfitAllBarChart);

          // profit -> bar chart -> overview
          const dailyProfitOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
            Sales: salesProfit.total,
          };
          dailyProfitBarChartsAcc.overview.push(dailyProfitOverviewBarChart);

          // profit -> bar chart -> repair
          const dailyProfitRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
          };
          dailyProfitBarChartsAcc.repair.push(dailyProfitRepairBarChart);

          // profit -> bar chart -> sales
          const dailyProfitSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesProfit.inStore,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.sales.push(dailyProfitSalesBarChart);

          // profit -> bar chart -> in-store
          const dailyProfitInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesProfit.inStore,
          };
          dailyProfitBarChartsAcc.inStore.push(dailyProfitInStoreBarChart);

          // profit -> bar chart -> online
          const dailyProfitOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.online.push(dailyProfitOnlineBarChart);

          // profit -> calendar chart

          // profit -> calendar chart -> total
          const dailyProfitTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalProfit,
          };
          dailyProfitCalendarChartsAcc.total.push(dailyProfitTotalCalendarChart);

          // profit -> calendar chart -> repair
          const dailyProfitRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairProfit,
          };
          dailyProfitCalendarChartsAcc.repair.push(dailyProfitRepairCalendarChart);

          // profit -> calendar chart -> sales
          const dailyProfitSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.total,
          };
          dailyProfitCalendarChartsAcc.sales.push(dailyProfitSalesCalendarChart);

          // profit -> calendar chart -> in-store
          const dailyProfitInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.inStore,
          };
          dailyProfitCalendarChartsAcc.inStore.push(dailyProfitInStoreCalendarChart);

          // profit -> calendar chart -> online
          const dailyProfitOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.online,
          };
          dailyProfitCalendarChartsAcc.online.push(dailyProfitOnlineCalendarChart);

          // profit -> line chart

          // profit -> line chart -> total
          const dailyProfitTotalLineChart = {
            x: day,
            y: totalProfit,
          };
          dailyProfitLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyProfitTotalLineChart);

          // profit -> line chart -> all -> repair
          const dailyProfitAllRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitAllRepairLineChart);

          // profit -> line chart -> all -> in-store
          const dailyProfitAllInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitAllInStoreLineChart);

          // profit -> line chart -> all -> online
          const dailyProfitAllOnlineLineChart = {
            x: day,
            y: salesProfit.online,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyProfitAllOnlineLineChart);

          // profit -> line chart -> overview -> repair
          const dailyProfitOverviewRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitOverviewRepairLineChart);

          // profit -> line chart -> overview -> sales
          const dailyProfitOverviewSalesLineChart = {
            x: day,
            y: salesProfit.total,
          };
          dailyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyProfitOverviewSalesLineChart);

          // profit -> line chart -> repair
          const dailyProfitRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitRepairLineChart);

          // profit -> line chart -> sales -> in-store
          const dailyProfitSalesInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitSalesInStoreLineChart);

          // profit -> line chart -> sales -> online
          const dailyProfitSalesOnlineLineChart = {
            x: day,
            y: salesProfit.online,
          };
          dailyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyProfitSalesOnlineLineChart);

          // profit -> line chart -> in-store
          const dailyProfitInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitInStoreLineChart);

          // profit -> line chart -> online
          const dailyProfitOnlineLineChart = {
            x: day,
            y: salesProfit.online,
          };
          dailyProfitLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyProfitOnlineLineChart);

          // expenses
          const {
            expenses: {
              total: totalExpenses,
              repair: repairExpenses,
              sales: salesExpenses,
            },
          } = dailyMetric;

          // expenses -> bar chart

          // expenses -> bar chart -> total
          const dailyExpensesTotalBarChart: BarChartData = {
            Days: day,
            Total: totalExpenses,
          };
          dailyExpensesBarChartsAcc.total.push(dailyExpensesTotalBarChart);

          // expenses -> bar chart -> all
          const dailyExpensesAllBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
            "In-Store": salesExpenses.inStore,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.all?.push(dailyExpensesAllBarChart);

          // expenses -> bar chart -> overview
          const dailyExpensesOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
            Sales: salesExpenses.total,
          };
          dailyExpensesBarChartsAcc.overview.push(dailyExpensesOverviewBarChart);

          // expenses -> bar chart -> repair
          const dailyExpensesRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
          };
          dailyExpensesBarChartsAcc.repair.push(dailyExpensesRepairBarChart);

          // expenses -> bar chart -> sales
          const dailyExpensesSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesExpenses.inStore,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.sales.push(dailyExpensesSalesBarChart);

          // expenses -> bar chart -> in-store
          const dailyExpensesInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesExpenses.inStore,
          };
          dailyExpensesBarChartsAcc.inStore.push(dailyExpensesInStoreBarChart);

          // expenses -> bar chart -> online
          const dailyExpensesOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.online.push(dailyExpensesOnlineBarChart);

          // expenses -> calendar chart

          // expenses -> calendar chart -> total
          const dailyExpensesTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalExpenses,
          };
          dailyExpensesCalendarChartsAcc.total.push(dailyExpensesTotalCalendarChart);

          // expenses -> calendar chart -> repair
          const dailyExpensesRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairExpenses,
          };
          dailyExpensesCalendarChartsAcc.repair.push(dailyExpensesRepairCalendarChart);

          // expenses -> calendar chart -> sales
          const dailyExpensesSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.total,
          };
          dailyExpensesCalendarChartsAcc.sales.push(dailyExpensesSalesCalendarChart);

          // expenses -> calendar chart -> in-store
          const dailyExpensesInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.inStore,
          };
          dailyExpensesCalendarChartsAcc.inStore.push(dailyExpensesInStoreCalendarChart);

          // expenses -> calendar chart -> online
          const dailyExpensesOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.online,
          };
          dailyExpensesCalendarChartsAcc.online.push(dailyExpensesOnlineCalendarChart);

          // expenses -> line chart

          // expenses -> line chart -> total
          const dailyExpensesTotalLineChart = {
            x: day,
            y: totalExpenses,
          };
          dailyExpensesLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyExpensesTotalLineChart);

          // expenses -> line chart -> all -> repair
          const dailyExpensesAllRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesAllRepairLineChart);

          // expenses -> line chart -> all -> in-store
          const dailyExpensesAllInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesAllInStoreLineChart);

          // expenses -> line chart -> all -> online
          const dailyExpensesAllOnlineLineChart = {
            x: day,
            y: salesExpenses.online,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyExpensesAllOnlineLineChart);

          // expenses -> line chart -> overview -> repair
          const dailyExpensesOverviewRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesOverviewRepairLineChart);

          // expenses -> line chart -> overview -> sales
          const dailyExpensesOverviewSalesLineChart = {
            x: day,
            y: salesExpenses.total,
          };
          dailyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyExpensesOverviewSalesLineChart);

          // expenses -> line chart -> repair
          const dailyExpensesRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesRepairLineChart);

          // expenses -> line chart -> sales -> in-store
          const dailyExpensesSalesInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesSalesInStoreLineChart);

          // expenses -> line chart -> sales -> online
          const dailyExpensesSalesOnlineLineChart = {
            x: day,
            y: salesExpenses.online,
          };
          dailyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyExpensesSalesOnlineLineChart);

          // expenses -> line chart -> in-store
          const dailyExpensesInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesInStoreLineChart);

          // expenses -> line chart -> online
          const dailyExpensesOnlineLineChart = {
            x: day,
            y: salesExpenses.online,
          };
          dailyExpensesLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyExpensesOnlineLineChart);

          // revenue
          const {
            revenue: { total: totalRevenue, repair: repairRevenue, sales: salesRevenue },
          } = dailyMetric;

          // revenue -> bar chart

          // revenue -> bar chart -> total
          const dailyRevenueTotalBarChart: BarChartData = {
            Days: day,
            Total: totalRevenue,
          };
          dailyRevenueBarChartsAcc.total.push(dailyRevenueTotalBarChart);

          // revenue -> bar chart -> all
          const dailyRevenueAllBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
            "In-Store": salesRevenue.inStore,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.all.push(dailyRevenueAllBarChart);

          // revenue -> bar chart -> overview
          const dailyRevenueOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
            Sales: salesRevenue.total,
          };
          dailyRevenueBarChartsAcc.overview.push(dailyRevenueOverviewBarChart);

          // revenue -> bar chart -> repair
          const dailyRevenueRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
          };
          dailyRevenueBarChartsAcc.repair.push(dailyRevenueRepairBarChart);

          // revenue -> bar chart -> sales
          const dailyRevenueSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesRevenue.inStore,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.sales.push(dailyRevenueSalesBarChart);

          // revenue -> bar chart -> in-store
          const dailyRevenueInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesRevenue.inStore,
          };
          dailyRevenueBarChartsAcc.inStore.push(dailyRevenueInStoreBarChart);

          // revenue -> bar chart -> online
          const dailyRevenueOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.online.push(dailyRevenueOnlineBarChart);

          // revenue -> calendar chart

          // revenue -> calendar chart -> total
          const dailyRevenueTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalRevenue,
          };
          dailyRevenueCalendarChartsAcc.total.push(dailyRevenueTotalCalendarChart);

          // revenue -> calendar chart -> repair
          const dailyRevenueRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairRevenue,
          };
          dailyRevenueCalendarChartsAcc.repair.push(dailyRevenueRepairCalendarChart);

          // revenue -> calendar chart -> sales
          const dailyRevenueSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.total,
          };
          dailyRevenueCalendarChartsAcc.sales.push(dailyRevenueSalesCalendarChart);

          // revenue -> calendar chart -> in-store
          const dailyRevenueInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.inStore,
          };
          dailyRevenueCalendarChartsAcc.inStore.push(dailyRevenueInStoreCalendarChart);

          // revenue -> calendar chart -> online
          const dailyRevenueOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.online,
          };
          dailyRevenueCalendarChartsAcc.online.push(dailyRevenueOnlineCalendarChart);

          // revenue -> line chart

          // revenue -> line chart -> total
          const dailyRevenueTotalLineChart = {
            x: day,
            y: totalRevenue,
          };
          dailyRevenueLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyRevenueTotalLineChart);

          // revenue -> line chart -> all -> repair
          const dailyRevenueAllRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueAllRepairLineChart);

          // revenue -> line chart -> all -> in-store
          const dailyRevenueAllInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueAllInStoreLineChart);

          // revenue -> line chart -> all -> online
          const dailyRevenueAllOnlineLineChart = {
            x: day,
            y: salesRevenue.online,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyRevenueAllOnlineLineChart);

          // revenue -> line chart -> overview -> repair
          const dailyRevenueOverviewRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueOverviewRepairLineChart);

          // revenue -> line chart -> overview -> sales
          const dailyRevenueOverviewSalesLineChart = {
            x: day,
            y: salesRevenue.total,
          };
          dailyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyRevenueOverviewSalesLineChart);

          // revenue -> line chart -> repair
          const dailyRevenueRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueRepairLineChart);

          // revenue -> line chart -> sales -> in-store
          const dailyRevenueSalesInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueSalesInStoreLineChart);

          // revenue -> line chart -> sales -> online
          const dailyRevenueSalesOnlineLineChart = {
            x: day,
            y: salesRevenue.online,
          };
          dailyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyRevenueSalesOnlineLineChart);

          // revenue -> line chart -> in-store
          const dailyRevenueInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueInStoreLineChart);

          // revenue -> line chart -> online
          const dailyRevenueOnlineLineChart = {
            x: day,
            y: salesRevenue.online,
          };
          dailyRevenueLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyRevenueOnlineLineChart);

          // transactions
          const {
            transactions: {
              total: totalTransactions,
              repair: repairTransactions,
              sales: salesTransactions,
            },
          } = dailyMetric;

          // transactions -> bar chart

          // transactions -> bar chart -> total
          const dailyTransactionsTotalBarChart: BarChartData = {
            Days: day,
            Total: totalTransactions,
          };
          dailyTransactionsBarChartsAcc.total.push(dailyTransactionsTotalBarChart);

          // transactions -> bar chart -> all
          const dailyTransactionsAllBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
            "In-Store": salesTransactions.inStore,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.all?.push(dailyTransactionsAllBarChart);

          // transactions -> bar chart -> overview
          const dailyTransactionsOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
            Sales: salesTransactions.total,
          };
          dailyTransactionsBarChartsAcc.overview.push(dailyTransactionsOverviewBarChart);

          // transactions -> bar chart -> repair
          const dailyTransactionsRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
          };
          dailyTransactionsBarChartsAcc.repair.push(dailyTransactionsRepairBarChart);

          // transactions -> bar chart -> sales
          const dailyTransactionsSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesTransactions.inStore,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.sales.push(dailyTransactionsSalesBarChart);

          // transactions -> bar chart -> in-store
          const dailyTransactionsInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesTransactions.inStore,
          };
          dailyTransactionsBarChartsAcc.inStore.push(dailyTransactionsInStoreBarChart);

          // transactions -> bar chart -> online
          const dailyTransactionsOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.online.push(dailyTransactionsOnlineBarChart);

          // transactions -> calendar chart

          // transactions -> calendar chart -> total
          const dailyTransactionsTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalTransactions,
          };
          dailyTransactionsCalendarChartsAcc.total.push(
            dailyTransactionsTotalCalendarChart
          );

          // transactions -> calendar chart -> repair
          const dailyTransactionsRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairTransactions,
          };
          dailyTransactionsCalendarChartsAcc.repair.push(
            dailyTransactionsRepairCalendarChart
          );

          // transactions -> calendar chart -> sales
          const dailyTransactionsSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.total,
          };
          dailyTransactionsCalendarChartsAcc.sales.push(
            dailyTransactionsSalesCalendarChart
          );

          // transactions -> calendar chart -> in-store
          const dailyTransactionsInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.inStore,
          };
          dailyTransactionsCalendarChartsAcc.inStore.push(
            dailyTransactionsInStoreCalendarChart
          );

          // transactions -> calendar chart -> online
          const dailyTransactionsOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.online,
          };
          dailyTransactionsCalendarChartsAcc.online.push(
            dailyTransactionsOnlineCalendarChart
          );

          // transactions -> line chart

          // transactions -> line chart -> total
          const dailyTransactionsTotalLineChart = {
            x: day,
            y: totalTransactions,
          };
          dailyTransactionsLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyTransactionsTotalLineChart);

          // transactions -> line chart -> all -> repair
          const dailyTransactionsAllRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsAllRepairLineChart);

          // transactions -> line chart -> all -> in-store
          const dailyTransactionsAllInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsAllInStoreLineChart);

          // transactions -> line chart -> all -> online
          const dailyTransactionsAllOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsAllOnlineLineChart);

          // transactions -> line chart -> overview -> repair
          const dailyTransactionsOverviewRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsOverviewRepairLineChart);

          // transactions -> line chart -> overview -> sales
          const dailyTransactionsOverviewSalesLineChart = {
            x: day,
            y: salesTransactions.total,
          };
          dailyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyTransactionsOverviewSalesLineChart);

          // transactions -> line chart -> repair
          const dailyTransactionsRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsRepairLineChart);

          // transactions -> line chart -> sales -> in-store
          const dailyTransactionsSalesInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsSalesInStoreLineChart);

          // transactions -> line chart -> sales -> online
          const dailyTransactionsSalesOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsSalesOnlineLineChart);

          // transactions -> line chart -> in-store
          const dailyTransactionsInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsInStoreLineChart);

          // transactions -> line chart -> online
          const dailyTransactionsOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsOnlineLineChart);

          // other metrics
          const { averageOrderValue, conversionRate, netProfitMargin } = dailyMetric;

          // other metrics -> bar chart

          // other metrics -> bar chart -> average order value
          const dailyOtherMetricsTotalBarChart: BarChartData = {
            Days: day,
            "Average Order Value": averageOrderValue,
          };
          dailyOtherMetricsBarChartsAcc.averageOrderValue?.push(
            dailyOtherMetricsTotalBarChart
          );

          // other metrics -> bar chart -> conversion rate
          const dailyOtherMetricsAllBarChart: BarChartData = {
            Days: day,
            "Conversion Rate": toFixedFloat(conversionRate * 100, 2),
          };
          dailyOtherMetricsBarChartsAcc.conversionRate?.push(
            dailyOtherMetricsAllBarChart
          );

          // other metrics -> bar chart -> net profit margin
          const dailyOtherMetricsOverviewBarChart: BarChartData = {
            Days: day,
            "Net Profit Margin": toFixedFloat(netProfitMargin * 100, 2),
          };
          dailyOtherMetricsBarChartsAcc.netProfitMargin?.push(
            dailyOtherMetricsOverviewBarChart
          );

          // other metrics -> calendar chart

          // other metrics -> calendar chart -> average order value
          const dailyOtherMetricsTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: averageOrderValue,
          };
          dailyOtherMetricsCalendarChartsAcc.averageOrderValue?.push(
            dailyOtherMetricsTotalCalendarChart
          );

          // other metrics -> calendar chart -> conversion rate
          const dailyOtherMetricsConversionRateCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: toFixedFloat(conversionRate * 100, 2),
          };
          dailyOtherMetricsCalendarChartsAcc.conversionRate?.push(
            dailyOtherMetricsConversionRateCalendarChart
          );

          // other metrics -> calendar chart -> net profit margin
          const dailyOtherMetricsNetProfitMarginCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: toFixedFloat(netProfitMargin * 100, 2),
          };
          dailyOtherMetricsCalendarChartsAcc.netProfitMargin?.push(
            dailyOtherMetricsNetProfitMarginCalendarChart
          );

          // other metrics -> line chart

          // other metrics -> line chart -> average order value
          const dailyOtherMetricsAverageOrderValueLineChart = {
            x: day,
            y: averageOrderValue,
          };
          dailyOtherMetricsLineChartsAcc.averageOrderValue
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
            )
            ?.data.push(dailyOtherMetricsAverageOrderValueLineChart);

          // other metrics -> line chart -> conversion rate
          const dailyOtherMetricsConversionRateLineChart = {
            x: day,
            y: toFixedFloat(conversionRate * 100, 2),
          };
          dailyOtherMetricsLineChartsAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(dailyOtherMetricsConversionRateLineChart);

          // other metrics -> line chart -> net profit margin
          const dailyOtherMetricsNetProfitMarginLineChart = {
            x: day,
            y: toFixedFloat(netProfitMargin * 100, 2),
          };
          dailyOtherMetricsLineChartsAcc.netProfitMargin
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin"
            )
            ?.data.push(dailyOtherMetricsNetProfitMarginLineChart);

          return dailyMetricsChartsAcc;
        },
        [
          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(otherMetricsBarChartsTemplate),
          structuredClone(otherMetricsCalendarChartsTemplate),
          structuredClone(otherMetricsLineChartsTemplate),
        ]
      );

      // daily -> profit -> pie charts
      const dailyProfitRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.profit.repair,
      };
      const dailyProfitSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.profit.sales.total,
      };
      const dailyProfitSalesInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.profit.sales.inStore,
      };
      const dailyProfitSalesOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.profit.sales.online,
      };

      const dailyProfitPieCharts = {
        overview: [dailyProfitRepairPieChart, dailyProfitSalesPieChart],
        all: [
          dailyProfitRepairPieChart,
          dailyProfitSalesInStorePieChart,
          dailyProfitSalesOnlinePieChart,
        ],
        sales: [dailyProfitSalesInStorePieChart, dailyProfitSalesOnlinePieChart],
      };

      // daily -> expenses -> pie charts
      const dailyExpensesRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.expenses.repair,
      };
      const dailyExpensesSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.expenses.sales.total,
      };
      const dailyExpensesSalesInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.expenses.sales.inStore,
      };
      const dailyExpensesSalesOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.expenses.sales.online,
      };

      const dailyExpensesPieCharts = {
        overview: [dailyExpensesRepairPieChart, dailyExpensesSalesPieChart],
        all: [
          dailyExpensesRepairPieChart,
          dailyExpensesSalesInStorePieChart,
          dailyExpensesSalesOnlinePieChart,
        ],
        sales: [dailyExpensesSalesInStorePieChart, dailyExpensesSalesOnlinePieChart],
      };

      // daily -> revenue -> pie charts
      const dailyRevenueRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.revenue.repair,
      };
      const dailyRevenueSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.revenue.sales.total,
      };
      const dailyRevenueSalesInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.revenue.sales.inStore,
      };
      const dailyRevenueSalesOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.revenue.sales.online,
      };

      const dailyRevenuePieCharts = {
        overview: [dailyRevenueRepairPieChart, dailyRevenueSalesPieChart],
        all: [
          dailyRevenueRepairPieChart,
          dailyRevenueSalesInStorePieChart,
          dailyRevenueSalesOnlinePieChart,
        ],
        sales: [dailyRevenueSalesInStorePieChart, dailyRevenueSalesOnlinePieChart],
      };

      // daily -> transactions -> pie charts
      const dailyTransactionsRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.transactions.repair,
      };
      const dailyTransactionsSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.transactions.sales.total,
      };
      const dailyTransactionsSalesInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.transactions.sales.inStore,
      };
      const dailyTransactionsSalesOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.transactions.sales.online,
      };

      const dailyTransactionsPieCharts = {
        overview: [dailyTransactionsRepairPieChart, dailyTransactionsSalesPieChart],
        all: [
          dailyTransactionsRepairPieChart,
          dailyTransactionsSalesInStorePieChart,
          dailyTransactionsSalesOnlinePieChart,
        ],
        sales: [
          dailyTransactionsSalesInStorePieChart,
          dailyTransactionsSalesOnlinePieChart,
        ],
      };

      resolve({
        profit: {
          bar: dailyProfitBarCharts,
          calendar: dailyProfitCalendarCharts,
          line: dailyProfitLineCharts,
          pie: dailyProfitPieCharts,
        },
        expenses: {
          bar: dailyExpensesBarCharts,
          calendar: dailyExpensesCalendarCharts,
          line: dailyExpensesLineCharts,
          pie: dailyExpensesPieCharts,
        },
        revenue: {
          bar: dailyRevenueBarCharts,
          calendar: dailyRevenueCalendarCharts,
          line: dailyRevenueLineCharts,
          pie: dailyRevenuePieCharts,
        },
        transactions: {
          bar: dailyTransactionsBarCharts,
          calendar: dailyTransactionsCalendarCharts,
          line: dailyTransactionsLineCharts,
          pie: dailyTransactionsPieCharts,
        },
        otherMetrics: {
          bar: dailyOtherMetricsBarCharts,
          calendar: dailyOtherMetricsCalendarCharts,
          line: dailyOtherMetricsLineCharts,
        },
      });
    }, 0);
  });
}

type CreateMonthlyFinancialChartsInput = {
  barChartsTemplate: FinancialMetricBarCharts;
  calendarChartsTemplate: FinancialMetricCalendarCharts;
  lineChartsTemplate: FinancialMetricLineCharts;
  monthIndex: string;
  monthlyMetrics?: MonthlyFinancialMetric[];
  months: Month[];
  otherMetricsBarChartsTemplate: FinancialOtherMetricsBarCharts;
  otherMetricsCalendarChartsTemplate: FinancialOtherMetricsCalendarCharts;
  otherMetricsLineChartsTemplate: FinancialOtherMetricsLineCharts;
  pieChartsTemplate: FinancialMetricsPieCharts;
  selectedMonthMetrics?: MonthlyFinancialMetric;
  selectedYear: Year;
};
async function createMonthlyFinancialCharts({
  barChartsTemplate,
  calendarChartsTemplate,
  lineChartsTemplate,
  monthIndex,
  monthlyMetrics,
  months,
  otherMetricsBarChartsTemplate,
  otherMetricsCalendarChartsTemplate,
  otherMetricsLineChartsTemplate,
  pieChartsTemplate,
  selectedMonthMetrics,
  selectedYear,
}: CreateMonthlyFinancialChartsInput): Promise<FinancialMetricsCharts["monthly"]> {
  if (!monthlyMetrics || !selectedMonthMetrics) {
    return new Promise((resolve) => {
      resolve({
        profit: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        expenses: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        revenue: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        transactions: {
          bar: barChartsTemplate,
          calendar: calendarChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        otherMetrics: {
          bar: otherMetricsBarChartsTemplate,
          calendar: otherMetricsCalendarChartsTemplate,
          line: otherMetricsLineChartsTemplate,
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        monthlyProfitBarCharts,
        monthlyProfitCalendarCharts,
        monthlyProfitLineCharts,

        monthlyExpensesBarCharts,
        monthlyExpensesCalendarCharts,
        monthlyExpensesLineCharts,

        monthlyRevenueBarCharts,
        monthlyRevenueCalendarCharts,
        monthlyRevenueLineCharts,

        monthlyTransactionsBarCharts,
        monthlyTransactionsCalendarCharts,
        monthlyTransactionsLineCharts,

        monthlyOtherMetricsBarCharts,
        monthlyOtherMetricsCalendarCharts,
        monthlyOtherMetricsLineCharts,
      ] = monthlyMetrics.reduce(
        (monthlyMetricsChartsAcc, monthlyMetric) => {
          const [
            monthlyProfitBarChartsAcc,
            monthlyProfitCalendarChartsAcc,
            monthlyProfitLineChartsAcc,

            monthlyExpensesBarChartsAcc,
            monthlyExpensesCalendarChartsAcc,
            monthlyExpensesLineChartsAcc,

            monthlyRevenueBarChartsAcc,
            monthlyRevenueCalendarChartsAcc,
            monthlyRevenueLineChartsAcc,

            monthlyTransactionsBarChartsAcc,
            monthlyTransactionsCalendarChartsAcc,
            monthlyTransactionsLineChartsAcc,

            monthlyOtherMetricsBarChartsAcc,
            monthlyOtherMetricsCalendarChartsAcc,
            monthlyOtherMetricsLineChartsAcc,
          ] = monthlyMetricsChartsAcc;

          const { month } = monthlyMetric;
          const monthIndex = (months.indexOf(month) + 1).toString().padStart(2, "0");

          // prevents current month of current year from being added to charts
          const currentYear = new Date().getFullYear().toString();
          const isCurrentYear = selectedYear === currentYear;
          const currentMonth = new Date().toLocaleString("default", { month: "long" });
          const isCurrentMonth = month === currentMonth;

          if (isCurrentYear && isCurrentMonth) {
            return monthlyMetricsChartsAcc;
          }

          // profit

          const {
            profit: {
              total: monthlyTotalProfit,
              repair: monthlyRepairProfit,
              sales: monthlySalesProfit,
            },
          } = monthlyMetric;

          // profit -> bar chart

          // profit -> bar chart -> total
          const monthlyProfitTotalBarChart: BarChartData = {
            Months: month,
            Total: monthlyTotalProfit,
          };
          monthlyProfitBarChartsAcc.total.push(monthlyProfitTotalBarChart);

          // profit -> bar chart -> all
          const monthlyProfitAllBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
            "In-Store": monthlySalesProfit.inStore,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.all?.push(monthlyProfitAllBarChart);

          // profit -> bar chart -> overview
          const monthlyProfitOverviewBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
            Sales: monthlySalesProfit.total,
          };
          monthlyProfitBarChartsAcc.overview.push(monthlyProfitOverviewBarChart);

          // profit -> bar chart -> repair
          const monthlyProfitRepairBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
          };
          monthlyProfitBarChartsAcc.repair.push(monthlyProfitRepairBarChart);

          // profit -> bar chart -> sales
          const monthlyProfitSalesBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesProfit.inStore,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.sales.push(monthlyProfitSalesBarChart);

          // profit -> bar chart -> in-store
          const monthlyProfitInStoreBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesProfit.inStore,
          };
          monthlyProfitBarChartsAcc.inStore.push(monthlyProfitInStoreBarChart);

          // profit -> bar chart -> online
          const monthlyProfitOnlineBarChart: BarChartData = {
            Months: month,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.online.push(monthlyProfitOnlineBarChart);

          // profit -> calendar chart

          const { dailyMetrics } = monthlyMetric;

          dailyMetrics.forEach((dailyMetric) => {
            const {
              day,
              profit: {
                total: dailyTotalProfit,
                repair: dailyRepairProfit,
                sales: dailySalesProfit,
              },
            } = dailyMetric;

            // profit -> calendar chart -> total
            const monthlyProfitTotalCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyTotalProfit,
            };
            monthlyProfitCalendarChartsAcc.total?.push(monthlyProfitTotalCalendarChart);

            // profit -> calendar chart -> repair
            const monthlyProfitRepairCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyRepairProfit,
            };
            monthlyProfitCalendarChartsAcc.repair?.push(monthlyProfitRepairCalendarChart);

            // profit -> calendar chart -> sales
            const monthlyProfitSalesCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesProfit.total,
            };
            monthlyProfitCalendarChartsAcc.sales?.push(monthlyProfitSalesCalendarChart);

            // profit -> calendar chart -> in-store
            const monthlyProfitInStoreCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesProfit.inStore,
            };
            monthlyProfitCalendarChartsAcc.inStore?.push(
              monthlyProfitInStoreCalendarChart
            );

            // profit -> calendar chart -> online
            const monthlyProfitOnlineCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesProfit.online,
            };
            monthlyProfitCalendarChartsAcc.online?.push(monthlyProfitOnlineCalendarChart);
          });

          // profit -> line chart

          // profit -> line chart -> total
          const monthlyProfitTotalLineChart = {
            x: month,
            y: monthlyTotalProfit,
          };
          monthlyProfitLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyProfitTotalLineChart);

          // profit -> line chart -> all -> repair
          const monthlyProfitAllRepairLineChart = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitAllRepairLineChart);

          // profit -> line chart -> all -> in-store
          const monthlyProfitAllInStoreLineChart = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitAllInStoreLineChart);

          // profit -> line chart -> all -> online
          const monthlyProfitAllOnlineLineChart = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitAllOnlineLineChart);

          // profit -> line chart -> overview -> repair
          const monthlyProfitOverviewRepairLineChart = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitOverviewRepairLineChart);

          // profit -> line chart -> overview -> sales
          const monthlyProfitOverviewSalesLineChart = {
            x: month,
            y: monthlySalesProfit.total,
          };
          monthlyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyProfitOverviewSalesLineChart);

          // profit -> line chart -> repair
          const monthlyProfitRepairLineChart = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitRepairLineChart);

          // profit -> line chart -> sales -> in-store
          const monthlyProfitSalesInStoreLineChart = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitSalesInStoreLineChart);

          // profit -> line chart -> sales -> online
          const monthlyProfitSalesOnlineLineChart = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitSalesOnlineLineChart);

          // profit -> line chart -> in-store
          const monthlyProfitInStoreLineChart = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitInStoreLineChart);

          // profit -> line chart -> online
          const monthlyProfitOnlineLineChart = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitOnlineLineChart);

          // expenses

          const {
            expenses: {
              total: monthlyTotalExpenses,
              repair: monthlyRepairExpenses,
              sales: monthlySalesExpenses,
            },
          } = monthlyMetric;

          // expenses -> bar chart

          // expenses -> bar chart -> total
          const monthlyExpensesTotalBarChart: BarChartData = {
            Months: month,
            Total: monthlyTotalExpenses,
          };
          monthlyExpensesBarChartsAcc.total.push(monthlyExpensesTotalBarChart);

          // expenses -> bar chart -> all
          const monthlyExpensesAllBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
            "In-Store": monthlySalesExpenses.inStore,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.all?.push(monthlyExpensesAllBarChart);

          // expenses -> bar chart -> overview
          const monthlyExpensesOverviewBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
            Sales: monthlySalesExpenses.total,
          };
          monthlyExpensesBarChartsAcc.overview.push(monthlyExpensesOverviewBarChart);

          // expenses -> bar chart -> repair
          const monthlyExpensesRepairBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
          };
          monthlyExpensesBarChartsAcc.repair.push(monthlyExpensesRepairBarChart);

          // expenses -> bar chart -> sales
          const monthlyExpensesSalesBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesExpenses.inStore,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.sales.push(monthlyExpensesSalesBarChart);

          // expenses -> bar chart -> in-store
          const monthlyExpensesInStoreBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesExpenses.inStore,
          };
          monthlyExpensesBarChartsAcc.inStore.push(monthlyExpensesInStoreBarChart);

          // expenses -> bar chart -> online
          const monthlyExpensesOnlineBarChart: BarChartData = {
            Months: month,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.online.push(monthlyExpensesOnlineBarChart);

          // expenses -> calendar chart

          dailyMetrics.forEach((dailyMetric) => {
            const {
              day,
              expenses: {
                total: dailyTotalExpenses,
                repair: dailyRepairExpenses,
                sales: dailySalesExpenses,
              },
            } = dailyMetric;

            // expenses -> calendar chart -> total
            const monthlyExpensesTotalCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyTotalExpenses,
            };
            monthlyExpensesCalendarChartsAcc.total?.push(
              monthlyExpensesTotalCalendarChart
            );

            // expenses -> calendar chart -> repair
            const monthlyExpensesRepairCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyRepairExpenses,
            };
            monthlyExpensesCalendarChartsAcc.repair?.push(
              monthlyExpensesRepairCalendarChart
            );

            // expenses -> calendar chart -> sales
            const monthlyExpensesSalesCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesExpenses.total,
            };
            monthlyExpensesCalendarChartsAcc.sales?.push(
              monthlyExpensesSalesCalendarChart
            );

            // expenses -> calendar chart -> in-store
            const monthlyExpensesInStoreCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesExpenses.inStore,
            };
            monthlyExpensesCalendarChartsAcc.inStore?.push(
              monthlyExpensesInStoreCalendarChart
            );

            // expenses -> calendar chart -> online
            const monthlyExpensesOnlineCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesExpenses.online,
            };
            monthlyExpensesCalendarChartsAcc.online?.push(
              monthlyExpensesOnlineCalendarChart
            );
          });

          // expenses -> line chart

          // expenses -> line chart -> total
          const monthlyExpensesTotalLineChart = {
            x: month,
            y: monthlyTotalExpenses,
          };
          monthlyExpensesLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyExpensesTotalLineChart);

          // expenses -> line chart -> all -> repair
          const monthlyExpensesAllRepairLineChart = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesAllRepairLineChart);

          // expenses -> line chart -> all -> in-store
          const monthlyExpensesAllInStoreLineChart = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesAllInStoreLineChart);

          // expenses -> line chart -> all -> online
          const monthlyExpensesAllOnlineLineChart = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesAllOnlineLineChart);

          // expenses -> line chart -> overview -> repair
          const monthlyExpensesOverviewRepairLineChart = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesOverviewRepairLineChart);

          // expenses -> line chart -> overview -> sales
          const monthlyExpensesOverviewSalesLineChart = {
            x: month,
            y: monthlySalesExpenses.total,
          };
          monthlyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyExpensesOverviewSalesLineChart);

          // expenses -> line chart -> repair
          const monthlyExpensesRepairLineChart = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesRepairLineChart);

          // expenses -> line chart -> sales -> in-store
          const monthlyExpensesSalesInStoreLineChart = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesSalesInStoreLineChart);

          // expenses -> line chart -> sales -> online
          const monthlyExpensesSalesOnlineLineChart = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesSalesOnlineLineChart);

          // expenses -> line chart -> in-store
          const monthlyExpensesInStoreLineChart = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesInStoreLineChart);

          // expenses -> line chart -> online
          const monthlyExpensesOnlineLineChart = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesOnlineLineChart);

          // revenue

          const {
            revenue: {
              total: monthlyTotalRevenue,
              repair: monthlyRepairRevenue,
              sales: monthlySalesRevenue,
            },
          } = monthlyMetric;

          // revenue -> bar chart

          // revenue -> bar chart -> total
          const monthlyRevenueTotalBarChart: BarChartData = {
            Months: month,
            Total: monthlyTotalRevenue,
          };
          monthlyRevenueBarChartsAcc.total.push(monthlyRevenueTotalBarChart);

          // revenue -> bar chart -> all
          const monthlyRevenueAllBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
            "In-Store": monthlySalesRevenue.inStore,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.all?.push(monthlyRevenueAllBarChart);

          // revenue -> bar chart -> overview
          const monthlyRevenueOverviewBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
            Sales: monthlySalesRevenue.total,
          };
          monthlyRevenueBarChartsAcc.overview.push(monthlyRevenueOverviewBarChart);

          // revenue -> bar chart -> repair
          const monthlyRevenueRepairBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
          };
          monthlyRevenueBarChartsAcc.repair.push(monthlyRevenueRepairBarChart);

          // revenue -> bar chart -> sales
          const monthlyRevenueSalesBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesRevenue.inStore,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.sales.push(monthlyRevenueSalesBarChart);

          // revenue -> bar chart -> in-store
          const monthlyRevenueInStoreBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesRevenue.inStore,
          };
          monthlyRevenueBarChartsAcc.inStore.push(monthlyRevenueInStoreBarChart);

          // revenue -> bar chart -> online
          const monthlyRevenueOnlineBarChart: BarChartData = {
            Months: month,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.online.push(monthlyRevenueOnlineBarChart);

          // revenue -> calendar chart

          dailyMetrics.forEach((dailyMetric) => {
            const {
              day,
              revenue: {
                total: dailyTotalRevenue,
                repair: dailyRepairRevenue,
                sales: dailySalesRevenue,
              },
            } = dailyMetric;

            // revenue -> calendar chart -> total
            const monthlyRevenueTotalCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyTotalRevenue,
            };
            monthlyRevenueCalendarChartsAcc.total?.push(monthlyRevenueTotalCalendarChart);

            // revenue -> calendar chart -> repair
            const monthlyRevenueRepairCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyRepairRevenue,
            };
            monthlyRevenueCalendarChartsAcc.repair?.push(
              monthlyRevenueRepairCalendarChart
            );

            // revenue -> calendar chart -> sales
            const monthlyRevenueSalesCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesRevenue.total,
            };
            monthlyRevenueCalendarChartsAcc.sales?.push(monthlyRevenueSalesCalendarChart);

            // revenue -> calendar chart -> in-store
            const monthlyRevenueInStoreCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesRevenue.inStore,
            };
            monthlyRevenueCalendarChartsAcc.inStore?.push(
              monthlyRevenueInStoreCalendarChart
            );

            // revenue -> calendar chart -> online
            const monthlyRevenueOnlineCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesRevenue.online,
            };
            monthlyRevenueCalendarChartsAcc.online?.push(
              monthlyRevenueOnlineCalendarChart
            );
          });

          // revenue -> line chart

          // revenue -> line chart -> total
          const monthlyRevenueTotalLineChart = {
            x: month,
            y: monthlyTotalRevenue,
          };
          monthlyRevenueLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyRevenueTotalLineChart);

          // revenue -> line chart -> all -> repair
          const monthlyRevenueAllRepairLineChart = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueAllRepairLineChart);

          // revenue -> line chart -> all -> in-store
          const monthlyRevenueAllInStoreLineChart = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueAllInStoreLineChart);

          // revenue -> line chart -> all -> online
          const monthlyRevenueAllOnlineLineChart = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueAllOnlineLineChart);

          // revenue -> line chart -> overview -> repair
          const monthlyRevenueOverviewRepairLineChart = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueOverviewRepairLineChart);

          // revenue -> line chart -> overview -> sales
          const monthlyRevenueOverviewSalesLineChart = {
            x: month,
            y: monthlySalesRevenue.total,
          };
          monthlyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyRevenueOverviewSalesLineChart);

          // revenue -> line chart -> repair
          const monthlyRevenueRepairLineChart = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueRepairLineChart);

          // revenue -> line chart -> sales -> in-store
          const monthlyRevenueSalesInStoreLineChart = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueSalesInStoreLineChart);

          // revenue -> line chart -> sales -> online
          const monthlyRevenueSalesOnlineLineChart = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueSalesOnlineLineChart);

          // revenue -> line chart -> in-store
          const monthlyRevenueInStoreLineChart = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueInStoreLineChart);

          // revenue -> line chart -> online
          const monthlyRevenueOnlineLineChart = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueOnlineLineChart);

          // transactions

          const {
            transactions: {
              total: monthlyTotalTransactions,
              repair: monthlyRepairTransactions,
              sales: monthlySalesTransactions,
            },
          } = monthlyMetric;

          // transactions -> bar chart

          // transactions -> bar chart -> total
          const monthlyTransactionsTotalBarChart: BarChartData = {
            Months: month,
            Total: monthlyTotalTransactions,
          };
          monthlyTransactionsBarChartsAcc.total.push(monthlyTransactionsTotalBarChart);

          // transactions -> bar chart -> all
          const monthlyTransactionsAllBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
            "In-Store": monthlySalesTransactions.inStore,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.all?.push(monthlyTransactionsAllBarChart);

          // transactions -> bar chart -> overview
          const monthlyTransactionsOverviewBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
            Sales: monthlySalesTransactions.total,
          };
          monthlyTransactionsBarChartsAcc.overview.push(
            monthlyTransactionsOverviewBarChart
          );

          // transactions -> bar chart -> repair
          const monthlyTransactionsRepairBarChart: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
          };
          monthlyTransactionsBarChartsAcc.repair.push(monthlyTransactionsRepairBarChart);

          // transactions -> bar chart -> sales
          const monthlyTransactionsSalesBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesTransactions.inStore,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.sales.push(monthlyTransactionsSalesBarChart);

          // transactions -> bar chart -> in-store
          const monthlyTransactionsInStoreBarChart: BarChartData = {
            Months: month,
            "In-Store": monthlySalesTransactions.inStore,
          };
          monthlyTransactionsBarChartsAcc.inStore.push(
            monthlyTransactionsInStoreBarChart
          );

          // transactions -> bar chart -> online
          const monthlyTransactionsOnlineBarChart: BarChartData = {
            Months: month,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.online.push(monthlyTransactionsOnlineBarChart);

          // transactions -> calendar chart

          dailyMetrics.forEach((dailyMetric) => {
            const {
              day,
              transactions: {
                total: dailyTotalTransactions,
                repair: dailyRepairTransactions,
                sales: dailySalesTransactions,
              },
            } = dailyMetric;

            // transactions -> calendar chart -> total
            const monthlyTransactionsTotalCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyTotalTransactions,
            };
            monthlyTransactionsCalendarChartsAcc.total?.push(
              monthlyTransactionsTotalCalendarChart
            );

            // transactions -> calendar chart -> repair
            const monthlyTransactionsRepairCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyRepairTransactions,
            };
            monthlyTransactionsCalendarChartsAcc.repair?.push(
              monthlyTransactionsRepairCalendarChart
            );

            // transactions -> calendar chart -> sales
            const monthlyTransactionsSalesCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesTransactions.total,
            };
            monthlyTransactionsCalendarChartsAcc.sales?.push(
              monthlyTransactionsSalesCalendarChart
            );

            // transactions -> calendar chart -> in-store
            const monthlyTransactionsInStoreCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesTransactions.inStore,
            };
            monthlyTransactionsCalendarChartsAcc.inStore?.push(
              monthlyTransactionsInStoreCalendarChart
            );

            // transactions -> calendar chart -> online
            const monthlyTransactionsOnlineCalendarChart: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailySalesTransactions.online,
            };
            monthlyTransactionsCalendarChartsAcc.online?.push(
              monthlyTransactionsOnlineCalendarChart
            );
          });

          // transactions -> line chart

          // transactions -> line chart -> total
          const monthlyTransactionsTotalLineChart = {
            x: month,
            y: monthlyTotalTransactions,
          };
          monthlyTransactionsLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyTransactionsTotalLineChart);

          // transactions -> line chart -> all -> repair
          const monthlyTransactionsAllRepairLineChart = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsAllRepairLineChart);

          // transactions -> line chart -> all -> in-store
          const monthlyTransactionsAllInStoreLineChart = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsAllInStoreLineChart);

          // transactions -> line chart -> all -> online
          const monthlyTransactionsAllOnlineLineChart = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsAllOnlineLineChart);

          // transactions -> line chart -> overview -> repair
          const monthlyTransactionsOverviewRepairLineChart = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsOverviewRepairLineChart);

          // transactions -> line chart -> overview -> sales
          const monthlyTransactionsOverviewSalesLineChart = {
            x: month,
            y: monthlySalesTransactions.total,
          };
          monthlyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyTransactionsOverviewSalesLineChart);

          // transactions -> line chart -> repair
          const monthlyTransactionsRepairLineChart = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsRepairLineChart);

          // transactions -> line chart -> sales -> in-store
          const monthlyTransactionsSalesInStoreLineChart = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsSalesInStoreLineChart);

          // transactions -> line chart -> sales -> online
          const monthlyTransactionsSalesOnlineLineChart = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsSalesOnlineLineChart);

          // transactions -> line chart -> in-store
          const monthlyTransactionsInStoreLineChart = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsInStoreLineChart);

          // transactions -> line chart -> online
          const monthlyTransactionsOnlineLineChart = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsOnlineLineChart);

          // other metrics

          const {
            averageOrderValue: monthlyAverageOrderValue,
            conversionRate: monthlyConversionRate,
            netProfitMargin: monthlyNetProfitMargin,
          } = monthlyMetric;

          // other metrics -> bar chart

          // other metrics -> bar chart -> average order value
          const monthlyAverageOrderValueBarChartData: BarChartData = {
            Months: month,
            "Average Order Value": monthlyAverageOrderValue,
          };
          monthlyOtherMetricsBarChartsAcc.averageOrderValue?.push(
            monthlyAverageOrderValueBarChartData
          );

          // other metrics -> bar chart -> conversion rate
          const monthlyConversionRateBarChartData: BarChartData = {
            Months: month,
            "Conversion Rate": toFixedFloat(monthlyConversionRate * 100, 2),
          };
          monthlyOtherMetricsBarChartsAcc.conversionRate?.push(
            monthlyConversionRateBarChartData
          );

          // other metrics -> bar chart -> net profit margin
          const monthlyNetProfitMarginBarChartData: BarChartData = {
            Months: month,
            "Net Profit Margin": toFixedFloat(monthlyNetProfitMargin * 100, 2),
          };
          monthlyOtherMetricsBarChartsAcc.netProfitMargin?.push(
            monthlyNetProfitMarginBarChartData
          );

          // other metrics -> calendar chart

          dailyMetrics.forEach((dailyMetric) => {
            const {
              day,
              averageOrderValue: dailyAverageOrderValue,
              conversionRate: dailyConversionRate,
              netProfitMargin: dailyNetProfitMargin,
            } = dailyMetric;

            // other metrics -> calendar chart -> average order value
            const monthlyAverageOrderValueCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: dailyAverageOrderValue,
            };
            monthlyOtherMetricsCalendarChartsAcc.averageOrderValue?.push(
              monthlyAverageOrderValueCalendarChartData
            );

            // other metrics -> calendar chart -> conversion rate
            const monthlyConversionRateCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: toFixedFloat(dailyConversionRate * 100, 2),
            };
            monthlyOtherMetricsCalendarChartsAcc.conversionRate?.push(
              monthlyConversionRateCalendarChartData
            );

            // other metrics -> calendar chart -> net profit margin
            const monthlyNetProfitMarginCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthIndex}-${day}`,
              value: toFixedFloat(dailyNetProfitMargin * 100, 2),
            };
            monthlyOtherMetricsCalendarChartsAcc.netProfitMargin?.push(
              monthlyNetProfitMarginCalendarChartData
            );
          });

          // other metrics -> line chart

          // other metrics -> line chart -> average order value
          const monthlyAverageOrderValueLineChartData = {
            x: month,
            y: monthlyAverageOrderValue,
          };
          monthlyOtherMetricsLineChartsAcc.averageOrderValue
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
            )
            ?.data.push(monthlyAverageOrderValueLineChartData);

          // other metrics -> line chart -> conversion rate
          const monthlyConversionRateLineChartData = {
            x: month,
            y: toFixedFloat(monthlyConversionRate * 100, 2),
          };
          monthlyOtherMetricsLineChartsAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(monthlyConversionRateLineChartData);

          // other metrics -> line chart -> net profit margin
          const monthlyNetProfitMarginLineChartData = {
            x: month,
            y: toFixedFloat(monthlyNetProfitMargin * 100, 2),
          };
          monthlyOtherMetricsLineChartsAcc.netProfitMargin
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin"
            )
            ?.data.push(monthlyNetProfitMarginLineChartData);

          return monthlyMetricsChartsAcc;
        },
        [
          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(calendarChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(otherMetricsBarChartsTemplate),
          structuredClone(otherMetricsCalendarChartsTemplate),
          structuredClone(otherMetricsLineChartsTemplate),
        ]
      );

      // monthly -> profit -> pie chart
      const monthlyProfitRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.profit.repair,
      };
      const monthlyProfitSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.profit.sales.total,
      };
      const monthlyProfitInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.profit.sales.inStore,
      };
      const monthlyProfitOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.profit.sales.online,
      };

      const monthlyProfitPieCharts = {
        overview: [monthlyProfitRepairPieChart, monthlyProfitSalesPieChart],
        all: [
          monthlyProfitRepairPieChart,
          monthlyProfitInStorePieChart,
          monthlyProfitOnlinePieChart,
        ],
        sales: [monthlyProfitInStorePieChart, monthlyProfitOnlinePieChart],
      };

      // monthly -> expenses -> pie chart
      const monthlyExpensesRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.expenses.repair,
      };
      const monthlyExpensesSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.expenses.sales.total,
      };
      const monthlyExpensesInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.expenses.sales.inStore,
      };
      const monthlyExpensesOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.expenses.sales.online,
      };
      const monthlyExpensesPieCharts = {
        overview: [monthlyExpensesRepairPieChart, monthlyExpensesSalesPieChart],
        all: [
          monthlyExpensesRepairPieChart,
          monthlyExpensesInStorePieChart,
          monthlyExpensesOnlinePieChart,
        ],
        sales: [monthlyExpensesInStorePieChart, monthlyExpensesOnlinePieChart],
      };

      // monthly -> revenue -> pie chart
      const monthlyRevenueRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.revenue.repair,
      };
      const monthlyRevenueSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.revenue.sales.total,
      };
      const monthlyRevenueInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.revenue.sales.inStore,
      };
      const monthlyRevenueOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.revenue.sales.online,
      };

      const monthlyRevenuePieCharts = {
        overview: [monthlyRevenueRepairPieChart, monthlyRevenueSalesPieChart],
        all: [
          monthlyRevenueRepairPieChart,
          monthlyRevenueInStorePieChart,
          monthlyRevenueOnlinePieChart,
        ],
        sales: [monthlyRevenueInStorePieChart, monthlyRevenueOnlinePieChart],
      };

      // monthly -> transactions -> pie chart
      const monthlyTransactionsRepairPieChart = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.transactions.repair,
      };
      const monthlyTransactionsSalesPieChart = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.transactions.sales.total,
      };
      const monthlyTransactionsInStorePieChart = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.transactions.sales.inStore,
      };
      const monthlyTransactionsOnlinePieChart = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.transactions.sales.online,
      };

      const monthlyTransactionsPieCharts = {
        overview: [monthlyTransactionsRepairPieChart, monthlyTransactionsSalesPieChart],
        all: [
          monthlyTransactionsRepairPieChart,
          monthlyTransactionsInStorePieChart,
          monthlyTransactionsOnlinePieChart,
        ],
        sales: [monthlyTransactionsInStorePieChart, monthlyTransactionsOnlinePieChart],
      };

      resolve({
        revenue: {
          bar: monthlyRevenueBarCharts,
          calendar: monthlyRevenueCalendarCharts,
          line: monthlyRevenueLineCharts,
          pie: monthlyRevenuePieCharts,
        },
        profit: {
          bar: monthlyProfitBarCharts,
          calendar: monthlyProfitCalendarCharts,
          line: monthlyProfitLineCharts,
          pie: monthlyProfitPieCharts,
        },
        expenses: {
          bar: monthlyExpensesBarCharts,
          calendar: monthlyExpensesCalendarCharts,
          line: monthlyExpensesLineCharts,
          pie: monthlyExpensesPieCharts,
        },
        transactions: {
          bar: monthlyTransactionsBarCharts,
          calendar: monthlyTransactionsCalendarCharts,
          line: monthlyTransactionsLineCharts,
          pie: monthlyTransactionsPieCharts,
        },
        otherMetrics: {
          bar: monthlyOtherMetricsBarCharts,
          calendar: monthlyOtherMetricsCalendarCharts,
          line: monthlyOtherMetricsLineCharts,
        },
      });
    }, 0);
  });
}

type CreateYearlyFinancialChartsInput = {
  barChartsTemplate: FinancialMetricBarCharts;
  lineChartsTemplate: FinancialMetricLineCharts;
  otherMetricsBarChartsTemplate: FinancialOtherMetricsBarCharts;
  otherMetricsLineChartsTemplate: FinancialOtherMetricsLineCharts;
  pieChartsTemplate: FinancialMetricsPieCharts;
  selectedYearMetrics?: YearlyFinancialMetric;
  yearlyMetrics?: YearlyFinancialMetric[];
};
async function createYearlyFinancialCharts({
  yearlyMetrics,
  selectedYearMetrics,
  pieChartsTemplate,
  otherMetricsLineChartsTemplate,
  otherMetricsBarChartsTemplate,
  lineChartsTemplate,
  barChartsTemplate,
}: CreateYearlyFinancialChartsInput): Promise<FinancialMetricsCharts["yearly"]> {
  if (!yearlyMetrics || !selectedYearMetrics) {
    return new Promise((resolve) => {
      resolve({
        profit: {
          bar: barChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        expenses: {
          bar: barChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        revenue: {
          bar: barChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        transactions: {
          bar: barChartsTemplate,
          line: lineChartsTemplate,
          pie: pieChartsTemplate,
        },
        otherMetrics: {
          bar: otherMetricsBarChartsTemplate,
          line: otherMetricsLineChartsTemplate,
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        yearlyProfitBarChartsObj,
        yearlyProfitLineChartsObj,

        yearlyExpensesBarChartsObj,
        yearlyExpensesLineChartsObj,

        yearlyRevenueBarChartsObj,
        yearlyRevenueLineChartsObj,

        yearlyTransactionsBarChartsObj,
        yearlyTransactionsLineChartsObj,

        yearlyOtherMetricsBarChartsObj,
        yearlyOtherMetricsLineChartsObj,
      ] = yearlyMetrics.reduce(
        (yearlyMetricsChartsObjAcc, yearlyMetric) => {
          const [
            yearlyProfitBarChartsObjAcc,
            yearlyProfitLineChartsObjAcc,

            yearlyExpensesBarChartsObjAcc,
            yearlyExpensesLineChartsObjAcc,

            yearlyRevenueBarChartsObjAcc,
            yearlyRevenueLineChartsObjAcc,

            yearlyTransactionsBarChartsObjAcc,
            yearlyTransactionsLineChartsObjAcc,

            yearlyOtherMetricsBarChartsObjAcc,
            yearlyOtherMetricsLineChartsObjAcc,
          ] = yearlyMetricsChartsObjAcc;

          // profit

          const {
            year,
            profit: {
              total: yearlyTotalProfit,
              repair: yearlyRepairProfit,
              sales: yearlySalesProfit,
            },
          } = yearlyMetric;

          // prevents current year from being added to charts
          const currentYear = new Date().getFullYear();
          if (year === currentYear.toString()) {
            return yearlyMetricsChartsObjAcc;
          }

          // profit -> bar chart data

          // profit -> bar chart data -> total
          const yearlyProfitTotalBarChart: BarChartData = {
            Years: year,
            Total: yearlyTotalProfit,
          };
          yearlyProfitBarChartsObjAcc.total.push(yearlyProfitTotalBarChart);

          // profit -> bar chart data -> all
          const yearlyProfitAllBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairProfit,
            "In-Store": yearlySalesProfit.inStore,
            Online: yearlySalesProfit.online,
          };
          yearlyProfitBarChartsObjAcc.all.push(yearlyProfitAllBarChart);

          // profit -> bar chart data -> overview
          const yearlyProfitOverviewBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairProfit,
            Sales: yearlySalesProfit.total,
          };
          yearlyProfitBarChartsObjAcc.overview.push(yearlyProfitOverviewBarChart);

          // profit -> bar chart data -> repair
          const yearlyProfitRepairBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairProfit,
          };
          yearlyProfitBarChartsObjAcc.repair.push(yearlyProfitRepairBarChart);

          // profit -> bar chart data -> sales
          const yearlyProfitSalesBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesProfit.inStore,
            Online: yearlySalesProfit.online,
          };
          yearlyProfitBarChartsObjAcc.sales.push(yearlyProfitSalesBarChart);

          // profit -> bar chart data -> in-store
          const yearlyProfitInStoreBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesProfit.inStore,
          };
          yearlyProfitBarChartsObjAcc.inStore.push(yearlyProfitInStoreBarChart);

          // profit -> bar chart data -> online
          const yearlyProfitOnlineBarChart: BarChartData = {
            Years: year,
            Online: yearlySalesProfit.online,
          };
          yearlyProfitBarChartsObjAcc.online.push(yearlyProfitOnlineBarChart);

          // profit -> line chart data

          // profit -> line chart data -> total
          const yearlyProfitTotalLineChart = {
            x: year,
            y: yearlyTotalProfit,
          };
          yearlyProfitLineChartsObjAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyProfitTotalLineChart);

          // profit -> line chart data -> all -> repair
          const yearlyProfitAllRepairLineChart = {
            x: year,
            y: yearlyRepairProfit,
          };
          yearlyProfitLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyProfitAllRepairLineChart);

          // profit -> line chart data -> all -> in-store
          const yearlyProfitAllInStoreLineChart = {
            x: year,
            y: yearlySalesProfit.inStore,
          };
          yearlyProfitLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyProfitAllInStoreLineChart);

          // profit -> line chart data -> all -> online
          const yearlyProfitAllOnlineLineChart = {
            x: year,
            y: yearlySalesProfit.online,
          };
          yearlyProfitLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyProfitAllOnlineLineChart);

          // profit -> line chart data -> overview -> repair
          const yearlyProfitOverviewRepairLineChart = {
            x: year,
            y: yearlyRepairProfit,
          };
          yearlyProfitLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyProfitOverviewRepairLineChart);

          // profit -> line chart data -> overview -> sales
          const yearlyProfitOverviewSalesLineChart = {
            x: year,
            y: yearlySalesProfit.total,
          };
          yearlyProfitLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyProfitOverviewSalesLineChart);

          // profit -> line chart data -> repair
          const yearlyProfitRepairLineChart = {
            x: year,
            y: yearlyRepairProfit,
          };
          yearlyProfitLineChartsObjAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyProfitRepairLineChart);

          // profit -> line chart data -> sales -> in-store
          const yearlyProfitSalesInStoreLineChart = {
            x: year,
            y: yearlySalesProfit.inStore,
          };
          yearlyProfitLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyProfitSalesInStoreLineChart);

          // profit -> line chart data -> sales -> online
          const yearlyProfitSalesOnlineLineChart = {
            x: year,
            y: yearlySalesProfit.online,
          };
          yearlyProfitLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyProfitSalesOnlineLineChart);

          // profit -> line chart data -> in-store
          const yearlyProfitInStoreLineChart = {
            x: year,
            y: yearlySalesProfit.inStore,
          };
          yearlyProfitLineChartsObjAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyProfitInStoreLineChart);

          // profit -> line chart data -> online
          const yearlyProfitOnlineLineChart = {
            x: year,
            y: yearlySalesProfit.online,
          };
          yearlyProfitLineChartsObjAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyProfitOnlineLineChart);

          // expenses

          const {
            expenses: {
              total: yearlyTotalExpenses,
              repair: yearlyRepairExpenses,
              sales: yearlySalesExpenses,
            },
          } = yearlyMetric;

          // expenses -> bar chart data

          // expenses -> bar chart data -> total
          const yearlyExpensesTotalBarChart: BarChartData = {
            Years: year,
            Total: yearlyTotalExpenses,
          };
          yearlyExpensesBarChartsObjAcc.total.push(yearlyExpensesTotalBarChart);

          // expenses -> bar chart data -> all
          const yearlyExpensesAllBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairExpenses,
            "In-Store": yearlySalesExpenses.inStore,
            Online: yearlySalesExpenses.online,
          };
          yearlyExpensesBarChartsObjAcc.all?.push(yearlyExpensesAllBarChart);

          // expenses -> bar chart data -> overview
          const yearlyExpensesOverviewBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairExpenses,
            Sales: yearlySalesExpenses.total,
          };
          yearlyExpensesBarChartsObjAcc.overview.push(yearlyExpensesOverviewBarChart);

          // expenses -> bar chart data -> repair
          const yearlyExpensesRepairBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairExpenses,
          };
          yearlyExpensesBarChartsObjAcc.repair.push(yearlyExpensesRepairBarChart);

          // expenses -> bar chart data -> sales
          const yearlyExpensesSalesBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesExpenses.inStore,
            Online: yearlySalesExpenses.online,
          };
          yearlyExpensesBarChartsObjAcc.sales.push(yearlyExpensesSalesBarChart);

          // expenses -> bar chart data -> in-store
          const yearlyExpensesInStoreBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesExpenses.inStore,
          };
          yearlyExpensesBarChartsObjAcc.inStore.push(yearlyExpensesInStoreBarChart);

          // expenses -> bar chart data -> online
          const yearlyExpensesOnlineBarChart: BarChartData = {
            Years: year,
            Online: yearlySalesExpenses.online,
          };
          yearlyExpensesBarChartsObjAcc.online.push(yearlyExpensesOnlineBarChart);

          // expenses -> line chart data

          // expenses -> line chart data -> total
          const yearlyExpensesTotalLineChart = {
            x: year,
            y: yearlyTotalExpenses,
          };
          yearlyExpensesLineChartsObjAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyExpensesTotalLineChart);

          // expenses -> line chart data -> all -> repair
          const yearlyExpensesAllRepairLineChart = {
            x: year,
            y: yearlyRepairExpenses,
          };
          yearlyExpensesLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyExpensesAllRepairLineChart);

          // expenses -> line chart data -> all -> in-store
          const yearlyExpensesAllInStoreLineChart = {
            x: year,
            y: yearlySalesExpenses.inStore,
          };
          yearlyExpensesLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyExpensesAllInStoreLineChart);

          // expenses -> line chart data -> all -> online
          const yearlyExpensesAllOnlineLineChart = {
            x: year,
            y: yearlySalesExpenses.online,
          };
          yearlyExpensesLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyExpensesAllOnlineLineChart);

          // expenses -> line chart data -> overview -> repair
          const yearlyExpensesOverviewRepairLineChart = {
            x: year,
            y: yearlyRepairExpenses,
          };
          yearlyExpensesLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyExpensesOverviewRepairLineChart);

          // expenses -> line chart data -> overview -> sales
          const yearlyExpensesOverviewSalesLineChart = {
            x: year,
            y: yearlySalesExpenses.total,
          };
          yearlyExpensesLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyExpensesOverviewSalesLineChart);

          // expenses -> line chart data -> repair
          const yearlyExpensesRepairLineChart = {
            x: year,
            y: yearlyRepairExpenses,
          };
          yearlyExpensesLineChartsObjAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyExpensesRepairLineChart);

          // expenses -> line chart data -> sales -> in-store
          const yearlyExpensesSalesInStoreLineChart = {
            x: year,
            y: yearlySalesExpenses.inStore,
          };
          yearlyExpensesLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyExpensesSalesInStoreLineChart);

          // expenses -> line chart data -> sales -> online
          const yearlyExpensesSalesOnlineLineChart = {
            x: year,
            y: yearlySalesExpenses.online,
          };
          yearlyExpensesLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyExpensesSalesOnlineLineChart);

          // expenses -> line chart data -> in-store
          const yearlyExpensesInStoreLineChart = {
            x: year,
            y: yearlySalesExpenses.inStore,
          };
          yearlyExpensesLineChartsObjAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyExpensesInStoreLineChart);

          // expenses -> line chart data -> online
          const yearlyExpensesOnlineLineChart = {
            x: year,
            y: yearlySalesExpenses.online,
          };
          yearlyExpensesLineChartsObjAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyExpensesOnlineLineChart);

          // revenue

          const {
            revenue: {
              total: yearlyTotalRevenue,
              repair: yearlyRepairRevenue,
              sales: yearlySalesRevenue,
            },
          } = yearlyMetric;

          // revenue -> bar chart data

          // revenue -> bar chart data -> total
          const yearlyRevenueTotalBarChart: BarChartData = {
            Years: year,
            Total: yearlyTotalRevenue,
          };
          yearlyRevenueBarChartsObjAcc.total.push(yearlyRevenueTotalBarChart);

          // revenue -> bar chart data -> all
          const yearlyRevenueAllBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairRevenue,
            "In-Store": yearlySalesRevenue.inStore,
            Online: yearlySalesRevenue.online,
          };
          yearlyRevenueBarChartsObjAcc.all?.push(yearlyRevenueAllBarChart);

          // revenue -> bar chart data -> overview
          const yearlyRevenueOverviewBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairRevenue,
            Sales: yearlySalesRevenue.total,
          };
          yearlyRevenueBarChartsObjAcc.overview.push(yearlyRevenueOverviewBarChart);

          // revenue -> bar chart data -> repair
          const yearlyRevenueRepairBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairRevenue,
          };
          yearlyRevenueBarChartsObjAcc.repair.push(yearlyRevenueRepairBarChart);

          // revenue -> bar chart data -> sales
          const yearlyRevenueSalesBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesRevenue.inStore,
            Online: yearlySalesRevenue.online,
          };
          yearlyRevenueBarChartsObjAcc.sales.push(yearlyRevenueSalesBarChart);

          // revenue -> bar chart data -> in-store
          const yearlyRevenueInStoreBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesRevenue.inStore,
          };
          yearlyRevenueBarChartsObjAcc.inStore.push(yearlyRevenueInStoreBarChart);

          // revenue -> bar chart data -> online
          const yearlyRevenueOnlineBarChart: BarChartData = {
            Years: year,
            Online: yearlySalesRevenue.online,
          };
          yearlyRevenueBarChartsObjAcc.online.push(yearlyRevenueOnlineBarChart);

          // revenue -> line chart data

          // revenue -> line chart data -> total
          const yearlyRevenueTotalLineChart = {
            x: year,
            y: yearlyTotalRevenue,
          };
          yearlyRevenueLineChartsObjAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyRevenueTotalLineChart);

          // revenue -> line chart data -> all -> repair
          const yearlyRevenueAllRepairLineChart = {
            x: year,
            y: yearlyRepairRevenue,
          };
          yearlyRevenueLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyRevenueAllRepairLineChart);

          // revenue -> line chart data -> all -> in-store
          const yearlyRevenueAllInStoreLineChart = {
            x: year,
            y: yearlySalesRevenue.inStore,
          };
          yearlyRevenueLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyRevenueAllInStoreLineChart);

          // revenue -> line chart data -> all -> online
          const yearlyRevenueAllOnlineLineChart = {
            x: year,
            y: yearlySalesRevenue.online,
          };
          yearlyRevenueLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyRevenueAllOnlineLineChart);

          // revenue -> line chart data -> overview -> repair
          const yearlyRevenueOverviewRepairLineChart = {
            x: year,
            y: yearlyRepairRevenue,
          };
          yearlyRevenueLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyRevenueOverviewRepairLineChart);

          // revenue -> line chart data -> overview -> sales
          const yearlyRevenueOverviewSalesLineChart = {
            x: year,
            y: yearlySalesRevenue.total,
          };
          yearlyRevenueLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyRevenueOverviewSalesLineChart);

          // revenue -> line chart data -> repair
          const yearlyRevenueRepairLineChart = {
            x: year,
            y: yearlyRepairRevenue,
          };
          yearlyRevenueLineChartsObjAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyRevenueRepairLineChart);

          // revenue -> line chart data -> sales -> in-store
          const yearlyRevenueSalesInStoreLineChart = {
            x: year,
            y: yearlySalesRevenue.inStore,
          };
          yearlyRevenueLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyRevenueSalesInStoreLineChart);

          // revenue -> line chart data -> sales -> online
          const yearlyRevenueSalesOnlineLineChart = {
            x: year,
            y: yearlySalesRevenue.online,
          };
          yearlyRevenueLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyRevenueSalesOnlineLineChart);

          // revenue -> line chart data -> in-store
          const yearlyRevenueInStoreLineChart = {
            x: year,
            y: yearlySalesRevenue.inStore,
          };
          yearlyRevenueLineChartsObjAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyRevenueInStoreLineChart);

          // revenue -> line chart data -> online
          const yearlyRevenueOnlineLineChart = {
            x: year,
            y: yearlySalesRevenue.online,
          };
          yearlyRevenueLineChartsObjAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyRevenueOnlineLineChart);

          // transactions

          const {
            transactions: {
              total: yearlyTotalTransactions,
              repair: yearlyRepairTransactions,
              sales: yearlySalesTransactions,
            },
          } = yearlyMetric;

          // transactions -> bar chart data

          // transactions -> bar chart data -> total
          const yearlyTransactionsTotalBarChart: BarChartData = {
            Years: year,
            Total: yearlyTotalTransactions,
          };
          yearlyTransactionsBarChartsObjAcc.total.push(yearlyTransactionsTotalBarChart);

          // transactions -> bar chart data -> all
          const yearlyTransactionsAllBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairTransactions,
            "In-Store": yearlySalesTransactions.inStore,
            Online: yearlySalesTransactions.online,
          };
          yearlyTransactionsBarChartsObjAcc.all?.push(yearlyTransactionsAllBarChart);

          // transactions -> bar chart data -> overview
          const yearlyTransactionsOverviewBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairTransactions,
            Sales: yearlySalesTransactions.total,
          };
          yearlyTransactionsBarChartsObjAcc.overview.push(
            yearlyTransactionsOverviewBarChart
          );

          // transactions -> bar chart data -> repair
          const yearlyTransactionsRepairBarChart: BarChartData = {
            Years: year,
            Repair: yearlyRepairTransactions,
          };
          yearlyTransactionsBarChartsObjAcc.repair.push(yearlyTransactionsRepairBarChart);

          // transactions -> bar chart data -> sales
          const yearlyTransactionsSalesBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesTransactions.inStore,
            Online: yearlySalesTransactions.online,
          };
          yearlyTransactionsBarChartsObjAcc.sales.push(yearlyTransactionsSalesBarChart);

          // transactions -> bar chart data -> in-store
          const yearlyTransactionsInStoreBarChart: BarChartData = {
            Years: year,
            "In-Store": yearlySalesTransactions.inStore,
          };
          yearlyTransactionsBarChartsObjAcc.inStore.push(
            yearlyTransactionsInStoreBarChart
          );

          // transactions -> bar chart data -> online
          const yearlyTransactionsOnlineBarChart: BarChartData = {
            Years: year,
            Online: yearlySalesTransactions.online,
          };
          yearlyTransactionsBarChartsObjAcc.online.push(yearlyTransactionsOnlineBarChart);

          // transactions -> line chart data

          // transactions -> line chart data -> total
          const yearlyTransactionsTotalLineChart = {
            x: year,
            y: yearlyTotalTransactions,
          };
          yearlyTransactionsLineChartsObjAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyTransactionsTotalLineChart);

          // transactions -> line chart data -> all -> repair
          const yearlyTransactionsAllRepairLineChart = {
            x: year,
            y: yearlyRepairTransactions,
          };
          yearlyTransactionsLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyTransactionsAllRepairLineChart);

          // transactions -> line chart data -> all -> in-store
          const yearlyTransactionsAllInStoreLineChart = {
            x: year,
            y: yearlySalesTransactions.inStore,
          };
          yearlyTransactionsLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyTransactionsAllInStoreLineChart);

          // transactions -> line chart data -> all -> online
          const yearlyTransactionsAllOnlineLineChart = {
            x: year,
            y: yearlySalesTransactions.online,
          };
          yearlyTransactionsLineChartsObjAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyTransactionsAllOnlineLineChart);

          // transactions -> line chart data -> overview -> repair
          const yearlyTransactionsOverviewRepairLineChart = {
            x: year,
            y: yearlyRepairTransactions,
          };
          yearlyTransactionsLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyTransactionsOverviewRepairLineChart);

          // transactions -> line chart data -> overview -> sales
          const yearlyTransactionsOverviewSalesLineChart = {
            x: year,
            y: yearlySalesTransactions.total,
          };
          yearlyTransactionsLineChartsObjAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyTransactionsOverviewSalesLineChart);

          // transactions -> line chart data -> repair
          const yearlyTransactionsRepairLineChart = {
            x: year,
            y: yearlyRepairTransactions,
          };
          yearlyTransactionsLineChartsObjAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyTransactionsRepairLineChart);

          // transactions -> line chart data -> sales -> in-store
          const yearlyTransactionsSalesInStoreLineChart = {
            x: year,
            y: yearlySalesTransactions.inStore,
          };
          yearlyTransactionsLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyTransactionsSalesInStoreLineChart);

          // transactions -> line chart data -> sales -> online
          const yearlyTransactionsSalesOnlineLineChart = {
            x: year,
            y: yearlySalesTransactions.online,
          };
          yearlyTransactionsLineChartsObjAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyTransactionsSalesOnlineLineChart);

          // transactions -> line chart data -> in-store
          const yearlyTransactionsInStoreLineChart = {
            x: year,
            y: yearlySalesTransactions.inStore,
          };
          yearlyTransactionsLineChartsObjAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyTransactionsInStoreLineChart);

          // transactions -> line chart data -> online
          const yearlyTransactionsOnlineLineChart = {
            x: year,
            y: yearlySalesTransactions.online,
          };
          yearlyTransactionsLineChartsObjAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyTransactionsOnlineLineChart);

          // other metrics

          const {
            averageOrderValue: yearlyAverageOrderValue,
            conversionRate: yearlyConversionRate,
            netProfitMargin: yearlyNetProfitMargin,
          } = yearlyMetric;

          // other metrics -> bar chart data

          // other metrics -> bar chart data -> average order value
          const yearlyAverageOrderValueBarChartData: BarChartData = {
            Years: year,
            "Average Order Value": yearlyAverageOrderValue,
          };
          yearlyOtherMetricsBarChartsObjAcc.averageOrderValue?.push(
            yearlyAverageOrderValueBarChartData
          );

          // other metrics -> bar chart data -> conversion rate
          const yearlyConversionRateBarChartData: BarChartData = {
            Years: year,
            "Conversion Rate": toFixedFloat(yearlyConversionRate * 100, 2),
          };
          yearlyOtherMetricsBarChartsObjAcc.conversionRate?.push(
            yearlyConversionRateBarChartData
          );

          // other metrics -> bar chart data -> net profit margin
          const yearlyNetProfitMarginBarChartData: BarChartData = {
            Years: year,
            "Net Profit Margin": toFixedFloat(yearlyNetProfitMargin * 100, 2),
          };
          yearlyOtherMetricsBarChartsObjAcc.netProfitMargin?.push(
            yearlyNetProfitMarginBarChartData
          );

          // other metrics -> line chart data

          // other metrics -> line chart data -> average order value
          const yearlyAverageOrderValueLineChartData = {
            x: year,
            y: yearlyAverageOrderValue,
          };
          yearlyOtherMetricsLineChartsObjAcc.averageOrderValue
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
            )
            ?.data.push(yearlyAverageOrderValueLineChartData);

          // other metrics -> line chart data -> conversion rate
          const yearlyConversionRateLineChartData = {
            x: year,
            y: toFixedFloat(yearlyConversionRate * 100, 2),
          };
          yearlyOtherMetricsLineChartsObjAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(yearlyConversionRateLineChartData);

          // other metrics -> line chart data -> net profit margin
          const yearlyNetProfitMarginLineChartData = {
            x: year,
            y: toFixedFloat(yearlyNetProfitMargin * 100, 2),
          };
          yearlyOtherMetricsLineChartsObjAcc.netProfitMargin
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin"
            )
            ?.data.push(yearlyNetProfitMarginLineChartData);

          return yearlyMetricsChartsObjAcc;
        },
        [
          structuredClone(barChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(barChartsTemplate),
          structuredClone(lineChartsTemplate),

          structuredClone(otherMetricsBarChartsTemplate),
          structuredClone(otherMetricsLineChartsTemplate),
        ]
      );

      // yearly -> templates -> profit -> pie chart
      const yearlyProfitRepairPieChart: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.profit.repair,
      };
      const yearlyProfitSalesPieChart: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.profit.sales.total,
      };
      const yearlyProfitSalesInStorePieChart: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.profit.sales.inStore,
      };
      const yearlyProfitSalesOnlinePieChart: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.profit.sales.online,
      };

      const yearlyProfitPie: FinancialMetricsPieCharts = {
        overview: [yearlyProfitRepairPieChart, yearlyProfitSalesPieChart],
        all: [
          yearlyProfitRepairPieChart,
          yearlyProfitSalesInStorePieChart,
          yearlyProfitSalesOnlinePieChart,
        ],
        sales: [yearlyProfitSalesInStorePieChart, yearlyProfitSalesOnlinePieChart],
      };

      // yearly -> templates -> expenses -> pie chart
      const yearlyExpensesRepairPieChart: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.expenses.repair,
      };
      const yearlyExpensesSalesPieChart: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.expenses.sales.total,
      };
      const yearlyExpensesSalesInStorePieChart: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.expenses.sales.inStore,
      };
      const yearlyExpensesSalesOnlinePieChart: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.expenses.sales.online,
      };

      const yearlyExpensesPie: FinancialMetricsPieCharts = {
        overview: [yearlyExpensesRepairPieChart, yearlyExpensesSalesPieChart],
        all: [
          yearlyExpensesRepairPieChart,
          yearlyExpensesSalesInStorePieChart,
          yearlyExpensesSalesOnlinePieChart,
        ],
        sales: [yearlyExpensesSalesInStorePieChart, yearlyExpensesSalesOnlinePieChart],
      };

      // yearly -> templates -> revenue -> pie chart
      const yearlyRevenueRepairPieChart: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.revenue.repair,
      };
      const yearlyRevenueSalesPieChart: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.revenue.sales.total,
      };
      const yearlyRevenueSalesInStorePieChart: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.revenue.sales.inStore,
      };
      const yearlyRevenueSalesOnlinePieChart: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.revenue.sales.online,
      };

      const yearlyRevenuePie: FinancialMetricsPieCharts = {
        overview: [yearlyRevenueRepairPieChart, yearlyRevenueSalesPieChart],
        all: [
          yearlyRevenueRepairPieChart,
          yearlyRevenueSalesInStorePieChart,
          yearlyRevenueSalesOnlinePieChart,
        ],
        sales: [yearlyRevenueSalesInStorePieChart, yearlyRevenueSalesOnlinePieChart],
      };

      // yearly -> templates -> transactions -> pie chart
      const yearlyTransactionsRepairPieChart: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.transactions.repair,
      };
      const yearlyTransactionsSalesPieChart: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.transactions.sales.total,
      };
      const yearlyTransactionsSalesInStorePieChart: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.transactions.sales.inStore,
      };
      const yearlyTransactionsSalesOnlinePieChart: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.transactions.sales.online,
      };

      const yearlyTransactionsPie: FinancialMetricsPieCharts = {
        overview: [yearlyTransactionsRepairPieChart, yearlyTransactionsSalesPieChart],
        all: [
          yearlyTransactionsRepairPieChart,
          yearlyTransactionsSalesInStorePieChart,
          yearlyTransactionsSalesOnlinePieChart,
        ],
        sales: [
          yearlyTransactionsSalesInStorePieChart,
          yearlyTransactionsSalesOnlinePieChart,
        ],
      };

      resolve({
        revenue: {
          bar: yearlyRevenueBarChartsObj,
          line: yearlyRevenueLineChartsObj,
          pie: yearlyRevenuePie,
        },
        expenses: {
          bar: yearlyExpensesBarChartsObj,
          line: yearlyExpensesLineChartsObj,
          pie: yearlyExpensesPie,
        },
        profit: {
          bar: yearlyProfitBarChartsObj,
          line: yearlyProfitLineChartsObj,
          pie: yearlyProfitPie,
        },
        transactions: {
          bar: yearlyTransactionsBarChartsObj,
          line: yearlyTransactionsLineChartsObj,
          pie: yearlyTransactionsPie,
        },
        otherMetrics: {
          bar: yearlyOtherMetricsBarChartsObj,
          line: yearlyOtherMetricsLineChartsObj,
        },
      });
    }, 0);
  });
}

export { returnFinancialMetricsCharts2, returnSelectedDateFinancialMetrics2 };
export type {
  FinancialMetricBarCharts,
  FinancialMetricBarLineChartsKey,
  FinancialMetricCalendarChartsKey,
  FinancialMetricPieChartsKey,
  FinancialMetricsCharts,
  FinancialMetricsPieCharts,
  FinancialOtherMetricsChartsKey,
  ReturnFinancialMetricsChartsInput,
  SelectedDateFinancialMetrics,
};
