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
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
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
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
} from '../constants';
import { ChangeEvent, useEffect, useReducer } from 'react';
import {
  customerDashboardMonthlyAction,
  customerDashboardMonthlyReducer,
  initialCustomerDashboardMonthlyState,
} from './state';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { MONTHS } from '../../constants';
import { logState, splitCamelCase } from '../../../../utils';
import { returnStatistics } from '../../utils';

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
    churnRetentionBarChartYAxisVariable,
    churnRetentionLineChartYAxisVariable,
    newBarChartYAxisVariable,
    newCalendarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
    overviewBarChartYAxisVariable,
    overviewCalendarChartYAxisVariable,
    overviewLineChartYAxisVariable,
    returningBarChartYAxisVariable,
    returningCalendarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardMonthlyState;

  useEffect(() => {
    logState({
      state: customerDashboardMonthlyState,
      groupLabel: 'customerDashboardMonthlyState',
    });
  }, [customerDashboardMonthlyState]);

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
  const chartWidth = componentWidth;

  const [createdExpandChartButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Expand',
      semanticDescription: 'Expand and customize currently selected chart',
      semanticName: 'Expand Chart',
      buttonOnClick: () => {},
      leftIcon: <LuExpand />,
    },
  ]);

  /**
   * // overview

  // overview -> statistics
  const statisticsDailyOverview = returnStatistics<CustomerOverviewObjKey>(
    dailyCharts.overview.barChartsObj
  );

  console.log('statisticsDailyOverview', statisticsDailyOverview);

  // overview -> charts -> pie

  // overview -> charts -> pie -> heading
  const pieChartHeading = `New and returning customers for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;
  // overview -> charts -> pie -> y axis variables
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyCharts.overview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar -> heading
  const barChartHeading = `${splitCamelCase(
    overviewBarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewBarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> bar -> display
  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        dailyCharts.overview.barChartsObj[overviewBarChartYAxisVariable]
      }
      hideControls
      indexBy="Days"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line -> heading
  const lineChartHeading = `${splitCamelCase(
    overviewLineChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewLineChartYAxisVariable,
      },
    ]);

  // overview -> charts -> line -> display
  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyCharts.overview.lineChartsObj[overviewLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // overview -> charts -> calendar -> heading
  const calendarChartHeading = `${splitCamelCase(
    overviewCalendarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // overview -> charts -> calendar -> y axis variables
  const [createdOverviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setOverviewCalendarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewCalendarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> calendar -> display
  const displayOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.overview.calendarChartsObj[
          overviewCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayOverviewSection = (
    <DashboardMetricsLayout
      barChart={displayOverviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdOverviewBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayOverviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdOverviewLineChartYAxisVariablesSelectInput
      }
      overviewCards={dailyCards.overview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading="Daily Overview"
      statisticsMap={statisticsDailyOverview}
      width={width}
      calendarChart={displayOverviewCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOverviewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  // new

  // new -> statistics
  const statisticsDailyNew = returnStatistics<CustomerNewReturningObjKey>(
    dailyCharts.new.barChartsObj
  );

  // new -> charts -> pie

  // new -> charts -> pie -> heading
  const newPieChartHeading = `New customers for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setNewPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: newPieChartYAxisVariable,
      },
    ]);

  // new -> charts -> pie -> display
  const displayNewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={dailyCharts.new.pieChartObj[newPieChartYAxisVariable]}
      hideControls
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> heading
  const newBarChartHeading = `${splitCamelCase(
    newBarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setNewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newBarChartYAxisVariable,
      },
    ]);

  // new -> charts -> bar -> display
  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={dailyCharts.new.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> heading
  const newLineChartHeading = `${splitCamelCase(
    newLineChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setNewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newLineChartYAxisVariable,
      },
    ]);

  // new -> charts -> line -> display
  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={dailyCharts.new.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // new -> charts -> calendar

  // new -> charts -> calendar -> heading
  const newCalendarChartHeading = `${splitCamelCase(
    newCalendarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // new -> charts -> calendar -> y axis variables
  const [createdNewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setNewCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: newCalendarChartYAxisVariable,
      },
    ]);

  // new -> charts -> calendar -> display
  const displayNewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.new.calendarChartsObj[newCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayNewSection = (
    <DashboardMetricsLayout
      barChart={displayNewBarChart}
      barChartHeading={newBarChartHeading}
      barChartYAxisSelectInput={createdNewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayNewLineChart}
      lineChartHeading={newLineChartHeading}
      lineChartYAxisSelectInput={createdNewLineChartYAxisVariablesSelectInput}
      overviewCards={dailyCards.new}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={newPieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading="Daily New"
      statisticsMap={statisticsDailyNew}
      width={width}
      calendarChart={displayNewCalendarChart}
      calendarChartHeading={newCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdNewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  // returning

  // returning -> statistics
  const statisticsDailyReturning = returnStatistics<CustomerNewReturningObjKey>(
    dailyCharts.returning.barChartsObj
  );

  // returning -> charts -> pie

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${
    MONTHS[parseInt(month) - 1]
  }, ${year}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setReturningPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: returningPieChartYAxisVariable,
      },
    ]);

  // returning -> charts -> pie -> display
  const displayReturningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        dailyCharts.returning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setReturningBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningBarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> bar -> display
  const displayReturningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        dailyCharts.returning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Days"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setReturningLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningLineChartYAxisVariable,
      },
    ]);

  // returning -> charts -> line -> display
  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        dailyCharts.returning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Day - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // returning -> charts -> calendar

  // returning -> charts -> calendar -> heading
  const returningCalendarChartHeading = `${splitCamelCase(
    returningCalendarChartYAxisVariable
  )} Customers vs. Days for ${
    MONTHS[parseInt(month) - 1]
  }, ${year} at ${storeLocation}`;

  // returning -> charts -> calendar -> y axis variables
  const [createdReturningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardDailyDispatch({
            type: customerDashboardDailyAction.setReturningCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: returningCalendarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> calendar -> display
  const displayReturningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        dailyCharts.returning.calendarChartsObj[
          returningCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-${month}-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayReturningSection = (
    <DashboardMetricsLayout
      barChart={displayReturningBarChart}
      barChartHeading={returningBarChartHeading}
      barChartYAxisSelectInput={
        createdReturningBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayReturningLineChart}
      lineChartHeading={returningLineChartHeading}
      lineChartYAxisSelectInput={
        createdReturningLineChartYAxisVariablesSelectInput
      }
      overviewCards={dailyCards.returning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Daily Returning"
      statisticsMap={statisticsDailyReturning}
      width={width}
      calendarChart={displayReturningCalendarChart}
      calendarChartHeading={returningCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdReturningCalendarChartYAxisVariablesSelectInput
      }
    />
  );

   */

  // overview

  // overview -> statistics
  const statisticsMonthlyOverview = returnStatistics<CustomerOverviewObjKey>(
    monthlyCharts.overview.barChartsObj
  );

  console.log('statisticsMonthlyOverview', statisticsMonthlyOverview);

  // overview -> charts -> pie

  // overview -> charts -> pie -> heading
  const pieChartHeading = `New and returning customers for ${year}`;

  // overview -> charts -> pie -> display
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyCharts.overview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar

  // overview -> charts -> bar -> heading
  const barChartHeading = `${splitCamelCase(
    overviewBarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setOverviewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewBarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> bar -> display
  const displayOverviewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        monthlyCharts.overview.barChartsObj[overviewBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line

  // overview -> charts -> line -> heading
  const lineChartHeading = `${splitCamelCase(
    overviewLineChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setOverviewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewLineChartYAxisVariable,
      },
    ]);

  // overview -> charts -> line -> display
  const displayOverviewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyCharts.overview.lineChartsObj[overviewLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // overview -> charts -> calendar

  // overview -> charts -> calendar -> heading
  const calendarChartHeading = `${splitCamelCase(
    overviewCalendarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // overview -> charts -> calendar -> y axis variables
  const [createdOverviewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setOverviewCalendarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerOverviewObjKey,
          });
        },
        value: overviewCalendarChartYAxisVariable,
      },
    ]);

  // overview -> charts -> calendar -> display
  const displayOverviewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.overview.calendarChartsObj[
          overviewCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-01-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayOverviewSection = (
    <DashboardMetricsLayout
      barChart={displayOverviewBarChart}
      barChartHeading={barChartHeading}
      barChartYAxisSelectInput={
        createdOverviewBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayOverviewLineChart}
      lineChartHeading={lineChartHeading}
      lineChartYAxisSelectInput={
        createdOverviewLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCards.overview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading="Monthly Overview"
      statisticsMap={statisticsMonthlyOverview}
      width={width}
      calendarChart={displayOverviewCalendarChart}
      calendarChartHeading={calendarChartHeading}
      calendarChartYAxisSelectInput={
        createdOverviewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  // new

  // new -> statistics
  const statisticsMonthlyNew = returnStatistics<CustomerNewReturningObjKey>(
    monthlyCharts.new.barChartsObj
  );

  // new -> charts -> pie

  // new -> charts -> pie -> heading
  const newPieChartHeading = `New customers for ${year}`;

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setNewPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: newPieChartYAxisVariable,
      },
    ]);

  // new -> charts -> pie -> display
  const displayNewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyCharts.new.pieChartObj[newPieChartYAxisVariable]}
      hideControls
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> heading
  const newBarChartHeading = `${splitCamelCase(
    newBarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setNewBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newBarChartYAxisVariable,
      },
    ]);

  // new -> charts -> bar -> display
  const displayNewBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={monthlyCharts.new.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Months"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> heading
  const newLineChartHeading = `${splitCamelCase(
    newLineChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setNewLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: newLineChartYAxisVariable,
      },
    ]);

  // new -> charts -> line -> display
  const displayNewLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={monthlyCharts.new.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // new -> charts -> calendar

  // new -> charts -> calendar -> heading
  const newCalendarChartHeading = `${splitCamelCase(
    newCalendarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // new -> charts -> calendar -> y axis variables
  const [createdNewCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setNewCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: newCalendarChartYAxisVariable,
      },
    ]);

  // new -> charts -> calendar -> display
  const displayNewCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.new.calendarChartsObj[newCalendarChartYAxisVariable]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-01-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayNewSection = (
    <DashboardMetricsLayout
      barChart={displayNewBarChart}
      barChartHeading={newBarChartHeading}
      barChartYAxisSelectInput={createdNewBarChartYAxisVariablesSelectInput}
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayNewLineChart}
      lineChartHeading={newLineChartHeading}
      lineChartYAxisSelectInput={createdNewLineChartYAxisVariablesSelectInput}
      overviewCards={monthlyCards.new}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={newPieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading="Monthly New"
      statisticsMap={statisticsMonthlyNew}
      width={width}
      calendarChart={displayNewCalendarChart}
      calendarChartHeading={newCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdNewCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  // returning

  // returning -> statistics
  const statisticsMonthlyReturning =
    returnStatistics<CustomerNewReturningObjKey>(
      monthlyCharts.returning.barChartsObj
    );

  // returning -> charts -> pie

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${year}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setReturningPieChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningPieObjKey,
          });
        },
        value: returningPieChartYAxisVariable,
      },
    ]);

  // returning -> charts -> pie -> display
  const displayReturningPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={
        monthlyCharts.returning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setReturningBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningBarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> bar -> display
  const displayReturningBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        monthlyCharts.returning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setReturningLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerNewReturningObjKey,
          });
        },
        value: returningLineChartYAxisVariable,
      },
    ]);

  // returning -> charts -> line -> display
  const displayReturningLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyCharts.returning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} Customers`}
    />
  );

  // returning -> charts -> calendar

  // returning -> charts -> calendar -> heading
  const returningCalendarChartHeading = `${splitCamelCase(
    returningCalendarChartYAxisVariable
  )} Customers vs. Months for ${year} at ${storeLocation}`;

  // returning -> charts -> calendar -> y axis variables
  const [createdReturningCalendarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
        label: 'Y-Axis Calendar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setReturningCalendarChartYAxisVariable,
            payload: event.currentTarget
              .value as CustomerNewReturningCalendarObjKey,
          });
        },
        value: returningCalendarChartYAxisVariable,
      },
    ]);

  // returning -> charts -> calendar -> display
  const displayReturningCalendarChart = (
    <ResponsiveCalendarChart
      calendarChartData={
        monthlyCharts.returning.calendarChartsObj[
          returningCalendarChartYAxisVariable
        ]
      }
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      from={`${year}-01-01`}
      to={`${year}-${month}-${day}`}
      hideControls
    />
  );

  const displayReturningSection = (
    <DashboardMetricsLayout
      barChart={displayReturningBarChart}
      barChartHeading={returningBarChartHeading}
      barChartYAxisSelectInput={
        createdReturningBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayReturningLineChart}
      lineChartHeading={returningLineChartHeading}
      lineChartYAxisSelectInput={
        createdReturningLineChartYAxisVariablesSelectInput
      }
      overviewCards={monthlyCards.returning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Monthly Returning"
      statisticsMap={statisticsMonthlyReturning}
      width={width}
      calendarChart={displayReturningCalendarChart}
      calendarChartHeading={returningCalendarChartHeading}
      calendarChartYAxisSelectInput={
        createdReturningCalendarChartYAxisVariablesSelectInput
      }
    />
  );

  return (
    <Stack>
      {displayOverviewSection}
      {displayNewSection}
      {displayReturningSection}
    </Stack>
  );
}

export default CustomerDashboardMonthly;

// // overview section
// const [createdOverviewYAxisSelectInput] = returnAccessibleSelectInputElements(
//   [
//     {
//       data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
//       label: 'Y-Axis',
//       description: 'Select the Y Axis for the Overview Charts',
//       onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//         customerDashboardMonthlyDispatch({
//           type: customerDashboardMonthlyAction.setOverviewYAxisVariablesSelection,
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
//       monthlyCharts.overview.barChartsMap.get(overviewBarChartYAxisVariable) ?? []
//     }
//     hideControls
//     indexBy="Months"
//     keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA}
//   />
// );

// const displayOverviewLineChart = (
//   <ResponsiveLineChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     lineChartData={
//       monthlyCharts.overview.lineChartsMap.get(overviewBarChartYAxisVariable) ?? []
//     }
//     hideControls
//     xFormat={(x) => `Month - ${x}`}
//     yFormat={(y) => `${y} Customers`}
//   />
// );

// console.log(
//   'monthlyCharts.overview.calendarChartsMap.get(overviewBarChartYAxisVariable): ',
//   monthlyCharts.overview.calendarChartsMap.get(overviewBarChartYAxisVariable)
// );

// const displayOverviewCalendarChart = (
//   <ResponsiveCalendarChart
//     calendarChartData={
//       monthlyCharts.overview.calendarChartsMap.get(overviewBarChartYAxisVariable) ??
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
//   <DashboardMetricsLayout
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
//     data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
//     label: 'Y-Axis',
//     description: 'Select the Y Axis for the New Charts',
//     onChange: (event: ChangeEvent<HTMLSelectElement>) => {
//       customerDashboardMonthlyDispatch({
//         type: customerDashboardMonthlyAction.setNewYAxisLineBarVariablesSelection,
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
//     barChartData={monthlyCharts.new.barChartsMap.get(newYAxisBarVariablesSelection) ?? []}
//     hideControls
//     indexBy="Months"
//     keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA}
//   />
// );

// const displayNewLineChart = (
//   <ResponsiveLineChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     lineChartData={
//       monthlyCharts.new.lineChartsMap.get(newYAxisBarVariablesSelection) ?? []
//     }
//     hideControls
//     xFormat={(x) => `Month - ${x}`}
//     yFormat={(y) => `${y} Customers`}
//   />
// );

// console.log(
//   'monthlyCharts.new.calendarChartsMap.get(newYAxisBarVariablesSelection)',
//   monthlyCharts.new.calendarChartsMap.get(newYAxisBarVariablesSelection)
// );

// const displayNewCalendarChart = (
//   <ResponsiveCalendarChart
//     calendarChartData={
//       monthlyCharts.new.calendarChartsMap.get(newYAxisBarVariablesSelection) ?? []
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
//   <DashboardMetricsLayout
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
//           type: customerDashboardMonthlyAction.setReturningYAxisLineBarSelection,
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
//     pieChartData={monthlyCharts.returning.pieChartData}
//     hideControls
//   />
// );

// const displayReturningBarChart = (
//   <ResponsiveBarChart
//     chartHeight={chartHeight}
//     chartWidth={chartWidth}
//     barChartData={
//       monthlyCharts.returning.barChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
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
//       monthlyCharts.returning.lineChartsMap.get(returningYAxisLineBarVariablesSelection) ?? []
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
//         returningYAxisLineBarVariablesSelection
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
//   <DashboardMetricsLayout
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
//       data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
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
//     keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA}
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
//   <DashboardMetricsLayout
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
