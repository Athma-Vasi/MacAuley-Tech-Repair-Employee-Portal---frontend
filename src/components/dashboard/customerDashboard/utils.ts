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

/**
 * dailyMetrics: {
    day: string;
    customers: {
      total: number;
      new: {
        total: number;
        sales: {
          total: number;
          online: number;
          inStore: number;
        };
        repair: number;
      };
      returning: {
        total: number;
        sales: {
          total: number;
          online: number;
          inStore: number;
        };
        repair: number;
      };
    };
  }[];  
 */

type CustomerOverviewObjKey =
  | 'overview' // y-axis variables: new, returning
  | 'new' // y-axis variables: new
  | 'returning'; // y-axis variables: returning

type CustomerOverviewBarObj = Record<CustomerOverviewObjKey, BarChartData[]>; // y-axis variables: new, returning

type CustomerOverviewCalendarObj = Record<
  CustomerOverviewObjKey,
  CalendarChartData[]
>; // y-axis variables: new, returning

type CustomerOverviewLineObj = Record<CustomerOverviewObjKey, LineChartData[]>; // y-axis variables: new, returning

type CustomerNewReturningObjKey =
  | 'total' // y-axis variables: total
  | 'all' // y-axis variables: sales, in-store, repair
  | 'overview' // y-axis variables: sales, repair
  | 'sales' // y-axis variables: online, in-store
  | 'online' // y-axis variables: online
  | 'inStore' // y-axis variables: in-store
  | 'repair'; // y-axis variables: repair

type CustomerNewReturningBarObj = Record<
  CustomerNewReturningObjKey,
  BarChartData[]
>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningCalendarObjKey =
  | 'total' // y-axis variables: total
  | 'sales' // y-axis variables: sales
  | 'online' // y-axis variables: online
  | 'inStore' // y-axis variables: in-store
  | 'repair'; // y-axis variables: repair

type CustomerNewReturningCalendarObj = Record<
  CustomerNewReturningCalendarObjKey,
  CalendarChartData[]
>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningLineObj = Record<
  CustomerNewReturningObjKey,
  LineChartData[]
>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningPieObj = {
  overview: PieChartData[]; // y-axis variables: sales, repair
  all: PieChartData[]; // y-axis variables: sales, in-store, repair
  sales: PieChartData[]; // y-axis variables: online, in-store
};

type CustomerChurnRetentionObjKey =
  | 'overview' // y-axis variables: churn rate, retention rate
  | 'churnRate' // y-axis variables: churn rate
  | 'retentionRate'; // y-axis variables: retention rate

type CustomerChurnRetentionBarObj = Record<
  CustomerChurnRetentionObjKey,
  BarChartData[]
>; // y-axis variables: churn rate, retention rate

type CustomerChurnRetentionLineObj = Record<
  CustomerChurnRetentionObjKey,
  LineChartData[]
>; // y-axis variables: churn rate, retention rate

