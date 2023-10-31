import { BarChartData } from '../../charts/responsiveBarChart/types';
import { CalendarChartData } from '../../charts/responsiveCalendarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import { PieChartData } from '../../charts/responsivePieChart/types';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DailyFinancialMetric,
  Month,
  MonthlyFinancialMetric,
  Year,
  YearlyFinancialMetric,
} from '../types';

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
    month === 'January'
      ? prevPrevYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) => monthlyMetric.month === 'December'
        )
      : selectedYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) =>
            monthlyMetric.month === months[months.indexOf(month) - 1]
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
    day === '01'
      ? monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '31'
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '30'
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '29'
        ) ??
        monthFinancialMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '28'
        )
      : selectedMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === (parseInt(day) - 1).toString().padStart(2, '0')
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

type ReturnFinancialChartsDataInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedFinancialMetrics: SelectedDateFinancialMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type FinancialMetricBarLineMapKey =
  | 'Total' // y-axis variables: total
  | 'All' // y-axis variables: repair, in-store, online
  | 'Overview' // y-axis variables: sales, repair
  | 'Repair' // y-axis variables: repair
  | 'Sales' // y-axis variables: in-store, online
  | 'In-Store' // y-axis variables: in-store
  | 'Online'; // y-axis variables: online

type FinancialMetricCalendarMapKey =
  | 'Total' // y-axis variables: total
  | 'Repair' // y-axis variables: repair
  | 'Sales' // y-axis variables: sales
  | 'In-Store' // y-axis variables: in-store
  | 'Online'; // y-axis variables: online

type FinancialOtherMetricsMapkey =
  | 'Average Order Value' // y-axis variables: average order value
  | 'Conversion Rate' // y-axis variables: conversion rate
  | 'Net Profit Margin'; // y-axis variables: net profit margin

type FinancialMetricsPieChartsObj = {
  Overview: PieChartData[];
  Sales: PieChartData[];
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
        }
    }

    profit: {
        total: number;
        repair: number;
        sales: {
            total: number;
            inStore: number;
            online: number;
        }
    }

    revenue: {
        total: number;
        repair: number;
        sales: {
            total: number;
            inStore: number;
            online: number;
        }
    }

    transactions: {
        total: number;
        repair: number;
        sales: {
            total: number;
            inStore: number;
            online: number;
        }
    }                        
  }[];
 */

type ReturnFinancialChartsDataOutput = {
  dailyCharts: {
    profit: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsMap: Map<FinancialOtherMetricsMapkey, BarChartData[]>;
      calendarChartsMap: Map<FinancialOtherMetricsMapkey, CalendarChartData[]>;
      lineChartsMap: Map<FinancialOtherMetricsMapkey, LineChartData[]>;
    };
  };
  monthlyCharts: {
    profit: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsMap: Map<FinancialOtherMetricsMapkey, BarChartData[]>;
      calendarChartsMap: Map<FinancialOtherMetricsMapkey, CalendarChartData[]>;
      lineChartsMap: Map<FinancialOtherMetricsMapkey, LineChartData[]>;
    };
  };
  yearlyCharts: {
    profit: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    expenses: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    revenue: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    transactions: {
      barChartsMap: Map<FinancialMetricBarLineMapKey, BarChartData[]>;
      lineChartsMap: Map<FinancialMetricBarLineMapKey, LineChartData[]>;
      pieChartsObj: FinancialMetricsPieChartsObj;
    };
    otherMetrics: {
      barChartsMap: Map<FinancialOtherMetricsMapkey, BarChartData[]>;
      lineChartsMap: Map<FinancialOtherMetricsMapkey, LineChartData[]>;
    };
  };
};

