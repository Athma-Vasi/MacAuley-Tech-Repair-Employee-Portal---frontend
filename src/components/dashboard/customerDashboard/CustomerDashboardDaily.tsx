import {
  Card,
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';

import { StoreLocation } from '../../../types';
import CarouselBuilder from '../../carouselBuilder/CarouselBuilder';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../charts';
import {
  returnDashboardCard,
  ReturnDashboardCustomerCardInfoOutput,
} from '../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  Month,
  Year,
} from '../types';
import { YAxisCustomerChartSelection } from './types';
import {
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
} from './utils';
import { AccessibleSelectInputCreatorInfo } from '../../wrappers';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../jsxCreators';
import { OVERVIEW_Y_AXIS_DATA } from './constants';
import { TbArrowUpRight } from 'react-icons/tb';
import DashboardSection from '../DashboardSection';
import { BiExpandAlt } from 'react-icons/bi';
import { LuExpand } from 'react-icons/lu';

function CustomerDashboardDaily({
  borderColor,
  businessMetrics,
  dailyCards,
  dailyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  dailyCards: ReturnDashboardCustomerCardInfoOutput['dailyCards'];
  dailyCharts: ReturnCustomerChartsDataOutput['dailyCharts'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: string;
}) {
  const [yAxisKey, setYAxisKey] = useState<YAxisCustomerChartSelection>({
    newYAxis: 'Overview',
    overviewYAxis: 'Overview',
    returningYAxis: 'Overview',
  });

  if (!businessMetrics.length) {
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

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  // overview section

  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyCharts.overview.pieChartData}
      hideControls
    />
  );

  const [createdOverviewYAxisSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis',
        description: 'Select the Y Axis for the Overview Charts',
        onChange: (event) => {
          setYAxisKey((prev) => ({
            ...prev,
            overviewYAxis: event.currentTarget
              .value as YAxisCustomerChartSelection['overviewYAxis'],
          }));
        },
      },
    ]
  );

  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        dailyCharts.overview.barChartMap.get(yAxisKey.overviewYAxis) ?? []
      }
      hideControls
      indexBy="Days"
      keys={OVERVIEW_Y_AXIS_DATA}
    />
  );

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyCharts.overview.lineChartMap.get(yAxisKey.overviewYAxis) ?? []
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.overview.calendarChartMap.get(yAxisKey.overviewYAxis) ?? []
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayOverviewCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[
        displayOverviewBarChart,
        displayOverviewLineChart,
        displayOverviewCalendarChart,
      ]}
      headings={[
        'Overview Bar Chart',
        'Overview Line Chart',
        'Overview Calendar Chart',
      ]}
    />
  );

  const displayOverviewCarouselWithHeading = (
    <Group w="100%" spacing={padding}>
      <Stack>
        {createdOverviewYAxisSelectInput}
        {createdExpandChartButton}
      </Stack>
      {displayOverviewCarousel}
    </Group>
  );

  const displayOverviewSection = (
    <DashboardSection
      chartCarousel={displayOverviewCarouselWithHeading}
      heading="Daily Overview"
      overviewCards={dailyOverview}
      pieChart={displayOverviewPieChart}
      pieChartHeading=""
      width={width}
    />
  );

  // new section
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

  // returning section
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
