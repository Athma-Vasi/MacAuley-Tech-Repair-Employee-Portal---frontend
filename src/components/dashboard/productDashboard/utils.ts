import { BarChartData } from '../../charts/responsiveBarChart/types';
import { CalendarChartData } from '../../charts/responsiveCalendarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import { PieChartData } from '../../charts/responsivePieChart/types';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  Month,
  ProductCategory,
  ProductDailyMetric,
  ProductMonthlyMetric,
  ProductYearlyMetric,
  Year,
} from '../types';

type SelectedDateProductMetrics = {
  dayProductMetrics: {
    selectedDayMetrics?: ProductDailyMetric;
    prevDayMetrics?: ProductDailyMetric;
  };
  monthProductMetrics: {
    selectedMonthMetrics?: ProductMonthlyMetric;
    prevMonthMetrics?: ProductMonthlyMetric;
  };
  yearProductMetrics: {
    selectedYearMetrics?: ProductYearlyMetric;
    prevYearMetrics?: ProductYearlyMetric;
  };
};

function returnSelectedDateProductMetrics({
  businessMetrics,
  day,
  month,
  months,
  selectedProductCategory,
  storeLocation,
  year,
}: {
  businessMetrics: BusinessMetric[];
  day: string;
  month: Month;
  months: Month[];
  selectedProductCategory: ProductCategory;
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
}): SelectedDateProductMetrics {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' product category
  const selectedProductMetrics = currentStoreMetrics?.productMetrics.find(
    (productMetric) => productMetric.name === selectedProductCategory
  );

  // selected year's product metrics
  const selectedYearMetrics = selectedProductMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === year
  );
  const prevYearMetrics = selectedProductMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === (parseInt(year) - 1).toString()
  );

  const yearProductMetrics = {
    selectedYearMetrics,
    prevYearMetrics,
  };

  // selected month's product metrics
  const selectedMonthMetrics = selectedYearMetrics?.monthlyMetrics.find(
    (monthlyMetric) => monthlyMetric.month === month
  );
  const prevPrevYearMetrics = selectedProductMetrics?.yearlyMetrics.find(
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

  const monthProductMetrics = {
    selectedMonthMetrics,
    prevMonthMetrics,
  };

  // selected day's product metrics
  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );

  const prevDayMetrics =
    day === '01'
      ? monthProductMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '31'
        ) ??
        monthProductMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '30'
        ) ??
        monthProductMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '29'
        ) ??
        monthProductMetrics.prevMonthMetrics?.dailyMetrics.find(
          (dailyMetric) => dailyMetric.day === '28'
        )
      : selectedMonthMetrics?.dailyMetrics.find(
          (dailyMetric) =>
            dailyMetric.day === (parseInt(day) - 1).toString().padStart(2, '0')
        );

  const dayProductMetrics = {
    selectedDayMetrics,
    prevDayMetrics,
  };

  return {
    dayProductMetrics,
    monthProductMetrics,
    yearProductMetrics,
  };
}

type ReturnProductChartsDataInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedProductCategory: ProductCategory;
  selectedProductMetrics: SelectedDateProductMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type ProductMetricChartObjKey =
  | 'total' // y-axis variables: total
  | 'overview' // y-axis variables: online, inStore
  | 'online' // y-axis variables: online
  | 'inStore'; // y-axis variables: inStore

type ProductMetricBarObj = Record<ProductMetricChartObjKey, BarChartData[]>; // y-axis variables: total, online, inStore

type ProductMetricCalendarObj = Record<
  ProductMetricChartObjKey,
  CalendarChartData[]
>; // y-axis variables: total, online, inStore

type ProductMetricLineObj = {
  total: { id: 'Total'; data: { x: string; y: number }[] }[];
  overview: {
    id: 'Online' | 'In-Store';
    data: { x: string; y: number }[];
  }[];
  online: { id: 'Online'; data: { x: string; y: number }[] }[];
  inStore: { id: 'In-Store'; data: { x: string; y: number }[] }[];
};

/**
 * monthlyMetrics: {
    month: string;
    transactions: {
      total: number;
      online: number;
      inStore: number;
    };
    revenue: {
      total: number;
      online: number;
      inStore: number;
    }
    dailyMetrics: {
      day: string;
      transactions: {
        total: number;
        online: number;
        inStore: number;
      };
      revenue: {
        total: number;
        online: number;
        inStore: number;
      };
    }[];
  }[];
 */

