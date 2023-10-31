import { BarChartData } from '../../charts/responsiveBarChart/types';
import { CalendarChartData } from '../../charts/responsiveCalendarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  Month,
  RepairCategory,
  RepairDailyMetric,
  RepairMonthlyMetric,
  RepairYearlyMetric,
  Year,
} from '../types';

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
}: {
  businessMetrics: BusinessMetric[];
  day: string;
  month: Month;
  months: Month[];
  selectedRepairCategory: RepairCategory;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
}): SelectedDateRepairMetrics {
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
    month === 'January'
      ? prevPrevYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) => monthlyMetric.month === 'December'
        )
      : selectedYearMetrics?.monthlyMetrics.find(
          (monthlyMetric) =>
            monthlyMetric.month === months[months.indexOf(month) - 1]
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
    day === '01'
      ? monthRepairMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '31'
        ) ??
        monthRepairMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '30'
        ) ??
        monthRepairMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '29'
        ) ??
        monthRepairMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '28'
        )
      : selectedMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === (parseInt(day) - 1).toString().padStart(2, '0')
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
  selectedRepairCategory: RepairCategory;
  selectedRepairMetrics: SelectedDateRepairMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type RepairMetricChartsMapKey = 'Transactions' | 'Revenue';

/**
 * repairMetrics: {
    name: RepairCategory;
    yearlyMetrics: {
      year: string;
      revenue: number;
      transactions: number;

      monthlyMetrics: {
        month: string;
        revenue: number;
        transactions: number;

        dailyMetrics: {
          day: string;
          revenue: number;
          transactions: number;
        }[];
      }[];
    }[];    
  }[]
 */

type ReturnRepairChartsDataOutput = {
  dailyCharts: {
    barChartsMap: Map<RepairMetricChartsMapKey, BarChartData[]>;
    calendarChartsMap: Map<RepairMetricChartsMapKey, CalendarChartData[]>;
    lineChartsMap: Map<RepairMetricChartsMapKey, LineChartData[]>;
  };
  monthlyCharts: {
    barChartsMap: Map<RepairMetricChartsMapKey, BarChartData[]>;
    calendarChartsMap: Map<RepairMetricChartsMapKey, CalendarChartData[]>;
    lineChartsMap: Map<RepairMetricChartsMapKey, LineChartData[]>;
  };
  yearlyCharts: {
    barChartsMap: Map<RepairMetricChartsMapKey, BarChartData[]>;
    lineChartsMap: Map<RepairMetricChartsMapKey, LineChartData[]>;
  };
};

