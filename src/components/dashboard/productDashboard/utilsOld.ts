/**
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
  selectedProductCategory: ProductCategory | 'All Products';
  storeLocation: BusinessMetricStoreLocation;
  year: Year;
}): SelectedDateProductMetrics {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected business metrics' product category
  const selectedDateProductMetrics = currentStoreMetrics?.productMetrics.find(
    (productMetric) => productMetric.name === selectedProductCategory
  );

  // selected year's product metrics
  const selectedYearMetrics = selectedDateProductMetrics?.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === year
  );
  const prevYearMetrics = selectedDateProductMetrics?.yearlyMetrics.find(
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
  const prevPrevYearMetrics = selectedDateProductMetrics?.yearlyMetrics.find(
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

type ReturnProductMetricsChartsInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedProductCategory: ProductCategory | 'All Products';
  selectedDateProductMetrics: SelectedDateProductMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type ProductMetricsChartKey =
  | 'total' // y-axis variables: total
  | 'overview' // y-axis variables: online, inStore
  | 'online' // y-axis variables: online
  | 'inStore'; // y-axis variables: inStore

type ProductMetricBarObj = Record<
  ProductMetricsChartKey,
  BarChartData[]
>; // y-axis variables: total, online, inStore

type ProductMetricCalendarObjKey = 'total' | 'online' | 'inStore';

type ProductMetricCalendarObj = Record<
  ProductMetricCalendarObjKey,
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



type ProductMetricsCharts = {
  dailyCharts: {
    unitsSold: {
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
    unitsSold: {
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
    unitsSold: {
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

function returnProductMetricsCharts({
  businessMetrics,
  months,
  selectedProductCategory,
  selectedDateProductMetrics,
  storeLocation,
}: ReturnProductMetricsChartsInput): ProductMetricsCharts {
  // selected year's metrics
  const {
    yearProductMetrics: { selectedYearMetrics },
  } = selectedDateProductMetrics;
  const selectedYear = selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const {
    monthProductMetrics: { selectedMonthMetrics },
  } = selectedDateProductMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // selected day's metrics
  const {
    dayProductMetrics: { selectedDayMetrics },
  } = selectedDateProductMetrics;

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

  // daily charts -> unitsSold

  // daily charts -> unitsSold -> bar chart obj
  const initialDailyUnitsSoldBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> unitsSold -> calendar chart obj
  const initialDailyUnitsSoldCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // daily charts -> unitsSold -> -> line chart obj
  const initialDailyUnitsSoldLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // daily charts -> unitsSold -> -> pie chart obj
  const dailyUnitsSoldPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedDayMetrics?.unitsSold.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedDayMetrics?.unitsSold.online ?? 0,
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
    // unitsSold
    dailyUnitsSoldBarChartsObj,
    dailyUnitsSoldCalendarChartsObj,
    dailyUnitsSoldLineChartsObj,
    // revenue
    dailyRevenueBarChartsObj,
    dailyRevenueCalendarChartsObj,
    dailyRevenueLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyProductChartsAcc, dailyProductMetrics) => {
      const [
        // unitsSold
        dailyUnitsSoldBarChartsObjAcc,
        dailyUnitsSoldCalendarChartsObjAcc,
        dailyUnitsSoldLineChartsObjAcc,
        // revenue
        dailyRevenueBarChartsObjAcc,
        dailyRevenueCalendarChartsObjAcc,
        dailyRevenueLineChartsObjAcc,
      ] = dailyProductChartsAcc;

      const { day, unitsSold, revenue } = dailyProductMetrics;

      // unitsSold

      // unitsSold -> bar chart obj

      // unitsSold -> bar chart obj -> total
      const dailyUnitsSoldTotalBarChartObj: BarChartData = {
        Days: day,
        Total: unitsSold.total,
      };
      dailyUnitsSoldBarChartsObjAcc.total.push(dailyUnitsSoldTotalBarChartObj);

      // unitsSold -> bar chart obj -> overview
      const dailyUnitsSoldOverviewBarChartObj: BarChartData = {
        Days: day,
        'In-Store': unitsSold.inStore,
        Online: unitsSold.online,
      };
      dailyUnitsSoldBarChartsObjAcc.overview.push(
        dailyUnitsSoldOverviewBarChartObj
      );

      // unitsSold -> bar chart obj -> online
      const dailyUnitsSoldOnlineBarChartObj: BarChartData = {
        Days: day,
        Online: unitsSold.online,
      };
      dailyUnitsSoldBarChartsObjAcc.online.push(
        dailyUnitsSoldOnlineBarChartObj
      );

      // unitsSold -> bar chart obj -> inStore
      const dailyUnitsSoldInStoreBarChartObj: BarChartData = {
        Days: day,
        'In-Store': unitsSold.inStore,
      };
      dailyUnitsSoldBarChartsObjAcc.inStore.push(
        dailyUnitsSoldInStoreBarChartObj
      );

      // unitsSold -> calendar chart obj

      // unitsSold -> calendar chart obj -> total
      const dailyUnitsSoldTotalCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: unitsSold.total,
      };
      dailyUnitsSoldCalendarChartsObjAcc.total.push(
        dailyUnitsSoldTotalCalendarChartObj
      );

      // unitsSold -> calendar chart obj -> online
      const dailyUnitsSoldOnlineCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: unitsSold.online,
      };
      dailyUnitsSoldCalendarChartsObjAcc.online.push(
        dailyUnitsSoldOnlineCalendarChartObj
      );

      // unitsSold -> calendar chart obj -> inStore
      const dailyUnitsSoldInStoreCalendarChartObj: CalendarChartData = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: unitsSold.inStore,
      };
      dailyUnitsSoldCalendarChartsObjAcc.inStore.push(
        dailyUnitsSoldInStoreCalendarChartObj
      );

      // unitsSold -> line chart obj

      // unitsSold -> line chart obj -> total
      const dailyUnitsSoldTotalLineChartObj = {
        x: day,
        y: unitsSold.total,
      };
      dailyUnitsSoldLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(dailyUnitsSoldTotalLineChartObj);

      // unitsSold -> line chart obj -> overview -> online
      const dailyUnitsSoldOverviewOnlineLineChartObj = {
        x: day,
        y: unitsSold.online,
      };
      dailyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyUnitsSoldOverviewOnlineLineChartObj);

      // unitsSold -> line chart obj -> overview -> inStore
      const dailyUnitsSoldOverviewInStoreLineChartObj = {
        x: day,
        y: unitsSold.inStore,
      };
      dailyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyUnitsSoldOverviewInStoreLineChartObj);

      // unitsSold -> line chart obj -> online
      const dailyUnitsSoldOnlineLineChartObj = {
        x: day,
        y: unitsSold.online,
      };
      dailyUnitsSoldLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(dailyUnitsSoldOnlineLineChartObj);

      // unitsSold -> line chart obj -> inStore
      const dailyUnitsSoldInStoreLineChartObj = {
        x: day,
        y: unitsSold.inStore,
      };
      dailyUnitsSoldLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(dailyUnitsSoldInStoreLineChartObj);

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
      // unitsSold
      initialDailyUnitsSoldBarChartsObj,
      initialDailyUnitsSoldCalendarChartsObj,
      initialDailyUnitsSoldLineChartsObj,
      // revenue
      initialDailyRevenueBarChartsObj,
      initialDailyRevenueCalendarChartsObj,
      initialDailyRevenueLineChartsObj,
    ]
  ) ?? [
    // unitsSold
    initialDailyUnitsSoldBarChartsObj,
    initialDailyUnitsSoldCalendarChartsObj,
    initialDailyUnitsSoldLineChartsObj,
    // revenue
    initialDailyRevenueBarChartsObj,
    initialDailyRevenueCalendarChartsObj,
    initialDailyRevenueLineChartsObj,
  ];

  // monthly charts

  // monthly charts -> unitsSold

  // monthly charts -> unitsSold -> bar chart obj
  const initialMonthlyUnitsSoldBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> unitsSold -> calendar chart obj
  const initialMonthlyUnitsSoldCalendarChartsObj = structuredClone(
    CALENDAR_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> unitsSold -> -> line chart obj
  const initialMonthlyUnitsSoldLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // monthly charts -> unitsSold -> -> pie chart obj
  const monthlyUnitsSoldPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedMonthMetrics?.unitsSold.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedMonthMetrics?.unitsSold.online ?? 0,
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
    // unitsSold
    monthlyUnitsSoldBarChartsObj,
    monthlyUnitsSoldCalendarChartsObj,
    monthlyUnitsSoldLineChartsObj,
    // revenue
    monthlyRevenueBarChartsObj,
    monthlyRevenueCalendarChartsObj,
    monthlyRevenueLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyProductChartsAcc, monthlyProductMetrics) => {
      const [
        // unitsSold
        monthlyUnitsSoldBarChartsObjAcc,
        monthlyUnitsSoldCalendarChartsObjAcc,
        monthlyUnitsSoldLineChartsObjAcc,
        // revenue
        monthlyRevenueBarChartsObjAcc,
        monthlyRevenueCalendarChartsObjAcc,
        monthlyRevenueLineChartsObjAcc,
      ] = monthlyProductChartsAcc;

      const { month, unitsSold, revenue, dailyMetrics } = monthlyProductMetrics;
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
        return monthlyProductChartsAcc;
      }

      // unitsSold

      // unitsSold -> bar chart obj

      // unitsSold -> bar chart obj -> total
      const monthlyUnitsSoldTotalBarChartObj: BarChartData = {
        Months: month,
        Total: unitsSold.total,
      };
      monthlyUnitsSoldBarChartsObjAcc.total.push(
        monthlyUnitsSoldTotalBarChartObj
      );

      // unitsSold -> bar chart obj -> overview
      const monthlyUnitsSoldOverviewBarChartObj: BarChartData = {
        Months: month,
        'In-Store': unitsSold.inStore,
        Online: unitsSold.online,
      };
      monthlyUnitsSoldBarChartsObjAcc.overview.push(
        monthlyUnitsSoldOverviewBarChartObj
      );

      // unitsSold -> bar chart obj -> online
      const monthlyUnitsSoldOnlineBarChartObj: BarChartData = {
        Months: month,
        Online: unitsSold.online,
      };
      monthlyUnitsSoldBarChartsObjAcc.online.push(
        monthlyUnitsSoldOnlineBarChartObj
      );

      // unitsSold -> bar chart obj -> inStore
      const monthlyUnitsSoldInStoreBarChartObj: BarChartData = {
        Months: month,
        'In-Store': unitsSold.inStore,
      };
      monthlyUnitsSoldBarChartsObjAcc.inStore.push(
        monthlyUnitsSoldInStoreBarChartObj
      );

      // unitsSold -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, unitsSold } = dailyMetric;

        // unitsSold -> calendar chart obj -> total
        const monthlyUnitsSoldTotalCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: unitsSold.total,
        };
        monthlyUnitsSoldCalendarChartsObjAcc.total.push(
          monthlyUnitsSoldTotalCalendarChartObj
        );

        // unitsSold -> calendar chart obj -> online
        const monthlyUnitsSoldOnlineCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: unitsSold.online,
        };
        monthlyUnitsSoldCalendarChartsObjAcc.online.push(
          monthlyUnitsSoldOnlineCalendarChartObj
        );

        // unitsSold -> calendar chart obj -> inStore
        const monthlyUnitsSoldInStoreCalendarChartObj: CalendarChartData = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: unitsSold.inStore,
        };
        monthlyUnitsSoldCalendarChartsObjAcc.inStore.push(
          monthlyUnitsSoldInStoreCalendarChartObj
        );
      });

      // unitsSold -> line chart obj

      // unitsSold -> line chart obj -> total
      const monthlyUnitsSoldTotalLineChartObj = {
        x: month,
        y: unitsSold.total,
      };
      monthlyUnitsSoldLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(monthlyUnitsSoldTotalLineChartObj);

      // unitsSold -> line chart obj -> overview -> online
      const monthlyUnitsSoldOverviewOnlineLineChartObj = {
        x: month,
        y: unitsSold.online,
      };
      monthlyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyUnitsSoldOverviewOnlineLineChartObj);

      // unitsSold -> line chart obj -> overview -> inStore
      const monthlyUnitsSoldOverviewInStoreLineChartObj = {
        x: month,
        y: unitsSold.inStore,
      };
      monthlyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyUnitsSoldOverviewInStoreLineChartObj);

      // unitsSold -> line chart obj -> online
      const monthlyUnitsSoldOnlineLineChartObj = {
        x: month,
        y: unitsSold.online,
      };
      monthlyUnitsSoldLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(monthlyUnitsSoldOnlineLineChartObj);

      // unitsSold -> line chart obj -> inStore
      const monthlyUnitsSoldInStoreLineChartObj = {
        x: month,
        y: unitsSold.inStore,
      };
      monthlyUnitsSoldLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(monthlyUnitsSoldInStoreLineChartObj);

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
      // unitsSold
      initialMonthlyUnitsSoldBarChartsObj,
      initialMonthlyUnitsSoldCalendarChartsObj,
      initialMonthlyUnitsSoldLineChartsObj,
      // revenue
      initialMonthlyRevenueBarChartsObj,
      initialMonthlyRevenueCalendarChartsObj,
      initialMonthlyRevenueLineChartsObj,
    ]
  ) ?? [
    // unitsSold
    initialMonthlyUnitsSoldBarChartsObj,
    initialMonthlyUnitsSoldCalendarChartsObj,
    initialMonthlyUnitsSoldLineChartsObj,
    // revenue
    initialMonthlyRevenueBarChartsObj,
    initialMonthlyRevenueCalendarChartsObj,
    initialMonthlyRevenueLineChartsObj,
  ];

  // yearly charts

  // yearly charts -> unitsSold

  // yearly charts -> unitsSold -> bar chart obj
  const initialYearlyUnitsSoldBarChartsObj = structuredClone(
    BAR_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> unitsSold -> -> line chart obj
  const initialYearlyUnitsSoldLineChartsObj = structuredClone(
    LINE_CHART_OBJ_TEMPLATE
  );
  // yearly charts -> unitsSold -> -> pie chart obj
  const yearlyUnitsSoldPieChartObj: PieChartData[] = [
    {
      id: 'In-Store',
      label: 'In-Store',
      value: selectedYearMetrics?.unitsSold.inStore ?? 0,
    },
    {
      id: 'Online',
      label: 'Online',
      value: selectedYearMetrics?.unitsSold.online ?? 0,
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
    // unitsSold
    yearlyUnitsSoldBarChartsObj,
    yearlyUnitsSoldLineChartsObj,
    // revenue
    yearlyRevenueBarChartsObj,
    yearlyRevenueLineChartsObj,
  ] = productMetrics?.yearlyMetrics.reduce(
    (yearlyProductChartsAcc, yearlyProductMetrics) => {
      const [
        // unitsSold
        yearlyUnitsSoldBarChartsObjAcc,
        yearlyUnitsSoldLineChartsObjAcc,
        // revenue
        yearlyRevenueBarChartsObjAcc,
        yearlyRevenueLineChartsObjAcc,
      ] = yearlyProductChartsAcc;

      const { year, unitsSold, revenue } = yearlyProductMetrics;

      // prevents current year from being added to charts
      const currentYear = new Date().getFullYear();
      if (year === currentYear.toString()) {
        return yearlyProductChartsAcc;
      }

      // unitsSold

      // unitsSold -> bar chart obj

      // unitsSold -> bar chart obj -> total
      const yearlyUnitsSoldTotalBarChartObj: BarChartData = {
        Years: year,
        Total: unitsSold.total,
      };
      yearlyUnitsSoldBarChartsObjAcc.total.push(
        yearlyUnitsSoldTotalBarChartObj
      );

      // unitsSold -> bar chart obj -> overview
      const yearlyUnitsSoldOverviewBarChartObj: BarChartData = {
        Years: year,
        'In-Store': unitsSold.inStore,
        Online: unitsSold.online,
      };
      yearlyUnitsSoldBarChartsObjAcc.overview.push(
        yearlyUnitsSoldOverviewBarChartObj
      );

      // unitsSold -> bar chart obj -> online
      const yearlyUnitsSoldOnlineBarChartObj: BarChartData = {
        Years: year,
        Online: unitsSold.online,
      };
      yearlyUnitsSoldBarChartsObjAcc.online.push(
        yearlyUnitsSoldOnlineBarChartObj
      );

      // unitsSold -> bar chart obj -> inStore
      const yearlyUnitsSoldInStoreBarChartObj: BarChartData = {
        Years: year,
        'In-Store': unitsSold.inStore,
      };
      yearlyUnitsSoldBarChartsObjAcc.inStore.push(
        yearlyUnitsSoldInStoreBarChartObj
      );

      // unitsSold -> line chart obj

      // unitsSold -> line chart obj -> total
      const yearlyUnitsSoldTotalLineChartObj = {
        x: year,
        y: unitsSold.total,
      };
      yearlyUnitsSoldLineChartsObjAcc.total
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Total')
        ?.data.push(yearlyUnitsSoldTotalLineChartObj);

      // unitsSold -> line chart obj -> overview -> online
      const yearlyUnitsSoldOverviewOnlineLineChartObj = {
        x: year,
        y: unitsSold.online,
      };
      yearlyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyUnitsSoldOverviewOnlineLineChartObj);

      // unitsSold -> line chart obj -> overview -> inStore
      const yearlyUnitsSoldOverviewInStoreLineChartObj = {
        x: year,
        y: unitsSold.inStore,
      };
      yearlyUnitsSoldLineChartsObjAcc.overview
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyUnitsSoldOverviewInStoreLineChartObj);

      // unitsSold -> line chart obj -> online
      const yearlyUnitsSoldOnlineLineChartObj = {
        x: year,
        y: unitsSold.online,
      };
      yearlyUnitsSoldLineChartsObjAcc.online
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'Online')
        ?.data.push(yearlyUnitsSoldOnlineLineChartObj);

      // unitsSold -> line chart obj -> inStore
      const yearlyUnitsSoldInStoreLineChartObj = {
        x: year,
        y: unitsSold.inStore,
      };
      yearlyUnitsSoldLineChartsObjAcc.inStore
        .find((lineChartObj: LineChartData) => lineChartObj.id === 'In-Store')
        ?.data.push(yearlyUnitsSoldInStoreLineChartObj);

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
      // unitsSold
      initialYearlyUnitsSoldBarChartsObj,
      initialYearlyUnitsSoldLineChartsObj,
      // revenue
      initialYearlyRevenueBarChartsObj,
      initialYearlyRevenueLineChartsObj,
    ]
  ) ?? [
    // unitsSold
    initialYearlyUnitsSoldBarChartsObj,
    initialYearlyUnitsSoldLineChartsObj,
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
      unitsSold: {
        barChartsObj: dailyUnitsSoldBarChartsObj,
        calendarChartsObj: dailyUnitsSoldCalendarChartsObj,
        lineChartsObj: dailyUnitsSoldLineChartsObj,
        pieChartObj: dailyUnitsSoldPieChartObj,
      },
    },
    monthlyCharts: {
      revenue: {
        barChartsObj: monthlyRevenueBarChartsObj,
        calendarChartsObj: monthlyRevenueCalendarChartsObj,
        lineChartsObj: monthlyRevenueLineChartsObj,
        pieChartObj: monthlyRevenuePieChartObj,
      },
      unitsSold: {
        barChartsObj: monthlyUnitsSoldBarChartsObj,
        calendarChartsObj: monthlyUnitsSoldCalendarChartsObj,
        lineChartsObj: monthlyUnitsSoldLineChartsObj,
        pieChartObj: monthlyUnitsSoldPieChartObj,
      },
    },
    yearlyCharts: {
      revenue: {
        barChartsObj: yearlyRevenueBarChartsObj,
        lineChartsObj: yearlyRevenueLineChartsObj,
        pieChartObj: yearlyRevenuePieChartObj,
      },
      unitsSold: {
        barChartsObj: yearlyUnitsSoldBarChartsObj,
        lineChartsObj: yearlyUnitsSoldLineChartsObj,
        pieChartObj: yearlyUnitsSoldPieChartObj,
      },
    },
  };
}

export { returnProductMetricsCharts, returnSelectedDateProductMetrics };
export type {
  ProductMetricsChartKey,
  ProductMetricBarObj,
  ProductMetricCalendarObj,
  ProductMetricCalendarObjKey,
  ProductMetricLineObj,
  ProductMetricsCharts,
  SelectedDateProductMetrics,
};

*/

export {};
