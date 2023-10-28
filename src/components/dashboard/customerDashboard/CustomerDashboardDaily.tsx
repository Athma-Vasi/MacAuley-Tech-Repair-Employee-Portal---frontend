import {
  Card,
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  ReturnDashboardCustomerCardInfoOutput,
  returnDashboardCard,
} from '../jsxHelpers';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../charts';
import {
  ReturnCustomerChartsDataOutput,
  SelectedCustomerMetrics,
  returnCustomerChartsData,
} from './utils';
import { BusinessMetric } from '../types';
import { StoreLocation } from '../../../types';
import CarouselBuilder from '../../carouselBuilder/CarouselBuilder';

function CustomerDashboardDaily({
  businessMetrics,
  dailyCards,
  dailyCharts,
  padding,
  selectedCustomerMetrics,
  storeLocation,
  width,
}: {
  businessMetrics: BusinessMetric[];
  dailyCards: ReturnDashboardCustomerCardInfoOutput['dailyCards'];
  dailyCharts: ReturnCustomerChartsDataOutput['dailyCharts'];
  padding: MantineNumberSize;
  selectedCustomerMetrics: SelectedCustomerMetrics;
  storeLocation: StoreLocation;
  width: number;
}) {
  if (!businessMetrics.length || !Object.keys(selectedCustomerMetrics).length) {
    return null;
  }

  const { dailyNew, dailyOverview, dailyReturning } = dailyCards;
  const componentWidth =
    width < 480 // for iPhone 5/SE
      ? width * 0.93
      : width < 768 // for iPhones 6 - 15
      ? width - 40
      : // at 768vw the navbar appears at width of 225px
      width < 1024
      ? (width - 225) * 0.8
      : // at >= 1200vw the navbar width is 300px
      width < 1200
      ? (width - 225) * 0.8
      : 900 - 40;
  const chartHeight =
    width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  const chartWidth = width < 1024 ? componentWidth : componentWidth * 0.75;
  const cardWidth = chartWidth / 2;

  // OVERVIEW SECTION
  const overviewHeading = <Title order={4}>Daily Overview</Title>;
  const createdOverviewCards = dailyOverview.map((overviewCard, idx) => (
    <Group
      key={`${idx}-${overviewCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(overviewCard)}
    </Group>
  ));
  const displayOverviewCards = <Stack>{createdOverviewCards}</Stack>;

  const overviewPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">SELECTED DATE overview</Text>
    </Group>
  );
  const displayOverviewPieChart = (
    <Card shadow="sm" radius="md" withBorder w={chartWidth}>
      <Card.Section>
        <ResponsivePieChart
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          pieChartData={dailyCharts.overview.pieChartData}
          hideControls
        />
      </Card.Section>
    </Card>
  );
  const displayCardsAndPieChart = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayOverviewCards}
      <Stack>
        {overviewPieChartHeading}
        {displayOverviewPieChart}
      </Stack>
    </Group>
  );

  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.overview.barChartMap.get('Overview') ?? []}
      hideControls
      indexBy="Days"
      keys={['New', 'Returning']}
    />
  );

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.overview.lineChartMap.get('Overview') ?? []}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayOverviewCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayOverviewBarChart, displayOverviewLineChart]}
      headings={['Overview Days Bar Chart', 'Overview Days Line Chart']}
    />
  );

  const displayDailyOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.overview.calendarChartMap.get('Overview') ?? []
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from="2023-10-01"
      to="2023-10-27"
      hideControls
    />
  );

  const displayOverviewSection = (
    <Stack w="100%">
      {overviewHeading}
      {displayCardsAndPieChart}
      {displayOverviewCarousel}
      {displayDailyOverviewCalendarChart}
    </Stack>
  );

  // NEW SECTION
  const newHeading = <Title order={4}>Daily New</Title>;
  const createdNewCards = dailyNew.map((newCard, idx) => (
    <Group
      key={`${idx}-${newCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(newCard)}
    </Group>
  ));
  const displayNewCards = <Stack>{createdNewCards}</Stack>;

  const newPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">SELECTED DATE new</Text>
    </Group>
  );
  const displayNewPieChart = (
    <Card shadow="sm" radius="md" withBorder w={chartWidth}>
      <Card.Section>
        <ResponsivePieChart
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          pieChartData={dailyCharts.new.pieChartData}
          hideControls
        />
      </Card.Section>
    </Card>
  );

  const displayCardsAndPieChartNew = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayNewCards}
      <Stack>
        {newPieChartHeading}
        {displayNewPieChart}
      </Stack>
    </Group>
  );

  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.new.barChartMap.get('Overview') ?? []}
      hideControls
      indexBy="Days"
      keys={['New Online', 'New In-Store', 'New Repair']}
    />
  );

  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.new.lineChartMap.get('Overview') ?? []}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayNewCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayNewBarChart, displayNewLineChart]}
      headings={['New Customers Bar Chart', 'New Customers Line Chart']}
    />
  );

  const displayNewSection = (
    <Stack w="100%">
      {newHeading}
      {displayCardsAndPieChartNew}
      {displayNewCarousel}
    </Stack>
  );

  // RETURNING SECTION
  const returningHeading = <Title order={4}>Daily Returning</Title>;
  const createdReturningCards = dailyReturning.map((returningCard, idx) => (
    <Group
      key={`${idx}-${returningCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(returningCard)}
    </Group>
  ));
  const displayReturningCards = <Stack>{createdReturningCards}</Stack>;

  const returningPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">SELECTED DATE returning</Text>
    </Group>
  );
  const displayReturningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyCharts.returning.pieChartData}
      hideControls
    />
  );
  const displayCardsAndPieChartReturning = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayReturningCards}
      <Stack>
        {returningPieChartHeading}
        {displayReturningPieChart}
      </Stack>
    </Group>
  );

  const displayReturningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.returning.barChartMap.get('Overview') ?? []}
      hideControls
      indexBy="Days"
      keys={['Returning Online', 'Returning In-Store', 'Returning Repair']}
    />
  );

  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.returning.lineChartMap.get('Overview') ?? []}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayReturningCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayReturningBarChart, displayReturningLineChart]}
      headings={[
        'Returning Customers Bar Chart',
        'Returning Customers Line Chart',
      ]}
    />
  );

  const displayReturningSection = (
    <Stack w="100%">
      {returningHeading}
      {displayCardsAndPieChartReturning}
      {displayReturningCarousel}
    </Stack>
  );

  const displayCustomerDashboardDaily = (
    <Stack w="100%">
      {displayOverviewSection}
      {displayNewSection}
      {displayReturningSection}
    </Stack>
  );

  return displayCustomerDashboardDaily;
}

export default CustomerDashboardDaily;
