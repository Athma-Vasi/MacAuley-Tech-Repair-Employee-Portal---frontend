import { BarChartData } from '../../charts/responsiveBarChart/types';
import { CalendarChartData } from '../../charts/responsiveCalendarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import { PieChartData } from '../../charts/responsivePieChart/types';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  CustomerDailyMetric,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  Month,
  Year,
} from '../types';

type SelectedDateCustomerMetrics = {
  dayCustomerMetrics: {
    selectedDayMetrics?: CustomerDailyMetric;
    prevDayMetrics?: CustomerDailyMetric;
  };
  monthCustomerMetrics: {
    selectedMonthMetrics?: CustomerMonthlyMetric;
    prevMonthMetrics?: CustomerMonthlyMetric;
  };
  yearCustomerMetrics: {
    selectedYearMetrics?: CustomerYearlyMetric;
    prevYearMetrics?: CustomerYearlyMetric;
  };
};

function returnSelectedDateCustomerMetrics({
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
}): SelectedDateCustomerMetrics {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected year's customer metrics
  const selectedYearMetrics =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
      (yearlyMetric) => yearlyMetric.year === year
    );
  const prevYearMetrics =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
      (yearlyMetric) => yearlyMetric.year === (parseInt(year) - 1).toString()
    );

  const yearCustomerMetrics = {
    selectedYearMetrics,
    prevYearMetrics,
  };

  // selected month's customer metrics
  const selectedMonthMetrics = selectedYearMetrics?.monthlyMetrics.find(
    (monthlyMetric) => monthlyMetric.month === month
  );
  const prevPrevYearMetrics =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
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

  const monthCustomerMetrics = {
    selectedMonthMetrics,
    prevMonthMetrics,
  };

  // selected day's customer metrics
  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );
  const prevDayMetrics =
    day === '01'
      ? monthCustomerMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '31'
        ) ??
        monthCustomerMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '30'
        ) ??
        monthCustomerMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '29'
        ) ??
        monthCustomerMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '28'
        )
      : selectedMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === (parseInt(day) - 1).toString().padStart(2, '0')
        );

  const dayCustomerMetrics = {
    selectedDayMetrics,
    prevDayMetrics,
  };

  return {
    dayCustomerMetrics,
    monthCustomerMetrics,
    yearCustomerMetrics,
  };
}

type ReturnCustomerChartsDataInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedCustomerMetrics: SelectedDateCustomerMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type CustomerOverviewMapKey = 'Overview' | 'New' | 'Returning';
type CustomerNewMapKey =
  | 'Overview'
  | 'New Online'
  | 'New In-Store'
  | 'New Repair';
type CustomerReturningMapKey =
  | 'Overview'
  | 'Returning Online'
  | 'Returning In-Store'
  | 'Returning Repair';
type CustomerChurnRetentionMapKey =
  | 'Overview'
  | 'Churn Rate'
  | 'Retention Rate';