function returnFinancialChartsData({
  businessMetrics,
  months,
  selectedFinancialMetrics,
  storeLocation,
}: ReturnFinancialChartsDataInput): ReturnFinancialChartsDataOutput {
  // selected year's metrics
  const {
    yearFinancialMetrics: { selectedYearMetrics },
  } = selectedFinancialMetrics;
  const selectedYear = selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const {
    monthFinancialMetrics: { selectedMonthMetrics },
  } = selectedFinancialMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // selected day's metrics
  const {
    dayFinancialMetrics: { selectedDayMetrics },
  } = selectedFinancialMetrics;

  // templates

  // templates -> bar chart map
  const BAR_CHART_MAP_TEMPLATE = new Map<
    FinancialMetricBarLineMapKey,
    BarChartData[]
  >([
    ['Total', []],
    ['All', []],
    ['Overview', []],
    ['Repair', []],
    ['Sales', []],
    ['In-Store', []],
    ['Online', []],
  ]);

  // templates -> calendar chart map
  const CALENDAR_CHART_MAP_TEMPLATE = new Map<
    FinancialMetricCalendarMapKey,
    CalendarChartData[]
  >([
    ['Total', []],
    ['Repair', []],
    ['Sales', []],
    ['In-Store', []],
    ['Online', []],
  ]);

  // templates -> line chart map
  const LINE_CHART_MAP_TEMPLATE = new Map<
    FinancialMetricBarLineMapKey,
    LineChartData[]
  >([
    ['Total', [{ id: 'Total', data: [] }]],
    [
      'All',
      [
        { id: 'Repair', data: [] },
        { id: 'In-Store', data: [] },
        { id: 'Online', data: [] },
      ],
    ],
    [
      'Overview',
      [
        { id: 'Repair', data: [] },
        { id: 'Sales', data: [] },
      ],
    ],
    ['Repair', [{ id: 'Repair', data: [] }]],
    [
      'Sales',
      [
        { id: 'In-Store', data: [] },
        { id: 'Online', data: [] },
      ],
    ],
    ['In-Store', [{ id: 'In-Store', data: [] }]],
    ['Online', [{ id: 'Online', data: [] }]],
  ]);

  // templates -> other metrics -> bar chart map
  const OTHER_METRICS_BAR_CHART_MAP_TEMPLATE = new Map<
    FinancialOtherMetricsMapkey,
    BarChartData[]
  >([
    ['Average Order Value', []],
    ['Conversion Rate', []],
    ['Net Profit Margin', []],
  ]);

  // templates -> other metrics -> calendar chart map
  const OTHER_METRICS_CALENDAR_CHART_MAP_TEMPLATE = new Map<
    FinancialOtherMetricsMapkey,
    CalendarChartData[]
  >([
    ['Average Order Value', []],
    ['Conversion Rate', []],
    ['Net Profit Margin', []],
  ]);

  // templates -> other metrics -> line chart map
  const OTHER_METRICS_LINE_CHART_MAP_TEMPLATE = new Map<
    FinancialOtherMetricsMapkey,
    LineChartData[]
  >([
    ['Average Order Value', [{ id: 'Average Order Value', data: [] }]],
    ['Conversion Rate', [{ id: 'Conversion Rate', data: [] }]],
    ['Net Profit Margin', [{ id: 'Net Profit Margin', data: [] }]],
  ]);

  // daily charts

  // daily -> profit

  // daily -> profit -> bar charts
  const initialDailyProfitBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // daily -> profit -> calendar charts
  const initialDailyProfitCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily -> profit -> line charts
  const initialDailyProfitLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // daily -> profit -> pie charts
  const dailyProfitPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedDayMetrics?.profit.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedDayMetrics?.profit.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedDayMetrics?.profit.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedDayMetrics?.profit.sales.online ?? 0,
      },
    ],
  };

  // daily -> expenses

  // daily -> expenses -> bar charts
  const initialDailyExpensesBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // daily -> expenses -> calendar charts
  const initialDailyExpensesCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily -> expenses -> line charts
  const initialDailyExpensesLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // daily -> expenses -> pie charts
  const dailyExpensesPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedDayMetrics?.expenses.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedDayMetrics?.expenses.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedDayMetrics?.expenses.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedDayMetrics?.expenses.sales.online ?? 0,
      },
    ],
  };

  // daily -> revenue

  // daily -> revenue -> bar charts
  const initialDailyRevenueBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // daily -> revenue -> calendar charts
  const initialDailyRevenueCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily -> revenue -> line charts
  const initialDailyRevenueLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // daily -> revenue -> pie charts
  const dailyRevenuePieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedDayMetrics?.revenue.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedDayMetrics?.revenue.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedDayMetrics?.revenue.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedDayMetrics?.revenue.sales.online ?? 0,
      },
    ],
  };

  // daily -> transactions

  // daily -> transactions -> bar charts
  const initialDailyTransactionsBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // daily -> transactions -> calendar charts
  const initialDailyTransactionsCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily -> transactions -> line charts
  const initialDailyTransactionsLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // daily -> transactions -> pie charts
  const dailyTransactionsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedDayMetrics?.transactions.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedDayMetrics?.transactions.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedDayMetrics?.transactions.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedDayMetrics?.transactions.sales.online ?? 0,
      },
    ],
  };

  // daily -> other metrics

  // daily -> other metrics -> bar charts
  const initialDailyOtherMetricsBarChartsMap = structuredClone(
    OTHER_METRICS_BAR_CHART_MAP_TEMPLATE
  );
  // daily -> other metrics -> calendar charts
  const initialDailyOtherMetricsCalendarChartsMap = structuredClone(
    OTHER_METRICS_CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily -> other metrics -> line charts
  const initialDailyOtherMetricsLineChartsMap = structuredClone(
    OTHER_METRICS_LINE_CHART_MAP_TEMPLATE
  );

  const [
    // profit
    dailyProfitBarChartsMap,
    dailyProfitCalendarChartsMap,
    dailyProfitLineChartsMap,
    // expenses
    dailyExpensesBarChartsMap,
    dailyExpensesCalendarChartsMap,
    dailyExpensesLineChartsMap,
    // revenue
    dailyRevenueBarChartsMap,
    dailyRevenueCalendarChartsMap,
    dailyRevenueLineChartsMap,
    // transactions
    dailyTransactionsBarChartsMap,
    dailyTransactionsCalendarChartsMap,
    dailyTransactionsLineChartsMap,
    // other metrics
    dailyOtherMetricsBarChartsMap,
    dailyOtherMetricsCalendarChartsMap,
    dailyOtherMetricsLineChartsMap,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyMetricsChartsMapAcc, dailyMetric) => {
      const [
        // profit
        dailyProfitBarChartsMapAcc,
        dailyProfitCalendarChartsMapAcc,
        dailyProfitLineChartsMapAcc,
        // expenses
        dailyExpensesBarChartsMapAcc,
        dailyExpensesCalendarChartsMapAcc,
        dailyExpensesLineChartsMapAcc,
        // revenue
        dailyRevenueBarChartsMapAcc,
        dailyRevenueCalendarChartsMapAcc,
        dailyRevenueLineChartsMapAcc,
        // transactions
        dailyTransactionsBarChartsMapAcc,
        dailyTransactionsCalendarChartsMapAcc,
        dailyTransactionsLineChartsMapAcc,
        // other metrics
        dailyOtherMetricsBarChartsMapAcc,
        dailyOtherMetricsCalendarChartsMapAcc,
        dailyOtherMetricsLineChartsMapAcc,
      ] = dailyMetricsChartsMapAcc;

      const {
        day,
        profit: {
          total: totalProfit,
          repair: repairProfit,
          sales: salesProfit,
        },
      } = dailyMetric;

      // profit

      // profit -> bar chart data

      // profit -> bar chart data -> total
      const dailyProfitTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalProfit,
      };
      dailyProfitBarChartsMapAcc
        .get('Total')
        ?.push(dailyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const dailyProfitAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        'In-Store': salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsMapAcc.get('All')?.push(dailyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const dailyProfitOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        Sales: salesProfit.total,
      };
      dailyProfitBarChartsMapAcc
        .get('Overview')
        ?.push(dailyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const dailyProfitRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
      };
      dailyProfitBarChartsMapAcc
        .get('Repair')
        ?.push(dailyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const dailyProfitSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsMapAcc
        .get('Sales')
        ?.push(dailyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const dailyProfitInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesProfit.inStore,
      };
      dailyProfitBarChartsMapAcc
        .get('In-Store')
        ?.push(dailyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const dailyProfitOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesProfit.online,
      };
      dailyProfitBarChartsMapAcc
        .get('Online')
        ?.push(dailyProfitOnlineBarChartData);

      // profit -> calendar chart data

      // profit -> calendar chart data -> total
      const dailyProfitTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalProfit,
      };
      dailyProfitCalendarChartsMapAcc
        .get('Total')
        ?.push(dailyProfitTotalCalendarChartData);

      // profit -> calendar chart data -> repair
      const dailyProfitRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairProfit,
      };
      dailyProfitCalendarChartsMapAcc
        .get('Repair')
        ?.push(dailyProfitRepairCalendarChartData);

      // profit -> calendar chart data -> sales
      const dailyProfitSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.total,
      };
      dailyProfitCalendarChartsMapAcc
        .get('Sales')
        ?.push(dailyProfitSalesCalendarChartData);

      // profit -> calendar chart data -> in-store
      const dailyProfitInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.inStore,
      };
      dailyProfitCalendarChartsMapAcc
        .get('In-Store')
        ?.push(dailyProfitInStoreCalendarChartData);

      // profit -> calendar chart data -> online
      const dailyProfitOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.online,
      };
      dailyProfitCalendarChartsMapAcc
        .get('Online')
        ?.push(dailyProfitOnlineCalendarChartData);

      // profit -> line chart data

      // profit -> line chart data -> total
      const dailyProfitTotalLineChartData = {
        x: day,
        y: totalProfit,
      };
      dailyProfitLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const dailyProfitAllRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const dailyProfitAllInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const dailyProfitAllOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const dailyProfitOverviewRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const dailyProfitOverviewSalesLineChartData = {
        x: day,
        y: salesProfit.total,
      };
      dailyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const dailyProfitRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyProfitLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const dailyProfitSalesInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const dailyProfitSalesOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const dailyProfitInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyProfitLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const dailyProfitOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyProfitLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyProfitOnlineLineChartData);

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
      const dailyExpensesTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalExpenses,
      };
      dailyExpensesBarChartsMapAcc
        .get('Total')
        ?.push(dailyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const dailyExpensesAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        'In-Store': salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsMapAcc
        .get('All')
        ?.push(dailyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const dailyExpensesOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        Sales: salesExpenses.total,
      };
      dailyExpensesBarChartsMapAcc
        .get('Overview')
        ?.push(dailyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const dailyExpensesRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
      };
      dailyExpensesBarChartsMapAcc
        .get('Repair')
        ?.push(dailyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const dailyExpensesSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsMapAcc
        .get('Sales')
        ?.push(dailyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const dailyExpensesInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesExpenses.inStore,
      };
      dailyExpensesBarChartsMapAcc
        .get('In-Store')
        ?.push(dailyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const dailyExpensesOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesExpenses.online,
      };
      dailyExpensesBarChartsMapAcc
        .get('Online')
        ?.push(dailyExpensesOnlineBarChartData);

      // expenses -> calendar chart data

      // expenses -> calendar chart data -> total
      const dailyExpensesTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalExpenses,
      };
      dailyExpensesCalendarChartsMapAcc
        .get('Total')
        ?.push(dailyExpensesTotalCalendarChartData);

      // expenses -> calendar chart data -> repair
      const dailyExpensesRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairExpenses,
      };
      dailyExpensesCalendarChartsMapAcc
        .get('Repair')
        ?.push(dailyExpensesRepairCalendarChartData);

      // expenses -> calendar chart data -> sales
      const dailyExpensesSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.total,
      };
      dailyExpensesCalendarChartsMapAcc
        .get('Sales')
        ?.push(dailyExpensesSalesCalendarChartData);

      // expenses -> calendar chart data -> in-store
      const dailyExpensesInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.inStore,
      };
      dailyExpensesCalendarChartsMapAcc
        .get('In-Store')
        ?.push(dailyExpensesInStoreCalendarChartData);

      // expenses -> calendar chart data -> online
      const dailyExpensesOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.online,
      };
      dailyExpensesCalendarChartsMapAcc
        .get('Online')
        ?.push(dailyExpensesOnlineCalendarChartData);

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const dailyExpensesTotalLineChartData = {
        x: day,
        y: totalExpenses,
      };
      dailyExpensesLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const dailyExpensesAllRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const dailyExpensesAllInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const dailyExpensesAllOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const dailyExpensesOverviewRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const dailyExpensesOverviewSalesLineChartData = {
        x: day,
        y: salesExpenses.total,
      };
      dailyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const dailyExpensesRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyExpensesLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const dailyExpensesSalesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const dailyExpensesSalesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const dailyExpensesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyExpensesLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const dailyExpensesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyExpensesLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyExpensesOnlineLineChartData);

      // revenue
      const {
        revenue: {
          total: totalRevenue,
          repair: repairRevenue,
          sales: salesRevenue,
        },
      } = dailyMetric;

      // revenue -> bar chart data

      // revenue -> bar chart data -> total
      const dailyRevenueTotalBarChartData: BarChartData = {
        Days: day,
        Total: totalRevenue,
      };
      dailyRevenueBarChartsMapAcc
        .get('Total')
        ?.push(dailyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const dailyRevenueAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        'In-Store': salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsMapAcc.get('All')?.push(dailyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const dailyRevenueOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        Sales: salesRevenue.total,
      };
      dailyRevenueBarChartsMapAcc
        .get('Overview')
        ?.push(dailyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const dailyRevenueRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
      };
      dailyRevenueBarChartsMapAcc
        .get('Repair')
        ?.push(dailyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const dailyRevenueSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsMapAcc
        .get('Sales')
        ?.push(dailyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const dailyRevenueInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesRevenue.inStore,
      };
      dailyRevenueBarChartsMapAcc
        .get('In-Store')
        ?.push(dailyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const dailyRevenueOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesRevenue.online,
      };
      dailyRevenueBarChartsMapAcc
        .get('Online')
        ?.push(dailyRevenueOnlineBarChartData);

      // revenue -> calendar chart data

      // revenue -> calendar chart data -> total
      const dailyRevenueTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalRevenue,
      };
      dailyRevenueCalendarChartsMapAcc
        .get('Total')
        ?.push(dailyRevenueTotalCalendarChartData);

      // revenue -> calendar chart data -> repair
      const dailyRevenueRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairRevenue,
      };
      dailyRevenueCalendarChartsMapAcc
        .get('Repair')
        ?.push(dailyRevenueRepairCalendarChartData);

      // revenue -> calendar chart data -> sales
      const dailyRevenueSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.total,
      };
      dailyRevenueCalendarChartsMapAcc
        .get('Sales')
        ?.push(dailyRevenueSalesCalendarChartData);

      // revenue -> calendar chart data -> in-store
      const dailyRevenueInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.inStore,
      };
      dailyRevenueCalendarChartsMapAcc
        .get('In-Store')
        ?.push(dailyRevenueInStoreCalendarChartData);

      // revenue -> calendar chart data -> online
      const dailyRevenueOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.online,
      };
      dailyRevenueCalendarChartsMapAcc
        .get('Online')
        ?.push(dailyRevenueOnlineCalendarChartData);

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const dailyRevenueTotalLineChartData = {
        x: day,
        y: totalRevenue,
      };
      dailyRevenueLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const dailyRevenueAllRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const dailyRevenueAllInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const dailyRevenueAllOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const dailyRevenueOverviewRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const dailyRevenueOverviewSalesLineChartData = {
        x: day,
        y: salesRevenue.total,
      };
      dailyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const dailyRevenueRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyRevenueLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const dailyRevenueSalesInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const dailyRevenueSalesOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const dailyRevenueInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyRevenueLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const dailyRevenueOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyRevenueLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      dailyTransactionsBarChartsMapAcc
        .get('Total')
        ?.push(dailyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const dailyTransactionsAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        'In-Store': salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsMapAcc
        .get('All')
        ?.push(dailyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const dailyTransactionsOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        Sales: salesTransactions.total,
      };
      dailyTransactionsBarChartsMapAcc
        .get('Overview')
        ?.push(dailyTransactionsOverviewBarChartData);

      // transactions -> bar chart data -> repair
      const dailyTransactionsRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
      };
      dailyTransactionsBarChartsMapAcc
        .get('Repair')
        ?.push(dailyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const dailyTransactionsSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsMapAcc
        .get('Sales')
        ?.push(dailyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const dailyTransactionsInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesTransactions.inStore,
      };
      dailyTransactionsBarChartsMapAcc
        .get('In-Store')
        ?.push(dailyTransactionsInStoreBarChartData);

      // transactions -> bar chart data -> online
      const dailyTransactionsOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesTransactions.online,
      };
      dailyTransactionsBarChartsMapAcc
        .get('Online')
        ?.push(dailyTransactionsOnlineBarChartData);

      // transactions -> calendar chart data

      // transactions -> calendar chart data -> total
      const dailyTransactionsTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalTransactions,
      };
      dailyTransactionsCalendarChartsMapAcc
        .get('Total')
        ?.push(dailyTransactionsTotalCalendarChartData);

      // transactions -> calendar chart data -> repair
      const dailyTransactionsRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairTransactions,
      };
      dailyTransactionsCalendarChartsMapAcc
        .get('Repair')
        ?.push(dailyTransactionsRepairCalendarChartData);

      // transactions -> calendar chart data -> sales
      const dailyTransactionsSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.total,
      };
      dailyTransactionsCalendarChartsMapAcc
        .get('Sales')
        ?.push(dailyTransactionsSalesCalendarChartData);

      // transactions -> calendar chart data -> in-store
      const dailyTransactionsInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.inStore,
      };
      dailyTransactionsCalendarChartsMapAcc
        .get('In-Store')
        ?.push(dailyTransactionsInStoreCalendarChartData);

      // transactions -> calendar chart data -> online
      const dailyTransactionsOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.online,
      };
      dailyTransactionsCalendarChartsMapAcc
        .get('Online')
        ?.push(dailyTransactionsOnlineCalendarChartData);

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const dailyTransactionsTotalLineChartData = {
        x: day,
        y: totalTransactions,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const dailyTransactionsAllRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const dailyTransactionsAllInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const dailyTransactionsAllOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const dailyTransactionsOverviewRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const dailyTransactionsOverviewSalesLineChartData = {
        x: day,
        y: salesTransactions.total,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const dailyTransactionsRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const dailyTransactionsSalesInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const dailyTransactionsSalesOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const dailyTransactionsInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyTransactionsLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(dailyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const dailyTransactionsOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyTransactionsLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsOnlineLineChartData);

      // other metrics
      const { averageOrderValue, conversionRate, netProfitMargin } =
        dailyMetric;

      // other metrics -> bar chart data

      // other metrics -> bar chart data -> average order value
      const dailyOtherMetricsTotalBarChartData: BarChartData = {
        Days: day,
        'Average Order Value': averageOrderValue,
      };
      dailyOtherMetricsBarChartsMapAcc
        .get('Average Order Value')
        ?.push(dailyOtherMetricsTotalBarChartData);

      // other metrics -> bar chart data -> conversion rate
      const dailyOtherMetricsAllBarChartData: BarChartData = {
        Days: day,
        'Conversion Rate': conversionRate,
      };
      dailyOtherMetricsBarChartsMapAcc
        .get('Conversion Rate')
        ?.push(dailyOtherMetricsAllBarChartData);

      // other metrics -> bar chart data -> net profit margin
      const dailyOtherMetricsOverviewBarChartData: BarChartData = {
        Days: day,
        'Net Profit Margin': netProfitMargin,
      };
      dailyOtherMetricsBarChartsMapAcc
        .get('Net Profit Margin')
        ?.push(dailyOtherMetricsOverviewBarChartData);

      // other metrics -> calendar chart data

      // other metrics -> calendar chart data -> average order value
      const dailyOtherMetricsTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: averageOrderValue,
      };
      dailyOtherMetricsCalendarChartsMapAcc
        .get('Average Order Value')
        ?.push(dailyOtherMetricsTotalCalendarChartData);

      // other metrics -> calendar chart data -> conversion rate
      const dailyOtherMetricsConversionRateCalendarChartData: CalendarChartData =
        {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: conversionRate,
        };
      dailyOtherMetricsCalendarChartsMapAcc
        .get('Conversion Rate')
        ?.push(dailyOtherMetricsConversionRateCalendarChartData);

      // other metrics -> calendar chart data -> net profit margin
      const dailyOtherMetricsNetProfitMarginCalendarChartData: CalendarChartData =
        {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: netProfitMargin,
        };
      dailyOtherMetricsCalendarChartsMapAcc
        .get('Net Profit Margin')
        ?.push(dailyOtherMetricsNetProfitMarginCalendarChartData);

      // other metrics -> line chart data

      // other metrics -> line chart data -> average order value
      const dailyOtherMetricsAverageOrderValueLineChartData = {
        x: day,
        y: averageOrderValue,
      };
      dailyOtherMetricsLineChartsMapAcc
        .get('Average Order Value')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Average Order Value'
        )
        ?.data.push(dailyOtherMetricsAverageOrderValueLineChartData);

      // other metrics -> line chart data -> conversion rate
      const dailyOtherMetricsConversionRateLineChartData = {
        x: day,
        y: conversionRate,
      };
      dailyOtherMetricsLineChartsMapAcc
        .get('Conversion Rate')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Conversion Rate'
        )
        ?.data.push(dailyOtherMetricsConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const dailyOtherMetricsNetProfitMarginLineChartData = {
        x: day,
        y: netProfitMargin,
      };
      dailyOtherMetricsLineChartsMapAcc
        .get('Net Profit Margin')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Net Profit Margin'
        )
        ?.data.push(dailyOtherMetricsNetProfitMarginLineChartData);

      return dailyMetricsChartsMapAcc;
    },
    [
      // profit
      initialDailyProfitBarChartsMap, // 0
      initialDailyProfitCalendarChartsMap, // 1
      initialDailyProfitLineChartsMap, // 2
      // expenses
      initialDailyExpensesBarChartsMap, // 3
      initialDailyExpensesCalendarChartsMap, // 4
      initialDailyExpensesLineChartsMap, // 5
      // revenue
      initialDailyRevenueBarChartsMap, // 6
      initialDailyRevenueCalendarChartsMap, // 7
      initialDailyRevenueLineChartsMap, // 8
      // transactions
      initialDailyTransactionsBarChartsMap, // 9
      initialDailyTransactionsCalendarChartsMap, // 10
      initialDailyTransactionsLineChartsMap, // 11
      // other metrics
      initialDailyOtherMetricsBarChartsMap, // 12
      initialDailyOtherMetricsCalendarChartsMap, // 13
      initialDailyOtherMetricsLineChartsMap, // 14
    ]
  ) ?? [
    // profit
    initialDailyProfitBarChartsMap,
    initialDailyProfitCalendarChartsMap,
    initialDailyProfitLineChartsMap,
    // expenses
    initialDailyExpensesBarChartsMap,
    initialDailyExpensesCalendarChartsMap,
    initialDailyExpensesLineChartsMap,
    // revenue
    initialDailyRevenueBarChartsMap,
    initialDailyRevenueCalendarChartsMap,
    initialDailyRevenueLineChartsMap,
    // transactions
    initialDailyTransactionsBarChartsMap,
    initialDailyTransactionsCalendarChartsMap,
    initialDailyTransactionsLineChartsMap,
    // other metrics
    initialDailyOtherMetricsBarChartsMap,
    initialDailyOtherMetricsCalendarChartsMap,
    initialDailyOtherMetricsLineChartsMap,
  ];

  // monthly

  // monthly -> profit

  // monthly -> profit -> bar chart data
  const initialMonthlyProfitBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> profit -> calendar chart data
  const initialMonthlyProfitCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> profit -> line chart data
  const initialMonthlyProfitLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // monthly -> profit -> pie chart data
  const monthlyProfitPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedMonthMetrics?.profit.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedMonthMetrics?.profit.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedMonthMetrics?.profit.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedMonthMetrics?.profit.sales.online ?? 0,
      },
    ],
  };

  // monthly -> expenses

  // monthly -> expenses -> bar chart data
  const initialMonthlyExpensesBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> expenses -> calendar chart data
  const initialMonthlyExpensesCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> expenses -> line chart data
  const initialMonthlyExpensesLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // monthly -> expenses -> pie chart data
  const monthlyExpensesPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedMonthMetrics?.expenses.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedMonthMetrics?.expenses.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedMonthMetrics?.expenses.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedMonthMetrics?.expenses.sales.online ?? 0,
      },
    ],
  };

  // monthly -> revenue

  // monthly -> revenue -> bar chart data
  const initialMonthlyRevenueBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> revenue -> calendar chart data
  const initialMonthlyRevenueCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> revenue -> line chart data
  const initialMonthlyRevenueLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // monthly -> revenue -> pie chart data
  const monthlyRevenuePieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedMonthMetrics?.revenue.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedMonthMetrics?.revenue.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedMonthMetrics?.revenue.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedMonthMetrics?.revenue.sales.online ?? 0,
      },
    ],
  };

  // monthly -> transactions

  // monthly -> transactions -> bar chart data
  const initialMonthlyTransactionsBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> transactions -> calendar chart data
  const initialMonthlyTransactionsCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> transactions -> line chart data
  const initialMonthlyTransactionsLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // monthly -> transactions -> pie chart data
  const monthlyTransactionsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedMonthMetrics?.transactions.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedMonthMetrics?.transactions.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedMonthMetrics?.transactions.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedMonthMetrics?.transactions.sales.online ?? 0,
      },
    ],
  };

  // monthly -> other metrics

  // monthly -> other metrics -> bar chart data
  const initialMonthlyOtherMetricsBarChartsMap = structuredClone(
    OTHER_METRICS_BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> other metrics -> calendar chart data
  const initialMonthlyOtherMetricsCalendarChartsMap = structuredClone(
    OTHER_METRICS_CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> other metrics -> line chart data
  const initialMonthlyOtherMetricsLineChartsMap = structuredClone(
    OTHER_METRICS_LINE_CHART_MAP_TEMPLATE
  );

  const [
    // profit
    monthlyProfitBarChartsMap,
    monthlyProfitCalendarChartsMap,
    monthlyProfitLineChartsMap,
    // expenses
    monthlyExpensesBarChartsMap,
    monthlyExpensesCalendarChartsMap,
    monthlyExpensesLineChartsMap,
    // revenue
    monthlyRevenueBarChartsMap,
    monthlyRevenueCalendarChartsMap,
    monthlyRevenueLineChartsMap,
    // transactions
    monthlyTransactionsBarChartsMap,
    monthlyTransactionsCalendarChartsMap,
    monthlyTransactionsLineChartsMap,
    // other metrics
    monthlyOtherMetricsBarChartsMap,
    monthlyOtherMetricsCalendarChartsMap,
    monthlyOtherMetricsLineChartsMap,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyMetricsChartsMapAcc, monthlyMetric) => {
      const [
        // profit
        monthlyProfitBarChartsMapAcc,
        monthlyProfitCalendarChartsMapAcc,
        monthlyProfitLineChartsMapAcc,
        // expenses
        monthlyExpensesBarChartsMapAcc,
        monthlyExpensesCalendarChartsMapAcc,
        monthlyExpensesLineChartsMapAcc,
        // revenue
        monthlyRevenueBarChartsMapAcc,
        monthlyRevenueCalendarChartsMapAcc,
        monthlyRevenueLineChartsMapAcc,
        // transactions
        monthlyTransactionsBarChartsMapAcc,
        monthlyTransactionsCalendarChartsMapAcc,
        monthlyTransactionsLineChartsMapAcc,
        // other metrics
        monthlyOtherMetricsBarChartsMapAcc,
        monthlyOtherMetricsCalendarChartsMapAcc,
        monthlyOtherMetricsLineChartsMapAcc,
      ] = monthlyMetricsChartsMapAcc;

      const { month } = monthlyMetric;
      const monthNumberStr = (months.indexOf(month) + 1)
        .toString()
        .padStart(2, '0');

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
      monthlyProfitBarChartsMapAcc
        .get('Total')
        ?.push(monthlyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const monthlyProfitAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
        'In-Store': monthlySalesProfit.inStore,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsMapAcc
        .get('All')
        ?.push(monthlyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const monthlyProfitOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
        Sales: monthlySalesProfit.total,
      };
      monthlyProfitBarChartsMapAcc
        .get('Overview')
        ?.push(monthlyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const monthlyProfitRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairProfit,
      };
      monthlyProfitBarChartsMapAcc
        .get('Repair')
        ?.push(monthlyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const monthlyProfitSalesBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesProfit.inStore,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsMapAcc
        .get('Sales')
        ?.push(monthlyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const monthlyProfitInStoreBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesProfit.inStore,
      };
      monthlyProfitBarChartsMapAcc
        .get('In-Store')
        ?.push(monthlyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const monthlyProfitOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesProfit.online,
      };
      monthlyProfitBarChartsMapAcc
        .get('Online')
        ?.push(monthlyProfitOnlineBarChartData);

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
        monthlyProfitCalendarChartsMapAcc
          .get('Total')
          ?.push(monthlyProfitTotalCalendarChartData);

        // profit -> calendar chart data -> repair
        const monthlyProfitRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairProfit,
        };
        monthlyProfitCalendarChartsMapAcc
          .get('Repair')
          ?.push(monthlyProfitRepairCalendarChartData);

        // profit -> calendar chart data -> sales
        const monthlyProfitSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.total,
        };
        monthlyProfitCalendarChartsMapAcc
          .get('Sales')
          ?.push(monthlyProfitSalesCalendarChartData);

        // profit -> calendar chart data -> in-store
        const monthlyProfitInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.inStore,
        };
        monthlyProfitCalendarChartsMapAcc
          .get('In-Store')
          ?.push(monthlyProfitInStoreCalendarChartData);

        // profit -> calendar chart data -> online
        const monthlyProfitOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesProfit.online,
        };
        monthlyProfitCalendarChartsMapAcc
          .get('Online')
          ?.push(monthlyProfitOnlineCalendarChartData);
      });

      // profit -> line chart data

      // profit -> line chart data -> total
      const monthlyProfitTotalLineChartData = {
        x: month,
        y: monthlyTotalProfit,
      };
      monthlyProfitLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const monthlyProfitAllRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const monthlyProfitAllInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const monthlyProfitAllOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const monthlyProfitOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const monthlyProfitOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesProfit.total,
      };
      monthlyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const monthlyProfitRepairLineChartData = {
        x: month,
        y: monthlyRepairProfit,
      };
      monthlyProfitLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const monthlyProfitSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const monthlyProfitSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const monthlyProfitInStoreLineChartData = {
        x: month,
        y: monthlySalesProfit.inStore,
      };
      monthlyProfitLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const monthlyProfitOnlineLineChartData = {
        x: month,
        y: monthlySalesProfit.online,
      };
      monthlyProfitLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      monthlyExpensesBarChartsMapAcc
        .get('Total')
        ?.push(monthlyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const monthlyExpensesAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
        'In-Store': monthlySalesExpenses.inStore,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsMapAcc
        .get('All')
        ?.push(monthlyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const monthlyExpensesOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
        Sales: monthlySalesExpenses.total,
      };
      monthlyExpensesBarChartsMapAcc
        .get('Overview')
        ?.push(monthlyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const monthlyExpensesRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairExpenses,
      };
      monthlyExpensesBarChartsMapAcc
        .get('Repair')
        ?.push(monthlyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const monthlyExpensesSalesBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesExpenses.inStore,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsMapAcc
        .get('Sales')
        ?.push(monthlyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const monthlyExpensesInStoreBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesExpenses.inStore,
      };
      monthlyExpensesBarChartsMapAcc
        .get('In-Store')
        ?.push(monthlyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const monthlyExpensesOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesExpenses.online,
      };
      monthlyExpensesBarChartsMapAcc
        .get('Online')
        ?.push(monthlyExpensesOnlineBarChartData);

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
        monthlyExpensesCalendarChartsMapAcc
          .get('Total')
          ?.push(monthlyExpensesTotalCalendarChartData);

        // expenses -> calendar chart data -> repair
        const monthlyExpensesRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairExpenses,
        };
        monthlyExpensesCalendarChartsMapAcc
          .get('Repair')
          ?.push(monthlyExpensesRepairCalendarChartData);

        // expenses -> calendar chart data -> sales
        const monthlyExpensesSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.total,
        };
        monthlyExpensesCalendarChartsMapAcc
          .get('Sales')
          ?.push(monthlyExpensesSalesCalendarChartData);

        // expenses -> calendar chart data -> in-store
        const monthlyExpensesInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.inStore,
        };
        monthlyExpensesCalendarChartsMapAcc
          .get('In-Store')
          ?.push(monthlyExpensesInStoreCalendarChartData);

        // expenses -> calendar chart data -> online
        const monthlyExpensesOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesExpenses.online,
        };
        monthlyExpensesCalendarChartsMapAcc
          .get('Online')
          ?.push(monthlyExpensesOnlineCalendarChartData);
      });

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const monthlyExpensesTotalLineChartData = {
        x: month,
        y: monthlyTotalExpenses,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const monthlyExpensesAllRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const monthlyExpensesAllInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const monthlyExpensesAllOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const monthlyExpensesOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const monthlyExpensesOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesExpenses.total,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const monthlyExpensesRepairLineChartData = {
        x: month,
        y: monthlyRepairExpenses,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const monthlyExpensesSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const monthlyExpensesSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const monthlyExpensesInStoreLineChartData = {
        x: month,
        y: monthlySalesExpenses.inStore,
      };
      monthlyExpensesLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const monthlyExpensesOnlineLineChartData = {
        x: month,
        y: monthlySalesExpenses.online,
      };
      monthlyExpensesLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      monthlyRevenueBarChartsMapAcc
        .get('Total')
        ?.push(monthlyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const monthlyRevenueAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
        'In-Store': monthlySalesRevenue.inStore,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsMapAcc
        .get('All')
        ?.push(monthlyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const monthlyRevenueOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
        Sales: monthlySalesRevenue.total,
      };
      monthlyRevenueBarChartsMapAcc
        .get('Overview')
        ?.push(monthlyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const monthlyRevenueRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairRevenue,
      };
      monthlyRevenueBarChartsMapAcc
        .get('Repair')
        ?.push(monthlyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const monthlyRevenueSalesBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesRevenue.inStore,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsMapAcc
        .get('Sales')
        ?.push(monthlyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const monthlyRevenueInStoreBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesRevenue.inStore,
      };
      monthlyRevenueBarChartsMapAcc
        .get('In-Store')
        ?.push(monthlyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const monthlyRevenueOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesRevenue.online,
      };
      monthlyRevenueBarChartsMapAcc
        .get('Online')
        ?.push(monthlyRevenueOnlineBarChartData);

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
        monthlyRevenueCalendarChartsMapAcc
          .get('Total')
          ?.push(monthlyRevenueTotalCalendarChartData);

        // revenue -> calendar chart data -> repair
        const monthlyRevenueRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairRevenue,
        };
        monthlyRevenueCalendarChartsMapAcc
          .get('Repair')
          ?.push(monthlyRevenueRepairCalendarChartData);

        // revenue -> calendar chart data -> sales
        const monthlyRevenueSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.total,
        };
        monthlyRevenueCalendarChartsMapAcc
          .get('Sales')
          ?.push(monthlyRevenueSalesCalendarChartData);

        // revenue -> calendar chart data -> in-store
        const monthlyRevenueInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.inStore,
        };
        monthlyRevenueCalendarChartsMapAcc
          .get('In-Store')
          ?.push(monthlyRevenueInStoreCalendarChartData);

        // revenue -> calendar chart data -> online
        const monthlyRevenueOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesRevenue.online,
        };
        monthlyRevenueCalendarChartsMapAcc
          .get('Online')
          ?.push(monthlyRevenueOnlineCalendarChartData);
      });

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const monthlyRevenueTotalLineChartData = {
        x: month,
        y: monthlyTotalRevenue,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const monthlyRevenueAllRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const monthlyRevenueAllInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const monthlyRevenueAllOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const monthlyRevenueOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const monthlyRevenueOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesRevenue.total,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const monthlyRevenueRepairLineChartData = {
        x: month,
        y: monthlyRepairRevenue,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const monthlyRevenueSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const monthlyRevenueSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const monthlyRevenueInStoreLineChartData = {
        x: month,
        y: monthlySalesRevenue.inStore,
      };
      monthlyRevenueLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const monthlyRevenueOnlineLineChartData = {
        x: month,
        y: monthlySalesRevenue.online,
      };
      monthlyRevenueLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      monthlyTransactionsBarChartsMapAcc
        .get('Total')
        ?.push(monthlyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const monthlyTransactionsAllBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
        'In-Store': monthlySalesTransactions.inStore,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('All')
        ?.push(monthlyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const monthlyTransactionsOverviewBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
        Sales: monthlySalesTransactions.total,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('Overview')
        ?.push(monthlyTransactionsOverviewBarChartData);

      // transactions -> bar chart data -> repair
      const monthlyTransactionsRepairBarChartData: BarChartData = {
        Months: month,
        Repair: monthlyRepairTransactions,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('Repair')
        ?.push(monthlyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const monthlyTransactionsSalesBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesTransactions.inStore,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('Sales')
        ?.push(monthlyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const monthlyTransactionsInStoreBarChartData: BarChartData = {
        Months: month,
        'In-Store': monthlySalesTransactions.inStore,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('In-Store')
        ?.push(monthlyTransactionsInStoreBarChartData);

      // transactions -> bar chart data -> online
      const monthlyTransactionsOnlineBarChartData: BarChartData = {
        Months: month,
        Online: monthlySalesTransactions.online,
      };
      monthlyTransactionsBarChartsMapAcc
        .get('Online')
        ?.push(monthlyTransactionsOnlineBarChartData);

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
        monthlyTransactionsCalendarChartsMapAcc
          .get('Total')
          ?.push(monthlyTransactionsTotalCalendarChartData);

        // transactions -> calendar chart data -> repair
        const monthlyTransactionsRepairCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyRepairTransactions,
        };
        monthlyTransactionsCalendarChartsMapAcc
          .get('Repair')
          ?.push(monthlyTransactionsRepairCalendarChartData);

        // transactions -> calendar chart data -> sales
        const monthlyTransactionsSalesCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.total,
        };
        monthlyTransactionsCalendarChartsMapAcc
          .get('Sales')
          ?.push(monthlyTransactionsSalesCalendarChartData);

        // transactions -> calendar chart data -> in-store
        const monthlyTransactionsInStoreCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.inStore,
        };
        monthlyTransactionsCalendarChartsMapAcc
          .get('In-Store')
          ?.push(monthlyTransactionsInStoreCalendarChartData);

        // transactions -> calendar chart data -> online
        const monthlyTransactionsOnlineCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailySalesTransactions.online,
        };
        monthlyTransactionsCalendarChartsMapAcc
          .get('Online')
          ?.push(monthlyTransactionsOnlineCalendarChartData);
      });

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const monthlyTransactionsTotalLineChartData = {
        x: month,
        y: monthlyTotalTransactions,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const monthlyTransactionsAllRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const monthlyTransactionsAllInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const monthlyTransactionsAllOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const monthlyTransactionsOverviewRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const monthlyTransactionsOverviewSalesLineChartData = {
        x: month,
        y: monthlySalesTransactions.total,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const monthlyTransactionsRepairLineChartData = {
        x: month,
        y: monthlyRepairTransactions,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const monthlyTransactionsSalesInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const monthlyTransactionsSalesOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const monthlyTransactionsInStoreLineChartData = {
        x: month,
        y: monthlySalesTransactions.inStore,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(monthlyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const monthlyTransactionsOnlineLineChartData = {
        x: month,
        y: monthlySalesTransactions.online,
      };
      monthlyTransactionsLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
        'Average Order Value': monthlyAverageOrderValue,
      };
      monthlyOtherMetricsBarChartsMapAcc
        .get('Average Order Value')
        ?.push(monthlyAverageOrderValueBarChartData);

      // other metrics -> bar chart data -> conversion rate
      const monthlyConversionRateBarChartData: BarChartData = {
        Months: month,
        'Conversion Rate': monthlyConversionRate,
      };
      monthlyOtherMetricsBarChartsMapAcc
        .get('Conversion Rate')
        ?.push(monthlyConversionRateBarChartData);

      // other metrics -> bar chart data -> net profit margin
      const monthlyNetProfitMarginBarChartData: BarChartData = {
        Months: month,
        'Net Profit Margin': monthlyNetProfitMargin,
      };
      monthlyOtherMetricsBarChartsMapAcc
        .get('Net Profit Margin')
        ?.push(monthlyNetProfitMarginBarChartData);

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
        monthlyOtherMetricsCalendarChartsMapAcc
          .get('Average Order Value')
          ?.push(monthlyAverageOrderValueCalendarChartData);

        // other metrics -> calendar chart data -> conversion rate
        const monthlyConversionRateCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyConversionRate,
        };
        monthlyOtherMetricsCalendarChartsMapAcc
          .get('Conversion Rate')
          ?.push(monthlyConversionRateCalendarChartData);

        // other metrics -> calendar chart data -> net profit margin
        const monthlyNetProfitMarginCalendarChartData: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: dailyNetProfitMargin,
        };
        monthlyOtherMetricsCalendarChartsMapAcc
          .get('Net Profit Margin')
          ?.push(monthlyNetProfitMarginCalendarChartData);
      });

      // other metrics -> line chart data

      // other metrics -> line chart data -> average order value
      const monthlyAverageOrderValueLineChartData = {
        x: month,
        y: monthlyAverageOrderValue,
      };
      monthlyOtherMetricsLineChartsMapAcc
        .get('Average Order Value')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Average Order Value'
        )
        ?.data.push(monthlyAverageOrderValueLineChartData);

      // other metrics -> line chart data -> conversion rate
      const monthlyConversionRateLineChartData = {
        x: month,
        y: monthlyConversionRate,
      };
      monthlyOtherMetricsLineChartsMapAcc
        .get('Conversion Rate')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Conversion Rate'
        )
        ?.data.push(monthlyConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const monthlyNetProfitMarginLineChartData = {
        x: month,
        y: monthlyNetProfitMargin,
      };
      monthlyOtherMetricsLineChartsMapAcc
        .get('Net Profit Margin')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Net Profit Margin'
        )
        ?.data.push(monthlyNetProfitMarginLineChartData);

      return monthlyMetricsChartsMapAcc;
    },
    [
      // profit
      initialMonthlyProfitBarChartsMap, // 0
      initialMonthlyProfitCalendarChartsMap, // 1
      initialMonthlyProfitLineChartsMap, // 2
      // expenses
      initialMonthlyExpensesBarChartsMap, // 3
      initialMonthlyExpensesCalendarChartsMap, // 4
      initialMonthlyExpensesLineChartsMap, // 5
      // revenue
      initialMonthlyRevenueBarChartsMap, // 6
      initialMonthlyRevenueCalendarChartsMap, // 7
      initialMonthlyRevenueLineChartsMap, // 8
      // transactions
      initialMonthlyTransactionsBarChartsMap, // 9
      initialMonthlyTransactionsCalendarChartsMap, // 10
      initialMonthlyTransactionsLineChartsMap, // 11
      // other metrics
      initialMonthlyOtherMetricsBarChartsMap, // 12
      initialMonthlyOtherMetricsCalendarChartsMap, // 13
      initialMonthlyOtherMetricsLineChartsMap, // 14
    ]
  ) ?? [
    // profit
    initialMonthlyProfitBarChartsMap,
    initialMonthlyProfitCalendarChartsMap,
    initialMonthlyProfitLineChartsMap,
    // expenses
    initialMonthlyExpensesBarChartsMap,
    initialMonthlyExpensesCalendarChartsMap,
    initialMonthlyExpensesLineChartsMap,
    // revenue
    initialMonthlyRevenueBarChartsMap,
    initialMonthlyRevenueCalendarChartsMap,
    initialMonthlyRevenueLineChartsMap,
    // transactions
    initialMonthlyTransactionsBarChartsMap,
    initialMonthlyTransactionsCalendarChartsMap,
    initialMonthlyTransactionsLineChartsMap,
    // other metrics
    initialMonthlyOtherMetricsBarChartsMap,
    initialMonthlyOtherMetricsCalendarChartsMap,
    initialMonthlyOtherMetricsLineChartsMap,
  ];

  // yearly

  // yearly -> templates

  // yearly -> templates ->  profit

  // yearly -> templates -> profit -> bar chart data
  const initialYearlyProfitBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> profit -> line chart data
  const initialYearlyProfitLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> profit -> pie chart data
  const yearlyProfitPieChartsObj: FinancialMetricsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedYearMetrics?.profit.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedYearMetrics?.profit.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedYearMetrics?.profit.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedYearMetrics?.profit.sales.online ?? 0,
      },
    ],
  };

  // yearly -> templates -> expenses

  // yearly -> templates -> expenses -> bar chart data
  const initialYearlyExpensesBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> expenses -> line chart data
  const initialYearlyExpensesLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> expenses -> pie chart data
  const yearlyExpensesPieChartsObj: FinancialMetricsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedYearMetrics?.expenses.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedYearMetrics?.expenses.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedYearMetrics?.expenses.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedYearMetrics?.expenses.sales.online ?? 0,
      },
    ],
  };

  // yearly -> templates -> revenue

  // yearly -> templates -> revenue -> bar chart data
  const initialYearlyRevenueBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> revenue -> line chart data
  const initialYearlyRevenueLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> revenue -> pie chart data
  const yearlyRevenuePieChartsObj: FinancialMetricsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedYearMetrics?.revenue.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedYearMetrics?.revenue.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedYearMetrics?.revenue.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedYearMetrics?.revenue.sales.online ?? 0,
      },
    ],
  };

  // yearly -> templates -> transactions

  // yearly -> templates -> transactions -> bar chart data
  const initialYearlyTransactionsBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> transactions -> line chart data
  const initialYearlyTransactionsLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> transactions -> pie chart data
  const yearlyTransactionsPieChartsObj: FinancialMetricsPieChartsObj = {
    Overview: [
      {
        id: 'Repair',
        label: 'Repair',
        value: selectedYearMetrics?.transactions.repair ?? 0,
      },
      {
        id: 'Sales',
        label: 'Sales',
        value: selectedYearMetrics?.transactions.sales.total ?? 0,
      },
    ],
    Sales: [
      {
        id: 'In-Store',
        label: 'In-Store',
        value: selectedYearMetrics?.transactions.sales.inStore ?? 0,
      },
      {
        id: 'Online',
        label: 'Online',
        value: selectedYearMetrics?.transactions.sales.online ?? 0,
      },
    ],
  };

  // yearly -> templates -> other metrics

  // yearly -> templates -> other metrics -> bar chart data
  const initialYearlyOtherMetricsBarChartsMap = structuredClone(
    OTHER_METRICS_BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> templates -> other metrics -> line chart data
  const initialYearlyOtherMetricsLineChartsMap = structuredClone(
    OTHER_METRICS_LINE_CHART_MAP_TEMPLATE
  );

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // yearly -> metrics

  const [
    // profit
    yearlyProfitBarChartsMap,
    yearlyProfitLineChartsMap,
    // expenses
    yearlyExpensesBarChartsMap,
    yearlyExpensesLineChartsMap,
    // revenue
    yearlyRevenueBarChartsMap,
    yearlyRevenueLineChartsMap,
    // transactions
    yearlyTransactionsBarChartsMap,
    yearlyTransactionsLineChartsMap,
    // other metrics
    yearlyOtherMetricsBarChartsMap,
    yearlyOtherMetricsLineChartsMap,
  ] = currentStoreMetrics?.financialMetrics.reduce(
    (yearlyMetricsChartsMapAcc, yearlyMetric) => {
      const [
        // profit
        yearlyProfitBarChartsMapAcc,
        yearlyProfitLineChartsMapAcc,
        // expenses
        yearlyExpensesBarChartsMapAcc,
        yearlyExpensesLineChartsMapAcc,
        // revenue
        yearlyRevenueBarChartsMapAcc,
        yearlyRevenueLineChartsMapAcc,
        // transactions
        yearlyTransactionsBarChartsMapAcc,
        yearlyTransactionsLineChartsMapAcc,
        // other metrics
        yearlyOtherMetricsBarChartsMapAcc,
        yearlyOtherMetricsLineChartsMapAcc,
      ] = yearlyMetricsChartsMapAcc;

      // profit

      const {
        year,
        profit: {
          total: yearlyTotalProfit,
          repair: yearlyRepairProfit,
          sales: yearlySalesProfit,
        },
      } = yearlyMetric;

      // profit -> bar chart data

      // profit -> bar chart data -> total
      const yearlyProfitTotalBarChartData: BarChartData = {
        Years: year,
        Total: yearlyTotalProfit,
      };
      yearlyProfitBarChartsMapAcc
        .get('Total')
        ?.push(yearlyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const yearlyProfitAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
        'In-Store': yearlySalesProfit.inStore,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsMapAcc.get('All')?.push(yearlyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const yearlyProfitOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
        Sales: yearlySalesProfit.total,
      };
      yearlyProfitBarChartsMapAcc
        .get('Overview')
        ?.push(yearlyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const yearlyProfitRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairProfit,
      };
      yearlyProfitBarChartsMapAcc
        .get('Repair')
        ?.push(yearlyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const yearlyProfitSalesBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesProfit.inStore,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsMapAcc
        .get('Sales')
        ?.push(yearlyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const yearlyProfitInStoreBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesProfit.inStore,
      };
      yearlyProfitBarChartsMapAcc
        .get('In-Store')
        ?.push(yearlyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const yearlyProfitOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesProfit.online,
      };
      yearlyProfitBarChartsMapAcc
        .get('Online')
        ?.push(yearlyProfitOnlineBarChartData);

      // profit -> line chart data

      // profit -> line chart data -> total
      const yearlyProfitTotalLineChartData = {
        x: year,
        y: yearlyTotalProfit,
      };
      yearlyProfitLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const yearlyProfitAllRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const yearlyProfitAllInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const yearlyProfitAllOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const yearlyProfitOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const yearlyProfitOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesProfit.total,
      };
      yearlyProfitLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const yearlyProfitRepairLineChartData = {
        x: year,
        y: yearlyRepairProfit,
      };
      yearlyProfitLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const yearlyProfitSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const yearlyProfitSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const yearlyProfitInStoreLineChartData = {
        x: year,
        y: yearlySalesProfit.inStore,
      };
      yearlyProfitLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const yearlyProfitOnlineLineChartData = {
        x: year,
        y: yearlySalesProfit.online,
      };
      yearlyProfitLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      yearlyExpensesBarChartsMapAcc
        .get('Total')
        ?.push(yearlyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const yearlyExpensesAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
        'In-Store': yearlySalesExpenses.inStore,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsMapAcc
        .get('All')
        ?.push(yearlyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const yearlyExpensesOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
        Sales: yearlySalesExpenses.total,
      };
      yearlyExpensesBarChartsMapAcc
        .get('Overview')
        ?.push(yearlyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const yearlyExpensesRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairExpenses,
      };
      yearlyExpensesBarChartsMapAcc
        .get('Repair')
        ?.push(yearlyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const yearlyExpensesSalesBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesExpenses.inStore,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsMapAcc
        .get('Sales')
        ?.push(yearlyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const yearlyExpensesInStoreBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesExpenses.inStore,
      };
      yearlyExpensesBarChartsMapAcc
        .get('In-Store')
        ?.push(yearlyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const yearlyExpensesOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesExpenses.online,
      };
      yearlyExpensesBarChartsMapAcc
        .get('Online')
        ?.push(yearlyExpensesOnlineBarChartData);

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const yearlyExpensesTotalLineChartData = {
        x: year,
        y: yearlyTotalExpenses,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const yearlyExpensesAllRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const yearlyExpensesAllInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const yearlyExpensesAllOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const yearlyExpensesOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const yearlyExpensesOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesExpenses.total,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const yearlyExpensesRepairLineChartData = {
        x: year,
        y: yearlyRepairExpenses,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const yearlyExpensesSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const yearlyExpensesSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const yearlyExpensesInStoreLineChartData = {
        x: year,
        y: yearlySalesExpenses.inStore,
      };
      yearlyExpensesLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const yearlyExpensesOnlineLineChartData = {
        x: year,
        y: yearlySalesExpenses.online,
      };
      yearlyExpensesLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      yearlyRevenueBarChartsMapAcc
        .get('Total')
        ?.push(yearlyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const yearlyRevenueAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
        'In-Store': yearlySalesRevenue.inStore,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsMapAcc
        .get('All')
        ?.push(yearlyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const yearlyRevenueOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
        Sales: yearlySalesRevenue.total,
      };
      yearlyRevenueBarChartsMapAcc
        .get('Overview')
        ?.push(yearlyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const yearlyRevenueRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairRevenue,
      };
      yearlyRevenueBarChartsMapAcc
        .get('Repair')
        ?.push(yearlyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const yearlyRevenueSalesBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesRevenue.inStore,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsMapAcc
        .get('Sales')
        ?.push(yearlyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const yearlyRevenueInStoreBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesRevenue.inStore,
      };
      yearlyRevenueBarChartsMapAcc
        .get('In-Store')
        ?.push(yearlyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const yearlyRevenueOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesRevenue.online,
      };
      yearlyRevenueBarChartsMapAcc
        .get('Online')
        ?.push(yearlyRevenueOnlineBarChartData);

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const yearlyRevenueTotalLineChartData = {
        x: year,
        y: yearlyTotalRevenue,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const yearlyRevenueAllRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const yearlyRevenueAllInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const yearlyRevenueAllOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const yearlyRevenueOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const yearlyRevenueOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesRevenue.total,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const yearlyRevenueRepairLineChartData = {
        x: year,
        y: yearlyRepairRevenue,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const yearlyRevenueSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const yearlyRevenueSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const yearlyRevenueInStoreLineChartData = {
        x: year,
        y: yearlySalesRevenue.inStore,
      };
      yearlyRevenueLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const yearlyRevenueOnlineLineChartData = {
        x: year,
        y: yearlySalesRevenue.online,
      };
      yearlyRevenueLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
      yearlyTransactionsBarChartsMapAcc
        .get('Total')
        ?.push(yearlyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const yearlyTransactionsAllBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
        'In-Store': yearlySalesTransactions.inStore,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('All')
        ?.push(yearlyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const yearlyTransactionsOverviewBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
        Sales: yearlySalesTransactions.total,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('Overview')
        ?.push(yearlyTransactionsOverviewBarChartData);

      // transactions -> bar chart data -> repair
      const yearlyTransactionsRepairBarChartData: BarChartData = {
        Years: year,
        Repair: yearlyRepairTransactions,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('Repair')
        ?.push(yearlyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const yearlyTransactionsSalesBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesTransactions.inStore,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('Sales')
        ?.push(yearlyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const yearlyTransactionsInStoreBarChartData: BarChartData = {
        Years: year,
        'In-Store': yearlySalesTransactions.inStore,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('In-Store')
        ?.push(yearlyTransactionsInStoreBarChartData);

      // transactions -> bar chart data -> online
      const yearlyTransactionsOnlineBarChartData: BarChartData = {
        Years: year,
        Online: yearlySalesTransactions.online,
      };
      yearlyTransactionsBarChartsMapAcc
        .get('Online')
        ?.push(yearlyTransactionsOnlineBarChartData);

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const yearlyTransactionsTotalLineChartData = {
        x: year,
        y: yearlyTotalTransactions,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Total')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const yearlyTransactionsAllRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const yearlyTransactionsAllInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const yearlyTransactionsAllOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('All')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const yearlyTransactionsOverviewRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const yearlyTransactionsOverviewSalesLineChartData = {
        x: year,
        y: yearlySalesTransactions.total,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Overview')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const yearlyTransactionsRepairLineChartData = {
        x: year,
        y: yearlyRepairTransactions,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Repair')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const yearlyTransactionsSalesInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const yearlyTransactionsSalesOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Sales')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const yearlyTransactionsInStoreLineChartData = {
        x: year,
        y: yearlySalesTransactions.inStore,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('In-Store')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'In-Store'
        )
        ?.data.push(yearlyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const yearlyTransactionsOnlineLineChartData = {
        x: year,
        y: yearlySalesTransactions.online,
      };
      yearlyTransactionsLineChartsMapAcc
        .get('Online')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Online')
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
        'Average Order Value': yearlyAverageOrderValue,
      };
      yearlyOtherMetricsBarChartsMapAcc
        .get('Average Order Value')
        ?.push(yearlyAverageOrderValueBarChartData);

      // other metrics -> bar chart data -> conversion rate
      const yearlyConversionRateBarChartData: BarChartData = {
        Years: year,
        'Conversion Rate': yearlyConversionRate,
      };
      yearlyOtherMetricsBarChartsMapAcc
        .get('Conversion Rate')
        ?.push(yearlyConversionRateBarChartData);

      // other metrics -> bar chart data -> net profit margin
      const yearlyNetProfitMarginBarChartData: BarChartData = {
        Years: year,
        'Net Profit Margin': yearlyNetProfitMargin,
      };
      yearlyOtherMetricsBarChartsMapAcc
        .get('Net Profit Margin')
        ?.push(yearlyNetProfitMarginBarChartData);

      // other metrics -> line chart data

      // other metrics -> line chart data -> average order value
      const yearlyAverageOrderValueLineChartData = {
        x: year,
        y: yearlyAverageOrderValue,
      };
      yearlyOtherMetricsLineChartsMapAcc
        .get('Average Order Value')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Average Order Value'
        )
        ?.data.push(yearlyAverageOrderValueLineChartData);

      // other metrics -> line chart data -> conversion rate
      const yearlyConversionRateLineChartData = {
        x: year,
        y: yearlyConversionRate,
      };
      yearlyOtherMetricsLineChartsMapAcc
        .get('Conversion Rate')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Conversion Rate'
        )
        ?.data.push(yearlyConversionRateLineChartData);

      // other metrics -> line chart data -> net profit margin
      const yearlyNetProfitMarginLineChartData = {
        x: year,
        y: yearlyNetProfitMargin,
      };
      yearlyOtherMetricsLineChartsMapAcc
        .get('Net Profit Margin')
        ?.find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Net Profit Margin'
        )
        ?.data.push(yearlyNetProfitMarginLineChartData);

      return yearlyMetricsChartsMapAcc;
    },
    [
      // profit
      initialYearlyProfitBarChartsMap, // 0
      initialYearlyProfitLineChartsMap, // 1
      // expenses
      initialYearlyExpensesBarChartsMap, // 2
      initialYearlyExpensesLineChartsMap, // 3
      // revenue
      initialYearlyRevenueBarChartsMap, // 4
      initialYearlyRevenueLineChartsMap, // 5
      // transactions
      initialYearlyTransactionsBarChartsMap, // 6
      initialYearlyTransactionsLineChartsMap, // 7
      // other metrics
      initialYearlyOtherMetricsBarChartsMap, // 8
      initialYearlyOtherMetricsLineChartsMap, // 9
    ]
  ) ?? [
    // profit
    initialYearlyProfitBarChartsMap,
    initialYearlyProfitLineChartsMap,
    // expenses
    initialYearlyExpensesBarChartsMap,
    initialYearlyExpensesLineChartsMap,
    // revenue
    initialYearlyRevenueBarChartsMap,
    initialYearlyRevenueLineChartsMap,
    // transactions
    initialYearlyTransactionsBarChartsMap,
    initialYearlyTransactionsLineChartsMap,
    // other metrics
    initialYearlyOtherMetricsBarChartsMap,
    initialYearlyOtherMetricsLineChartsMap,
  ];

  return {
    dailyCharts: {
      profit: {
        barChartsMap: dailyProfitBarChartsMap,
        calendarChartsMap: dailyProfitCalendarChartsMap,
        lineChartsMap: dailyProfitLineChartsMap,
        pieChartsObj: dailyProfitPieChartsObj,
      },
      expenses: {
        barChartsMap: dailyExpensesBarChartsMap,
        calendarChartsMap: dailyExpensesCalendarChartsMap,
        lineChartsMap: dailyExpensesLineChartsMap,
        pieChartsObj: dailyExpensesPieChartsObj,
      },
      revenue: {
        barChartsMap: dailyRevenueBarChartsMap,
        calendarChartsMap: dailyRevenueCalendarChartsMap,
        lineChartsMap: dailyRevenueLineChartsMap,
        pieChartsObj: dailyRevenuePieChartsObj,
      },
      transactions: {
        barChartsMap: dailyTransactionsBarChartsMap,
        calendarChartsMap: dailyTransactionsCalendarChartsMap,
        lineChartsMap: dailyTransactionsLineChartsMap,
        pieChartsObj: dailyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsMap: dailyOtherMetricsBarChartsMap,
        calendarChartsMap: dailyOtherMetricsCalendarChartsMap,
        lineChartsMap: dailyOtherMetricsLineChartsMap,
      },
    },
    monthlyCharts: {
      profit: {
        barChartsMap: monthlyProfitBarChartsMap,
        calendarChartsMap: monthlyProfitCalendarChartsMap,
        lineChartsMap: monthlyProfitLineChartsMap,
        pieChartsObj: monthlyProfitPieChartsObj,
      },
      expenses: {
        barChartsMap: monthlyExpensesBarChartsMap,
        calendarChartsMap: monthlyExpensesCalendarChartsMap,
        lineChartsMap: monthlyExpensesLineChartsMap,
        pieChartsObj: monthlyExpensesPieChartsObj,
      },
      revenue: {
        barChartsMap: monthlyRevenueBarChartsMap,
        calendarChartsMap: monthlyRevenueCalendarChartsMap,
        lineChartsMap: monthlyRevenueLineChartsMap,
        pieChartsObj: monthlyRevenuePieChartsObj,
      },
      transactions: {
        barChartsMap: monthlyTransactionsBarChartsMap,
        calendarChartsMap: monthlyTransactionsCalendarChartsMap,
        lineChartsMap: monthlyTransactionsLineChartsMap,
        pieChartsObj: monthlyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsMap: monthlyOtherMetricsBarChartsMap,
        calendarChartsMap: monthlyOtherMetricsCalendarChartsMap,
        lineChartsMap: monthlyOtherMetricsLineChartsMap,
      },
    },
    yearlyCharts: {
      profit: {
        barChartsMap: yearlyProfitBarChartsMap,
        lineChartsMap: yearlyProfitLineChartsMap,
        pieChartsObj: yearlyProfitPieChartsObj,
      },
      expenses: {
        barChartsMap: yearlyExpensesBarChartsMap,
        lineChartsMap: yearlyExpensesLineChartsMap,
        pieChartsObj: yearlyExpensesPieChartsObj,
      },
      revenue: {
        barChartsMap: yearlyRevenueBarChartsMap,
        lineChartsMap: yearlyRevenueLineChartsMap,
        pieChartsObj: yearlyRevenuePieChartsObj,
      },
      transactions: {
        barChartsMap: yearlyTransactionsBarChartsMap,
        lineChartsMap: yearlyTransactionsLineChartsMap,
        pieChartsObj: yearlyTransactionsPieChartsObj,
      },
      otherMetrics: {
        barChartsMap: yearlyOtherMetricsBarChartsMap,
        lineChartsMap: yearlyOtherMetricsLineChartsMap,
      },
    },
  };
}

export { returnFinancialChartsData, returnSelectedDateFinancialMetrics };
export type {
  FinancialMetricBarLineMapKey,
  FinancialMetricCalendarMapKey,
  FinancialMetricsPieChartsObj,
  FinancialOtherMetricsMapkey,
  ReturnFinancialChartsDataInput,
  ReturnFinancialChartsDataOutput,
};
