import {
  Card,
  Group,
  MantineNumberSize,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';

import { StoreLocation } from '../../../../types';
import CarouselBuilder from '../../../carouselBuilder/CarouselBuilder';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import {
  returnDashboardCard,
  ReturnDashboardCustomerCardInfoOutput,
} from '../../jsxHelpers';
import {
  BusinessMetric,
  BusinessMetricStoreLocation,
  Month,
  Year,
} from '../../types';
import { YAxisCustomerChartSelection } from '../types';
import {
  CustomerNewReturningObjKey,
  CustomerOverviewObjKey,
  ReturnCustomerChartsDataOutput,
  SelectedDateCustomerMetrics,
} from '../utils';
import { AccessibleSelectInputCreatorInfo } from '../../../wrappers';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import {
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
} from '../constants';
import { TbArrowUpRight } from 'react-icons/tb';
import DashboardSection from '../../DashboardSection';
import { BiExpandAlt } from 'react-icons/bi';
import { LuExpand } from 'react-icons/lu';
import {
  customerDashboardDailyAction,
  customerDashboardDailyReducer,
  initialCustomerDashboardDailyState,
} from './state';
import { MONTHS } from '../../constants';
import { logState } from '../../../../utils';
import { returnStatistics } from '../../utils';

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
  const [customerDashboardDailyState, customerDashboardDailyDispatch] =
    useReducer(
      customerDashboardDailyReducer,
      initialCustomerDashboardDailyState
    );

  const {
    newBarChartYAxisVariables,
    newCalendarChartYAxisVariables,
    newLineChartYAxisVariables,
    newPieChartYAxisVariables,
    overviewBarChartYAxisVariables,
    overviewCalendarChartYAxisVariables,
    overviewLineChartYAxisVariables,
    returningBarChartYAxisVariables,
    returningCalendarChartYAxisVariables,
    returningLineChartYAxisVariables,
    returningPieChartYAxisVariables,
  } = customerDashboardDailyState;

  useEffect(() => {
    logState({
      state: customerDashboardDailyState,
      groupLabel: 'customerDashboardDailyState',
    });
  }, [customerDashboardDailyState]);

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

  // overview

  // overview -> statistics
  const statisticsDailyOverview = returnStatistics<CustomerOverviewObjKey>(
    dailyCharts.overview.barChartsObj
  );

  console.log('statisticsDailyOverview', statisticsDailyOverview);

  // overview -> pie chart
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyCharts.overview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewBarChartYAxisVariables,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewBarChartYAxisVariables,
      },
    ]);

  // overview -> charts -> bar
  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        dailyCharts.overview.barChartsObj[overviewBarChartYAxisVariables]
      }
      hideControls
      indexBy="Days"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewLineChartYAxisVariables,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewLineChartYAxisVariables,
      },
    ]);

  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyCharts.overview.lineChartsObj[overviewLineChartYAxisVariables]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // // overview -> charts -> calendar -> y axis variables
  const [createdOverviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewCalendarChartYAxisVariables,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewCalendarChartYAxisVariables,
      },
    ]);

  const displayOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.overview.calendarChartsObj[
          overviewCalendarChartYAxisVariables
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  return (
    <Stack>
      {displayOverviewPieChart}
      {createdOverviewBarChartYAxisVariablesSelectInput}
      {displayOverviewBarChart}
      {createdOverviewLineChartYAxisVariablesSelectInput}
      {displayOverviewLineChart}
      {createdOverviewCalendarChartYAxisVariablesSelectInput}
      {displayOverviewCalendarChart}
    </Stack>
  );
}

