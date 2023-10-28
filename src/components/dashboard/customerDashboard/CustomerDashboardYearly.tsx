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
import { StoreLocation } from '../../../types';
import { BusinessMetric } from '../types';
import {
  ReturnCustomerChartsDataOutput,
  SelectedCustomerMetrics,
} from './utils';
import {
  ResponsiveBarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../charts';
import CarouselBuilder from '../../carouselBuilder/CarouselBuilder';

function CustomerDashboardYearly({
  businessMetrics,
  padding,
  selectedCustomerMetrics,
  storeLocation,
  width,
  yearlyCards,
  yearlyCharts,
}: {
  businessMetrics: BusinessMetric[];
  yearlyCards: ReturnDashboardCustomerCardInfoOutput['yearlyCards'];
  yearlyCharts: ReturnCustomerChartsDataOutput['yearlyCharts'];
  padding: MantineNumberSize;
  selectedCustomerMetrics: SelectedCustomerMetrics;
  storeLocation: StoreLocation;
  width: number;
}) {
  if (!businessMetrics.length || !Object.keys(selectedCustomerMetrics).length) {
    return null;
  }

  /**
   * const {
    monthlyChurnRate,
    monthlyNew,
    monthlyOverview,
    monthlyRetentionRate,
    monthlyReturning,
  } = monthlyCards;

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
  const overviewHeading = <Title order={4}>Monthly Overview</Title>;
  const createdOverviewCards = monthlyOverview.map((overviewCard, idx) => (
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
          pieChartData={monthlyCharts.overview.pieChartData}
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
      barChartData={monthlyCharts.overview.barChartData}
      hideControls
      indexBy="Months"
      keys={['New', 'Returning']}
    />
  );

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.overview.lineChartData}
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayOverviewCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayOverviewBarChart, displayOverviewLineChart]}
      headings={['Overview Months Bar Chart', 'Overview Months Line Chart']}
    />
  );

  const displayOverviewSection = (
    <Stack w="100%">
      {overviewHeading}
      {displayCardsAndPieChart}
      {displayOverviewCarousel}
    </Stack>
  );

  // NEW SECTION
  const newHeading = <Title order={4}>Monthly New</Title>;
  const createdNewCards = monthlyNew.map((newCard, idx) => (
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
          pieChartData={monthlyCharts.new.pieChartData}
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
      barChartData={monthlyCharts.new.barChartData}
      hideControls
      indexBy="Months"
      keys={['New Online', 'New In-Store', 'New Repair']}
    />
  );

  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.new.lineChartData}
      hideControls
      xFormat={(x) => `Month - ${x}`}
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
  const returningHeading = <Title order={4}>Monthly Returning</Title>;
  const createdReturningCards = monthlyReturning.map((returningCard, idx) => (
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
      pieChartData={monthlyCharts.returning.pieChartData}
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
      barChartData={monthlyCharts.returning.barChartData}
      hideControls
      indexBy="Months"
      keys={['Returning Online', 'Returning In-Store', 'Returning Repair']}
    />
  );

  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.returning.lineChartData}
      hideControls
      xFormat={(x) => `Month - ${x}`}
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

  // CHURN RETENTION SECTION
  const churnRetentionHeading = (
    <Title order={4}>Monthly Churn & Retention</Title>
  );
  const createdChurnCards = monthlyChurnRate.map((churnCard, idx) => (
    <Group
      key={`${idx}-${churnCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(churnCard)}
    </Group>
  ));
  const createdRetentionCards = monthlyRetentionRate.map(
    (retentionCard, idx) => (
      <Group
        key={`${idx}-${retentionCard.value}`}
        w={cardWidth}
        style={{ outline: '1px solid brown' }}
      >
        {returnDashboardCard(retentionCard)}
      </Group>
    )
  );
  const displayChurnRetentionCards = (
    <Stack>
      {createdChurnCards}
      {createdRetentionCards}
    </Stack>
  );

  const churnRetentionPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">SELECTED DATE churn & retention</Text>
    </Group>
  );
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyCharts.churnRetention.pieChartData}
      hideControls
    />
  );

  const displayCardsAndPieChartChurnRetention = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayChurnRetentionCards}
      <Stack>
        {churnRetentionPieChartHeading}
        {displayChurnRetentionPieChart}
      </Stack>
    </Group>
  );

  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyCharts.churnRetention.barChartData}
      hideControls
      indexBy="Months"
      keys={['Churn Rate', 'Retention Rate']}
    />
  );

  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.churnRetention.lineChartData}
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayChurnRetentionCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayChurnRetentionBarChart, displayChurnRetentionLineChart]}
      headings={['Churn & Retention Bar Chart', 'Churn & Retention Line Chart']}
    />
  );

  const displayChurnRetentionSection = (
    <Stack w="100%">
      {churnRetentionHeading}
      {displayCardsAndPieChartChurnRetention}
      {displayChurnRetentionCarousel}
    </Stack>
  );

  const displayCustomerDashboardMonthly = (
    <Stack w="100%">
      {displayOverviewSection}
      {displayNewSection}
      {displayReturningSection}
      {displayChurnRetentionSection}
    </Stack>
  );
   */

  const {
    yearlyChurnRate,
    yearlyNew,
    yearlyOverview,
    yearlyRetentionRate,
    yearlyReturning,
  } = yearlyCards;

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
  const overviewHeading = <Title order={4}>Yearly Overview</Title>;
  const createdOverviewCards = yearlyOverview.map((overviewCard, idx) => (
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
          pieChartData={yearlyCharts.overview.pieChartData}
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
      barChartData={yearlyCharts.overview.barChartData}
      hideControls
      indexBy="Years"
      keys={['New', 'Returning']}
    />
  );

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.overview.lineChartData}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayOverviewCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayOverviewBarChart, displayOverviewLineChart]}
      headings={['Overview Years Bar Chart', 'Overview Years Line Chart']}
    />
  );

  const displayOverviewSection = (
    <Stack w="100%">
      {overviewHeading}
      {displayCardsAndPieChart}
      {displayOverviewCarousel}
    </Stack>
  );

  // NEW SECTION
  const newHeading = <Title order={4}>Yearly New</Title>;
  const createdNewCards = yearlyNew.map((newCard, idx) => (
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
          pieChartData={yearlyCharts.new.pieChartData}
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
      barChartData={yearlyCharts.new.barChartData}
      hideControls
      indexBy="Years"
      keys={['New Online', 'New In-Store', 'New Repair']}
    />
  );

  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.new.lineChartData}
      hideControls
      xFormat={(x) => `Year - ${x}`}
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
  const returningHeading = <Title order={4}>Yearly Returning</Title>;
  const createdReturningCards = yearlyReturning.map((returningCard, idx) => (
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
      pieChartData={yearlyCharts.returning.pieChartData}
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
      barChartData={yearlyCharts.returning.barChartData}
      hideControls
      indexBy="Years"
      keys={['Returning Online', 'Returning In-Store', 'Returning Repair']}
    />
  );

  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.returning.lineChartData}
      hideControls
      xFormat={(x) => `Year - ${x}`}
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

  // CHURN RETENTION SECTION
  const churnRetentionHeading = (
    <Title order={4}>Yearly Churn & Retention</Title>
  );
  const createdChurnCards = yearlyChurnRate.map((churnCard, idx) => (
    <Group
      key={`${idx}-${churnCard.value}`}
      w={cardWidth}
      style={{ outline: '1px solid brown' }}
    >
      {returnDashboardCard(churnCard)}
    </Group>
  ));
  const createdRetentionCards = yearlyRetentionRate.map(
    (retentionCard, idx) => (
      <Group
        key={`${idx}-${retentionCard.value}`}
        w={cardWidth}
        style={{ outline: '1px solid brown' }}
      >
        {returnDashboardCard(retentionCard)}
      </Group>
    )
  );
  const displayChurnRetentionCards = (
    <Stack>
      {createdChurnCards}
      {createdRetentionCards}
    </Stack>
  );

  const churnRetentionPieChartHeading = (
    <Group w="100%" position="center">
      <Text size="lg">SELECTED DATE churn & retention</Text>
    </Group>
  );
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.churnRetention.pieChartData}
      hideControls
    />
  );

  const displayCardsAndPieChartChurnRetention = (
    <Group w="100%" style={{ outline: '1px solid blue' }} align="center">
      {displayChurnRetentionCards}
      <Stack>
        {churnRetentionPieChartHeading}
        {displayChurnRetentionPieChart}
      </Stack>
    </Group>
  );

  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyCharts.churnRetention.barChartData}
      hideControls
      indexBy="Years"
      keys={['Churn Rate', 'Retention Rate']}
    />
  );

  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.churnRetention.lineChartData}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  const displayChurnRetentionCarousel = (
    <CarouselBuilder
      slideDimensions={{ width: chartWidth, height: chartHeight }}
      slides={[displayChurnRetentionBarChart, displayChurnRetentionLineChart]}
      headings={['Churn & Retention Bar Chart', 'Churn & Retention Line Chart']}
    />
  );

  const displayChurnRetentionSection = (
    <Stack w="100%">
      {churnRetentionHeading}
      {displayCardsAndPieChartChurnRetention}
      {displayChurnRetentionCarousel}
    </Stack>
  );

  const displayCustomerDashboardYearly = (
    <Stack w="100%">
      {displayOverviewSection}
      {displayNewSection}
      {displayReturningSection}
      {displayChurnRetentionSection}
    </Stack>
  );

  return displayCustomerDashboardYearly;
}

export default CustomerDashboardYearly;