function returnRepairChartsData({
  businessMetrics,
  months,
  selectedRepairCategory,
  selectedRepairMetrics,
  storeLocation,
}: ReturnRepairChartsDataInput): ReturnRepairChartsDataOutput {
  // selected year's metrics
  const {
    yearRepairMetrics: { selectedYearMetrics },
  } = selectedRepairMetrics;
  const selectedYear = selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const {
    monthRepairMetrics: { selectedMonthMetrics },
  } = selectedRepairMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // templates

  // templates -> bar charts map
  const BAR_CHART_MAP_TEMPLATE = new Map<
    RepairMetricChartsMapKey,
    BarChartData[]
  >([
    ['Revenue', []],
    ['Transactions', []],
  ]);

  // templates -> calendar charts map
  const CALENDAR_CHART_MAP_TEMPLATE = new Map<
    RepairMetricChartsMapKey,
    CalendarChartData[]
  >([
    ['Revenue', []],
    ['Transactions', []],
  ]);

  // templates -> line charts map
  const LINE_CHART_MAP_TEMPLATE = new Map<
    RepairMetricChartsMapKey,
    LineChartData[]
  >([
    ['Revenue', [{ id: 'Revenue', data: [] }]],
    ['Transactions', [{ id: 'Transactions', data: [] }]],
  ]);

  // daily charts

  // daily charts -> bar charts map
  const initialDailyRepairBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // daily charts -> calendar charts map
  const initialDailyRepairCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // daily charts -> line charts map
  const initialDailyRepairLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );

  const [
    dailyRepairBarChartsMap,
    dailyRepairCalendarChartsMap,
    dailyRepairLineChartsMap,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyRepairChartsAcc, dailyRepairMetric) => {
      const [
        dailyRepairBarChartsMapAcc,
        dailyRepairCalendarChartsMapAcc,
        dailyRepairLineChartsMapAcc,
      ] = dailyRepairChartsAcc;

      const { day, revenue, transactions } = dailyRepairMetric;

      // bar charts

      // bar charts -> transactions
      const dailyRepairTransactionsBarChart: BarChartData = {
        Days: day,
        Transactions: transactions,
      };
      dailyRepairBarChartsMapAcc
        .get('Transactions')
        ?.push(dailyRepairTransactionsBarChart);

      // bar charts -> revenue
      const dailyRepairRevenueBarChart: BarChartData = {
        Days: day,
        Revenue: revenue,
      };
      dailyRepairBarChartsMapAcc
        .get('Revenue')
        ?.push(dailyRepairRevenueBarChart);

      // calendar charts

      // calendar charts -> transactions
      const dailyRepairTransactionsCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions,
      };
      dailyRepairCalendarChartsMapAcc
        .get('Transactions')
        ?.push(dailyRepairTransactionsCalendarChart);

      // calendar charts -> revenue
      const dailyRepairRevenueCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue,
      };
      dailyRepairCalendarChartsMapAcc
        .get('Revenue')
        ?.push(dailyRepairRevenueCalendarChart);

      // line charts

      // line charts -> transactions
      const dailyRepairTransactionsLineChart = {
        x: day,
        y: transactions,
      };
      dailyRepairLineChartsMapAcc
        .get('Transactions')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'Transactions'
        )
        ?.data.push(dailyRepairTransactionsLineChart);

      // line charts -> revenue
      const dailyRepairRevenueLineChart = {
        x: day,
        y: revenue,
      };
      dailyRepairLineChartsMapAcc
        .get('Revenue')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Revenue')
        ?.data.push(dailyRepairRevenueLineChart);

      return dailyRepairChartsAcc;
    },
    [
      initialDailyRepairBarChartsMap,
      initialDailyRepairCalendarChartsMap,
      initialDailyRepairLineChartsMap,
    ]
  ) ?? [
    initialDailyRepairBarChartsMap,
    initialDailyRepairCalendarChartsMap,
    initialDailyRepairLineChartsMap,
  ];

  // monthly

  // monthly -> bar charts map
  const initialMonthlyRepairBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // monthly -> calendar charts map
  const initialMonthlyRepairCalendarChartsMap = structuredClone(
    CALENDAR_CHART_MAP_TEMPLATE
  );
  // monthly -> line charts map
  const initialMonthlyRepairLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );

  const [
    monthlyRepairBarChartsMap,
    monthlyRepairCalendarChartsMap,
    monthlyRepairLineChartsMap,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyRepairChartsAcc, monthlyRepairMetric) => {
      const [
        monthlyRepairBarChartsMapAcc,
        monthlyRepairCalendarChartsMapAcc,
        monthlyRepairLineChartsMapAcc,
      ] = monthlyRepairChartsAcc;

      const { month, revenue, transactions } = monthlyRepairMetric;

      const monthNumberStr = (months.indexOf(month) + 1)
        .toString()
        .padStart(2, '0');

      // bar charts

      // bar charts -> transactions
      const monthlyRepairTransactionsBarChart: BarChartData = {
        Months: month,
        Transactions: transactions,
      };
      monthlyRepairBarChartsMapAcc
        .get('Transactions')
        ?.push(monthlyRepairTransactionsBarChart);

      // bar charts -> revenue
      const monthlyRepairRevenueBarChart: BarChartData = {
        Months: month,
        Revenue: revenue,
      };
      monthlyRepairBarChartsMapAcc
        .get('Revenue')
        ?.push(monthlyRepairRevenueBarChart);

      // calendar charts

      const { dailyMetrics } = monthlyRepairMetric;

      dailyMetrics.forEach((dailyRepairMetric) => {
        const { day, revenue, transactions } = dailyRepairMetric;

        // calendar charts -> transactions
        const monthlyRepairTransactionsCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions,
        };
        monthlyRepairCalendarChartsMapAcc
          .get('Transactions')
          ?.push(monthlyRepairTransactionsCalendarChart);

        // calendar charts -> revenue
        const monthlyRepairRevenueCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue,
        };
        monthlyRepairCalendarChartsMapAcc
          .get('Revenue')
          ?.push(monthlyRepairRevenueCalendarChart);
      });

      // line charts

      // line charts -> transactions
      const monthlyRepairTransactionsLineChart = {
        x: month,
        y: transactions,
      };
      monthlyRepairLineChartsMapAcc
        .get('Transactions')
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'Transactions'
        )
        ?.data.push(monthlyRepairTransactionsLineChart);

      // line charts -> revenue
      const monthlyRepairRevenueLineChart = {
        x: month,
        y: revenue,
      };
      monthlyRepairLineChartsMapAcc
        .get('Revenue')
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Revenue')
        ?.data.push(monthlyRepairRevenueLineChart);

      return monthlyRepairChartsAcc;
    },
    [
      initialMonthlyRepairBarChartsMap,
      initialMonthlyRepairCalendarChartsMap,
      initialMonthlyRepairLineChartsMap,
    ]
  ) ?? [
    initialMonthlyRepairBarChartsMap,
    initialMonthlyRepairCalendarChartsMap,
    initialMonthlyRepairLineChartsMap,
  ];

  // yearly

  // yearly -> bar charts map
  const initialYearlyRepairBarChartsMap = structuredClone(
    BAR_CHART_MAP_TEMPLATE
  );
  // yearly -> line charts map
  const initialYearlyRepairLineChartsMap = structuredClone(
    LINE_CHART_MAP_TEMPLATE
  );

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' repair category
  const repairMetrics = currentStoreMetrics?.repairMetrics.find(
    (repairMetric) => repairMetric.name === selectedRepairCategory
  );

  const [yearlyRepairBarChartsMap, yearlyRepairLineChartsMap] =
    repairMetrics?.yearlyMetrics.reduce(
      (yearlyRepairChartsAcc, yearlyRepairMetric) => {
        const [yearlyRepairBarChartsMapAcc, yearlyRepairLineChartsMapAcc] =
          yearlyRepairChartsAcc;

        const { year, revenue, transactions } = yearlyRepairMetric;

        // bar charts

        // bar charts -> transactions
        const yearlyRepairTransactionsBarChart: BarChartData = {
          Years: year,
          Transactions: transactions,
        };
        yearlyRepairBarChartsMapAcc
          .get('Transactions')
          ?.push(yearlyRepairTransactionsBarChart);

        // bar charts -> revenue
        const yearlyRepairRevenueBarChart: BarChartData = {
          Years: year,
          Revenue: revenue,
        };
        yearlyRepairBarChartsMapAcc
          .get('Revenue')
          ?.push(yearlyRepairRevenueBarChart);

        // line charts

        // line charts -> transactions
        const yearlyRepairTransactionsLineChart = {
          x: year,
          y: transactions,
        };
        yearlyRepairLineChartsMapAcc
          .get('Transactions')
          ?.find(
            (lineChartData: LineChartData) =>
              lineChartData.id === 'Transactions'
          )
          ?.data.push(yearlyRepairTransactionsLineChart);

        // line charts -> revenue
        const yearlyRepairRevenueLineChart = {
          x: year,
          y: revenue,
        };
        yearlyRepairLineChartsMapAcc
          .get('Revenue')
          ?.find(
            (lineChartData: LineChartData) => lineChartData.id === 'Revenue'
          )
          ?.data.push(yearlyRepairRevenueLineChart);

        return yearlyRepairChartsAcc;
      },
      [initialYearlyRepairBarChartsMap, initialYearlyRepairLineChartsMap]
    ) ?? [initialYearlyRepairBarChartsMap, initialYearlyRepairLineChartsMap];

  return {
    dailyCharts: {
      barChartsMap: dailyRepairBarChartsMap,
      calendarChartsMap: dailyRepairCalendarChartsMap,
      lineChartsMap: dailyRepairLineChartsMap,
    },
    monthlyCharts: {
      barChartsMap: monthlyRepairBarChartsMap,
      calendarChartsMap: monthlyRepairCalendarChartsMap,
      lineChartsMap: monthlyRepairLineChartsMap,
    },
    yearlyCharts: {
      barChartsMap: yearlyRepairBarChartsMap,
      lineChartsMap: yearlyRepairLineChartsMap,
    },
  };
}

export { returnRepairChartsData, returnSelectedDateRepairMetrics };

export type { RepairMetricChartsMapKey, ReturnRepairChartsDataOutput };
