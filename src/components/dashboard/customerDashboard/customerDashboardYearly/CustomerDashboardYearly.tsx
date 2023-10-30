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
} from '../../jsxHelpers';
import { StoreLocation } from '../../../../types';
import { BusinessMetric, BusinessMetricStoreLocation } from '../../types';
import {
  CustomerChurnRetentionMapKey,
  CustomerNewMapKey,
  CustomerOverviewMapKey,
  CustomerReturningMapKey,
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
} from '../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import CarouselBuilder from '../../../carouselBuilder/CarouselBuilder';
import DashboardSection from '../../DashboardSection';
import { ChangeEvent, useReducer } from 'react';
import {
  customerDashboardYearlyAction,
  customerDashboardYearlyReducer,
  initialCustomerDashboardYearlyState,
} from './state';
import { LuExpand } from 'react-icons/lu';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { MONTHS } from '../../constants';
import {
  OVERVIEW_Y_AXIS_DATA,
  NEW_Y_AXIS_DATA,
  RETURNING_Y_AXIS_DATA,
  CHURN_RETENTION_Y_AXIS_DATA,
} from '../constants';

function CustomerDashboardYearly({
  borderColor,
  businessMetrics,
  yearlyCards,
  yearlyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  yearlyCards: ReturnDashboardCustomerCardInfoOutput['yearlyCards'];
  yearlyCharts: ReturnCustomerChartsDataOutput['yearlyCharts'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: string;
}) {
  const [customerDashboardYearlyState, customerDashboardYearlyDispatch] =
    useReducer(
      customerDashboardYearlyReducer,
      initialCustomerDashboardYearlyState
    );

  const {
    newYAxisSelection,
    overviewYAxisSelection,
    returningYAxisSelection,
    churnRetentionYAxisSelection,
  } = customerDashboardYearlyState;

  if (!businessMetrics.length) {
    return null;
  }

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
  const [createdOverviewYAxisSelectInput] = returnAccessibleSelectInputElements(
    [
      {
        data: OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis',
        description: 'Select the Y Axis for the Overview Charts',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setOverviewYAxisSelection,
            payload: event.currentTarget.value as CustomerOverviewMapKey,
          });
        },
        value: overviewYAxisSelection,
      },
    ]
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

  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyCharts.overview.barChartMap.get(overviewYAxisSelection) ?? []
      }
      hideControls
      indexBy="Years"
      keys={OVERVIEW_Y_AXIS_DATA}
    />
  );

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyCharts.overview.lineChartMap.get(overviewYAxisSelection) ?? []
      }
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
      heading="Yearly Overview"
      overviewCards={yearlyCards.overview}
      pieChart={displayOverviewPieChart}
      pieChartHeading={`New and returning customers for ${year}`}
      width={width}
    />
  );

  // new section
  const displayNewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.new.pieChartData}
      hideControls
    />
  );

  const [createdNewYAxisSelectInput] = returnAccessibleSelectInputElements([
    {
      data: NEW_Y_AXIS_DATA,
      label: 'Y-Axis',
      description: 'Select the Y Axis for the New Charts',
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDashboardYearlyDispatch({
          type: customerDashboardYearlyAction.setNewYAxisSelection,
          payload: event.currentTarget.value as CustomerNewMapKey,
        });
      },
      value: newYAxisSelection,
    },
  ]);

  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={yearlyCharts.new.barChartMap.get(newYAxisSelection) ?? []}
      hideControls
      indexBy="Years"
      keys={NEW_Y_AXIS_DATA}
    />
  );

  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={yearlyCharts.new.lineChartMap.get(newYAxisSelection) ?? []}
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

  const displayNewCarouselWithHeading = (
    <Group w="100%" spacing={padding}>
      <Stack>
        {createdNewYAxisSelectInput}
        {createdExpandChartButton}
      </Stack>
      {displayNewCarousel}
    </Group>
  );

  const displayNewSection = (
    <DashboardSection
      chartCarousel={displayNewCarouselWithHeading}
      heading="Yearly New"
      overviewCards={yearlyCards.new}
      pieChart={displayNewPieChart}
      pieChartHeading={`New customers for ${year}`}
      width={width}
    />
  );

  // returning section
  const [createdReturningYAxisSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: RETURNING_Y_AXIS_DATA,
        label: 'Y-Axis',
        description: 'Select the Y Axis for the Returning Charts',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setReturningYAxisSelection,
            payload: event.currentTarget.value as CustomerReturningMapKey,
          });
        },
        value: returningYAxisSelection,
      },
    ]);

  const displayReturningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.returning.pieChartData}
      hideControls
    />
  );

  const displayReturningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyCharts.returning.barChartMap.get(returningYAxisSelection) ?? []
      }
      hideControls
      indexBy="Years"
      keys={RETURNING_Y_AXIS_DATA}
    />
  );

  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyCharts.returning.lineChartMap.get(returningYAxisSelection) ?? []
      }
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

  const displayReturningCarouselWithHeading = (
    <Group w="100%" spacing={padding}>
      <Stack>
        {createdReturningYAxisSelectInput}
        {createdExpandChartButton}
      </Stack>
      {displayReturningCarousel}
    </Group>
  );

  const displayReturningSection = (
    <DashboardSection
      chartCarousel={displayReturningCarouselWithHeading}
      heading="Yearly Returning"
      overviewCards={yearlyCards.returning}
      pieChart={displayReturningPieChart}
      pieChartHeading={`Returning customers for ${year}-`}
      width={width}
    />
  );

  // CHURN RETENTION SECTION

  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.churnRetention.pieChartData}
      hideControls
    />
  );

  const [createdChurnRetentionYAxisSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis',
        description: 'Select the Y Axis for the Churn & Retention Charts',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setChurnRetentionYAxisSelection,
            payload: event.currentTarget.value as CustomerChurnRetentionMapKey,
          });
        },
        value: churnRetentionYAxisSelection,
      },
    ]);

  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        yearlyCharts.churnRetention.barChartMap.get(
          churnRetentionYAxisSelection
        ) ?? []
      }
      hideControls
      indexBy="Years"
      keys={CHURN_RETENTION_Y_AXIS_DATA}
    />
  );

  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        yearlyCharts.churnRetention.lineChartMap.get(
          churnRetentionYAxisSelection
        ) ?? []
      }
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

  const displayChurnRetentionCarouselWithHeading = (
    <Group w="100%" spacing={padding}>
      <Stack>
        {createdChurnRetentionYAxisSelectInput}
        {createdExpandChartButton}
      </Stack>
      {displayChurnRetentionCarousel}
    </Group>
  );

  const displayChurnRetentionSection = (
    <DashboardSection
      chartCarousel={displayChurnRetentionCarouselWithHeading}
      heading="Yearly Churn & Retention"
      overviewCards={[...yearlyCards.churnRate, ...yearlyCards.retentionRate]}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={`Churn & Retention for ${year}`}
      width={width}
    />
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
