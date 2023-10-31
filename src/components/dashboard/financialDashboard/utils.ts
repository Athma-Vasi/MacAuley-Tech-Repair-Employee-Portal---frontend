import { type } from 'os';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  DailyFinancialMetric,
  YearlyFinancialMetric,
  Month,
  MonthlyFinancialMetric,
  Year,
} from '../types';
import { BarChartData } from '../../charts/responsiveBarChart/types';
import { CalendarChartData } from '../../charts/responsiveCalendarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import { PieChartData } from '../../charts/responsivePieChart/types';

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
  | 'Average Order Value'
  | 'Conversion Rate'
  | 'Net Profit Margin';

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
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
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
      calendarChartsMap: Map<
        FinancialMetricCalendarMapKey,
        CalendarChartData[]
      >;
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
}: ReturnFinancialChartsDataInput) {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

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
    FinancialMetricBarLineMapKey,
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
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyMetricsChartsMapAcc, dailyMetric) => {
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
      dailyMetricsChartsMapAcc[0]
        .get('Total')
        ?.push(dailyProfitTotalBarChartData);

      // profit -> bar chart data -> all
      const dailyProfitAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        'In-Store': salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[0].get('All')?.push(dailyProfitAllBarChartData);

      // profit -> bar chart data -> overview
      const dailyProfitOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
        Sales: salesProfit.total,
      };
      dailyMetricsChartsMapAcc[0]
        .get('Overview')
        ?.push(dailyProfitOverviewBarChartData);

      // profit -> bar chart data -> repair
      const dailyProfitRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairProfit,
      };
      dailyMetricsChartsMapAcc[0]
        .get('Repair')
        ?.push(dailyProfitRepairBarChartData);

      // profit -> bar chart data -> sales
      const dailyProfitSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesProfit.inStore,
        Online: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[0]
        .get('Sales')
        ?.push(dailyProfitSalesBarChartData);

      // profit -> bar chart data -> in-store
      const dailyProfitInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesProfit.inStore,
      };
      dailyMetricsChartsMapAcc[0]
        .get('In-Store')
        ?.push(dailyProfitInStoreBarChartData);

      // profit -> bar chart data -> online
      const dailyProfitOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[0]
        .get('Online')
        ?.push(dailyProfitOnlineBarChartData);

      // profit -> calendar chart data

      // profit -> calendar chart data -> total
      const dailyProfitTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalProfit,
      };
      dailyMetricsChartsMapAcc[1]
        .get('Total')
        ?.push(dailyProfitTotalCalendarChartData);

      // profit -> calendar chart data -> repair
      const dailyProfitRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairProfit,
      };
      dailyMetricsChartsMapAcc[1]
        .get('Repair')
        ?.push(dailyProfitRepairCalendarChartData);

      // profit -> calendar chart data -> sales
      const dailyProfitSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.total,
      };
      dailyMetricsChartsMapAcc[1]
        .get('Sales')
        ?.push(dailyProfitSalesCalendarChartData);

      // profit -> calendar chart data -> in-store
      const dailyProfitInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.inStore,
      };
      dailyMetricsChartsMapAcc[1]
        .get('In-Store')
        ?.push(dailyProfitInStoreCalendarChartData);

      // profit -> calendar chart data -> online
      const dailyProfitOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[1]
        .get('Online')
        ?.push(dailyProfitOnlineCalendarChartData);

      // profit -> line chart data

      // profit -> line chart data -> total
      const dailyProfitTotalLineChartData = {
        x: day,
        y: totalProfit,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Total')
        ?.find((lineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyProfitTotalLineChartData);

      // profit -> line chart data -> all -> repair
      const dailyProfitAllRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyMetricsChartsMapAcc[2]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitAllRepairLineChartData);

      // profit -> line chart data -> all -> in-store
      const dailyProfitAllInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyMetricsChartsMapAcc[2]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyProfitAllInStoreLineChartData);

      // profit -> line chart data -> all -> online
      const dailyProfitAllOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[2]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyProfitAllOnlineLineChartData);

      // profit -> line chart data -> overview -> repair
      const dailyProfitOverviewRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitOverviewRepairLineChartData);

      // profit -> line chart data -> overview -> sales
      const dailyProfitOverviewSalesLineChartData = {
        x: day,
        y: salesProfit.total,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyProfitOverviewSalesLineChartData);

      // profit -> line chart data -> repair
      const dailyProfitRepairLineChartData = {
        x: day,
        y: repairProfit,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Repair')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyProfitRepairLineChartData);

      // profit -> line chart data -> sales -> in-store
      const dailyProfitSalesInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyProfitSalesInStoreLineChartData);

      // profit -> line chart data -> sales -> online
      const dailyProfitSalesOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyProfitSalesOnlineLineChartData);

      // profit -> line chart data -> in-store
      const dailyProfitInStoreLineChartData = {
        x: day,
        y: salesProfit.inStore,
      };
      dailyMetricsChartsMapAcc[2]
        .get('In-Store')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyProfitInStoreLineChartData);

      // profit -> line chart data -> online
      const dailyProfitOnlineLineChartData = {
        x: day,
        y: salesProfit.online,
      };
      dailyMetricsChartsMapAcc[2]
        .get('Online')
        ?.find((lineChartData) => lineChartData.id === 'Online')
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
      dailyMetricsChartsMapAcc[3]
        .get('Total')
        ?.push(dailyExpensesTotalBarChartData);

      // expenses -> bar chart data -> all
      const dailyExpensesAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        'In-Store': salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[3]
        .get('All')
        ?.push(dailyExpensesAllBarChartData);

      // expenses -> bar chart data -> overview
      const dailyExpensesOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
        Sales: salesExpenses.total,
      };
      dailyMetricsChartsMapAcc[3]
        .get('Overview')
        ?.push(dailyExpensesOverviewBarChartData);

      // expenses -> bar chart data -> repair
      const dailyExpensesRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairExpenses,
      };
      dailyMetricsChartsMapAcc[3]
        .get('Repair')
        ?.push(dailyExpensesRepairBarChartData);

      // expenses -> bar chart data -> sales
      const dailyExpensesSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesExpenses.inStore,
        Online: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[3]
        .get('Sales')
        ?.push(dailyExpensesSalesBarChartData);

      // expenses -> bar chart data -> in-store
      const dailyExpensesInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesExpenses.inStore,
      };
      dailyMetricsChartsMapAcc[3]
        .get('In-Store')
        ?.push(dailyExpensesInStoreBarChartData);

      // expenses -> bar chart data -> online
      const dailyExpensesOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[3]
        .get('Online')
        ?.push(dailyExpensesOnlineBarChartData);

      // expenses -> calendar chart data

      // expenses -> calendar chart data -> total
      const dailyExpensesTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalExpenses,
      };
      dailyMetricsChartsMapAcc[4]
        .get('Total')
        ?.push(dailyExpensesTotalCalendarChartData);

      // expenses -> calendar chart data -> repair
      const dailyExpensesRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairExpenses,
      };
      dailyMetricsChartsMapAcc[4]
        .get('Repair')
        ?.push(dailyExpensesRepairCalendarChartData);

      // expenses -> calendar chart data -> sales
      const dailyExpensesSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.total,
      };
      dailyMetricsChartsMapAcc[4]
        .get('Sales')
        ?.push(dailyExpensesSalesCalendarChartData);

      // expenses -> calendar chart data -> in-store
      const dailyExpensesInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.inStore,
      };
      dailyMetricsChartsMapAcc[4]
        .get('In-Store')
        ?.push(dailyExpensesInStoreCalendarChartData);

      // expenses -> calendar chart data -> online
      const dailyExpensesOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[4]
        .get('Online')
        ?.push(dailyExpensesOnlineCalendarChartData);

      // expenses -> line chart data

      // expenses -> line chart data -> total
      const dailyExpensesTotalLineChartData = {
        x: day,
        y: totalExpenses,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Total')
        ?.find((lineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyExpensesTotalLineChartData);

      // expenses -> line chart data -> all -> repair
      const dailyExpensesAllRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyMetricsChartsMapAcc[5]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesAllRepairLineChartData);

      // expenses -> line chart data -> all -> in-store
      const dailyExpensesAllInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyMetricsChartsMapAcc[5]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyExpensesAllInStoreLineChartData);

      // expenses -> line chart data -> all -> online
      const dailyExpensesAllOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[5]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyExpensesAllOnlineLineChartData);

      // expenses -> line chart data -> overview -> repair
      const dailyExpensesOverviewRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesOverviewRepairLineChartData);

      // expenses -> line chart data -> overview -> sales
      const dailyExpensesOverviewSalesLineChartData = {
        x: day,
        y: salesExpenses.total,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyExpensesOverviewSalesLineChartData);

      // expenses -> line chart data -> repair
      const dailyExpensesRepairLineChartData = {
        x: day,
        y: repairExpenses,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Repair')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyExpensesRepairLineChartData);

      // expenses -> line chart data -> sales -> in-store
      const dailyExpensesSalesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyExpensesSalesInStoreLineChartData);

      // expenses -> line chart data -> sales -> online
      const dailyExpensesSalesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyExpensesSalesOnlineLineChartData);

      // expenses -> line chart data -> in-store
      const dailyExpensesInStoreLineChartData = {
        x: day,
        y: salesExpenses.inStore,
      };
      dailyMetricsChartsMapAcc[5]
        .get('In-Store')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyExpensesInStoreLineChartData);

      // expenses -> line chart data -> online
      const dailyExpensesOnlineLineChartData = {
        x: day,
        y: salesExpenses.online,
      };
      dailyMetricsChartsMapAcc[5]
        .get('Online')
        ?.find((lineChartData) => lineChartData.id === 'Online')
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
      dailyMetricsChartsMapAcc[6]
        .get('Total')
        ?.push(dailyRevenueTotalBarChartData);

      // revenue -> bar chart data -> all
      const dailyRevenueAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        'In-Store': salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[6].get('All')?.push(dailyRevenueAllBarChartData);

      // revenue -> bar chart data -> overview
      const dailyRevenueOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
        Sales: salesRevenue.total,
      };
      dailyMetricsChartsMapAcc[6]
        .get('Overview')
        ?.push(dailyRevenueOverviewBarChartData);

      // revenue -> bar chart data -> repair
      const dailyRevenueRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairRevenue,
      };
      dailyMetricsChartsMapAcc[6]
        .get('Repair')
        ?.push(dailyRevenueRepairBarChartData);

      // revenue -> bar chart data -> sales
      const dailyRevenueSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesRevenue.inStore,
        Online: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[6]
        .get('Sales')
        ?.push(dailyRevenueSalesBarChartData);

      // revenue -> bar chart data -> in-store
      const dailyRevenueInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesRevenue.inStore,
      };
      dailyMetricsChartsMapAcc[6]
        .get('In-Store')
        ?.push(dailyRevenueInStoreBarChartData);

      // revenue -> bar chart data -> online
      const dailyRevenueOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[6]
        .get('Online')
        ?.push(dailyRevenueOnlineBarChartData);

      // revenue -> calendar chart data

      // revenue -> calendar chart data -> total
      const dailyRevenueTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalRevenue,
      };
      dailyMetricsChartsMapAcc[7]
        .get('Total')
        ?.push(dailyRevenueTotalCalendarChartData);

      // revenue -> calendar chart data -> repair
      const dailyRevenueRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairRevenue,
      };
      dailyMetricsChartsMapAcc[7]
        .get('Repair')
        ?.push(dailyRevenueRepairCalendarChartData);

      // revenue -> calendar chart data -> sales
      const dailyRevenueSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.total,
      };
      dailyMetricsChartsMapAcc[7]
        .get('Sales')
        ?.push(dailyRevenueSalesCalendarChartData);

      // revenue -> calendar chart data -> in-store
      const dailyRevenueInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.inStore,
      };
      dailyMetricsChartsMapAcc[7]
        .get('In-Store')
        ?.push(dailyRevenueInStoreCalendarChartData);

      // revenue -> calendar chart data -> online
      const dailyRevenueOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[7]
        .get('Online')
        ?.push(dailyRevenueOnlineCalendarChartData);

      // revenue -> line chart data

      // revenue -> line chart data -> total
      const dailyRevenueTotalLineChartData = {
        x: day,
        y: totalRevenue,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Total')
        ?.find((lineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyRevenueTotalLineChartData);

      // revenue -> line chart data -> all -> repair
      const dailyRevenueAllRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyMetricsChartsMapAcc[8]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueAllRepairLineChartData);

      // revenue -> line chart data -> all -> in-store
      const dailyRevenueAllInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyMetricsChartsMapAcc[8]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyRevenueAllInStoreLineChartData);

      // revenue -> line chart data -> all -> online
      const dailyRevenueAllOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[8]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyRevenueAllOnlineLineChartData);

      // revenue -> line chart data -> overview -> repair
      const dailyRevenueOverviewRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueOverviewRepairLineChartData);

      // revenue -> line chart data -> overview -> sales
      const dailyRevenueOverviewSalesLineChartData = {
        x: day,
        y: salesRevenue.total,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyRevenueOverviewSalesLineChartData);

      // revenue -> line chart data -> repair
      const dailyRevenueRepairLineChartData = {
        x: day,
        y: repairRevenue,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Repair')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyRevenueRepairLineChartData);

      // revenue -> line chart data -> sales -> in-store
      const dailyRevenueSalesInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyRevenueSalesInStoreLineChartData);

      // revenue -> line chart data -> sales -> online
      const dailyRevenueSalesOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyRevenueSalesOnlineLineChartData);

      // revenue -> line chart data -> in-store
      const dailyRevenueInStoreLineChartData = {
        x: day,
        y: salesRevenue.inStore,
      };
      dailyMetricsChartsMapAcc[8]
        .get('In-Store')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyRevenueInStoreLineChartData);

      // revenue -> line chart data -> online
      const dailyRevenueOnlineLineChartData = {
        x: day,
        y: salesRevenue.online,
      };
      dailyMetricsChartsMapAcc[8]
        .get('Online')
        ?.find((lineChartData) => lineChartData.id === 'Online')
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
      dailyMetricsChartsMapAcc[9]
        .get('Total')
        ?.push(dailyTransactionsTotalBarChartData);

      // transactions -> bar chart data -> all
      const dailyTransactionsAllBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        'In-Store': salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[9]
        .get('All')
        ?.push(dailyTransactionsAllBarChartData);

      // transactions -> bar chart data -> overview
      const dailyTransactionsOverviewBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
        Sales: salesTransactions.total,
      };
      dailyMetricsChartsMapAcc[9]
        .get('Overview')
        ?.push(dailyTransactionsOverviewBarChartData);

      // transactions -> bar chart data -> repair
      const dailyTransactionsRepairBarChartData: BarChartData = {
        Days: day,
        Repair: repairTransactions,
      };
      dailyMetricsChartsMapAcc[9]
        .get('Repair')
        ?.push(dailyTransactionsRepairBarChartData);

      // transactions -> bar chart data -> sales
      const dailyTransactionsSalesBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesTransactions.inStore,
        Online: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[9]
        .get('Sales')
        ?.push(dailyTransactionsSalesBarChartData);

      // transactions -> bar chart data -> in-store
      const dailyTransactionsInStoreBarChartData: BarChartData = {
        Days: day,
        'In-Store': salesTransactions.inStore,
      };
      dailyMetricsChartsMapAcc[9]
        .get('In-Store')
        ?.push(dailyTransactionsInStoreBarChartData);

      // transactions -> bar chart data -> online
      const dailyTransactionsOnlineBarChartData: BarChartData = {
        Days: day,
        Online: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[9]
        .get('Online')
        ?.push(dailyTransactionsOnlineBarChartData);

      // transactions -> calendar chart data

      // transactions -> calendar chart data -> total
      const dailyTransactionsTotalCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: totalTransactions,
      };
      dailyMetricsChartsMapAcc[10]
        .get('Total')
        ?.push(dailyTransactionsTotalCalendarChartData);

      // transactions -> calendar chart data -> repair
      const dailyTransactionsRepairCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: repairTransactions,
      };
      dailyMetricsChartsMapAcc[10]
        .get('Repair')
        ?.push(dailyTransactionsRepairCalendarChartData);

      // transactions -> calendar chart data -> sales
      const dailyTransactionsSalesCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.total,
      };
      dailyMetricsChartsMapAcc[10]
        .get('Sales')
        ?.push(dailyTransactionsSalesCalendarChartData);

      // transactions -> calendar chart data -> in-store
      const dailyTransactionsInStoreCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.inStore,
      };
      dailyMetricsChartsMapAcc[10]
        .get('In-Store')
        ?.push(dailyTransactionsInStoreCalendarChartData);

      // transactions -> calendar chart data -> online
      const dailyTransactionsOnlineCalendarChartData: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[10]
        .get('Online')
        ?.push(dailyTransactionsOnlineCalendarChartData);

      // transactions -> line chart data

      // transactions -> line chart data -> total
      const dailyTransactionsTotalLineChartData = {
        x: day,
        y: totalTransactions,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Total')
        ?.find((lineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyTransactionsTotalLineChartData);

      // transactions -> line chart data -> all -> repair
      const dailyTransactionsAllRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyMetricsChartsMapAcc[11]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsAllRepairLineChartData);

      // transactions -> line chart data -> all -> in-store
      const dailyTransactionsAllInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyMetricsChartsMapAcc[11]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyTransactionsAllInStoreLineChartData);

      // transactions -> line chart data -> all -> online
      const dailyTransactionsAllOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[11]
        .get('All')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsAllOnlineLineChartData);

      // transactions -> line chart data -> overview -> repair
      const dailyTransactionsOverviewRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsOverviewRepairLineChartData);

      // transactions -> line chart data -> overview -> sales
      const dailyTransactionsOverviewSalesLineChartData = {
        x: day,
        y: salesTransactions.total,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Overview')
        ?.find((lineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyTransactionsOverviewSalesLineChartData);

      // transactions -> line chart data -> repair
      const dailyTransactionsRepairLineChartData = {
        x: day,
        y: repairTransactions,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Repair')
        ?.find((lineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyTransactionsRepairLineChartData);

      // transactions -> line chart data -> sales -> in-store
      const dailyTransactionsSalesInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyTransactionsSalesInStoreLineChartData);

      // transactions -> line chart data -> sales -> online
      const dailyTransactionsSalesOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Sales')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsSalesOnlineLineChartData);

      // transactions -> line chart data -> in-store
      const dailyTransactionsInStoreLineChartData = {
        x: day,
        y: salesTransactions.inStore,
      };
      dailyMetricsChartsMapAcc[11]
        .get('In-Store')
        ?.find((lineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyTransactionsInStoreLineChartData);

      // transactions -> line chart data -> online
      const dailyTransactionsOnlineLineChartData = {
        x: day,
        y: salesTransactions.online,
      };
      dailyMetricsChartsMapAcc[11]
        .get('Online')
        ?.find((lineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyTransactionsOnlineLineChartData);

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
    },
  };
}