type ReturnCustomerChartsDataOutput = {
  dailyCharts: {
    overview: {
      barChartsMap: Map<CustomerOverviewMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerOverviewMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerOverviewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    new: {
      barChartsMap: Map<CustomerNewMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerNewMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerNewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    returning: {
      barChartsMap: Map<CustomerReturningMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerReturningMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerReturningMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
  };
  monthlyCharts: {
    overview: {
      barChartsMap: Map<CustomerOverviewMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerOverviewMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerOverviewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    new: {
      barChartsMap: Map<CustomerNewMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerNewMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerNewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    returning: {
      barChartsMap: Map<CustomerReturningMapKey, BarChartData[]>;
      calendarChartsMap: Map<CustomerReturningMapKey, CalendarChartData[]>;
      lineChartsMap: Map<CustomerReturningMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    churnRetention: {
      barChartsMap: Map<CustomerChurnRetentionMapKey, BarChartData[]>;
      lineChartsMap: Map<CustomerChurnRetentionMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
  };
  yearlyCharts: {
    overview: {
      barChartsMap: Map<CustomerOverviewMapKey, BarChartData[]>;
      lineChartsMap: Map<CustomerOverviewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    new: {
      barChartsMap: Map<CustomerNewMapKey, BarChartData[]>;
      lineChartsMap: Map<CustomerNewMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    returning: {
      barChartsMap: Map<CustomerReturningMapKey, BarChartData[]>;
      lineChartsMap: Map<CustomerReturningMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
    churnRetention: {
      barChartsMap: Map<CustomerChurnRetentionMapKey, BarChartData[]>;
      lineChartsMap: Map<CustomerChurnRetentionMapKey, LineChartData[]>;
      pieChartData: PieChartData[];
    };
  };
};

function returnCustomerChartsData({
  businessMetrics,
  months,
  selectedCustomerMetrics,
  storeLocation,
}: ReturnCustomerChartsDataInput): ReturnCustomerChartsDataOutput {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected year's metrics
  const { yearCustomerMetrics } = selectedCustomerMetrics;
  const selectedYear = yearCustomerMetrics?.selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const { monthCustomerMetrics } = selectedCustomerMetrics;
  const selectedMonth =
    monthCustomerMetrics?.selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // selected day's metrics
  const { dayCustomerMetrics } = selectedCustomerMetrics;

  // daily

  // daily -> overview

  // daily -> overview -> bar chart map
  const initialDailyOverviewBarChartsMap = new Map<
    CustomerOverviewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New', []],
    ['Returning', []],
  ]);

  const dailyOverviewBarChartsMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyOverviewBarChartsAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyOverviewTotal = {
          Days: day,
          New: customers.new.total,
          Returning: customers.returning.total,
        };
        dailyOverviewBarChartsAcc.get('Overview')?.push(dailyOverviewTotal);

        const dailyOverviewNew = {
          Days: day,
          New: customers.new.total,
        };
        dailyOverviewBarChartsAcc.get('New')?.push(dailyOverviewNew);

        const dailyOverviewReturning = {
          Days: day,
          Returning: customers.returning.total,
        };
        dailyOverviewBarChartsAcc
          .get('Returning')
          ?.push(dailyOverviewReturning);

        return dailyOverviewBarChartsAcc;
      },
      initialDailyOverviewBarChartsMap
    ) ?? initialDailyOverviewBarChartsMap;

  // daily -> overview -> calendar chart map
  const initialDailyOverviewCalendarChartsMap = new Map<
    CustomerOverviewMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['New', []],
    ['Returning', []],
  ]);

  const dailyOverviewCalendarChartsMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyOverviewCalendarChartsAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyOverviewTotal = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.total,
        };
        dailyOverviewCalendarChartsAcc
          .get('Overview')
          ?.push(dailyOverviewTotal);

        const dailyOverviewNew = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.new.total,
        };
        dailyOverviewCalendarChartsAcc.get('New')?.push(dailyOverviewNew);

        const dailyOverviewReturning = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.returning.total,
        };
        dailyOverviewCalendarChartsAcc
          .get('Returning')
          ?.push(dailyOverviewReturning);

        return dailyOverviewCalendarChartsAcc;
      },
      initialDailyOverviewCalendarChartsMap
    ) ?? initialDailyOverviewCalendarChartsMap;

  // daily -> overview -> line chart map
  const initialDailyOverviewLineChartData = new Map<
    CustomerOverviewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New', data: [] },
        { id: 'Returning', data: [] },
      ],
    ],
    ['New', [{ id: 'New', data: [] }]],
    ['Returning', [{ id: 'Returning', data: [] }]],
  ]);

  const dailyOverviewLineChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyOverviewLineChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyNew = {
          x: day,
          y: customers.new.total,
        };
        dailyOverviewLineChartAcc
          .get('New')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(dailyNew);

        const dailyReturning = {
          x: day,
          y: customers.returning.total,
        };
        dailyOverviewLineChartAcc
          .get('Returning')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(dailyReturning);

        dailyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(dailyNew);
        dailyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(dailyReturning);

        return dailyOverviewLineChartAcc;
      },
      initialDailyOverviewLineChartData
    ) ?? initialDailyOverviewLineChartData;

  // daily -> overview -> pie chart data
  const dailyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value: dayCustomerMetrics?.selectedDayMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.returning.total ?? 0,
    },
  ];

  // daily -> new
  // daily -> new -> bar chart map
  const initialDailyNewBarChartData = new Map<
    CustomerNewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New Online', []],
    ['New In-Store', []],
    ['New Repair', []],
  ]);

  const dailyNewBarChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyNewBarChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyNewOnline = {
          Days: day,
          'New Online': customers.new.sales.online,
        };
        dailyNewBarChartAcc.get('New Online')?.push(dailyNewOnline);

        const dailyNewInStore = {
          Days: day,
          'New In-Store': customers.new.sales.inStore,
        };
        dailyNewBarChartAcc.get('New In-Store')?.push(dailyNewInStore);

        const dailyNewRepair = {
          Days: day,
          'New Repair': customers.new.repair,
        };
        dailyNewBarChartAcc.get('New Repair')?.push(dailyNewRepair);

        const dailyNewTotal = {
          Days: day,
          'New Online': customers.new.sales.online,
          'New In-Store': customers.new.sales.inStore,
          'New Repair': customers.new.repair,
        };
        dailyNewBarChartAcc.get('Overview')?.push(dailyNewTotal);

        return dailyNewBarChartAcc;
      },
      initialDailyNewBarChartData
    ) ?? initialDailyNewBarChartData;

  // daily -> new -> calendar chart map
  const initialDailyNewCalendarChartData = new Map<
    CustomerNewMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['New Online', []],
    ['New In-Store', []],
    ['New Repair', []],
  ]);

  const dailyNewCalendarChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyNewCalendarChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyNewOnline = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.new.sales.online,
        };
        dailyNewCalendarChartAcc.get('New Online')?.push(dailyNewOnline);

        const dailyNewInStore = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.new.sales.inStore,
        };
        dailyNewCalendarChartAcc.get('New In-Store')?.push(dailyNewInStore);

        const dailyNewRepair = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.new.repair,
        };
        dailyNewCalendarChartAcc.get('New Repair')?.push(dailyNewRepair);

        const dailyNewTotal = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.new.total,
        };
        dailyNewCalendarChartAcc.get('Overview')?.push(dailyNewTotal);

        return dailyNewCalendarChartAcc;
      },
      initialDailyNewCalendarChartData
    ) ?? initialDailyNewCalendarChartData;

  // daily -> new -> line chart map
  const initialDailyNewLineChartData = new Map<
    CustomerNewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New Online', data: [] },
        { id: 'New In-Store', data: [] },
        { id: 'New Repair', data: [] },
      ],
    ],
    ['New Online', [{ id: 'New Online', data: [] }]],
    ['New In-Store', [{ id: 'New In-Store', data: [] }]],
    ['New Repair', [{ id: 'New Repair', data: [] }]],
  ]);

  const dailyNewLineChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyNewLineChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyNewOnline = {
          x: day,
          y: customers.new.sales.online,
        };
        dailyNewLineChartAcc
          .get('New Online')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(dailyNewOnline);

        const dailyNewInStore = {
          x: day,
          y: customers.new.sales.inStore,
        };
        dailyNewLineChartAcc
          .get('New In-Store')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(dailyNewInStore);

        const dailyNewRepair = {
          x: day,
          y: customers.new.repair,
        };
        dailyNewLineChartAcc
          .get('New Repair')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(dailyNewRepair);

        dailyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(dailyNewOnline);
        dailyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(dailyNewInStore);
        dailyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(dailyNewRepair);

        return dailyNewLineChartAcc;
      },
      initialDailyNewLineChartData
    ) ?? initialDailyNewLineChartData;

  // daily -> new -> pie chart data
  const dailyNewPieChartData: PieChartData[] = [
    {
      id: 'New Online',
      label: 'New Online',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.online ?? 0,
    },
    {
      id: 'New In-Store',
      label: 'New In-Store',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.inStore ??
        0,
    },
    {
      id: 'New Repair',
      label: 'New Repair',
      value: dayCustomerMetrics?.selectedDayMetrics?.customers.new.repair ?? 0,
    },
  ];

  // daily -> returning
  // daily -> returning -> bar chart map
  const initialDailyReturningBarChartData = new Map<
    CustomerReturningMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['Returning Online', []],
    ['Returning In-Store', []],
    ['Returning Repair', []],
  ]);

  const dailyReturningBarChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyReturningBarChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyReturningOnline = {
          Days: day,
          'Returning Online': customers.returning.sales.online,
        };
        dailyReturningBarChartAcc
          .get('Returning Online')
          ?.push(dailyReturningOnline);

        const dailyReturningInStore = {
          Days: day,
          'Returning In-Store': customers.returning.sales.inStore,
        };
        dailyReturningBarChartAcc
          .get('Returning In-Store')
          ?.push(dailyReturningInStore);

        const dailyReturningRepair = {
          Days: day,
          'Returning Repair': customers.returning.repair,
        };
        dailyReturningBarChartAcc
          .get('Returning Repair')
          ?.push(dailyReturningRepair);

        const dailyReturningTotal = {
          Days: day,
          'Returning Online': customers.returning.sales.online,
          'Returning In-Store': customers.returning.sales.inStore,
          'Returning Repair': customers.returning.repair,
        };
        dailyReturningBarChartAcc.get('Overview')?.push(dailyReturningTotal);

        return dailyReturningBarChartAcc;
      },
      initialDailyReturningBarChartData
    ) ?? initialDailyReturningBarChartData;

  // daily -> returning -> calendar chart map
  const initialDailyReturningCalendarChartData = new Map<
    CustomerReturningMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['Returning Online', []],
    ['Returning In-Store', []],
    ['Returning Repair', []],
  ]);

  const dailyReturningCalendarChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyReturningCalendarChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyReturningOnline = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.returning.sales.online,
        };
        dailyReturningCalendarChartAcc
          .get('Returning Online')
          ?.push(dailyReturningOnline);

        const dailyReturningInStore = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.returning.sales.inStore,
        };
        dailyReturningCalendarChartAcc
          .get('Returning In-Store')
          ?.push(dailyReturningInStore);

        const dailyReturningRepair = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.returning.repair,
        };
        dailyReturningCalendarChartAcc
          .get('Returning Repair')
          ?.push(dailyReturningRepair);

        const dailyReturningTotal = {
          day: `${selectedYear}-${monthNumber}-${day}`,
          value: customers.returning.total,
        };
        dailyReturningCalendarChartAcc
          .get('Overview')
          ?.push(dailyReturningTotal);

        return dailyReturningCalendarChartAcc;
      },
      initialDailyReturningCalendarChartData
    ) ?? initialDailyReturningCalendarChartData;

  // daily -> returning -> line chart map
  const initialDailyReturningLineChartData = new Map<
    CustomerReturningMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'Returning Online', data: [] },
        { id: 'Returning In-Store', data: [] },
        { id: 'Returning Repair', data: [] },
      ],
    ],
    ['Returning Online', [{ id: 'Returning Online', data: [] }]],
    ['Returning In-Store', [{ id: 'Returning In-Store', data: [] }]],
    ['Returning Repair', [{ id: 'Returning Repair', data: [] }]],
  ]);

  const dailyReturningLineChartMap =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.reduce(
      (dailyReturningLineChartAcc, dailyMetric) => {
        const { day, customers } = dailyMetric;

        const dailyReturningOnline = {
          x: day,
          y: customers.returning.sales.online,
        };
        dailyReturningLineChartAcc
          .get('Returning Online')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(dailyReturningOnline);

        const dailyReturningInStore = {
          x: day,
          y: customers.returning.sales.inStore,
        };
        dailyReturningLineChartAcc
          .get('Returning In-Store')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(dailyReturningInStore);

        const dailyReturningRepair = {
          x: day,
          y: customers.returning.repair,
        };
        dailyReturningLineChartAcc
          .get('Returning Repair')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(dailyReturningRepair);

        dailyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(dailyReturningOnline);
        dailyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(dailyReturningInStore);
        dailyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(dailyReturningRepair);

        return dailyReturningLineChartAcc;
      },
      initialDailyReturningLineChartData
    ) ?? initialDailyReturningLineChartData;

  // daily -> returning -> pie chart data
  const dailyReturningPieChartData: PieChartData[] = [
    {
      id: 'Returning Online',
      label: 'Returning Online',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales
          .online ?? 0,
    },
    {
      id: 'Returning In-Store',
      label: 'Returning In-Store',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales
          .inStore ?? 0,
    },
    {
      id: 'Returning Repair',
      label: 'Returning Repair',
      value:
        dayCustomerMetrics?.selectedDayMetrics?.customers.returning.repair ?? 0,
    },
  ];

  // monthly

  // monthly -> overview

  // monthly -> overview -> bar chart map
  const initialMonthlyOverviewBarChartsMap = new Map<
    CustomerOverviewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New', []],
    ['Returning', []],
  ]);

  const monthlyOverviewBarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyOverviewBarChartsAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyOverviewTotal = {
          Months: month,
          New: customers.new.total,
          Returning: customers.returning.total,
        };
        monthlyOverviewBarChartsAcc.get('Overview')?.push(monthlyOverviewTotal);

        const monthlyOverviewNew = {
          Months: month,
          New: customers.new.total,
        };
        monthlyOverviewBarChartsAcc.get('New')?.push(monthlyOverviewNew);

        const monthlyOverviewReturning = {
          Months: month,
          Returning: customers.returning.total,
        };
        monthlyOverviewBarChartsAcc
          .get('Returning')
          ?.push(monthlyOverviewReturning);

        return monthlyOverviewBarChartsAcc;
      },
      initialMonthlyOverviewBarChartsMap
    ) ?? initialMonthlyOverviewBarChartsMap;

  // monthly -> overview -> calendar chart map
  const initialMonthlyOverviewCalendarChartData = new Map<
    CustomerOverviewMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['New', []],
    ['Returning', []],
  ]);

  const monthlyOverviewCalendarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyOverviewCalendarChartAcc, monthlyMetric) => {
        const { month, dailyMetrics } = monthlyMetric;
        const monthNumberStr = (months.indexOf(month) + 1)
          .toString()
          .padStart(2, '0');

        dailyMetrics.forEach((dailyMetric) => {
          const { day, customers } = dailyMetric;

          const monthlyOverviewTotal = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.total,
          };
          monthlyOverviewCalendarChartAcc
            .get('Overview')
            ?.push(monthlyOverviewTotal);

          const monthlyOverviewNew = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.new.total,
          };
          monthlyOverviewCalendarChartAcc.get('New')?.push(monthlyOverviewNew);

          const monthlyOverviewReturning = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.returning.total,
          };
          monthlyOverviewCalendarChartAcc
            .get('Returning')
            ?.push(monthlyOverviewReturning);
        });

        return monthlyOverviewCalendarChartAcc;
      },
      initialMonthlyOverviewCalendarChartData
    ) ?? initialMonthlyOverviewCalendarChartData;

  // monthly -> overview -> line chart map
  const initialMonthlyOverviewLineChartData = new Map<
    CustomerOverviewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New', data: [] },
        { id: 'Returning', data: [] },
      ],
    ],
    ['New', [{ id: 'New', data: [] }]],
    ['Returning', [{ id: 'Returning', data: [] }]],
  ]);

  const monthlyOverviewLineChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyOverviewLineChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyNew = {
          x: month,
          y: customers.new.total,
        };
        monthlyOverviewLineChartAcc
          .get('New')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(monthlyNew);

        const monthlyReturning = {
          x: month,
          y: customers.returning.total,
        };
        monthlyOverviewLineChartAcc
          .get('Returning')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(monthlyReturning);

        monthlyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(monthlyNew);
        monthlyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(monthlyReturning);

        return monthlyOverviewLineChartAcc;
      },
      initialMonthlyOverviewLineChartData
    ) ?? initialMonthlyOverviewLineChartData;

  // monthly -> overview -> pie chart data
  const monthlyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.total ??
        0,
    },
  ];

  // monthly -> new
  // monthly -> new -> bar chart map
  const initialMonthlyNewBarChartData = new Map<
    CustomerNewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New Online', []],
    ['New In-Store', []],
    ['New Repair', []],
  ]);

  const monthlyNewBarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyNewBarChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyNewOnline = {
          Months: month,
          'New Online': customers.new.sales.online,
        };
        monthlyNewBarChartAcc.get('New Online')?.push(monthlyNewOnline);

        const monthlyNewInStore = {
          Months: month,
          'New In-Store': customers.new.sales.inStore,
        };
        monthlyNewBarChartAcc.get('New In-Store')?.push(monthlyNewInStore);

        const monthlyNewRepair = {
          Months: month,
          'New Repair': customers.new.repair,
        };
        monthlyNewBarChartAcc.get('New Repair')?.push(monthlyNewRepair);

        const monthlyNewTotal = {
          Months: month,
          'New Online': customers.new.sales.online,
          'New In-Store': customers.new.sales.inStore,
          'New Repair': customers.new.repair,
        };
        monthlyNewBarChartAcc.get('Overview')?.push(monthlyNewTotal);

        return monthlyNewBarChartAcc;
      },
      initialMonthlyNewBarChartData
    ) ?? initialMonthlyNewBarChartData;

  // monthly -> new -> calendar chart map
  const initialMonthlyNewCalendarChartData = new Map<
    CustomerNewMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['New Online', []],
    ['New In-Store', []],
    ['New Repair', []],
  ]);

  const monthlyNewCalendarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyNewCalendarChartAcc, monthlyMetric) => {
        const { dailyMetrics, month } = monthlyMetric;
        const monthNumberStr = (months.indexOf(month) + 1)
          .toString()
          .padStart(2, '0');

        dailyMetrics.forEach((dailyMetric) => {
          const { day, customers } = dailyMetric;

          const monthlyNewOnline = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.new.sales.online,
          };
          monthlyNewCalendarChartAcc.get('New Online')?.push(monthlyNewOnline);

          const monthlyNewInStore = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.new.sales.inStore,
          };
          monthlyNewCalendarChartAcc
            .get('New In-Store')
            ?.push(monthlyNewInStore);

          const monthlyNewRepair = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.new.repair,
          };
          monthlyNewCalendarChartAcc.get('New Repair')?.push(monthlyNewRepair);

          const monthlyNewTotal = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.new.total,
          };
          monthlyNewCalendarChartAcc.get('Overview')?.push(monthlyNewTotal);
        });

        return monthlyNewCalendarChartAcc;
      },
      initialMonthlyNewCalendarChartData
    ) ?? initialMonthlyNewCalendarChartData;

  // monthly -> new -> line chart map
  const initialMonthlyNewLineChartData = new Map<
    CustomerNewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New Online', data: [] },
        { id: 'New In-Store', data: [] },
        { id: 'New Repair', data: [] },
      ],
    ],
    ['New Online', [{ id: 'New Online', data: [] }]],
    ['New In-Store', [{ id: 'New In-Store', data: [] }]],
    ['New Repair', [{ id: 'New Repair', data: [] }]],
  ]);

  const monthlyNewLineChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyNewLineChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyNewOnline = {
          x: month,
          y: customers.new.sales.online,
        };
        monthlyNewLineChartAcc
          .get('New Online')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(monthlyNewOnline);

        const monthlyNewInStore = {
          x: month,
          y: customers.new.sales.inStore,
        };
        monthlyNewLineChartAcc
          .get('New In-Store')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(monthlyNewInStore);

        const monthlyNewRepair = {
          x: month,
          y: customers.new.repair,
        };
        monthlyNewLineChartAcc
          .get('New Repair')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(monthlyNewRepair);

        monthlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(monthlyNewOnline);
        monthlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(monthlyNewInStore);
        monthlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(monthlyNewRepair);

        return monthlyNewLineChartAcc;
      },
      initialMonthlyNewLineChartData
    ) ?? initialMonthlyNewLineChartData;

  // monthly -> new -> pie chart data
  const monthlyNewPieChartData: PieChartData[] = [
    {
      id: 'New Online',
      label: 'New Online',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales
          .online ?? 0,
    },
    {
      id: 'New In-Store',
      label: 'New In-Store',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales
          .inStore ?? 0,
    },
    {
      id: 'New Repair',
      label: 'New Repair',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.new.repair ?? 0,
    },
  ];

  // monthly -> returning
  // monthly -> returning -> bar chart map
  const initialMonthlyReturningBarChartData = new Map<
    CustomerReturningMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['Returning Online', []],
    ['Returning In-Store', []],
    ['Returning Repair', []],
  ]);

  const monthlyReturningBarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyReturningBarChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyReturningOnline = {
          Months: month,
          'Returning Online': customers.returning.sales.online,
        };
        monthlyReturningBarChartAcc
          .get('Returning Online')
          ?.push(monthlyReturningOnline);

        const monthlyReturningInStore = {
          Months: month,
          'Returning In-Store': customers.returning.sales.inStore,
        };
        monthlyReturningBarChartAcc
          .get('Returning In-Store')
          ?.push(monthlyReturningInStore);

        const monthlyReturningRepair = {
          Months: month,
          'Returning Repair': customers.returning.repair,
        };
        monthlyReturningBarChartAcc
          .get('Returning Repair')
          ?.push(monthlyReturningRepair);

        const monthlyReturningTotal = {
          Months: month,
          'Returning Online': customers.returning.sales.online,
          'Returning In-Store': customers.returning.sales.inStore,
          'Returning Repair': customers.returning.repair,
        };
        monthlyReturningBarChartAcc
          .get('Overview')
          ?.push(monthlyReturningTotal);

        return monthlyReturningBarChartAcc;
      },
      initialMonthlyReturningBarChartData
    ) ?? initialMonthlyReturningBarChartData;

  // monthly -> returning -> calendar chart map
  const initialMonthlyReturningCalendarChartData = new Map<
    CustomerReturningMapKey,
    CalendarChartData[]
  >([
    ['Overview', []],
    ['Returning Online', []],
    ['Returning In-Store', []],
    ['Returning Repair', []],
  ]);

  const monthlyReturningCalendarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyReturningCalendarChartAcc, monthlyMetric) => {
        const { dailyMetrics, month } = monthlyMetric;
        const monthNumberStr = (months.indexOf(month) + 1)
          .toString()
          .padStart(2, '0');

        dailyMetrics.forEach((dailyMetric) => {
          const { day, customers } = dailyMetric;

          const monthlyReturningOnline = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.returning.sales.online,
          };
          monthlyReturningCalendarChartAcc
            .get('Returning Online')
            ?.push(monthlyReturningOnline);

          const monthlyReturningInStore = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.returning.sales.inStore,
          };
          monthlyReturningCalendarChartAcc
            .get('Returning In-Store')
            ?.push(monthlyReturningInStore);

          const monthlyReturningRepair = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.returning.repair,
          };
          monthlyReturningCalendarChartAcc
            .get('Returning Repair')
            ?.push(monthlyReturningRepair);

          const monthlyReturningTotal = {
            day: `${selectedYear}-${monthNumberStr}-${day}`,
            value: customers.returning.total,
          };
          monthlyReturningCalendarChartAcc
            .get('Overview')
            ?.push(monthlyReturningTotal);
        });

        return monthlyReturningCalendarChartAcc;
      },
      initialMonthlyReturningCalendarChartData
    ) ?? initialMonthlyReturningCalendarChartData;

  // monthly -> returning -> line chart map
  const initialMonthlyReturningLineChartData = new Map<
    CustomerReturningMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'Returning Online', data: [] },
        { id: 'Returning In-Store', data: [] },
        { id: 'Returning Repair', data: [] },
      ],
    ],
    ['Returning Online', [{ id: 'Returning Online', data: [] }]],
    ['Returning In-Store', [{ id: 'Returning In-Store', data: [] }]],
    ['Returning Repair', [{ id: 'Returning Repair', data: [] }]],
  ]);

  const monthlyReturningLineChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyReturningLineChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyReturningOnline = {
          x: month,
          y: customers.returning.sales.online,
        };
        monthlyReturningLineChartAcc
          .get('Returning Online')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(monthlyReturningOnline);

        const monthlyReturningInStore = {
          x: month,
          y: customers.returning.sales.inStore,
        };
        monthlyReturningLineChartAcc
          .get('Returning In-Store')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(monthlyReturningInStore);

        const monthlyReturningRepair = {
          x: month,
          y: customers.returning.repair,
        };
        monthlyReturningLineChartAcc
          .get('Returning Repair')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(monthlyReturningRepair);

        monthlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(monthlyReturningOnline);
        monthlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(monthlyReturningInStore);
        monthlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(monthlyReturningRepair);

        return monthlyReturningLineChartAcc;
      },
      initialMonthlyReturningLineChartData
    ) ?? initialMonthlyReturningLineChartData;

  // monthly -> returning -> pie chart data
  const monthlyReturningPieChartData: PieChartData[] = [
    {
      id: 'Returning Online',
      label: 'Returning Online',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
          .online ?? 0,
    },
    {
      id: 'Returning In-Store',
      label: 'Returning In-Store',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
          .inStore ?? 0,
    },
    {
      id: 'Returning Repair',
      label: 'Returning Repair',
      value:
        monthCustomerMetrics?.selectedMonthMetrics?.customers.returning
          .repair ?? 0,
    },
  ];

  // monthly -> churn rate and retention rate
  // monthly -> churn rate and retention rate -> bar chart map
  const initialMonthlyChurnRetentionBarChartData = new Map<
    CustomerChurnRetentionMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['Churn Rate', []],
    ['Retention Rate', []],
  ]);

  const monthlyChurnRetentionBarChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyChurnRetentionBarChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyChurnRate = {
          Months: month,
          'Churn Rate': Number(customers.churnRate.toPrecision(3)),
        };
        monthlyChurnRetentionBarChartAcc
          .get('Churn Rate')
          ?.push(monthlyChurnRate);

        const monthlyRetentionRate = {
          Months: month,
          'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
        };
        monthlyChurnRetentionBarChartAcc
          .get('Retention Rate')
          ?.push(monthlyRetentionRate);

        const monthlyChurnRetentionTotal = {
          Months: month,
          'Churn Rate': Number(customers.churnRate.toPrecision(3)),
          'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
        };
        monthlyChurnRetentionBarChartAcc
          .get('Overview')
          ?.push(monthlyChurnRetentionTotal);

        return monthlyChurnRetentionBarChartAcc;
      },
      initialMonthlyChurnRetentionBarChartData
    ) ?? initialMonthlyChurnRetentionBarChartData;

  // monthly -> churn rate and retention rate -> line chart map
  const initialMonthlyChurnRetentionLineChartData = new Map<
    CustomerChurnRetentionMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'Churn Rate', data: [] },
        { id: 'Retention Rate', data: [] },
      ],
    ],
    ['Churn Rate', [{ id: 'Churn Rate', data: [] }]],
    ['Retention Rate', [{ id: 'Retention Rate', data: [] }]],
  ]);

  const monthlyChurnRetentionLineChartMap =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.reduce(
      (monthlyChurnRetentionLineChartAcc, monthlyMetric) => {
        const { month, customers } = monthlyMetric;

        const monthlyChurnRate = {
          x: month,
          y: Number(customers.churnRate.toPrecision(3)),
        };
        monthlyChurnRetentionLineChartAcc
          .get('Churn Rate')
          ?.find((lineChartData) => lineChartData.id === 'Churn Rate')
          ?.data.push(monthlyChurnRate);

        const monthlyRetentionRate = {
          x: month,
          y: Number(customers.retentionRate.toPrecision(3)),
        };
        monthlyChurnRetentionLineChartAcc
          .get('Retention Rate')
          ?.find((lineChartData) => lineChartData.id === 'Retention Rate')
          ?.data.push(monthlyRetentionRate);

        monthlyChurnRetentionLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Churn Rate')
          ?.data.push(monthlyChurnRate);
        monthlyChurnRetentionLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Retention Rate')
          ?.data.push(monthlyRetentionRate);

        return monthlyChurnRetentionLineChartAcc;
      },
      initialMonthlyChurnRetentionLineChartData
    ) ?? initialMonthlyChurnRetentionLineChartData;

  // monthly -> churn rate and retention rate -> pie chart data
  const monthlyChurnRetentionPieChartData: PieChartData[] = [
    {
      id: 'Churn Rate',
      label: 'Churn Rate',
      value: Number(
        monthCustomerMetrics?.selectedMonthMetrics?.customers.churnRate.toPrecision(
          2
        ) ?? '0'
      ),
    },
    {
      id: 'Retention Rate',
      label: 'Retention Rate',
      value: Number(
        monthCustomerMetrics?.selectedMonthMetrics?.customers.retentionRate.toPrecision(
          2
        ) ?? '0'
      ),
    },
  ];

  // yearly
  // yearly -> overview
  // yearly -> overview -> bar chart map
  const initialYearlyOverviewBarChartData = new Map<
    CustomerOverviewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New', []],
    ['Returning', []],
  ]);

  const yearlyOverviewBarChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyOverviewBarChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyOverviewTotal = {
          Years: year,
          New: customers.new.total,
          Returning: customers.returning.total,
        };
        yearlyOverviewBarChartAcc.get('Overview')?.push(yearlyOverviewTotal);

        const yearlyOverviewNew = {
          Years: year,
          New: customers.new.total,
        };
        yearlyOverviewBarChartAcc.get('New')?.push(yearlyOverviewNew);

        const yearlyOverviewReturning = {
          Years: year,
          Returning: customers.returning.total,
        };
        yearlyOverviewBarChartAcc
          .get('Returning')
          ?.push(yearlyOverviewReturning);

        return yearlyOverviewBarChartAcc;
      },
      initialYearlyOverviewBarChartData
    ) ?? initialYearlyOverviewBarChartData;

  // yearly -> overview -> line chart map
  const initialYearlyOverviewLineChartData = new Map<
    CustomerOverviewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New', data: [] },
        { id: 'Returning', data: [] },
      ],
    ],
    ['New', [{ id: 'New', data: [] }]],
    ['Returning', [{ id: 'Returning', data: [] }]],
  ]);

  const yearlyOverviewLineChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyOverviewLineChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyNew = {
          x: year,
          y: customers.new.total,
        };
        yearlyOverviewLineChartAcc
          .get('New')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(yearlyNew);

        const yearlyReturning = {
          x: year,
          y: customers.returning.total,
        };
        yearlyOverviewLineChartAcc
          .get('Returning')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(yearlyReturning);

        yearlyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New')
          ?.data.push(yearlyNew);
        yearlyOverviewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning')
          ?.data.push(yearlyReturning);

        return yearlyOverviewLineChartAcc;
      },
      initialYearlyOverviewLineChartData
    ) ?? initialYearlyOverviewLineChartData;

  // yearly -> overview -> pie chart data
  const yearlyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value: yearCustomerMetrics?.selectedYearMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.returning.total ??
        0,
    },
  ];

  // yearly -> new
  // yearly -> new -> bar chart map
  const initialYearlyNewBarChartData = new Map<
    CustomerNewMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['New Online', []],
    ['New In-Store', []],
    ['New Repair', []],
  ]);

  const yearlyNewBarChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyNewBarChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyNewOnline = {
          Years: year,
          'New Online': customers.new.sales.online,
        };
        yearlyNewBarChartAcc.get('New Online')?.push(yearlyNewOnline);

        const yearlyNewInStore = {
          Years: year,
          'New In-Store': customers.new.sales.inStore,
        };
        yearlyNewBarChartAcc.get('New In-Store')?.push(yearlyNewInStore);

        const yearlyNewRepair = {
          Years: year,
          'New Repair': customers.new.repair,
        };
        yearlyNewBarChartAcc.get('New Repair')?.push(yearlyNewRepair);

        const yearlyNewTotal = {
          Years: year,
          'New Online': customers.new.sales.online,
          'New In-Store': customers.new.sales.inStore,
          'New Repair': customers.new.repair,
        };
        yearlyNewBarChartAcc.get('Overview')?.push(yearlyNewTotal);

        return yearlyNewBarChartAcc;
      },
      initialYearlyNewBarChartData
    ) ?? initialYearlyNewBarChartData;

  // yearly -> new -> line chart map
  const initialYearlyNewLineChartData = new Map<
    CustomerNewMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'New Online', data: [] },
        { id: 'New In-Store', data: [] },
        { id: 'New Repair', data: [] },
      ],
    ],
    ['New Online', [{ id: 'New Online', data: [] }]],
    ['New In-Store', [{ id: 'New In-Store', data: [] }]],
    ['New Repair', [{ id: 'New Repair', data: [] }]],
  ]);

  const yearlyNewLineChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyNewLineChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyNewOnline = {
          x: year,
          y: customers.new.sales.online,
        };
        yearlyNewLineChartAcc
          .get('New Online')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(yearlyNewOnline);

        const yearlyNewInStore = {
          x: year,
          y: customers.new.sales.inStore,
        };
        yearlyNewLineChartAcc
          .get('New In-Store')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(yearlyNewInStore);

        const yearlyNewRepair = {
          x: year,
          y: customers.new.repair,
        };
        yearlyNewLineChartAcc
          .get('New Repair')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(yearlyNewRepair);

        yearlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Online')
          ?.data.push(yearlyNewOnline);
        yearlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New In-Store')
          ?.data.push(yearlyNewInStore);
        yearlyNewLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'New Repair')
          ?.data.push(yearlyNewRepair);

        return yearlyNewLineChartAcc;
      },
      initialYearlyNewLineChartData
    ) ?? initialYearlyNewLineChartData;

  // yearly -> new -> pie chart data
  const yearlyNewPieChartData: PieChartData[] = [
    {
      id: 'New Online',
      label: 'New Online',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.online ??
        0,
    },
    {
      id: 'New In-Store',
      label: 'New In-Store',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.inStore ??
        0,
    },
    {
      id: 'New Repair',
      label: 'New Repair',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.new.repair ?? 0,
    },
  ];

  // yearly -> returning
  // yearly -> returning -> bar chart map
  const initialYearlyReturningBarChartData = new Map<
    CustomerReturningMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['Returning Online', []],
    ['Returning In-Store', []],
    ['Returning Repair', []],
  ]);

  const yearlyReturningBarChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyReturningBarChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyReturningOnline = {
          Years: year,
          'Returning Online': customers.returning.sales.online,
        };
        yearlyReturningBarChartAcc
          .get('Returning Online')
          ?.push(yearlyReturningOnline);

        const yearlyReturningInStore = {
          Years: year,
          'Returning In-Store': customers.returning.sales.inStore,
        };
        yearlyReturningBarChartAcc
          .get('Returning In-Store')
          ?.push(yearlyReturningInStore);

        const yearlyReturningRepair = {
          Years: year,
          'Returning Repair': customers.returning.repair,
        };
        yearlyReturningBarChartAcc
          .get('Returning Repair')
          ?.push(yearlyReturningRepair);

        const yearlyReturningTotal = {
          Years: year,
          'Returning Online': customers.returning.sales.online,
          'Returning In-Store': customers.returning.sales.inStore,
          'Returning Repair': customers.returning.repair,
        };
        yearlyReturningBarChartAcc.get('Overview')?.push(yearlyReturningTotal);

        return yearlyReturningBarChartAcc;
      },
      initialYearlyReturningBarChartData
    ) ?? initialYearlyReturningBarChartData;

  // yearly -> returning -> line chart map
  const initialYearlyReturningLineChartData = new Map<
    CustomerReturningMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'Returning Online', data: [] },
        { id: 'Returning In-Store', data: [] },
        { id: 'Returning Repair', data: [] },
      ],
    ],
    ['Returning Online', [{ id: 'Returning Online', data: [] }]],
    ['Returning In-Store', [{ id: 'Returning In-Store', data: [] }]],
    ['Returning Repair', [{ id: 'Returning Repair', data: [] }]],
  ]);

  const yearlyReturningLineChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyReturningLineChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyReturningOnline = {
          x: year,
          y: customers.returning.sales.online,
        };
        yearlyReturningLineChartAcc
          .get('Returning Online')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(yearlyReturningOnline);

        const yearlyReturningInStore = {
          x: year,
          y: customers.returning.sales.inStore,
        };
        yearlyReturningLineChartAcc
          .get('Returning In-Store')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(yearlyReturningInStore);

        const yearlyReturningRepair = {
          x: year,
          y: customers.returning.repair,
        };
        yearlyReturningLineChartAcc
          .get('Returning Repair')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(yearlyReturningRepair);

        yearlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Online')
          ?.data.push(yearlyReturningOnline);
        yearlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning In-Store')
          ?.data.push(yearlyReturningInStore);
        yearlyReturningLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Returning Repair')
          ?.data.push(yearlyReturningRepair);

        return yearlyReturningLineChartAcc;
      },
      initialYearlyReturningLineChartData
    ) ?? initialYearlyReturningLineChartData;

  // yearly -> returning -> pie chart data
  const yearlyReturningPieChartData: PieChartData[] = [
    {
      id: 'Returning Online',
      label: 'Returning Online',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
          .online ?? 0,
    },
    {
      id: 'Returning In-Store',
      label: 'Returning In-Store',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
          .inStore ?? 0,
    },
    {
      id: 'Returning Repair',
      label: 'Returning Repair',
      value:
        yearCustomerMetrics?.selectedYearMetrics?.customers.returning.repair ??
        0,
    },
  ];

  // yearly -> churn rate and retention rate
  // yearly -> churn rate and retention rate -> bar chart map
  const initialYearlyChurnRetentionBarChartData = new Map<
    CustomerChurnRetentionMapKey,
    BarChartData[]
  >([
    ['Overview', []],
    ['Churn Rate', []],
    ['Retention Rate', []],
  ]);

  const yearlyChurnRetentionBarChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyChurnRetentionBarChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyChurnRate = {
          Years: year,
          'Churn Rate': Number(customers.churnRate.toPrecision(3)),
        };
        yearlyChurnRetentionBarChartAcc
          .get('Churn Rate')
          ?.push(yearlyChurnRate);

        const yearlyRetentionRate = {
          Years: year,
          'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
        };
        yearlyChurnRetentionBarChartAcc
          .get('Retention Rate')
          ?.push(yearlyRetentionRate);

        const yearlyChurnRetentionTotal = {
          Years: year,
          'Churn Rate': Number(customers.churnRate.toPrecision(3)),
          'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
        };
        yearlyChurnRetentionBarChartAcc
          .get('Overview')
          ?.push(yearlyChurnRetentionTotal);

        return yearlyChurnRetentionBarChartAcc;
      },
      initialYearlyChurnRetentionBarChartData
    ) ?? initialYearlyChurnRetentionBarChartData;

  // yearly -> churn rate and retention rate -> line chart map
  const initialYearlyChurnRetentionLineChartData = new Map<
    CustomerChurnRetentionMapKey,
    LineChartData[]
  >([
    [
      'Overview',
      [
        { id: 'Churn Rate', data: [] },
        { id: 'Retention Rate', data: [] },
      ],
    ],
    ['Churn Rate', [{ id: 'Churn Rate', data: [] }]],
    ['Retention Rate', [{ id: 'Retention Rate', data: [] }]],
  ]);

  const yearlyChurnRetentionLineChartMap =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
      (yearlyChurnRetentionLineChartAcc, yearlyMetric) => {
        const { year, customers } = yearlyMetric;

        const yearlyChurnRate = {
          x: year,
          y: Number(customers.churnRate.toPrecision(3)),
        };
        yearlyChurnRetentionLineChartAcc
          .get('Churn Rate')
          ?.find((lineChartData) => lineChartData.id === 'Churn Rate')
          ?.data.push(yearlyChurnRate);

        const yearlyRetentionRate = {
          x: year,
          y: Number(customers.retentionRate.toPrecision(3)),
        };
        yearlyChurnRetentionLineChartAcc
          .get('Retention Rate')
          ?.find((lineChartData) => lineChartData.id === 'Retention Rate')
          ?.data.push(yearlyRetentionRate);

        yearlyChurnRetentionLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Churn Rate')
          ?.data.push(yearlyChurnRate);
        yearlyChurnRetentionLineChartAcc
          .get('Overview')
          ?.find((lineChartData) => lineChartData.id === 'Retention Rate')
          ?.data.push(yearlyRetentionRate);

        return yearlyChurnRetentionLineChartAcc;
      },
      initialYearlyChurnRetentionLineChartData
    ) ?? initialYearlyChurnRetentionLineChartData;

  // yearly -> churn rate and retention rate -> pie chart data
  const yearlyChurnRetentionPieChartData: PieChartData[] = [
    {
      id: 'Churn Rate',
      label: 'Churn Rate',
      value: Number(
        yearCustomerMetrics?.selectedYearMetrics?.customers.churnRate.toPrecision(
          2
        ) ?? '0'
      ),
    },
    {
      id: 'Retention Rate',
      label: 'Retention Rate',
      value: Number(
        yearCustomerMetrics?.selectedYearMetrics?.customers.retentionRate.toPrecision(
          2
        ) ?? '0'
      ),
    },
  ];

  return {
    dailyCharts: {
      overview: {
        barChartsMap: dailyOverviewBarChartsMap,
        lineChartsMap: dailyOverviewLineChartMap,
        pieChartData: dailyOverviewPieChartData,
        calendarChartsMap: dailyOverviewCalendarChartsMap,
      },
      new: {
        barChartsMap: dailyNewBarChartMap,
        lineChartsMap: dailyNewLineChartMap,
        pieChartData: dailyNewPieChartData,
        calendarChartsMap: dailyNewCalendarChartMap,
      },
      returning: {
        barChartsMap: dailyReturningBarChartMap,
        lineChartsMap: dailyReturningLineChartMap,
        pieChartData: dailyReturningPieChartData,
        calendarChartsMap: dailyReturningCalendarChartMap,
      },
    },
    monthlyCharts: {
      overview: {
        barChartsMap: monthlyOverviewBarChartMap,
        lineChartsMap: monthlyOverviewLineChartMap,
        pieChartData: monthlyOverviewPieChartData,
        calendarChartsMap: monthlyOverviewCalendarChartMap,
      },
      new: {
        barChartsMap: monthlyNewBarChartMap,
        lineChartsMap: monthlyNewLineChartMap,
        pieChartData: monthlyNewPieChartData,
        calendarChartsMap: monthlyNewCalendarChartMap,
      },
      returning: {
        barChartsMap: monthlyReturningBarChartMap,
        lineChartsMap: monthlyReturningLineChartMap,
        pieChartData: monthlyReturningPieChartData,
        calendarChartsMap: monthlyReturningCalendarChartMap,
      },
      churnRetention: {
        barChartsMap: monthlyChurnRetentionBarChartMap,
        lineChartsMap: monthlyChurnRetentionLineChartMap,
        pieChartData: monthlyChurnRetentionPieChartData,
      },
    },
    yearlyCharts: {
      overview: {
        barChartsMap: yearlyOverviewBarChartMap,
        lineChartsMap: yearlyOverviewLineChartMap,
        pieChartData: yearlyOverviewPieChartData,
      },
      new: {
        barChartsMap: yearlyNewBarChartMap,
        lineChartsMap: yearlyNewLineChartMap,
        pieChartData: yearlyNewPieChartData,
      },
      returning: {
        barChartsMap: yearlyReturningBarChartMap,
        lineChartsMap: yearlyReturningLineChartMap,
        pieChartData: yearlyReturningPieChartData,
      },
      churnRetention: {
        barChartsMap: yearlyChurnRetentionBarChartMap,
        lineChartsMap: yearlyChurnRetentionLineChartMap,
        pieChartData: yearlyChurnRetentionPieChartData,
      },
    },
  };
}

export { returnCustomerChartsData, returnSelectedDateCustomerMetrics };
export type {
  CustomerChurnRetentionMapKey,
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
};
