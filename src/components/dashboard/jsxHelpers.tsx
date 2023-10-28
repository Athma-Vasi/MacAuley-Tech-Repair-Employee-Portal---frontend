import { Card, Group, MantineNumberSize, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { MdCalendarMonth, MdDateRange } from 'react-icons/md';
import { RiCalendarLine } from 'react-icons/ri';
import { SelectedCustomerMetrics } from './customerDashboard/utils';

type DashboardCardInfo = {
  date?: string;
  heading?: string;
  icon: ReactNode;
  padding?: MantineNumberSize;
  percentage?: string;
  sign?: string;
  value?: number;
  width: number;
};
function returnDashboardCard({
  date,
  heading,
  icon,
  padding,
  percentage,
  sign,
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
      {sign} {percentage} %
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
  customerMetrics: SelectedCustomerMetrics;
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
  const { dayCustomerMetrics } = customerMetrics;

  // overview
  // daily total customers
  const selectedDayTotalCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.total ?? 1;
  const prevDayTotalCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.total ?? 1;
  const dayTotalCustomersDeltaPercentage =
    ((selectedDayTotalCustomers - prevDayTotalCustomers) /
      prevDayTotalCustomers) *
    100;

  // daily total new customers
  const selectedDayNewCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.total ?? 1;
  const prevDayNewCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.total ?? 1;
  const dayTotalNewCustomersDeltaPercentage =
    ((selectedDayNewCustomers - prevDayNewCustomers) / prevDayNewCustomers) *
    100;

  // daily total returning customers
  const selectedDayReturningCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.total ?? 1;
  const prevDayReturningCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.total ?? 1;
  const dayTotalReturningCustomersDeltaPercentage =
    ((selectedDayReturningCustomers - prevDayReturningCustomers) /
      prevDayReturningCustomers) *
    100;

  // new
  // daily new total online customers
  const selectedDayNewSalesOnlineCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.online ?? 1;
  const prevDayNewSalesOnlineCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.sales.online ?? 1;
  const dayTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedDayNewSalesOnlineCustomers - prevDayNewSalesOnlineCustomers) /
      prevDayNewSalesOnlineCustomers) *
    100;

  // daily new total in-store customers
  const selectedDayNewSalesInStoreCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.sales.inStore ?? 1;
  const prevDayNewSalesInStoreCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.sales.inStore ?? 1;
  const dayTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedDayNewSalesInStoreCustomers - prevDayNewSalesInStoreCustomers) /
      prevDayNewSalesInStoreCustomers) *
    100;

  // daily new total repair customers
  const selectedDayNewRepairCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.new.repair ?? 1;
  const prevDayNewRepairCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.new.repair ?? 1;
  const dayTotalNewRepairCustomersDeltaPercentage =
    ((selectedDayNewRepairCustomers - prevDayNewRepairCustomers) /
      prevDayNewRepairCustomers) *
    100;

  // returning
  // daily returning total online customers
  const selectedDayReturningSalesOnlineCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales.online ??
    1;
  const prevDayReturningSalesOnlineCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.sales.online ?? 1;
  const dayTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedDayReturningSalesOnlineCustomers -
      prevDayReturningSalesOnlineCustomers) /
      prevDayReturningSalesOnlineCustomers) *
    100;

  // daily returning total in-store customers
  const selectedDayReturningSalesInStoreCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.sales.inStore ??
    1;
  const prevDayReturningSalesInStoreCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.sales.inStore ?? 1;
  const dayTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedDayReturningSalesInStoreCustomers -
      prevDayReturningSalesInStoreCustomers) /
      prevDayReturningSalesInStoreCustomers) *
    100;

  // daily returning total repair customers
  const selectedDayReturningRepairCustomers =
    dayCustomerMetrics?.selectedDayMetrics?.customers.returning.repair ?? 1;
  const prevDayReturningRepairCustomers =
    dayCustomerMetrics?.prevDayMetrics?.customers.returning.repair ?? 1;
  const dayTotalReturningRepairCustomersDeltaPercentage =
    ((selectedDayReturningRepairCustomers - prevDayReturningRepairCustomers) /
      prevDayReturningRepairCustomers) *
    100;

  // daily overview
  const dayTotalCustomersCardInfo = {
    date: 'Today',
    heading: 'Total',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayTotalCustomers,
    width,
  };

  const dayTotalNewCustomersCardInfo = {
    date: 'Today',
    heading: 'New Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalNewCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayNewCustomers,
    width,
  };

  const dayTotalReturningCustomersCardInfo = {
    date: 'Today',
    heading: 'Returning Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalReturningCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayReturningCustomers,
    width,
  };

  // daily new
  const dayTotalNewSalesOnlineCustomersCardInfo = {
    date: 'Today',
    heading: 'New Online Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayNewSalesOnlineCustomers,
    width,
  };

  const dayTotalNewSalesInStoreCustomersCardInfo = {
    date: 'Today',
    heading: 'New In-Store Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayNewSalesInStoreCustomers,
    width,
  };

  const dayTotalNewRepairCustomersCardInfo = {
    date: 'Today',
    heading: 'New Repair Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalNewRepairCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayNewRepairCustomers,
    width,
  };

  // daily returning
  const dayTotalReturningSalesOnlineCustomersCardInfo = {
    date: 'Today',
    heading: 'Returning Online Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayReturningSalesOnlineCustomers,
    width,
  };

  const dayTotalReturningSalesInStoreCustomersCardInfo = {
    date: 'Today',
    heading: 'Returning In-Store Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage:
      dayTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayReturningSalesInStoreCustomers,
    width,
  };

  const dayTotalReturningRepairCustomersCardInfo = {
    date: 'Today',
    heading: 'Returning Repair Customers',
    icon: <MdDateRange size={20} />,
    padding,
    percentage: dayTotalReturningRepairCustomersDeltaPercentage.toFixed(2),
    sign: dayTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedDayReturningRepairCustomers,
    width,
  };

  // month customer metrics data
  const { monthCustomerMetrics } = customerMetrics;

  // overview
  // monthly total customers
  const selectedMonthTotalCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.total ?? 1;
  const prevMonthTotalCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.total ?? 1;
  const monthTotalCustomersDeltaPercentage =
    ((selectedMonthTotalCustomers - prevMonthTotalCustomers) /
      prevMonthTotalCustomers) *
    100;

  // monthly total new customers
  const selectedMonthNewCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.total ?? 1;
  const prevMonthNewCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.total ?? 1;
  const monthTotalNewCustomersDeltaPercentage =
    ((selectedMonthNewCustomers - prevMonthNewCustomers) /
      prevMonthNewCustomers) *
    100;

  // monthly total returning customers
  const selectedMonthReturningCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.total ?? 1;
  const prevMonthReturningCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.total ?? 1;
  const monthTotalReturningCustomersDeltaPercentage =
    ((selectedMonthReturningCustomers - prevMonthReturningCustomers) /
      prevMonthReturningCustomers) *
    100;

  // new
  // monthly new total online customers
  const selectedMonthNewSalesOnlineCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales.online ?? 1;
  const prevMonthNewSalesOnlineCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.sales.online ?? 1;
  const monthTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedMonthNewSalesOnlineCustomers - prevMonthNewSalesOnlineCustomers) /
      prevMonthNewSalesOnlineCustomers) *
    100;

  // monthly new total in-store customers
  const selectedMonthNewSalesInStoreCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.sales.inStore ??
    1;
  const prevMonthNewSalesInStoreCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.sales.inStore ?? 1;
  const monthTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedMonthNewSalesInStoreCustomers -
      prevMonthNewSalesInStoreCustomers) /
      prevMonthNewSalesInStoreCustomers) *
    100;

  // monthly new total repair customers
  const selectedMonthNewRepairCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.new.repair ?? 1;
  const prevMonthNewRepairCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.new.repair ?? 1;
  const monthTotalNewRepairCustomersDeltaPercentage =
    ((selectedMonthNewRepairCustomers - prevMonthNewRepairCustomers) /
      prevMonthNewRepairCustomers) *
    100;

  // returning
  // monthly returning total online customers
  const selectedMonthReturningSalesOnlineCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
      .online ?? 1;
  const prevMonthReturningSalesOnlineCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.sales.online ??
    1;
  const monthTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedMonthReturningSalesOnlineCustomers -
      prevMonthReturningSalesOnlineCustomers) /
      prevMonthReturningSalesOnlineCustomers) *
    100;

  // monthly returning total in-store customers
  const selectedMonthReturningSalesInStoreCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.sales
      .inStore ?? 1;
  const prevMonthReturningSalesInStoreCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.sales.inStore ??
    1;
  const monthTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedMonthReturningSalesInStoreCustomers -
      prevMonthReturningSalesInStoreCustomers) /
      prevMonthReturningSalesInStoreCustomers) *
    100;

  // monthly returning total repair customers
  const selectedMonthReturningRepairCustomers =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.returning.repair ?? 1;
  const prevMonthReturningRepairCustomers =
    monthCustomerMetrics?.prevMonthMetrics?.customers.returning.repair ?? 1;
  const monthTotalReturningRepairCustomersDeltaPercentage =
    ((selectedMonthReturningRepairCustomers -
      prevMonthReturningRepairCustomers) /
      prevMonthReturningRepairCustomers) *
    100;

  // monthly churn rate
  const selectedMonthChurnRate =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.churnRate ?? 1;
  const prevMonthChurnRate =
    monthCustomerMetrics?.prevMonthMetrics?.customers.churnRate ?? 1;
  const monthChurnRateDeltaPercentage =
    ((selectedMonthChurnRate - prevMonthChurnRate) / prevMonthChurnRate) * 100;

  // monthly retention rate
  const selectedMonthRetentionRate =
    monthCustomerMetrics?.selectedMonthMetrics?.customers.retentionRate ?? 1;
  const prevMonthRetentionRate =
    monthCustomerMetrics?.prevMonthMetrics?.customers.retentionRate ?? 1;
  const monthRetentionRateDeltaPercentage =
    ((selectedMonthRetentionRate - prevMonthRetentionRate) /
      prevMonthRetentionRate) *
    100;

  // monthly overview
  const monthTotalCustomersCardInfo = {
    date: 'This Month',
    heading: 'Total',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthTotalCustomers,
    width,
  };

  const monthTotalNewCustomersCardInfo = {
    date: 'This Month',
    heading: 'New Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalNewCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthNewCustomers,
    width,
  };

  const monthTotalReturningCustomersCardInfo = {
    date: 'This Month',
    heading: 'Returning Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalReturningCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalReturningCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthReturningCustomers,
    width,
  };

  // monthly new
  const monthTotalNewSalesOnlineCustomersCardInfo = {
    date: 'This Month',
    heading: 'New Online Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthNewSalesOnlineCustomers,
    width,
  };

  const monthTotalNewSalesInStoreCustomersCardInfo = {
    date: 'This Month',
    heading: 'New In-Store Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthNewSalesInStoreCustomers,
    width,
  };

  const monthTotalNewRepairCustomersCardInfo = {
    date: 'This Month',
    heading: 'New Repair Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthTotalNewRepairCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthNewRepairCustomers,
    width,
  };

  // monthly returning
  const monthTotalReturningSalesOnlineCustomersCardInfo = {
    date: 'This Month',
    heading: 'Returning Online Customers',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage:
      monthTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthReturningSalesOnlineCustomers,
    width,
  };

  const monthTotalReturningSalesInStoreCustomersCardInfo = {
    date: 'This Month',
    heading: 'Returning In-Store Customers',
    icon: <MdCalendarMonth size={20} />,
    padding: monthTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2),
    percentage:
      monthTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign:
      monthTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthReturningSalesInStoreCustomers,
    width,
  };

  const monthTotalReturningRepairCustomersCardInfo = {
    date: 'This Month',
    heading: 'Returning Repair Customers',
    icon: <MdCalendarMonth size={20} />,
    padding: monthTotalReturningRepairCustomersDeltaPercentage.toFixed(2),
    percentage: monthTotalReturningRepairCustomersDeltaPercentage.toFixed(2),
    sign: monthTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthReturningRepairCustomers,
    width,
  };

  // monthly churn rate
  const monthChurnRateCardInfo = {
    date: 'This Month',
    heading: 'Monthly Churn Rate',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthChurnRateDeltaPercentage.toFixed(2),
    sign: monthChurnRateDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthChurnRate,
    width,
  };

  // monthly retention rate
  const monthRetentionRateCardInfo = {
    date: 'This Month',
    heading: 'Monthly Retention Rate',
    icon: <MdCalendarMonth size={20} />,
    padding,
    percentage: monthRetentionRateDeltaPercentage.toFixed(2),
    sign: monthRetentionRateDeltaPercentage > 0 ? '+' : '',
    value: selectedMonthRetentionRate,
    width,
  };

  // year customer metrics data
  const { yearCustomerMetrics } = customerMetrics;

  // yearly overview
  // yearly total customers
  const selectedYearTotalCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.total ?? 1;
  const prevYearTotalCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.total ?? 1;
  const yearTotalCustomersDeltaPercentage =
    ((selectedYearTotalCustomers - prevYearTotalCustomers) /
      prevYearTotalCustomers) *
    100;

  // yearly total new customers
  const selectedYearNewCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.total ?? 1;
  const prevYearNewCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.total ?? 1;
  const yearTotalNewCustomersDeltaPercentage =
    ((selectedYearNewCustomers - prevYearNewCustomers) / prevYearNewCustomers) *
    100;

  // yearly total returning customers
  const selectedYearReturningCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.total ?? 1;
  const prevYearReturningCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.total ?? 1;
  const yearTotalReturningCustomersDeltaPercentage =
    ((selectedYearReturningCustomers - prevYearReturningCustomers) /
      prevYearReturningCustomers) *
    100;

  // yearly new
  // yearly new total online customers
  const selectedYearNewSalesOnlineCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.online ?? 1;
  const prevYearNewSalesOnlineCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.sales.online ?? 1;
  const yearTotalNewSalesOnlineCustomersDeltaPercentage =
    ((selectedYearNewSalesOnlineCustomers - prevYearNewSalesOnlineCustomers) /
      prevYearNewSalesOnlineCustomers) *
    100;

  // yearly new total in-store customers
  const selectedYearNewSalesInStoreCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.sales.inStore ?? 1;
  const prevYearNewSalesInStoreCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.sales.inStore ?? 1;
  const yearTotalNewSalesInStoreCustomersDeltaPercentage =
    ((selectedYearNewSalesInStoreCustomers - prevYearNewSalesInStoreCustomers) /
      prevYearNewSalesInStoreCustomers) *
    100;

  // yearly new total repair customers
  const selectedYearNewRepairCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.new.repair ?? 1;
  const prevYearNewRepairCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.new.repair ?? 1;
  const yearTotalNewRepairCustomersDeltaPercentage =
    ((selectedYearNewRepairCustomers - prevYearNewRepairCustomers) /
      prevYearNewRepairCustomers) *
    100;

  // yearly returning
  // yearly returning total online customers
  const selectedYearReturningSalesOnlineCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
      .online ?? 1;
  const prevYearReturningSalesOnlineCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.sales.online ?? 1;
  const yearTotalReturningSalesOnlineCustomersDeltaPercentage =
    ((selectedYearReturningSalesOnlineCustomers -
      prevYearReturningSalesOnlineCustomers) /
      prevYearReturningSalesOnlineCustomers) *
    100;

  // yearly returning total in-store customers
  const selectedYearReturningSalesInStoreCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.sales
      .inStore ?? 1;
  const prevYearReturningSalesInStoreCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.sales.inStore ??
    1;
  const yearTotalReturningSalesInStoreCustomersDeltaPercentage =
    ((selectedYearReturningSalesInStoreCustomers -
      prevYearReturningSalesInStoreCustomers) /
      prevYearReturningSalesInStoreCustomers) *
    100;

  // yearly returning total repair customers
  const selectedYearReturningRepairCustomers =
    yearCustomerMetrics?.selectedYearMetrics?.customers.returning.repair ?? 1;
  const prevYearReturningRepairCustomers =
    yearCustomerMetrics?.prevYearMetrics?.customers.returning.repair ?? 1;
  const yearTotalReturningRepairCustomersDeltaPercentage =
    ((selectedYearReturningRepairCustomers - prevYearReturningRepairCustomers) /
      prevYearReturningRepairCustomers) *
    100;

  // yearly churn rate
  const selectedYearChurnRate =
    yearCustomerMetrics?.selectedYearMetrics?.customers.churnRate ?? 1;
  const prevYearChurnRate =
    yearCustomerMetrics?.prevYearMetrics?.customers.churnRate ?? 1;
  const yearChurnRateDeltaPercentage =
    ((selectedYearChurnRate - prevYearChurnRate) / prevYearChurnRate) * 100;

  // yearly retention rate
  const selectedYearRetentionRate =
    yearCustomerMetrics?.selectedYearMetrics?.customers.retentionRate ?? 1;
  const prevYearRetentionRate =
    yearCustomerMetrics?.prevYearMetrics?.customers.retentionRate ?? 1;
  const yearRetentionRateDeltaPercentage =
    ((selectedYearRetentionRate - prevYearRetentionRate) /
      prevYearRetentionRate) *
    100;

  // yearly overview
  const yearTotalCustomersCardInfo = {
    date: 'This Year',
    heading: 'Total',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearTotalCustomers,
    width,
  };

  const yearTotalNewCustomersCardInfo = {
    date: 'This Year',
    heading: 'New Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalNewCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearNewCustomers,
    width,
  };

  const yearTotalReturningCustomersCardInfo = {
    date: 'This Year',
    heading: 'Returning Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalReturningCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalReturningCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearReturningCustomers,
    width,
  };

  // yearly new
  const yearTotalNewSalesOnlineCustomersCardInfo = {
    date: 'This Year',
    heading: 'New Online Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalNewSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearNewSalesOnlineCustomers,
    width,
  };

  const yearTotalNewSalesInStoreCustomersCardInfo = {
    date: 'This Year',
    heading: 'New In-Store Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalNewSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearNewSalesInStoreCustomers,
    width,
  };

  const yearTotalNewRepairCustomersCardInfo = {
    date: 'This Year',
    heading: 'New Repair Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearTotalNewRepairCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalNewRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearNewRepairCustomers,
    width,
  };

  // yearly returning
  const yearTotalReturningSalesOnlineCustomersCardInfo = {
    date: 'This Year',
    heading: 'Returning Online Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage:
      yearTotalReturningSalesOnlineCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalReturningSalesOnlineCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearReturningSalesOnlineCustomers,
    width,
  };

  const yearTotalReturningSalesInStoreCustomersCardInfo = {
    date: 'This Year',
    heading: 'Returning In-Store Customers',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage:
      yearTotalReturningSalesInStoreCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalReturningSalesInStoreCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearReturningSalesInStoreCustomers,
    width,
  };

  const yearTotalReturningRepairCustomersCardInfo = {
    date: 'This Year',
    heading: 'Returning Repair Customers',
    icon: <RiCalendarLine size={20} />,
    padding: yearTotalReturningRepairCustomersDeltaPercentage.toFixed(2),
    percentage: yearTotalReturningRepairCustomersDeltaPercentage.toFixed(2),
    sign: yearTotalReturningRepairCustomersDeltaPercentage > 0 ? '+' : '',
    value: selectedYearReturningRepairCustomers,
    width,
  };

  // yearly churn rate
  const yearChurnRateCardInfo = {
    date: 'This Year',
    heading: 'Yearly Churn Rate',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearChurnRateDeltaPercentage.toFixed(2),
    sign: yearChurnRateDeltaPercentage > 0 ? '+' : '',
    value: selectedYearChurnRate,
    width,
  };

  // yearly retention rate
  const yearRetentionRateCardInfo = {
    date: 'This Year',
    heading: 'Yearly Retention Rate',
    icon: <RiCalendarLine size={20} />,
    padding,
    percentage: yearRetentionRateDeltaPercentage.toFixed(2),
    sign: yearRetentionRateDeltaPercentage > 0 ? '+' : '',
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