// const [createdOverviewYAxisSelectInput] = returnAccessibleSelectInputElements(
//   [
//     {
//       data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
//       label: 'Y-Axis',
//       description: 'Select the Y Axis for the Overview Charts',
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         customerDashboardDailyDispatch({
//           type: customerDashboardDailyAction.setOverviewYAxisVariablesSelection,
//           payload: event.currentTarget.value as CustomerOverviewMapKey,
//         });
//       },
//       value: overviewBarChartYAxisVariables,
//     },
//   ]
// );

// const displayOverviewBarChart = (
//   <ResponsiveBarChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     barChartData={
//       dailyCharts.overview.barChartsMap.get(overviewBarChartYAxisVariables) ?? []
//     }
//     hideControls
//     indexBy="Days"
//     keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA}
//   />
// );

// const displayOverviewLineChart = (
//   <ResponsiveLineChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     lineChartData={
//       dailyCharts.overview.lineChartsMap.get(overviewBarChartYAxisVariables) ?? []
//     }
//     hideControls
//     xFormat={(x) => `Day - ${x}`}
//     yFormat={(y) => `${y} Customers`}
//   />
// );

// const displayOverviewCalendarChart = (
//   <ResponsiveCalendarChart
//     calendarChartData={
//       dailyCharts.overview.calendarChartsMap.get(overviewBarChartYAxisVariables) ?? []
//     }
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     from={`${year}-${month}-01`}
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
//       'Overview Bar Chart',
//       'Overview Line Chart',
//       'Overview Calendar Chart',
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
//     heading="Daily Overview"
//     overviewCards={dailyCards.overview}
//     pieChart={displayOverviewPieChart}
//     pieChartHeading={`New and returning customers for ${year}-${
//       MONTHS[parseInt(month) - 1]
//     }-${day}`}
//     width={width}
//   />
// );

// // new section
// const displayNewPieChart = (
//   <ResponsivePieChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     pieChartData={dailyCharts.new.pieChartData}
//     hideControls
//   />
// );

// const [createdNewYAxisSelectInput] = returnAccessibleSelectInputElements([
//   {
//     data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
//     label: 'Y-Axis',
//     description: 'Select the Y Axis for the New Charts',
//     onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//       customerDashboardDailyDispatch({
//         type: customerDashboardDailyAction.setNewYAxisLineBarVariablesSelection,
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
//     barChartData={dailyCharts.new.barChartsMap.get(newYAxisBarVariablesSelection) ?? []}
//     hideControls
//     indexBy="Days"
//     keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA}
//   />
// );

// const displayNewLineChart = (
//   <ResponsiveLineChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     lineChartData={dailyCharts.new.lineChartsMap.get(newYAxisBarVariablesSelection) ?? []}
//     hideControls
//     xFormat={(x) => `Day - ${x}`}
//     yFormat={(y) => `${y} Customers`}
//   />
// );

// const displayNewCalendarChart = (
//   <ResponsiveCalendarChart
//     calendarChartData={
//       dailyCharts.new.calendarChartsMap.get(newYAxisBarVariablesSelection) ?? []
//     }
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     from={`${year}-${month}-01`}
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
//     heading="Daily New"
//     overviewCards={dailyCards.new}
//     pieChart={displayNewPieChart}
//     pieChartHeading={`New customers for ${year}-${
//       MONTHS[parseInt(month) - 1]
//     }-${day}`}
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
//         customerDashboardDailyDispatch({
//           type: customerDashboardDailyAction.setReturningYAxisLineBarSelection,
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
//     pieChartData={dailyCharts.returning.pieChartData}
//     hideControls
//   />
// );

// const displayReturningBarChart = (
//   <ResponsiveBarChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     barChartData={
//       dailyCharts.returning.barChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
//     }
//     hideControls
//     indexBy="Days"
//     keys={RETURNING_Y_AXIS_DATA}
//   />
// );

// const displayReturningLineChart = (
//   <ResponsiveLineChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     lineChartData={
//       dailyCharts.returning.lineChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
//     }
//     hideControls
//     xFormat={(x) => `Day - ${x}`}
//     yFormat={(y) => `${y} Customers`}
//   />
// );

// const displayReturningCalendarChart = (
//   <ResponsiveCalendarChart
//     calendarChartData={
//       dailyCharts.returning.calendarChartsMap.get(returningYAxisLineBarVariablesSelection) ??
//       []
//     }
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     from={`${year}-${month}-01`}
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
//     heading="Daily Returning"
//     overviewCards={dailyCards.returning}
//     pieChart={displayReturningPieChart}
//     pieChartHeading={`Returning customers for ${year}-${
//       MONTHS[parseInt(month) - 1]
//     }-${day}`}
//     width={width}
//   />
// );

// const displayCustomerDashboardDaily = (
//   <Stack w="100%">
//     {displayOverviewSection}
//     {displayNewSection}
//     {displayReturningSection}
//   </Stack>
// );

// return displayCustomerDashboardDaily;

export default CustomerDashboardDaily;
