import { Card, Group, MantineNumberSize, Text } from '@mantine/core';
import { type } from 'os';
import { ReactNode } from 'react';
import { MdCalendarMonth, MdDateRange } from 'react-icons/md';
import { RiCalendarLine } from 'react-icons/ri';

import { SelectedDateCustomerMetrics } from './customerDashboard/utils';
import { SelectedDateFinancialMetrics } from './financialDashboard/utils';
import { addCommaSeparator } from '../../utils';

type DashboardCardInfo = {
  date?: string;
  heading?: string;
  icon: ReactNode;
  padding: MantineNumberSize;
  percentage?: string;
  deltaTextColor?: string;
  value: string | number;
  width: number;
};
function returnDashboardCardElement({
  date,
  heading,
  icon,
  padding,
  percentage,
  deltaTextColor,
  value,
  width,
}: DashboardCardInfo): React.JSX.Element {
  const cardWidth = Math.round(width / 2);

  const cardHeading = (
    <Group w="100%" position="apart">
      <Text size="md">{heading}</Text>
      {icon}
    </Group>
  );

  const cardBody = (
    <Group w="100%" position="apart">
      <Text size="xl" weight={600}>
        {value}
      </Text>
    </Group>
  );

  const displayPercentage = (
    <Text size="sm" italic color={deltaTextColor}>
      {percentage}
    </Text>
  );

  const cardFooter = (
    <Group w="100%" position="apart">
      {displayPercentage}
      <Text size="sm">{date}</Text>
    </Group>
  );

  const createdChartCard = (
    <Card shadow="sm" padding={padding} radius="md" withBorder w={cardWidth}>
      {cardHeading}
      {cardBody}
      {cardFooter}
    </Card>
  );

  return createdChartCard;
}

type ReturnDashboardCardInfoInput = {
  currentMonth: string;
  currentYear: string;
  greenColorShade: string;
  heading: string;
  isDisplayValueAsCurrency?: boolean;
  isDisplayValueAsPercentage?: boolean;
  isFlipColor?: boolean;
  kind: 'day' | 'month' | 'year';
  padding: MantineNumberSize;
  prevDay: string;
  prevMonth: string;
  prevValue: number;
  prevYear: string;
  redColorShade: string;
  selectedValue: number;
  width: number;
};

