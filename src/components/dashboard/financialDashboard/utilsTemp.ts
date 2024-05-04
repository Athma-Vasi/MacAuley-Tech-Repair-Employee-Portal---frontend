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
}: ReturnFinancialMetricsChartsInput) {
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

  // monthly -> profit -> pie chart data
  const monthlyProfitRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedMonthMetrics?.profit.repair ?? 0,
  };
  const monthlyProfitSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedMonthMetrics?.profit.sales.total ?? 0,
  };
  const monthlyProfitInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedMonthMetrics?.profit.sales.inStore ?? 0,
  };
  const monthlyProfitOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedMonthMetrics?.profit.sales.online ?? 0,
  };

  const monthlyProfitPieCharts = {
    overview: [monthlyProfitRepairPieChartData, monthlyProfitSalesPieChartData],
    all: [
      monthlyProfitRepairPieChartData,
      monthlyProfitInStorePieChartData,
      monthlyProfitOnlinePieChartData,
    ],
    sales: [monthlyProfitInStorePieChartData, monthlyProfitOnlinePieChartData],
  };

  // monthly -> expenses -> pie chart data
  const monthlyExpensesRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedMonthMetrics?.expenses.repair ?? 0,
  };
  const monthlyExpensesSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedMonthMetrics?.expenses.sales.total ?? 0,
  };
  const monthlyExpensesInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedMonthMetrics?.expenses.sales.inStore ?? 0,
  };
  const monthlyExpensesOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedMonthMetrics?.expenses.sales.online ?? 0,
  };
  const monthlyExpensesPieCharts = {
    overview: [monthlyExpensesRepairPieChartData, monthlyExpensesSalesPieChartData],
    all: [
      monthlyExpensesRepairPieChartData,
      monthlyExpensesInStorePieChartData,
      monthlyExpensesOnlinePieChartData,
    ],
    sales: [monthlyExpensesInStorePieChartData, monthlyExpensesOnlinePieChartData],
  };

  // monthly -> revenue -> pie chart data
  const monthlyRevenueRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedMonthMetrics?.revenue.repair ?? 0,
  };
  const monthlyRevenueSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedMonthMetrics?.revenue.sales.total ?? 0,
  };
  const monthlyRevenueInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedMonthMetrics?.revenue.sales.inStore ?? 0,
  };
  const monthlyRevenueOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedMonthMetrics?.revenue.sales.online ?? 0,
  };

  const monthlyRevenuePieCharts = {
    overview: [monthlyRevenueRepairPieChartData, monthlyRevenueSalesPieChartData],
    all: [
      monthlyRevenueRepairPieChartData,
      monthlyRevenueInStorePieChartData,
      monthlyRevenueOnlinePieChartData,
    ],
    sales: [monthlyRevenueInStorePieChartData, monthlyRevenueOnlinePieChartData],
  };

  // monthly -> transactions -> pie chart data
  const monthlyTransactionsRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedMonthMetrics?.transactions.repair ?? 0,
  };
  const monthlyTransactionsSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedMonthMetrics?.transactions.sales.total ?? 0,
  };
  const monthlyTransactionsInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedMonthMetrics?.transactions.sales.inStore ?? 0,
  };
  const monthlyTransactionsOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedMonthMetrics?.transactions.sales.online ?? 0,
  };

  const monthlyTransactionsPieCharts = {
    overview: [
      monthlyTransactionsRepairPieChartData,
      monthlyTransactionsSalesPieChartData,
    ],
    all: [
      monthlyTransactionsRepairPieChartData,
      monthlyTransactionsInStorePieChartData,
      monthlyTransactionsOnlinePieChartData,
    ],
    sales: [
      monthlyTransactionsInStorePieChartData,
      monthlyTransactionsOnlinePieChartData,
    ],
  };

  // yearly -> templates -> profit -> pie chart data
  const yearlyProfitRepairPieChartData: PieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedYearMetrics?.profit.repair ?? 0,
  };
  const yearlyProfitSalesPieChartData: PieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedYearMetrics?.profit.sales.total ?? 0,
  };
  const yearlyProfitSalesInStorePieChartData: PieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedYearMetrics?.profit.sales.inStore ?? 0,
  };
  const yearlyProfitSalesOnlinePieChartData: PieChartData = {
    id: "Online",
    label: "Online",
    value: selectedYearMetrics?.profit.sales.online ?? 0,
  };

  const yearlyProfitPie: FinancialMetricsPieCharts = {
    overview: [yearlyProfitRepairPieChartData, yearlyProfitSalesPieChartData],
    all: [
      yearlyProfitRepairPieChartData,
      yearlyProfitSalesInStorePieChartData,
      yearlyProfitSalesOnlinePieChartData,
    ],
    sales: [yearlyProfitSalesInStorePieChartData, yearlyProfitSalesOnlinePieChartData],
  };

  // yearly -> templates -> expenses -> pie chart data
  const yearlyExpensesRepairPieChartData: PieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedYearMetrics?.expenses.repair ?? 0,
  };
  const yearlyExpensesSalesPieChartData: PieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedYearMetrics?.expenses.sales.total ?? 0,
  };
  const yearlyExpensesSalesInStorePieChartData: PieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedYearMetrics?.expenses.sales.inStore ?? 0,
  };
  const yearlyExpensesSalesOnlinePieChartData: PieChartData = {
    id: "Online",
    label: "Online",
    value: selectedYearMetrics?.expenses.sales.online ?? 0,
  };

  const yearlyExpensesPie: FinancialMetricsPieCharts = {
    overview: [yearlyExpensesRepairPieChartData, yearlyExpensesSalesPieChartData],
    all: [
      yearlyExpensesRepairPieChartData,
      yearlyExpensesSalesInStorePieChartData,
      yearlyExpensesSalesOnlinePieChartData,
    ],
    sales: [
      yearlyExpensesSalesInStorePieChartData,
      yearlyExpensesSalesOnlinePieChartData,
    ],
  };

  // yearly -> templates -> revenue -> pie chart data
  const yearlyRevenueRepairPieChartData: PieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedYearMetrics?.revenue.repair ?? 0,
  };
  const yearlyRevenueSalesPieChartData: PieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedYearMetrics?.revenue.sales.total ?? 0,
  };
  const yearlyRevenueSalesInStorePieChartData: PieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedYearMetrics?.revenue.sales.inStore ?? 0,
  };
  const yearlyRevenueSalesOnlinePieChartData: PieChartData = {
    id: "Online",
    label: "Online",
    value: selectedYearMetrics?.revenue.sales.online ?? 0,
  };

  const yearlyRevenuePie: FinancialMetricsPieCharts = {
    overview: [yearlyRevenueRepairPieChartData, yearlyRevenueSalesPieChartData],
    all: [
      yearlyRevenueRepairPieChartData,
      yearlyRevenueSalesInStorePieChartData,
      yearlyRevenueSalesOnlinePieChartData,
    ],
    sales: [yearlyRevenueSalesInStorePieChartData, yearlyRevenueSalesOnlinePieChartData],
  };

  // yearly -> templates -> transactions -> pie chart data
  const yearlyTransactionsRepairPieChartData: PieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedYearMetrics?.transactions.repair ?? 0,
  };
  const yearlyTransactionsSalesPieChartData: PieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedYearMetrics?.transactions.sales.total ?? 0,
  };
  const yearlyTransactionsSalesInStorePieChartData: PieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedYearMetrics?.transactions.sales.inStore ?? 0,
  };
  const yearlyTransactionsSalesOnlinePieChartData: PieChartData = {
    id: "Online",
    label: "Online",
    value: selectedYearMetrics?.transactions.sales.online ?? 0,
  };

  const yearlyTransactionsPie: FinancialMetricsPieCharts = {
    overview: [yearlyTransactionsRepairPieChartData, yearlyTransactionsSalesPieChartData],
    all: [
      yearlyTransactionsRepairPieChartData,
      yearlyTransactionsSalesInStorePieChartData,
      yearlyTransactionsSalesOnlinePieChartData,
    ],
    sales: [
      yearlyTransactionsSalesInStorePieChartData,
      yearlyTransactionsSalesOnlinePieChartData,
    ],
  };

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );
}

