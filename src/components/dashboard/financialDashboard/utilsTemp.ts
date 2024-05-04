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

  const PIE_CHARTS_TEMPLATE: FinancialMetricsPieCharts = {
    overview: [],
    all: [],
    sales: [],
  };

  // yearly -> templates -> profit -> pie chart
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

  // yearly -> templates -> expenses -> pie chart
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

  // yearly -> templates -> revenue -> pie chart
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

  // yearly -> templates -> transactions -> pie chart
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
            "Conversion Rate": Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsBarChartsAcc.conversionRate?.push(
            dailyOtherMetricsAllBarChart
          );

          // other metrics -> bar chart -> net profit margin
          const dailyOtherMetricsOverviewBarChart: BarChartData = {
            Days: day,
            "Net Profit Margin": Number((netProfitMargin * 100).toFixed(2)),
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
            value: Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsCalendarChartsAcc.conversionRate?.push(
            dailyOtherMetricsConversionRateCalendarChart
          );

          // other metrics -> calendar chart -> net profit margin
          const dailyOtherMetricsNetProfitMarginCalendarChart: CalendarChartData = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: Number((netProfitMargin * 100).toFixed(2)),
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
            y: Number((conversionRate * 100).toFixed(2)),
          };
          dailyOtherMetricsLineChartsAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(dailyOtherMetricsConversionRateLineChart);

          // other metrics -> line chart -> net profit margin
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
          const monthNumberStr = (months.indexOf(month) + 1).toString().padStart(2, "0");

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
          const monthlyProfitTotalBarChartData: BarChartData = {
            Months: month,
            Total: monthlyTotalProfit,
          };
          monthlyProfitBarChartsAcc.total.push(monthlyProfitTotalBarChartData);

          // profit -> bar chart -> all
          const monthlyProfitAllBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
            "In-Store": monthlySalesProfit.inStore,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.all?.push(monthlyProfitAllBarChartData);

          // profit -> bar chart -> overview
          const monthlyProfitOverviewBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
            Sales: monthlySalesProfit.total,
          };
          monthlyProfitBarChartsAcc.overview.push(monthlyProfitOverviewBarChartData);

          // profit -> bar chart -> repair
          const monthlyProfitRepairBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairProfit,
          };
          monthlyProfitBarChartsAcc.repair.push(monthlyProfitRepairBarChartData);

          // profit -> bar chart -> sales
          const monthlyProfitSalesBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesProfit.inStore,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.sales.push(monthlyProfitSalesBarChartData);

          // profit -> bar chart -> in-store
          const monthlyProfitInStoreBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesProfit.inStore,
          };
          monthlyProfitBarChartsAcc.inStore.push(monthlyProfitInStoreBarChartData);

          // profit -> bar chart -> online
          const monthlyProfitOnlineBarChartData: BarChartData = {
            Months: month,
            Online: monthlySalesProfit.online,
          };
          monthlyProfitBarChartsAcc.online.push(monthlyProfitOnlineBarChartData);

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
            const monthlyProfitTotalCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyTotalProfit,
            };
            monthlyProfitCalendarChartsAcc.total?.push(
              monthlyProfitTotalCalendarChartData
            );

            // profit -> calendar chart -> repair
            const monthlyProfitRepairCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyRepairProfit,
            };
            monthlyProfitCalendarChartsAcc.repair?.push(
              monthlyProfitRepairCalendarChartData
            );

            // profit -> calendar chart -> sales
            const monthlyProfitSalesCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesProfit.total,
            };
            monthlyProfitCalendarChartsAcc.sales?.push(
              monthlyProfitSalesCalendarChartData
            );

            // profit -> calendar chart -> in-store
            const monthlyProfitInStoreCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesProfit.inStore,
            };
            monthlyProfitCalendarChartsAcc.inStore?.push(
              monthlyProfitInStoreCalendarChartData
            );

            // profit -> calendar chart -> online
            const monthlyProfitOnlineCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesProfit.online,
            };
            monthlyProfitCalendarChartsAcc.online?.push(
              monthlyProfitOnlineCalendarChartData
            );
          });

          // profit -> line chart

          // profit -> line chart -> total
          const monthlyProfitTotalLineChartData = {
            x: month,
            y: monthlyTotalProfit,
          };
          monthlyProfitLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyProfitTotalLineChartData);

          // profit -> line chart -> all -> repair
          const monthlyProfitAllRepairLineChartData = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitAllRepairLineChartData);

          // profit -> line chart -> all -> in-store
          const monthlyProfitAllInStoreLineChartData = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitAllInStoreLineChartData);

          // profit -> line chart -> all -> online
          const monthlyProfitAllOnlineLineChartData = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitAllOnlineLineChartData);

          // profit -> line chart -> overview -> repair
          const monthlyProfitOverviewRepairLineChartData = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitOverviewRepairLineChartData);

          // profit -> line chart -> overview -> sales
          const monthlyProfitOverviewSalesLineChartData = {
            x: month,
            y: monthlySalesProfit.total,
          };
          monthlyProfitLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyProfitOverviewSalesLineChartData);

          // profit -> line chart -> repair
          const monthlyProfitRepairLineChartData = {
            x: month,
            y: monthlyRepairProfit,
          };
          monthlyProfitLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyProfitRepairLineChartData);

          // profit -> line chart -> sales -> in-store
          const monthlyProfitSalesInStoreLineChartData = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitSalesInStoreLineChartData);

          // profit -> line chart -> sales -> online
          const monthlyProfitSalesOnlineLineChartData = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitSalesOnlineLineChartData);

          // profit -> line chart -> in-store
          const monthlyProfitInStoreLineChartData = {
            x: month,
            y: monthlySalesProfit.inStore,
          };
          monthlyProfitLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyProfitInStoreLineChartData);

          // profit -> line chart -> online
          const monthlyProfitOnlineLineChartData = {
            x: month,
            y: monthlySalesProfit.online,
          };
          monthlyProfitLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyProfitOnlineLineChartData);

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
          const monthlyExpensesTotalBarChartData: BarChartData = {
            Months: month,
            Total: monthlyTotalExpenses,
          };
          monthlyExpensesBarChartsAcc.total.push(monthlyExpensesTotalBarChartData);

          // expenses -> bar chart -> all
          const monthlyExpensesAllBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
            "In-Store": monthlySalesExpenses.inStore,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.all?.push(monthlyExpensesAllBarChartData);

          // expenses -> bar chart -> overview
          const monthlyExpensesOverviewBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
            Sales: monthlySalesExpenses.total,
          };
          monthlyExpensesBarChartsAcc.overview.push(monthlyExpensesOverviewBarChartData);

          // expenses -> bar chart -> repair
          const monthlyExpensesRepairBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairExpenses,
          };
          monthlyExpensesBarChartsAcc.repair.push(monthlyExpensesRepairBarChartData);

          // expenses -> bar chart -> sales
          const monthlyExpensesSalesBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesExpenses.inStore,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.sales.push(monthlyExpensesSalesBarChartData);

          // expenses -> bar chart -> in-store
          const monthlyExpensesInStoreBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesExpenses.inStore,
          };
          monthlyExpensesBarChartsAcc.inStore.push(monthlyExpensesInStoreBarChartData);

          // expenses -> bar chart -> online
          const monthlyExpensesOnlineBarChartData: BarChartData = {
            Months: month,
            Online: monthlySalesExpenses.online,
          };
          monthlyExpensesBarChartsAcc.online.push(monthlyExpensesOnlineBarChartData);

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
            const monthlyExpensesTotalCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyTotalExpenses,
            };
            monthlyExpensesCalendarChartsAcc.total?.push(
              monthlyExpensesTotalCalendarChartData
            );

            // expenses -> calendar chart -> repair
            const monthlyExpensesRepairCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyRepairExpenses,
            };
            monthlyExpensesCalendarChartsAcc.repair?.push(
              monthlyExpensesRepairCalendarChartData
            );

            // expenses -> calendar chart -> sales
            const monthlyExpensesSalesCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesExpenses.total,
            };
            monthlyExpensesCalendarChartsAcc.sales?.push(
              monthlyExpensesSalesCalendarChartData
            );

            // expenses -> calendar chart -> in-store
            const monthlyExpensesInStoreCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesExpenses.inStore,
            };
            monthlyExpensesCalendarChartsAcc.inStore?.push(
              monthlyExpensesInStoreCalendarChartData
            );

            // expenses -> calendar chart -> online
            const monthlyExpensesOnlineCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesExpenses.online,
            };
            monthlyExpensesCalendarChartsAcc.online?.push(
              monthlyExpensesOnlineCalendarChartData
            );
          });

          // expenses -> line chart

          // expenses -> line chart -> total
          const monthlyExpensesTotalLineChartData = {
            x: month,
            y: monthlyTotalExpenses,
          };
          monthlyExpensesLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyExpensesTotalLineChartData);

          // expenses -> line chart -> all -> repair
          const monthlyExpensesAllRepairLineChartData = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesAllRepairLineChartData);

          // expenses -> line chart -> all -> in-store
          const monthlyExpensesAllInStoreLineChartData = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesAllInStoreLineChartData);

          // expenses -> line chart -> all -> online
          const monthlyExpensesAllOnlineLineChartData = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesAllOnlineLineChartData);

          // expenses -> line chart -> overview -> repair
          const monthlyExpensesOverviewRepairLineChartData = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesOverviewRepairLineChartData);

          // expenses -> line chart -> overview -> sales
          const monthlyExpensesOverviewSalesLineChartData = {
            x: month,
            y: monthlySalesExpenses.total,
          };
          monthlyExpensesLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyExpensesOverviewSalesLineChartData);

          // expenses -> line chart -> repair
          const monthlyExpensesRepairLineChartData = {
            x: month,
            y: monthlyRepairExpenses,
          };
          monthlyExpensesLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyExpensesRepairLineChartData);

          // expenses -> line chart -> sales -> in-store
          const monthlyExpensesSalesInStoreLineChartData = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesSalesInStoreLineChartData);

          // expenses -> line chart -> sales -> online
          const monthlyExpensesSalesOnlineLineChartData = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesSalesOnlineLineChartData);

          // expenses -> line chart -> in-store
          const monthlyExpensesInStoreLineChartData = {
            x: month,
            y: monthlySalesExpenses.inStore,
          };
          monthlyExpensesLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyExpensesInStoreLineChartData);

          // expenses -> line chart -> online
          const monthlyExpensesOnlineLineChartData = {
            x: month,
            y: monthlySalesExpenses.online,
          };
          monthlyExpensesLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyExpensesOnlineLineChartData);

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
          const monthlyRevenueTotalBarChartData: BarChartData = {
            Months: month,
            Total: monthlyTotalRevenue,
          };
          monthlyRevenueBarChartsAcc.total.push(monthlyRevenueTotalBarChartData);

          // revenue -> bar chart -> all
          const monthlyRevenueAllBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
            "In-Store": monthlySalesRevenue.inStore,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.all?.push(monthlyRevenueAllBarChartData);

          // revenue -> bar chart -> overview
          const monthlyRevenueOverviewBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
            Sales: monthlySalesRevenue.total,
          };
          monthlyRevenueBarChartsAcc.overview.push(monthlyRevenueOverviewBarChartData);

          // revenue -> bar chart -> repair
          const monthlyRevenueRepairBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairRevenue,
          };
          monthlyRevenueBarChartsAcc.repair.push(monthlyRevenueRepairBarChartData);

          // revenue -> bar chart -> sales
          const monthlyRevenueSalesBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesRevenue.inStore,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.sales.push(monthlyRevenueSalesBarChartData);

          // revenue -> bar chart -> in-store
          const monthlyRevenueInStoreBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesRevenue.inStore,
          };
          monthlyRevenueBarChartsAcc.inStore.push(monthlyRevenueInStoreBarChartData);

          // revenue -> bar chart -> online
          const monthlyRevenueOnlineBarChartData: BarChartData = {
            Months: month,
            Online: monthlySalesRevenue.online,
          };
          monthlyRevenueBarChartsAcc.online.push(monthlyRevenueOnlineBarChartData);

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
            const monthlyRevenueTotalCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyTotalRevenue,
            };
            monthlyRevenueCalendarChartsAcc.total?.push(
              monthlyRevenueTotalCalendarChartData
            );

            // revenue -> calendar chart -> repair
            const monthlyRevenueRepairCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyRepairRevenue,
            };
            monthlyRevenueCalendarChartsAcc.repair?.push(
              monthlyRevenueRepairCalendarChartData
            );

            // revenue -> calendar chart -> sales
            const monthlyRevenueSalesCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesRevenue.total,
            };
            monthlyRevenueCalendarChartsAcc.sales?.push(
              monthlyRevenueSalesCalendarChartData
            );

            // revenue -> calendar chart -> in-store
            const monthlyRevenueInStoreCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesRevenue.inStore,
            };
            monthlyRevenueCalendarChartsAcc.inStore?.push(
              monthlyRevenueInStoreCalendarChartData
            );

            // revenue -> calendar chart -> online
            const monthlyRevenueOnlineCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesRevenue.online,
            };
            monthlyRevenueCalendarChartsAcc.online?.push(
              monthlyRevenueOnlineCalendarChartData
            );
          });

          // revenue -> line chart

          // revenue -> line chart -> total
          const monthlyRevenueTotalLineChartData = {
            x: month,
            y: monthlyTotalRevenue,
          };
          monthlyRevenueLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyRevenueTotalLineChartData);

          // revenue -> line chart -> all -> repair
          const monthlyRevenueAllRepairLineChartData = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueAllRepairLineChartData);

          // revenue -> line chart -> all -> in-store
          const monthlyRevenueAllInStoreLineChartData = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueAllInStoreLineChartData);

          // revenue -> line chart -> all -> online
          const monthlyRevenueAllOnlineLineChartData = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueAllOnlineLineChartData);

          // revenue -> line chart -> overview -> repair
          const monthlyRevenueOverviewRepairLineChartData = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueOverviewRepairLineChartData);

          // revenue -> line chart -> overview -> sales
          const monthlyRevenueOverviewSalesLineChartData = {
            x: month,
            y: monthlySalesRevenue.total,
          };
          monthlyRevenueLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyRevenueOverviewSalesLineChartData);

          // revenue -> line chart -> repair
          const monthlyRevenueRepairLineChartData = {
            x: month,
            y: monthlyRepairRevenue,
          };
          monthlyRevenueLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyRevenueRepairLineChartData);

          // revenue -> line chart -> sales -> in-store
          const monthlyRevenueSalesInStoreLineChartData = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueSalesInStoreLineChartData);

          // revenue -> line chart -> sales -> online
          const monthlyRevenueSalesOnlineLineChartData = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueSalesOnlineLineChartData);

          // revenue -> line chart -> in-store
          const monthlyRevenueInStoreLineChartData = {
            x: month,
            y: monthlySalesRevenue.inStore,
          };
          monthlyRevenueLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyRevenueInStoreLineChartData);

          // revenue -> line chart -> online
          const monthlyRevenueOnlineLineChartData = {
            x: month,
            y: monthlySalesRevenue.online,
          };
          monthlyRevenueLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyRevenueOnlineLineChartData);

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
          const monthlyTransactionsTotalBarChartData: BarChartData = {
            Months: month,
            Total: monthlyTotalTransactions,
          };
          monthlyTransactionsBarChartsAcc.total.push(
            monthlyTransactionsTotalBarChartData
          );

          // transactions -> bar chart -> all
          const monthlyTransactionsAllBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
            "In-Store": monthlySalesTransactions.inStore,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.all?.push(monthlyTransactionsAllBarChartData);

          // transactions -> bar chart -> overview
          const monthlyTransactionsOverviewBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
            Sales: monthlySalesTransactions.total,
          };
          monthlyTransactionsBarChartsAcc.overview.push(
            monthlyTransactionsOverviewBarChartData
          );

          // transactions -> bar chart -> repair
          const monthlyTransactionsRepairBarChartData: BarChartData = {
            Months: month,
            Repair: monthlyRepairTransactions,
          };
          monthlyTransactionsBarChartsAcc.repair.push(
            monthlyTransactionsRepairBarChartData
          );

          // transactions -> bar chart -> sales
          const monthlyTransactionsSalesBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesTransactions.inStore,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.sales.push(
            monthlyTransactionsSalesBarChartData
          );

          // transactions -> bar chart -> in-store
          const monthlyTransactionsInStoreBarChartData: BarChartData = {
            Months: month,
            "In-Store": monthlySalesTransactions.inStore,
          };
          monthlyTransactionsBarChartsAcc.inStore.push(
            monthlyTransactionsInStoreBarChartData
          );

          // transactions -> bar chart -> online
          const monthlyTransactionsOnlineBarChartData: BarChartData = {
            Months: month,
            Online: monthlySalesTransactions.online,
          };
          monthlyTransactionsBarChartsAcc.online.push(
            monthlyTransactionsOnlineBarChartData
          );

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
            const monthlyTransactionsTotalCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyTotalTransactions,
            };
            monthlyTransactionsCalendarChartsAcc.total?.push(
              monthlyTransactionsTotalCalendarChartData
            );

            // transactions -> calendar chart -> repair
            const monthlyTransactionsRepairCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyRepairTransactions,
            };
            monthlyTransactionsCalendarChartsAcc.repair?.push(
              monthlyTransactionsRepairCalendarChartData
            );

            // transactions -> calendar chart -> sales
            const monthlyTransactionsSalesCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesTransactions.total,
            };
            monthlyTransactionsCalendarChartsAcc.sales?.push(
              monthlyTransactionsSalesCalendarChartData
            );

            // transactions -> calendar chart -> in-store
            const monthlyTransactionsInStoreCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesTransactions.inStore,
            };
            monthlyTransactionsCalendarChartsAcc.inStore?.push(
              monthlyTransactionsInStoreCalendarChartData
            );

            // transactions -> calendar chart -> online
            const monthlyTransactionsOnlineCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailySalesTransactions.online,
            };
            monthlyTransactionsCalendarChartsAcc.online?.push(
              monthlyTransactionsOnlineCalendarChartData
            );
          });

          // transactions -> line chart

          // transactions -> line chart -> total
          const monthlyTransactionsTotalLineChartData = {
            x: month,
            y: monthlyTotalTransactions,
          };
          monthlyTransactionsLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyTransactionsTotalLineChartData);

          // transactions -> line chart -> all -> repair
          const monthlyTransactionsAllRepairLineChartData = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsAllRepairLineChartData);

          // transactions -> line chart -> all -> in-store
          const monthlyTransactionsAllInStoreLineChartData = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsAllInStoreLineChartData);

          // transactions -> line chart -> all -> online
          const monthlyTransactionsAllOnlineLineChartData = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.all
            ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsAllOnlineLineChartData);

          // transactions -> line chart -> overview -> repair
          const monthlyTransactionsOverviewRepairLineChartData = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsOverviewRepairLineChartData);

          // transactions -> line chart -> overview -> sales
          const monthlyTransactionsOverviewSalesLineChartData = {
            x: month,
            y: monthlySalesTransactions.total,
          };
          monthlyTransactionsLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyTransactionsOverviewSalesLineChartData);

          // transactions -> line chart -> repair
          const monthlyTransactionsRepairLineChartData = {
            x: month,
            y: monthlyRepairTransactions,
          };
          monthlyTransactionsLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyTransactionsRepairLineChartData);

          // transactions -> line chart -> sales -> in-store
          const monthlyTransactionsSalesInStoreLineChartData = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsSalesInStoreLineChartData);

          // transactions -> line chart -> sales -> online
          const monthlyTransactionsSalesOnlineLineChartData = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsSalesOnlineLineChartData);

          // transactions -> line chart -> in-store
          const monthlyTransactionsInStoreLineChartData = {
            x: month,
            y: monthlySalesTransactions.inStore,
          };
          monthlyTransactionsLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyTransactionsInStoreLineChartData);

          // transactions -> line chart -> online
          const monthlyTransactionsOnlineLineChartData = {
            x: month,
            y: monthlySalesTransactions.online,
          };
          monthlyTransactionsLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyTransactionsOnlineLineChartData);

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
            "Conversion Rate": Number((monthlyConversionRate * 100).toFixed(2)),
          };
          monthlyOtherMetricsBarChartsAcc.conversionRate?.push(
            monthlyConversionRateBarChartData
          );

          // other metrics -> bar chart -> net profit margin
          const monthlyNetProfitMarginBarChartData: BarChartData = {
            Months: month,
            "Net Profit Margin": Number((monthlyNetProfitMargin * 100).toFixed(2)),
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
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: dailyAverageOrderValue,
            };
            monthlyOtherMetricsCalendarChartsAcc.averageOrderValue?.push(
              monthlyAverageOrderValueCalendarChartData
            );

            // other metrics -> calendar chart -> conversion rate
            const monthlyConversionRateCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: Number((dailyConversionRate * 100).toFixed(2)),
            };
            monthlyOtherMetricsCalendarChartsAcc.conversionRate?.push(
              monthlyConversionRateCalendarChartData
            );

            // other metrics -> calendar chart -> net profit margin
            const monthlyNetProfitMarginCalendarChartData: CalendarChartData = {
              day: `${selectedYear}-${monthNumberStr}-${day}`,
              value: Number((dailyNetProfitMargin * 100).toFixed(2)),
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
            y: Number((monthlyConversionRate * 100).toFixed(2)),
          };
          monthlyOtherMetricsLineChartsAcc.conversionRate
            ?.find(
              (lineChartData: LineChartData) => lineChartData.id === "Conversion Rate"
            )
            ?.data.push(monthlyConversionRateLineChartData);

          // other metrics -> line chart -> net profit margin
          const monthlyNetProfitMarginLineChartData = {
            x: month,
            y: Number((monthlyNetProfitMargin * 100).toFixed(2)),
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

      // monthly -> expenses -> pie chart
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

      // monthly -> revenue -> pie chart
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

      // monthly -> transactions -> pie chart
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
