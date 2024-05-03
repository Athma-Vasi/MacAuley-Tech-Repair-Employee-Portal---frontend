import { toFixedFloat } from "../../../utils";
import { BarChartData } from "../../charts/responsiveBarChart/types";
import { CalendarChartData } from "../../charts/responsiveCalendarChart/types";
import { LineChartData } from "../../charts/responsiveLineChart/types";
import { PieChartData } from "../../charts/responsivePieChart/types";
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  CustomerDailyMetric,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  Month,
  Year,
} from "../types";

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

function returnSelectedDateCustomerMetrics2({
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
  const selectedYearMetrics = currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
    (yearlyMetric) => yearlyMetric.year === year
  );
  const prevYearMetrics = currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
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
  const prevPrevYearMetrics = currentStoreMetrics?.customerMetrics.yearlyMetrics.find(
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

  const monthCustomerMetrics = {
    selectedMonthMetrics,
    prevMonthMetrics,
  };

  // selected day's customer metrics
  const selectedDayMetrics = selectedMonthMetrics?.dailyMetrics.find(
    (dailyMetric) => dailyMetric.day === day
  );
  const prevDayMetrics =
    day === "01"
      ? monthCustomerMetrics.prevMonthMetrics?.dailyMetrics.find(
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

// overview

type CustomerOverviewObjKey =
  | "overview" // y-axis variables: new, returning
  | "new" // y-axis variables: new
  | "returning"; // y-axis variables: returning

type CustomerOverviewBarCharts = Record<CustomerOverviewObjKey, BarChartData[]>; // y-axis variables: new, returning

type CustomerOverviewCalendarCharts = Record<CustomerOverviewObjKey, CalendarChartData[]>; // y-axis variables: new, returning

type CustomerOverviewLineCharts = Record<CustomerOverviewObjKey, LineChartData[]>; // y-axis variables: new, returning

// new & returning

type CustomerNewReturningObjKey =
  | "total" // y-axis variables: total
  | "all" // y-axis variables: sales, in-store, repair
  | "overview" // y-axis variables: sales, repair
  | "sales" // y-axis variables: online, in-store
  | "online" // y-axis variables: online
  | "inStore" // y-axis variables: in-store
  | "repair"; // y-axis variables: repair

type CustomerNewReturningBarCharts = Record<CustomerNewReturningObjKey, BarChartData[]>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningCalendarChartsKey =
  | "total" // y-axis variables: total
  | "sales" // y-axis variables: sales
  | "online" // y-axis variables: online
  | "inStore" // y-axis variables: in-store
  | "repair"; // y-axis variables: repair

type CustomerNewReturningCalendarCharts = Record<
  CustomerNewReturningCalendarChartsKey,
  CalendarChartData[]
>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningLineCharts = Record<CustomerNewReturningObjKey, LineChartData[]>; // y-axis variables: total, online, in-store, repair, all

type CustomerNewReturningPieChartsKey =
  | "overview" // y-axis variables: sales, repair
  | "all" // y-axis variables: sales, in-store, repair
  | "sales"; // y-axis variables: online, in-store

type CustomerNewReturningPieCharts = Record<
  CustomerNewReturningPieChartsKey,
  PieChartData[]
>; // y-axis variables: sales, repair, online, in-store, all

// churn & retention

type CustomerChurnRetentionObjKey =
  | "overview" // y-axis variables: churn rate, retention rate
  | "churnRate" // y-axis variables: churn rate
  | "retentionRate"; // y-axis variables: retention rate

type CustomerChurnRetentionBarCharts = Record<
  CustomerChurnRetentionObjKey,
  BarChartData[]
>; // y-axis variables: churn rate, retention rate

type CustomerChurnRetentionLineCharts = Record<
  CustomerChurnRetentionObjKey,
  LineChartData[]
>; // y-axis variables: churn rate, retention rate

type ReturnCustomerMetricsChartsInput = {
  businessMetrics: BusinessMetric[];
  months: Month[];
  selectedDateCustomerMetrics: SelectedDateCustomerMetrics;
  storeLocation: BusinessMetricStoreLocation;
};

type CustomerMetricsCharts = {
  daily: {
    overview: {
      bar: CustomerOverviewBarCharts;
      calendar: CustomerOverviewCalendarCharts;
      line: CustomerOverviewLineCharts;
      pie: PieChartData[];
    };
    new: {
      bar: CustomerNewReturningBarCharts;
      calendar: CustomerNewReturningCalendarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
    returning: {
      bar: CustomerNewReturningBarCharts;
      calendar: CustomerNewReturningCalendarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
  };
  monthly: {
    overview: {
      bar: CustomerOverviewBarCharts;
      calendar: CustomerOverviewCalendarCharts;
      line: CustomerOverviewLineCharts;
      pie: PieChartData[];
    };
    new: {
      bar: CustomerNewReturningBarCharts;
      calendar: CustomerNewReturningCalendarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
    returning: {
      bar: CustomerNewReturningBarCharts;
      calendar: CustomerNewReturningCalendarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
    churnRetention: {
      bar: CustomerChurnRetentionBarCharts;
      line: CustomerChurnRetentionLineCharts;
      pie: PieChartData[];
    };
  };
  yearly: {
    overview: {
      bar: CustomerOverviewBarCharts;
      line: CustomerOverviewLineCharts;
      pie: PieChartData[];
    };
    new: {
      bar: CustomerNewReturningBarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
    returning: {
      bar: CustomerNewReturningBarCharts;
      line: CustomerNewReturningLineCharts;
      pie: CustomerNewReturningPieCharts;
    };
    churnRetention: {
      bar: CustomerChurnRetentionBarCharts;
      line: CustomerChurnRetentionLineCharts;
      pie: PieChartData[];
    };
  };
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

async function returnCustomerMetricsCharts2({
  businessMetrics,
  months,
  selectedDateCustomerMetrics,
  storeLocation,
}: ReturnCustomerMetricsChartsInput): Promise<CustomerMetricsCharts> {
  const {
    yearCustomerMetrics: { selectedYearMetrics },
  } = selectedDateCustomerMetrics;
  const selectedYear = selectedYearMetrics?.year ?? "2023";

  const {
    monthCustomerMetrics: { selectedMonthMetrics },
  } = selectedDateCustomerMetrics;
  const selectedMonth = selectedMonthMetrics?.month ?? "January";
  const monthNumber = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

  const {
    dayCustomerMetrics: { selectedDayMetrics },
  } = selectedDateCustomerMetrics;

  const OVERVIEW_BAR_CHART_TEMPLATE: CustomerOverviewBarCharts = {
    overview: [],
    new: [],
    returning: [],
  };

  const OVERVIEW_CALENDAR_CHART_TEMPLATE: CustomerOverviewCalendarCharts = {
    overview: [],
    new: [],
    returning: [],
  };

  const OVERVIEW_LINE_CHART_TEMPLATE: CustomerOverviewLineCharts = {
    overview: [
      { id: "New", data: [] },
      { id: "Returning", data: [] },
    ],
    new: [{ id: "New", data: [] }],
    returning: [{ id: "Returning", data: [] }],
  };

  const NEW_RETURNING_BAR_CHART_TEMPLATE: CustomerNewReturningBarCharts = {
    total: [],
    all: [],
    overview: [],
    sales: [],
    online: [],
    inStore: [],
    repair: [],
  };

  const NEW_RETURNING_CALENDAR_CHART_TEMPLATE: CustomerNewReturningCalendarCharts = {
    total: [],
    sales: [],
    online: [],
    inStore: [],
    repair: [],
  };

  const NEW_RETURNING_LINE_CHART_TEMPLATE: CustomerNewReturningLineCharts = {
    total: [{ id: "Total", data: [] }],
    all: [
      { id: "Online", data: [] },
      { id: "In-Store", data: [] },
      { id: "Repair", data: [] },
    ],
    overview: [
      { id: "Repair", data: [] },
      { id: "Sales", data: [] },
    ],
    sales: [
      { id: "Online", data: [] },
      { id: "In-Store", data: [] },
    ],
    online: [{ id: "Online", data: [] }],
    inStore: [{ id: "In-Store", data: [] }],
    repair: [{ id: "Repair", data: [] }],
  };

  const CHURN_RETENTION_BAR_CHART_TEMPLATE: CustomerChurnRetentionBarCharts = {
    overview: [],
    churnRate: [],
    retentionRate: [],
  };

  const CHURN_RETENTION_LINE_CHART_TEMPLATE: CustomerChurnRetentionLineCharts = {
    overview: [
      { id: "Churn Rate", data: [] },
      { id: "Retention Rate", data: [] },
    ],
    churnRate: [{ id: "Churn Rate", data: [] }],
    retentionRate: [{ id: "Retention Rate", data: [] }],
  };

  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  const [dailyCustomerCharts, monthlyCustomerCharts, yearlyCustomerCharts] =
    await Promise.all([
      createDailyCustomerCharts({
        dailyMetrics: selectedMonthMetrics?.dailyMetrics,
        monthNumber,
        newBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        newCalendarChartsTemplate: NEW_RETURNING_CALENDAR_CHART_TEMPLATE,
        newLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        overviewBarChartsTemplate: OVERVIEW_BAR_CHART_TEMPLATE,
        overviewCalendarChartsTemplate: OVERVIEW_CALENDAR_CHART_TEMPLATE,
        overviewLineChartsTemplate: OVERVIEW_LINE_CHART_TEMPLATE,
        returningBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        returningCalendarChartsTemplate: NEW_RETURNING_CALENDAR_CHART_TEMPLATE,
        returningLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        selectedDayMetrics,
        selectedYear,
      }),
      createMonthlyCustomerCharts({
        monthlyMetrics: selectedYearMetrics?.monthlyMetrics,
        newBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        newCalendarChartsTemplate: NEW_RETURNING_CALENDAR_CHART_TEMPLATE,
        newLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        overviewBarChartsTemplate: OVERVIEW_BAR_CHART_TEMPLATE,
        overviewCalendarChartsTemplate: OVERVIEW_CALENDAR_CHART_TEMPLATE,
        overviewLineChartsTemplate: OVERVIEW_LINE_CHART_TEMPLATE,
        returningBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        returningCalendarChartsTemplate: NEW_RETURNING_CALENDAR_CHART_TEMPLATE,
        returningLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        churnRetentionBarChartsTemplate: CHURN_RETENTION_BAR_CHART_TEMPLATE,
        churnRetentionLineChartsTemplate: CHURN_RETENTION_LINE_CHART_TEMPLATE,
        months,
        selectedYear,
        selectedMonthMetrics,
      }),
      createYearlyCustomerCharts({
        yearlyMetrics: currentStoreMetrics?.customerMetrics.yearlyMetrics,
        newBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        newLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        overviewBarChartsTemplate: OVERVIEW_BAR_CHART_TEMPLATE,
        overviewLineChartsTemplate: OVERVIEW_LINE_CHART_TEMPLATE,
        returningBarChartsTemplate: NEW_RETURNING_BAR_CHART_TEMPLATE,
        returningLineChartsTemplate: NEW_RETURNING_LINE_CHART_TEMPLATE,
        churnRetentionBarChartsTemplate: CHURN_RETENTION_BAR_CHART_TEMPLATE,
        churnRetentionLineChartsTemplate: CHURN_RETENTION_LINE_CHART_TEMPLATE,
        selectedYearMetrics,
      }),
    ]);

  return {
    daily: dailyCustomerCharts,
    monthly: monthlyCustomerCharts,
    yearly: yearlyCustomerCharts,
  };
}

type CreateDailyCustomerChartsInput = {
  dailyMetrics?: CustomerDailyMetric[];
  monthNumber: string;
  newBarChartsTemplate: CustomerNewReturningBarCharts;
  newCalendarChartsTemplate: CustomerNewReturningCalendarCharts;
  newLineChartsTemplate: CustomerNewReturningLineCharts;
  overviewBarChartsTemplate: CustomerOverviewBarCharts;
  overviewCalendarChartsTemplate: CustomerOverviewCalendarCharts;
  overviewLineChartsTemplate: CustomerOverviewLineCharts;
  returningBarChartsTemplate: CustomerNewReturningBarCharts;
  returningCalendarChartsTemplate: CustomerNewReturningCalendarCharts;
  returningLineChartsTemplate: CustomerNewReturningLineCharts;
  selectedDayMetrics?: CustomerDailyMetric;
  selectedYear: Year;
};

async function createDailyCustomerCharts({
  dailyMetrics,
  monthNumber,
  newBarChartsTemplate,
  newCalendarChartsTemplate,
  newLineChartsTemplate,
  overviewBarChartsTemplate,
  overviewCalendarChartsTemplate,
  overviewLineChartsTemplate,
  returningBarChartsTemplate,
  returningCalendarChartsTemplate,
  returningLineChartsTemplate,
  selectedDayMetrics,
  selectedYear,
}: CreateDailyCustomerChartsInput): Promise<CustomerMetricsCharts["daily"]> {
  if (!dailyMetrics || !selectedDayMetrics) {
    return new Promise((resolve) => {
      resolve({
        overview: {
          bar: overviewBarChartsTemplate,
          calendar: overviewCalendarChartsTemplate,
          line: overviewLineChartsTemplate,
          pie: [],
        },
        new: {
          bar: newBarChartsTemplate,
          calendar: newCalendarChartsTemplate,
          line: newLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
        returning: {
          bar: returningBarChartsTemplate,
          calendar: returningCalendarChartsTemplate,
          line: returningLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        dailyOverviewBarCharts,
        dailyOverviewCalendarCharts,
        dailyOverviewLineCharts,

        dailyNewBarCharts,
        dailyNewCalendarCharts,
        dailyNewLineCharts,

        dailyReturningBarCharts,
        dailyReturningCalendarCharts,
        dailyReturningLineCharts,
      ] = dailyMetrics.reduce(
        (dailyCustomerChartsAcc, dailyMetric) => {
          const [
            dailyOverviewBarChartsAcc,
            dailyOverviewCalendarChartsAcc,
            dailyOverviewLineChartsAcc,

            dailyNewBarChartsAcc,
            dailyNewCalendarChartsAcc,
            dailyNewLineChartsAcc,

            dailyReturningBarChartsAcc,
            dailyReturningCalendarChartsAcc,
            dailyReturningLineChartsAcc,
          ] = dailyCustomerChartsAcc;

          const { day, customers } = dailyMetric;

          // overview section y-axis variables: overview, new, returning

          // overview -> bar chart obj -> overview
          const dailyOverviewBarChart = {
            Days: day,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          dailyOverviewBarChartsAcc.overview.push(dailyOverviewBarChart);

          // overview -> bar chart obj -> new
          const dailyNewBarChart = {
            Days: day,
            New: customers.new.total,
          };
          dailyOverviewBarChartsAcc.new.push(dailyNewBarChart);

          // overview -> bar chart obj -> returning
          const dailyReturningBarChart = {
            Days: day,
            Returning: customers.returning.total,
          };
          dailyOverviewBarChartsAcc.returning.push(dailyReturningBarChart);

          // overview -> calendar chart obj -> overview
          const dailyOverviewCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.total,
          };
          dailyOverviewCalendarChartsAcc.overview.push(dailyOverviewCalendarChart);

          // overview -> calendar chart obj -> new
          const dailyNewCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.total,
          };
          dailyOverviewCalendarChartsAcc.new.push(dailyNewCalendarChart);

          // overview -> calendar chart obj -> returning
          const dailyReturningCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.total,
          };
          dailyOverviewCalendarChartsAcc.returning.push(dailyReturningCalendarChart);

          // overview -> line chart obj

          // overview -> line chart obj -> new
          const dailyOverviewNewLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(dailyOverviewNewLineChart);

          // overview -> line chart obj -> returning
          const dailyOverviewReturningLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(dailyOverviewReturningLineChart);

          // overview -> line chart obj -> new
          const dailyNewNewLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyOverviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(dailyNewNewLineChart);

          // overview -> line chart obj -> returning
          const dailyReturningReturningLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyOverviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(dailyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          // new -> bar chart obj -> total
          const dailyNewTotalBarChart = {
            Days: day,
            Total: customers.new.total,
          };
          dailyNewBarChartsAcc.total.push(dailyNewTotalBarChart);

          // new -> bar chart obj -> all
          const dailyNewAllBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.all.push(dailyNewAllBarChart);

          // new -> bar chart obj -> overview
          const dailyNewOverviewBarChart = {
            Days: day,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.overview.push(dailyNewOverviewBarChart);

          // new -> bar chart obj -> sales
          const dailyNewSalesBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          dailyNewBarChartsAcc.sales.push(dailyNewSalesBarChart);

          // new -> bar chart obj -> online
          const dailyNewOnlineBarChart = {
            Days: day,
            Online: customers.new.sales.online,
          };
          dailyNewBarChartsAcc.online.push(dailyNewOnlineBarChart);

          // new -> bar chart obj -> in-store
          const dailyNewInStoreBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
          };
          dailyNewBarChartsAcc.inStore.push(dailyNewInStoreBarChart);

          // new -> bar chart obj -> repair
          const dailyNewRepairBarChart = {
            Days: day,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.repair.push(dailyNewRepairBarChart);

          // new -> calendar chart obj

          // new -> calendar chart obj -> total
          const dailyNewTotalCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.total,
          };
          dailyNewCalendarChartsAcc.total.push(dailyNewTotalCalendarChart);

          // new -> calendar chart obj -> sales
          const dailyNewSalesCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.sales.total,
          };
          dailyNewCalendarChartsAcc.sales.push(dailyNewSalesCalendarChart);

          // new -> calendar chart obj -> online
          const dailyNewOnlineCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.sales.online,
          };
          dailyNewCalendarChartsAcc.online.push(dailyNewOnlineCalendarChart);

          // new -> calendar chart obj -> in-store
          const dailyNewInStoreCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.sales.inStore,
          };
          dailyNewCalendarChartsAcc.inStore.push(dailyNewInStoreCalendarChart);

          // new -> calendar chart obj -> repair
          const dailyNewRepairCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.new.repair,
          };
          dailyNewCalendarChartsAcc.repair.push(dailyNewRepairCalendarChart);

          // new -> line chart obj

          // new -> line chart obj -> total
          const dailyNewTotalLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyNewTotalLineChart);

          // new -> line chart obj -> all -> in-store
          const dailyNewAllInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewAllInStoreLineChart);

          // new -> line chart obj -> all -> online
          const dailyNewAllOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewAllOnlineLineChart);

          // new -> line chart obj -> all -> repair
          const dailyNewAllRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewAllRepairLineChart);

          // new -> line chart obj -> overview -> sales
          const dailyNewOverviewSalesLineChart = {
            x: day,
            y: customers.new.sales.total,
          };
          dailyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyNewOverviewSalesLineChart);

          // new -> line chart obj -> overview -> repair
          const dailyNewOverviewRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewOverviewRepairLineChart);

          // new -> line chart obj -> sales -> online
          const dailyNewSalesOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewSalesOnlineLineChart);

          // new -> line chart obj -> sales -> in-store
          const dailyNewSalesInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewSalesInStoreLineChart);

          // new -> line chart obj -> online
          const dailyNewOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewOnlineLineChart);

          // new -> line chart obj -> in-store
          const dailyNewInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewInStoreLineChart);

          // new -> line chart obj -> repair
          const dailyNewRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          // returning -> bar chart obj -> total
          const dailyReturningTotalBarChart = {
            Days: day,
            Total: customers.returning.total,
          };
          dailyReturningBarChartsAcc.total.push(dailyReturningTotalBarChart);

          // returning -> bar chart obj -> all
          const dailyReturningAllBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.all.push(dailyReturningAllBarChart);

          // returning -> bar chart obj -> overview
          const dailyReturningOverviewBarChart = {
            Days: day,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.overview.push(dailyReturningOverviewBarChart);

          // returning -> bar chart obj -> sales
          const dailyReturningSalesBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          dailyReturningBarChartsAcc.sales.push(dailyReturningSalesBarChart);

          // returning -> bar chart obj -> online
          const dailyReturningOnlineBarChart = {
            Days: day,
            Online: customers.returning.sales.online,
          };
          dailyReturningBarChartsAcc.online.push(dailyReturningOnlineBarChart);

          // returning -> bar chart obj -> in-store
          const dailyReturningInStoreBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
          };
          dailyReturningBarChartsAcc.inStore.push(dailyReturningInStoreBarChart);

          // returning -> bar chart obj -> repair
          const dailyReturningRepairBarChart = {
            Days: day,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.repair.push(dailyReturningRepairBarChart);

          // returning -> calendar chart obj

          // returning -> calendar chart obj -> total
          const dailyReturningTotalCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.total,
          };
          dailyReturningCalendarChartsAcc.total.push(dailyReturningTotalCalendarChart);

          // returning -> calendar chart obj -> sales
          const dailyReturningSalesCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.sales.total,
          };
          dailyReturningCalendarChartsAcc.sales.push(dailyReturningSalesCalendarChart);

          // returning -> calendar chart obj -> online
          const dailyReturningOnlineCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.sales.online,
          };
          dailyReturningCalendarChartsAcc.online.push(dailyReturningOnlineCalendarChart);

          // returning -> calendar chart obj -> in-store
          const dailyReturningInStoreCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.sales.inStore,
          };
          dailyReturningCalendarChartsAcc.inStore.push(
            dailyReturningInStoreCalendarChart
          );

          // returning -> calendar chart obj -> repair
          const dailyReturningRepairCalendarChart = {
            day: `${selectedYear}-${monthNumber}-${day}`,
            value: customers.returning.repair,
          };
          dailyReturningCalendarChartsAcc.repair.push(dailyReturningRepairCalendarChart);

          // returning -> line chart obj

          // returning -> line chart obj -> total
          const dailyReturningTotalLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyReturningTotalLineChart);

          // returning -> line chart obj -> all -> in-store
          const dailyReturningAllInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningAllInStoreLineChart);

          // returning -> line chart obj -> all -> online
          const dailyReturningAllOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningAllOnlineLineChart);

          // returning -> line chart obj -> all -> repair
          const dailyReturningAllRepairLineChart = {
            x: day,
            y: customers.returning.repair,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyReturningAllRepairLineChart);

          // returning -> line chart obj -> overview -> sales
          const dailyReturningOverviewSalesLineChart = {
            x: day,
            y: customers.returning.sales.total,
          };
          dailyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyReturningOverviewSalesLineChart);

          // returning -> line chart obj -> overview -> repair
          const dailyReturningOverviewRepairLineChart = {
            x: day,
            y: customers.returning.repair,
          };
          dailyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyReturningOverviewRepairLineChart);

          // returning -> line chart obj -> sales -> online
          const dailyReturningSalesOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningSalesOnlineLineChart);

          // returning -> line chart obj -> sales -> in-store
          const dailyReturningSalesInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningSalesInStoreLineChart);

          // returning -> line chart obj -> online
          const dailyReturningOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningOnlineLineChart);

          // returning -> line chart obj -> in-store
          const dailyReturningInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningInStoreLineChart);

          // returning -> line chart obj -> repair
          const dailyReturningRepairLineChart = {
            x: day,
            y: customers.returning.repair,
          };
          dailyReturningLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyReturningRepairLineChart);

          return dailyCustomerChartsAcc;
        },
        [
          structuredClone(overviewBarChartsTemplate),
          structuredClone(overviewCalendarChartsTemplate),
          structuredClone(overviewLineChartsTemplate),

          structuredClone(newBarChartsTemplate),
          structuredClone(newCalendarChartsTemplate),
          structuredClone(newLineChartsTemplate),

          structuredClone(returningBarChartsTemplate),
          structuredClone(returningCalendarChartsTemplate),
          structuredClone(returningLineChartsTemplate),
        ]
      );

      const dailyOverviewPieChartData: PieChartData[] = [
        {
          id: "New",
          label: "New",
          value: selectedDayMetrics.customers.new.total,
        },
        {
          id: "Returning",
          label: "Returning",
          value: selectedDayMetrics.customers.returning.total,
        },
      ];

      const newSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.customers.new.sales.total,
      };
      const newRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.customers.new.repair,
      };
      const newSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.customers.new.sales.online,
      };
      const newSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.customers.new.sales.inStore,
      };

      const dailyNewPieChartData: CustomerNewReturningPieCharts = {
        overview: [newSalesPieChartData, newRepairPieChartData],
        all: [
          newSalesOnlinePieChartData,
          newSalesInStorePieChartData,
          newRepairPieChartData,
        ],
        sales: [newSalesOnlinePieChartData, newSalesInStorePieChartData],
      };

      const returningSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedDayMetrics.customers.returning.sales.total,
      };
      const returningRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedDayMetrics.customers.returning.repair,
      };
      const returningSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedDayMetrics.customers.returning.sales.online,
      };
      const returningSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedDayMetrics.customers.returning.sales.inStore,
      };

      const dailyReturningPieChartData: CustomerNewReturningPieCharts = {
        overview: [returningSalesPieChartData, returningRepairPieChartData],
        all: [
          returningSalesOnlinePieChartData,
          returningSalesInStorePieChartData,
          returningRepairPieChartData,
        ],
        sales: [returningSalesOnlinePieChartData, returningSalesInStorePieChartData],
      };

      resolve({
        overview: {
          bar: dailyOverviewBarCharts,
          calendar: dailyOverviewCalendarCharts,
          line: dailyOverviewLineCharts,
          pie: dailyOverviewPieChartData,
        },
        new: {
          bar: dailyNewBarCharts,
          calendar: dailyNewCalendarCharts,
          line: dailyNewLineCharts,
          pie: dailyNewPieChartData,
        },
        returning: {
          bar: dailyReturningBarCharts,
          calendar: dailyReturningCalendarCharts,
          line: dailyReturningLineCharts,
          pie: dailyReturningPieChartData,
        },
      });
    }, 0);
  });
}