type CreateDailyFinancialChartsInput = {
  dailyMetrics?: DailyFinancialMetric[];
  monthIndex: string;
  selectedDayMetrics?: DailyFinancialMetric;
  selectedYear: Year;
  barChartsTemplate: FinancialMetricBarCharts;
  calendarChartsTemplate: FinancialMetricCalendarCharts;
  lineChartsTemplate: FinancialMetricLineCharts;
  otherMetricsBarChartsTemplate: FinancialOtherMetricsBarCharts;
  otherMetricsCalendarChartsTemplate: FinancialOtherMetricsCalendarCharts;
  otherMetricsLineChartsTemplate: FinancialOtherMetricsLineCharts;
};
async function createDailyFinancialCharts({
  dailyMetrics,
  monthIndex,
  selectedDayMetrics,
  selectedYear,
  barChartsTemplate,
  calendarChartsTemplate,
  lineChartsTemplate,
  otherMetricsBarChartsTemplate,
  otherMetricsCalendarChartsTemplate,
  otherMetricsLineChartsTemplate,
}: CreateDailyFinancialChartsInput): Promise<FinancialMetricsCharts["daily"]> {
  if (!dailyMetrics || !selectedDayMetrics) {
    return new Promise((resolve) => {
      const pieChartsTemplate: FinancialMetricsPieCharts = {
        overview: [],
        all: [],
        sales: [],
      };

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

          // profit -> bar chart data

          // profit -> bar chart data -> total
          const dailyProfitTotalBarChart: BarChartData = {
            Days: day,
            Total: totalProfit,
          };
          dailyProfitBarChartsAcc.total.push(dailyProfitTotalBarChart);

          // profit -> bar chart data -> all
          const dailyProfitAllBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
            "In-Store": salesProfit.inStore,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.all.push(dailyProfitAllBarChart);

          // profit -> bar chart data -> overview
          const dailyProfitOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
            Sales: salesProfit.total,
          };
          dailyProfitBarChartsAcc.overview.push(dailyProfitOverviewBarChart);

          // profit -> bar chart data -> repair
          const dailyProfitRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairProfit,
          };
          dailyProfitBarChartsAcc.repair.push(dailyProfitRepairBarChart);

          // profit -> bar chart data -> sales
          const dailyProfitSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesProfit.inStore,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.sales.push(dailyProfitSalesBarChart);

          // profit -> bar chart data -> in-store
          const dailyProfitInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesProfit.inStore,
          };
          dailyProfitBarChartsAcc.inStore.push(dailyProfitInStoreBarChart);

          // profit -> bar chart data -> online
          const dailyProfitOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesProfit.online,
          };
          dailyProfitBarChartsAcc.online.push(dailyProfitOnlineBarChart);

          // profit -> calendar chart data

          // profit -> calendar chart data -> total
          const dailyProfitTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalProfit,
          };
          dailyProfitCalendarChartsAcc.total.push(dailyProfitTotalCalendarChart);

          // profit -> calendar chart data -> repair
          const dailyProfitRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairProfit,
          };
          dailyProfitCalendarChartsAcc.repair.push(dailyProfitRepairCalendarChart);

          // profit -> calendar chart data -> sales
          const dailyProfitSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.total,
          };
          dailyProfitCalendarChartsAcc.sales.push(dailyProfitSalesCalendarChart);

          // profit -> calendar chart data -> in-store
          const dailyProfitInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.inStore,
          };
          dailyProfitCalendarChartsAcc.inStore.push(dailyProfitInStoreCalendarChart);

          // profit -> calendar chart data -> online
          const dailyProfitOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesProfit.online,
          };
          dailyProfitCalendarChartsAcc.online.push(dailyProfitOnlineCalendarChart);

          // profit -> line chart data

          // profit -> line chart data -> total
          const dailyProfitTotalLineChart = {
            x: day,
            y: totalProfit,
          };
          dailyProfitLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyProfitTotalLineChart);

          // profit -> line chart data -> all -> repair
          const dailyProfitAllRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitAllRepairLineChart);

          // profit -> line chart data -> all -> in-store
          const dailyProfitAllInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitAllInStoreLineChart);

          // profit -> line chart data -> all -> online
          const dailyProfitAllOnlineLineChart = {
            x: day,
            y: salesProfit.online,
          };
          dailyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyProfitAllOnlineLineChart);

          // profit -> line chart data -> overview -> repair
          const dailyProfitOverviewRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitOverviewRepairLineChart);

          // profit -> line chart data -> overview -> sales
          const dailyProfitOverviewSalesLineChart = {
            x: day,
            y: salesProfit.total,
          };
          dailyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyProfitOverviewSalesLineChart);

          // profit -> line chart data -> repair
          const dailyProfitRepairLineChart = {
            x: day,
            y: repairProfit,
          };
          dailyProfitLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyProfitRepairLineChart);

          // profit -> line chart data -> sales -> in-store
          const dailyProfitSalesInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitSalesInStoreLineChart);

          // profit -> line chart data -> sales -> online
          const dailyProfitSalesOnlineLineChart = {
            x: day,
            y: salesProfit.online,
          };
          dailyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyProfitSalesOnlineLineChart);

          // profit -> line chart data -> in-store
          const dailyProfitInStoreLineChart = {
            x: day,
            y: salesProfit.inStore,
          };
          dailyProfitLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyProfitInStoreLineChart);

          // profit -> line chart data -> online
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

          // expenses -> bar chart data

          // expenses -> bar chart data -> total
          const dailyExpensesTotalBarChart: BarChartData = {
            Days: day,
            Total: totalExpenses,
          };
          dailyExpensesBarChartsAcc.total.push(dailyExpensesTotalBarChart);

          // expenses -> bar chart data -> all
          const dailyExpensesAllBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
            "In-Store": salesExpenses.inStore,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.all?.push(dailyExpensesAllBarChart);

          // expenses -> bar chart data -> overview
          const dailyExpensesOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
            Sales: salesExpenses.total,
          };
          dailyExpensesBarChartsAcc.overview.push(dailyExpensesOverviewBarChart);

          // expenses -> bar chart data -> repair
          const dailyExpensesRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairExpenses,
          };
          dailyExpensesBarChartsAcc.repair.push(dailyExpensesRepairBarChart);

          // expenses -> bar chart data -> sales
          const dailyExpensesSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesExpenses.inStore,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.sales.push(dailyExpensesSalesBarChart);

          // expenses -> bar chart data -> in-store
          const dailyExpensesInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesExpenses.inStore,
          };
          dailyExpensesBarChartsAcc.inStore.push(dailyExpensesInStoreBarChart);

          // expenses -> bar chart data -> online
          const dailyExpensesOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesExpenses.online,
          };
          dailyExpensesBarChartsAcc.online.push(dailyExpensesOnlineBarChart);

          // expenses -> calendar chart data

          // expenses -> calendar chart data -> total
          const dailyExpensesTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalExpenses,
          };
          dailyExpensesCalendarChartsAcc.total.push(dailyExpensesTotalCalendarChart);

          // expenses -> calendar chart data -> repair
          const dailyExpensesRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairExpenses,
          };
          dailyExpensesCalendarChartsAcc.repair.push(dailyExpensesRepairCalendarChart);

          // expenses -> calendar chart data -> sales
          const dailyExpensesSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.total,
          };
          dailyExpensesCalendarChartsAcc.sales.push(dailyExpensesSalesCalendarChart);

          // expenses -> calendar chart data -> in-store
          const dailyExpensesInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.inStore,
          };
          dailyExpensesCalendarChartsAcc.inStore.push(dailyExpensesInStoreCalendarChart);

          // expenses -> calendar chart data -> online
          const dailyExpensesOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesExpenses.online,
          };
          dailyExpensesCalendarChartsAcc.online.push(dailyExpensesOnlineCalendarChart);

          // expenses -> line chart data

          // expenses -> line chart data -> total
          const dailyExpensesTotalLineChart = {
            x: day,
            y: totalExpenses,
          };
          dailyExpensesLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyExpensesTotalLineChart);

          // expenses -> line chart data -> all -> repair
          const dailyExpensesAllRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesAllRepairLineChart);

          // expenses -> line chart data -> all -> in-store
          const dailyExpensesAllInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesAllInStoreLineChart);

          // expenses -> line chart data -> all -> online
          const dailyExpensesAllOnlineLineChart = {
            x: day,
            y: salesExpenses.online,
          };
          dailyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyExpensesAllOnlineLineChart);

          // expenses -> line chart data -> overview -> repair
          const dailyExpensesOverviewRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesOverviewRepairLineChart);

          // expenses -> line chart data -> overview -> sales
          const dailyExpensesOverviewSalesLineChart = {
            x: day,
            y: salesExpenses.total,
          };
          dailyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyExpensesOverviewSalesLineChart);

          // expenses -> line chart data -> repair
          const dailyExpensesRepairLineChart = {
            x: day,
            y: repairExpenses,
          };
          dailyExpensesLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyExpensesRepairLineChart);

          // expenses -> line chart data -> sales -> in-store
          const dailyExpensesSalesInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesSalesInStoreLineChart);

          // expenses -> line chart data -> sales -> online
          const dailyExpensesSalesOnlineLineChart = {
            x: day,
            y: salesExpenses.online,
          };
          dailyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyExpensesSalesOnlineLineChart);

          // expenses -> line chart data -> in-store
          const dailyExpensesInStoreLineChart = {
            x: day,
            y: salesExpenses.inStore,
          };
          dailyExpensesLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyExpensesInStoreLineChart);

          // expenses -> line chart data -> online
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

          // revenue -> bar chart data

          // revenue -> bar chart data -> total
          const dailyRevenueTotalBarChart: BarChartData = {
            Days: day,
            Total: totalRevenue,
          };
          dailyRevenueBarChartsAcc.total.push(dailyRevenueTotalBarChart);

          // revenue -> bar chart data -> all
          const dailyRevenueAllBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
            "In-Store": salesRevenue.inStore,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.all.push(dailyRevenueAllBarChart);

          // revenue -> bar chart data -> overview
          const dailyRevenueOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
            Sales: salesRevenue.total,
          };
          dailyRevenueBarChartsAcc.overview.push(dailyRevenueOverviewBarChart);

          // revenue -> bar chart data -> repair
          const dailyRevenueRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairRevenue,
          };
          dailyRevenueBarChartsAcc.repair.push(dailyRevenueRepairBarChart);

          // revenue -> bar chart data -> sales
          const dailyRevenueSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesRevenue.inStore,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.sales.push(dailyRevenueSalesBarChart);

          // revenue -> bar chart data -> in-store
          const dailyRevenueInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesRevenue.inStore,
          };
          dailyRevenueBarChartsAcc.inStore.push(dailyRevenueInStoreBarChart);

          // revenue -> bar chart data -> online
          const dailyRevenueOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesRevenue.online,
          };
          dailyRevenueBarChartsAcc.online.push(dailyRevenueOnlineBarChart);

          // revenue -> calendar chart data

          // revenue -> calendar chart data -> total
          const dailyRevenueTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalRevenue,
          };
          dailyRevenueCalendarChartsAcc.total.push(dailyRevenueTotalCalendarChart);

          // revenue -> calendar chart data -> repair
          const dailyRevenueRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairRevenue,
          };
          dailyRevenueCalendarChartsAcc.repair.push(dailyRevenueRepairCalendarChart);

          // revenue -> calendar chart data -> sales
          const dailyRevenueSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.total,
          };
          dailyRevenueCalendarChartsAcc.sales.push(dailyRevenueSalesCalendarChart);

          // revenue -> calendar chart data -> in-store
          const dailyRevenueInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.inStore,
          };
          dailyRevenueCalendarChartsAcc.inStore.push(dailyRevenueInStoreCalendarChart);

          // revenue -> calendar chart data -> online
          const dailyRevenueOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesRevenue.online,
          };
          dailyRevenueCalendarChartsAcc.online.push(dailyRevenueOnlineCalendarChart);

          // revenue -> line chart data

          // revenue -> line chart data -> total
          const dailyRevenueTotalLineChart = {
            x: day,
            y: totalRevenue,
          };
          dailyRevenueLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyRevenueTotalLineChart);

          // revenue -> line chart data -> all -> repair
          const dailyRevenueAllRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueAllRepairLineChart);

          // revenue -> line chart data -> all -> in-store
          const dailyRevenueAllInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueAllInStoreLineChart);

          // revenue -> line chart data -> all -> online
          const dailyRevenueAllOnlineLineChart = {
            x: day,
            y: salesRevenue.online,
          };
          dailyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyRevenueAllOnlineLineChart);

          // revenue -> line chart data -> overview -> repair
          const dailyRevenueOverviewRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueOverviewRepairLineChart);

          // revenue -> line chart data -> overview -> sales
          const dailyRevenueOverviewSalesLineChart = {
            x: day,
            y: salesRevenue.total,
          };
          dailyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyRevenueOverviewSalesLineChart);

          // revenue -> line chart data -> repair
          const dailyRevenueRepairLineChart = {
            x: day,
            y: repairRevenue,
          };
          dailyRevenueLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyRevenueRepairLineChart);

          // revenue -> line chart data -> sales -> in-store
          const dailyRevenueSalesInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueSalesInStoreLineChart);

          // revenue -> line chart data -> sales -> online
          const dailyRevenueSalesOnlineLineChart = {
            x: day,
            y: salesRevenue.online,
          };
          dailyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyRevenueSalesOnlineLineChart);

          // revenue -> line chart data -> in-store
          const dailyRevenueInStoreLineChart = {
            x: day,
            y: salesRevenue.inStore,
          };
          dailyRevenueLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyRevenueInStoreLineChart);

          // revenue -> line chart data -> online
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

          // transactions -> bar chart data

          // transactions -> bar chart data -> total
          const dailyTransactionsTotalBarChart: BarChartData = {
            Days: day,
            Total: totalTransactions,
          };
          dailyTransactionsBarChartsAcc.total.push(dailyTransactionsTotalBarChart);

          // transactions -> bar chart data -> all
          const dailyTransactionsAllBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
            "In-Store": salesTransactions.inStore,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.all?.push(dailyTransactionsAllBarChart);

          // transactions -> bar chart data -> overview
          const dailyTransactionsOverviewBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
            Sales: salesTransactions.total,
          };
          dailyTransactionsBarChartsAcc.overview.push(dailyTransactionsOverviewBarChart);

          // transactions -> bar chart data -> repair
          const dailyTransactionsRepairBarChart: BarChartData = {
            Days: day,
            Repair: repairTransactions,
          };
          dailyTransactionsBarChartsAcc.repair.push(dailyTransactionsRepairBarChart);

          // transactions -> bar chart data -> sales
          const dailyTransactionsSalesBarChart: BarChartData = {
            Days: day,
            "In-Store": salesTransactions.inStore,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.sales.push(dailyTransactionsSalesBarChart);

          // transactions -> bar chart data -> in-store
          const dailyTransactionsInStoreBarChart: BarChartData = {
            Days: day,
            "In-Store": salesTransactions.inStore,
          };
          dailyTransactionsBarChartsAcc.inStore.push(dailyTransactionsInStoreBarChart);

          // transactions -> bar chart data -> online
          const dailyTransactionsOnlineBarChart: BarChartData = {
            Days: day,
            Online: salesTransactions.online,
          };
          dailyTransactionsBarChartsAcc.online.push(dailyTransactionsOnlineBarChart);

          // transactions -> calendar chart data

          // transactions -> calendar chart data -> total
          const dailyTransactionsTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: totalTransactions,
          };
          dailyTransactionsCalendarChartsAcc.total.push(
            dailyTransactionsTotalCalendarChart
          );

          // transactions -> calendar chart data -> repair
          const dailyTransactionsRepairCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: repairTransactions,
          };
          dailyTransactionsCalendarChartsAcc.repair.push(
            dailyTransactionsRepairCalendarChart
          );

          // transactions -> calendar chart data -> sales
          const dailyTransactionsSalesCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.total,
          };
          dailyTransactionsCalendarChartsAcc.sales.push(
            dailyTransactionsSalesCalendarChart
          );

          // transactions -> calendar chart data -> in-store
          const dailyTransactionsInStoreCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.inStore,
          };
          dailyTransactionsCalendarChartsAcc.inStore.push(
            dailyTransactionsInStoreCalendarChart
          );

          // transactions -> calendar chart data -> online
          const dailyTransactionsOnlineCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: salesTransactions.online,
          };
          dailyTransactionsCalendarChartsAcc.online.push(
            dailyTransactionsOnlineCalendarChart
          );

          // transactions -> line chart data

          // transactions -> line chart data -> total
          const dailyTransactionsTotalLineChart = {
            x: day,
            y: totalTransactions,
          };
          dailyTransactionsLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyTransactionsTotalLineChart);

          // transactions -> line chart data -> all -> repair
          const dailyTransactionsAllRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsAllRepairLineChart);

          // transactions -> line chart data -> all -> in-store
          const dailyTransactionsAllInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsAllInStoreLineChart);

          // transactions -> line chart data -> all -> online
          const dailyTransactionsAllOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsAllOnlineLineChart);

          // transactions -> line chart data -> overview -> repair
          const dailyTransactionsOverviewRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsOverviewRepairLineChart);

          // transactions -> line chart data -> overview -> sales
          const dailyTransactionsOverviewSalesLineChart = {
            x: day,
            y: salesTransactions.total,
          };
          dailyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyTransactionsOverviewSalesLineChart);

          // transactions -> line chart data -> repair
          const dailyTransactionsRepairLineChart = {
            x: day,
            y: repairTransactions,
          };
          dailyTransactionsLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyTransactionsRepairLineChart);

          // transactions -> line chart data -> sales -> in-store
          const dailyTransactionsSalesInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsSalesInStoreLineChart);

          // transactions -> line chart data -> sales -> online
          const dailyTransactionsSalesOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsSalesOnlineLineChart);

          // transactions -> line chart data -> in-store
          const dailyTransactionsInStoreLineChart = {
            x: day,
            y: salesTransactions.inStore,
          };
          dailyTransactionsLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyTransactionsInStoreLineChart);

          // transactions -> line chart data -> online
          const dailyTransactionsOnlineLineChart = {
            x: day,
            y: salesTransactions.online,
          };
          dailyTransactionsLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyTransactionsOnlineLineChart);

          // other metrics
          const { averageOrderValue, conversionRate, netProfitMargin } = dailyMetric;

          // other metrics -> bar chart data

          // other metrics -> bar chart data -> average order value
          const dailyOtherMetricsTotalBarChart: BarChartData = {
            Days: day,
            "Average Order Value": averageOrderValue,
          };
          dailyOtherMetricsBarChartsAcc.averageOrderValue?.push(
            dailyOtherMetricsTotalBarChart
          );

          // other metrics -> bar chart data -> conversion rate
          const dailyOtherMetricsAllBarChart: BarChartData = {
            Days: day,
            "Conversion Rate": Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsBarChartsAcc.conversionRate?.push(
            dailyOtherMetricsAllBarChart
          );

          // other metrics -> bar chart data -> net profit margin
          const dailyOtherMetricsOverviewBarChart: BarChartData = {
            Days: day,
            "Net Profit Margin": Number((netProfitMargin * 100).toFixed(2)),
          };
          dailyOtherMetricsBarChartsAcc.netProfitMargin?.push(
            dailyOtherMetricsOverviewBarChart
          );

          // other metrics -> calendar chart data

          // other metrics -> calendar chart data -> average order value
          const dailyOtherMetricsTotalCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: averageOrderValue,
          };
          dailyOtherMetricsCalendarChartsAcc.averageOrderValue?.push(
            dailyOtherMetricsTotalCalendarChart
          );

          // other metrics -> calendar chart data -> conversion rate
          const dailyOtherMetricsConversionRateCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsCalendarChartsAcc.conversionRate?.push(
            dailyOtherMetricsConversionRateCalendarChart
          );

          // other metrics -> calendar chart data -> net profit margin
          const dailyOtherMetricsNetProfitMarginCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: Number((netProfitMargin * 100).toFixed(2)),
          };
          dailyOtherMetricsCalendarChartsAcc.netProfitMargin?.push(
            dailyOtherMetricsNetProfitMarginCalendarChart
          );

          // other metrics -> line chart data

          // other metrics -> line chart data -> average order value
          const dailyOtherMetricsAverageOrderValueLineChart = {
            x: day,
            y: averageOrderValue,
          };
          dailyOtherMetricsLineChartsAcc.averageOrderValue
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
            )
            ?.data.push(dailyOtherMetricsAverageOrderValueLineChart);

          // other metrics -> line chart data -> conversion rate
          const dailyOtherMetricsConversionRateLineChart = {
            x: day,
            y: Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsLineChartsAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(dailyOtherMetricsConversionRateLineChart);

          // other metrics -> line chart data -> net profit margin
          const dailyOtherMetricsNetProfitMarginLineChart = {
            x: day,
            y: Number((netProfitMargin * 100).toFixed(2)),
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
      const dailyProfitRepairPieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.profit.repair,
      };
      const dailyProfitSalesPieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.profit.sales.total,
      };
      const dailyProfitSalesInStorePieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.profit.sales.inStore,
      };
      const dailyProfitSalesOnlinePieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.profit.sales.online,
      };

      const dailyProfitPieCharts = {
        overview: [dailyProfitRepairPieChartData, dailyProfitSalesPieChartData],
        all: [
          dailyProfitRepairPieChartData,
          dailyProfitSalesInStorePieChartData,
          dailyProfitSalesOnlinePieChartData,
        ],
        sales: [dailyProfitSalesInStorePieChartData, dailyProfitSalesOnlinePieChartData],
      };

      // daily -> expenses -> pie charts
      const dailyExpensesRepairPieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.expenses.repair,
      };
      const dailyExpensesSalesPieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.expenses.sales.total,
      };
      const dailyExpensesSalesInStorePieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.expenses.sales.inStore,
      };
      const dailyExpensesSalesOnlinePieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.expenses.sales.online,
      };

      const dailyExpensesPieCharts = {
        overview: [dailyExpensesRepairPieChartData, dailyExpensesSalesPieChartData],
        all: [
          dailyExpensesRepairPieChartData,
          dailyExpensesSalesInStorePieChartData,
          dailyExpensesSalesOnlinePieChartData,
        ],
        sales: [
          dailyExpensesSalesInStorePieChartData,
          dailyExpensesSalesOnlinePieChartData,
        ],
      };

      // daily -> revenue -> pie charts
      const dailyRevenueRepairPieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.revenue.repair,
      };
      const dailyRevenueSalesPieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.revenue.sales.total,
      };
      const dailyRevenueSalesInStorePieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.revenue.sales.inStore,
      };
      const dailyRevenueSalesOnlinePieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.revenue.sales.online,
      };

      const dailyRevenuePieCharts = {
        overview: [dailyRevenueRepairPieChartData, dailyRevenueSalesPieChartData],
        all: [
          dailyRevenueRepairPieChartData,
          dailyRevenueSalesInStorePieChartData,
          dailyRevenueSalesOnlinePieChartData,
        ],
        sales: [
          dailyRevenueSalesInStorePieChartData,
          dailyRevenueSalesOnlinePieChartData,
        ],
      };

      // daily -> transactions -> pie charts
      const dailyTransactionsRepairPieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.transactions.repair,
      };
      const dailyTransactionsSalesPieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.transactions.sales.total,
      };
      const dailyTransactionsSalesInStorePieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.transactions.sales.inStore,
      };
      const dailyTransactionsSalesOnlinePieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.transactions.sales.online,
      };

      const dailyTransactionsPieCharts = {
        overview: [
          dailyTransactionsRepairPieChartData,
          dailyTransactionsSalesPieChartData,
        ],
        all: [
          dailyTransactionsRepairPieChartData,
          dailyTransactionsSalesInStorePieChartData,
          dailyTransactionsSalesOnlinePieChartData,
        ],
        sales: [
          dailyTransactionsSalesInStorePieChartData,
          dailyTransactionsSalesOnlinePieChartData,
        ],
      };

      //
      //
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