function returnDashboardCardInfo({
  currentMonth,
  currentYear,
  greenColorShade,
  heading,
  isDisplayValueAsCurrency = false,
  isDisplayValueAsPercentage = false,
  isFlipColor = false,
  kind,
  padding,
  prevDay,
  prevMonth,
  prevValue,
  prevYear,
  redColorShade,
  selectedValue,
  width,
}: ReturnDashboardCardInfoInput): DashboardCardInfo {
  const icon =
    kind === 'day' ? (
      <MdDateRange size={20} />
    ) : kind === 'month' ? (
      <MdCalendarMonth size={20} />
    ) : (
      <RiCalendarLine size={20} />
    );

  const deltaPercentage = ((selectedValue - prevValue) / prevValue) * 100;

  const deltaFormatted = Number.isFinite(deltaPercentage)
    ? `${deltaPercentage > 0 ? '+' : ''} ${deltaPercentage.toFixed(2)} %`
    : 'N/A';

  const deltaTextColor =
    deltaPercentage > 0
      ? isFlipColor
        ? redColorShade
        : greenColorShade
      : isFlipColor
      ? greenColorShade
      : redColorShade;

  const date =
    deltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${
          kind === 'day' ? prevDay : kind === 'month' ? prevMonth : prevYear
        } ${
          kind === 'day' ? currentMonth : kind === 'month' ? currentYear : ''
        }`;

  const displayValue = isDisplayValueAsPercentage
    ? `${isDisplayValueAsCurrency ? 'CAD' : ''} ${addCommaSeparator(
        (selectedValue * 100).toFixed(2)
      )} %`
    : `${isDisplayValueAsCurrency ? 'CAD' : ''} ${
        selectedValue.toString().includes('.')
          ? addCommaSeparator(selectedValue.toFixed(0))
          : addCommaSeparator(selectedValue.toString())
      }`;

  return {
    date,
    heading,
    icon,
    padding,
    percentage: deltaFormatted,
    value: displayValue,
    width,
    deltaTextColor,
  };
}

type ReturnCustomerMetricsCardsInput = {
  greenColorShade: string;
  padding: MantineNumberSize;
  redColorShade: string;
  selectedDateCustomerMetrics: SelectedDateCustomerMetrics;
  width: number;
};

type CustomerMetricsCards = {
  dailyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
  };
  monthlyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
    churnRate: DashboardCardInfo[];
    retentionRate: DashboardCardInfo[];
  };
  yearlyCards: {
    overview: DashboardCardInfo[];
    new: DashboardCardInfo[];
    returning: DashboardCardInfo[];
    churnRate: DashboardCardInfo[];
    retentionRate: DashboardCardInfo[];
  };
};

function returnCustomerMetricsCards({
  greenColorShade,
  padding,
  redColorShade,
  selectedDateCustomerMetrics,
  width,
}: ReturnCustomerMetricsCardsInput): CustomerMetricsCards {
  // customer metrics data
  const {
    dayCustomerMetrics: { prevDayMetrics, selectedDayMetrics },
    monthCustomerMetrics: { prevMonthMetrics, selectedMonthMetrics },
    yearCustomerMetrics: { prevYearMetrics, selectedYearMetrics },
  } = selectedDateCustomerMetrics;

  const currentYear = selectedYearMetrics?.year ?? '2023';
  const prevYear = prevYearMetrics?.year ?? '2022';
  const currentMonth = selectedMonthMetrics?.month ?? 'January';
  const prevMonth = prevMonthMetrics?.month ?? 'January';
  const prevDay = prevDayMetrics?.day ?? '01';

  // day

  // day -> overview

  // day -> overview -> total
  const dayTotalCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.total ?? 1,
    width,
  });

  // day -> overview -> new

  // day -> overview -> new -> total
  const dayTotalNewCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total New',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.new.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.new.total ?? 1,
    width,
  });

  // day -> overview -> returning

  // day -> overview -> returning -> total
  const dayTotalReturningCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total Returning',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.returning.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.returning.total ?? 1,
    width,
  });

  // day -> new

  // day -> new -> total
  // already created above

  // day -> new -> repair
  const dayTotalNewRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.new.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.new.repair ?? 1,
    width,
  });

  // day -> new -> sales

  // day -> new -> sales -> total
  const dayTotalNewSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.new.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.new.sales.total ?? 1,
    width,
  });

  // day -> new -> sales -> online
  const dayTotalNewSalesOnlineCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.new.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.new.sales.online ?? 1,
    width,
  });

  // day -> new -> sales -> in-store
  const dayTotalNewSalesInStoreCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.new.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.new.sales.inStore ?? 1,
    width,
  });

  // day -> returning

  // day -> returning -> total
  // already created above

  // day -> returning -> repair
  const dayTotalReturningRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.returning.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.returning.repair ?? 1,
    width,
  });

  // day -> returning -> sales

  // day -> returning -> sales -> total
  const dayTotalReturningSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.customers.returning.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.customers.returning.sales.total ?? 1,
    width,
  });

  // day -> returning -> sales -> online
  const dayTotalReturningSalesOnlineCustomersCardInfo = returnDashboardCardInfo(
    {
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales Online',
      kind: 'day',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevDayMetrics?.customers.returning.sales.online ?? 0,
      prevYear,
      redColorShade,
      selectedValue: selectedDayMetrics?.customers.returning.sales.online ?? 1,
      width,
    }
  );

  // day -> returning -> sales -> in-store
  const dayTotalReturningSalesInStoreCustomersCardInfo =
    returnDashboardCardInfo({
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales In-Store',
      kind: 'day',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevDayMetrics?.customers.returning.sales.inStore ?? 0,
      prevYear,
      redColorShade,
      selectedValue: selectedDayMetrics?.customers.returning.sales.inStore ?? 1,
      width,
    });

  // month

  // month -> overview

  // month -> overview -> total
  const monthTotalCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.total ?? 1,
    width,
  });

  // month -> overview -> new

  // month -> overview -> new -> total
  const monthTotalNewCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total New',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.new.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.new.total ?? 1,
    width,
  });

  // month -> overview -> returning

  // month -> overview -> returning -> total
  const monthTotalReturningCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total Returning',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.returning.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.returning.total ?? 1,
    width,
  });

  // month -> new

  // month -> new -> total
  // already created above

  // month -> new -> repair
  const monthTotalNewRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.new.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.new.repair ?? 1,
    width,
  });

  // month -> new -> sales

  // month -> new -> sales -> total
  const monthTotalNewSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.new.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.new.sales.total ?? 1,
    width,
  });

  // month -> new -> sales -> online
  const monthTotalNewSalesOnlineCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.new.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.new.sales.online ?? 1,
    width,
  });

  // month -> new -> sales -> in-store
  const monthTotalNewSalesInStoreCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.new.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.new.sales.inStore ?? 1,
    width,
  });

  // month -> returning

  // month -> returning -> total
  // already created above

  // month -> returning -> repair
  const monthTotalReturningRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.returning.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.returning.repair ?? 1,
    width,
  });

  // month -> returning -> sales

  // month -> returning -> sales -> total
  const monthTotalReturningSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.returning.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.returning.sales.total ?? 1,
    width,
  });

  // month -> returning -> sales -> online
  const monthTotalReturningSalesOnlineCustomersCardInfo =
    returnDashboardCardInfo({
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales Online',
      kind: 'month',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevMonthMetrics?.customers.returning.sales.online ?? 0,
      prevYear,
      redColorShade,
      selectedValue:
        selectedMonthMetrics?.customers.returning.sales.online ?? 1,
      width,
    });

  // month -> returning -> sales -> in-store
  const monthTotalReturningSalesInStoreCustomersCardInfo =
    returnDashboardCardInfo({
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales In-Store',
      kind: 'month',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevMonthMetrics?.customers.returning.sales.inStore ?? 0,
      prevYear,
      redColorShade,
      selectedValue:
        selectedMonthMetrics?.customers.returning.sales.inStore ?? 1,
      width,
    });

  // month -> churn rate
  const monthChurnRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Churn Rate',
    isFlipColor: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.churnRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.churnRate ?? 1,
    width,
  });

  // month -> retention rate
  const monthRetentionRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Retention Rate',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.customers.retentionRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.customers.retentionRate ?? 1,
    width,
  });

  // year

  // year -> overview

  // year -> overview -> total
  const yearTotalCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.total ?? 1,
    width,
  });

  // year -> overview -> new

  // year -> overview -> new -> total
  const yearTotalNewCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total New',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.new.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.new.total ?? 1,
    width,
  });

  // year -> overview -> returning

  // year -> overview -> returning -> total
  const yearTotalReturningCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total Returning',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.returning.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.returning.total ?? 1,
    width,
  });

  // year -> new

  // year -> new -> total
  // already created above

  // year -> new -> repair

  // year -> new -> repair -> total
  const yearTotalNewRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.new.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.new.repair ?? 1,
    width,
  });

  // year -> new -> sales

  // year -> new -> sales -> total
  const yearTotalNewSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.new.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.new.sales.total ?? 1,
    width,
  });

  // year -> new -> sales -> online
  const yearTotalNewSalesOnlineCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.new.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.new.sales.online ?? 1,
    width,
  });

  // year -> new -> sales -> in-store
  const yearTotalNewSalesInStoreCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.new.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.new.sales.inStore ?? 1,
    width,
  });

  // year -> returning

  // year -> returning -> total
  // already created above

  // year -> returning -> repair
  const yearTotalReturningRepairCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.returning.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.returning.repair ?? 1,
    width,
  });

  // year -> returning -> sales

  // year -> returning -> sales -> total
  const yearTotalReturningSalesCustomersCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.returning.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.returning.sales.total ?? 1,
    width,
  });

  // year -> returning -> sales -> online
  const yearTotalReturningSalesOnlineCustomersCardInfo =
    returnDashboardCardInfo({
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales Online',
      kind: 'year',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevYearMetrics?.customers.returning.sales.online ?? 0,
      prevYear,
      redColorShade,
      selectedValue: selectedYearMetrics?.customers.returning.sales.online ?? 1,
      width,
    });

  // year -> returning -> sales -> in-store
  const yearTotalReturningSalesInStoreCustomersCardInfo =
    returnDashboardCardInfo({
      currentMonth,
      currentYear,
      greenColorShade,
      heading: 'Sales In-Store',
      kind: 'year',
      padding,
      prevDay,
      prevMonth,
      prevValue: prevYearMetrics?.customers.returning.sales.inStore ?? 0,
      prevYear,
      redColorShade,
      selectedValue:
        selectedYearMetrics?.customers.returning.sales.inStore ?? 1,
      width,
    });

  // year -> churn rate
  const yearChurnRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Churn Rate',
    isFlipColor: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.churnRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.churnRate ?? 1,
    width,
  });

  // year -> retention rate
  const yearRetentionRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Retention Rate',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.customers.retentionRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.customers.retentionRate ?? 1,
    width,
  });

  return {
    dailyCards: {
      overview: [
        dayTotalCustomersCardInfo,
        dayTotalNewCustomersCardInfo,
        dayTotalReturningCustomersCardInfo,
      ],
      new: [
        dayTotalNewCustomersCardInfo,
        dayTotalNewRepairCustomersCardInfo,
        dayTotalNewSalesCustomersCardInfo,
        dayTotalNewSalesOnlineCustomersCardInfo,
        dayTotalNewSalesInStoreCustomersCardInfo,
      ],
      returning: [
        dayTotalReturningCustomersCardInfo,
        dayTotalReturningRepairCustomersCardInfo,
        dayTotalReturningSalesCustomersCardInfo,
        dayTotalReturningSalesOnlineCustomersCardInfo,
        dayTotalReturningSalesInStoreCustomersCardInfo,
      ],
    },
    monthlyCards: {
      overview: [
        monthTotalCustomersCardInfo,
        monthTotalNewCustomersCardInfo,
        monthTotalReturningCustomersCardInfo,
      ],
      new: [
        monthTotalNewCustomersCardInfo,
        monthTotalNewRepairCustomersCardInfo,
        monthTotalNewSalesCustomersCardInfo,
        monthTotalNewSalesOnlineCustomersCardInfo,
        monthTotalNewSalesInStoreCustomersCardInfo,
      ],
      returning: [
        monthTotalReturningCustomersCardInfo,
        monthTotalReturningRepairCustomersCardInfo,
        monthTotalReturningSalesCustomersCardInfo,
        monthTotalReturningSalesOnlineCustomersCardInfo,
        monthTotalReturningSalesInStoreCustomersCardInfo,
      ],
      churnRate: [monthChurnRateCardInfo],
      retentionRate: [monthRetentionRateCardInfo],
    },
    yearlyCards: {
      overview: [
        yearTotalCustomersCardInfo,
        yearTotalNewCustomersCardInfo,
        yearTotalReturningCustomersCardInfo,
      ],
      new: [
        yearTotalNewCustomersCardInfo,
        yearTotalNewRepairCustomersCardInfo,
        yearTotalNewSalesCustomersCardInfo,
        yearTotalNewSalesOnlineCustomersCardInfo,
        yearTotalNewSalesInStoreCustomersCardInfo,
      ],
      returning: [
        yearTotalReturningCustomersCardInfo,
        yearTotalReturningRepairCustomersCardInfo,
        yearTotalReturningSalesCustomersCardInfo,
        yearTotalReturningSalesOnlineCustomersCardInfo,
        yearTotalReturningSalesInStoreCustomersCardInfo,
      ],
      churnRate: [yearChurnRateCardInfo],
      retentionRate: [yearRetentionRateCardInfo],
    },
  };
}

type ReturnFinancialMetricsCardsInput = {
  selectedDateFinancialMetrics: SelectedDateFinancialMetrics;
  greenColorShade: string;
  redColorShade: string;
  padding: MantineNumberSize;
  width: number;
};

type FinancialMetricsCards = {
  dailyCards: {
    profit: DashboardCardInfo[];
    expenses: DashboardCardInfo[];
    transactions: DashboardCardInfo[];
    revenue: DashboardCardInfo[];
    otherMetrics: DashboardCardInfo[];
  };
  monthlyCards: {
    profit: DashboardCardInfo[];
    expenses: DashboardCardInfo[];
    transactions: DashboardCardInfo[];
    revenue: DashboardCardInfo[];
    otherMetrics: DashboardCardInfo[];
  };
  yearlyCards: {
    profit: DashboardCardInfo[];
    expenses: DashboardCardInfo[];
    transactions: DashboardCardInfo[];
    revenue: DashboardCardInfo[];
    otherMetrics: DashboardCardInfo[];
  };
};

function returnFinancialMetricsCards({
  padding,
  selectedDateFinancialMetrics,
  greenColorShade,
  redColorShade,
  width,
}: ReturnFinancialMetricsCardsInput): FinancialMetricsCards {
  // financial metrics data
  const {
    dayFinancialMetrics: { prevDayMetrics, selectedDayMetrics },
    monthFinancialMetrics: { prevMonthMetrics, selectedMonthMetrics },
    yearFinancialMetrics: { prevYearMetrics, selectedYearMetrics },
  } = selectedDateFinancialMetrics;

  const currentYear = selectedYearMetrics?.year ?? '2023';
  const prevYear = prevYearMetrics?.year ?? '2022';
  const currentMonth = selectedMonthMetrics?.month ?? 'January';
  const prevMonth = prevMonthMetrics?.month ?? 'January';
  const prevDay = prevDayMetrics?.day ?? '01';

  // day

  // day -> profit

  // day -> profit -> total
  const dayProfitTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.profit.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.profit.total ?? 1,
    width,
  });

  // day -> profit -> repair
  const dayProfitRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.profit.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.profit.repair ?? 1,
    width,
  });

  // day -> profit -> sales

  // day -> profit -> sales -> total
  const dayProfitSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.profit.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.profit.sales.total ?? 1,
    width,
  });

  // day -> profit -> sales -> online
  const dayProfitSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.profit.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.profit.sales.online ?? 1,
    width,
  });

  // day -> profit -> sales -> in-store
  const dayProfitSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.profit.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.profit.sales.inStore ?? 1,
    width,
  });

  // day -> expenses

  // day -> expenses -> total
  const dayExpensesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.expenses.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.expenses.total ?? 1,
    width,
  });

  // day -> expenses -> repair
  const dayExpensesRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.expenses.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.expenses.repair ?? 1,
    width,
  });

  // day -> expenses -> sales

  // day -> expenses -> sales -> total
  const dayExpensesSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.expenses.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.expenses.sales.total ?? 1,
    width,
  });

  // day -> expenses -> sales -> online
  const dayExpensesSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.expenses.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.expenses.sales.online ?? 1,
    width,
  });

  // day -> expenses -> sales -> in-store
  const dayExpensesSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.expenses.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.expenses.sales.inStore ?? 1,
    width,
  });

  // day -> transactions

  // day -> transactions -> total
  const dayTransactionsTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.transactions.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.transactions.total ?? 1,
    width,
  });

  // day -> transactions -> repair
  const dayTransactionsRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.transactions.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.transactions.repair ?? 1,
    width,
  });

  // day -> transactions -> sales

  // day -> transactions -> sales -> total
  const dayTransactionsSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.transactions.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.transactions.sales.total ?? 1,
    width,
  });

  // day -> transactions -> sales -> online
  const dayTransactionsSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.transactions.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.transactions.sales.online ?? 1,
    width,
  });

  // day -> transactions -> sales -> in-store
  const dayTransactionsSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.transactions.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.transactions.sales.inStore ?? 1,
    width,
  });

  // day -> revenue

  // day -> revenue -> total
  const dayRevenueTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.revenue.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.revenue.total ?? 1,
    width,
  });

  // day -> revenue -> repair
  const dayRevenueRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.revenue.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.revenue.repair ?? 1,
    width,
  });

  // day -> revenue -> sales

  // day -> revenue -> sales -> total
  const dayRevenueSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.revenue.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.revenue.sales.total ?? 1,
    width,
  });

  // day -> revenue -> sales -> online
  const dayRevenueSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.revenue.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.revenue.sales.online ?? 1,
    width,
  });

  // day -> revenue -> sales -> in-store
  const dayRevenueSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.revenue.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.revenue.sales.inStore ?? 1,
    width,
  });

  // day -> average order value
  const dayAverageOrderValueCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Average Order Value',
    isDisplayValueAsCurrency: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.averageOrderValue ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.averageOrderValue ?? 1,
    width,
  });

  // day -> conversion rate
  const dayConversionRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Conversion Rate',
    isDisplayValueAsPercentage: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.conversionRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.conversionRate ?? 1,
    width,
  });

  // day -> net profit margin
  const dayNetProfitMarginCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Net Profit Margin',
    isDisplayValueAsPercentage: true,
    kind: 'day',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevDayMetrics?.netProfitMargin ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedDayMetrics?.netProfitMargin ?? 1,
    width,
  });

  // month

  // month -> profit

  // month -> profit -> total
  const monthProfitTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.profit.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.profit.total ?? 1,
    width,
  });

  // month -> profit -> repair
  const monthProfitRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.profit.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.profit.repair ?? 1,
    width,
  });

  // month -> profit -> sales

  // month -> profit -> sales -> total
  const monthProfitSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.profit.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.profit.sales.total ?? 1,
    width,
  });

  // month -> profit -> sales -> online
  const monthProfitSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.profit.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.profit.sales.online ?? 1,
    width,
  });

  // month -> profit -> sales -> in-store
  const monthProfitSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.profit.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.profit.sales.inStore ?? 1,
    width,
  });

  // month -> expenses

  // month -> expenses -> total
  const monthExpensesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.expenses.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.expenses.total ?? 1,
    width,
  });

  // month -> expenses -> repair
  const monthExpensesRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.expenses.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.expenses.repair ?? 1,
    width,
  });

  // month -> expenses -> sales

  // month -> expenses -> sales -> total
  const monthExpensesSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.expenses.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.expenses.sales.total ?? 1,
    width,
  });

  // month -> expenses -> sales -> online
  const monthExpensesSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.expenses.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.expenses.sales.online ?? 1,
    width,
  });

  // month -> expenses -> sales -> in-store
  const monthExpensesSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.expenses.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.expenses.sales.inStore ?? 1,
    width,
  });

  // month -> transactions

  // month -> transactions -> total
  const monthTransactionsTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.transactions.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.transactions.total ?? 1,
    width,
  });

  // month -> transactions -> repair
  const monthTransactionsRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.transactions.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.transactions.repair ?? 1,
    width,
  });

  // month -> transactions -> sales

  // month -> transactions -> sales -> total
  const monthTransactionsSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.transactions.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.transactions.sales.total ?? 1,
    width,
  });

  // month -> transactions -> sales -> online
  const monthTransactionsSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.transactions.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.transactions.sales.online ?? 1,
    width,
  });

  // month -> transactions -> sales -> in-store
  const monthTransactionsSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.transactions.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.transactions.sales.inStore ?? 1,
    width,
  });

  // month -> revenue

  // month -> revenue -> total
  const monthRevenueTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.revenue.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.revenue.total ?? 1,
    width,
  });

  // month -> revenue -> repair
  const monthRevenueRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.revenue.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.revenue.repair ?? 1,
    width,
  });

  // month -> revenue -> sales

  // month -> revenue -> sales -> total
  const monthRevenueSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.revenue.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.revenue.sales.total ?? 1,
    width,
  });

  // month -> revenue -> sales -> online
  const monthRevenueSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.revenue.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.revenue.sales.online ?? 1,
    width,
  });

  // month -> revenue -> sales -> in-store
  const monthRevenueSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.revenue.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.revenue.sales.inStore ?? 1,
    width,
  });

  // month -> average order value
  const monthAverageOrderValueCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Average Order Value',
    isDisplayValueAsCurrency: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.averageOrderValue ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.averageOrderValue ?? 1,
    width,
  });

  // month -> conversion rate
  const monthConversionRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Conversion Rate',
    isDisplayValueAsPercentage: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.conversionRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.conversionRate ?? 1,
    width,
  });

  // month -> net profit margin
  const monthNetProfitMarginCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Net Profit Margin',
    isDisplayValueAsPercentage: true,
    kind: 'month',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevMonthMetrics?.netProfitMargin ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedMonthMetrics?.netProfitMargin ?? 1,
    width,
  });

  // year

  // year -> profit

  // year -> profit -> total
  const yearProfitTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.profit.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.profit.total ?? 1,
    width,
  });

  // year -> profit -> repair
  const yearProfitRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.profit.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.profit.repair ?? 1,
    width,
  });

  // year -> profit -> sales

  // year -> profit -> sales -> total
  const yearProfitSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.profit.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.profit.sales.total ?? 1,
    width,
  });

  // year -> profit -> sales -> online
  const yearProfitSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.profit.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.profit.sales.online ?? 1,
    width,
  });

  // year -> profit -> sales -> in-store
  const yearProfitSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.profit.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.profit.sales.inStore ?? 1,
    width,
  });

  // year -> expenses

  // year -> expenses -> total
  const yearExpensesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.expenses.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.expenses.total ?? 1,
    width,
  });

  // year -> expenses -> repair
  const yearExpensesRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.expenses.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.expenses.repair ?? 1,
    width,
  });

  // year -> expenses -> sales

  // year -> expenses -> sales -> total
  const yearExpensesSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.expenses.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.expenses.sales.total ?? 1,
    width,
  });

  // year -> expenses -> sales -> online
  const yearExpensesSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.expenses.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.expenses.sales.online ?? 1,
    width,
  });

  // year -> expenses -> sales -> in-store
  const yearExpensesSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.expenses.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.expenses.sales.inStore ?? 1,
    width,
  });

  // year -> transactions

  // year -> transactions -> total
  const yearTransactionsTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.transactions.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.transactions.total ?? 1,
    width,
  });

  // year -> transactions -> repair
  const yearTransactionsRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.transactions.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.transactions.repair ?? 1,
    width,
  });

  // year -> transactions -> sales

  // year -> transactions -> sales -> total
  const yearTransactionsSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.transactions.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.transactions.sales.total ?? 1,
    width,
  });

  // year -> transactions -> sales -> online
  const yearTransactionsSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.transactions.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.transactions.sales.online ?? 1,
    width,
  });

  // year -> transactions -> sales -> in-store
  const yearTransactionsSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.transactions.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.transactions.sales.inStore ?? 1,
    width,
  });

  // year -> revenue

  // year -> revenue -> total
  const yearRevenueTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.revenue.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.revenue.total ?? 1,
    width,
  });

  // year -> revenue -> repair
  const yearRevenueRepairCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Repair',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.revenue.repair ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.revenue.repair ?? 1,
    width,
  });

  // year -> revenue -> sales

  // year -> revenue -> sales -> total
  const yearRevenueSalesTotalCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Total',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.revenue.sales.total ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.revenue.sales.total ?? 1,
    width,
  });

  // year -> revenue -> sales -> online
  const yearRevenueSalesOnlineCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales Online',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.revenue.sales.online ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.revenue.sales.online ?? 1,
    width,
  });

  // year -> revenue -> sales -> in-store
  const yearRevenueSalesInStoreCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Sales In-Store',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.revenue.sales.inStore ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.revenue.sales.inStore ?? 1,
    width,
  });

  // year -> average order value
  const yearAverageOrderValueCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Average Order Value',
    isDisplayValueAsCurrency: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.averageOrderValue ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.averageOrderValue ?? 1,
    width,
  });

  // year -> conversion rate
  const yearConversionRateCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Conversion Rate',
    isDisplayValueAsPercentage: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.conversionRate ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.conversionRate ?? 1,
    width,
  });

  // year -> net profit margin
  const yearNetProfitMarginCardInfo = returnDashboardCardInfo({
    currentMonth,
    currentYear,
    greenColorShade,
    heading: 'Net Profit Margin',
    isDisplayValueAsPercentage: true,
    kind: 'year',
    padding,
    prevDay,
    prevMonth,
    prevValue: prevYearMetrics?.netProfitMargin ?? 0,
    prevYear,
    redColorShade,
    selectedValue: selectedYearMetrics?.netProfitMargin ?? 1,
    width,
  });

  return {
    dailyCards: {
      profit: [
        dayProfitTotalCardInfo,
        dayProfitRepairCardInfo,
        dayProfitSalesTotalCardInfo,
        dayProfitSalesOnlineCardInfo,
        dayProfitSalesInStoreCardInfo,
      ],
      revenue: [
        dayRevenueTotalCardInfo,
        dayRevenueRepairCardInfo,
        dayRevenueSalesTotalCardInfo,
        dayRevenueSalesOnlineCardInfo,
        dayRevenueSalesInStoreCardInfo,
      ],
      expenses: [
        dayExpensesTotalCardInfo,
        dayExpensesRepairCardInfo,
        dayExpensesSalesTotalCardInfo,
        dayExpensesSalesOnlineCardInfo,
        dayExpensesSalesInStoreCardInfo,
      ],
      transactions: [
        dayTransactionsTotalCardInfo,
        dayTransactionsRepairCardInfo,
        dayTransactionsSalesTotalCardInfo,
        dayTransactionsSalesOnlineCardInfo,
        dayTransactionsSalesInStoreCardInfo,
      ],
      otherMetrics: [
        dayAverageOrderValueCardInfo,
        dayConversionRateCardInfo,
        dayNetProfitMarginCardInfo,
      ],
    },
    monthlyCards: {
      profit: [
        monthProfitTotalCardInfo,
        monthProfitRepairCardInfo,
        monthProfitSalesTotalCardInfo,
        monthProfitSalesOnlineCardInfo,
        monthProfitSalesInStoreCardInfo,
      ],
      revenue: [
        monthRevenueTotalCardInfo,
        monthRevenueRepairCardInfo,
        monthRevenueSalesTotalCardInfo,
        monthRevenueSalesOnlineCardInfo,
        monthRevenueSalesInStoreCardInfo,
      ],
      expenses: [
        monthExpensesTotalCardInfo,
        monthExpensesRepairCardInfo,
        monthExpensesSalesTotalCardInfo,
        monthExpensesSalesOnlineCardInfo,
        monthExpensesSalesInStoreCardInfo,
      ],
      transactions: [
        monthTransactionsTotalCardInfo,
        monthTransactionsRepairCardInfo,
        monthTransactionsSalesTotalCardInfo,
        monthTransactionsSalesOnlineCardInfo,
        monthTransactionsSalesInStoreCardInfo,
      ],
      otherMetrics: [
        monthAverageOrderValueCardInfo,
        monthConversionRateCardInfo,
        monthNetProfitMarginCardInfo,
      ],
    },
    yearlyCards: {
      profit: [
        yearProfitTotalCardInfo,
        yearProfitRepairCardInfo,
        yearProfitSalesTotalCardInfo,
        yearProfitSalesOnlineCardInfo,
        yearProfitSalesInStoreCardInfo,
      ],
      revenue: [
        yearRevenueTotalCardInfo,
        yearRevenueRepairCardInfo,
        yearRevenueSalesTotalCardInfo,
        yearRevenueSalesOnlineCardInfo,
        yearRevenueSalesInStoreCardInfo,
      ],
      expenses: [
        yearExpensesTotalCardInfo,
        yearExpensesRepairCardInfo,
        yearExpensesSalesTotalCardInfo,
        yearExpensesSalesOnlineCardInfo,
        yearExpensesSalesInStoreCardInfo,
      ],
      transactions: [
        yearTransactionsTotalCardInfo,
        yearTransactionsRepairCardInfo,
        yearTransactionsSalesTotalCardInfo,
        yearTransactionsSalesOnlineCardInfo,
        yearTransactionsSalesInStoreCardInfo,
      ],
      otherMetrics: [
        yearAverageOrderValueCardInfo,
        yearConversionRateCardInfo,
        yearNetProfitMarginCardInfo,
      ],
    },
  };
}

export {
  returnCustomerMetricsCards,
  returnDashboardCardElement,
  returnFinancialMetricsCards,
};
export type { CustomerMetricsCards, DashboardCardInfo, FinancialMetricsCards };