type CreateMonthlyCustomerChartsInput = {
  churnRetentionBarChartsTemplate: CustomerChurnRetentionBarCharts;
  churnRetentionLineChartsTemplate: CustomerChurnRetentionLineCharts;
  monthlyMetrics?: CustomerMonthlyMetric[];
  months: Month[];
  newBarChartsTemplate: CustomerNewReturningBarCharts;
  newCalendarChartsTemplate: CustomerNewReturningCalendarCharts;
  newLineChartsTemplate: CustomerNewReturningLineCharts;
  overviewBarChartsTemplate: CustomerOverviewBarCharts;
  overviewCalendarChartsTemplate: CustomerOverviewCalendarCharts;
  overviewLineChartsTemplate: CustomerOverviewLineCharts;
  returningBarChartsTemplate: CustomerNewReturningBarCharts;
  returningCalendarChartsTemplate: CustomerNewReturningCalendarCharts;
  returningLineChartsTemplate: CustomerNewReturningLineCharts;
  selectedMonthMetrics?: CustomerMonthlyMetric;
  selectedYear: Year;
};

async function createMonthlyCustomerCharts({
  churnRetentionBarChartsTemplate,
  churnRetentionLineChartsTemplate,
  monthlyMetrics,
  months,
  newBarChartsTemplate,
  newCalendarChartsTemplate,
  newLineChartsTemplate,
  overviewBarChartsTemplate,
  overviewCalendarChartsTemplate,
  overviewLineChartsTemplate,
  returningBarChartsTemplate,
  returningCalendarChartsTemplate,
  returningLineChartsTemplate,
  selectedMonthMetrics,
  selectedYear,
}: CreateMonthlyCustomerChartsInput): Promise<CustomerMetricsCharts["monthly"]> {
  if (!monthlyMetrics || !selectedMonthMetrics) {
    return new Promise((resolve) => {
      resolve({
        overview: {
          bar: overviewBarChartsTemplate,
          calendar: overviewCalendarChartsTemplate,
          line: overviewLineChartsTemplate,
          pie: [],
        },
        new: {
          bar: newBarChartsTemplate,
          calendar: newCalendarChartsTemplate,
          line: newLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
        returning: {
          bar: returningBarChartsTemplate,
          calendar: returningCalendarChartsTemplate,
          line: returningLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
        churnRetention: {
          bar: churnRetentionBarChartsTemplate,
          line: churnRetentionLineChartsTemplate,
          pie: [],
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        overviewBarCharts,
        overviewCalendarCharts,
        overviewLineCharts,

        monthlyNewBarCharts,
        monthlyNewCalendarCharts,
        monthlyNewLineCharts,

        monthlyReturningBarCharts,
        monthlyReturningCalendarCharts,
        monthlyReturningLineCharts,

        monthlyChurnRetentionRateBarCharts,
        monthlyChurnRetentionRateLineCharts,
      ] = monthlyMetrics.reduce(
        (monthlyCustomerChartsAcc, monthlyMetric) => {
          const [
            overviewBarChartsAcc,
            overviewCalendarChartsAcc,
            overviewLineChartsAcc,

            monthlyNewBarChartsAcc,
            monthlyNewCalendarChartsAcc,
            monthlyNewLineChartsAcc,

            monthlyReturningBarChartsAcc,
            monthlyReturningCalendarChartsAcc,
            monthlyReturningLineChartsAcc,

            monthlyChurnRetentionRateBarChartsAcc,
            monthlyChurnRetentionRateLineChartsAcc,
          ] = monthlyCustomerChartsAcc;

          const { month, customers, dailyMetrics } = monthlyMetric;

          // prevents current month of current year from being added to charts
          const currentYear = new Date().getFullYear().toString();
          const isCurrentYear = selectedYear === currentYear;
          const currentMonth = new Date().toLocaleString("default", { month: "long" });
          const isCurrentMonth = month === currentMonth;

          if (isCurrentYear && isCurrentMonth) {
            return monthlyCustomerChartsAcc;
          }

          const monthIndexStr = (months.indexOf(month) + 1).toString().padStart(2, "0");

          // overview section y-axis variables: new, returning, total

          // overview -> bar chart obj

          // overview -> bar chart obj -> new & returning
          const overviewNewReturningBarChart = {
            Months: month,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          overviewBarChartsAcc.overview.push(overviewNewReturningBarChart);

          // overview -> bar chart obj -> new
          const overviewNewBarChart = {
            Months: month,
            New: customers.new.total,
          };
          overviewBarChartsAcc.new.push(overviewNewBarChart);

          // overview -> bar chart obj -> returning
          const overviewReturningBarChart = {
            Months: month,
            Returning: customers.returning.total,
          };
          overviewBarChartsAcc.returning.push(overviewReturningBarChart);

          // overview -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            // overview -> calendar chart obj -> total
            const overviewCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.total,
            };
            overviewCalendarChartsAcc.overview.push(overviewCalendarChart);

            // overview -> calendar chart obj -> new
            const overviewNewCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.total,
            };
            overviewCalendarChartsAcc.new.push(overviewNewCalendarChart);

            // overview -> calendar chart obj -> returning
            const overviewReturningCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.total,
            };
            overviewCalendarChartsAcc.returning.push(overviewReturningCalendarChart);
          });

          // overview -> line chart obj

          // overview -> line chart obj -> overview -> new
          const overviewNewLineChart = {
            x: month,
            y: customers.new.total,
          };
          overviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(overviewNewLineChart);

          // overview -> line chart obj -> overview -> returning
          const overviewReturningLineChart = {
            x: month,
            y: customers.returning.total,
          };
          overviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(overviewReturningLineChart);

          // overview -> line chart obj -> new -> new
          const monthlyNewNewLineChart = {
            x: month,
            y: customers.new.total,
          };
          overviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(monthlyNewNewLineChart);

          // overview -> line chart obj -> returning -> returning
          const monthlyReturningReturningLineChart = {
            x: month,
            y: customers.returning.total,
          };
          overviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(monthlyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          // new -> bar chart obj -> total
          const monthlyNewTotalBarChart = {
            Months: month,
            Total: customers.new.total,
          };
          monthlyNewBarChartsAcc.total.push(monthlyNewTotalBarChart);

          // new -> bar chart obj -> all
          const monthlyNewAllBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.all.push(monthlyNewAllBarChart);

          // new -> bar chart obj -> overview
          const monthlyNewOverviewBarChart = {
            Months: month,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.overview.push(monthlyNewOverviewBarChart);

          // new -> bar chart obj -> sales
          const monthlyNewSalesBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          monthlyNewBarChartsAcc.sales.push(monthlyNewSalesBarChart);

          // new -> bar chart obj -> online
          const monthlyNewOnlineBarChart = {
            Months: month,
            Online: customers.new.sales.online,
          };
          monthlyNewBarChartsAcc.online.push(monthlyNewOnlineBarChart);

          // new -> bar chart obj -> in-store
          const monthlyNewInStoreBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
          };
          monthlyNewBarChartsAcc.inStore.push(monthlyNewInStoreBarChart);

          // new -> bar chart obj -> repair
          const monthlyNewRepairBarChart = {
            Months: month,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.repair.push(monthlyNewRepairBarChart);

          // new -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            // new -> calendar chart obj -> total
            const monthlyNewTotalCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.total,
            };
            monthlyNewCalendarChartsAcc.total.push(monthlyNewTotalCalendarChart);

            // new -> calendar chart obj -> sales
            const monthlyNewSalesCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.total,
            };
            monthlyNewCalendarChartsAcc.sales.push(monthlyNewSalesCalendarChart);

            // new -> calendar chart obj -> online
            const monthlyNewOnlineCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.online,
            };
            monthlyNewCalendarChartsAcc.online.push(monthlyNewOnlineCalendarChart);

            // new -> calendar chart obj -> in-store
            const monthlyNewInStoreCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.inStore,
            };
            monthlyNewCalendarChartsAcc.inStore.push(monthlyNewInStoreCalendarChart);

            // new -> calendar chart obj -> repair
            const monthlyNewRepairCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.repair,
            };
            monthlyNewCalendarChartsAcc.repair.push(monthlyNewRepairCalendarChart);
          });

          // new -> line chart obj

          // new -> line chart obj -> total
          const monthlyNewTotalLineChart = {
            x: month,
            y: customers.new.total,
          };
          monthlyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyNewTotalLineChart);

          // new -> line chart obj -> all -> in-store
          const monthlyNewAllInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewAllInStoreLineChart);

          // new -> line chart obj -> all -> online
          const monthlyNewAllOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewAllOnlineLineChart);

          // new -> line chart obj -> all -> repair
          const monthlyNewAllRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewAllRepairLineChart);

          // new -> line chart obj -> overview -> sales
          const monthlyNewOverviewSalesLineChart = {
            x: month,
            y: customers.new.sales.total,
          };
          monthlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyNewOverviewSalesLineChart);

          // new -> line chart obj -> overview -> repair
          const monthlyNewOverviewRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewOverviewRepairLineChart);

          // new -> line chart obj -> sales -> online
          const monthlyNewSalesOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewSalesOnlineLineChart);

          // new -> line chart obj -> sales -> in-store
          const monthlyNewSalesInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewSalesInStoreLineChart);

          // new -> line chart obj -> online
          const monthlyNewOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewOnlineLineChart);

          // new -> line chart obj -> in-store
          const monthlyNewInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewInStoreLineChart);

          // new -> line chart obj -> repair
          const monthlyNewRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          // returning -> bar chart obj -> total
          const monthlyReturningTotalBarChart = {
            Months: month,
            Total: customers.returning.total,
          };
          monthlyReturningBarChartsAcc.total.push(monthlyReturningTotalBarChart);

          // returning -> bar chart obj -> all
          const monthlyReturningAllBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.all.push(monthlyReturningAllBarChart);

          // returning -> bar chart obj -> overview
          const monthlyReturningOverviewBarChart = {
            Months: month,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.overview.push(monthlyReturningOverviewBarChart);

          // returning -> bar chart obj -> sales
          const monthlyReturningSalesBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          monthlyReturningBarChartsAcc.sales.push(monthlyReturningSalesBarChart);

          // returning -> bar chart obj -> online
          const monthlyReturningOnlineBarChart = {
            Months: month,
            Online: customers.returning.sales.online,
          };
          monthlyReturningBarChartsAcc.online.push(monthlyReturningOnlineBarChart);

          // returning -> bar chart obj -> in-store
          const monthlyReturningInStoreBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
          };
          monthlyReturningBarChartsAcc.inStore.push(monthlyReturningInStoreBarChart);

          // returning -> bar chart obj -> repair
          const monthlyReturningRepairBarChart = {
            Months: month,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.repair.push(monthlyReturningRepairBarChart);

          // returning -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            // returning -> calendar chart obj -> total
            const monthlyReturningTotalCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.total,
            };
            monthlyReturningCalendarChartsAcc.total.push(
              monthlyReturningTotalCalendarChart
            );

            // returning -> calendar chart obj -> sales
            const monthlyReturningSalesCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.total,
            };
            monthlyReturningCalendarChartsAcc.sales.push(
              monthlyReturningSalesCalendarChart
            );

            // returning -> calendar chart obj -> online
            const monthlyReturningOnlineCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.online,
            };
            monthlyReturningCalendarChartsAcc.online.push(
              monthlyReturningOnlineCalendarChart
            );

            // returning -> calendar chart obj -> in-store
            const monthlyReturningInStoreCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.inStore,
            };
            monthlyReturningCalendarChartsAcc.inStore.push(
              monthlyReturningInStoreCalendarChart
            );

            // returning -> calendar chart obj -> repair
            const monthlyReturningRepairCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.repair,
            };
            monthlyReturningCalendarChartsAcc.repair.push(
              monthlyReturningRepairCalendarChart
            );
          });

          // returning -> line chart obj

          // returning -> line chart obj -> total
          const monthlyReturningTotalLineChart = {
            x: month,
            y: customers.returning.total,
          };
          monthlyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyReturningTotalLineChart);

          // returning -> line chart obj -> all -> in-store
          const monthlyReturningAllInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningAllInStoreLineChart);

          // returning -> line chart obj -> all -> online
          const monthlyReturningAllOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningAllOnlineLineChart);

          // returning -> line chart obj -> all -> repair
          const monthlyReturningAllRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningAllRepairLineChart);

          // returning -> line chart obj -> overview -> sales
          const monthlyReturningOverviewSalesLineChart = {
            x: month,
            y: customers.returning.sales.total,
          };
          monthlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyReturningOverviewSalesLineChart);

          // returning -> line chart obj -> overview -> repair
          const monthlyReturningOverviewRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningOverviewRepairLineChart);

          // returning -> line chart obj -> sales -> online
          const monthlyReturningSalesOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningSalesOnlineLineChart);

          // returning -> line chart obj -> sales -> in-store
          const monthlyReturningSalesInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningSalesInStoreLineChart);

          // returning -> line chart obj -> online
          const monthlyReturningOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningOnlineLineChart);

          // returning -> line chart obj -> in-store
          const monthlyReturningInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningInStoreLineChart);

          // returning -> line chart obj -> repair
          const monthlyReturningRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningRepairLineChart);

          // churn & retention rate section y-axis variables: overview, churn rate, retention rate

          // churn & retention rate -> bar chart obj

          // churn & retention rate -> bar chart obj -> overview
          const overviewChurnRetentionRateBarChart = {
            Months: month,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.overview.push(
            overviewChurnRetentionRateBarChart
          );

          // churn & retention rate -> bar chart obj -> churn rate
          const overviewChurnRateBarChart = {
            Months: month,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.churnRate.push(overviewChurnRateBarChart);

          // churn & retention rate -> bar chart obj -> retention rate
          const monthlyRetentionRateBarChart = {
            Months: month,
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.retentionRate.push(
            monthlyRetentionRateBarChart
          );

          // churn & retention rate -> line chart obj

          // churn & retention rate -> line chart obj -> overview -> churn rate
          const overviewChurnRetentionRateLineChart = {
            x: month,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(overviewChurnRetentionRateLineChart);

          // churn & retention rate -> line chart obj -> overview -> retention rate
          const overviewRetentionRateLineChart = {
            x: month,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(overviewRetentionRateLineChart);

          // churn & retention rate -> line chart obj -> churn rate
          const monthlyChurnRateLineChart = {
            x: month,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.churnRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(monthlyChurnRateLineChart);

          // churn & retention rate -> line chart obj -> retention rate
          const monthlyRetentionRateLineChart = {
            x: month,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.retentionRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(monthlyRetentionRateLineChart);

          return monthlyCustomerChartsAcc;
        },
        [
          structuredClone(overviewBarChartsTemplate),
          structuredClone(overviewCalendarChartsTemplate),
          structuredClone(overviewLineChartsTemplate),

          structuredClone(newBarChartsTemplate),
          structuredClone(newCalendarChartsTemplate),
          structuredClone(newLineChartsTemplate),

          structuredClone(returningBarChartsTemplate),
          structuredClone(returningCalendarChartsTemplate),
          structuredClone(returningLineChartsTemplate),

          structuredClone(churnRetentionBarChartsTemplate),
          structuredClone(churnRetentionLineChartsTemplate),
        ]
      );

      // monthly -> overview -> pie chart obj
      const overviewPieChartData: PieChartData[] = [
        {
          id: "New",
          label: "New",
          value: selectedMonthMetrics.customers.new.total,
        },
        {
          id: "Returning",
          label: "Returning",
          value: selectedMonthMetrics.customers.returning.total,
        },
      ];

      // monthly -> new -> pie chart obj
      const monthlyNewSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.customers.new.sales.total,
      };
      const monthlyNewRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.customers.new.repair,
      };
      const monthlyNewSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.customers.new.sales.online,
      };
      const monthlyNewSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.customers.new.sales.inStore,
      };

      const monthlyNewPieChartData: CustomerNewReturningPieCharts = {
        overview: [monthlyNewSalesPieChartData, monthlyNewRepairPieChartData],
        all: [
          monthlyNewSalesOnlinePieChartData,
          monthlyNewSalesInStorePieChartData,
          monthlyNewRepairPieChartData,
        ],
        sales: [monthlyNewSalesOnlinePieChartData, monthlyNewSalesInStorePieChartData],
      };

      // monthly -> returning

      // monthly -> returning -> pie chart obj
      const monthlyReturningSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedMonthMetrics.customers.returning.sales.total,
      };
      const monthlyReturningRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedMonthMetrics.customers.returning.repair,
      };
      const monthlyReturningSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedMonthMetrics.customers.returning.sales.online,
      };
      const monthlyReturningSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedMonthMetrics.customers.returning.sales.inStore,
      };

      const monthlyReturningPieChartData: CustomerNewReturningPieCharts = {
        overview: [monthlyReturningSalesPieChartData, monthlyReturningRepairPieChartData],
        all: [
          monthlyReturningSalesOnlinePieChartData,
          monthlyReturningSalesInStorePieChartData,
          monthlyReturningRepairPieChartData,
        ],
        sales: [
          monthlyReturningSalesOnlinePieChartData,
          monthlyReturningSalesInStorePieChartData,
        ],
      };

      // monthly -> churn & retention rate -> pie chart obj
      const monthlyChurnRetentionRatePieChartData: PieChartData[] = [
        {
          id: "Churn Rate",
          label: "Churn Rate",
          value: toFixedFloat(selectedMonthMetrics.customers.churnRate * 100, 2),
        },
        {
          id: "Retention Rate",
          label: "Retention Rate",
          value: toFixedFloat(selectedMonthMetrics.customers.retentionRate * 100, 2),
        },
      ];

      resolve({
        overview: {
          bar: overviewBarCharts,
          calendar: overviewCalendarCharts,
          line: overviewLineCharts,
          pie: overviewPieChartData,
        },
        new: {
          bar: monthlyNewBarCharts,
          calendar: monthlyNewCalendarCharts,
          line: monthlyNewLineCharts,
          pie: monthlyNewPieChartData,
        },
        returning: {
          bar: monthlyReturningBarCharts,
          calendar: monthlyReturningCalendarCharts,
          line: monthlyReturningLineCharts,
          pie: monthlyReturningPieChartData,
        },
        churnRetention: {
          bar: monthlyChurnRetentionRateBarCharts,
          line: monthlyChurnRetentionRateLineCharts,
          pie: monthlyChurnRetentionRatePieChartData,
        },
      });
    }, 0);
  });
}