type ReturnCustomerChartsDataOutput = {
  dailyCharts: {
    overview: {
      barChartsObj: CustomerOverviewBarObj;
      calendarChartsObj: CustomerOverviewCalendarObj;
      lineChartsObj: CustomerOverviewLineObj;
      pieChartObj: PieChartData[];
    };
    new: {
      barChartsObj: CustomerNewReturningBarObj;
      calendarChartsObj: CustomerNewReturningCalendarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
    returning: {
      barChartsObj: CustomerNewReturningBarObj;
      calendarChartsObj: CustomerNewReturningCalendarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
  };
  monthlyCharts: {
    overview: {
      barChartsObj: CustomerOverviewBarObj;
      calendarChartsObj: CustomerOverviewCalendarObj;
      lineChartsObj: CustomerOverviewLineObj;
      pieChartObj: PieChartData[];
    };
    new: {
      barChartsObj: CustomerNewReturningBarObj;
      calendarChartsObj: CustomerNewReturningCalendarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
    returning: {
      barChartsObj: CustomerNewReturningBarObj;
      calendarChartsObj: CustomerNewReturningCalendarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
    churnRetention: {
      barChartsObj: CustomerChurnRetentionBarObj;
      lineChartsObj: CustomerChurnRetentionLineObj;
      pieChartObj: PieChartData[];
    };
  };
  yearlyCharts: {
    overview: {
      barChartsObj: CustomerOverviewBarObj;
      lineChartsObj: CustomerOverviewLineObj;
      pieChartObj: PieChartData[];
    };
    new: {
      barChartsObj: CustomerNewReturningBarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
    returning: {
      barChartsObj: CustomerNewReturningBarObj;
      lineChartsObj: CustomerNewReturningLineObj;
      pieChartObj: CustomerNewReturningPieObj;
    };
    churnRetention: {
      barChartsObj: CustomerChurnRetentionBarObj;
      lineChartsObj: CustomerChurnRetentionLineObj;
      pieChartObj: PieChartData[];
    };
  };
};

function returnCustomerChartsData({
  businessMetrics,
  months,
  selectedCustomerMetrics,
  storeLocation,
}: ReturnCustomerChartsDataInput): ReturnCustomerChartsDataOutput {
  // selected year's metrics
  const {
    yearCustomerMetrics: { selectedYearMetrics },
  } = selectedCustomerMetrics;
  const selectedYear = selectedYearMetrics?.year ?? '2023';

  // selected month's metrics
  const {
    monthCustomerMetrics: { selectedMonthMetrics },
  } = selectedCustomerMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? 'January';
  const monthNumber = (months.indexOf(selectedMonth) + 1)
    .toString()
    .padStart(2, '0');

  // selected day's metrics
  const {
    dayCustomerMetrics: { selectedDayMetrics },
  } = selectedCustomerMetrics;

  // templates

  // templates -> overview -> bar chart obj
  const OVERVIEW_BAR_CHART_TEMPLATE: CustomerOverviewBarObj = {
    overview: [],
    new: [],
    returning: [],
  };

  // templates -> overview -> calendar chart obj
  const OVERVIEW_CALENDAR_CHART_TEMPLATE: CustomerOverviewCalendarObj = {
    overview: [],
    new: [],
    returning: [],
  };

  // templates -> overview -> line chart obj
  const OVERVIEW_LINE_CHART_TEMPLATE: CustomerOverviewLineObj = {
    overview: [
      { id: 'New', data: [] },
      { id: 'Returning', data: [] },
    ],
    new: [{ id: 'New', data: [] }],
    returning: [{ id: 'Returning', data: [] }],
  };

  // templates -> new & returning -> bar chart obj
  const NEW_RETURNING_BAR_CHART_TEMPLATE: CustomerNewReturningBarObj = {
    total: [],
    all: [],
    overview: [],
    sales: [],
    online: [],
    inStore: [],
    repair: [],
  };

  // templates -> new & returning -> calendar chart obj
  const NEW_RETURNING_CALENDAR_CHART_TEMPLATE: CustomerNewReturningCalendarObj =
    {
      total: [],
      sales: [],
      online: [],
      inStore: [],
      repair: [],
    };

  // templates -> new & returning -> line chart obj
  const NEW_RETURNING_LINE_CHART_TEMPLATE: CustomerNewReturningLineObj = {
    total: [{ id: 'Total', data: [] }],
    all: [
      { id: 'Online', data: [] },
      { id: 'In-Store', data: [] },
      { id: 'Repair', data: [] },
    ],
    overview: [
      { id: 'Repair', data: [] },
      { id: 'Sales', data: [] },
    ],
    sales: [
      { id: 'Online', data: [] },
      { id: 'In-Store', data: [] },
    ],
    online: [{ id: 'Online', data: [] }],
    inStore: [{ id: 'In-Store', data: [] }],
    repair: [{ id: 'Repair', data: [] }],
  };

  // templates -> churn & retention -> bar chart obj
  const CHURN_RETENTION_BAR_CHART_TEMPLATE: CustomerChurnRetentionBarObj = {
    overview: [],
    churnRate: [],
    retentionRate: [],
  };

  // templates -> churn & retention -> line chart obj
  const CHURN_RETENTION_LINE_CHART_TEMPLATE: CustomerChurnRetentionLineObj = {
    overview: [{ id: 'Churn Rate', data: [] }],
    churnRate: [{ id: 'Churn Rate', data: [] }],
    retentionRate: [{ id: 'Retention Rate', data: [] }],
  };

  // daily

  // daily -> overview

  // daily -> overview -> bar chart obj
  const initialDailyOverviewBarChartsObj = structuredClone(
    OVERVIEW_BAR_CHART_TEMPLATE
  );
  // daily -> overview -> calendar chart obj
  const initialDailyOverviewCalendarChartsObj = structuredClone(
    OVERVIEW_CALENDAR_CHART_TEMPLATE
  );
  // daily -> overview -> line chart obj
  const initialDailyOverviewLineChartsObj = structuredClone(
    OVERVIEW_LINE_CHART_TEMPLATE
  );
  // daily -> overview -> pie chart obj
  const dailyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value: selectedDayMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value: selectedDayMetrics?.customers.returning.total ?? 0,
    },
  ];

  // daily -> new

  // daily -> new -> bar chart obj
  const initialDailyNewBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // daily -> new -> calendar chart obj
  const initialDailyNewCalendarChartsObj = structuredClone(
    NEW_RETURNING_CALENDAR_CHART_TEMPLATE
  );
  // daily -> new -> line chart obj
  const initialDailyNewLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // daily -> new -> pie chart obj
  const newSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedDayMetrics?.customers.new.sales.total ?? 0,
  };
  const newRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedDayMetrics?.customers.new.repair ?? 0,
  };
  const newSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedDayMetrics?.customers.new.sales.online ?? 0,
  };
  const newSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedDayMetrics?.customers.new.sales.inStore ?? 0,
  };

  const dailyNewPieChartData: CustomerNewReturningPieObj = {
    overview: [newSalesPieChartData, newRepairPieChartData],
    all: [
      newSalesOnlinePieChartData,
      newSalesInStorePieChartData,
      newRepairPieChartData,
    ],
    sales: [
      newSalesOnlinePieChartData,
      newSalesInStorePieChartData,
      newRepairPieChartData,
    ],
  };

  // daily -> returning

  // daily -> returning -> bar chart obj
  const initialDailyReturningBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // daily -> returning -> calendar chart obj
  const initialDailyReturningCalendarChartsObj = structuredClone(
    NEW_RETURNING_CALENDAR_CHART_TEMPLATE
  );
  // daily -> returning -> line chart obj
  const initialDailyReturningLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // daily -> returning -> pie chart obj
  const returningSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedDayMetrics?.customers.returning.sales.total ?? 0,
  };
  const returningRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedDayMetrics?.customers.returning.repair ?? 0,
  };
  const returningSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedDayMetrics?.customers.returning.sales.online ?? 0,
  };
  const returningSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedDayMetrics?.customers.returning.sales.inStore ?? 0,
  };

  const dailyReturningPieChartData: CustomerNewReturningPieObj = {
    overview: [returningSalesPieChartData, returningRepairPieChartData],
    all: [
      returningSalesOnlinePieChartData,
      returningSalesInStorePieChartData,
      returningRepairPieChartData,
    ],
    sales: [
      returningSalesOnlinePieChartData,
      returningSalesInStorePieChartData,
      returningRepairPieChartData,
    ],
  };

  // daily charts

  const [
    // overview
    dailyOverviewBarChartsObj,
    dailyOverviewCalendarChartsObj,
    dailyOverviewLineChartsObj,
    // new
    dailyNewBarChartsObj,
    dailyNewCalendarChartsObj,
    dailyNewLineChartsObj,
    // returning
    dailyReturningBarChartsObj,
    dailyReturningCalendarChartsObj,
    dailyReturningLineChartsObj,
  ] = selectedMonthMetrics?.dailyMetrics.reduce(
    (dailyCustomerChartsAcc, dailyMetric) => {
      const [
        // overview
        dailyOverviewBarChartsObjAcc,
        dailyOverviewCalendarChartsObjAcc,
        dailyOverviewLineChartsObjAcc,
        // new
        dailyNewBarChartsObjAcc,
        dailyNewCalendarChartsObjAcc,
        dailyNewLineChartsObjAcc,
        // returning
        dailyReturningBarChartsObjAcc,
        dailyReturningCalendarChartsObjAcc,
        dailyReturningLineChartsObjAcc,
      ] = dailyCustomerChartsAcc;

      const { day, customers } = dailyMetric;

      // overview

      // overview -> bar chart obj
      const dailyOverviewBarChartObj = {
        Days: day,
        New: customers.new.total,
        Returning: customers.returning.total,
      };
      dailyOverviewBarChartsObjAcc.overview.push(dailyOverviewBarChartObj);

      // overview -> calendar chart obj
      const dailyOverviewCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.total,
      };
      dailyOverviewCalendarChartsObjAcc.overview.push(
        dailyOverviewCalendarChartObj
      );

      // overview -> line chart obj -> overview -> new
      const dailyOverviewNewLineChartObj = {
        x: day,
        y: customers.new.total,
      };
      dailyOverviewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(dailyOverviewNewLineChartObj);

      // overview -> line chart obj -> overview -> returning
      const dailyOverviewReturningLineChartObj = {
        x: day,
        y: customers.returning.total,
      };
      dailyOverviewLineChartsObjAcc.overview
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(dailyOverviewReturningLineChartObj);

      // overview -> line chart obj -> new -> new
      const dailyNewNewLineChartObj = {
        x: day,
        y: customers.new.total,
      };
      dailyOverviewLineChartsObjAcc.new
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(dailyNewNewLineChartObj);

      // overview -> line chart obj -> returning -> returning
      const dailyReturningReturningLineChartObj = {
        x: day,
        y: customers.returning.total,
      };
      dailyOverviewLineChartsObjAcc.returning
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(dailyReturningReturningLineChartObj);

      // new

      // new -> bar chart obj

      // new -> bar chart obj -> total
      const dailyNewTotalBarChartObj = {
        Days: day,
        Total: customers.new.total,
      };
      dailyNewBarChartsObjAcc.total.push(dailyNewTotalBarChartObj);

      // new -> bar chart obj -> all
      const dailyNewAllBarChartObj = {
        Days: day,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
        Repair: customers.new.repair,
      };
      dailyNewBarChartsObjAcc.all.push(dailyNewAllBarChartObj);

      // new -> bar chart obj -> overview
      const dailyNewOverviewBarChartObj = {
        Days: day,
        Sales: customers.new.sales.total,
        Repair: customers.new.repair,
      };
      dailyNewBarChartsObjAcc.overview.push(dailyNewOverviewBarChartObj);

      // new -> bar chart obj -> sales
      const dailyNewSalesBarChartObj = {
        Days: day,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
      };
      dailyNewBarChartsObjAcc.sales.push(dailyNewSalesBarChartObj);

      // new -> bar chart obj -> online
      const dailyNewOnlineBarChartObj = {
        Days: day,
        Online: customers.new.sales.online,
      };
      dailyNewBarChartsObjAcc.online.push(dailyNewOnlineBarChartObj);

      // new -> bar chart obj -> in-store
      const dailyNewInStoreBarChartObj = {
        Days: day,
        'In-Store': customers.new.sales.inStore,
      };
      dailyNewBarChartsObjAcc.inStore.push(dailyNewInStoreBarChartObj);

      // new -> bar chart obj -> repair
      const dailyNewRepairBarChartObj = {
        Days: day,
        Repair: customers.new.repair,
      };
      dailyNewBarChartsObjAcc.repair.push(dailyNewRepairBarChartObj);

      // new -> calendar chart obj

      // new -> calendar chart obj -> total
      const dailyNewTotalCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.new.total,
      };
      dailyNewCalendarChartsObjAcc.total.push(dailyNewTotalCalendarChartObj);

      // new -> calendar chart obj -> sales
      const dailyNewSalesCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.new.sales.total,
      };
      dailyNewCalendarChartsObjAcc.sales.push(dailyNewSalesCalendarChartObj);

      // new -> calendar chart obj -> online
      const dailyNewOnlineCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.new.sales.online,
      };
      dailyNewCalendarChartsObjAcc.online.push(dailyNewOnlineCalendarChartObj);

      // new -> calendar chart obj -> in-store
      const dailyNewInStoreCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.new.sales.inStore,
      };
      dailyNewCalendarChartsObjAcc.inStore.push(
        dailyNewInStoreCalendarChartObj
      );

      // new -> calendar chart obj -> repair
      const dailyNewRepairCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.new.repair,
      };
      dailyNewCalendarChartsObjAcc.repair.push(dailyNewRepairCalendarChartObj);

      // new -> line chart obj

      // new -> line chart obj -> total
      const dailyNewTotalLineChartObj = {
        x: day,
        y: customers.new.total,
      };
      dailyNewLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyNewTotalLineChartObj);

      // new -> line chart obj -> all -> in-store
      const dailyNewAllInStoreLineChartObj = {
        x: day,
        y: customers.new.sales.inStore,
      };
      dailyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyNewAllInStoreLineChartObj);

      // new -> line chart obj -> all -> online
      const dailyNewAllOnlineLineChartObj = {
        x: day,
        y: customers.new.sales.online,
      };
      dailyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyNewAllOnlineLineChartObj);

      // new -> line chart obj -> all -> repair
      const dailyNewAllRepairLineChartObj = {
        x: day,
        y: customers.new.repair,
      };
      dailyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyNewAllRepairLineChartObj);

      // new -> line chart obj -> overview -> sales
      const dailyNewOverviewSalesLineChartObj = {
        x: day,
        y: customers.new.sales.total,
      };
      dailyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyNewOverviewSalesLineChartObj);

      // new -> line chart obj -> overview -> repair
      const dailyNewOverviewRepairLineChartObj = {
        x: day,
        y: customers.new.repair,
      };
      dailyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyNewOverviewRepairLineChartObj);

      // new -> line chart obj -> sales -> online
      const dailyNewSalesOnlineLineChartObj = {
        x: day,
        y: customers.new.sales.online,
      };
      dailyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyNewSalesOnlineLineChartObj);

      // new -> line chart obj -> sales -> in-store
      const dailyNewSalesInStoreLineChartObj = {
        x: day,
        y: customers.new.sales.inStore,
      };
      dailyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyNewSalesInStoreLineChartObj);

      // new -> line chart obj -> online
      const dailyNewOnlineLineChartObj = {
        x: day,
        y: customers.new.sales.online,
      };
      dailyNewLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyNewOnlineLineChartObj);

      // new -> line chart obj -> in-store
      const dailyNewInStoreLineChartObj = {
        x: day,
        y: customers.new.sales.inStore,
      };
      dailyNewLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyNewInStoreLineChartObj);

      // new -> line chart obj -> repair
      const dailyNewRepairLineChartObj = {
        x: day,
        y: customers.new.repair,
      };
      dailyNewLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyNewRepairLineChartObj);

      // returning

      // returning -> bar chart obj

      // returning -> bar chart obj -> total
      const dailyReturningTotalBarChartObj = {
        Days: day,
        Total: customers.returning.total,
      };
      dailyReturningBarChartsObjAcc.total.push(dailyReturningTotalBarChartObj);

      // returning -> bar chart obj -> all
      const dailyReturningAllBarChartObj = {
        Days: day,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
        Repair: customers.returning.repair,
      };
      dailyReturningBarChartsObjAcc.all.push(dailyReturningAllBarChartObj);

      // returning -> bar chart obj -> overview
      const dailyReturningOverviewBarChartObj = {
        Days: day,
        Sales: customers.returning.sales.total,
        Repair: customers.returning.repair,
      };
      dailyReturningBarChartsObjAcc.overview.push(
        dailyReturningOverviewBarChartObj
      );

      // returning -> bar chart obj -> sales
      const dailyReturningSalesBarChartObj = {
        Days: day,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
      };
      dailyReturningBarChartsObjAcc.sales.push(dailyReturningSalesBarChartObj);

      // returning -> bar chart obj -> online
      const dailyReturningOnlineBarChartObj = {
        Days: day,
        Online: customers.returning.sales.online,
      };
      dailyReturningBarChartsObjAcc.online.push(
        dailyReturningOnlineBarChartObj
      );

      // returning -> bar chart obj -> in-store
      const dailyReturningInStoreBarChartObj = {
        Days: day,
        'In-Store': customers.returning.sales.inStore,
      };
      dailyReturningBarChartsObjAcc.inStore.push(
        dailyReturningInStoreBarChartObj
      );

      // returning -> bar chart obj -> repair
      const dailyReturningRepairBarChartObj = {
        Days: day,
        Repair: customers.returning.repair,
      };
      dailyReturningBarChartsObjAcc.repair.push(
        dailyReturningRepairBarChartObj
      );

      // returning -> calendar chart obj

      // returning -> calendar chart obj -> total
      const dailyReturningTotalCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.returning.total,
      };
      dailyReturningCalendarChartsObjAcc.total.push(
        dailyReturningTotalCalendarChartObj
      );

      // returning -> calendar chart obj -> sales
      const dailyReturningSalesCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.returning.sales.total,
      };
      dailyReturningCalendarChartsObjAcc.sales.push(
        dailyReturningSalesCalendarChartObj
      );

      // returning -> calendar chart obj -> online
      const dailyReturningOnlineCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.returning.sales.online,
      };
      dailyReturningCalendarChartsObjAcc.online.push(
        dailyReturningOnlineCalendarChartObj
      );

      // returning -> calendar chart obj -> in-store
      const dailyReturningInStoreCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.returning.sales.inStore,
      };
      dailyReturningCalendarChartsObjAcc.inStore.push(
        dailyReturningInStoreCalendarChartObj
      );

      // returning -> calendar chart obj -> repair
      const dailyReturningRepairCalendarChartObj = {
        day: `${selectedYear}-${monthNumber}-${day}`,
        value: customers.returning.repair,
      };
      dailyReturningCalendarChartsObjAcc.repair.push(
        dailyReturningRepairCalendarChartObj
      );

      // returning -> line chart obj

      // returning -> line chart obj -> total
      const dailyReturningTotalLineChartObj = {
        x: day,
        y: customers.returning.total,
      };
      dailyReturningLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(dailyReturningTotalLineChartObj);

      // returning -> line chart obj -> all -> in-store
      const dailyReturningAllInStoreLineChartObj = {
        x: day,
        y: customers.returning.sales.inStore,
      };
      dailyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyReturningAllInStoreLineChartObj);

      // returning -> line chart obj -> all -> online
      const dailyReturningAllOnlineLineChartObj = {
        x: day,
        y: customers.returning.sales.online,
      };
      dailyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyReturningAllOnlineLineChartObj);

      // returning -> line chart obj -> all -> repair
      const dailyReturningAllRepairLineChartObj = {
        x: day,
        y: customers.returning.repair,
      };
      dailyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyReturningAllRepairLineChartObj);

      // returning -> line chart obj -> overview -> sales
      const dailyReturningOverviewSalesLineChartObj = {
        x: day,
        y: customers.returning.sales.total,
      };
      dailyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(dailyReturningOverviewSalesLineChartObj);

      // returning -> line chart obj -> overview -> repair
      const dailyReturningOverviewRepairLineChartObj = {
        x: day,
        y: customers.returning.repair,
      };
      dailyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyReturningOverviewRepairLineChartObj);

      // returning -> line chart obj -> sales -> online
      const dailyReturningSalesOnlineLineChartObj = {
        x: day,
        y: customers.returning.sales.online,
      };
      dailyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyReturningSalesOnlineLineChartObj);

      // returning -> line chart obj -> sales -> in-store
      const dailyReturningSalesInStoreLineChartObj = {
        x: day,
        y: customers.returning.sales.inStore,
      };
      dailyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyReturningSalesInStoreLineChartObj);

      // returning -> line chart obj -> online
      const dailyReturningOnlineLineChartObj = {
        x: day,
        y: customers.returning.sales.online,
      };
      dailyReturningLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(dailyReturningOnlineLineChartObj);

      // returning -> line chart obj -> in-store
      const dailyReturningInStoreLineChartObj = {
        x: day,
        y: customers.returning.sales.inStore,
      };
      dailyReturningLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(dailyReturningInStoreLineChartObj);

      // returning -> line chart obj -> repair
      const dailyReturningRepairLineChartObj = {
        x: day,
        y: customers.returning.repair,
      };
      dailyReturningLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(dailyReturningRepairLineChartObj);

      return dailyCustomerChartsAcc;
    },
    [
      // overview
      initialDailyOverviewBarChartsObj,
      initialDailyOverviewCalendarChartsObj,
      initialDailyOverviewLineChartsObj,
      // new
      initialDailyNewBarChartsObj,
      initialDailyNewCalendarChartsObj,
      initialDailyNewLineChartsObj,
      // returning
      initialDailyReturningBarChartsObj,
      initialDailyReturningCalendarChartsObj,
      initialDailyReturningLineChartsObj,
    ]
  ) ?? [
    // overview
    initialDailyOverviewBarChartsObj,
    initialDailyOverviewCalendarChartsObj,
    initialDailyOverviewLineChartsObj,
    // new
    initialDailyNewBarChartsObj,
    initialDailyNewCalendarChartsObj,
    initialDailyNewLineChartsObj,
    // returning
    initialDailyReturningBarChartsObj,
    initialDailyReturningCalendarChartsObj,
    initialDailyReturningLineChartsObj,
  ];

  // monthly

  // monthly -> overview

  // monthly -> overview -> bar chart obj
  const initialMonthlyOverviewBarChartsObj = structuredClone(
    OVERVIEW_BAR_CHART_TEMPLATE
  );
  // monthly -> overview -> calendar chart obj
  const initialMonthlyOverviewCalendarChartsObj = structuredClone(
    OVERVIEW_CALENDAR_CHART_TEMPLATE
  );
  // monthly -> overview -> line chart obj
  const initialMonthlyOverviewLineChartsObj = structuredClone(
    OVERVIEW_LINE_CHART_TEMPLATE
  );
  // monthly -> overview -> pie chart obj
  const monthlyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value: selectedMonthMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value: selectedMonthMetrics?.customers.returning.total ?? 0,
    },
  ];

  // monthly -> new

  // monthly -> new -> bar chart obj
  const initialMonthlyNewBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // monthly -> new -> calendar chart obj
  const initialMonthlyNewCalendarChartsObj = structuredClone(
    NEW_RETURNING_CALENDAR_CHART_TEMPLATE
  );
  // monthly -> new -> line chart obj
  const initialMonthlyNewLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // monthly -> new -> pie chart obj
  const monthlyNewSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedMonthMetrics?.customers.new.sales.total ?? 0,
  };
  const monthlyNewRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedMonthMetrics?.customers.new.repair ?? 0,
  };
  const monthlyNewSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedMonthMetrics?.customers.new.sales.online ?? 0,
  };
  const monthlyNewSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedMonthMetrics?.customers.new.sales.inStore ?? 0,
  };

  const monthlyNewPieChartData: CustomerNewReturningPieObj = {
    overview: [monthlyNewSalesPieChartData, monthlyNewRepairPieChartData],
    all: [
      monthlyNewSalesOnlinePieChartData,
      monthlyNewSalesInStorePieChartData,
      monthlyNewRepairPieChartData,
    ],
    sales: [
      monthlyNewSalesOnlinePieChartData,
      monthlyNewSalesInStorePieChartData,
      monthlyNewRepairPieChartData,
    ],
  };

  // monthly -> returning

  // monthly -> returning -> bar chart obj
  const initialMonthlyReturningBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // monthly -> returning -> calendar chart obj
  const initialMonthlyReturningCalendarChartsObj = structuredClone(
    NEW_RETURNING_CALENDAR_CHART_TEMPLATE
  );
  // monthly -> returning -> line chart obj
  const initialMonthlyReturningLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // monthly -> returning -> pie chart obj
  const monthlyReturningSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedMonthMetrics?.customers.returning.sales.total ?? 0,
  };
  const monthlyReturningRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedMonthMetrics?.customers.returning.repair ?? 0,
  };
  const monthlyReturningSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedMonthMetrics?.customers.returning.sales.online ?? 0,
  };
  const monthlyReturningSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedMonthMetrics?.customers.returning.sales.inStore ?? 0,
  };

  const monthlyReturningPieChartData: CustomerNewReturningPieObj = {
    overview: [
      monthlyReturningSalesPieChartData,
      monthlyReturningRepairPieChartData,
    ],
    all: [
      monthlyReturningSalesOnlinePieChartData,
      monthlyReturningSalesInStorePieChartData,
      monthlyReturningRepairPieChartData,
    ],
    sales: [
      monthlyReturningSalesOnlinePieChartData,
      monthlyReturningSalesInStorePieChartData,
      monthlyReturningRepairPieChartData,
    ],
  };

  // monthly -> churn & retention rate -> bar chart obj
  const initialMonthlyChurnRetentionRateBarChartsObj = structuredClone(
    CHURN_RETENTION_BAR_CHART_TEMPLATE
  );
  // monthly -> churn & retention rate -> line chart obj
  const initialMonthlyChurnRetentionRateLineChartsObj = structuredClone(
    CHURN_RETENTION_LINE_CHART_TEMPLATE
  );

  // monthly -> churn & retention rate -> pie chart obj
  const monthlyChurnRetentionRatePieChartData: PieChartData[] = [
    {
      id: 'Churn Rate',
      label: 'Churn Rate',
      value: selectedMonthMetrics?.customers.churnRate ?? 0,
    },
    {
      id: 'Retention Rate',
      label: 'Retention Rate',
      value: selectedMonthMetrics?.customers.retentionRate ?? 0,
    },
  ];

  // monthly charts

  const [
    // overview
    monthlyOverviewBarChartsObj,
    monthlyOverviewCalendarChartsObj,
    monthlyOverviewLineChartsObj,
    // new
    monthlyNewBarChartsObj,
    monthlyNewCalendarChartsObj,
    monthlyNewLineChartsObj,
    // returning
    monthlyReturningBarChartsObj,
    monthlyReturningCalendarChartsObj,
    monthlyReturningLineChartsObj,
    // churn & retention rate
    monthlyChurnRetentionRateBarChartsObj,
    monthlyChurnRetentionRateLineChartsObj,
  ] = selectedYearMetrics?.monthlyMetrics.reduce(
    (monthlyCustomerChartsAcc, monthlyMetric) => {
      const [
        // overview
        monthlyOverviewBarChartsObjAcc,
        monthlyOverviewCalendarChartsObjAcc,
        monthlyOverviewLineChartsObjAcc,
        // new
        monthlyNewBarChartsObjAcc,
        monthlyNewCalendarChartsObjAcc,
        monthlyNewLineChartsObjAcc,
        // returning
        monthlyReturningBarChartsObjAcc,
        monthlyReturningCalendarChartsObjAcc,
        monthlyReturningLineChartsObjAcc,
        // churn & retention rate
        monthlyChurnRetentionRateBarChartsObjAcc,
        monthlyChurnRetentionRateLineChartsObjAcc,
      ] = monthlyCustomerChartsAcc;

      const { month, customers, dailyMetrics } = monthlyMetric;
      const monthNumberStr = (months.indexOf(month) + 1)
        .toString()
        .padStart(2, '0');

      // overview

      // overview -> bar chart obj

      // overview -> bar chart obj -> total
      const monthlyOverviewTotalBarChartObj = {
        Months: month,
        Total: customers.total,
      };
      monthlyOverviewBarChartsObjAcc.overview.push(
        monthlyOverviewTotalBarChartObj
      );

      // overview -> bar chart obj -> new
      const monthlyOverviewNewBarChartObj = {
        Months: month,
        New: customers.new.total,
      };
      monthlyOverviewBarChartsObjAcc.new.push(monthlyOverviewNewBarChartObj);

      // overview -> bar chart obj -> returning
      const monthlyOverviewReturningBarChartObj = {
        Months: month,
        Returning: customers.returning.total,
      };
      monthlyOverviewBarChartsObjAcc.returning.push(
        monthlyOverviewReturningBarChartObj
      );

      // overview -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, customers } = dailyMetric;

        // overview -> calendar chart obj -> total
        const monthlyOverviewCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.total,
        };
        monthlyOverviewCalendarChartsObjAcc.overview.push(
          monthlyOverviewCalendarChartObj
        );

        // overview -> calendar chart obj -> new
        const monthlyOverviewNewCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.total,
        };
        monthlyOverviewCalendarChartsObjAcc.new.push(
          monthlyOverviewNewCalendarChartObj
        );

        // overview -> calendar chart obj -> returning
        const monthlyOverviewReturningCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.total,
        };
        monthlyOverviewCalendarChartsObjAcc.returning.push(
          monthlyOverviewReturningCalendarChartObj
        );
      });

      // overview -> line chart obj

      // overview -> line chart obj -> overview -> new
      const monthlyOverviewNewLineChartObj = {
        x: month,
        y: customers.new.total,
      };
      monthlyOverviewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(monthlyOverviewNewLineChartObj);

      // overview -> line chart obj -> overview -> returning
      const monthlyOverviewReturningLineChartObj = {
        x: month,
        y: customers.returning.total,
      };
      monthlyOverviewLineChartsObjAcc.overview
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(monthlyOverviewReturningLineChartObj);

      // overview -> line chart obj -> new -> new
      const monthlyNewNewLineChartObj = {
        x: month,
        y: customers.new.total,
      };
      monthlyOverviewLineChartsObjAcc.new
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(monthlyNewNewLineChartObj);

      // overview -> line chart obj -> returning -> returning
      const monthlyReturningReturningLineChartObj = {
        x: month,
        y: customers.returning.total,
      };
      monthlyOverviewLineChartsObjAcc.returning
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(monthlyReturningReturningLineChartObj);

      // new

      // new -> bar chart obj

      // new -> bar chart obj -> total
      const monthlyNewTotalBarChartObj = {
        Months: month,
        Total: customers.new.total,
      };
      monthlyNewBarChartsObjAcc.total.push(monthlyNewTotalBarChartObj);

      // new -> bar chart obj -> all
      const monthlyNewAllBarChartObj = {
        Months: month,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
        Repair: customers.new.repair,
      };
      monthlyNewBarChartsObjAcc.all.push(monthlyNewAllBarChartObj);

      // new -> bar chart obj -> overview
      const monthlyNewOverviewBarChartObj = {
        Months: month,
        Sales: customers.new.sales.total,
        Repair: customers.new.repair,
      };
      monthlyNewBarChartsObjAcc.overview.push(monthlyNewOverviewBarChartObj);

      // new -> bar chart obj -> sales
      const monthlyNewSalesBarChartObj = {
        Months: month,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
      };
      monthlyNewBarChartsObjAcc.sales.push(monthlyNewSalesBarChartObj);

      // new -> bar chart obj -> online
      const monthlyNewOnlineBarChartObj = {
        Months: month,
        Online: customers.new.sales.online,
      };
      monthlyNewBarChartsObjAcc.online.push(monthlyNewOnlineBarChartObj);

      // new -> bar chart obj -> in-store
      const monthlyNewInStoreBarChartObj = {
        Months: month,
        'In-Store': customers.new.sales.inStore,
      };
      monthlyNewBarChartsObjAcc.inStore.push(monthlyNewInStoreBarChartObj);

      // new -> bar chart obj -> repair
      const monthlyNewRepairBarChartObj = {
        Months: month,
        Repair: customers.new.repair,
      };
      monthlyNewBarChartsObjAcc.repair.push(monthlyNewRepairBarChartObj);

      // new -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, customers } = dailyMetric;

        // new -> calendar chart obj -> total
        const monthlyNewTotalCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.total,
        };
        monthlyNewCalendarChartsObjAcc.total.push(
          monthlyNewTotalCalendarChartObj
        );

        // new -> calendar chart obj -> sales
        const monthlyNewSalesCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.sales.total,
        };
        monthlyNewCalendarChartsObjAcc.sales.push(
          monthlyNewSalesCalendarChartObj
        );

        // new -> calendar chart obj -> online
        const monthlyNewOnlineCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.sales.online,
        };
        monthlyNewCalendarChartsObjAcc.online.push(
          monthlyNewOnlineCalendarChartObj
        );

        // new -> calendar chart obj -> in-store
        const monthlyNewInStoreCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.sales.inStore,
        };
        monthlyNewCalendarChartsObjAcc.inStore.push(
          monthlyNewInStoreCalendarChartObj
        );

        // new -> calendar chart obj -> repair
        const monthlyNewRepairCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.new.repair,
        };
        monthlyNewCalendarChartsObjAcc.repair.push(
          monthlyNewRepairCalendarChartObj
        );
      });

      // new -> line chart obj

      // new -> line chart obj -> total
      const monthlyNewTotalLineChartObj = {
        x: month,
        y: customers.new.total,
      };
      monthlyNewLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyNewTotalLineChartObj);

      // new -> line chart obj -> all -> in-store
      const monthlyNewAllInStoreLineChartObj = {
        x: month,
        y: customers.new.sales.inStore,
      };
      monthlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyNewAllInStoreLineChartObj);

      // new -> line chart obj -> all -> online
      const monthlyNewAllOnlineLineChartObj = {
        x: month,
        y: customers.new.sales.online,
      };
      monthlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyNewAllOnlineLineChartObj);

      // new -> line chart obj -> all -> repair
      const monthlyNewAllRepairLineChartObj = {
        x: month,
        y: customers.new.repair,
      };
      monthlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyNewAllRepairLineChartObj);

      // new -> line chart obj -> overview -> sales
      const monthlyNewOverviewSalesLineChartObj = {
        x: month,
        y: customers.new.sales.total,
      };
      monthlyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyNewOverviewSalesLineChartObj);

      // new -> line chart obj -> overview -> repair
      const monthlyNewOverviewRepairLineChartObj = {
        x: month,
        y: customers.new.repair,
      };
      monthlyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyNewOverviewRepairLineChartObj);

      // new -> line chart obj -> sales -> online
      const monthlyNewSalesOnlineLineChartObj = {
        x: month,
        y: customers.new.sales.online,
      };
      monthlyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyNewSalesOnlineLineChartObj);

      // new -> line chart obj -> sales -> in-store
      const monthlyNewSalesInStoreLineChartObj = {
        x: month,
        y: customers.new.sales.inStore,
      };
      monthlyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyNewSalesInStoreLineChartObj);

      // new -> line chart obj -> online
      const monthlyNewOnlineLineChartObj = {
        x: month,
        y: customers.new.sales.online,
      };
      monthlyNewLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyNewOnlineLineChartObj);

      // new -> line chart obj -> in-store
      const monthlyNewInStoreLineChartObj = {
        x: month,
        y: customers.new.sales.inStore,
      };
      monthlyNewLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyNewInStoreLineChartObj);

      // new -> line chart obj -> repair
      const monthlyNewRepairLineChartObj = {
        x: month,
        y: customers.new.repair,
      };
      monthlyNewLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyNewRepairLineChartObj);

      // returning

      // returning -> bar chart obj

      // returning -> bar chart obj -> total
      const monthlyReturningTotalBarChartObj = {
        Months: month,
        Total: customers.returning.total,
      };
      monthlyReturningBarChartsObjAcc.total.push(
        monthlyReturningTotalBarChartObj
      );

      // returning -> bar chart obj -> all
      const monthlyReturningAllBarChartObj = {
        Months: month,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
        Repair: customers.returning.repair,
      };
      monthlyReturningBarChartsObjAcc.all.push(monthlyReturningAllBarChartObj);

      // returning -> bar chart obj -> overview
      const monthlyReturningOverviewBarChartObj = {
        Months: month,
        Sales: customers.returning.sales.total,
        Repair: customers.returning.repair,
      };
      monthlyReturningBarChartsObjAcc.overview.push(
        monthlyReturningOverviewBarChartObj
      );

      // returning -> bar chart obj -> sales
      const monthlyReturningSalesBarChartObj = {
        Months: month,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
      };
      monthlyReturningBarChartsObjAcc.sales.push(
        monthlyReturningSalesBarChartObj
      );

      // returning -> bar chart obj -> online
      const monthlyReturningOnlineBarChartObj = {
        Months: month,
        Online: customers.returning.sales.online,
      };
      monthlyReturningBarChartsObjAcc.online.push(
        monthlyReturningOnlineBarChartObj
      );

      // returning -> bar chart obj -> in-store
      const monthlyReturningInStoreBarChartObj = {
        Months: month,
        'In-Store': customers.returning.sales.inStore,
      };
      monthlyReturningBarChartsObjAcc.inStore.push(
        monthlyReturningInStoreBarChartObj
      );

      // returning -> bar chart obj -> repair
      const monthlyReturningRepairBarChartObj = {
        Months: month,
        Repair: customers.returning.repair,
      };
      monthlyReturningBarChartsObjAcc.repair.push(
        monthlyReturningRepairBarChartObj
      );

      // returning -> calendar chart obj

      dailyMetrics.forEach((dailyMetric) => {
        const { day, customers } = dailyMetric;

        // returning -> calendar chart obj -> total
        const monthlyReturningTotalCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.total,
        };
        monthlyReturningCalendarChartsObjAcc.total.push(
          monthlyReturningTotalCalendarChartObj
        );

        // returning -> calendar chart obj -> sales
        const monthlyReturningSalesCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.sales.total,
        };
        monthlyReturningCalendarChartsObjAcc.sales.push(
          monthlyReturningSalesCalendarChartObj
        );

        // returning -> calendar chart obj -> online
        const monthlyReturningOnlineCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.sales.online,
        };
        monthlyReturningCalendarChartsObjAcc.online.push(
          monthlyReturningOnlineCalendarChartObj
        );

        // returning -> calendar chart obj -> in-store
        const monthlyReturningInStoreCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.sales.inStore,
        };
        monthlyReturningCalendarChartsObjAcc.inStore.push(
          monthlyReturningInStoreCalendarChartObj
        );

        // returning -> calendar chart obj -> repair
        const monthlyReturningRepairCalendarChartObj = {
          day: `${selectedYear}-${monthNumberStr}-${day}`,
          value: customers.returning.repair,
        };
        monthlyReturningCalendarChartsObjAcc.repair.push(
          monthlyReturningRepairCalendarChartObj
        );
      });

      // returning -> line chart obj

      // returning -> line chart obj -> total
      const monthlyReturningTotalLineChartObj = {
        x: month,
        y: customers.returning.total,
      };
      monthlyReturningLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(monthlyReturningTotalLineChartObj);

      // returning -> line chart obj -> all -> in-store
      const monthlyReturningAllInStoreLineChartObj = {
        x: month,
        y: customers.returning.sales.inStore,
      };
      monthlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyReturningAllInStoreLineChartObj);

      // returning -> line chart obj -> all -> online
      const monthlyReturningAllOnlineLineChartObj = {
        x: month,
        y: customers.returning.sales.online,
      };
      monthlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyReturningAllOnlineLineChartObj);

      // returning -> line chart obj -> all -> repair
      const monthlyReturningAllRepairLineChartObj = {
        x: month,
        y: customers.returning.repair,
      };
      monthlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyReturningAllRepairLineChartObj);

      // returning -> line chart obj -> overview -> sales
      const monthlyReturningOverviewSalesLineChartObj = {
        x: month,
        y: customers.returning.sales.total,
      };
      monthlyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(monthlyReturningOverviewSalesLineChartObj);

      // returning -> line chart obj -> overview -> repair
      const monthlyReturningOverviewRepairLineChartObj = {
        x: month,
        y: customers.returning.repair,
      };
      monthlyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyReturningOverviewRepairLineChartObj);

      // returning -> line chart obj -> sales -> online
      const monthlyReturningSalesOnlineLineChartObj = {
        x: month,
        y: customers.returning.sales.online,
      };
      monthlyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyReturningSalesOnlineLineChartObj);

      // returning -> line chart obj -> sales -> in-store
      const monthlyReturningSalesInStoreLineChartObj = {
        x: month,
        y: customers.returning.sales.inStore,
      };
      monthlyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyReturningSalesInStoreLineChartObj);

      // returning -> line chart obj -> online
      const monthlyReturningOnlineLineChartObj = {
        x: month,
        y: customers.returning.sales.online,
      };
      monthlyReturningLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(monthlyReturningOnlineLineChartObj);

      // returning -> line chart obj -> in-store
      const monthlyReturningInStoreLineChartObj = {
        x: month,
        y: customers.returning.sales.inStore,
      };
      monthlyReturningLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(monthlyReturningInStoreLineChartObj);

      // returning -> line chart obj -> repair
      const monthlyReturningRepairLineChartObj = {
        x: month,
        y: customers.returning.repair,
      };
      monthlyReturningLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(monthlyReturningRepairLineChartObj);

      // churn & retention rate

      // churn & retention rate -> bar chart obj

      // churn & retention rate -> bar chart obj -> churn rate
      const monthlyChurnRateBarChartObj = {
        Months: month,
        'Churn Rate': customers.churnRate,
      };
      monthlyChurnRetentionRateBarChartsObjAcc.churnRate.push(
        monthlyChurnRateBarChartObj
      );

      // churn & retention rate -> bar chart obj -> retention rate
      const monthlyRetentionRateBarChartObj = {
        Months: month,
        'Retention Rate': customers.retentionRate,
      };
      monthlyChurnRetentionRateBarChartsObjAcc.retentionRate.push(
        monthlyRetentionRateBarChartObj
      );

      // churn & retention rate -> line chart obj

      // churn & retention rate -> line chart obj -> churn rate
      const monthlyChurnRateLineChartObj = {
        x: month,
        y: customers.churnRate,
      };
      monthlyChurnRetentionRateLineChartsObjAcc.churnRate
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Churn Rate'
        )
        ?.data.push(monthlyChurnRateLineChartObj);

      // churn & retention rate -> line chart obj -> retention rate
      const monthlyRetentionRateLineChartObj = {
        x: month,
        y: customers.retentionRate,
      };
      monthlyChurnRetentionRateLineChartsObjAcc.retentionRate
        .find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Retention Rate'
        )
        ?.data.push(monthlyRetentionRateLineChartObj);

      return monthlyCustomerChartsAcc;
    },
    [
      // overview
      initialMonthlyOverviewBarChartsObj,
      initialMonthlyOverviewCalendarChartsObj,
      initialMonthlyOverviewLineChartsObj,
      // new
      initialMonthlyNewBarChartsObj,
      initialMonthlyNewCalendarChartsObj,
      initialMonthlyNewLineChartsObj,
      // returning
      initialMonthlyReturningBarChartsObj,
      initialMonthlyReturningCalendarChartsObj,
      initialMonthlyReturningLineChartsObj,
      // churn & retention rate
      initialMonthlyChurnRetentionRateBarChartsObj,
      initialMonthlyChurnRetentionRateLineChartsObj,
    ]
  ) ?? [
    // overview
    initialMonthlyOverviewBarChartsObj,
    initialMonthlyOverviewCalendarChartsObj,
    initialMonthlyOverviewLineChartsObj,
    // new
    initialMonthlyNewBarChartsObj,
    initialMonthlyNewCalendarChartsObj,
    initialMonthlyNewLineChartsObj,
    // returning
    initialMonthlyReturningBarChartsObj,
    initialMonthlyReturningCalendarChartsObj,
    initialMonthlyReturningLineChartsObj,
    // churn & retention rate
    initialMonthlyChurnRetentionRateBarChartsObj,
    initialMonthlyChurnRetentionRateLineChartsObj,
  ];

  // yearly

  // yearly -> overview

  // yearly -> overview -> bar chart obj
  const initialYearlyOverviewBarChartsObj = structuredClone(
    OVERVIEW_BAR_CHART_TEMPLATE
  );
  // yearly -> overview -> line chart obj
  const initialYearlyOverviewLineChartsObj = structuredClone(
    OVERVIEW_LINE_CHART_TEMPLATE
  );
  // yearly -> overview -> pie chart obj
  const yearlyOverviewPieChartData: PieChartData[] = [
    {
      id: 'New',
      label: 'New',
      value: selectedYearMetrics?.customers.new.total ?? 0,
    },
    {
      id: 'Returning',
      label: 'Returning',
      value: selectedYearMetrics?.customers.returning.total ?? 0,
    },
  ];

  // yearly -> new

  // yearly -> new -> bar chart obj
  const initialYearlyNewBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // yearly -> new -> line chart obj
  const initialYearlyNewLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // yearly -> new -> pie chart obj
  const yearlyNewSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedYearMetrics?.customers.new.sales.total ?? 0,
  };
  const yearlyNewRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedYearMetrics?.customers.new.repair ?? 0,
  };
  const yearlyNewSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedYearMetrics?.customers.new.sales.online ?? 0,
  };
  const yearlyNewSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedYearMetrics?.customers.new.sales.inStore ?? 0,
  };

  const yearlyNewPieChartData: CustomerNewReturningPieObj = {
    overview: [yearlyNewSalesPieChartData, yearlyNewRepairPieChartData],
    all: [
      yearlyNewSalesOnlinePieChartData,
      yearlyNewSalesInStorePieChartData,
      yearlyNewRepairPieChartData,
    ],
    sales: [
      yearlyNewSalesOnlinePieChartData,
      yearlyNewSalesInStorePieChartData,
      yearlyNewRepairPieChartData,
    ],
  };

  // yearly -> returning

  // yearly -> returning -> bar chart obj
  const initialYearlyReturningBarChartsObj = structuredClone(
    NEW_RETURNING_BAR_CHART_TEMPLATE
  );
  // yearly -> returning -> line chart obj
  const initialYearlyReturningLineChartsObj = structuredClone(
    NEW_RETURNING_LINE_CHART_TEMPLATE
  );

  // yearly -> returning -> pie chart obj
  const yearlyReturningSalesPieChartData: PieChartData = {
    id: 'Sales',
    label: 'Sales',
    value: selectedYearMetrics?.customers.returning.sales.total ?? 0,
  };
  const yearlyReturningRepairPieChartData: PieChartData = {
    id: 'Repair',
    label: 'Repair',
    value: selectedYearMetrics?.customers.returning.repair ?? 0,
  };
  const yearlyReturningSalesOnlinePieChartData: PieChartData = {
    id: 'Online',
    label: 'Online',
    value: selectedYearMetrics?.customers.returning.sales.online ?? 0,
  };
  const yearlyReturningSalesInStorePieChartData: PieChartData = {
    id: 'In-Store',
    label: 'In-Store',
    value: selectedYearMetrics?.customers.returning.sales.inStore ?? 0,
  };

  const yearlyReturningPieChartData: CustomerNewReturningPieObj = {
    overview: [
      yearlyReturningSalesPieChartData,
      yearlyReturningRepairPieChartData,
    ],
    all: [
      yearlyReturningSalesOnlinePieChartData,
      yearlyReturningSalesInStorePieChartData,
      yearlyReturningRepairPieChartData,
    ],
    sales: [
      yearlyReturningSalesOnlinePieChartData,
      yearlyReturningSalesInStorePieChartData,
      yearlyReturningRepairPieChartData,
    ],
  };

  // yearly -> churn & retention rate

  // yearly -> churn & retention rate -> bar chart obj
  const initialYearlyChurnRetentionRateBarChartsObj = structuredClone(
    CHURN_RETENTION_BAR_CHART_TEMPLATE
  );
  // yearly -> churn & retention rate -> line chart obj
  const initialYearlyChurnRetentionRateLineChartsObj = structuredClone(
    CHURN_RETENTION_LINE_CHART_TEMPLATE
  );
  // yearly -> churn & retention rate -> pie chart obj
  const yearlyChurnRetentionRatePieChartData: PieChartData[] = [
    {
      id: 'Churn Rate',
      label: 'Churn Rate',
      value: selectedYearMetrics?.customers.churnRate ?? 0,
    },
    {
      id: 'Retention Rate',
      label: 'Retention Rate',
      value: selectedYearMetrics?.customers.retentionRate ?? 0,
    },
  ];

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // yearly charts

  const [
    // overview
    yearlyOverviewBarChartsObj,
    yearlyOverviewLineChartsObj,
    // new
    yearlyNewBarChartsObj,
    yearlyNewLineChartsObj,
    // returning
    yearlyReturningBarChartsObj,
    yearlyReturningLineChartsObj,
    // churn & retention rate
    yearlyChurnRetentionRateBarChartsObj,
    yearlyChurnRetentionRateLineChartsObj,
  ] = currentStoreMetrics?.customerMetrics.yearlyMetrics.reduce(
    (yearlyCustomerChartsAcc, yearlyMetric) => {
      const [
        // overview
        yearlyOverviewBarChartsObjAcc,
        yearlyOverviewLineChartsObjAcc,
        // new
        yearlyNewBarChartsObjAcc,
        yearlyNewLineChartsObjAcc,
        // returning
        yearlyReturningBarChartsObjAcc,
        yearlyReturningLineChartsObjAcc,
        // churn & retention rate
        yearlyChurnRetentionRateBarChartsObjAcc,
        yearlyChurnRetentionRateLineChartsObjAcc,
      ] = yearlyCustomerChartsAcc;

      const { year, customers } = yearlyMetric;

      // overview

      // overview -> bar chart obj

      // overview -> bar chart obj -> total
      const yearlyOverviewTotalBarChartObj = {
        Years: year,
        Total: customers.total,
      };
      yearlyOverviewBarChartsObjAcc.overview.push(
        yearlyOverviewTotalBarChartObj
      );

      // overview -> bar chart obj -> new
      const yearlyOverviewNewBarChartObj = {
        Years: year,
        New: customers.new.total,
      };
      yearlyOverviewBarChartsObjAcc.new.push(yearlyOverviewNewBarChartObj);

      // overview -> bar chart obj -> returning
      const yearlyOverviewReturningBarChartObj = {
        Years: year,
        Returning: customers.returning.total,
      };
      yearlyOverviewBarChartsObjAcc.returning.push(
        yearlyOverviewReturningBarChartObj
      );

      // overview -> line chart obj

      // overview -> line chart obj -> overview -> new
      const yearlyOverviewNewLineChartObj = {
        x: year,
        y: customers.new.total,
      };
      yearlyOverviewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(yearlyOverviewNewLineChartObj);

      // overview -> line chart obj -> overview -> returning
      const yearlyOverviewReturningLineChartObj = {
        x: year,
        y: customers.returning.total,
      };
      yearlyOverviewLineChartsObjAcc.overview
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(yearlyOverviewReturningLineChartObj);

      // overview -> line chart obj -> new -> new
      const yearlyNewNewLineChartObj = {
        x: year,
        y: customers.new.total,
      };
      yearlyOverviewLineChartsObjAcc.new
        .find((lineChartData: LineChartData) => lineChartData.id === 'New')
        ?.data.push(yearlyNewNewLineChartObj);

      // overview -> line chart obj -> returning -> returning
      const yearlyReturningReturningLineChartObj = {
        x: year,
        y: customers.returning.total,
      };
      yearlyOverviewLineChartsObjAcc.returning
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Returning'
        )
        ?.data.push(yearlyReturningReturningLineChartObj);

      // new

      // new -> bar chart obj

      // new -> bar chart obj -> total
      const yearlyNewTotalBarChartObj = {
        Years: year,
        Total: customers.new.total,
      };
      yearlyNewBarChartsObjAcc.total.push(yearlyNewTotalBarChartObj);

      // new -> bar chart obj -> all
      const yearlyNewAllBarChartObj = {
        Years: year,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
        Repair: customers.new.repair,
      };
      yearlyNewBarChartsObjAcc.all.push(yearlyNewAllBarChartObj);

      // new -> bar chart obj -> overview
      const yearlyNewOverviewBarChartObj = {
        Years: year,
        Sales: customers.new.sales.total,
        Repair: customers.new.repair,
      };
      yearlyNewBarChartsObjAcc.overview.push(yearlyNewOverviewBarChartObj);

      // new -> bar chart obj -> sales
      const yearlyNewSalesBarChartObj = {
        Years: year,
        'In-Store': customers.new.sales.inStore,
        Online: customers.new.sales.online,
      };
      yearlyNewBarChartsObjAcc.sales.push(yearlyNewSalesBarChartObj);

      // new -> bar chart obj -> online
      const yearlyNewOnlineBarChartObj = {
        Years: year,
        Online: customers.new.sales.online,
      };
      yearlyNewBarChartsObjAcc.online.push(yearlyNewOnlineBarChartObj);

      // new -> bar chart obj -> in-store
      const yearlyNewInStoreBarChartObj = {
        Years: year,
        'In-Store': customers.new.sales.inStore,
      };
      yearlyNewBarChartsObjAcc.inStore.push(yearlyNewInStoreBarChartObj);

      // new -> bar chart obj -> repair
      const yearlyNewRepairBarChartObj = {
        Years: year,
        Repair: customers.new.repair,
      };
      yearlyNewBarChartsObjAcc.repair.push(yearlyNewRepairBarChartObj);

      // new -> line chart obj

      // new -> line chart obj -> total
      const yearlyNewTotalLineChartObj = {
        x: year,
        y: customers.new.total,
      };
      yearlyNewLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyNewTotalLineChartObj);

      // new -> line chart obj -> all -> in-store
      const yearlyNewAllInStoreLineChartObj = {
        x: year,
        y: customers.new.sales.inStore,
      };
      yearlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyNewAllInStoreLineChartObj);

      // new -> line chart obj -> all -> online
      const yearlyNewAllOnlineLineChartObj = {
        x: year,
        y: customers.new.sales.online,
      };
      yearlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyNewAllOnlineLineChartObj);

      // new -> line chart obj -> all -> repair
      const yearlyNewAllRepairLineChartObj = {
        x: year,
        y: customers.new.repair,
      };
      yearlyNewLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyNewAllRepairLineChartObj);

      // new -> line chart obj -> overview -> sales
      const yearlyNewOverviewSalesLineChartObj = {
        x: year,
        y: customers.new.sales.total,
      };
      yearlyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyNewOverviewSalesLineChartObj);

      // new -> line chart obj -> overview -> repair
      const yearlyNewOverviewRepairLineChartObj = {
        x: year,
        y: customers.new.repair,
      };
      yearlyNewLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyNewOverviewRepairLineChartObj);

      // new -> line chart obj -> sales -> online
      const yearlyNewSalesOnlineLineChartObj = {
        x: year,
        y: customers.new.sales.online,
      };
      yearlyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyNewSalesOnlineLineChartObj);

      // new -> line chart obj -> sales -> in-store
      const yearlyNewSalesInStoreLineChartObj = {
        x: year,
        y: customers.new.sales.inStore,
      };
      yearlyNewLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyNewSalesInStoreLineChartObj);

      // new -> line chart obj -> online
      const yearlyNewOnlineLineChartObj = {
        x: year,
        y: customers.new.sales.online,
      };
      yearlyNewLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyNewOnlineLineChartObj);

      // new -> line chart obj -> in-store
      const yearlyNewInStoreLineChartObj = {
        x: year,
        y: customers.new.sales.inStore,
      };
      yearlyNewLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyNewInStoreLineChartObj);

      // new -> line chart obj -> repair
      const yearlyNewRepairLineChartObj = {
        x: year,
        y: customers.new.repair,
      };
      yearlyNewLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyNewRepairLineChartObj);

      // returning

      // returning -> bar chart obj

      // returning -> bar chart obj -> total
      const yearlyReturningTotalBarChartObj = {
        Years: year,
        Total: customers.returning.total,
      };
      yearlyReturningBarChartsObjAcc.total.push(
        yearlyReturningTotalBarChartObj
      );

      // returning -> bar chart obj -> all
      const yearlyReturningAllBarChartObj = {
        Years: year,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
        Repair: customers.returning.repair,
      };
      yearlyReturningBarChartsObjAcc.all.push(yearlyReturningAllBarChartObj);

      // returning -> bar chart obj -> overview
      const yearlyReturningOverviewBarChartObj = {
        Years: year,
        Sales: customers.returning.sales.total,
        Repair: customers.returning.repair,
      };
      yearlyReturningBarChartsObjAcc.overview.push(
        yearlyReturningOverviewBarChartObj
      );

      // returning -> bar chart obj -> sales
      const yearlyReturningSalesBarChartObj = {
        Years: year,
        'In-Store': customers.returning.sales.inStore,
        Online: customers.returning.sales.online,
      };
      yearlyReturningBarChartsObjAcc.sales.push(
        yearlyReturningSalesBarChartObj
      );

      // returning -> bar chart obj -> online
      const yearlyReturningOnlineBarChartObj = {
        Years: year,
        Online: customers.returning.sales.online,
      };
      yearlyReturningBarChartsObjAcc.online.push(
        yearlyReturningOnlineBarChartObj
      );

      // returning -> bar chart obj -> in-store
      const yearlyReturningInStoreBarChartObj = {
        Years: year,
        'In-Store': customers.returning.sales.inStore,
      };
      yearlyReturningBarChartsObjAcc.inStore.push(
        yearlyReturningInStoreBarChartObj
      );

      // returning -> bar chart obj -> repair
      const yearlyReturningRepairBarChartObj = {
        Years: year,
        Repair: customers.returning.repair,
      };
      yearlyReturningBarChartsObjAcc.repair.push(
        yearlyReturningRepairBarChartObj
      );

      // returning -> line chart obj

      // returning -> line chart obj -> total
      const yearlyReturningTotalLineChartObj = {
        x: year,
        y: customers.returning.total,
      };
      yearlyReturningLineChartsObjAcc.total
        .find((lineChartData: LineChartData) => lineChartData.id === 'Total')
        ?.data.push(yearlyReturningTotalLineChartObj);

      // returning -> line chart obj -> all -> in-store
      const yearlyReturningAllInStoreLineChartObj = {
        x: year,
        y: customers.returning.sales.inStore,
      };
      yearlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyReturningAllInStoreLineChartObj);

      // returning -> line chart obj -> all -> online
      const yearlyReturningAllOnlineLineChartObj = {
        x: year,
        y: customers.returning.sales.online,
      };
      yearlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyReturningAllOnlineLineChartObj);

      // returning -> line chart obj -> all -> repair
      const yearlyReturningAllRepairLineChartObj = {
        x: year,
        y: customers.returning.repair,
      };
      yearlyReturningLineChartsObjAcc.all
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyReturningAllRepairLineChartObj);

      // returning -> line chart obj -> overview -> sales
      const yearlyReturningOverviewSalesLineChartObj = {
        x: year,
        y: customers.returning.sales.total,
      };
      yearlyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Sales')
        ?.data.push(yearlyReturningOverviewSalesLineChartObj);

      // returning -> line chart obj -> overview -> repair
      const yearlyReturningOverviewRepairLineChartObj = {
        x: year,
        y: customers.returning.repair,
      };
      yearlyReturningLineChartsObjAcc.overview
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyReturningOverviewRepairLineChartObj);

      // returning -> line chart obj -> sales -> online
      const yearlyReturningSalesOnlineLineChartObj = {
        x: year,
        y: customers.returning.sales.online,
      };
      yearlyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyReturningSalesOnlineLineChartObj);

      // returning -> line chart obj -> sales -> in-store
      const yearlyReturningSalesInStoreLineChartObj = {
        x: year,
        y: customers.returning.sales.inStore,
      };
      yearlyReturningLineChartsObjAcc.sales
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyReturningSalesInStoreLineChartObj);

      // returning -> line chart obj -> online
      const yearlyReturningOnlineLineChartObj = {
        x: year,
        y: customers.returning.sales.online,
      };
      yearlyReturningLineChartsObjAcc.online
        .find((lineChartData: LineChartData) => lineChartData.id === 'Online')
        ?.data.push(yearlyReturningOnlineLineChartObj);

      // returning -> line chart obj -> in-store
      const yearlyReturningInStoreLineChartObj = {
        x: year,
        y: customers.returning.sales.inStore,
      };
      yearlyReturningLineChartsObjAcc.inStore
        .find((lineChartData: LineChartData) => lineChartData.id === 'In-Store')
        ?.data.push(yearlyReturningInStoreLineChartObj);

      // returning -> line chart obj -> repair
      const yearlyReturningRepairLineChartObj = {
        x: year,
        y: customers.returning.repair,
      };
      yearlyReturningLineChartsObjAcc.repair
        .find((lineChartData: LineChartData) => lineChartData.id === 'Repair')
        ?.data.push(yearlyReturningRepairLineChartObj);

      // churn & retention rate

      // churn & retention rate -> bar chart obj

      // churn & retention rate -> bar chart obj -> churn rate
      const yearlyChurnRateBarChartObj = {
        Years: year,
        'Churn Rate': customers.churnRate,
      };
      yearlyChurnRetentionRateBarChartsObjAcc.churnRate.push(
        yearlyChurnRateBarChartObj
      );

      // churn & retention rate -> bar chart obj -> retention rate
      const yearlyRetentionRateBarChartObj = {
        Years: year,
        'Retention Rate': customers.retentionRate,
      };
      yearlyChurnRetentionRateBarChartsObjAcc.retentionRate.push(
        yearlyRetentionRateBarChartObj
      );

      // churn & retention rate -> line chart obj

      // churn & retention rate -> line chart obj -> churn rate
      const yearlyChurnRateLineChartObj = {
        x: year,
        y: customers.churnRate,
      };
      yearlyChurnRetentionRateLineChartsObjAcc.churnRate
        .find(
          (lineChartData: LineChartData) => lineChartData.id === 'Churn Rate'
        )
        ?.data.push(yearlyChurnRateLineChartObj);

      // churn & retention rate -> line chart obj -> retention rate
      const yearlyRetentionRateLineChartObj = {
        x: year,
        y: customers.retentionRate,
      };
      yearlyChurnRetentionRateLineChartsObjAcc.retentionRate
        .find(
          (lineChartData: LineChartData) =>
            lineChartData.id === 'Retention Rate'
        )
        ?.data.push(yearlyRetentionRateLineChartObj);

      return yearlyCustomerChartsAcc;
    },
    [
      // overview
      initialYearlyOverviewBarChartsObj,
      initialYearlyOverviewLineChartsObj,
      // new
      initialYearlyNewBarChartsObj,
      initialYearlyNewLineChartsObj,
      // returning
      initialYearlyReturningBarChartsObj,
      initialYearlyReturningLineChartsObj,
      // churn & retention rate
      initialYearlyChurnRetentionRateBarChartsObj,
      initialYearlyChurnRetentionRateLineChartsObj,
    ]
  ) ?? [
    // overview
    initialYearlyOverviewBarChartsObj,
    initialYearlyOverviewLineChartsObj,
    // new
    initialYearlyNewBarChartsObj,
    initialYearlyNewLineChartsObj,
    // returning
    initialYearlyReturningBarChartsObj,
    initialYearlyReturningLineChartsObj,
    // churn & retention rate
    initialYearlyChurnRetentionRateBarChartsObj,
    initialYearlyChurnRetentionRateLineChartsObj,
  ];

  return {
    dailyCharts: {
      overview: {
        barChartsObj: dailyOverviewBarChartsObj,
        calendarChartsObj: dailyOverviewCalendarChartsObj,
        lineChartsObj: dailyOverviewLineChartsObj,
        pieChartObj: dailyOverviewPieChartData,
      },
      new: {
        barChartsObj: dailyNewBarChartsObj,
        calendarChartsObj: dailyNewCalendarChartsObj,
        lineChartsObj: dailyNewLineChartsObj,
        pieChartObj: dailyNewPieChartData,
      },
      returning: {
        barChartsObj: dailyReturningBarChartsObj,
        calendarChartsObj: dailyReturningCalendarChartsObj,
        lineChartsObj: dailyReturningLineChartsObj,
        pieChartObj: dailyReturningPieChartData,
      },
    },
    monthlyCharts: {
      overview: {
        barChartsObj: monthlyOverviewBarChartsObj,
        calendarChartsObj: monthlyOverviewCalendarChartsObj,
        lineChartsObj: monthlyOverviewLineChartsObj,
        pieChartObj: monthlyOverviewPieChartData,
      },
      new: {
        barChartsObj: monthlyNewBarChartsObj,
        calendarChartsObj: monthlyNewCalendarChartsObj,
        lineChartsObj: monthlyNewLineChartsObj,
        pieChartObj: monthlyNewPieChartData,
      },
      returning: {
        barChartsObj: monthlyReturningBarChartsObj,
        calendarChartsObj: monthlyReturningCalendarChartsObj,
        lineChartsObj: monthlyReturningLineChartsObj,
        pieChartObj: monthlyReturningPieChartData,
      },
      churnRetention: {
        barChartsObj: monthlyChurnRetentionRateBarChartsObj,
        lineChartsObj: monthlyChurnRetentionRateLineChartsObj,
        pieChartObj: monthlyChurnRetentionRatePieChartData,
      },
    },
    yearlyCharts: {
      overview: {
        barChartsObj: yearlyOverviewBarChartsObj,
        lineChartsObj: yearlyOverviewLineChartsObj,
        pieChartObj: yearlyOverviewPieChartData,
      },
      new: {
        barChartsObj: yearlyNewBarChartsObj,
        lineChartsObj: yearlyNewLineChartsObj,
        pieChartObj: yearlyNewPieChartData,
      },
      returning: {
        barChartsObj: yearlyReturningBarChartsObj,
        lineChartsObj: yearlyReturningLineChartsObj,
        pieChartObj: yearlyReturningPieChartData,
      },
      churnRetention: {
        barChartsObj: yearlyChurnRetentionRateBarChartsObj,
        lineChartsObj: yearlyChurnRetentionRateLineChartsObj,
        pieChartObj: yearlyChurnRetentionRatePieChartData,
      },
    },
  };
}

export { returnCustomerChartsData, returnSelectedDateCustomerMetrics };
export type {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
};
