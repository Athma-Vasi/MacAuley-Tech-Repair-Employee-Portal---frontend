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
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import CarouselBuilder from '../../../carouselBuilder/CarouselBuilder';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
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
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
} from '../constants';
import { ReturnCustomerChartsDataOutput } from '../utils';

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
    newYAxisBarVariablesSelection,
    overviewBarChartYAxisVariable,
    returningYAxisLineBarVariablesSelection,
    churnRetentionYAxisSelection,
  } = customerDashboardYearlyState;

  if (!businessMetrics.length) {
    return null;
  }

  // const componentWidth =
  //   width < 480 // for iPhone 5/SE
  //     ? width * 0.93
  //     : width < 768 // for iPhones 6 - 15
  //     ? width - 40
  //     : // at 768vw the navbar appears at width of 225px
  //     width < 1024
  //     ? (width - 225) * 0.8
  //     : // at >= 1200vw the navbar width is 300px
  //     width < 1200
  //     ? (width - 225) * 0.8
  //     : 900 - 40;
  // const chartHeight =
  //   width < 1024 ? componentWidth * 0.618 : componentWidth * 0.382;
  // const chartWidth = width < 1024 ? componentWidth : componentWidth * 0.75;
  // const cardWidth = chartWidth / 2;

  // const [createdExpandChartButton] = returnAccessibleButtonElements([
  //   {
  //     buttonLabel: 'Expand',
  //     semanticDescription: 'Expand and customize currently selected chart',
  //     semanticName: 'Expand Chart',
  //     buttonOnClick: () => {},
  //     leftIcon: <LuExpand />,
  //   },
  // ]);

  // // overview section
  // const [createdOverviewYAxisSelectInput] = returnAccessibleSelectInputElements(
  //   [
  //     {
  //       data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
  //       label: 'Y-Axis',
  //       description: 'Select the Y Axis for the Overview Charts',
  //       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //         customerDashboardYearlyDispatch({
  //           type: customerDashboardYearlyAction.setOverviewYAxisVariablesSelection,
  //           payload: event.currentTarget.value as CustomerOverviewMapKey,
  //         });
  //       },
  //       value: overviewBarChartYAxisVariable,
  //     },
  //   ]
  // );

  // const displayOverviewPieChart = (
  //   <Card shadow="sm" radius="md" withBorder w={chartWidth}>
  //     <Card.Section>
  //       <ResponsivePieChart
  //         chartHeight={chartHeight}
  //         chartWidth={chartWidth}
  //         pieChartData={yearlyCharts.overview.pieChartData}
  //         hideControls
  //       />
  //     </Card.Section>
  //   </Card>
  // );

  // const displayOverviewBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={
  //       yearlyCharts.overview.barChartsMap.get(overviewBarChartYAxisVariable) ?? []
  //     }
  //     hideControls
  //     indexBy="Years"
  //     keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA}
  //   />
  // );

  // const displayOverviewLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       yearlyCharts.overview.lineChartsMap.get(overviewBarChartYAxisVariable) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Year - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // const displayOverviewCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[displayOverviewBarChart, displayOverviewLineChart]}
  //     headings={['Overview Years Bar Chart', 'Overview Years Line Chart']}
  //   />
  // );

  // const displayOverviewCarouselWithHeading = (
  //   <Group w="100%" spacing={padding}>
  //     <Stack>
  //       {createdOverviewYAxisSelectInput}
  //       {createdExpandChartButton}
  //     </Stack>
  //     {displayOverviewCarousel}
  //   </Group>
  // );

  // const displayOverviewSection = (
  //   <DashboardMetricsLayout
  //     chartCarousel={displayOverviewCarouselWithHeading}
  //     heading="Yearly Overview"
  //     overviewCards={yearlyCards.overview}
  //     pieChart={displayOverviewPieChart}
  //     pieChartHeading={`New and returning customers for ${year}`}
  //     width={width}
  //   />
  // );

  // // new section
  // const displayNewPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={yearlyCharts.new.pieChartData}
  //     hideControls
  //   />
  // );

  // const [createdNewYAxisSelectInput] = returnAccessibleSelectInputElements([
  //   {
  //     data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  //     label: 'Y-Axis',
  //     description: 'Select the Y Axis for the New Charts',
  //     onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //       customerDashboardYearlyDispatch({
  //         type: customerDashboardYearlyAction.setNewYAxisLineBarVariablesSelection,
  //         payload: event.currentTarget.value as CustomerNewMapKey,
  //       });
  //     },
  //     value: newYAxisBarVariablesSelection,
  //   },
  // ]);

  // const displayNewBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={yearlyCharts.new.barChartsMap.get(newYAxisBarVariablesSelection) ?? []}
  //     hideControls
  //     indexBy="Years"
  //     keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA}
  //   />
  // );

  // const displayNewLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       yearlyCharts.new.lineChartsMap.get(newYAxisBarVariablesSelection) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Year - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // const displayNewCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[displayNewBarChart, displayNewLineChart]}
  //     headings={['New Customers Bar Chart', 'New Customers Line Chart']}
  //   />
  // );

  // const displayNewCarouselWithHeading = (
  //   <Group w="100%" spacing={padding}>
  //     <Stack>
  //       {createdNewYAxisSelectInput}
  //       {createdExpandChartButton}
  //     </Stack>
  //     {displayNewCarousel}
  //   </Group>
  // );

  // const displayNewSection = (
  //   <DashboardMetricsLayout
  //     chartCarousel={displayNewCarouselWithHeading}
  //     heading="Yearly New"
  //     overviewCards={yearlyCards.new}
  //     pieChart={displayNewPieChart}
  //     pieChartHeading={`New customers for ${year}`}
  //     width={width}
  //   />
  // );

  // // returning section
  // const [createdReturningYAxisSelectInput] =
  //   returnAccessibleSelectInputElements([
  //     {
  //       data: RETURNING_Y_AXIS_DATA,
  //       label: 'Y-Axis',
  //       description: 'Select the Y Axis for the Returning Charts',
  //       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //         customerDashboardYearlyDispatch({
  //           type: customerDashboardYearlyAction.setReturningYAxisLineBarSelection,
  //           payload: event.currentTarget.value as CustomerReturningMapKey,
  //         });
  //       },
  //       value: returningYAxisLineBarVariablesSelection,
  //     },
  //   ]);

  // const displayReturningPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={yearlyCharts.returning.pieChartData}
  //     hideControls
  //   />
  // );

  // const displayReturningBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={
  //       yearlyCharts.returning.barChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
  //     }
  //     hideControls
  //     indexBy="Years"
  //     keys={RETURNING_Y_AXIS_DATA}
  //   />
  // );

  // const displayReturningLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       yearlyCharts.returning.lineChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Year - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // const displayReturningCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[displayReturningBarChart, displayReturningLineChart]}
  //     headings={[
  //       'Returning Customers Bar Chart',
  //       'Returning Customers Line Chart',
  //     ]}
  //   />
  // );

  // const displayReturningCarouselWithHeading = (
  //   <Group w="100%" spacing={padding}>
  //     <Stack>
  //       {createdReturningYAxisSelectInput}
  //       {createdExpandChartButton}
  //     </Stack>
  //     {displayReturningCarousel}
  //   </Group>
  // );

  // const displayReturningSection = (
  //   <DashboardMetricsLayout
  //     chartCarousel={displayReturningCarouselWithHeading}
  //     heading="Yearly Returning"
  //     overviewCards={yearlyCards.returning}
  //     pieChart={displayReturningPieChart}
  //     pieChartHeading={`Returning customers for ${year}-`}
  //     width={width}
  //   />
  // );

  // // CHURN RETENTION SECTION

  // const displayChurnRetentionPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={yearlyCharts.churnRetention.pieChartData}
  //     hideControls
  //   />
  // );

  // const [createdChurnRetentionYAxisSelectInput] =
  //   returnAccessibleSelectInputElements([
  //     {
  //       data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  //       label: 'Y-Axis',
  //       description: 'Select the Y Axis for the Churn & Retention Charts',
  //       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //         customerDashboardYearlyDispatch({
  //           type: customerDashboardYearlyAction.setChurnRetentionYAxisSelection,
  //           payload: event.currentTarget.value as CustomerChurnRetentionMapKey,
  //         });
  //       },
  //       value: churnRetentionYAxisSelection,
  //     },
  //   ]);

  // const displayChurnRetentionBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={
  //       yearlyCharts.churnRetention.barChartsMap.get(
  //         churnRetentionYAxisSelection
  //       ) ?? []
  //     }
  //     hideControls
  //     indexBy="Years"
  //     keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA}
  //   />
  // );

  // const displayChurnRetentionLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       yearlyCharts.churnRetention.lineChartsMap.get(
  //         churnRetentionYAxisSelection
  //       ) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Year - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // const displayChurnRetentionCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[displayChurnRetentionBarChart, displayChurnRetentionLineChart]}
  //     headings={['Churn & Retention Bar Chart', 'Churn & Retention Line Chart']}
  //   />
  // );

  // const displayChurnRetentionCarouselWithHeading = (
  //   <Group w="100%" spacing={padding}>
  //     <Stack>
  //       {createdChurnRetentionYAxisSelectInput}
  //       {createdExpandChartButton}
  //     </Stack>
  //     {displayChurnRetentionCarousel}
  //   </Group>
  // );

  // const displayChurnRetentionSection = (
  //   <DashboardMetricsLayout
  //     chartCarousel={displayChurnRetentionCarouselWithHeading}
  //     heading="Yearly Churn & Retention"
  //     overviewCards={[...yearlyCards.churnRate, ...yearlyCards.retentionRate]}
  //     pieChart={displayChurnRetentionPieChart}
  //     pieChartHeading={`Churn & Retention for ${year}`}
  //     width={width}
  //   />
  // );

  // const displayCustomerDashboardYearly = (
  //   <Stack w="100%">
  //     {displayOverviewSection}
  //     {displayNewSection}
  //     {displayReturningSection}
  //     {displayChurnRetentionSection}
  //   </Stack>
  // );

  // return displayCustomerDashboardYearly;

  return <></>;
}

export default CustomerDashboardYearly;
