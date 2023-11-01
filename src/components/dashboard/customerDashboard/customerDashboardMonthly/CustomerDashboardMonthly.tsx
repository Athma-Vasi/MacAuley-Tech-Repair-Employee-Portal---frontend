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
import { BusinessMetric, BusinessMetricStoreLocation } from '../../types';
import { StoreLocation } from '../../../../types';
import {
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
import { LuExpand } from 'react-icons/lu';
import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import {
  CHURN_RETENTION_Y_AXIS_DATA,
  NEW_Y_AXIS_DATA,
  OVERVIEW_Y_AXIS_DATA,
  RETURNING_Y_AXIS_DATA,
} from '../constants';
import { ChangeEvent, useReducer } from 'react';
import {
  customerDashboardMonthlyAction,
  customerDashboardMonthlyReducer,
  initialCustomerDashboardMonthlyState,
} from './state';
import DashboardSection from '../../DashboardSection';
import { MONTHS } from '../../constants';

function CustomerDashboardMonthly({
  borderColor,
  businessMetrics,
  monthlyCards,
  monthlyCharts,
  day,
  month,
  padding,
  storeLocation,
  width,
  year,
}: {
  borderColor: string;
  businessMetrics: BusinessMetric[];
  monthlyCards: ReturnDashboardCustomerCardInfoOutput['monthlyCards'];
  monthlyCharts: ReturnCustomerChartsDataOutput['monthlyCharts'];
  day: string;
  month: string;
  padding: MantineNumberSize;
  storeLocation: BusinessMetricStoreLocation;
  width: number;
  year: string;
}) {
  const [customerDashboardMonthlyState, customerDashboardMonthlyDispatch] =
    useReducer(
      customerDashboardMonthlyReducer,
      initialCustomerDashboardMonthlyState
    );

  const {
    newYAxisSelection,
    overviewYAxisSelection,
    returningYAxisSelection,
    churnRetentionYAxisSelection,
  } = customerDashboardMonthlyState;

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
  //       data: OVERVIEW_Y_AXIS_DATA,
  //       label: 'Y-Axis',
  //       description: 'Select the Y Axis for the Overview Charts',
  //       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //         customerDashboardMonthlyDispatch({
  //           type: customerDashboardMonthlyAction.setOverviewYAxisSelection,
  //           payload: event.currentTarget.value as CustomerOverviewMapKey,
  //         });
  //       },
  //       value: overviewYAxisSelection,
  //     },
  //   ]
  // );

  // const displayOverviewPieChart = (
  //   <Card shadow="sm" radius="md" withBorder w={chartWidth}>
  //     <Card.Section>
  //       <ResponsivePieChart
  //         chartHeight={chartHeight}
  //         chartWidth={chartWidth}
  //         pieChartData={monthlyCharts.overview.pieChartData}
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
  //       monthlyCharts.overview.barChartsMap.get(overviewYAxisSelection) ?? []
  //     }
  //     hideControls
  //     indexBy="Months"
  //     keys={OVERVIEW_Y_AXIS_DATA}
  //   />
  // );

  // const displayOverviewLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       monthlyCharts.overview.lineChartsMap.get(overviewYAxisSelection) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Month - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // console.log(
  //   'monthlyCharts.overview.calendarChartsMap.get(overviewYAxisSelection): ',
  //   monthlyCharts.overview.calendarChartsMap.get(overviewYAxisSelection)
  // );

  // const displayOverviewCalendarChart = (
  //   <ResponsiveCalendarChart
  //     calendarChartData={
  //       monthlyCharts.overview.calendarChartsMap.get(overviewYAxisSelection) ??
  //       []
  //     }
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     from={`${year}-01-01`}
  //     to={`${year}-${month}-${day}`}
  //     hideControls
  //   />
  // );

  // const displayOverviewCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[
  //       displayOverviewBarChart,
  //       displayOverviewLineChart,
  //       displayOverviewCalendarChart,
  //     ]}
  //     headings={[
  //       'Overview Months Bar Chart',
  //       'Overview Months Line Chart',
  //       'Overview Months Calendar Chart',
  //     ]}
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
  //   <DashboardSection
  //     chartCarousel={displayOverviewCarouselWithHeading}
  //     heading="Monthly Overview"
  //     overviewCards={monthlyCards.overview}
  //     pieChart={displayOverviewPieChart}
  //     pieChartHeading={`New and returning customers for ${year}-${
  //       MONTHS[parseInt(month) - 1]
  //     }`}
  //     width={width}
  //   />
  // );

  // // new section
  // const displayNewPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={monthlyCharts.new.pieChartData}
  //     hideControls
  //   />
  // );

  // const [createdNewYAxisSelectInput] = returnAccessibleSelectInputElements([
  //   {
  //     data: NEW_Y_AXIS_DATA,
  //     label: 'Y-Axis',
  //     description: 'Select the Y Axis for the New Charts',
  //     onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //       customerDashboardMonthlyDispatch({
  //         type: customerDashboardMonthlyAction.setNewYAxisSelection,
  //         payload: event.currentTarget.value as CustomerNewMapKey,
  //       });
  //     },
  //     value: newYAxisSelection,
  //   },
  // ]);

  // const displayNewBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={monthlyCharts.new.barChartsMap.get(newYAxisSelection) ?? []}
  //     hideControls
  //     indexBy="Months"
  //     keys={NEW_Y_AXIS_DATA}
  //   />
  // );

  // const displayNewLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       monthlyCharts.new.lineChartsMap.get(newYAxisSelection) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Month - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // console.log(
  //   'monthlyCharts.new.calendarChartsMap.get(newYAxisSelection)',
  //   monthlyCharts.new.calendarChartsMap.get(newYAxisSelection)
  // );

  // const displayNewCalendarChart = (
  //   <ResponsiveCalendarChart
  //     calendarChartData={
  //       monthlyCharts.new.calendarChartsMap.get(newYAxisSelection) ?? []
  //     }
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     from={`${year}-01-01`}
  //     to={`${year}-${month}-${day}`}
  //     hideControls
  //   />
  // );

  // const displayNewCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[
  //       displayNewBarChart,
  //       displayNewLineChart,
  //       displayNewCalendarChart,
  //     ]}
  //     headings={[
  //       'New Customers Bar Chart',
  //       'New Customers Line Chart',
  //       'New Customers Calendar Chart',
  //     ]}
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
  //   <DashboardSection
  //     chartCarousel={displayNewCarouselWithHeading}
  //     heading="Monthly New"
  //     overviewCards={monthlyCards.new}
  //     pieChart={displayNewPieChart}
  //     pieChartHeading={`New customers for ${year}-${
  //       MONTHS[parseInt(month) - 1]
  //     }`}
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
  //         customerDashboardMonthlyDispatch({
  //           type: customerDashboardMonthlyAction.setReturningYAxisSelection,
  //           payload: event.currentTarget.value as CustomerReturningMapKey,
  //         });
  //       },
  //       value: returningYAxisSelection,
  //     },
  //   ]);

  // const displayReturningPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={monthlyCharts.returning.pieChartData}
  //     hideControls
  //   />
  // );

  // const displayReturningBarChart = (
  //   <ResponsiveBarChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     barChartData={
  //       monthlyCharts.returning.barChartsMap.get(returningYAxisSelection) ?? []
  //     }
  //     hideControls
  //     indexBy="Months"
  //     keys={RETURNING_Y_AXIS_DATA}
  //   />
  // );

  // const displayReturningLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       monthlyCharts.returning.lineChartsMap.get(returningYAxisSelection) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Month - ${x}`}
  //     yFormat={(y) => `${y} Customers`}
  //   />
  // );

  // const displayReturningCalendarChart = (
  //   <ResponsiveCalendarChart
  //     calendarChartData={
  //       monthlyCharts.returning.calendarChartsMap.get(
  //         returningYAxisSelection
  //       ) ?? []
  //     }
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     from={`${year}-01-01`}
  //     to={`${year}-${month}-${day}`}
  //     hideControls
  //   />
  // );

  // const displayReturningCarousel = (
  //   <CarouselBuilder
  //     slideDimensions={{ width: chartWidth, height: chartHeight }}
  //     slides={[
  //       displayReturningBarChart,
  //       displayReturningLineChart,
  //       displayReturningCalendarChart,
  //     ]}
  //     headings={[
  //       'Returning Customers Bar Chart',
  //       'Returning Customers Line Chart',
  //       'Returning Customers Calendar Chart',
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
  //   <DashboardSection
  //     chartCarousel={displayReturningCarouselWithHeading}
  //     heading="Monthly Returning"
  //     overviewCards={monthlyCards.returning}
  //     pieChart={displayReturningPieChart}
  //     pieChartHeading={`Returning customers for ${year}-${
  //       MONTHS[parseInt(month) - 1]
  //     }`}
  //     width={width}
  //   />
  // );

  // // churn & retention section

  // const displayChurnRetentionPieChart = (
  //   <ResponsivePieChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     pieChartData={monthlyCharts.churnRetention.pieChartData}
  //     hideControls
  //   />
  // );

  // const [createdChurnRetentionYAxisSelectInput] =
  //   returnAccessibleSelectInputElements([
  //     {
  //       data: CHURN_RETENTION_Y_AXIS_DATA,
  //       label: 'Y-Axis',
  //       description: 'Select the Y Axis for the Churn & Retention Charts',
  //       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
  //         customerDashboardMonthlyDispatch({
  //           type: customerDashboardMonthlyAction.setChurnRetentionYAxisSelection,
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
  //       monthlyCharts.churnRetention.barChartsMap.get(
  //         churnRetentionYAxisSelection
  //       ) ?? []
  //     }
  //     hideControls
  //     indexBy="Months"
  //     keys={CHURN_RETENTION_Y_AXIS_DATA}
  //   />
  // );

  // const displayChurnRetentionLineChart = (
  //   <ResponsiveLineChart
  //     chartHeight={chartHeight}
  //     chartWidth={chartWidth}
  //     lineChartData={
  //       monthlyCharts.churnRetention.lineChartsMap.get(
  //         churnRetentionYAxisSelection
  //       ) ?? []
  //     }
  //     hideControls
  //     xFormat={(x) => `Month - ${x}`}
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
  //   <DashboardSection
  //     chartCarousel={displayChurnRetentionCarouselWithHeading}
  //     heading="Monthly Churn & Retention"
  //     overviewCards={[...monthlyCards.churnRate, ...monthlyCards.retentionRate]}
  //     pieChart={displayChurnRetentionPieChart}
  //     pieChartHeading={`Churn & Retention for ${year}-${
  //       MONTHS[parseInt(month) - 1]
  //     }`}
  //     width={width}
  //   />
  // );

  // const displayCustomerDashboardMonthly = (
  //   <Stack w="100%">
  //     {displayOverviewSection}
  //     {displayNewSection}
  //     {displayReturningSection}
  //     {displayChurnRetentionSection}
  //   </Stack>
  // );

  // return displayCustomerDashboardMonthly;

  return <></>;
}

export default CustomerDashboardMonthly;