type CreateYearlyCustomerChartsInput = {
  churnRetentionBarChartsTemplate: CustomerChurnRetentionBarCharts;
  churnRetentionLineChartsTemplate: CustomerChurnRetentionLineCharts;
  newBarChartsTemplate: CustomerNewReturningBarCharts;
  newLineChartsTemplate: CustomerNewReturningLineCharts;
  overviewBarChartsTemplate: CustomerOverviewBarCharts;
  overviewLineChartsTemplate: CustomerOverviewLineCharts;
  returningBarChartsTemplate: CustomerNewReturningBarCharts;
  returningLineChartsTemplate: CustomerNewReturningLineCharts;
  selectedYearMetrics?: CustomerYearlyMetric;
  yearlyMetrics?: CustomerYearlyMetric[];
};

async function createYearlyCustomerCharts({
  churnRetentionBarChartsTemplate,
  churnRetentionLineChartsTemplate,
  newBarChartsTemplate,
  newLineChartsTemplate,
  overviewBarChartsTemplate,
  overviewLineChartsTemplate,
  returningBarChartsTemplate,
  returningLineChartsTemplate,
  selectedYearMetrics,
  yearlyMetrics,
}: CreateYearlyCustomerChartsInput): Promise<CustomerMetricsCharts["yearly"]> {
  if (!yearlyMetrics || !selectedYearMetrics) {
    return new Promise((resolve) => {
      resolve({
        overview: {
          bar: overviewBarChartsTemplate,
          line: overviewLineChartsTemplate,
          pie: [],
        },
        new: {
          bar: newBarChartsTemplate,
          line: newLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
        returning: {
          bar: returningBarChartsTemplate,
          line: returningLineChartsTemplate,
          pie: { overview: [], all: [], sales: [] },
        },
        churnRetention: {
          bar: churnRetentionBarChartsTemplate,
          line: churnRetentionLineChartsTemplate,
          pie: [],
        },
      });
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const [
        yearlyOverviewBarCharts,
        yearlyOverviewLineCharts,

        yearlyNewBarCharts,
        yearlyNewLineCharts,

        yearlyReturningBarCharts,
        yearlyReturningLineCharts,

        yearlyChurnRetentionRateBarCharts,
        yearlyChurnRetentionRateLineCharts,
      ] = yearlyMetrics.reduce(
        (yearlyCustomerChartsAcc, yearlyMetric) => {
          const [
            yearlyOverviewBarChartsAcc,
            yearlyOverviewLineChartsAcc,

            yearlyNewBarChartsAcc,
            yearlyNewLineChartsAcc,

            yearlyReturningBarChartsAcc,
            yearlyReturningLineChartsAcc,

            yearlyChurnRetentionRateBarChartsAcc,
            yearlyChurnRetentionRateLineChartsAcc,
          ] = yearlyCustomerChartsAcc;

          const { year, customers } = yearlyMetric;

          // prevents current year from being added to charts
          const currentYear = new Date().getFullYear();
          if (year === currentYear.toString()) {
            return yearlyCustomerChartsAcc;
          }

          // overview section y-axis variables: new, returning, total

          // overview -> bar chart obj

          // overview -> bar chart obj -> total
          const yearlyOverviewTotalBarChart = {
            Years: year,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          yearlyOverviewBarChartsAcc.overview.push(yearlyOverviewTotalBarChart);

          // overview -> bar chart obj -> new
          const yearlyOverviewNewBarChart = {
            Years: year,
            New: customers.new.total,
          };
          yearlyOverviewBarChartsAcc.new.push(yearlyOverviewNewBarChart);

          // overview -> bar chart obj -> returning
          const yearlyOverviewReturningBarChart = {
            Years: year,
            Returning: customers.returning.total,
          };
          yearlyOverviewBarChartsAcc.returning.push(yearlyOverviewReturningBarChart);

          // overview -> line chart obj

          // overview -> line chart obj -> overview -> new
          const yearlyOverviewNewLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(yearlyOverviewNewLineChart);

          // overview -> line chart obj -> overview -> returning
          const yearlyOverviewReturningLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(yearlyOverviewReturningLineChart);

          // overview -> line chart obj -> new -> new
          const yearlyNewNewLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyOverviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(yearlyNewNewLineChart);

          // overview -> line chart obj -> returning -> returning
          const yearlyReturningReturningLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyOverviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(yearlyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          // new -> bar chart obj -> total
          const yearlyNewTotalBarChart = {
            Years: year,
            Total: customers.new.total,
          };
          yearlyNewBarChartsAcc.total.push(yearlyNewTotalBarChart);

          // new -> bar chart obj -> all
          const yearlyNewAllBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.all.push(yearlyNewAllBarChart);

          // new -> bar chart obj -> overview
          const yearlyNewOverviewBarChart = {
            Years: year,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.overview.push(yearlyNewOverviewBarChart);

          // new -> bar chart obj -> sales
          const yearlyNewSalesBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          yearlyNewBarChartsAcc.sales.push(yearlyNewSalesBarChart);

          // new -> bar chart obj -> online
          const yearlyNewOnlineBarChart = {
            Years: year,
            Online: customers.new.sales.online,
          };
          yearlyNewBarChartsAcc.online.push(yearlyNewOnlineBarChart);

          // new -> bar chart obj -> in-store
          const yearlyNewInStoreBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
          };
          yearlyNewBarChartsAcc.inStore.push(yearlyNewInStoreBarChart);

          // new -> bar chart obj -> repair
          const yearlyNewRepairBarChart = {
            Years: year,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.repair.push(yearlyNewRepairBarChart);

          // new -> line chart obj

          // new -> line chart obj -> total
          const yearlyNewTotalLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyNewTotalLineChart);

          // new -> line chart obj -> all -> in-store
          const yearlyNewAllInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewAllInStoreLineChart);

          // new -> line chart obj -> all -> online
          const yearlyNewAllOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewAllOnlineLineChart);

          // new -> line chart obj -> all -> repair
          const yearlyNewAllRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewAllRepairLineChart);

          // new -> line chart obj -> overview -> sales
          const yearlyNewOverviewSalesLineChart = {
            x: year,
            y: customers.new.sales.total,
          };
          yearlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyNewOverviewSalesLineChart);

          // new -> line chart obj -> overview -> repair
          const yearlyNewOverviewRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewOverviewRepairLineChart);

          // new -> line chart obj -> sales -> online
          const yearlyNewSalesOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewSalesOnlineLineChart);

          // new -> line chart obj -> sales -> in-store
          const yearlyNewSalesInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewSalesInStoreLineChart);

          // new -> line chart obj -> online
          const yearlyNewOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewOnlineLineChart);

          // new -> line chart obj -> in-store
          const yearlyNewInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewInStoreLineChart);

          // new -> line chart obj -> repair
          const yearlyNewRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          // returning -> bar chart obj -> total
          const yearlyReturningTotalBarChart = {
            Years: year,
            Total: customers.returning.total,
          };
          yearlyReturningBarChartsAcc.total.push(yearlyReturningTotalBarChart);

          // returning -> bar chart obj -> all
          const yearlyReturningAllBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.all.push(yearlyReturningAllBarChart);

          // returning -> bar chart obj -> overview
          const yearlyReturningOverviewBarChart = {
            Years: year,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.overview.push(yearlyReturningOverviewBarChart);

          // returning -> bar chart obj -> sales
          const yearlyReturningSalesBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          yearlyReturningBarChartsAcc.sales.push(yearlyReturningSalesBarChart);

          // returning -> bar chart obj -> online
          const yearlyReturningOnlineBarChart = {
            Years: year,
            Online: customers.returning.sales.online,
          };
          yearlyReturningBarChartsAcc.online.push(yearlyReturningOnlineBarChart);

          // returning -> bar chart obj -> in-store
          const yearlyReturningInStoreBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
          };
          yearlyReturningBarChartsAcc.inStore.push(yearlyReturningInStoreBarChart);

          // returning -> bar chart obj -> repair
          const yearlyReturningRepairBarChart = {
            Years: year,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.repair.push(yearlyReturningRepairBarChart);

          // returning -> line chart obj

          // returning -> line chart obj -> total
          const yearlyReturningTotalLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyReturningTotalLineChart);

          // returning -> line chart obj -> all -> in-store
          const yearlyReturningAllInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningAllInStoreLineChart);

          // returning -> line chart obj -> all -> online
          const yearlyReturningAllOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningAllOnlineLineChart);

          // returning -> line chart obj -> all -> repair
          const yearlyReturningAllRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningAllRepairLineChart);

          // returning -> line chart obj -> overview -> sales
          const yearlyReturningOverviewSalesLineChart = {
            x: year,
            y: customers.returning.sales.total,
          };
          yearlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyReturningOverviewSalesLineChart);

          // returning -> line chart obj -> overview -> repair
          const yearlyReturningOverviewRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningOverviewRepairLineChart);

          // returning -> line chart obj -> sales -> online
          const yearlyReturningSalesOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningSalesOnlineLineChart);

          // returning -> line chart obj -> sales -> in-store
          const yearlyReturningSalesInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningSalesInStoreLineChart);

          // returning -> line chart obj -> online
          const yearlyReturningOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningOnlineLineChart);

          // returning -> line chart obj -> in-store
          const yearlyReturningInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningInStoreLineChart);

          // returning -> line chart obj -> repair
          const yearlyReturningRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningRepairLineChart);

          // churn & retention rate section y-axis variables: overview, churn rate, retention rate

          // churn & retention rate -> bar chart obj

          // churn & retention rate -> bar chart obj -> overview
          const yearlyOverviewChurnRetentionRateBarChart = {
            Years: year,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.overview.push(
            yearlyOverviewChurnRetentionRateBarChart
          );

          // churn & retention rate -> bar chart obj -> churn rate
          const yearlyChurnRateBarChart = {
            Years: year,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.churnRate.push(yearlyChurnRateBarChart);

          // churn & retention rate -> bar chart obj -> retention rate
          const yearlyRetentionRateBarChart = {
            Years: year,
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.retentionRate.push(
            yearlyRetentionRateBarChart
          );

          // churn & retention rate -> line chart obj

          // churn & retention rate -> line chart obj -> overview -> churn rate
          const yearlyOverviewChurnRetentionRateLineChart = {
            x: year,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(yearlyOverviewChurnRetentionRateLineChart);

          // churn & retention rate -> line chart obj -> overview -> retention rate
          const yearlyOverviewRetentionRateLineChart = {
            x: year,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(yearlyOverviewRetentionRateLineChart);

          // churn & retention rate -> line chart obj -> churn rate
          const yearlyChurnRateLineChart = {
            x: year,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.churnRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(yearlyChurnRateLineChart);

          // churn & retention rate -> line chart obj -> retention rate
          const yearlyRetentionRateLineChart = {
            x: year,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.retentionRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(yearlyRetentionRateLineChart);

          return yearlyCustomerChartsAcc;
        },
        [
          structuredClone(overviewBarChartsTemplate),
          structuredClone(overviewLineChartsTemplate),

          structuredClone(newBarChartsTemplate),
          structuredClone(newLineChartsTemplate),

          structuredClone(returningBarChartsTemplate),
          structuredClone(returningLineChartsTemplate),

          structuredClone(churnRetentionBarChartsTemplate),
          structuredClone(churnRetentionLineChartsTemplate),
        ]
      );

      // yearly -> overview -> pie chart obj
      const yearlyOverviewPieChartData: PieChartData[] = [
        {
          id: "New",
          label: "New",
          value: selectedYearMetrics.customers.new.total,
        },
        {
          id: "Returning",
          label: "Returning",
          value: selectedYearMetrics.customers.returning.total,
        },
      ];

      // yearly -> new -> pie chart obj
      const yearlyNewSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.customers.new.sales.total,
      };
      const yearlyNewRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.customers.new.repair,
      };
      const yearlyNewSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.customers.new.sales.online,
      };
      const yearlyNewSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.customers.new.sales.inStore,
      };

      const yearlyNewPieChartData: CustomerNewReturningPieCharts = {
        overview: [yearlyNewSalesPieChartData, yearlyNewRepairPieChartData],
        all: [
          yearlyNewSalesOnlinePieChartData,
          yearlyNewSalesInStorePieChartData,
          yearlyNewRepairPieChartData,
        ],
        sales: [yearlyNewSalesOnlinePieChartData, yearlyNewSalesInStorePieChartData],
      };

      // yearly -> returning -> pie chart obj
      const yearlyReturningSalesPieChartData: PieChartData = {
        id: "Sales",
        label: "Sales",
        value: selectedYearMetrics.customers.returning.sales.total,
      };
      const yearlyReturningRepairPieChartData: PieChartData = {
        id: "Repair",
        label: "Repair",
        value: selectedYearMetrics.customers.returning.repair,
      };
      const yearlyReturningSalesOnlinePieChartData: PieChartData = {
        id: "Online",
        label: "Online",
        value: selectedYearMetrics.customers.returning.sales.online,
      };
      const yearlyReturningSalesInStorePieChartData: PieChartData = {
        id: "In-Store",
        label: "In-Store",
        value: selectedYearMetrics.customers.returning.sales.inStore,
      };

      const yearlyReturningPieChartData: CustomerNewReturningPieCharts = {
        overview: [yearlyReturningSalesPieChartData, yearlyReturningRepairPieChartData],
        all: [
          yearlyReturningSalesOnlinePieChartData,
          yearlyReturningSalesInStorePieChartData,
          yearlyReturningRepairPieChartData,
        ],
        sales: [
          yearlyReturningSalesOnlinePieChartData,
          yearlyReturningSalesInStorePieChartData,
        ],
      };

      // yearly -> churn & retention rate -> pie chart obj
      const yearlyChurnRetentionRatePieChartData: PieChartData[] = [
        {
          id: "Churn Rate",
          label: "Churn Rate",
          value: toFixedFloat(selectedYearMetrics.customers.churnRate * 100, 2),
        },
        {
          id: "Retention Rate",
          label: "Retention Rate",

          value: toFixedFloat(selectedYearMetrics.customers.retentionRate * 100, 2),
        },
      ];

      resolve({
        overview: {
          bar: yearlyOverviewBarCharts,
          line: yearlyOverviewLineCharts,
          pie: yearlyOverviewPieChartData,
        },
        new: {
          bar: yearlyNewBarCharts,
          line: yearlyNewLineCharts,
          pie: yearlyNewPieChartData,
        },
        returning: {
          bar: yearlyReturningBarCharts,
          line: yearlyReturningLineCharts,
          pie: yearlyReturningPieChartData,
        },
        churnRetention: {
          bar: yearlyChurnRetentionRateBarCharts,
          line: yearlyChurnRetentionRateLineCharts,
          pie: yearlyChurnRetentionRatePieChartData,
        },
      });
    }, 0);
  });
}

export { returnCustomerMetricsCharts2, returnSelectedDateCustomerMetrics2 };
export type {
  CustomerChurnRetentionObjKey,
  CustomerMetricsCharts,
  CustomerNewReturningCalendarChartsKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieChartsKey,
  CustomerOverviewObjKey,
  SelectedDateCustomerMetrics,
};
