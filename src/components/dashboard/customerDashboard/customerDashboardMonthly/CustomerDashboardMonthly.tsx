import { MantineNumberSize, Stack } from '@mantine/core';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { LuExpand } from 'react-icons/lu';

import {
  returnAccessibleButtonElements,
  returnAccessibleSelectInputElements,
} from '../../../../jsxCreators';
import { logState, splitCamelCase } from '../../../../utils';
import {
  ResponsiveBarChart,
  ResponsiveCalendarChart,
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { ReturnDashboardCustomerCardInfoOutput } from '../../jsxHelpers';
import { BusinessMetric, BusinessMetricStoreLocation } from '../../types';
import { returnStatistics } from '../../utils';
import {
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_CALENDAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
} from '../constants';
import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningCalendarObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
  ReturnCustomerChartsDataOutput,
} from '../utils';
import {
  customerDashboardMonthlyAction,
  customerDashboardMonthlyReducer,
  initialCustomerDashboardMonthlyState,
} from './state';

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

  // churn & retention rate

  // churn & retention rate -> statistics
  const statisticsMonthlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      monthlyCharts.churnRetention.barChartsObj
    );

  // churn & retention rate -> charts -> pie

  // churn & retention rate -> charts -> pie -> heading
  const churnRetentionPieChartHeading = `Churn and retention rates for ${year}`;

  // churn & retention rate -> charts -> pie -> display
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={monthlyCharts.churnRetention.pieChartObj}
      hideControls
    />
  );

  // churn & retention rate -> charts -> bar

  // churn & retention rate -> charts -> bar -> heading
  const churnRetentionBarChartHeading = `${splitCamelCase(
    churnRetentionBarChartYAxisVariable
  )} vs. Months for ${year} at ${storeLocation}`;

  // churn & retention rate -> charts -> bar -> y axis variables
  const [createdChurnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setChurnRetentionBarChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: churnRetentionBarChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> bar -> display
  const displayChurnRetentionBarChart = (
    <ResponsiveBarChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      barChartData={
        monthlyCharts.churnRetention.barChartsObj[
          churnRetentionBarChartYAxisVariable
        ]
      }
      hideControls
      indexBy="Months"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> heading
  const churnRetentionLineChartHeading = `${splitCamelCase(
    churnRetentionLineChartYAxisVariable
  )} vs. Months for ${year} at ${storeLocation}`;

  // churn & retention rate -> charts -> line -> y axis variables
  const [createdChurnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardMonthlyDispatch({
            type: customerDashboardMonthlyAction.setChurnRetentionLineChartYAxisVariable,
            payload: event.currentTarget.value as CustomerChurnRetentionObjKey,
          });
        },
        value: churnRetentionLineChartYAxisVariable,
      },
    ]);

  // churn & retention rate -> charts -> line -> display
  const displayChurnRetentionLineChart = (
    <ResponsiveLineChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      lineChartData={
        monthlyCharts.churnRetention.lineChartsObj[
          churnRetentionLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Month - ${x}`}
      yFormat={(y) => `${y} %`}
    />
  );

  const displayChurnRetentionSection = (
    <DashboardMetricsLayout
      barChart={displayChurnRetentionBarChart}
      barChartHeading={churnRetentionBarChartHeading}
      barChartYAxisSelectInput={
        createdChurnRetentionBarChartYAxisVariablesSelectInput
      }
      borderColor={borderColor}
      expandChartButton={createdExpandChartButton}
      lineChart={displayChurnRetentionLineChart}
      lineChartHeading={churnRetentionLineChartHeading}
      lineChartYAxisSelectInput={
        createdChurnRetentionLineChartYAxisVariablesSelectInput
      }
      overviewCards={[...monthlyCards.churnRate, ...monthlyCards.retentionRate]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={churnRetentionPieChartHeading}
      sectionHeading="Monthly Churn & Retention Rates"
      statisticsMap={statisticsMonthlyChurnRetention}
      width={width}
    />
  );

  return (
    <Stack>
      {displayOverviewSection}
      {displayNewSection}
      {displayReturningSection}
      {displayChurnRetentionSection}
    </Stack>
  );
}

export default CustomerDashboardMonthly;
