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

function returnSelectedDateFinancialMetrics({
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
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected year's financial metrics
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

  // selected month's financial metrics
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

  // selected day's financial metrics
  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );

  const prevDayMetrics =
    day === "01"
      ? monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === "31"
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === "30"
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === "29"
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === "28"
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

type FinancialMetricBarLineObjKey =
  | "total" // y-axis variables: total
  | "all" // y-axis variables: repair, in-store, online
  | "overview" // y-axis variables: sales, repair
  | "repair" // y-axis variables: repair
  | "sales" // y-axis variables: in-store, online
  | "inStore" // y-axis variables: in-store
  | "online"; // y-axis variables: online

type FinancialMetricBarObj = Record<FinancialMetricBarLineObjKey, BarChartData[]>; // y-axis variables: total, repair, in-store, online

type FinancialMetricLineObj = {
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

type FinancialMetricCalendarObjKey =
  | "total" // y-axis variables: total
  | "repair" // y-axis variables: repair
  | "sales" // y-axis variables: sales
  | "inStore" // y-axis variables: in-store
  | "online"; // y-axis variables: online

type FinancialMetricCalendarObj = Record<
  FinancialMetricCalendarObjKey,
  CalendarChartData[]
>; // y-axis variables: total, repair, in-store, online

type FinancialOtherMetricsObjKey =
  | "averageOrderValue" // y-axis variables: average order value
  | "conversionRate" // y-axis variables: conversion rate
  | "netProfitMargin"; // y-axis variables: net profit margin

type FinancialOtherMetricsBarObj = Record<FinancialOtherMetricsObjKey, BarChartData[]>; // y-axis variables: average order value, conversion rate, net profit margin

type FinancialOtherMetricsLineObj = {
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

type FinancialOtherMetricsCalendarObj = Record<
  FinancialOtherMetricsObjKey,
  CalendarChartData[]
>; // y-axis variables: average order value, conversion rate, net profit margin

type FinancialMetricPieObjKey =
  | "overview" // y-axis variables: repair, sales
  | "all" // y-axis variables: repair, in-store, online
  | "sales"; // y-axis variables: in-store, online

type FinancialMetricsPieChartsObj = Record<FinancialMetricPieObjKey, PieChartData[]>; // y-axis variables: repair, sales, in-store, online

type FinancialMetricsCharts = {
  dailyCharts: {
    profit: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsObj: FinancialOtherMetricsBarObj;
      calendarChartsObj: FinancialOtherMetricsCalendarObj;
      lineChartsObj: FinancialOtherMetricsLineObj;
    };
  };
  monthlyCharts: {
    profit: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsObj: FinancialMetricBarObj;
      calendarChartsObj: FinancialMetricCalendarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsObj: FinancialOtherMetricsBarObj;
      calendarChartsObj: FinancialOtherMetricsCalendarObj;
      lineChartsObj: FinancialOtherMetricsLineObj;
    };
  };
  yearlyCharts: {
    profit: {
      barChartsObj: FinancialMetricBarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsObj: FinancialMetricBarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsObj: FinancialMetricBarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsObj: FinancialMetricBarObj;
      lineChartsObj: FinancialMetricLineObj;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsObj: FinancialOtherMetricsBarObj;
      lineChartsObj: FinancialOtherMetricsLineObj;
    };
  };
};

function returnFinancialMetricsCharts({
  businessMetrics,
  months,
  selectedDateFinancialMetrics,
  storeLocation,
}: ReturnFinancialMetricsChartsInput): FinancialMetricsCharts {
  // selected year's metrics
  const {
    yearFinancialMetrics: { selectedYearMetrics },
  } = selectedDateFinancialMetrics;
  const selectedYear = selectedYearMetrics?.year ?? "2023";

  // selected month's metrics
  const {
    monthFinancialMetrics: { selectedMonthMetrics },
  } = selectedDateFinancialMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? "January";
  const monthNumber = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

  // selected day's metrics
  const {
    dayFinancialMetrics: { selectedDayMetrics },
  } = selectedDateFinancialMetrics;

  // templates

  // templates -> bar chart obj
  const BAR_CHART_OBJ_TEMPLATE: FinancialMetricBarObj = {
    total: [],
    all: [],
    overview: [],
    repair: [],
    sales: [],
    inStore: [],
    online: [],
  };

  // templates -> calendar chart obj
  const CALENDAR_CHART_OBJ_TEMPLATE: FinancialMetricCalendarObj = {
    total: [],
    repair: [],
    sales: [],
    inStore: [],
    online: [],
  };

  // templates -> line chart obj
  const LINE_CHART_OBJ_TEMPLATE: FinancialMetricLineObj = {
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

  // templates -> other metrics -> bar chart obj
  const OTHER_METRICS_BAR_CHART_OBJ_TEMPLATE: FinancialOtherMetricsBarObj = {
    averageOrderValue: [],
    conversionRate: [],
    netProfitMargin: [],
  };

  // templates -> other metrics -> calendar chart obj
  const OTHER_METRICS_CALENDAR_CHART_OBJ_TEMPLATE: FinancialOtherMetricsCalendarObj = {
    averageOrderValue: [],
    conversionRate: [],
    netProfitMargin: [],
  };

  // templates -> other metrics -> line chart obj
  const OTHER_METRICS_LINE_CHART_OBJ_TEMPLATE: FinancialOtherMetricsLineObj = {
    averageOrderValue: [{ id: "Average Order Value", data: [] }],
    conversionRate: [{ id: "Conversion Rate", data: [] }],
    netProfitMargin: [{ id: "Net Profit Margin", data: [] }],
  };

  // daily charts

  // daily -> profit

  // daily -> profit -> bar charts
  const initialDailyProfitBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // daily -> profit -> calendar charts
  const initialDailyProfitCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily -> profit -> line charts
  const initialDailyProfitLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

  // daily -> profit -> pie charts
  const dailyProfitRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedDayMetrics?.profit.repair ?? 0,
  };
  const dailyProfitSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedDayMetrics?.profit.sales.total ?? 0,
  };
  const dailyProfitSalesInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedDayMetrics?.profit.sales.inStore ?? 0,
  };
  const dailyProfitSalesOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedDayMetrics?.profit.sales.online ?? 0,
  };

  const dailyProfitPieChartsObj = {
    overview: [dailyProfitRepairPieChartData, dailyProfitSalesPieChartData],
    all: [
      dailyProfitRepairPieChartData,
      dailyProfitSalesInStorePieChartData,
      dailyProfitSalesOnlinePieChartData,
    ],
    sales: [dailyProfitSalesInStorePieChartData, dailyProfitSalesOnlinePieChartData],
  };

  // daily -> expenses

  // daily -> expenses -> bar charts
  const initialDailyExpensesBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // daily -> expenses -> calendar charts
  const initialDailyExpensesCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily -> expenses -> line charts
  const initialDailyExpensesLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

  // daily -> expenses -> pie charts
  const dailyExpensesRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedDayMetrics?.expenses.repair ?? 0,
  };
  const dailyExpensesSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedDayMetrics?.expenses.sales.total ?? 0,
  };
  const dailyExpensesSalesInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedDayMetrics?.expenses.sales.inStore ?? 0,
  };
  const dailyExpensesSalesOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedDayMetrics?.expenses.sales.online ?? 0,
  };

  const dailyExpensesPieChartsObj = {
    overview: [dailyExpensesRepairPieChartData, dailyExpensesSalesPieChartData],
    all: [
      dailyExpensesRepairPieChartData,
      dailyExpensesSalesInStorePieChartData,
      dailyExpensesSalesOnlinePieChartData,
    ],
    sales: [dailyExpensesSalesInStorePieChartData, dailyExpensesSalesOnlinePieChartData],
  };

  // daily -> revenue

  // daily -> revenue -> bar charts
  const initialDailyRevenueBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // daily -> revenue -> calendar charts
  const initialDailyRevenueCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily -> revenue -> line charts
  const initialDailyRevenueLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

  // daily -> revenue -> pie charts
  const dailyRevenueRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedDayMetrics?.revenue.repair ?? 0,
  };
  const dailyRevenueSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedDayMetrics?.revenue.sales.total ?? 0,
  };
  const dailyRevenueSalesInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedDayMetrics?.revenue.sales.inStore ?? 0,
  };
  const dailyRevenueSalesOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedDayMetrics?.revenue.sales.online ?? 0,
  };

  const dailyRevenuePieChartsObj = {
    overview: [dailyRevenueRepairPieChartData, dailyRevenueSalesPieChartData],
    all: [
      dailyRevenueRepairPieChartData,
      dailyRevenueSalesInStorePieChartData,
      dailyRevenueSalesOnlinePieChartData,
    ],
    sales: [dailyRevenueSalesInStorePieChartData, dailyRevenueSalesOnlinePieChartData],
  };

  // daily -> transactions

  // daily -> transactions -> bar charts
  const initialDailyTransactionsBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // daily -> transactions -> calendar charts
  const initialDailyTransactionsCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily -> transactions -> line charts
  const initialDailyTransactionsLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

  // daily -> transactions -> pie charts
  const dailyTransactionsRepairPieChartData = {
    id: "Repair",
    label: "Repair",
    value: selectedDayMetrics?.transactions.repair ?? 0,
  };
  const dailyTransactionsSalesPieChartData = {
    id: "Sales",
    label: "Sales",
    value: selectedDayMetrics?.transactions.sales.total ?? 0,
  };
  const dailyTransactionsSalesInStorePieChartData = {
    id: "In-Store",
    label: "In-Store",
    value: selectedDayMetrics?.transactions.sales.inStore ?? 0,
  };
  const dailyTransactionsSalesOnlinePieChartData = {
    id: "Online",
    label: "Online",
    value: selectedDayMetrics?.transactions.sales.online ?? 0,
  };

  const dailyTransactionsPieChartsObj = {
    overview: [dailyTransactionsRepairPieChartData, dailyTransactionsSalesPieChartData],
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

  // daily -> other metrics

  // daily -> other metrics -> bar charts
  const initialDailyOtherMetricsBarChartsObj = structuredClone(
    OTHER_METRICS_BAR_CHART_OBJ_TEMPLATE
  );
  // daily -> other metrics -> calendar charts
  const initialDailyOtherMetricsCalendarChartsObj = structuredClone(
    OTHER_METRICS_CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily -> other metrics -> line charts
  const initialDailyOtherMetricsLineChartsObj = structuredClone(
    OTHER_METRICS_LINE_CHART_OBJ_TEMPLATE
  );

  const [
    // profit
    dailyProfitBarChartsObj,
    dailyProfitCalendarChartsObj,
    dailyProfitLineChartsObj,
    // expenses
    dailyExpensesBarChartsObj,
    dailyExpensesCalendarChartsObj,
    dailyExpensesLineChartsObj,
    // revenue
    dailyRevenueBarChartsObj,
    dailyRevenueCalendarChartsObj,
    dailyRevenueLineChartsObj,
    // transactions
    dailyTransactionsBarChartsObj,
    dailyTransactionsCalendarChartsObj,
    dailyTransactionsLineChartsObj,
    // other metrics
    dailyOtherMetricsBarChartsObj,
    dailyOtherMetricsCalendarChartsObj,
    dailyOtherMetricsLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyMetricsChartsObjAcc, dailyMetric) => {
      const [
        // profit
        dailyProfitBarChartsObjAcc,
        dailyProfitCalendarChartsObjAcc,
        dailyProfitLineChartsObjAcc,
        // expenses
        dailyExpensesBarChartsObjAcc,
        dailyExpensesCalendarChartsObjAcc,
        dailyExpensesLineChartsObjAcc,
        // revenue
        dailyRevenueBarChartsObjAcc,
        dailyRevenueCalendarChartsObjAcc,
        dailyRevenueLineChartsObjAcc,
        // transactions
        dailyTransactionsBarChartsObjAcc,
        dailyTransactionsCalendarChartsObjAcc,
        dailyTransactionsLineChartsObjAcc,
        // other metrics
        dailyOtherMetricsBarChartsObjAcc,
        dailyOtherMetricsCalendarChartsObjAcc,
        dailyOtherMetricsLineChartsObjAcc,
      ] = dailyMetricsChartsObjAcc;

      const {
        day,
        profit: { total: totalProfit, repair: repairProfit, sales: salesProfit },
      } = dailyMetric;

      // profit

      // profit -> bar chart data

      // profit -> bar chart data -> total
      const dailyProfitTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalProfit,
      };
      dailyProfitBarChartsObjAcc.total.push(dailyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const dailyProfitAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        "In-Store": salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsObjAcc.all.push(dailyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const dailyProfitOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        Sales: salesProfit.total,
      };
      dailyProfitBarChartsObjAcc.overview.push(dailyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const dailyProfitRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
      };
      dailyProfitBarChartsObjAcc.repair.push(dailyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const dailyProfitSalesBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsObjAcc.sales.push(dailyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const dailyProfitInStoreBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesProfit.inStore,
      };
      dailyProfitBarChartsObjAcc.inStore.push(dailyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const dailyProfitOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsObjAcc.online.push(dailyProfitOnlineBarChartData);

      // profit -> calendar chart data

      // profit -> calendar chart data -> total
      const dailyProfitTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalProfit,
      };
      dailyProfitCalendarChartsObjAcc.total.push(dailyProfitTotalCalendarChartData);

      // profit -> calendar chart data -> repair
      const dailyProfitRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairProfit,
      };
      dailyProfitCalendarChartsObjAcc.repair.push(dailyProfitRepairCalendarChartData);

      // profit -> calendar chart data -> sales
      const dailyProfitSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.total,
      };
      dailyProfitCalendarChartsObjAcc.sales.push(dailyProfitSalesCalendarChartData);

      // profit -> calendar chart data -> in-store
      const dailyProfitInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.inStore,
      };
      dailyProfitCalendarChartsObjAcc.inStore.push(dailyProfitInStoreCalendarChartData);

      // profit -> calendar chart data -> online
      const dailyProfitOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.online,
      };
      dailyProfitCalendarChartsObjAcc.online.push(dailyProfitOnlineCalendarChartData);

      // profit -> line chart data

      // profit -> line chart data -> total
      const dailyProfitTotalLineChartData = {
        x: day,
        y: totalProfit,
      };
      dailyProfitLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(dailyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const dailyProfitAllRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const dailyProfitAllInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const dailyProfitAllOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const dailyProfitOverviewRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const dailyProfitOverviewSalesLineChartData = {
        x: day,
        y: salesProfit.total,
      };
      dailyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(dailyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const dailyProfitRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const dailyProfitSalesInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const dailyProfitSalesOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const dailyProfitInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const dailyProfitOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyProfitOnlineLineChartData);

      // expenses
      const {
        expenses: { total: totalExpenses, repair: repairExpenses, sales: salesExpenses },
      } = dailyMetric;

      // expenses -> bar chart data

      // expenses -> bar chart data -> total
      const dailyExpensesTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalExpenses,
      };
      dailyExpensesBarChartsObjAcc.total.push(dailyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const dailyExpensesAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        "In-Store": salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsObjAcc.all?.push(dailyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const dailyExpensesOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        Sales: salesExpenses.total,
      };
      dailyExpensesBarChartsObjAcc.overview.push(dailyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const dailyExpensesRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
      };
      dailyExpensesBarChartsObjAcc.repair.push(dailyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const dailyExpensesSalesBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsObjAcc.sales.push(dailyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const dailyExpensesInStoreBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesExpenses.inStore,
      };
      dailyExpensesBarChartsObjAcc.inStore.push(dailyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const dailyExpensesOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsObjAcc.online.push(dailyExpensesOnlineBarChartData);

      // expenses -> calendar chart data

      // expenses -> calendar chart data -> total
      const dailyExpensesTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalExpenses,
      };
      dailyExpensesCalendarChartsObjAcc.total.push(dailyExpensesTotalCalendarChartData);

      // expenses -> calendar chart data -> repair
      const dailyExpensesRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairExpenses,
      };
      dailyExpensesCalendarChartsObjAcc.repair.push(dailyExpensesRepairCalendarChartData);

      // expenses -> calendar chart data -> sales
      const dailyExpensesSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.total,
      };
      dailyExpensesCalendarChartsObjAcc.sales.push(dailyExpensesSalesCalendarChartData);

      // expenses -> calendar chart data -> in-store
      const dailyExpensesInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.inStore,
      };
      dailyExpensesCalendarChartsObjAcc.inStore.push(
        dailyExpensesInStoreCalendarChartData
      );

      // expenses -> calendar chart data -> online
      const dailyExpensesOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.online,
      };
      dailyExpensesCalendarChartsObjAcc.online.push(dailyExpensesOnlineCalendarChartData);

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const dailyExpensesTotalLineChartData = {
        x: day,
        y: totalExpenses,
      };
      dailyExpensesLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(dailyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const dailyExpensesAllRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const dailyExpensesAllInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const dailyExpensesAllOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const dailyExpensesOverviewRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const dailyExpensesOverviewSalesLineChartData = {
        x: day,
        y: salesExpenses.total,
      };
      dailyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(dailyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const dailyExpensesRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const dailyExpensesSalesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const dailyExpensesSalesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const dailyExpensesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const dailyExpensesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyExpensesOnlineLineChartData);

      // revenue
      const {
        revenue: { total: totalRevenue, repair: repairRevenue, sales: salesRevenue },
      } = dailyMetric;

      // revenue -> bar chart data

      // revenue -> bar chart data -> total
      const dailyRevenueTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalRevenue,
      };
      dailyRevenueBarChartsObjAcc.total.push(dailyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const dailyRevenueAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        "In-Store": salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsObjAcc.all.push(dailyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const dailyRevenueOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        Sales: salesRevenue.total,
      };
      dailyRevenueBarChartsObjAcc.overview.push(dailyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const dailyRevenueRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
      };
      dailyRevenueBarChartsObjAcc.repair.push(dailyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const dailyRevenueSalesBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsObjAcc.sales.push(dailyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const dailyRevenueInStoreBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesRevenue.inStore,
      };
      dailyRevenueBarChartsObjAcc.inStore.push(dailyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const dailyRevenueOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsObjAcc.online.push(dailyRevenueOnlineBarChartData);

      // revenue -> calendar chart data

      // revenue -> calendar chart data -> total
      const dailyRevenueTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalRevenue,
      };
      dailyRevenueCalendarChartsObjAcc.total.push(dailyRevenueTotalCalendarChartData);

      // revenue -> calendar chart data -> repair
      const dailyRevenueRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairRevenue,
      };
      dailyRevenueCalendarChartsObjAcc.repair.push(dailyRevenueRepairCalendarChartData);

      // revenue -> calendar chart data -> sales
      const dailyRevenueSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.total,
      };
      dailyRevenueCalendarChartsObjAcc.sales.push(dailyRevenueSalesCalendarChartData);

      // revenue -> calendar chart data -> in-store
      const dailyRevenueInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.inStore,
      };
      dailyRevenueCalendarChartsObjAcc.inStore.push(dailyRevenueInStoreCalendarChartData);

      // revenue -> calendar chart data -> online
      const dailyRevenueOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.online,
      };
      dailyRevenueCalendarChartsObjAcc.online.push(dailyRevenueOnlineCalendarChartData);

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const dailyRevenueTotalLineChartData = {
        x: day,
        y: totalRevenue,
      };
      dailyRevenueLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(dailyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const dailyRevenueAllRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const dailyRevenueAllInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const dailyRevenueAllOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const dailyRevenueOverviewRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const dailyRevenueOverviewSalesLineChartData = {
        x: day,
        y: salesRevenue.total,
      };
      dailyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(dailyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const dailyRevenueRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const dailyRevenueSalesInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const dailyRevenueSalesOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const dailyRevenueInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const dailyRevenueOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyRevenueOnlineLineChartData);

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
      const dailyTransactionsTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalTransactions,
      };
      dailyTransactionsBarChartsObjAcc.total.push(dailyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const dailyTransactionsAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        "In-Store": salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsObjAcc.all?.push(dailyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const dailyTransactionsOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        Sales: salesTransactions.total,
      };
      dailyTransactionsBarChartsObjAcc.overview.push(
        dailyTransactionsOverviewBarChartData
      );

      // transactions -> bar chart data -> repair
      const dailyTransactionsRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
      };
      dailyTransactionsBarChartsObjAcc.repair.push(dailyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const dailyTransactionsSalesBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsObjAcc.sales.push(dailyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const dailyTransactionsInStoreBarChartData: BarChartData = {
        Days: day,
        "In-Store": salesTransactions.inStore,
      };
      dailyTransactionsBarChartsObjAcc.inStore.push(dailyTransactionsInStoreBarChartData);

      // transactions -> bar chart data -> online
      const dailyTransactionsOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsObjAcc.online.push(dailyTransactionsOnlineBarChartData);

      // transactions -> calendar chart data

      // transactions -> calendar chart data -> total
      const dailyTransactionsTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalTransactions,
      };
      dailyTransactionsCalendarChartsObjAcc.total.push(
        dailyTransactionsTotalCalendarChartData
      );

      // transactions -> calendar chart data -> repair
      const dailyTransactionsRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairTransactions,
      };
      dailyTransactionsCalendarChartsObjAcc.repair.push(
        dailyTransactionsRepairCalendarChartData
      );

      // transactions -> calendar chart data -> sales
      const dailyTransactionsSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.total,
      };
      dailyTransactionsCalendarChartsObjAcc.sales.push(
        dailyTransactionsSalesCalendarChartData
      );

      // transactions -> calendar chart data -> in-store
      const dailyTransactionsInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.inStore,
      };
      dailyTransactionsCalendarChartsObjAcc.inStore.push(
        dailyTransactionsInStoreCalendarChartData
      );

      // transactions -> calendar chart data -> online
      const dailyTransactionsOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.online,
      };
      dailyTransactionsCalendarChartsObjAcc.online.push(
        dailyTransactionsOnlineCalendarChartData
      );

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const dailyTransactionsTotalLineChartData = {
        x: day,
        y: totalTransactions,
      };
      dailyTransactionsLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(dailyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const dailyTransactionsAllRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const dailyTransactionsAllInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const dailyTransactionsAllOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const dailyTransactionsOverviewRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const dailyTransactionsOverviewSalesLineChartData = {
        x: day,
        y: salesTransactions.total,
      };
      dailyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(dailyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const dailyTransactionsRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(dailyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const dailyTransactionsSalesInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const dailyTransactionsSalesOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const dailyTransactionsInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(dailyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const dailyTransactionsOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(dailyTransactionsOnlineLineChartData);

      // other metrics
      const { averageOrderValue, conversionRate, netProfitMargin } = dailyMetric;

      // other metrics -> bar chart data

      // other metrics -> bar chart data -> average order value
      const dailyOtherMetricsTotalBarChartData: BarChartData = {
        Days: day,
        "Average Order Value": averageOrderValue,
      };
      dailyOtherMetricsBarChartsObjAcc.averageOrderValue?.push(
        dailyOtherMetricsTotalBarChartData
      );

      // other metrics -> bar chart data -> conversion rate
      const dailyOtherMetricsAllBarChartData: BarChartData = {
        Days: day,
        "Conversion Rate": Number((conversionRate * 100).toFixed(2)),
      };
      dailyOtherMetricsBarChartsObjAcc.conversionRate?.push(
        dailyOtherMetricsAllBarChartData
      );

      // other metrics -> bar chart data -> net profit margin
      const dailyOtherMetricsOverviewBarChartData: BarChartData = {
        Days: day,
        "Net Profit Margin": Number((netProfitMargin * 100).toFixed(2)),
      };
      dailyOtherMetricsBarChartsObjAcc.netProfitMargin?.push(
        dailyOtherMetricsOverviewBarChartData
      );

      // other metrics -> calendar chart data

      // other metrics -> calendar chart data -> average order value
      const dailyOtherMetricsTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: averageOrderValue,
      };
      dailyOtherMetricsCalendarChartsObjAcc.averageOrderValue?.push(
        dailyOtherMetricsTotalCalendarChartData
      );

      // other metrics -> calendar chart data -> conversion rate
      const dailyOtherMetricsConversionRateCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: Number((conversionRate * 100).toFixed(2)),
      };
      dailyOtherMetricsCalendarChartsObjAcc.conversionRate?.push(
        dailyOtherMetricsConversionRateCalendarChartData
      );

      // other metrics -> calendar chart data -> net profit margin
      const dailyOtherMetricsNetProfitMarginCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: Number((netProfitMargin * 100).toFixed(2)),
      };
      dailyOtherMetricsCalendarChartsObjAcc.netProfitMargin?.push(
        dailyOtherMetricsNetProfitMarginCalendarChartData
      );

      // other metrics -> line chart data

      // other metrics -> line chart data -> average order value
      const dailyOtherMetricsAverageOrderValueLineChartData = {
        x: day,
        y: averageOrderValue,
      };
      dailyOtherMetricsLineChartsObjAcc.averageOrderValue
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
        )
        ?.data.push(dailyOtherMetricsAverageOrderValueLineChartData);

      // other metrics -> line chart data -> conversion rate
      const dailyOtherMetricsConversionRateLineChartData = {
        x: day,
        y: Number((conversionRate * 100).toFixed(2)),
      };
      dailyOtherMetricsLineChartsObjAcc.conversionRate
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Conversion Rate")
        ?.data.push(dailyOtherMetricsConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const dailyOtherMetricsNetProfitMarginLineChartData = {
        x: day,
        y: Number((netProfitMargin * 100).toFixed(2)),
      };
      dailyOtherMetricsLineChartsObjAcc.netProfitMargin
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin")
        ?.data.push(dailyOtherMetricsNetProfitMarginLineChartData);

      return dailyMetricsChartsObjAcc;
    },
    [
      // profit
      initialDailyProfitBarChartsObj, // 0
      initialDailyProfitCalendarChartsObj, // 1
      initialDailyProfitLineChartsObj, // 2
      // expenses
      initialDailyExpensesBarChartsObj, // 3
      initialDailyExpensesCalendarChartsObj, // 4
      initialDailyExpensesLineChartsObj, // 5
      // revenue
      initialDailyRevenueBarChartsObj, // 6
      initialDailyRevenueCalendarChartsObj, // 7
      initialDailyRevenueLineChartsObj, // 8
      // transactions
      initialDailyTransactionsBarChartsObj, // 9
      initialDailyTransactionsCalendarChartsObj, // 10
      initialDailyTransactionsLineChartsObj, // 11
      // other metrics
      initialDailyOtherMetricsBarChartsObj, // 12
      initialDailyOtherMetricsCalendarChartsObj, // 13
      initialDailyOtherMetricsLineChartsObj, // 14
    ]
  ) ?? [
    // profit
    initialDailyProfitBarChartsObj,
    initialDailyProfitCalendarChartsObj,
    initialDailyProfitLineChartsObj,
    // expenses
    initialDailyExpensesBarChartsObj,
    initialDailyExpensesCalendarChartsObj,
    initialDailyExpensesLineChartsObj,
    // revenue
    initialDailyRevenueBarChartsObj,
    initialDailyRevenueCalendarChartsObj,
    initialDailyRevenueLineChartsObj,
    // transactions
    initialDailyTransactionsBarChartsObj,
    initialDailyTransactionsCalendarChartsObj,
    initialDailyTransactionsLineChartsObj,
    // other metrics
    initialDailyOtherMetricsBarChartsObj,
    initialDailyOtherMetricsCalendarChartsObj,
    initialDailyOtherMetricsLineChartsObj,
  ];

  // monthly

  // monthly -> profit

  // monthly -> profit -> bar chart data
  const initialMonthlyProfitBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // monthly -> profit -> calendar chart data
  const initialMonthlyProfitCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> profit -> line chart data
  const initialMonthlyProfitLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const monthlyProfitPieChartsObj = {
    overview: [monthlyProfitRepairPieChartData, monthlyProfitSalesPieChartData],
    all: [
      monthlyProfitRepairPieChartData,
      monthlyProfitInStorePieChartData,
      monthlyProfitOnlinePieChartData,
    ],
    sales: [monthlyProfitInStorePieChartData, monthlyProfitOnlinePieChartData],
  };

  // monthly -> expenses

  // monthly -> expenses -> bar chart data
  const initialMonthlyExpensesBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // monthly -> expenses -> calendar chart data
  const initialMonthlyExpensesCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> expenses -> line chart data
  const initialMonthlyExpensesLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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
  const monthlyExpensesPieChartsObj = {
    overview: [monthlyExpensesRepairPieChartData, monthlyExpensesSalesPieChartData],
    all: [
      monthlyExpensesRepairPieChartData,
      monthlyExpensesInStorePieChartData,
      monthlyExpensesOnlinePieChartData,
    ],
    sales: [monthlyExpensesInStorePieChartData, monthlyExpensesOnlinePieChartData],
  };

  // monthly -> revenue

  // monthly -> revenue -> bar chart data
  const initialMonthlyRevenueBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // monthly -> revenue -> calendar chart data
  const initialMonthlyRevenueCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> revenue -> line chart data
  const initialMonthlyRevenueLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const monthlyRevenuePieChartsObj = {
    overview: [monthlyRevenueRepairPieChartData, monthlyRevenueSalesPieChartData],
    all: [
      monthlyRevenueRepairPieChartData,
      monthlyRevenueInStorePieChartData,
      monthlyRevenueOnlinePieChartData,
    ],
    sales: [monthlyRevenueInStorePieChartData, monthlyRevenueOnlinePieChartData],
  };

  // monthly -> transactions

  // monthly -> transactions -> bar chart data
  const initialMonthlyTransactionsBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // monthly -> transactions -> calendar chart data
  const initialMonthlyTransactionsCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> transactions -> line chart data
  const initialMonthlyTransactionsLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

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

  const monthlyTransactionsPieChartsObj = {
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

  // monthly -> other metrics

  // monthly -> other metrics -> bar chart data
  const initialMonthlyOtherMetricsBarChartsObj = structuredClone(
    OTHER_METRICS_BAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> other metrics -> calendar chart data
  const initialMonthlyOtherMetricsCalendarChartsObj = structuredClone(
    OTHER_METRICS_CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> other metrics -> line chart data
  const initialMonthlyOtherMetricsLineChartsObj = structuredClone(
    OTHER_METRICS_LINE_CHART_OBJ_TEMPLATE
  );

  const [
    // profit
    monthlyProfitBarChartsObj,
    monthlyProfitCalendarChartsObj,
    monthlyProfitLineChartsObj,
    // expenses
    monthlyExpensesBarChartsObj,
    monthlyExpensesCalendarChartsObj,
    monthlyExpensesLineChartsObj,
    // revenue
    monthlyRevenueBarChartsObj,
    monthlyRevenueCalendarChartsObj,
    monthlyRevenueLineChartsObj,
    // transactions
    monthlyTransactionsBarChartsObj,
    monthlyTransactionsCalendarChartsObj,
    monthlyTransactionsLineChartsObj,
    // other metrics
    monthlyOtherMetricsBarChartsObj,
    monthlyOtherMetricsCalendarChartsObj,
    monthlyOtherMetricsLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyMetricsChartsObjAcc, monthlyMetric) => {
      const [
        // profit
        monthlyProfitBarChartsObjAcc,
        monthlyProfitCalendarChartsObjAcc,
        monthlyProfitLineChartsObjAcc,
        // expenses
        monthlyExpensesBarChartsObjAcc,
        monthlyExpensesCalendarChartsObjAcc,
        monthlyExpensesLineChartsObjAcc,
        // revenue
        monthlyRevenueBarChartsObjAcc,
        monthlyRevenueCalendarChartsObjAcc,
        monthlyRevenueLineChartsObjAcc,
        // transactions
        monthlyTransactionsBarChartsObjAcc,
        monthlyTransactionsCalendarChartsObjAcc,
        monthlyTransactionsLineChartsObjAcc,
        // other metrics
        monthlyOtherMetricsBarChartsObjAcc,
        monthlyOtherMetricsCalendarChartsObjAcc,
        monthlyOtherMetricsLineChartsObjAcc,
      ] = monthlyMetricsChartsObjAcc;

      const { month } = monthlyMetric;
      const monthNumberStr = (months.indexOf(month) + 1).toString().padStart(2, "0");

      // prevents current month of current year from being added to charts
      const currentYear = new Date().getFullYear().toString();
      const isCurrentYear = selectedYear === currentYear;
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      const isCurrentMonth = month === currentMonth;

      if (isCurrentYear && isCurrentMonth) {
        return monthlyMetricsChartsObjAcc;
      }

      // profit

      const {
        profit: {
          total: monthlyTotalProfit,
          repair: monthlyRepairProfit,
          sales: monthlySalesProfit,
        },
      } = monthlyMetric;

      // profit -> bar chart data

      // profit -> bar chart data -> total
      const monthlyProfitTotalBarChartData: BarChartData = {
        Months: month,
        Total: monthlyTotalProfit,
      };
      monthlyProfitBarChartsObjAcc.total.push(monthlyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const monthlyProfitAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
        "In-Store": monthlySalesProfit.inStore,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsObjAcc.all?.push(monthlyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const monthlyProfitOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
        Sales: monthlySalesProfit.total,
      };
      monthlyProfitBarChartsObjAcc.overview.push(monthlyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const monthlyProfitRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
      };
      monthlyProfitBarChartsObjAcc.repair.push(monthlyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const monthlyProfitSalesBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesProfit.inStore,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsObjAcc.sales.push(monthlyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const monthlyProfitInStoreBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesProfit.inStore,
      };
      monthlyProfitBarChartsObjAcc.inStore.push(monthlyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const monthlyProfitOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsObjAcc.online.push(monthlyProfitOnlineBarChartData);

      // profit -> calendar chart data

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

        // profit -> calendar chart data -> total
        const monthlyProfitTotalCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyTotalProfit,
        };
        monthlyProfitCalendarChartsObjAcc.total?.push(
          monthlyProfitTotalCalendarChartData
        );

        // profit -> calendar chart data -> repair
        const monthlyProfitRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairProfit,
        };
        monthlyProfitCalendarChartsObjAcc.repair?.push(
          monthlyProfitRepairCalendarChartData
        );

        // profit -> calendar chart data -> sales
        const monthlyProfitSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.total,
        };
        monthlyProfitCalendarChartsObjAcc.sales?.push(
          monthlyProfitSalesCalendarChartData
        );

        // profit -> calendar chart data -> in-store
        const monthlyProfitInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.inStore,
        };
        monthlyProfitCalendarChartsObjAcc.inStore?.push(
          monthlyProfitInStoreCalendarChartData
        );

        // profit -> calendar chart data -> online
        const monthlyProfitOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.online,
        };
        monthlyProfitCalendarChartsObjAcc.online?.push(
          monthlyProfitOnlineCalendarChartData
        );
      });

      // profit -> line chart data

      // profit -> line chart data -> total
      const monthlyProfitTotalLineChartData = {
        x: month,
        y: monthlyTotalProfit,
      };
      monthlyProfitLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(monthlyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const monthlyProfitAllRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const monthlyProfitAllInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const monthlyProfitAllOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const monthlyProfitOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const monthlyProfitOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesProfit.total,
      };
      monthlyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(monthlyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const monthlyProfitRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const monthlyProfitSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const monthlyProfitSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const monthlyProfitInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const monthlyProfitOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsObjAcc.online
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

      // expenses -> bar chart data

      // expenses -> bar chart data -> total
      const monthlyExpensesTotalBarChartData: BarChartData = {
        Months: month,
        Total: monthlyTotalExpenses,
      };
      monthlyExpensesBarChartsObjAcc.total.push(monthlyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const monthlyExpensesAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
        "In-Store": monthlySalesExpenses.inStore,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsObjAcc.all?.push(monthlyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const monthlyExpensesOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
        Sales: monthlySalesExpenses.total,
      };
      monthlyExpensesBarChartsObjAcc.overview.push(monthlyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const monthlyExpensesRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
      };
      monthlyExpensesBarChartsObjAcc.repair.push(monthlyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const monthlyExpensesSalesBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesExpenses.inStore,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsObjAcc.sales.push(monthlyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const monthlyExpensesInStoreBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesExpenses.inStore,
      };
      monthlyExpensesBarChartsObjAcc.inStore.push(monthlyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const monthlyExpensesOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsObjAcc.online.push(monthlyExpensesOnlineBarChartData);

      // expenses -> calendar chart data

      dailyMetrics.forEach((dailyMetric) => {
        const {
          day,
          expenses: {
            total: dailyTotalExpenses,
            repair: dailyRepairExpenses,
            sales: dailySalesExpenses,
          },
        } = dailyMetric;

        // expenses -> calendar chart data -> total
        const monthlyExpensesTotalCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyTotalExpenses,
        };
        monthlyExpensesCalendarChartsObjAcc.total?.push(
          monthlyExpensesTotalCalendarChartData
        );

        // expenses -> calendar chart data -> repair
        const monthlyExpensesRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairExpenses,
        };
        monthlyExpensesCalendarChartsObjAcc.repair?.push(
          monthlyExpensesRepairCalendarChartData
        );

        // expenses -> calendar chart data -> sales
        const monthlyExpensesSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.total,
        };
        monthlyExpensesCalendarChartsObjAcc.sales?.push(
          monthlyExpensesSalesCalendarChartData
        );

        // expenses -> calendar chart data -> in-store
        const monthlyExpensesInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.inStore,
        };
        monthlyExpensesCalendarChartsObjAcc.inStore?.push(
          monthlyExpensesInStoreCalendarChartData
        );

        // expenses -> calendar chart data -> online
        const monthlyExpensesOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.online,
        };
        monthlyExpensesCalendarChartsObjAcc.online?.push(
          monthlyExpensesOnlineCalendarChartData
        );
      });

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const monthlyExpensesTotalLineChartData = {
        x: month,
        y: monthlyTotalExpenses,
      };
      monthlyExpensesLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(monthlyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const monthlyExpensesAllRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const monthlyExpensesAllInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const monthlyExpensesAllOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const monthlyExpensesOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const monthlyExpensesOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesExpenses.total,
      };
      monthlyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(monthlyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const monthlyExpensesRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const monthlyExpensesSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const monthlyExpensesSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const monthlyExpensesInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const monthlyExpensesOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsObjAcc.online
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

      // revenue -> bar chart data

      // revenue -> bar chart data -> total
      const monthlyRevenueTotalBarChartData: BarChartData = {
        Months: month,
        Total: monthlyTotalRevenue,
      };
      monthlyRevenueBarChartsObjAcc.total.push(monthlyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const monthlyRevenueAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
        "In-Store": monthlySalesRevenue.inStore,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsObjAcc.all?.push(monthlyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const monthlyRevenueOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
        Sales: monthlySalesRevenue.total,
      };
      monthlyRevenueBarChartsObjAcc.overview.push(monthlyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const monthlyRevenueRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
      };
      monthlyRevenueBarChartsObjAcc.repair.push(monthlyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const monthlyRevenueSalesBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesRevenue.inStore,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsObjAcc.sales.push(monthlyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const monthlyRevenueInStoreBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesRevenue.inStore,
      };
      monthlyRevenueBarChartsObjAcc.inStore.push(monthlyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const monthlyRevenueOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsObjAcc.online.push(monthlyRevenueOnlineBarChartData);

      // revenue -> calendar chart data

      dailyMetrics.forEach((dailyMetric) => {
        const {
          day,
          revenue: {
            total: dailyTotalRevenue,
            repair: dailyRepairRevenue,
            sales: dailySalesRevenue,
          },
        } = dailyMetric;

        // revenue -> calendar chart data -> total
        const monthlyRevenueTotalCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyTotalRevenue,
        };
        monthlyRevenueCalendarChartsObjAcc.total?.push(
          monthlyRevenueTotalCalendarChartData
        );

        // revenue -> calendar chart data -> repair
        const monthlyRevenueRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairRevenue,
        };
        monthlyRevenueCalendarChartsObjAcc.repair?.push(
          monthlyRevenueRepairCalendarChartData
        );

        // revenue -> calendar chart data -> sales
        const monthlyRevenueSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.total,
        };
        monthlyRevenueCalendarChartsObjAcc.sales?.push(
          monthlyRevenueSalesCalendarChartData
        );

        // revenue -> calendar chart data -> in-store
        const monthlyRevenueInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.inStore,
        };
        monthlyRevenueCalendarChartsObjAcc.inStore?.push(
          monthlyRevenueInStoreCalendarChartData
        );

        // revenue -> calendar chart data -> online
        const monthlyRevenueOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.online,
        };
        monthlyRevenueCalendarChartsObjAcc.online?.push(
          monthlyRevenueOnlineCalendarChartData
        );
      });

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const monthlyRevenueTotalLineChartData = {
        x: month,
        y: monthlyTotalRevenue,
      };
      monthlyRevenueLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(monthlyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const monthlyRevenueAllRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const monthlyRevenueAllInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const monthlyRevenueAllOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const monthlyRevenueOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const monthlyRevenueOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesRevenue.total,
      };
      monthlyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(monthlyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const monthlyRevenueRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const monthlyRevenueSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const monthlyRevenueSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const monthlyRevenueInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const monthlyRevenueOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsObjAcc.online
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

      // transactions -> bar chart data

      // transactions -> bar chart data -> total
      const monthlyTransactionsTotalBarChartData: BarChartData = {
        Months: month,
        Total: monthlyTotalTransactions,
      };
      monthlyTransactionsBarChartsObjAcc.total.push(monthlyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const monthlyTransactionsAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
        "In-Store": monthlySalesTransactions.inStore,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsObjAcc.all?.push(monthlyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const monthlyTransactionsOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
        Sales: monthlySalesTransactions.total,
      };
      monthlyTransactionsBarChartsObjAcc.overview.push(
        monthlyTransactionsOverviewBarChartData
      );

      // transactions -> bar chart data -> repair
      const monthlyTransactionsRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
      };
      monthlyTransactionsBarChartsObjAcc.repair.push(
        monthlyTransactionsRepairBarChartData
      );

      // transactions -> bar chart data -> sales
      const monthlyTransactionsSalesBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesTransactions.inStore,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsObjAcc.sales.push(monthlyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const monthlyTransactionsInStoreBarChartData: BarChartData = {
        Months: month,
        "In-Store": monthlySalesTransactions.inStore,
      };
      monthlyTransactionsBarChartsObjAcc.inStore.push(
        monthlyTransactionsInStoreBarChartData
      );

      // transactions -> bar chart data -> online
      const monthlyTransactionsOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsObjAcc.online.push(
        monthlyTransactionsOnlineBarChartData
      );

      // transactions -> calendar chart data

      dailyMetrics.forEach((dailyMetric) => {
        const {
          day,
          transactions: {
            total: dailyTotalTransactions,
            repair: dailyRepairTransactions,
            sales: dailySalesTransactions,
          },
        } = dailyMetric;

        // transactions -> calendar chart data -> total
        const monthlyTransactionsTotalCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyTotalTransactions,
        };
        monthlyTransactionsCalendarChartsObjAcc.total?.push(
          monthlyTransactionsTotalCalendarChartData
        );

        // transactions -> calendar chart data -> repair
        const monthlyTransactionsRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairTransactions,
        };
        monthlyTransactionsCalendarChartsObjAcc.repair?.push(
          monthlyTransactionsRepairCalendarChartData
        );

        // transactions -> calendar chart data -> sales
        const monthlyTransactionsSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.total,
        };
        monthlyTransactionsCalendarChartsObjAcc.sales?.push(
          monthlyTransactionsSalesCalendarChartData
        );

        // transactions -> calendar chart data -> in-store
        const monthlyTransactionsInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.inStore,
        };
        monthlyTransactionsCalendarChartsObjAcc.inStore?.push(
          monthlyTransactionsInStoreCalendarChartData
        );

        // transactions -> calendar chart data -> online
        const monthlyTransactionsOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.online,
        };
        monthlyTransactionsCalendarChartsObjAcc.online?.push(
          monthlyTransactionsOnlineCalendarChartData
        );
      });

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const monthlyTransactionsTotalLineChartData = {
        x: month,
        y: monthlyTotalTransactions,
      };
      monthlyTransactionsLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(monthlyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const monthlyTransactionsAllRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const monthlyTransactionsAllInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const monthlyTransactionsAllOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const monthlyTransactionsOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const monthlyTransactionsOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesTransactions.total,
      };
      monthlyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(monthlyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const monthlyTransactionsRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(monthlyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const monthlyTransactionsSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const monthlyTransactionsSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const monthlyTransactionsInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(monthlyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const monthlyTransactionsOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(monthlyTransactionsOnlineLineChartData);

      // other metrics

      const {
        averageOrderValue: monthlyAverageOrderValue,
        conversionRate: monthlyConversionRate,
        netProfitMargin: monthlyNetProfitMargin,
      } = monthlyMetric;

      // other metrics -> bar chart data

      // other metrics -> bar chart data -> average order value
      const monthlyAverageOrderValueBarChartData: BarChartData = {
        Months: month,
        "Average Order Value": monthlyAverageOrderValue,
      };
      monthlyOtherMetricsBarChartsObjAcc.averageOrderValue?.push(
        monthlyAverageOrderValueBarChartData
      );

      // other metrics -> bar chart data -> conversion rate
      const monthlyConversionRateBarChartData: BarChartData = {
        Months: month,
        "Conversion Rate": Number((monthlyConversionRate * 100).toFixed(2)),
      };
      monthlyOtherMetricsBarChartsObjAcc.conversionRate?.push(
        monthlyConversionRateBarChartData
      );

      // other metrics -> bar chart data -> net profit margin
      const monthlyNetProfitMarginBarChartData: BarChartData = {
        Months: month,
        "Net Profit Margin": Number((monthlyNetProfitMargin * 100).toFixed(2)),
      };
      monthlyOtherMetricsBarChartsObjAcc.netProfitMargin?.push(
        monthlyNetProfitMarginBarChartData
      );

      // other metrics -> calendar chart data

      dailyMetrics.forEach((dailyMetric) => {
        const {
          day,
          averageOrderValue: dailyAverageOrderValue,
          conversionRate: dailyConversionRate,
          netProfitMargin: dailyNetProfitMargin,
        } = dailyMetric;

        // other metrics -> calendar chart data -> average order value
        const monthlyAverageOrderValueCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyAverageOrderValue,
        };
        monthlyOtherMetricsCalendarChartsObjAcc.averageOrderValue?.push(
          monthlyAverageOrderValueCalendarChartData
        );

        // other metrics -> calendar chart data -> conversion rate
        const monthlyConversionRateCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: Number((dailyConversionRate * 100).toFixed(2)),
        };
        monthlyOtherMetricsCalendarChartsObjAcc.conversionRate?.push(
          monthlyConversionRateCalendarChartData
        );

        // other metrics -> calendar chart data -> net profit margin
        const monthlyNetProfitMarginCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: Number((dailyNetProfitMargin * 100).toFixed(2)),
        };
        monthlyOtherMetricsCalendarChartsObjAcc.netProfitMargin?.push(
          monthlyNetProfitMarginCalendarChartData
        );
      });

      // other metrics -> line chart data

      // other metrics -> line chart data -> average order value
      const monthlyAverageOrderValueLineChartData = {
        x: month,
        y: monthlyAverageOrderValue,
      };
      monthlyOtherMetricsLineChartsObjAcc.averageOrderValue
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === "Average Order Value"
        )
        ?.data.push(monthlyAverageOrderValueLineChartData);

      // other metrics -> line chart data -> conversion rate
      const monthlyConversionRateLineChartData = {
        x: month,
        y: Number((monthlyConversionRate * 100).toFixed(2)),
      };
      monthlyOtherMetricsLineChartsObjAcc.conversionRate
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Conversion Rate")
        ?.data.push(monthlyConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const monthlyNetProfitMarginLineChartData = {
        x: month,
        y: Number((monthlyNetProfitMargin * 100).toFixed(2)),
      };
      monthlyOtherMetricsLineChartsObjAcc.netProfitMargin
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin")
        ?.data.push(monthlyNetProfitMarginLineChartData);

      return monthlyMetricsChartsObjAcc;
    },
    [
      // profit
      initialMonthlyProfitBarChartsObj, // 0
      initialMonthlyProfitCalendarChartsObj, // 1
      initialMonthlyProfitLineChartsObj, // 2
      // expenses
      initialMonthlyExpensesBarChartsObj, // 3
      initialMonthlyExpensesCalendarChartsObj, // 4
      initialMonthlyExpensesLineChartsObj, // 5
      // revenue
      initialMonthlyRevenueBarChartsObj, // 6
      initialMonthlyRevenueCalendarChartsObj, // 7
      initialMonthlyRevenueLineChartsObj, // 8
      // transactions
      initialMonthlyTransactionsBarChartsObj, // 9
      initialMonthlyTransactionsCalendarChartsObj, // 10
      initialMonthlyTransactionsLineChartsObj, // 11
      // other metrics
      initialMonthlyOtherMetricsBarChartsObj, // 12
      initialMonthlyOtherMetricsCalendarChartsObj, // 13
      initialMonthlyOtherMetricsLineChartsObj, // 14
    ]
  ) ?? [
    // profit
    initialMonthlyProfitBarChartsObj,
    initialMonthlyProfitCalendarChartsObj,
    initialMonthlyProfitLineChartsObj,
    // expenses
    initialMonthlyExpensesBarChartsObj,
    initialMonthlyExpensesCalendarChartsObj,
    initialMonthlyExpensesLineChartsObj,
    // revenue
    initialMonthlyRevenueBarChartsObj,
    initialMonthlyRevenueCalendarChartsObj,
    initialMonthlyRevenueLineChartsObj,
    // transactions
    initialMonthlyTransactionsBarChartsObj,
    initialMonthlyTransactionsCalendarChartsObj,
    initialMonthlyTransactionsLineChartsObj,
    // other metrics
    initialMonthlyOtherMetricsBarChartsObj,
    initialMonthlyOtherMetricsCalendarChartsObj,
    initialMonthlyOtherMetricsLineChartsObj,
  ];

  // yearly

  // yearly -> templates

  // yearly -> templates ->  profit

  // yearly -> templates -> profit -> bar chart data
  const initialYearlyProfitBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // yearly -> templates -> profit -> line chart data
  const initialYearlyProfitLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const yearlyProfitPieChartsObj: FinancialMetricsPieChartsObj = {
    overview: [yearlyProfitRepairPieChartData, yearlyProfitSalesPieChartData],
    all: [
      yearlyProfitRepairPieChartData,
      yearlyProfitSalesInStorePieChartData,
      yearlyProfitSalesOnlinePieChartData,
    ],
    sales: [yearlyProfitSalesInStorePieChartData, yearlyProfitSalesOnlinePieChartData],
  };

  // yearly -> templates -> expenses

  // yearly -> templates -> expenses -> bar chart data
  const initialYearlyExpensesBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // yearly -> templates -> expenses -> line chart data
  const initialYearlyExpensesLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const yearlyExpensesPieChartsObj: FinancialMetricsPieChartsObj = {
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

  // yearly -> templates -> revenue

  // yearly -> templates -> revenue -> bar chart data
  const initialYearlyRevenueBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // yearly -> templates -> revenue -> line chart data
  const initialYearlyRevenueLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const yearlyRevenuePieChartsObj: FinancialMetricsPieChartsObj = {
    overview: [yearlyRevenueRepairPieChartData, yearlyRevenueSalesPieChartData],
    all: [
      yearlyRevenueRepairPieChartData,
      yearlyRevenueSalesInStorePieChartData,
      yearlyRevenueSalesOnlinePieChartData,
    ],
    sales: [yearlyRevenueSalesInStorePieChartData, yearlyRevenueSalesOnlinePieChartData],
  };

  // yearly -> templates -> transactions

  // yearly -> templates -> transactions -> bar chart data
  const initialYearlyTransactionsBarChartsObj = structuredClone(BAR_CHART_OBJ_TEMPLATE);
  // yearly -> templates -> transactions -> line chart data
  const initialYearlyTransactionsLineChartsObj = structuredClone(LINE_CHART_OBJ_TEMPLATE);

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

  const yearlyTransactionsPieChartsObj: FinancialMetricsPieChartsObj = {
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

  // yearly -> templates -> other metrics

  // yearly -> templates -> other metrics -> bar chart data
  const initialYearlyOtherMetricsBarChartsObj = structuredClone(
    OTHER_METRICS_BAR_CHART_OBJ_TEMPLATE
  );
  // yearly -> templates -> other metrics -> line chart data
  const initialYearlyOtherMetricsLineChartsObj = structuredClone(
    OTHER_METRICS_LINE_CHART_OBJ_TEMPLATE
  );

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // yearly -> metrics

  const [
    // profit
    yearlyProfitBarChartsObj,
    yearlyProfitLineChartsObj,
    // expenses
    yearlyExpensesBarChartsObj,
    yearlyExpensesLineChartsObj,
    // revenue
    yearlyRevenueBarChartsObj,
    yearlyRevenueLineChartsObj,
    // transactions
    yearlyTransactionsBarChartsObj,
    yearlyTransactionsLineChartsObj,
    // other metrics
    yearlyOtherMetricsBarChartsObj,
    yearlyOtherMetricsLineChartsObj,
  ] = currentStoreMetrics?.financialMetrics.reduce(
    (yearlyMetricsChartsObjAcc, yearlyMetric) => {
      const [
        // profit
        yearlyProfitBarChartsObjAcc,
        yearlyProfitLineChartsObjAcc,
        // expenses
        yearlyExpensesBarChartsObjAcc,
        yearlyExpensesLineChartsObjAcc,
        // revenue
        yearlyRevenueBarChartsObjAcc,
        yearlyRevenueLineChartsObjAcc,
        // transactions
        yearlyTransactionsBarChartsObjAcc,
        yearlyTransactionsLineChartsObjAcc,
        // other metrics
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
      const yearlyProfitTotalBarChartData: BarChartData = {
        Years: year,
        Total: yearlyTotalProfit,
      };
      yearlyProfitBarChartsObjAcc.total.push(yearlyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const yearlyProfitAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
        "In-Store": yearlySalesProfit.inStore,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsObjAcc.all.push(yearlyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const yearlyProfitOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
        Sales: yearlySalesProfit.total,
      };
      yearlyProfitBarChartsObjAcc.overview.push(yearlyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const yearlyProfitRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
      };
      yearlyProfitBarChartsObjAcc.repair.push(yearlyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const yearlyProfitSalesBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesProfit.inStore,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsObjAcc.sales.push(yearlyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const yearlyProfitInStoreBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesProfit.inStore,
      };
      yearlyProfitBarChartsObjAcc.inStore.push(yearlyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const yearlyProfitOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsObjAcc.online.push(yearlyProfitOnlineBarChartData);

      // profit -> line chart data

      // profit -> line chart data -> total
      const yearlyProfitTotalLineChartData = {
        x: year,
        y: yearlyTotalProfit,
      };
      yearlyProfitLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(yearlyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const yearlyProfitAllRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const yearlyProfitAllInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const yearlyProfitAllOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const yearlyProfitOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const yearlyProfitOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesProfit.total,
      };
      yearlyProfitLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(yearlyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const yearlyProfitRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const yearlyProfitSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const yearlyProfitSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const yearlyProfitInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const yearlyProfitOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyProfitOnlineLineChartData);

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
      const yearlyExpensesTotalBarChartData: BarChartData = {
        Years: year,
        Total: yearlyTotalExpenses,
      };
      yearlyExpensesBarChartsObjAcc.total.push(yearlyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const yearlyExpensesAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
        "In-Store": yearlySalesExpenses.inStore,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsObjAcc.all?.push(yearlyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const yearlyExpensesOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
        Sales: yearlySalesExpenses.total,
      };
      yearlyExpensesBarChartsObjAcc.overview.push(yearlyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const yearlyExpensesRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
      };
      yearlyExpensesBarChartsObjAcc.repair.push(yearlyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const yearlyExpensesSalesBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesExpenses.inStore,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsObjAcc.sales.push(yearlyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const yearlyExpensesInStoreBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesExpenses.inStore,
      };
      yearlyExpensesBarChartsObjAcc.inStore.push(yearlyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const yearlyExpensesOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsObjAcc.online.push(yearlyExpensesOnlineBarChartData);

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const yearlyExpensesTotalLineChartData = {
        x: year,
        y: yearlyTotalExpenses,
      };
      yearlyExpensesLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(yearlyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const yearlyExpensesAllRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const yearlyExpensesAllInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const yearlyExpensesAllOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const yearlyExpensesOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const yearlyExpensesOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesExpenses.total,
      };
      yearlyExpensesLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(yearlyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const yearlyExpensesRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const yearlyExpensesSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const yearlyExpensesSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const yearlyExpensesInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const yearlyExpensesOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyExpensesOnlineLineChartData);

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
      const yearlyRevenueTotalBarChartData: BarChartData = {
        Years: year,
        Total: yearlyTotalRevenue,
      };
      yearlyRevenueBarChartsObjAcc.total.push(yearlyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const yearlyRevenueAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
        "In-Store": yearlySalesRevenue.inStore,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsObjAcc.all?.push(yearlyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const yearlyRevenueOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
        Sales: yearlySalesRevenue.total,
      };
      yearlyRevenueBarChartsObjAcc.overview.push(yearlyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const yearlyRevenueRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
      };
      yearlyRevenueBarChartsObjAcc.repair.push(yearlyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const yearlyRevenueSalesBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesRevenue.inStore,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsObjAcc.sales.push(yearlyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const yearlyRevenueInStoreBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesRevenue.inStore,
      };
      yearlyRevenueBarChartsObjAcc.inStore.push(yearlyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const yearlyRevenueOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsObjAcc.online.push(yearlyRevenueOnlineBarChartData);

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const yearlyRevenueTotalLineChartData = {
        x: year,
        y: yearlyTotalRevenue,
      };
      yearlyRevenueLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(yearlyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const yearlyRevenueAllRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const yearlyRevenueAllInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const yearlyRevenueAllOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const yearlyRevenueOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const yearlyRevenueOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesRevenue.total,
      };
      yearlyRevenueLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(yearlyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const yearlyRevenueRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const yearlyRevenueSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const yearlyRevenueSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const yearlyRevenueInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const yearlyRevenueOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyRevenueOnlineLineChartData);

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
      const yearlyTransactionsTotalBarChartData: BarChartData = {
        Years: year,
        Total: yearlyTotalTransactions,
      };
      yearlyTransactionsBarChartsObjAcc.total.push(yearlyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const yearlyTransactionsAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
        "In-Store": yearlySalesTransactions.inStore,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsObjAcc.all?.push(yearlyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const yearlyTransactionsOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
        Sales: yearlySalesTransactions.total,
      };
      yearlyTransactionsBarChartsObjAcc.overview.push(
        yearlyTransactionsOverviewBarChartData
      );

      // transactions -> bar chart data -> repair
      const yearlyTransactionsRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
      };
      yearlyTransactionsBarChartsObjAcc.repair.push(yearlyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const yearlyTransactionsSalesBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesTransactions.inStore,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsObjAcc.sales.push(yearlyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const yearlyTransactionsInStoreBarChartData: BarChartData = {
        Years: year,
        "In-Store": yearlySalesTransactions.inStore,
      };
      yearlyTransactionsBarChartsObjAcc.inStore.push(
        yearlyTransactionsInStoreBarChartData
      );

      // transactions -> bar chart data -> online
      const yearlyTransactionsOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsObjAcc.online.push(yearlyTransactionsOnlineBarChartData);

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const yearlyTransactionsTotalLineChartData = {
        x: year,
        y: yearlyTotalTransactions,
      };
      yearlyTransactionsLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === "Total")
        ?.data.push(yearlyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const yearlyTransactionsAllRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const yearlyTransactionsAllInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const yearlyTransactionsAllOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsObjAcc.all
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const yearlyTransactionsOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const yearlyTransactionsOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesTransactions.total,
      };
      yearlyTransactionsLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
        ?.data.push(yearlyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const yearlyTransactionsRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
        ?.data.push(yearlyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const yearlyTransactionsSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const yearlyTransactionsSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const yearlyTransactionsInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
        ?.data.push(yearlyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const yearlyTransactionsOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === "Online")
        ?.data.push(yearlyTransactionsOnlineLineChartData);

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
        "Conversion Rate": Number((yearlyConversionRate * 100).toFixed(2)),
      };
      yearlyOtherMetricsBarChartsObjAcc.conversionRate?.push(
        yearlyConversionRateBarChartData
      );

      // other metrics -> bar chart data -> net profit margin
      const yearlyNetProfitMarginBarChartData: BarChartData = {
        Years: year,
        "Net Profit Margin": Number((yearlyNetProfitMargin * 100).toFixed(2)),
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
        y: Number((yearlyConversionRate * 100).toFixed(2)),
      };
      yearlyOtherMetricsLineChartsObjAcc.conversionRate
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Conversion Rate")
        ?.data.push(yearlyConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const yearlyNetProfitMarginLineChartData = {
        x: year,
        y: Number((yearlyNetProfitMargin * 100).toFixed(2)),
      };
      yearlyOtherMetricsLineChartsObjAcc.netProfitMargin
        ?.find((lineChartData: LineChartData) => lineChartData.id === "Net Profit Margin")
        ?.data.push(yearlyNetProfitMarginLineChartData);

      return yearlyMetricsChartsObjAcc;
    },
    [
      // profit
      initialYearlyProfitBarChartsObj, // 0
      initialYearlyProfitLineChartsObj, // 1
      // expenses
      initialYearlyExpensesBarChartsObj, // 2
      initialYearlyExpensesLineChartsObj, // 3
      // revenue
      initialYearlyRevenueBarChartsObj, // 4
      initialYearlyRevenueLineChartsObj, // 5
      // transactions
      initialYearlyTransactionsBarChartsObj, // 6
      initialYearlyTransactionsLineChartsObj, // 7
      // other metrics
      initialYearlyOtherMetricsBarChartsObj, // 8
      initialYearlyOtherMetricsLineChartsObj, // 9
    ]
  ) ?? [
    // profit
    initialYearlyProfitBarChartsObj,
    initialYearlyProfitLineChartsObj,
    // expenses
    initialYearlyExpensesBarChartsObj,
    initialYearlyExpensesLineChartsObj,
    // revenue
    initialYearlyRevenueBarChartsObj,
    initialYearlyRevenueLineChartsObj,
    // transactions
    initialYearlyTransactionsBarChartsObj,
    initialYearlyTransactionsLineChartsObj,
    // other metrics
    initialYearlyOtherMetricsBarChartsObj,
    initialYearlyOtherMetricsLineChartsObj,
  ];

  return {
    dailyCharts: {
      profit: {
        barChartsObj: dailyProfitBarChartsObj,
        calendarChartsObj: dailyProfitCalendarChartsObj,
        lineChartsObj: dailyProfitLineChartsObj,
        pieChartsObj: dailyProfitPieChartsObj,
      },
      expenses: {
        barChartsObj: dailyExpensesBarChartsObj,
        calendarChartsObj: dailyExpensesCalendarChartsObj,
        lineChartsObj: dailyExpensesLineChartsObj,
        pieChartsObj: dailyExpensesPieChartsObj,
      },
      revenue: {
        barChartsObj: dailyRevenueBarChartsObj,
        calendarChartsObj: dailyRevenueCalendarChartsObj,
        lineChartsObj: dailyRevenueLineChartsObj,
        pieChartsObj: dailyRevenuePieChartsObj,
      },
      transactions: {
        barChartsObj: dailyTransactionsBarChartsObj,
        calendarChartsObj: dailyTransactionsCalendarChartsObj,
        lineChartsObj: dailyTransactionsLineChartsObj,
        pieChartsObj: dailyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsObj: dailyOtherMetricsBarChartsObj,
        calendarChartsObj: dailyOtherMetricsCalendarChartsObj,
        lineChartsObj: dailyOtherMetricsLineChartsObj,
      },
    },
    monthlyCharts: {
      profit: {
        barChartsObj: monthlyProfitBarChartsObj,
        calendarChartsObj: monthlyProfitCalendarChartsObj,
        lineChartsObj: monthlyProfitLineChartsObj,
        pieChartsObj: monthlyProfitPieChartsObj,
      },
      expenses: {
        barChartsObj: monthlyExpensesBarChartsObj,
        calendarChartsObj: monthlyExpensesCalendarChartsObj,
        lineChartsObj: monthlyExpensesLineChartsObj,
        pieChartsObj: monthlyExpensesPieChartsObj,
      },
      revenue: {
        barChartsObj: monthlyRevenueBarChartsObj,
        calendarChartsObj: monthlyRevenueCalendarChartsObj,
        lineChartsObj: monthlyRevenueLineChartsObj,
        pieChartsObj: monthlyRevenuePieChartsObj,
      },
      transactions: {
        barChartsObj: monthlyTransactionsBarChartsObj,
        calendarChartsObj: monthlyTransactionsCalendarChartsObj,
        lineChartsObj: monthlyTransactionsLineChartsObj,
        pieChartsObj: monthlyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsObj: monthlyOtherMetricsBarChartsObj,
        calendarChartsObj: monthlyOtherMetricsCalendarChartsObj,
        lineChartsObj: monthlyOtherMetricsLineChartsObj,
      },
    },
    yearlyCharts: {
      profit: {
        barChartsObj: yearlyProfitBarChartsObj,
        lineChartsObj: yearlyProfitLineChartsObj,
        pieChartsObj: yearlyProfitPieChartsObj,
      },
      expenses: {
        barChartsObj: yearlyExpensesBarChartsObj,
        lineChartsObj: yearlyExpensesLineChartsObj,
        pieChartsObj: yearlyExpensesPieChartsObj,
      },
      revenue: {
        barChartsObj: yearlyRevenueBarChartsObj,
        lineChartsObj: yearlyRevenueLineChartsObj,
        pieChartsObj: yearlyRevenuePieChartsObj,
      },
      transactions: {
        barChartsObj: yearlyTransactionsBarChartsObj,
        lineChartsObj: yearlyTransactionsLineChartsObj,
        pieChartsObj: yearlyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsObj: yearlyOtherMetricsBarChartsObj,
        lineChartsObj: yearlyOtherMetricsLineChartsObj,
      },
    },
  };
}

export { returnFinancialMetricsCharts, returnSelectedDateFinancialMetrics };
export type {
  FinancialMetricBarLineObjKey,
  FinancialMetricBarObj,
  FinancialMetricCalendarObjKey,
  FinancialMetricPieObjKey,
  FinancialMetricsCharts,
  FinancialMetricsPieChartsObj,
  FinancialOtherMetricsObjKey,
  ReturnFinancialMetricsChartsInput,
  SelectedDateFinancialMetrics,
};
