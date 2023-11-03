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
  ResponsiveLineChart,
  ResponsivePieChart,
} from '../../../charts';
import DashboardMetricsLayout from '../../DashboardMetricsLayout';
import { ReturnDashboardCustomerCardInfoOutput } from '../../jsxHelpers';
import { BusinessMetric, BusinessMetricStoreLocation } from '../../types';
import { returnStatistics } from '../../utils';
import {
  CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
  CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
  CUSTOMER_OVERVIEW_Y_AXIS_DATA,
} from '../constants';
import {
  CustomerChurnRetentionObjKey,
  CustomerNewReturningObjKey,
  CustomerNewReturningPieObjKey,
  CustomerOverviewObjKey,
  ReturnCustomerChartsDataOutput,
} from '../utils';
import {
  customerDashboardYearlyAction,
  customerDashboardYearlyReducer,
  initialCustomerDashboardYearlyState,
} from './state';

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
    churnRetentionBarChartYAxisVariable,
    churnRetentionLineChartYAxisVariable,
    newBarChartYAxisVariable,
    newLineChartYAxisVariable,
    newPieChartYAxisVariable,
    overviewBarChartYAxisVariable,
    overviewLineChartYAxisVariable,
    returningBarChartYAxisVariable,
    returningLineChartYAxisVariable,
    returningPieChartYAxisVariable,
  } = customerDashboardYearlyState;

  useEffect(() => {
    logState({
      state: customerDashboardYearlyState,
      groupLabel: 'customerDashboardYearlyState',
    });
  }, [customerDashboardYearlyState]);

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
  const statisticsYearlyOverview = returnStatistics<CustomerOverviewObjKey>(
    yearlyCharts.overview.barChartsObj
  );

  // overview -> charts -> pie

  // overview -> charts -> pie -> heading
  const pieChartHeading = `New and returning customers for ${year} at ${storeLocation}`;

  // overview -> charts -> pie -> display
  const displayOverviewPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.overview.pieChartObj}
      hideControls
    />
  );

  // overview -> charts -> bar

  // overview -> charts -> bar -> heading
  const barChartHeading = `${splitCamelCase(
    overviewBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // overview -> charts -> bar -> y axis variables
  const [createdOverviewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setOverviewBarChartYAxisVariable,
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
        yearlyCharts.overview.barChartsObj[overviewBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_OVERVIEW_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // overview -> charts -> line

  // overview -> charts -> line -> heading
  const lineChartHeading = `${splitCamelCase(
    overviewLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // overview -> charts -> line -> y axis variables
  const [createdOverviewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_OVERVIEW_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setOverviewLineChartYAxisVariable,
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
        yearlyCharts.overview.lineChartsObj[overviewLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
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
      overviewCards={yearlyCards.overview}
      padding={padding}
      pieChart={displayOverviewPieChart}
      pieChartHeading={pieChartHeading}
      sectionHeading="Yearly Overview"
      statisticsMap={statisticsYearlyOverview}
      width={width}
    />
  );

  // new

  // new -> statistics
  const statisticsYearlyNew = returnStatistics<CustomerNewReturningObjKey>(
    yearlyCharts.new.barChartsObj
  );

  // new -> charts -> pie

  // new -> charts -> pie -> heading
  const newPieChartHeading = `New customers for ${year} at ${storeLocation}`;

  // new -> charts -> pie -> y axis variables
  const [createdNewPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setNewPieChartYAxisVariable,
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
      pieChartData={yearlyCharts.new.pieChartObj[newPieChartYAxisVariable]}
      hideControls
    />
  );

  // new -> charts -> bar

  // new -> charts -> bar -> heading
  const newBarChartHeading = `${splitCamelCase(
    newBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // new -> charts -> bar -> y axis variables
  const [createdNewBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setNewBarChartYAxisVariable,
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
      barChartData={yearlyCharts.new.barChartsObj[newBarChartYAxisVariable]}
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // new -> charts -> line

  // new -> charts -> line -> heading
  const newLineChartHeading = `${splitCamelCase(
    newLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // new -> charts -> line -> y axis variables
  const [createdNewLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setNewLineChartYAxisVariable,
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
      lineChartData={yearlyCharts.new.lineChartsObj[newLineChartYAxisVariable]}
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
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
      overviewCards={yearlyCards.new}
      padding={padding}
      pieChart={displayNewPieChart}
      pieChartHeading={newPieChartHeading}
      pieChartYAxisSelectInput={createdNewPieChartYAxisVariablesSelectInput}
      sectionHeading="Yearly New"
      statisticsMap={statisticsYearlyNew}
      width={width}
    />
  );

  // returning

  // returning -> statistics
  const statisticsYearlyReturning =
    returnStatistics<CustomerNewReturningObjKey>(
      yearlyCharts.returning.barChartsObj
    );

  // returning -> charts -> pie

  // returning -> charts -> pie -> heading
  const returningPieChartHeading = `Returning customers for ${year} at ${storeLocation}`;

  // returning -> charts -> pie -> y axis variables
  const [createdReturningPieChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_PIE_Y_AXIS_DATA,
        label: 'Y-Axis Pie',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setReturningPieChartYAxisVariable,
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
        yearlyCharts.returning.pieChartObj[returningPieChartYAxisVariable]
      }
      hideControls
    />
  );

  // returning -> charts -> bar

  // returning -> charts -> bar -> heading
  const returningBarChartHeading = `${splitCamelCase(
    returningBarChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // returning -> charts -> bar -> y axis variables
  const [createdReturningBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setReturningBarChartYAxisVariable,
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
        yearlyCharts.returning.barChartsObj[returningBarChartYAxisVariable]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // returning -> charts -> line

  // returning -> charts -> line -> heading
  const returningLineChartHeading = `${splitCamelCase(
    returningLineChartYAxisVariable
  )} Customers vs. Years at ${storeLocation}`;

  // returning -> charts -> line -> y axis variables
  const [createdReturningLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_NEW_RETURNING_LINE_BAR_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setReturningLineChartYAxisVariable,
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
        yearlyCharts.returning.lineChartsObj[returningLineChartYAxisVariable]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
      yFormat={(y) => `${y} Customers`}
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
      overviewCards={yearlyCards.returning}
      padding={padding}
      pieChart={displayReturningPieChart}
      pieChartHeading={returningPieChartHeading}
      pieChartYAxisSelectInput={
        createdReturningPieChartYAxisVariablesSelectInput
      }
      sectionHeading="Yearly Returning"
      statisticsMap={statisticsYearlyReturning}
      width={width}
    />
  );

  // churn & retention rate

  // churn & retention rate -> statistics
  const statisticsYearlyChurnRetention =
    returnStatistics<CustomerChurnRetentionObjKey>(
      yearlyCharts.churnRetention.barChartsObj
    );

  // churn & retention rate -> charts -> pie

  // churn & retention rate -> charts -> pie -> heading
  const churnRetentionPieChartHeading = `Churn and retention rates for ${year}  at ${storeLocation}`;

  // churn & retention rate -> charts -> pie -> display
  const displayChurnRetentionPieChart = (
    <ResponsivePieChart
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      pieChartData={yearlyCharts.churnRetention.pieChartObj}
      hideControls
    />
  );

  // churn & retention rate -> charts -> bar

  // churn & retention rate -> charts -> bar -> heading
  const churnRetentionBarChartHeading = `${splitCamelCase(
    churnRetentionBarChartYAxisVariable
  )} vs. Years at ${storeLocation}`;

  // churn & retention rate -> charts -> bar -> y axis variables
  const [createdChurnRetentionBarChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Bar',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setChurnRetentionBarChartYAxisVariable,
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
        yearlyCharts.churnRetention.barChartsObj[
          churnRetentionBarChartYAxisVariable
        ]
      }
      hideControls
      indexBy="Years"
      keys={CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA.map((obj) => obj.label)}
    />
  );

  // churn & retention rate -> charts -> line

  // churn & retention rate -> charts -> line -> heading
  const churnRetentionLineChartHeading = `${splitCamelCase(
    churnRetentionLineChartYAxisVariable
  )} vs. Years at ${storeLocation}`;

  // churn & retention rate -> charts -> line -> y axis variables
  const [createdChurnRetentionLineChartYAxisVariablesSelectInput] =
    returnAccessibleSelectInputElements([
      {
        data: CUSTOMER_CHURN_RETENTION_Y_AXIS_DATA,
        label: 'Y-Axis Line',
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          customerDashboardYearlyDispatch({
            type: customerDashboardYearlyAction.setChurnRetentionLineChartYAxisVariable,
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
        yearlyCharts.churnRetention.lineChartsObj[
          churnRetentionLineChartYAxisVariable
        ]
      }
      hideControls
      xFormat={(x) => `Year - ${x}`}
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
      overviewCards={[...yearlyCards.churnRate, ...yearlyCards.retentionRate]}
      padding={padding}
      pieChart={displayChurnRetentionPieChart}
      pieChartHeading={churnRetentionPieChartHeading}
      sectionHeading="Yearly Churn & Retention Rates"
      statisticsMap={statisticsYearlyChurnRetention}
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

export default CustomerDashboardYearly;
