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
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

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
  const monthIndex = (months.indexOf(selectedMonth) + 1).toString().padStart(2, "0");

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

  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  const [dailyCustomerCharts, monthlyCustomerCharts, yearlyCustomerCharts] =
    await Promise.all([
      createDailyCustomerCharts({
        dailyMetrics: selectedMonthMetrics?.dailyMetrics,
        monthIndex,
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
  monthIndex: string;
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
  monthIndex,
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

          const dailyOverviewBarChart = {
            Days: day,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          dailyOverviewBarChartsAcc.overview.push(dailyOverviewBarChart);

          const dailyNewBarChart = {
            Days: day,
            New: customers.new.total,
          };
          dailyOverviewBarChartsAcc.new.push(dailyNewBarChart);

          const dailyReturningBarChart = {
            Days: day,
            Returning: customers.returning.total,
          };
          dailyOverviewBarChartsAcc.returning.push(dailyReturningBarChart);

          const dailyOverviewCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.total,
          };
          dailyOverviewCalendarChartsAcc.overview.push(dailyOverviewCalendarChart);

          const dailyNewCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.total,
          };
          dailyOverviewCalendarChartsAcc.new.push(dailyNewCalendarChart);

          const dailyReturningCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.total,
          };
          dailyOverviewCalendarChartsAcc.returning.push(dailyReturningCalendarChart);

          // overview -> line chart obj

          const dailyOverviewNewLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(dailyOverviewNewLineChart);

          const dailyOverviewReturningLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(dailyOverviewReturningLineChart);

          const dailyNewNewLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyOverviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(dailyNewNewLineChart);

          const dailyReturningReturningLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyOverviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(dailyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          const dailyNewTotalBarChart = {
            Days: day,
            Total: customers.new.total,
          };
          dailyNewBarChartsAcc.total.push(dailyNewTotalBarChart);

          const dailyNewAllBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.all.push(dailyNewAllBarChart);

          const dailyNewOverviewBarChart = {
            Days: day,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.overview.push(dailyNewOverviewBarChart);

          const dailyNewSalesBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          dailyNewBarChartsAcc.sales.push(dailyNewSalesBarChart);

          const dailyNewOnlineBarChart = {
            Days: day,
            Online: customers.new.sales.online,
          };
          dailyNewBarChartsAcc.online.push(dailyNewOnlineBarChart);

          const dailyNewInStoreBarChart = {
            Days: day,
            "In-Store": customers.new.sales.inStore,
          };
          dailyNewBarChartsAcc.inStore.push(dailyNewInStoreBarChart);

          const dailyNewRepairBarChart = {
            Days: day,
            Repair: customers.new.repair,
          };
          dailyNewBarChartsAcc.repair.push(dailyNewRepairBarChart);

          // new -> calendar chart obj

          const dailyNewTotalCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.total,
          };
          dailyNewCalendarChartsAcc.total.push(dailyNewTotalCalendarChart);

          const dailyNewSalesCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.sales.total,
          };
          dailyNewCalendarChartsAcc.sales.push(dailyNewSalesCalendarChart);

          const dailyNewOnlineCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.sales.online,
          };
          dailyNewCalendarChartsAcc.online.push(dailyNewOnlineCalendarChart);

          const dailyNewInStoreCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.sales.inStore,
          };
          dailyNewCalendarChartsAcc.inStore.push(dailyNewInStoreCalendarChart);

          const dailyNewRepairCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.new.repair,
          };
          dailyNewCalendarChartsAcc.repair.push(dailyNewRepairCalendarChart);

          // new -> line chart obj

          const dailyNewTotalLineChart = {
            x: day,
            y: customers.new.total,
          };
          dailyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyNewTotalLineChart);

          const dailyNewAllInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewAllInStoreLineChart);

          const dailyNewAllOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewAllOnlineLineChart);

          const dailyNewAllRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewAllRepairLineChart);

          const dailyNewOverviewSalesLineChart = {
            x: day,
            y: customers.new.sales.total,
          };
          dailyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyNewOverviewSalesLineChart);

          const dailyNewOverviewRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewOverviewRepairLineChart);

          const dailyNewSalesOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewSalesOnlineLineChart);

          const dailyNewSalesInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewSalesInStoreLineChart);

          const dailyNewOnlineLineChart = {
            x: day,
            y: customers.new.sales.online,
          };
          dailyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyNewOnlineLineChart);

          const dailyNewInStoreLineChart = {
            x: day,
            y: customers.new.sales.inStore,
          };
          dailyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyNewInStoreLineChart);

          const dailyNewRepairLineChart = {
            x: day,
            y: customers.new.repair,
          };
          dailyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          const dailyReturningTotalBarChart = {
            Days: day,
            Total: customers.returning.total,
          };
          dailyReturningBarChartsAcc.total.push(dailyReturningTotalBarChart);

          const dailyReturningAllBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.all.push(dailyReturningAllBarChart);

          const dailyReturningOverviewBarChart = {
            Days: day,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.overview.push(dailyReturningOverviewBarChart);

          const dailyReturningSalesBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          dailyReturningBarChartsAcc.sales.push(dailyReturningSalesBarChart);

          const dailyReturningOnlineBarChart = {
            Days: day,
            Online: customers.returning.sales.online,
          };
          dailyReturningBarChartsAcc.online.push(dailyReturningOnlineBarChart);

          const dailyReturningInStoreBarChart = {
            Days: day,
            "In-Store": customers.returning.sales.inStore,
          };
          dailyReturningBarChartsAcc.inStore.push(dailyReturningInStoreBarChart);

          const dailyReturningRepairBarChart = {
            Days: day,
            Repair: customers.returning.repair,
          };
          dailyReturningBarChartsAcc.repair.push(dailyReturningRepairBarChart);

          // returning -> calendar chart obj

          const dailyReturningTotalCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.total,
          };
          dailyReturningCalendarChartsAcc.total.push(dailyReturningTotalCalendarChart);

          const dailyReturningSalesCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.sales.total,
          };
          dailyReturningCalendarChartsAcc.sales.push(dailyReturningSalesCalendarChart);

          const dailyReturningOnlineCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.sales.online,
          };
          dailyReturningCalendarChartsAcc.online.push(dailyReturningOnlineCalendarChart);

          const dailyReturningInStoreCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.sales.inStore,
          };
          dailyReturningCalendarChartsAcc.inStore.push(
            dailyReturningInStoreCalendarChart
          );

          const dailyReturningRepairCalendarChart = {
            day: `${selectedYear}-${monthIndex}-${day}`,
            value: customers.returning.repair,
          };
          dailyReturningCalendarChartsAcc.repair.push(dailyReturningRepairCalendarChart);

          // returning -> line chart obj

          const dailyReturningTotalLineChart = {
            x: day,
            y: customers.returning.total,
          };
          dailyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(dailyReturningTotalLineChart);

          const dailyReturningAllInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningAllInStoreLineChart);

          const dailyReturningAllOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningAllOnlineLineChart);

          const dailyReturningAllRepairLineChart = {
            x: day,
            y: customers.returning.repair,
          };
          dailyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyReturningAllRepairLineChart);

          const dailyReturningOverviewSalesLineChart = {
            x: day,
            y: customers.returning.sales.total,
          };
          dailyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(dailyReturningOverviewSalesLineChart);

          const dailyReturningOverviewRepairLineChart = {
            x: day,
            y: customers.returning.repair,
          };
          dailyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(dailyReturningOverviewRepairLineChart);

          const dailyReturningSalesOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningSalesOnlineLineChart);

          const dailyReturningSalesInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningSalesInStoreLineChart);

          const dailyReturningOnlineLineChart = {
            x: day,
            y: customers.returning.sales.online,
          };
          dailyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(dailyReturningOnlineLineChart);

          const dailyReturningInStoreLineChart = {
            x: day,
            y: customers.returning.sales.inStore,
          };
          dailyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(dailyReturningInStoreLineChart);

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

          const overviewNewReturningBarChart = {
            Months: month,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          overviewBarChartsAcc.overview.push(overviewNewReturningBarChart);

          const overviewNewBarChart = {
            Months: month,
            New: customers.new.total,
          };
          overviewBarChartsAcc.new.push(overviewNewBarChart);

          const overviewReturningBarChart = {
            Months: month,
            Returning: customers.returning.total,
          };
          overviewBarChartsAcc.returning.push(overviewReturningBarChart);

          // overview -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            const overviewCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.total,
            };
            overviewCalendarChartsAcc.overview.push(overviewCalendarChart);

            const overviewNewCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.total,
            };
            overviewCalendarChartsAcc.new.push(overviewNewCalendarChart);

            const overviewReturningCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.total,
            };
            overviewCalendarChartsAcc.returning.push(overviewReturningCalendarChart);
          });

          // overview -> line chart obj

          const overviewNewLineChart = {
            x: month,
            y: customers.new.total,
          };
          overviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(overviewNewLineChart);

          const overviewReturningLineChart = {
            x: month,
            y: customers.returning.total,
          };
          overviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(overviewReturningLineChart);

          const monthlyNewNewLineChart = {
            x: month,
            y: customers.new.total,
          };
          overviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(monthlyNewNewLineChart);

          const monthlyReturningReturningLineChart = {
            x: month,
            y: customers.returning.total,
          };
          overviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(monthlyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          const monthlyNewTotalBarChart = {
            Months: month,
            Total: customers.new.total,
          };
          monthlyNewBarChartsAcc.total.push(monthlyNewTotalBarChart);

          const monthlyNewAllBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.all.push(monthlyNewAllBarChart);

          const monthlyNewOverviewBarChart = {
            Months: month,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.overview.push(monthlyNewOverviewBarChart);

          const monthlyNewSalesBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          monthlyNewBarChartsAcc.sales.push(monthlyNewSalesBarChart);

          const monthlyNewOnlineBarChart = {
            Months: month,
            Online: customers.new.sales.online,
          };
          monthlyNewBarChartsAcc.online.push(monthlyNewOnlineBarChart);

          const monthlyNewInStoreBarChart = {
            Months: month,
            "In-Store": customers.new.sales.inStore,
          };
          monthlyNewBarChartsAcc.inStore.push(monthlyNewInStoreBarChart);

          const monthlyNewRepairBarChart = {
            Months: month,
            Repair: customers.new.repair,
          };
          monthlyNewBarChartsAcc.repair.push(monthlyNewRepairBarChart);

          // new -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            const monthlyNewTotalCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.total,
            };
            monthlyNewCalendarChartsAcc.total.push(monthlyNewTotalCalendarChart);

            const monthlyNewSalesCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.total,
            };
            monthlyNewCalendarChartsAcc.sales.push(monthlyNewSalesCalendarChart);

            const monthlyNewOnlineCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.online,
            };
            monthlyNewCalendarChartsAcc.online.push(monthlyNewOnlineCalendarChart);

            const monthlyNewInStoreCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.sales.inStore,
            };
            monthlyNewCalendarChartsAcc.inStore.push(monthlyNewInStoreCalendarChart);

            const monthlyNewRepairCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.new.repair,
            };
            monthlyNewCalendarChartsAcc.repair.push(monthlyNewRepairCalendarChart);
          });

          // new -> line chart obj

          const monthlyNewTotalLineChart = {
            x: month,
            y: customers.new.total,
          };
          monthlyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyNewTotalLineChart);

          const monthlyNewAllInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewAllInStoreLineChart);

          const monthlyNewAllOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewAllOnlineLineChart);

          const monthlyNewAllRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewAllRepairLineChart);

          const monthlyNewOverviewSalesLineChart = {
            x: month,
            y: customers.new.sales.total,
          };
          monthlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyNewOverviewSalesLineChart);

          const monthlyNewOverviewRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewOverviewRepairLineChart);

          const monthlyNewSalesOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewSalesOnlineLineChart);

          const monthlyNewSalesInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewSalesInStoreLineChart);

          const monthlyNewOnlineLineChart = {
            x: month,
            y: customers.new.sales.online,
          };
          monthlyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyNewOnlineLineChart);

          const monthlyNewInStoreLineChart = {
            x: month,
            y: customers.new.sales.inStore,
          };
          monthlyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyNewInStoreLineChart);

          const monthlyNewRepairLineChart = {
            x: month,
            y: customers.new.repair,
          };
          monthlyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          const monthlyReturningTotalBarChart = {
            Months: month,
            Total: customers.returning.total,
          };
          monthlyReturningBarChartsAcc.total.push(monthlyReturningTotalBarChart);

          const monthlyReturningAllBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.all.push(monthlyReturningAllBarChart);

          const monthlyReturningOverviewBarChart = {
            Months: month,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.overview.push(monthlyReturningOverviewBarChart);

          const monthlyReturningSalesBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          monthlyReturningBarChartsAcc.sales.push(monthlyReturningSalesBarChart);

          const monthlyReturningOnlineBarChart = {
            Months: month,
            Online: customers.returning.sales.online,
          };
          monthlyReturningBarChartsAcc.online.push(monthlyReturningOnlineBarChart);

          const monthlyReturningInStoreBarChart = {
            Months: month,
            "In-Store": customers.returning.sales.inStore,
          };
          monthlyReturningBarChartsAcc.inStore.push(monthlyReturningInStoreBarChart);

          const monthlyReturningRepairBarChart = {
            Months: month,
            Repair: customers.returning.repair,
          };
          monthlyReturningBarChartsAcc.repair.push(monthlyReturningRepairBarChart);

          // returning -> calendar chart obj

          dailyMetrics.forEach((dailyMetric) => {
            const { day, customers } = dailyMetric;

            const monthlyReturningTotalCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.total,
            };
            monthlyReturningCalendarChartsAcc.total.push(
              monthlyReturningTotalCalendarChart
            );

            const monthlyReturningSalesCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.total,
            };
            monthlyReturningCalendarChartsAcc.sales.push(
              monthlyReturningSalesCalendarChart
            );

            const monthlyReturningOnlineCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.online,
            };
            monthlyReturningCalendarChartsAcc.online.push(
              monthlyReturningOnlineCalendarChart
            );

            const monthlyReturningInStoreCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.sales.inStore,
            };
            monthlyReturningCalendarChartsAcc.inStore.push(
              monthlyReturningInStoreCalendarChart
            );

            const monthlyReturningRepairCalendarChart = {
              day: `${selectedYear}-${monthIndexStr}-${day}`,
              value: customers.returning.repair,
            };
            monthlyReturningCalendarChartsAcc.repair.push(
              monthlyReturningRepairCalendarChart
            );
          });

          // returning -> line chart obj

          const monthlyReturningTotalLineChart = {
            x: month,
            y: customers.returning.total,
          };
          monthlyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(monthlyReturningTotalLineChart);

          const monthlyReturningAllInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningAllInStoreLineChart);

          const monthlyReturningAllOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningAllOnlineLineChart);

          const monthlyReturningAllRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningAllRepairLineChart);

          const monthlyReturningOverviewSalesLineChart = {
            x: month,
            y: customers.returning.sales.total,
          };
          monthlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(monthlyReturningOverviewSalesLineChart);

          const monthlyReturningOverviewRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningOverviewRepairLineChart);

          const monthlyReturningSalesOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningSalesOnlineLineChart);

          const monthlyReturningSalesInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningSalesInStoreLineChart);

          const monthlyReturningOnlineLineChart = {
            x: month,
            y: customers.returning.sales.online,
          };
          monthlyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(monthlyReturningOnlineLineChart);

          const monthlyReturningInStoreLineChart = {
            x: month,
            y: customers.returning.sales.inStore,
          };
          monthlyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(monthlyReturningInStoreLineChart);

          const monthlyReturningRepairLineChart = {
            x: month,
            y: customers.returning.repair,
          };
          monthlyReturningLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(monthlyReturningRepairLineChart);

          // churn & retention rate section y-axis variables: overview, churn rate, retention rate

          // churn & retention rate -> bar chart obj

          const overviewChurnRetentionRateBarChart = {
            Months: month,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.overview.push(
            overviewChurnRetentionRateBarChart
          );

          const overviewChurnRateBarChart = {
            Months: month,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.churnRate.push(overviewChurnRateBarChart);

          const monthlyRetentionRateBarChart = {
            Months: month,
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateBarChartsAcc.retentionRate.push(
            monthlyRetentionRateBarChart
          );

          // churn & retention rate -> line chart obj

          const overviewChurnRetentionRateLineChart = {
            x: month,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(overviewChurnRetentionRateLineChart);

          const overviewRetentionRateLineChart = {
            x: month,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(overviewRetentionRateLineChart);

          const monthlyChurnRateLineChart = {
            x: month,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          monthlyChurnRetentionRateLineChartsAcc.churnRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(monthlyChurnRateLineChart);

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

          const yearlyOverviewTotalBarChart = {
            Years: year,
            New: customers.new.total,
            Returning: customers.returning.total,
          };
          yearlyOverviewBarChartsAcc.overview.push(yearlyOverviewTotalBarChart);

          const yearlyOverviewNewBarChart = {
            Years: year,
            New: customers.new.total,
          };
          yearlyOverviewBarChartsAcc.new.push(yearlyOverviewNewBarChart);

          const yearlyOverviewReturningBarChart = {
            Years: year,
            Returning: customers.returning.total,
          };
          yearlyOverviewBarChartsAcc.returning.push(yearlyOverviewReturningBarChart);

          // overview -> line chart obj

          const yearlyOverviewNewLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(yearlyOverviewNewLineChart);

          const yearlyOverviewReturningLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyOverviewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(yearlyOverviewReturningLineChart);

          const yearlyNewNewLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyOverviewLineChartsAcc.new
            .find((lineChartData: LineChartData) => lineChartData.id === "New")
            ?.data.push(yearlyNewNewLineChart);

          const yearlyReturningReturningLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyOverviewLineChartsAcc.returning
            .find((lineChartData: LineChartData) => lineChartData.id === "Returning")
            ?.data.push(yearlyReturningReturningLineChart);

          // new section y-axis variables: total, all, overview, sales, online, in-store, repair

          // new -> bar chart obj

          const yearlyNewTotalBarChart = {
            Years: year,
            Total: customers.new.total,
          };
          yearlyNewBarChartsAcc.total.push(yearlyNewTotalBarChart);

          const yearlyNewAllBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.all.push(yearlyNewAllBarChart);

          const yearlyNewOverviewBarChart = {
            Years: year,
            Sales: customers.new.sales.total,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.overview.push(yearlyNewOverviewBarChart);

          const yearlyNewSalesBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
            Online: customers.new.sales.online,
          };
          yearlyNewBarChartsAcc.sales.push(yearlyNewSalesBarChart);

          const yearlyNewOnlineBarChart = {
            Years: year,
            Online: customers.new.sales.online,
          };
          yearlyNewBarChartsAcc.online.push(yearlyNewOnlineBarChart);

          const yearlyNewInStoreBarChart = {
            Years: year,
            "In-Store": customers.new.sales.inStore,
          };
          yearlyNewBarChartsAcc.inStore.push(yearlyNewInStoreBarChart);

          const yearlyNewRepairBarChart = {
            Years: year,
            Repair: customers.new.repair,
          };
          yearlyNewBarChartsAcc.repair.push(yearlyNewRepairBarChart);

          // new -> line chart obj

          const yearlyNewTotalLineChart = {
            x: year,
            y: customers.new.total,
          };
          yearlyNewLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyNewTotalLineChart);

          const yearlyNewAllInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewAllInStoreLineChart);

          const yearlyNewAllOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewAllOnlineLineChart);

          const yearlyNewAllRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewAllRepairLineChart);

          const yearlyNewOverviewSalesLineChart = {
            x: year,
            y: customers.new.sales.total,
          };
          yearlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyNewOverviewSalesLineChart);

          const yearlyNewOverviewRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewOverviewRepairLineChart);

          const yearlyNewSalesOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewSalesOnlineLineChart);

          const yearlyNewSalesInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewSalesInStoreLineChart);

          const yearlyNewOnlineLineChart = {
            x: year,
            y: customers.new.sales.online,
          };
          yearlyNewLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyNewOnlineLineChart);

          const yearlyNewInStoreLineChart = {
            x: year,
            y: customers.new.sales.inStore,
          };
          yearlyNewLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyNewInStoreLineChart);

          const yearlyNewRepairLineChart = {
            x: year,
            y: customers.new.repair,
          };
          yearlyNewLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyNewRepairLineChart);

          // returning section y-axis variables: total, all, overview, sales, online, in-store, repair

          // returning -> bar chart obj

          const yearlyReturningTotalBarChart = {
            Years: year,
            Total: customers.returning.total,
          };
          yearlyReturningBarChartsAcc.total.push(yearlyReturningTotalBarChart);

          const yearlyReturningAllBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.all.push(yearlyReturningAllBarChart);

          const yearlyReturningOverviewBarChart = {
            Years: year,
            Sales: customers.returning.sales.total,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.overview.push(yearlyReturningOverviewBarChart);

          const yearlyReturningSalesBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
            Online: customers.returning.sales.online,
          };
          yearlyReturningBarChartsAcc.sales.push(yearlyReturningSalesBarChart);

          const yearlyReturningOnlineBarChart = {
            Years: year,
            Online: customers.returning.sales.online,
          };
          yearlyReturningBarChartsAcc.online.push(yearlyReturningOnlineBarChart);

          const yearlyReturningInStoreBarChart = {
            Years: year,
            "In-Store": customers.returning.sales.inStore,
          };
          yearlyReturningBarChartsAcc.inStore.push(yearlyReturningInStoreBarChart);

          const yearlyReturningRepairBarChart = {
            Years: year,
            Repair: customers.returning.repair,
          };
          yearlyReturningBarChartsAcc.repair.push(yearlyReturningRepairBarChart);

          // returning -> line chart obj

          const yearlyReturningTotalLineChart = {
            x: year,
            y: customers.returning.total,
          };
          yearlyReturningLineChartsAcc.total
            .find((lineChartData: LineChartData) => lineChartData.id === "Total")
            ?.data.push(yearlyReturningTotalLineChart);

          const yearlyReturningAllInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningAllInStoreLineChart);

          const yearlyReturningAllOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningAllOnlineLineChart);

          const yearlyReturningAllRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.all
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningAllRepairLineChart);

          const yearlyReturningOverviewSalesLineChart = {
            x: year,
            y: customers.returning.sales.total,
          };
          yearlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Sales")
            ?.data.push(yearlyReturningOverviewSalesLineChart);

          const yearlyReturningOverviewRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningOverviewRepairLineChart);

          const yearlyReturningSalesOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningSalesOnlineLineChart);

          const yearlyReturningSalesInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.sales
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningSalesInStoreLineChart);

          const yearlyReturningOnlineLineChart = {
            x: year,
            y: customers.returning.sales.online,
          };
          yearlyReturningLineChartsAcc.online
            .find((lineChartData: LineChartData) => lineChartData.id === "Online")
            ?.data.push(yearlyReturningOnlineLineChart);

          const yearlyReturningInStoreLineChart = {
            x: year,
            y: customers.returning.sales.inStore,
          };
          yearlyReturningLineChartsAcc.inStore
            .find((lineChartData: LineChartData) => lineChartData.id === "In-Store")
            ?.data.push(yearlyReturningInStoreLineChart);

          const yearlyReturningRepairLineChart = {
            x: year,
            y: customers.returning.repair,
          };
          yearlyReturningLineChartsAcc.repair
            .find((lineChartData: LineChartData) => lineChartData.id === "Repair")
            ?.data.push(yearlyReturningRepairLineChart);

          // churn & retention rate section y-axis variables: overview, churn rate, retention rate

          // churn & retention rate -> bar chart obj

          const yearlyOverviewChurnRetentionRateBarChart = {
            Years: year,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.overview.push(
            yearlyOverviewChurnRetentionRateBarChart
          );

          const yearlyChurnRateBarChart = {
            Years: year,
            "Churn Rate": toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.churnRate.push(yearlyChurnRateBarChart);

          const yearlyRetentionRateBarChart = {
            Years: year,
            "Retention Rate": toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateBarChartsAcc.retentionRate.push(
            yearlyRetentionRateBarChart
          );

          // churn & retention rate -> line chart obj

          const yearlyOverviewChurnRetentionRateLineChart = {
            x: year,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(yearlyOverviewChurnRetentionRateLineChart);

          const yearlyOverviewRetentionRateLineChart = {
            x: year,
            y: toFixedFloat(customers.retentionRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.overview
            .find((lineChartData: LineChartData) => lineChartData.id === "Retention Rate")
            ?.data.push(yearlyOverviewRetentionRateLineChart);

          const yearlyChurnRateLineChart = {
            x: year,
            y: toFixedFloat(customers.churnRate * 100, 2),
          };
          yearlyChurnRetentionRateLineChartsAcc.churnRate
            .find((lineChartData: LineChartData) => lineChartData.id === "Churn Rate")
            ?.data.push(yearlyChurnRateLineChart);

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
