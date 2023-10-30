import { Card, Group, MantineNumberSize, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { MdCalendarMonth, MdDateRange } from 'react-icons/md';
import { RiCalendarLine } from 'react-icons/ri';
import { SelectedDateCustomerMetrics } from './customerDashboard/utils';

type DashboardCardInfo = {
  date?: string;
  heading?: string;
  icon: ReactNode;
  padding?: MantineNumberSize;
  percentage?: string;
  value?: number;
  width: number;
};
function returnDashboardCard({
  date,
  heading,
  icon,
  padding,
  percentage,
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
    <Group w="100%">
      <Text size="xl" weight={600}>
        {value ? (value < 1 ? value?.toFixed(2) : value) : null}
      </Text>
    </Group>
  );

  const displayPercentage = (
    <Text size="sm" italic>
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

type ReturnDashboardCustomerCardInfoInput = {
  customerMetrics: SelectedDateCustomerMetrics;
  padding: MantineNumberSize;
  width: number;
};

type ReturnDashboardCustomerCardInfoOutput = {
  dailyCards: {
    dailyOverview: DashboardCardInfo[];
    dailyNew: DashboardCardInfo[];
    dailyReturning: DashboardCardInfo[];
  };
  monthlyCards: {
    monthlyOverview: DashboardCardInfo[];
    monthlyNew: DashboardCardInfo[];
    monthlyReturning: DashboardCardInfo[];
    monthlyChurnRate: DashboardCardInfo[];
    monthlyRetentionRate: DashboardCardInfo[];
  };
  yearlyCards: {
    yearlyOverview: DashboardCardInfo[];
    yearlyNew: DashboardCardInfo[];
    yearlyReturning: DashboardCardInfo[];
    yearlyChurnRate: DashboardCardInfo[];
    yearlyRetentionRate: DashboardCardInfo[];
  };
};

function returnDashboardCustomerCardInfo({
  customerMetrics,
  padding,
  width,
}: ReturnDashboardCustomerCardInfoInput): ReturnDashboardCustomerCardInfoOutput {
  // customer metrics data
  const { dayCustomerMetrics, monthCustomerMetrics, yearCustomerMetrics } =
    customerMetrics;

  const currentYear = yearCustomerMetrics?.selectedYearMetrics?.year ?? 0;
  const prevYear = yearCustomerMetrics?.prevYearMetrics?.year ?? 0;
  const currentMonth = monthCustomerMetrics?.selectedMonthMetrics?.month ?? 0;
  const prevMonth = monthCustomerMetrics?.prevMonthMetrics?.month ?? 0;
  const prevDay = dayCustomerMetrics?.prevDayMetrics?.day ?? 0;

  // daily
  // daily -> overview
  // daily -> overview -> total customers
  const selectedDayTotalCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.total ?? 1;
  const prevDayTotalCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.total ?? 0;
  const dayTotalCustomersDeltaPercentage =
    ((selectedDayTotalCustomers - prevDayTotalCustomers) /
      prevDayTotalCustomers) *
    100;
  const dayTotalCustomersDeltaFormatted = Number.isFinite(
    dayTotalCustomersDeltaPercentage
  )
    ? `${
        dayTotalCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalCustomersDate =
    dayTotalCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> overview -> new customers
  const selectedDayNewCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.total ?? 1;
  const prevDayNewCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.total ?? 0;
  const dayTotalNewCustomersDeltaPercentage =
    ((selectedDayNewCustomers - prevDayNewCustomers) / prevDayNewCustomers) *
    100;
  const dayTotalNewCustomersDeltaFormatted = Number.isFinite(
    dayTotalNewCustomersDeltaPercentage
  )
    ? `${
        dayTotalNewCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalNewCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalNewCustomersDate =
    dayTotalNewCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> overview -> returning customers
  const selectedDayReturningCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.total ?? 1;
  const prevDayReturningCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.total ?? 0;
  const dayTotalReturningCustomersDeltaPercentage =
    ((selectedDayReturningCustomers - prevDayReturningCustomers) /
      prevDayReturningCustomers) *
    100;
  const dayTotalReturningCustomersDeltaFormatted = Number.isFinite(
    dayTotalReturningCustomersDeltaPercentage
  )
    ? `${
        dayTotalReturningCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalReturningCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalReturningCustomersDate =
    dayTotalReturningCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> new
  // daily -> new -> total online customers
  const selectedDayNewSalesOnlineCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.online ?? 1;
  const prevDayNewSalesOnlineCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.sales.online ?? 0;
  const dayTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedDayNewSalesOnlineCustomers - prevDayNewSalesOnlineCustomers) /
      prevDayNewSalesOnlineCustomers) *
    100;
  const dayTotalNewSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    dayTotalNewSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        dayTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalNewSalesOnlineCustomersDate =
    dayTotalNewSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> new -> total in-store customers
  const selectedDayNewSalesInStoreCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.inStore ?? 1;
  const prevDayNewSalesInStoreCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.sales.inStore ?? 0;
  const dayTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedDayNewSalesInStoreCustomers - prevDayNewSalesInStoreCustomers) /
      prevDayNewSalesInStoreCustomers) *
    100;
  const dayTotalNewSalesInStoreCustomersDeltaFormatted = Number.isFinite(
    dayTotalNewSalesInStoreCustomersDeltaPercentage
  )
    ? `${
        dayTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalNewSalesInStoreCustomersDate =
    dayTotalNewSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> new -> total repair customers
  const selectedDayNewRepairCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.repair ?? 1;
  const prevDayNewRepairCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.repair ?? 0;
  const dayTotalNewRepairCustomersDeltaPercentage =
    ((selectedDayNewRepairCustomers - prevDayNewRepairCustomers) /
      prevDayNewRepairCustomers) *
    100;
  const dayTotalNewRepairCustomersDeltaFormatted = Number.isFinite(
    dayTotalNewRepairCustomersDeltaPercentage
  )
    ? `${
        dayTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalNewRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalNewRepairCustomersDate =
    dayTotalNewRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> returning
  // daily -> returning -> total online customers
  const selectedDayReturningSalesOnlineCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales.online ??
    1;
  const prevDayReturningSalesOnlineCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.sales.online ?? 0;
  const dayTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedDayReturningSalesOnlineCustomers -
      prevDayReturningSalesOnlineCustomers) /
      prevDayReturningSalesOnlineCustomers) *
    100;
  const dayTotalReturningSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    dayTotalReturningSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        dayTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalReturningSalesOnlineCustomersDate =
    dayTotalReturningSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> returning -> total in-store customers
  const selectedDayReturningSalesInStoreCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales.inStore ??
    1;
  const prevDayReturningSalesInStoreCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.sales.inStore ?? 0;
  const dayTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedDayReturningSalesInStoreCustomers -
      prevDayReturningSalesInStoreCustomers) /
      prevDayReturningSalesInStoreCustomers) *
    100;
  const dayTotalReturningSalesInStoreCustomersDeltaFormatted = Number.isFinite(
    dayTotalReturningSalesInStoreCustomersDeltaPercentage
  )
    ? `${
        dayTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalReturningSalesInStoreCustomersDate =
    dayTotalReturningSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> returning -> total repair customers
  const selectedDayReturningRepairCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.repair ?? 1;
  const prevDayReturningRepairCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.repair ?? 0;
  const dayTotalReturningRepairCustomersDeltaPercentage =
    ((selectedDayReturningRepairCustomers - prevDayReturningRepairCustomers) /
      prevDayReturningRepairCustomers) *
    100;
  const dayTotalReturningRepairCustomersDeltaFormatted = Number.isFinite(
    dayTotalReturningRepairCustomersDeltaPercentage
  )
    ? `${
        dayTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${dayTotalReturningRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const dayTotalReturningRepairCustomersDate =
    dayTotalReturningRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${currentMonth}-${prevDay}`;

  // daily -> overview
  const dayTotalCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalCustomersDate,
    heading: 'Total',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalCustomersDeltaFormatted,
    value: selectedDayTotalCustomers,
    width,
  };

  const dayTotalNewCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalNewCustomersDate,
    heading: 'New Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewCustomersDeltaFormatted,
    value: selectedDayNewCustomers,
    width,
  };

  const dayTotalReturningCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalReturningCustomersDate,
    heading: 'Returning Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningCustomersDeltaFormatted,
    value: selectedDayReturningCustomers,
    width,
  };

  // daily -> new
  const dayTotalNewSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalNewSalesOnlineCustomersDate,
    heading: 'New Online Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewSalesOnlineCustomersDeltaFormatted,
    value: selectedDayNewSalesOnlineCustomers,
    width,
  };

  const dayTotalNewSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalNewSalesInStoreCustomersDate,
    heading: 'New In-Store Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewSalesInStoreCustomersDeltaFormatted,
    value: selectedDayNewSalesInStoreCustomers,
    width,
  };

  const dayTotalNewRepairCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalNewRepairCustomersDate,
    heading: 'New Repair Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewRepairCustomersDeltaFormatted,
    value: selectedDayNewRepairCustomers,
    width,
  };

  // daily -> returning
  const dayTotalReturningSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalReturningSalesOnlineCustomersDate,
    heading: 'Returning Online Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningSalesOnlineCustomersDeltaFormatted,
    value: selectedDayReturningSalesOnlineCustomers,
    width,
  };

  const dayTotalReturningSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalReturningSalesInStoreCustomersDate,
    heading: 'Returning In-Store Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningSalesInStoreCustomersDeltaFormatted,
    value: selectedDayReturningSalesInStoreCustomers,
    width,
  };

  const dayTotalReturningRepairCustomersCardInfo: DashboardCardInfo = {
    date: dayTotalReturningRepairCustomersDate,
    heading: 'Returning Repair Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningRepairCustomersDeltaFormatted,
    value: selectedDayReturningRepairCustomers,
    width,
  };

  // monthly
  // monthly -> overview
  // monthly -> overview -> total customers
  const selectedMonthTotalCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.total ?? 1;
  const prevMonthTotalCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.total ?? 0;
  const monthTotalCustomersDeltaPercentage =
    ((selectedMonthTotalCustomers - prevMonthTotalCustomers) /
      prevMonthTotalCustomers) *
    100;
  const monthTotalCustomersDeltaFormatted = Number.isFinite(
    monthTotalCustomersDeltaPercentage
  )
    ? `${
        monthTotalCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalCustomersDate =
    monthTotalCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> overview -> new customers
  const selectedMonthNewCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.total ?? 1;
  const prevMonthNewCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.total ?? 0;
  const monthTotalNewCustomersDeltaPercentage =
    ((selectedMonthNewCustomers - prevMonthNewCustomers) /
      prevMonthNewCustomers) *
    100;
  const monthTotalNewCustomersDeltaFormatted = Number.isFinite(
    monthTotalNewCustomersDeltaPercentage
  )
    ? `${
        monthTotalNewCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalNewCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalNewCustomersDate =
    monthTotalNewCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> overview -> returning customers
  const selectedMonthReturningCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.total ?? 1;
  const prevMonthReturningCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.total ?? 0;
  const monthTotalReturningCustomersDeltaPercentage =
    ((selectedMonthReturningCustomers - prevMonthReturningCustomers) /
      prevMonthReturningCustomers) *
    100;
  const monthTotalReturningCustomersDeltaFormatted = Number.isFinite(
    monthTotalReturningCustomersDeltaPercentage
  )
    ? `${
        monthTotalReturningCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalReturningCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalReturningCustomersDate =
    monthTotalReturningCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> new
  // monthly -> new -> total online customers
  const selectedMonthNewSalesOnlineCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales.online ?? 1;
  const prevMonthNewSalesOnlineCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.sales.online ?? 0;
  const monthTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedMonthNewSalesOnlineCustomers - prevMonthNewSalesOnlineCustomers) /
      prevMonthNewSalesOnlineCustomers) *
    100;
  const monthTotalNewSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    monthTotalNewSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        monthTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalNewSalesOnlineCustomersDate =
    monthTotalNewSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> new -> total in-store customers
  const selectedMonthNewSalesInStoreCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales.inStore ??
    1;
  const prevMonthNewSalesInStoreCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.sales.inStore ?? 0;
  const monthTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedMonthNewSalesInStoreCustomers -
      prevMonthNewSalesInStoreCustomers) /
      prevMonthNewSalesInStoreCustomers) *
    100;
  const monthTotalNewSalesInStoreCustomersDeltaFormatted = Number.isFinite(
    monthTotalNewSalesInStoreCustomersDeltaPercentage
  )
    ? `${
        monthTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalNewSalesInStoreCustomersDate =
    monthTotalNewSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> new -> total repair customers
  const selectedMonthNewRepairCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.repair ?? 1;
  const prevMonthNewRepairCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.repair ?? 0;
  const monthTotalNewRepairCustomersDeltaPercentage =
    ((selectedMonthNewRepairCustomers - prevMonthNewRepairCustomers) /
      prevMonthNewRepairCustomers) *
    100;
  const monthTotalNewRepairCustomersDeltaFormatted = Number.isFinite(
    monthTotalNewRepairCustomersDeltaPercentage
  )
    ? `${
        monthTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalNewRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalNewRepairCustomersDate =
    monthTotalNewRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> returning
  // monthly -> returning -> total online customers
  const selectedMonthReturningSalesOnlineCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
      .online ?? 1;
  const prevMonthReturningSalesOnlineCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.sales.online ??
    0;
  const monthTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedMonthReturningSalesOnlineCustomers -
      prevMonthReturningSalesOnlineCustomers) /
      prevMonthReturningSalesOnlineCustomers) *
    100;
  const monthTotalReturningSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    monthTotalReturningSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        monthTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalReturningSalesOnlineCustomersDate =
    monthTotalReturningSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly returning total in-store customers
  const selectedMonthReturningSalesInStoreCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
      .inStore ?? 1;
  const prevMonthReturningSalesInStoreCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.sales.inStore ??
    0;
  const monthTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedMonthReturningSalesInStoreCustomers -
      prevMonthReturningSalesInStoreCustomers) /
      prevMonthReturningSalesInStoreCustomers) *
    100;
  const monthTotalReturningSalesInStoreCustomersDeltaFormatted =
    Number.isFinite(monthTotalReturningSalesInStoreCustomersDeltaPercentage)
      ? `${
          monthTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
        } ${monthTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(
          2
        )} %`
      : 'N/A';
  const monthTotalReturningSalesInStoreCustomersDate =
    monthTotalReturningSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> returning -> total repair customers
  const selectedMonthReturningRepairCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.repair ?? 1;
  const prevMonthReturningRepairCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.repair ?? 0;
  const monthTotalReturningRepairCustomersDeltaPercentage =
    ((selectedMonthReturningRepairCustomers -
      prevMonthReturningRepairCustomers) /
      prevMonthReturningRepairCustomers) *
    100;
  const monthTotalReturningRepairCustomersDeltaFormatted = Number.isFinite(
    monthTotalReturningRepairCustomersDeltaPercentage
  )
    ? `${
        monthTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${monthTotalReturningRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthTotalReturningRepairCustomersDate =
    monthTotalReturningRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> churn rate
  const selectedMonthChurnRate =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.churnRate ?? 1;
  const prevMonthChurnRate =
    monthCustomerMetrics?.prevMonthMetrics?.customers.churnRate ?? 0;
  const monthChurnRateDeltaPercentage =
    ((selectedMonthChurnRate - prevMonthChurnRate) / prevMonthChurnRate) * 100;
  const monthChurnRateDeltaFormatted = Number.isFinite(
    monthChurnRateDeltaPercentage
  )
    ? `${
        monthChurnRateDeltaPercentage > 0 ? '+' : ''
      } ${monthChurnRateDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthChurnRateDate =
    monthChurnRateDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> retention rate
  const selectedMonthRetentionRate =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.retentionRate ?? 1;
  const prevMonthRetentionRate =
    monthCustomerMetrics?.prevMonthMetrics?.customers.retentionRate ?? 0;
  const monthRetentionRateDeltaPercentage =
    ((selectedMonthRetentionRate - prevMonthRetentionRate) /
      prevMonthRetentionRate) *
    100;
  const monthRetentionRateDeltaFormatted = Number.isFinite(
    monthRetentionRateDeltaPercentage
  )
    ? `${
        monthRetentionRateDeltaPercentage > 0 ? '+' : ''
      } ${monthRetentionRateDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const monthRetentionRateDate =
    monthRetentionRateDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${currentYear}-${prevMonth}`;

  // monthly -> overview
  const monthTotalCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalCustomersDate,
    heading: 'Total',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalCustomersDeltaFormatted,
    value: selectedMonthTotalCustomers,
    width,
  };

  const monthTotalNewCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalNewCustomersDate,
    heading: 'New Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewCustomersDeltaFormatted,
    value: selectedMonthNewCustomers,
    width,
  };

  const monthTotalReturningCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalReturningCustomersDate,
    heading: 'Returning Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalReturningCustomersDeltaFormatted,
    value: selectedMonthReturningCustomers,
    width,
  };

  // monthly -> new
  const monthTotalNewSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalNewSalesOnlineCustomersDate,
    heading: 'New Online Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewSalesOnlineCustomersDeltaFormatted,
    value: selectedMonthNewSalesOnlineCustomers,
    width,
  };

  const monthTotalNewSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalNewSalesInStoreCustomersDate,
    heading: 'New In-Store Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewSalesInStoreCustomersDeltaFormatted,
    value: selectedMonthNewSalesInStoreCustomers,
    width,
  };

  const monthTotalNewRepairCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalNewRepairCustomersDate,
    heading: 'New Repair Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewRepairCustomersDeltaFormatted,
    value: selectedMonthNewRepairCustomers,
    width,
  };

  // monthly -> returning
  const monthTotalReturningSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalReturningSalesOnlineCustomersDate,
    heading: 'Returning Online Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalReturningSalesOnlineCustomersDeltaFormatted,
    value: selectedMonthReturningSalesOnlineCustomers,
    width,
  };

  const monthTotalReturningSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalReturningSalesInStoreCustomersDate,
    heading: 'Returning In-Store Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalReturningSalesInStoreCustomersDeltaFormatted,
    value: selectedMonthReturningSalesInStoreCustomers,
    width,
  };

  const monthTotalReturningRepairCustomersCardInfo: DashboardCardInfo = {
    date: monthTotalReturningRepairCustomersDate,
    heading: 'Returning Repair Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalReturningRepairCustomersDeltaFormatted,
    value: selectedMonthReturningRepairCustomers,
    width,
  };

  // monthly -> churn rate
  const monthChurnRateCardInfo: DashboardCardInfo = {
    date: monthChurnRateDate,
    heading: 'Churn Rate',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthChurnRateDeltaFormatted,
    value: selectedMonthChurnRate,
    width,
  };

  // monthly -> retention rate
  const monthRetentionRateCardInfo: DashboardCardInfo = {
    date: monthRetentionRateDate,
    heading: 'Retention Rate',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthRetentionRateDeltaFormatted,
    value: selectedMonthRetentionRate,
    width,
  };

  // yearly
  // yearly -> overview
  // yearly -> overview -> total customers
  const selectedYearTotalCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.total ?? 1;
  const prevYearTotalCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.total ?? 0;
  const yearTotalCustomersDeltaPercentage =
    ((selectedYearTotalCustomers - prevYearTotalCustomers) /
      prevYearTotalCustomers) *
    100;
  const yearTotalCustomersDeltaFormatted = Number.isFinite(
    yearTotalCustomersDeltaPercentage
  )
    ? `${
        yearTotalCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalCustomersDate =
    yearTotalCustomersDeltaFormatted === 'N/A' ? 'N/A' : `Since ${prevYear}`;

  // yearly -> overview -> new customers
  const selectedYearNewCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.total ?? 1;
  const prevYearNewCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.total ?? 0;
  const yearTotalNewCustomersDeltaPercentage =
    ((selectedYearNewCustomers - prevYearNewCustomers) / prevYearNewCustomers) *
    100;
  const yearTotalNewCustomersDeltaFormatted = Number.isFinite(
    yearTotalNewCustomersDeltaPercentage
  )
    ? `${
        yearTotalNewCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalNewCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalNewCustomersDate =
    yearTotalNewCustomersDeltaFormatted === 'N/A' ? 'N/A' : `Since ${prevYear}`;

  // yearly -> overview -> returning customers
  const selectedYearReturningCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.total ?? 1;
  const prevYearReturningCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.total ?? 0;
  const yearTotalReturningCustomersDeltaPercentage =
    ((selectedYearReturningCustomers - prevYearReturningCustomers) /
      prevYearReturningCustomers) *
    100;
  const yearTotalReturningCustomersDeltaFormatted = Number.isFinite(
    yearTotalReturningCustomersDeltaPercentage
  )
    ? `${
        yearTotalReturningCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalReturningCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalReturningCustomersDate =
    yearTotalReturningCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> new
  // yearly -> new -> total online customers
  const selectedYearNewSalesOnlineCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.online ?? 1;
  const prevYearNewSalesOnlineCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.sales.online ?? 0;
  const yearTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedYearNewSalesOnlineCustomers - prevYearNewSalesOnlineCustomers) /
      prevYearNewSalesOnlineCustomers) *
    100;
  const yearTotalNewSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    yearTotalNewSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        yearTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalNewSalesOnlineCustomersDate =
    yearTotalNewSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> new -> total in-store customers
  const selectedYearNewSalesInStoreCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.inStore ?? 1;
  const prevYearNewSalesInStoreCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.sales.inStore ?? 0;
  const yearTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedYearNewSalesInStoreCustomers - prevYearNewSalesInStoreCustomers) /
      prevYearNewSalesInStoreCustomers) *
    100;
  const yearTotalNewSalesInStoreCustomersDeltaFormatted = Number.isFinite(
    yearTotalNewSalesInStoreCustomersDeltaPercentage
  )
    ? `${
        yearTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalNewSalesInStoreCustomersDate =
    yearTotalNewSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> new -> total repair customers
  const selectedYearNewRepairCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.repair ?? 1;
  const prevYearNewRepairCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.repair ?? 0;
  const yearTotalNewRepairCustomersDeltaPercentage =
    ((selectedYearNewRepairCustomers - prevYearNewRepairCustomers) /
      prevYearNewRepairCustomers) *
    100;
  const yearTotalNewRepairCustomersDeltaFormatted = Number.isFinite(
    yearTotalNewRepairCustomersDeltaPercentage
  )
    ? `${
        yearTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalNewRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalNewRepairCustomersDate =
    yearTotalNewRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> returning
  // yearly -> returning -> total online customers
  const selectedYearReturningSalesOnlineCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
      .online ?? 1;
  const prevYearReturningSalesOnlineCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.sales.online ?? 0;
  const yearTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedYearReturningSalesOnlineCustomers -
      prevYearReturningSalesOnlineCustomers) /
      prevYearReturningSalesOnlineCustomers) *
    100;
  const yearTotalReturningSalesOnlineCustomersDeltaFormatted = Number.isFinite(
    yearTotalReturningSalesOnlineCustomersDeltaPercentage
  )
    ? `${
        yearTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalReturningSalesOnlineCustomersDate =
    yearTotalReturningSalesOnlineCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly returning total in-store customers
  const selectedYearReturningSalesInStoreCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
      .inStore ?? 1;
  const prevYearReturningSalesInStoreCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.sales.inStore ??
    0;
  const yearTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedYearReturningSalesInStoreCustomers -
      prevYearReturningSalesInStoreCustomers) /
      prevYearReturningSalesInStoreCustomers) *
    100;
  const yearTotalReturningSalesInStoreCustomersDeltaFormatted = Number.isFinite(
    yearTotalReturningSalesInStoreCustomersDeltaPercentage
  )
    ? `${
        yearTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalReturningSalesInStoreCustomersDate =
    yearTotalReturningSalesInStoreCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> returning -> total repair customers
  const selectedYearReturningRepairCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.repair ?? 1;
  const prevYearReturningRepairCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.repair ?? 0;
  const yearTotalReturningRepairCustomersDeltaPercentage =
    ((selectedYearReturningRepairCustomers - prevYearReturningRepairCustomers) /
      prevYearReturningRepairCustomers) *
    100;
  const yearTotalReturningRepairCustomersDeltaFormatted = Number.isFinite(
    yearTotalReturningRepairCustomersDeltaPercentage
  )
    ? `${
        yearTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : ''
      } ${yearTotalReturningRepairCustomersDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearTotalReturningRepairCustomersDate =
    yearTotalReturningRepairCustomersDeltaFormatted === 'N/A'
      ? 'N/A'
      : `Since ${prevYear}`;

  // yearly -> churn rate
  const selectedYearChurnRate =
    yearCustomerMetrics?.selectedYearMetrics?.customers.churnRate ?? 1;
  const prevYearChurnRate =
    yearCustomerMetrics?.prevYearMetrics?.customers.churnRate ?? 0;
  const yearChurnRateDeltaPercentage =
    ((selectedYearChurnRate - prevYearChurnRate) / prevYearChurnRate) * 100;
  const yearChurnRateDeltaFormatted = Number.isFinite(
    yearChurnRateDeltaPercentage
  )
    ? `${
        yearChurnRateDeltaPercentage > 0 ? '+' : ''
      } ${yearChurnRateDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearChurnRateDate =
    yearChurnRateDeltaFormatted === 'N/A' ? 'N/A' : `Since ${prevYear}`;

  // yearly -> retention rate
  const selectedYearRetentionRate =
    yearCustomerMetrics?.selectedYearMetrics?.customers.retentionRate ?? 1;
  const prevYearRetentionRate =
    yearCustomerMetrics?.prevYearMetrics?.customers.retentionRate ?? 0;
  const yearRetentionRateDeltaPercentage =
    ((selectedYearRetentionRate - prevYearRetentionRate) /
      prevYearRetentionRate) *
    100;
  const yearRetentionRateDeltaFormatted = Number.isFinite(
    yearRetentionRateDeltaPercentage
  )
    ? `${
        yearRetentionRateDeltaPercentage > 0 ? '+' : ''
      } ${yearRetentionRateDeltaPercentage.toFixed(2)} %`
    : 'N/A';
  const yearRetentionRateDate =
    yearRetentionRateDeltaFormatted === 'N/A' ? 'N/A' : `Since ${prevYear}`;

  // yearly -> overview
  const yearTotalCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalCustomersDate,
    heading: 'Total',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalCustomersDeltaFormatted,
    value: selectedYearTotalCustomers,
    width,
  };

  const yearTotalNewCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalNewCustomersDate,
    heading: 'New Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewCustomersDeltaFormatted,
    value: selectedYearNewCustomers,
    width,
  };

  const yearTotalReturningCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalReturningCustomersDate,
    heading: 'Returning Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalReturningCustomersDeltaFormatted,
    value: selectedYearReturningCustomers,
    width,
  };

  // yearly -> new
  const yearTotalNewSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalNewSalesOnlineCustomersDate,
    heading: 'New Online Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewSalesOnlineCustomersDeltaFormatted,
    value: selectedYearNewSalesOnlineCustomers,
    width,
  };

  const yearTotalNewSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalNewSalesInStoreCustomersDate,
    heading: 'New In-Store Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewSalesInStoreCustomersDeltaFormatted,
    value: selectedYearNewSalesInStoreCustomers,
    width,
  };

  const yearTotalNewRepairCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalNewRepairCustomersDate,
    heading: 'New Repair Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewRepairCustomersDeltaFormatted,
    value: selectedYearNewRepairCustomers,
    width,
  };

  // yearly -> returning
  const yearTotalReturningSalesOnlineCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalReturningSalesOnlineCustomersDate,
    heading: 'Returning Online Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalReturningSalesOnlineCustomersDeltaFormatted,
    value: selectedYearReturningSalesOnlineCustomers,
    width,
  };

  const yearTotalReturningSalesInStoreCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalReturningSalesInStoreCustomersDate,
    heading: 'Returning In-Store Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalReturningSalesInStoreCustomersDeltaFormatted,
    value: selectedYearReturningSalesInStoreCustomers,
    width,
  };

  const yearTotalReturningRepairCustomersCardInfo: DashboardCardInfo = {
    date: yearTotalReturningRepairCustomersDate,
    heading: 'Returning Repair Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalReturningRepairCustomersDeltaFormatted,
    value: selectedYearReturningRepairCustomers,
    width,
  };

  // yearly -> churn rate
  const yearChurnRateCardInfo: DashboardCardInfo = {
    date: yearChurnRateDate,
    heading: 'Churn Rate',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearChurnRateDeltaFormatted,
    value: selectedYearChurnRate,
    width,
  };

  // yearly -> retention rate
  const yearRetentionRateCardInfo: DashboardCardInfo = {
    date: yearRetentionRateDate,
    heading: 'Retention Rate',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearRetentionRateDeltaFormatted,
    value: selectedYearRetentionRate,
    width,
  };

  return {
    dailyCards: {
      dailyOverview: [
        dayTotalCustomersCardInfo,
        dayTotalNewCustomersCardInfo,
        dayTotalReturningCustomersCardInfo,
      ],
      dailyNew: [
        dayTotalNewCustomersCardInfo,
        dayTotalNewSalesOnlineCustomersCardInfo,
        dayTotalNewSalesInStoreCustomersCardInfo,
        dayTotalNewRepairCustomersCardInfo,
      ],
      dailyReturning: [
        dayTotalReturningCustomersCardInfo,
        dayTotalReturningSalesOnlineCustomersCardInfo,
        dayTotalReturningSalesInStoreCustomersCardInfo,
        dayTotalReturningRepairCustomersCardInfo,
      ],
    },
    monthlyCards: {
      monthlyOverview: [
        monthTotalCustomersCardInfo,
        monthTotalNewCustomersCardInfo,
        monthTotalReturningCustomersCardInfo,
      ],
      monthlyNew: [
        monthTotalNewCustomersCardInfo,
        monthTotalNewSalesOnlineCustomersCardInfo,
        monthTotalNewSalesInStoreCustomersCardInfo,
        monthTotalNewRepairCustomersCardInfo,
      ],
      monthlyReturning: [
        monthTotalReturningCustomersCardInfo,
        monthTotalReturningSalesOnlineCustomersCardInfo,
        monthTotalReturningSalesInStoreCustomersCardInfo,
        monthTotalReturningRepairCustomersCardInfo,
      ],
      monthlyChurnRate: [monthChurnRateCardInfo],
      monthlyRetentionRate: [monthRetentionRateCardInfo],
    },
    yearlyCards: {
      yearlyOverview: [
        yearTotalCustomersCardInfo,
        yearTotalNewCustomersCardInfo,
        yearTotalReturningCustomersCardInfo,
      ],
      yearlyNew: [
        yearTotalNewCustomersCardInfo,
        yearTotalNewSalesOnlineCustomersCardInfo,
        yearTotalNewSalesInStoreCustomersCardInfo,
        yearTotalNewRepairCustomersCardInfo,
      ],
      yearlyReturning: [
        yearTotalReturningCustomersCardInfo,
        yearTotalReturningSalesOnlineCustomersCardInfo,
        yearTotalReturningSalesInStoreCustomersCardInfo,
        yearTotalReturningRepairCustomersCardInfo,
      ],
      yearlyChurnRate: [yearChurnRateCardInfo],
      yearlyRetentionRate: [yearRetentionRateCardInfo],
    },
  };
}

export { returnDashboardCard, returnDashboardCustomerCardInfo };
export type { DashboardCardInfo, ReturnDashboardCustomerCardInfoOutput };
