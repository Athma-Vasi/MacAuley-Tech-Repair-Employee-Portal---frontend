import { StoreLocation } from '../../../types';
import { BarChartData } from '../../charts/responsiveBarChart/types';
import { LineChartData } from '../../charts/responsiveLineChart/types';
import { PieChartData } from '../../displayStatistics/types';
import {
  BusinessMetric,
  CustomerDailyMetric,
  CustomerMonthlyMetric,
  CustomerYearlyMetric,
  Month,
  Year,
} from '../types';

type SelectedCustomerMetrics = {
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

function returnSelectedCustomerMetrics({
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
  storeLocation: StoreLocation;
  year: Year;
}): SelectedCustomerMetrics {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected year's metrics
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

  // selected month's metrics
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

  // selected day's metrics
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
  selectedCustomerMetrics: SelectedCustomerMetrics;
  storeLocation: StoreLocation;
};

type ReturnCustomerChartsDataOutput = {
  dailyCharts: {
    overview: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    new: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    returning: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
  };
  monthlyCharts: {
    overview: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    new: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    returning: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    churnRetention: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
  };
  yearlyCharts: {
    overview: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    new: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    returning: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
    churnRetention: {
      barChartData: BarChartData[];
      lineChartData: LineChartData[];
      pieChartData: PieChartData[];
    };
  };
};

function returnCustomerChartsData({
  businessMetrics,
  selectedCustomerMetrics,
  storeLocation,
}: ReturnCustomerChartsDataInput): ReturnCustomerChartsDataOutput {
  // selected store's business metrics
  const currentStoreMetrics = businessMetrics.find(
    (businessMetric) => businessMetric.storeLocation === storeLocation
  );

  // selected year's metrics
  const { yearCustomerMetrics } = selectedCustomerMetrics;

  // selected month's metrics
  const { monthCustomerMetrics } = selectedCustomerMetrics;

  // selected day's metrics
  const { dayCustomerMetrics } = selectedCustomerMetrics;

  // daily
  // daily overview
  // daily overview pie chart data
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

  // daily overview bar chart data
  const dailyOverviewBarChartData =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
      (dailyMetric) => {
        const { day, customers } = dailyMetric;
        const barChartData: BarChartData = {
          Days: day,
          New: customers.new.total,
          Returning: customers.returning.total,
        };

        return barChartData;
      }
    ) ?? [];

  const dailyOverviewLineChartData = [
    {
      id: 'New',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.new.total };
          }
        ) ?? [],
    },
    {
      id: 'Returning',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.returning.total };
          }
        ) ?? [],
    },
  ];

  // daily new
  // daily new pie chart data
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

  // daily new bar chart data
  const dailyNewBarChartData =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
      (dailyMetric) => {
        const { day, customers } = dailyMetric;
        const barChartData: BarChartData = {
          Days: day,
          'New Online': customers.new.sales.online,
          'New In-Store': customers.new.sales.inStore,
          'New Repair': customers.new.repair,
        };

        return barChartData;
      }
    ) ?? [];

  // daily new line chart data
  const dailyNewLineChartData = [
    {
      id: 'New Online',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.new.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'New In-Store',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.new.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'New Repair',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.new.repair };
          }
        ) ?? [],
    },
  ];

  // daily returning
  // daily returning pie chart data
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

  // daily returning bar chart data
  const dailyReturningBarChartData =
    monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
      (dailyMetric) => {
        const { day, customers } = dailyMetric;
        const barChartData: BarChartData = {
          Days: day,
          'Returning Online': customers.returning.sales.online,
          'Returning In-Store': customers.returning.sales.inStore,
          'Returning Repair': customers.returning.repair,
        };

        return barChartData;
      }
    ) ?? [];

  // daily returning line chart data
  const dailyReturningLineChartData = [
    {
      id: 'Returning Online',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.returning.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'Returning In-Store',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.returning.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'Returning Repair',
      data:
        monthCustomerMetrics?.selectedMonthMetrics?.dailyMetrics.map(
          (dailyMetric) => {
            const { day, customers } = dailyMetric;
            return { x: day, y: customers.returning.repair };
          }
        ) ?? [],
    },
  ];

  // monthly
  // monthly overview
  // monthly overview pie chart data
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

  // monthly overview bar chart data
  const monthlyOverviewBarChartData =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
      (monthlyMetric) => {
        const { month, customers } = monthlyMetric;
        const barChartData: BarChartData = {
          Months: month,
          New: customers.new.total,
          Returning: customers.returning.total,
        };

        return barChartData;
      }
    ) ?? [];

  // monthly overview line chart data
  const monthlyOverviewLineChartData = [
    {
      id: 'New',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.new.total };
          }
        ) ?? [],
    },
    {
      id: 'Returning',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.returning.total };
          }
        ) ?? [],
    },
  ];

  // monthly new
  // monthly new pie chart data
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

  // monthly new bar chart data
  const monthlyNewBarChartData =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
      (monthlyMetric) => {
        const { month, customers } = monthlyMetric;
        const barChartData: BarChartData = {
          Months: month,
          'New Online': customers.new.sales.online,
          'New In-Store': customers.new.sales.inStore,
          'New Repair': customers.new.repair,
        };

        return barChartData;
      }
    ) ?? [];

  // monthly new line chart data
  const monthlyNewLineChartData = [
    {
      id: 'New Online',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.new.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'New In-Store',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.new.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'New Repair',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.new.repair };
          }
        ) ?? [],
    },
  ];

  // monthly returning
  // monthly returning pie chart data
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

  // monthly returning bar chart data
  const monthlyReturningBarChartData =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
      (monthlyMetric) => {
        const { month, customers } = monthlyMetric;
        const barChartData: BarChartData = {
          Months: month,
          'Returning Online': customers.returning.sales.online,
          'Returning In-Store': customers.returning.sales.inStore,
          'Returning Repair': customers.returning.repair,
        };

        return barChartData;
      }
    ) ?? [];

  // monthly returning line chart data
  const monthlyReturningLineChartData = [
    {
      id: 'Returning Online',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.returning.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'Returning In-Store',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.returning.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'Returning Repair',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: customers.returning.repair };
          }
        ) ?? [],
    },
  ];

  // monthly churn rate and retention rate pie chart data
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

  // monthly churn rate and retention rate bar chart data
  const monthlyChurnRetentionBarChartData =
    yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
      (monthlyMetric) => {
        const { month, customers } = monthlyMetric;
        const barChartData: BarChartData = {
          Months: month,
          'Churn Rate': Number(customers.churnRate.toPrecision(3)),
          'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
        };

        return barChartData;
      }
    ) ?? [];

  // monthly churn rate and retention rate line chart data
  const monthlyChurnRetentionLineChartData = [
    {
      id: 'Churn Rate',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return { x: month, y: Number(customers.churnRate.toPrecision(3)) };
          }
        ) ?? [],
    },
    {
      id: 'Retention Rate',
      data:
        yearCustomerMetrics?.selectedYearMetrics?.monthlyMetrics.map(
          (monthlyMetric) => {
            const { month, customers } = monthlyMetric;
            return {
              x: month,
              y: Number(customers.retentionRate.toPrecision(3)),
            };
          }
        ) ?? [],
    },
  ];

  // yearly
  // yearly overview
  // yearly overview pie chart data
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

  // yearly overview bar chart data
  const yearlyOverviewBarChartData =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.map((yearlyMetric) => {
      const { year, customers } = yearlyMetric;
      const barChartData: BarChartData = {
        Years: year,
        New: customers.new.total,
        Returning: customers.returning.total,
      };

      return barChartData;
    }) ?? [];

  // yearly overview line chart data
  const yearlyOverviewLineChartData = [
    {
      id: 'New',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.new.total };
          }
        ) ?? [],
    },
    {
      id: 'Returning',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.returning.total };
          }
        ) ?? [],
    },
  ];

  // yearly new
  // yearly new pie chart data
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

  // yearly new bar chart data
  const yearlyNewBarChartData =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.map((yearlyMetric) => {
      const { year, customers } = yearlyMetric;
      const barChartData: BarChartData = {
        Years: year,
        'New Online': customers.new.sales.online,
        'New In-Store': customers.new.sales.inStore,
        'New Repair': customers.new.repair,
      };

      return barChartData;
    }) ?? [];

  // yearly new line chart data
  const yearlyNewLineChartData = [
    {
      id: 'New Online',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.new.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'New In-Store',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.new.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'New Repair',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.new.repair };
          }
        ) ?? [],
    },
  ];

  // yearly returning
  // yearly returning pie chart data
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

  // yearly returning bar chart data
  const yearlyReturningBarChartData =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.map((yearlyMetric) => {
      const { year, customers } = yearlyMetric;
      const barChartData: BarChartData = {
        Years: year,
        'Returning Online': customers.returning.sales.online,
        'Returning In-Store': customers.returning.sales.inStore,
        'Returning Repair': customers.returning.repair,
      };

      return barChartData;
    }) ?? [];

  // yearly returning line chart data
  const yearlyReturningLineChartData = [
    {
      id: 'Returning Online',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.returning.sales.online };
          }
        ) ?? [],
    },
    {
      id: 'Returning In-Store',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.returning.sales.inStore };
          }
        ) ?? [],
    },
    {
      id: 'Returning Repair',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: customers.returning.repair };
          }
        ) ?? [],
    },
  ];

  // yearly churn rate and retention rate pie chart data
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

  // yearly churn rate and retention rate bar chart data
  const yearlyChurnRetentionBarChartData =
    currentStoreMetrics?.customerMetrics.yearlyMetrics.map((yearlyMetric) => {
      const { year, customers } = yearlyMetric;
      const barChartData: BarChartData = {
        Years: year,
        'Churn Rate': Number(customers.churnRate.toPrecision(3)),
        'Retention Rate': Number(customers.retentionRate.toPrecision(3)),
      };

      return barChartData;
    }) ?? [];

  // yearly churn rate and retention rate line chart data
  const yearlyChurnRetentionLineChartData = [
    {
      id: 'Churn Rate',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return { x: year, y: Number(customers.churnRate.toPrecision(3)) };
          }
        ) ?? [],
    },
    {
      id: 'Retention Rate',
      data:
        currentStoreMetrics?.customerMetrics.yearlyMetrics.map(
          (yearlyMetric) => {
            const { year, customers } = yearlyMetric;
            return {
              x: year,
              y: Number(customers.retentionRate.toPrecision(3)),
            };
          }
        ) ?? [],
    },
  ];

  return {
    dailyCharts: {
      overview: {
        barChartData: dailyOverviewBarChartData,
        lineChartData: dailyOverviewLineChartData,
        pieChartData: dailyOverviewPieChartData,
      },
      new: {
        barChartData: dailyNewBarChartData,
        lineChartData: dailyNewLineChartData,
        pieChartData: dailyNewPieChartData,
      },
      returning: {
        barChartData: dailyReturningBarChartData,
        lineChartData: dailyReturningLineChartData,
        pieChartData: dailyReturningPieChartData,
      },
    },
    monthlyCharts: {
      overview: {
        barChartData: monthlyOverviewBarChartData,
        lineChartData: monthlyOverviewLineChartData,
        pieChartData: monthlyOverviewPieChartData,
      },
      new: {
        barChartData: monthlyNewBarChartData,
        lineChartData: monthlyNewLineChartData,
        pieChartData: monthlyNewPieChartData,
      },
      returning: {
        barChartData: monthlyReturningBarChartData,
        lineChartData: monthlyReturningLineChartData,
        pieChartData: monthlyReturningPieChartData,
      },
      churnRetention: {
        barChartData: monthlyChurnRetentionBarChartData,
        lineChartData: monthlyChurnRetentionLineChartData,
        pieChartData: monthlyChurnRetentionPieChartData,
      },
    },
    yearlyCharts: {
      overview: {
        barChartData: yearlyOverviewBarChartData,
        lineChartData: yearlyOverviewLineChartData,
        pieChartData: yearlyOverviewPieChartData,
      },
      new: {
        barChartData: yearlyNewBarChartData,
        lineChartData: yearlyNewLineChartData,
        pieChartData: yearlyNewPieChartData,
      },
      returning: {
        barChartData: yearlyReturningBarChartData,
        lineChartData: yearlyReturningLineChartData,
        pieChartData: yearlyReturningPieChartData,
      },
      churnRetention: {
        barChartData: yearlyChurnRetentionBarChartData,
        lineChartData: yearlyChurnRetentionLineChartData,
        pieChartData: yearlyChurnRetentionPieChartData,
      },
    },
  };
}

export { returnCustomerChartsData, returnSelectedCustomerMetrics };
export type { ReturnCustomerChartsDataOutput, SelectedCustomerMetrics };
