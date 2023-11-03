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

type RepairMetricChartsObjKey = 'transactions' | 'revenue';
type BarChartsObj = Record<RepairMetricChartsObjKey, BarChartData[]>;
type CalendarChartsObj = Record<RepairMetricChartsObjKey, CalendarChartData[]>;
type LineChartsObj = Record<
  RepairMetricChartsObjKey,
  {
    id: Capitalize<RepairMetricChartsObjKey>;
    data: { x: string; y: number }[];
  }[]
>;

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
    barChartsObj: BarChartsObj;
    calendarChartsObj: CalendarChartsObj;
    lineChartsObj: LineChartsObj;
  };
  monthlyCharts: {
    barChartsObj: BarChartsObj;
    calendarChartsObj: CalendarChartsObj;
    lineChartsObj: LineChartsObj;
  };
  yearlyCharts: {
    barChartsObj: BarChartsObj;
    lineChartsObj: LineChartsObj;
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

  // templates -> bar charts obj
  const BAR_CHART_OBJ_TEMPLATE: BarChartsObj = {
    revenue: [],
    transactions: [],
  };

  // templates -> calendar charts obj
  const CALENDAR_CHART_OBJ_TEMPLATE: CalendarChartsObj = {
    revenue: [],
    transactions: [],
  };

  // templates -> line charts obj
  const LINE_CHART_OBJ_TEMPLATE: LineChartsObj = {
    revenue: [{ id: 'Revenue', data: [] }],
    transactions: [{ id: 'Transactions', data: [] }],
  };

  // daily charts

  // daily charts -> bar charts obj
  const initialDailyRepairBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> calendar charts obj
  const initialDailyRepairCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> line charts obj
  const initialDailyRepairLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

  const [
    dailyRepairBarChartsObj,
    dailyRepairCalendarChartsObj,
    dailyRepairLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyRepairChartsAcc, dailyRepairMetric) => {
      const [
        dailyRepairBarChartsObjAcc,
        dailyRepairCalendarChartsObjAcc,
        dailyRepairLineChartsObjAcc,
      ] = dailyRepairChartsAcc;

      const { day, revenue, transactions } = dailyRepairMetric;

      // bar charts

      // bar charts -> transactions
      const dailyRepairTransactionsBarChart: BarChartData = {
        Days: day,
        Transactions: transactions,
      };
      dailyRepairBarChartsObjAcc.transactions.push(
        dailyRepairTransactionsBarChart
      );

      // bar charts -> revenue
      const dailyRepairRevenueBarChart: BarChartData = {
        Days: day,
        Revenue: revenue,
      };
      dailyRepairBarChartsObjAcc.revenue.push(dailyRepairRevenueBarChart);

      // calendar charts

      // calendar charts -> transactions
      const dailyRepairTransactionsCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions,
      };
      dailyRepairCalendarChartsObjAcc.transactions.push(
        dailyRepairTransactionsCalendarChart
      );

      // calendar charts -> revenue
      const dailyRepairRevenueCalendarChart: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue,
      };
      dailyRepairCalendarChartsObjAcc.revenue.push(
        dailyRepairRevenueCalendarChart
      );

      // line charts

      // line charts -> transactions
      const dailyRepairTransactionsLineChart = {
        x: day,
        y: transactions,
      };
      dailyRepairLineChartsObjAcc.transactions
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Transactions'
        )
        ?.data.push(dailyRepairTransactionsLineChart);

      // line charts -> revenue
      const dailyRepairRevenueLineChart = {
        x: day,
        y: revenue,
      };
      dailyRepairLineChartsObjAcc.revenue
        .find((lineChartData: LineChartData) => lineChartData.id === 'Revenue')
        ?.data.push(dailyRepairRevenueLineChart);

      return dailyRepairChartsAcc;
    },
    [
      initialDailyRepairBarChartsObj,
      initialDailyRepairCalendarChartsObj,
      initialDailyRepairLineChartsObj,
    ]
  ) ?? [
    initialDailyRepairBarChartsObj,
    initialDailyRepairCalendarChartsObj,
    initialDailyRepairLineChartsObj,
  ];

  // monthly

  // monthly -> bar charts obj
  const initialMonthlyRepairBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> calendar charts obj
  const initialMonthlyRepairCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly -> line charts obj
  const initialMonthlyRepairLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );

  const [
    monthlyRepairBarChartsObj,
    monthlyRepairCalendarChartsObj,
    monthlyRepairLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyRepairChartsAcc, monthlyRepairMetric) => {
      const [
        monthlyRepairBarChartsObjAcc,
        monthlyRepairCalendarChartsObjAcc,
        monthlyRepairLineChartsObjAcc,
      ] = monthlyRepairChartsAcc;

      const { month, revenue, transactions } = monthlyRepairMetric;
      const monthNumberStr = (months.indexOf(month) + 1)
        .toString()
        .padStart(2, '0');

      // prevents current month of current year from being added to charts
      const currentYear = new Date().getFullYear().toString();
      const isCurrentYear = selectedYear === currentYear;
      const currentMonth = new Date().toLocaleString('default', {
        month: 'long',
      });
      const isCurrentMonth = month === currentMonth;

      if (isCurrentYear && isCurrentMonth) {
        return monthlyRepairChartsAcc;
      }

      // bar charts

      // bar charts -> transactions
      const monthlyRepairTransactionsBarChart: BarChartData = {
        Months: month,
        Transactions: transactions,
      };
      monthlyRepairBarChartsObjAcc.transactions.push(
        monthlyRepairTransactionsBarChart
      );

      // bar charts -> revenue
      const monthlyRepairRevenueBarChart: BarChartData = {
        Months: month,
        Revenue: revenue,
      };
      monthlyRepairBarChartsObjAcc.revenue.push(monthlyRepairRevenueBarChart);

      // calendar charts

      const { dailyMetrics } = monthlyRepairMetric;

      dailyMetrics.forEach((dailyRepairMetric) => {
        const { day, revenue, transactions } = dailyRepairMetric;

        // calendar charts -> transactions
        const monthlyRepairTransactionsCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions,
        };
        monthlyRepairCalendarChartsObjAcc.transactions.push(
          monthlyRepairTransactionsCalendarChart
        );

        // calendar charts -> revenue
        const monthlyRepairRevenueCalendarChart: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue,
        };
        monthlyRepairCalendarChartsObjAcc.revenue.push(
          monthlyRepairRevenueCalendarChart
        );
      });

      // line charts

      // line charts -> transactions
      const monthlyRepairTransactionsLineChart = {
        x: month,
        y: transactions,
      };
      monthlyRepairLineChartsObjAcc.transactions
        ?.find(
          (lineChartData: LineChartData) => lineChartData.id === 'Transactions'
        )
        ?.data.push(monthlyRepairTransactionsLineChart);

      // line charts -> revenue
      const monthlyRepairRevenueLineChart = {
        x: month,
        y: revenue,
      };
      monthlyRepairLineChartsObjAcc.revenue
        ?.find((lineChartData: LineChartData) => lineChartData.id === 'Revenue')
        ?.data.push(monthlyRepairRevenueLineChart);

      return monthlyRepairChartsAcc;
    },
    [
      initialMonthlyRepairBarChartsObj,
      initialMonthlyRepairCalendarChartsObj,
      initialMonthlyRepairLineChartsObj,
    ]
  ) ?? [
    initialMonthlyRepairBarChartsObj,
    initialMonthlyRepairCalendarChartsObj,
    initialMonthlyRepairLineChartsObj,
  ];

  // yearly

  // yearly -> bar charts obj
  const initialYearlyRepairBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // yearly -> line charts obj
  const initialYearlyRepairLineChartsObj = structuredClone(
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

  const [yearlyRepairBarChartsObj, yearlyRepairLineChartsObj] =
    repairMetrics?.yearlyMetrics.reduce(
      (yearlyRepairChartsAcc, yearlyRepairMetric) => {
        const [yearlyRepairBarChartsObjAcc, yearlyRepairLineChartsObjAcc] =
          yearlyRepairChartsAcc;

        const { year, revenue, transactions } = yearlyRepairMetric;

        // prevents current year from being added to charts
        const currentYear = new Date().getFullYear();
        if (year === currentYear.toString()) {
          return yearlyRepairChartsAcc;
        }

        // bar charts

        // bar charts -> transactions
        const yearlyRepairTransactionsBarChart: BarChartData = {
          Years: year,
          Transactions: transactions,
        };
        yearlyRepairBarChartsObjAcc.transactions.push(
          yearlyRepairTransactionsBarChart
        );

        // bar charts -> revenue
        const yearlyRepairRevenueBarChart: BarChartData = {
          Years: year,
          Revenue: revenue,
        };
        yearlyRepairBarChartsObjAcc.revenue.push(yearlyRepairRevenueBarChart);

        // line charts

        // line charts -> transactions
        const yearlyRepairTransactionsLineChart = {
          x: year,
          y: transactions,
        };
        yearlyRepairLineChartsObjAcc.transactions
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
        yearlyRepairLineChartsObjAcc.revenue
          ?.find(
            (lineChartData: LineChartData) => lineChartData.id === 'Revenue'
          )
          ?.data.push(yearlyRepairRevenueLineChart);

        return yearlyRepairChartsAcc;
      },
      [initialYearlyRepairBarChartsObj, initialYearlyRepairLineChartsObj]
    ) ?? [initialYearlyRepairBarChartsObj, initialYearlyRepairLineChartsObj];

  return {
    dailyCharts: {
      barChartsObj: dailyRepairBarChartsObj,
      calendarChartsObj: dailyRepairCalendarChartsObj,
      lineChartsObj: dailyRepairLineChartsObj,
    },
    monthlyCharts: {
      barChartsObj: monthlyRepairBarChartsObj,
      calendarChartsObj: monthlyRepairCalendarChartsObj,
      lineChartsObj: monthlyRepairLineChartsObj,
    },
    yearlyCharts: {
      barChartsObj: yearlyRepairBarChartsObj,
      lineChartsObj: yearlyRepairLineChartsObj,
    },
  };
}

export { returnRepairChartsData, returnSelectedDateRepairMetrics };

export type { RepairMetricChartsObjKey, ReturnRepairChartsDataOutput };