type ReturnProductChartsDataOutput = {
  dailyCharts: {
    transactions: {
      barChartsObj: ProductMetricBarObj;
      calendarChartsObj: ProductMetricCalendarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
    revenue: {
      barChartsObj: ProductMetricBarObj;
      calendarChartsObj: ProductMetricCalendarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
  };
  monthlyCharts: {
    transactions: {
      barChartsObj: ProductMetricBarObj;
      calendarChartsObj: ProductMetricCalendarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
    revenue: {
      barChartsObj: ProductMetricBarObj;
      calendarChartsObj: ProductMetricCalendarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
  };
  yearlyCharts: {
    transactions: {
      barChartsObj: ProductMetricBarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
    revenue: {
      barChartsObj: ProductMetricBarObj;
      lineChartsObj: ProductMetricLineObj;
      pieChartObj: PieChartData[];
    };
  };
};

function returnProductChartsData({
  businessMetrics,
  months,
  selectedProductCategory,
  selectedProductMetrics,
  storeLocation,
}: ReturnProductChartsDataInput): ReturnProductChartsDataOutput {
  // selected year's metrics
  const {
    yearProductMetrics: { selectedYearMetrics },
  } = selectedProductMetrics;
  const selectedYear = selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const {
    monthProductMetrics: { selectedMonthMetrics },
  } = selectedProductMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // selected day's metrics
  const {
    dayProductMetrics: { selectedDayMetrics },
  } = selectedProductMetrics;

  // templates

  // templates -> bar chart data
  const BAR_CHART_OBJ_TEMPLATE: ProductMetricBarObj = {
    total: [],
    overview: [],
    online: [],
    inStore: [],
  };

  // templates -> calendar chart data
  const CALENDAR_CHART_OBJ_TEMPLATE: ProductMetricCalendarObj = {
    total: [],
    overview: [],
    online: [],
    inStore: [],
  };

  // templates -> line chart data
  const LINE_CHART_OBJ_TEMPLATE: ProductMetricLineObj = {
    total: [{ id: 'Total', data: [] }],
    overview: [
      { id: 'Online', data: [] },
      { id: 'In-Store', data: [] },
    ],
    online: [{ id: 'Online', data: [] }],
    inStore: [{ id: 'In-Store', data: [] }],
  };

  // daily charts

  // daily charts -> transactions

  // daily charts -> transactions -> bar chart obj
  const initialDailyTransactionsBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> transactions -> calendar chart obj
  const initialDailyTransactionsCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> transactions -> -> line chart obj
  const initialDailyTransactionsLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // daily charts -> transactions -> -> pie chart obj
  const dailyTransactionsPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedDayMetrics?.transactions.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedDayMetrics?.transactions.online ?? 0,
    },
  ];

  // daily charts -> revenue

  // daily charts -> revenue -> bar chart obj
  const initialDailyRevenueBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> revenue -> calendar chart obj
  const initialDailyRevenueCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> revenue -> -> line chart obj
  const initialDailyRevenueLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // daily charts -> revenue -> -> pie chart obj
  const dailyRevenuePieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedDayMetrics?.revenue.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedDayMetrics?.revenue.online ?? 0,
    },
  ];

  // daily charts

  const [
    // transactions
    dailyTransactionsBarChartsObj,
    dailyTransactionsCalendarChartsObj,
    dailyTransactionsLineChartsObj,
    // revenue
    dailyRevenueBarChartsObj,
    dailyRevenueCalendarChartsObj,
    dailyRevenueLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyProductChartsAcc, dailyProductMetrics) => {
      const [
        // transactions
        dailyTransactionsBarChartsObjAcc,
        dailyTransactionsCalendarChartsObjAcc,
        dailyTransactionsLineChartsObjAcc,
        // revenue
        dailyRevenueBarChartsObjAcc,
        dailyRevenueCalendarChartsObjAcc,
        dailyRevenueLineChartsObjAcc,
      ] = dailyProductChartsAcc;

      const { day, transactions, revenue } = dailyProductMetrics;

      // transactions

      // transactions -> bar chart obj

      // transactions -> bar chart obj -> total
      const dailyTransactionsTotalBarChartObj: BarChartData = {
        Days: day,
        Total: transactions.total,
      };
      dailyTransactionsBarChartsObjAcc.total.push(
        dailyTransactionsTotalBarChartObj
      );

      // transactions -> bar chart obj -> overview
      const dailyTransactionsOverviewBarChartObj: BarChartData = {
        Days: day,
        'In-Store': transactions.inStore,
        Online: transactions.online,
      };
      dailyTransactionsBarChartsObjAcc.overview.push(
        dailyTransactionsOverviewBarChartObj
      );

      // transactions -> bar chart obj -> online
      const dailyTransactionsOnlineBarChartObj: BarChartData = {
        Days: day,
        Online: transactions.online,
      };
      dailyTransactionsBarChartsObjAcc.online.push(
        dailyTransactionsOnlineBarChartObj
      );

      // transactions -> bar chart obj -> inStore
      const dailyTransactionsInStoreBarChartObj: BarChartData = {
        Days: day,
        'In-Store': transactions.inStore,
      };
      dailyTransactionsBarChartsObjAcc.inStore.push(
        dailyTransactionsInStoreBarChartObj
      );

      // transactions -> calendar chart obj

      // transactions -> calendar chart obj -> total
      const dailyTransactionsTotalCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions.total,
      };
      dailyTransactionsCalendarChartsObjAcc.total.push(
        dailyTransactionsTotalCalendarChartObj
      );

      // transactions -> calendar chart obj -> overview
      const dailyTransactionsOverviewCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions.inStore + transactions.online,
      };
      dailyTransactionsCalendarChartsObjAcc.overview.push(
        dailyTransactionsOverviewCalendarChartObj
      );

      // transactions -> calendar chart obj -> online
      const dailyTransactionsOnlineCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions.online,
      };
      dailyTransactionsCalendarChartsObjAcc.online.push(
        dailyTransactionsOnlineCalendarChartObj
      );

      // transactions -> calendar chart obj -> inStore
      const dailyTransactionsInStoreCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: transactions.inStore,
      };
      dailyTransactionsCalendarChartsObjAcc.inStore.push(
        dailyTransactionsInStoreCalendarChartObj
      );

      // transactions -> line chart obj

      // transactions -> line chart obj -> total
      const dailyTransactionsTotalLineChartObj = {
        x: day,
        y: transactions.total,
      };
      dailyTransactionsLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(dailyTransactionsTotalLineChartObj);

      // transactions -> line chart obj -> overview -> online
      const dailyTransactionsOverviewOnlineLineChartObj = {
        x: day,
        y: transactions.online,
      };
      dailyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyTransactionsOverviewOnlineLineChartObj);

      // transactions -> line chart obj -> overview -> inStore
      const dailyTransactionsOverviewInStoreLineChartObj = {
        x: day,
        y: transactions.inStore,
      };
      dailyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyTransactionsOverviewInStoreLineChartObj);

      // transactions -> line chart obj -> online
      const dailyTransactionsOnlineLineChartObj = {
        x: day,
        y: transactions.online,
      };
      dailyTransactionsLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyTransactionsOnlineLineChartObj);

      // transactions -> line chart obj -> inStore
      const dailyTransactionsInStoreLineChartObj = {
        x: day,
        y: transactions.inStore,
      };
      dailyTransactionsLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyTransactionsInStoreLineChartObj);

      // revenue

      // revenue -> bar chart obj

      // revenue -> bar chart obj -> total
      const dailyRevenueTotalBarChartObj: BarChartData = {
        Days: day,
        Total: revenue.total,
      };
      dailyRevenueBarChartsObjAcc.total.push(dailyRevenueTotalBarChartObj);

      // revenue -> bar chart obj -> overview
      const dailyRevenueOverviewBarChartObj: BarChartData = {
        Days: day,
        'In-Store': revenue.inStore,
        Online: revenue.online,
      };
      dailyRevenueBarChartsObjAcc.overview.push(
        dailyRevenueOverviewBarChartObj
      );

      // revenue -> bar chart obj -> online
      const dailyRevenueOnlineBarChartObj: BarChartData = {
        Days: day,
        Online: revenue.online,
      };
      dailyRevenueBarChartsObjAcc.online.push(dailyRevenueOnlineBarChartObj);

      // revenue -> bar chart obj -> inStore
      const dailyRevenueInStoreBarChartObj: BarChartData = {
        Days: day,
        'In-Store': revenue.inStore,
      };
      dailyRevenueBarChartsObjAcc.inStore.push(dailyRevenueInStoreBarChartObj);

      // revenue -> calendar chart obj

      // revenue -> calendar chart obj -> total
      const dailyRevenueTotalCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue.total,
      };
      dailyRevenueCalendarChartsObjAcc.total.push(
        dailyRevenueTotalCalendarChartObj
      );

      // revenue -> calendar chart obj -> overview
      const dailyRevenueOverviewCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue.inStore + revenue.online,
      };
      dailyRevenueCalendarChartsObjAcc.overview.push(
        dailyRevenueOverviewCalendarChartObj
      );

      // revenue -> calendar chart obj -> online
      const dailyRevenueOnlineCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue.online,
      };
      dailyRevenueCalendarChartsObjAcc.online.push(
        dailyRevenueOnlineCalendarChartObj
      );

      // revenue -> calendar chart obj -> inStore
      const dailyRevenueInStoreCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: revenue.inStore,
      };
      dailyRevenueCalendarChartsObjAcc.inStore.push(
        dailyRevenueInStoreCalendarChartObj
      );

      // revenue -> line chart obj

      // revenue -> line chart obj -> total
      const dailyRevenueTotalLineChartObj = {
        x: day,
        y: revenue.total,
      };
      dailyRevenueLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(dailyRevenueTotalLineChartObj);

      // revenue -> line chart obj -> overview -> online
      const dailyRevenueOverviewOnlineLineChartObj = {
        x: day,
        y: revenue.online,
      };
      dailyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyRevenueOverviewOnlineLineChartObj);

      // revenue -> line chart obj -> overview -> inStore
      const dailyRevenueOverviewInStoreLineChartObj = {
        x: day,
        y: revenue.inStore,
      };
      dailyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyRevenueOverviewInStoreLineChartObj);

      // revenue -> line chart obj -> online
      const dailyRevenueOnlineLineChartObj = {
        x: day,
        y: revenue.online,
      };
      dailyRevenueLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyRevenueOnlineLineChartObj);

      // revenue -> line chart obj -> inStore
      const dailyRevenueInStoreLineChartObj = {
        x: day,
        y: revenue.inStore,
      };
      dailyRevenueLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyRevenueInStoreLineChartObj);

      return dailyProductChartsAcc;
    },
    [
      // transactions
      initialDailyTransactionsBarChartsObj,
      initialDailyTransactionsCalendarChartsObj,
      initialDailyTransactionsLineChartsObj,
      // revenue
      initialDailyRevenueBarChartsObj,
      initialDailyRevenueCalendarChartsObj,
      initialDailyRevenueLineChartsObj,
    ]
  ) ?? [
    // transactions
    initialDailyTransactionsBarChartsObj,
    initialDailyTransactionsCalendarChartsObj,
    initialDailyTransactionsLineChartsObj,
    // revenue
    initialDailyRevenueBarChartsObj,
    initialDailyRevenueCalendarChartsObj,
    initialDailyRevenueLineChartsObj,
  ];

  // monthly charts

  // monthly charts -> transactions

  // monthly charts -> transactions -> bar chart obj
  const initialMonthlyTransactionsBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> transactions -> calendar chart obj
  const initialMonthlyTransactionsCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> transactions -> -> line chart obj
  const initialMonthlyTransactionsLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> transactions -> -> pie chart obj
  const monthlyTransactionsPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedMonthMetrics?.transactions.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedMonthMetrics?.transactions.online ?? 0,
    },
  ];

  // monthly charts -> revenue

  // monthly charts -> revenue -> bar chart obj
  const initialMonthlyRevenueBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> revenue -> calendar chart obj
  const initialMonthlyRevenueCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> revenue -> -> line chart obj
  const initialMonthlyRevenueLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> revenue -> -> pie chart obj
  const monthlyRevenuePieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedMonthMetrics?.revenue.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedMonthMetrics?.revenue.online ?? 0,
    },
  ];

  // monthly charts

  const [
    // transactions
    monthlyTransactionsBarChartsObj,
    monthlyTransactionsCalendarChartsObj,
    monthlyTransactionsLineChartsObj,
    // revenue
    monthlyRevenueBarChartsObj,
    monthlyRevenueCalendarChartsObj,
    monthlyRevenueLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyProductChartsAcc, monthlyProductMetrics) => {
      const [
        // transactions
        monthlyTransactionsBarChartsObjAcc,
        monthlyTransactionsCalendarChartsObjAcc,
        monthlyTransactionsLineChartsObjAcc,
        // revenue
        monthlyRevenueBarChartsObjAcc,
        monthlyRevenueCalendarChartsObjAcc,
        monthlyRevenueLineChartsObjAcc,
      ] = monthlyProductChartsAcc;

      const { month, transactions, revenue, dailyMetrics } =
        monthlyProductMetrics;
      const monthNumberStr = (months.indexOf(month) + 1)
        .toString()
        .padStart(2, '0');

      // prevents current month from being added to charts
      const currentMonth = new Date().toLocaleString('default', {
        month: 'long',
      });
      if (month === currentMonth) {
        return monthlyProductChartsAcc;
      }

      // transactions

      // transactions -> bar chart obj

      // transactions -> bar chart obj -> total
      const monthlyTransactionsTotalBarChartObj: BarChartData = {
        Months: month,
        Total: transactions.total,
      };
      monthlyTransactionsBarChartsObjAcc.total.push(
        monthlyTransactionsTotalBarChartObj
      );

      // transactions -> bar chart obj -> overview
      const monthlyTransactionsOverviewBarChartObj: BarChartData = {
        Months: month,
        'In-Store': transactions.inStore,
        Online: transactions.online,
      };
      monthlyTransactionsBarChartsObjAcc.overview.push(
        monthlyTransactionsOverviewBarChartObj
      );

      // transactions -> bar chart obj -> online
      const monthlyTransactionsOnlineBarChartObj: BarChartData = {
        Months: month,
        Online: transactions.online,
      };
      monthlyTransactionsBarChartsObjAcc.online.push(
        monthlyTransactionsOnlineBarChartObj
      );

      // transactions -> bar chart obj -> inStore
      const monthlyTransactionsInStoreBarChartObj: BarChartData = {
        Months: month,
        'In-Store': transactions.inStore,
      };
      monthlyTransactionsBarChartsObjAcc.inStore.push(
        monthlyTransactionsInStoreBarChartObj
      );

      // transactions -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, transactions } = dailyMetric;

        // transactions -> calendar chart obj -> total
        const monthlyTransactionsTotalCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions.total,
        };
        monthlyTransactionsCalendarChartsObjAcc.total.push(
          monthlyTransactionsTotalCalendarChartObj
        );

        // transactions -> calendar chart obj -> overview
        const monthlyTransactionsOverviewCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions.inStore + transactions.online,
        };
        monthlyTransactionsCalendarChartsObjAcc.overview.push(
          monthlyTransactionsOverviewCalendarChartObj
        );

        // transactions -> calendar chart obj -> online
        const monthlyTransactionsOnlineCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions.online,
        };
        monthlyTransactionsCalendarChartsObjAcc.online.push(
          monthlyTransactionsOnlineCalendarChartObj
        );

        // transactions -> calendar chart obj -> inStore
        const monthlyTransactionsInStoreCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: transactions.inStore,
        };
        monthlyTransactionsCalendarChartsObjAcc.inStore.push(
          monthlyTransactionsInStoreCalendarChartObj
        );
      });

      // transactions -> line chart obj

      // transactions -> line chart obj -> total
      const monthlyTransactionsTotalLineChartObj = {
        x: month,
        y: transactions.total,
      };
      monthlyTransactionsLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(monthlyTransactionsTotalLineChartObj);

      // transactions -> line chart obj -> overview -> online
      const monthlyTransactionsOverviewOnlineLineChartObj = {
        x: month,
        y: transactions.online,
      };
      monthlyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyTransactionsOverviewOnlineLineChartObj);

      // transactions -> line chart obj -> overview -> inStore
      const monthlyTransactionsOverviewInStoreLineChartObj = {
        x: month,
        y: transactions.inStore,
      };
      monthlyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyTransactionsOverviewInStoreLineChartObj);

      // transactions -> line chart obj -> online
      const monthlyTransactionsOnlineLineChartObj = {
        x: month,
        y: transactions.online,
      };
      monthlyTransactionsLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyTransactionsOnlineLineChartObj);

      // transactions -> line chart obj -> inStore
      const monthlyTransactionsInStoreLineChartObj = {
        x: month,
        y: transactions.inStore,
      };
      monthlyTransactionsLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyTransactionsInStoreLineChartObj);

      // revenue

      // revenue -> bar chart obj

      // revenue -> bar chart obj -> total
      const monthlyRevenueTotalBarChartObj: BarChartData = {
        Months: month,
        Total: revenue.total,
      };
      monthlyRevenueBarChartsObjAcc.total.push(monthlyRevenueTotalBarChartObj);

      // revenue -> bar chart obj -> overview
      const monthlyRevenueOverviewBarChartObj: BarChartData = {
        Months: month,
        'In-Store': revenue.inStore,
        Online: revenue.online,
      };
      monthlyRevenueBarChartsObjAcc.overview.push(
        monthlyRevenueOverviewBarChartObj
      );

      // revenue -> bar chart obj -> online
      const monthlyRevenueOnlineBarChartObj: BarChartData = {
        Months: month,
        Online: revenue.online,
      };
      monthlyRevenueBarChartsObjAcc.online.push(
        monthlyRevenueOnlineBarChartObj
      );

      // revenue -> bar chart obj -> inStore
      const monthlyRevenueInStoreBarChartObj: BarChartData = {
        Months: month,
        'In-Store': revenue.inStore,
      };
      monthlyRevenueBarChartsObjAcc.inStore.push(
        monthlyRevenueInStoreBarChartObj
      );

      // revenue -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, revenue } = dailyMetric;

        // revenue -> calendar chart obj -> total
        const monthlyRevenueTotalCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue.total,
        };
        monthlyRevenueCalendarChartsObjAcc.total.push(
          monthlyRevenueTotalCalendarChartObj
        );

        // revenue -> calendar chart obj -> overview
        const monthlyRevenueOverviewCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue.inStore + revenue.online,
        };
        monthlyRevenueCalendarChartsObjAcc.overview.push(
          monthlyRevenueOverviewCalendarChartObj
        );

        // revenue -> calendar chart obj -> online
        const monthlyRevenueOnlineCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue.online,
        };
        monthlyRevenueCalendarChartsObjAcc.online.push(
          monthlyRevenueOnlineCalendarChartObj
        );

        // revenue -> calendar chart obj -> inStore
        const monthlyRevenueInStoreCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: revenue.inStore,
        };
        monthlyRevenueCalendarChartsObjAcc.inStore.push(
          monthlyRevenueInStoreCalendarChartObj
        );
      });

      // revenue -> line chart obj

      // revenue -> line chart obj -> total
      const monthlyRevenueTotalLineChartObj = {
        x: month,
        y: revenue.total,
      };
      monthlyRevenueLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(monthlyRevenueTotalLineChartObj);

      // revenue -> line chart obj -> overview -> online
      const monthlyRevenueOverviewOnlineLineChartObj = {
        x: month,
        y: revenue.online,
      };
      monthlyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyRevenueOverviewOnlineLineChartObj);

      // revenue -> line chart obj -> overview -> inStore
      const monthlyRevenueOverviewInStoreLineChartObj = {
        x: month,
        y: revenue.inStore,
      };
      monthlyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyRevenueOverviewInStoreLineChartObj);

      // revenue -> line chart obj -> online
      const monthlyRevenueOnlineLineChartObj = {
        x: month,
        y: revenue.online,
      };
      monthlyRevenueLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyRevenueOnlineLineChartObj);

      // revenue -> line chart obj -> inStore
      const monthlyRevenueInStoreLineChartObj = {
        x: month,
        y: revenue.inStore,
      };
      monthlyRevenueLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyRevenueInStoreLineChartObj);

      return monthlyProductChartsAcc;
    },
    [
      // transactions
      initialMonthlyTransactionsBarChartsObj,
      initialMonthlyTransactionsCalendarChartsObj,
      initialMonthlyTransactionsLineChartsObj,
      // revenue
      initialMonthlyRevenueBarChartsObj,
      initialMonthlyRevenueCalendarChartsObj,
      initialMonthlyRevenueLineChartsObj,
    ]
  ) ?? [
    // transactions
    initialMonthlyTransactionsBarChartsObj,
    initialMonthlyTransactionsCalendarChartsObj,
    initialMonthlyTransactionsLineChartsObj,
    // revenue
    initialMonthlyRevenueBarChartsObj,
    initialMonthlyRevenueCalendarChartsObj,
    initialMonthlyRevenueLineChartsObj,
  ];

  // yearly charts

  // yearly charts -> transactions

  // yearly charts -> transactions -> bar chart obj
  const initialYearlyTransactionsBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> transactions -> -> line chart obj
  const initialYearlyTransactionsLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> transactions -> -> pie chart obj
  const yearlyTransactionsPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedYearMetrics?.transactions.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedYearMetrics?.transactions.online ?? 0,
    },
  ];

  // yearly charts -> revenue

  // yearly charts -> revenue -> bar chart obj
  const initialYearlyRevenueBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> revenue -> -> line chart obj
  const initialYearlyRevenueLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> revenue -> -> pie chart obj
  const yearlyRevenuePieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedYearMetrics?.revenue.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedYearMetrics?.revenue.online ?? 0,
    },
  ];

  // yearly charts

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' product category
  const productMetrics = currentStoreMetrics?.productMetrics.find(
    (productMetric) => productMetric.name === selectedProductCategory
  );

  const [
    // transactions
    yearlyTransactionsBarChartsObj,
    yearlyTransactionsLineChartsObj,
    // revenue
    yearlyRevenueBarChartsObj,
    yearlyRevenueLineChartsObj,
  ] = productMetrics?.yearlyMetrics.reduce(
    (yearlyProductChartsAcc, yearlyProductMetrics) => {
      const [
        // transactions
        yearlyTransactionsBarChartsObjAcc,
        yearlyTransactionsLineChartsObjAcc,
        // revenue
        yearlyRevenueBarChartsObjAcc,
        yearlyRevenueLineChartsObjAcc,
      ] = yearlyProductChartsAcc;

      const { year, transactions, revenue } = yearlyProductMetrics;

      // prevents current year from being added to charts
      const currentYear = new Date().getFullYear();
      if (year === currentYear.toString()) {
        return yearlyProductChartsAcc;
      }

      // transactions

      // transactions -> bar chart obj

      // transactions -> bar chart obj -> total
      const yearlyTransactionsTotalBarChartObj: BarChartData = {
        Years: year,
        Total: transactions.total,
      };
      yearlyTransactionsBarChartsObjAcc.total.push(
        yearlyTransactionsTotalBarChartObj
      );

      // transactions -> bar chart obj -> overview
      const yearlyTransactionsOverviewBarChartObj: BarChartData = {
        Years: year,
        'In-Store': transactions.inStore,
        Online: transactions.online,
      };
      yearlyTransactionsBarChartsObjAcc.overview.push(
        yearlyTransactionsOverviewBarChartObj
      );

      // transactions -> bar chart obj -> online
      const yearlyTransactionsOnlineBarChartObj: BarChartData = {
        Years: year,
        Online: transactions.online,
      };
      yearlyTransactionsBarChartsObjAcc.online.push(
        yearlyTransactionsOnlineBarChartObj
      );

      // transactions -> bar chart obj -> inStore
      const yearlyTransactionsInStoreBarChartObj: BarChartData = {
        Years: year,
        'In-Store': transactions.inStore,
      };
      yearlyTransactionsBarChartsObjAcc.inStore.push(
        yearlyTransactionsInStoreBarChartObj
      );

      // transactions -> line chart obj

      // transactions -> line chart obj -> total
      const yearlyTransactionsTotalLineChartObj = {
        x: year,
        y: transactions.total,
      };
      yearlyTransactionsLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(yearlyTransactionsTotalLineChartObj);

      // transactions -> line chart obj -> overview -> online
      const yearlyTransactionsOverviewOnlineLineChartObj = {
        x: year,
        y: transactions.online,
      };
      yearlyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyTransactionsOverviewOnlineLineChartObj);

      // transactions -> line chart obj -> overview -> inStore
      const yearlyTransactionsOverviewInStoreLineChartObj = {
        x: year,
        y: transactions.inStore,
      };
      yearlyTransactionsLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyTransactionsOverviewInStoreLineChartObj);

      // transactions -> line chart obj -> online
      const yearlyTransactionsOnlineLineChartObj = {
        x: year,
        y: transactions.online,
      };
      yearlyTransactionsLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyTransactionsOnlineLineChartObj);

      // transactions -> line chart obj -> inStore
      const yearlyTransactionsInStoreLineChartObj = {
        x: year,
        y: transactions.inStore,
      };
      yearlyTransactionsLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyTransactionsInStoreLineChartObj);

      // revenue

      // revenue -> bar chart obj

      // revenue -> bar chart obj -> total
      const yearlyRevenueTotalBarChartObj: BarChartData = {
        Years: year,
        Total: revenue.total,
      };
      yearlyRevenueBarChartsObjAcc.total.push(yearlyRevenueTotalBarChartObj);

      // revenue -> bar chart obj -> overview
      const yearlyRevenueOverviewBarChartObj: BarChartData = {
        Years: year,
        'In-Store': revenue.inStore,
        Online: revenue.online,
      };
      yearlyRevenueBarChartsObjAcc.overview.push(
        yearlyRevenueOverviewBarChartObj
      );

      // revenue -> bar chart obj -> online
      const yearlyRevenueOnlineBarChartObj: BarChartData = {
        Years: year,
        Online: revenue.online,
      };
      yearlyRevenueBarChartsObjAcc.online.push(yearlyRevenueOnlineBarChartObj);

      // revenue -> bar chart obj -> inStore
      const yearlyRevenueInStoreBarChartObj: BarChartData = {
        Years: year,
        'In-Store': revenue.inStore,
      };
      yearlyRevenueBarChartsObjAcc.inStore.push(
        yearlyRevenueInStoreBarChartObj
      );

      // revenue -> line chart obj

      // revenue -> line chart obj -> total
      const yearlyRevenueTotalLineChartObj = {
        x: year,
        y: revenue.total,
      };
      yearlyRevenueLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(yearlyRevenueTotalLineChartObj);

      // revenue -> line chart obj -> overview -> online
      const yearlyRevenueOverviewOnlineLineChartObj = {
        x: year,
        y: revenue.online,
      };
      yearlyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyRevenueOverviewOnlineLineChartObj);

      // revenue -> line chart obj -> overview -> inStore
      const yearlyRevenueOverviewInStoreLineChartObj = {
        x: year,
        y: revenue.inStore,
      };
      yearlyRevenueLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyRevenueOverviewInStoreLineChartObj);

      // revenue -> line chart obj -> online
      const yearlyRevenueOnlineLineChartObj = {
        x: year,
        y: revenue.online,
      };
      yearlyRevenueLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyRevenueOnlineLineChartObj);

      // revenue -> line chart obj -> inStore
      const yearlyRevenueInStoreLineChartObj = {
        x: year,
        y: revenue.inStore,
      };
      yearlyRevenueLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyRevenueInStoreLineChartObj);

      return yearlyProductChartsAcc;
    },
    [
      // transactions
      initialYearlyTransactionsBarChartsObj,
      initialYearlyTransactionsLineChartsObj,
      // revenue
      initialYearlyRevenueBarChartsObj,
      initialYearlyRevenueLineChartsObj,
    ]
  ) ?? [
    // transactions
    initialYearlyTransactionsBarChartsObj,
    initialYearlyTransactionsLineChartsObj,
    // revenue
    initialYearlyRevenueBarChartsObj,
    initialYearlyRevenueLineChartsObj,
  ];

  return {
    dailyCharts: {
      revenue: {
        barChartsObj: dailyRevenueBarChartsObj,
        calendarChartsObj: dailyRevenueCalendarChartsObj,
        lineChartsObj: dailyRevenueLineChartsObj,
        pieChartObj: dailyRevenuePieChartObj,
      },
      transactions: {
        barChartsObj: dailyTransactionsBarChartsObj,
        calendarChartsObj: dailyTransactionsCalendarChartsObj,
        lineChartsObj: dailyTransactionsLineChartsObj,
        pieChartObj: dailyTransactionsPieChartObj,
      },
    },
    monthlyCharts: {
      revenue: {
        barChartsObj: monthlyRevenueBarChartsObj,
        calendarChartsObj: monthlyRevenueCalendarChartsObj,
        lineChartsObj: monthlyRevenueLineChartsObj,
        pieChartObj: monthlyRevenuePieChartObj,
      },
      transactions: {
        barChartsObj: monthlyTransactionsBarChartsObj,
        calendarChartsObj: monthlyTransactionsCalendarChartsObj,
        lineChartsObj: monthlyTransactionsLineChartsObj,
        pieChartObj: monthlyTransactionsPieChartObj,
      },
    },
    yearlyCharts: {
      revenue: {
        barChartsObj: yearlyRevenueBarChartsObj,
        lineChartsObj: yearlyRevenueLineChartsObj,
        pieChartObj: yearlyRevenuePieChartObj,
      },
      transactions: {
        barChartsObj: yearlyTransactionsBarChartsObj,
        lineChartsObj: yearlyTransactionsLineChartsObj,
        pieChartObj: yearlyTransactionsPieChartObj,
      },
    },
  };
}

export { returnProductChartsData, returnSelectedDateProductMetrics };
export type { ProductMetricChartObjKey, ReturnProductChartsDataOutput };
